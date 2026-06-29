// Khắc phục: THEORY (vocab) của en-starters bị lệch sau khi script cũ
// (script/seed-yle-starters-vocab.js) ghi đè nhầm cấu trúc 25 bài lên program
// đã được tách thành 50 bài (xem scripts/split-en-starters-50.js).
// Script này CHỈ sửa lại THEORY, không đụng Lesson/GRAMMAR/DIALOGUE/EXERCISE.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const VOCAB_DATA = require('./data/starters-vocab-source');

function groupByLesson(arr) {
  const map = {};
  arr.forEach((item) => {
    if (!map[item.lesson]) map[item.lesson] = [];
    map[item.lesson].push(item);
  });
  return map;
}

async function main() {
  console.log('🔧 Khắc phục THEORY cho en-starters (50 bài)...\n');

  const program = await prisma.program.findUnique({ where: { code: 'en-starters' } });
  if (!program) throw new Error('❌ Không tìm thấy Program en-starters');

  const lessons = await prisma.lesson.findMany({
    where: { programId: program.id, orderIndex: { not: 9999 } },
    select: { id: true, orderIndex: true, title: true }
  });
  const lessonByOrderIndex = {};
  lessons.forEach((l) => { lessonByOrderIndex[l.orderIndex] = l; });

  const vocabByLesson = groupByLesson(VOCAB_DATA);

  let totalDeleted = 0, totalCreated = 0;

  for (let n = 1; n <= 25; n++) {
    const vocab = vocabByLesson[n] || [];
    const vocabHalves = [vocab.slice(0, 10), vocab.slice(10, 20)];

    for (let half = 0; half < 2; half++) {
      const orderIndex = (n - 1) * 2 + half + 1;
      const lesson = lessonByOrderIndex[orderIndex];
      if (!lesson) {
        console.warn(`⚠️  Không tìm thấy lesson orderIndex=${orderIndex} (topic ${n}, phần ${half + 1})`);
        continue;
      }

      const deleted = await prisma.lessonContent.deleteMany({
        where: { lessonId: lesson.id, contentType: 'THEORY' }
      });
      totalDeleted += deleted.count;

      for (const v of vocabHalves[half]) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'THEORY',
            content: JSON.stringify({
              word: v.word,
              ipa: v.ipa,
              meaning: v.meaning,
              example_en: v.example_en,
              example_vi: v.example_vi,
              type: v.type
            })
          }
        });
        totalCreated++;
      }

      console.log(`   ✔ [${String(orderIndex).padStart(2, '0')}] ${lesson.title} — xoá ${deleted.count}, tạo ${vocabHalves[half].length}`);
    }
  }

  console.log('\n══════════════════════════════');
  console.log(`✅ Hoàn tất. Đã xoá ${totalDeleted} THEORY cũ, tạo lại ${totalCreated} THEORY mới.`);
  console.log('══════════════════════════════');
}

main()
  .catch((e) => {
    console.error('\n❌ Lỗi:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// seed-movers.js
// Seed toàn bộ chương trình en-movers từ tất cả file movers-*.json trong thư mục data/
// Xóa sạch en-movers cũ (nếu có) rồi seed lại từ đầu.

const { PrismaClient } = require('../../../packages/database');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const PROGRAM_CODE = 'en-movers';
const DATA_DIR = path.join(__dirname, '../../../data');

async function main() {
  console.log('🚀 Bắt đầu seed en-movers...');

  // 1. Kiểm tra program tồn tại
  const program = await prisma.program.findUnique({ where: { code: PROGRAM_CODE } });
  if (!program) {
    console.error(`❌ Không tìm thấy program '${PROGRAM_CODE}'. Tạo program này trong Admin trước.`);
    return;
  }
  console.log(`✅ Tìm thấy program: ${program.name} (id: ${program.id})`);

  // 2. Xóa toàn bộ bài cũ của en-movers
  const oldLessons = await prisma.lesson.findMany({
    where: { programId: program.id },
    select: { id: true },
  });
  if (oldLessons.length > 0) {
    const ids = oldLessons.map((l) => l.id);
    await prisma.userProgress.deleteMany({ where: { lessonId: { in: ids } } });
    await prisma.lessonContent.deleteMany({ where: { lessonId: { in: ids } } });
    await prisma.lesson.deleteMany({ where: { id: { in: ids } } });
    console.log(`🗑️  Đã xóa ${ids.length} bài cũ.`);
  } else {
    console.log('ℹ️  Chưa có bài nào trong DB, seed mới hoàn toàn.');
  }

  // 3. Đọc tất cả file movers-*.json trong data/
  const files = fs.readdirSync(DATA_DIR)
    .filter((f) => f.startsWith('movers-') && f.endsWith('.json'))
    .sort(); // sort để đọc theo thứ tự tên file

  if (files.length === 0) {
    console.error('❌ Không tìm thấy file movers-*.json nào trong thư mục data/');
    return;
  }
  console.log(`📂 Tìm thấy ${files.length} file: ${files.join(', ')}`);

  // 4. Gộp tất cả lessons, merge theo orderIndex nếu bị split ở nhiều file
  const lessonMap = new Map(); // orderIndex -> lesson object

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const lessons = raw.lessons || raw; // hỗ trợ cả {lessons:[...]} và [...]

    for (const lesson of lessons) {
      const idx = lesson.orderIndex;
      if (lessonMap.has(idx)) {
        // Merge: ghép vocab/grammar/dialogue từ file thứ 2 vào bài đã có
        const existing = lessonMap.get(idx);
        existing.vocab     = [...(existing.vocab     || []), ...(lesson.vocab     || [])];
        existing.grammar   = [...(existing.grammar   || []), ...(lesson.grammar   || [])];
        existing.dialogue  = [...(existing.dialogue  || []), ...(lesson.dialogue  || [])];
      } else {
        lessonMap.set(idx, {
          orderIndex: idx,
          title:      lesson.title      || `Bài ${idx}`,
          theme:      lesson.theme      || null,
          isPremium:  lesson.isPremium  ?? false,
          vocab:      lesson.vocab      || [],
          grammar:    lesson.grammar    || [],
          dialogue:   lesson.dialogue   || [],
        });
      }
    }
  }

  // Sắp xếp theo orderIndex trước khi seed
  const allLessons = [...lessonMap.values()].sort((a, b) => a.orderIndex - b.orderIndex);
  console.log(`📚 Tổng số bài sau khi gộp: ${allLessons.length}`);

  // 5. Seed từng bài
  let totalVocab = 0, totalGrammar = 0, totalDialogue = 0;

  for (const lesson of allLessons) {
    const created = await prisma.lesson.create({
      data: {
        programId: program.id,
        title:      lesson.title,
        theme:      lesson.theme,
        orderIndex: lesson.orderIndex,
        isPremium:  lesson.isPremium,
      },
    });

    for (const word of lesson.vocab) {
      await prisma.lessonContent.create({
        data: { lessonId: created.id, contentType: 'THEORY', content: JSON.stringify(word) },
      });
      totalVocab++;
    }
    for (const grammar of lesson.grammar) {
      await prisma.lessonContent.create({
        data: { lessonId: created.id, contentType: 'GRAMMAR', content: JSON.stringify(grammar) },
      });
      totalGrammar++;
    }
    for (const dialogue of lesson.dialogue) {
      await prisma.lessonContent.create({
        data: { lessonId: created.id, contentType: 'DIALOGUE', content: JSON.stringify(dialogue) },
      });
      totalDialogue++;
    }

    console.log(
      `  ✅ [${lesson.orderIndex}] ${lesson.title}` +
      ` — ${lesson.vocab.length} từ, ${lesson.grammar.length} ngữ pháp, ${lesson.dialogue.length} hội thoại`
    );
  }

  console.log('\n========== KẾT QUẢ ==========');
  console.log(`📚 Tổng bài học : ${allLessons.length}`);
  console.log(`📖 Tổng từ vựng : ${totalVocab}`);
  console.log(`📐 Tổng ngữ pháp: ${totalGrammar}`);
  console.log(`💬 Tổng hội thoại: ${totalDialogue}`);
  console.log('🎉 Seed en-movers hoàn thành!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

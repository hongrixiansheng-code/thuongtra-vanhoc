/**
 * seed-hsk1-v3.js
 * Seed HSK1 v3.0 — format JSON mới (vocab + grammar + dialogues gộp theo bài)
 * Chạy: node apps/frontend/scripts/seed-hsk1-v3.js
 */

const { PrismaClient } = require('../../../packages/database/index');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const DATA_FILE = path.join(__dirname, '../../../data/hsk1-v3-batch1-5.json');

async function main() {
  console.log('🚀 Bắt đầu seed HSK1 v3.0 (Bài 1–5)...\n');

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Không tìm thấy file: ${DATA_FILE}`);
    process.exit(1);
  }

  const lessons = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  console.log(`📂 Đọc được ${lessons.length} bài từ file JSON\n`);

  const program = await prisma.program.findUnique({ where: { code: 'hsk1' } });
  if (!program) {
    console.error('❌ Không tìm thấy program hsk1.');
    process.exit(1);
  }
  console.log(`✅ Tìm thấy program: ${program.name} (id: ${program.id})\n`);

  // Xóa bài cũ theo orderIndex
  const orderIndexes = lessons.map(l => l.orderIndex);
  console.log(`🗑️  Xóa bài cũ có orderIndex: [${orderIndexes.join(', ')}]...`);

  const oldLessons = await prisma.lesson.findMany({
    where: { programId: program.id, orderIndex: { in: orderIndexes } },
    select: { id: true }
  });

  if (oldLessons.length > 0) {
    const oldIds = oldLessons.map(l => l.id);
    await prisma.userProgress.deleteMany({ where: { lessonId: { in: oldIds } } });
    await prisma.lessonContent.deleteMany({ where: { lessonId: { in: oldIds } } });
    await prisma.lesson.deleteMany({ where: { id: { in: oldIds } } });
    console.log(`   Đã xóa ${oldIds.length} bài cũ\n`);
  } else {
    console.log('   Không có bài cũ cần xóa\n');
  }

  let totalVocab = 0, totalGrammar = 0, totalDialogue = 0;

  for (const lessonData of lessons) {
    console.log(`📖 Seed bài ${lessonData.orderIndex}: ${lessonData.title}`);

    const lesson = await prisma.lesson.create({
      data: {
        title: lessonData.title,
        orderIndex: lessonData.orderIndex,
        theme: lessonData.theme,
        isPremium: lessonData.isPremium ?? false,
        programId: program.id,
      }
    });

    // Vocab (THEORY) — mỗi từ là một row riêng (data.ts expect từng object, không phải array)
    if (lessonData.vocab?.length > 0) {
      for (const v of lessonData.vocab) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'THEORY',
            content: JSON.stringify({
              hanzi: v.hanzi,
              pinyin: v.pinyin,
              type: v.type,
              type_short: v.type_short,
              meaning: v.meaning,
              example_zh: v.example_zh,
              example_vi: v.example_vi,
            })
          }
        });
      }
      totalVocab += lessonData.vocab.length;
      console.log(`   ✅ Vocab: ${lessonData.vocab.length} từ`);
    }

    // Grammar — mỗi điểm ngữ pháp là một row riêng
    if (lessonData.grammar?.length > 0) {
      for (const g of lessonData.grammar) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'GRAMMAR',
            content: JSON.stringify({
              title: g.title,
              desc: g.desc,
              formula: (Array.isArray(g.formula) ? g.formula : [g.formula]).map(f =>
                typeof f === 'string' ? { text: f } : f
              ),
              practiceList: g.practiceList ?? []
            })
          }
        });
        totalGrammar++;
      }
      console.log(`   ✅ Grammar: ${lessonData.grammar.length} điểm ngữ pháp`);
    }

    // Dialogue — giữ speaker để DialogueClient phân biệt A/B
    if (lessonData.dialogues?.length > 0) {
      for (const d of lessonData.dialogues) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'DIALOGUE',
            content: JSON.stringify({
              title: d.title,
              lines: d.lines.map(line => ({
                speaker: line.speaker,
                zh: line.zh,
                py: line.py,
                vi: line.vi,
              }))
            })
          }
        });
        totalDialogue++;
      }
      console.log(`   ✅ Dialogue: ${lessonData.dialogues.length} đoạn`);
    }

    console.log(`   → id: ${lesson.id}\n`);
  }

  console.log('━'.repeat(50));
  console.log('🎉 Seed HSK1 v3.0 hoàn tất!');
  console.log(`   📚 Bài học  : ${lessons.length} bài`);
  console.log(`   🔤 Từ vựng  : ${totalVocab} từ`);
  console.log(`   📝 Ngữ pháp : ${totalGrammar} điểm`);
  console.log(`   💬 Hội thoại: ${totalDialogue} đoạn`);
  console.log('━'.repeat(50));
}

main()
  .catch(err => {
    console.error('❌ Lỗi seed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

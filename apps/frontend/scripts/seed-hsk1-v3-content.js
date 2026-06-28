/**
 * seed-hsk1-v3-content.js
 * Seed nội dung HSK1 v3.0 — đọc 3 file JSON (vocab + grammar + dialogue)
 * merge theo orderIndex rồi seed vào DB
 * Chạy: node apps/frontend/scripts/seed-hsk1-v3-content.js
 */

const { PrismaClient } = require('../../../packages/database/index');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const VOCAB_FILE    = path.join(__dirname, '../../../data/hsk1-v3-vocab.json');
const GRAMMAR_FILE  = path.join(__dirname, '../../../data/hsk1-v3-grammar.json');
const DIALOGUE_FILE = path.join(__dirname, '../../../data/hsk1-v3-dialogue.json');

async function main() {
  console.log('🚀 Bắt đầu seed HSK1 v3.0 content (vocab + grammar + dialogue)...\n');

  // === Kiểm tra file ===
  for (const f of [VOCAB_FILE, GRAMMAR_FILE, DIALOGUE_FILE]) {
    if (!fs.existsSync(f)) {
      console.error(`❌ Không tìm thấy file: ${f}`);
      process.exit(1);
    }
  }

  const vocabData    = JSON.parse(fs.readFileSync(VOCAB_FILE, 'utf-8'));
  const grammarData  = JSON.parse(fs.readFileSync(GRAMMAR_FILE, 'utf-8'));
  const dialogueData = JSON.parse(fs.readFileSync(DIALOGUE_FILE, 'utf-8'));

  console.log(`📂 Vocab   : ${vocabData.length} bài`);
  console.log(`📂 Grammar : ${grammarData.length} bài`);
  console.log(`📂 Dialogue: ${dialogueData.length} bài\n`);

  // === Index theo orderIndex ===
  const vocabMap    = Object.fromEntries(vocabData.map(b => [b.orderIndex, b.vocab || []]));
  const grammarMap  = Object.fromEntries(grammarData.map(b => [b.orderIndex, b.grammar || []]));
  const dialogueMap = Object.fromEntries(dialogueData.map(b => [b.orderIndex, b.dialogues || []]));

  // === Tìm program ===
  const program = await prisma.program.findUnique({ where: { code: 'hsk1' } });
  if (!program) {
    console.error('❌ Không tìm thấy program hsk1.');
    process.exit(1);
  }
  console.log(`✅ Program: ${program.name}\n`);

  // === Lấy tất cả lessons hiện có ===
  const lessons = await prisma.lesson.findMany({
    where: { programId: program.id },
    orderBy: { orderIndex: 'asc' }
  });
  console.log(`📚 Tìm thấy ${lessons.length} bài trong DB\n`);

  let totalVocab = 0, totalGrammar = 0, totalDialogue = 0, totalSkipped = 0;

  for (const lesson of lessons) {
    const idx = lesson.orderIndex;
    const vocab    = vocabMap[idx]    || [];
    const grammar  = grammarMap[idx]  || [];
    const dialogues = dialogueMap[idx] || [];

    if (vocab.length === 0 && grammar.length === 0 && dialogues.length === 0) {
      console.log(`⏭  Bài ${idx}: không có data trong JSON — bỏ qua`);
      totalSkipped++;
      continue;
    }

    console.log(`📖 Bài ${idx}: ${lesson.title}`);

    // Xóa content cũ của bài này
    await prisma.lessonContent.deleteMany({ where: { lessonId: lesson.id } });

    // Seed vocab — mỗi từ 1 row
    for (const v of vocab) {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'THEORY',
          content: JSON.stringify({
            hanzi:      v.hanzi,
            pinyin:     v.pinyin,
            type:       v.type,
            type_short: v.type_short,
            meaning:    v.meaning,
            example_zh: v.example_zh,
            example_vi: v.example_vi,
          })
        }
      });
    }
    totalVocab += vocab.length;

    // Seed grammar — mỗi điểm 1 row
    for (const g of grammar) {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'GRAMMAR',
          content: JSON.stringify({
            title:       g.title,
            desc:        g.desc,
            formula:     (Array.isArray(g.formula) ? g.formula : [g.formula])
                           .map(f => typeof f === 'string' ? { text: f } : f),
            practiceList: g.practiceList ?? []
          })
        }
      });
    }
    totalGrammar += grammar.length;

    // Seed dialogue — mỗi đoạn 1 row, giữ speaker
    for (const d of dialogues) {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'DIALOGUE',
          content: JSON.stringify({
            title: d.title,
            lines: d.lines.map(line => ({
              speaker: line.speaker,
              zh:      line.zh,
              py:      line.py,
              vi:      line.vi,
            }))
          })
        }
      });
    }
    totalDialogue += dialogues.length;

    console.log(`   ✅ Vocab: ${vocab.length} từ | Grammar: ${grammar.length} điểm | Dialogue: ${dialogues.length} đoạn`);
  }

  // === Tổng kết ===
  console.log('\n' + '━'.repeat(50));
  console.log('🎉 Seed HSK1 v3.0 content hoàn tất!');
  console.log(`   🔤 Từ vựng  : ${totalVocab} từ`);
  console.log(`   📝 Ngữ pháp : ${totalGrammar} điểm`);
  console.log(`   💬 Hội thoại: ${totalDialogue} đoạn`);
  console.log(`   ⏭  Bỏ qua   : ${totalSkipped} bài (chưa có data)`);
  console.log('━'.repeat(50));

  // Verify
  const counts = await prisma.lessonContent.groupBy({
    by: ['contentType'],
    where: { lesson: { programId: program.id } },
    _count: true
  });
  console.log('\n📊 Verify DB:');
  counts.forEach(c => console.log(`   ${c.contentType}: ${c._count}`));
}

main()
  .catch(err => {
    console.error('❌ Lỗi:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

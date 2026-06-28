// 🤖 CLAUDE CODE
// Script: split-en-starters-50.js
// Mục đích: Tách 25 bài Starters hiện có thành 50 bài (mỗi bài cũ → 2 bài mới)
// Vocab 20->10+10, Dialogue 2->1+1, Exercise 6->3+3 (1 MC+1 FB+1 DD mỗi nửa), Grammar 3->2+1
// Chạy: node apps/frontend/scripts/split-en-starters-50.js
// Không thay đổi gì khác.

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const VOCAB_DATA = require('./data/starters-vocab-source');
const GRAMMAR_DATA = require('./data/starters-grammar-source');
const DIALOGUE_DATA = require('./data/starters-dialogue-source');
const EXERCISE_DATA = require('./data/starters-exercise-source');

function groupByLesson(arr) {
  const map = {};
  arr.forEach((item) => {
    if (!map[item.lesson]) map[item.lesson] = [];
    map[item.lesson].push(item);
  });
  return map;
}

async function main() {
  console.log('🚀 Bắt đầu tách Starters 25 bài → 50 bài...\n');

  const program = await prisma.program.findUnique({
    where: { code: 'en-starters' },
    include: { lessons: { include: { contents: true }, orderBy: { orderIndex: 'asc' } } },
  });
  if (!program) throw new Error('❌ Không tìm thấy Program en-starters');
  console.log(`✅ Program: ${program.name} (id: ${program.id})`);

  const oldLessons = program.lessons.filter((l) => l.orderIndex !== 9999);
  console.log(`   Bài cũ (không tính từ điển): ${oldLessons.length}\n`);

  const titleByOrderIndex = {};
  oldLessons.forEach((l) => { titleByOrderIndex[l.orderIndex] = l.title; });

  const vocabByLesson = groupByLesson(VOCAB_DATA);
  const grammarByLesson = groupByLesson(GRAMMAR_DATA);
  const dialogueByLesson = groupByLesson(DIALOGUE_DATA);
  const exerciseByLesson = groupByLesson(EXERCISE_DATA);

  // ── 1. Xóa UserProgress + LessonContent + Lesson cũ (giữ lesson 9999) ──
  const oldLessonIds = oldLessons.map((l) => l.id);
  const deletedProgress = await prisma.userProgress.deleteMany({
    where: { lessonId: { in: oldLessonIds } },
  });
  console.log(`🗑️  Đã xóa ${deletedProgress.count} UserProgress`);

  const deletedContents = await prisma.lessonContent.deleteMany({
    where: { lessonId: { in: oldLessonIds } },
  });
  console.log(`🗑️  Đã xóa ${deletedContents.count} LessonContent`);

  const deletedLessons = await prisma.lesson.deleteMany({
    where: { id: { in: oldLessonIds } },
  });
  console.log(`🗑️  Đã xóa ${deletedLessons.count} Lesson\n`);

  // ── 2. Tạo lại 50 bài mới ──
  let newOrderIndex = 1;
  let totalVocab = 0, totalGrammar = 0, totalDialogue = 0, totalExercise = 0;

  for (let n = 1; n <= 25; n++) {
    const vocab = vocabByLesson[n] || [];
    const grammar = grammarByLesson[n] || [];
    const dialogue = dialogueByLesson[n] || [];
    const exercise = exerciseByLesson[n] || [];

    const vocabHalves = [vocab.slice(0, 10), vocab.slice(10, 20)];
    const grammarHalves = [grammar.slice(0, 2), grammar.slice(2, 3)];
    const dialogueHalves = [[dialogue[0]].filter(Boolean), [dialogue[1]].filter(Boolean)];
    // exercise order trong nguồn: [MC, MC, FB, FB, DD, DD] -> mỗi nửa lấy 1 MC + 1 FB + 1 DD
    const exerciseHalves = [
      [exercise[0], exercise[2], exercise[4]].filter(Boolean),
      [exercise[1], exercise[3], exercise[5]].filter(Boolean),
    ];

    const originalTitle = titleByOrderIndex[n] || `Lesson ${n}`;

    for (let half = 0; half < 2; half++) {
      const title = `${originalTitle} — Phần ${half + 1}`;
      const lesson = await prisma.lesson.create({
        data: {
          programId: program.id,
          orderIndex: newOrderIndex,
          title,
          isPremium: false,
        },
      });

      for (const v of vocabHalves[half]) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'THEORY',
            content: JSON.stringify({
              word: v.word, meaning: v.meaning,
              example_en: v.example_en, example_vi: v.example_vi, type: v.type,
            }),
          },
        });
        totalVocab++;
      }
      for (const g of grammarHalves[half]) {
        await prisma.lessonContent.create({
          data: { lessonId: lesson.id, contentType: 'GRAMMAR', content: JSON.stringify(g.content) },
        });
        totalGrammar++;
      }
      for (const d of dialogueHalves[half]) {
        await prisma.lessonContent.create({
          data: { lessonId: lesson.id, contentType: 'DIALOGUE', content: JSON.stringify(d.content) },
        });
        totalDialogue++;
      }
      for (const e of exerciseHalves[half]) {
        await prisma.lessonContent.create({
          data: { lessonId: lesson.id, contentType: 'EXERCISE', content: JSON.stringify(e.content) },
        });
        totalExercise++;
      }

      console.log(`   ✔ [${String(newOrderIndex).padStart(2, '0')}] ${title} — vocab:${vocabHalves[half].length} grammar:${grammarHalves[half].length} dialogue:${dialogueHalves[half].length} exercise:${exerciseHalves[half].length}`);
      newOrderIndex++;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Tách bài hoàn tất!');
  console.log(`   Lessons mới : ${newOrderIndex - 1}`);
  console.log(`   Vocab       : ${totalVocab}`);
  console.log(`   Grammar     : ${totalGrammar}`);
  console.log(`   Dialogue    : ${totalDialogue}`);
  console.log(`   Exercise    : ${totalExercise}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('\n❌ Lỗi khi tách bài:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

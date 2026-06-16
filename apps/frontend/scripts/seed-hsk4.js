const { PrismaClient } = require('../../../packages/database/index');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu seed HSK4...');

  // Tìm program hsk4 (tạo nếu chưa có)
  let program = await prisma.program.findUnique({ where: { code: 'hsk4' } });
  if (!program) {
    console.log('⚠️ Không tìm thấy program hsk4. Tiến hành tạo mới...');
    const subject = await prisma.subject.findUnique({ where: { code: 'ZH' } });
    program = await prisma.program.create({
      data: {
        code: 'hsk4',
        name: 'HSK 4 - Giao tiếp Nâng cao',
        level: 4,
        subjectId: subject.id
      }
    });
  }

  // Xóa data cũ
  console.log('🗑️ Xóa data cũ...');
  const oldLessons = await prisma.lesson.findMany({ where: { programId: program.id }, select: { id: true } });
  const oldLessonIds = oldLessons.map(l => l.id);
  await prisma.userProgress.deleteMany({ where: { lessonId: { in: oldLessonIds } } });
  await prisma.lessonContent.deleteMany({ where: { lessonId: { in: oldLessonIds } } });
  await prisma.lesson.deleteMany({ where: { programId: program.id } });
  console.log(`✅ Đã xóa progress cũ`);
  console.log(`✅ Đã xóa ${oldLessons.length} bài cũ`);

  // Đọc tất cả batch files
  const batchFiles = ['hsk4-batch1.json', 'hsk4-batch2.json', 'hsk4-batch3.json', 'hsk4-batch4.json'];
  const allLessons = [];

  for (const file of batchFiles) {
    const filePath = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', file);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      allLessons.push(...data);
      console.log(`📂 Đọc ${file}: ${data.length} bài`);
    } else {
      console.warn(`⚠️ Không tìm thấy ${file}`);
    }
  }

  // Seed từng bài
  let totalVocab = 0, totalGrammar = 0, totalDialogue = 0;

  for (const lesson of allLessons) {
    // Tạo lesson
    const created = await prisma.lesson.create({
      data: {
        programId: program.id,
        title: lesson.title,
        theme: lesson.theme || lesson.topic || null,
        orderIndex: lesson.orderIndex,
        isPremium: false,
      }
    });

    // Seed vocab (THEORY)
    const vocabList = lesson.words || lesson.vocab || [];
    for (const word of vocabList) {
      await prisma.lessonContent.create({
        data: {
          lessonId: created.id,
          contentType: 'THEORY',
          content: JSON.stringify(word)
        }
      });
      totalVocab++;
    }

    // Seed grammar
    for (const grammar of (lesson.grammar || [])) {
      await prisma.lessonContent.create({
        data: {
          lessonId: created.id,
          contentType: 'GRAMMAR',
          content: JSON.stringify(grammar)
        }
      });
      totalGrammar++;
    }

    // Seed dialogue
    for (const dialogue of (lesson.dialogue || lesson.dialogues || [])) {
      await prisma.lessonContent.create({
        data: {
          lessonId: created.id,
          contentType: 'DIALOGUE',
          content: JSON.stringify(dialogue)
        }
      });
      totalDialogue++;
    }

    console.log(`✅ Bài ${lesson.orderIndex}: ${lesson.title} (${vocabList.length} từ)`);
  }

  console.log('\n========== KẾT QUẢ ==========');
  console.log(`📚 Tổng bài học: ${allLessons.length}`);
  console.log(`📖 Tổng từ vựng: ${totalVocab}`);
  console.log(`📐 Tổng ngữ pháp: ${totalGrammar}`);
  console.log(`💬 Tổng hội thoại: ${totalDialogue}`);
  console.log('🎉 Seed HSK4 hoàn thành!');
}

main().finally(() => prisma.$disconnect());

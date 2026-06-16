const { PrismaClient } = require('../../../packages/database/index');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu seed HSK2...');

  // Tìm program hsk2 (tạo nếu chưa có)
  let program = await prisma.program.findUnique({ where: { code: 'hsk2' } });
  if (!program) {
    console.log('⚠️ Không tìm thấy program hsk2. Tiến hành tạo mới...');
    program = await prisma.program.create({
      data: {
        code: 'hsk2',
        title: 'HSK 2 - Giao tiếp Cơ bản',
        description: 'Chương trình HSK 2 với 12 bài học xoay quanh các chủ đề giao tiếp cơ bản.',
        level: 2,
        price: 0
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
  const batchFiles = ['hsk2-batch1.json', 'hsk2-batch2.json', 'hsk2-batch3.json'];
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
        theme: lesson.theme || null,
        orderIndex: lesson.orderIndex,
        isPremium: false,
      }
    });

    // Seed vocab (THEORY)
    for (const word of (lesson.vocab || [])) {
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
    for (const dialogue of (lesson.dialogue || [])) {
      await prisma.lessonContent.create({
        data: {
          lessonId: created.id,
          contentType: 'DIALOGUE',
          content: JSON.stringify(dialogue)
        }
      });
      totalDialogue++;
    }

    console.log(`✅ Bài ${lesson.orderIndex}: ${lesson.title} (${lesson.vocab?.length || 0} từ)`);
  }

  console.log('\n========== KẾT QUẢ ==========');
  console.log(`📚 Tổng bài học: ${allLessons.length}`);
  console.log(`📖 Tổng từ vựng: ${totalVocab}`);
  console.log(`📐 Tổng ngữ pháp: ${totalGrammar}`);
  console.log(`💬 Tổng hội thoại: ${totalDialogue}`);
  console.log('🎉 Seed HSK2 hoàn thành!');
}

main().finally(() => prisma.$disconnect());

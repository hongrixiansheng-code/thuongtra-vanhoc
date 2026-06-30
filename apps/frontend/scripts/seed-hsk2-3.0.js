const { PrismaClient } = require('../../../packages/database/index');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu seed HSK2 (chuẩn 3.0, 26 bài)...');

  let program = await prisma.program.findUnique({ where: { code: 'hsk2' } });
  if (!program) {
    console.log('⚠️ Không tìm thấy program hsk2. Tiến hành tạo mới...');
    const subject = await prisma.subject.findUnique({ where: { code: 'zh' } });
    program = await prisma.program.create({
      data: {
        code: 'hsk2',
        name: 'HSK 2 - Cấp độ Sơ cấp',
        level: 2,
        subjectId: subject.id
      }
    });
  }

  // Xóa data cũ (12 lesson cấu trúc cũ, không có grammar)
  console.log('🗑️ Xóa data cũ...');
  const oldLessons = await prisma.lesson.findMany({ where: { programId: program.id }, select: { id: true } });
  const oldLessonIds = oldLessons.map(l => l.id);
  await prisma.userProgress.deleteMany({ where: { lessonId: { in: oldLessonIds } } });
  await prisma.lessonContent.deleteMany({ where: { lessonId: { in: oldLessonIds } } });
  await prisma.lesson.deleteMany({ where: { programId: program.id } });
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

  allLessons.sort((a, b) => a.orderIndex - b.orderIndex);

  let totalVocab = 0, totalGrammar = 0, totalDialogue = 0;

  for (const lesson of allLessons) {
    const created = await prisma.lesson.create({
      data: {
        programId: program.id,
        title: lesson.title,
        theme: lesson.theme || null,
        orderIndex: lesson.orderIndex,
        isPremium: false,
      }
    });

    for (const word of (lesson.vocab || [])) {
      await prisma.lessonContent.create({
        data: { lessonId: created.id, contentType: 'THEORY', content: JSON.stringify(word) }
      });
      totalVocab++;
    }

    for (const grammar of (lesson.grammar || [])) {
      await prisma.lessonContent.create({
        data: { lessonId: created.id, contentType: 'GRAMMAR', content: JSON.stringify(grammar) }
      });
      totalGrammar++;
    }

    for (const dialogue of (lesson.dialogue || [])) {
      await prisma.lessonContent.create({
        data: { lessonId: created.id, contentType: 'DIALOGUE', content: JSON.stringify(dialogue) }
      });
      totalDialogue++;
    }

    console.log(`✅ Bài ${lesson.orderIndex}: ${lesson.title} (${lesson.vocab?.length || 0} từ, ${lesson.grammar?.length || 0} ngữ pháp, ${lesson.dialogue?.length || 0} hội thoại)`);
  }

  console.log('\n========== KẾT QUẢ ==========');
  console.log(`📚 Tổng bài học: ${allLessons.length}`);
  console.log(`📖 Tổng từ vựng: ${totalVocab}`);
  console.log(`📐 Tổng ngữ pháp: ${totalGrammar}`);
  console.log(`💬 Tổng hội thoại: ${totalDialogue}`);
  console.log('🎉 Seed HSK2 3.0 hoàn thành!');
}

main().finally(() => prisma.$disconnect());

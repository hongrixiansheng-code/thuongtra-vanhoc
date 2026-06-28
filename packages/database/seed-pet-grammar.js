const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedGrammar(fileName) {
  const filePath = path.join(__dirname, '../../data', fileName);
  if (!fs.existsSync(filePath)) {
    console.error("Không tìm thấy file:", filePath);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const program = await prisma.program.findUnique({ where: { code: 'en-pet' } });
  
  if (!program) {
    console.error("Không tìm thấy chương trình en-pet");
    return;
  }

  let totalSeeded = 0;

  for (const lessonData of data.lessons) {
    const lesson = await prisma.lesson.findFirst({
      where: { programId: program.id, orderIndex: lessonData.orderIndex }
    });

    if (!lesson) {
      console.error(`Không tìm thấy bài học có orderIndex ${lessonData.orderIndex}`);
      continue;
    }

    // Xóa ngữ pháp cũ của bài này
    await prisma.lessonContent.deleteMany({
      where: { lessonId: lesson.id, contentType: 'GRAMMAR' }
    });

    // Thêm lại ngữ pháp mới
    for (const point of lessonData.grammar) {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'GRAMMAR',
          content: JSON.stringify(point)
        }
      });
      totalSeeded++;
    }
    console.log(`Đã seed ${lessonData.grammar.length} ngữ pháp vào orderIndex ${lessonData.orderIndex}`);
  }

  console.log(`\\nHoàn thành seed file ${fileName}! Tổng số ngữ pháp đã thêm: ${totalSeeded}`);
}

const fileToSeed = process.argv[2];
if (!fileToSeed) {
  console.log("Vui lòng cung cấp tên file (VD: node seed-pet-grammar.js pet-grammar-cum1.json)");
  process.exit(1);
}

seedGrammar(fileToSeed)
  .then(() => prisma.$disconnect())
  .catch(e => { console.error(e); prisma.$disconnect(); });

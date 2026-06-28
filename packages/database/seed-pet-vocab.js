const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const cumFile = process.argv[2];
  if (!cumFile) {
    console.error("Vui lòng cung cấp tên file JSON. VD: node seed-pet-vocab.js pet-vocab-cum1.json");
    process.exit(1);
  }

  const filePath = path.join(__dirname, '../../data', cumFile);
  if (!fs.existsSync(filePath)) {
    console.error("Không tìm thấy file: " + filePath);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const program = await prisma.program.findUnique({ where: { code: 'en-pet' } });
  
  if (!program) {
    console.error("Không tìm thấy chương trình en-pet");
    process.exit(1);
  }

  let totalWordsAdded = 0;

  for (const lessonData of data.lessons) {
    const lesson = await prisma.lesson.findFirst({
      where: { programId: program.id, orderIndex: lessonData.orderIndex }
    });

    if (!lesson) {
      console.error(`Không tìm thấy bài học có orderIndex ${lessonData.orderIndex}`);
      continue;
    }

    // Xóa từ vựng cũ nếu có
    await prisma.lessonContent.deleteMany({
      where: { lessonId: lesson.id, contentType: 'THEORY' }
    });

    // Thêm từ vựng mới
    for (const word of lessonData.vocab) {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'THEORY',
          content: JSON.stringify(word)
        }
      });
      totalWordsAdded++;
    }
    console.log(`Đã seed ${lessonData.vocab.length} từ vào bài học orderIndex ${lessonData.orderIndex}`);
  }

  console.log(`\nHoàn thành! Tổng số từ đã thêm: ${totalWordsAdded}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => { console.error(e); prisma.$disconnect(); });

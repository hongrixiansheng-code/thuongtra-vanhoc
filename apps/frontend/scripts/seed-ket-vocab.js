const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node seed-ket-vocab.js <ket-vocab-file.json>');
    process.exit(1);
  }

  const fileName = args[0];
  console.log(`--- START SEEDING KET VOCAB: ${fileName} ---`);

  // Đọc file JSON
  const dataPath = path.join(__dirname, '../../../data', fileName);
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);

  const program = await prisma.program.findUnique({
    where: { code: 'en-ket' }
  });

  if (!program) {
    throw new Error('Program en-ket not found! Did you run seed-ket-lessons.js?');
  }

  // Lặp qua từng bài học trong JSON
  for (const lessonData of data.lessons) {
    // Tìm bài học tương ứng trong DB dựa vào orderIndex
    const lesson = await prisma.lesson.findFirst({
      where: {
        programId: program.id,
        orderIndex: lessonData.orderIndex
      }
    });

    if (!lesson) {
      console.log(`❌ Không tìm thấy Lesson với orderIndex=${lessonData.orderIndex} trong DB.`);
      continue;
    }

    // Chỉ xóa nội dung THEORY cũ (nếu có)
    await prisma.lessonContent.deleteMany({
      where: { 
        lessonId: lesson.id,
        contentType: 'THEORY'
      }
    });

    console.log(`Seeding vocab for: ${lesson.title}`);

    // Seed Vocab
    for (const word of (lessonData.vocab || [])) {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'THEORY',
          content: JSON.stringify(word)
        }
      });
    }
  }

  console.log('--- DONE SEEDING KET VOCAB ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

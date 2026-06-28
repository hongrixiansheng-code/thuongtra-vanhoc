const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(`--- START SEEDING KET EXERCISES ---`);

  const dataPath = path.join(__dirname, '../../../data/ket-exercises.json');
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

    // Xóa nội dung EXERCISE cũ (nếu có)
    await prisma.lessonContent.deleteMany({
      where: { 
        lessonId: lesson.id,
        contentType: 'EXERCISE'
      }
    });

    console.log(`Seeding exercises for: ${lesson.title}`);

    for (const exercise of (lessonData.exercise || [])) {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'EXERCISE',
          content: JSON.stringify(exercise)
        }
      });
    }
  }

  console.log('--- DONE SEEDING KET EXERCISES ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

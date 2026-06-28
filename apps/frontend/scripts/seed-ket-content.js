const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const fileName = process.argv[2];
  if (!fileName) {
    console.error('Vui lòng cung cấp tên file JSON (VD: ket-grammar-cum1.json)');
    process.exit(1);
  }

  console.log(`--- START SEEDING CONTENT: ${fileName} ---`);
  const dataPath = path.join(__dirname, `../../../data/${fileName}`);
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

    console.log(`Seeding content for: ${lesson.title}`);

    // Seed GRAMMAR
    if (lessonData.grammar && lessonData.grammar.length > 0) {
      await prisma.lessonContent.deleteMany({
        where: { lessonId: lesson.id, contentType: 'GRAMMAR' }
      });
      for (const item of lessonData.grammar) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'GRAMMAR',
            content: JSON.stringify(item)
          }
        });
      }
    }

    // Seed DIALOGUE
    if (lessonData.dialogue && lessonData.dialogue.length > 0) {
      await prisma.lessonContent.deleteMany({
        where: { lessonId: lesson.id, contentType: 'DIALOGUE' }
      });
      for (const item of lessonData.dialogue) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'DIALOGUE',
            content: JSON.stringify(item)
          }
        });
      }
    }
  }

  console.log(`--- DONE SEEDING CONTENT: ${fileName} ---`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

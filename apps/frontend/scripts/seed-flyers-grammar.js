const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const fileName = process.argv[2];
  if (!fileName) {
    throw new Error('Please provide the JSON filename as an argument (e.g. node seed-flyers-grammar.js flyers-grammar-cum1.json)');
  }

  console.log(`--- START SEEDING FLYERS GRAMMAR & DIALOGUE: ${fileName} ---`);

  // Đọc file JSON
  const dataPath = path.join(__dirname, '../../../data', fileName);
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);

  const program = await prisma.program.findUnique({
    where: { code: 'en-flyers' }
  });

  if (!program) {
    throw new Error('Program en-flyers not found!');
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

    // CHỈ XÓA GRAMMAR VÀ DIALOGUE CŨ, GIỮ LẠI THEORY (TỪ VỰNG)
    await prisma.lessonContent.deleteMany({
      where: { 
        lessonId: lesson.id,
        contentType: {
          in: ['GRAMMAR', 'DIALOGUE']
        }
      }
    });

    console.log(`Seeding grammar & dialogue for: ${lesson.title}`);

    // Seed Grammar
    for (const grammar of (lessonData.grammar || [])) {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'GRAMMAR',
          content: JSON.stringify(grammar)
        }
      });
    }

    // Seed Dialogue
    for (const dialogue of (lessonData.dialogue || [])) {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'DIALOGUE',
          content: JSON.stringify(dialogue)
        }
      });
    }
  }

  console.log('--- DONE SEEDING GRAMMAR & DIALOGUE ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

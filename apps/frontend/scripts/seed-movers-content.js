const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- START SEEDING MOVERS CONTENT ---');

  // Đọc file JSON
  const dataPath = path.join(__dirname, '../../../data/movers-chuong9-thoi-gian-noi-chon.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);

  const program = await prisma.program.findUnique({
    where: { code: 'en-movers' }
  });

  if (!program) {
    throw new Error('Program en-movers not found!');
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

    // Xóa nội dung cũ (nếu có)
    await prisma.lessonContent.deleteMany({
      where: { lessonId: lesson.id }
    });

    console.log(`Seeding content for: ${lesson.title}`);

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

  console.log('--- DONE SEEDING CONTENT ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

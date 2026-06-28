const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const fileName = process.argv[2];
  if (!fileName) throw new Error('Filename required');

  console.log(`--- SEEDING MOVERS VOCAB: ${fileName} ---`);

  const dataPath = path.join(__dirname, '../../../data', fileName);
  if (!fs.existsSync(dataPath)) {
    console.log(`File ${fileName} not found, skipping.`);
    return;
  }
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);

  const program = await prisma.program.findUnique({ where: { code: 'en-movers' } });
  if (!program) throw new Error('Program en-movers not found!');

  for (const lessonData of data.lessons) {
    const lesson = await prisma.lesson.findFirst({
      where: { programId: program.id, orderIndex: lessonData.orderIndex }
    });

    if (!lesson) {
      console.log(`❌ Lesson ${lessonData.orderIndex} not found in DB.`);
      continue;
    }

    // Seed Vocab (THEORY)
    if (lessonData.vocab && lessonData.vocab.length > 0) {
      await prisma.lessonContent.deleteMany({
        where: { lessonId: lesson.id, contentType: 'THEORY' }
      });
      for (const word of lessonData.vocab) {
        await prisma.lessonContent.create({
          data: { lessonId: lesson.id, contentType: 'THEORY', content: JSON.stringify(word) }
        });
      }
      console.log(`Seeded vocab for lesson orderIndex: ${lessonData.orderIndex}`);
    }
  }
}

main().then(() => prisma.$disconnect()).catch(e => { console.error(e); process.exit(1); });

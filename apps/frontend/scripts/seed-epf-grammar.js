const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const fileName = process.argv[2];
  if (!fileName) {
    console.error('Usage: node seed-epf-grammar.js <epf-stage1-grammar.json | epf-stage2-grammar.json>');
    process.exit(1);
  }

  console.log(`--- START SEEDING EPF GRAMMAR: ${fileName} ---`);

  const dataPath = path.join(__dirname, '../../../data', fileName);
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);

  const program = await prisma.program.findUnique({ where: { code: 'en-epf' } });
  if (!program) {
    throw new Error('Program en-epf not found! Did you run seed-epf-lessons.js?');
  }

  for (const lessonData of data.lessons) {
    const lesson = await prisma.lesson.findFirst({
      where: { programId: program.id, orderIndex: lessonData.orderIndex }
    });

    if (!lesson) {
      console.log(`❌ Không tìm thấy Lesson với orderIndex=${lessonData.orderIndex} trong DB.`);
      continue;
    }

    await prisma.lessonContent.deleteMany({
      where: { lessonId: lesson.id, contentType: 'GRAMMAR' }
    });

    console.log(`Seeding grammar for: ${lesson.title}`);

    for (const item of (lessonData.grammar || [])) {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'GRAMMAR',
          content: JSON.stringify(item)
        }
      });
    }
  }

  console.log('--- DONE SEEDING EPF GRAMMAR ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

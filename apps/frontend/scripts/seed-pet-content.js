const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const fileName = process.argv[2];
  if (!fileName) throw new Error('Filename required');

  console.log(`--- SEEDING PET: ${fileName} ---`);

  const dataPath = path.join(__dirname, '../../../data', fileName);
  if (!fs.existsSync(dataPath)) {
    console.log(`File ${fileName} not found, skipping.`);
    return;
  }
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);

  const program = await prisma.program.findUnique({ where: { code: 'en-pet' } });
  if (!program) throw new Error('Program en-pet not found!');

  for (const lessonData of data.lessons) {
    const lesson = await prisma.lesson.findFirst({
      where: { programId: program.id, orderIndex: lessonData.orderIndex }
    });

    if (!lesson) {
      console.log(`❌ Lesson ${lessonData.orderIndex} not found in DB.`);
      continue;
    }

    // Seed Grammar
    if (lessonData.grammar && lessonData.grammar.length > 0) {
      await prisma.lessonContent.deleteMany({
        where: { lessonId: lesson.id, contentType: 'GRAMMAR' }
      });
      for (const item of lessonData.grammar) {
        await prisma.lessonContent.create({
          data: { lessonId: lesson.id, contentType: 'GRAMMAR', content: JSON.stringify(item) }
        });
      }
      console.log(`Seeded grammar for lesson orderIndex: ${lessonData.orderIndex}`);
    }

    // Seed Dialogue
    const dialogues = lessonData.dialogue || lessonData.dialogues;
    if (dialogues && dialogues.length > 0) {
      await prisma.lessonContent.deleteMany({
        where: { lessonId: lesson.id, contentType: 'DIALOGUE' }
      });
      for (const item of dialogues) {
        await prisma.lessonContent.create({
          data: { lessonId: lesson.id, contentType: 'DIALOGUE', content: JSON.stringify(item) }
        });
      }
      console.log(`Seeded dialogue for lesson orderIndex: ${lessonData.orderIndex}`);
    }
  }
}

main().then(() => prisma.$disconnect()).catch(e => { console.error(e); process.exit(1); });

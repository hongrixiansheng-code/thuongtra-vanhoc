const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-pet' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('Program not found');
    return;
  }

  let count = 0;
  for (const lesson of program.lessons) {
    const dialogues = await prisma.lessonContent.findMany({
      where: {
        lessonId: lesson.id,
        contentType: 'DIALOGUE'
      }
    });

    for (const d of dialogues) {
      const content = JSON.parse(d.content);
      let updated = false;

      // Fix `dialogues` array key to `lines`
      if (content.dialogues && Array.isArray(content.dialogues)) {
        content.lines = content.dialogues.map(item => {
          return {
            speaker: item.speaker,
            text: item.text,
            vi: item.translation || item.vi || "",
            audioUrl: item.audioUrl || ""
          };
        });
        delete content.dialogues;
        updated = true;
      }

      if (updated) {
        await prisma.lessonContent.update({
          where: { id: d.id },
          data: { content: JSON.stringify(content) }
        });
        count++;
        console.log(`Updated dialogue in lesson ${lesson.orderIndex}`);
      }
    }
  }

  console.log(`Successfully fixed ${count} dialogue contents.`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

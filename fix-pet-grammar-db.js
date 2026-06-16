const { PrismaClient } = require('./packages/database/index');
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
    const grammars = await prisma.lessonContent.findMany({
      where: {
        lessonId: lesson.id,
        contentType: 'GRAMMAR'
      }
    });

    for (const g of grammars) {
      const content = JSON.parse(g.content);
      let updated = false;

      // Fix formula
      if (typeof content.formula === 'string') {
        content.formula = [
          { text: content.formula, classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
        ];
        updated = true;
      }

      // Fix practiceList
      if (content.practiceList && Array.isArray(content.practiceList)) {
        content.practiceList = content.practiceList.map(item => {
          if (item.en && item.vi) {
            updated = true;
            return {
              correct: item.en,
              meaning: item.vi
            };
          }
          return item;
        });
      }

      if (updated) {
        await prisma.lessonContent.update({
          where: { id: g.id },
          data: { content: JSON.stringify(content) }
        });
        count++;
        console.log(`Updated grammar in lesson ${lesson.orderIndex}`);
      }
    }
  }

  console.log(`Successfully fixed ${count} grammar contents.`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

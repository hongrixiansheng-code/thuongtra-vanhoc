const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

async function fixMoversGrammar() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-movers' },
    include: { lessons: true }
  });

  if (!program) {
    console.log('Program not found');
    return;
  }

  const lessonIds = program.lessons.map(l => l.id);

  const contents = await prisma.lessonContent.findMany({
    where: {
      lessonId: { in: lessonIds },
      contentType: 'GRAMMAR'
    }
  });

  for (const c of contents) {
    let parsed = {};
    try {
      parsed = JSON.parse(c.content);
    } catch(e) {
      continue;
    }

    if (!parsed.desc && parsed.explanation) {
      const fixed = {
        id: c.id, // Dùng UUID làm id luôn
        title: parsed.title,
        desc: parsed.explanation,
        formula: [
          { text: parsed.structure, classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
        ],
        practiceList: parsed.examples ? parsed.examples.map(ex => ({
          correct: ex.en,
          meaning: ex.vi
        })) : []
      };

      await prisma.lessonContent.update({
        where: { id: c.id },
        data: { content: JSON.stringify(fixed) }
      });
      console.log(`✅ Fixed grammar for: ${fixed.title}`);
    }
  }

  console.log('🎉 Done fixing grammar!');
}

fixMoversGrammar()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

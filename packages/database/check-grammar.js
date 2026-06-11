const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkGrammar() {
  const programs = [
    { name: 'HSK 1 - Cấp độ Cơ bản', key: 'hsk1' },
    { name: 'HSK 2 - Cấp độ Sơ cấp', key: 'hsk2' },
    { name: 'Starters', key: 'en-starters' }
  ];

  for (const prog of programs) {
    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'GRAMMAR',
        lesson: { program: { name: prog.name } }
      }
    });

    const uniqueMap = new Map();
    contents.forEach(c => {
      try {
        const g = JSON.parse(c.content);
        if (g.id && !uniqueMap.has(g.id)) uniqueMap.set(g.id, g);
      } catch {}
    });

    console.log(`${prog.name}: ${uniqueMap.size} ngữ pháp trong DB`);
  }

  await prisma.$disconnect();
}

checkGrammar().catch(console.error);

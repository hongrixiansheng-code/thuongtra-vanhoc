const { PrismaClient } = require('../packages/database/index');
const p = new PrismaClient();

async function main() {
  const lessons = await p.lesson.findMany({
    where: { program: { code: 'en-starters' } },
    orderBy: { orderIndex: 'asc' },
    include: {
      contents: {
        where: { contentType: 'THEORY' }
      }
    }
  });

  for (const lesson of lessons) {
    if (lesson.orderIndex === 9999) continue;
    console.log(`\n=== Lesson ${lesson.orderIndex}: ${lesson.title} ===`);
    lesson.contents.forEach(c => {
      try {
        const data = JSON.parse(c.content);
        console.log(`  - ${data.word} : ${data.meaning}`);
      } catch(e) {}
    });
  }
}

main().finally(() => p.$disconnect());
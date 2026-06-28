const { PrismaClient } = require('database');
const path = require('path');
const dbPath = path.join(process.cwd(), 'packages/database/prisma/dev.db');
const prisma = new PrismaClient({
  datasources: {
    db: { url: 'file:' + dbPath }
  }
});

async function test() {
  const lessons = await prisma.lesson.findMany({ include: { contents: true } });
  let allVocab = [];
  lessons.forEach(l => {
    const vocabContents = l.contents.filter(c => c.contentType === "THEORY");
    vocabContents.forEach(c => {
      try {
        const parsed = JSON.parse(c.content);
        if (Array.isArray(parsed)) {
            parsed.forEach(p => {
                p.lessonId = l.id;
                allVocab.push(p);
            });
        }
      } catch (e) {}
    });
  });
  
  const tings = allVocab.filter(w => w.hanzi === '听');
  console.log("Found '听':", tings.length);
  console.log(tings);
}

test();

const {PrismaClient} = require('../packages/database/index');
const p = new PrismaClient();
['en-movers','en-flyers','en-ket','en-pet'].forEach(async code => {
  const r = await p.lessonContent.findMany({
    where:{ contentType:'GRAMMAR', lesson:{ program:{ code } } },
    include:{ lesson:{ select:{ orderIndex:true } } },
    orderBy:{ lesson:{ orderIndex:'asc' } },
    take: 6
  });
  console.log('\n=== ' + code + ' ===');
  r.forEach(c => {
    const d = JSON.parse(c.content);
    console.log(c.lesson.orderIndex, ':', d.title);
  });
});

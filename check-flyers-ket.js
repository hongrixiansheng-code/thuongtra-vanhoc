const {PrismaClient} = require('./packages/database/index');
const p = new PrismaClient();
['en-flyers','en-ket'].forEach(async code => {
  const r = await p.lessonContent.findMany({
    where:{ contentType:'GRAMMAR', lesson:{ program:{ code } } },
    include:{ lesson:{ select:{ orderIndex:true, title:true } } },
    orderBy:{ lesson:{ orderIndex:'asc' } }
  });
  console.log('\n=== ' + code + ' ===');
  r.forEach(c => {
    const d = JSON.parse(c.content);
    console.log(c.lesson.orderIndex, '-', c.lesson.title, ':', d.title);
  });
});

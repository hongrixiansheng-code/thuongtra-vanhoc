const {PrismaClient} = require('./packages/database/index');
const p = new PrismaClient();
p.lessonContent.findMany({
  where:{ contentType:'GRAMMAR', lesson:{ program:{ code:'en-movers' } } },
  include:{ lesson:{ select:{ orderIndex:true, title:true } } },
  orderBy:{ lesson:{ orderIndex:'asc' } }
}).then(r => {
  r.forEach(c => {
    const d = JSON.parse(c.content);
    console.log(c.lesson.orderIndex, '-', c.lesson.title, ':', d.title);
  });
});

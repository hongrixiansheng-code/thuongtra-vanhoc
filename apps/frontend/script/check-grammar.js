const {PrismaClient} = require('../packages/database/index');
const p = new PrismaClient();
p.lessonContent.findMany({
  where:{ contentType:'GRAMMAR', lesson:{ program:{ code:'en-starters' } } },
  include:{ lesson:{ select:{ title:true, orderIndex:true } } },
  orderBy:{ lesson:{ orderIndex:'asc' } },
  take: 15
}).then(r => r.forEach(c => {
  const d = JSON.parse(c.content);
  console.log(c.lesson.orderIndex, '-', c.lesson.title, ':', d.title);
}));

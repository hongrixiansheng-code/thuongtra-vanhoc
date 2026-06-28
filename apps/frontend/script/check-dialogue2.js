const {PrismaClient} = require('../packages/database/index');
const p = new PrismaClient();
p.lessonContent.findMany({
  where:{ contentType:'DIALOGUE', lesson:{ program:{ code:'en-starters' } } },
  include:{ lesson:{ select:{ orderIndex:true, title:true } } },
  orderBy:{ lesson:{ orderIndex:'asc' } },
  skip: 4,
  take: 8
}).then(r => r.forEach(c => {
  const d = JSON.parse(c.content);
  console.log('\n[Bai', c.lesson.orderIndex, '-', c.lesson.title, ']');
  console.log('Title:', d.title);
  d.lines?.forEach((l,i) => console.log(' ', l.speaker, ':', l.en));
}));

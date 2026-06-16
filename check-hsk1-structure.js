const {PrismaClient} = require('./packages/database/index');
const p = new PrismaClient();
p.lesson.findMany({
  where:{ program:{ code:'hsk1' } },
  orderBy:{ orderIndex:'asc' }
}).then(r => r.forEach(l => console.log(l.orderIndex, '|', l.title, '| theme:', l.theme)));

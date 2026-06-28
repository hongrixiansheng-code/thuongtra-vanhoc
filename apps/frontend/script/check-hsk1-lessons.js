const {PrismaClient} = require('../packages/database/index');
const p = new PrismaClient();
p.lesson.findMany({
  where:{ program:{ code:'hsk1' } },
  include:{ _count:{ select:{ contents:true } } },
  orderBy:{ orderIndex:'asc' },
  take: 5
}).then(r => r.forEach(l => console.log(l.orderIndex, l.title, '| contents:', l._count.contents)));

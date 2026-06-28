const {PrismaClient} = require('../packages/database/index');
const p = new PrismaClient();
p.program.findMany({
  include: { _count: { select: { lessons: true } } }
}).then(r => r.forEach(p => console.log(p.code, '|', p.name, '|', p._count.lessons, 'bài')));

const {PrismaClient} = require('../packages/database/index');
const p = new PrismaClient();
p.userProgress.findMany({
  include: { user: { select: { email: true } }, lesson: { select: { title: true } } }
}).then(r => {
  console.log('Tổng records:', r.length);
  r.forEach(p => console.log('-', p.user.email, '|', p.lesson.title, '| score:', p.score, '| completed:', p.completed));
});

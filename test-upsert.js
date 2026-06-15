const {PrismaClient} = require('./packages/database/index');
const p = new PrismaClient();
p.userProgress.upsert({
  where: { userId_lessonId: { userId: 'test', lessonId: 'test' } },
  update: {},
  create: { userId: 'test', lessonId: 'test', score: 0, completed: false }
}).catch(e => console.log('Lỗi:', e.message)).finally(()=>p.disconnect());

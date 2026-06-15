const {PrismaClient} = require('./packages/database/index');
const p = new PrismaClient();
p.user.findFirst({
  select: { id: true, email: true }
}).then(u => {
  console.log('User:', u);
  if (!u) return;
  return p.userProgress.create({
    data: {
      userId: u.id,
      lessonId: 'c83cf2f3-357c-46df-bc56-2e87837e7263',
      score: 80,
      completed: true,
      completedAt: new Date()
    }
  });
}).then(r => console.log('Created:', r));

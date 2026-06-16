const {PrismaClient} = require('./packages/database/index');
const p = new PrismaClient();
p.lessonContent.findMany({
  where:{ contentType:'GRAMMAR', lesson:{ program:{ code:'en-starters' } } },
  take: 3
}).then(r => r.forEach(c => console.log(JSON.parse(c.content))));

const {PrismaClient} = require('./packages/database/index');
const p = new PrismaClient();
p.lessonContent.count({
  where:{ contentType:'GRAMMAR', lesson:{ program:{ code:'en-starters' } } }
}).then(r => console.log('Total grammar:', r));

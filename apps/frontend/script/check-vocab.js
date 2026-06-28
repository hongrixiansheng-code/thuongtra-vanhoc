const {PrismaClient} = require('../packages/database/index');
const p = new PrismaClient();
p.lessonContent.findMany({
  where:{ contentType:'THEORY', lesson:{ program:{ code:{ contains:'starters' } } } },
  take:5
}).then(r=>r.forEach(c=>console.log(c.content))).finally(()=>p.disconnect());

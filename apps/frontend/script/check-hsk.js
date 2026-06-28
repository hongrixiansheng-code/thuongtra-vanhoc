const {PrismaClient} = require('../packages/database/index');
const p = new PrismaClient();
p.lessonContent.findFirst({
  where:{ contentType:'THEORY', lesson:{ program:{ code:'hsk1' } } }
}).then(r => console.log(r.content));

const {PrismaClient} = require('../packages/database/index');
const p = new PrismaClient();
p.lessonContent.findMany({
  where:{ lesson:{ program:{ code:'hsk1' }, orderIndex:1 }, contentType:{ in:['THEORY','DIALOGUE'] } },
  take: 3
}).then(r => r.forEach(c => console.log(c.contentType, JSON.parse(c.content))));

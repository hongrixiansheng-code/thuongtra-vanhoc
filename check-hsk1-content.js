const {PrismaClient} = require('./packages/database/index');
const p = new PrismaClient();
p.lessonContent.findMany({
  where:{ lesson:{ program:{ code:'hsk1' }, orderIndex:1 } }
}).then(r => {
  const types = {};
  r.forEach(c => { types[c.contentType] = (types[c.contentType]||0)+1; });
  console.log('Bai 1 content types:', types);
  const first = r[0];
  if(first) console.log('Sample:', first.contentType, JSON.parse(first.content));
});

const {PrismaClient} = require('./packages/database/index');
const p = new PrismaClient();
p.lessonContent.findMany({
  where:{ lesson:{ program:{ code:'hsk1' }, orderIndex:1 } }
}).then(r => {
  r.forEach(c => {
    const d = JSON.parse(c.content);
    if(c.contentType === 'THEORY') console.log('THEORY:', d.hanzi, d.pinyin, '-', d.meaning);
    if(c.contentType === 'DIALOGUE') console.log('DIALOGUE:', d.title, '|', d.lines?.length, 'lines');
    if(c.contentType === 'GRAMMAR') console.log('GRAMMAR:', d.title);
  });
});

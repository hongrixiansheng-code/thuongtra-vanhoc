const { PrismaClient } = require('../../../packages/database/index');
const p = new PrismaClient();

async function main() {
  const program = await p.program.findUnique({
    where: { code: 'hsk1' },
    include: {
      lessons: {
        where: { orderIndex: { in: [1, 2] } },
        include: { contents: true },
        orderBy: { orderIndex: 'asc' }
      }
    }
  });

  for (const lesson of program.lessons) {
    console.log('\n====', lesson.title, '====');

    const vocab = lesson.contents
      .filter(c => c.contentType === 'THEORY')
      .map(c => JSON.parse(c.content));
    console.log('Vocab count:', vocab.length);
    console.log('Vocab[0]:', JSON.stringify(vocab[0]));

    const grammar = lesson.contents
      .filter(c => c.contentType === 'GRAMMAR')
      .map(c => JSON.parse(c.content));
    console.log('Grammar count:', grammar.length);
    console.log('Grammar[0].formula[0]:', JSON.stringify(grammar[0]?.formula?.[0]));
    console.log('Grammar[0].practiceList count:', grammar[0]?.practiceList?.length);

    const dialogues = lesson.contents
      .filter(c => c.contentType === 'DIALOGUE')
      .map(c => JSON.parse(c.content));
    console.log('Dialogue count:', dialogues.length);
    if (dialogues[0]) {
      console.log('Dialogue[0].title:', dialogues[0].title);
      console.log('Dialogue[0].lines[0]:', JSON.stringify(dialogues[0].lines[0]));
      console.log('Dialogue[0].lines[1]:', JSON.stringify(dialogues[0].lines[1]));
    }
  }
}

main().finally(() => p.$disconnect());

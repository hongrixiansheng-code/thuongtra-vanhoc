const { PrismaClient } = require('../../../packages/database/index');
const p = new PrismaClient();

async function main() {
  // --- Tầng 1: Subject & Program ---
  const subjects = await p.subject.findMany();
  console.log('=== SUBJECTS ===');
  console.log(JSON.stringify(subjects.map(s => ({ code: s.code, name: s.name })), null, 2));

  const program = await p.program.findUnique({ where: { code: 'hsk1' } });
  console.log('\n=== PROGRAM hsk1 ===');
  console.log('Name:', program?.name, '| isAvailable:', program?.isAvailable);
  console.log('subjectId:', program?.subjectId);

  if (program) {
    const lessonCount = await p.lesson.count({ where: { programId: program.id } });
    console.log('\n=== LESSONS ===');
    console.log('Total:', lessonCount);

    const counts = await p.lessonContent.groupBy({
      by: ['contentType'],
      where: { lesson: { programId: program.id } },
      _count: true
    });
    console.log('\n=== CONTENT COUNTS ===');
    counts.forEach(c => console.log(c.contentType + ':', c._count));

    // Kiểm tra sample THEORY
    const theory = await p.lessonContent.findFirst({
      where: { lesson: { programId: program.id }, contentType: 'THEORY' },
      select: { content: true }
    });
    console.log('\n=== SAMPLE THEORY ===');
    const t = JSON.parse(theory.content);
    console.log('Fields:', Object.keys(t).join(', '));
    console.log('hanzi:', t.hanzi, '| pinyin:', t.pinyin);

    // Kiểm tra sample GRAMMAR
    const grammar = await p.lessonContent.findFirst({
      where: { lesson: { programId: program.id }, contentType: 'GRAMMAR' },
      select: { content: true }
    });
    console.log('\n=== SAMPLE GRAMMAR ===');
    const g = JSON.parse(grammar.content);
    console.log('Fields:', Object.keys(g).join(', '));
    console.log('formula type:', typeof g.formula, '| isArray:', Array.isArray(g.formula));
    if (Array.isArray(g.formula) && g.formula[0]) {
      console.log('formula[0]:', JSON.stringify(g.formula[0]));
    }

    // Kiểm tra sample DIALOGUE
    const dialogue = await p.lessonContent.findFirst({
      where: { lesson: { programId: program.id }, contentType: 'DIALOGUE' },
      select: { content: true }
    });
    console.log('\n=== SAMPLE DIALOGUE ===');
    const d = JSON.parse(dialogue.content);
    console.log('title:', d.title);
    console.log('line[0] fields:', Object.keys(d.lines[0]).join(', '));
    console.log('line[0]:', JSON.stringify(d.lines[0]));
    console.log('line[1]:', JSON.stringify(d.lines[1]));
  }
}

main().finally(() => p.$disconnect());

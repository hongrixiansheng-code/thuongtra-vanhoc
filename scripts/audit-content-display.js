// Data-level audit cho test plan render content (phạm vi: HSK1, Khai Môn, YLE, EPF, Get Ready)
// Chạy: node scripts/audit-content-display.js
const { prisma } = require('../packages/database/index.js');

const SCOPE = ['hsk1', 'khai-mon', 'en-starters', 'en-movers', 'en-flyers', 'en-ket', 'en-pet', 'en-epf', 'ielts-0-4'];
const ZH_PROGRAMS = new Set(['hsk1', 'khai-mon']);

function safeParse(str) {
  try { return JSON.parse(str); } catch { return null; }
}

function checkTheory(item, isZh) {
  const issues = [];
  if (isZh) {
    for (const f of ['hanzi', 'pinyin', 'meaning']) if (!item[f]) issues.push(`thiếu ${f}`);
    if (item.word || item.ipa || item.example_en) issues.push('lẫn field tiếng Anh');
  } else {
    for (const f of ['word', 'meaning']) if (!item[f]) issues.push(`thiếu ${f}`);
    if (item.hanzi || item.pinyin || item.example_zh) issues.push('lẫn field tiếng Trung');
  }
  if (!item.type_short && !isZh === false) {} // checked separately below
  return issues;
}

function checkDialogue(item, isZh) {
  const issues = [];
  if (!item.lines || !Array.isArray(item.lines) || item.lines.length === 0) {
    issues.push('thiếu lines[]');
    return issues;
  }
  for (const [i, line] of item.lines.entries()) {
    if (isZh) {
      if (!line.zh || !line.py || !line.vi) issues.push(`lines[${i}] thiếu zh/py/vi`);
      if (line.en) issues.push(`lines[${i}] lẫn field "en"`);
    } else {
      if (!line.en || !line.vi) issues.push(`lines[${i}] thiếu en/vi`);
      if (line.zh || line.py) issues.push(`lines[${i}] lẫn field zh/py`);
    }
  }
  return issues;
}

function checkGrammar(item) {
  const issues = [];
  if (!item.title) issues.push('thiếu title');
  if (!item.formula || !Array.isArray(item.formula) || item.formula.length === 0) issues.push('thiếu formula[]');
  return issues;
}

async function main() {
  const programs = await prisma.program.findMany({
    where: { code: { in: SCOPE } },
    include: {
      lessons: {
        orderBy: { orderIndex: 'asc' },
        include: { contents: true },
      },
    },
  });

  for (const code of SCOPE) {
    const program = programs.find(p => p.code === code);
    console.log(`\n=== ${code} ===`);
    if (!program) { console.log('  !! Program không tồn tại trong DB'); continue; }
    console.log(`  isAvailable=${program.isAvailable}  lessons=${program.lessons.length}`);

    const isZh = ZH_PROGRAMS.has(code);
    const premiumCount = program.lessons.filter(l => l.isPremium).length;
    console.log(`  isPremium: ${premiumCount}/${program.lessons.length} bài`);

    const typeCoverage = {};
    let fieldIssueCount = 0;
    const fieldIssueSamples = [];

    for (const lesson of program.lessons) {
      const byType = {};
      for (const c of lesson.contents) {
        byType[c.contentType] = (byType[c.contentType] || 0) + 1;
        typeCoverage[c.contentType] = (typeCoverage[c.contentType] || 0) + (byType[c.contentType] === 1 ? 1 : 0);

        const parsed = safeParse(c.content);
        if (!parsed) {
          fieldIssueCount++;
          if (fieldIssueSamples.length < 5) fieldIssueSamples.push(`bài "${lesson.title}" [${c.contentType}]: JSON không parse được`);
          continue;
        }
        let issues = [];
        if (c.contentType === 'THEORY') issues = checkTheory(parsed, isZh);
        else if (c.contentType === 'DIALOGUE') issues = checkDialogue(parsed, isZh);
        else if (c.contentType === 'GRAMMAR') issues = checkGrammar(parsed);

        if (issues.length) {
          fieldIssueCount++;
          if (fieldIssueSamples.length < 5) {
            fieldIssueSamples.push(`bài "${lesson.title}" [${c.contentType}]: ${issues.join(', ')}`);
          }
        }
      }
    }

    console.log(`  Content type coverage (số bài có ≥1 nội dung loại đó / tổng ${program.lessons.length} bài):`);
    for (const t of ['THEORY', 'GRAMMAR', 'DIALOGUE', 'EXERCISE', 'READING', 'LISTENING', 'WRITING', 'SPEAKING']) {
      if (typeCoverage[t]) console.log(`    ${t}: ${typeCoverage[t]}/${program.lessons.length}`);
    }
    console.log(`  Field issues phát hiện: ${fieldIssueCount}`);
    fieldIssueSamples.forEach(s => console.log(`    - ${s}`));
  }

  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });

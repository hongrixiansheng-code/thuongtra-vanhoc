const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const dataDir = 'F:/Projects/ThuongTra-VanHoc/Du_An_HSK1/data';

const PROGRAMS = [
  { name: 'HSK 1 - Cấp độ Cơ bản', grammarFile: 'hsk1-grammar.json' },
  { name: 'HSK 2 - Cấp độ Sơ cấp', grammarFile: 'hsk2-grammar.json' },
  { name: 'Starters', grammarFile: 'en-starters-grammar.json' }
];

async function seedMissingGrammar() {
  for (const prog of PROGRAMS) {
    const grammarFile = path.join(dataDir, prog.grammarFile);
    if (!fs.existsSync(grammarFile)) {
      console.log(`Bỏ qua ${prog.name} - không có file ${prog.grammarFile}`);
      continue;
    }

    const allGrammar = JSON.parse(fs.readFileSync(grammarFile, 'utf8'));
    console.log(`\n${prog.name}: Tổng ${allGrammar.length} ngữ pháp trong file gốc`);

    const program = await prisma.program.findFirst({ where: { name: prog.name } });
    if (!program) {
      console.log(`Không tìm thấy program: ${prog.name}`);
      continue;
    }

    // Lấy tất cả ngữ pháp đã có trong DB
    const existingContents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'GRAMMAR',
        lesson: { programId: program.id }
      }
    });

    const existingIds = new Set();
    existingContents.forEach(c => {
      try {
        const g = JSON.parse(c.content);
        if (g.id) existingIds.add(g.id);
      } catch {}
    });

    console.log(`Đã có trong DB: ${existingIds.size} ngữ pháp`);

    // Lọc ngữ pháp còn thiếu
    const missingGrammar = allGrammar.filter(g => g.id && !existingIds.has(g.id));
    console.log(`Còn thiếu: ${missingGrammar.length} ngữ pháp`);

    if (missingGrammar.length === 0) {
      console.log(`✓ Không cần bổ sung cho ${prog.name}`);
      continue;
    }

    // Dùng bài học từ điển (orderIndex=9999) hoặc tạo mới
    const dictTitle = `📖 Từ điển ${prog.name}`;
    let dictLesson = await prisma.lesson.findFirst({
      where: { programId: program.id, orderIndex: 9999 }
    });

    if (!dictLesson) {
      dictLesson = await prisma.lesson.create({
        data: {
          programId: program.id,
          title: dictTitle,
          orderIndex: 9999
        }
      });
      console.log(`Tạo bài học kho: "${dictTitle}"`);
    }

    for (const grammar of missingGrammar) {
      await prisma.lessonContent.create({
        data: {
          lessonId: dictLesson.id,
          contentType: 'GRAMMAR',
          content: JSON.stringify(grammar)
        }
      });
    }

    console.log(`✓ Đã bổ sung ${missingGrammar.length} ngữ pháp còn thiếu`);
  }

  console.log('\n✅ Hoàn thành bổ sung ngữ pháp còn thiếu!');
}

seedMissingGrammar()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

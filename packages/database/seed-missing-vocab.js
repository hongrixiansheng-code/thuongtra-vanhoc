const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const dataDir = 'F:/Projects/ThuongTra-VanHoc/Du_An_HSK1/data';

const PROGRAMS = [
  {
    name: 'HSK 1 - Cấp độ Cơ bản',
    vocabFile: 'hsk1-vocab.json',
    keyField: 'hanzi'
  },
  {
    name: 'HSK 2 - Cấp độ Sơ cấp',
    vocabFile: 'hsk2-vocab.json',
    keyField: 'hanzi'
  },
  {
    name: 'Starters',
    vocabFile: 'en-starters-vocab.json',
    keyField: 'word'
  }
];

async function seedMissingVocab() {
  for (const prog of PROGRAMS) {
    const vocabFile = path.join(dataDir, prog.vocabFile);
    if (!fs.existsSync(vocabFile)) {
      console.log(`Bỏ qua ${prog.name} - không có file ${prog.vocabFile}`);
      continue;
    }

    const allVocab = JSON.parse(fs.readFileSync(vocabFile, 'utf8'));
    console.log(`\n${prog.name}: Tổng ${allVocab.length} từ trong file gốc`);

    // Lấy program từ DB
    const program = await prisma.program.findFirst({ where: { name: prog.name } });
    if (!program) {
      console.log(`Không tìm thấy program: ${prog.name}`);
      continue;
    }

    // Lấy TẤT CẢ từ vựng hiện có trong DB cho program này
    const existingContents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'THEORY',
        lesson: { programId: program.id }
      }
    });

    // Build set các từ đã có
    const existingKeys = new Set();
    existingContents.forEach(c => {
      try {
        const w = JSON.parse(c.content);
        const key = w[prog.keyField];
        if (key) existingKeys.add(key);
      } catch {}
    });

    console.log(`Đã có trong DB: ${existingKeys.size} từ`);

    // Lọc ra những từ còn thiếu
    const missingVocab = allVocab.filter(w => {
      const key = w[prog.keyField];
      return key && !existingKeys.has(key);
    });

    console.log(`Còn thiếu: ${missingVocab.length} từ`);

    if (missingVocab.length === 0) {
      console.log(`✓ Không cần bổ sung gì thêm cho ${prog.name}`);
      continue;
    }

    // Tạo bài học "Từ điển" đặc biệt để chứa những từ còn thiếu
    const dictLessonTitle = `📖 Từ điển ${prog.name}`;
    let dictLesson = await prisma.lesson.findFirst({
      where: { programId: program.id, title: dictLessonTitle }
    });

    if (!dictLesson) {
      dictLesson = await prisma.lesson.create({
        data: {
          programId: program.id,
          title: dictLessonTitle,
          orderIndex: 9999 // Đặt cuối cùng
        }
      });
      console.log(`Tạo bài học từ điển: "${dictLessonTitle}"`);
    } else {
      // Xóa nội dung cũ trong bài này để tránh trùng
      await prisma.lessonContent.deleteMany({ where: { lessonId: dictLesson.id } });
    }

    // Nạp toàn bộ từ còn thiếu vào bài học từ điển
    for (const word of missingVocab) {
      await prisma.lessonContent.create({
        data: {
          lessonId: dictLesson.id,
          contentType: 'THEORY',
          content: JSON.stringify(word)
        }
      });
    }

    console.log(`✓ Đã bổ sung ${missingVocab.length} từ còn thiếu vào "${dictLessonTitle}"`);
  }

  console.log('\n✅ Hoàn thành bổ sung từ vựng còn thiếu!');
}

seedMissingVocab()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

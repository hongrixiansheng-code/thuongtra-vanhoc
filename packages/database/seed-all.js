const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function seedProgram(dataDir, programName, level, subjectCode, subjectName, filePrefix) {
  const lessonsFile = path.join(dataDir, `${filePrefix}-lessons.json`);
  const vocabFile = path.join(dataDir, `${filePrefix}-vocab.json`);
  const grammarFile = path.join(dataDir, `${filePrefix}-grammar.json`);

  if (!fs.existsSync(lessonsFile)) {
    console.log(`Skipping ${programName} - no lessons file found at ${lessonsFile}`);
    return;
  }

  const lessonsData = JSON.parse(fs.readFileSync(lessonsFile, 'utf8'));
  const vocabData = fs.existsSync(vocabFile) ? JSON.parse(fs.readFileSync(vocabFile, 'utf8')) : [];
  const grammarData = fs.existsSync(grammarFile) ? JSON.parse(fs.readFileSync(grammarFile, 'utf8')) : [];

  console.log(`Bắt đầu nạp dữ liệu: ${programName}...`);

  let subject = await prisma.subject.findUnique({ where: { code: subjectCode } });
  if (!subject) {
    subject = await prisma.subject.create({ data: { name: subjectName, code: subjectCode } });
  }

  let program = await prisma.program.findFirst({ where: { subjectId: subject.id, name: programName } });
  if (!program) {
    program = await prisma.program.create({ data: { name: programName, level: level, subjectId: subject.id } });
  }

  // Clear existing to avoid duplicates
  await prisma.lessonContent.deleteMany({ where: { lesson: { programId: program.id } } });
  await prisma.lesson.deleteMany({ where: { programId: program.id } });

  let totalLessons = 0;
  let totalVocab = 0;
  let totalGrammar = 0;
  let totalDialogues = 0;

  for (const lessonSource of lessonsData) {
    const lesson = await prisma.lesson.create({
      data: {
        programId: program.id,
        title: lessonSource.title,
        orderIndex: lessonSource.id
      }
    });
    totalLessons++;

    // Insert Vocab (support both hanzi for ZH and word for EN)
    const vocabList = lessonSource.vocab_hanzi || lessonSource.vocab_ids || lessonSource.vocab_words;
    if (vocabList) {
      for (const vocabKey of vocabList) {
        const wordDef = vocabData.find(v => v.hanzi === vocabKey || v.id === vocabKey || v.word === vocabKey);
        if (wordDef) {
          await prisma.lessonContent.create({
            data: {
              lessonId: lesson.id,
              contentType: 'THEORY',
              content: JSON.stringify(wordDef)
            }
          });
          totalVocab++;
        }
      }
    }

    // Insert Grammar
    if (lessonSource.grammar_ids) {
      for (const gid of lessonSource.grammar_ids) {
        const gramDef = grammarData.find(g => g.id === gid);
        if (gramDef) {
          await prisma.lessonContent.create({
            data: {
              lessonId: lesson.id,
              contentType: 'GRAMMAR',
              content: JSON.stringify(gramDef)
            }
          });
          totalGrammar++;
        }
      }
    }

    // Insert Dialogues (support dialogues or passages)
    const texts = lessonSource.dialogues || lessonSource.passages;
    if (texts && texts.length > 0) {
      for (const text of texts) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'DIALOGUE',
            content: JSON.stringify(text)
          }
        });
        totalDialogues++;
      }
    }
  }
  
  console.log(`Đã nạp ${programName}: ${totalLessons} Bài học, ${totalVocab} Từ vựng, ${totalGrammar} Ngữ pháp, ${totalDialogues} Đoạn văn/Hội thoại.`);
}

async function main() {
  const dataDir = 'F:/Projects/ThuongTra-VanHoc/Du_An_HSK1/data';

  await seedProgram(dataDir, 'HSK 1 - Cấp độ Cơ bản', 1, 'ZH', 'Tiếng Trung', 'hsk1');
  await seedProgram(dataDir, 'HSK 2 - Cấp độ Sơ cấp', 2, 'ZH', 'Tiếng Trung', 'hsk2');
  await seedProgram(dataDir, 'Starters', 1, 'EN', 'Tiếng Anh', 'en-starters');

  console.log('Hoàn thành toàn bộ seed!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

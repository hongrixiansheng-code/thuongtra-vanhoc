const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const dataDir = 'F:/Projects/ThuongTra-VanHoc/Du_An_HSK1/data';
  const lessonsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'hsk1-lessons.json'), 'utf8'));
  const vocabData = JSON.parse(fs.readFileSync(path.join(dataDir, 'hsk1-vocab.json'), 'utf8'));
  const grammarData = JSON.parse(fs.readFileSync(path.join(dataDir, 'hsk1-grammar.json'), 'utf8'));

  console.log('Bắt đầu nạp 100% dữ liệu HSK 1...');

  let subject = await prisma.subject.findUnique({ where: { code: 'ZH' } });
  if (!subject) {
    subject = await prisma.subject.create({ data: { name: 'Tiếng Trung', code: 'ZH' } });
  }

  let program = await prisma.program.findFirst({ where: { subjectId: subject.id, name: 'HSK 1 - Cấp độ Cơ bản' } });
  if (!program) {
    program = await prisma.program.create({ data: { name: 'HSK 1 - Cấp độ Cơ bản', level: 1, subjectId: subject.id } });
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

    // Insert Vocab
    if (lessonSource.vocab_hanzi) {
      for (const wordHanzi of lessonSource.vocab_hanzi) {
        const wordDef = vocabData.find(v => v.hanzi === wordHanzi);
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

    // Insert Dialogues
    if (lessonSource.dialogues && lessonSource.dialogues.length > 0) {
      for (const dialogue of lessonSource.dialogues) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'DIALOGUE',
            content: JSON.stringify(dialogue)
          }
        });
        totalDialogues++;
      }
    }
  }
  
  console.log(`Đã nạp thành công: ${totalLessons} Bài học, ${totalVocab} Từ vựng, ${totalGrammar} Ngữ pháp, ${totalDialogues} Hội thoại vào CSDL SQLite!`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

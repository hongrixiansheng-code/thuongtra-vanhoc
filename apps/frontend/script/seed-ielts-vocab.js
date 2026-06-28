const { PrismaClient } = require('../packages/database/index');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const cumFile = args[0] || 'ielts-vocab-cum1.json';
  
  console.log(`🔄 Bắt đầu nạp từ vựng từ file: ${cumFile}`);

  const program = await prisma.program.findUnique({
    where: { code: 'ielts-0-4' }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program IELTS 0-4.0 (code: ielts-0-4).');
    return;
  }

  const dataPath = path.join(__dirname, '../data', cumFile);
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Không tìm thấy file ${dataPath}`);
    return;
  }

  const batches = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  for (const batch of batches) {
    const orderIndex = batch.lessonOrder;
    const vocabList = batch.vocab;

    const lesson = await prisma.lesson.findFirst({
      where: { programId: program.id, orderIndex: orderIndex }
    });

    if (!lesson) {
      console.warn(`⚠️ Không tìm thấy bài học có orderIndex=${orderIndex}. Bỏ qua.`);
      continue;
    }

    let addedCount = 0;
    for (const vocab of vocabList) {
      // Kiểm tra xem từ này đã tồn tại trong bài học chưa (dựa vào trường word)
      const existingContent = await prisma.lessonContent.findFirst({
        where: {
          lessonId: lesson.id,
          contentType: 'THEORY',
          content: { contains: `"word":"${vocab.word}"` }
        }
      });

      if (!existingContent) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'THEORY',
            content: JSON.stringify(vocab)
          }
        });
        addedCount++;
      }
    }
    console.log(`✅ Bài ${orderIndex} (${lesson.title}): Thêm mới ${addedCount}/${vocabList.length} từ vựng.`);
  }

  console.log('🎉 Hoàn tất nạp từ vựng!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

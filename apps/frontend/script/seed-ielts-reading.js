const { PrismaClient } = require('database');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const cumFile = args[0] || 'ielts-reading-cum1.json';

  console.log(`🔄 Bắt đầu nạp bài đọc (Reading) từ file: ${cumFile}`);

  const program = await prisma.program.findUnique({
    where: { code: 'ielts-0-4' }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program IELTS 0-4.0 (code: ielts-0-4).');
    return;
  }

  const dataPath = path.join(__dirname, '../../../data', cumFile);
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Không tìm thấy file ${dataPath}`);
    return;
  }

  const batches = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  for (const batch of batches) {
    const orderIndex = batch.lessonOrder;
    const readingList = batch.reading;

    const lesson = await prisma.lesson.findFirst({
      where: { programId: program.id, orderIndex: orderIndex }
    });

    if (!lesson) {
      console.warn(`⚠️ Không tìm thấy bài học có orderIndex=${orderIndex}. Bỏ qua.`);
      continue;
    }

    let addedCount = 0;
    for (const reading of readingList) {
      const existingContent = await prisma.lessonContent.findFirst({
        where: {
          lessonId: lesson.id,
          contentType: 'READING',
          content: { contains: `"title":"${reading.title}"` }
        }
      });

      if (!existingContent) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'READING',
            content: JSON.stringify(reading)
          }
        });
        addedCount++;
      }
    }
    console.log(`✅ Bài ${orderIndex} (${lesson.title}): Thêm mới ${addedCount}/${readingList.length} bài đọc.`);
  }

  console.log('🎉 Hoàn tất nạp Reading!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

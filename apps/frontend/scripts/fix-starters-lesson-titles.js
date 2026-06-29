// Khắc phục: 25 tiêu đề lesson của en-starters không khớp nội dung thật
// (vocab/grammar/dialogue nhất quán với nhau theo thứ tự tự nhiên, chỉ title bị sai).
// Chỉ UPDATE field title, không đụng content/Lesson khác.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CORRECT_TOPICS = [
  'Hello!',
  'My Family',
  'My Body',
  'Colours',
  'Numbers',
  'Animals',
  'Zoo Animals',
  'Fruit and Food',
  'Food and Drink',
  'My Home',
  'Furniture',
  'At School',
  'School Things',
  'Clothes',
  'Sports',
  'Toys and Hobbies',
  'Transport',
  'Places in Town',
  'Weather and Seasons',
  'Days and Months',
  'Nature',
  'Action Verbs 1',
  'Action Verbs 2',
  'Describing Things',
  'Feelings',
];

async function main() {
  console.log('🔧 Sửa lại tiêu đề 50 bài en-starters...\n');

  const program = await prisma.program.findUnique({ where: { code: 'en-starters' } });
  if (!program) throw new Error('❌ Không tìm thấy Program en-starters');

  const lessons = await prisma.lesson.findMany({
    where: { programId: program.id, orderIndex: { not: 9999 } },
    select: { id: true, orderIndex: true, title: true }
  });
  const lessonByOrderIndex = {};
  lessons.forEach((l) => { lessonByOrderIndex[l.orderIndex] = l; });

  let updated = 0;
  for (let n = 1; n <= 25; n++) {
    const topic = CORRECT_TOPICS[n - 1];
    for (let half = 0; half < 2; half++) {
      const orderIndex = (n - 1) * 2 + half + 1;
      const lesson = lessonByOrderIndex[orderIndex];
      if (!lesson) {
        console.warn(`⚠️  Không tìm thấy lesson orderIndex=${orderIndex}`);
        continue;
      }
      const newTitle = `Lesson ${n}: ${topic} — Phần ${half + 1}`;
      await prisma.lesson.update({ where: { id: lesson.id }, data: { title: newTitle } });
      console.log(`   ✔ [${String(orderIndex).padStart(2, '0')}] "${lesson.title}" → "${newTitle}"`);
      updated++;
    }
  }

  console.log(`\n✅ Đã cập nhật ${updated} tiêu đề lesson.`);
}

main()
  .catch((e) => {
    console.error('\n❌ Lỗi:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

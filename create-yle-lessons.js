const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const NEW_LESSONS = [
  { orderIndex: 17, title: "Lesson 17: Transport",        theme: "Phương tiện giao thông" },
  { orderIndex: 18, title: "Lesson 18: Places in Town",   theme: "Địa điểm trong thị trấn" },
  { orderIndex: 19, title: "Lesson 19: Weather",          theme: "Thời tiết & Mùa" },
  { orderIndex: 20, title: "Lesson 20: Days & Months",    theme: "Ngày trong tuần & Tháng" },
  { orderIndex: 21, title: "Lesson 21: Nature",           theme: "Thiên nhiên" },
  { orderIndex: 22, title: "Lesson 22: Action Verbs 1",   theme: "Động từ hành động 1" },
  { orderIndex: 23, title: "Lesson 23: Action Verbs 2",   theme: "Động từ hành động 2" },
  { orderIndex: 24, title: "Lesson 24: Describing Things",theme: "Mô tả sự vật" },
  { orderIndex: 25, title: "Lesson 25: Feelings",         theme: "Cảm xúc & Tính cách" },
];

async function main() {
  const program = await prisma.program.findFirst({
    where: { code: { contains: 'starters' } }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program Starters!');
    return;
  }

  console.log(`✅ Program: ${program.name}\n`);

  for (const lesson of NEW_LESSONS) {
    const existing = await prisma.lesson.findFirst({
      where: { programId: program.id, orderIndex: lesson.orderIndex }
    });

    if (existing) {
      console.log(`⏭️  Bài ${lesson.orderIndex} đã tồn tại, bỏ qua.`);
      continue;
    }

    await prisma.lesson.create({
      data: {
        programId: program.id,
        title: lesson.title,
        theme: lesson.theme,
        orderIndex: lesson.orderIndex,
        isPremium: false
      }
    });
    console.log(`✅ Tạo: ${lesson.title}`);
  }

  console.log('\n🎉 Hoàn thành tạo bài học mới!');
}

main().finally(() => prisma.$disconnect());
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const MOVERS_LESSONS = [
  { orderIndex: 1, title: "Lesson 1: My Family and Friends", theme: "Gia đình và bạn bè" },
  { orderIndex: 2, title: "Lesson 2: The Body and Face", theme: "Cơ thể và khuôn mặt" },
  { orderIndex: 3, title: "Lesson 3: Health and Illnesses", theme: "Sức khỏe và ốm đau" },
  { orderIndex: 4, title: "Lesson 4: Animals in the Wild", theme: "Động vật hoang dã" },
  { orderIndex: 5, title: "Lesson 5: Animals on the Farm and Pets", theme: "Động vật nông trại & Thú cưng" },
  { orderIndex: 6, title: "Lesson 6: Food and Drink 1", theme: "Đồ ăn và thức uống 1" },
  { orderIndex: 7, title: "Lesson 7: Food and Drink 2", theme: "Đồ ăn và thức uống 2" },
  { orderIndex: 8, title: "Lesson 8: Clothes and Accessories", theme: "Quần áo và phụ kiện" },
  { orderIndex: 9, title: "Lesson 9: At Home 1", theme: "Nhà cửa và phòng ốc" },
  { orderIndex: 10, title: "Lesson 10: At Home 2 (Materials)", theme: "Vật liệu trong nhà" },
  { orderIndex: 11, title: "Lesson 11: Places in the Town", theme: "Các địa điểm trong thị trấn" },
  { orderIndex: 12, title: "Lesson 12: Directions and Locations", theme: "Phương hướng và vị trí" },
  { orderIndex: 13, title: "Lesson 13: Transport and Travel", theme: "Giao thông và đi lại" },
  { orderIndex: 14, title: "Lesson 14: Time and Days", theme: "Thời gian và ngày tháng" },
  { orderIndex: 15, title: "Lesson 15: The Weather", theme: "Thời tiết" },
  { orderIndex: 16, title: "Lesson 16: At School", theme: "Tại trường học" },
  { orderIndex: 17, title: "Lesson 17: Sports and Leisure 1", theme: "Thể thao và giải trí 1" },
  { orderIndex: 18, title: "Lesson 18: Sports and Leisure 2", theme: "Thể thao và giải trí 2" },
  { orderIndex: 19, title: "Lesson 19: Work and Jobs", theme: "Công việc và nghề nghiệp" },
  { orderIndex: 20, title: "Lesson 20: Numbers (21 to 100)", theme: "Số đếm từ 21 đến 100" },
  { orderIndex: 21, title: "Lesson 21: The World Around Us 1", theme: "Thế giới quanh ta 1" },
  { orderIndex: 22, title: "Lesson 22: The World Around Us 2", theme: "Thế giới quanh ta 2" },
  { orderIndex: 23, title: "Lesson 23: Describing Things", theme: "Tính từ miêu tả sự vật" },
  { orderIndex: 24, title: "Lesson 24: Describing Feelings", theme: "Tính từ chỉ cảm xúc" },
  { orderIndex: 25, title: "Lesson 25: Final Review - Movers", theme: "Ôn tập tổng hợp Movers" }
];

async function main() {
  // 1. Lấy subject tiếng Anh
  const subject = await prisma.subject.findUnique({
    where: { code: 'EN' }
  });

  if (!subject) {
    console.error('❌ Không tìm thấy Subject Tiếng Anh (code: "EN")!');
    return;
  }

  // 2. Tạo hoặc tìm Program Movers
  let program = await prisma.program.findUnique({
    where: { code: 'en-movers' }
  });

  if (!program) {
    program = await prisma.program.create({
      data: {
        subjectId: subject.id,
        name: 'Cambridge YLE Movers',
        code: 'en-movers',
        level: 2,
        isAvailable: true
      }
    });
    console.log('✅ Đã tạo Program mới: Cambridge YLE Movers');
  } else {
    console.log(`✅ Program: ${program.name}`);
  }

  // 3. Tạo các bài học
  for (const lesson of MOVERS_LESSONS) {
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

  console.log('\n🎉 Hoàn thành tạo danh sách bài học Movers!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

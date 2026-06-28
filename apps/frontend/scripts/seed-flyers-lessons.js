const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const flyersLessons = [
  { orderIndex: 0, title: "Bài 1: Gia đình & cơ thể", theme: "Bản thân, gia đình, sức khỏe & ngoại hình" },
  { orderIndex: 1, title: "Bài 2: Sức khỏe", theme: "Bản thân, gia đình, sức khỏe & ngoại hình" },
  { orderIndex: 2, title: "Bài 3.a: Tính từ thường gặp (1/4)", theme: "Tính từ thường gặp" },
  { orderIndex: 3, title: "Bài 3.b: Tính từ thường gặp (2/4)", theme: "Tính từ thường gặp" },
  { orderIndex: 4, title: "Bài 3.c: Tính từ thường gặp (3/4)", theme: "Tính từ thường gặp" },
  { orderIndex: 5, title: "Bài 3.d: Tính từ thường gặp (4/4)", theme: "Tính từ thường gặp" },
  { orderIndex: 6, title: "Bài 4.a: Quần áo (1/2)", theme: "Quần áo, màu sắc & vật liệu" },
  { orderIndex: 7, title: "Bài 4.b: Quần áo (2/2)", theme: "Quần áo, màu sắc & vật liệu" },
  { orderIndex: 8, title: "Bài 5: Vật liệu & màu sắc", theme: "Quần áo, màu sắc & vật liệu" },
  { orderIndex: 9, title: "Bài 6.a: Đồ ăn thức uống (1/2)", theme: "Đồ ăn thức uống" },
  { orderIndex: 10, title: "Bài 6.b: Đồ ăn thức uống (2/2)", theme: "Đồ ăn thức uống" },
  { orderIndex: 11, title: "Bài 7.a: Ngôi nhà (1/2)", theme: "Ngôi nhà" },
  { orderIndex: 12, title: "Bài 7.b: Ngôi nhà (2/2)", theme: "Ngôi nhà" },
  { orderIndex: 13, title: "Bài 8.a: Trường học (1/2)", theme: "Trường học" },
  { orderIndex: 14, title: "Bài 8.b: Trường học (2/2)", theme: "Trường học" },
  { orderIndex: 15, title: "Bài 9: Động vật", theme: "Động vật & thế giới quanh ta" },
  { orderIndex: 16, title: "Bài 10.a: Thế giới quanh ta (1/2)", theme: "Động vật & thế giới quanh ta" },
  { orderIndex: 17, title: "Bài 10.b: Thế giới quanh ta (2/2)", theme: "Động vật & thế giới quanh ta" },
  { orderIndex: 18, title: "Bài 11.a: Sở thích & giải trí (1/3)", theme: "Sở thích, giải trí & phương tiện" },
  { orderIndex: 19, title: "Bài 11.b: Sở thích & giải trí (2/3)", theme: "Sở thích, giải trí & phương tiện" },
  { orderIndex: 20, title: "Bài 11.c: Sở thích & giải trí (3/3)", theme: "Sở thích, giải trí & phương tiện" },
  { orderIndex: 21, title: "Bài 12.a: Phương tiện (1/2)", theme: "Sở thích, giải trí & phương tiện" },
  { orderIndex: 22, title: "Bài 12.b: Phương tiện (2/2)", theme: "Sở thích, giải trí & phương tiện" },
  { orderIndex: 23, title: "Bài 13.a: Nơi chốn & phương hướng (1/3)", theme: "Nơi chốn & nghề nghiệp" },
  { orderIndex: 24, title: "Bài 13.b: Nơi chốn & phương hướng (2/3)", theme: "Nơi chốn & nghề nghiệp" },
  { orderIndex: 25, title: "Bài 13.c: Nơi chốn & phương hướng (3/3)", theme: "Nơi chốn & nghề nghiệp" },
  { orderIndex: 26, title: "Bài 14.a: Nghề nghiệp (1/2)", theme: "Nơi chốn & nghề nghiệp" },
  { orderIndex: 27, title: "Bài 14.b: Nghề nghiệp (2/2)", theme: "Nơi chốn & nghề nghiệp" },
  { orderIndex: 28, title: "Bài 15.a: Thời gian (1/3)", theme: "Thời gian, động từ & khái niệm trừu tượng" },
  { orderIndex: 29, title: "Bài 15.b: Thời gian (2/3)", theme: "Thời gian, động từ & khái niệm trừu tượng" },
  { orderIndex: 30, title: "Bài 15.c: Thời gian (3/3)", theme: "Thời gian, động từ & khái niệm trừu tượng" },
  { orderIndex: 31, title: "Bài 16.a: Động từ thường gặp (1/5)", theme: "Thời gian, động từ & khái niệm trừu tượng" },
  { orderIndex: 32, title: "Bài 16.b: Động từ thường gặp (2/5)", theme: "Thời gian, động từ & khái niệm trừu tượng" },
  { orderIndex: 33, title: "Bài 16.c: Động từ thường gặp (3/5)", theme: "Thời gian, động từ & khái niệm trừu tượng" },
  { orderIndex: 34, title: "Bài 16.d: Động từ thường gặp (4/5)", theme: "Thời gian, động từ & khái niệm trừu tượng" },
  { orderIndex: 35, title: "Bài 16.e: Động từ thường gặp (5/5)", theme: "Thời gian, động từ & khái niệm trừu tượng" },
  { orderIndex: 36, title: "Bài 17: Số lượng lớn & khái niệm trừu tượng", theme: "Thời gian, động từ & khái niệm trừu tượng" }
];

async function main() {
  console.log('--- START SEEDING FLYERS LESSONS ---');

  // Đảm bảo Program en-flyers tồn tại
  let program = await prisma.program.findUnique({ where: { code: 'en-flyers' } });
  if (!program) {
    program = await prisma.program.create({
      data: {
        code: 'en-flyers',
        title: 'Cambridge YLE Flyers (A2)',
        description: 'Chương trình tiếng Anh cấp độ A2 Flyers.',
        orderIndex: 4, // Movers là 3, Flyers là 4? Tùy thuộc vào DB
        isActive: true
      }
    });
    console.log('Created Program: en-flyers');
  } else {
    console.log('Program en-flyers already exists');
  }

  // Xóa contents và progress cũ để tránh lỗi foreign key
  const existingLessons = await prisma.lesson.findMany({ where: { programId: program.id } });
  const lessonIds = existingLessons.map(l => l.id);
  await prisma.lessonContent.deleteMany({ where: { lessonId: { in: lessonIds } } });
  await prisma.userProgress.deleteMany({ where: { lessonId: { in: lessonIds } } });
  console.log('Deleted existing lesson contents and progress for Flyers (if any)');

  // Xóa lessons cũ nếu có để tránh trùng lặp
  await prisma.lesson.deleteMany({ where: { programId: program.id } });
  console.log('Deleted existing lessons for Flyers (if any)');

  // Tạo lại 37 lessons
  for (const lesson of flyersLessons) {
    await prisma.lesson.create({
      data: {
        programId: program.id,
        orderIndex: lesson.orderIndex,
        title: lesson.title,
        theme: lesson.theme,
        isPremium: false // Set default
      }
    });
    console.log(`Created lesson: ${lesson.title}`);
  }

  console.log('--- DONE SEEDING FLYERS LESSONS ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

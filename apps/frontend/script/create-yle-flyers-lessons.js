const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

async function main() {
  // 1. Lấy hoặc tạo Subject EN
  let subject = await prisma.subject.findUnique({ where: { code: 'EN' } });
  if (!subject) {
    subject = await prisma.subject.create({
      data: {
        code: 'EN',
        name: 'Tiếng Anh',
        description: 'Chương trình học tiếng Anh'
      }
    });
  }

  // 2. Tạo Program Flyers
  const program = await prisma.program.upsert({
    where: { code: 'en-flyers' },
    update: {},
    create: {
      code: 'en-flyers',
      name: 'Cambridge YLE Flyers',
      subjectId: subject.id,
      level: 3
    }
  });
  console.log('✅ Upserted Program: Flyers');

  // 3. Khởi tạo 25 bài học
  const lessons = [
    { title: "Lesson 1: Friends and Family", theme: "Gia đình và bạn bè" },
    { title: "Lesson 2: Body and Face", theme: "Cơ thể và khuôn mặt" },
    { title: "Lesson 3: Clothes", theme: "Quần áo" },
    { title: "Lesson 4: Health", theme: "Sức khỏe" },
    { title: "Lesson 5: Animals", theme: "Động vật" },
    { title: "Lesson 6: Food and Drink", theme: "Đồ ăn thức uống" },
    { title: "Lesson 7: School", theme: "Trường học" },
    { title: "Lesson 8: Jobs and Work", theme: "Công việc" },
    { title: "Lesson 9: Sports and Leisure", theme: "Thể thao và giải trí" },
    { title: "Lesson 10: The Home", theme: "Nhà cửa" },
    { title: "Lesson 11: The Town", theme: "Thị trấn" },
    { title: "Lesson 12: Transport", theme: "Giao thông" },
    { title: "Lesson 13: Time and Weather", theme: "Thời gian và thời tiết" },
    { title: "Lesson 14: The World Around Us", theme: "Thế giới quanh ta" },
    { title: "Lesson 15: Holidays and Travel", theme: "Kỳ nghỉ và du lịch" },
    { title: "Lesson 16: Technology and Communications", theme: "Công nghệ và giao tiếp" },
    { title: "Lesson 17: Materials", theme: "Chất liệu" },
    { title: "Lesson 18: Directions and Places", theme: "Phương hướng và địa điểm" },
    { title: "Lesson 19: Entertainment", theme: "Giải trí" },
    { title: "Lesson 20: Space", theme: "Vũ trụ" },
    { title: "Lesson 21: Adjectives", theme: "Tính từ mô tả" },
    { title: "Lesson 22: Feelings", theme: "Cảm xúc" },
    { title: "Lesson 23: Action Verbs 1", theme: "Động từ hành động 1" },
    { title: "Lesson 24: Action Verbs 2", theme: "Động từ hành động 2" },
    { title: "Lesson 25: Final Review - Flyers", theme: "Ôn tập cuối khóa" }
  ];

  for (let i = 0; i < lessons.length; i++) {
    const l = lessons[i];
    let existingLesson = await prisma.lesson.findFirst({
      where: {
        programId: program.id,
        orderIndex: i + 1
      }
    });

    if (existingLesson) {
      await prisma.lesson.update({
        where: { id: existingLesson.id },
        data: { title: l.title, theme: l.theme, isPremium: i >= 5 }
      });
    } else {
      await prisma.lesson.create({
        data: {
          programId: program.id,
          title: l.title,
          theme: l.theme,
          orderIndex: i + 1,
          isPremium: i >= 5
        }
      });
    }
    console.log(`✅ Created/Updated Lesson ${i+1}: ${l.title}`);
  }

  // Bài học dùng để làm kho từ vựng tổng
  let existingVocab = await prisma.lesson.findFirst({
    where: { programId: program.id, orderIndex: 9999 }
  });
  if (existingVocab) {
    await prisma.lesson.update({
      where: { id: existingVocab.id },
      data: { title: 'Kho từ vựng Flyers', theme: 'Từ vựng tổng hợp', isPremium: true }
    });
  } else {
    await prisma.lesson.create({
      data: {
        programId: program.id,
        title: 'Kho từ vựng Flyers',
        theme: 'Từ vựng tổng hợp',
        orderIndex: 9999,
        isPremium: true
      }
    });
  }

  console.log('🎉 Hoàn thành khởi tạo cấu trúc khóa học Flyers!');
}

main().catch(console.error).finally(() => prisma.$disconnect());

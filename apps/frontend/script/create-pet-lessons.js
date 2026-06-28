/**
 * TẠO CHƯƠNG TRÌNH VÀ BÀI HỌC CHO CAMBRIDGE B1 PRELIMINARY (PET)
 * Chạy lệnh: node create-pet-lessons.js
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Bắt đầu khởi tạo dữ liệu chương trình Cambridge B1 Preliminary (PET)...');

  let subject = await prisma.subject.findUnique({ where: { code: 'EN' } });
  if (!subject) {
    subject = await prisma.subject.create({
      data: { code: 'EN', name: 'Tiếng Anh', description: 'Chương trình học tiếng Anh' }
    });
  }

  // 1. Tạo hoặc cập nhật Program
  const program = await prisma.program.findFirst({ where: { code: 'en-pet' } });
  let programId;

  if (program) {
    programId = program.id;
    await prisma.program.update({
      where: { id: program.id },
      data: { name: 'Cambridge B1 Preliminary', level: 5 }
    });
  } else {
    const newProgram = await prisma.program.create({
      data: {
        code: 'en-pet',
        name: 'Cambridge B1 Preliminary',
        subjectId: subject.id,
        level: 5,
        isAvailable: true
      }
    });
    programId = newProgram.id;
  }

  console.log(`✅ Đã tạo/cập nhật Program: Cambridge B1 Preliminary`);

  // 2. Danh sách 25 bài học cho PET
  const lessonsData = [
    // Theme 1: Personal Identity & Daily Life
    { orderIndex: 1, title: 'Lesson 1: Daily Routine & Habits', theme: 'ĐỜI SỐNG CÁ NHÂN' },
    { orderIndex: 2, title: 'Lesson 2: Describing People & Personality', theme: 'ĐỜI SỐNG CÁ NHÂN' },
    { orderIndex: 3, title: 'Lesson 3: Health & Fitness', theme: 'ĐỜI SỐNG CÁ NHÂN' },
    { orderIndex: 4, title: 'Lesson 4: Shopping & Consumerism', theme: 'ĐỜI SỐNG CÁ NHÂN' },
    { orderIndex: 5, title: 'Lesson 5: Housing & Living Space', theme: 'ĐỜI SỐNG CÁ NHÂN' },

    // Theme 2: Society & Culture
    { orderIndex: 6, title: 'Lesson 6: Food, Drink & Restaurants', theme: 'XÃ HỘI VÀ VĂN HÓA' },
    { orderIndex: 7, title: 'Lesson 7: Traditions & Festivals', theme: 'XÃ HỘI VÀ VĂN HÓA' },
    { orderIndex: 8, title: 'Lesson 8: Education & Learning', theme: 'XÃ HỘI VÀ VĂN HÓA' },
    { orderIndex: 9, title: 'Lesson 9: Relationships & Communication', theme: 'XÃ HỘI VÀ VĂN HÓA' },
    { orderIndex: 10, title: 'Lesson 10: Crime & Punishment', theme: 'XÃ HỘI VÀ VĂN HÓA' },

    // Theme 3: Environment & The World
    { orderIndex: 11, title: 'Lesson 11: The Natural World & Weather', theme: 'MÔI TRƯỜNG VÀ THẾ GIỚI' },
    { orderIndex: 12, title: 'Lesson 12: Geography & Landscapes', theme: 'MÔI TRƯỜNG VÀ THẾ GIỚI' },
    { orderIndex: 13, title: 'Lesson 13: Travel & Tourism', theme: 'MÔI TRƯỜNG VÀ THẾ GIỚI' },
    { orderIndex: 14, title: 'Lesson 14: Transport & Getting Around', theme: 'MÔI TRƯỜNG VÀ THẾ GIỚI' },
    { orderIndex: 15, title: 'Lesson 15: Environmental Issues & Solutions', theme: 'MÔI TRƯỜNG VÀ THẾ GIỚI' },

    // Theme 4: Entertainment & Media
    { orderIndex: 16, title: 'Lesson 16: Hobbies & Leisure Activities', theme: 'GIẢI TRÍ VÀ TRUYỀN THÔNG' },
    { orderIndex: 17, title: 'Lesson 17: Sports & Competitions', theme: 'GIẢI TRÍ VÀ TRUYỀN THÔNG' },
    { orderIndex: 18, title: 'Lesson 18: Film, Theatre & Music', theme: 'GIẢI TRÍ VÀ TRUYỀN THÔNG' },
    { orderIndex: 19, title: 'Lesson 19: The Media & News', theme: 'GIẢI TRÍ VÀ TRUYỀN THÔNG' },
    { orderIndex: 20, title: 'Lesson 20: Technology & The Internet', theme: 'GIẢI TRÍ VÀ TRUYỀN THÔNG' },

    // Theme 5: Work & Future Aspirations
    { orderIndex: 21, title: 'Lesson 21: Work, Jobs & Careers', theme: 'CÔNG VIỆC VÀ TƯƠNG LAI' },
    { orderIndex: 22, title: 'Lesson 22: Business & Industry', theme: 'CÔNG VIỆC VÀ TƯƠNG LAI' },
    { orderIndex: 23, title: 'Lesson 23: Money & Finance', theme: 'CÔNG VIỆC VÀ TƯƠNG LAI' },
    { orderIndex: 24, title: 'Lesson 24: Ambitions & Future Plans', theme: 'CÔNG VIỆC VÀ TƯƠNG LAI' },
    { orderIndex: 25, title: 'Lesson 25: Final Review & Exam Practice', theme: 'CÔNG VIỆC VÀ TƯƠNG LAI' }
  ];

  for (const item of lessonsData) {
    let existingLesson = await prisma.lesson.findFirst({
      where: {
        programId: programId,
        orderIndex: item.orderIndex
      }
    });

    if (existingLesson) {
      await prisma.lesson.update({
        where: { id: existingLesson.id },
        data: { title: item.title, theme: item.theme, isPremium: item.orderIndex > 5 }
      });
    } else {
      await prisma.lesson.create({
        data: {
          programId: programId,
          orderIndex: item.orderIndex,
          title: item.title,
          theme: item.theme,
          isPremium: item.orderIndex > 5
        }
      });
    }
  }

  // Tạo một bài học ẩn (orderIndex = 9999) để làm "Kho từ vựng" của toàn chương trình
  let existingVocab = await prisma.lesson.findFirst({
    where: { programId: programId, orderIndex: 9999 }
  });
  if (existingVocab) {
    await prisma.lesson.update({
      where: { id: existingVocab.id },
      data: { title: 'Kho từ vựng PET (Hidden)', theme: 'HIDDEN', isPremium: false }
    });
  } else {
    await prisma.lesson.create({
      data: {
        programId: programId,
        orderIndex: 9999,
        title: 'Kho từ vựng PET (Hidden)',
        theme: 'HIDDEN',
        isPremium: false
      }
    });
  }

  console.log(`✅ Đã tạo/cập nhật 25 bài học và Kho từ vựng (Hidden) cho PET!`);
}

main()
  .catch(e => {
    console.error('❌ Lỗi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🏁 Hoàn tất script.');
  });

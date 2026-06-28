const { PrismaClient } = require('database');
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

  // 2. Tạo Program KET
  // Lưu ý: schema Prisma hiện tại của hệ thống này không có field description trong Program,
  // nên ta chỉ gửi code, name, subjectId, level.
  // Các cấp độ: 1 (Starters), 2 (Movers), 3 (Flyers), 4 (KET), 5 (PET).
  const program = await prisma.program.findFirst({ where: { code: 'en-ket' } });
  let programId;

  if (program) {
    programId = program.id;
    await prisma.program.update({
      where: { id: program.id },
      data: { name: 'Cambridge A2 KET', level: 4 }
    });
    console.log('✅ Updated Program: Cambridge A2 KET');
  } else {
    const newProgram = await prisma.program.create({
      data: {
        code: 'en-ket',
        name: 'Cambridge A2 KET',
        subjectId: subject.id,
        level: 4
      }
    });
    programId = newProgram.id;
    console.log('✅ Created Program: Cambridge A2 KET');
  }

  // 3. Khởi tạo 25 bài học
  const lessons = [
    { title: "Lesson 1: Daily Life", theme: "Cuộc sống thường ngày" },
    { title: "Lesson 2: People and Family", theme: "Con người và Gia đình" },
    { title: "Lesson 3: Hobbies and Leisure", theme: "Sở thích và Giải trí" },
    { title: "Lesson 4: Places and Buildings", theme: "Địa điểm và Tòa nhà" },
    { title: "Lesson 5: Transport and Travel", theme: "Giao thông và Du lịch" },
    { title: "Lesson 6: Food and Drink", theme: "Đồ ăn và Thức uống" },
    { title: "Lesson 7: School and Study", theme: "Trường học và Học tập" },
    { title: "Lesson 8: Work and Jobs", theme: "Công việc và Nghề nghiệp" },
    { title: "Lesson 9: Health and Medicine", theme: "Sức khỏe và Y tế" },
    { title: "Lesson 10: Sports", theme: "Thể thao" },
    { title: "Lesson 11: The Natural World", theme: "Thế giới tự nhiên" },
    { title: "Lesson 12: Weather and Climate", theme: "Thời tiết và Khí hậu" },
    { title: "Lesson 13: Clothes and Fashion", theme: "Quần áo và Thời trang" },
    { title: "Lesson 14: Entertainment and Media", theme: "Giải trí và Truyền thông" },
    { title: "Lesson 15: Technology and Internet", theme: "Công nghệ và Internet" },
    { title: "Lesson 16: Shopping and Money", theme: "Mua sắm và Tiền bạc" },
    { title: "Lesson 17: House and Home", theme: "Nhà cửa và Tổ ấm" },
    { title: "Lesson 18: Feelings and Opinions", theme: "Cảm xúc và Quan điểm" },
    { title: "Lesson 19: Language and Communication", theme: "Ngôn ngữ và Giao tiếp" },
    { title: "Lesson 20: Travel and Holidays", theme: "Du lịch và Kỳ nghỉ" },
    { title: "Lesson 21: Culture and Festivals", theme: "Văn hóa và Lễ hội" },
    { title: "Lesson 22: Future Plans", theme: "Kế hoạch Tương lai" },
    { title: "Lesson 23: Experiences", theme: "Trải nghiệm" },
    { title: "Lesson 24: Personal Information", theme: "Thông tin cá nhân" },
    { title: "Lesson 25: Final Review - KET", theme: "Ôn tập cuối khóa KET" }
  ];

  for (let i = 0; i < lessons.length; i++) {
    const l = lessons[i];
    let existingLesson = await prisma.lesson.findFirst({
      where: {
        programId: programId,
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
          programId: programId,
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
    where: { programId: programId, orderIndex: 9999 }
  });
  if (existingVocab) {
    await prisma.lesson.update({
      where: { id: existingVocab.id },
      data: { title: 'Kho từ vựng KET', theme: 'Từ vựng tổng hợp', isPremium: true }
    });
  } else {
    await prisma.lesson.create({
      data: {
        programId: programId,
        title: 'Kho từ vựng KET',
        theme: 'Từ vựng tổng hợp',
        orderIndex: 9999,
        isPremium: true
      }
    });
  }
  console.log(`✅ Created/Updated Lesson: Kho từ vựng KET`);

  console.log('\n🎉 Hoàn thành khởi tạo 25 bài học KET!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

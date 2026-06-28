const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lessons = [
  { theme: 'Bản thân, gia đình & sức khỏe', title: 'Bài 1.a: Gia đình (1/2)', orderIndex: 0 },
  { theme: 'Bản thân, gia đình & sức khỏe', title: 'Bài 1.b: Gia đình (2/2)', orderIndex: 1 },
  { theme: 'Bản thân, gia đình & sức khỏe', title: 'Bài 2.a: Sức khỏe (1/2)', orderIndex: 2 },
  { theme: 'Bản thân, gia đình & sức khỏe', title: 'Bài 2.b: Sức khỏe (2/2)', orderIndex: 3 },

  { theme: 'Tính cách & cảm xúc', title: 'Bài 3.a: Tính cách & cảm xúc (1/4)', orderIndex: 4 },
  { theme: 'Tính cách & cảm xúc', title: 'Bài 3.b: Tính cách & cảm xúc (2/4)', orderIndex: 5 },
  { theme: 'Tính cách & cảm xúc', title: 'Bài 3.c: Tính cách & cảm xúc (3/4)', orderIndex: 6 },
  { theme: 'Tính cách & cảm xúc', title: 'Bài 3.d: Tính cách & cảm xúc (4/4)', orderIndex: 7 },

  { theme: 'Đồ ăn thức uống', title: 'Bài 4.a: Đồ ăn thức uống (1/2)', orderIndex: 8 },
  { theme: 'Đồ ăn thức uống', title: 'Bài 4.b: Đồ ăn thức uống (2/2)', orderIndex: 9 },

  { theme: 'Ngôi nhà & công nghệ', title: 'Bài 5.a: Ngôi nhà (1/3)', orderIndex: 10 },
  { theme: 'Ngôi nhà & công nghệ', title: 'Bài 5.b: Ngôi nhà (2/3)', orderIndex: 11 },
  { theme: 'Ngôi nhà & công nghệ', title: 'Bài 5.c: Ngôi nhà (3/3)', orderIndex: 12 },

  { theme: 'Trường học', title: 'Bài 6.a: Trường học (1/2)', orderIndex: 13 },
  { theme: 'Trường học', title: 'Bài 6.b: Trường học (2/2)', orderIndex: 14 },

  { theme: 'Động vật & thiên nhiên', title: 'Bài 7: Động vật', orderIndex: 15 },
  { theme: 'Động vật & thiên nhiên', title: 'Bài 8.a: Thiên nhiên (1/3)', orderIndex: 16 },
  { theme: 'Động vật & thiên nhiên', title: 'Bài 8.b: Thiên nhiên (2/3)', orderIndex: 17 },
  { theme: 'Động vật & thiên nhiên', title: 'Bài 8.c: Thiên nhiên (3/3)', orderIndex: 18 },

  { theme: 'Đồ chơi, thể thao & giải trí', title: 'Bài 9.a: Đồ chơi, sở thích & giải trí (1/2)', orderIndex: 19 },
  { theme: 'Đồ chơi, thể thao & giải trí', title: 'Bài 9.b: Đồ chơi, sở thích & giải trí (2/2)', orderIndex: 20 },
  { theme: 'Đồ chơi, thể thao & giải trí', title: 'Bài 10.a: Thể thao & vận động (1/2)', orderIndex: 21 },
  { theme: 'Đồ chơi, thể thao & giải trí', title: 'Bài 10.b: Thể thao & vận động (2/2)', orderIndex: 22 },

  { theme: 'Động từ, thời gian, nơi chốn & số', title: 'Bài 11.a: Động từ thường gặp (1/3)', orderIndex: 23 },
  { theme: 'Động từ, thời gian, nơi chốn & số', title: 'Bài 11.b: Động từ thường gặp (2/3)', orderIndex: 24 },
  { theme: 'Động từ, thời gian, nơi chốn & số', title: 'Bài 11.c: Động từ thường gặp (3/3)', orderIndex: 25 },
  { theme: 'Động từ, thời gian, nơi chốn & số', title: 'Bài 12.a: Thời gian, hoạt động & giao tiếp (1/2)', orderIndex: 26 },
  { theme: 'Động từ, thời gian, nơi chốn & số', title: 'Bài 12.b: Thời gian, hoạt động & giao tiếp (2/2)', orderIndex: 27 },
  { theme: 'Động từ, thời gian, nơi chốn & số', title: 'Bài 13.a: Nơi chốn, vị trí & hình dạng (1/2)', orderIndex: 28 },
  { theme: 'Động từ, thời gian, nơi chốn & số', title: 'Bài 13.b: Nơi chốn, vị trí & hình dạng (2/2)', orderIndex: 29 },
  { theme: 'Động từ, thời gian, nơi chốn & số', title: 'Bài 14: Số thứ tự & ngày trong tuần', orderIndex: 30 },
];

async function main() {
  console.log('--- START SEEDING MOVERS ---');

  // 1. Lấy môn Tiếng Anh (en)
  let subjectEn = await prisma.subject.findUnique({
    where: { code: 'en' }
  });

  if (!subjectEn) {
    subjectEn = await prisma.subject.create({
      data: { name: 'Tiếng Anh', code: 'en', flag: '🇬🇧', color: 'bg-blue-500' }
    });
    console.log('Created Subject: en');
  }

  // 2. Tạo Program Movers nếu chưa có
  let programMovers = await prisma.program.findUnique({
    where: { code: 'en-movers' }
  });

  if (!programMovers) {
    programMovers = await prisma.program.create({
      data: {
        subjectId: subjectEn.id,
        name: 'Movers',
        code: 'en-movers',
        level: 2,
        isAvailable: true
      }
    });
    console.log('Created Program: en-movers');
  } else {
    // Xóa lessons cũ nếu có để tránh trùng (theo yêu cầu "tạo 31 bài học")
    const deletedContents = await prisma.lessonContent.deleteMany({
      where: { lesson: { programId: programMovers.id } }
    });
    const deletedProgress = await prisma.userProgress.deleteMany({
      where: { lesson: { programId: programMovers.id } }
    });
    const deletedLessons = await prisma.lesson.deleteMany({
      where: { programId: programMovers.id }
    });
    console.log(`Deleted ${deletedLessons.count} old lessons and related data for Movers`);
  }

  // 3. Tạo 31 bài học mới
  let createdCount = 0;
  for (const l of lessons) {
    await prisma.lesson.create({
      data: {
        programId: programMovers.id,
        title: l.title,
        theme: l.theme,
        orderIndex: l.orderIndex,
        isPremium: l.orderIndex >= 3 // Khóa từ bài thứ 4 trở đi
      }
    });
    createdCount++;
  }

  console.log(`Created ${createdCount} lessons for Movers.`);
  console.log('--- DONE ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

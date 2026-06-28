const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ketLessons = [
  { orderIndex: 0, title: "Bài 1: Gia đình & quan hệ mở rộng", theme: "Bản thân & xã hội" },
  { orderIndex: 1, title: "Bài 2: Tính cách & cảm xúc mở rộng", theme: "Bản thân & xã hội" },
  { orderIndex: 2, title: "Bài 3: Ngoại hình & thời trang", theme: "Bản thân & xã hội" },
  { orderIndex: 3, title: "Bài 4: Nhà cửa & nội thất mở rộng", theme: "Nhà cửa" },
  { orderIndex: 4, title: "Bài 5: Căn hộ & chỗ ở", theme: "Nhà cửa" },
  { orderIndex: 5, title: "Bài 6: Việc nhà & thiết bị", theme: "Nhà cửa" },
  { orderIndex: 6, title: "Bài 7: Mua sắm mở rộng", theme: "Mua sắm" },
  { orderIndex: 7, title: "Bài 8: Cửa hàng & dịch vụ", theme: "Mua sắm" },
  { orderIndex: 8, title: "Bài 9: Ngân hàng & bưu điện", theme: "Mua sắm" },
  { orderIndex: 9, title: "Bài 10: Ẩm thực & nấu ăn", theme: "Đồ ăn thức uống" },
  { orderIndex: 10, title: "Bài 11: Phương pháp nấu", theme: "Đồ ăn thức uống" },
  { orderIndex: 11, title: "Bài 12: Sức khỏe & y tế", theme: "Sức khỏe & thể thao" },
  { orderIndex: 12, title: "Bài 13: Thể dục & thể thao mở rộng", theme: "Sức khỏe & thể thao" },
  { orderIndex: 13, title: "Bài 14: Sân bay & du lịch", theme: "Du lịch & giao thông" },
  { orderIndex: 14, title: "Bài 15: Phương tiện & đường xá", theme: "Du lịch & giao thông" },
  { orderIndex: 15, title: "Bài 16: Khách sạn & chỗ ở", theme: "Du lịch & giao thông" },
  { orderIndex: 16, title: "Bài 17: Công việc & nghề nghiệp mở rộng", theme: "Công việc & công nghệ" },
  { orderIndex: 17, title: "Bài 18: Môi trường làm việc", theme: "Công việc & công nghệ" },
  { orderIndex: 18, title: "Bài 19: Công nghệ & truyền thông", theme: "Công việc & công nghệ" },
  { orderIndex: 19, title: "Bài 20: Thiết bị & máy móc", theme: "Công việc & công nghệ" },
  { orderIndex: 20, title: "Bài 21: Âm nhạc & nghệ thuật", theme: "Giải trí & thiên nhiên" },
  { orderIndex: 21, title: "Bài 22: Phim & truyền thông", theme: "Giải trí & thiên nhiên" },
  { orderIndex: 22, title: "Bài 23: Môi trường & thiên nhiên", theme: "Giải trí & thiên nhiên" },
  { orderIndex: 23, title: "Bài 24: Nơi chốn & tòa nhà mở rộng", theme: "Giải trí & thiên nhiên" },
  { orderIndex: 24, title: "Bài 25: Thì & Modal Verbs ôn tổng hợp", theme: "Ôn tổng kết KET" },
  { orderIndex: 25, title: "Bài 26: Reported Speech", theme: "Ôn tổng kết KET" },
  { orderIndex: 26, title: "Bài 27: Câu điều kiện", theme: "Ôn tổng kết KET" },
  { orderIndex: 27, title: "Bài 28: Câu bị động ôn tổng hợp", theme: "Ôn tổng kết KET" },
  { orderIndex: 28, title: "Bài 29: Cụm động từ (Phrasal Verbs)", theme: "Ôn tổng kết KET" },
  { orderIndex: 29, title: "Bài 30: Verb + infinitive / gerund", theme: "Ôn tổng kết KET" },
  { orderIndex: 30, title: "Bài 31: Câu hỏi đuôi & Từ nối", theme: "Ôn tổng kết KET" },
  { orderIndex: 31, title: "Bài 32: Kỹ năng đọc hiểu — Biển hiệu & Thông báo", theme: "Ôn tổng kết KET" },
  { orderIndex: 32, title: "Bài 33: Kỹ năng viết — Email & Tin nhắn", theme: "Ôn tổng kết KET" },
  { orderIndex: 33, title: "Bài 34: Kỹ năng nghe — Hội thoại thực tế", theme: "Ôn tổng kết KET" },
  { orderIndex: 34, title: "Bài 35: Ôn tổng kết toàn khóa KET", theme: "Ôn tổng kết KET" },
  { orderIndex: 35, title: "Bài 36: Luyện đề thi KET thực hành", theme: "Ôn tổng kết KET" }
];

async function main() {
  console.log('--- START SEEDING KET LESSONS ---');

  // Đảm bảo Program en-ket tồn tại
  let program = await prisma.program.findUnique({ where: { code: 'en-ket' } });
  if (!program) {
    program = await prisma.program.create({
      data: {
        code: 'en-ket',
        title: 'Cambridge A2 Key (KET)',
        description: 'Chương trình tiếng Anh Cambridge cấp độ A2 Key (KET) dành cho tuổi teen và người lớn.',
        orderIndex: 5, // 5 cho KET (Starters 2, Movers 3, Flyers 4)
        isActive: true
      }
    });
    console.log('Created Program: en-ket');
  } else {
    console.log('Program en-ket already exists');
  }

  // Xóa contents và progress cũ để tránh lỗi foreign key (nếu chạy lại nhiều lần)
  const existingLessons = await prisma.lesson.findMany({ where: { programId: program.id } });
  const lessonIds = existingLessons.map(l => l.id);
  await prisma.lessonContent.deleteMany({ where: { lessonId: { in: lessonIds } } });
  await prisma.userProgress.deleteMany({ where: { lessonId: { in: lessonIds } } });
  console.log('Deleted existing lesson contents and progress for KET (if any)');

  // Xóa lessons cũ nếu có để tránh trùng lặp
  await prisma.lesson.deleteMany({ where: { programId: program.id } });
  console.log('Deleted existing lessons for KET (if any)');

  // Tạo lại 36 lessons
  for (const lesson of ketLessons) {
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

  console.log('--- DONE SEEDING KET LESSONS ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lessons = [
  { id: 0, title: 'Bài 1: Tính cách & ngoại hình B1', theme: 'Chương 1 — Con người & Cảm xúc' },
  { id: 1, title: 'Bài 2: Cảm xúc phức tạp 1/2', theme: 'Chương 1 — Con người & Cảm xúc' },
  { id: 2, title: 'Bài 3: Cảm xúc phức tạp 2/2', theme: 'Chương 1 — Con người & Cảm xúc' },
  { id: 3, title: 'Bài 4: Học tập & ngôn ngữ 1/2', theme: 'Chương 2 — Ngôn ngữ & Học thuật' },
  { id: 4, title: 'Bài 5: Học tập & ngôn ngữ 2/2', theme: 'Chương 2 — Ngôn ngữ & Học thuật' },
  { id: 5, title: 'Bài 6: Xin việc & công việc', theme: 'Chương 3 — Công việc & Xã hội' },
  { id: 6, title: 'Bài 7: Nơi làm việc & nghề nghiệp', theme: 'Chương 3 — Công việc & Xã hội' },
  { id: 7, title: 'Bài 8: Xã hội & cộng đồng', theme: 'Chương 3 — Công việc & Xã hội' },
  { id: 8, title: 'Bài 9: Môi trường 1/2', theme: 'Chương 4 — Môi trường & Thế giới' },
  { id: 9, title: 'Bài 10: Môi trường 2/2', theme: 'Chương 4 — Môi trường & Thế giới' },
  { id: 10, title: 'Bài 11: Sức khỏe B1 1/2', theme: 'Chương 5 — Sức khỏe & Thể chất' },
  { id: 11, title: 'Bài 12: Thể dục & lối sống', theme: 'Chương 5 — Sức khỏe & Thể chất' },
  { id: 12, title: 'Bài 13: Du lịch 1/2', theme: 'Chương 6 — Du lịch & Phiêu lưu' },
  { id: 13, title: 'Bài 14: Du lịch 2/2', theme: 'Chương 6 — Du lịch & Phiêu lưu' },
  { id: 14, title: 'Bài 15: Giao thông B1', theme: 'Chương 7 — Phương tiện & Giao thông' },
  { id: 15, title: 'Bài 16: Phương tiện hiện đại', theme: 'Chương 7 — Phương tiện & Giao thông' },
  { id: 16, title: 'Bài 17: Nghệ thuật & âm nhạc', theme: 'Chương 8 — Nghệ thuật, Văn hóa & Truyền thông' },
  { id: 17, title: 'Bài 18: Truyền thông & báo chí', theme: 'Chương 8 — Nghệ thuật, Văn hóa & Truyền thông' },
  { id: 18, title: 'Bài 19: Sách & Văn học', theme: 'Chương 8 — Nghệ thuật, Văn hóa & Truyền thông' },
  { id: 19, title: 'Bài 20: Công nghệ B1', theme: 'Chương 8 — Nghệ thuật, Văn hóa & Truyền thông' },
  { id: 20, title: 'Bài 21: Hệ thống thì — ôn tổng hợp', theme: 'Chương 9 — Ngữ pháp nâng cao B1' },
  { id: 21, title: 'Bài 22: Câu điều kiện đầy đủ', theme: 'Chương 9 — Ngữ pháp nâng cao B1' },
  { id: 22, title: 'Bài 23: Câu bị động hoàn chỉnh', theme: 'Chương 9 — Ngữ pháp nâng cao B1' },
  { id: 23, title: 'Bài 24: Modal verbs B1', theme: 'Chương 9 — Ngữ pháp nâng cao B1' },
  { id: 24, title: 'Bài 25: Từ nối & lập luận', theme: 'Chương 9 — Ngữ pháp nâng cao B1' },
  { id: 25, title: 'Bài 26: Cụm động từ B1', theme: 'Chương 9 — Ngữ pháp nâng cao B1' },
  { id: 26, title: 'Bài 27: Gerund và Infinitive nâng cao', theme: 'Chương 9 — Ngữ pháp nâng cao B1' },
  { id: 27, title: 'Bài 28: Câu phức & liên kết B1', theme: 'Chương 9 — Ngữ pháp nâng cao B1' },
  { id: 28, title: 'Bài 29: Đọc hiểu — Văn bản thông tin', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 29, title: 'Bài 30: Đọc hiểu — Văn bản tường thuật', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 30, title: 'Bài 31: Viết — Email & thư chính thức', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 31, title: 'Bài 32: Viết — Bài luận ngắn', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 32, title: 'Bài 33: Nghe — Hội thoại & phỏng vấn', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 33, title: 'Bài 34: Nói — Trình bày ý kiến', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 34, title: 'Bài 35: Nói — Thảo luận nhóm', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 35, title: 'Bài 36: Ôn tổng kết Grammar B1', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 36, title: 'Bài 37: Ôn tổng kết Vocabulary B1', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 37, title: 'Bài 38: Luyện đề PET — Reading & Writing', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 38, title: 'Bài 39: Luyện đề PET — Listening & Speaking', theme: 'Chương 10 — Kỹ năng thi PET' },
  { id: 39, title: 'Bài 40: Mock Test toàn diện', theme: 'Chương 10 — Kỹ năng thi PET' }
];

async function main() {
  let subject = await prisma.subject.findUnique({ where: { code: 'EN' } });
  if (!subject) {
    subject = await prisma.subject.create({ data: { name: 'Tiếng Anh', code: 'EN', flag: '🇬🇧', color: 'bg-blue-500' } });
  }

  let program = await prisma.program.findUnique({ where: { code: 'en-pet' } });
  if (!program) {
    program = await prisma.program.create({ data: { name: 'PET (Cambridge B1 Preliminary)', code: 'en-pet', level: 5, subjectId: subject.id } });
  }

  // Delete UserProgress for PET lessons
  await prisma.userProgress.deleteMany({
    where: { lesson: { programId: program.id } }
  });

  // Delete all existing lesson content for PET
  await prisma.lessonContent.deleteMany({
    where: { lesson: { programId: program.id } }
  });

  // Delete all existing lessons for PET
  await prisma.lesson.deleteMany({
    where: { programId: program.id }
  });

  for (const l of lessons) {
    await prisma.lesson.create({
      data: {
        programId: program.id,
        title: l.title,
        theme: l.theme,
        orderIndex: l.id
      }
    });
    console.log(`Created: ${l.title}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => { console.error(e); prisma.$disconnect(); });

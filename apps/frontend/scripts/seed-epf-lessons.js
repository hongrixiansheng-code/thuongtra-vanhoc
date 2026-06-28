const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const epfLessons = [
  { orderIndex: 0, title: "Bài 1: Giới thiệu IPA & bảng âm", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 1, title: "Bài 2: Nguyên âm ngắn 1 — /æ/ /ɛ/ /ɪ/ /ɒ/", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 2, title: "Bài 3: Nguyên âm ngắn 2 — /ʌ/ /ʊ/ /ə/ /ɑː/", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 3, title: "Bài 4: Nguyên âm dài — /iː/ /uː/ /ɑː/ /ɔː/", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 4, title: "Bài 5: Cặp dài-ngắn dễ nhầm", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 5, title: "Bài 6: Nguyên âm đôi 1 — /eɪ/ /aɪ/ /ɔɪ/ /əʊ/", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 6, title: "Bài 7: Nguyên âm đôi 2 — /aʊ/ /ɪə/ /eə/ /ʊə/", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 7, title: "Bài 8: Phụ âm voiced/voiceless — /b/-/p/ /d/-/t/ /g/-/k/", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 8, title: "Bài 9: Phụ âm ma sát (Fricatives) — /f/-/v/ /s/-/z/ /ʃ/-/ʒ/", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 9, title: "Bài 10: Âm \"th\" — 2 loại /θ/ /ð/", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 10, title: "Bài 11: Phụ âm /r/ và /l/", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 11, title: "Bài 12: Phụ âm /w/ /h/ /j/ /ŋ/", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 12, title: "Bài 13: Âm cuối từ (Final Consonants)", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 13, title: "Bài 14: Đuôi -ed và -s/-es", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 14, title: "Bài 15: Cụm phụ âm (Consonant Clusters)", theme: "GIAI ĐOẠN 1: NHẬN DIỆN ÂM THANH (SOUND AWARENESS)" },
  { orderIndex: 15, title: "Bài 16: Trọng âm từ 2 âm tiết", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 16, title: "Bài 17: Trọng âm từ 3+ âm tiết", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 17, title: "Bài 18: Từ nội dung vs từ chức năng", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 18, title: "Bài 19: Weak forms (dạng yếu)", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 19, title: "Bài 20: Nhịp stress-timed", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 20, title: "Bài 21: Nối âm 1 — Consonant + Vowel", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 21, title: "Bài 22: Nối âm 2 — Âm bị nuốt (Elision)", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 22, title: "Bài 23: Nối âm 3 — Âm thêm vào (Intrusion)", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 23, title: "Bài 24: Ngữ điệu cơ bản (Intonation)", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 24, title: "Bài 25: Ngữ điệu nâng cao", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 25, title: "Bài 26: Tốc độ & Ngắt câu (Chunking)", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" },
  { orderIndex: 26, title: "Bài 27: Ôn tập Giai đoạn 2", theme: "GIAI ĐOẠN 2: NHỊP ĐIỆU & TRỌNG ÂM (RHYTHM & STRESS)" }
];

async function main() {
  console.log('--- START SEEDING EPF LESSONS ---');

  const subject = await prisma.subject.findUnique({ where: { code: 'en' } });
  if (!subject) {
    throw new Error('Subject "en" not found!');
  }

  let program = await prisma.program.findUnique({ where: { code: 'en-epf' } });
  if (!program) {
    program = await prisma.program.create({
      data: {
        subjectId: subject.id,
        name: 'English Pronunciation Foundations (EPF)',
        code: 'en-epf',
        level: 0, // nền tảng hơn en-starters (level 1) — tương tự vai trò "khai-mon" bên zh
        isAvailable: true
      }
    });
    console.log('Created Program: en-epf');
  } else {
    console.log('Program en-epf already exists');
  }

  // Xóa contents và progress cũ để tránh lỗi foreign key (nếu chạy lại nhiều lần)
  const existingLessons = await prisma.lesson.findMany({ where: { programId: program.id } });
  const lessonIds = existingLessons.map(l => l.id);
  await prisma.lessonContent.deleteMany({ where: { lessonId: { in: lessonIds } } });
  await prisma.userProgress.deleteMany({ where: { lessonId: { in: lessonIds } } });
  console.log('Deleted existing lesson contents and progress for EPF (if any)');

  await prisma.lesson.deleteMany({ where: { programId: program.id } });
  console.log('Deleted existing lessons for EPF (if any)');

  for (const lesson of epfLessons) {
    await prisma.lesson.create({
      data: {
        programId: program.id,
        orderIndex: lesson.orderIndex,
        title: lesson.title,
        theme: lesson.theme,
        isPremium: false
      }
    });
    console.log(`Created lesson: ${lesson.title}`);
  }

  console.log('--- DONE SEEDING EPF LESSONS ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// 🤖 CLAUDE CODE
// Script: seed-khai-mon-chuong1.js
// Mục đích: Seed Program "khai-mon" + 17 bài Chương 1 vào DB
// Chạy: node apps/frontend/scripts/seed-khai-mon-chuong1.js
// Yêu cầu: File data/TiengTrungNhapMon.Json phải có ở root monorepo
// Không thay đổi gì khác.

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu seed Khai môn Chương 1...\n');

  // ── 1. Đọc file JSON ──────────────────────────────────────────
  const jsonPath = path.join(__dirname, '../../../data/TiengTrungNhapMon.Json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`❌ Không tìm thấy file: ${jsonPath}`);
  }
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(raw);
  console.log(`✅ Đọc file JSON: ${data.lessons.length} bài`);

  // ── 2. Tìm Subject "zh" ───────────────────────────────────────
  const subject = await prisma.subject.findFirst({
    where: { code: 'zh' },
  });
  if (!subject) {
    throw new Error('❌ Không tìm thấy Subject có code="zh". Hãy seed Subject trước.');
  }
  console.log(`✅ Subject: ${subject.name} (id: ${subject.id})`);

  // ── 3. Xóa Program cũ nếu tồn tại (cascade xóa Lesson + LessonContent) ──
  const existingProgram = await prisma.program.findFirst({
    where: { code: 'khai-mon', subjectId: subject.id },
  });
  if (existingProgram) {
    console.log('⚠️  Đã có Program khai-mon — tiến hành xóa để seed lại...');

    // Xóa UserProgress trước (foreign key constraint)
    const lessons = await prisma.lesson.findMany({
      where: { programId: existingProgram.id },
      select: { id: true },
    });
    const lessonIds = lessons.map((l) => l.id);

    if (lessonIds.length > 0) {
      const deletedProgress = await prisma.userProgress.deleteMany({
        where: { lessonId: { in: lessonIds } },
      });
      console.log(`   Đã xóa ${deletedProgress.count} UserProgress`);
    }

    // Xóa LessonContent
    const deletedContents = await prisma.lessonContent.deleteMany({
      where: { lesson: { programId: existingProgram.id } },
    });
    console.log(`   Đã xóa ${deletedContents.count} LessonContent`);

    // Xóa Lesson
    const deletedLessons = await prisma.lesson.deleteMany({
      where: { programId: existingProgram.id },
    });
    console.log(`   Đã xóa ${deletedLessons.count} Lesson`);

    // Xóa Program
    await prisma.program.delete({ where: { id: existingProgram.id } });
    console.log('   Đã xóa Program khai-mon\n');
  }

  // ── 4. Tạo Program mới ────────────────────────────────────────
  const program = await prisma.program.create({
  data: {
    code: 'khai-mon',
    name: 'Khai Môn — Nhập môn Tiếng Trung',
    subjectId: subject.id,
    level: 0,
    isAvailable: true,
  },
});
  console.log(`✅ Tạo Program: ${program.name} (id: ${program.id})\n`);

  // ── 5. Seed từng Lesson + LessonContent ──────────────────────
  let totalContents = 0;

  for (const lessonData of data.lessons) {
    // Tạo Lesson
    const lesson = await prisma.lesson.create({
  data: {
    programId: program.id,
    orderIndex: lessonData.orderIndex,
    title: lessonData.title,
    isPremium: lessonData.isPremium ?? false,
  },
});

    // Tạo từng LessonContent
    for (const contentData of lessonData.contents) {
      await prisma.lessonContent.create({
  data: {
    lessonId: lesson.id,
    contentType: contentData.contentType,
    content: JSON.stringify(contentData.content),
  },
});
      totalContents++;
    }

    const contentTypes = lessonData.contents.map((c) => c.contentType).join(' + ');
    console.log(`   ✔ [${String(lessonData.orderIndex).padStart(2, '0')}] ${lessonData.title.slice(0, 50)} — ${contentTypes}`);
  }

  // ── 6. Tổng kết ───────────────────────────────────────────────
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Seed hoàn tất!`);
  console.log(`   Program  : khai-mon`);
  console.log(`   Lessons  : ${data.lessons.length} bài`);
  console.log(`   Contents : ${totalContents} blocks`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => {
    console.error('\n❌ Lỗi khi seed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

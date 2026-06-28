const { PrismaClient } = require('database');
const prisma = new PrismaClient();

// Xoá toàn bộ GRAMMAR content cũ (sai khung chương trình) của program ielts-0-4
// trước khi seed lại bằng data ielts-grammar-cum*.json mới.
async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'ielts-0-4' }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program IELTS 0-4.0 (code: ielts-0-4).');
    return;
  }

  const lessons = await prisma.lesson.findMany({
    where: { programId: program.id },
    select: { id: true }
  });
  const lessonIds = lessons.map(l => l.id);

  const result = await prisma.lessonContent.deleteMany({
    where: {
      lessonId: { in: lessonIds },
      contentType: 'GRAMMAR'
    }
  });

  console.log(`🗑️ Đã xoá ${result.count} bản ghi GRAMMAR cũ của ielts-0-4.`);
  console.log('👉 Tiếp theo: chạy lại seed-ielts-grammar.js với data mới cho từng cum file.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

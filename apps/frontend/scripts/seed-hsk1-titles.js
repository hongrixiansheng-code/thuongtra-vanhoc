/**
 * seed-hsk1-titles.js
 * Tạo Lesson records cho HSK1 v3.0 (bài 0–30) từ file hsk1-v3-lesson-titles.json
 * Chỉ tạo Lesson — không động đến LessonContent
 * Chạy: node apps/frontend/scripts/seed-hsk1-titles.js
 */

const { PrismaClient } = require('../../../packages/database/index');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const DATA_FILE = path.join(__dirname, '../../../data/hsk1-v3-lesson-titles.json');

async function main() {
  console.log('🚀 Bắt đầu seed lesson titles HSK1 v3.0...\n');

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Không tìm thấy file: ${DATA_FILE}`);
    process.exit(1);
  }

  const titles = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  console.log(`📂 Đọc được ${titles.length} bài từ file JSON\n`);

  const program = await prisma.program.findUnique({ where: { code: 'hsk1' } });
  if (!program) {
    console.error('❌ Không tìm thấy program hsk1.');
    process.exit(1);
  }
  console.log(`✅ Program: ${program.name} (id: ${program.id})\n`);

  let created = 0;
  let skipped = 0;

  for (const item of titles) {
    // Kiểm tra bài đã tồn tại chưa (theo orderIndex)
    const existing = await prisma.lesson.findFirst({
      where: { programId: program.id, orderIndex: item.orderIndex }
    });

    if (existing) {
      // Cập nhật title và theme nếu khác
      await prisma.lesson.update({
        where: { id: existing.id },
        data: {
          title: item.title_vi,
          theme: item.theme,
          isPremium: item.isPremium ?? false,
        }
      });
      console.log(`⟳  Bài ${item.orderIndex}: cập nhật — ${item.title_vi}`);
      skipped++;
    } else {
      // Tạo mới
      await prisma.lesson.create({
        data: {
          programId: program.id,
          orderIndex: item.orderIndex,
          title: item.title_vi,
          theme: item.theme,
          isPremium: item.isPremium ?? false,
        }
      });
      console.log(`✅ Bài ${item.orderIndex}: tạo mới — ${item.title_vi}`);
      created++;
    }
  }

  console.log('\n' + '━'.repeat(50));
  console.log('🎉 Seed lesson titles hoàn tất!');
  console.log(`   ✅ Tạo mới : ${created} bài`);
  console.log(`   ⟳  Cập nhật: ${skipped} bài`);
  console.log('━'.repeat(50));

  // Verify
  const total = await prisma.lesson.count({ where: { programId: program.id } });
  console.log(`\n📊 Tổng số bài trong DB: ${total}`);
}

main()
  .catch(err => {
    console.error('❌ Lỗi:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

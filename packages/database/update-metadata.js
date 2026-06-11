const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Dùng raw SQL để thêm cột mới an toàn, không vi phạm unique constraint
async function migrate() {
  console.log('Thêm các cột mới vào database...');

  // Thêm cột flag và color vào Subject nếu chưa có
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Subject" ADD COLUMN IF NOT EXISTS "flag" TEXT;
  `);
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Subject" ADD COLUMN IF NOT EXISTS "color" TEXT;
  `);

  // Thêm cột code vào Program nếu chưa có (không unique lúc đầu)
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Program" ADD COLUMN IF NOT EXISTS "code" TEXT;
  `);

  // Thêm cột isAvailable vào Program nếu chưa có
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Program" ADD COLUMN IF NOT EXISTS "isAvailable" BOOLEAN NOT NULL DEFAULT true;
  `);

  // Thêm cột theme vào Lesson nếu chưa có
  await prisma.$executeRawUnsafe(`
    ALTER TABLE "Lesson" ADD COLUMN IF NOT EXISTS "theme" TEXT;
  `);

  // Điền code cho từng Program
  const programCodes = [
    { name: 'HSK 1 - Cấp độ Cơ bản', code: 'hsk1' },
    { name: 'HSK 2 - Cấp độ Sơ cấp', code: 'hsk2' },
    { name: 'Starters', code: 'en-starters' },
  ];

  for (const pm of programCodes) {
    await prisma.$executeRawUnsafe(`
      UPDATE "Program" SET "code" = $1 WHERE "name" = $2
    `, pm.code, pm.name);
    console.log(`✓ Program "${pm.name}" → code="${pm.code}"`);
  }

  // Thêm unique constraint cho code sau khi đã điền giá trị
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Program" ADD CONSTRAINT "Program_code_key" UNIQUE ("code");
    `);
    console.log('✓ Thêm UNIQUE constraint cho Program.code');
  } catch (e) {
    if (e.message?.includes('already exists')) {
      console.log('✓ UNIQUE constraint đã tồn tại, bỏ qua');
    } else {
      throw e;
    }
  }

  // Cập nhật Subject metadata
  await prisma.$executeRawUnsafe(`
    UPDATE "Subject" SET "flag" = '🇨🇳', "color" = 'bg-red-500' WHERE "code" = 'zh'
  `);
  await prisma.$executeRawUnsafe(`
    UPDATE "Subject" SET "flag" = '🇬🇧', "color" = 'bg-blue-500' WHERE "code" = 'en'
  `);

  console.log('✓ Cập nhật metadata Subject');

  // Điền theme cho các bài học
  const themeMap = [
    { pattern: 'Mở Đầu', theme: 'CHUYÊN ĐỀ MỞ ĐẦU: NGỮ ÂM' },
    { pattern: 'Bài 1:', theme: 'CHỦ ĐỀ I: CHÀO HỎI & LÀM QUEN' },
    { pattern: 'Bài 2:', theme: 'CHỦ ĐỀ I: CHÀO HỎI & LÀM QUEN' },
    { pattern: 'Bài 3:', theme: 'CHỦ ĐỀ I: CHÀO HỎI & LÀM QUEN' },
    { pattern: 'Bài 4:', theme: 'CHỦ ĐỀ II: THỜI GIAN & ĐỜI SỐNG' },
    { pattern: 'Bài 5:', theme: 'CHỦ ĐỀ II: THỜI GIAN & ĐỜI SỐNG' },
    { pattern: 'Bài 6:', theme: 'CHỦ ĐỀ II: THỜI GIAN & ĐỜI SỐNG' },
    { pattern: 'Bài 7:', theme: 'CHỦ ĐỀ III: MUA SẮM & GIAO DỊCH' },
    { pattern: 'Bài 8:', theme: 'CHỦ ĐỀ III: MUA SẮM & GIAO DỊCH' },
    { pattern: 'Bài 9:', theme: 'CHỦ ĐỀ III: MUA SẮM & GIAO DỊCH' },
    { pattern: 'Bài 10:', theme: 'CHỦ ĐỀ IV: GIAO THÔNG & PHƯƠNG HƯỚNG' },
    { pattern: 'Bài 11:', theme: 'CHỦ ĐỀ IV: GIAO THÔNG & PHƯƠNG HƯỚNG' },
    { pattern: 'Bài 12:', theme: 'CHỦ ĐỀ IV: GIAO THÔNG & PHƯƠNG HƯỚNG' },
    { pattern: 'Bài 13:', theme: 'CHỦ ĐỀ V: HOẠT ĐỘNG KHÁC' },
    { pattern: 'Bài 14:', theme: 'CHỦ ĐỀ V: HOẠT ĐỘNG KHÁC' },
    { pattern: 'Bài 15:', theme: 'CHỦ ĐỀ V: HOẠT ĐỘNG KHÁC' },
  ];

  for (const tm of themeMap) {
    await prisma.$executeRawUnsafe(`
      UPDATE "Lesson" SET "theme" = $1 WHERE "title" LIKE $2 AND "orderIndex" != 9999
    `, tm.theme, `%${tm.pattern}%`);
  }
  console.log('✓ Đã điền theme cho tất cả bài học');

  console.log('\n✅ Migration hoàn thành!');
}

migrate()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

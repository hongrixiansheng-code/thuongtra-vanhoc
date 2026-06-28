const { PrismaClient } = require('../packages/database/index');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Bắt đầu tiến trình thêm chương trình IELTS 0-4.0...');

  // 1. Kiểm tra / Tạo môn học Tiếng Anh
  let enSubject = await prisma.subject.findUnique({
    where: { code: 'en' }
  });

  if (!enSubject) {
    console.log('⚠️ Không tìm thấy môn Tiếng Anh (code: en). Đang tạo mới...');
    enSubject = await prisma.subject.create({
      data: {
        name: 'Tiếng Anh',
        code: 'en',
        flag: '🇬🇧',
        color: 'bg-blue-500'
      }
    });
  } else {
    console.log('✅ Đã tìm thấy môn Tiếng Anh.');
  }

  // 2. Kiểm tra / Tạo Program IELTS 0-4.0
  let ieltsProgram = await prisma.program.findUnique({
    where: { code: 'ielts-0-4' }
  });

  if (!ieltsProgram) {
    console.log('⚠️ Không tìm thấy chương trình IELTS 0-4.0. Đang tạo mới...');
    ieltsProgram = await prisma.program.create({
      data: {
        subjectId: enSubject.id,
        name: 'IELTS Foundation 0-4.0',
        code: 'ielts-0-4',
        level: 1,
        isAvailable: true
      }
    });
  } else {
    console.log('✅ Đã tìm thấy chương trình IELTS 0-4.0.');
  }

  // 3. Đọc dữ liệu JSON 90 bài học
  const dataPath = path.join(__dirname, '../data/ielts-0-4-skeleton.json');
  if (!fs.existsSync(dataPath)) {
    console.error('❌ Không tìm thấy file data/ielts-0-4-skeleton.json');
    return;
  }

  const lessons = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.log(`📥 Đã tải ${lessons.length} bài học từ JSON.`);

  // 4. Tạo hoặc cập nhật bài học
  for (const lesson of lessons) {
    const existing = await prisma.lesson.findFirst({
      where: {
        programId: ieltsProgram.id,
        orderIndex: lesson.orderIndex
      }
    });

    if (existing) {
      console.log(`⏭️ Bài ${lesson.orderIndex} đã tồn tại, tiến hành cập nhật theme...`);
      await prisma.lesson.update({
        where: { id: existing.id },
        data: {
          title: lesson.title,
          theme: lesson.theme
        }
      });
    } else {
      await prisma.lesson.create({
        data: {
          programId: ieltsProgram.id,
          title: lesson.title,
          theme: lesson.theme,
          orderIndex: lesson.orderIndex,
          isPremium: false
        }
      });
      console.log(`✅ Tạo mới: ${lesson.title}`);
    }
  }

  console.log('\n🎉 Hoàn thành cập nhật chương trình IELTS 0-4.0!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

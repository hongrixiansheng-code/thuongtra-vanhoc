// 🤖 CLAUDE CODE
// Script: assign-dialogue-names.js
// Mục đích: Thay speaker "A"/"B" trong hội thoại Starters/Movers/Flyers
// bằng tên nhân vật (random từ 1 nhóm 10 tên) hoặc chức danh (Teacher) cho đoạn đặc thù.
// Giữ nguyên các đoạn Flyers đã có tên riêng (Mary, Jack, Charlie...).
// Chạy: node apps/frontend/scripts/assign-dialogue-names.js
// Không thay đổi gì khác.

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const NAME_POOL = ['Tom', 'Anna', 'Max', 'Lily', 'Leo', 'Grace', 'Daniel', 'Mia', 'Ben', 'Sophie'];

function pickPair(seedStr) {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed += seedStr.charCodeAt(i) * (i + 1);
  const i = seed % NAME_POOL.length;
  let j = (seed * 7 + 3) % NAME_POOL.length;
  if (j === i) j = (j + 1) % NAME_POOL.length;
  return [NAME_POOL[i], NAME_POOL[j]];
}

function isPlainAB(lines) {
  return lines.every((l) => l.speaker === 'A' || l.speaker === 'B');
}

async function processProgram(code) {
  const program = await prisma.program.findUnique({
    where: { code },
    include: { lessons: { orderBy: { orderIndex: 'asc' }, include: { contents: { where: { contentType: 'DIALOGUE' } } } } },
  });
  if (!program) { console.log(`⚠️  Không tìm thấy program ${code}`); return; }

  let updated = 0, skipped = 0;
  for (const lesson of program.lessons) {
    for (const content of lesson.contents) {
      const data = JSON.parse(content.content);
      if (!data.lines || !isPlainAB(data.lines)) { skipped++; continue; }

      let nameA, nameB;
      if (code === 'en-starters' && (lesson.orderIndex === 1 || lesson.orderIndex === 2)) {
        nameA = 'Tom'; nameB = 'Anna';
      } else if (code === 'en-starters' && lesson.orderIndex === 46) {
        nameA = 'Teacher';
        nameB = pickPair(content.id)[0];
      } else {
        [nameA, nameB] = pickPair(content.id);
      }

      data.lines = data.lines.map((l) => ({
        ...l,
        speaker: l.speaker === 'A' ? nameA : l.speaker === 'B' ? nameB : l.speaker,
      }));

      await prisma.lessonContent.update({
        where: { id: content.id },
        data: { content: JSON.stringify(data) },
      });
      updated++;
    }
  }
  console.log(`✅ ${code}: đã sửa ${updated} đoạn, giữ nguyên ${skipped} đoạn (đã có tên riêng)`);
}

async function main() {
  console.log('🚀 Bắt đầu gán tên nhân vật cho hội thoại...\n');
  await processProgram('en-starters');
  await processProgram('en-movers');
  await processProgram('en-flyers');
  console.log('\n🎉 Hoàn tất.');
}

main()
  .catch((e) => { console.error('❌ Lỗi:', e.message); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../packages/database/index');

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, '../data/movers-grammar-14-30.json');
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const program = await prisma.program.findUnique({
    where: { code: 'en-movers' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('Program Movers not found');
    return;
  }

  for (const item of data) {
    const lesson = program.lessons.find(l => l.orderIndex === item.orderIndex);
    if (!lesson) {
      console.log(`Lesson with orderIndex ${item.orderIndex} not found, skipping.`);
      continue;
    }

    // Process grammar
    if (item.grammar && item.grammar.length > 0) {
      for (let i = 0; i < item.grammar.length; i++) {
        const point = item.grammar[i];
        const contentId = `movers-grammar-${item.orderIndex}-${i + 1}`;
        
        const contentData = JSON.stringify({
          id: contentId,
          title: point.title,
          desc: point.desc,
          formula: point.formula,
          examples: point.examples,
          note: point.note,
          practiceList: point.practiceList
        });

        // Check if exists
        const existing = await prisma.lessonContent.findFirst({
          where: {
            lessonId: lesson.id,
            contentType: 'GRAMMAR',
            content: { contains: contentId }
          }
        });

        if (existing) {
          await prisma.lessonContent.update({
            where: { id: existing.id },
            data: { content: contentData }
          });
          console.log(`✅ Cập nhật: ${point.title} (Bài ${item.orderIndex})`);
        } else {
          await prisma.lessonContent.create({
            data: {
              lessonId: lesson.id,
              contentType: 'GRAMMAR',
              content: contentData
            }
          });
          console.log(`✅ Thêm mới: ${point.title} (Bài ${item.orderIndex})`);
        }
      }
    } else {
        console.log(`Bài ${item.orderIndex}: Không có ngữ pháp mới`);
    }
  }

  console.log('Hoàn tất nạp ngữ pháp Movers 14-30!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

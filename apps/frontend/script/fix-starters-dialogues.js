const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const dialogue1 = {
  title: "Dialogue 2: Saying goodbye",
  lines: [
    { speaker: "Anna", en: "Goodbye, Ben.", vi: "Tạm biệt, Ben." },
    { speaker: "Ben", en: "Bye, Anna.", vi: "Tạm biệt, Anna." },
    { speaker: "Anna", en: "Sorry, my book, please.", vi: "Xin lỗi, cho mình xin quyển sách." },
    { speaker: "Ben", en: "Yes, fine. Here.", vi: "Vâng, được thôi. Đây." },
    { speaker: "Anna", en: "Thank you. Nice to meet you.", vi: "Cảm ơn bạn. Rất vui được gặp bạn." },
    { speaker: "Ben", en: "Nice to meet you. Bye.", vi: "Rất vui được gặp bạn. Tạm biệt." }
  ]
};

const dialogue2 = {
  title: "Dialogue 1: Food and Drink",
  lines: [
    { speaker: "Tom", en: "I am hungry. I like food.", vi: "Tớ đói. Tớ thích đồ ăn." },
    { speaker: "Lucy", en: "I've got an apple and a banana. Do you like bread?", vi: "Tớ có một quả táo và một quả chuối. Cậu có thích bánh mì không?" },
    { speaker: "Tom", en: "Yes, I do. I like bread, rice and egg. Yummy!", vi: "Có chứ. Tớ thích bánh mì, cơm và trứng. Ngon quá!" },
    { speaker: "Lucy", en: "Do you like cake?", vi: "Cậu có thích bánh ngọt không?" },
    { speaker: "Tom", en: "Yes. What is your drink?", vi: "Có. Đồ uống của cậu là gì?" },
    { speaker: "Lucy", en: "Milk and juice. Water for you, please.", vi: "Sữa và nước ép. Nước lọc cho cậu nhé." }
  ]
};

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-starters' },
    include: { lessons: true }
  });

  if (!program) {
    console.log('Program not found');
    return;
  }

  const lesson1 = program.lessons.find(l => l.orderIndex === 1);
  const lesson6 = program.lessons.find(l => l.orderIndex === 6);

  let updatedCount = 0;

  if (lesson1) {
    const dialogues1 = await prisma.lessonContent.findMany({
      where: { lessonId: lesson1.id, contentType: 'DIALOGUE' }
    });
    for (const d of dialogues1) {
      const content = JSON.parse(d.content);
      if (content.title && content.title.toLowerCase().includes('goodbye')) {
        await prisma.lessonContent.update({
          where: { id: d.id },
          data: { content: JSON.stringify(dialogue1) }
        });
        console.log('✅ Updated Dialogue 1 in Lesson 1 (Saying goodbye)');
        updatedCount++;
      }
    }
  }

  if (lesson6) {
    const dialogues6 = await prisma.lessonContent.findMany({
      where: { lessonId: lesson6.id, contentType: 'DIALOGUE' }
    });
    for (const d of dialogues6) {
      const content = JSON.parse(d.content);
      if (content.title && content.title.toLowerCase().includes('pet')) {
        await prisma.lessonContent.update({
          where: { id: d.id },
          data: { content: JSON.stringify(dialogue2) }
        });
        console.log('✅ Updated Dialogue 2 in Lesson 6 (Food and Drink)');
        updatedCount++;
      }
    }
  }

  console.log(`🎉 Done fixing ${updatedCount} Starters dialogues directly in DB!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());

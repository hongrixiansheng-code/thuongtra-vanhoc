/**
 * SEED SCRIPT: KET Dialogue - Bài 1 (orderIndex 0)
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  {
    orderIndex: 0,
    dialogues: [
      {
        content: JSON.stringify({
          title: "The New Neighbour",
          lines: [
            { speaker: "Tony", en: "The guy standing near the door is your new neighbour, isn't he?", vi: "Người đàn ông đứng gần cửa là hàng xóm mới của bạn, phải không?" },
            { speaker: "Jenny", en: "Yes, he is, and I think he moved here with his parents yesterday.", vi: "Đúng vậy, và tôi nghĩ anh ấy đã chuyển đến đây cùng bố mẹ vào hôm qua." },
            { speaker: "Tony", en: "Whose car is parked outside, because I haven't seen it before?", vi: "Chiếc xe đậu bên ngoài là của ai, vì tôi chưa từng thấy nó trước đây?" },
            { speaker: "Jenny", en: "It is his brother's car, since they share a vehicle for work.", vi: "Đó là xe của anh trai anh ấy, vì họ dùng chung một phương tiện để đi làm." },
            { speaker: "Tony", en: "He hasn't got any children, has he?", vi: "Anh ấy chưa có con nào, phải không?" },
            { speaker: "Jenny", en: "No, he hasn't got a family yet, but he has a great relationship with his relatives.", vi: "Không, anh ấy chưa có gia đình, nhưng anh ấy có mối quan hệ rất tốt với họ hàng." },
            { speaker: "Tony", en: "We should go and say hello, shouldn't we?", vi: "Chúng ta nên đến và chào hỏi, đúng không?" },
            { speaker: "Jenny", en: "That is a good idea, so let's walk over and introduce ourselves!", vi: "Đó là một ý kiến hay, vậy nên hãy đi tới và giới thiệu bản thân nhé!" }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "A Large Family",
          lines: [
            { speaker: "Peter", en: "You have got a large family, haven't you?", vi: "Bạn có một đại gia đình, phải không?" },
            { speaker: "Mary", en: "Yes, I have, and we often have big parties during the holidays.", vi: "Đúng vậy, và chúng tôi thường tổ chức những bữa tiệc lớn trong những kỳ nghỉ." },
            { speaker: "Peter", en: "Whose house do you usually visit, because you have many relatives?", vi: "Bạn thường đến thăm nhà của ai, vì bạn có rất nhiều họ hàng?" },
            { speaker: "Mary", en: "We usually go to my grandparents' house, which is located in the countryside.", vi: "Chúng tôi thường đến nhà ông bà tôi, nơi nằm ở vùng nông thôn." },
            { speaker: "Peter", en: "Your aunt and uncle are divorced, aren't they?", vi: "Dì và chú của bạn đã ly hôn, phải không?" },
            { speaker: "Mary", en: "Yes, they are, but they still remain very good friends.", vi: "Đúng vậy, nhưng họ vẫn duy trì làm những người bạn rất tốt." },
            { speaker: "Peter", en: "It is wonderful that everyone stays connected, isn't it?", vi: "Thật tuyệt vời khi mọi người vẫn giữ liên lạc, đúng không?" },
            { speaker: "Mary", en: "Absolutely, because family is always the most important thing to us.", vi: "Chắc chắn rồi, bởi vì gia đình luôn là điều quan trọng nhất đối với chúng tôi." }
          ]
        })
      }
    ]
  }
];

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-ket' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program KET!');
    return;
  }

  for (const item of DIALOGUE_DATA) {
    const targetLesson = program.lessons.find(l => l.orderIndex === item.orderIndex);
    if (!targetLesson) continue;

    // Xóa hội thoại cũ
    await prisma.lessonContent.deleteMany({
      where: {
        lessonId: targetLesson.id,
        contentType: 'DIALOGUE'
      }
    });

    // Thêm hội thoại mới
    for (const d of item.dialogues) {
      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'DIALOGUE',
          content: d.content
        }
      });
    }
    console.log(`✅ Đã nạp 2 đoạn hội thoại (cấu trúc mới) cho Bài có orderIndex ${item.orderIndex}`);
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

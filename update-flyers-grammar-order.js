const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const NEW_GRAMMAR = [
  {
    lesson: 3, 
    title: "Thì Hiện tại hoàn thành (Present Perfect)", 
    desc: "Thì Hiện tại hoàn thành diễn tả hành động đã xảy ra trong quá khứ nhưng kết quả vẫn còn liên quan tới hiện tại, hoặc trải nghiệm cho đến nay.", 
    formula: [{ text: "Khẳng định: S + have / has + Phân từ 2 (V-ed/V3)\nPhủ định: S + haven't / hasn't + V3/ed", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }], 
    practiceList: [
      {correct: "I have finished my homework.", meaning: "Tớ đã hoàn thành xong bài tập về nhà."}, 
      {correct: "She has lost her keys.", meaning: "Cô ấy đã đánh mất chìa khóa của mình."}
    ]
  },
  {
    lesson: 4, 
    title: "Thì Tương lai đơn với 'Will'", 
    desc: "Dùng 'Will' để diễn tả một dự đoán về tương lai, một quyết định ngay tại thời điểm nói, hoặc lời hứa.", 
    formula: [{ text: "Khẳng định: S + will + V (nguyên thể)\nPhủ định: S + won't + V", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }], 
    practiceList: [
      {correct: "I think it will rain tomorrow.", meaning: "Tớ nghĩ ngày mai trời sẽ mưa."}, 
      {correct: "I will help you with your homework.", meaning: "Tớ sẽ giúp cậu làm bài tập về nhà."}
    ]
  },
  {
    lesson: 5, 
    title: "Tương lai gần 'Be going to' vs 'Will'", 
    desc: "Dùng 'Be going to' cho kế hoạch đã được quyết định từ trước hoặc dựa trên bằng chứng hiện tại. Dùng 'Will' cho dự đoán chung chung hoặc quyết định tức thời.", 
    formula: [{ text: "S + am/is/are + going to + V (Kế hoạch/Dự định)\nS + will + V (Sự việc chưa chắc chắn)", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }], 
    practiceList: [
      {correct: "Look at those black clouds! It is going to rain.", meaning: "Nhìn những đám mây đen kìa! Trời sắp mưa rồi."}, 
      {correct: "We are going to visit our grandparents next week.", meaning: "Tuần tới chúng tớ dự định đi thăm ông bà."}
    ]
  },
  {
    lesson: 6, 
    title: "Hiện tại hoàn thành với 'Just', 'Already', 'Yet'", 
    desc: "'Just' (vừa mới) và 'Already' (đã rồi) đứng giữa have/has và V3/ed. 'Yet' (chưa) dùng trong câu phủ định hoặc nghi vấn, thường đứng cuối câu.", 
    formula: [{ text: "S + have/has + just/already + V3/ed\nS + haven't/hasn't + V3/ed + yet", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }], 
    practiceList: [
      {correct: "I have just eaten dinner.", meaning: "Tớ vừa mới ăn tối xong."}, 
      {correct: "Have you cleaned your room yet?", meaning: "Bạn đã dọn dẹp phòng của mình chưa?"}
    ]
  },
  {
    lesson: 7, 
    title: "Hiện tại hoàn thành với 'For' và 'Since'", 
    desc: "Dùng 'For' + Khoảng thời gian (để chỉ hành động kéo dài bao lâu). Dùng 'Since' + Mốc thời gian (để chỉ hành động bắt đầu từ khi nào).", 
    formula: [{ text: "For + 2 years, a long time, 3 months...\nSince + 2015, yesterday, Monday...", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }], 
    practiceList: [
      {correct: "I have lived here for five years.", meaning: "Tớ đã sống ở đây được năm năm rồi."}, 
      {correct: "She has been sick since yesterday.", meaning: "Cô ấy bị ốm từ hôm qua."}
    ]
  }
];

async function updateFlyersGrammar() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-flyers' },
    include: { lessons: true }
  });

  if (!program) {
    console.log('Program not found');
    return;
  }

  for (const item of NEW_GRAMMAR) {
    const lesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!lesson) continue;

    const contentJson = JSON.stringify({
      id: `flyers-grammar-${item.lesson}`,
      title: item.title,
      desc: item.desc,
      formula: item.formula,
      practiceList: item.practiceList
    });

    const existing = await prisma.lessonContent.findFirst({
      where: {
        lessonId: lesson.id,
        contentType: 'GRAMMAR'
      }
    });

    if (existing) {
      await prisma.lessonContent.update({
        where: { id: existing.id },
        data: { content: contentJson }
      });
      console.log(`✅ Đã cập nhật ngữ pháp Flyers Bài ${item.lesson}: ${item.title}`);
    } else {
      await prisma.lessonContent.create({
        data: {
          lessonId: lesson.id,
          contentType: 'GRAMMAR',
          content: contentJson
        }
      });
      console.log(`✅ Đã thêm mới ngữ pháp Flyers Bài ${item.lesson}: ${item.title}`);
    }
  }

  console.log(`🎉 Đã sửa xong lộ trình Flyers 3-7!`);
}

updateFlyersGrammar()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

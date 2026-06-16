/**
 * SEED SCRIPT: YLE Flyers Grammar (25 Bài)
 * Chạy từ thư mục gốc: node seed-yle-flyers-grammar.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = [
  // BÀI 1 - 5
  {
    lesson: 1, 
    title: "Thì Hiện tại đơn & Hiện tại tiếp diễn", 
    explanation: "Thì Hiện tại đơn dùng để diễn tả thói quen, sự thật hiển nhiên. Thì Hiện tại tiếp diễn dùng để diễn tả hành động đang xảy ra tại thời điểm nói.", 
    structure: "Hiện tại đơn: S + V(s/es)\nHiện tại tiếp diễn: S + am/is/are + V-ing", 
    examples: [
      {en: "I usually walk to school, but today I am riding my bike.", vi: "Tớ thường đi bộ đến trường, nhưng hôm nay tớ đang đạp xe."}, 
      {en: "She is reading a book now.", vi: "Cô ấy đang đọc sách bây giờ."}
    ]
  },
  {
    lesson: 2, 
    title: "Thì Quá khứ đơn & Quá khứ tiếp diễn", 
    explanation: "Quá khứ tiếp diễn diễn tả hành động đang xảy ra tại một thời điểm xác định trong quá khứ. Nó thường kết hợp với Quá khứ đơn để nói về một hành động đang xảy ra (tiếp diễn) thì có hành động khác xen vào (đơn).", 
    structure: "S + was/were + V-ing (khi có When/While)", 
    examples: [
      {en: "I was watching TV when the phone rang.", vi: "Tớ đang xem tivi thì điện thoại reo."}, 
      {en: "While we were playing football, it started to rain.", vi: "Trong khi chúng tớ đang chơi bóng đá, trời bắt đầu mưa."}
    ]
  },
  {
    lesson: 3, 
    title: "Thì Hiện tại hoàn thành (Present Perfect)", 
    explanation: "Thì Hiện tại hoàn thành diễn tả hành động đã xảy ra trong quá khứ nhưng kết quả vẫn còn liên quan tới hiện tại, hoặc trải nghiệm cho đến nay.", 
    structure: "Khẳng định: S + have / has + Phân từ 2 (V-ed/V3)\nPhủ định: S + haven't / hasn't + V3/ed", 
    examples: [
      {en: "I have finished my homework.", vi: "Tớ đã hoàn thành xong bài tập về nhà."}, 
      {en: "She has lost her keys.", vi: "Cô ấy đã đánh mất chìa khóa của mình."}
    ]
  },
  {
    lesson: 4, 
    title: "Hiện tại hoàn thành với 'Just', 'Already', 'Yet'", 
    explanation: "'Just' (vừa mới) và 'Already' (đã rồi) đứng giữa have/has và V3/ed. 'Yet' (chưa) dùng trong câu phủ định hoặc nghi vấn, thường đứng cuối câu.", 
    structure: "S + have/has + just/already + V3/ed\nS + haven't/hasn't + V3/ed + yet", 
    examples: [
      {en: "I have just eaten dinner.", vi: "Tớ vừa mới ăn tối xong."}, 
      {en: "Have you cleaned your room yet?", vi: "Bạn đã dọn dẹp phòng của mình chưa?"}
    ]
  },
  {
    lesson: 5, 
    title: "Hiện tại hoàn thành với 'For' và 'Since'", 
    explanation: "Dùng 'For' + Khoảng thời gian (để chỉ hành động kéo dài bao lâu). Dùng 'Since' + Mốc thời gian (để chỉ hành động bắt đầu từ khi nào).", 
    structure: "For + 2 years, a long time, 3 months...\nSince + 2015, yesterday, Monday...", 
    examples: [
      {en: "I have lived here for five years.", vi: "Tớ đã sống ở đây được năm năm rồi."}, 
      {en: "She has been sick since yesterday.", vi: "Cô ấy bị ốm từ hôm qua."}
    ]
  },

  // BÀI 6 - 10
  {
    lesson: 6, 
    title: "Thì Tương lai đơn với 'Will'", 
    explanation: "Dùng 'Will' để diễn tả một dự đoán về tương lai, một quyết định ngay tại thời điểm nói, hoặc lời hứa.", 
    structure: "Khẳng định: S + will + V (nguyên thể)\nPhủ định: S + won't + V", 
    examples: [
      {en: "I think it will rain tomorrow.", vi: "Tớ nghĩ ngày mai trời sẽ mưa."}, 
      {en: "I will help you with your homework.", vi: "Tớ sẽ giúp cậu làm bài tập về nhà."}
    ]
  },
  {
    lesson: 7, 
    title: "Tương lai gần 'Be going to' vs 'Will'", 
    explanation: "Dùng 'Be going to' cho kế hoạch đã được quyết định từ trước hoặc dựa trên bằng chứng hiện tại. Dùng 'Will' cho dự đoán chung chung hoặc quyết định tức thời.", 
    structure: "S + am/is/are + going to + V (Kế hoạch/Dự định)\nS + will + V (Sự việc chưa chắc chắn)", 
    examples: [
      {en: "Look at those black clouds! It is going to rain.", vi: "Nhìn những đám mây đen kìa! Trời sắp mưa rồi."}, 
      {en: "We are going to visit our grandparents next week.", vi: "Tuần tới chúng tớ dự định đi thăm ông bà."}
    ]
  },
  {
    lesson: 8, 
    title: "Câu điều kiện loại 0 (Zero Conditional)", 
    explanation: "Diễn tả một sự thật hiển nhiên, chân lý, hoặc một kết quả luôn luôn xảy ra nếu điều kiện được đáp ứng.", 
    structure: "If + S + V(s/es), S + V(s/es)\n(Cả hai vế đều dùng thì Hiện tại đơn)", 
    examples: [
      {en: "If you heat ice, it melts.", vi: "Nếu bạn đun nóng đá, nó sẽ tan chảy."}, 
      {en: "If it rains, the grass gets wet.", vi: "Nếu trời mưa, cỏ sẽ bị ướt."}
    ]
  },
  {
    lesson: 9, 
    title: "Câu điều kiện loại 1 (First Conditional)", 
    explanation: "Diễn tả một điều kiện có thể xảy ra ở hiện tại hoặc tương lai và kết quả của nó.", 
    structure: "If + S + V(s/es) [Hiện tại đơn], S + will / won't + V [Tương lai đơn]", 
    examples: [
      {en: "If you study hard, you will pass the exam.", vi: "Nếu bạn học chăm chỉ, bạn sẽ vượt qua kỳ thi."}, 
      {en: "If it is sunny tomorrow, we will go to the beach.", vi: "Nếu ngày mai trời nắng, chúng tớ sẽ đi biển."}
    ]
  },
  {
    lesson: 10, 
    title: "Câu bị động - Hiện tại đơn (Present Simple Passive)", 
    explanation: "Dùng câu bị động khi muốn nhấn mạnh vào đối tượng bị tác động bởi hành động, thay vì người thực hiện hành động.", 
    structure: "S + am/is/are + V3/ed (+ by O)", 
    examples: [
      {en: "The room is cleaned every day.", vi: "Căn phòng được dọn dẹp mỗi ngày."}, 
      {en: "Many letters are sent by the postman.", vi: "Nhiều lá thư được gửi đi bởi người đưa thư."}
    ]
  },

  // BÀI 11 - 15
  {
    lesson: 11, 
    title: "Câu bị động - Quá khứ đơn (Past Simple Passive)", 
    explanation: "Giống như bị động ở hiện tại đơn, nhưng dùng để kể lại những việc đã bị tác động hoặc được làm trong quá khứ.", 
    structure: "S + was/were + V3/ed (+ by O)", 
    examples: [
      {en: "This book was written in 1990.", vi: "Cuốn sách này được viết vào năm 1990."}, 
      {en: "The window was broken by a boy.", vi: "Cánh cửa sổ đã bị làm vỡ bởi một cậu bé."}
    ]
  },
  {
    lesson: 12, 
    title: "Câu hỏi đuôi (Tag Questions)", 
    explanation: "Câu hỏi đuôi là một câu hỏi ngắn được thêm vào cuối câu trần thuật để xác nhận thông tin. Nếu vế trước khẳng định, đuôi phủ định và ngược lại.", 
    structure: "S + V..., trợ động từ + đại từ?\nVí dụ: He is a doctor, isn't he?", 
    examples: [
      {en: "You are a student, aren't you?", vi: "Bạn là học sinh, đúng không?"}, 
      {en: "She doesn't like fish, does she?", vi: "Cô ấy không thích cá, phải không?"}
    ]
  },
  {
    lesson: 13, 
    title: "Mệnh đề quan hệ: Who, Which, That", 
    explanation: "Dùng để giải thích rõ hơn cho danh từ đứng trước nó. 'Who' thay cho người, 'Which' thay cho vật, 'That' có thể thay cho cả người và vật.", 
    structure: "Người + who/that + ...\nVật + which/that + ...", 
    examples: [
      {en: "The man who is talking to my dad is a teacher.", vi: "Người đàn ông mà đang nói chuyện với bố tớ là một thầy giáo."}, 
      {en: "This is the book which I bought yesterday.", vi: "Đây là cuốn sách thứ mà tớ đã mua hôm qua."}
    ]
  },
  {
    lesson: 14, 
    title: "Mệnh đề quan hệ: Where", 
    explanation: "Dùng 'Where' để thay thế cho từ chỉ nơi chốn trong mệnh đề quan hệ (có nghĩa là 'nơi mà').", 
    structure: "Nơi chốn + where + S + V", 
    examples: [
      {en: "This is the hospital where my mom works.", vi: "Đây là bệnh viện nơi mà mẹ tớ làm việc."}, 
      {en: "Do you know a place where we can play football?", vi: "Cậu có biết nơi nào mà chúng ta có thể chơi bóng đá không?"}
    ]
  },
  {
    lesson: 15, 
    title: "Câu tường thuật dạng trần thuật (Reported Speech - Statements)", 
    explanation: "Khi kể lại lời ai đó đã nói, ta lùi thì của động từ (ví dụ: Hiện tại đơn -> Quá khứ đơn) và đổi đại từ cho phù hợp.", 
    structure: "S1 + said (that) / told O (that) + S2 + lùi thì", 
    examples: [
      {en: "He said, 'I like apples' -> He said that he liked apples.", vi: "Cậu ấy nói cậu ấy thích táo."}, 
      {en: "She told me, 'I am tired' -> She told me that she was tired.", vi: "Cô ấy bảo tớ rằng cô ấy đang mệt."}
    ]
  },

  // BÀI 16 - 20
  {
    lesson: 16, 
    title: "Câu tường thuật dạng mệnh lệnh (Reported Commands)", 
    explanation: "Khi kể lại lời ra lệnh hoặc yêu cầu, ta dùng cấu trúc 'told/asked someone to do something'.", 
    structure: "S + told / asked + O + (not) to + V nguyên thể", 
    examples: [
      {en: "The teacher said, 'Stand up!' -> The teacher told us to stand up.", vi: "Giáo viên bảo chúng tớ đứng lên."}, 
      {en: "Mom said, 'Don't run!' -> Mom told me not to run.", vi: "Mẹ bảo tớ không được chạy."}
    ]
  },
  {
    lesson: 17, 
    title: "Động từ theo sau bởi To V và V-ing", 
    explanation: "Một số động từ theo sau là V-ing (enjoy, mind, practice, finish...). Một số động từ theo sau là To V (want, decide, hope, promise...).", 
    structure: "S + want/decide/hope/promise + to V\nS + enjoy/finish/mind + V-ing", 
    examples: [
      {en: "I enjoy playing football.", vi: "Tớ tận hưởng việc chơi bóng đá."}, 
      {en: "She decided to buy a new dress.", vi: "Cô ấy đã quyết định mua một chiếc váy mới."}
    ]
  },
  {
    lesson: 18, 
    title: "Tính từ đuôi -ED và đuôi -ING", 
    explanation: "Tính từ đuôi -ED dùng để chỉ cảm xúc của ai đó. Tính từ đuôi -ING dùng để miêu tả tính chất của một sự vật, sự việc gây ra cảm xúc đó.", 
    structure: "Người + be + tính từ -ED (bored, excited...)\nSự vật + be + tính từ -ING (boring, exciting...)", 
    examples: [
      {en: "I am bored because the movie is boring.", vi: "Tớ cảm thấy chán vì bộ phim này thật tẻ nhạt."}, 
      {en: "The football match was very exciting.", vi: "Trận đấu bóng đá đó đã rất thú vị."}
    ]
  },
  {
    lesson: 19, 
    title: "Động từ khuyết thiếu suy luận (Must, Might, Can't)", 
    explanation: "Dùng để suy đoán về một điều gì đó. Must: Chắc chắn là. Can't: Không thể nào là. Might/May: Có lẽ là.", 
    structure: "S + must / might / can't + V nguyên thể", 
    examples: [
      {en: "He has a lot of money. He must be rich.", vi: "Ông ấy có rất nhiều tiền. Ông ấy chắc hẳn rất giàu."}, 
      {en: "That can't be John. John is in London.", vi: "Đó không thể nào là John. John đang ở Luân Đôn."}
    ]
  },
  {
    lesson: 20, 
    title: "Khuyên bảo với Should và Ought to", 
    explanation: "Cả hai đều dùng để đưa ra lời khuyên (nên làm gì). 'Ought to' trang trọng hơn 'should' một chút.", 
    structure: "S + should / shouldn't + V\nS + ought to / ought not to + V", 
    examples: [
      {en: "You look tired. You should go to bed early.", vi: "Cậu trông có vẻ mệt. Cậu nên đi ngủ sớm."}, 
      {en: "We ought to protect the environment.", vi: "Chúng ta nên bảo vệ môi trường."}
    ]
  },

  // BÀI 21 - 25
  {
    lesson: 21, 
    title: "Khả năng trong quá khứ với Could / Couldn't", 
    explanation: "Dùng 'could' để nói về một việc ai đó có khả năng làm trong quá khứ (tương tự như 'can' ở hiện tại).", 
    structure: "S + could / couldn't + V nguyên thể", 
    examples: [
      {en: "I could swim when I was five years old.", vi: "Tớ đã có thể bơi khi tớ 5 tuổi."}, 
      {en: "She couldn't read before she went to school.", vi: "Cô bé đã không thể đọc trước khi đi học."}
    ]
  },
  {
    lesson: 22, 
    title: "So sánh bằng (As... As...)", 
    explanation: "Dùng để so sánh sự ngang bằng giữa hai người hoặc hai vật.", 
    structure: "S1 + be + as + Tính từ + as + S2\nS1 + be + not as + Tính từ + as + S2", 
    examples: [
      {en: "Tom is as tall as his brother.", vi: "Tom cao bằng anh trai cậu ấy."}, 
      {en: "This book is not as interesting as that one.", vi: "Cuốn sách này không thú vị bằng cuốn kia."}
    ]
  },
  {
    lesson: 23, 
    title: "Cấu trúc với Too (quá) và Enough (đủ)", 
    explanation: "Too (quá mức) đứng trước tính từ. Enough (đủ) đứng sau tính từ.", 
    structure: "too + Tính từ (+ to V)\nTính từ + enough (+ to V)", 
    examples: [
      {en: "This coffee is too hot to drink.", vi: "Cốc cà phê này quá nóng để có thể uống."}, 
      {en: "He is strong enough to lift the heavy box.", vi: "Cậu ấy đủ khỏe để nâng chiếc hộp nặng."}
    ]
  },
  {
    lesson: 24, 
    title: "Giới từ chỉ sự chuyển động (Prepositions of movement)", 
    explanation: "Dùng để mô tả hướng chuyển động của một người hoặc vật (vào trong, ra ngoài, xuyên qua, lên, xuống...).", 
    structure: "into (vào trong), out of (ra ngoài), through (xuyên qua), over (qua trên), under (xuống dưới)", 
    examples: [
      {en: "The cat jumped over the wall.", vi: "Con mèo đã nhảy vọt qua bức tường."}, 
      {en: "The train goes through the tunnel.", vi: "Chuyến tàu đi xuyên qua đường hầm."}
    ]
  },
  {
    lesson: 25, 
    title: "Liên từ (Conjunctions): Because, So, Although", 
    explanation: "Liên từ dùng để nối hai mệnh đề. 'Because' (bởi vì) chỉ nguyên nhân. 'So' (vì vậy) chỉ kết quả. 'Although' (mặc dù) chỉ sự nhượng bộ.", 
    structure: "Mệnh đề 1 + because/so/although + Mệnh đề 2", 
    examples: [
      {en: "I didn't go to school because I was sick.", vi: "Tớ đã không đi học bởi vì tớ bị ốm."}, 
      {en: "Although it was raining, we played football.", vi: "Mặc dù trời đang mưa, chúng tớ vẫn chơi bóng đá."}
    ]
  }
];

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-flyers' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program Flyers (en-flyers)!');
    return;
  }

  console.log(`✅ Tìm thấy Program: ${program.name}`);
  
  let successCount = 0;
  for (const item of GRAMMAR_DATA) {
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!targetLesson) {
      console.error(`❌ Không tìm thấy Lesson ${item.lesson} cho chủ đề "${item.title}"`);
      continue;
    }

    const contentJson = JSON.stringify({
      title: item.title,
      explanation: item.explanation,
      structure: item.structure,
      examples: item.examples
    });

    const existingContent = await prisma.lessonContent.findFirst({
      where: {
        lessonId: targetLesson.id,
        contentType: 'GRAMMAR'
      }
    });

    if (!existingContent) {
      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'GRAMMAR',
          content: contentJson
        }
      });
      successCount++;
      console.log(`✅ Đã thêm Ngữ pháp: ${item.title} (Bài ${item.lesson})`);
    } else {
      await prisma.lessonContent.update({
        where: { id: existingContent.id },
        data: { content: contentJson }
      });
      successCount++;
      console.log(`🔄 Đã cập nhật Ngữ pháp: ${item.title} (Bài ${item.lesson})`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp/cập nhật ${successCount} bài ngữ pháp cho Flyers!`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

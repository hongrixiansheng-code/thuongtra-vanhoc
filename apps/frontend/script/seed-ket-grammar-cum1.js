/**
 * SEED SCRIPT: KET Grammar - Cụm 1 (Bài 0 & 1)
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = {
  0: [ // Lesson orderIndex 0
    {
      title: "1. Câu hỏi đuôi (Question Tags)",
      desc: "Câu hỏi đuôi được dùng ở cuối câu trần thuật để xác nhận lại thông tin. Nếu mệnh đề chính ở thể khẳng định thì câu hỏi đuôi ở thể phủ định, và ngược lại.",
      formula: [
        { text: "(+) S + V ..., Trợ động từ (phủ định) + S?", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
        { text: "(-) S + trợ động từ (phủ định) + V ..., Trợ động từ (khẳng định) + S?", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
      ],
      practiceList: [
        { correct: "You're from Hanoi, aren't you?", meaning: "Bạn đến từ Hà Nội, có phải không?" },
        { correct: "She doesn't know the answer, does she?", meaning: "Cô ấy không biết câu trả lời, có phải không?" },
        { correct: "They have finished their homework, haven't they?", meaning: "Họ đã hoàn thành bài tập về nhà rồi, đúng không?" }
      ]
    },
    {
      title: "2. Phân biệt 'Have got' và 'Have'",
      desc: "Cả 'have got' và 'have' đều có nghĩa là 'có' (sở hữu). 'Have got' thường được dùng trong văn nói ở Anh, trong khi 'have' dùng phổ biến ở Mỹ và trong văn viết.",
      formula: [
        { text: "S + have/has got + Noun (Anh - Anh)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
        { text: "S + have/has + Noun (Anh - Mỹ)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
      ],
      practiceList: [
        { correct: "I have got a new laptop.", meaning: "Tôi có một chiếc máy tính xách tay mới." },
        { correct: "Do you have any brothers or sisters?", meaning: "Bạn có anh chị em nào không?" },
        { correct: "She hasn't got much time.", meaning: "Cô ấy không có nhiều thời gian." }
      ]
    },
    {
      title: "3. Từ để hỏi 'Whose'",
      desc: "'Whose' dùng để hỏi về sự sở hữu (Của ai?). Đứng ngay sau 'Whose' thường là danh từ thuộc quyền sở hữu đó.",
      formula: [
        { text: "Whose + Noun + is/are + (this/that/these/those)?", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
        { text: "Whose + Noun + do/does + S + V?", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
      ],
      practiceList: [
        { correct: "Whose bag is this?", meaning: "Cái túi này là của ai?" },
        { correct: "Whose shoes are those?", meaning: "Những đôi giày kia là của ai?" },
        { correct: "Whose car did you borrow?", meaning: "Bạn đã mượn xe của ai?" }
      ]
    }
  ],
  1: [ // Lesson orderIndex 1
    {
      title: "1. Cấu trúc So ... that",
      desc: "Dùng để diễn tả mức độ của tính từ hoặc trạng từ dẫn đến một kết quả nào đó (Quá ... đến nỗi mà ...).",
      formula: [
        { text: "S + be / V + so + adj / adv + that + S + V", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
      ],
      practiceList: [
        { correct: "She was so nervous that she couldn't speak.", meaning: "Cô ấy đã quá lo lắng đến nỗi không thể nói được." },
        { correct: "The test was so difficult that nobody passed.", meaning: "Bài kiểm tra quá khó đến nỗi không ai vượt qua được." },
        { correct: "He ran so fast that I couldn't catch him.", meaning: "Anh ấy chạy quá nhanh đến nỗi tôi không thể đuổi kịp." }
      ]
    },
    {
      title: "2. Cấu trúc Such a/an ... that",
      desc: "Cũng có nghĩa 'Quá ... đến nỗi mà ...', nhưng 'such' được dùng với danh từ hoặc cụm danh từ (tính từ + danh từ).",
      formula: [
        { text: "S + V + such + (a/an) + adj + noun + that + S + V", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
      ],
      practiceList: [
        { correct: "It was such a beautiful day that we went for a picnic.", meaning: "Đó là một ngày quá đẹp trời đến nỗi chúng tôi đã đi dã ngoại." },
        { correct: "They are such kind people that everyone loves them.", meaning: "Họ là những người quá tốt bụng đến mức ai cũng yêu mến họ." },
        { correct: "He is such a smart boy that he learns everything quickly.", meaning: "Cậu ấy là một cậu bé thông minh đến nỗi học mọi thứ rất nhanh." }
      ]
    },
    {
      title: "3. Tính từ kết hợp Intensifiers (Trạng từ chỉ mức độ)",
      desc: "Dùng các trạng từ chỉ mức độ (really, quite, a bit, very...) đứng trước tính từ để nhấn mạnh hoặc giảm nhẹ mức độ.",
      formula: [
        { text: "S + be + really / quite / a bit / very + Adj", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" }
      ],
      practiceList: [
        { correct: "I am a bit tired today.", meaning: "Hôm nay tôi hơi mệt một chút." },
        { correct: "The movie was quite interesting.", meaning: "Bộ phim khá là thú vị." },
        { correct: "She is very polite to everyone.", meaning: "Cô ấy rất lịch sự với mọi người." }
      ]
    }
  ]
};

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-ket' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program KET (en-ket)!');
    return;
  }

  console.log(`✅ Tìm thấy Program: ${program.name}`);
  let totalSeeded = 0;

  for (const [orderIdxStr, grammarPoints] of Object.entries(GRAMMAR_DATA)) {
    const orderIndex = parseInt(orderIdxStr, 10);
    const targetLesson = program.lessons.find(l => l.orderIndex === orderIndex);
    
    if (!targetLesson) {
      console.log(`Bỏ qua Bài có orderIndex ${orderIndex} vì không tìm thấy trong DB.`);
      continue;
    }

    // Xóa grammar cũ của bài này
    await prisma.lessonContent.deleteMany({
      where: {
        lessonId: targetLesson.id,
        contentType: 'GRAMMAR'
      }
    });

    console.log(`🗑️ Đã xóa nội dung Grammar cũ của Bài ${orderIndex}`);

    // Thêm các grammar points mới
    for (const item of grammarPoints) {
      const contentJson = JSON.stringify({
        title: item.title,
        desc: item.desc,
        formula: item.formula,
        practiceList: item.practiceList
      });

      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'GRAMMAR',
          content: contentJson
        }
      });
      totalSeeded++;
    }
    console.log(`✅ Đã nạp ${grammarPoints.length} chủ điểm ngữ pháp cho Bài ${orderIndex}`);
  }

  console.log(`\n🎉 Hoàn thành nạp ${totalSeeded} chủ điểm ngữ pháp cho Cụm 1!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

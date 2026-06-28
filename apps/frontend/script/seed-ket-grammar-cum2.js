/**
 * SEED SCRIPT: KET Grammar - Cụm 2 (Bài 3 & 4 - orderIndex 2 & 3)
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = {
  2: [ // Lesson orderIndex 2 (Bài 3: Ngoại hình & thời trang)
    {
      title: "1. Phân biệt 'look like' và 'look'",
      desc: "'Look like' theo sau bởi danh từ dùng để chỉ sự giống nhau về ngoại hình. 'Look' theo sau bởi tính từ dùng để miêu tả vẻ ngoài hoặc cảm giác mang lại.",
      formula: [
        { text: "S + look(s) like + Noun", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
        { text: "S + look(s) + Adjective", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
      ],
      practiceList: [
        { correct: "He looks like his father.", meaning: "Cậu ấy trông giống bố cậu ấy." },
        { correct: "She looks very tired today.", meaning: "Hôm nay cô ấy trông rất mệt mỏi." },
        { correct: "That dress looks like a princess dress.", meaning: "Chiếc váy đó trông giống như váy công chúa." }
      ]
    },
    {
      title: "2. Câu bị động sơ cấp (Chất liệu)",
      desc: "Dùng để mô tả một vật được làm bằng chất liệu gì. Cấu trúc dùng 'be made of' khi chất liệu gốc vẫn có thể nhìn thấy được.",
      formula: [
        { text: "S (Vật) + be + made of + Noun (chất liệu)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
      ],
      practiceList: [
        { correct: "This bag is made of leather.", meaning: "Chiếc túi này được làm bằng da." },
        { correct: "My earrings are made of gold.", meaning: "Đôi khuyên tai của tôi được làm bằng vàng." },
        { correct: "Is this table made of wood?", meaning: "Cái bàn này được làm bằng gỗ phải không?" }
      ]
    },
    {
      title: "3. Phân biệt 'be wearing' và 'have got on'",
      desc: "Cả hai đều dùng để mô tả trang phục mà ai đó đang mặc trên người ở hiện tại (thì hiện tại tiếp diễn).",
      formula: [
        { text: "S + am/is/are + wearing + trang phục", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
        { text: "S + have/has + got on + trang phục", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
      ],
      practiceList: [
        { correct: "She is wearing a red dress today.", meaning: "Hôm nay cô ấy đang mặc một chiếc váy đỏ." },
        { correct: "What has he got on?", meaning: "Anh ấy đang mặc gì vậy?" },
        { correct: "They are wearing school uniforms.", meaning: "Họ đang mặc đồng phục học sinh." }
      ]
    }
  ],
  3: [ // Lesson orderIndex 3 (Bài 4: Nhà cửa & nội thất mở rộng)
    {
      title: "1. Câu bị động thì Hiện tại đơn",
      desc: "Câu bị động được dùng khi muốn nhấn mạnh vào đối tượng chịu tác động (hành động thường xuyên xảy ra).",
      formula: [
        { text: "(+) S (vật) + am/is/are + V(p.p)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" },
        { text: "(-) S (vật) + am/is/are + not + V(p.p)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" }
      ],
      practiceList: [
        { correct: "The house is cleaned every day.", meaning: "Ngôi nhà được dọn dẹp mỗi ngày." },
        { correct: "The heating is turned on at 6 a.m.", meaning: "Lò sưởi được bật lúc 6 giờ sáng." },
        { correct: "Dinner is served in the dining room.", meaning: "Bữa tối được phục vụ trong phòng ăn." }
      ]
    },
    {
      title: "2. Cấu trúc Need + V-ing",
      desc: "Khi chủ ngữ là một vật cần được sửa chữa hoặc dọn dẹp, ta dùng 'need + V-ing' (mang nghĩa bị động).",
      formula: [
        { text: "S (Vật) + need / needs + V-ing", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
      ],
      practiceList: [
        { correct: "The drawer needs fixing.", meaning: "Cái ngăn kéo cần được sửa." },
        { correct: "The carpet needs cleaning.", meaning: "Tấm thảm cần được giặt." },
        { correct: "These windows need washing.", meaning: "Những cái cửa sổ này cần được lau rửa." }
      ]
    },
    {
      title: "3. Ôn tập 'Have got' mô tả nhà cửa",
      desc: "Dùng để liệt kê các phòng, thiết bị hoặc đặc điểm của một ngôi nhà.",
      formula: [
        { text: "S + have/has got + (số lượng/mạo từ) + Noun", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" }
      ],
      practiceList: [
        { correct: "My house has got three bedrooms.", meaning: "Nhà tôi có ba phòng ngủ." },
        { correct: "We haven't got a garden.", meaning: "Chúng tôi không có khu vườn nào." },
        { correct: "Has it got a balcony?", meaning: "Nó có ban công không?" }
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

  let totalSeeded = 0;

  for (const [orderIdxStr, grammarPoints] of Object.entries(GRAMMAR_DATA)) {
    const orderIndex = parseInt(orderIdxStr, 10);
    const targetLesson = program.lessons.find(l => l.orderIndex === orderIndex);
    
    if (!targetLesson) {
      console.log(`Bỏ qua Bài có orderIndex ${orderIndex} vì không tìm thấy trong DB.`);
      continue;
    }

    await prisma.lessonContent.deleteMany({
      where: {
        lessonId: targetLesson.id,
        contentType: 'GRAMMAR'
      }
    });

    console.log(`🗑️ Đã xóa nội dung Grammar cũ của Bài ${orderIndex}`);

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

  console.log(`\\n🎉 Hoàn thành nạp ${totalSeeded} chủ điểm ngữ pháp cho Cụm 2!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

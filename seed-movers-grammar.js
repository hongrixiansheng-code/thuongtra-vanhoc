/**
 * SEED SCRIPT: Movers Grammar (25 bài theo chuẩn Cambridge A1+)
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = [
  {
    lesson: 1, title: "Khả năng (Can / Can't)", desc: "Dùng để nói về khả năng hoặc sự không có khả năng làm gì đó.",
    formula: [
      { text: "(+) S + can + V(nguyên thể)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(-) S + cannot/can't + V(nguyên thể)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "I can swim very well.", meaning: "Tôi có thể bơi rất giỏi." },
      { correct: "She can't ride a bike.", meaning: "Cô ấy không thể đi xe đạp." }
    ]
  },
  {
    lesson: 2, title: "Hiện tại tiếp diễn (Present Continuous)", desc: "Diễn tả hành động đang xảy ra tại thời điểm nói.",
    formula: [
      { text: "(+) S + am/is/are + V-ing", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(-) S + am/is/are + not + V-ing", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "They are playing football now.", meaning: "Họ đang chơi bóng đá bây giờ." },
      { correct: "I am not watching TV.", meaning: "Tôi đang không xem TV." }
    ]
  },
  {
    lesson: 3, title: "Hỏi đáp sức khỏe", desc: "Dùng để hỏi thăm và trả lời về tình trạng sức khỏe.",
    formula: [
      { text: "(?) How are you feeling?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
      { text: "(+) I have a + [bệnh]", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
    ],
    practiceList: [
      { correct: "How are you feeling?", meaning: "Bạn cảm thấy thế nào?" },
      { correct: "I have a headache.", meaning: "Tôi bị đau đầu." },
      { correct: "My stomach hurts.", meaning: "Bụng tôi bị đau." }
    ]
  },
  {
    lesson: 4, title: "So sánh hơn (Comparatives)", desc: "So sánh tính chất giữa hai người hoặc vật.",
    formula: [
      { text: "(+) S + am/is/are + adj-er + than + O", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(+) S + am/is/are + more + long-adj + than + O", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "A dog is smaller than an elephant.", meaning: "Một con chó thì nhỏ hơn một con voi." },
      { correct: "This book is more interesting than that one.", meaning: "Quyển sách này thú vị hơn quyển kia." }
    ]
  },
  {
    lesson: 5, title: "So sánh nhất (Superlatives)", desc: "So sánh một người hoặc vật với toàn bộ nhóm.",
    formula: [
      { text: "(+) S + am/is/are + the + adj-est", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(+) S + am/is/are + the most + long-adj", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "He is the tallest boy in the class.", meaning: "Cậu ấy là cậu bé cao nhất lớp." },
      { correct: "It is the most beautiful flower.", meaning: "Đó là bông hoa đẹp nhất." }
    ]
  },
  {
    lesson: 6, title: "Some và Any", desc: "Dùng để nói về số lượng không xác định.",
    formula: [
      { text: "Some: Dùng trong câu khẳng định/mời", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "Any: Dùng trong câu phủ định/nghi vấn", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "I have some apples.", meaning: "Tôi có một vài quả táo." },
      { correct: "Do you have any brothers?", meaning: "Bạn có người anh em trai nào không?" }
    ]
  },
  {
    lesson: 7, title: "Would like", desc: "Dùng để đưa ra lời mời hoặc yêu cầu lịch sự.",
    formula: [
      { text: "(+) S + would like + to V / N", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(?) Would you like + to V / N?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "I would like a cup of tea, please.", meaning: "Tôi muốn một tách trà." },
      { correct: "Would you like to come with us?", meaning: "Bạn có muốn đi cùng chúng tôi không?" }
    ]
  },
  {
    lesson: 8, title: "Đại từ sở hữu", desc: "Dùng thay thế cho tính từ sở hữu + danh từ (mine, yours, his, hers...).",
    formula: [
      { text: "(+) S + V + đại từ sở hữu", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
    ],
    practiceList: [
      { correct: "This book is mine.", meaning: "Quyển sách này là của tôi." },
      { correct: "Is that bag yours?", meaning: "Cái túi đó có phải của bạn không?" }
    ]
  },
  {
    lesson: 9, title: "Giới từ vị trí nâng cao", desc: "Dùng để mô tả vị trí của vật hoặc người (above, below, opposite, between).",
    formula: [
      { text: "Giới từ: opposite, between, above, below", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "The bank is opposite the school.", meaning: "Ngân hàng nằm đối diện trường học." },
      { correct: "The picture is above the bed.", meaning: "Bức tranh ở phía trên cái giường." }
    ]
  },
  {
    lesson: 10, title: "Made of (Chất liệu)", desc: "Dùng để nói đồ vật được làm từ chất liệu gì.",
    formula: [
      { text: "(+) S + am/is/are + made of + N(chất liệu)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
    ],
    practiceList: [
      { correct: "The table is made of wood.", meaning: "Cái bàn được làm bằng gỗ." },
      { correct: "These shoes are made of leather.", meaning: "Đôi giày này được làm bằng da." }
    ]
  },
  {
    lesson: 11, title: "Câu mệnh lệnh chỉ đường", desc: "Dùng để hướng dẫn người khác đi lại.",
    formula: [
      { text: "Go straight / Turn left / Turn right", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "Go straight on and turn left.", meaning: "Đi thẳng và rẽ trái." },
      { correct: "Turn right at the traffic lights.", meaning: "Rẽ phải ở cột đèn giao thông." }
    ]
  },
  {
    lesson: 12, title: "Must / Mustn't", desc: "Dùng để nói về nghĩa vụ bắt buộc hoặc điều cấm đoán.",
    formula: [
      { text: "(+) S + must + V(nguyên thể)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(-) S + mustn't + V(nguyên thể)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "You must listen to the teacher.", meaning: "Bạn phải lắng nghe giáo viên." },
      { correct: "You mustn't run in the corridor.", meaning: "Bạn không được chạy trên hành lang." }
    ]
  },
  {
    lesson: 13, title: "Giới từ phương tiện", desc: "Cách nói về việc đi lại bằng phương tiện gì (by bus, on foot).",
    formula: [
      { text: "by + xe (bus, car, train) / on + foot", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
    ],
    practiceList: [
      { correct: "I go to school by bus.", meaning: "Tôi đi học bằng xe buýt." },
      { correct: "She usually goes on foot.", meaning: "Cô ấy thường đi bộ." }
    ]
  },
  {
    lesson: 14, title: "Giới từ thời gian IN/ON/AT", desc: "Dùng để chỉ thời điểm (at), ngày (on) hoặc tháng/năm/buổi (in).",
    formula: [
      { text: "in (tháng, năm), on (ngày), at (giờ)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "I get up at 7 o'clock.", meaning: "Tôi thức dậy lúc 7 giờ." },
      { correct: "My birthday is in May.", meaning: "Sinh nhật của tôi vào tháng Năm." }
    ]
  },
  {
    lesson: 15, title: "Thời tiết", desc: "Mô tả thời tiết hôm nay hoặc các mùa.",
    formula: [
      { text: "(?) What's the weather like?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
      { text: "(+) It is + adj (sunny, raining...)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
    ],
    practiceList: [
      { correct: "What's the weather like today?", meaning: "Hôm nay thời tiết thế nào?" },
      { correct: "It is sunny and hot.", meaning: "Trời nắng và nóng." }
    ]
  },
  {
    lesson: 16, title: "Quá khứ TO BE", desc: "Dùng to be ở quá khứ (was / were).",
    formula: [
      { text: "(+) I/He/She/It + was", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(+) You/We/They + were", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "I was at home yesterday.", meaning: "Hôm qua tôi đã ở nhà." },
      { correct: "They were happy.", meaning: "Họ đã rất vui." }
    ]
  },
  {
    lesson: 17, title: "Quá khứ có quy tắc", desc: "Động từ quá khứ thêm đuôi -ed.",
    formula: [
      { text: "(+) S + V-ed", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(-) S + didn't + V(nguyên thể)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "I played football yesterday.", meaning: "Hôm qua tôi đã chơi bóng đá." },
      { correct: "She watched a film last night.", meaning: "Cô ấy đã xem một bộ phim tối qua." }
    ]
  },
  {
    lesson: 18, title: "Quá khứ bất quy tắc", desc: "Những động từ thay đổi hình thức ở quá khứ (go -> went, see -> saw).",
    formula: [
      { text: "(+) S + V(cột 2)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(?) Did + S + V(nguyên thể)?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "We went to the zoo.", meaning: "Chúng tôi đã đi sở thú." },
      { correct: "I saw a monkey.", meaning: "Tôi đã nhìn thấy một con khỉ." }
    ]
  },
  {
    lesson: 19, title: "Tương lai gần (Be going to)", desc: "Diễn tả một kế hoạch hoặc dự định trong tương lai.",
    formula: [
      { text: "(+) S + am/is/are + going to + V", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(-) S + am/is/are + not + going to + V", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "I am going to visit my grandma.", meaning: "Tôi dự định sẽ đi thăm bà." },
      { correct: "They are going to play tennis.", meaning: "Họ dự định sẽ chơi quần vợt." }
    ]
  },
  {
    lesson: 20, title: "Số thứ tự", desc: "Dùng để chỉ ngày trong tháng, xếp hạng (first, second, third...).",
    formula: [
      { text: "first (1st), second (2nd), third (3rd)...", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "My birthday is on the first of May.", meaning: "Sinh nhật tôi vào ngày mùng một tháng Năm." },
      { correct: "She won the first prize.", meaning: "Cô ấy đã giành giải nhất." }
    ]
  },
  {
    lesson: 21, title: "To + V chỉ mục đích", desc: "Dùng động từ nguyên mẫu có to (to V) để nói về mục đích của hành động.",
    formula: [
      { text: "S + V + to V (Để làm gì...)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
    ],
    practiceList: [
      { correct: "I went to the shop to buy some milk.", meaning: "Tôi đã đến cửa hàng để mua một ít sữa." },
      { correct: "He runs every day to keep fit.", meaning: "Anh ấy chạy mỗi ngày để giữ dáng." }
    ]
  },
  {
    lesson: 22, title: "Trạng từ tần suất", desc: "Chỉ mức độ thường xuyên của hành động (always, usually, sometimes, never).",
    formula: [
      { text: "S + trạng từ + V (thường)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "S + to be + trạng từ", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "I always do my homework.", meaning: "Tôi luôn luôn làm bài tập về nhà." },
      { correct: "He is never late.", meaning: "Anh ấy không bao giờ đến muộn." }
    ]
  },
  {
    lesson: 23, title: "Mệnh đề quan hệ WHO", desc: "Dùng WHO để thay thế cho danh từ chỉ người.",
    formula: [
      { text: "N(người) + who + V", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
    ],
    practiceList: [
      { correct: "The boy who is wearing a red shirt is my brother.", meaning: "Cậu bé mặc áo đỏ là anh trai tôi." },
      { correct: "I know the man who lives here.", meaning: "Tôi biết người đàn ông sống ở đây." }
    ]
  },
  {
    lesson: 24, title: "Trật tự tính từ", desc: "Cách sắp xếp các tính từ trước danh từ (Opinion - Size - Age - Color - Origin - Material).",
    formula: [
      { text: "Opinion + Size + Age + Color + ... + N", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "A beautiful big red car.", meaning: "Một chiếc ô tô màu đỏ to và đẹp." },
      { correct: "An old wooden chair.", meaning: "Một cái ghế gỗ cũ." }
    ]
  },
  {
    lesson: 25, title: "WH Questions ôn tập", desc: "Ôn tập các từ để hỏi: Who, What, Where, When, Why, How.",
    formula: [
      { text: "WH-word + trợ động từ + S + V?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "Where do you live?", meaning: "Bạn sống ở đâu?" },
      { correct: "Why are you sad?", meaning: "Tại sao bạn lại buồn?" },
      { correct: "When is your birthday?", meaning: "Sinh nhật bạn khi nào?" }
    ]
  }
];

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-movers' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program Movers (en-movers)!');
    return;
  }

  // Đảm bảo tạo bài 1-25 nếu chưa có
  for (let i = 1; i <= 25; i++) {
    const existingLesson = program.lessons.find(l => l.orderIndex === i);
    if (!existingLesson) {
      const newLesson = await prisma.lesson.create({
        data: {
          programId: program.id,
          orderIndex: i,
          title: `Bài ${i}`,
        }
      });
      program.lessons.push(newLesson);
    }
  }

  let successCount = 0;

  for (const item of GRAMMAR_DATA) {
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!targetLesson) continue;

    const contentJson = JSON.stringify({
      id: `movers-grammar-${item.lesson}`,
      title: item.title,
      desc: item.desc,
      formula: item.formula,
      practiceList: item.practiceList
    });

    const existing = await prisma.lessonContent.findFirst({
      where: {
        lessonId: targetLesson.id,
        contentType: 'GRAMMAR'
      }
    });

    if (!existing) {
      await prisma.lessonContent.create({
        data: { lessonId: targetLesson.id, contentType: 'GRAMMAR', content: contentJson }
      });
      successCount++;
      console.log(`✅ Đã thêm ngữ pháp: ${item.title} (Bài ${item.lesson})`);
    } else {
      await prisma.lessonContent.update({
        where: { id: existing.id },
        data: { content: contentJson }
      });
      console.log(`🔄 Đã cập nhật ngữ pháp: ${item.title} (Bài ${item.lesson})`);
    }
  }

  // Nếu muốn update title của lesson cho trực quan:
  for (const item of GRAMMAR_DATA) {
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (targetLesson && targetLesson.title !== item.title) {
        await prisma.lesson.update({
            where: { id: targetLesson.id },
            data: { title: item.title }
        });
    }
  }

  console.log(`\n🎉 Hoàn thành nạp/cập nhật ${successCount || GRAMMAR_DATA.length} chủ điểm ngữ pháp cho Movers!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

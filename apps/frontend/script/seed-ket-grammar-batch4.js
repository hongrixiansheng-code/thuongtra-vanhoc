/**
 * SEED SCRIPT: KET Grammar - Cụm 15,16,17,18 (Bài 29 -> 36)
 * orderIndex: 28 -> 35
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = {
  28: [ // Bài 29
    {
      title: "1. Cụm động từ: Look forward to + V-ing",
      desc: "Lưu ý giới từ 'to' trong cụm này luôn đi kèm với danh động từ (V-ing), diễn tả sự mong đợi háo hức.",
      formula: [ { text: "S + look(s) / am looking forward to + V-ing", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" } ],
      practiceList: [
        { correct: "I look forward to hearing from you.", meaning: "Tôi mong chờ nhận được tin từ bạn." },
        { correct: "We are looking forward to going on holiday.", meaning: "Chúng tôi đang rất mong chờ được đi nghỉ mát." },
        { correct: "She looks forward to meeting him.", meaning: "Cô ấy mong chờ được gặp anh ấy." }
      ]
    },
    {
      title: "2. Cụm động từ bắt đầu / từ bỏ thói quen",
      desc: "Sử dụng take up (bắt đầu một sở thích) và give up (từ bỏ một thói quen), theo sau là V-ing.",
      formula: [ { text: "Take up / Give up + V-ing / Noun", classes: "bg-green-100 text-green-700 border-green-300 font-bold" } ],
      practiceList: [
        { correct: "He gave up smoking last year.", meaning: "Anh ấy đã bỏ hút thuốc vào năm ngoái." },
        { correct: "I want to take up learning Spanish.", meaning: "Tôi muốn bắt đầu học tiếng Tây Ban Nha." },
        { correct: "She took up yoga to relax.", meaning: "Cô ấy bắt đầu tập yoga để thư giãn." }
      ]
    },
    {
      title: "3. Phân biệt Phrasal Verbs tách được và không tách được",
      desc: "Tách được: turn it on. Không tách được: look after a baby (không thể look a baby after).",
      formula: [
        { text: "Tách được: Turn + O + on/off", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
        { text: "Không tách được: Look after + O", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
      ],
      practiceList: [
        { correct: "Please pick it up.", meaning: "Làm ơn nhặt nó lên." },
        { correct: "I have to look after my sister.", meaning: "Tôi phải chăm sóc em gái tôi." },
        { correct: "We set off early in the morning.", meaning: "Chúng tôi khởi hành từ sáng sớm." }
      ]
    }
  ],
  29: [ // Bài 30
    {
      title: "1. Động từ theo sau bởi To-infinitive",
      desc: "Các động từ chỉ dự định, hứa hẹn, hy vọng: manage, afford, refuse, agree, offer, decide, hope, expect.",
      formula: [ { text: "S + manage / refuse / decide / hope + to-V", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "We managed to finish the project on time.", meaning: "Chúng tôi đã xoay sở hoàn thành dự án đúng hạn." },
        { correct: "She refused to answer the question.", meaning: "Cô ấy đã từ chối trả lời câu hỏi." },
        { correct: "I can't afford to buy this car.", meaning: "Tôi không đủ khả năng mua chiếc xe này." }
      ]
    },
    {
      title: "2. Động từ theo sau bởi Gerund (V-ing)",
      desc: "Các động từ chỉ sự tránh né, tận hưởng, xem xét: avoid, enjoy, finish, suggest, consider, keep.",
      formula: [ { text: "S + avoid / suggest / keep + V-ing", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "He avoids driving in the heavy rain.", meaning: "Anh ấy tránh lái xe trong cơn mưa lớn." },
        { correct: "Keep trying, don't give up!", meaning: "Cứ tiếp tục cố gắng, đừng bỏ cuộc!" },
        { correct: "I suggest taking a taxi.", meaning: "Tôi đề nghị đi taxi." }
      ]
    },
    {
      title: "3. Động từ theo sau bởi cả hai (Khác nghĩa)",
      desc: "Remember to do (nhớ phải làm gì) vs Remember doing (nhớ đã làm gì trong quá khứ).",
      formula: [
        { text: "Remember / Forget / Stop + to-V", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" },
        { text: "Remember / Forget / Stop + V-ing", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
      ],
      practiceList: [
        { correct: "I remembered to lock the door.", meaning: "Tôi đã nhớ việc phải khóa cửa." },
        { correct: "I remember meeting him before.", meaning: "Tôi nhớ là đã gặp anh ấy trước đây." },
        { correct: "He stopped to smoke.", meaning: "Anh ấy đã dừng lại để hút thuốc." }
      ]
    }
  ],
  30: [ // Bài 31
    {
      title: "1. Ôn tập Question Tags tổng hợp",
      desc: "Tổng ôn các dạng câu hỏi đuôi đặc biệt hoặc thông thường.",
      formula: [ { text: "Câu chính (+), Trợ ĐT (-) + S? / Câu chính (-), Trợ ĐT (+) + S?", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" } ],
      practiceList: [
        { correct: "They haven't finished, have they?", meaning: "Họ chưa làm xong, có phải không?" },
        { correct: "She will come, won't she?", meaning: "Cô ấy sẽ đến, có phải không?" },
        { correct: "You are a student, aren't you?", meaning: "Bạn là một học sinh, có phải không?" }
      ]
    },
    {
      title: "2. Từ nối trong văn viết (Transitions)",
      desc: "Sử dụng moreover (hơn nữa), therefore (vì vậy), besides (ngoài ra) để liên kết ý tưởng.",
      formula: [ { text: "S + V; therefore, S + V. / S + V. Besides, S + V.", classes: "bg-green-100 text-green-700 border-green-300 font-bold" } ],
      practiceList: [
        { correct: "He was tired; therefore, he went to sleep.", meaning: "Anh ấy mệt; vì vậy, anh ấy đã đi ngủ." },
        { correct: "I don't like this phone. Besides, it's too expensive.", meaning: "Tôi không thích chiếc điện thoại này. Ngoài ra, nó còn quá đắt." },
        { correct: "The food was bad. Moreover, the service was slow.", meaning: "Đồ ăn rất tệ. Hơn nữa, dịch vụ lại chậm." }
      ]
    },
    {
      title: "3. Phân biệt So / Because / Although",
      desc: "So (kết quả), Because (nguyên nhân), Although (tương phản).",
      formula: [ { text: "S + V + so/because/although + S + V", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "I was sick, so I didn't go to work.", meaning: "Tôi bị ốm, vì vậy tôi đã không đi làm." },
        { correct: "I didn't go to work because I was sick.", meaning: "Tôi đã không đi làm vì tôi bị ốm." },
        { correct: "Although I was sick, I went to work.", meaning: "Mặc dù bị ốm, tôi vẫn đi làm." }
      ]
    }
  ],
  31: [ // Bài 32
    {
      title: "1. Câu mệnh lệnh trong biển hiệu (Imperative)",
      desc: "Cách ra lệnh, yêu cầu thường gặp trên các biển báo, hướng dẫn công cộng.",
      formula: [
        { text: "Do not + V / No + V-ing", classes: "bg-red-100 text-red-700 border-red-300 font-bold" },
        { text: "V(nguyên thể) / Please + V", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
      ],
      practiceList: [
        { correct: "No parking.", meaning: "Cấm đỗ xe." },
        { correct: "Please switch off your mobile phones.", meaning: "Vui lòng tắt điện thoại di động của bạn." },
        { correct: "Do not enter.", meaning: "Cấm vào." }
      ]
    },
    {
      title: "2. Câu bị động trong thông báo",
      desc: "Sử dụng câu bị động để diễn tả những điều cấm/được phép mang tính quy định chung.",
      formula: [ { text: "S + be + permitted / allowed / kept + (by/on...)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "Entry is not permitted.", meaning: "Không được phép vào." },
        { correct: "Dogs must be kept on leads.", meaning: "Chó phải được xích lại." },
        { correct: "Smoking is not allowed here.", meaning: "Không được phép hút thuốc ở đây." }
      ]
    },
    {
      title: "3. Động từ khuyết thiếu trong biển hiệu",
      desc: "Dùng must (bắt buộc), may not (không được phép) trên các biển thông báo.",
      formula: [ { text: "Passengers / Visitors + must / may not + V", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "Passengers must present their tickets.", meaning: "Hành khách phải xuất trình vé." },
        { correct: "You may not take photos here.", meaning: "Bạn không được chụp ảnh ở đây." },
        { correct: "Visitors must sign in at the desk.", meaning: "Khách viếng thăm phải ký tên tại bàn tiếp tân." }
      ]
    }
  ],
  32: [ // Bài 33
    {
      title: "1. Cấu trúc Email A2",
      desc: "Các mẫu câu mở đầu và kết thúc tiêu chuẩn khi viết thư hay email ngắn.",
      formula: [
        { text: "Dear / Hi + Tên,", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
        { text: "Thanks for... / I'm writing to... / Hope to hear from you soon.", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
      ],
      practiceList: [
        { correct: "Thanks for your email.", meaning: "Cảm ơn vì email của bạn." },
        { correct: "I'm writing to invite you to my party.", meaning: "Tôi viết thư này để mời bạn đến bữa tiệc của tôi." },
        { correct: "Hope to hear from you soon.", meaning: "Hy vọng sớm nhận được tin từ bạn." }
      ]
    },
    {
      title: "2. Mời và từ chối lịch sự",
      desc: "Mẫu câu dùng để rủ rê ai đó đi chơi và cách từ chối khéo léo.",
      formula: [
        { text: "Would you like to + V?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
        { text: "I'd love to, but I'm afraid I can't.", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" }
      ],
      practiceList: [
        { correct: "Would you like to go to the cinema?", meaning: "Bạn có muốn đi xem phim không?" },
        { correct: "I'm afraid I can't come to your party.", meaning: "Tôi e rằng tôi không thể đến bữa tiệc của bạn." },
        { correct: "I would love to, but I have to study.", meaning: "Tôi rất muốn, nhưng tôi phải học bài." }
      ]
    },
    {
      title: "3. Đưa ra lời đề xuất",
      desc: "Gợi ý các kế hoạch thay thế hoặc ý tưởng mới.",
      formula: [
        { text: "Why don't we + V(nguyên thể)?", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
        { text: "How about / What about + V-ing?", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
      ],
      practiceList: [
        { correct: "Why don't we meet at 6 p.m.?", meaning: "Tại sao chúng ta không gặp nhau lúc 6 giờ tối nhỉ?" },
        { correct: "How about going to the park?", meaning: "Đến công viên thì sao?" },
        { correct: "What about ordering some pizza?", meaning: "Gọi chút bánh pizza thì sao nhỉ?" }
      ]
    }
  ],
  33: [ // Bài 34
    {
      title: "1. Lịch sự trong giao tiếp thực tế",
      desc: "Dùng các cụm từ mở đầu nhẹ nhàng khi phàn nàn, từ chối hay báo tin không vui.",
      formula: [ { text: "I'm sorry, but... / I'm afraid...", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "I'm sorry, but the soup is cold.", meaning: "Xin lỗi, nhưng món súp bị nguội rồi." },
        { correct: "I'm afraid we don't have any left.", meaning: "Tôi e rằng chúng tôi không còn món nào." },
        { correct: "I'm sorry to hear that your flight was delayed.", meaning: "Rất tiếc khi nghe tin chuyến bay của bạn bị hoãn." }
      ]
    },
    {
      title: "2. Giao tiếp qua điện thoại",
      desc: "Cấu trúc tiêu chuẩn khi nhấc máy, chuyển lời hoặc hứa gọi lại.",
      formula: [
        { text: "This is + Tên + speaking.", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
        { text: "Can I take a message? / I'll call back.", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
      ],
      practiceList: [
        { correct: "Hello, this is John speaking.", meaning: "Xin chào, John đang nghe máy đây." },
        { correct: "He is not here. Can I take a message?", meaning: "Anh ấy không có ở đây. Tôi có thể nhận lời nhắn không?" },
        { correct: "I'm busy now, I will call back later.", meaning: "Bây giờ tôi đang bận, tôi sẽ gọi lại sau." }
      ]
    },
    {
      title: "3. Câu hỏi đuôi trong hội thoại",
      desc: "Dùng để kiểm tra thông tin hoặc khuyến khích người nghe đồng ý.",
      formula: [ { text: "It's a nice day, isn't it?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" } ],
      practiceList: [
        { correct: "You booked the table, didn't you?", meaning: "Bạn đã đặt bàn rồi, phải không?" },
        { correct: "The food is delicious, isn't it?", meaning: "Đồ ăn ngon tuyệt, phải không nào?" },
        { correct: "We are going to be late, aren't we?", meaning: "Chúng ta sắp bị muộn rồi, phải không?" }
      ]
    }
  ],
  34: [ // Bài 35
    {
      title: "1. Ôn tập Tất cả các Thì (Tenses)",
      desc: "Hệ thống hóa lại 4 thì quan trọng nhất: Hiện tại đơn, Quá khứ đơn, Hiện tại hoàn thành, Tương lai.",
      formula: [ { text: "Present, Past, Present Perfect, Future", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" } ],
      practiceList: [
        { correct: "I have lived here for 5 years.", meaning: "Tôi đã sống ở đây được 5 năm." },
        { correct: "He works in a bank.", meaning: "Anh ấy làm việc ở ngân hàng." },
        { correct: "We will travel to Japan next year.", meaning: "Chúng tôi sẽ đi du lịch Nhật Bản vào năm tới." }
      ]
    },
    {
      title: "2. Ôn tập Câu bị động & Câu tường thuật",
      desc: "Chuyển đổi câu chủ động sang bị động và câu trực tiếp sang câu gián tiếp.",
      formula: [
        { text: "S + be + V(p.p)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
        { text: "S + said (that) + S + V(lùi thì)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
      ],
      practiceList: [
        { correct: "The bridge was built last year.", meaning: "Cây cầu được xây dựng năm ngoái." },
        { correct: "She said she was happy.", meaning: "Cô ấy nói cô ấy đang hạnh phúc." },
        { correct: "The email has been sent.", meaning: "Email đã được gửi đi." }
      ]
    },
    {
      title: "3. Phân biệt Câu điều kiện 1 & 2",
      desc: "Điều kiện có thật (loại 1) và không có thật (loại 2) ở hiện tại/tương lai.",
      formula: [
        { text: "Loại 1: If + HTĐ, Tương lai", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
        { text: "Loại 2: If + QKĐ, Would + V", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
      ],
      practiceList: [
        { correct: "If it rains, we won't go out.", meaning: "Nếu trời mưa, chúng ta sẽ không đi chơi." },
        { correct: "If I won the lottery, I would buy a big house.", meaning: "Nếu tôi trúng xổ số, tôi sẽ mua một ngôi nhà lớn." },
        { correct: "If I had more time, I would learn French.", meaning: "Nếu tôi có nhiều thời gian hơn, tôi sẽ học tiếng Pháp." }
      ]
    }
  ],
  35: [ // Bài 36
    {
      title: "1. KET Reading Part 1 (Đọc biển hiệu)",
      desc: "Chiến lược đọc các loại thông báo, biển hiệu ngắn và chọn ý nghĩa tương đương.",
      formula: [ { text: "Chú ý các từ cấm đoán, bắt buộc (must, no, not permitted)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "Entry is not permitted. (You cannot go in)", meaning: "Không được phép vào. (Bạn không thể đi vào)" },
        { correct: "Staff only. (Only workers can enter)", meaning: "Chỉ dành cho nhân viên. (Chỉ người lao động mới được vào)" },
        { correct: "Keep off the grass.", meaning: "Không giẫm lên cỏ." }
      ]
    },
    {
      title: "2. KET Writing Part 7 (Viết Email)",
      desc: "Viết email từ 35-45 từ phản hồi ba gợi ý cho sẵn (như lời cảm ơn, đề xuất thời gian, từ chối).",
      formula: [ { text: "Chào hỏi + 3 ý trả lời + Kết thư", classes: "bg-green-100 text-green-700 border-green-300 font-bold" } ],
      practiceList: [
        { correct: "Hope to hear from you soon.", meaning: "Hy vọng sớm nhận được tin từ bạn." },
        { correct: "I am writing to tell you about my trip.", meaning: "Tôi viết thư để kể cho bạn về chuyến đi của tôi." },
        { correct: "See you on Saturday.", meaning: "Hẹn gặp bạn vào thứ Bảy." }
      ]
    },
    {
      title: "3. KET Speaking Part 2 (Mô tả ảnh)",
      desc: "Kỹ năng miêu tả người, đồ vật và hoạt động trong một bức ảnh.",
      formula: [ { text: "In the picture, I can see... / They are V-ing...", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "In the picture, I can see two people.", meaning: "Trong bức tranh, tôi có thể thấy hai người." },
        { correct: "They are playing football in the park.", meaning: "Họ đang chơi bóng đá trong công viên." },
        { correct: "The boy on the left is wearing a red shirt.", meaning: "Cậu bé bên trái đang mặc một chiếc áo sơ mi đỏ." }
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
    console.error('❌ Không tìm thấy program KET!');
    return;
  }

  let totalSeeded = 0;

  for (const [orderIdxStr, grammarPoints] of Object.entries(GRAMMAR_DATA)) {
    const orderIndex = parseInt(orderIdxStr, 10);
    const targetLesson = program.lessons.find(l => l.orderIndex === orderIndex);
    
    if (!targetLesson) continue;

    await prisma.lessonContent.deleteMany({
      where: {
        lessonId: targetLesson.id,
        contentType: 'GRAMMAR'
      }
    });

    for (const item of grammarPoints) {
      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'GRAMMAR',
          content: JSON.stringify(item)
        }
      });
      totalSeeded++;
    }
    console.log(`✅ Đã nạp ${grammarPoints.length} chủ điểm ngữ pháp cho Bài ${orderIndex}`);
  }

  console.log(`\\n🎉 Hoàn thành nạp ${totalSeeded} chủ điểm ngữ pháp cho batch 4!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

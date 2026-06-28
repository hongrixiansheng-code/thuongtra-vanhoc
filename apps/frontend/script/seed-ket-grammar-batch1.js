/**
 * SEED SCRIPT: KET Grammar - Cụm 3,4,5,6 (Bài 5 -> 12)
 * orderIndex: 4 -> 11
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = {
  4: [ // Bài 5
    {
      title: "1. Câu bị động thì Quá khứ đơn",
      desc: "Nhấn mạnh vào đối tượng chịu tác động đã xảy ra trong quá khứ.",
      formula: [ { text: "S (vật) + was/were + V(p.p)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" } ],
      practiceList: [
        { correct: "The flat was built in 2010.", meaning: "Căn hộ được xây dựng vào năm 2010." },
        { correct: "The room was cleaned yesterday.", meaning: "Căn phòng đã được dọn dẹp ngày hôm qua." },
        { correct: "These chairs were bought last week.", meaning: "Những chiếc ghế này được mua vào tuần trước." }
      ]
    },
    {
      title: "2. Phân biệt từ 'floor'",
      desc: "Từ 'floor' vừa có nghĩa là 'sàn nhà', vừa có nghĩa là 'tầng' trong một tòa nhà.",
      formula: [ { text: "on the + số thứ tự + floor (trên tầng mấy)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" } ],
      practiceList: [
        { correct: "My apartment is on the third floor.", meaning: "Căn hộ của tôi ở tầng ba." },
        { correct: "Please clean the floor.", meaning: "Làm ơn lau sàn nhà." },
        { correct: "We live on the ground floor.", meaning: "Chúng tôi sống ở tầng trệt." }
      ]
    },
    {
      title: "3. Cấu trúc Is there a...?",
      desc: "Hỏi về sự tồn tại của một loại nhà hoặc tiện nghi.",
      formula: [ { text: "Is there a/an + Noun (số ít) + in/at + place?", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "Is there a bathtub in the bathroom?", meaning: "Có bồn tắm trong phòng tắm không?" },
        { correct: "Is there a guest-house near here?", meaning: "Có nhà khách nào gần đây không?" },
        { correct: "Is there an elevator in the block?", meaning: "Có thang máy trong tòa nhà không?" }
      ]
    }
  ],
  5: [ // Bài 6
    {
      title: "1. Need + to-V vs Need + V-ing",
      desc: "Cần làm gì (nghĩa chủ động) và Cần được làm gì (nghĩa bị động).",
      formula: [
        { text: "S (người) + need + to-V", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" },
        { text: "S (vật) + need + V-ing", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
      ],
      practiceList: [
        { correct: "I need to repair the clock.", meaning: "Tôi cần sửa cái đồng hồ." },
        { correct: "The clock needs repairing.", meaning: "Cái đồng hồ cần được sửa." },
        { correct: "He needs to buy a new battery.", meaning: "Anh ấy cần mua cục pin mới." }
      ]
    },
    {
      title: "2. Phrasal verbs thiết bị",
      desc: "Các cụm động từ thường gặp khi sử dụng thiết bị, máy móc.",
      formula: [ { text: "Turn on (bật) / Turn off (tắt) / Break down (bị hỏng)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "Please turn off the heating.", meaning: "Vui lòng tắt lò sưởi." },
        { correct: "My printer broke down yesterday.", meaning: "Máy in của tôi bị hỏng hôm qua." },
        { correct: "Don't forget to turn on the alarm clock.", meaning: "Đừng quên bật đồng hồ báo thức." }
      ]
    },
    {
      title: "3. Cấu trúc nhờ vả (Have something done)",
      desc: "Dùng khi bạn không tự làm việc gì đó mà thuê, nhờ người khác làm (dịch vụ).",
      formula: [ { text: "S + have/has + something + V(p.p)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "I had the TV repaired.", meaning: "Tôi đã mang chiếc tivi đi sửa." },
        { correct: "She has her house cleaned every week.", meaning: "Cô ấy thuê người dọn nhà mỗi tuần." },
        { correct: "We had the cable fixed.", meaning: "Chúng tôi đã cho người sửa lại dây cáp." }
      ]
    }
  ],
  6: [ // Bài 7
    {
      title: "1. Cách hỏi giá cả",
      desc: "Các mẫu câu thông dụng khi muốn biết giá của một món hàng.",
      formula: [
        { text: "How much does it cost?", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" },
        { text: "What is the price of...?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
      ],
      practiceList: [
        { correct: "How much does this shirt cost?", meaning: "Chiếc áo này giá bao nhiêu?" },
        { correct: "What is the price of that book?", meaning: "Cuốn sách đó giá bao nhiêu?" },
        { correct: "How much is the bill?", meaning: "Hóa đơn hết bao nhiêu?" }
      ]
    },
    {
      title: "2. Xin phép lịch sự với Can / Could",
      desc: "Sử dụng động từ khuyết thiếu để xin phép lịch sự trong ngữ cảnh cửa hàng.",
      formula: [ { text: "Can / Could I + V(nguyên thể) + please?", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" } ],
      practiceList: [
        { correct: "Could I try this on, please?", meaning: "Tôi có thể mặc thử cái này được không?" },
        { correct: "Can I pay by credit card?", meaning: "Tôi có thể thanh toán bằng thẻ tín dụng không?" },
        { correct: "Could I have a receipt, please?", meaning: "Cho tôi xin hóa đơn nhé?" }
      ]
    },
    {
      title: "3. Số lượng tiền và đơn vị",
      desc: "Cách đọc số tiền và sử dụng các đơn vị tiền tệ phổ biến.",
      formula: [ { text: "Số lượng + pound(s) / euro(s) / dollar(s) / cent(s)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "It costs twenty pounds.", meaning: "Nó có giá 20 bảng Anh." },
        { correct: "That will be fifty euros.", meaning: "Chỗ đó sẽ là 50 euro." },
        { correct: "I have fifty cents in cash.", meaning: "Tôi có 50 xu tiền mặt." }
      ]
    }
  ],
  7: [ // Bài 8
    {
      title: "1. Mẫu câu 'Where can I find/buy...?'",
      desc: "Sử dụng để hỏi tìm nơi bán một món hàng cụ thể.",
      formula: [ { text: "Where can I find / buy + a/an/some + Noun?", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" } ],
      practiceList: [
        { correct: "Where can I buy some meat?", meaning: "Tôi có thể mua thịt ở đâu?" },
        { correct: "Where can I find a pharmacy?", meaning: "Tôi có thể tìm thấy hiệu thuốc ở đâu?" },
        { correct: "Where can I buy a birthday cake?", meaning: "Tôi có thể mua bánh sinh nhật ở đâu?" }
      ]
    },
    {
      title: "2. Hỏi đường 'Is there a... near here?'",
      desc: "Câu hỏi để tìm các cửa hàng dịch vụ xung quanh khu vực.",
      formula: [ { text: "Is there a + place/shop + near here?", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" } ],
      practiceList: [
        { correct: "Is there a department store near here?", meaning: "Có cửa hàng bách hóa nào gần đây không?" },
        { correct: "Is there a butcher near here?", meaning: "Có cửa hàng thịt nào gần đây không?" },
        { correct: "Is there a post office around here?", meaning: "Có bưu điện nào quanh đây không?" }
      ]
    },
    {
      title: "3. Phân biệt 'For sale' và 'On sale'",
      desc: "'For sale' nghĩa là đồ đang được rao bán. 'On sale' nghĩa là đồ đang được giảm giá.",
      formula: [
        { text: "For sale (để bán)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
        { text: "On sale (giảm giá)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
      ],
      practiceList: [
        { correct: "This house is for sale.", meaning: "Ngôi nhà này đang được rao bán." },
        { correct: "These shoes are on sale.", meaning: "Những đôi giày này đang được giảm giá." },
        { correct: "Is that painting for sale?", meaning: "Bức tranh đó có bán không?" }
      ]
    }
  ],
  8: [ // Bài 9
    {
      title: "1. Câu tường thuật sơ cấp (Reported Speech)",
      desc: "Tường thuật lại câu nói của người khác, động từ trong câu thường phải lùi một thì.",
      formula: [ { text: "S + said (that) + S + V (lùi thì)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" } ],
      practiceList: [
        { correct: "She said (that) she needed money.", meaning: "Cô ấy nói rằng cô ấy cần tiền." },
        { correct: "He said he wanted to open an account.", meaning: "Anh ấy nói anh ấy muốn mở một tài khoản." },
        { correct: "They said they were at the post office.", meaning: "Họ nói họ đang ở bưu điện." }
      ]
    },
    {
      title: "2. Cụm từ điền mẫu đơn",
      desc: "Sử dụng 'fill in' (hoặc 'fill out' trong tiếng Anh-Mỹ) để nói về việc điền thông tin vào đơn/tờ khai.",
      formula: [ { text: "Fill in / out + a form / an application", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "Please fill in this form.", meaning: "Vui lòng điền vào biểu mẫu này." },
        { correct: "You need to fill out an application.", meaning: "Bạn cần phải điền vào một tờ đơn đăng ký." },
        { correct: "He filled in the cheque carefully.", meaning: "Anh ấy đã điền tờ séc một cách cẩn thận." }
      ]
    },
    {
      title: "3. Phân biệt Send, Post, Deliver",
      desc: "Các động từ liên quan đến việc gửi thư từ hoặc hàng hóa.",
      formula: [ { text: "Send (gửi đi) / Post (gửi qua bưu điện) / Deliver (giao hàng)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" } ],
      practiceList: [
        { correct: "I have to post this letter.", meaning: "Tôi phải gửi bức thư này qua bưu điện." },
        { correct: "They will deliver the parcel tomorrow.", meaning: "Họ sẽ giao gói bưu kiện vào ngày mai." },
        { correct: "Please send me an email.", meaning: "Vui lòng gửi email cho tôi." }
      ]
    }
  ],
  9: [ // Bài 10
    {
      title: "1. Cấu trúc Would rather",
      desc: "Diễn tả sự mong muốn, thích làm một việc gì đó hơn (thường dùng trong tình huống cụ thể).",
      formula: [ { text: "S + would rather + V(nguyên thể)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "I'd rather eat at home.", meaning: "Tôi thà ăn ở nhà còn hơn." },
        { correct: "She would rather order a dessert.", meaning: "Cô ấy muốn gọi món tráng miệng hơn." },
        { correct: "Would you rather have chicken or fish?", meaning: "Bạn muốn ăn thịt gà hay cá hơn?" }
      ]
    },
    {
      title: "2. Cấu trúc Prefer ... to ...",
      desc: "Diễn tả sự ưa thích một điều gì đó hơn một điều khác (nói về sở thích nói chung).",
      formula: [ { text: "S + prefer + N / V-ing + to + N / V-ing", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "I prefer Italian food to curry.", meaning: "Tôi thích đồ ăn Ý hơn món cà ri." },
        { correct: "He prefers cooking to eating out.", meaning: "Anh ấy thích nấu ăn hơn là đi ăn ngoài." },
        { correct: "Do you prefer tea to coffee?", meaning: "Bạn thích trà hơn cà phê phải không?" }
      ]
    },
    {
      title: "3. How much / How many",
      desc: "Dùng để hỏi về số lượng của các loại đồ ăn, nguyên liệu đếm được và không đếm được.",
      formula: [
        { text: "How much + N(không đếm được)?", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" },
        { text: "How many + N(đếm được số nhiều)?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
      ],
      practiceList: [
        { correct: "How much garlic do we need?", meaning: "Chúng ta cần bao nhiêu tỏi?" },
        { correct: "How many onions should I slice?", meaning: "Tôi nên thái bao nhiêu củ hành tây?" },
        { correct: "How much milk is in the fridge?", meaning: "Còn bao nhiêu sữa trong tủ lạnh?" }
      ]
    }
  ],
  10: [ // Bài 11
    {
      title: "1. Câu bị động trong hướng dẫn nấu ăn",
      desc: "Thường dùng trong các công thức nấu ăn để diễn tả bước chế biến mà không cần nói ai làm.",
      formula: [ { text: "S (Thực phẩm) + am/is/are + V(p.p) + for + thời gian", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" } ],
      practiceList: [
        { correct: "The chicken is grilled for 20 minutes.", meaning: "Thịt gà được nướng trong 20 phút." },
        { correct: "The water is boiled.", meaning: "Nước được đun sôi." },
        { correct: "The cake is baked at 180 degrees.", meaning: "Bánh được nướng ở 180 độ." }
      ]
    },
    {
      title: "2. Dùng Should / Must trong nấu ăn",
      desc: "Sử dụng động từ khuyết thiếu để đưa ra lời khuyên hoặc yêu cầu bắt buộc trong quy trình nấu.",
      formula: [ { text: "You + should/must + V(nguyên thể)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" } ],
      practiceList: [
        { correct: "You must mix the ingredients well.", meaning: "Bạn phải trộn đều các nguyên liệu." },
        { correct: "You should use fresh vegetables.", meaning: "Bạn nên dùng rau củ tươi." },
        { correct: "You shouldn't eat raw meat.", meaning: "Bạn không nên ăn thịt sống." }
      ]
    },
    {
      title: "3. Số lượng và đơn vị đo lường",
      desc: "Cách sử dụng các cụm chỉ lượng trong công thức nấu ăn.",
      formula: [ { text: "Số lượng + kilo(s) / litre(s) / gram(s) + of + Noun", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" } ],
      practiceList: [
        { correct: "Add 200 grams of flour to the bowl.", meaning: "Thêm 200 gram bột mì vào bát." },
        { correct: "We need a kilo of tomatoes.", meaning: "Chúng ta cần một ký cà chua." },
        { correct: "Pour half a litre of water.", meaning: "Đổ nửa lít nước." }
      ]
    }
  ],
  11: [ // Bài 12
    {
      title: "1. Thì Hiện tại hoàn thành (Trải nghiệm)",
      desc: "Dùng 'have been to' để nói về một nơi bạn đã từng đến trong đời (và đã trở về).",
      formula: [ { text: "S + have/has + (ever/never) + been to + Nơi chốn", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "Have you ever been to hospital?", meaning: "Bạn đã từng đến bệnh viện chưa?" },
        { correct: "I have never been to London.", meaning: "Tôi chưa từng đến London." },
        { correct: "She has been to the dentist twice this year.", meaning: "Cô ấy đã đi nha sĩ hai lần trong năm nay." }
      ]
    },
    {
      title: "2. Khuyên bảo y tế với Should / Shouldn't",
      desc: "Dùng để đưa ra lời khuyên cho một người đang gặp vấn đề về sức khỏe.",
      formula: [ { text: "S + should / shouldn't + V(nguyên thể)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" } ],
      practiceList: [
        { correct: "You should see a doctor if you have pain.", meaning: "Bạn nên đi gặp bác sĩ nếu bạn bị đau." },
        { correct: "He shouldn't eat so much sugar.", meaning: "Anh ấy không nên ăn quá nhiều đường." },
        { correct: "You should take this medicine twice a day.", meaning: "Bạn nên uống thuốc này hai lần một ngày." }
      ]
    },
    {
      title: "3. Cụm từ 'Make an appointment'",
      desc: "Cụm động từ cố định mang nghĩa 'đặt lịch hẹn', đặc biệt phổ biến trong lĩnh vực y tế, công việc.",
      formula: [ { text: "Make an appointment (with someone)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "I need to make an appointment with the doctor.", meaning: "Tôi cần đặt lịch hẹn với bác sĩ." },
        { correct: "She made an appointment for an X-ray.", meaning: "Cô ấy đã đặt lịch hẹn để chụp X-quang." },
        { correct: "Can I make an appointment for tomorrow?", meaning: "Tôi có thể đặt lịch hẹn cho ngày mai được không?" }
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

  console.log(`\\n🎉 Hoàn thành nạp ${totalSeeded} chủ điểm ngữ pháp cho batch 1!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

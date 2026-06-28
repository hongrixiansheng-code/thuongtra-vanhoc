/**
 * SEED SCRIPT: KET Grammar - Cụm 7,8,9,10 (Bài 13 -> 20)
 * orderIndex: 12 -> 19
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = {
  12: [ // Bài 13
    {
      title: "1. Cấu trúc Go + V-ing",
      desc: "Sử dụng với các môn thể thao hoặc hoạt động giải trí có đuôi -ing (thường mang tính di chuyển).",
      formula: [ { text: "S + go/goes/went + V-ing", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" } ],
      practiceList: [
        { correct: "We go sailing every weekend.", meaning: "Chúng tôi đi chèo thuyền mỗi cuối tuần." },
        { correct: "He went diving last summer.", meaning: "Anh ấy đã đi lặn biển mùa hè năm ngoái." },
        { correct: "I want to go climbing in the mountains.", meaning: "Tôi muốn đi leo núi." }
      ]
    },
    {
      title: "2. Cấu trúc Be able to",
      desc: "Dùng để diễn tả khả năng có thể làm được một việc gì đó (tương đương với can/could nhưng linh hoạt hơn ở các thì).",
      formula: [ { text: "S + be + able to + V(nguyên thể)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" } ],
      practiceList: [
        { correct: "I am able to swim 100 metres.", meaning: "Tôi có khả năng bơi được 100 mét." },
        { correct: "She wasn't able to finish the race.", meaning: "Cô ấy đã không thể hoàn thành cuộc đua." },
        { correct: "Will you be able to come tomorrow?", meaning: "Bạn sẽ có thể đến vào ngày mai chứ?" }
      ]
    },
    {
      title: "3. So sánh bậc nhất trong thể thao",
      desc: "Sử dụng tính từ ở dạng so sánh nhất để nói về người/đội/kỷ lục giỏi nhất, nhanh nhất.",
      formula: [ { text: "S + be + the + Adj-est / most Adj", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "He is the fastest runner in the team.", meaning: "Anh ấy là người chạy nhanh nhất đội." },
        { correct: "That was the most exciting match.", meaning: "Đó là trận đấu thú vị nhất." },
        { correct: "She is the strongest athlete here.", meaning: "Cô ấy là vận động viên khỏe nhất ở đây." }
      ]
    }
  ],
  13: [ // Bài 14
    {
      title: "1. Tương lai dự định (Be going to) vs Tương lai đơn (Will)",
      desc: "'Be going to' dùng cho kế hoạch đã lên từ trước. 'Will' dùng cho quyết định nảy sinh lúc nói hoặc dự đoán.",
      formula: [
        { text: "S + am/is/are + going to + V (Kế hoạch)", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" },
        { text: "S + will + V (Quyết định/Dự đoán)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
      ],
      practiceList: [
        { correct: "We are going to travel to Paris next week.", meaning: "Chúng tôi dự định sẽ đi du lịch Paris tuần tới." },
        { correct: "I think the flight will be delayed.", meaning: "Tôi nghĩ chuyến bay sẽ bị hoãn." },
        { correct: "I'll carry that luggage for you.", meaning: "Tôi sẽ mang hành lý đó cho bạn." }
      ]
    },
    {
      title: "2. Cấu trúc By the time (Quá khứ hoàn thành sơ cấp)",
      desc: "Dùng để diễn tả một hành động đã hoàn thành trước một hành động khác trong quá khứ.",
      formula: [ { text: "By the time + S + V(quá khứ), S + had + V(p.p)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "By the time we arrived, the flight had left.", meaning: "Vào lúc chúng tôi đến, chuyến bay đã rời đi." },
        { correct: "By the time I got to the airport, the check-in had closed.", meaning: "Khi tôi đến sân bay, quầy thủ tục đã đóng cửa." },
        { correct: "By the time she woke up, the sun had risen.", meaning: "Lúc cô ấy thức dậy, mặt trời đã mọc." }
      ]
    },
    {
      title: "3. Hỏi thời gian 'How long does it take?'",
      desc: "Dùng để hỏi mất bao nhiêu thời gian để hoàn thành một việc hay di chuyển từ nơi này đến nơi khác.",
      formula: [ { text: "How long does it take (sb) to + V?", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "How long does it take to get to the airport?", meaning: "Mất bao lâu để đến sân bay?" },
        { correct: "It takes about two hours to fly there.", meaning: "Mất khoảng hai giờ để bay tới đó." },
        { correct: "How long did it take you to pack your luggage?", meaning: "Bạn mất bao lâu để sắp xếp hành lý?" }
      ]
    }
  ],
  14: [ // Bài 15
    {
      title: "1. Thì Quá khứ hoàn thành (Past Perfect)",
      desc: "Dùng để diễn tả một hành động xảy ra và kết thúc TRƯỚC một hành động khác trong quá khứ.",
      formula: [ { text: "S + had + V(p.p) / V-ed", classes: "bg-red-100 text-red-700 border-red-300 font-bold" } ],
      practiceList: [
        { correct: "When I arrived, the bus had already left.", meaning: "Khi tôi đến, chiếc xe buýt đã rời đi mất rồi." },
        { correct: "She had never seen a tram before she visited Europe.", meaning: "Cô ấy chưa từng thấy xe điện trước khi đến châu Âu." },
        { correct: "I realised I had forgotten my driving licence.", meaning: "Tôi nhận ra mình đã quên bằng lái xe." }
      ]
    },
    {
      title: "2. Phân biệt Get on/off và Get into/out of",
      desc: "'Get on/off' dùng cho phương tiện lớn (có thể đứng, đi lại được). 'Get into/out of' dùng cho phương tiện nhỏ (ô tô, taxi).",
      formula: [
        { text: "Get on/off + bus/train/plane/boat", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" },
        { text: "Get into/out of + car/taxi", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
      ],
      practiceList: [
        { correct: "We need to get off at the next stop.", meaning: "Chúng ta cần xuống ở trạm tiếp theo." },
        { correct: "He got into the taxi quickly.", meaning: "Anh ấy bước vào xe taxi một cách nhanh chóng." },
        { correct: "They are getting on the coach now.", meaning: "Họ đang lên xe khách bây giờ." }
      ]
    },
    {
      title: "3. Các cụm từ chỉ đường",
      desc: "Sử dụng câu mệnh lệnh và các giới từ để hướng dẫn đường đi.",
      formula: [ { text: "Turn left/right at + địa điểm | Go past + địa điểm", classes: "bg-green-100 text-green-700 border-green-300 font-bold" } ],
      practiceList: [
        { correct: "Turn left at the roundabout.", meaning: "Rẽ trái ở bùng binh." },
        { correct: "Go past the petrol station.", meaning: "Đi ngang qua trạm xăng." },
        { correct: "You pass a bridge and then turn right.", meaning: "Bạn đi qua một cây cầu rồi rẽ phải." }
      ]
    }
  ],
  15: [ // Bài 16
    {
      title: "1. Ôn tập Quá khứ hoàn thành (Dạng bị động)",
      desc: "Kết hợp giữa quá khứ hoàn thành và bị động khi mô tả các dịch vụ đã được hoàn tất từ trước.",
      formula: [ { text: "S + had + been + V(p.p)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "The room had already been booked when we arrived.", meaning: "Căn phòng đã được đặt trước khi chúng tôi đến." },
        { correct: "The bill had been paid before check-out.", meaning: "Hóa đơn đã được thanh toán trước khi trả phòng." },
        { correct: "The tour had been cancelled due to bad weather.", meaning: "Chuyến tham quan đã bị hủy do thời tiết xấu." }
      ]
    },
    {
      title: "2. Cụm từ đặt chỗ, đặt phòng",
      desc: "Các động từ và danh từ phổ biến dùng trong giao tiếp tại khách sạn.",
      formula: [ { text: "Make a reservation / Book a room", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" } ],
      practiceList: [
        { correct: "I would like to make a reservation for two nights.", meaning: "Tôi muốn đặt phòng cho hai đêm." },
        { correct: "Did you book a single or a double room?", meaning: "Bạn đã đặt phòng đơn hay phòng đôi?" },
        { correct: "Please call the receptionist to book a tour.", meaning: "Vui lòng gọi tiếp tân để đặt một tour tham quan." }
      ]
    },
    {
      title: "3. Câu hỏi tiện ích khách sạn (Is there... / Does it have...)",
      desc: "Mẫu câu hỏi xem khách sạn có cung cấp một dịch vụ hay tiện ích nào đó hay không.",
      formula: [ { text: "Is there a + N? / Does the hotel have a + N?", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" } ],
      practiceList: [
        { correct: "Does the hotel have a swimming pool?", meaning: "Khách sạn có hồ bơi không?" },
        { correct: "Is there a gym in the accommodation?", meaning: "Có phòng tập thể dục trong khu nhà ở không?" },
        { correct: "Does it have a good view?", meaning: "Nó có tầm nhìn đẹp không?" }
      ]
    }
  ],
  16: [ // Bài 17
    {
      title: "1. Cấu trúc Work as",
      desc: "Dùng để giới thiệu nghề nghiệp của ai đó (Làm việc với tư cách là...).",
      formula: [ { text: "S + work / works + as + a/an + nghề nghiệp", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "She works as a secretary.", meaning: "Cô ấy làm nghề thư ký." },
        { correct: "My brother works as a chef in a restaurant.", meaning: "Anh trai tôi làm đầu bếp trong một nhà hàng." },
        { correct: "I hope to work as a scientist one day.", meaning: "Tôi hy vọng một ngày nào đó sẽ làm nhà khoa học." }
      ]
    },
    {
      title: "2. Cấu trúc Be responsible for",
      desc: "Dùng để nói về trách nhiệm, nhiệm vụ chính yếu trong công việc.",
      formula: [ { text: "S + be + responsible for + V-ing / Noun", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "He is responsible for managing the team.", meaning: "Anh ấy chịu trách nhiệm quản lý nhóm." },
        { correct: "The cleaner is responsible for keeping the office clean.", meaning: "Người dọn dẹp có trách nhiệm giữ văn phòng sạch sẽ." },
        { correct: "Are you responsible for this project?", meaning: "Bạn có chịu trách nhiệm cho dự án này không?" }
      ]
    },
    {
      title: "3. Mệnh đề quan hệ Who / Which (Nghề nghiệp)",
      desc: "Dùng để giải thích, định nghĩa một công việc hoặc một vật dụng liên quan.",
      formula: [
        { text: "A/An (Nghề) is a person who + V", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
        { text: "A/An (Vật) is a thing which + V", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
      ],
      practiceList: [
        { correct: "A scientist is a person who does research.", meaning: "Nhà khoa học là người làm công tác nghiên cứu." },
        { correct: "An assistant is someone who helps the boss.", meaning: "Trợ lý là người giúp việc cho sếp." },
        { correct: "A scanner is a machine which copies documents.", meaning: "Máy quét là loại máy sao chép tài liệu." }
      ]
    }
  ],
  17: [ // Bài 18
    {
      title: "1. Câu hỏi tường thuật (Reported Questions)",
      desc: "Cách tường thuật lại một câu hỏi. Cần đổi trật tự từ (đưa chủ ngữ lên trước động từ) và lùi một thì.",
      formula: [
        { text: "S + asked + O + if/whether + S + V(lùi thì)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
        { text: "S + asked + O + Wh- + S + V(lùi thì)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
      ],
      practiceList: [
        { correct: "She asked me where I worked.", meaning: "Cô ấy đã hỏi tôi làm việc ở đâu." },
        { correct: "He asked if I had experience.", meaning: "Anh ấy đã hỏi liệu tôi có kinh nghiệm không." },
        { correct: "The boss asked what my qualifications were.", meaning: "Sếp đã hỏi bằng cấp của tôi là gì." }
      ]
    },
    {
      title: "2. Quy tắc nơi làm việc: Have to / Don't have to",
      desc: "'Have to' mang nghĩa bắt buộc phải làm. 'Don't have to' mang nghĩa không cần thiết phải làm (không bắt buộc).",
      formula: [
        { text: "S + have to / has to + V", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" },
        { text: "S + don't / doesn't + have to + V", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
      ],
      practiceList: [
        { correct: "We have to attend a meeting at 9 a.m.", meaning: "Chúng tôi phải tham dự một cuộc họp lúc 9 giờ sáng." },
        { correct: "You don't have to wear a suit on Fridays.", meaning: "Bạn không cần phải mặc vest vào các ngày thứ Sáu." },
        { correct: "She has to earn a high salary.", meaning: "Cô ấy phải kiếm được mức lương cao." }
      ]
    },
    {
      title: "3. Điền đơn xin việc (Fill in an application form)",
      desc: "Ngữ cảnh ứng dụng cấu trúc 'fill in/out' vào việc nộp đơn xin việc.",
      formula: [ { text: "Apply for a job -> Fill in an application form", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" } ],
      practiceList: [
        { correct: "You have to fill in an application form.", meaning: "Bạn phải điền vào một đơn xin việc." },
        { correct: "I applied for the job online.", meaning: "Tôi đã nộp đơn xin việc trực tuyến." },
        { correct: "Did you fill out all the details?", meaning: "Bạn đã điền đầy đủ các chi tiết chưa?" }
      ]
    }
  ],
  18: [ // Bài 19
    {
      title: "1. Thì Hiện tại hoàn thành tiếp diễn (Sơ cấp)",
      desc: "Nhấn mạnh quá trình của một hành động đã bắt đầu trong quá khứ và vẫn đang tiếp diễn ở hiện tại.",
      formula: [ { text: "S + have/has + been + V-ing + for/since...", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "I've been using this app for 2 years.", meaning: "Tôi đã và đang sử dụng ứng dụng này được 2 năm rồi." },
        { correct: "She has been writing a blog since 2020.", meaning: "Cô ấy đã đang viết blog từ năm 2020." },
        { correct: "They have been chatting in the chatroom for hours.", meaning: "Họ đã trò chuyện trong phòng chat hàng giờ liền." }
      ]
    },
    {
      title: "2. Động từ mạng xã hội (Post / Share / Follow)",
      desc: "Các động từ phổ biến khi sử dụng internet, mạng xã hội.",
      formula: [ { text: "Post (đăng tải) / Share (chia sẻ) / Follow (theo dõi)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" } ],
      practiceList: [
        { correct: "I posted a selfie on social media.", meaning: "Tôi đã đăng một bức ảnh tự sướng lên mạng xã hội." },
        { correct: "Please share this link with your friends.", meaning: "Vui lòng chia sẻ liên kết này với bạn bè của bạn." },
        { correct: "How many people follow your account?", meaning: "Có bao nhiêu người theo dõi tài khoản của bạn?" }
      ]
    },
    {
      title: "3. Xin phép dùng thiết bị (Can I / Could I / May I)",
      desc: "Mẫu câu lịch sự để xin phép sử dụng đồ vật của người khác.",
      formula: [ { text: "Can / Could / May I + V(nguyên thể)?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" } ],
      practiceList: [
        { correct: "May I use your keyboard?", meaning: "Tôi có thể sử dụng bàn phím của bạn không?" },
        { correct: "Can I download this file?", meaning: "Tôi có thể tải tập tin này xuống không?" },
        { correct: "Could I have your Wi-Fi password?", meaning: "Tôi có thể xin mật khẩu Wi-Fi của bạn không?" }
      ]
    }
  ],
  19: [ // Bài 20
    {
      title: "1. Câu bị động mở rộng (Chủ đề công nghệ)",
      desc: "Ứng dụng câu bị động để mô tả cách dữ liệu, thông tin được xử lý bởi máy móc/hệ thống.",
      formula: [ { text: "S (vật/dữ liệu) + am/is/are + V(p.p)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "Photos are stored on the cloud.", meaning: "Những bức ảnh được lưu trữ trên đám mây." },
        { correct: "Messages are sent automatically.", meaning: "Tin nhắn được gửi tự động." },
        { correct: "The documents are printed on this printer.", meaning: "Tài liệu được in trên máy in này." }
      ]
    },
    {
      title: "2. Hỏi cách hoạt động: How does it work?",
      desc: "Câu hỏi thông dụng để nhờ ai đó hướng dẫn sử dụng một thiết bị hay phần mềm.",
      formula: [ { text: "How does + S (it/this machine) + work?", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" } ],
      practiceList: [
        { correct: "How does this DVD player work?", meaning: "Máy phát DVD này hoạt động như thế nào?" },
        { correct: "Can you explain how this microphone works?", meaning: "Bạn có thể giải thích cách micro này hoạt động không?" },
        { correct: "I don't know how the new digital camera works.", meaning: "Tôi không biết máy ảnh kỹ thuật số mới hoạt động thế nào." }
      ]
    },
    {
      title: "3. Phrasal verbs điều chỉnh thiết bị",
      desc: "Cụm động từ để bật/tắt nguồn và tăng/giảm âm lượng, độ sáng.",
      formula: [ { text: "Turn on/off (bật/tắt nguồn) | Turn up/down (tăng/giảm âm lượng)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "Please turn down the volume.", meaning: "Vui lòng vặn nhỏ âm lượng xuống." },
        { correct: "Can you turn up the CD player?", meaning: "Bạn có thể mở đầu CD to lên chút không?" },
        { correct: "He turned off the PC and went home.", meaning: "Anh ấy đã tắt máy tính cá nhân và về nhà." }
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

  console.log(`\\n🎉 Hoàn thành nạp ${totalSeeded} chủ điểm ngữ pháp cho batch 2!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

/**
 * SEED SCRIPT: YLE KET Grammar (36 Bài)
 * Chạy từ thư mục gốc: node Script/seed-ket-grammar.js
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = [
  {
    lesson: 0,
    title: "Question Tags, Have got & Whose",
    desc: "Cách đặt câu hỏi đuôi để xác nhận thông tin, cách dùng động từ sở hữu và từ để hỏi Whose.",
    formula: [
      { text: "Câu khẳng định, trợ động từ phủ định + S?", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "S + have/has got + O", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
      { text: "Whose + N + is/are + S?", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "You're from Hanoi, aren't you?", meaning: "Bạn đến từ Hà Nội, có phải không?" },
      { correct: "I have got a new bicycle.", meaning: "Tôi có một chiếc xe đạp mới." },
      { correct: "Whose bag is this?", meaning: "Cái túi này của ai?" }
    ]
  },
  {
    lesson: 1,
    title: "Cấu trúc So...that, Such...that & Intensifiers",
    desc: "Dùng để nhấn mạnh mức độ của một tính từ hoặc danh từ đến nỗi gây ra kết quả gì đó.",
    formula: [
      { text: "S + be + so + adj + that + S + V", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "S + be + such + a/an + adj + noun + that + S + V", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
    ],
    practiceList: [
      { correct: "She was so nervous that she couldn't speak.", meaning: "Cô ấy đã lo lắng đến mức không thể nói được." },
      { correct: "It is such a beautiful day that we should go out.", meaning: "Thật là một ngày đẹp trời đến nỗi chúng ta nên đi ra ngoài." },
      { correct: "He is quite tall and very friendly.", meaning: "Anh ấy khá cao và rất thân thiện." }
    ]
  },
  {
    lesson: 2,
    title: "Look like vs Look, Bị động sơ cấp & Be wearing",
    desc: "Phân biệt cách mô tả ngoại hình, trang phục đang mặc và câu bị động nói về chất liệu.",
    formula: [
      { text: "S + look like + noun (trông giống ai/cái gì)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "S + be + made of + chất liệu", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" },
      { text: "S + am/is/are + wearing + trang phục", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
    ],
    practiceList: [
      { correct: "He looks like his father.", meaning: "Cậu ấy trông giống bố cậu ấy." },
      { correct: "This ring is made of gold.", meaning: "Chiếc nhẫn này được làm bằng vàng." },
      { correct: "She is wearing a red dress today.", meaning: "Hôm nay cô ấy đang mặc một chiếc váy đỏ." }
    ]
  },
  {
    lesson: 3,
    title: "Câu bị động Hiện tại đơn & Need + V-ing",
    desc: "Nhấn mạnh hành động thay vì người thực hiện, và cấu trúc cần được làm gì (nghĩa bị động).",
    formula: [
      { text: "S (vật) + am/is/are + V(p.p) / V-ed", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "S (vật) + need/needs + V-ing", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "The house is cleaned every day.", meaning: "Ngôi nhà được dọn dẹp mỗi ngày." },
      { correct: "The heating is turned on at 6 a.m.", meaning: "Lò sưởi được bật lúc 6 giờ sáng." },
      { correct: "The drawer needs fixing.", meaning: "Cái ngăn kéo cần được sửa." }
    ]
  },
  {
    lesson: 4,
    title: "Câu bị động Quá khứ đơn & Giới từ chỉ nơi chốn",
    desc: "Nói về một việc đã được hoàn thành trong quá khứ, cách dùng từ floor và Is there a...?",
    formula: [
      { text: "S (vật) + was/were + V(p.p) / V-ed", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" },
      { text: "Is there a/an + noun + place?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "The flat was built in 2010.", meaning: "Căn hộ được xây dựng vào năm 2010." },
      { correct: "My apartment is on the third floor.", meaning: "Căn hộ của tôi ở tầng ba." },
      { correct: "Is there a bathtub in the bathroom?", meaning: "Có bồn tắm trong phòng tắm không?" }
    ]
  },
  {
    lesson: 5,
    title: "Need + To-V / V-ing, Phrasal verbs & Have something done",
    desc: "Phân biệt cần làm gì và cần được làm gì, các động từ liên quan thiết bị và nhờ vả dịch vụ.",
    formula: [
      { text: "S (người) + need + to-V (Cần làm gì)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "S + have/get + something + V(p.p) (Nhờ ai làm gì)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "I need to repair the clock.", meaning: "Tôi cần sửa cái đồng hồ." },
      { correct: "The TV broke down yesterday.", meaning: "Chiếc tivi đã bị hỏng ngày hôm qua." },
      { correct: "I had the TV repaired.", meaning: "Tôi đã mang chiếc tivi đi sửa." }
    ]
  },
  {
    lesson: 6,
    title: "Hỏi giá cả & Xin phép lịch sự",
    desc: "Cách hỏi giá cả khi mua sắm, các đơn vị tiền tệ và cách dùng can/could để yêu cầu.",
    formula: [
      { text: "How much does it cost? / What is the price?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
      { text: "Could I + V(nguyên thể) + please?", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
    ],
    practiceList: [
      { correct: "How much does this shirt cost?", meaning: "Chiếc áo này giá bao nhiêu?" },
      { correct: "What is the price of that book?", meaning: "Cuốn sách đó giá bao nhiêu?" },
      { correct: "Could I try this on, please?", meaning: "Tôi có thể mặc thử cái này được không?" }
    ]
  },
  {
    lesson: 7,
    title: "Hỏi đường & Phân biệt For sale / On sale",
    desc: "Cấu trúc hỏi tìm địa điểm dịch vụ và phân biệt đồ để bán với đồ đang giảm giá.",
    formula: [
      { text: "Where can I find/buy + noun?", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "Is there a + noun + near here?", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
    ],
    practiceList: [
      { correct: "Where can I find a pharmacy?", meaning: "Tôi có thể tìm thấy hiệu thuốc ở đâu?" },
      { correct: "Is there a department store near here?", meaning: "Có cửa hàng bách hóa nào gần đây không?" },
      { correct: "These shoes are on sale.", meaning: "Những đôi giày này đang được giảm giá." }
    ]
  },
  {
    lesson: 8,
    title: "Câu tường thuật sơ cấp & Các động từ gửi thư",
    desc: "Giới thiệu cách tường thuật lại câu nói của người khác (Reported Speech).",
    formula: [
      { text: "S + said (that) + S + V(lùi thì)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
      { text: "Fill in / out + a form", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "She said that she needed money.", meaning: "Cô ấy nói rằng cô ấy cần tiền." },
      { correct: "Please fill in this form.", meaning: "Vui lòng điền vào biểu mẫu này." },
      { correct: "I have to send a parcel at the post office.", meaning: "Tôi phải gửi một bưu kiện ở bưu điện." }
    ]
  },
  {
    lesson: 9,
    title: "Would rather, Prefer & Danh từ đếm được/Không đếm được",
    desc: "Cách diễn đạt sự ưa thích hơn và cách đếm số lượng nguyên liệu thức ăn.",
    formula: [
      { text: "S + would rather + V(nguyên thể)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" },
      { text: "S + prefer + N/V-ing + to + N/V-ing", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
    ],
    practiceList: [
      { correct: "I would rather eat at home.", meaning: "Tôi thà ăn ở nhà còn hơn." },
      { correct: "I prefer Italian food to curry.", meaning: "Tôi thích đồ ăn Ý hơn cà ri." },
      { correct: "How much garlic do we need?", meaning: "Chúng ta cần bao nhiêu tỏi?" }
    ]
  },
  {
    lesson: 10,
    title: "Bị động trong hướng dẫn nấu ăn & Đo lường",
    desc: "Sử dụng câu bị động để hướng dẫn các bước nấu ăn và cách sử dụng các đơn vị đo lường.",
    formula: [
      { text: "S (vật/đồ ăn) + am/is/are + V(p.p) + for + time", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
      { text: "S + should/must + V(nguyên thể)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "The chicken is grilled for 20 minutes.", meaning: "Thịt gà được nướng trong 20 phút." },
      { correct: "You must mix the ingredients well.", meaning: "Bạn phải trộn đều các nguyên liệu." },
      { correct: "Add 200 grams of flour to the bowl.", meaning: "Thêm 200 gram bột mì vào bát." }
    ]
  },
  {
    lesson: 11,
    title: "Present Perfect (Have been to) & Khuyên bảo y tế",
    desc: "Hỏi về trải nghiệm với 'have been to' và sử dụng should/shouldn't để khuyên bảo sức khỏe.",
    formula: [
      { text: "Have/Has + S + ever + been to + place?", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "S + should/shouldn't + V(nguyên thể)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "Have you ever been to hospital?", meaning: "Bạn đã từng đến bệnh viện chưa?" },
      { correct: "You shouldn't eat too much sugar.", meaning: "Bạn không nên ăn quá nhiều đường." },
      { correct: "I need to make an appointment with the doctor.", meaning: "Tôi cần đặt lịch hẹn với bác sĩ." }
    ]
  },
  {
    lesson: 12,
    title: "Go + V-ing, Be able to & So sánh nhất",
    desc: "Cấu trúc chỉ hoạt động thể thao, diễn đạt khả năng làm được việc gì và so sánh nhất.",
    formula: [
      { text: "S + go + V-ing (Môn thể thao có -ing)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" },
      { text: "S + be + able to + V(nguyên thể)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "We go sailing every weekend.", meaning: "Chúng tôi đi chèo thuyền mỗi cuối tuần." },
      { correct: "I am able to swim 100 metres.", meaning: "Tôi có khả năng bơi được 100 mét." },
      { correct: "He is the fastest runner in the team.", meaning: "Anh ấy là người chạy nhanh nhất đội." }
    ]
  },
  {
    lesson: 13,
    title: "Be going to vs Will, By the time & How long",
    desc: "Lên kế hoạch du lịch với thì tương lai, làm quen với quá khứ hoàn thành và hỏi thời gian di chuyển.",
    formula: [
      { text: "S + am/is/are + going to + V (Kế hoạch)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" },
      { text: "By the time + S + V(quá khứ), S + had + V(p.p)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" }
    ],
    practiceList: [
      { correct: "We are going to travel to Paris next week.", meaning: "Chúng tôi dự định sẽ đi du lịch Paris tuần tới." },
      { correct: "By the time we arrived, the flight had left.", meaning: "Vào lúc chúng tôi đến, chuyến bay đã rời đi." },
      { correct: "How long does it take to get to the airport?", meaning: "Mất bao lâu để đến sân bay?" }
    ]
  },
  {
    lesson: 14,
    title: "Quá khứ hoàn thành, Get on/off & Chỉ đường",
    desc: "Sử dụng quá khứ hoàn thành khi một việc xảy ra trước một việc khác trong quá khứ.",
    formula: [
      { text: "S + had + V(p.p) / V-ed", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "Get on/off (phương tiện lớn) | Get into/out of (xe nhỏ)", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
    ],
    practiceList: [
      { correct: "When I arrived, the bus had already left.", meaning: "Khi tôi đến, chiếc xe buýt đã rời đi mất rồi." },
      { correct: "We need to get off at the next stop.", meaning: "Chúng ta cần xuống ở trạm tiếp theo." },
      { correct: "Turn left at the roundabout.", meaning: "Rẽ trái ở bùng binh." }
    ]
  },
  {
    lesson: 15,
    title: "Ôn tập Quá khứ hoàn thành & Đặt chỗ",
    desc: "Củng cố thì quá khứ hoàn thành trong ngữ cảnh khách sạn, các cụm từ đặt phòng khách sạn.",
    formula: [
      { text: "S + had + already + been + V(p.p) (Bị động quá khứ hoàn thành)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
      { text: "Make a reservation / Book a room", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
    ],
    practiceList: [
      { correct: "The room had already been booked when we arrived.", meaning: "Căn phòng đã được đặt trước khi chúng tôi đến." },
      { correct: "I would like to make a reservation for two nights.", meaning: "Tôi muốn đặt phòng cho hai đêm." },
      { correct: "Does the hotel have a swimming pool?", meaning: "Khách sạn có hồ bơi không?" }
    ]
  },
  {
    lesson: 16,
    title: "Work as, Be responsible for & Mệnh đề quan hệ",
    desc: "Cách diễn tả nghề nghiệp, trách nhiệm công việc và sử dụng đại từ quan hệ Who/Which.",
    formula: [
      { text: "S + work / works as + a/an + nghề nghiệp", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "S + be + responsible for + V-ing / Noun", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "She works as a secretary.", meaning: "Cô ấy làm nghề thư ký." },
      { correct: "He is responsible for managing the team.", meaning: "Anh ấy chịu trách nhiệm quản lý nhóm." },
      { correct: "A scientist is a person who does research.", meaning: "Nhà khoa học là người làm công tác nghiên cứu." }
    ]
  },
  {
    lesson: 17,
    title: "Câu hỏi tường thuật (Reported Questions)",
    desc: "Chuyển câu hỏi trực tiếp thành câu tường thuật khi đi phỏng vấn hoặc thuật lại cuộc họp.",
    formula: [
      { text: "S + asked + O + if/whether + S + V(lùi thì)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" },
      { text: "S + asked + O + Wh- + S + V(lùi thì)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "She asked me where I worked.", meaning: "Cô ấy đã hỏi tôi làm việc ở đâu." },
      { correct: "He asked if I had experience.", meaning: "Anh ấy đã hỏi liệu tôi có kinh nghiệm không." },
      { correct: "You have to fill in an application form.", meaning: "Bạn phải điền vào một đơn xin việc." }
    ]
  },
  {
    lesson: 18,
    title: "Hiện tại hoàn thành tiếp diễn (Present Perfect Continuous)",
    desc: "Diễn đạt một hành động bắt đầu trong quá khứ và vẫn đang tiếp diễn đến hiện tại (nhấn mạnh quá trình).",
    formula: [
      { text: "S + have/has + been + V-ing + for/since...", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "Can I / Could I / May I + V(nguyên thể)?", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "I've been using this app for 2 years.", meaning: "Tôi đã và đang sử dụng ứng dụng này được 2 năm rồi." },
      { correct: "She has been uploading videos since morning.", meaning: "Cô ấy đã đang tải video lên từ sáng." },
      { correct: "May I use your laptop?", meaning: "Tôi có thể dùng máy tính xách tay của bạn không?" }
    ]
  },
  {
    lesson: 19,
    title: "Câu bị động mở rộng & Phrasal Verbs công nghệ",
    desc: "Ứng dụng câu bị động trong ngữ cảnh công nghệ máy móc và các cụm động từ thường gặp.",
    formula: [
      { text: "S (dữ liệu/tin nhắn) + are + V(p.p)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" },
      { text: "How does it work?", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
    ],
    practiceList: [
      { correct: "Photos are stored on the cloud.", meaning: "Những bức ảnh được lưu trữ trên đám mây." },
      { correct: "Messages are sent automatically.", meaning: "Tin nhắn được gửi tự động." },
      { correct: "Please turn down the volume.", meaning: "Vui lòng vặn nhỏ âm lượng xuống." }
    ]
  },
  {
    lesson: 20,
    title: "Verb + Gerund/Infinitive & Have been to",
    desc: "Quy tắc khi động từ đi theo sau là V-ing hay To-V, và thì hiện tại hoàn thành trải nghiệm.",
    formula: [
      { text: "Enjoy / Finish / Practise + V-ing", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "Decide / Want / Plan + to-V", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "I enjoy listening to jazz music.", meaning: "Tôi thích nghe nhạc jazz." },
      { correct: "We decided to go to the exhibition.", meaning: "Chúng tôi đã quyết định đi đến buổi triển lãm." },
      { correct: "What kind of music do you like?", meaning: "Bạn thích thể loại nhạc nào?" }
    ]
  },
  {
    lesson: 21,
    title: "Think (that) & Suggest / Recommend + V-ing",
    desc: "Đưa ra ý kiến và đề xuất khi nhận xét về các bộ phim, chương trình truyền hình.",
    formula: [
      { text: "S + think (that) + S + V", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" },
      { text: "Suggest / Recommend + V-ing", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "I think that the comedy was very funny.", meaning: "Tôi nghĩ rằng bộ phim hài rất vui." },
      { correct: "The film is on at the cinema.", meaning: "Bộ phim đang được chiếu tại rạp." },
      { correct: "I suggest watching this action movie.", meaning: "Tôi đề nghị xem bộ phim hành động này." }
    ]
  },
  {
    lesson: 22,
    title: "Should, Câu điều kiện loại 1 & Be made from/of",
    desc: "Dùng Should khuyên bảo môi trường, điều kiện loại 1 và sự khác biệt về chất liệu thay đổi.",
    formula: [
      { text: "If + S + V(hiện tại), S + will + V(nguyên thể)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
      { text: "Be made of (giữ nguyên chất) | Be made from (đổi chất)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" }
    ],
    practiceList: [
      { correct: "We should recycle more.", meaning: "Chúng ta nên tái chế nhiều hơn." },
      { correct: "If we don't act, the environment will be damaged.", meaning: "Nếu chúng ta không hành động, môi trường sẽ bị phá hoại." },
      { correct: "Paper is made from wood.", meaning: "Giấy được làm từ gỗ." }
    ]
  },
  {
    lesson: 23,
    title: "Cấu trúc Used to, Bị động quá khứ & How far",
    desc: "Nói về thói quen/tình trạng trong quá khứ đã chấm dứt, và bị động quá khứ với các tòa nhà.",
    formula: [
      { text: "S + used to + V(nguyên thể)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "S + was/were + V(p.p)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
    ],
    practiceList: [
      { correct: "This factory used to make cars.", meaning: "Nhà máy này từng sản xuất ô tô." },
      { correct: "The cathedral was built in the 12th century.", meaning: "Nhà thờ lớn được xây dựng vào thế kỷ 12." },
      { correct: "How far is it from here to the coast?", meaning: "Từ đây đến bờ biển bao xa?" }
    ]
  },
  {
    lesson: 24,
    title: "Liên từ A2 (Although, However, Despite) & Modals",
    desc: "Mở rộng liên từ tương phản và ôn tập tất cả động từ khuyết thiếu.",
    formula: [
      { text: "Although + S + V, S + V", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
      { text: "Despite + Noun / V-ing, S + V", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" },
      { text: "S + V. However, S + V", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "Although it was raining, we went out.", meaning: "Mặc dù trời mưa, chúng tôi vẫn đi ra ngoài." },
      { correct: "Despite the rain, we went out.", meaning: "Bất chấp cơn mưa, chúng tôi đã đi ra ngoài." },
      { correct: "He is rich. However, he isn't happy.", meaning: "Ông ấy giàu có. Tuy nhiên, ông ấy không hạnh phúc." }
    ]
  },
  {
    lesson: 25,
    title: "Reported Speech tổng hợp & Câu mệnh lệnh gián tiếp",
    desc: "Cách lùi thì trong câu tường thuật và cấu trúc yêu cầu/khuyên bảo ai đó làm gì.",
    formula: [
      { text: "Lùi 1 thì (HT đơn -> QK đơn, Will -> Would...)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "Tell / Ask + O + (not) + to-V", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "She said (that) she was tired.", meaning: "Cô ấy nói rằng cô ấy mệt." },
      { correct: "He told me to wait here.", meaning: "Anh ấy bảo tôi đợi ở đây." },
      { correct: "She asked me not to be late.", meaning: "Cô ấy yêu cầu tôi đừng đến muộn." }
    ]
  },
  {
    lesson: 26,
    title: "Câu điều kiện loại 2 (Conditional 2) & Unless",
    desc: "Dùng để diễn tả một sự việc KHÔNG có thật ở hiện tại và hậu quả tưởng tượng.",
    formula: [
      { text: "If + S + V(quá khứ đơn), S + would/could + V(nguyên thể)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
      { text: "Unless = If ... not (Trừ khi)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" }
    ],
    practiceList: [
      { correct: "If I had more money, I would travel the world.", meaning: "Nếu tôi có nhiều tiền hơn, tôi sẽ đi du lịch vòng quanh thế giới." },
      { correct: "If I were you, I wouldn't do that.", meaning: "Nếu tôi là bạn, tôi sẽ không làm như vậy." },
      { correct: "I'll go unless it rains.", meaning: "Tôi sẽ đi trừ khi trời mưa." }
    ]
  },
  {
    lesson: 27,
    title: "Ôn tập Câu bị động & Have something done",
    desc: "Tổng hợp lại các dạng câu bị động ở thì hiện tại, quá khứ và cách nhấn mạnh người thực hiện (by).",
    formula: [
      { text: "S + be + V(p.p) + by + O", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "S + have/get + something + V(p.p)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "The book was written by a famous author.", meaning: "Cuốn sách được viết bởi một tác giả nổi tiếng." },
      { correct: "The parcel is delivered every morning.", meaning: "Bưu kiện được giao mỗi sáng." },
      { correct: "I am having my hair cut tomorrow.", meaning: "Tôi sẽ đi cắt tóc vào ngày mai." }
    ]
  },
  {
    lesson: 28,
    title: "Cụm động từ (Phrasal Verbs)",
    desc: "Sự kết hợp giữa động từ và giới từ/trạng từ tạo ra nghĩa mới, một số luôn đi với V-ing.",
    formula: [
      { text: "Look forward to + V-ing", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
      { text: "Give up / Take up + V-ing", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
    ],
    practiceList: [
      { correct: "I look forward to hearing from you.", meaning: "Tôi mong chờ nhận được tin từ bạn." },
      { correct: "He gave up smoking last year.", meaning: "Anh ấy đã bỏ hút thuốc vào năm ngoái." },
      { correct: "I want to take up learning Spanish.", meaning: "Tôi muốn bắt đầu học tiếng Tây Ban Nha." }
    ]
  },
  {
    lesson: 29,
    title: "Tổng hợp Verb + Infinitive / Gerund",
    desc: "Phân loại rõ các động từ theo sau là to-V, V-ing hay cả hai với nghĩa khác nhau.",
    formula: [
      { text: "Manage/Afford/Refuse/Agree/Offer/Decide/Hope/Expect + to-V", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "Avoid/Enjoy/Finish/Suggest/Consider/Keep + V-ing", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "We managed to finish the project on time.", meaning: "Chúng tôi đã xoay sở hoàn thành dự án đúng hạn." },
      { correct: "He avoids driving in the heavy rain.", meaning: "Anh ấy tránh lái xe trong cơn mưa lớn." },
      { correct: "I remembered to lock the door. (Nhớ phải làm)", meaning: "Tôi đã nhớ việc phải khóa cửa." }
    ]
  },
  {
    lesson: 30,
    title: "Ôn tập Question Tags & Từ nối văn viết",
    desc: "Củng cố lại câu hỏi đuôi và làm quen các từ nối dùng để mở rộng ý trong văn viết.",
    formula: [
      { text: "Câu chính (+), Tag (-)? / Câu chính (-), Tag (+)?", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "Moreover (hơn nữa) / Therefore (vì vậy) / Besides (ngoài ra)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "They haven't finished, have they?", meaning: "Họ chưa làm xong, có phải không?" },
      { correct: "He was tired; therefore, he went to sleep.", meaning: "Anh ấy mệt; vì vậy, anh ấy đã đi ngủ." },
      { correct: "I don't like this phone. Besides, it's too expensive.", meaning: "Tôi không thích chiếc điện thoại này. Ngoài ra, nó còn quá đắt." }
    ]
  },
  {
    lesson: 31,
    title: "Ngữ pháp Biển hiệu & Thông báo (Imperative & Passive)",
    desc: "Hiểu cấu trúc thường thấy trên các biển hiệu, thông báo ở nơi công cộng.",
    formula: [
      { text: "No + V-ing / Noun (Cấm)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" },
      { text: "V(nguyên thể) / Do not + V (Mệnh lệnh)", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
    ],
    practiceList: [
      { correct: "No parking.", meaning: "Cấm đỗ xe." },
      { correct: "Please switch off your mobile phones.", meaning: "Vui lòng tắt điện thoại di động của bạn." },
      { correct: "Dogs must be kept on leads.", meaning: "Chó phải được xích lại." }
    ]
  },
  {
    lesson: 32,
    title: "Cấu trúc Email, Lời mời & Đề xuất",
    desc: "Ngữ pháp dùng khi viết email ngắn (Writing Part 7) ở trình độ A2.",
    formula: [
      { text: "Would you like to + V?", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "Why don't we + V? / How about + V-ing?", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
    ],
    practiceList: [
      { correct: "Thanks for your email.", meaning: "Cảm ơn vì email của bạn." },
      { correct: "Would you like to go to the cinema?", meaning: "Bạn có muốn đi xem phim không?" },
      { correct: "Why don't we meet at 6 p.m.?", meaning: "Tại sao chúng ta không gặp nhau lúc 6 giờ tối nhỉ?" }
    ]
  },
  {
    lesson: 33,
    title: "Giao tiếp lịch sự & Gọi điện thoại",
    desc: "Cấu trúc dùng trong các đoạn hội thoại thường ngày (Listening) như xin lỗi, từ chối, nhận điện thoại.",
    formula: [
      { text: "I'm sorry, but... / I'm afraid...", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" },
      { text: "Can I take a message?", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "I'm afraid I can't come to your party.", meaning: "Tôi e rằng tôi không thể đến bữa tiệc của bạn." },
      { correct: "Hello, this is John speaking.", meaning: "Xin chào, John đang nghe máy đây." },
      { correct: "I will call back later.", meaning: "Tôi sẽ gọi lại sau." }
    ]
  },
  {
    lesson: 34,
    title: "Ôn tập Tổng hợp Khóa KET (Các thì & Bị động)",
    desc: "Hệ thống lại các thì, câu bị động, câu tường thuật và câu điều kiện loại 1 & 2.",
    formula: [
      { text: "Hiện tại đơn, Quá khứ đơn, Hiện tại hoàn thành, Tương lai", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "Câu điều kiện 1 (có thể) vs Câu điều kiện 2 (không có thực)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "I have lived here for 5 years.", meaning: "Tôi đã sống ở đây được 5 năm." },
      { correct: "The bridge was built last year.", meaning: "Cây cầu được xây dựng năm ngoái." },
      { correct: "If I won the lottery, I would buy a big house.", meaning: "Nếu tôi trúng xổ số, tôi sẽ mua một ngôi nhà lớn." }
    ]
  },
  {
    lesson: 35,
    title: "Luyện thi KET & Chiến lược làm bài",
    desc: "Tổng hợp các kỹ năng xử lý các phần thi Reading Part 1, Writing Part 7, Speaking Part 2.",
    formula: [
      { text: "Luyện đọc kỹ yêu cầu biển báo, viết đúng số từ quy định", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
      { text: "Sử dụng cấu trúc gợi ý trong bài thi Nói", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "Entry is not permitted.", meaning: "Không được phép vào." },
      { correct: "Hope to hear from you soon.", meaning: "Hy vọng sớm nhận được tin từ bạn." },
      { correct: "In the picture, I can see two people.", meaning: "Trong bức tranh, tôi có thể thấy hai người." }
    ]
  }
];

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
  let successCount = 0;

  for (const item of GRAMMAR_DATA) {
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!targetLesson) {
        console.log(`Bỏ qua Bài ${item.lesson} vì không tìm thấy lesson có orderIndex tương ứng.`);
        continue;
    }

    const contentJson = JSON.stringify({
      title: item.title,
      desc: item.desc,
      formula: item.formula,
      practiceList: item.practiceList
    });

    const existingContent = await prisma.lessonContent.findFirst({
      where: {
        lessonId: targetLesson.id,
        contentType: 'GRAMMAR'
      }
    });

    if (existingContent) {
      await prisma.lessonContent.update({
        where: { id: existingContent.id },
        data: { content: contentJson }
      });
      console.log(`🔄 Đã cập nhật ngữ pháp (Bài có orderIndex ${item.lesson})`);
    } else {
      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'GRAMMAR',
          content: contentJson
        }
      });
      console.log(`✅ Đã tạo mới ngữ pháp (Bài có orderIndex ${item.lesson})`);
    }
    successCount++;
  }

  console.log(`\n🎉 Hoàn thành nạp/cập nhật ${successCount} chủ điểm ngữ pháp KET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

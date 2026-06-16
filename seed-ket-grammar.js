/**
 * SEED SCRIPT: YLE KET Grammar (25 Bài)
 * Chạy từ thư mục gốc: node seed-ket-grammar.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = [
  // BÀI 1: Daily Life -> Hiện tại đơn (Present Simple)
  {
    lesson: 1,
    title: "Thì Hiện tại đơn (Present Simple)",
    desc: "Thì hiện tại đơn diễn tả một thói quen, một hành động lặp đi lặp lại hoặc một chân lý hiển nhiên.",
    formula: [
      { text: "(+) S + V(s/es) + O", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(-) S + do/does not + V(nguyên thể)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" },
      { text: "(?) Do/Does + S + V(nguyên thể)?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "I wake up at 6 AM every day.", meaning: "Tôi thức dậy lúc 6 giờ sáng mỗi ngày." },
      { correct: "He does not like coffee.", meaning: "Anh ấy không thích cà phê." },
      { correct: "Do you play tennis?", meaning: "Bạn có chơi quần vợt không?" }
    ]
  },
  // BÀI 2: People and Family -> Đại từ nhân xưng và Tính từ sở hữu (Pronouns & Possessive Adjectives)
  {
    lesson: 2,
    title: "Đại từ và Tính từ sở hữu",
    desc: "Đại từ nhân xưng thay thế cho danh từ chỉ người/vật (I, you, he, she...). Tính từ sở hữu chỉ sự sở hữu (my, your, his, her...).",
    formula: [
      { text: "Đại từ nhân xưng (Subject) + V", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
      { text: "Tính từ sở hữu (Possessive) + Noun", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "She is my best friend.", meaning: "Cô ấy là bạn thân nhất của tôi." },
      { correct: "Their house is very big.", meaning: "Ngôi nhà của họ rất lớn." },
      { correct: "He loves his parents.", meaning: "Cậu ấy yêu quý bố mẹ của mình." }
    ]
  },
  // BÀI 3: Hobbies and Leisure -> Động từ theo sau bởi V-ing (Verbs + V-ing)
  {
    lesson: 3,
    title: "Động từ theo sau bởi V-ing (Like, Love, Enjoy, Hate)",
    desc: "Các động từ chỉ sở thích như like, love, enjoy, hate thường được theo sau bởi một động từ thêm đuôi -ing.",
    formula: [
      { text: "S + like / love / enjoy / hate + V-ing", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
    ],
    practiceList: [
      { correct: "I enjoy reading comic books.", meaning: "Tôi thích thú với việc đọc truyện tranh." },
      { correct: "She hates washing the dishes.", meaning: "Cô ấy ghét việc rửa bát." },
      { correct: "They love playing football.", meaning: "Họ yêu thích việc chơi bóng đá." }
    ]
  },
  // BÀI 4: Places and Buildings -> Giới từ chỉ địa điểm (Prepositions of Place)
  {
    lesson: 4,
    title: "Giới từ chỉ địa điểm (In, On, At)",
    desc: "In (trong không gian kín), On (trên bề mặt), At (tại một địa điểm cụ thể).",
    formula: [
      { text: "In + không gian kín / thành phố / quốc gia", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" },
      { text: "On + bề mặt / con đường", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" },
      { text: "At + địa điểm cụ thể (at school, at the station)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" }
    ],
    practiceList: [
      { correct: "The bank is on Main Street.", meaning: "Ngân hàng nằm trên phố Main." },
      { correct: "She is waiting at the bus stop.", meaning: "Cô ấy đang đợi ở trạm xe buýt." },
      { correct: "They live in London.", meaning: "Họ sống ở London." }
    ]
  },
  // BÀI 5: Transport and Travel -> Câu mệnh lệnh (Imperatives)
  {
    lesson: 5,
    title: "Câu mệnh lệnh (Imperatives)",
    desc: "Câu mệnh lệnh dùng để ra lệnh, yêu cầu hoặc chỉ dẫn (đường đi).",
    formula: [
      { text: "(+) V(nguyên thể) + O/A", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(-) Don't + V(nguyên thể)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "Turn left at the next traffic lights.", meaning: "Rẽ trái ở cột đèn giao thông tiếp theo." },
      { correct: "Don't forget your passport.", meaning: "Đừng quên hộ chiếu của bạn." },
      { correct: "Show me your ticket, please.", meaning: "Vui lòng cho tôi xem vé của bạn." }
    ]
  },
  // BÀI 6: Food and Drink -> Danh từ đếm được và không đếm được (Countable and Uncountable Nouns)
  {
    lesson: 6,
    title: "Danh từ đếm được và không đếm được",
    desc: "Danh từ đếm được có thể dùng với số đếm (apples, books). Danh từ không đếm được (water, rice, money) luôn ở dạng số ít.",
    formula: [
      { text: "How many + Danh từ đếm được số nhiều?", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "How much + Danh từ không đếm được?", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "How many apples do you want?", meaning: "Bạn muốn bao nhiêu quả táo?" },
      { correct: "We don't have much milk left.", meaning: "Chúng ta không còn nhiều sữa." },
      { correct: "I need some water.", meaning: "Tôi cần một ít nước." }
    ]
  },
  // BÀI 7: School and Study -> Hiện tại tiếp diễn (Present Continuous)
  {
    lesson: 7,
    title: "Thì Hiện tại tiếp diễn (Present Continuous)",
    desc: "Dùng để diễn tả một hành động đang xảy ra ngay lúc nói, hoặc một kế hoạch sắp tới.",
    formula: [
      { text: "(+) S + am/is/are + V-ing", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" },
      { text: "(-) S + am/is/are + not + V-ing", classes: "bg-red-100 text-red-700 border-red-300 font-bold" },
      { text: "(?) Am/Is/Are + S + V-ing?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "The students are listening to the teacher.", meaning: "Các học sinh đang lắng nghe giáo viên." },
      { correct: "I am not doing my homework right now.", meaning: "Bây giờ tôi đang không làm bài tập về nhà." },
      { correct: "Are they studying in the library?", meaning: "Họ có đang học trong thư viện không?" }
    ]
  },
  // BÀI 8: Work and Jobs -> Đại từ quan hệ (Who, Which, That)
  {
    lesson: 8,
    title: "Mệnh đề quan hệ cơ bản (Who, Which, That)",
    desc: "Who dùng thay cho danh từ chỉ người. Which dùng thay cho vật. That có thể thay thế cho cả hai trong mệnh đề quan hệ xác định.",
    formula: [
      { text: "Noun (Người) + Who/That + V", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
      { text: "Noun (Vật) + Which/That + V", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
    ],
    practiceList: [
      { correct: "A dentist is a person who looks after your teeth.", meaning: "Nha sĩ là người chăm sóc răng của bạn." },
      { correct: "The car which is parked outside is mine.", meaning: "Chiếc xe hơi đang đậu bên ngoài là của tôi." },
      { correct: "The pilot that flew the plane is my uncle.", meaning: "Người phi công đã lái máy bay là chú của tôi." }
    ]
  },
  // BÀI 9: Health and Medicine -> Khuyên bảo với Should / Shouldn't
  {
    lesson: 9,
    title: "Động từ khuyết thiếu: Should / Shouldn't",
    desc: "Dùng 'should' hoặc 'shouldn't' để đưa ra lời khuyên về sức khỏe, công việc.",
    formula: [
      { text: "S + should + V(nguyên thể)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
      { text: "S + shouldn't + V(nguyên thể)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "You should see a doctor.", meaning: "Bạn nên đi khám bác sĩ." },
      { correct: "He shouldn't eat so much candy.", meaning: "Cậu ấy không nên ăn quá nhiều kẹo." },
      { correct: "Should I take some medicine?", meaning: "Tôi có nên uống chút thuốc không?" }
    ]
  },
  // BÀI 10: Sports -> Quá khứ đơn (Past Simple)
  {
    lesson: 10,
    title: "Thì Quá khứ đơn (Past Simple)",
    desc: "Diễn tả hành động đã xảy ra và kết thúc trong quá khứ.",
    formula: [
      { text: "(+) S + V-ed / V(cột 2)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(-) S + didn't + V(nguyên thể)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" },
      { text: "(?) Did + S + V(nguyên thể)?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "Our team won the match yesterday.", meaning: "Đội chúng tôi đã thắng trận đấu hôm qua." },
      { correct: "They didn't play tennis last week.", meaning: "Họ đã không chơi quần vợt tuần trước." },
      { correct: "Did you watch the football game?", meaning: "Bạn có xem trận đấu bóng đá không?" }
    ]
  },
  // BÀI 11: The Natural World -> So sánh hơn (Comparative Adjectives)
  {
    lesson: 11,
    title: "So sánh hơn của Tính từ (Comparatives)",
    desc: "Dùng để so sánh 2 người hoặc 2 vật. Thêm -er vào tính từ ngắn, thêm 'more' trước tính từ dài.",
    formula: [
      { text: "S + be + Adj-er + than + Noun", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" },
      { text: "S + be + more + Adj dài + than + Noun", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "A mountain is higher than a hill.", meaning: "Một ngọn núi thì cao hơn một ngọn đồi." },
      { correct: "The ocean is more dangerous than the river.", meaning: "Đại dương thì nguy hiểm hơn dòng sông." },
      { correct: "Lions are stronger than wolves.", meaning: "Sư tử mạnh hơn chó sói." }
    ]
  },
  // BÀI 12: Weather and Climate -> It is / It takes (Cấu trúc với chủ ngữ giả It)
  {
    lesson: 12,
    title: "Chủ ngữ giả 'It' (thời tiết, khoảng cách)",
    desc: "Trong tiếng Anh, dùng 'It' làm chủ ngữ giả khi nói về thời tiết, thời gian hoặc khoảng cách.",
    formula: [
      { text: "It + is + Adj (thời tiết/khoảng cách)", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" },
      { text: "It takes + sb + time + to V", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
    ],
    practiceList: [
      { correct: "It is rainy and windy today.", meaning: "Hôm nay trời mưa và có gió." },
      { correct: "It is very hot in the summer.", meaning: "Vào mùa hè trời rất nóng." },
      { correct: "It takes 2 hours to get there.", meaning: "Mất 2 giờ đồng hồ để đến đó." }
    ]
  },
  // BÀI 13: Clothes and Fashion -> Tính từ sở hữu và Đại từ sở hữu
  {
    lesson: 13,
    title: "Đại từ sở hữu (Possessive Pronouns)",
    desc: "Đại từ sở hữu (mine, yours, his, hers, theirs) thay thế cho 'Tính từ sở hữu + Danh từ' để tránh lặp từ.",
    formula: [
      { text: "Possessive Pronoun = Possessive Adjective + Noun", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" }
    ],
    practiceList: [
      { correct: "This hat is mine. (mine = my hat)", meaning: "Chiếc mũ này là của tôi." },
      { correct: "Are these shoes yours?", meaning: "Những đôi giày này có phải của bạn không?" },
      { correct: "Her dress is red, but hers is blue. (hers = her dress)", meaning: "Váy của cô ấy màu đỏ, nhưng chiếc váy của cô kia thì màu xanh." }
    ]
  },
  // BÀI 14: Entertainment -> So sánh nhất (Superlative Adjectives)
  {
    lesson: 14,
    title: "So sánh nhất của Tính từ (Superlatives)",
    desc: "Dùng để so sánh 1 người/vật với một nhóm. Thêm -est vào tính từ ngắn, thêm 'the most' trước tính từ dài.",
    formula: [
      { text: "S + be + the + Adj-est", classes: "bg-red-100 text-red-700 border-red-300 font-bold" },
      { text: "S + be + the most + Adj dài", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" }
    ],
    practiceList: [
      { correct: "This is the best movie I have ever seen.", meaning: "Đây là bộ phim hay nhất tôi từng xem." },
      { correct: "He is the most famous actor in the world.", meaning: "Ông ấy là diễn viên nổi tiếng nhất thế giới." },
      { correct: "That was the funniest play.", meaning: "Đó là vở kịch hài hước nhất." }
    ]
  },
  // BÀI 15: Technology -> Câu bị động (Passive Voice) - Hiện tại đơn
  {
    lesson: 15,
    title: "Câu bị động Hiện tại đơn (Present Simple Passive)",
    desc: "Câu bị động nhấn mạnh hành động thay vì người thực hiện hành động.",
    formula: [
      { text: "S (vật) + am/is/are + V(p.p) / V-ed (+ by O)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "The emails are sent every day.", meaning: "Những email được gửi mỗi ngày." },
      { correct: "This computer is made in Japan.", meaning: "Chiếc máy tính này được sản xuất tại Nhật Bản." },
      { correct: "Are these videos uploaded by you?", meaning: "Những video này có phải được tải lên bởi bạn không?" }
    ]
  },
  // BÀI 16: Shopping and Money -> Lượng từ (A lot of, Much, Many, A few, A little)
  {
    lesson: 16,
    title: "Lượng từ (Quantifiers: much, many, a lot of)",
    desc: "Many / A few (dùng với danh từ đếm được). Much / A little (dùng với danh từ không đếm được). A lot of (dùng cho cả hai).",
    formula: [
      { text: "Many / A few + N(đếm được số nhiều)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
      { text: "Much / A little + N(không đếm được)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "I don't have much money left.", meaning: "Tôi không còn nhiều tiền." },
      { correct: "There are a lot of customers in the shop.", meaning: "Có rất nhiều khách hàng trong cửa hàng." },
      { correct: "She bought a few clothes.", meaning: "Cô ấy đã mua một vài bộ quần áo." }
    ]
  },
  // BÀI 17: House and Home -> There is / There are
  {
    lesson: 17,
    title: "Cấu trúc There is / There are",
    desc: "Dùng để chỉ sự tồn tại của người hoặc vật. There is + số ít/không đếm được. There are + số nhiều.",
    formula: [
      { text: "There is + a/an + Noun (số ít) + place", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "There are + (số đếm) + Noun (số nhiều) + place", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
    ],
    practiceList: [
      { correct: "There is a sofa in the living room.", meaning: "Có một chiếc sô-pha trong phòng khách." },
      { correct: "There are two windows in my bedroom.", meaning: "Có hai cửa sổ trong phòng ngủ của tôi." },
      { correct: "Is there any furniture in the garden?", meaning: "Có đồ nội thất nào trong vườn không?" }
    ]
  },
  // BÀI 18: Feelings and Opinions -> Động từ khuyết thiếu: Can, Could (Khả năng)
  {
    lesson: 18,
    title: "Động từ khuyết thiếu: Can, Could (Ability)",
    desc: "Can dùng cho khả năng hiện tại. Could dùng cho khả năng trong quá khứ.",
    formula: [
      { text: "S + can / could + V(nguyên thể)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" },
      { text: "S + cannot(can't) / couldn't + V(nguyên thể)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "I can speak two languages.", meaning: "Tôi có thể nói được hai ngôn ngữ." },
      { correct: "She couldn't sleep because she was worried.", meaning: "Cô ấy đã không thể ngủ vì quá lo lắng." },
      { correct: "Can you help me with my homework?", meaning: "Bạn có thể giúp tôi làm bài tập về nhà không?" }
    ]
  },
  // BÀI 19: Language and Communication -> Quá khứ tiếp diễn (Past Continuous)
  {
    lesson: 19,
    title: "Thì Quá khứ tiếp diễn (Past Continuous)",
    desc: "Diễn tả hành động đang diễn ra tại một thời điểm xác định trong quá khứ, thường kết hợp với When/While.",
    formula: [
      { text: "S + was/were + V-ing", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
      { text: "While + Quá khứ tiếp diễn, Quá khứ đơn", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" }
    ],
    practiceList: [
      { correct: "I was reading a book when she called.", meaning: "Tôi đang đọc sách thì cô ấy gọi." },
      { correct: "What were you doing at 8 PM yesterday?", meaning: "Bạn đang làm gì lúc 8 giờ tối hôm qua?" },
      { correct: "While we were chatting, the lights went out.", meaning: "Trong khi chúng tôi đang tán gẫu, đèn chợt tắt." }
    ]
  },
  // BÀI 20: Travel and Holidays -> Thì Hiện tại hoàn thành (Present Perfect)
  {
    lesson: 20,
    title: "Thì Hiện tại hoàn thành (Present Perfect)",
    desc: "Diễn tả hành động đã xảy ra trong quá khứ nhưng kết quả còn lưu lại ở hiện tại hoặc trải nghiệm (với Ever/Never).",
    formula: [
      { text: "(+) S + have/has + V(p.p) / V-ed", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
      { text: "(-) S + haven't/hasn't + V(p.p)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" },
      { text: "(?) Have/Has + S + ever + V(p.p)?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
    ],
    practiceList: [
      { correct: "Have you ever visited Japan?", meaning: "Bạn đã từng đến thăm Nhật Bản chưa?" },
      { correct: "I have never flown on a plane.", meaning: "Tôi chưa từng bay trên máy bay." },
      { correct: "She has already booked the hotel.", meaning: "Cô ấy đã đặt khách sạn rồi." }
    ]
  },
  // BÀI 21: Culture and Festivals -> Câu điều kiện loại 1 (First Conditional)
  {
    lesson: 21,
    title: "Câu điều kiện loại 1 (First Conditional)",
    desc: "Dùng để diễn tả một sự việc có thể xảy ra ở hiện tại hoặc tương lai nếu điều kiện được thỏa mãn.",
    formula: [
      { text: "If + S + V(hiện tại), S + will + V(nguyên thể)", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
    ],
    practiceList: [
      { correct: "If it rains, we will stay at home.", meaning: "Nếu trời mưa, chúng tôi sẽ ở nhà." },
      { correct: "If you invite him, he will come to the party.", meaning: "Nếu bạn mời anh ấy, anh ấy sẽ đến bữa tiệc." },
      { correct: "She will buy a new dress if she has enough money.", meaning: "Cô ấy sẽ mua một chiếc váy mới nếu cô ấy có đủ tiền." }
    ]
  },
  // BÀI 22: Future Plans -> Tương lai gần (Be going to) vs Tương lai đơn (Will)
  {
    lesson: 22,
    title: "Be going to vs Will (Kế hoạch tương lai)",
    desc: "Dùng 'be going to' cho kế hoạch đã dự định trước. Dùng 'will' cho quyết định bộc phát ngay lúc nói.",
    formula: [
      { text: "S + am/is/are + going to + V (Kế hoạch)", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" },
      { text: "S + will + V (Quyết định tức thời/Dự đoán)", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" }
    ],
    practiceList: [
      { correct: "I am going to study abroad next year.", meaning: "Tôi dự định sẽ đi du học vào năm sau." },
      { correct: "The phone is ringing. I will answer it.", meaning: "Điện thoại đang reo. Tôi sẽ trả lời nó." },
      { correct: "We are going to buy a new house.", meaning: "Chúng tôi dự định sẽ mua một ngôi nhà mới." }
    ]
  },
  // BÀI 23: Experiences -> Liên từ nối (Conjunctions: and, but, so, because)
  {
    lesson: 23,
    title: "Liên từ (Conjunctions: and, but, so, because)",
    desc: "Dùng để nối các mệnh đề: and (và), but (nhưng), so (vì vậy), because (bởi vì).",
    formula: [
      { text: "S + V, but/so/and/because + S + V", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
    ],
    practiceList: [
      { correct: "I tried hard, but I failed.", meaning: "Tôi đã cố gắng rất nhiều, nhưng tôi đã thất bại." },
      { correct: "He was sick, so he didn't go to school.", meaning: "Anh ấy bị ốm, vì vậy anh ấy đã không đến trường." },
      { correct: "I went to bed early because I was tired.", meaning: "Tôi đã đi ngủ sớm bởi vì tôi bị mệt." }
    ]
  },
  // BÀI 24: Personal Information -> Cấu trúc với V-ing làm danh động từ (Gerunds)
  {
    lesson: 24,
    title: "Danh động từ (Gerunds: V-ing làm Chủ ngữ/Tân ngữ)",
    desc: "Khi động từ thêm đuôi -ing, nó có thể đóng vai trò như một danh từ làm chủ ngữ trong câu.",
    formula: [
      { text: "V-ing + is/are + Adj / Noun", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" }
    ],
    practiceList: [
      { correct: "Reading is my favorite hobby.", meaning: "Đọc sách là sở thích yêu thích của tôi." },
      { correct: "Learning English is very useful.", meaning: "Việc học tiếng Anh rất hữu ích." },
      { correct: "Swimming keeps you fit.", meaning: "Bơi lội giúp bạn giữ dáng." }
    ]
  },
  // BÀI 25: Final Review -> Câu hỏi đuôi (Tag Questions)
  {
    lesson: 25,
    title: "Câu hỏi đuôi (Tag Questions)",
    desc: "Câu hỏi đuôi dùng để xác nhận thông tin. Nếu mệnh đề trước khẳng định, phần đuôi phủ định và ngược lại.",
    formula: [
      { text: "(+) S + V, trợ động từ phủ định + S?", classes: "bg-green-100 text-green-700 border-green-300 font-bold" },
      { text: "(-) S + don't/didn't + V, trợ động từ khẳng định + S?", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
    ],
    practiceList: [
      { correct: "You are a student, aren't you?", meaning: "Bạn là học sinh, có phải không?" },
      { correct: "She didn't pass the exam, did she?", meaning: "Cô ấy đã không vượt qua kỳ thi, có phải không?" },
      { correct: "It is beautiful, isn't it?", meaning: "Nó thật đẹp, có phải không?" }
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
    if (!targetLesson) continue;

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
      console.log(`🔄 Đã cập nhật ngữ pháp (Bài ${item.lesson})`);
    } else {
      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'GRAMMAR',
          content: contentJson
        }
      });
      successCount++;
      console.log(`✅ Đã tạo mới ngữ pháp (Bài ${item.lesson})`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp ${successCount} chủ điểm ngữ pháp KET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

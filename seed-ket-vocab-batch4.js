/**
 * SEED SCRIPT: YLE KET Vocabulary — Batch 4 (Bài 16 - 20)
 * Chạy từ thư mục gốc: node seed-ket-vocab-batch4.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 16: Shopping and Money (Mua sắm và Tiền bạc)
  { lesson: 16, word: "shop", type: "noun", phonetic: "/ʃɒp/", meaning: "cửa hàng", audioUrl: "", exampleEn: "I need to go to the shop.", exampleVi: "Tôi cần đi đến cửa hàng." },
  { lesson: 16, word: "buy", type: "verb", phonetic: "/baɪ/", meaning: "mua", audioUrl: "", exampleEn: "I want to buy a new dress.", exampleVi: "Tôi muốn mua một chiếc váy mới." },
  { lesson: 16, word: "sell", type: "verb", phonetic: "/sel/", meaning: "bán", audioUrl: "", exampleEn: "They sell fresh vegetables here.", exampleVi: "Họ bán rau tươi ở đây." },
  { lesson: 16, word: "money", type: "noun", phonetic: "/ˈmʌn.i/", meaning: "tiền", audioUrl: "", exampleEn: "Do you have enough money?", exampleVi: "Bạn có đủ tiền không?" },
  { lesson: 16, word: "cash", type: "noun", phonetic: "/kæʃ/", meaning: "tiền mặt", audioUrl: "", exampleEn: "Can I pay in cash?", exampleVi: "Tôi có thể thanh toán bằng tiền mặt không?" },
  { lesson: 16, word: "card", type: "noun", phonetic: "/kɑːd/", meaning: "thẻ", audioUrl: "", exampleEn: "I will pay by credit card.", exampleVi: "Tôi sẽ thanh toán bằng thẻ tín dụng." },
  { lesson: 16, word: "coin", type: "noun", phonetic: "/kɔɪn/", meaning: "đồng xu", audioUrl: "", exampleEn: "I found a gold coin.", exampleVi: "Tôi đã tìm thấy một đồng xu vàng." },
  { lesson: 16, word: "price", type: "noun", phonetic: "/praɪs/", meaning: "giá cả", audioUrl: "", exampleEn: "What is the price of this bag?", exampleVi: "Giá của chiếc túi này là bao nhiêu?" },
  { lesson: 16, word: "cheap", type: "adjective", phonetic: "/tʃiːp/", meaning: "rẻ", audioUrl: "", exampleEn: "This shirt is very cheap.", exampleVi: "Chiếc áo sơ mi này rất rẻ." },
  { lesson: 16, word: "expensive", type: "adjective", phonetic: "/ɪkˈspen.sɪv/", meaning: "đắt", audioUrl: "", exampleEn: "That car is too expensive.", exampleVi: "Chiếc xe ô tô đó quá đắt." },
  { lesson: 16, word: "pay", type: "verb", phonetic: "/peɪ/", meaning: "thanh toán, trả tiền", audioUrl: "", exampleEn: "I will pay for the meal.", exampleVi: "Tôi sẽ trả tiền cho bữa ăn." },
  { lesson: 16, word: "spend", type: "verb", phonetic: "/spend/", meaning: "tiêu (tiền), dành (thời gian)", audioUrl: "", exampleEn: "Don't spend all your money.", exampleVi: "Đừng tiêu hết tiền của bạn." },
  { lesson: 16, word: "save", type: "verb", phonetic: "/seɪv/", meaning: "tiết kiệm", audioUrl: "", exampleEn: "She is saving money for a holiday.", exampleVi: "Cô ấy đang tiết kiệm tiền cho một kỳ nghỉ." },
  { lesson: 16, word: "receipt", type: "noun", phonetic: "/rɪˈsiːt/", meaning: "biên lai, hóa đơn", audioUrl: "", exampleEn: "Can I have a receipt, please?", exampleVi: "Cho tôi xin biên lai được không?" },
  { lesson: 16, word: "discount", type: "noun", phonetic: "/ˈdɪs.kaʊnt/", meaning: "sự giảm giá", audioUrl: "", exampleEn: "They offer a 20% discount to students.", exampleVi: "Họ cung cấp mức giảm giá 20% cho học sinh." },
  { lesson: 16, word: "customer", type: "noun", phonetic: "/ˈkʌs.tə.mər/", meaning: "khách hàng", audioUrl: "", exampleEn: "The shop has many customers today.", exampleVi: "Cửa hàng có nhiều khách hàng hôm nay." },
  { lesson: 16, word: "assistant", type: "noun", phonetic: "/əˈsɪs.tənt/", meaning: "nhân viên bán hàng", audioUrl: "", exampleEn: "The shop assistant was very helpful.", exampleVi: "Nhân viên bán hàng rất nhiệt tình." },
  { lesson: 16, word: "size", type: "noun", phonetic: "/saɪz/", meaning: "kích cỡ", audioUrl: "", exampleEn: "What size do you wear?", exampleVi: "Bạn mặc kích cỡ nào?" },
  { lesson: 16, word: "try on", type: "phrasal verb", phonetic: "/traɪ ɒn/", meaning: "thử (quần áo)", audioUrl: "", exampleEn: "Can I try this shirt on?", exampleVi: "Tôi có thể thử chiếc áo này không?" },
  { lesson: 16, word: "fit", type: "verb", phonetic: "/fɪt/", meaning: "vừa vặn", audioUrl: "", exampleEn: "These shoes don't fit me.", exampleVi: "Những đôi giày này không vừa với tôi." },

  // BÀI 17: House and Home (Nhà cửa và Tổ ấm)
  { lesson: 17, word: "house", type: "noun", phonetic: "/haʊs/", meaning: "ngôi nhà", audioUrl: "", exampleEn: "We live in a big house.", exampleVi: "Chúng tôi sống trong một ngôi nhà lớn." },
  { lesson: 17, word: "home", type: "noun", phonetic: "/həʊm/", meaning: "tổ ấm, nhà", audioUrl: "", exampleEn: "I want to go home.", exampleVi: "Tôi muốn về nhà." },
  { lesson: 17, word: "apartment", type: "noun", phonetic: "/əˈpɑːt.mənt/", meaning: "căn hộ", audioUrl: "", exampleEn: "They live in an apartment.", exampleVi: "Họ sống trong một căn hộ." },
  { lesson: 17, word: "room", type: "noun", phonetic: "/ruːm/", meaning: "căn phòng", audioUrl: "", exampleEn: "My room is on the second floor.", exampleVi: "Phòng của tôi ở tầng hai." },
  { lesson: 17, word: "door", type: "noun", phonetic: "/dɔːr/", meaning: "cửa ra vào", audioUrl: "", exampleEn: "Please close the door.", exampleVi: "Vui lòng đóng cửa ra vào." },
  { lesson: 17, word: "window", type: "noun", phonetic: "/ˈwɪn.dəʊ/", meaning: "cửa sổ", audioUrl: "", exampleEn: "Open the window, please.", exampleVi: "Làm ơn hãy mở cửa sổ." },
  { lesson: 17, word: "wall", type: "noun", phonetic: "/wɔːl/", meaning: "bức tường", audioUrl: "", exampleEn: "He painted the wall blue.", exampleVi: "Anh ấy đã sơn bức tường màu xanh lam." },
  { lesson: 17, word: "floor", type: "noun", phonetic: "/flɔːr/", meaning: "sàn nhà, tầng", audioUrl: "", exampleEn: "The baby is playing on the floor.", exampleVi: "Em bé đang chơi trên sàn nhà." },
  { lesson: 17, word: "roof", type: "noun", phonetic: "/ruːf/", meaning: "mái nhà", audioUrl: "", exampleEn: "The bird is on the roof.", exampleVi: "Con chim đang đậu trên mái nhà." },
  { lesson: 17, word: "garden", type: "noun", phonetic: "/ˈɡɑː.dən/", meaning: "khu vườn", audioUrl: "", exampleEn: "We grow vegetables in the garden.", exampleVi: "Chúng tôi trồng rau trong khu vườn." },
  { lesson: 17, word: "furniture", type: "noun", phonetic: "/ˈfɜː.nɪ.tʃər/", meaning: "đồ nội thất", audioUrl: "", exampleEn: "We need to buy some new furniture.", exampleVi: "Chúng ta cần mua một vài món đồ nội thất mới." },
  { lesson: 17, word: "sofa", type: "noun", phonetic: "/ˈsəʊ.fə/", meaning: "ghế sô-pha", audioUrl: "", exampleEn: "He is sleeping on the sofa.", exampleVi: "Anh ấy đang ngủ trên chiếc ghế sô-pha." },
  { lesson: 17, word: "bed", type: "noun", phonetic: "/bed/", meaning: "chiếc giường", audioUrl: "", exampleEn: "I go to bed at 10 PM.", exampleVi: "Tôi đi ngủ lúc 10 giờ tối." },
  { lesson: 17, word: "table", type: "noun", phonetic: "/ˈteɪ.bəl/", meaning: "cái bàn", audioUrl: "", exampleEn: "Put the books on the table.", exampleVi: "Hãy đặt những cuốn sách lên bàn." },
  { lesson: 17, word: "chair", type: "noun", phonetic: "/tʃeər/", meaning: "cái ghế", audioUrl: "", exampleEn: "Sit on the chair.", exampleVi: "Hãy ngồi lên ghế." },
  { lesson: 17, word: "lamp", type: "noun", phonetic: "/læmp/", meaning: "cái đèn", audioUrl: "", exampleEn: "Turn on the lamp, please.", exampleVi: "Làm ơn bật đèn lên." },
  { lesson: 17, word: "kitchen", type: "noun", phonetic: "/ˈkɪtʃ.ən/", meaning: "nhà bếp", audioUrl: "", exampleEn: "My mother is cooking in the kitchen.", exampleVi: "Mẹ tôi đang nấu ăn trong nhà bếp." },
  { lesson: 17, word: "bathroom", type: "noun", phonetic: "/ˈbɑːθ.ruːm/", meaning: "phòng tắm", audioUrl: "", exampleEn: "Where is the bathroom?", exampleVi: "Phòng tắm ở đâu?" },
  { lesson: 17, word: "bedroom", type: "noun", phonetic: "/ˈbed.ruːm/", meaning: "phòng ngủ", audioUrl: "", exampleEn: "My bedroom is very cozy.", exampleVi: "Phòng ngủ của tôi rất ấm cúng." },
  { lesson: 17, word: "living room", type: "noun", phonetic: "/ˈlɪv.ɪŋ ˌruːm/", meaning: "phòng khách", audioUrl: "", exampleEn: "We watch TV in the living room.", exampleVi: "Chúng tôi xem tivi trong phòng khách." },

  // BÀI 18: Feelings and Opinions (Cảm xúc và Quan điểm)
  { lesson: 18, word: "feel", type: "verb", phonetic: "/fiːl/", meaning: "cảm thấy", audioUrl: "", exampleEn: "How do you feel today?", exampleVi: "Hôm nay bạn cảm thấy thế nào?" },
  { lesson: 18, word: "happy", type: "adjective", phonetic: "/ˈhæp.i/", meaning: "hạnh phúc, vui vẻ", audioUrl: "", exampleEn: "She looks very happy.", exampleVi: "Cô ấy trông rất hạnh phúc." },
  { lesson: 18, word: "sad", type: "adjective", phonetic: "/sæd/", meaning: "buồn bã", audioUrl: "", exampleEn: "The movie made me feel sad.", exampleVi: "Bộ phim đã làm tôi cảm thấy buồn." },
  { lesson: 18, word: "angry", type: "adjective", phonetic: "/ˈæŋ.ɡri/", meaning: "tức giận", audioUrl: "", exampleEn: "My dad was angry with me.", exampleVi: "Bố tôi đã tức giận với tôi." },
  { lesson: 18, word: "tired", type: "adjective", phonetic: "/taɪəd/", meaning: "mệt mỏi", audioUrl: "", exampleEn: "I am too tired to study.", exampleVi: "Tôi quá mệt để học bài." },
  { lesson: 18, word: "bored", type: "adjective", phonetic: "/bɔːd/", meaning: "nhàm chán", audioUrl: "", exampleEn: "I am bored with this game.", exampleVi: "Tôi cảm thấy nhàm chán với trò chơi này." },
  { lesson: 18, word: "excited", type: "adjective", phonetic: "/ɪkˈsaɪ.tɪd/", meaning: "hào hứng", audioUrl: "", exampleEn: "We are excited about the trip.", exampleVi: "Chúng tôi rất hào hứng về chuyến đi." },
  { lesson: 18, word: "surprised", type: "adjective", phonetic: "/səˈpraɪzd/", meaning: "ngạc nhiên", audioUrl: "", exampleEn: "He was surprised to see me.", exampleVi: "Cậu ấy đã ngạc nhiên khi thấy tôi." },
  { lesson: 18, word: "scared", type: "adjective", phonetic: "/skeəd/", meaning: "sợ hãi", audioUrl: "", exampleEn: "She is scared of dogs.", exampleVi: "Cô ấy sợ những con chó." },
  { lesson: 18, word: "worried", type: "adjective", phonetic: "/ˈwʌr.id/", meaning: "lo lắng", audioUrl: "", exampleEn: "I am worried about my exam.", exampleVi: "Tôi lo lắng về kỳ thi của mình." },
  { lesson: 18, word: "think", type: "verb", phonetic: "/θɪŋk/", meaning: "nghĩ", audioUrl: "", exampleEn: "I think it will rain.", exampleVi: "Tôi nghĩ trời sẽ mưa." },
  { lesson: 18, word: "believe", type: "verb", phonetic: "/bɪˈliːv/", meaning: "tin tưởng", audioUrl: "", exampleEn: "I don't believe you.", exampleVi: "Tôi không tin bạn." },
  { lesson: 18, word: "hope", type: "verb", phonetic: "/həʊp/", meaning: "hy vọng", audioUrl: "", exampleEn: "I hope you feel better soon.", exampleVi: "Tôi hy vọng bạn sẽ sớm cảm thấy tốt hơn." },
  { lesson: 18, word: "agree", type: "verb", phonetic: "/əˈɡriː/", meaning: "đồng ý", audioUrl: "", exampleEn: "I agree with you.", exampleVi: "Tôi đồng ý với bạn." },
  { lesson: 18, word: "disagree", type: "verb", phonetic: "/ˌdɪs.əˈɡriː/", meaning: "không đồng ý", audioUrl: "", exampleEn: "We strongly disagree.", exampleVi: "Chúng tôi hoàn toàn không đồng ý." },
  { lesson: 18, word: "good", type: "adjective", phonetic: "/ɡʊd/", meaning: "tốt", audioUrl: "", exampleEn: "That is a good idea.", exampleVi: "Đó là một ý kiến tốt." },
  { lesson: 18, word: "bad", type: "adjective", phonetic: "/bæd/", meaning: "tồi, xấu", audioUrl: "", exampleEn: "Smoking is a bad habit.", exampleVi: "Hút thuốc là một thói quen xấu." },
  { lesson: 18, word: "right", type: "adjective", phonetic: "/raɪt/", meaning: "đúng", audioUrl: "", exampleEn: "Your answer is right.", exampleVi: "Câu trả lời của bạn là đúng." },
  { lesson: 18, word: "wrong", type: "adjective", phonetic: "/rɒŋ/", meaning: "sai", audioUrl: "", exampleEn: "He gave the wrong answer.", exampleVi: "Anh ấy đã đưa ra câu trả lời sai." },
  { lesson: 18, word: "opinion", type: "noun", phonetic: "/əˈpɪn.jən/", meaning: "quan điểm, ý kiến", audioUrl: "", exampleEn: "What is your opinion about this?", exampleVi: "Quan điểm của bạn về vấn đề này là gì?" },

  // BÀI 19: Language and Communication (Ngôn ngữ và Giao tiếp)
  { lesson: 19, word: "language", type: "noun", phonetic: "/ˈlæŋ.ɡwɪdʒ/", meaning: "ngôn ngữ", audioUrl: "", exampleEn: "How many languages can you speak?", exampleVi: "Bạn có thể nói được bao nhiêu ngôn ngữ?" },
  { lesson: 19, word: "word", type: "noun", phonetic: "/wɜːd/", meaning: "từ vựng", audioUrl: "", exampleEn: "How do you spell this word?", exampleVi: "Bạn đánh vần từ này như thế nào?" },
  { lesson: 19, word: "sentence", type: "noun", phonetic: "/ˈsen.təns/", meaning: "câu", audioUrl: "", exampleEn: "Write a sentence using this word.", exampleVi: "Hãy viết một câu sử dụng từ này." },
  { lesson: 19, word: "letter", type: "noun", phonetic: "/ˈlet.ər/", meaning: "bức thư, chữ cái", audioUrl: "", exampleEn: "A is the first letter of the alphabet.", exampleVi: "A là chữ cái đầu tiên của bảng chữ cái." },
  { lesson: 19, word: "speak", type: "verb", phonetic: "/spiːk/", meaning: "nói", audioUrl: "", exampleEn: "He can speak French fluently.", exampleVi: "Anh ấy có thể nói tiếng Pháp trôi chảy." },
  { lesson: 19, word: "say", type: "verb", phonetic: "/seɪ/", meaning: "nói ra", audioUrl: "", exampleEn: "What did you say?", exampleVi: "Bạn vừa nói gì cơ?" },
  { lesson: 19, word: "tell", type: "verb", phonetic: "/tel/", meaning: "kể, bảo", audioUrl: "", exampleEn: "Can you tell me a story?", exampleVi: "Bạn có thể kể cho tôi một câu chuyện không?" },
  { lesson: 19, word: "ask", type: "verb", phonetic: "/ɑːsk/", meaning: "hỏi, yêu cầu", audioUrl: "", exampleEn: "If you don't know, just ask.", exampleVi: "Nếu bạn không biết, cứ hỏi nhé." },
  { lesson: 19, word: "answer", type: "verb", phonetic: "/ˈɑːn.sər/", meaning: "trả lời", audioUrl: "", exampleEn: "Please answer the question.", exampleVi: "Vui lòng trả lời câu hỏi." },
  { lesson: 19, word: "listen", type: "verb", phonetic: "/ˈlɪs.ən/", meaning: "lắng nghe", audioUrl: "", exampleEn: "Listen to the teacher carefully.", exampleVi: "Hãy lắng nghe giáo viên cẩn thận." },
  { lesson: 19, word: "hear", type: "verb", phonetic: "/hɪər/", meaning: "nghe thấy", audioUrl: "", exampleEn: "I can't hear you.", exampleVi: "Tôi không thể nghe thấy bạn." },
  { lesson: 19, word: "read", type: "verb", phonetic: "/riːd/", meaning: "đọc", audioUrl: "", exampleEn: "She reads a book every week.", exampleVi: "Cô ấy đọc một cuốn sách mỗi tuần." },
  { lesson: 19, word: "write", type: "verb", phonetic: "/raɪt/", meaning: "viết", audioUrl: "", exampleEn: "I need to write an email.", exampleVi: "Tôi cần viết một email." },
  { lesson: 19, word: "spell", type: "verb", phonetic: "/spel/", meaning: "đánh vần", audioUrl: "", exampleEn: "How do you spell your name?", exampleVi: "Bạn đánh vần tên của bạn như thế nào?" },
  { lesson: 19, word: "understand", type: "verb", phonetic: "/ˌʌn.dəˈstænd/", meaning: "hiểu", audioUrl: "", exampleEn: "I understand what you mean.", exampleVi: "Tôi hiểu ý bạn là gì." },
  { lesson: 19, word: "translate", type: "verb", phonetic: "/trænzˈleɪt/", meaning: "dịch", audioUrl: "", exampleEn: "Can you translate this sentence into English?", exampleVi: "Bạn có thể dịch câu này sang tiếng Anh không?" },
  { lesson: 19, word: "dictionary", type: "noun", phonetic: "/ˈdɪk.ʃən.ər.i/", meaning: "từ điển", audioUrl: "", exampleEn: "Use a dictionary to look up new words.", exampleVi: "Hãy sử dụng từ điển để tra từ mới." },
  { lesson: 19, word: "mean", type: "verb", phonetic: "/miːn/", meaning: "có nghĩa là", audioUrl: "", exampleEn: "What does this word mean?", exampleVi: "Từ này có nghĩa là gì?" },
  { lesson: 19, word: "conversation", type: "noun", phonetic: "/ˌkɒn.vəˈseɪ.ʃən/", meaning: "cuộc hội thoại", audioUrl: "", exampleEn: "We had a long conversation.", exampleVi: "Chúng tôi đã có một cuộc hội thoại dài." },
  { lesson: 19, word: "news", type: "noun", phonetic: "/njuːz/", meaning: "tin tức", audioUrl: "", exampleEn: "I watch the news on TV.", exampleVi: "Tôi xem tin tức trên tivi." },

  // BÀI 20: Travel and Holidays (Du lịch và Kỳ nghỉ)
  { lesson: 20, word: "holiday", type: "noun", phonetic: "/ˈhɒl.ə.deɪ/", meaning: "kỳ nghỉ", audioUrl: "", exampleEn: "Where did you go on holiday?", exampleVi: "Bạn đã đi đâu trong kỳ nghỉ?" },
  { lesson: 20, word: "vacation", type: "noun", phonetic: "/vəˈkeɪ.ʃən/", meaning: "kỳ nghỉ (Anh-Mỹ)", audioUrl: "", exampleEn: "We are planning our summer vacation.", exampleVi: "Chúng tôi đang lên kế hoạch cho kỳ nghỉ hè." },
  { lesson: 20, word: "travel", type: "verb", phonetic: "/ˈtræv.əl/", meaning: "đi du lịch", audioUrl: "", exampleEn: "She loves to travel.", exampleVi: "Cô ấy thích đi du lịch." },
  { lesson: 20, word: "trip", type: "noun", phonetic: "/trɪp/", meaning: "chuyến đi", audioUrl: "", exampleEn: "How was your trip to Japan?", exampleVi: "Chuyến đi tới Nhật Bản của bạn thế nào?" },
  { lesson: 20, word: "tourist", type: "noun", phonetic: "/ˈtʊə.rɪst/", meaning: "khách du lịch", audioUrl: "", exampleEn: "Millions of tourists visit Paris every year.", exampleVi: "Hàng triệu khách du lịch đến thăm Paris mỗi năm." },
  { lesson: 20, word: "guide", type: "noun", phonetic: "/ɡaɪd/", meaning: "hướng dẫn viên", audioUrl: "", exampleEn: "Our tour guide was very knowledgeable.", exampleVi: "Hướng dẫn viên du lịch của chúng tôi rất am hiểu." },
  { lesson: 20, word: "passport", type: "noun", phonetic: "/ˈpɑːs.pɔːt/", meaning: "hộ chiếu", audioUrl: "", exampleEn: "Don't forget to bring your passport.", exampleVi: "Đừng quên mang theo hộ chiếu của bạn." },
  { lesson: 20, word: "visa", type: "noun", phonetic: "/ˈviː.zə/", meaning: "thị thực", audioUrl: "", exampleEn: "You need a visa to enter the country.", exampleVi: "Bạn cần có thị thực để nhập cảnh vào quốc gia đó." },
  { lesson: 20, word: "hotel", type: "noun", phonetic: "/həʊˈtel/", meaning: "khách sạn", audioUrl: "", exampleEn: "We stayed in a 5-star hotel.", exampleVi: "Chúng tôi đã ở trong một khách sạn 5 sao." },
  { lesson: 20, word: "book", type: "verb", phonetic: "/bʊk/", meaning: "đặt trước", audioUrl: "", exampleEn: "I booked a flight online.", exampleVi: "Tôi đã đặt một chuyến bay trực tuyến." },
  { lesson: 20, word: "pack", type: "verb", phonetic: "/pæk/", meaning: "đóng gói (hành lý)", audioUrl: "", exampleEn: "I need to pack my suitcase.", exampleVi: "Tôi cần đóng gói va-li của mình." },
  { lesson: 20, word: "suitcase", type: "noun", phonetic: "/ˈsuːt.keɪs/", meaning: "va-li", audioUrl: "", exampleEn: "My suitcase is very heavy.", exampleVi: "Va-li của tôi rất nặng." },
  { lesson: 20, word: "luggage", type: "noun", phonetic: "/ˈlʌɡ.ɪdʒ/", meaning: "hành lý", audioUrl: "", exampleEn: "Can you carry my luggage?", exampleVi: "Bạn có thể xách hành lý giúp tôi không?" },
  { lesson: 20, word: "airport", type: "noun", phonetic: "/ˈeə.pɔːt/", meaning: "sân bay", audioUrl: "", exampleEn: "We arrived at the airport early.", exampleVi: "Chúng tôi đã đến sân bay sớm." },
  { lesson: 20, word: "station", type: "noun", phonetic: "/ˈsteɪ.ʃən/", meaning: "nhà ga", audioUrl: "", exampleEn: "The train leaves the station at 9 AM.", exampleVi: "Chuyến tàu rời nhà ga lúc 9 giờ sáng." },
  { lesson: 20, word: "ticket", type: "noun", phonetic: "/ˈtɪk.ɪt/", meaning: "vé", audioUrl: "", exampleEn: "Show me your ticket, please.", exampleVi: "Cho tôi xem vé của bạn nhé." },
  { lesson: 20, word: "visit", type: "verb", phonetic: "/ˈvɪz.ɪt/", meaning: "đến thăm, tham quan", audioUrl: "", exampleEn: "We will visit the museum tomorrow.", exampleVi: "Ngày mai chúng tôi sẽ đến tham quan bảo tàng." },
  { lesson: 20, word: "camp", type: "verb", phonetic: "/kæmp/", meaning: "cắm trại", audioUrl: "", exampleEn: "We usually camp in the forest.", exampleVi: "Chúng tôi thường cắm trại trong khu rừng." },
  { lesson: 20, word: "tent", type: "noun", phonetic: "/tent/", meaning: "cái lều", audioUrl: "", exampleEn: "It took an hour to put up the tent.", exampleVi: "Mất một giờ đồng hồ để dựng lều." },
  { lesson: 20, word: "souvenir", type: "noun", phonetic: "/ˌsuː.vənˈɪər/", meaning: "đồ lưu niệm", audioUrl: "", exampleEn: "I bought some souvenirs for my family.", exampleVi: "Tôi đã mua vài món đồ lưu niệm cho gia đình mình." }
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
  
  const vocabLesson = program.lessons.find(l => l.orderIndex === 9999);

  let successCount = 0;
  for (const item of VOCAB_DATA) {
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!targetLesson) continue;

    const contentJson = JSON.stringify({
      word: item.word,
      type: item.type,
      phonetic: item.phonetic,
      meaning: item.meaning,
      audioUrl: item.audioUrl,
      example_en: item.exampleEn,
      example_vi: item.exampleVi
    });

    const existingContent = await prisma.lessonContent.findFirst({
      where: {
        lessonId: targetLesson.id,
        contentType: 'VOCABULARY',
        content: { contains: `"word":"${item.word}"` }
      }
    });

    if (!existingContent) {
      await prisma.lessonContent.create({
        data: { lessonId: targetLesson.id, contentType: 'VOCABULARY', content: contentJson }
      });
      await prisma.lessonContent.create({
        data: { lessonId: vocabLesson.id, contentType: 'VOCABULARY', content: contentJson }
      });
      successCount++;
      console.log(`✅ Đã thêm từ: ${item.word} (Bài ${item.lesson})`);
    } else {
      console.log(`⏩ Đã tồn tại từ: ${item.word}`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp ${successCount} từ vựng Batch 4 cho KET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

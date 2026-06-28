/**
 * SEED SCRIPT: YLE Flyers Vocabulary — Batch 5 (Bài 21 - 25)
 * Chạy từ thư mục gốc: node seed-yle-flyers-vocab-batch5.js
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 21: Measurements and Numbers (Đo lường và Số đếm)
  { lesson: 21, word: "centimetre", type: "noun", phonetic: "/ˈsen.tɪˌmiː.tər/", meaning: "xen-ti-mét (cm)", audioUrl: "", exampleEn: "The pencil is ten centimetres long.", exampleVi: "Chiếc bút chì dài mười xen-ti-mét." },
  { lesson: 21, word: "half", type: "noun", phonetic: "/hɑːf/", meaning: "một nửa", audioUrl: "", exampleEn: "Cut the apple in half.", exampleVi: "Hãy cắt quả táo làm một nửa." },
  { lesson: 21, word: "kilometre", type: "noun", phonetic: "/kɪˈlɒm.ɪ.tər/", meaning: "ki-lô-mét (km)", audioUrl: "", exampleEn: "We walked for three kilometres.", exampleVi: "Chúng tôi đã đi bộ ba ki-lô-mét." },
  { lesson: 21, word: "quarter", type: "noun", phonetic: "/ˈkwɔː.tər/", meaning: "một phần tư, 15 phút", audioUrl: "", exampleEn: "It is a quarter past three.", exampleVi: "Bây giờ là ba giờ mười lăm phút." },
  { lesson: 21, word: "thousand", type: "number", phonetic: "/ˈθaʊ.zənd/", meaning: "một nghìn", audioUrl: "", exampleEn: "There are a thousand people here.", exampleVi: "Có một nghìn người ở đây." },
  { lesson: 21, word: "zero", type: "number", phonetic: "/ˈzɪə.rəʊ/", meaning: "số không", audioUrl: "", exampleEn: "It is zero degrees outside.", exampleVi: "Bên ngoài trời đang là không độ." },
  { lesson: 21, word: "million", type: "number", phonetic: "/ˈmɪl.jən/", meaning: "một triệu", audioUrl: "", exampleEn: "The city has one million people.", exampleVi: "Thành phố này có một triệu người." },
  { lesson: 21, word: "metre", type: "noun", phonetic: "/ˈmiː.tər/", meaning: "mét (m)", audioUrl: "", exampleEn: "The pool is fifty metres long.", exampleVi: "Hồ bơi này dài năm mươi mét." },
  { lesson: 21, word: "empty", type: "adjective", phonetic: "/ˈemp.ti/", meaning: "trống rỗng", audioUrl: "", exampleEn: "The glass is empty.", exampleVi: "Cái cốc thì trống không." },
  { lesson: 21, word: "full", type: "adjective", phonetic: "/fʊl/", meaning: "đầy", audioUrl: "", exampleEn: "The basket is full of apples.", exampleVi: "Chiếc giỏ đầy ắp những quả táo." },
  { lesson: 21, word: "heavy", type: "adjective", phonetic: "/ˈhev.i/", meaning: "nặng", audioUrl: "", exampleEn: "This box is too heavy for me.", exampleVi: "Chiếc hộp này quá nặng đối với tôi." },
  { lesson: 21, word: "light", type: "adjective", phonetic: "/laɪt/", meaning: "nhẹ", audioUrl: "", exampleEn: "A feather is very light.", exampleVi: "Một chiếc lông vũ thì rất nhẹ." },
  { lesson: 21, word: "bit", type: "noun", phonetic: "/bɪt/", meaning: "một chút, một ít", audioUrl: "", exampleEn: "I need a little bit of sugar.", exampleVi: "Tôi cần một chút xíu đường." },
  { lesson: 21, word: "piece", type: "noun", phonetic: "/piːs/", meaning: "mẩu, miếng", audioUrl: "", exampleEn: "Can I have a piece of cake?", exampleVi: "Tôi có thể ăn một miếng bánh được không?" },
  { lesson: 21, word: "slice", type: "noun", phonetic: "/slaɪs/", meaning: "lát (mỏng)", audioUrl: "", exampleEn: "Would you like a slice of bread?", exampleVi: "Bạn có muốn một lát bánh mì không?" },
  { lesson: 21, word: "double", type: "adjective", phonetic: "/ˈdʌb.əl/", meaning: "gấp đôi", audioUrl: "", exampleEn: "I want a double cheeseburger.", exampleVi: "Tôi muốn một chiếc bánh kẹp phô mai cỡ đôi." },
  { lesson: 21, word: "pair", type: "noun", phonetic: "/peər/", meaning: "đôi, cặp", audioUrl: "", exampleEn: "She bought a new pair of shoes.", exampleVi: "Cô ấy đã mua một đôi giày mới." },
  { lesson: 21, word: "few", type: "adjective", phonetic: "/fjuː/", meaning: "một vài", audioUrl: "", exampleEn: "I have a few friends in this city.", exampleVi: "Tôi có một vài người bạn ở thành phố này." },
  { lesson: 21, word: "little", type: "adjective", phonetic: "/ˈlɪt.əl/", meaning: "một ít, nhỏ", audioUrl: "", exampleEn: "There is a little milk in the fridge.", exampleVi: "Có một ít sữa ở trong tủ lạnh." },
  { lesson: 21, word: "amount", type: "noun", phonetic: "/əˈmaʊnt/", meaning: "số lượng", audioUrl: "", exampleEn: "He has a large amount of money.", exampleVi: "Anh ấy có một số lượng tiền lớn." },

  // BÀI 22: Health and Illness (Sức khỏe và Bệnh tật)
  { lesson: 22, word: "bandage", type: "noun", phonetic: "/ˈbæn.dɪdʒ/", meaning: "băng gạc", audioUrl: "", exampleEn: "The nurse put a bandage on my arm.", exampleVi: "Y tá đã quấn một miếng băng gạc lên tay tôi." },
  { lesson: 22, word: "chemist", type: "noun", phonetic: "/ˈkem.ɪst/", meaning: "dược sĩ, tiệm thuốc", audioUrl: "", exampleEn: "Go to the chemist to buy some medicine.", exampleVi: "Hãy đến tiệm thuốc để mua một ít thuốc." },
  { lesson: 22, word: "cut", type: "noun", phonetic: "/kʌt/", meaning: "vết cắt", audioUrl: "", exampleEn: "I have a small cut on my finger.", exampleVi: "Tôi có một vết cắt nhỏ trên ngón tay." },
  { lesson: 22, word: "fall", type: "verb", phonetic: "/fɔːl/", meaning: "ngã, rơi", audioUrl: "", exampleEn: "Be careful not to fall down the stairs.", exampleVi: "Hãy cẩn thận đừng để ngã xuống cầu thang." },
  { lesson: 22, word: "medicine", type: "noun", phonetic: "/ˈmed.ɪ.sən/", meaning: "thuốc", audioUrl: "", exampleEn: "You need to take this medicine.", exampleVi: "Bạn cần phải uống loại thuốc này." },
  { lesson: 22, word: "ambulance", type: "noun", phonetic: "/ˈæm.bjə.ləns/", meaning: "xe cứu thương", audioUrl: "", exampleEn: "Call an ambulance quickly!", exampleVi: "Hãy gọi xe cứu thương nhanh lên!" },
  { lesson: 22, word: "dentist", type: "noun", phonetic: "/ˈden.tɪst/", meaning: "nha sĩ", audioUrl: "", exampleEn: "I need to see the dentist for my tooth.", exampleVi: "Tôi cần đến gặp nha sĩ vì cái răng của tôi." },
  { lesson: 22, word: "hospital", type: "noun", phonetic: "/ˈhɒs.pɪ.təl/", meaning: "bệnh viện", audioUrl: "", exampleEn: "She works as a doctor in the hospital.", exampleVi: "Cô ấy làm bác sĩ trong bệnh viện." },
  { lesson: 22, word: "nurse", type: "noun", phonetic: "/nɜːs/", meaning: "y tá", audioUrl: "", exampleEn: "The nurse is very kind.", exampleVi: "Cô y tá rất tốt bụng." },
  { lesson: 22, word: "doctor", type: "noun", phonetic: "/ˈdɒk.tər/", meaning: "bác sĩ", audioUrl: "", exampleEn: "The doctor will see you now.", exampleVi: "Bác sĩ sẽ khám cho bạn bây giờ." },
  { lesson: 22, word: "sick", type: "adjective", phonetic: "/sɪk/", meaning: "ốm, bệnh", audioUrl: "", exampleEn: "I feel sick today.", exampleVi: "Hôm nay tôi cảm thấy bị ốm." },
  { lesson: 22, word: "ill", type: "adjective", phonetic: "/ɪl/", meaning: "ốm, bệnh", audioUrl: "", exampleEn: "He was ill and couldn't go to school.", exampleVi: "Cậu ấy đã bị ốm và không thể đi học." },
  { lesson: 22, word: "healthy", type: "adjective", phonetic: "/ˈhel.θi/", meaning: "khỏe mạnh", audioUrl: "", exampleEn: "Eating fruit keeps you healthy.", exampleVi: "Ăn trái cây giúp bạn luôn khỏe mạnh." },
  { lesson: 22, word: "well", type: "adjective", phonetic: "/wel/", meaning: "khỏe mạnh, tốt", audioUrl: "", exampleEn: "I am not feeling well.", exampleVi: "Tôi đang cảm thấy không được khỏe." },
  { lesson: 22, word: "better", type: "adjective", phonetic: "/ˈbet.ər/", meaning: "tốt hơn, khỏe hơn", audioUrl: "", exampleEn: "I feel much better today.", exampleVi: "Hôm nay tôi cảm thấy khỏe hơn nhiều." },
  { lesson: 22, word: "worse", type: "adjective", phonetic: "/wɜːs/", meaning: "tệ hơn, đau hơn", audioUrl: "", exampleEn: "His cough is getting worse.", exampleVi: "Cơn ho của anh ấy đang trở nên tệ hơn." },
  { lesson: 22, word: "hurt", type: "verb", phonetic: "/hɜːt/", meaning: "bị thương, làm đau", audioUrl: "", exampleEn: "I hurt my leg while playing football.", exampleVi: "Tôi đã làm đau chân mình khi đang chơi bóng đá." },
  { lesson: 22, word: "pain", type: "noun", phonetic: "/peɪn/", meaning: "sự đau đớn", audioUrl: "", exampleEn: "He has a sharp pain in his back.", exampleVi: "Ông ấy có một cơn đau nhói ở lưng." },
  { lesson: 22, word: "problem", type: "noun", phonetic: "/ˈprɒb.ləm/", meaning: "vấn đề", audioUrl: "", exampleEn: "What is the problem with your stomach?", exampleVi: "Có vấn đề gì với dạ dày của bạn vậy?" },
  { lesson: 22, word: "matter", type: "noun", phonetic: "/ˈmæt.ər/", meaning: "vấn đề, chuyện gì", audioUrl: "", exampleEn: "What's the matter? Are you okay?", exampleVi: "Có chuyện gì vậy? Bạn có ổn không?" },

  // BÀI 23: Action Verbs 1 (Động từ chỉ hành động 1)
  { lesson: 23, word: "appear", type: "verb", phonetic: "/əˈpɪər/", meaning: "xuất hiện", audioUrl: "", exampleEn: "A rainbow appeared in the sky.", exampleVi: "Một cầu vồng đã xuất hiện trên bầu trời." },
  { lesson: 23, word: "believe", type: "verb", phonetic: "/bɪˈliːv/", meaning: "tin tưởng", audioUrl: "", exampleEn: "I believe you can do it.", exampleVi: "Tôi tin rằng bạn có thể làm được." },
  { lesson: 23, word: "decide", type: "verb", phonetic: "/dɪˈsaɪd/", meaning: "quyết định", audioUrl: "", exampleEn: "We decided to go to the park.", exampleVi: "Chúng tôi đã quyết định đi đến công viên." },
  { lesson: 23, word: "describe", type: "verb", phonetic: "/dɪˈskraɪb/", meaning: "miêu tả", audioUrl: "", exampleEn: "Can you describe the lost dog?", exampleVi: "Bạn có thể miêu tả con chó bị lạc không?" },
  { lesson: 23, word: "disappear", type: "verb", phonetic: "/ˌdɪs.əˈpɪər/", meaning: "biến mất", audioUrl: "", exampleEn: "The rabbit disappeared into the hole.", exampleVi: "Con thỏ đã biến mất vào trong cái hang." },
  { lesson: 23, word: "guess", type: "verb", phonetic: "/ɡes/", meaning: "đoán", audioUrl: "", exampleEn: "Can you guess my age?", exampleVi: "Bạn có thể đoán tuổi của tôi không?" },
  { lesson: 23, word: "happen", type: "verb", phonetic: "/ˈhæp.ən/", meaning: "xảy ra", audioUrl: "", exampleEn: "What happened to your car?", exampleVi: "Điều gì đã xảy ra với chiếc xe ô tô của bạn vậy?" },
  { lesson: 23, word: "hurry", type: "verb", phonetic: "/ˈhʌr.i/", meaning: "vội vã, nhanh lên", audioUrl: "", exampleEn: "We must hurry or we will be late.", exampleVi: "Chúng ta phải nhanh lên nếu không chúng ta sẽ bị trễ." },
  { lesson: 23, word: "improve", type: "verb", phonetic: "/ɪmˈpruːv/", meaning: "cải thiện, tiến bộ", audioUrl: "", exampleEn: "Her English is improving quickly.", exampleVi: "Tiếng Anh của cô ấy đang cải thiện một cách nhanh chóng." },
  { lesson: 23, word: "keep", type: "verb", phonetic: "/kiːp/", meaning: "giữ gìn", audioUrl: "", exampleEn: "Keep your room clean.", exampleVi: "Hãy giữ gìn phòng của bạn sạch sẽ." },
  { lesson: 23, word: "leave", type: "verb", phonetic: "/liːv/", meaning: "rời khỏi, để lại", audioUrl: "", exampleEn: "Don't leave your bag on the floor.", exampleVi: "Đừng để lại túi của bạn ở trên sàn nhà." },
  { lesson: 23, word: "mean", type: "verb", phonetic: "/miːn/", meaning: "có nghĩa là", audioUrl: "", exampleEn: "What does this word mean?", exampleVi: "Từ này có nghĩa là gì?" },
  { lesson: 23, word: "need", type: "verb", phonetic: "/niːd/", meaning: "cần", audioUrl: "", exampleEn: "I need to drink some water.", exampleVi: "Tôi cần uống một ít nước." },
  { lesson: 23, word: "prefer", type: "verb", phonetic: "/prɪˈfɜːr/", meaning: "thích hơn", audioUrl: "", exampleEn: "I prefer cats to dogs.", exampleVi: "Tôi thích mèo hơn chó." },
  { lesson: 23, word: "prepare", type: "verb", phonetic: "/prɪˈpeər/", meaning: "chuẩn bị", audioUrl: "", exampleEn: "She is preparing dinner for us.", exampleVi: "Cô ấy đang chuẩn bị bữa tối cho chúng ta." },
  { lesson: 23, word: "promise", type: "verb", phonetic: "/ˈprɒm.ɪs/", meaning: "hứa", audioUrl: "", exampleEn: "I promise I will help you.", exampleVi: "Tôi hứa tôi sẽ giúp bạn." },
  { lesson: 23, word: "remember", type: "verb", phonetic: "/rɪˈmem.bər/", meaning: "nhớ", audioUrl: "", exampleEn: "Do you remember my name?", exampleVi: "Bạn có nhớ tên của tôi không?" },
  { lesson: 23, word: "repair", type: "verb", phonetic: "/rɪˈpeər/", meaning: "sửa chữa", audioUrl: "", exampleEn: "My dad can repair the broken toy.", exampleVi: "Bố tôi có thể sửa chiếc đồ chơi bị hỏng." },
  { lesson: 23, word: "return", type: "verb", phonetic: "/rɪˈtɜːn/", meaning: "trở lại, trả lại", audioUrl: "", exampleEn: "I will return the book to the library.", exampleVi: "Tôi sẽ trả lại cuốn sách cho thư viện." },
  { lesson: 23, word: "sound", type: "verb", phonetic: "/saʊnd/", meaning: "nghe có vẻ", audioUrl: "", exampleEn: "That sounds like a great idea!", exampleVi: "Nghe có vẻ là một ý tưởng tuyệt vời!" },

  // BÀI 24: Action Verbs 2 (Động từ chỉ hành động 2)
  { lesson: 24, word: "speak", type: "verb", phonetic: "/spiːk/", meaning: "nói", audioUrl: "", exampleEn: "He can speak English very well.", exampleVi: "Anh ấy có thể nói tiếng Anh rất tốt." },
  { lesson: 24, word: "spend", type: "verb", phonetic: "/spend/", meaning: "dành (thời gian, tiền bạc)", audioUrl: "", exampleEn: "I spend an hour reading books every day.", exampleVi: "Tôi dành một giờ đồng hồ để đọc sách mỗi ngày." },
  { lesson: 24, word: "stamp", type: "verb", phonetic: "/stæmp/", meaning: "giậm chân", audioUrl: "", exampleEn: "He stamped his feet in anger.", exampleVi: "Cậu ấy giậm chân trong sự tức giận." },
  { lesson: 24, word: "steal", type: "verb", phonetic: "/stiːl/", meaning: "ăn trộm", audioUrl: "", exampleEn: "The thief tried to steal the diamond.", exampleVi: "Tên trộm đã cố gắng ăn trộm viên kim cương." },
  { lesson: 24, word: "study", type: "verb", phonetic: "/ˈstʌd.i/", meaning: "học tập", audioUrl: "", exampleEn: "I study hard for my exams.", exampleVi: "Tôi học tập chăm chỉ cho các kỳ thi của mình." },
  { lesson: 24, word: "taste", type: "verb", phonetic: "/teɪst/", meaning: "nếm", audioUrl: "", exampleEn: "Taste this soup, it is delicious.", exampleVi: "Hãy nếm thử món súp này, nó rất ngon." },
  { lesson: 24, word: "teach", type: "verb", phonetic: "/tiːtʃ/", meaning: "dạy", audioUrl: "", exampleEn: "My mother teaches math at a school.", exampleVi: "Mẹ tôi dạy toán ở một trường học." },
  { lesson: 24, word: "tell", type: "verb", phonetic: "/tel/", meaning: "kể, bảo", audioUrl: "", exampleEn: "Tell me a bedtime story.", exampleVi: "Hãy kể cho tớ nghe một câu chuyện trước khi đi ngủ." },
  { lesson: 24, word: "think", type: "verb", phonetic: "/θɪŋk/", meaning: "nghĩ", audioUrl: "", exampleEn: "What do you think about this picture?", exampleVi: "Bạn nghĩ gì về bức tranh này?" },
  { lesson: 24, word: "throw", type: "verb", phonetic: "/θrəʊ/", meaning: "ném", audioUrl: "", exampleEn: "Throw the ball to me!", exampleVi: "Hãy ném quả bóng cho tớ!" },
  { lesson: 24, word: "touch", type: "verb", phonetic: "/tʌtʃ/", meaning: "chạm vào", audioUrl: "", exampleEn: "Do not touch the wet paint.", exampleVi: "Đừng chạm vào chỗ sơn còn ướt." },
  { lesson: 24, word: "understand", type: "verb", phonetic: "/ˌʌn.dəˈstænd/", meaning: "hiểu", audioUrl: "", exampleEn: "I understand the lesson now.", exampleVi: "Bây giờ tôi đã hiểu bài học." },
  { lesson: 24, word: "use", type: "verb", phonetic: "/juːz/", meaning: "sử dụng", audioUrl: "", exampleEn: "You can use my pen.", exampleVi: "Bạn có thể sử dụng bút của tôi." },
  { lesson: 24, word: "visit", type: "verb", phonetic: "/ˈvɪz.ɪt/", meaning: "thăm, ghé thăm", audioUrl: "", exampleEn: "We visit our grandparents on Sundays.", exampleVi: "Chúng tôi đến thăm ông bà vào các ngày Chủ nhật." },
  { lesson: 24, word: "wait", type: "verb", phonetic: "/weɪt/", meaning: "chờ đợi", audioUrl: "", exampleEn: "Please wait for me here.", exampleVi: "Làm ơn hãy đợi tôi ở đây." },
  { lesson: 24, word: "wake", type: "verb", phonetic: "/weɪk/", meaning: "đánh thức, thức dậy", audioUrl: "", exampleEn: "Wake up, it's morning!", exampleVi: "Thức dậy đi, trời sáng rồi!" },
  { lesson: 24, word: "want", type: "verb", phonetic: "/wɒnt/", meaning: "muốn", audioUrl: "", exampleEn: "I want to eat pizza.", exampleVi: "Tôi muốn ăn bánh pizza." },
  { lesson: 24, word: "wash", type: "verb", phonetic: "/wɒʃ/", meaning: "rửa, giặt", audioUrl: "", exampleEn: "Wash your hands before eating.", exampleVi: "Hãy rửa tay trước khi ăn." },
  { lesson: 24, word: "watch", type: "verb", phonetic: "/wɒtʃ/", meaning: "xem", audioUrl: "", exampleEn: "Let's watch a movie tonight.", exampleVi: "Hãy cùng xem một bộ phim tối nay nhé." },
  { lesson: 24, word: "whisper", type: "verb", phonetic: "/ˈwɪs.pər/", meaning: "thì thầm", audioUrl: "", exampleEn: "She whispered a secret in my ear.", exampleVi: "Cô ấy đã thì thầm một bí mật vào tai tôi." },

  // BÀI 25: Adjectives and Adverbs (Tính từ và Trạng từ)
  { lesson: 25, word: "excellent", type: "adjective", phonetic: "/ˈek.səl.ənt/", meaning: "xuất sắc", audioUrl: "", exampleEn: "You did an excellent job on your test.", exampleVi: "Bạn đã làm một bài kiểm tra vô cùng xuất sắc." },
  { lesson: 25, word: "exciting", type: "adjective", phonetic: "/ɪkˈsaɪ.tɪŋ/", meaning: "thú vị, hào hứng", audioUrl: "", exampleEn: "Riding a roller coaster is exciting.", exampleVi: "Việc đi tàu lượn siêu tốc thì rất hào hứng." },
  { lesson: 25, word: "expensive", type: "adjective", phonetic: "/ɪkˈspen.sɪv/", meaning: "đắt tiền", audioUrl: "", exampleEn: "That sports car is very expensive.", exampleVi: "Chiếc xe thể thao đó thì rất đắt tiền." },
  { lesson: 25, word: "friendly", type: "adjective", phonetic: "/ˈfrend.li/", meaning: "thân thiện", audioUrl: "", exampleEn: "Our new neighbors are very friendly.", exampleVi: "Những người hàng xóm mới của chúng tôi rất thân thiện." },
  { lesson: 25, word: "frightened", type: "adjective", phonetic: "/ˈfraɪ.tənd/", meaning: "sợ hãi", audioUrl: "", exampleEn: "The little boy is frightened of the dark.", exampleVi: "Cậu bé rất sợ bóng tối." },
  { lesson: 25, word: "frightening", type: "adjective", phonetic: "/ˈfraɪ.tən.ɪŋ/", meaning: "đáng sợ", audioUrl: "", exampleEn: "It was a frightening storm.", exampleVi: "Đó là một cơn bão đáng sợ." },
  { lesson: 25, word: "full", type: "adjective", phonetic: "/fʊl/", meaning: "no, đầy", audioUrl: "", exampleEn: "I can't eat anymore, I am full.", exampleVi: "Tôi không thể ăn thêm nữa, tôi đã no rồi." },
  { lesson: 25, word: "important", type: "adjective", phonetic: "/ɪmˈpɔː.tənt/", meaning: "quan trọng", audioUrl: "", exampleEn: "It is important to brush your teeth.", exampleVi: "Việc đánh răng là rất quan trọng." },
  { lesson: 25, word: "interested", type: "adjective", phonetic: "/ˈɪn.trə.stɪd/", meaning: "quan tâm, thích thú", audioUrl: "", exampleEn: "I am interested in learning history.", exampleVi: "Tôi cảm thấy thích thú với việc học lịch sử." },
  { lesson: 25, word: "interesting", type: "adjective", phonetic: "/ˈɪn.trə.stɪŋ/", meaning: "thú vị", audioUrl: "", exampleEn: "This book is very interesting.", exampleVi: "Cuốn sách này thì rất thú vị." },
  { lesson: 25, word: "lazy", type: "adjective", phonetic: "/ˈleɪ.zi/", meaning: "lười biếng", audioUrl: "", exampleEn: "The lazy cat sleeps all day.", exampleVi: "Con mèo lười biếng ngủ cả ngày." },
  { lesson: 25, word: "loud", type: "adjective", phonetic: "/laʊd/", meaning: "ồn ào, lớn (âm thanh)", audioUrl: "", exampleEn: "The music is too loud.", exampleVi: "Âm nhạc này quá ồn ào." },
  { lesson: 25, word: "low", type: "adjective", phonetic: "/ləʊ/", meaning: "thấp", audioUrl: "", exampleEn: "The plane is flying very low.", exampleVi: "Chiếc máy bay đang bay rất thấp." },
  { lesson: 25, word: "noisy", type: "adjective", phonetic: "/ˈnɔɪ.zi/", meaning: "ồn ào", audioUrl: "", exampleEn: "The classroom is very noisy today.", exampleVi: "Lớp học hôm nay rất ồn ào." },
  { lesson: 25, word: "poor", type: "adjective", phonetic: "/pɔːr/", meaning: "nghèo", audioUrl: "", exampleEn: "The poor man had no money.", exampleVi: "Người đàn ông nghèo khổ không có đồng tiền nào." },
  { lesson: 25, word: "rich", type: "adjective", phonetic: "/rɪtʃ/", meaning: "giàu có", audioUrl: "", exampleEn: "The rich king lived in a castle.", exampleVi: "Vị vua giàu có sống trong một tòa lâu đài." },
  { lesson: 25, word: "sure", type: "adjective", phonetic: "/ʃɔːr/", meaning: "chắc chắn", audioUrl: "", exampleEn: "Are you sure this is the right way?", exampleVi: "Bạn có chắc đây là đường đi đúng không?" },
  { lesson: 25, word: "strange", type: "adjective", phonetic: "/streɪndʒ/", meaning: "kỳ lạ", audioUrl: "", exampleEn: "I heard a strange noise in the garden.", exampleVi: "Tôi đã nghe thấy một âm thanh kỳ lạ trong vườn." },
  { lesson: 25, word: "unusual", type: "adjective", phonetic: "/ʌnˈjuː.ʒu.əl/", meaning: "bất thường, không bình thường", audioUrl: "", exampleEn: "It is unusual to see snow in summer.", exampleVi: "Việc nhìn thấy tuyết vào mùa hè thì rất bất thường." },
  { lesson: 25, word: "usual", type: "adjective", phonetic: "/ˈjuː.ʒu.əl/", meaning: "thường lệ, bình thường", audioUrl: "", exampleEn: "I woke up at my usual time.", exampleVi: "Tôi đã thức dậy vào giờ như thường lệ." }
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
  const vocabLesson = program.lessons.find(l => l.orderIndex === 9999);
  if (!vocabLesson) {
    console.error('❌ Không tìm thấy bài học Kho từ vựng Flyers (orderIndex = 9999)!');
    return;
  }

  let successCount = 0;
  for (const item of VOCAB_DATA) {
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!targetLesson) {
      console.error(`❌ Không tìm thấy Lesson ${item.lesson} cho từ "${item.word}"`);
      continue;
    }

    const contentJson = JSON.stringify({
      word: item.word,
      type: item.type,
      pronunciation: item.phonetic,
      meaning: item.meaning,
      audio_url: item.audioUrl || '',
      example_en: item.exampleEn,
      example_vi: item.exampleVi
    });

    // 1. Thêm/Cập nhật vào kho từ vựng tổng
    const existingInTotal = await prisma.lessonContent.findFirst({
      where: {
        lessonId: vocabLesson.id,
        contentType: 'THEORY',
        content: { contains: `"word":"${item.word}"` }
      }
    });

    if (!existingInTotal) {
      await prisma.lessonContent.create({
        data: { lessonId: vocabLesson.id, contentType: 'THEORY', content: contentJson }
      });
    } else {
      await prisma.lessonContent.update({
        where: { id: existingInTotal.id },
        data: { content: contentJson }
      });
    }

    // 2. Thêm/Cập nhật vào bài học cụ thể
    const existingInLesson = await prisma.lessonContent.findFirst({
      where: {
        lessonId: targetLesson.id,
        contentType: 'THEORY',
        content: { contains: `"word":"${item.word}"` }
      }
    });

    if (!existingInLesson) {
      await prisma.lessonContent.create({
        data: { lessonId: targetLesson.id, contentType: 'THEORY', content: contentJson }
      });
      successCount++;
      console.log(`✅ Đã thêm từ: ${item.word} (Bài ${item.lesson})`);
    } else {
      await prisma.lessonContent.update({
        where: { id: existingInLesson.id },
        data: { content: contentJson }
      });
      successCount++;
      console.log(`🔄 Đã cập nhật từ: ${item.word} (Bài ${item.lesson})`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp/cập nhật ${successCount} từ vựng Batch 5 cho Flyers!`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

/**
 * SEED SCRIPT: PET Vocabulary — Batch 2 (Bài 6 - 10)
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 6: Food, Drink & Restaurants
  { lesson: 6, word: "recipe", type: "noun", phonetic: "/ˈres.ɪ.pi/", meaning: "công thức nấu ăn", audioUrl: "", exampleEn: "I need a recipe for chocolate cake.", exampleVi: "Tôi cần công thức làm bánh sô-cô-la." },
  { lesson: 6, word: "ingredients", type: "noun", phonetic: "/ɪnˈɡriː.di.ənts/", meaning: "nguyên liệu", audioUrl: "", exampleEn: "Mix all the ingredients together.", exampleVi: "Trộn tất cả các nguyên liệu lại với nhau." },
  { lesson: 6, word: "menu", type: "noun", phonetic: "/ˈmen.juː/", meaning: "thực đơn", audioUrl: "", exampleEn: "Can I see the menu, please?", exampleVi: "Tôi có thể xem thực đơn được không?" },
  { lesson: 6, word: "waiter", type: "noun", phonetic: "/ˈweɪ.tər/", meaning: "bồi bàn nam", audioUrl: "", exampleEn: "The waiter brought our drinks.", exampleVi: "Người phục vụ mang đồ uống của chúng tôi ra." },
  { lesson: 6, word: "delicious", type: "adjective", phonetic: "/dɪˈlɪʃ.əs/", meaning: "ngon miệng", audioUrl: "", exampleEn: "This soup is very delicious.", exampleVi: "Món súp này rất ngon." },
  { lesson: 6, word: "spicy", type: "adjective", phonetic: "/ˈspaɪ.si/", meaning: "cay", audioUrl: "", exampleEn: "I don't like spicy food.", exampleVi: "Tôi không thích đồ ăn cay." },
  { lesson: 6, word: "vegetarian", type: "noun", phonetic: "/ˌvedʒ.ɪˈteə.ri.ən/", meaning: "người ăn chay", audioUrl: "", exampleEn: "She is a vegetarian.", exampleVi: "Cô ấy là người ăn chay." },
  { lesson: 6, word: "dessert", type: "noun", phonetic: "/dɪˈzɜːt/", meaning: "món tráng miệng", audioUrl: "", exampleEn: "What is for dessert?", exampleVi: "Món tráng miệng có gì?" },
  { lesson: 6, word: "beverage", type: "noun", phonetic: "/ˈbev.ər.ɪdʒ/", meaning: "đồ uống", audioUrl: "", exampleEn: "Hot beverages include tea and coffee.", exampleVi: "Đồ uống nóng bao gồm trà và cà phê." },
  { lesson: 6, word: "bill", type: "noun", phonetic: "/bɪl/", meaning: "hóa đơn", audioUrl: "", exampleEn: "Could we have the bill, please?", exampleVi: "Cho chúng tôi xin hóa đơn nhé?" },
  { lesson: 6, word: "tip", type: "noun", phonetic: "/tɪp/", meaning: "tiền boa", audioUrl: "", exampleEn: "We left a generous tip.", exampleVi: "Chúng tôi đã để lại một khoản tiền boa hậu hĩnh." },
  { lesson: 6, word: "bake", type: "verb", phonetic: "/beɪk/", meaning: "nướng bánh", audioUrl: "", exampleEn: "I am going to bake a cake.", exampleVi: "Tôi dự định sẽ nướng một cái bánh." },
  { lesson: 6, word: "boil", type: "verb", phonetic: "/bɔɪl/", meaning: "luộc, đun sôi", audioUrl: "", exampleEn: "Boil the water first.", exampleVi: "Hãy đun sôi nước trước." },
  { lesson: 6, word: "fry", type: "verb", phonetic: "/fraɪ/", meaning: "chiên, rán", audioUrl: "", exampleEn: "Fry the eggs in a pan.", exampleVi: "Chiên trứng trong chảo." },
  { lesson: 6, word: "roast", type: "verb", phonetic: "/rəʊst/", meaning: "quay, nướng (thịt)", audioUrl: "", exampleEn: "We are having roast chicken for dinner.", exampleVi: "Chúng ta sẽ ăn gà quay cho bữa tối." },
  { lesson: 6, word: "raw", type: "adjective", phonetic: "/rɔː/", meaning: "sống (chưa nấu chín)", audioUrl: "", exampleEn: "Sushi is made with raw fish.", exampleVi: "Sushi được làm từ cá sống." },
  { lesson: 6, word: "fresh", type: "adjective", phonetic: "/freʃ/", meaning: "tươi", audioUrl: "", exampleEn: "These vegetables are very fresh.", exampleVi: "Những loại rau này rất tươi." },
  { lesson: 6, word: "sour", type: "adjective", phonetic: "/saʊər/", meaning: "chua", audioUrl: "", exampleEn: "Lemons are sour.", exampleVi: "Chanh thì chua." },
  { lesson: 6, word: "bitter", type: "adjective", phonetic: "/ˈbɪt.ər/", meaning: "đắng", audioUrl: "", exampleEn: "Black coffee is often bitter.", exampleVi: "Cà phê đen thường đắng." },
  { lesson: 6, word: "sweet", type: "adjective", phonetic: "/swiːt/", meaning: "ngọt", audioUrl: "", exampleEn: "This tea is too sweet.", exampleVi: "Trà này quá ngọt." },

  // BÀI 7: Traditions & Festivals
  { lesson: 7, word: "tradition", type: "noun", phonetic: "/trəˈdɪʃ.ən/", meaning: "truyền thống", audioUrl: "", exampleEn: "It is a tradition to give gifts at Christmas.", exampleVi: "Tặng quà vào dịp Giáng sinh là một truyền thống." },
  { lesson: 7, word: "festival", type: "noun", phonetic: "/ˈfes.tɪ.vəl/", meaning: "lễ hội", audioUrl: "", exampleEn: "The music festival is held every summer.", exampleVi: "Lễ hội âm nhạc được tổ chức vào mỗi mùa hè." },
  { lesson: 7, word: "celebrate", type: "verb", phonetic: "/ˈsel.ə.breɪt/", meaning: "ăn mừng", audioUrl: "", exampleEn: "How do you celebrate your birthday?", exampleVi: "Bạn tổ chức sinh nhật như thế nào?" },
  { lesson: 7, word: "custom", type: "noun", phonetic: "/ˈkʌs.təm/", meaning: "phong tục", audioUrl: "", exampleEn: "In my country, it's the custom to bow.", exampleVi: "Ở nước tôi, cúi chào là một phong tục." },
  { lesson: 7, word: "ceremony", type: "noun", phonetic: "/ˈser.ɪ.mə.ni/", meaning: "nghi lễ", audioUrl: "", exampleEn: "The wedding ceremony was beautiful.", exampleVi: "Buổi hôn lễ thật đẹp." },
  { lesson: 7, word: "culture", type: "noun", phonetic: "/ˈkʌl.tʃər/", meaning: "văn hóa", audioUrl: "", exampleEn: "I love learning about different cultures.", exampleVi: "Tôi thích tìm hiểu về các nền văn hóa khác nhau." },
  { lesson: 7, word: "parade", type: "noun", phonetic: "/pəˈreɪd/", meaning: "cuộc diễu hành", audioUrl: "", exampleEn: "There was a long parade in the street.", exampleVi: "Có một cuộc diễu hành dài trên đường phố." },
  { lesson: 7, word: "fireworks", type: "noun", phonetic: "/ˈfaɪə.wɜːks/", meaning: "pháo hoa", audioUrl: "", exampleEn: "We watched the fireworks at midnight.", exampleVi: "Chúng tôi đã xem pháo hoa vào lúc nửa đêm." },
  { lesson: 7, word: "costume", type: "noun", phonetic: "/ˈkɒs.tʃuːm/", meaning: "trang phục", audioUrl: "", exampleEn: "He wore a ghost costume for Halloween.", exampleVi: "Cậu ấy đã mặc trang phục ma cho lễ Halloween." },
  { lesson: 7, word: "decoration", type: "noun", phonetic: "/ˌdek.əˈreɪ.ʃən/", meaning: "đồ trang trí", audioUrl: "", exampleEn: "The Christmas decorations look lovely.", exampleVi: "Những đồ trang trí Giáng sinh trông thật đáng yêu." },
  { lesson: 7, word: "envelope", type: "noun", phonetic: "/ˈen.və.ləʊp/", meaning: "phong bì", audioUrl: "", exampleEn: "Children receive red envelopes on Lunar New Year.", exampleVi: "Trẻ em nhận lì xì đỏ vào dịp Tết Nguyên Đán." },
  { lesson: 7, word: "lantern", type: "noun", phonetic: "/ˈlæn.tən/", meaning: "đèn lồng", audioUrl: "", exampleEn: "They hang red lanterns everywhere.", exampleVi: "Họ treo đèn lồng đỏ ở khắp nơi." },
  { lesson: 7, word: "gathering", type: "noun", phonetic: "/ˈɡæð.ər.ɪŋ/", meaning: "cuộc tụ họp", audioUrl: "", exampleEn: "It's a family gathering.", exampleVi: "Đó là một buổi tụ họp gia đình." },
  { lesson: 7, word: "religion", type: "noun", phonetic: "/rɪˈlɪdʒ.ən/", meaning: "tôn giáo", audioUrl: "", exampleEn: "Buddhism is a major religion in Asia.", exampleVi: "Phật giáo là một tôn giáo lớn ở Châu Á." },
  { lesson: 7, word: "belief", type: "noun", phonetic: "/bɪˈliːf/", meaning: "niềm tin", audioUrl: "", exampleEn: "He has a strong belief in God.", exampleVi: "Anh ấy có niềm tin mãnh liệt vào Chúa." },
  { lesson: 7, word: "pray", type: "verb", phonetic: "/preɪ/", meaning: "cầu nguyện", audioUrl: "", exampleEn: "They go to the temple to pray.", exampleVi: "Họ đến đền thờ để cầu nguyện." },
  { lesson: 7, word: "ancestor", type: "noun", phonetic: "/ˈæn.ses.tər/", meaning: "tổ tiên", audioUrl: "", exampleEn: "We must respect our ancestors.", exampleVi: "Chúng ta phải tôn trọng tổ tiên của mình." },
  { lesson: 7, word: "worship", type: "verb", phonetic: "/ˈwɜː.ʃɪp/", meaning: "thờ cúng", audioUrl: "", exampleEn: "People worship in a church or temple.", exampleVi: "Mọi người thờ cúng trong nhà thờ hoặc đền chùa." },
  { lesson: 7, word: "symbol", type: "noun", phonetic: "/ˈsɪm.bəl/", meaning: "biểu tượng", audioUrl: "", exampleEn: "The dove is a symbol of peace.", exampleVi: "Chim bồ câu là biểu tượng của hòa bình." },
  { lesson: 7, word: "event", type: "noun", phonetic: "/ɪˈvent/", meaning: "sự kiện", audioUrl: "", exampleEn: "The Olympics is a huge sporting event.", exampleVi: "Thế vận hội là một sự kiện thể thao lớn." },

  // BÀI 8: Education & Learning
  { lesson: 8, word: "education", type: "noun", phonetic: "/ˌedʒ.ʊˈkeɪ.ʃən/", meaning: "giáo dục", audioUrl: "", exampleEn: "Education is very important for children.", exampleVi: "Giáo dục rất quan trọng đối với trẻ em." },
  { lesson: 8, word: "university", type: "noun", phonetic: "/ˌjuː.nɪˈvɜː.sə.ti/", meaning: "trường đại học", audioUrl: "", exampleEn: "She studies at Cambridge University.", exampleVi: "Cô ấy học tại Đại học Cambridge." },
  { lesson: 8, word: "college", type: "noun", phonetic: "/ˈkɒl.ɪdʒ/", meaning: "trường cao đẳng", audioUrl: "", exampleEn: "He goes to the local college.", exampleVi: "Cậu ấy đi học ở trường cao đẳng địa phương." },
  { lesson: 8, word: "subject", type: "noun", phonetic: "/ˈsʌb.dʒekt/", meaning: "môn học", audioUrl: "", exampleEn: "Math is my favourite subject.", exampleVi: "Toán là môn học yêu thích của tôi." },
  { lesson: 8, word: "knowledge", type: "noun", phonetic: "/ˈnɒl.ɪdʒ/", meaning: "kiến thức", audioUrl: "", exampleEn: "Reading books increases your knowledge.", exampleVi: "Đọc sách giúp tăng cường kiến thức của bạn." },
  { lesson: 8, word: "assignment", type: "noun", phonetic: "/əˈsaɪn.mənt/", meaning: "bài tập (được giao)", audioUrl: "", exampleEn: "Have you finished your history assignment?", exampleVi: "Bạn đã làm xong bài tập lịch sử chưa?" },
  { lesson: 8, word: "homework", type: "noun", phonetic: "/ˈhəʊm.wɜːk/", meaning: "bài tập về nhà", audioUrl: "", exampleEn: "The teacher gave us a lot of homework.", exampleVi: "Giáo viên đã giao cho chúng tôi rất nhiều bài tập về nhà." },
  { lesson: 8, word: "degree", type: "noun", phonetic: "/dɪˈɡriː/", meaning: "bằng cấp", audioUrl: "", exampleEn: "She has a master's degree in science.", exampleVi: "Cô ấy có bằng thạc sĩ về khoa học." },
  { lesson: 8, word: "graduate", type: "verb", phonetic: "/ˈɡrædʒ.u.eɪt/", meaning: "tốt nghiệp", audioUrl: "", exampleEn: "He will graduate next year.", exampleVi: "Cậu ấy sẽ tốt nghiệp vào năm sau." },
  { lesson: 8, word: "exam", type: "noun", phonetic: "/ɪɡˈzæm/", meaning: "bài kiểm tra, kỳ thi", audioUrl: "", exampleEn: "I have an English exam tomorrow.", exampleVi: "Ngày mai tôi có một bài kiểm tra tiếng Anh." },
  { lesson: 8, word: "fail", type: "verb", phonetic: "/feɪl/", meaning: "trượt, thi hỏng", audioUrl: "", exampleEn: "If you don't study, you will fail.", exampleVi: "Nếu bạn không học, bạn sẽ thi trượt." },
  { lesson: 8, word: "pass", type: "verb", phonetic: "/pɑːs/", meaning: "thi đỗ, vượt qua", audioUrl: "", exampleEn: "She passed her driving test.", exampleVi: "Cô ấy đã vượt qua bài thi lái xe." },
  { lesson: 8, word: "mark", type: "noun", phonetic: "/mɑːk/", meaning: "điểm số", audioUrl: "", exampleEn: "I got a high mark in maths.", exampleVi: "Tôi đạt điểm cao môn toán." },
  { lesson: 8, word: "revise", type: "verb", phonetic: "/rɪˈvaɪz/", meaning: "ôn tập", audioUrl: "", exampleEn: "I need to revise for my biology exam.", exampleVi: "Tôi cần phải ôn tập cho kỳ thi sinh học." },
  { lesson: 8, word: "scholarship", type: "noun", phonetic: "/ˈskɒl.ə.ʃɪp/", meaning: "học bổng", audioUrl: "", exampleEn: "He won a scholarship to study abroad.", exampleVi: "Cậu ấy đã giành được học bổng để đi du học." },
  { lesson: 8, word: "lecture", type: "noun", phonetic: "/ˈlek.tʃər/", meaning: "bài giảng", audioUrl: "", exampleEn: "The professor gave a fascinating lecture.", exampleVi: "Giáo sư đã đưa ra một bài giảng hấp dẫn." },
  { lesson: 8, word: "term", type: "noun", phonetic: "/tɜːm/", meaning: "học kỳ", audioUrl: "", exampleEn: "The spring term starts in January.", exampleVi: "Học kỳ mùa xuân bắt đầu vào tháng một." },
  { lesson: 8, word: "uniform", type: "noun", phonetic: "/ˈjuː.nɪ.fɔːm/", meaning: "đồng phục", audioUrl: "", exampleEn: "Students must wear a uniform.", exampleVi: "Học sinh phải mặc đồng phục." },
  { lesson: 8, word: "pupil", type: "noun", phonetic: "/ˈpjuː.pəl/", meaning: "học sinh (nhỏ tuổi)", audioUrl: "", exampleEn: "The school has over 500 pupils.", exampleVi: "Trường có hơn 500 học sinh." },
  { lesson: 8, word: "curriculum", type: "noun", phonetic: "/kəˈrɪk.jə.ləm/", meaning: "chương trình học", audioUrl: "", exampleEn: "Coding is now part of the school curriculum.", exampleVi: "Lập trình hiện đã là một phần của chương trình học." },

  // BÀI 9: Relationships & Communication
  { lesson: 9, word: "relationship", type: "noun", phonetic: "/rɪˈleɪ.ʃən.ʃɪp/", meaning: "mối quan hệ", audioUrl: "", exampleEn: "They have a good relationship.", exampleVi: "Họ có một mối quan hệ tốt." },
  { lesson: 9, word: "friendship", type: "noun", phonetic: "/ˈfrend.ʃɪp/", meaning: "tình bạn", audioUrl: "", exampleEn: "Our friendship started in kindergarten.", exampleVi: "Tình bạn của chúng tôi bắt đầu từ trường mẫu giáo." },
  { lesson: 9, word: "colleague", type: "noun", phonetic: "/ˈkɒl.iːɡ/", meaning: "đồng nghiệp", audioUrl: "", exampleEn: "I went out for lunch with my colleagues.", exampleVi: "Tôi đã ra ngoài ăn trưa với đồng nghiệp." },
  { lesson: 9, word: "partner", type: "noun", phonetic: "/ˈpɑːt.nər/", meaning: "đối tác, người yêu", audioUrl: "", exampleEn: "She lives with her partner.", exampleVi: "Cô ấy sống cùng người yêu." },
  { lesson: 9, word: "stranger", type: "noun", phonetic: "/ˈstreɪn.dʒər/", meaning: "người lạ", audioUrl: "", exampleEn: "Don't talk to strangers.", exampleVi: "Đừng nói chuyện với người lạ." },
  { lesson: 9, word: "communicate", type: "verb", phonetic: "/kəˈmjuː.nɪ.keɪt/", meaning: "giao tiếp", audioUrl: "", exampleEn: "We communicate mostly by email.", exampleVi: "Chúng tôi giao tiếp chủ yếu qua email." },
  { lesson: 9, word: "argue", type: "verb", phonetic: "/ˈɑːɡ.juː/", meaning: "cãi nhau, tranh luận", audioUrl: "", exampleEn: "My parents often argue about money.", exampleVi: "Bố mẹ tôi thường cãi nhau về chuyện tiền bạc." },
  { lesson: 9, word: "discuss", type: "verb", phonetic: "/dɪˈskʌs/", meaning: "thảo luận", audioUrl: "", exampleEn: "We need to discuss this problem.", exampleVi: "Chúng ta cần thảo luận về vấn đề này." },
  { lesson: 9, word: "chat", type: "verb", phonetic: "/tʃæt/", meaning: "trò chuyện", audioUrl: "", exampleEn: "I was chatting with my friends online.", exampleVi: "Tôi đang trò chuyện với bạn bè trên mạng." },
  { lesson: 9, word: "contact", type: "verb", phonetic: "/ˈkɒn.tækt/", meaning: "liên lạc", audioUrl: "", exampleEn: "Please contact me if you need help.", exampleVi: "Vui lòng liên lạc với tôi nếu bạn cần giúp đỡ." },
  { lesson: 9, word: "introduce", type: "verb", phonetic: "/ˌɪn.trəˈdjuːs/", meaning: "giới thiệu", audioUrl: "", exampleEn: "Let me introduce you to my brother.", exampleVi: "Hãy để tôi giới thiệu bạn với anh trai tôi." },
  { lesson: 9, word: "invite", type: "verb", phonetic: "/ɪnˈvaɪt/", meaning: "mời", audioUrl: "", exampleEn: "They invited us to dinner.", exampleVi: "Họ đã mời chúng tôi đến ăn tối." },
  { lesson: 9, word: "support", type: "verb", phonetic: "/səˈpɔːt/", meaning: "hỗ trợ, ủng hộ", audioUrl: "", exampleEn: "My family always supports me.", exampleVi: "Gia đình tôi luôn ủng hộ tôi." },
  { lesson: 9, word: "trust", type: "verb", phonetic: "/trʌst/", meaning: "tin tưởng", audioUrl: "", exampleEn: "I trust him completely.", exampleVi: "Tôi hoàn toàn tin tưởng anh ấy." },
  { lesson: 9, word: "promise", type: "verb", phonetic: "/ˈprɒm.ɪs/", meaning: "hứa", audioUrl: "", exampleEn: "I promise I will not tell anyone.", exampleVi: "Tôi hứa sẽ không nói cho ai biết." },
  { lesson: 9, word: "apologise", type: "verb", phonetic: "/əˈpɒl.ə.dʒaɪz/", meaning: "xin lỗi", audioUrl: "", exampleEn: "I must apologise for being late.", exampleVi: "Tôi phải xin lỗi vì đã đến muộn." },
  { lesson: 9, word: "forgive", type: "verb", phonetic: "/fəˈɡɪv/", meaning: "tha thứ", audioUrl: "", exampleEn: "Please forgive me.", exampleVi: "Xin hãy tha thứ cho tôi." },
  { lesson: 9, word: "divorce", type: "noun", phonetic: "/dɪˈvɔːs/", meaning: "sự ly hôn", audioUrl: "", exampleEn: "They decided to get a divorce.", exampleVi: "Họ quyết định ly hôn." },
  { lesson: 9, word: "wedding", type: "noun", phonetic: "/ˈwed.ɪŋ/", meaning: "đám cưới", audioUrl: "", exampleEn: "We went to my cousin's wedding.", exampleVi: "Chúng tôi đã đi dự đám cưới của anh họ tôi." },
  { lesson: 9, word: "couple", type: "noun", phonetic: "/ˈkʌp.əl/", meaning: "cặp đôi", audioUrl: "", exampleEn: "They make a cute couple.", exampleVi: "Họ tạo thành một cặp đôi dễ thương." },

  // BÀI 10: Crime & Punishment
  { lesson: 10, word: "crime", type: "noun", phonetic: "/kraɪm/", meaning: "tội phạm, tội ác", audioUrl: "", exampleEn: "Stealing is a serious crime.", exampleVi: "Trộm cắp là một tội ác nghiêm trọng." },
  { lesson: 10, word: "criminal", type: "noun", phonetic: "/ˈkrɪm.ɪ.nəl/", meaning: "tên tội phạm", audioUrl: "", exampleEn: "The police caught the criminal.", exampleVi: "Cảnh sát đã bắt được tên tội phạm." },
  { lesson: 10, word: "police", type: "noun", phonetic: "/pəˈliːs/", meaning: "cảnh sát", audioUrl: "", exampleEn: "Call the police immediately!", exampleVi: "Hãy gọi cảnh sát ngay lập tức!" },
  { lesson: 10, word: "thief", type: "noun", phonetic: "/θiːf/", meaning: "kẻ trộm", audioUrl: "", exampleEn: "A thief stole my wallet.", exampleVi: "Một kẻ trộm đã lấy cắp ví của tôi." },
  { lesson: 10, word: "robber", type: "noun", phonetic: "/ˈrɒb.ər/", meaning: "kẻ cướp", audioUrl: "", exampleEn: "The bank robbers escaped in a car.", exampleVi: "Những tên cướp ngân hàng đã tẩu thoát trên một chiếc ô tô." },
  { lesson: 10, word: "murder", type: "noun", phonetic: "/ˈmɜː.dər/", meaning: "vụ án mạng, sát nhân", audioUrl: "", exampleEn: "He was charged with murder.", exampleVi: "Hắn bị buộc tội giết người." },
  { lesson: 10, word: "steal", type: "verb", phonetic: "/stiːl/", meaning: "lấy trộm", audioUrl: "", exampleEn: "Someone stole my bicycle.", exampleVi: "Ai đó đã lấy trộm xe đạp của tôi." },
  { lesson: 10, word: "rob", type: "verb", phonetic: "/rɒb/", meaning: "cướp", audioUrl: "", exampleEn: "They threatened to rob the bank.", exampleVi: "Họ đe dọa sẽ cướp ngân hàng." },
  { lesson: 10, word: "arrest", type: "verb", phonetic: "/əˈrest/", meaning: "bắt giữ", audioUrl: "", exampleEn: "The police arrested the suspect.", exampleVi: "Cảnh sát đã bắt giữ kẻ tình nghi." },
  { lesson: 10, word: "prison", type: "noun", phonetic: "/ˈprɪz.ən/", meaning: "nhà tù", audioUrl: "", exampleEn: "He spent ten years in prison.", exampleVi: "Ông ấy đã trải qua mười năm trong tù." },
  { lesson: 10, word: "jail", type: "noun", phonetic: "/dʒeɪl/", meaning: "nhà giam", audioUrl: "", exampleEn: "She was sent to jail.", exampleVi: "Cô ấy đã bị tống giam." },
  { lesson: 10, word: "court", type: "noun", phonetic: "/kɔːt/", meaning: "tòa án", audioUrl: "", exampleEn: "The case will go to court tomorrow.", exampleVi: "Vụ án sẽ được đưa ra tòa vào ngày mai." },
  { lesson: 10, word: "judge", type: "noun", phonetic: "/dʒʌdʒ/", meaning: "thẩm phán", audioUrl: "", exampleEn: "The judge sentenced him to life in prison.", exampleVi: "Thẩm phán đã kết án ông ta tù chung thân." },
  { lesson: 10, word: "lawyer", type: "noun", phonetic: "/ˈlɔɪ.ər/", meaning: "luật sư", audioUrl: "", exampleEn: "You should hire a good lawyer.", exampleVi: "Bạn nên thuê một luật sư giỏi." },
  { lesson: 10, word: "law", type: "noun", phonetic: "/lɔː/", meaning: "luật pháp", audioUrl: "", exampleEn: "It is against the law to text while driving.", exampleVi: "Nhắn tin khi đang lái xe là vi phạm pháp luật." },
  { lesson: 10, word: "punish", type: "verb", phonetic: "/ˈpʌn.ɪʃ/", meaning: "trừng phạt", audioUrl: "", exampleEn: "Criminals must be punished.", exampleVi: "Tội phạm phải bị trừng phạt." },
  { lesson: 10, word: "guilty", type: "adjective", phonetic: "/ˈɡɪl.ti/", meaning: "có tội", audioUrl: "", exampleEn: "The jury found him guilty.", exampleVi: "Bồi thẩm đoàn kết luận hắn có tội." },
  { lesson: 10, word: "innocent", type: "adjective", phonetic: "/ˈɪn.ə.sənt/", meaning: "vô tội", audioUrl: "", exampleEn: "I am innocent, I didn't do it.", exampleVi: "Tôi vô tội, tôi không làm việc đó." },
  { lesson: 10, word: "evidence", type: "noun", phonetic: "/ˈev.ɪ.dəns/", meaning: "bằng chứng", audioUrl: "", exampleEn: "There is no evidence against him.", exampleVi: "Không có bằng chứng nào chống lại hắn." },
  { lesson: 10, word: "victim", type: "noun", phonetic: "/ˈvɪk.tɪm/", meaning: "nạn nhân", audioUrl: "", exampleEn: "The police interviewed the victim.", exampleVi: "Cảnh sát đã thẩm vấn nạn nhân." }
];

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-pet' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program PET (en-pet)!');
    return;
  }
  
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

    const existing = await prisma.lessonContent.findFirst({
      where: {
        lessonId: targetLesson.id,
        contentType: 'THEORY',
        content: { contains: `"word":"${item.word}"` }
      }
    });

    if (!existing) {
      await prisma.lessonContent.create({
        data: { lessonId: targetLesson.id, contentType: 'THEORY', content: contentJson }
      });
      await prisma.lessonContent.create({
        data: { lessonId: vocabLesson.id, contentType: 'THEORY', content: contentJson }
      });
      successCount++;
      console.log(`✅ Đã thêm từ: ${item.word} (Bài ${item.lesson})`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp ${successCount} từ vựng Batch 2 cho PET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

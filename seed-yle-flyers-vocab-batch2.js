/**
 * SEED SCRIPT: YLE Flyers Vocabulary — Batch 2 (Bài 6 - 10)
 * Chạy từ thư mục gốc: node seed-yle-flyers-vocab-batch2.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 6: Food and Drink (Đồ ăn thức uống)
  { lesson: 6, word: "chopstick", type: "noun", phonetic: "/ˈtʃɒp.stɪk/", meaning: "đũa", audioUrl: "", exampleEn: "I can eat rice with chopsticks.", exampleVi: "Tôi có thể ăn cơm bằng đũa." },
  { lesson: 6, word: "meal", type: "noun", phonetic: "/mɪəl/", meaning: "bữa ăn", audioUrl: "", exampleEn: "Breakfast is the first meal of the day.", exampleVi: "Bữa sáng là bữa ăn đầu tiên trong ngày." },
  { lesson: 6, word: "piece", type: "noun", phonetic: "/piːs/", meaning: "miếng, mẩu", audioUrl: "", exampleEn: "Can I have a piece of cake?", exampleVi: "Cho tôi một miếng bánh ngọt nhé?" },
  { lesson: 6, word: "slice", type: "noun", phonetic: "/slaɪs/", meaning: "lát (mỏng)", audioUrl: "", exampleEn: "He ate a slice of pizza.", exampleVi: "Anh ấy đã ăn một lát bánh pizza." },
  { lesson: 6, word: "snack", type: "noun", phonetic: "/snæk/", meaning: "bữa ăn nhẹ", audioUrl: "", exampleEn: "I often have a snack in the afternoon.", exampleVi: "Tôi thường ăn nhẹ vào buổi chiều." },
  { lesson: 6, word: "taste", type: "verb", phonetic: "/teɪst/", meaning: "nếm, có vị", audioUrl: "", exampleEn: "This soup tastes delicious.", exampleVi: "Món súp này có vị rất ngon." },
  { lesson: 6, word: "jam", type: "noun", phonetic: "/dʒæm/", meaning: "mứt", audioUrl: "", exampleEn: "I like bread with strawberry jam.", exampleVi: "Tôi thích bánh mì với mứt dâu tây." },
  { lesson: 6, word: "biscuit", type: "noun", phonetic: "/ˈbɪs.kɪt/", meaning: "bánh quy", audioUrl: "", exampleEn: "She had a biscuit with her tea.", exampleVi: "Cô ấy đã ăn một chiếc bánh quy cùng với trà." },
  { lesson: 6, word: "cereal", type: "noun", phonetic: "/ˈsɪə.ri.əl/", meaning: "ngũ cốc", audioUrl: "", exampleEn: "I eat cereal for breakfast.", exampleVi: "Tôi ăn ngũ cốc vào bữa sáng." },
  { lesson: 6, word: "flour", type: "noun", phonetic: "/flaʊər/", meaning: "bột mì", audioUrl: "", exampleEn: "We need flour to make a cake.", exampleVi: "Chúng ta cần bột mì để làm một chiếc bánh ngọt." },
  { lesson: 6, word: "honey", type: "noun", phonetic: "/ˈhʌn.i/", meaning: "mật ong", audioUrl: "", exampleEn: "Bears love eating honey.", exampleVi: "Những con gấu rất thích ăn mật ong." },
  { lesson: 6, word: "pepper", type: "noun", phonetic: "/ˈpep.ər/", meaning: "hạt tiêu", audioUrl: "", exampleEn: "Don't put too much pepper in the soup.", exampleVi: "Đừng cho quá nhiều hạt tiêu vào súp." },
  { lesson: 6, word: "salt", type: "noun", phonetic: "/sɒlt/", meaning: "muối", audioUrl: "", exampleEn: "Pass me the salt, please.", exampleVi: "Làm ơn đưa cho tôi lọ muối." },
  { lesson: 6, word: "strawberry", type: "noun", phonetic: "/ˈstrɔː.bər.i/", meaning: "quả dâu tây", audioUrl: "", exampleEn: "She loves strawberry ice cream.", exampleVi: "Cô ấy rất thích kem dâu tây." },
  { lesson: 6, word: "yogurt", type: "noun", phonetic: "/ˈjɒɡ.ət/", meaning: "sữa chua", audioUrl: "", exampleEn: "Yogurt is good for your health.", exampleVi: "Sữa chua rất tốt cho sức khỏe của bạn." },
  { lesson: 6, word: "fork", type: "noun", phonetic: "/fɔːk/", meaning: "cái nĩa", audioUrl: "", exampleEn: "Use a fork to eat spaghetti.", exampleVi: "Hãy dùng nĩa để ăn mì Ý." },
  { lesson: 6, word: "knife", type: "noun", phonetic: "/naɪf/", meaning: "con dao", audioUrl: "", exampleEn: "Be careful with that sharp knife.", exampleVi: "Hãy cẩn thận với con dao sắc đó." },
  { lesson: 6, word: "spoon", type: "noun", phonetic: "/spuːn/", meaning: "cái thìa", audioUrl: "", exampleEn: "I eat soup with a spoon.", exampleVi: "Tôi ăn súp bằng một cái thìa." },
  { lesson: 6, word: "plate", type: "noun", phonetic: "/pleɪt/", meaning: "cái đĩa", audioUrl: "", exampleEn: "Put the food on the plate.", exampleVi: "Hãy đặt thức ăn lên đĩa." },
  { lesson: 6, word: "bowl", type: "noun", phonetic: "/bəʊl/", meaning: "cái bát", audioUrl: "", exampleEn: "I want a bowl of rice.", exampleVi: "Tôi muốn một bát cơm." },

  // BÀI 7: School (Trường học)
  { lesson: 7, word: "college", type: "noun", phonetic: "/ˈkɒl.ɪdʒ/", meaning: "trường cao đẳng", audioUrl: "", exampleEn: "My brother goes to college.", exampleVi: "Anh trai tôi đang học cao đẳng." },
  { lesson: 7, word: "university", type: "noun", phonetic: "/ˌjuː.nɪˈvɜː.sə.ti/", meaning: "trường đại học", audioUrl: "", exampleEn: "She wants to study at university.", exampleVi: "Cô ấy muốn học ở trường đại học." },
  { lesson: 7, word: "diary", type: "noun", phonetic: "/ˈdaɪə.ri/", meaning: "nhật ký", audioUrl: "", exampleEn: "I write in my diary every night.", exampleVi: "Tôi viết nhật ký vào mỗi buổi tối." },
  { lesson: 7, word: "dictionary", type: "noun", phonetic: "/ˈdɪk.ʃən.ər.i/", meaning: "từ điển", audioUrl: "", exampleEn: "Use a dictionary to find new words.", exampleVi: "Hãy dùng từ điển để tra từ mới." },
  { lesson: 7, word: "geography", type: "noun", phonetic: "/dʒiˈɒɡ.rə.fi/", meaning: "môn địa lý", audioUrl: "", exampleEn: "We learn about countries in geography.", exampleVi: "Chúng ta học về các quốc gia trong môn địa lý." },
  { lesson: 7, word: "history", type: "noun", phonetic: "/ˈhɪs.tər.i/", meaning: "môn lịch sử", audioUrl: "", exampleEn: "History is my favourite subject.", exampleVi: "Lịch sử là môn học yêu thích của tôi." },
  { lesson: 7, word: "language", type: "noun", phonetic: "/ˈlæŋ.ɡwɪdʒ/", meaning: "ngôn ngữ", audioUrl: "", exampleEn: "English is an international language.", exampleVi: "Tiếng Anh là một ngôn ngữ quốc tế." },
  { lesson: 7, word: "mathematics", type: "noun", phonetic: "/ˌmæθˈmæt.ɪks/", meaning: "môn toán", audioUrl: "", exampleEn: "Mathematics is difficult but fun.", exampleVi: "Môn toán rất khó nhưng thú vị." },
  { lesson: 7, word: "science", type: "noun", phonetic: "/ˈsaɪ.əns/", meaning: "môn khoa học", audioUrl: "", exampleEn: "We do experiments in science class.", exampleVi: "Chúng tôi làm thí nghiệm trong lớp khoa học." },
  { lesson: 7, word: "subject", type: "noun", phonetic: "/ˈsʌb.dʒekt/", meaning: "môn học", audioUrl: "", exampleEn: "What is your favourite subject?", exampleVi: "Môn học yêu thích của bạn là gì?" },
  { lesson: 7, word: "online", type: "adjective", phonetic: "/ˌɒnˈlaɪn/", meaning: "trực tuyến", audioUrl: "", exampleEn: "We had an online lesson today.", exampleVi: "Hôm nay chúng tôi đã có một bài học trực tuyến." },
  { lesson: 7, word: "screen", type: "noun", phonetic: "/skriːn/", meaning: "màn hình", audioUrl: "", exampleEn: "Look at the computer screen.", exampleVi: "Hãy nhìn vào màn hình máy tính." },
  { lesson: 7, word: "term", type: "noun", phonetic: "/tɜːm/", meaning: "kỳ học", audioUrl: "", exampleEn: "The autumn term starts in September.", exampleVi: "Kỳ học mùa thu bắt đầu vào tháng Chín." },
  { lesson: 7, word: "exam", type: "noun", phonetic: "/ɪɡˈzæm/", meaning: "kỳ thi", audioUrl: "", exampleEn: "I have a difficult exam tomorrow.", exampleVi: "Tôi có một kỳ thi khó vào ngày mai." },
  { lesson: 7, word: "test", type: "noun", phonetic: "/test/", meaning: "bài kiểm tra", audioUrl: "", exampleEn: "We took an English test yesterday.", exampleVi: "Chúng tôi đã làm một bài kiểm tra tiếng Anh hôm qua." },
  { lesson: 7, word: "project", type: "noun", phonetic: "/ˈprɒdʒ.ekt/", meaning: "dự án", audioUrl: "", exampleEn: "I am working on a science project.", exampleVi: "Tôi đang thực hiện một dự án khoa học." },
  { lesson: 7, word: "textbook", type: "noun", phonetic: "/ˈteks.bʊk/", meaning: "sách giáo khoa", audioUrl: "", exampleEn: "Open your math textbook to page 10.", exampleVi: "Hãy mở sách giáo khoa toán ra trang 10." },
  { lesson: 7, word: "pupil", type: "noun", phonetic: "/ˈpjuː.pəl/", meaning: "học sinh (tiểu học)", audioUrl: "", exampleEn: "There are thirty pupils in my class.", exampleVi: "Có ba mươi học sinh trong lớp của tôi." },
  { lesson: 7, word: "student", type: "noun", phonetic: "/ˈstjuː.dənt/", meaning: "học sinh, sinh viên", audioUrl: "", exampleEn: "He is a smart student.", exampleVi: "Cậu ấy là một học sinh thông minh." },
  { lesson: 7, word: "study", type: "verb", phonetic: "/ˈstʌd.i/", meaning: "học hành", audioUrl: "", exampleEn: "You must study hard for the test.", exampleVi: "Bạn phải học hành chăm chỉ cho bài kiểm tra." },

  // BÀI 8: Jobs and Work (Công việc)
  { lesson: 8, word: "actor", type: "noun", phonetic: "/ˈæk.tər/", meaning: "nam diễn viên", audioUrl: "", exampleEn: "He is a famous actor.", exampleVi: "Anh ấy là một nam diễn viên nổi tiếng." },
  { lesson: 8, word: "actress", type: "noun", phonetic: "/ˈæk.trəs/", meaning: "nữ diễn viên", audioUrl: "", exampleEn: "She is a beautiful actress.", exampleVi: "Cô ấy là một nữ diễn viên xinh đẹp." },
  { lesson: 8, word: "astronaut", type: "noun", phonetic: "/ˈæs.trə.nɔːt/", meaning: "phi hành gia", audioUrl: "", exampleEn: "An astronaut goes into space.", exampleVi: "Một phi hành gia đi vào vũ trụ." },
  { lesson: 8, word: "baker", type: "noun", phonetic: "/ˈbeɪ.kər/", meaning: "thợ làm bánh", audioUrl: "", exampleEn: "The baker makes delicious bread.", exampleVi: "Người thợ làm bánh làm ra những chiếc bánh mì rất ngon." },
  { lesson: 8, word: "businessman", type: "noun", phonetic: "/ˈbɪz.nɪs.mən/", meaning: "nam doanh nhân", audioUrl: "", exampleEn: "My uncle is a successful businessman.", exampleVi: "Chú tôi là một doanh nhân thành đạt." },
  { lesson: 8, word: "businesswoman", type: "noun", phonetic: "/ˈbɪz.nɪs.wʊm.ən/", meaning: "nữ doanh nhân", audioUrl: "", exampleEn: "She is a busy businesswoman.", exampleVi: "Cô ấy là một nữ doanh nhân bận rộn." },
  { lesson: 8, word: "engineer", type: "noun", phonetic: "/ˌen.dʒɪˈnɪər/", meaning: "kỹ sư", audioUrl: "", exampleEn: "The engineer builds new bridges.", exampleVi: "Người kỹ sư xây dựng những cây cầu mới." },
  { lesson: 8, word: "factory", type: "noun", phonetic: "/ˈfæk.tər.i/", meaning: "nhà máy", audioUrl: "", exampleEn: "Many people work in the factory.", exampleVi: "Rất nhiều người làm việc trong nhà máy." },
  { lesson: 8, word: "firefighter", type: "noun", phonetic: "/ˈfaɪəˌfaɪ.tər/", meaning: "lính cứu hỏa", audioUrl: "", exampleEn: "The firefighter saved the cat.", exampleVi: "Người lính cứu hỏa đã cứu chú mèo." },
  { lesson: 8, word: "journalist", type: "noun", phonetic: "/ˈdʒɜː.nə.lɪst/", meaning: "nhà báo", audioUrl: "", exampleEn: "A journalist writes news for a newspaper.", exampleVi: "Một nhà báo viết tin tức cho tờ báo." },
  { lesson: 8, word: "manager", type: "noun", phonetic: "/ˈmæn.ɪ.dʒər/", meaning: "người quản lý", audioUrl: "", exampleEn: "He is the manager of this restaurant.", exampleVi: "Anh ấy là người quản lý của nhà hàng này." },
  { lesson: 8, word: "mechanic", type: "noun", phonetic: "/mɪˈkæn.ɪk/", meaning: "thợ máy", audioUrl: "", exampleEn: "The mechanic fixed my car.", exampleVi: "Người thợ máy đã sửa chiếc xe của tôi." },
  { lesson: 8, word: "photographer", type: "noun", phonetic: "/fəˈtɒɡ.rə.fər/", meaning: "nhiếp ảnh gia", audioUrl: "", exampleEn: "The photographer took a beautiful photo.", exampleVi: "Nhiếp ảnh gia đã chụp một bức ảnh tuyệt đẹp." },
  { lesson: 8, word: "pilot", type: "noun", phonetic: "/ˈpaɪ.lət/", meaning: "phi công", audioUrl: "", exampleEn: "The pilot flies the airplane.", exampleVi: "Người phi công lái máy bay." },
  { lesson: 8, word: "police officer", type: "noun", phonetic: "/pəˈliːs ˌɒf.ɪ.sər/", meaning: "cảnh sát", audioUrl: "", exampleEn: "The police officer helped the old lady.", exampleVi: "Viên cảnh sát đã giúp đỡ bà cụ." },
  { lesson: 8, word: "programmer", type: "noun", phonetic: "/ˈprəʊ.ɡræm.ər/", meaning: "lập trình viên", audioUrl: "", exampleEn: "A programmer writes computer games.", exampleVi: "Một lập trình viên viết ra các trò chơi trên máy tính." },
  { lesson: 8, word: "secretary", type: "noun", phonetic: "/ˈsek.rə.tər.i/", meaning: "thư ký", audioUrl: "", exampleEn: "The secretary answers the phone.", exampleVi: "Cô thư ký trả lời điện thoại." },
  { lesson: 8, word: "singer", type: "noun", phonetic: "/ˈsɪŋ.ər/", meaning: "ca sĩ", audioUrl: "", exampleEn: "She is a famous singer.", exampleVi: "Cô ấy là một ca sĩ nổi tiếng." },
  { lesson: 8, word: "waiter", type: "noun", phonetic: "/ˈweɪ.tər/", meaning: "bồi bàn nam", audioUrl: "", exampleEn: "The waiter brought our food.", exampleVi: "Anh bồi bàn đã mang thức ăn ra cho chúng tôi." },
  { lesson: 8, word: "waitress", type: "noun", phonetic: "/ˈweɪ.trəs/", meaning: "bồi bàn nữ", audioUrl: "", exampleEn: "The waitress was very polite.", exampleVi: "Cô bồi bàn rất lịch sự." },

  // BÀI 9: Sports and Leisure (Thể thao và giải trí)
  { lesson: 9, word: "club", type: "noun", phonetic: "/klʌb/", meaning: "câu lạc bộ", audioUrl: "", exampleEn: "I joined a tennis club.", exampleVi: "Tôi đã tham gia một câu lạc bộ quần vợt." },
  { lesson: 9, word: "competition", type: "noun", phonetic: "/ˌkɒm.pəˈtɪʃ.ən/", meaning: "cuộc thi", audioUrl: "", exampleEn: "She won the swimming competition.", exampleVi: "Cô ấy đã chiến thắng cuộc thi bơi lội." },
  { lesson: 9, word: "golf", type: "noun", phonetic: "/ɡɒlf/", meaning: "môn gôn", audioUrl: "", exampleEn: "My dad plays golf on weekends.", exampleVi: "Bố tôi chơi gôn vào cuối tuần." },
  { lesson: 9, word: "match", type: "noun", phonetic: "/mætʃ/", meaning: "trận đấu", audioUrl: "", exampleEn: "We watched a football match on TV.", exampleVi: "Chúng tôi đã xem một trận đấu bóng đá trên tivi." },
  { lesson: 9, word: "prize", type: "noun", phonetic: "/praɪz/", meaning: "giải thưởng", audioUrl: "", exampleEn: "He got the first prize.", exampleVi: "Anh ấy đã nhận được giải nhất." },
  { lesson: 9, word: "race", type: "noun", phonetic: "/reɪs/", meaning: "cuộc đua", audioUrl: "", exampleEn: "The turtle won the race.", exampleVi: "Con rùa đã chiến thắng cuộc đua." },
  { lesson: 9, word: "sledge", type: "noun", phonetic: "/sledʒ/", meaning: "xe trượt tuyết", audioUrl: "", exampleEn: "We rode a sledge down the hill.", exampleVi: "Chúng tôi đã trượt xe tuyết xuống ngọn đồi." },
  { lesson: 9, word: "snowboard", type: "noun", phonetic: "/ˈsnəʊ.bɔːd/", meaning: "ván trượt tuyết", audioUrl: "", exampleEn: "I want to buy a new snowboard.", exampleVi: "Tôi muốn mua một chiếc ván trượt tuyết mới." },
  { lesson: 9, word: "snowman", type: "noun", phonetic: "/ˈsnəʊ.mæn/", meaning: "người tuyết", audioUrl: "", exampleEn: "Let's build a snowman!", exampleVi: "Hãy cùng làm một người tuyết nào!" },
  { lesson: 9, word: "tent", type: "noun", phonetic: "/tent/", meaning: "cái lều", audioUrl: "", exampleEn: "We slept in a tent in the forest.", exampleVi: "Chúng tôi đã ngủ trong một cái lều ở trong rừng." },
  { lesson: 9, word: "volleyball", type: "noun", phonetic: "/ˈvɒl.i.bɔːl/", meaning: "môn bóng chuyền", audioUrl: "", exampleEn: "They are playing volleyball on the beach.", exampleVi: "Họ đang chơi bóng chuyền trên bãi biển." },
  { lesson: 9, word: "winner", type: "noun", phonetic: "/ˈwɪn.ər/", meaning: "người chiến thắng", audioUrl: "", exampleEn: "Tom is the winner of the game.", exampleVi: "Tom là người chiến thắng của trò chơi." },
  { lesson: 9, word: "ski", type: "verb", phonetic: "/skiː/", meaning: "trượt tuyết", audioUrl: "", exampleEn: "I go to the mountain to ski every winter.", exampleVi: "Tôi đến ngọn núi để trượt tuyết vào mỗi mùa đông." },
  { lesson: 9, word: "racket", type: "noun", phonetic: "/ˈræk.ɪt/", meaning: "cái vợt", audioUrl: "", exampleEn: "I need a new tennis racket.", exampleVi: "Tôi cần một cây vợt tennis mới." },
  { lesson: 9, word: "net", type: "noun", phonetic: "/net/", meaning: "cái lưới", audioUrl: "", exampleEn: "He hit the ball over the net.", exampleVi: "Anh ấy đã đánh quả bóng bay qua tấm lưới." },
  { lesson: 9, word: "champion", type: "noun", phonetic: "/ˈtʃæm.pi.ən/", meaning: "nhà vô địch", audioUrl: "", exampleEn: "He is the world champion.", exampleVi: "Anh ấy là nhà vô địch thế giới." },
  { lesson: 9, word: "score", type: "verb", phonetic: "/skɔːr/", meaning: "ghi bàn, điểm số", audioUrl: "", exampleEn: "Did you score a goal?", exampleVi: "Bạn đã ghi bàn phải không?" },
  { lesson: 9, word: "stadium", type: "noun", phonetic: "/ˈsteɪ.di.əm/", meaning: "sân vận động", audioUrl: "", exampleEn: "The stadium is full of people.", exampleVi: "Sân vận động đang chật kín người." },
  { lesson: 9, word: "team", type: "noun", phonetic: "/tiːm/", meaning: "đội, nhóm", audioUrl: "", exampleEn: "Our football team is very strong.", exampleVi: "Đội bóng của chúng tôi rất mạnh." },
  { lesson: 9, word: "leisure", type: "noun", phonetic: "/ˈleʒ.ər/", meaning: "thời gian rảnh rỗi", audioUrl: "", exampleEn: "What do you do in your leisure time?", exampleVi: "Bạn thường làm gì trong thời gian rảnh rỗi?" },

  // BÀI 10: The Home (Nhà cửa)
  { lesson: 10, word: "balcony", type: "noun", phonetic: "/ˈbæl.kə.ni/", meaning: "ban công", audioUrl: "", exampleEn: "There are flowers on the balcony.", exampleVi: "Có những bông hoa trên ban công." },
  { lesson: 10, word: "basement", type: "noun", phonetic: "/ˈbeɪs.mənt/", meaning: "tầng hầm", audioUrl: "", exampleEn: "We keep old boxes in the basement.", exampleVi: "Chúng tôi giữ những chiếc hộp cũ dưới tầng hầm." },
  { lesson: 10, word: "blanket", type: "noun", phonetic: "/ˈblæŋ.kɪt/", meaning: "cái chăn", audioUrl: "", exampleEn: "It's cold, give me a blanket.", exampleVi: "Trời lạnh quá, hãy đưa cho tôi một cái chăn." },
  { lesson: 10, word: "brush", type: "noun", phonetic: "/brʌʃ/", meaning: "cái bàn chải", audioUrl: "", exampleEn: "I need a brush to clean the floor.", exampleVi: "Tôi cần một chiếc bàn chải để chà sàn." },
  { lesson: 10, word: "cooker", type: "noun", phonetic: "/ˈkʊk.ər/", meaning: "bếp (lò nấu)", audioUrl: "", exampleEn: "Mom is cooking soup on the cooker.", exampleVi: "Mẹ đang nấu súp trên bếp." },
  { lesson: 10, word: "fridge", type: "noun", phonetic: "/frɪdʒ/", meaning: "tủ lạnh", audioUrl: "", exampleEn: "Keep the milk in the fridge.", exampleVi: "Hãy cất sữa vào tủ lạnh." },
  { lesson: 10, word: "frying pan", type: "noun", phonetic: "/ˈfraɪ.ɪŋ ˌpæn/", meaning: "chảo rán", audioUrl: "", exampleEn: "He cooks eggs in a frying pan.", exampleVi: "Anh ấy rán trứng trong một chiếc chảo rán." },
  { lesson: 10, word: "heating", type: "noun", phonetic: "/ˈhiː.tɪŋ/", meaning: "hệ thống sưởi", audioUrl: "", exampleEn: "Turn on the heating, it's very cold.", exampleVi: "Hãy bật lò sưởi lên, trời lạnh lắm." },
  { lesson: 10, word: "key", type: "noun", phonetic: "/kiː/", meaning: "chìa khóa", audioUrl: "", exampleEn: "I lost my house key.", exampleVi: "Tôi đã làm mất chìa khóa nhà." },
  { lesson: 10, word: "roof", type: "noun", phonetic: "/ruːf/", meaning: "mái nhà", audioUrl: "", exampleEn: "There is a cat on the roof.", exampleVi: "Có một con mèo trên mái nhà." },
  { lesson: 10, word: "shelf", type: "noun", phonetic: "/ʃelf/", meaning: "cái giá, kệ", audioUrl: "", exampleEn: "Put the books on the shelf.", exampleVi: "Hãy đặt những cuốn sách lên kệ." },
  { lesson: 10, word: "soap", type: "noun", phonetic: "/səʊp/", meaning: "xà phòng", audioUrl: "", exampleEn: "Wash your hands with soap.", exampleVi: "Hãy rửa tay của bạn với xà phòng." },
  { lesson: 10, word: "shampoo", type: "noun", phonetic: "/ʃæmˈpuː/", meaning: "dầu gội", audioUrl: "", exampleEn: "I need to buy some shampoo.", exampleVi: "Tôi cần mua một ít dầu gội đầu." },
  { lesson: 10, word: "towel", type: "noun", phonetic: "/taʊəl/", meaning: "khăn tắm", audioUrl: "", exampleEn: "Dry your hair with a towel.", exampleVi: "Hãy lau khô tóc của bạn bằng một chiếc khăn tắm." },
  { lesson: 10, word: "bin", type: "noun", phonetic: "/bɪn/", meaning: "thùng rác", audioUrl: "", exampleEn: "Throw the paper in the bin.", exampleVi: "Hãy ném rác vào thùng rác." },
  { lesson: 10, word: "drawer", type: "noun", phonetic: "/drɔːr/", meaning: "ngăn kéo", audioUrl: "", exampleEn: "My socks are in the drawer.", exampleVi: "Những đôi tất của tôi nằm trong ngăn kéo." },
  { lesson: 10, word: "address", type: "noun", phonetic: "/əˈdres/", meaning: "địa chỉ", audioUrl: "", exampleEn: "What is your home address?", exampleVi: "Địa chỉ nhà của bạn là gì?" },
  { lesson: 10, word: "stairs", type: "noun", phonetic: "/steəz/", meaning: "cầu thang bộ", audioUrl: "", exampleEn: "Go up the stairs to the bedroom.", exampleVi: "Hãy đi lên cầu thang để tới phòng ngủ." },
  { lesson: 10, word: "elevator", type: "noun", phonetic: "/ˈel.ɪ.veɪ.tər/", meaning: "thang máy", audioUrl: "", exampleEn: "Take the elevator to the 5th floor.", exampleVi: "Hãy đi thang máy lên tầng 5." },
  { lesson: 10, word: "mirror", type: "noun", phonetic: "/ˈmɪr.ər/", meaning: "cái gương", audioUrl: "", exampleEn: "She looks at herself in the mirror.", exampleVi: "Cô ấy tự ngắm mình trong gương." }
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

    // 1. Thêm/Cập nhật vào kho từ vựng tổng (lesson 9999)
    const existingInTotal = await prisma.lessonContent.findFirst({
      where: {
        lessonId: vocabLesson.id,
        contentType: 'THEORY',
        content: { contains: `"word":"${item.word}"` }
      }
    });

    if (!existingInTotal) {
      await prisma.lessonContent.create({
        data: {
          lessonId: vocabLesson.id,
          contentType: 'THEORY',
          content: contentJson
        }
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
        data: {
          lessonId: targetLesson.id,
          contentType: 'THEORY',
          content: contentJson
        }
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

  console.log(`\n🎉 Hoàn thành nạp/cập nhật ${successCount} từ vựng Batch 2 cho Flyers!`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

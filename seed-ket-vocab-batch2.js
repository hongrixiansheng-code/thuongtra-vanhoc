/**
 * SEED SCRIPT: YLE KET Vocabulary — Batch 2 (Bài 6 - 10)
 * Chạy từ thư mục gốc: node seed-ket-vocab-batch2.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 6: Food and Drink (Đồ ăn và Thức uống)
  { lesson: 6, word: "biscuit", type: "noun", phonetic: "/ˈbɪs.kɪt/", meaning: "bánh quy", audioUrl: "", exampleEn: "I'd like a biscuit with my tea.", exampleVi: "Tôi muốn một cái bánh quy dùng với trà." },
  { lesson: 6, word: "bread", type: "noun", phonetic: "/bred/", meaning: "bánh mì", audioUrl: "", exampleEn: "We need some bread for breakfast.", exampleVi: "Chúng ta cần một ít bánh mì cho bữa sáng." },
  { lesson: 6, word: "butter", type: "noun", phonetic: "/ˈbʌt.ər/", meaning: "bơ", audioUrl: "", exampleEn: "I like bread and butter.", exampleVi: "Tôi thích bánh mì và bơ." },
  { lesson: 6, word: "cheese", type: "noun", phonetic: "/tʃiːz/", meaning: "pho mát", audioUrl: "", exampleEn: "She put some cheese on the pizza.", exampleVi: "Cô ấy đã rắc một ít pho mát lên chiếc bánh pizza." },
  { lesson: 6, word: "chicken", type: "noun", phonetic: "/ˈtʃɪk.ɪn/", meaning: "thịt gà", audioUrl: "", exampleEn: "We are having roast chicken for dinner.", exampleVi: "Chúng tôi sẽ ăn gà quay cho bữa tối." },
  { lesson: 6, word: "meat", type: "noun", phonetic: "/miːt/", meaning: "thịt", audioUrl: "", exampleEn: "I don't eat meat. I am a vegetarian.", exampleVi: "Tôi không ăn thịt. Tôi là người ăn chay." },
  { lesson: 6, word: "fish", type: "noun", phonetic: "/fɪʃ/", meaning: "cá", audioUrl: "", exampleEn: "My cat loves eating fish.", exampleVi: "Con mèo của tôi rất thích ăn cá." },
  { lesson: 6, word: "fruit", type: "noun", phonetic: "/fruːt/", meaning: "trái cây", audioUrl: "", exampleEn: "You should eat more fresh fruit.", exampleVi: "Bạn nên ăn nhiều trái cây tươi hơn." },
  { lesson: 6, word: "vegetable", type: "noun", phonetic: "/ˈvedʒ.tə.bəl/", meaning: "rau củ", audioUrl: "", exampleEn: "Carrots and peas are vegetables.", exampleVi: "Cà rốt và đậu Hà Lan là các loại rau củ." },
  { lesson: 6, word: "salad", type: "noun", phonetic: "/ˈsæl.əd/", meaning: "món sa lát", audioUrl: "", exampleEn: "I ordered a green salad.", exampleVi: "Tôi đã gọi một đĩa sa lát rau xanh." },
  { lesson: 6, word: "soup", type: "noun", phonetic: "/suːp/", meaning: "món súp", audioUrl: "", exampleEn: "This tomato soup is delicious.", exampleVi: "Món súp cà chua này rất ngon." },
  { lesson: 6, word: "sugar", type: "noun", phonetic: "/ˈʃʊɡ.ər/", meaning: "đường", audioUrl: "", exampleEn: "Do you take sugar in your coffee?", exampleVi: "Bạn có uống cà phê với đường không?" },
  { lesson: 6, word: "salt", type: "noun", phonetic: "/sɒlt/", meaning: "muối", audioUrl: "", exampleEn: "Pass me the salt, please.", exampleVi: "Làm ơn đưa cho tôi lọ muối." },
  { lesson: 6, word: "pepper", type: "noun", phonetic: "/ˈpep.ər/", meaning: "hạt tiêu", audioUrl: "", exampleEn: "I like black pepper on my food.", exampleVi: "Tôi thích rắc hạt tiêu đen lên thức ăn của mình." },
  { lesson: 6, word: "water", type: "noun", phonetic: "/ˈwɔː.tər/", meaning: "nước", audioUrl: "", exampleEn: "Drink plenty of water every day.", exampleVi: "Hãy uống nhiều nước mỗi ngày." },
  { lesson: 6, word: "juice", type: "noun", phonetic: "/dʒuːs/", meaning: "nước ép", audioUrl: "", exampleEn: "I have orange juice every morning.", exampleVi: "Tôi uống nước ép cam mỗi buổi sáng." },
  { lesson: 6, word: "milk", type: "noun", phonetic: "/mɪlk/", meaning: "sữa", audioUrl: "", exampleEn: "A glass of warm milk helps you sleep.", exampleVi: "Một ly sữa ấm sẽ giúp bạn dễ ngủ hơn." },
  { lesson: 6, word: "coffee", type: "noun", phonetic: "/ˈkɒf.i/", meaning: "cà phê", audioUrl: "", exampleEn: "My dad drinks black coffee.", exampleVi: "Bố tôi uống cà phê đen." },
  { lesson: 6, word: "tea", type: "noun", phonetic: "/tiː/", meaning: "trà", audioUrl: "", exampleEn: "Would you like a cup of tea?", exampleVi: "Bạn có muốn một tách trà không?" },
  { lesson: 6, word: "hungry", type: "adjective", phonetic: "/ˈhʌŋ.ɡri/", meaning: "đói bụng", audioUrl: "", exampleEn: "I am feeling hungry.", exampleVi: "Tôi đang cảm thấy đói bụng." },

  // BÀI 7: School and Study (Trường học và Học tập)
  { lesson: 7, word: "classroom", type: "noun", phonetic: "/ˈklɑːs.ruːm/", meaning: "phòng học", audioUrl: "", exampleEn: "There are 30 desks in our classroom.", exampleVi: "Có 30 cái bàn trong phòng học của chúng tôi." },
  { lesson: 7, word: "desk", type: "noun", phonetic: "/desk/", meaning: "bàn học", audioUrl: "", exampleEn: "Please sit at your desk.", exampleVi: "Vui lòng ngồi vào bàn học của bạn." },
  { lesson: 7, word: "board", type: "noun", phonetic: "/bɔːd/", meaning: "bảng", audioUrl: "", exampleEn: "Look at the board, please.", exampleVi: "Vui lòng nhìn lên bảng." },
  { lesson: 7, word: "dictionary", type: "noun", phonetic: "/ˈdɪk.ʃən.ər.i/", meaning: "từ điển", audioUrl: "", exampleEn: "You can look up the word in a dictionary.", exampleVi: "Bạn có thể tra từ này trong từ điển." },
  { lesson: 7, word: "notebook", type: "noun", phonetic: "/ˈnəʊt.bʊk/", meaning: "quyển vở", audioUrl: "", exampleEn: "Write the answers in your notebook.", exampleVi: "Hãy viết các câu trả lời vào quyển vở của bạn." },
  { lesson: 7, word: "pencil", type: "noun", phonetic: "/ˈpen.səl/", meaning: "bút chì", audioUrl: "", exampleEn: "I need a pencil and an eraser.", exampleVi: "Tôi cần một chiếc bút chì và một cục tẩy." },
  { lesson: 7, word: "exam", type: "noun", phonetic: "/ɪɡˈzæm/", meaning: "kỳ thi", audioUrl: "", exampleEn: "We have an English exam tomorrow.", exampleVi: "Ngày mai chúng tôi có một kỳ thi môn Tiếng Anh." },
  { lesson: 7, word: "lesson", type: "noun", phonetic: "/ˈles.ən/", meaning: "bài học", audioUrl: "", exampleEn: "Today's lesson is very interesting.", exampleVi: "Bài học hôm nay rất thú vị." },
  { lesson: 7, word: "subject", type: "noun", phonetic: "/ˈsʌb.dʒekt/", meaning: "môn học", audioUrl: "", exampleEn: "Math is my favorite subject.", exampleVi: "Toán là môn học yêu thích của tôi." },
  { lesson: 7, word: "history", type: "noun", phonetic: "/ˈhɪs.tər.i/", meaning: "môn lịch sử", audioUrl: "", exampleEn: "I am reading a history book.", exampleVi: "Tôi đang đọc một cuốn sách lịch sử." },
  { lesson: 7, word: "science", type: "noun", phonetic: "/ˈsaɪ.əns/", meaning: "môn khoa học", audioUrl: "", exampleEn: "We do experiments in science class.", exampleVi: "Chúng tôi làm thí nghiệm trong lớp học khoa học." },
  { lesson: 7, word: "geography", type: "noun", phonetic: "/dʒiˈɒɡ.rə.fi/", meaning: "môn địa lý", audioUrl: "", exampleEn: "We study about countries in geography.", exampleVi: "Chúng tôi học về các quốc gia trong môn địa lý." },
  { lesson: 7, word: "teacher", type: "noun", phonetic: "/ˈtiː.tʃər/", meaning: "giáo viên", audioUrl: "", exampleEn: "Our teacher is very kind.", exampleVi: "Giáo viên của chúng tôi rất tốt bụng." },
  { lesson: 7, word: "student", type: "noun", phonetic: "/ˈstjuː.dənt/", meaning: "học sinh, sinh viên", audioUrl: "", exampleEn: "There are 500 students in this school.", exampleVi: "Có 500 học sinh trong ngôi trường này." },
  { lesson: 7, word: "learn", type: "verb", phonetic: "/lɜːn/", meaning: "học", audioUrl: "", exampleEn: "I want to learn Spanish.", exampleVi: "Tôi muốn học tiếng Tây Ban Nha." },
  { lesson: 7, word: "teach", type: "verb", phonetic: "/tiːtʃ/", meaning: "dạy", audioUrl: "", exampleEn: "My mother teaches English.", exampleVi: "Mẹ tôi dạy tiếng Anh." },
  { lesson: 7, word: "understand", type: "verb", phonetic: "/ˌʌn.dəˈstænd/", meaning: "hiểu", audioUrl: "", exampleEn: "I don't understand this question.", exampleVi: "Tôi không hiểu câu hỏi này." },
  { lesson: 7, word: "remember", type: "verb", phonetic: "/rɪˈmem.bər/", meaning: "nhớ", audioUrl: "", exampleEn: "Please remember to bring your book.", exampleVi: "Vui lòng nhớ mang theo sách của bạn." },
  { lesson: 7, word: "forget", type: "verb", phonetic: "/fəˈɡet/", meaning: "quên", audioUrl: "", exampleEn: "Don't forget your umbrella.", exampleVi: "Đừng quên chiếc ô của bạn nhé." },
  { lesson: 7, word: "practice", type: "verb", phonetic: "/ˈpræk.tɪs/", meaning: "thực hành, luyện tập", audioUrl: "", exampleEn: "You must practice speaking every day.", exampleVi: "Bạn phải luyện nói mỗi ngày." },

  // BÀI 8: Work and Jobs (Công việc và Nghề nghiệp)
  { lesson: 8, word: "job", type: "noun", phonetic: "/dʒɒb/", meaning: "công việc, nghề nghiệp", audioUrl: "", exampleEn: "He got a new job at the bank.", exampleVi: "Anh ấy đã có một công việc mới ở ngân hàng." },
  { lesson: 8, word: "work", type: "verb", phonetic: "/wɜːk/", meaning: "làm việc", audioUrl: "", exampleEn: "I work from 9 AM to 5 PM.", exampleVi: "Tôi làm việc từ 9 giờ sáng đến 5 giờ chiều." },
  { lesson: 8, word: "office", type: "noun", phonetic: "/ˈɒf.ɪs/", meaning: "văn phòng", audioUrl: "", exampleEn: "Her office is on the third floor.", exampleVi: "Văn phòng của cô ấy ở tầng ba." },
  { lesson: 8, word: "manager", type: "noun", phonetic: "/ˈmæn.ɪ.dʒər/", meaning: "người quản lý", audioUrl: "", exampleEn: "The manager is in a meeting.", exampleVi: "Người quản lý đang trong một cuộc họp." },
  { lesson: 8, word: "doctor", type: "noun", phonetic: "/ˈdɒk.tər/", meaning: "bác sĩ", audioUrl: "", exampleEn: "You should see a doctor.", exampleVi: "Bạn nên đi khám bác sĩ." },
  { lesson: 8, word: "nurse", type: "noun", phonetic: "/nɜːs/", meaning: "y tá", audioUrl: "", exampleEn: "The nurse gave me some medicine.", exampleVi: "Y tá đã đưa cho tôi một chút thuốc." },
  { lesson: 8, word: "dentist", type: "noun", phonetic: "/ˈden.tɪst/", meaning: "nha sĩ", audioUrl: "", exampleEn: "I go to the dentist twice a year.", exampleVi: "Tôi đi nha sĩ hai lần một năm." },
  { lesson: 8, word: "pilot", type: "noun", phonetic: "/ˈpaɪ.lət/", meaning: "phi công", audioUrl: "", exampleEn: "My uncle is a pilot.", exampleVi: "Chú của tôi là một phi công." },
  { lesson: 8, word: "farmer", type: "noun", phonetic: "/ˈfɑː.mər/", meaning: "nông dân", audioUrl: "", exampleEn: "The farmer is feeding the cows.", exampleVi: "Người nông dân đang cho những con bò ăn." },
  { lesson: 8, word: "driver", type: "noun", phonetic: "/ˈdraɪ.vər/", meaning: "tài xế", audioUrl: "", exampleEn: "He is a bus driver.", exampleVi: "Anh ấy là một tài xế xe buýt." },
  { lesson: 8, word: "mechanic", type: "noun", phonetic: "/məˈkæn.ɪk/", meaning: "thợ máy", audioUrl: "", exampleEn: "The mechanic fixed my car.", exampleVi: "Người thợ máy đã sửa chiếc xe hơi của tôi." },
  { lesson: 8, word: "engineer", type: "noun", phonetic: "/ˌen.dʒɪˈnɪər/", meaning: "kỹ sư", audioUrl: "", exampleEn: "She wants to be a software engineer.", exampleVi: "Cô ấy muốn trở thành một kỹ sư phần mềm." },
  { lesson: 8, word: "actor", type: "noun", phonetic: "/ˈæk.tər/", meaning: "nam diễn viên", audioUrl: "", exampleEn: "He is a famous actor.", exampleVi: "Anh ấy là một nam diễn viên nổi tiếng." },
  { lesson: 8, word: "actress", type: "noun", phonetic: "/ˈæk.trəs/", meaning: "nữ diễn viên", audioUrl: "", exampleEn: "The actress won an award.", exampleVi: "Nữ diễn viên đó đã giành được một giải thưởng." },
  { lesson: 8, word: "singer", type: "noun", phonetic: "/ˈsɪŋ.ər/", meaning: "ca sĩ", audioUrl: "", exampleEn: "My favorite singer is Taylor.", exampleVi: "Ca sĩ yêu thích của tôi là Taylor." },
  { lesson: 8, word: "waiter", type: "noun", phonetic: "/ˈweɪ.tər/", meaning: "nam bồi bàn", audioUrl: "", exampleEn: "The waiter brought our food.", exampleVi: "Người nam bồi bàn đã mang thức ăn của chúng tôi ra." },
  { lesson: 8, word: "waitress", type: "noun", phonetic: "/ˈweɪ.trəs/", meaning: "nữ bồi bàn", audioUrl: "", exampleEn: "She works as a waitress in a cafe.", exampleVi: "Cô ấy làm nữ bồi bàn trong một quán cà phê." },
  { lesson: 8, word: "police officer", type: "noun", phonetic: "/pəˈliːs ˌɒf.ɪ.sər/", meaning: "sĩ quan cảnh sát", audioUrl: "", exampleEn: "The police officer caught the thief.", exampleVi: "Sĩ quan cảnh sát đã bắt được tên trộm." },
  { lesson: 8, word: "firefighter", type: "noun", phonetic: "/ˈfaɪəˌfaɪ.tər/", meaning: "lính cứu hỏa", audioUrl: "", exampleEn: "Firefighters are very brave.", exampleVi: "Những người lính cứu hỏa rất dũng cảm." },
  { lesson: 8, word: "cook", type: "noun", phonetic: "/kʊk/", meaning: "đầu bếp", audioUrl: "", exampleEn: "My father is a great cook.", exampleVi: "Bố tôi là một đầu bếp tuyệt vời." },

  // BÀI 9: Health and Medicine (Sức khỏe và Y tế)
  { lesson: 9, word: "health", type: "noun", phonetic: "/helθ/", meaning: "sức khỏe", audioUrl: "", exampleEn: "Smoking is bad for your health.", exampleVi: "Hút thuốc thì có hại cho sức khỏe của bạn." },
  { lesson: 9, word: "sick", type: "adjective", phonetic: "/sɪk/", meaning: "ốm, bệnh", audioUrl: "", exampleEn: "I feel sick.", exampleVi: "Tôi cảm thấy ốm." },
  { lesson: 9, word: "ill", type: "adjective", phonetic: "/ɪl/", meaning: "ốm yếu", audioUrl: "", exampleEn: "She is seriously ill in hospital.", exampleVi: "Cô ấy đang ốm nặng trong bệnh viện." },
  { lesson: 9, word: "pain", type: "noun", phonetic: "/peɪn/", meaning: "sự đau đớn", audioUrl: "", exampleEn: "I have a sharp pain in my leg.", exampleVi: "Tôi có một cơn đau nhói ở chân." },
  { lesson: 9, word: "hurt", type: "verb", phonetic: "/hɜːt/", meaning: "làm đau, bị đau", audioUrl: "", exampleEn: "My back hurts.", exampleVi: "Lưng của tôi bị đau." },
  { lesson: 9, word: "headache", type: "noun", phonetic: "/ˈhed.eɪk/", meaning: "chứng đau đầu", audioUrl: "", exampleEn: "I have a terrible headache.", exampleVi: "Tôi bị đau đầu khủng khiếp." },
  { lesson: 9, word: "stomachache", type: "noun", phonetic: "/ˈstʌm.ək.eɪk/", meaning: "chứng đau dạ dày", audioUrl: "", exampleEn: "Eating too much candy gives you a stomachache.", exampleVi: "Ăn quá nhiều kẹo sẽ khiến bạn bị đau dạ dày." },
  { lesson: 9, word: "toothache", type: "noun", phonetic: "/ˈtuːθ.eɪk/", meaning: "chứng đau răng", audioUrl: "", exampleEn: "He went to the dentist because of a toothache.", exampleVi: "Anh ấy đã đến nha sĩ vì bị đau răng." },
  { lesson: 9, word: "cold", type: "noun", phonetic: "/kəʊld/", meaning: "chứng cảm lạnh", audioUrl: "", exampleEn: "I caught a cold yesterday.", exampleVi: "Tôi đã bị cảm lạnh hôm qua." },
  { lesson: 9, word: "cough", type: "noun", phonetic: "/kɒf/", meaning: "chứng ho", audioUrl: "", exampleEn: "She has a bad cough.", exampleVi: "Cô ấy bị ho nặng." },
  { lesson: 9, word: "medicine", type: "noun", phonetic: "/ˈmed.ɪ.sən/", meaning: "thuốc", audioUrl: "", exampleEn: "You must take this medicine three times a day.", exampleVi: "Bạn phải uống thuốc này ba lần một ngày." },
  { lesson: 9, word: "pill", type: "noun", phonetic: "/pɪl/", meaning: "viên thuốc", audioUrl: "", exampleEn: "Swallow the pill with water.", exampleVi: "Hãy nuốt viên thuốc này với nước." },
  { lesson: 9, word: "bandage", type: "noun", phonetic: "/ˈbæn.dɪdʒ/", meaning: "băng gạc", audioUrl: "", exampleEn: "The nurse put a bandage on my arm.", exampleVi: "Y tá đã quấn một lớp băng gạc lên cánh tay tôi." },
  { lesson: 9, word: "appointment", type: "noun", phonetic: "/əˈpɔɪnt.mənt/", meaning: "cuộc hẹn", audioUrl: "", exampleEn: "I have an appointment with Dr. Smith.", exampleVi: "Tôi có một cuộc hẹn với bác sĩ Smith." },
  { lesson: 9, word: "pharmacy", type: "noun", phonetic: "/ˈfɑː.mə.si/", meaning: "hiệu thuốc", audioUrl: "", exampleEn: "I bought some aspirin at the pharmacy.", exampleVi: "Tôi đã mua một ít thuốc giảm đau tại hiệu thuốc." },
  { lesson: 9, word: "chemist", type: "noun", phonetic: "/ˈkem.ɪst/", meaning: "dược sĩ, hiệu thuốc", audioUrl: "", exampleEn: "Go to the chemist to get your medicine.", exampleVi: "Hãy đến hiệu thuốc để lấy thuốc của bạn." },
  { lesson: 9, word: "temperature", type: "noun", phonetic: "/ˈtem.prə.tʃər/", meaning: "nhiệt độ, sốt", audioUrl: "", exampleEn: "He has a high temperature.", exampleVi: "Cậu ấy có nhiệt độ cơ thể cao (bị sốt)." },
  { lesson: 9, word: "fever", type: "noun", phonetic: "/ˈfiː.vər/", meaning: "cơn sốt", audioUrl: "", exampleEn: "The baby has a fever.", exampleVi: "Em bé đang bị sốt." },
  { lesson: 9, word: "healthy", type: "adjective", phonetic: "/ˈhel.θi/", meaning: "khỏe mạnh", audioUrl: "", exampleEn: "Eating fruit keeps you healthy.", exampleVi: "Ăn trái cây giúp bạn luôn khỏe mạnh." },
  { lesson: 9, word: "fit", type: "adjective", phonetic: "/fɪt/", meaning: "cân đối, khỏe khoắn", audioUrl: "", exampleEn: "He exercises to keep fit.", exampleVi: "Anh ấy tập thể dục để giữ dáng." },

  // BÀI 10: Sports (Thể thao)
  { lesson: 10, word: "sport", type: "noun", phonetic: "/spɔːt/", meaning: "thể thao", audioUrl: "", exampleEn: "What is your favorite sport?", exampleVi: "Môn thể thao yêu thích của bạn là gì?" },
  { lesson: 10, word: "football", type: "noun", phonetic: "/ˈfʊt.bɔːl/", meaning: "bóng đá", audioUrl: "", exampleEn: "We play football every Sunday.", exampleVi: "Chúng tôi chơi bóng đá mỗi Chủ nhật." },
  { lesson: 10, word: "basketball", type: "noun", phonetic: "/ˈbɑː.skɪt.bɔːl/", meaning: "bóng rổ", audioUrl: "", exampleEn: "Michael is a great basketball player.", exampleVi: "Michael là một cầu thủ bóng rổ vĩ đại." },
  { lesson: 10, word: "tennis", type: "noun", phonetic: "/ˈten.ɪs/", meaning: "quần vợt", audioUrl: "", exampleEn: "She plays tennis on the weekend.", exampleVi: "Cô ấy chơi quần vợt vào cuối tuần." },
  { lesson: 10, word: "swimming", type: "noun", phonetic: "/ˈswɪm.ɪŋ/", meaning: "bơi lội", audioUrl: "", exampleEn: "Swimming is good for your health.", exampleVi: "Bơi lội thì rất tốt cho sức khỏe của bạn." },
  { lesson: 10, word: "running", type: "noun", phonetic: "/ˈrʌn.ɪŋ/", meaning: "chạy bộ", audioUrl: "", exampleEn: "He goes running every morning.", exampleVi: "Anh ấy đi chạy bộ mỗi sáng." },
  { lesson: 10, word: "cycling", type: "noun", phonetic: "/ˈsaɪ.klɪŋ/", meaning: "đạp xe", audioUrl: "", exampleEn: "Cycling is a popular hobby.", exampleVi: "Đạp xe là một sở thích phổ biến." },
  { lesson: 10, word: "team", type: "noun", phonetic: "/tiːm/", meaning: "đội, nhóm", audioUrl: "", exampleEn: "Which team do you support?", exampleVi: "Bạn ủng hộ đội nào?" },
  { lesson: 10, word: "player", type: "noun", phonetic: "/ˈpleɪ.ər/", meaning: "cầu thủ, người chơi", audioUrl: "", exampleEn: "He is the best player in the team.", exampleVi: "Anh ấy là cầu thủ xuất sắc nhất trong đội." },
  { lesson: 10, word: "match", type: "noun", phonetic: "/mætʃ/", meaning: "trận đấu", audioUrl: "", exampleEn: "We won the football match.", exampleVi: "Chúng tôi đã thắng trận đấu bóng đá." },
  { lesson: 10, word: "win", type: "verb", phonetic: "/wɪn/", meaning: "chiến thắng", audioUrl: "", exampleEn: "I hope we win the game.", exampleVi: "Tôi hy vọng chúng tôi sẽ giành chiến thắng trong trò chơi." },
  { lesson: 10, word: "lose", type: "verb", phonetic: "/luːz/", meaning: "thua cuộc", audioUrl: "", exampleEn: "Nobody likes to lose.", exampleVi: "Không ai thích thua cuộc cả." },
  { lesson: 10, word: "score", type: "noun", phonetic: "/skɔːr/", meaning: "tỷ số", audioUrl: "", exampleEn: "What is the final score?", exampleVi: "Tỷ số chung cuộc là bao nhiêu?" },
  { lesson: 10, word: "goal", type: "noun", phonetic: "/ɡəʊl/", meaning: "bàn thắng", audioUrl: "", exampleEn: "He scored a fantastic goal.", exampleVi: "Anh ấy đã ghi một bàn thắng tuyệt vời." },
  { lesson: 10, word: "stadium", type: "noun", phonetic: "/ˈsteɪ.di.əm/", meaning: "sân vận động", audioUrl: "", exampleEn: "The stadium was full of fans.", exampleVi: "Sân vận động chật cứng người hâm mộ." },
  { lesson: 10, word: "coach", type: "noun", phonetic: "/kəʊtʃ/", meaning: "huấn luyện viên", audioUrl: "", exampleEn: "Our coach is very strict.", exampleVi: "Huấn luyện viên của chúng tôi rất nghiêm khắc." },
  { lesson: 10, word: "gym", type: "noun", phonetic: "/dʒɪm/", meaning: "phòng tập thể hình", audioUrl: "", exampleEn: "I go to the gym twice a week.", exampleVi: "Tôi đi đến phòng tập thể hình hai lần một tuần." },
  { lesson: 10, word: "exercise", type: "noun", phonetic: "/ˈek.sə.saɪz/", meaning: "sự tập thể dục", audioUrl: "", exampleEn: "Regular exercise is important.", exampleVi: "Việc tập thể dục thường xuyên là rất quan trọng." },
  { lesson: 10, word: "ball", type: "noun", phonetic: "/bɔːl/", meaning: "quả bóng", audioUrl: "", exampleEn: "Throw the ball to me.", exampleVi: "Hãy ném quả bóng cho tôi." },
  { lesson: 10, word: "kick", type: "verb", phonetic: "/kɪk/", meaning: "đá", audioUrl: "", exampleEn: "He kicked the ball into the net.", exampleVi: "Cậu ấy đã đá quả bóng vào lưới." }
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

  console.log(`\n🎉 Hoàn thành nạp ${successCount} từ vựng Batch 2 cho KET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

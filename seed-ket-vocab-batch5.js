/**
 * SEED SCRIPT: YLE KET Vocabulary — Batch 5 (Bài 21 - 25)
 * Chạy từ thư mục gốc: node seed-ket-vocab-batch5.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 21: Culture and Festivals (Văn hóa và Lễ hội)
  { lesson: 21, word: "culture", type: "noun", phonetic: "/ˈkʌl.tʃər/", meaning: "văn hóa", audioUrl: "", exampleEn: "I love learning about different cultures.", exampleVi: "Tôi thích học về những nền văn hóa khác nhau." },
  { lesson: 21, word: "festival", type: "noun", phonetic: "/ˈfes.tɪ.vəl/", meaning: "lễ hội", audioUrl: "", exampleEn: "There is a music festival in the park.", exampleVi: "Có một lễ hội âm nhạc trong công viên." },
  { lesson: 21, word: "celebrate", type: "verb", phonetic: "/ˈsel.ə.breɪt/", meaning: "ăn mừng", audioUrl: "", exampleEn: "We celebrate the New Year with fireworks.", exampleVi: "Chúng tôi ăn mừng năm mới bằng pháo hoa." },
  { lesson: 21, word: "tradition", type: "noun", phonetic: "/trəˈdɪʃ.ən/", meaning: "truyền thống", audioUrl: "", exampleEn: "It is a tradition to give gifts.", exampleVi: "Tặng quà là một truyền thống." },
  { lesson: 21, word: "custom", type: "noun", phonetic: "/ˈkʌs.təm/", meaning: "phong tục", audioUrl: "", exampleEn: "Bowing is a custom in Japan.", exampleVi: "Cúi chào là một phong tục ở Nhật Bản." },
  { lesson: 21, word: "costume", type: "noun", phonetic: "/ˈkɒs.tʃuːm/", meaning: "trang phục (truyền thống/hóa trang)", audioUrl: "", exampleEn: "She wore a beautiful traditional costume.", exampleVi: "Cô ấy đã mặc một bộ trang phục truyền thống tuyệt đẹp." },
  { lesson: 21, word: "parade", type: "noun", phonetic: "/pəˈreɪd/", meaning: "cuộc diễu hành", audioUrl: "", exampleEn: "We watched the parade on the street.", exampleVi: "Chúng tôi đã xem cuộc diễu hành trên phố." },
  { lesson: 21, word: "fireworks", type: "noun", phonetic: "/ˈfaɪə.wɜːks/", meaning: "pháo hoa", audioUrl: "", exampleEn: "The fireworks at midnight were amazing.", exampleVi: "Pháo hoa lúc nửa đêm thật tuyệt vời." },
  { lesson: 21, word: "gift", type: "noun", phonetic: "/ɡɪft/", meaning: "món quà", audioUrl: "", exampleEn: "I received a special gift.", exampleVi: "Tôi đã nhận được một món quà đặc biệt." },
  { lesson: 21, word: "present", type: "noun", phonetic: "/ˈprez.ənt/", meaning: "món quà", audioUrl: "", exampleEn: "Open your birthday present!", exampleVi: "Hãy mở món quà sinh nhật của bạn đi!" },
  { lesson: 21, word: "invite", type: "verb", phonetic: "/ɪnˈvaɪt/", meaning: "mời", audioUrl: "", exampleEn: "I will invite my friends to the party.", exampleVi: "Tôi sẽ mời bạn bè đến bữa tiệc." },
  { lesson: 21, word: "invitation", type: "noun", phonetic: "/ˌɪn.vɪˈteɪ.ʃən/", meaning: "lời mời, thiệp mời", audioUrl: "", exampleEn: "Did you receive my invitation?", exampleVi: "Bạn đã nhận được thiệp mời của tôi chưa?" },
  { lesson: 21, word: "party", type: "noun", phonetic: "/ˈpɑː.ti/", meaning: "bữa tiệc", audioUrl: "", exampleEn: "We had a great time at the party.", exampleVi: "Chúng tôi đã có một khoảng thời gian tuyệt vời tại bữa tiệc." },
  { lesson: 21, word: "decorate", type: "verb", phonetic: "/ˈdek.ə.reɪt/", meaning: "trang trí", audioUrl: "", exampleEn: "They decorate the house with lights.", exampleVi: "Họ trang trí ngôi nhà bằng những bóng đèn." },
  { lesson: 21, word: "special", type: "adjective", phonetic: "/ˈspeʃ.əl/", meaning: "đặc biệt", audioUrl: "", exampleEn: "Today is a special day.", exampleVi: "Hôm nay là một ngày đặc biệt." },
  { lesson: 21, word: "meal", type: "noun", phonetic: "/miːl/", meaning: "bữa ăn", audioUrl: "", exampleEn: "We enjoyed a traditional meal.", exampleVi: "Chúng tôi đã thưởng thức một bữa ăn truyền thống." },
  { lesson: 21, word: "lucky", type: "adjective", phonetic: "/ˈlʌk.i/", meaning: "may mắn", audioUrl: "", exampleEn: "Red is considered a lucky color.", exampleVi: "Màu đỏ được coi là một màu may mắn." },
  { lesson: 21, word: "calendar", type: "noun", phonetic: "/ˈkæl.ən.dər/", meaning: "lịch", audioUrl: "", exampleEn: "Mark the date on the calendar.", exampleVi: "Hãy đánh dấu ngày đó trên lịch." },
  { lesson: 21, word: "national", type: "adjective", phonetic: "/ˈnæʃ.ən.əl/", meaning: "thuộc về quốc gia", audioUrl: "", exampleEn: "It is a national holiday.", exampleVi: "Đó là một ngày lễ quốc gia." },
  { lesson: 21, word: "event", type: "noun", phonetic: "/ɪˈvent/", meaning: "sự kiện", audioUrl: "", exampleEn: "The festival is a huge event.", exampleVi: "Lễ hội là một sự kiện khổng lồ." },

  // BÀI 22: Future Plans (Kế hoạch Tương lai)
  { lesson: 22, word: "plan", type: "noun", phonetic: "/plæn/", meaning: "kế hoạch", audioUrl: "", exampleEn: "What are your plans for the weekend?", exampleVi: "Kế hoạch cho cuối tuần của bạn là gì?" },
  { lesson: 22, word: "future", type: "noun", phonetic: "/ˈfjuː.tʃər/", meaning: "tương lai", audioUrl: "", exampleEn: "I want to be a doctor in the future.", exampleVi: "Tôi muốn trở thành một bác sĩ trong tương lai." },
  { lesson: 22, word: "hope", type: "verb", phonetic: "/həʊp/", meaning: "hy vọng", audioUrl: "", exampleEn: "I hope to pass the exam.", exampleVi: "Tôi hy vọng sẽ vượt qua kỳ thi." },
  { lesson: 22, word: "decide", type: "verb", phonetic: "/dɪˈsaɪd/", meaning: "quyết định", audioUrl: "", exampleEn: "I decided to learn English.", exampleVi: "Tôi đã quyết định học tiếng Anh." },
  { lesson: 22, word: "choose", type: "verb", phonetic: "/tʃuːz/", meaning: "chọn", audioUrl: "", exampleEn: "You can choose any color you like.", exampleVi: "Bạn có thể chọn bất kỳ màu nào bạn thích." },
  { lesson: 22, word: "promise", type: "verb", phonetic: "/ˈprɒm.ɪs/", meaning: "hứa", audioUrl: "", exampleEn: "I promise I will call you.", exampleVi: "Tôi hứa tôi sẽ gọi cho bạn." },
  { lesson: 22, word: "goal", type: "noun", phonetic: "/ɡəʊl/", meaning: "mục tiêu", audioUrl: "", exampleEn: "My goal is to travel the world.", exampleVi: "Mục tiêu của tôi là đi du lịch vòng quanh thế giới." },
  { lesson: 22, word: "dream", type: "noun", phonetic: "/driːm/", meaning: "giấc mơ", audioUrl: "", exampleEn: "He has a dream of becoming an actor.", exampleVi: "Cậu ấy có một giấc mơ trở thành diễn viên." },
  { lesson: 22, word: "wish", type: "verb", phonetic: "/wɪʃ/", meaning: "ước mong", audioUrl: "", exampleEn: "I wish you good luck.", exampleVi: "Tôi ước mong bạn gặp may mắn." },
  { lesson: 22, word: "arrange", type: "verb", phonetic: "/əˈreɪndʒ/", meaning: "sắp xếp", audioUrl: "", exampleEn: "We arranged to meet at 6 PM.", exampleVi: "Chúng tôi đã sắp xếp để gặp nhau lúc 6 giờ tối." },
  { lesson: 22, word: "book", type: "verb", phonetic: "/bʊk/", meaning: "đặt trước", audioUrl: "", exampleEn: "I booked a table for two.", exampleVi: "Tôi đã đặt trước một bàn cho hai người." },
  { lesson: 22, word: "expect", type: "verb", phonetic: "/ɪkˈspekt/", meaning: "mong đợi", audioUrl: "", exampleEn: "We expect a lot of people to come.", exampleVi: "Chúng tôi mong đợi sẽ có nhiều người đến." },
  { lesson: 22, word: "tomorrow", type: "adverb", phonetic: "/təˈmɒr.əʊ/", meaning: "ngày mai", audioUrl: "", exampleEn: "I will see you tomorrow.", exampleVi: "Tôi sẽ gặp bạn vào ngày mai." },
  { lesson: 22, word: "soon", type: "adverb", phonetic: "/suːn/", meaning: "sớm", audioUrl: "", exampleEn: "They will arrive soon.", exampleVi: "Họ sẽ đến sớm thôi." },
  { lesson: 22, word: "later", type: "adverb", phonetic: "/ˈleɪ.tər/", meaning: "sau, muộn hơn", audioUrl: "", exampleEn: "I will call you later.", exampleVi: "Tôi sẽ gọi cho bạn sau." },
  { lesson: 22, word: "next", type: "adjective", phonetic: "/nekst/", meaning: "tiếp theo", audioUrl: "", exampleEn: "What is your next step?", exampleVi: "Bước tiếp theo của bạn là gì?" },
  { lesson: 22, word: "career", type: "noun", phonetic: "/kəˈrɪər/", meaning: "sự nghiệp", audioUrl: "", exampleEn: "She has a successful career.", exampleVi: "Cô ấy có một sự nghiệp thành công." },
  { lesson: 22, word: "university", type: "noun", phonetic: "/ˌjuː.nɪˈvɜː.sə.ti/", meaning: "trường đại học", audioUrl: "", exampleEn: "He plans to go to university.", exampleVi: "Cậu ấy dự định sẽ vào đại học." },
  { lesson: 22, word: "degree", type: "noun", phonetic: "/dɪˈɡriː/", meaning: "bằng cấp", audioUrl: "", exampleEn: "She has a degree in biology.", exampleVi: "Cô ấy có một tấm bằng sinh học." },
  { lesson: 22, word: "study", type: "verb", phonetic: "/ˈstʌd.i/", meaning: "học tập, nghiên cứu", audioUrl: "", exampleEn: "I will study hard for the test.", exampleVi: "Tôi sẽ học tập chăm chỉ cho bài kiểm tra." },

  // BÀI 23: Experiences (Trải nghiệm)
  { lesson: 23, word: "experience", type: "noun", phonetic: "/ɪkˈspɪə.ri.əns/", meaning: "trải nghiệm, kinh nghiệm", audioUrl: "", exampleEn: "Traveling is a great experience.", exampleVi: "Đi du lịch là một trải nghiệm tuyệt vời." },
  { lesson: 23, word: "happen", type: "verb", phonetic: "/ˈhæp.ən/", meaning: "xảy ra", audioUrl: "", exampleEn: "What happened yesterday?", exampleVi: "Điều gì đã xảy ra ngày hôm qua?" },
  { lesson: 23, word: "adventure", type: "noun", phonetic: "/ədˈven.tʃər/", meaning: "chuyến phiêu lưu", audioUrl: "", exampleEn: "They went on an exciting adventure.", exampleVi: "Họ đã tham gia vào một chuyến phiêu lưu thú vị." },
  { lesson: 23, word: "try", type: "verb", phonetic: "/traɪ/", meaning: "thử", audioUrl: "", exampleEn: "Have you ever tried sushi?", exampleVi: "Bạn đã từng thử ăn sushi chưa?" },
  { lesson: 23, word: "fail", type: "verb", phonetic: "/feɪl/", meaning: "thất bại, thi trượt", audioUrl: "", exampleEn: "Don't be afraid to fail.", exampleVi: "Đừng sợ thất bại." },
  { lesson: 23, word: "succeed", type: "verb", phonetic: "/səkˈsiːd/", meaning: "thành công", audioUrl: "", exampleEn: "If you work hard, you will succeed.", exampleVi: "Nếu bạn làm việc chăm chỉ, bạn sẽ thành công." },
  { lesson: 23, word: "win", type: "verb", phonetic: "/wɪn/", meaning: "chiến thắng", audioUrl: "", exampleEn: "She won the first prize.", exampleVi: "Cô ấy đã giành giải nhất." },
  { lesson: 23, word: "lose", type: "verb", phonetic: "/luːz/", meaning: "đánh mất, thua cuộc", audioUrl: "", exampleEn: "I lost my keys.", exampleVi: "Tôi đã làm mất chìa khóa." },
  { lesson: 23, word: "find", type: "verb", phonetic: "/faɪnd/", meaning: "tìm thấy", audioUrl: "", exampleEn: "Did you find your phone?", exampleVi: "Bạn đã tìm thấy điện thoại của mình chưa?" },
  { lesson: 23, word: "meet", type: "verb", phonetic: "/miːt/", meaning: "gặp gỡ", audioUrl: "", exampleEn: "I met a famous person.", exampleVi: "Tôi đã gặp một người nổi tiếng." },
  { lesson: 23, word: "visit", type: "verb", phonetic: "/ˈvɪz.ɪt/", meaning: "đến thăm", audioUrl: "", exampleEn: "Have you visited London?", exampleVi: "Bạn đã từng đến thăm London chưa?" },
  { lesson: 23, word: "see", type: "verb", phonetic: "/siː/", meaning: "nhìn thấy", audioUrl: "", exampleEn: "I have never seen snow.", exampleVi: "Tôi chưa từng nhìn thấy tuyết bao giờ." },
  { lesson: 23, word: "hear", type: "verb", phonetic: "/hɪər/", meaning: "nghe thấy", audioUrl: "", exampleEn: "I heard a strange noise.", exampleVi: "Tôi đã nghe thấy một tiếng động lạ." },
  { lesson: 23, word: "eat", type: "verb", phonetic: "/iːt/", meaning: "ăn", audioUrl: "", exampleEn: "I ate a delicious pizza.", exampleVi: "Tôi đã ăn một chiếc bánh pizza ngon tuyệt." },
  { lesson: 23, word: "drink", type: "verb", phonetic: "/drɪŋk/", meaning: "uống", audioUrl: "", exampleEn: "He drank all the water.", exampleVi: "Cậu ấy đã uống hết nước." },
  { lesson: 23, word: "ride", type: "verb", phonetic: "/raɪd/", meaning: "cưỡi", audioUrl: "", exampleEn: "Have you ever ridden a horse?", exampleVi: "Bạn đã từng cưỡi ngựa chưa?" },
  { lesson: 23, word: "fly", type: "verb", phonetic: "/flaɪ/", meaning: "bay", audioUrl: "", exampleEn: "I flew to Paris last year.", exampleVi: "Tôi đã bay tới Paris năm ngoái." },
  { lesson: 23, word: "drive", type: "verb", phonetic: "/draɪv/", meaning: "lái xe", audioUrl: "", exampleEn: "He drove the car too fast.", exampleVi: "Anh ấy đã lái xe quá nhanh." },
  { lesson: 23, word: "swim", type: "verb", phonetic: "/swɪm/", meaning: "bơi", audioUrl: "", exampleEn: "We swam in the ocean.", exampleVi: "Chúng tôi đã bơi trong đại dương." },
  { lesson: 23, word: "memory", type: "noun", phonetic: "/ˈmem.ər.i/", meaning: "kỷ niệm", audioUrl: "", exampleEn: "I have many happy memories.", exampleVi: "Tôi có rất nhiều kỷ niệm hạnh phúc." },

  // BÀI 24: Personal Information (Thông tin cá nhân)
  { lesson: 24, word: "name", type: "noun", phonetic: "/neɪm/", meaning: "tên", audioUrl: "", exampleEn: "What is your full name?", exampleVi: "Họ và tên đầy đủ của bạn là gì?" },
  { lesson: 24, word: "address", type: "noun", phonetic: "/əˈdres/", meaning: "địa chỉ", audioUrl: "", exampleEn: "Please write down your address.", exampleVi: "Vui lòng viết ra địa chỉ của bạn." },
  { lesson: 24, word: "age", type: "noun", phonetic: "/eɪdʒ/", meaning: "tuổi", audioUrl: "", exampleEn: "What is his age?", exampleVi: "Tuổi của anh ấy là bao nhiêu?" },
  { lesson: 24, word: "born", type: "verb", phonetic: "/bɔːn/", meaning: "được sinh ra", audioUrl: "", exampleEn: "I was born in 2010.", exampleVi: "Tôi sinh năm 2010." },
  { lesson: 24, word: "birthday", type: "noun", phonetic: "/ˈbɜːθ.deɪ/", meaning: "sinh nhật", audioUrl: "", exampleEn: "When is your birthday?", exampleVi: "Sinh nhật của bạn là khi nào?" },
  { lesson: 24, word: "country", type: "noun", phonetic: "/ˈkʌn.tri/", meaning: "quốc gia", audioUrl: "", exampleEn: "Which country are you from?", exampleVi: "Bạn đến từ quốc gia nào?" },
  { lesson: 24, word: "nationality", type: "noun", phonetic: "/ˌnæʃ.ənˈæl.ə.ti/", meaning: "quốc tịch", audioUrl: "", exampleEn: "What is your nationality?", exampleVi: "Quốc tịch của bạn là gì?" },
  { lesson: 24, word: "language", type: "noun", phonetic: "/ˈlæŋ.ɡwɪdʒ/", meaning: "ngôn ngữ", audioUrl: "", exampleEn: "My first language is Vietnamese.", exampleVi: "Ngôn ngữ mẹ đẻ của tôi là tiếng Việt." },
  { lesson: 24, word: "single", type: "adjective", phonetic: "/ˈsɪŋ.ɡəl/", meaning: "độc thân", audioUrl: "", exampleEn: "He is single.", exampleVi: "Anh ấy còn độc thân." },
  { lesson: 24, word: "married", type: "adjective", phonetic: "/ˈmær.id/", meaning: "đã kết hôn", audioUrl: "", exampleEn: "Are they married?", exampleVi: "Họ đã kết hôn chưa?" },
  { lesson: 24, word: "job", type: "noun", phonetic: "/dʒɒb/", meaning: "công việc", audioUrl: "", exampleEn: "What is your job?", exampleVi: "Công việc của bạn là gì?" },
  { lesson: 24, word: "student", type: "noun", phonetic: "/ˈstjuː.dənt/", meaning: "học sinh, sinh viên", audioUrl: "", exampleEn: "I am a high school student.", exampleVi: "Tôi là một học sinh trung học." },
  { lesson: 24, word: "hobby", type: "noun", phonetic: "/ˈhɒb.i/", meaning: "sở thích", audioUrl: "", exampleEn: "What are your hobbies?", exampleVi: "Sở thích của bạn là gì?" },
  { lesson: 24, word: "email", type: "noun", phonetic: "/ˈiː.meɪl/", meaning: "địa chỉ email", audioUrl: "", exampleEn: "Can I have your email address?", exampleVi: "Tôi có thể xin địa chỉ email của bạn không?" },
  { lesson: 24, word: "telephone", type: "noun", phonetic: "/ˈtel.ɪ.fəʊn/", meaning: "điện thoại", audioUrl: "", exampleEn: "What is your telephone number?", exampleVi: "Số điện thoại của bạn là gì?" },
  { lesson: 24, word: "number", type: "noun", phonetic: "/ˈnʌm.bər/", meaning: "con số", audioUrl: "", exampleEn: "Write your phone number here.", exampleVi: "Hãy viết số điện thoại của bạn ở đây." },
  { lesson: 24, word: "male", type: "adjective", phonetic: "/meɪl/", meaning: "nam giới", audioUrl: "", exampleEn: "The suspect is a male.", exampleVi: "Nghi phạm là một nam giới." },
  { lesson: 24, word: "female", type: "adjective", phonetic: "/ˈfiː.meɪl/", meaning: "nữ giới", audioUrl: "", exampleEn: "She is a female doctor.", exampleVi: "Cô ấy là một bác sĩ nữ." },
  { lesson: 24, word: "signature", type: "noun", phonetic: "/ˈsɪɡ.nə.tʃər/", meaning: "chữ ký", audioUrl: "", exampleEn: "Put your signature at the bottom.", exampleVi: "Hãy ký tên ở phía dưới." },
  { lesson: 24, word: "form", type: "noun", phonetic: "/fɔːm/", meaning: "mẫu đơn", audioUrl: "", exampleEn: "Please fill in this form.", exampleVi: "Vui lòng điền vào mẫu đơn này." },

  // BÀI 25: Final Review - KET (Ôn tập cuối khóa) - Tổng hợp từ vựng khó
  { lesson: 25, word: "accident", type: "noun", phonetic: "/ˈæk.sɪ.dənt/", meaning: "tai nạn", audioUrl: "", exampleEn: "I saw an accident on the road.", exampleVi: "Tôi đã nhìn thấy một vụ tai nạn trên đường." },
  { lesson: 25, word: "advantage", type: "noun", phonetic: "/ədˈvɑːn.tɪdʒ/", meaning: "lợi thế", audioUrl: "", exampleEn: "Being tall is an advantage in basketball.", exampleVi: "Có chiều cao là một lợi thế trong bóng rổ." },
  { lesson: 25, word: "advice", type: "noun", phonetic: "/ədˈvaɪs/", meaning: "lời khuyên", audioUrl: "", exampleEn: "Can you give me some advice?", exampleVi: "Bạn có thể cho tôi vài lời khuyên không?" },
  { lesson: 25, word: "attract", type: "verb", phonetic: "/əˈtrækt/", meaning: "thu hút", audioUrl: "", exampleEn: "The flowers attract bees.", exampleVi: "Những bông hoa thu hút bầy ong." },
  { lesson: 25, word: "beautiful", type: "adjective", phonetic: "/ˈbjuː.tɪ.fəl/", meaning: "xinh đẹp", audioUrl: "", exampleEn: "It is a beautiful city.", exampleVi: "Đó là một thành phố xinh đẹp." },
  { lesson: 25, word: "careful", type: "adjective", phonetic: "/ˈkeə.fəl/", meaning: "cẩn thận", audioUrl: "", exampleEn: "Be careful when crossing the street.", exampleVi: "Hãy cẩn thận khi băng qua đường." },
  { lesson: 25, word: "dangerous", type: "adjective", phonetic: "/ˈdeɪn.dʒər.əs/", meaning: "nguy hiểm", audioUrl: "", exampleEn: "It is dangerous to swim here.", exampleVi: "Bơi ở đây rất nguy hiểm." },
  { lesson: 25, word: "environment", type: "noun", phonetic: "/ɪnˈvaɪ.rən.mənt/", meaning: "môi trường", audioUrl: "", exampleEn: "We must protect the environment.", exampleVi: "Chúng ta phải bảo vệ môi trường." },
  { lesson: 25, word: "favorite", type: "adjective", phonetic: "/ˈfeɪ.vər.ɪt/", meaning: "yêu thích", audioUrl: "", exampleEn: "Blue is my favorite color.", exampleVi: "Màu xanh dương là màu yêu thích của tôi." },
  { lesson: 25, word: "important", type: "adjective", phonetic: "/ɪmˈpɔː.tənt/", meaning: "quan trọng", audioUrl: "", exampleEn: "This is an important message.", exampleVi: "Đây là một thông điệp quan trọng." },
  { lesson: 25, word: "impossible", type: "adjective", phonetic: "/ɪmˈpɒs.ə.bəl/", meaning: "không thể", audioUrl: "", exampleEn: "Nothing is impossible.", exampleVi: "Không có gì là không thể." },
  { lesson: 25, word: "information", type: "noun", phonetic: "/ˌɪn.fəˈmeɪ.ʃən/", meaning: "thông tin", audioUrl: "", exampleEn: "I need more information.", exampleVi: "Tôi cần thêm thông tin." },
  { lesson: 25, word: "knowledge", type: "noun", phonetic: "/ˈnɒl.ɪdʒ/", meaning: "kiến thức", audioUrl: "", exampleEn: "Reading improves your knowledge.", exampleVi: "Việc đọc sách cải thiện kiến thức của bạn." },
  { lesson: 25, word: "machine", type: "noun", phonetic: "/məˈʃiːn/", meaning: "máy móc", audioUrl: "", exampleEn: "The washing machine is broken.", exampleVi: "Cái máy giặt bị hỏng rồi." },
  { lesson: 25, word: "necessary", type: "adjective", phonetic: "/ˈnes.ə.ser.i/", meaning: "cần thiết", audioUrl: "", exampleEn: "Sleep is necessary for health.", exampleVi: "Giấc ngủ là cần thiết cho sức khỏe." },
  { lesson: 25, word: "opportunity", type: "noun", phonetic: "/ˌɒp.əˈtʃuː.nə.ti/", meaning: "cơ hội", audioUrl: "", exampleEn: "This is a great opportunity.", exampleVi: "Đây là một cơ hội tuyệt vời." },
  { lesson: 25, word: "popular", type: "adjective", phonetic: "/ˈpɒp.jə.lər/", meaning: "phổ biến", audioUrl: "", exampleEn: "Football is a popular sport.", exampleVi: "Bóng đá là một môn thể thao phổ biến." },
  { lesson: 25, word: "possible", type: "adjective", phonetic: "/ˈpɒs.ə.bəl/", meaning: "có thể", audioUrl: "", exampleEn: "It is possible to win.", exampleVi: "Việc chiến thắng là có thể xảy ra." },
  { lesson: 25, word: "problem", type: "noun", phonetic: "/ˈprɒb.ləm/", meaning: "vấn đề", audioUrl: "", exampleEn: "We need to solve this problem.", exampleVi: "Chúng ta cần phải giải quyết vấn đề này." },
  { lesson: 25, word: "successful", type: "adjective", phonetic: "/səkˈses.fəl/", meaning: "thành công", audioUrl: "", exampleEn: "She is a successful business woman.", exampleVi: "Cô ấy là một nữ doanh nhân thành công." }
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

  console.log(`\n🎉 Hoàn thành nạp ${successCount} từ vựng Batch 5 cho KET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

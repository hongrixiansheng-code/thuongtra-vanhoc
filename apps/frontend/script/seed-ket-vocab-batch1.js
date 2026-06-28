/**
 * SEED SCRIPT: YLE KET Vocabulary — Batch 1 (Bài 1 - 5)
 * Chạy từ thư mục gốc: node seed-ket-vocab-batch1.js
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 1: Daily Life (Cuộc sống thường ngày)
  { lesson: 1, word: "daily", type: "adjective", phonetic: "/ˈdeɪ.li/", meaning: "hằng ngày", audioUrl: "", exampleEn: "Exercise is part of my daily routine.", exampleVi: "Tập thể dục là một phần thói quen hằng ngày của tôi." },
  { lesson: 1, word: "routine", type: "noun", phonetic: "/ruːˈtiːn/", meaning: "thói quen, công việc thường ngày", audioUrl: "", exampleEn: "I have a strict morning routine.", exampleVi: "Tôi có một thói quen buổi sáng rất nghiêm ngặt." },
  { lesson: 1, word: "wake up", type: "phrasal verb", phonetic: "/weɪk ʌp/", meaning: "thức dậy", audioUrl: "", exampleEn: "I wake up at 6 AM every day.", exampleVi: "Tôi thức dậy lúc 6 giờ sáng mỗi ngày." },
  { lesson: 1, word: "brush", type: "verb", phonetic: "/brʌʃ/", meaning: "đánh, chải", audioUrl: "", exampleEn: "Don't forget to brush your teeth.", exampleVi: "Đừng quên đánh răng nhé." },
  { lesson: 1, word: "shower", type: "noun", phonetic: "/ˈʃaʊ.ər/", meaning: "vòi hoa sen, sự tắm vòi sen", audioUrl: "", exampleEn: "I usually take a quick shower.", exampleVi: "Tôi thường tắm vòi hoa sen nhanh gọn." },
  { lesson: 1, word: "breakfast", type: "noun", phonetic: "/ˈbrek.fəst/", meaning: "bữa sáng", audioUrl: "", exampleEn: "What did you have for breakfast?", exampleVi: "Bạn đã ăn gì cho bữa sáng?" },
  { lesson: 1, word: "ready", type: "adjective", phonetic: "/ˈred.i/", meaning: "sẵn sàng", audioUrl: "", exampleEn: "Are you ready to go?", exampleVi: "Bạn đã sẵn sàng để đi chưa?" },
  { lesson: 1, word: "leave", type: "verb", phonetic: "/liːv/", meaning: "rời khỏi", audioUrl: "", exampleEn: "I leave the house at 7:30.", exampleVi: "Tôi rời khỏi nhà lúc 7:30." },
  { lesson: 1, word: "catch", type: "verb", phonetic: "/kætʃ/", meaning: "bắt (xe, tàu)", audioUrl: "", exampleEn: "I have to catch the bus to school.", exampleVi: "Tôi phải bắt xe buýt đến trường." },
  { lesson: 1, word: "arrive", type: "verb", phonetic: "/əˈraɪv/", meaning: "đến nơi", audioUrl: "", exampleEn: "We arrived at the station late.", exampleVi: "Chúng tôi đã đến nhà ga muộn." },
  { lesson: 1, word: "break", type: "noun", phonetic: "/breɪk/", meaning: "giờ giải lao", audioUrl: "", exampleEn: "Let's take a ten-minute break.", exampleVi: "Hãy nghỉ giải lao mười phút nhé." },
  { lesson: 1, word: "lunch", type: "noun", phonetic: "/lʌntʃ/", meaning: "bữa trưa", audioUrl: "", exampleEn: "We have lunch at noon.", exampleVi: "Chúng tôi ăn trưa vào buổi trưa." },
  { lesson: 1, word: "finish", type: "verb", phonetic: "/ˈfɪn.ɪʃ/", meaning: "hoàn thành, kết thúc", audioUrl: "", exampleEn: "School finishes at 4 PM.", exampleVi: "Trường học kết thúc lúc 4 giờ chiều." },
  { lesson: 1, word: "return", type: "verb", phonetic: "/rɪˈtɜːn/", meaning: "trở về", audioUrl: "", exampleEn: "He returned home after work.", exampleVi: "Anh ấy đã trở về nhà sau giờ làm việc." },
  { lesson: 1, word: "relax", type: "verb", phonetic: "/rɪˈlæks/", meaning: "thư giãn", audioUrl: "", exampleEn: "I like to relax by watching TV.", exampleVi: "Tôi thích thư giãn bằng cách xem TV." },
  { lesson: 1, word: "dinner", type: "noun", phonetic: "/ˈdɪn.ər/", meaning: "bữa tối", audioUrl: "", exampleEn: "Dinner is ready!", exampleVi: "Bữa tối đã sẵn sàng!" },
  { lesson: 1, word: "homework", type: "noun", phonetic: "/ˈhəʊm.wɜːk/", meaning: "bài tập về nhà", audioUrl: "", exampleEn: "I must do my homework now.", exampleVi: "Tôi phải làm bài tập về nhà bây giờ." },
  { lesson: 1, word: "tidy", type: "verb", phonetic: "/ˈtaɪ.di/", meaning: "dọn dẹp", audioUrl: "", exampleEn: "Please tidy your room.", exampleVi: "Vui lòng dọn dẹp phòng của bạn." },
  { lesson: 1, word: "wash", type: "verb", phonetic: "/wɒʃ/", meaning: "rửa, giặt", audioUrl: "", exampleEn: "Can you wash the dishes?", exampleVi: "Bạn có thể rửa bát không?" },
  { lesson: 1, word: "sleep", type: "verb", phonetic: "/sliːp/", meaning: "ngủ", audioUrl: "", exampleEn: "I need to get some sleep.", exampleVi: "Tôi cần phải ngủ một chút." },

  // BÀI 2: People and Family (Con người và Gia đình)
  { lesson: 2, word: "parent", type: "noun", phonetic: "/ˈpeə.rənt/", meaning: "cha hoặc mẹ", audioUrl: "", exampleEn: "My parents are very supportive.", exampleVi: "Bố mẹ tôi rất ủng hộ tôi." },
  { lesson: 2, word: "grandparent", type: "noun", phonetic: "/ˈɡræn.peə.rənt/", meaning: "ông hoặc bà", audioUrl: "", exampleEn: "I visit my grandparents on Sundays.", exampleVi: "Tôi đi thăm ông bà vào các ngày Chủ nhật." },
  { lesson: 2, word: "cousin", type: "noun", phonetic: "/ˈkʌz.ən/", meaning: "anh/chị/em họ", audioUrl: "", exampleEn: "My cousin lives in Canada.", exampleVi: "Anh họ của tôi sống ở Canada." },
  { lesson: 2, word: "uncle", type: "noun", phonetic: "/ˈʌŋ.kəl/", meaning: "chú, bác, cậu", audioUrl: "", exampleEn: "My uncle is a pilot.", exampleVi: "Chú của tôi là một phi công." },
  { lesson: 2, word: "aunt", type: "noun", phonetic: "/ɑːnt/", meaning: "cô, dì, bác gái", audioUrl: "", exampleEn: "My aunt makes the best cakes.", exampleVi: "Dì của tôi làm bánh ngon nhất." },
  { lesson: 2, word: "nephew", type: "noun", phonetic: "/ˈnef.juː/", meaning: "cháu trai (của cô/chú)", audioUrl: "", exampleEn: "My nephew is three years old.", exampleVi: "Cháu trai tôi được ba tuổi." },
  { lesson: 2, word: "niece", type: "noun", phonetic: "/niːs/", meaning: "cháu gái (của cô/chú)", audioUrl: "", exampleEn: "I bought a gift for my niece.", exampleVi: "Tôi đã mua một món quà cho cháu gái." },
  { lesson: 2, word: "guest", type: "noun", phonetic: "/ɡest/", meaning: "khách", audioUrl: "", exampleEn: "We have some guests for dinner.", exampleVi: "Chúng tôi có vài người khách cho bữa tối." },
  { lesson: 2, word: "neighbor", type: "noun", phonetic: "/ˈneɪ.bər/", meaning: "người hàng xóm", audioUrl: "", exampleEn: "Our neighbor is very friendly.", exampleVi: "Người hàng xóm của chúng tôi rất thân thiện." },
  { lesson: 2, word: "friend", type: "noun", phonetic: "/frend/", meaning: "bạn bè", audioUrl: "", exampleEn: "He is my best friend.", exampleVi: "Cậu ấy là bạn thân nhất của tôi." },
  { lesson: 2, word: "boy", type: "noun", phonetic: "/bɔɪ/", meaning: "cậu bé", audioUrl: "", exampleEn: "The boy is playing with a ball.", exampleVi: "Cậu bé đang chơi với một quả bóng." },
  { lesson: 2, word: "girl", type: "noun", phonetic: "/ɡɜːl/", meaning: "cô bé", audioUrl: "", exampleEn: "The girl is reading a book.", exampleVi: "Cô bé đang đọc một cuốn sách." },
  { lesson: 2, word: "man", type: "noun", phonetic: "/mæn/", meaning: "người đàn ông", audioUrl: "", exampleEn: "That man is my teacher.", exampleVi: "Người đàn ông đó là thầy giáo của tôi." },
  { lesson: 2, word: "woman", type: "noun", phonetic: "/ˈwʊm.ən/", meaning: "người phụ nữ", audioUrl: "", exampleEn: "The woman over there is my mother.", exampleVi: "Người phụ nữ ở đằng kia là mẹ tôi." },
  { lesson: 2, word: "child", type: "noun", phonetic: "/tʃaɪld/", meaning: "đứa trẻ", audioUrl: "", exampleEn: "The child is crying.", exampleVi: "Đứa trẻ đang khóc." },
  { lesson: 2, word: "person", type: "noun", phonetic: "/ˈpɜː.sən/", meaning: "con người (số ít)", audioUrl: "", exampleEn: "She is a very nice person.", exampleVi: "Cô ấy là một người rất tốt." },
  { lesson: 2, word: "people", type: "noun", phonetic: "/ˈpiː.pəl/", meaning: "mọi người (số nhiều)", audioUrl: "", exampleEn: "There are many people in the park.", exampleVi: "Có rất nhiều người trong công viên." },
  { lesson: 2, word: "young", type: "adjective", phonetic: "/jʌŋ/", meaning: "trẻ tuổi", audioUrl: "", exampleEn: "He is a young doctor.", exampleVi: "Anh ấy là một bác sĩ trẻ." },
  { lesson: 2, word: "old", type: "adjective", phonetic: "/əʊld/", meaning: "già, lớn tuổi", audioUrl: "", exampleEn: "My grandfather is very old.", exampleVi: "Ông của tôi đã rất già." },
  { lesson: 2, word: "tall", type: "adjective", phonetic: "/tɔːl/", meaning: "cao", audioUrl: "", exampleEn: "She is a tall girl.", exampleVi: "Cô ấy là một cô gái cao." },

  // BÀI 3: Hobbies and Leisure (Sở thích và Giải trí)
  { lesson: 3, word: "hobby", type: "noun", phonetic: "/ˈhɒb.i/", meaning: "sở thích", audioUrl: "", exampleEn: "My hobby is reading books.", exampleVi: "Sở thích của tôi là đọc sách." },
  { lesson: 3, word: "leisure", type: "noun", phonetic: "/ˈleʒ.ər/", meaning: "thời gian rảnh rỗi", audioUrl: "", exampleEn: "What do you do in your leisure time?", exampleVi: "Bạn làm gì trong thời gian rảnh rỗi?" },
  { lesson: 3, word: "collect", type: "verb", phonetic: "/kəˈlekt/", meaning: "sưu tầm", audioUrl: "", exampleEn: "I collect old coins.", exampleVi: "Tôi sưu tầm những đồng xu cổ." },
  { lesson: 3, word: "stamp", type: "noun", phonetic: "/stæmp/", meaning: "con tem", audioUrl: "", exampleEn: "He has a big stamp collection.", exampleVi: "Anh ấy có một bộ sưu tập tem lớn." },
  { lesson: 3, word: "draw", type: "verb", phonetic: "/drɔː/", meaning: "vẽ", audioUrl: "", exampleEn: "She loves to draw animals.", exampleVi: "Cô ấy thích vẽ động vật." },
  { lesson: 3, word: "paint", type: "verb", phonetic: "/peɪnt/", meaning: "tô màu, vẽ tranh", audioUrl: "", exampleEn: "I paint pictures in my free time.", exampleVi: "Tôi vẽ tranh vào thời gian rảnh." },
  { lesson: 3, word: "sing", type: "verb", phonetic: "/sɪŋ/", meaning: "hát", audioUrl: "", exampleEn: "They sing in a choir.", exampleVi: "Họ hát trong một dàn đồng ca." },
  { lesson: 3, word: "dance", type: "verb", phonetic: "/dɑːns/", meaning: "nhảy múa", audioUrl: "", exampleEn: "Can you dance to this music?", exampleVi: "Bạn có thể nhảy theo điệu nhạc này không?" },
  { lesson: 3, word: "music", type: "noun", phonetic: "/ˈmjuː.zɪk/", meaning: "âm nhạc", audioUrl: "", exampleEn: "I listen to music every night.", exampleVi: "Tôi nghe nhạc mỗi tối." },
  { lesson: 3, word: "instrument", type: "noun", phonetic: "/ˈɪn.strə.mənt/", meaning: "nhạc cụ", audioUrl: "", exampleEn: "Do you play any musical instrument?", exampleVi: "Bạn có chơi loại nhạc cụ nào không?" },
  { lesson: 3, word: "guitar", type: "noun", phonetic: "/ɡɪˈtɑːr/", meaning: "đàn ghi-ta", audioUrl: "", exampleEn: "He is playing the guitar.", exampleVi: "Anh ấy đang chơi đàn ghi-ta." },
  { lesson: 3, word: "piano", type: "noun", phonetic: "/piˈæn.əʊ/", meaning: "đàn piano", audioUrl: "", exampleEn: "She plays the piano beautifully.", exampleVi: "Cô ấy chơi piano rất hay." },
  { lesson: 3, word: "game", type: "noun", phonetic: "/ɡeɪm/", meaning: "trò chơi", audioUrl: "", exampleEn: "Let's play a board game.", exampleVi: "Hãy cùng chơi một trò chơi cờ bàn." },
  { lesson: 3, word: "puzzle", type: "noun", phonetic: "/ˈpʌz.əl/", meaning: "câu đố, xếp hình", audioUrl: "", exampleEn: "I am doing a jigsaw puzzle.", exampleVi: "Tôi đang chơi xếp hình." },
  { lesson: 3, word: "chess", type: "noun", phonetic: "/tʃes/", meaning: "cờ vua", audioUrl: "", exampleEn: "My dad taught me how to play chess.", exampleVi: "Bố tôi đã dạy tôi cách chơi cờ vua." },
  { lesson: 3, word: "photograph", type: "noun", phonetic: "/ˈfəʊ.tə.ɡrɑːf/", meaning: "bức ảnh", audioUrl: "", exampleEn: "Can I take a photograph of you?", exampleVi: "Tôi có thể chụp một bức ảnh của bạn không?" },
  { lesson: 3, word: "camera", type: "noun", phonetic: "/ˈkæm.rə/", meaning: "máy ảnh", audioUrl: "", exampleEn: "I bought a new camera.", exampleVi: "Tôi đã mua một chiếc máy ảnh mới." },
  { lesson: 3, word: "read", type: "verb", phonetic: "/riːd/", meaning: "đọc", audioUrl: "", exampleEn: "I like to read novels.", exampleVi: "Tôi thích đọc tiểu thuyết." },
  { lesson: 3, word: "magazine", type: "noun", phonetic: "/ˌmæɡ.əˈziːn/", meaning: "tạp chí", audioUrl: "", exampleEn: "She is reading a fashion magazine.", exampleVi: "Cô ấy đang đọc một tạp chí thời trang." },
  { lesson: 3, word: "comic", type: "noun", phonetic: "/ˈkɒm.ɪk/", meaning: "truyện tranh", audioUrl: "", exampleEn: "Kids love reading comic books.", exampleVi: "Trẻ em thích đọc truyện tranh." },

  // BÀI 4: Places and Buildings (Địa điểm và Tòa nhà)
  { lesson: 4, word: "building", type: "noun", phonetic: "/ˈbɪl.dɪŋ/", meaning: "tòa nhà", audioUrl: "", exampleEn: "That is the tallest building in the city.", exampleVi: "Đó là tòa nhà cao nhất thành phố." },
  { lesson: 4, word: "hospital", type: "noun", phonetic: "/ˈhɒs.pɪ.təl/", meaning: "bệnh viện", audioUrl: "", exampleEn: "The doctor works in a hospital.", exampleVi: "Bác sĩ làm việc trong một bệnh viện." },
  { lesson: 4, word: "bank", type: "noun", phonetic: "/bæŋk/", meaning: "ngân hàng", audioUrl: "", exampleEn: "I need to go to the bank to get some money.", exampleVi: "Tôi cần đến ngân hàng để lấy một ít tiền." },
  { lesson: 4, word: "library", type: "noun", phonetic: "/ˈlaɪ.brər.i/", meaning: "thư viện", audioUrl: "", exampleEn: "You must be quiet in the library.", exampleVi: "Bạn phải giữ yên lặng trong thư viện." },
  { lesson: 4, word: "museum", type: "noun", phonetic: "/mjuːˈziː.əm/", meaning: "bảo tàng", audioUrl: "", exampleEn: "We visited the history museum.", exampleVi: "Chúng tôi đã tham quan bảo tàng lịch sử." },
  { lesson: 4, word: "factory", type: "noun", phonetic: "/ˈfæk.tər.i/", meaning: "nhà máy", audioUrl: "", exampleEn: "Many people work in this car factory.", exampleVi: "Nhiều người làm việc trong nhà máy sản xuất ô tô này." },
  { lesson: 4, word: "airport", type: "noun", phonetic: "/ˈeə.pɔːt/", meaning: "sân bay", audioUrl: "", exampleEn: "We took a taxi to the airport.", exampleVi: "Chúng tôi đã đi taxi đến sân bay." },
  { lesson: 4, word: "station", type: "noun", phonetic: "/ˈsteɪ.ʃən/", meaning: "nhà ga, trạm", audioUrl: "", exampleEn: "I will meet you at the train station.", exampleVi: "Tôi sẽ gặp bạn ở ga tàu." },
  { lesson: 4, word: "police", type: "noun", phonetic: "/pəˈliːs/", meaning: "cảnh sát", audioUrl: "", exampleEn: "Call the police immediately!", exampleVi: "Hãy gọi cảnh sát ngay lập tức!" },
  { lesson: 4, word: "post office", type: "noun", phonetic: "/ˈpəʊst ˌɒf.ɪs/", meaning: "bưu điện", audioUrl: "", exampleEn: "I am going to the post office to send a letter.", exampleVi: "Tôi đang đến bưu điện để gửi một bức thư." },
  { lesson: 4, word: "supermarket", type: "noun", phonetic: "/ˈsuː.pəˌmɑː.kɪt/", meaning: "siêu thị", audioUrl: "", exampleEn: "We buy our food at the supermarket.", exampleVi: "Chúng tôi mua thức ăn ở siêu thị." },
  { lesson: 4, word: "market", type: "noun", phonetic: "/ˈmɑː.kɪt/", meaning: "chợ", audioUrl: "", exampleEn: "They sell fresh fruits at the local market.", exampleVi: "Họ bán trái cây tươi ở khu chợ địa phương." },
  { lesson: 4, word: "restaurant", type: "noun", phonetic: "/ˈres.trɒnt/", meaning: "nhà hàng", audioUrl: "", exampleEn: "We had a delicious meal at the new restaurant.", exampleVi: "Chúng tôi đã có một bữa ăn ngon tại nhà hàng mới." },
  { lesson: 4, word: "cafe", type: "noun", phonetic: "/ˈkæf.eɪ/", meaning: "quán cà phê", audioUrl: "", exampleEn: "Let's grab a coffee at the cafe.", exampleVi: "Hãy đi uống cà phê ở quán cà phê nhé." },
  { lesson: 4, word: "cinema", type: "noun", phonetic: "/ˈsɪn.ə.mə/", meaning: "rạp chiếu phim", audioUrl: "", exampleEn: "We are going to the cinema tonight.", exampleVi: "Tối nay chúng tôi sẽ đi rạp chiếu phim." },
  { lesson: 4, word: "theatre", type: "noun", phonetic: "/ˈθɪə.tər/", meaning: "nhà hát", audioUrl: "", exampleEn: "They watched a play at the theatre.", exampleVi: "Họ đã xem một vở kịch tại nhà hát." },
  { lesson: 4, word: "stadium", type: "noun", phonetic: "/ˈsteɪ.di.əm/", meaning: "sân vận động", audioUrl: "", exampleEn: "The football match is at the national stadium.", exampleVi: "Trận đấu bóng đá diễn ra ở sân vận động quốc gia." },
  { lesson: 4, word: "park", type: "noun", phonetic: "/pɑːk/", meaning: "công viên", audioUrl: "", exampleEn: "Children love playing in the park.", exampleVi: "Trẻ con thích chơi trong công viên." },
  { lesson: 4, word: "square", type: "noun", phonetic: "/skweər/", meaning: "quảng trường", audioUrl: "", exampleEn: "There is a big statue in the city square.", exampleVi: "Có một bức tượng lớn ở quảng trường thành phố." },
  { lesson: 4, word: "street", type: "noun", phonetic: "/striːt/", meaning: "con đường, phố", audioUrl: "", exampleEn: "She lives on Main Street.", exampleVi: "Cô ấy sống trên phố Main." },

  // BÀI 5: Transport and Travel (Giao thông và Du lịch)
  { lesson: 5, word: "transport", type: "noun", phonetic: "/ˈtræn.spɔːt/", meaning: "phương tiện giao thông", audioUrl: "", exampleEn: "Public transport is cheap here.", exampleVi: "Giao thông công cộng ở đây rất rẻ." },
  { lesson: 5, word: "travel", type: "verb", phonetic: "/ˈtræv.əl/", meaning: "du lịch, đi lại", audioUrl: "", exampleEn: "I want to travel around the world.", exampleVi: "Tôi muốn đi du lịch vòng quanh thế giới." },
  { lesson: 5, word: "journey", type: "noun", phonetic: "/ˈdʒɜː.ni/", meaning: "chuyến đi, hành trình", audioUrl: "", exampleEn: "It was a long journey by train.", exampleVi: "Đó là một hành trình dài bằng tàu hỏa." },
  { lesson: 5, word: "ticket", type: "noun", phonetic: "/ˈtɪk.ɪt/", meaning: "vé", audioUrl: "", exampleEn: "Can I see your ticket, please?", exampleVi: "Cho tôi xem vé của bạn nhé?" },
  { lesson: 5, word: "passenger", type: "noun", phonetic: "/ˈpæs.ən.dʒər/", meaning: "hành khách", audioUrl: "", exampleEn: "The bus can carry 50 passengers.", exampleVi: "Xe buýt có thể chở 50 hành khách." },
  { lesson: 5, word: "luggage", type: "noun", phonetic: "/ˈlʌɡ.ɪdʒ/", meaning: "hành lý", audioUrl: "", exampleEn: "Where is my luggage?", exampleVi: "Hành lý của tôi đâu?" },
  { lesson: 5, word: "flight", type: "noun", phonetic: "/flaɪt/", meaning: "chuyến bay", audioUrl: "", exampleEn: "My flight departs at 8 AM.", exampleVi: "Chuyến bay của tôi khởi hành lúc 8 giờ sáng." },
  { lesson: 5, word: "delay", type: "verb", phonetic: "/dɪˈleɪ/", meaning: "trì hoãn", audioUrl: "", exampleEn: "The flight was delayed because of bad weather.", exampleVi: "Chuyến bay bị hoãn vì thời tiết xấu." },
  { lesson: 5, word: "bicycle", type: "noun", phonetic: "/ˈbaɪ.sɪ.kəl/", meaning: "xe đạp", audioUrl: "", exampleEn: "He rides his bicycle to work.", exampleVi: "Anh ấy đạp xe đi làm." },
  { lesson: 5, word: "motorbike", type: "noun", phonetic: "/ˈməʊ.tə.baɪk/", meaning: "xe máy", audioUrl: "", exampleEn: "I bought a new motorbike.", exampleVi: "Tôi đã mua một chiếc xe máy mới." },
  { lesson: 5, word: "bus", type: "noun", phonetic: "/bʌs/", meaning: "xe buýt", audioUrl: "", exampleEn: "The bus stops here.", exampleVi: "Xe buýt dừng ở đây." },
  { lesson: 5, word: "train", type: "noun", phonetic: "/treɪn/", meaning: "tàu hỏa", audioUrl: "", exampleEn: "We took the train to London.", exampleVi: "Chúng tôi đã đi tàu đến London." },
  { lesson: 5, word: "plane", type: "noun", phonetic: "/pleɪn/", meaning: "máy bay", audioUrl: "", exampleEn: "I like flying by plane.", exampleVi: "Tôi thích bay bằng máy bay." },
  { lesson: 5, word: "boat", type: "noun", phonetic: "/bəʊt/", meaning: "thuyền", audioUrl: "", exampleEn: "We rented a small boat for fishing.", exampleVi: "Chúng tôi đã thuê một chiếc thuyền nhỏ để câu cá." },
  { lesson: 5, word: "ship", type: "noun", phonetic: "/ʃɪp/", meaning: "tàu thủy", audioUrl: "", exampleEn: "The ship crossed the ocean.", exampleVi: "Con tàu đã vượt đại dương." },
  { lesson: 5, word: "drive", type: "verb", phonetic: "/draɪv/", meaning: "lái xe", audioUrl: "", exampleEn: "Can you drive a car?", exampleVi: "Bạn có biết lái xe hơi không?" },
  { lesson: 5, word: "ride", type: "verb", phonetic: "/raɪd/", meaning: "cưỡi, đạp xe", audioUrl: "", exampleEn: "I learned to ride a horse.", exampleVi: "Tôi đã học cưỡi ngựa." },
  { lesson: 5, word: "fly", type: "verb", phonetic: "/flaɪ/", meaning: "bay", audioUrl: "", exampleEn: "Birds can fly.", exampleVi: "Những chú chim có thể bay." },
  { lesson: 5, word: "walk", type: "verb", phonetic: "/wɔːk/", meaning: "đi bộ", audioUrl: "", exampleEn: "I usually walk to the park.", exampleVi: "Tôi thường đi bộ đến công viên." },
  { lesson: 5, word: "map", type: "noun", phonetic: "/mæp/", meaning: "bản đồ", audioUrl: "", exampleEn: "We looked at the map to find our way.", exampleVi: "Chúng tôi đã nhìn vào bản đồ để tìm đường." }
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
  if (!vocabLesson) {
    console.error('❌ Không tìm thấy Lesson "Kho từ vựng" (orderIndex: 9999)');
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
        data: {
          lessonId: targetLesson.id,
          contentType: 'VOCABULARY',
          content: contentJson,
        }
      });
      await prisma.lessonContent.create({
        data: {
          lessonId: vocabLesson.id,
          contentType: 'VOCABULARY',
          content: contentJson,
        }
      });
      successCount++;
      console.log(`✅ Đã thêm từ: ${item.word} (Bài ${item.lesson})`);
    } else {
      console.log(`⏩ Đã tồn tại từ: ${item.word}`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp ${successCount} từ vựng Batch 1 cho KET!`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

/**
 * SEED SCRIPT: YLE KET Vocabulary — Batch 3 (Bài 11 - 15)
 * Chạy từ thư mục gốc: node seed-ket-vocab-batch3.js
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 11: The Natural World (Thế giới tự nhiên)
  { lesson: 11, word: "nature", type: "noun", phonetic: "/ˈneɪ.tʃər/", meaning: "thiên nhiên", audioUrl: "", exampleEn: "I love spending time in nature.", exampleVi: "Tôi thích dành thời gian hòa mình vào thiên nhiên." },
  { lesson: 11, word: "mountain", type: "noun", phonetic: "/ˈmaʊn.tɪn/", meaning: "ngọn núi", audioUrl: "", exampleEn: "They climbed the highest mountain.", exampleVi: "Họ đã leo lên ngọn núi cao nhất." },
  { lesson: 11, word: "hill", type: "noun", phonetic: "/hɪl/", meaning: "đồi", audioUrl: "", exampleEn: "Our house is on top of a hill.", exampleVi: "Nhà của chúng tôi ở trên đỉnh đồi." },
  { lesson: 11, word: "forest", type: "noun", phonetic: "/ˈfɒr.ɪst/", meaning: "khu rừng", audioUrl: "", exampleEn: "Many animals live in the forest.", exampleVi: "Nhiều loài động vật sống trong khu rừng." },
  { lesson: 11, word: "jungle", type: "noun", phonetic: "/ˈdʒʌŋ.ɡəl/", meaning: "rừng nhiệt đới", audioUrl: "", exampleEn: "Tigers live in the jungle.", exampleVi: "Hổ sống ở trong rừng nhiệt đới." },
  { lesson: 11, word: "river", type: "noun", phonetic: "/ˈrɪv.ər/", meaning: "dòng sông", audioUrl: "", exampleEn: "We swam in the river.", exampleVi: "Chúng tôi đã bơi trên dòng sông." },
  { lesson: 11, word: "lake", type: "noun", phonetic: "/leɪk/", meaning: "hồ nước", audioUrl: "", exampleEn: "They went fishing on the lake.", exampleVi: "Họ đã đi câu cá trên hồ." },
  { lesson: 11, word: "sea", type: "noun", phonetic: "/siː/", meaning: "biển", audioUrl: "", exampleEn: "I love the smell of the sea.", exampleVi: "Tôi thích mùi của biển." },
  { lesson: 11, word: "ocean", type: "noun", phonetic: "/ˈəʊ.ʃən/", meaning: "đại dương", audioUrl: "", exampleEn: "The Pacific is the largest ocean.", exampleVi: "Thái Bình Dương là đại dương lớn nhất." },
  { lesson: 11, word: "beach", type: "noun", phonetic: "/biːtʃ/", meaning: "bãi biển", audioUrl: "", exampleEn: "We walked along the beach.", exampleVi: "Chúng tôi đã đi dạo dọc theo bãi biển." },
  { lesson: 11, word: "island", type: "noun", phonetic: "/ˈaɪ.lənd/", meaning: "hòn đảo", audioUrl: "", exampleEn: "They spent their holiday on a small island.", exampleVi: "Họ đã dành kỳ nghỉ trên một hòn đảo nhỏ." },
  { lesson: 11, word: "plant", type: "noun", phonetic: "/plɑːnt/", meaning: "thực vật, cây trồng", audioUrl: "", exampleEn: "I bought a new plant for my room.", exampleVi: "Tôi đã mua một cái cây mới cho phòng của mình." },
  { lesson: 11, word: "tree", type: "noun", phonetic: "/triː/", meaning: "cây cối", audioUrl: "", exampleEn: "There is a big apple tree in the garden.", exampleVi: "Có một cây táo lớn trong khu vườn." },
  { lesson: 11, word: "leaf", type: "noun", phonetic: "/liːf/", meaning: "chiếc lá", audioUrl: "", exampleEn: "The leaves fall in autumn.", exampleVi: "Những chiếc lá rụng vào mùa thu." },
  { lesson: 11, word: "flower", type: "noun", phonetic: "/ˈflaʊ.ər/", meaning: "bông hoa", audioUrl: "", exampleEn: "She received a bunch of flowers.", exampleVi: "Cô ấy đã nhận được một bó hoa." },
  { lesson: 11, word: "grass", type: "noun", phonetic: "/ɡrɑːs/", meaning: "cỏ", audioUrl: "", exampleEn: "Please keep off the grass.", exampleVi: "Vui lòng không giẫm lên cỏ." },
  { lesson: 11, word: "animal", type: "noun", phonetic: "/ˈæn.ɪ.məl/", meaning: "động vật", audioUrl: "", exampleEn: "The zoo has many different animals.", exampleVi: "Sở thú có rất nhiều loài động vật khác nhau." },
  { lesson: 11, word: "bird", type: "noun", phonetic: "/bɜːd/", meaning: "con chim", audioUrl: "", exampleEn: "A little bird is singing on the tree.", exampleVi: "Một chú chim nhỏ đang hót trên cây." },
  { lesson: 11, word: "insect", type: "noun", phonetic: "/ˈɪn.sekt/", meaning: "côn trùng", audioUrl: "", exampleEn: "Bees and ants are insects.", exampleVi: "Ong và kiến là các loài côn trùng." },
  { lesson: 11, word: "sky", type: "noun", phonetic: "/skaɪ/", meaning: "bầu trời", audioUrl: "", exampleEn: "The sky is blue today.", exampleVi: "Bầu trời hôm nay màu xanh." },

  // BÀI 12: Weather and Climate (Thời tiết và Khí hậu)
  { lesson: 12, word: "weather", type: "noun", phonetic: "/ˈweð.ər/", meaning: "thời tiết", audioUrl: "", exampleEn: "What's the weather like today?", exampleVi: "Thời tiết hôm nay như thế nào?" },
  { lesson: 12, word: "sun", type: "noun", phonetic: "/sʌn/", meaning: "mặt trời", audioUrl: "", exampleEn: "The sun is shining brightly.", exampleVi: "Mặt trời đang chiếu sáng chói chang." },
  { lesson: 12, word: "sunny", type: "adjective", phonetic: "/ˈsʌn.i/", meaning: "có nắng", audioUrl: "", exampleEn: "It is a sunny day.", exampleVi: "Đó là một ngày có nắng." },
  { lesson: 12, word: "cloud", type: "noun", phonetic: "/klaʊd/", meaning: "đám mây", audioUrl: "", exampleEn: "Look at those dark clouds.", exampleVi: "Hãy nhìn những đám mây đen kia." },
  { lesson: 12, word: "cloudy", type: "adjective", phonetic: "/ˈklaʊ.di/", meaning: "nhiều mây", audioUrl: "", exampleEn: "It is cloudy today.", exampleVi: "Hôm nay trời nhiều mây." },
  { lesson: 12, word: "rain", type: "noun", phonetic: "/reɪn/", meaning: "cơn mưa", audioUrl: "", exampleEn: "We need some rain for the plants.", exampleVi: "Chúng ta cần một chút mưa cho cây cối." },
  { lesson: 12, word: "rainy", type: "adjective", phonetic: "/ˈreɪ.ni/", meaning: "có mưa", audioUrl: "", exampleEn: "I stayed home on a rainy day.", exampleVi: "Tôi đã ở nhà vào một ngày mưa." },
  { lesson: 12, word: "snow", type: "noun", phonetic: "/snəʊ/", meaning: "tuyết", audioUrl: "", exampleEn: "The children are playing in the snow.", exampleVi: "Bọn trẻ đang chơi trong tuyết." },
  { lesson: 12, word: "snowy", type: "adjective", phonetic: "/ˈsnəʊ.i/", meaning: "có tuyết", audioUrl: "", exampleEn: "It will be snowy tomorrow.", exampleVi: "Ngày mai trời sẽ có tuyết." },
  { lesson: 12, word: "wind", type: "noun", phonetic: "/wɪnd/", meaning: "gió", audioUrl: "", exampleEn: "The wind is blowing hard.", exampleVi: "Gió đang thổi mạnh." },
  { lesson: 12, word: "windy", type: "adjective", phonetic: "/ˈwɪn.di/", meaning: "có gió", audioUrl: "", exampleEn: "It is very windy at the beach.", exampleVi: "Ở bãi biển trời rất có gió." },
  { lesson: 12, word: "storm", type: "noun", phonetic: "/stɔːm/", meaning: "cơn bão", audioUrl: "", exampleEn: "The ship sank during a storm.", exampleVi: "Con tàu đã chìm trong một cơn bão." },
  { lesson: 12, word: "fog", type: "noun", phonetic: "/fɒɡ/", meaning: "sương mù", audioUrl: "", exampleEn: "The airport was closed due to heavy fog.", exampleVi: "Sân bay đã đóng cửa do sương mù dày đặc." },
  { lesson: 12, word: "foggy", type: "adjective", phonetic: "/ˈfɒɡ.i/", meaning: "nhiều sương mù", audioUrl: "", exampleEn: "Be careful driving on a foggy morning.", exampleVi: "Hãy lái xe cẩn thận vào một buổi sáng nhiều sương mù." },
  { lesson: 12, word: "hot", type: "adjective", phonetic: "/hɒt/", meaning: "nóng", audioUrl: "", exampleEn: "It is too hot to go outside.", exampleVi: "Trời quá nóng để ra ngoài." },
  { lesson: 12, word: "cold", type: "adjective", phonetic: "/kəʊld/", meaning: "lạnh", audioUrl: "", exampleEn: "Put on your coat, it's cold.", exampleVi: "Mặc áo khoác vào, trời lạnh đấy." },
  { lesson: 12, word: "warm", type: "adjective", phonetic: "/wɔːm/", meaning: "ấm áp", audioUrl: "", exampleEn: "I like warm weather.", exampleVi: "Tôi thích thời tiết ấm áp." },
  { lesson: 12, word: "dry", type: "adjective", phonetic: "/draɪ/", meaning: "khô hanh", audioUrl: "", exampleEn: "The ground is very dry.", exampleVi: "Mặt đất rất khô hanh." },
  { lesson: 12, word: "wet", type: "adjective", phonetic: "/wet/", meaning: "ướt át", audioUrl: "", exampleEn: "My shoes got wet in the rain.", exampleVi: "Giày của tôi bị ướt trong cơn mưa." },
  { lesson: 12, word: "temperature", type: "noun", phonetic: "/ˈtem.prə.tʃər/", meaning: "nhiệt độ", audioUrl: "", exampleEn: "The temperature will drop tonight.", exampleVi: "Nhiệt độ sẽ giảm vào tối nay." },

  // BÀI 13: Clothes and Fashion (Quần áo và Thời trang)
  { lesson: 13, word: "clothes", type: "noun", phonetic: "/kləʊðz/", meaning: "quần áo", audioUrl: "", exampleEn: "I need to buy some new clothes.", exampleVi: "Tôi cần mua một vài bộ quần áo mới." },
  { lesson: 13, word: "wear", type: "verb", phonetic: "/weər/", meaning: "mặc, đội, đeo", audioUrl: "", exampleEn: "She wears glasses.", exampleVi: "Cô ấy đeo kính." },
  { lesson: 13, word: "dress", type: "noun", phonetic: "/dres/", meaning: "váy liền", audioUrl: "", exampleEn: "She bought a beautiful red dress.", exampleVi: "Cô ấy đã mua một chiếc váy liền màu đỏ rất đẹp." },
  { lesson: 13, word: "skirt", type: "noun", phonetic: "/skɜːt/", meaning: "chân váy", audioUrl: "", exampleEn: "I wear a skirt and a blouse to work.", exampleVi: "Tôi mặc chân váy và áo sơ mi nữ đi làm." },
  { lesson: 13, word: "shirt", type: "noun", phonetic: "/ʃɜːt/", meaning: "áo sơ mi nam", audioUrl: "", exampleEn: "He wore a white shirt.", exampleVi: "Anh ấy đã mặc một chiếc áo sơ mi trắng." },
  { lesson: 13, word: "T-shirt", type: "noun", phonetic: "/ˈtiː.ʃɜːt/", meaning: "áo thun", audioUrl: "", exampleEn: "He usually wears a T-shirt and jeans.", exampleVi: "Cậu ấy thường mặc áo thun và quần jean." },
  { lesson: 13, word: "trousers", type: "noun", phonetic: "/ˈtraʊ.zəz/", meaning: "quần dài", audioUrl: "", exampleEn: "I bought a pair of black trousers.", exampleVi: "Tôi đã mua một chiếc quần dài màu đen." },
  { lesson: 13, word: "jeans", type: "noun", phonetic: "/dʒiːnz/", meaning: "quần bò", audioUrl: "", exampleEn: "She likes wearing jeans.", exampleVi: "Cô ấy thích mặc quần bò." },
  { lesson: 13, word: "shorts", type: "noun", phonetic: "/ʃɔːts/", meaning: "quần đùi", audioUrl: "", exampleEn: "He wore shorts to the beach.", exampleVi: "Cậu ấy mặc quần đùi đi biển." },
  { lesson: 13, word: "jacket", type: "noun", phonetic: "/ˈdʒæk.ɪt/", meaning: "áo khoác ngắn", audioUrl: "", exampleEn: "It is cold, put your jacket on.", exampleVi: "Trời lạnh đấy, hãy mặc áo khoác vào." },
  { lesson: 13, word: "coat", type: "noun", phonetic: "/kəʊt/", meaning: "áo khoác dài", audioUrl: "", exampleEn: "I need a warm coat for winter.", exampleVi: "Tôi cần một chiếc áo khoác ấm cho mùa đông." },
  { lesson: 13, word: "sweater", type: "noun", phonetic: "/ˈswet.ər/", meaning: "áo len", audioUrl: "", exampleEn: "My grandmother knitted this sweater.", exampleVi: "Bà tôi đã đan chiếc áo len này." },
  { lesson: 13, word: "shoe", type: "noun", phonetic: "/ʃuː/", meaning: "chiếc giày", audioUrl: "", exampleEn: "I have a stone in my shoe.", exampleVi: "Tôi có một viên đá trong giày." },
  { lesson: 13, word: "boot", type: "noun", phonetic: "/buːt/", meaning: "giày ủng, giày cao cổ", audioUrl: "", exampleEn: "Wear your boots, it is muddy outside.", exampleVi: "Hãy mang giày ủng vào, ngoài trời đang bùn lầy đấy." },
  { lesson: 13, word: "sock", type: "noun", phonetic: "/sɒk/", meaning: "chiếc tất", audioUrl: "", exampleEn: "I bought a pair of wool socks.", exampleVi: "Tôi đã mua một đôi tất len." },
  { lesson: 13, word: "hat", type: "noun", phonetic: "/hæt/", meaning: "cái mũ", audioUrl: "", exampleEn: "He wore a hat to protect from the sun.", exampleVi: "Anh ấy đã đội mũ để che nắng." },
  { lesson: 13, word: "scarf", type: "noun", phonetic: "/skɑːf/", meaning: "khăn quàng cổ", audioUrl: "", exampleEn: "Wrap a scarf around your neck.", exampleVi: "Hãy quấn một chiếc khăn quanh cổ bạn." },
  { lesson: 13, word: "glove", type: "noun", phonetic: "/ɡlʌv/", meaning: "găng tay", audioUrl: "", exampleEn: "Don't forget your gloves.", exampleVi: "Đừng quên găng tay của bạn." },
  { lesson: 13, word: "bag", type: "noun", phonetic: "/bæɡ/", meaning: "cái túi", audioUrl: "", exampleEn: "She put her books in her bag.", exampleVi: "Cô ấy đã cất những cuốn sách vào trong túi của mình." },
  { lesson: 13, word: "pocket", type: "noun", phonetic: "/ˈpɒk.ɪt/", meaning: "túi (áo, quần)", audioUrl: "", exampleEn: "He has some coins in his pocket.", exampleVi: "Anh ấy có vài đồng xu trong túi quần." },

  // BÀI 14: Entertainment and Media (Giải trí và Truyền thông)
  { lesson: 14, word: "television", type: "noun", phonetic: "/ˈtel.ɪ.vɪʒ.ən/", meaning: "tivi", audioUrl: "", exampleEn: "We watched a movie on television.", exampleVi: "Chúng tôi đã xem một bộ phim trên tivi." },
  { lesson: 14, word: "radio", type: "noun", phonetic: "/ˈreɪ.di.əʊ/", meaning: "đài phát thanh", audioUrl: "", exampleEn: "I listen to the radio in the car.", exampleVi: "Tôi nghe đài phát thanh ở trong xe hơi." },
  { lesson: 14, word: "newspaper", type: "noun", phonetic: "/ˈnjuːzˌpeɪ.pər/", meaning: "tờ báo", audioUrl: "", exampleEn: "My dad reads the newspaper every morning.", exampleVi: "Bố tôi đọc báo mỗi buổi sáng." },
  { lesson: 14, word: "magazine", type: "noun", phonetic: "/ˌmæɡ.əˈziːn/", meaning: "tạp chí", audioUrl: "", exampleEn: "She bought a fashion magazine.", exampleVi: "Cô ấy đã mua một cuốn tạp chí thời trang." },
  { lesson: 14, word: "news", type: "noun", phonetic: "/njuːz/", meaning: "tin tức", audioUrl: "", exampleEn: "Have you heard the good news?", exampleVi: "Bạn đã nghe tin tức tốt lành chưa?" },
  { lesson: 14, word: "programme", type: "noun", phonetic: "/ˈprəʊ.ɡræm/", meaning: "chương trình", audioUrl: "", exampleEn: "What is your favorite TV programme?", exampleVi: "Chương trình TV yêu thích của bạn là gì?" },
  { lesson: 14, word: "channel", type: "noun", phonetic: "/ˈtʃæn.əl/", meaning: "kênh", audioUrl: "", exampleEn: "Change the channel, please.", exampleVi: "Làm ơn hãy chuyển kênh." },
  { lesson: 14, word: "movie", type: "noun", phonetic: "/ˈmuː.vi/", meaning: "bộ phim", audioUrl: "", exampleEn: "We went to the cinema to see a movie.", exampleVi: "Chúng tôi đã đến rạp chiếu phim để xem một bộ phim." },
  { lesson: 14, word: "film", type: "noun", phonetic: "/fɪlm/", meaning: "bộ phim (Anh-Anh)", audioUrl: "", exampleEn: "It is an action film.", exampleVi: "Đó là một bộ phim hành động." },
  { lesson: 14, word: "actor", type: "noun", phonetic: "/ˈæk.tər/", meaning: "diễn viên", audioUrl: "", exampleEn: "He is a famous Hollywood actor.", exampleVi: "Ông ấy là một diễn viên Hollywood nổi tiếng." },
  { lesson: 14, word: "music", type: "noun", phonetic: "/ˈmjuː.zɪk/", meaning: "âm nhạc", audioUrl: "", exampleEn: "Pop music is very popular.", exampleVi: "Nhạc Pop rất phổ biến." },
  { lesson: 14, word: "song", type: "noun", phonetic: "/sɒŋ/", meaning: "bài hát", audioUrl: "", exampleEn: "She sang a beautiful song.", exampleVi: "Cô ấy đã hát một bài hát tuyệt vời." },
  { lesson: 14, word: "concert", type: "noun", phonetic: "/ˈkɒn.sət/", meaning: "buổi hòa nhạc", audioUrl: "", exampleEn: "We went to a rock concert.", exampleVi: "Chúng tôi đã đi đến một buổi hòa nhạc rock." },
  { lesson: 14, word: "band", type: "noun", phonetic: "/bænd/", meaning: "ban nhạc", audioUrl: "", exampleEn: "My brother plays the drums in a band.", exampleVi: "Anh trai tôi đánh trống trong một ban nhạc." },
  { lesson: 14, word: "play", type: "noun", phonetic: "/pleɪ/", meaning: "vở kịch", audioUrl: "", exampleEn: "We watched a play at the theatre.", exampleVi: "Chúng tôi đã xem một vở kịch ở nhà hát." },
  { lesson: 14, word: "theatre", type: "noun", phonetic: "/ˈθɪə.tər/", meaning: "nhà hát", audioUrl: "", exampleEn: "The theatre was full of people.", exampleVi: "Nhà hát chật kín người." },
  { lesson: 14, word: "ticket", type: "noun", phonetic: "/ˈtɪk.ɪt/", meaning: "vé", audioUrl: "", exampleEn: "I bought two tickets for the show.", exampleVi: "Tôi đã mua hai vé xem buổi biểu diễn." },
  { lesson: 14, word: "camera", type: "noun", phonetic: "/ˈkæm.rə/", meaning: "máy ảnh", audioUrl: "", exampleEn: "He used a digital camera to take pictures.", exampleVi: "Anh ấy đã sử dụng máy ảnh kỹ thuật số để chụp ảnh." },
  { lesson: 14, word: "photo", type: "noun", phonetic: "/ˈfəʊ.təʊ/", meaning: "bức ảnh", audioUrl: "", exampleEn: "Let's take a group photo.", exampleVi: "Hãy chụp một bức ảnh nhóm nhé." },
  { lesson: 14, word: "video", type: "noun", phonetic: "/ˈvɪd.i.əʊ/", meaning: "đoạn phim, video", audioUrl: "", exampleEn: "He recorded a video of the event.", exampleVi: "Cậu ấy đã quay một đoạn video về sự kiện." },

  // BÀI 15: Technology and Internet (Công nghệ và Internet)
  { lesson: 15, word: "computer", type: "noun", phonetic: "/kəmˈpjuː.tər/", meaning: "máy tính", audioUrl: "", exampleEn: "I use my computer for work.", exampleVi: "Tôi dùng máy tính cho công việc." },
  { lesson: 15, word: "laptop", type: "noun", phonetic: "/ˈlæp.tɒp/", meaning: "máy tính xách tay", audioUrl: "", exampleEn: "She carries her laptop in her backpack.", exampleVi: "Cô ấy mang theo máy tính xách tay trong ba lô." },
  { lesson: 15, word: "mouse", type: "noun", phonetic: "/maʊs/", meaning: "chuột máy tính", audioUrl: "", exampleEn: "Click the right button on the mouse.", exampleVi: "Hãy nhấp vào nút phải trên chuột máy tính." },
  { lesson: 15, word: "screen", type: "noun", phonetic: "/skriːn/", meaning: "màn hình", audioUrl: "", exampleEn: "My phone has a cracked screen.", exampleVi: "Điện thoại của tôi có một màn hình bị nứt." },
  { lesson: 15, word: "keyboard", type: "noun", phonetic: "/ˈkiː.bɔːd/", meaning: "bàn phím", audioUrl: "", exampleEn: "I need to clean my keyboard.", exampleVi: "Tôi cần làm sạch bàn phím của mình." },
  { lesson: 15, word: "internet", type: "noun", phonetic: "/ˈɪn.tə.net/", meaning: "mạng internet", audioUrl: "", exampleEn: "You can find anything on the internet.", exampleVi: "Bạn có thể tìm thấy mọi thứ trên internet." },
  { lesson: 15, word: "website", type: "noun", phonetic: "/ˈweb.saɪt/", meaning: "trang web", audioUrl: "", exampleEn: "What is your favorite website?", exampleVi: "Trang web yêu thích của bạn là gì?" },
  { lesson: 15, word: "email", type: "noun", phonetic: "/ˈiː.meɪl/", meaning: "thư điện tử", audioUrl: "", exampleEn: "I will send you an email.", exampleVi: "Tôi sẽ gửi cho bạn một email." },
  { lesson: 15, word: "message", type: "noun", phonetic: "/ˈmes.ɪdʒ/", meaning: "tin nhắn", audioUrl: "", exampleEn: "He left a message for you.", exampleVi: "Anh ấy đã để lại một tin nhắn cho bạn." },
  { lesson: 15, word: "chat", type: "verb", phonetic: "/tʃæt/", meaning: "tán gẫu, trò chuyện (online)", audioUrl: "", exampleEn: "I often chat with my friends online.", exampleVi: "Tôi thường trò chuyện trực tuyến với bạn bè." },
  { lesson: 15, word: "download", type: "verb", phonetic: "/ˌdaʊnˈləʊd/", meaning: "tải xuống", audioUrl: "", exampleEn: "You can download the app for free.", exampleVi: "Bạn có thể tải xuống ứng dụng miễn phí." },
  { lesson: 15, word: "upload", type: "verb", phonetic: "/ʌpˈləʊd/", meaning: "tải lên", audioUrl: "", exampleEn: "She uploaded a new video to YouTube.", exampleVi: "Cô ấy đã tải lên một video mới trên YouTube." },
  { lesson: 15, word: "search", type: "verb", phonetic: "/sɜːtʃ/", meaning: "tìm kiếm", audioUrl: "", exampleEn: "I need to search for some information.", exampleVi: "Tôi cần tìm kiếm một số thông tin." },
  { lesson: 15, word: "click", type: "verb", phonetic: "/klɪk/", meaning: "nhấp chuột", audioUrl: "", exampleEn: "Click on the link to open it.", exampleVi: "Nhấp chuột vào đường dẫn để mở nó." },
  { lesson: 15, word: "password", type: "noun", phonetic: "/ˈpɑːs.wɜːd/", meaning: "mật khẩu", audioUrl: "", exampleEn: "Don't share your password with anyone.", exampleVi: "Đừng chia sẻ mật khẩu của bạn với bất kỳ ai." },
  { lesson: 15, word: "save", type: "verb", phonetic: "/seɪv/", meaning: "lưu", audioUrl: "", exampleEn: "Remember to save your document.", exampleVi: "Hãy nhớ lưu lại tài liệu của bạn." },
  { lesson: 15, word: "delete", type: "verb", phonetic: "/dɪˈliːt/", meaning: "xóa", audioUrl: "", exampleEn: "I accidentally deleted the photo.", exampleVi: "Tôi đã vô tình xóa bức ảnh đó." },
  { lesson: 15, word: "file", type: "noun", phonetic: "/faɪl/", meaning: "tập tin", audioUrl: "", exampleEn: "I attached a PDF file to the email.", exampleVi: "Tôi đã đính kèm một tập tin PDF vào email." },
  { lesson: 15, word: "phone", type: "noun", phonetic: "/fəʊn/", meaning: "điện thoại", audioUrl: "", exampleEn: "She is talking on the phone.", exampleVi: "Cô ấy đang nói chuyện trên điện thoại." },
  { lesson: 15, word: "camera", type: "noun", phonetic: "/ˈkæm.rə/", meaning: "máy ảnh (trên điện thoại)", audioUrl: "", exampleEn: "My phone has a great camera.", exampleVi: "Điện thoại của tôi có một chiếc máy ảnh rất xịn." }
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

  console.log(`\n🎉 Hoàn thành nạp ${successCount} từ vựng Batch 3 cho KET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

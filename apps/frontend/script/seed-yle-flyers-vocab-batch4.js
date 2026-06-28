/**
 * SEED SCRIPT: YLE Flyers Vocabulary — Batch 4 (Bài 16 - 20)
 * Chạy từ thư mục gốc: node seed-yle-flyers-vocab-batch4.js
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 16: Technology and Communications (Công nghệ và Giao tiếp)
  { lesson: 16, word: "app", type: "noun", phonetic: "/æp/", meaning: "ứng dụng", audioUrl: "", exampleEn: "I downloaded a new game app.", exampleVi: "Tôi đã tải một ứng dụng trò chơi mới." },
  { lesson: 16, word: "blog", type: "noun", phonetic: "/blɒɡ/", meaning: "trang blog", audioUrl: "", exampleEn: "She writes a blog about food.", exampleVi: "Cô ấy viết một trang blog về đồ ăn." },
  { lesson: 16, word: "chat", type: "verb", phonetic: "/tʃæt/", meaning: "nhắn tin, tán gẫu", audioUrl: "", exampleEn: "I like to chat with my friends online.", exampleVi: "Tôi thích nhắn tin tán gẫu với bạn bè trên mạng." },
  { lesson: 16, word: "channel", type: "noun", phonetic: "/ˈtʃæn.əl/", meaning: "kênh", audioUrl: "", exampleEn: "What is your favourite TV channel?", exampleVi: "Kênh truyền hình yêu thích của bạn là gì?" },
  { lesson: 16, word: "conversation", type: "noun", phonetic: "/ˌkɒn.vəˈseɪ.ʃən/", meaning: "cuộc trò chuyện", audioUrl: "", exampleEn: "We had a long conversation about music.", exampleVi: "Chúng tôi đã có một cuộc trò chuyện dài về âm nhạc." },
  { lesson: 16, word: "file", type: "noun", phonetic: "/faɪl/", meaning: "tập tin", audioUrl: "", exampleEn: "Please save the document in this file.", exampleVi: "Vui lòng lưu tài liệu vào tập tin này." },
  { lesson: 16, word: "internet", type: "noun", phonetic: "/ˈɪn.tə.net/", meaning: "mạng internet", audioUrl: "", exampleEn: "You can find a lot of information on the internet.", exampleVi: "Bạn có thể tìm thấy nhiều thông tin trên mạng internet." },
  { lesson: 16, word: "keyboard", type: "noun", phonetic: "/ˈkiː.bɔːd/", meaning: "bàn phím", audioUrl: "", exampleEn: "He types quickly on the keyboard.", exampleVi: "Anh ấy gõ bàn phím rất nhanh." },
  { lesson: 16, word: "message", type: "noun", phonetic: "/ˈmes.ɪdʒ/", meaning: "tin nhắn", audioUrl: "", exampleEn: "I sent a message to my teacher.", exampleVi: "Tôi đã gửi một tin nhắn cho giáo viên của tôi." },
  { lesson: 16, word: "mouse", type: "noun", phonetic: "/maʊs/", meaning: "chuột máy tính", audioUrl: "", exampleEn: "Click the left button on the mouse.", exampleVi: "Hãy nhấp vào nút bên trái của con chuột." },
  { lesson: 16, word: "program", type: "noun", phonetic: "/ˈprəʊ.ɡræm/", meaning: "chương trình máy tính", audioUrl: "", exampleEn: "This program helps you draw pictures.", exampleVi: "Chương trình này giúp bạn vẽ các bức tranh." },
  { lesson: 16, word: "screen", type: "noun", phonetic: "/skriːn/", meaning: "màn hình", audioUrl: "", exampleEn: "The phone screen is broken.", exampleVi: "Màn hình điện thoại đã bị vỡ." },
  { lesson: 16, word: "search", type: "verb", phonetic: "/sɜːtʃ/", meaning: "tìm kiếm", audioUrl: "", exampleEn: "I often search for videos on YouTube.", exampleVi: "Tôi thường tìm kiếm các video trên YouTube." },
  { lesson: 16, word: "software", type: "noun", phonetic: "/ˈsɒft.weər/", meaning: "phần mềm", audioUrl: "", exampleEn: "My dad installed new software on his computer.", exampleVi: "Bố tôi đã cài đặt phần mềm mới trên máy tính của ông ấy." },
  { lesson: 16, word: "tablet", type: "noun", phonetic: "/ˈtæb.lət/", meaning: "máy tính bảng", audioUrl: "", exampleEn: "She reads books on her tablet.", exampleVi: "Cô ấy đọc sách trên máy tính bảng của mình." },
  { lesson: 16, word: "text", type: "verb", phonetic: "/tekst/", meaning: "nhắn tin (văn bản)", audioUrl: "", exampleEn: "I will text you later.", exampleVi: "Tôi sẽ nhắn tin cho bạn sau." },
  { lesson: 16, word: "website", type: "noun", phonetic: "/ˈweb.saɪt/", meaning: "trang web", audioUrl: "", exampleEn: "This website is very useful for learning English.", exampleVi: "Trang web này rất hữu ích để học tiếng Anh." },
  { lesson: 16, word: "download", type: "verb", phonetic: "/ˌdaʊnˈləʊd/", meaning: "tải xuống", audioUrl: "", exampleEn: "You can download the game for free.", exampleVi: "Bạn có thể tải xuống trò chơi này miễn phí." },
  { lesson: 16, word: "online", type: "adjective", phonetic: "/ˌɒnˈlaɪn/", meaning: "trực tuyến", audioUrl: "", exampleEn: "He plays online games every day.", exampleVi: "Anh ấy chơi các trò chơi trực tuyến mỗi ngày." },
  { lesson: 16, word: "password", type: "noun", phonetic: "/ˈpɑːs.wɜːd/", meaning: "mật khẩu", audioUrl: "", exampleEn: "Don't tell anyone your password.", exampleVi: "Đừng nói cho ai biết mật khẩu của bạn." },

  // BÀI 17: Materials (Chất liệu)
  { lesson: 17, word: "card", type: "noun", phonetic: "/kɑːd/", meaning: "thẻ, thiệp (giấy cứng)", audioUrl: "", exampleEn: "I made a birthday card for my mom.", exampleVi: "Tôi đã làm một tấm thiệp sinh nhật cho mẹ." },
  { lesson: 17, word: "cardboard", type: "noun", phonetic: "/ˈkɑːd.bɔːd/", meaning: "bìa các-tông", audioUrl: "", exampleEn: "The box is made of cardboard.", exampleVi: "Chiếc hộp này được làm bằng bìa các-tông." },
  { lesson: 17, word: "glass", type: "noun", phonetic: "/ɡlɑːs/", meaning: "thủy tinh", audioUrl: "", exampleEn: "Be careful, the window is made of glass.", exampleVi: "Cẩn thận nhé, chiếc cửa sổ được làm bằng thủy tinh." },
  { lesson: 17, word: "gold", type: "noun", phonetic: "/ɡəʊld/", meaning: "vàng", audioUrl: "", exampleEn: "She wears a gold necklace.", exampleVi: "Cô ấy đeo một sợi dây chuyền bằng vàng." },
  { lesson: 17, word: "metal", type: "noun", phonetic: "/ˈmet.əl/", meaning: "kim loại", audioUrl: "", exampleEn: "Cars are usually made of metal.", exampleVi: "Ô tô thường được làm bằng kim loại." },
  { lesson: 17, word: "paper", type: "noun", phonetic: "/ˈpeɪ.pər/", meaning: "giấy", audioUrl: "", exampleEn: "Write your name on a piece of paper.", exampleVi: "Hãy viết tên của bạn lên một mảnh giấy." },
  { lesson: 17, word: "plastic", type: "noun", phonetic: "/ˈplæs.tɪk/", meaning: "nhựa", audioUrl: "", exampleEn: "Don't use plastic bags.", exampleVi: "Đừng sử dụng túi nhựa (túi ni-lông)." },
  { lesson: 17, word: "silver", type: "noun", phonetic: "/ˈsɪl.vər/", meaning: "bạc", audioUrl: "", exampleEn: "He gave her a silver ring.", exampleVi: "Anh ấy đã tặng cô ấy một chiếc nhẫn bạc." },
  { lesson: 17, word: "wood", type: "noun", phonetic: "/wʊd/", meaning: "gỗ", audioUrl: "", exampleEn: "This chair is made of wood.", exampleVi: "Chiếc ghế này được làm từ gỗ." },
  { lesson: 17, word: "wool", type: "noun", phonetic: "/wʊl/", meaning: "len", audioUrl: "", exampleEn: "Sheep give us wool.", exampleVi: "Những con cừu cung cấp len cho chúng ta." },
  { lesson: 17, word: "material", type: "noun", phonetic: "/məˈtɪə.ri.əl/", meaning: "chất liệu", audioUrl: "", exampleEn: "Cotton is a soft material.", exampleVi: "Bông là một chất liệu mềm mại." },
  { lesson: 17, word: "stone", type: "noun", phonetic: "/stəʊn/", meaning: "đá", audioUrl: "", exampleEn: "The ancient house was built of stone.", exampleVi: "Ngôi nhà cổ được xây bằng đá." },
  { lesson: 17, word: "heavy", type: "adjective", phonetic: "/ˈhev.i/", meaning: "nặng", audioUrl: "", exampleEn: "This metal box is very heavy.", exampleVi: "Chiếc hộp kim loại này rất nặng." },
  { lesson: 17, word: "light", type: "adjective", phonetic: "/laɪt/", meaning: "nhẹ", audioUrl: "", exampleEn: "A piece of paper is very light.", exampleVi: "Một tờ giấy thì rất nhẹ." },
  { lesson: 17, word: "strong", type: "adjective", phonetic: "/strɒŋ/", meaning: "chắc chắn, mạnh", audioUrl: "", exampleEn: "Iron is a strong metal.", exampleVi: "Sắt là một kim loại rất cứng chắc." },
  { lesson: 17, word: "weak", type: "adjective", phonetic: "/wiːk/", meaning: "yếu, dễ gãy", audioUrl: "", exampleEn: "The plastic chair is weak.", exampleVi: "Chiếc ghế nhựa này rất yếu." },
  { lesson: 17, word: "soft", type: "adjective", phonetic: "/sɒft/", meaning: "mềm", audioUrl: "", exampleEn: "Wool is very soft and warm.", exampleVi: "Len thì rất mềm và ấm." },
  { lesson: 17, word: "hard", type: "adjective", phonetic: "/hɑːd/", meaning: "cứng", audioUrl: "", exampleEn: "Rocks are very hard.", exampleVi: "Những hòn đá rất cứng." },
  { lesson: 17, word: "break", type: "verb", phonetic: "/breɪk/", meaning: "làm vỡ", audioUrl: "", exampleEn: "Glass can break easily.", exampleVi: "Thủy tinh có thể vỡ một cách dễ dàng." },
  { lesson: 17, word: "cotton", type: "noun", phonetic: "/ˈkɒt.ən/", meaning: "sợi bông, vải cotton", audioUrl: "", exampleEn: "My T-shirt is made of cotton.", exampleVi: "Chiếc áo phông của tôi được làm bằng vải cotton." },

  // BÀI 18: Directions and Places (Phương hướng và Địa điểm)
  { lesson: 18, word: "east", type: "noun", phonetic: "/iːst/", meaning: "hướng Đông", audioUrl: "", exampleEn: "The sun rises in the east.", exampleVi: "Mặt trời mọc ở hướng Đông." },
  { lesson: 18, word: "west", type: "noun", phonetic: "/west/", meaning: "hướng Tây", audioUrl: "", exampleEn: "The sun sets in the west.", exampleVi: "Mặt trời lặn ở hướng Tây." },
  { lesson: 18, word: "north", type: "noun", phonetic: "/nɔːθ/", meaning: "hướng Bắc", audioUrl: "", exampleEn: "Penguins don't live in the North Pole.", exampleVi: "Chim cánh cụt không sống ở Bắc Cực." },
  { lesson: 18, word: "south", type: "noun", phonetic: "/saʊθ/", meaning: "hướng Nam", audioUrl: "", exampleEn: "Many birds fly south in winter.", exampleVi: "Nhiều loài chim bay về phương nam vào mùa đông." },
  { lesson: 18, word: "straight", type: "adverb", phonetic: "/streɪt/", meaning: "thẳng", audioUrl: "", exampleEn: "Go straight ahead.", exampleVi: "Hãy đi thẳng về phía trước." },
  { lesson: 18, word: "turn", type: "verb", phonetic: "/tɜːn/", meaning: "rẽ, quay", audioUrl: "", exampleEn: "Turn right at the corner.", exampleVi: "Hãy rẽ phải tại góc đường." },
  { lesson: 18, word: "cross", type: "verb", phonetic: "/krɒs/", meaning: "băng qua", audioUrl: "", exampleEn: "Cross the street carefully.", exampleVi: "Hãy băng qua đường cẩn thận." },
  { lesson: 18, word: "front", type: "noun", phonetic: "/frʌnt/", meaning: "phía trước", audioUrl: "", exampleEn: "I will wait in front of the school.", exampleVi: "Tôi sẽ đợi ở phía trước trường học." },
  { lesson: 18, word: "back", type: "noun", phonetic: "/bæk/", meaning: "phía sau", audioUrl: "", exampleEn: "The garden is at the back of the house.", exampleVi: "Khu vườn nằm ở phía sau ngôi nhà." },
  { lesson: 18, word: "middle", type: "noun", phonetic: "/ˈmɪd.əl/", meaning: "ở giữa", audioUrl: "", exampleEn: "The table is in the middle of the room.", exampleVi: "Cái bàn nằm ở giữa căn phòng." },
  { lesson: 18, word: "top", type: "noun", phonetic: "/tɒp/", meaning: "đỉnh, phía trên", audioUrl: "", exampleEn: "My book is on the top shelf.", exampleVi: "Sách của tôi nằm ở trên cùng của cái kệ." },
  { lesson: 18, word: "bottom", type: "noun", phonetic: "/ˈbɒt.əm/", meaning: "dưới cùng, đáy", audioUrl: "", exampleEn: "The cat is hiding at the bottom of the stairs.", exampleVi: "Con mèo đang trốn ở bậc dưới cùng của cầu thang." },
  { lesson: 18, word: "direction", type: "noun", phonetic: "/dɪˈrek.ʃən/", meaning: "phương hướng", audioUrl: "", exampleEn: "Which direction should we go?", exampleVi: "Chúng ta nên đi theo hướng nào?" },
  { lesson: 18, word: "right", type: "noun", phonetic: "/raɪt/", meaning: "bên phải", audioUrl: "", exampleEn: "The park is on your right.", exampleVi: "Công viên nằm ở phía bên phải của bạn." },
  { lesson: 18, word: "left", type: "noun", phonetic: "/left/", meaning: "bên trái", audioUrl: "", exampleEn: "Turn left at the traffic light.", exampleVi: "Hãy rẽ trái tại cột đèn giao thông." },
  { lesson: 18, word: "near", type: "preposition", phonetic: "/nɪər/", meaning: "gần", audioUrl: "", exampleEn: "I live near the school.", exampleVi: "Tôi sống ở gần trường học." },
  { lesson: 18, word: "far", type: "adjective", phonetic: "/fɑːr/", meaning: "xa", audioUrl: "", exampleEn: "The hospital is far from here.", exampleVi: "Bệnh viện nằm cách xa nơi này." },
  { lesson: 18, word: "between", type: "preposition", phonetic: "/bɪˈtwiːn/", meaning: "ở giữa (hai vật)", audioUrl: "", exampleEn: "The bank is between the bakery and the post office.", exampleVi: "Ngân hàng nằm ở giữa tiệm bánh và bưu điện." },
  { lesson: 18, word: "opposite", type: "preposition", phonetic: "/ˈɒp.ə.zɪt/", meaning: "đối diện", audioUrl: "", exampleEn: "The library is opposite the park.", exampleVi: "Thư viện nằm đối diện công viên." },
  { lesson: 18, word: "next to", type: "preposition", phonetic: "/nekst tuː/", meaning: "bên cạnh", audioUrl: "", exampleEn: "He is sitting next to me.", exampleVi: "Anh ấy đang ngồi bên cạnh tôi." },

  // BÀI 19: Entertainment (Giải trí)
  { lesson: 19, word: "cartoon", type: "noun", phonetic: "/kɑːˈtuːn/", meaning: "phim hoạt hình", audioUrl: "", exampleEn: "Children love watching cartoons.", exampleVi: "Trẻ em thích xem phim hoạt hình." },
  { lesson: 19, word: "comedy", type: "noun", phonetic: "/ˈkɒm.ə.di/", meaning: "phim hài", audioUrl: "", exampleEn: "We watched a funny comedy last night.", exampleVi: "Chúng tôi đã xem một bộ phim hài vui nhộn đêm qua." },
  { lesson: 19, word: "documentary", type: "noun", phonetic: "/ˌdɒk.jəˈmen.tər.i/", meaning: "phim tài liệu", audioUrl: "", exampleEn: "I learned about lions from a documentary.", exampleVi: "Tôi đã tìm hiểu về sư tử từ một bộ phim tài liệu." },
  { lesson: 19, word: "news", type: "noun", phonetic: "/njuːz/", meaning: "tin tức thời sự", audioUrl: "", exampleEn: "My dad watches the news every evening.", exampleVi: "Bố tôi xem tin tức thời sự vào mỗi buổi tối." },
  { lesson: 19, word: "programme", type: "noun", phonetic: "/ˈprəʊ.ɡræm/", meaning: "chương trình truyền hình", audioUrl: "", exampleEn: "What's your favourite TV programme?", exampleVi: "Chương trình truyền hình yêu thích của bạn là gì?" },
  { lesson: 19, word: "series", type: "noun", phonetic: "/ˈsɪə.riːz/", meaning: "phim nhiều tập", audioUrl: "", exampleEn: "I am watching a new series on TV.", exampleVi: "Tôi đang xem một bộ phim nhiều tập mới trên tivi." },
  { lesson: 19, word: "stage", type: "noun", phonetic: "/steɪdʒ/", meaning: "sân khấu", audioUrl: "", exampleEn: "The actors walked onto the stage.", exampleVi: "Các diễn viên đã bước lên sân khấu." },
  { lesson: 19, word: "concert", type: "noun", phonetic: "/ˈkɒn.sət/", meaning: "buổi hòa nhạc", audioUrl: "", exampleEn: "We went to a rock concert.", exampleVi: "Chúng tôi đã đi đến một buổi hòa nhạc rock." },
  { lesson: 19, word: "festival", type: "noun", phonetic: "/ˈfes.tɪ.vəl/", meaning: "lễ hội", audioUrl: "", exampleEn: "There is a music festival in the park.", exampleVi: "Có một lễ hội âm nhạc ở trong công viên." },
  { lesson: 19, word: "magic", type: "noun", phonetic: "/ˈmædʒ.ɪk/", meaning: "ảo thuật, phép thuật", audioUrl: "", exampleEn: "He did a cool magic trick.", exampleVi: "Anh ấy đã biểu diễn một trò ảo thuật tuyệt vời." },
  { lesson: 19, word: "music", type: "noun", phonetic: "/ˈmjuː.zɪk/", meaning: "âm nhạc", audioUrl: "", exampleEn: "I listen to music when I study.", exampleVi: "Tôi nghe nhạc khi tôi học bài." },
  { lesson: 19, word: "pop", type: "noun", phonetic: "/pɒp/", meaning: "nhạc pop", audioUrl: "", exampleEn: "She likes to listen to pop music.", exampleVi: "Cô ấy thích nghe nhạc pop." },
  { lesson: 19, word: "rock", type: "noun", phonetic: "/rɒk/", meaning: "nhạc rock", audioUrl: "", exampleEn: "Rock music is very loud.", exampleVi: "Nhạc rock rất ồn ào." },
  { lesson: 19, word: "band", type: "noun", phonetic: "/bænd/", meaning: "ban nhạc", audioUrl: "", exampleEn: "My brother plays guitar in a band.", exampleVi: "Anh trai tôi chơi ghi-ta trong một ban nhạc." },
  { lesson: 19, word: "instrument", type: "noun", phonetic: "/ˈɪn.strə.mənt/", meaning: "nhạc cụ", audioUrl: "", exampleEn: "Can you play any musical instrument?", exampleVi: "Bạn có thể chơi nhạc cụ nào không?" },
  { lesson: 19, word: "drum", type: "noun", phonetic: "/drʌm/", meaning: "cái trống", audioUrl: "", exampleEn: "He beats the drum very hard.", exampleVi: "Cậu ấy đánh trống rất mạnh." },
  { lesson: 19, word: "guitar", type: "noun", phonetic: "/ɡɪˈtɑːr/", meaning: "đàn ghi-ta", audioUrl: "", exampleEn: "She is learning to play the guitar.", exampleVi: "Cô ấy đang học chơi đàn ghi-ta." },
  { lesson: 19, word: "piano", type: "noun", phonetic: "/piˈæn.əʊ/", meaning: "đàn piano", audioUrl: "", exampleEn: "She plays the piano beautifully.", exampleVi: "Cô ấy chơi đàn piano rất hay." },
  { lesson: 19, word: "violin", type: "noun", phonetic: "/ˌvaɪəˈlɪn/", meaning: "đàn vi-ô-lông", audioUrl: "", exampleEn: "He practices the violin every day.", exampleVi: "Anh ấy tập chơi đàn vi-ô-lông mỗi ngày." },
  { lesson: 19, word: "flute", type: "noun", phonetic: "/fluːt/", meaning: "cây sáo", audioUrl: "", exampleEn: "The flute makes a sweet sound.", exampleVi: "Cây sáo tạo ra âm thanh ngọt ngào." },

  // BÀI 20: Space (Không gian vũ trụ)
  { lesson: 20, word: "alien", type: "noun", phonetic: "/ˈeɪ.li.ən/", meaning: "người ngoài hành tinh", audioUrl: "", exampleEn: "An alien flew in a spaceship.", exampleVi: "Một người ngoài hành tinh đã bay trên tàu vũ trụ." },
  { lesson: 20, word: "astronaut", type: "noun", phonetic: "/ˈæs.trə.nɔːt/", meaning: "phi hành gia", audioUrl: "", exampleEn: "The astronaut walked on the moon.", exampleVi: "Phi hành gia đã đi bộ trên mặt trăng." },
  { lesson: 20, word: "moon", type: "noun", phonetic: "/muːn/", meaning: "mặt trăng", audioUrl: "", exampleEn: "Look at the bright moon tonight.", exampleVi: "Hãy nhìn mặt trăng sáng ngời đêm nay." },
  { lesson: 20, word: "planet", type: "noun", phonetic: "/ˈplæn.ɪt/", meaning: "hành tinh", audioUrl: "", exampleEn: "Mars is the red planet.", exampleVi: "Sao Hỏa là hành tinh đỏ." },
  { lesson: 20, word: "rocket", type: "noun", phonetic: "/ˈrɒk.ɪt/", meaning: "tên lửa", audioUrl: "", exampleEn: "The rocket is ready to launch.", exampleVi: "Tên lửa đã sẵn sàng để phóng." },
  { lesson: 20, word: "space", type: "noun", phonetic: "/speɪs/", meaning: "vũ trụ, không gian", audioUrl: "", exampleEn: "There are many stars in space.", exampleVi: "Có rất nhiều ngôi sao trong vũ trụ." },
  { lesson: 20, word: "spaceship", type: "noun", phonetic: "/ˈspeɪs.ʃɪp/", meaning: "tàu vũ trụ", audioUrl: "", exampleEn: "The spaceship travels very fast.", exampleVi: "Con tàu vũ trụ di chuyển rất nhanh." },
  { lesson: 20, word: "star", type: "noun", phonetic: "/stɑːr/", meaning: "ngôi sao", audioUrl: "", exampleEn: "I can see a falling star.", exampleVi: "Tôi có thể nhìn thấy một ngôi sao băng." },
  { lesson: 20, word: "sun", type: "noun", phonetic: "/sʌn/", meaning: "mặt trời", audioUrl: "", exampleEn: "The sun gives us light and heat.", exampleVi: "Mặt trời mang lại cho chúng ta ánh sáng và sức nóng." },
  { lesson: 20, word: "earth", type: "noun", phonetic: "/ɜːθ/", meaning: "Trái Đất", audioUrl: "", exampleEn: "The Earth goes around the Sun.", exampleVi: "Trái Đất quay xung quanh Mặt Trời." },
  { lesson: 20, word: "galaxy", type: "noun", phonetic: "/ˈɡæl.ək.si/", meaning: "dải ngân hà", audioUrl: "", exampleEn: "Our galaxy is called the Milky Way.", exampleVi: "Dải ngân hà của chúng ta được gọi là Milky Way." },
  { lesson: 20, word: "orbit", type: "noun", phonetic: "/ˈɔː.bɪt/", meaning: "quỹ đạo", audioUrl: "", exampleEn: "The moon is in orbit around the Earth.", exampleVi: "Mặt trăng nằm trong quỹ đạo xung quanh Trái Đất." },
  { lesson: 20, word: "telescope", type: "noun", phonetic: "/ˈtel.ɪ.skəʊp/", meaning: "kính viễn vọng", audioUrl: "", exampleEn: "We look at stars through a telescope.", exampleVi: "Chúng tôi ngắm các vì sao thông qua một chiếc kính viễn vọng." },
  { lesson: 20, word: "universe", type: "noun", phonetic: "/ˈjuː.nɪ.vɜːs/", meaning: "vũ trụ bao la", audioUrl: "", exampleEn: "The universe is very big.", exampleVi: "Vũ trụ bao la thì rất to lớn." },
  { lesson: 20, word: "gravity", type: "noun", phonetic: "/ˈɡræv.ə.ti/", meaning: "trọng lực", audioUrl: "", exampleEn: "Things fall down because of gravity.", exampleVi: "Mọi vật rơi xuống là nhờ có trọng lực." },
  { lesson: 20, word: "light", type: "noun", phonetic: "/laɪt/", meaning: "ánh sáng", audioUrl: "", exampleEn: "Turn off the light when you leave.", exampleVi: "Hãy tắt ánh sáng khi bạn rời đi." },
  { lesson: 20, word: "dark", type: "adjective", phonetic: "/dɑːk/", meaning: "tối tăm", audioUrl: "", exampleEn: "It is very dark in the cave.", exampleVi: "Trời rất tối trong hang động." },
  { lesson: 20, word: "sky", type: "noun", phonetic: "/skaɪ/", meaning: "bầu trời", audioUrl: "", exampleEn: "There are no clouds in the sky.", exampleVi: "Không có đám mây nào trên bầu trời." },
  { lesson: 20, word: "fly", type: "verb", phonetic: "/flaɪ/", meaning: "bay", audioUrl: "", exampleEn: "Birds fly in the sky.", exampleVi: "Những con chim bay trên bầu trời." },
  { lesson: 20, word: "discover", type: "verb", phonetic: "/dɪˈskʌv.ər/", meaning: "khám phá, phát hiện", audioUrl: "", exampleEn: "Scientists discover new planets.", exampleVi: "Các nhà khoa học phát hiện ra những hành tinh mới." }
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

  console.log(`\n🎉 Hoàn thành nạp/cập nhật ${successCount} từ vựng Batch 4 cho Flyers!`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

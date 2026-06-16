/**
 * SEED SCRIPT: PET Vocabulary — Batch 4 (Bài 16 - 20)
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 16: Hobbies & Leisure Activities
  { lesson: 16, word: "hobby", type: "noun", phonetic: "/ˈhɒb.i/", meaning: "sở thích", audioUrl: "", exampleEn: "My favourite hobby is photography.", exampleVi: "Sở thích yêu thích của tôi là nhiếp ảnh." },
  { lesson: 16, word: "leisure", type: "noun", phonetic: "/ˈleʒ.ər/", meaning: "thời gian rảnh rỗi", audioUrl: "", exampleEn: "What do you do in your leisure time?", exampleVi: "Bạn làm gì trong thời gian rảnh rỗi?" },
  { lesson: 16, word: "collect", type: "verb", phonetic: "/kəˈlekt/", meaning: "sưu tầm", audioUrl: "", exampleEn: "He collects old coins.", exampleVi: "Anh ấy sưu tầm tiền xu cổ." },
  { lesson: 16, word: "stamp", type: "noun", phonetic: "/stæmp/", meaning: "con tem", audioUrl: "", exampleEn: "She has a large stamp collection.", exampleVi: "Cô ấy có một bộ sưu tập tem lớn." },
  { lesson: 16, word: "photography", type: "noun", phonetic: "/fəˈtɒɡ.rə.fi/", meaning: "nhiếp ảnh", audioUrl: "", exampleEn: "He is interested in wildlife photography.", exampleVi: "Anh ấy đam mê nhiếp ảnh động vật hoang dã." },
  { lesson: 16, word: "painting", type: "noun", phonetic: "/ˈpeɪn.tɪŋ/", meaning: "hội họa, bức tranh", audioUrl: "", exampleEn: "I bought a beautiful oil painting.", exampleVi: "Tôi đã mua một bức tranh sơn dầu tuyệt đẹp." },
  { lesson: 16, word: "drawing", type: "noun", phonetic: "/ˈdrɔː.ɪŋ/", meaning: "bức vẽ, việc vẽ tranh", audioUrl: "", exampleEn: "She is very good at drawing.", exampleVi: "Cô ấy rất giỏi vẽ." },
  { lesson: 16, word: "knitting", type: "noun", phonetic: "/ˈnɪt.ɪŋ/", meaning: "việc đan lát", audioUrl: "", exampleEn: "My grandmother enjoys knitting.", exampleVi: "Bà tôi thích đan lát." },
  { lesson: 16, word: "gardening", type: "noun", phonetic: "/ˈɡɑː.dən.ɪŋ/", meaning: "làm vườn", audioUrl: "", exampleEn: "Gardening is a relaxing hobby.", exampleVi: "Làm vườn là một sở thích thư giãn." },
  { lesson: 16, word: "chess", type: "noun", phonetic: "/tʃes/", meaning: "cờ vua", audioUrl: "", exampleEn: "We play chess every Sunday.", exampleVi: "Chúng tôi chơi cờ vua vào mỗi Chủ nhật." },
  { lesson: 16, word: "puzzle", type: "noun", phonetic: "/ˈpʌz.əl/", meaning: "câu đố, trò xếp hình", audioUrl: "", exampleEn: "I spent hours doing a jigsaw puzzle.", exampleVi: "Tôi đã dành hàng giờ để chơi trò xếp hình." },
  { lesson: 16, word: "camping", type: "noun", phonetic: "/ˈkæm.pɪŋ/", meaning: "cắm trại", audioUrl: "", exampleEn: "We are going camping in the mountains.", exampleVi: "Chúng tôi sẽ đi cắm trại ở trên núi." },
  { lesson: 16, word: "hiking", type: "noun", phonetic: "/ˈhaɪ.kɪŋ/", meaning: "đi bộ đường dài", audioUrl: "", exampleEn: "Hiking is good for your health.", exampleVi: "Đi bộ đường dài rất tốt cho sức khỏe của bạn." },
  { lesson: 16, word: "fishing", type: "noun", phonetic: "/ˈfɪʃ.ɪŋ/", meaning: "câu cá", audioUrl: "", exampleEn: "He often goes fishing by the river.", exampleVi: "Anh ấy thường đi câu cá bên sông." },
  { lesson: 16, word: "baking", type: "noun", phonetic: "/ˈbeɪ.kɪŋ/", meaning: "nướng bánh", audioUrl: "", exampleEn: "She loves baking cakes.", exampleVi: "Cô ấy thích nướng bánh." },
  { lesson: 16, word: "volunteer", type: "verb", phonetic: "/ˌvɒl.ənˈtɪər/", meaning: "tình nguyện", audioUrl: "", exampleEn: "I volunteer at the local animal shelter.", exampleVi: "Tôi làm tình nguyện viên ở trạm cứu hộ động vật địa phương." },
  { lesson: 16, word: "join", type: "verb", phonetic: "/dʒɔɪn/", meaning: "tham gia", audioUrl: "", exampleEn: "Would you like to join our club?", exampleVi: "Bạn có muốn tham gia câu lạc bộ của chúng tôi không?" },
  { lesson: 16, word: "club", type: "noun", phonetic: "/klʌb/", meaning: "câu lạc bộ", audioUrl: "", exampleEn: "She is a member of the tennis club.", exampleVi: "Cô ấy là thành viên của câu lạc bộ quần vợt." },
  { lesson: 16, word: "member", type: "noun", phonetic: "/ˈmem.bər/", meaning: "thành viên", audioUrl: "", exampleEn: "He is a new member of the team.", exampleVi: "Anh ấy là thành viên mới của đội." },
  { lesson: 16, word: "activity", type: "noun", phonetic: "/ækˈtɪv.ə.ti/", meaning: "hoạt động", audioUrl: "", exampleEn: "There are many activities to choose from.", exampleVi: "Có rất nhiều hoạt động để lựa chọn." },

  // BÀI 17: Sports & Competitions
  { lesson: 17, word: "sport", type: "noun", phonetic: "/spɔːt/", meaning: "thể thao", audioUrl: "", exampleEn: "Football is a popular sport.", exampleVi: "Bóng đá là một môn thể thao phổ biến." },
  { lesson: 17, word: "competition", type: "noun", phonetic: "/ˌkɒm.pəˈtɪʃ.ən/", meaning: "cuộc thi", audioUrl: "", exampleEn: "She won the swimming competition.", exampleVi: "Cô ấy đã giành chiến thắng trong cuộc thi bơi lội." },
  { lesson: 17, word: "match", type: "noun", phonetic: "/mætʃ/", meaning: "trận đấu", audioUrl: "", exampleEn: "Did you watch the tennis match?", exampleVi: "Bạn có xem trận đấu quần vợt không?" },
  { lesson: 17, word: "tournament", type: "noun", phonetic: "/ˈtʊə.nə.mənt/", meaning: "giải đấu", audioUrl: "", exampleEn: "The golf tournament is held every year.", exampleVi: "Giải đấu gôn được tổ chức hàng năm." },
  { lesson: 17, word: "team", type: "noun", phonetic: "/tiːm/", meaning: "đội", audioUrl: "", exampleEn: "Our team played very well today.", exampleVi: "Đội chúng ta hôm nay chơi rất tốt." },
  { lesson: 17, word: "player", type: "noun", phonetic: "/ˈpleɪ.ər/", meaning: "cầu thủ, người chơi", audioUrl: "", exampleEn: "He is the best player on the team.", exampleVi: "Anh ấy là cầu thủ giỏi nhất đội." },
  { lesson: 17, word: "coach", type: "noun", phonetic: "/kəʊtʃ/", meaning: "huấn luyện viên", audioUrl: "", exampleEn: "The coach was shouting at the players.", exampleVi: "Huấn luyện viên đang hét vào mặt các cầu thủ." },
  { lesson: 17, word: "referee", type: "noun", phonetic: "/ˌref.əˈriː/", meaning: "trọng tài", audioUrl: "", exampleEn: "The referee blew the whistle.", exampleVi: "Trọng tài đã thổi còi." },
  { lesson: 17, word: "score", type: "noun", phonetic: "/skɔːr/", meaning: "tỷ số, điểm số", audioUrl: "", exampleEn: "What is the final score?", exampleVi: "Tỷ số chung cuộc là bao nhiêu?" },
  { lesson: 17, word: "goal", type: "noun", phonetic: "/ɡəʊl/", meaning: "bàn thắng", audioUrl: "", exampleEn: "He scored a beautiful goal.", exampleVi: "Anh ấy đã ghi một bàn thắng đẹp mắt." },
  { lesson: 17, word: "win", type: "verb", phonetic: "/wɪn/", meaning: "chiến thắng", audioUrl: "", exampleEn: "We want to win the championship.", exampleVi: "Chúng tôi muốn giành chức vô địch." },
  { lesson: 17, word: "lose", type: "verb", phonetic: "/luːz/", meaning: "thua", audioUrl: "", exampleEn: "They didn't want to lose the game.", exampleVi: "Họ không muốn thua trận đấu." },
  { lesson: 17, word: "draw", type: "noun", phonetic: "/drɔː/", meaning: "trận hòa", audioUrl: "", exampleEn: "The match ended in a draw.", exampleVi: "Trận đấu kết thúc với tỷ số hòa." },
  { lesson: 17, word: "stadium", type: "noun", phonetic: "/ˈsteɪ.di.əm/", meaning: "sân vận động", audioUrl: "", exampleEn: "The stadium was full of fans.", exampleVi: "Sân vận động chật kín người hâm mộ." },
  { lesson: 17, word: "court", type: "noun", phonetic: "/kɔːt/", meaning: "sân (tennis, bóng rổ...)", audioUrl: "", exampleEn: "The tennis players are on the court.", exampleVi: "Các tay vợt đang ở trên sân." },
  { lesson: 17, word: "pitch", type: "noun", phonetic: "/pɪtʃ/", meaning: "sân (bóng đá, bóng bầu dục...)", audioUrl: "", exampleEn: "The players ran onto the football pitch.", exampleVi: "Các cầu thủ chạy ra sân bóng đá." },
  { lesson: 17, word: "gym", type: "noun", phonetic: "/dʒɪm/", meaning: "phòng tập thể dục", audioUrl: "", exampleEn: "I go to the gym three times a week.", exampleVi: "Tôi đi tập gym ba lần một tuần." },
  { lesson: 17, word: "athlete", type: "noun", phonetic: "/ˈæθ.liːt/", meaning: "vận động viên", audioUrl: "", exampleEn: "She is a professional athlete.", exampleVi: "Cô ấy là một vận động viên chuyên nghiệp." },
  { lesson: 17, word: "medal", type: "noun", phonetic: "/ˈmed.əl/", meaning: "huy chương", audioUrl: "", exampleEn: "He won a gold medal in the Olympics.", exampleVi: "Anh ấy đã giành huy chương vàng tại Thế vận hội." },
  { lesson: 17, word: "champion", type: "noun", phonetic: "/ˈtʃæm.pi.ən/", meaning: "nhà vô địch", audioUrl: "", exampleEn: "She is the world tennis champion.", exampleVi: "Cô ấy là nhà vô địch quần vợt thế giới." },

  // BÀI 18: Film, Theatre & Music
  { lesson: 18, word: "cinema", type: "noun", phonetic: "/ˈsɪn.ə.mə/", meaning: "rạp chiếu phim", audioUrl: "", exampleEn: "We are going to the cinema tonight.", exampleVi: "Tối nay chúng tôi sẽ đi xem phim." },
  { lesson: 18, word: "theatre", type: "noun", phonetic: "/ˈθɪə.tər/", meaning: "nhà hát", audioUrl: "", exampleEn: "We saw a great play at the theatre.", exampleVi: "Chúng tôi đã xem một vở kịch hay tại nhà hát." },
  { lesson: 18, word: "concert", type: "noun", phonetic: "/ˈkɒn.sət/", meaning: "buổi hòa nhạc", audioUrl: "", exampleEn: "I have tickets for a rock concert.", exampleVi: "Tôi có vé xem một buổi hòa nhạc rock." },
  { lesson: 18, word: "audience", type: "noun", phonetic: "/ˈɔː.di.əns/", meaning: "khán giả", audioUrl: "", exampleEn: "The audience clapped loudly.", exampleVi: "Khán giả vỗ tay lớn." },
  { lesson: 18, word: "stage", type: "noun", phonetic: "/steɪdʒ/", meaning: "sân khấu", audioUrl: "", exampleEn: "The actors walked onto the stage.", exampleVi: "Các diễn viên bước ra sân khấu." },
  { lesson: 18, word: "performance", type: "noun", phonetic: "/pəˈfɔː.məns/", meaning: "màn trình diễn", audioUrl: "", exampleEn: "Her performance was amazing.", exampleVi: "Màn trình diễn của cô ấy thật tuyệt vời." },
  { lesson: 18, word: "actor", type: "noun", phonetic: "/ˈæk.tər/", meaning: "nam diễn viên", audioUrl: "", exampleEn: "He is a famous Hollywood actor.", exampleVi: "Anh ấy là một nam diễn viên nổi tiếng ở Hollywood." },
  { lesson: 18, word: "actress", type: "noun", phonetic: "/ˈæk.trəs/", meaning: "nữ diễn viên", audioUrl: "", exampleEn: "She won an award for best actress.", exampleVi: "Cô ấy đã giành giải thưởng nữ diễn viên xuất sắc nhất." },
  { lesson: 18, word: "director", type: "noun", phonetic: "/daɪˈrek.tər/", meaning: "đạo diễn", audioUrl: "", exampleEn: "The director told the actors what to do.", exampleVi: "Đạo diễn bảo các diễn viên phải làm gì." },
  { lesson: 18, word: "scene", type: "noun", phonetic: "/siːn/", meaning: "cảnh (trong phim/kịch)", audioUrl: "", exampleEn: "This is my favourite scene in the movie.", exampleVi: "Đây là cảnh tôi thích nhất trong phim." },
  { lesson: 18, word: "script", type: "noun", phonetic: "/skrɪpt/", meaning: "kịch bản", audioUrl: "", exampleEn: "The actors are reading the script.", exampleVi: "Các diễn viên đang đọc kịch bản." },
  { lesson: 18, word: "character", type: "noun", phonetic: "/ˈkær.ək.tər/", meaning: "nhân vật", audioUrl: "", exampleEn: "Harry Potter is a famous fictional character.", exampleVi: "Harry Potter là một nhân vật hư cấu nổi tiếng." },
  { lesson: 18, word: "comedy", type: "noun", phonetic: "/ˈkɒm.ə.di/", meaning: "phim hài, kịch hài", audioUrl: "", exampleEn: "We watched a funny comedy on TV.", exampleVi: "Chúng tôi đã xem một bộ phim hài vui nhộn trên tivi." },
  { lesson: 18, word: "tragedy", type: "noun", phonetic: "/ˈtrædʒ.ə.di/", meaning: "bi kịch", audioUrl: "", exampleEn: "Romeo and Juliet is a famous tragedy.", exampleVi: "Romeo và Juliet là một vở bi kịch nổi tiếng." },
  { lesson: 18, word: "instrument", type: "noun", phonetic: "/ˈɪn.strə.mənt/", meaning: "nhạc cụ", audioUrl: "", exampleEn: "Do you play a musical instrument?", exampleVi: "Bạn có chơi nhạc cụ nào không?" },
  { lesson: 18, word: "guitar", type: "noun", phonetic: "/ɡɪˈtɑːr/", meaning: "đàn ghi-ta", audioUrl: "", exampleEn: "He is learning to play the guitar.", exampleVi: "Cậu ấy đang học chơi ghi-ta." },
  { lesson: 18, word: "band", type: "noun", phonetic: "/bænd/", meaning: "ban nhạc", audioUrl: "", exampleEn: "My brother plays drums in a rock band.", exampleVi: "Anh trai tôi chơi trống trong một ban nhạc rock." },
  { lesson: 18, word: "orchestra", type: "noun", phonetic: "/ˈɔː.kɪ.strə/", meaning: "dàn nhạc giao hưởng", audioUrl: "", exampleEn: "The orchestra played Beethoven.", exampleVi: "Dàn nhạc đã chơi nhạc của Beethoven." },
  { lesson: 18, word: "album", type: "noun", phonetic: "/ˈæl.bəm/", meaning: "tập nhạc, album", audioUrl: "", exampleEn: "The singer released a new album.", exampleVi: "Ca sĩ đã phát hành một album mới." },
  { lesson: 18, word: "track", type: "noun", phonetic: "/træk/", meaning: "bài hát (trong album)", audioUrl: "", exampleEn: "My favourite track is number three.", exampleVi: "Bài hát yêu thích của tôi là bài số ba." },

  // BÀI 19: The Media & News
  { lesson: 19, word: "media", type: "noun", phonetic: "/ˈmiː.di.ə/", meaning: "phương tiện truyền thông", audioUrl: "", exampleEn: "The mass media has a lot of power.", exampleVi: "Các phương tiện thông tin đại chúng có rất nhiều quyền lực." },
  { lesson: 19, word: "news", type: "noun", phonetic: "/njuːz/", meaning: "tin tức", audioUrl: "", exampleEn: "Did you hear the news today?", exampleVi: "Bạn có nghe tin tức hôm nay không?" },
  { lesson: 19, word: "newspaper", type: "noun", phonetic: "/ˈnjuːzˌpeɪ.pər/", meaning: "tờ báo", audioUrl: "", exampleEn: "My father reads the newspaper every morning.", exampleVi: "Bố tôi đọc báo mỗi sáng." },
  { lesson: 19, word: "magazine", type: "noun", phonetic: "/ˌmæɡ.əˈziːn/", meaning: "tạp chí", audioUrl: "", exampleEn: "She bought a fashion magazine.", exampleVi: "Cô ấy đã mua một cuốn tạp chí thời trang." },
  { lesson: 19, word: "article", type: "noun", phonetic: "/ˈɑː.tɪ.kəl/", meaning: "bài báo", audioUrl: "", exampleEn: "I read an interesting article about space.", exampleVi: "Tôi đã đọc một bài báo thú vị về không gian." },
  { lesson: 19, word: "journalist", type: "noun", phonetic: "/ˈdʒɜː.nə.lɪst/", meaning: "nhà báo", audioUrl: "", exampleEn: "The journalist interviewed the president.", exampleVi: "Nhà báo đã phỏng vấn tổng thống." },
  { lesson: 19, word: "reporter", type: "noun", phonetic: "/rɪˈpɔː.tər/", meaning: "phóng viên", audioUrl: "", exampleEn: "A reporter is speaking live from the scene.", exampleVi: "Một phóng viên đang đưa tin trực tiếp từ hiện trường." },
  { lesson: 19, word: "headline", type: "noun", phonetic: "/ˈhed.laɪn/", meaning: "tiêu đề", audioUrl: "", exampleEn: "The scandal was in all the headlines.", exampleVi: "Vụ bê bối đã xuất hiện trên tất cả các trang nhất." },
  { lesson: 19, word: "broadcast", type: "verb", phonetic: "/ˈbrɔːd.kɑːst/", meaning: "phát sóng", audioUrl: "", exampleEn: "The match will be broadcast live.", exampleVi: "Trận đấu sẽ được phát sóng trực tiếp." },
  { lesson: 19, word: "channel", type: "noun", phonetic: "/ˈtʃæn.əl/", meaning: "kênh (TV)", audioUrl: "", exampleEn: "Can you change the channel?", exampleVi: "Bạn có thể chuyển kênh được không?" },
  { lesson: 19, word: "programme", type: "noun", phonetic: "/ˈprəʊ.ɡræm/", meaning: "chương trình (TV/Radio)", audioUrl: "", exampleEn: "What is your favourite TV programme?", exampleVi: "Chương trình truyền hình yêu thích của bạn là gì?" },
  { lesson: 19, word: "documentary", type: "noun", phonetic: "/ˌdɒk.jəˈmen.tər.i/", meaning: "phim tài liệu", audioUrl: "", exampleEn: "We watched a documentary about lions.", exampleVi: "Chúng tôi đã xem một bộ phim tài liệu về sư tử." },
  { lesson: 19, word: "interview", type: "noun", phonetic: "/ˈɪn.tə.vjuː/", meaning: "cuộc phỏng vấn", audioUrl: "", exampleEn: "The actor gave an interview on TV.", exampleVi: "Nam diễn viên đã có một cuộc phỏng vấn trên truyền hình." },
  { lesson: 19, word: "advertisement", type: "noun", phonetic: "/ədˈvɜː.tɪs.mənt/", meaning: "quảng cáo", audioUrl: "", exampleEn: "I hate watching advertisements on YouTube.", exampleVi: "Tôi ghét xem quảng cáo trên YouTube." },
  { lesson: 19, word: "publish", type: "verb", phonetic: "/ˈpʌb.lɪʃ/", meaning: "xuất bản", audioUrl: "", exampleEn: "The book was published last year.", exampleVi: "Cuốn sách đã được xuất bản năm ngoái." },
  { lesson: 19, word: "editor", type: "noun", phonetic: "/ˈed.ɪ.tər/", meaning: "biên tập viên", audioUrl: "", exampleEn: "The editor checks the articles for mistakes.", exampleVi: "Biên tập viên kiểm tra các bài báo để tìm lỗi." },
  { lesson: 19, word: "website", type: "noun", phonetic: "/ˈweb.saɪt/", meaning: "trang web", audioUrl: "", exampleEn: "You can find more info on our website.", exampleVi: "Bạn có thể tìm hiểu thêm thông tin trên trang web của chúng tôi." },
  { lesson: 19, word: "blog", type: "noun", phonetic: "/blɒɡ/", meaning: "trang nhật ký cá nhân (trên mạng)", audioUrl: "", exampleEn: "She writes a travel blog.", exampleVi: "Cô ấy viết một blog du lịch." },
  { lesson: 19, word: "social media", type: "noun", phonetic: "/ˌsəʊ.ʃəl ˈmiː.di.ə/", meaning: "mạng xã hội", audioUrl: "", exampleEn: "Teenagers spend a lot of time on social media.", exampleVi: "Thanh thiếu niên dành nhiều thời gian trên mạng xã hội." },
  { lesson: 19, word: "post", type: "verb", phonetic: "/pəʊst/", meaning: "đăng bài", audioUrl: "", exampleEn: "I posted a picture on Instagram.", exampleVi: "Tôi đã đăng một bức ảnh lên Instagram." },

  // BÀI 20: Technology & The Internet
  { lesson: 20, word: "technology", type: "noun", phonetic: "/tekˈnɒl.ə.dʒi/", meaning: "công nghệ", audioUrl: "", exampleEn: "Modern technology has changed our lives.", exampleVi: "Công nghệ hiện đại đã thay đổi cuộc sống của chúng ta." },
  { lesson: 20, word: "computer", type: "noun", phonetic: "/kəmˈpjuː.tər/", meaning: "máy vi tính", audioUrl: "", exampleEn: "I need a new computer for work.", exampleVi: "Tôi cần một chiếc máy tính mới để làm việc." },
  { lesson: 20, word: "laptop", type: "noun", phonetic: "/ˈlæp.tɒp/", meaning: "máy tính xách tay", audioUrl: "", exampleEn: "He takes his laptop everywhere.", exampleVi: "Anh ấy mang theo máy tính xách tay của mình đi khắp nơi." },
  { lesson: 20, word: "screen", type: "noun", phonetic: "/skriːn/", meaning: "màn hình", audioUrl: "", exampleEn: "My phone screen is broken.", exampleVi: "Màn hình điện thoại của tôi bị vỡ." },
  { lesson: 20, word: "keyboard", type: "noun", phonetic: "/ˈkiː.bɔːd/", meaning: "bàn phím", audioUrl: "", exampleEn: "The keyboard is connected via Bluetooth.", exampleVi: "Bàn phím được kết nối qua Bluetooth." },
  { lesson: 20, word: "mouse", type: "noun", phonetic: "/maʊs/", meaning: "chuột máy tính", audioUrl: "", exampleEn: "Click the right button on the mouse.", exampleVi: "Nhấp vào nút bên phải của chuột." },
  { lesson: 20, word: "internet", type: "noun", phonetic: "/ˈɪn.tə.net/", meaning: "mạng internet", audioUrl: "", exampleEn: "I searched for the answer on the internet.", exampleVi: "Tôi đã tìm kiếm câu trả lời trên mạng internet." },
  { lesson: 20, word: "browser", type: "noun", phonetic: "/ˈbraʊ.zər/", meaning: "trình duyệt web", audioUrl: "", exampleEn: "Chrome is a popular web browser.", exampleVi: "Chrome là một trình duyệt web phổ biến." },
  { lesson: 20, word: "download", type: "verb", phonetic: "/ˌdaʊnˈləʊd/", meaning: "tải xuống", audioUrl: "", exampleEn: "You can download the app for free.", exampleVi: "Bạn có thể tải ứng dụng này miễn phí." },
  { lesson: 20, word: "upload", type: "verb", phonetic: "/ʌpˈləʊd/", meaning: "tải lên", audioUrl: "", exampleEn: "I uploaded the video to YouTube.", exampleVi: "Tôi đã tải video lên YouTube." },
  { lesson: 20, word: "install", type: "verb", phonetic: "/ɪnˈstɔːl/", meaning: "cài đặt", audioUrl: "", exampleEn: "How do I install this software?", exampleVi: "Làm cách nào để tôi cài đặt phần mềm này?" },
  { lesson: 20, word: "delete", type: "verb", phonetic: "/dɪˈliːt/", meaning: "xóa", audioUrl: "", exampleEn: "I accidentally deleted the file.", exampleVi: "Tôi đã vô tình xóa mất tập tin." },
  { lesson: 20, word: "password", type: "noun", phonetic: "/ˈpɑːs.wɜːd/", meaning: "mật khẩu", audioUrl: "", exampleEn: "Please enter your password.", exampleVi: "Vui lòng nhập mật khẩu của bạn." },
  { lesson: 20, word: "account", type: "noun", phonetic: "/əˈkaʊnt/", meaning: "tài khoản", audioUrl: "", exampleEn: "You need to create an account first.", exampleVi: "Bạn cần tạo một tài khoản trước." },
  { lesson: 20, word: "device", type: "noun", phonetic: "/dɪˈvaɪs/", meaning: "thiết bị", audioUrl: "", exampleEn: "Smartphones are very useful devices.", exampleVi: "Điện thoại thông minh là những thiết bị rất hữu ích." },
  { lesson: 20, word: "battery", type: "noun", phonetic: "/ˈbæt.ər.i/", meaning: "pin", audioUrl: "", exampleEn: "My phone battery is low.", exampleVi: "Pin điện thoại của tôi sắp hết." },
  { lesson: 20, word: "charge", type: "verb", phonetic: "/tʃɑːdʒ/", meaning: "sạc pin", audioUrl: "", exampleEn: "I need to charge my phone.", exampleVi: "Tôi cần sạc điện thoại." },
  { lesson: 20, word: "connect", type: "verb", phonetic: "/kəˈnekt/", meaning: "kết nối", audioUrl: "", exampleEn: "Connect the printer to your computer.", exampleVi: "Kết nối máy in với máy tính của bạn." },
  { lesson: 20, word: "network", type: "noun", phonetic: "/ˈnet.wɜːk/", meaning: "mạng lưới", audioUrl: "", exampleEn: "The wireless network is down.", exampleVi: "Mạng không dây đang bị hỏng." },
  { lesson: 20, word: "signal", type: "noun", phonetic: "/ˈsɪɡ.nəl/", meaning: "tín hiệu", audioUrl: "", exampleEn: "There is no WiFi signal here.", exampleVi: "Không có tín hiệu WiFi ở đây." }
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

  console.log(`\n🎉 Hoàn thành nạp ${successCount} từ vựng Batch 4 cho PET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

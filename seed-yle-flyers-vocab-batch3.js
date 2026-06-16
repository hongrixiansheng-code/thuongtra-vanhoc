/**
 * SEED SCRIPT: YLE Flyers Vocabulary — Batch 3 (Bài 11 - 15)
 * Chạy từ thư mục gốc: node seed-yle-flyers-vocab-batch3.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 11: The Town (Thị trấn)
  { lesson: 11, word: "airport", type: "noun", phonetic: "/ˈeə.pɔːt/", meaning: "sân bay", audioUrl: "", exampleEn: "We arrived at the airport early.", exampleVi: "Chúng tôi đã đến sân bay sớm." },
  { lesson: 11, word: "bridge", type: "noun", phonetic: "/brɪdʒ/", meaning: "cây cầu", audioUrl: "", exampleEn: "They walked across the bridge.", exampleVi: "Họ đã đi bộ qua cây cầu." },
  { lesson: 11, word: "castle", type: "noun", phonetic: "/ˈkɑː.səl/", meaning: "lâu đài", audioUrl: "", exampleEn: "The king lives in a big castle.", exampleVi: "Vị vua sống trong một tòa lâu đài lớn." },
  { lesson: 11, word: "chemist", type: "noun", phonetic: "/ˈkem.ɪst/", meaning: "tiệm thuốc tây", audioUrl: "", exampleEn: "I bought some medicine at the chemist.", exampleVi: "Tôi đã mua một ít thuốc ở tiệm thuốc tây." },
  { lesson: 11, word: "factory", type: "noun", phonetic: "/ˈfæk.tər.i/", meaning: "nhà máy", audioUrl: "", exampleEn: "My dad works in a car factory.", exampleVi: "Bố tôi làm việc trong một nhà máy sản xuất ô tô." },
  { lesson: 11, word: "fire station", type: "noun", phonetic: "/ˈfaɪə ˌsteɪ.ʃən/", meaning: "trạm cứu hỏa", audioUrl: "", exampleEn: "The fire engine left the fire station.", exampleVi: "Xe cứu hỏa đã rời khỏi trạm cứu hỏa." },
  { lesson: 11, word: "hotel", type: "noun", phonetic: "/həʊˈtel/", meaning: "khách sạn", audioUrl: "", exampleEn: "We stayed in a beautiful hotel.", exampleVi: "Chúng tôi đã ở trong một khách sạn tuyệt đẹp." },
  { lesson: 11, word: "museum", type: "noun", phonetic: "/mjuːˈziː.əm/", meaning: "bảo tàng", audioUrl: "", exampleEn: "We saw dinosaur bones in the museum.", exampleVi: "Chúng tôi đã nhìn thấy xương khủng long ở bảo tàng." },
  { lesson: 11, word: "police station", type: "noun", phonetic: "/pəˈliːs ˌsteɪ.ʃən/", meaning: "đồn cảnh sát", audioUrl: "", exampleEn: "The thief was taken to the police station.", exampleVi: "Tên trộm đã bị đưa đến đồn cảnh sát." },
  { lesson: 11, word: "post office", type: "noun", phonetic: "/ˈpəʊst ˌɒf.ɪs/", meaning: "bưu điện", audioUrl: "", exampleEn: "I need to send this letter at the post office.", exampleVi: "Tôi cần gửi lá thư này ở bưu điện." },
  { lesson: 11, word: "restaurant", type: "noun", phonetic: "/ˈres.trɒnt/", meaning: "nhà hàng", audioUrl: "", exampleEn: "We had dinner at a nice restaurant.", exampleVi: "Chúng tôi đã ăn tối tại một nhà hàng tuyệt vời." },
  { lesson: 11, word: "stadium", type: "noun", phonetic: "/ˈsteɪ.di.əm/", meaning: "sân vận động", audioUrl: "", exampleEn: "Thousands of people were in the stadium.", exampleVi: "Hàng ngàn người đã có mặt ở sân vận động." },
  { lesson: 11, word: "theatre", type: "noun", phonetic: "/ˈθɪə.tər/", meaning: "nhà hát", audioUrl: "", exampleEn: "We watched a play at the theatre.", exampleVi: "Chúng tôi đã xem một vở kịch ở nhà hát." },
  { lesson: 11, word: "corner", type: "noun", phonetic: "/ˈkɔː.nər/", meaning: "góc phố, góc", audioUrl: "", exampleEn: "The shop is on the corner.", exampleVi: "Cửa hàng nằm ở góc phố." },
  { lesson: 11, word: "crossing", type: "noun", phonetic: "/ˈkrɒs.ɪŋ/", meaning: "vạch qua đường", audioUrl: "", exampleEn: "Always use the pedestrian crossing.", exampleVi: "Luôn sử dụng vạch kẻ đường dành cho người đi bộ." },
  { lesson: 11, word: "roundabout", type: "noun", phonetic: "/ˈraʊnd.ə.baʊt/", meaning: "vòng xuyến", audioUrl: "", exampleEn: "Turn left at the roundabout.", exampleVi: "Hãy rẽ trái tại vòng xuyến." },
  { lesson: 11, word: "bank", type: "noun", phonetic: "/bæŋk/", meaning: "ngân hàng", audioUrl: "", exampleEn: "She went to the bank to get some money.", exampleVi: "Cô ấy đã đến ngân hàng để rút một ít tiền." },
  { lesson: 11, word: "square", type: "noun", phonetic: "/skweər/", meaning: "quảng trường", audioUrl: "", exampleEn: "There is a big statue in the town square.", exampleVi: "Có một bức tượng lớn ở quảng trường thị trấn." },
  { lesson: 11, word: "path", type: "noun", phonetic: "/pɑːθ/", meaning: "con đường nhỏ", audioUrl: "", exampleEn: "Follow the path to the park.", exampleVi: "Hãy đi theo con đường nhỏ để đến công viên." },
  { lesson: 11, word: "traffic", type: "noun", phonetic: "/ˈtræf.ɪk/", meaning: "giao thông", audioUrl: "", exampleEn: "There is a lot of traffic today.", exampleVi: "Hôm nay giao thông rất đông đúc." },

  // BÀI 12: Transport (Giao thông vận tải)
  { lesson: 12, word: "ambulance", type: "noun", phonetic: "/ˈæm.bjə.ləns/", meaning: "xe cứu thương", audioUrl: "", exampleEn: "The ambulance rushed to the hospital.", exampleVi: "Xe cứu thương lao vút đến bệnh viện." },
  { lesson: 12, word: "helicopter", type: "noun", phonetic: "/ˈhel.ɪˌkɒp.tər/", meaning: "trực thăng", audioUrl: "", exampleEn: "The helicopter flew over the city.", exampleVi: "Chiếc trực thăng bay lượn trên bầu trời thành phố." },
  { lesson: 12, word: "passenger", type: "noun", phonetic: "/ˈpæs.ən.dʒər/", meaning: "hành khách", audioUrl: "", exampleEn: "The train is full of passengers.", exampleVi: "Chuyến tàu chở đầy hành khách." },
  { lesson: 12, word: "taxi", type: "noun", phonetic: "/ˈtæk.si/", meaning: "xe taxi", audioUrl: "", exampleEn: "We took a taxi to the hotel.", exampleVi: "Chúng tôi đã bắt taxi đến khách sạn." },
  { lesson: 12, word: "tyre", type: "noun", phonetic: "/taɪər/", meaning: "lốp xe", audioUrl: "", exampleEn: "The car has a flat tyre.", exampleVi: "Chiếc ô tô bị xịt lốp." },
  { lesson: 12, word: "wheel", type: "noun", phonetic: "/wiːl/", meaning: "bánh xe", audioUrl: "", exampleEn: "A bicycle has two wheels.", exampleVi: "Xe đạp có hai bánh xe." },
  { lesson: 12, word: "platform", type: "noun", phonetic: "/ˈplæt.fɔːm/", meaning: "sân ga", audioUrl: "", exampleEn: "The train arrived at platform 3.", exampleVi: "Chuyến tàu đã tới sân ga số 3." },
  { lesson: 12, word: "rocket", type: "noun", phonetic: "/ˈrɒk.ɪt/", meaning: "tên lửa", audioUrl: "", exampleEn: "The rocket flew into space.", exampleVi: "Tên lửa đã bay vào vũ trụ." },
  { lesson: 12, word: "spaceship", type: "noun", phonetic: "/ˈspeɪs.ʃɪp/", meaning: "tàu vũ trụ", audioUrl: "", exampleEn: "Aliens travel in a spaceship.", exampleVi: "Người ngoài hành tinh du hành bằng tàu vũ trụ." },
  { lesson: 12, word: "journey", type: "noun", phonetic: "/ˈdʒɜː.ni/", meaning: "hành trình", audioUrl: "", exampleEn: "We had a long journey by train.", exampleVi: "Chúng tôi đã có một hành trình dài bằng tàu hỏa." },
  { lesson: 12, word: "flight", type: "noun", phonetic: "/flaɪt/", meaning: "chuyến bay", audioUrl: "", exampleEn: "My flight to Paris is at 10 AM.", exampleVi: "Chuyến bay của tôi đến Paris khởi hành lúc 10 giờ sáng." },
  { lesson: 12, word: "ticket", type: "noun", phonetic: "/ˈtɪk.ɪt/", meaning: "vé", audioUrl: "", exampleEn: "I bought a train ticket.", exampleVi: "Tôi đã mua một tấm vé tàu." },
  { lesson: 12, word: "luggage", type: "noun", phonetic: "/ˈlʌɡ.ɪdʒ/", meaning: "hành lý", audioUrl: "", exampleEn: "He carries a lot of luggage.", exampleVi: "Anh ấy mang theo rất nhiều hành lý." },
  { lesson: 12, word: "backpack", type: "noun", phonetic: "/ˈbæk.pæk/", meaning: "ba lô", audioUrl: "", exampleEn: "She put her books in the backpack.", exampleVi: "Cô ấy đặt những cuốn sách vào ba lô." },
  { lesson: 12, word: "arrive", type: "verb", phonetic: "/əˈraɪv/", meaning: "đến nơi", audioUrl: "", exampleEn: "We will arrive at 6 PM.", exampleVi: "Chúng tôi sẽ đến nơi vào lúc 6 giờ chiều." },
  { lesson: 12, word: "leave", type: "verb", phonetic: "/liːv/", meaning: "rời đi", audioUrl: "", exampleEn: "The bus leaves in ten minutes.", exampleVi: "Xe buýt sẽ rời đi trong mười phút nữa." },
  { lesson: 12, word: "map", type: "noun", phonetic: "/mæp/", meaning: "bản đồ", audioUrl: "", exampleEn: "Look at the map to find the way.", exampleVi: "Hãy nhìn vào bản đồ để tìm đường." },
  { lesson: 12, word: "motorway", type: "noun", phonetic: "/ˈməʊ.tə.weɪ/", meaning: "đường cao tốc", audioUrl: "", exampleEn: "Cars drive very fast on the motorway.", exampleVi: "Ô tô chạy rất nhanh trên đường cao tốc." },
  { lesson: 12, word: "traffic light", type: "noun", phonetic: "/ˈtræf.ɪk ˌlaɪt/", meaning: "đèn giao thông", audioUrl: "", exampleEn: "Stop at the red traffic light.", exampleVi: "Hãy dừng lại khi gặp đèn giao thông màu đỏ." },
  { lesson: 12, word: "underground", type: "noun", phonetic: "/ˌʌn.dəˈɡraʊnd/", meaning: "tàu điện ngầm", audioUrl: "", exampleEn: "We travel to work by underground.", exampleVi: "Chúng tôi đi làm bằng tàu điện ngầm." },

  // BÀI 13: Time and Weather (Thời gian và thời tiết)
  { lesson: 13, word: "autumn", type: "noun", phonetic: "/ˈɔː.təm/", meaning: "mùa thu", audioUrl: "", exampleEn: "Leaves turn yellow in autumn.", exampleVi: "Lá cây chuyển sang màu vàng vào mùa thu." },
  { lesson: 13, word: "spring", type: "noun", phonetic: "/sprɪŋ/", meaning: "mùa xuân", audioUrl: "", exampleEn: "Flowers bloom in spring.", exampleVi: "Hoa nở vào mùa xuân." },
  { lesson: 13, word: "summer", type: "noun", phonetic: "/ˈsʌm.ər/", meaning: "mùa hè", audioUrl: "", exampleEn: "We go to the beach in summer.", exampleVi: "Chúng tôi đi biển vào mùa hè." },
  { lesson: 13, word: "winter", type: "noun", phonetic: "/ˈwɪn.tər/", meaning: "mùa đông", audioUrl: "", exampleEn: "It often snows in winter.", exampleVi: "Trời thường có tuyết rơi vào mùa đông." },
  { lesson: 13, word: "storm", type: "noun", phonetic: "/stɔːm/", meaning: "cơn bão", audioUrl: "", exampleEn: "There was a terrible storm last night.", exampleVi: "Đã có một cơn bão kinh hoàng đêm qua." },
  { lesson: 13, word: "fog", type: "noun", phonetic: "/fɒɡ/", meaning: "sương mù", audioUrl: "", exampleEn: "It is difficult to drive in the fog.", exampleVi: "Thật khó để lái xe trong sương mù." },
  { lesson: 13, word: "ice", type: "noun", phonetic: "/aɪs/", meaning: "băng, đá", audioUrl: "", exampleEn: "There is ice on the road.", exampleVi: "Có băng đóng trên đường." },
  { lesson: 13, word: "midday", type: "noun", phonetic: "/ˌmɪdˈdeɪ/", meaning: "giữa trưa", audioUrl: "", exampleEn: "We have lunch at midday.", exampleVi: "Chúng tôi ăn trưa vào lúc giữa trưa." },
  { lesson: 13, word: "midnight", type: "noun", phonetic: "/ˈmɪd.naɪt/", meaning: "nửa đêm", audioUrl: "", exampleEn: "I was asleep at midnight.", exampleVi: "Tôi đã ngủ say vào lúc nửa đêm." },
  { lesson: 13, word: "minute", type: "noun", phonetic: "/ˈmɪn.ɪt/", meaning: "phút", audioUrl: "", exampleEn: "Wait a minute, please.", exampleVi: "Làm ơn hãy đợi một phút." },
  { lesson: 13, word: "month", type: "noun", phonetic: "/mʌnθ/", meaning: "tháng", audioUrl: "", exampleEn: "December is the last month of the year.", exampleVi: "Tháng Mười hai là tháng cuối cùng của năm." },
  { lesson: 13, word: "century", type: "noun", phonetic: "/ˈsen.tʃər.i/", meaning: "thế kỷ", audioUrl: "", exampleEn: "We live in the 21st century.", exampleVi: "Chúng ta đang sống ở thế kỷ 21." },
  { lesson: 13, word: "future", type: "noun", phonetic: "/ˈfjuː.tʃər/", meaning: "tương lai", audioUrl: "", exampleEn: "I want to be a doctor in the future.", exampleVi: "Tôi muốn trở thành bác sĩ trong tương lai." },
  { lesson: 13, word: "past", type: "noun", phonetic: "/pɑːst/", meaning: "quá khứ", audioUrl: "", exampleEn: "Dinosaurs lived in the past.", exampleVi: "Khủng long đã sống ở trong quá khứ." },
  { lesson: 13, word: "present", type: "noun", phonetic: "/ˈprez.ənt/", meaning: "hiện tại, món quà", audioUrl: "", exampleEn: "Live in the present.", exampleVi: "Hãy sống trong hiện tại." },
  { lesson: 13, word: "tomorrow", type: "noun", phonetic: "/təˈmɒr.əʊ/", meaning: "ngày mai", audioUrl: "", exampleEn: "I will see you tomorrow.", exampleVi: "Tôi sẽ gặp bạn vào ngày mai." },
  { lesson: 13, word: "yesterday", type: "noun", phonetic: "/ˈjes.tə.deɪ/", meaning: "hôm qua", audioUrl: "", exampleEn: "I played football yesterday.", exampleVi: "Hôm qua tôi đã chơi bóng đá." },
  { lesson: 13, word: "degree", type: "noun", phonetic: "/dɪˈɡriː/", meaning: "độ (nhiệt độ)", audioUrl: "", exampleEn: "It is 30 degrees today.", exampleVi: "Hôm nay trời nóng 30 độ." },
  { lesson: 13, word: "freeze", type: "verb", phonetic: "/friːz/", meaning: "đóng băng", audioUrl: "", exampleEn: "Water freezes at 0 degrees.", exampleVi: "Nước đóng băng ở 0 độ." },
  { lesson: 13, word: "thunder", type: "noun", phonetic: "/ˈθʌn.dər/", meaning: "sấm sét", audioUrl: "", exampleEn: "The thunder was very loud.", exampleVi: "Tiếng sấm rất lớn." },

  // BÀI 14: The World Around Us (Thế giới quanh ta)
  { lesson: 14, word: "cave", type: "noun", phonetic: "/keɪv/", meaning: "hang động", audioUrl: "", exampleEn: "Bears sleep in a cave during winter.", exampleVi: "Những con gấu ngủ trong hang động vào mùa đông." },
  { lesson: 14, word: "desert", type: "noun", phonetic: "/ˈdez.ət/", meaning: "sa mạc", audioUrl: "", exampleEn: "It is very hot and dry in the desert.", exampleVi: "Trời rất nóng và khô ở sa mạc." },
  { lesson: 14, word: "environment", type: "noun", phonetic: "/ɪnˈvaɪ.rən.mənt/", meaning: "môi trường", audioUrl: "", exampleEn: "We must protect the environment.", exampleVi: "Chúng ta phải bảo vệ môi trường." },
  { lesson: 14, word: "hill", type: "noun", phonetic: "/hɪl/", meaning: "ngọn đồi", audioUrl: "", exampleEn: "They climbed up the green hill.", exampleVi: "Họ đã trèo lên ngọn đồi xanh." },
  { lesson: 14, word: "island", type: "noun", phonetic: "/ˈaɪ.lənd/", meaning: "hòn đảo", audioUrl: "", exampleEn: "We spent our holiday on a small island.", exampleVi: "Chúng tôi đã dành kỳ nghỉ trên một hòn đảo nhỏ." },
  { lesson: 14, word: "jungle", type: "noun", phonetic: "/ˈdʒʌŋ.ɡəl/", meaning: "rừng rậm", audioUrl: "", exampleEn: "Tigers live in the jungle.", exampleVi: "Hổ sống trong những khu rừng rậm." },
  { lesson: 14, word: "ocean", type: "noun", phonetic: "/ˈəʊ.ʃən/", meaning: "đại dương", audioUrl: "", exampleEn: "Whales swim in the ocean.", exampleVi: "Những con cá voi bơi trong đại dương." },
  { lesson: 14, word: "planet", type: "noun", phonetic: "/ˈplæn.ɪt/", meaning: "hành tinh", audioUrl: "", exampleEn: "Earth is our beautiful planet.", exampleVi: "Trái Đất là hành tinh xinh đẹp của chúng ta." },
  { lesson: 14, word: "pond", type: "noun", phonetic: "/pɒnd/", meaning: "cái ao", audioUrl: "", exampleEn: "There are frogs in the pond.", exampleVi: "Có những con ếch ở trong ao." },
  { lesson: 14, word: "sky", type: "noun", phonetic: "/skaɪ/", meaning: "bầu trời", audioUrl: "", exampleEn: "Look at the blue sky.", exampleVi: "Hãy nhìn lên bầu trời xanh." },
  { lesson: 14, word: "space", type: "noun", phonetic: "/speɪs/", meaning: "không gian, vũ trụ", audioUrl: "", exampleEn: "Astronauts travel in space.", exampleVi: "Các phi hành gia du hành trong vũ trụ." },
  { lesson: 14, word: "stream", type: "noun", phonetic: "/striːm/", meaning: "dòng suối", audioUrl: "", exampleEn: "A small stream flows through the forest.", exampleVi: "Một dòng suối nhỏ chảy xuyên qua khu rừng." },
  { lesson: 14, word: "wood", type: "noun", phonetic: "/wʊd/", meaning: "gỗ, khu rừng nhỏ", audioUrl: "", exampleEn: "This table is made of wood.", exampleVi: "Chiếc bàn này được làm bằng gỗ." },
  { lesson: 14, word: "earth", type: "noun", phonetic: "/ɜːθ/", meaning: "Trái Đất, đất đai", audioUrl: "", exampleEn: "We live on planet Earth.", exampleVi: "Chúng ta đang sống trên hành tinh Trái Đất." },
  { lesson: 14, word: "globe", type: "noun", phonetic: "/ɡləʊb/", meaning: "quả địa cầu", audioUrl: "", exampleEn: "He has a globe in his bedroom.", exampleVi: "Cậu ấy có một quả địa cầu trong phòng ngủ." },
  { lesson: 14, word: "continent", type: "noun", phonetic: "/ˈkɒn.tɪ.nənt/", meaning: "lục địa", audioUrl: "", exampleEn: "Asia is the largest continent.", exampleVi: "Châu Á là lục địa lớn nhất." },
  { lesson: 14, word: "land", type: "noun", phonetic: "/lænd/", meaning: "đất liền", audioUrl: "", exampleEn: "The bird flew down to the land.", exampleVi: "Con chim đã bay xuống mặt đất liền." },
  { lesson: 14, word: "nature", type: "noun", phonetic: "/ˈneɪ.tʃər/", meaning: "thiên nhiên", audioUrl: "", exampleEn: "I love the beauty of nature.", exampleVi: "Tôi yêu vẻ đẹp của thiên nhiên." },
  { lesson: 14, word: "air", type: "noun", phonetic: "/eər/", meaning: "không khí", audioUrl: "", exampleEn: "We breathe fresh air in the mountains.", exampleVi: "Chúng tôi hít thở không khí trong lành ở trên núi." },
  { lesson: 14, word: "mountain", type: "noun", phonetic: "/ˈmaʊn.tɪn/", meaning: "ngọn núi", audioUrl: "", exampleEn: "Everest is the highest mountain.", exampleVi: "Everest là ngọn núi cao nhất." },

  // BÀI 15: Holidays and Travel (Kỳ nghỉ và du lịch)
  { lesson: 15, word: "adventure", type: "noun", phonetic: "/ədˈven.tʃər/", meaning: "cuộc phiêu lưu", audioUrl: "", exampleEn: "They went on an adventure in the jungle.", exampleVi: "Họ đã tham gia một cuộc phiêu lưu trong rừng rậm." },
  { lesson: 15, word: "camp", type: "verb", phonetic: "/kæmp/", meaning: "cắm trại", audioUrl: "", exampleEn: "We will camp near the river.", exampleVi: "Chúng tôi sẽ cắm trại gần bờ sông." },
  { lesson: 15, word: "explore", type: "verb", phonetic: "/ɪkˈsplɔːr/", meaning: "khám phá", audioUrl: "", exampleEn: "They explored the old castle.", exampleVi: "Họ đã khám phá tòa lâu đài cổ." },
  { lesson: 15, word: "guide", type: "noun", phonetic: "/ɡaɪd/", meaning: "hướng dẫn viên", audioUrl: "", exampleEn: "Our tour guide is very friendly.", exampleVi: "Hướng dẫn viên du lịch của chúng tôi rất thân thiện." },
  { lesson: 15, word: "passport", type: "noun", phonetic: "/ˈpɑːs.pɔːt/", meaning: "hộ chiếu", audioUrl: "", exampleEn: "You need a passport to travel to another country.", exampleVi: "Bạn cần có hộ chiếu để đi du lịch sang quốc gia khác." },
  { lesson: 15, word: "souvenir", type: "noun", phonetic: "/ˌsuː.vənˈɪər/", meaning: "quà lưu niệm", audioUrl: "", exampleEn: "I bought a souvenir for my mom.", exampleVi: "Tôi đã mua một món quà lưu niệm cho mẹ tôi." },
  { lesson: 15, word: "suitcase", type: "noun", phonetic: "/ˈsuːt.keɪs/", meaning: "va li", audioUrl: "", exampleEn: "My suitcase is very heavy.", exampleVi: "Chiếc va li của tôi rất nặng." },
  { lesson: 15, word: "tour", type: "noun", phonetic: "/tʊər/", meaning: "chuyến tham quan", audioUrl: "", exampleEn: "We took a tour around the city.", exampleVi: "Chúng tôi đã có một chuyến tham quan quanh thành phố." },
  { lesson: 15, word: "trip", type: "noun", phonetic: "/trɪp/", meaning: "chuyến đi", audioUrl: "", exampleEn: "How was your trip to London?", exampleVi: "Chuyến đi tới Luân Đôn của bạn thế nào?" },
  { lesson: 15, word: "tourist", type: "noun", phonetic: "/ˈtʊə.rɪst/", meaning: "khách du lịch", audioUrl: "", exampleEn: "Many tourists visit this island.", exampleVi: "Có rất nhiều du khách tới thăm hòn đảo này." },
  { lesson: 15, word: "visit", type: "verb", phonetic: "/ˈvɪz.ɪt/", meaning: "đến thăm", audioUrl: "", exampleEn: "I will visit my grandparents tomorrow.", exampleVi: "Tôi sẽ đến thăm ông bà vào ngày mai." },
  { lesson: 15, word: "lost", type: "adjective", phonetic: "/lɒst/", meaning: "bị lạc", audioUrl: "", exampleEn: "We got lost in the forest.", exampleVi: "Chúng tôi đã bị lạc trong khu rừng." },
  { lesson: 15, word: "holiday", type: "noun", phonetic: "/ˈhɒl.ə.deɪ/", meaning: "kỳ nghỉ", audioUrl: "", exampleEn: "I am going on holiday next week.", exampleVi: "Tôi sẽ đi nghỉ mát vào tuần tới." },
  { lesson: 15, word: "travel", type: "verb", phonetic: "/ˈtræv.əl/", meaning: "đi du lịch", audioUrl: "", exampleEn: "I love to travel the world.", exampleVi: "Tôi yêu thích việc đi du lịch vòng quanh thế giới." },
  { lesson: 15, word: "hotel", type: "noun", phonetic: "/həʊˈtel/", meaning: "khách sạn", audioUrl: "", exampleEn: "We stayed at a five-star hotel.", exampleVi: "Chúng tôi đã ở tại một khách sạn năm sao." },
  { lesson: 15, word: "flight", type: "noun", phonetic: "/flaɪt/", meaning: "chuyến bay", audioUrl: "", exampleEn: "The flight was delayed.", exampleVi: "Chuyến bay đã bị trì hoãn." },
  { lesson: 15, word: "ticket", type: "noun", phonetic: "/ˈtɪk.ɪt/", meaning: "vé", audioUrl: "", exampleEn: "Show your ticket to the staff.", exampleVi: "Hãy xuất trình vé của bạn cho nhân viên." },
  { lesson: 15, word: "camera", type: "noun", phonetic: "/ˈkæm.rə/", meaning: "máy ảnh", audioUrl: "", exampleEn: "I take photos with my new camera.", exampleVi: "Tôi chụp ảnh bằng chiếc máy ảnh mới của mình." },
  { lesson: 15, word: "photo", type: "noun", phonetic: "/ˈfəʊ.təʊ/", meaning: "bức ảnh", audioUrl: "", exampleEn: "Let's take a family photo.", exampleVi: "Hãy cùng chụp một bức ảnh gia đình nhé." },
  { lesson: 15, word: "beach", type: "noun", phonetic: "/biːtʃ/", meaning: "bãi biển", audioUrl: "", exampleEn: "We built a sandcastle on the beach.", exampleVi: "Chúng tôi đã xây một lâu đài cát trên bãi biển." }
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

  console.log(`\n🎉 Hoàn thành nạp/cập nhật ${successCount} từ vựng Batch 3 cho Flyers!`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

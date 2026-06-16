/**
 * SEED SCRIPT: PET Vocabulary — Batch 3 (Bài 11 - 15)
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 11: The Natural World & Weather
  { lesson: 11, word: "nature", type: "noun", phonetic: "/ˈneɪ.tʃər/", meaning: "thiên nhiên", audioUrl: "", exampleEn: "I love the beauty of nature.", exampleVi: "Tôi yêu vẻ đẹp của thiên nhiên." },
  { lesson: 11, word: "environment", type: "noun", phonetic: "/ɪnˈvaɪ.rən.mənt/", meaning: "môi trường", audioUrl: "", exampleEn: "We must protect the environment.", exampleVi: "Chúng ta phải bảo vệ môi trường." },
  { lesson: 11, word: "weather", type: "noun", phonetic: "/ˈweð.ər/", meaning: "thời tiết", audioUrl: "", exampleEn: "What is the weather like today?", exampleVi: "Thời tiết hôm nay như thế nào?" },
  { lesson: 11, word: "climate", type: "noun", phonetic: "/ˈklaɪ.mət/", meaning: "khí hậu", audioUrl: "", exampleEn: "The climate is getting warmer.", exampleVi: "Khí hậu đang trở nên ấm áp hơn." },
  { lesson: 11, word: "temperature", type: "noun", phonetic: "/ˈtem.prə.tʃər/", meaning: "nhiệt độ", audioUrl: "", exampleEn: "The temperature dropped to zero.", exampleVi: "Nhiệt độ đã giảm xuống mức không độ." },
  { lesson: 11, word: "forecast", type: "noun", phonetic: "/ˈfɔː.kɑːst/", meaning: "dự báo (thời tiết)", audioUrl: "", exampleEn: "The weather forecast says it will rain.", exampleVi: "Dự báo thời tiết nói rằng trời sẽ mưa." },
  { lesson: 11, word: "hurricane", type: "noun", phonetic: "/ˈhʌr.ɪ.kən/", meaning: "cơn bão lớn, cuồng phong", audioUrl: "", exampleEn: "A hurricane is approaching the coast.", exampleVi: "Một cơn cuồng phong đang tiến đến bờ biển." },
  { lesson: 11, word: "storm", type: "noun", phonetic: "/stɔːm/", meaning: "cơn bão", audioUrl: "", exampleEn: "The storm caused a lot of damage.", exampleVi: "Cơn bão đã gây ra nhiều thiệt hại." },
  { lesson: 11, word: "lightning", type: "noun", phonetic: "/ˈlaɪt.nɪŋ/", meaning: "chớp, tia chớp", audioUrl: "", exampleEn: "I saw a flash of lightning.", exampleVi: "Tôi đã nhìn thấy một tia chớp." },
  { lesson: 11, word: "thunder", type: "noun", phonetic: "/ˈθʌn.dər/", meaning: "sấm", audioUrl: "", exampleEn: "We heard the sound of thunder.", exampleVi: "Chúng tôi đã nghe thấy tiếng sấm." },
  { lesson: 11, word: "flood", type: "noun", phonetic: "/flʌd/", meaning: "lũ lụt", audioUrl: "", exampleEn: "The heavy rain caused a flood.", exampleVi: "Trận mưa lớn đã gây ra lũ lụt." },
  { lesson: 11, word: "drought", type: "noun", phonetic: "/draʊt/", meaning: "hạn hán", audioUrl: "", exampleEn: "The crops died during the drought.", exampleVi: "Cây trồng đã chết trong đợt hạn hán." },
  { lesson: 11, word: "cloudy", type: "adjective", phonetic: "/ˈklaʊ.di/", meaning: "nhiều mây", audioUrl: "", exampleEn: "It is a cloudy day.", exampleVi: "Hôm nay là một ngày nhiều mây." },
  { lesson: 11, word: "windy", type: "adjective", phonetic: "/ˈwɪn.di/", meaning: "nhiều gió", audioUrl: "", exampleEn: "It is too windy to go sailing.", exampleVi: "Trời quá nhiều gió để đi thuyền buồm." },
  { lesson: 11, word: "foggy", type: "adjective", phonetic: "/ˈfɒɡ.i/", meaning: "nhiều sương mù", audioUrl: "", exampleEn: "Driving is dangerous when it's foggy.", exampleVi: "Lái xe rất nguy hiểm khi trời có sương mù." },
  { lesson: 11, word: "freezing", type: "adjective", phonetic: "/ˈfriː.zɪŋ/", meaning: "lạnh cống", audioUrl: "", exampleEn: "It is freezing outside.", exampleVi: "Bên ngoài trời lạnh cống." },
  { lesson: 11, word: "humid", type: "adjective", phonetic: "/ˈhjuː.mɪd/", meaning: "ẩm ướt", audioUrl: "", exampleEn: "The air is very hot and humid.", exampleVi: "Không khí rất nóng và ẩm ướt." },
  { lesson: 11, word: "wildlife", type: "noun", phonetic: "/ˈwaɪld.laɪf/", meaning: "động vật hoang dã", audioUrl: "", exampleEn: "The forest is home to much wildlife.", exampleVi: "Khu rừng là nơi sinh sống của nhiều loài động vật hoang dã." },
  { lesson: 11, word: "insect", type: "noun", phonetic: "/ˈɪn.sekt/", meaning: "côn trùng", audioUrl: "", exampleEn: "Ants and bees are insects.", exampleVi: "Kiến và ong là côn trùng." },
  { lesson: 11, word: "mammal", type: "noun", phonetic: "/ˈmæm.əl/", meaning: "động vật có vú", audioUrl: "", exampleEn: "A whale is a large mammal.", exampleVi: "Cá voi là một loài động vật có vú lớn." },

  // BÀI 12: Geography & Landscapes
  { lesson: 12, word: "geography", type: "noun", phonetic: "/dʒiˈɒɡ.rə.fi/", meaning: "địa lý", audioUrl: "", exampleEn: "I learned about rivers in geography class.", exampleVi: "Tôi đã học về các dòng sông trong lớp địa lý." },
  { lesson: 12, word: "landscape", type: "noun", phonetic: "/ˈlænd.skeɪp/", meaning: "phong cảnh", audioUrl: "", exampleEn: "The landscape here is beautiful.", exampleVi: "Phong cảnh ở đây thật đẹp." },
  { lesson: 12, word: "mountain", type: "noun", phonetic: "/ˈmaʊn.tɪn/", meaning: "ngọn núi", audioUrl: "", exampleEn: "Everest is the highest mountain.", exampleVi: "Everest là ngọn núi cao nhất." },
  { lesson: 12, word: "valley", type: "noun", phonetic: "/ˈvæl.i/", meaning: "thung lũng", audioUrl: "", exampleEn: "The village is located in a deep valley.", exampleVi: "Ngôi làng nằm trong một thung lũng sâu." },
  { lesson: 12, word: "hill", type: "noun", phonetic: "/hɪl/", meaning: "ngọn đồi", audioUrl: "", exampleEn: "We walked up the hill.", exampleVi: "Chúng tôi đã đi bộ lên ngọn đồi." },
  { lesson: 12, word: "ocean", type: "noun", phonetic: "/ˈəʊ.ʃən/", meaning: "đại dương", audioUrl: "", exampleEn: "The Pacific Ocean is very deep.", exampleVi: "Thái Bình Dương rất sâu." },
  { lesson: 12, word: "coast", type: "noun", phonetic: "/kəʊst/", meaning: "bờ biển", audioUrl: "", exampleEn: "They live on the east coast.", exampleVi: "Họ sống ở bờ biển phía đông." },
  { lesson: 12, word: "beach", type: "noun", phonetic: "/biːtʃ/", meaning: "bãi biển", audioUrl: "", exampleEn: "We spent the afternoon on the beach.", exampleVi: "Chúng tôi đã dành cả buổi chiều trên bãi biển." },
  { lesson: 12, word: "island", type: "noun", phonetic: "/ˈaɪ.lənd/", meaning: "hòn đảo", audioUrl: "", exampleEn: "They went on holiday to a tropical island.", exampleVi: "Họ đi nghỉ ở một hòn đảo nhiệt đới." },
  { lesson: 12, word: "continent", type: "noun", phonetic: "/ˈkɒn.tɪ.nənt/", meaning: "lục địa", audioUrl: "", exampleEn: "Asia is the largest continent.", exampleVi: "Châu Á là lục địa lớn nhất." },
  { lesson: 12, word: "border", type: "noun", phonetic: "/ˈbɔː.dər/", meaning: "biên giới", audioUrl: "", exampleEn: "We crossed the border into Mexico.", exampleVi: "Chúng tôi đã vượt qua biên giới vào Mexico." },
  { lesson: 12, word: "desert", type: "noun", phonetic: "/ˈdez.ət/", meaning: "sa mạc", audioUrl: "", exampleEn: "The Sahara is a huge desert.", exampleVi: "Sahara là một sa mạc khổng lồ." },
  { lesson: 12, word: "forest", type: "noun", phonetic: "/ˈfɒr.ɪst/", meaning: "khu rừng", audioUrl: "", exampleEn: "The forest is full of tall trees.", exampleVi: "Khu rừng có rất nhiều cây cao." },
  { lesson: 12, word: "jungle", type: "noun", phonetic: "/ˈdʒʌŋ.ɡəl/", meaning: "rừng nhiệt đới", audioUrl: "", exampleEn: "Tigers live in the jungle.", exampleVi: "Hổ sống trong rừng nhiệt đới." },
  { lesson: 12, word: "waterfall", type: "noun", phonetic: "/ˈwɔː.tə.fɔːl/", meaning: "thác nước", audioUrl: "", exampleEn: "We saw a beautiful waterfall.", exampleVi: "Chúng tôi đã nhìn thấy một thác nước tuyệt đẹp." },
  { lesson: 12, word: "stream", type: "noun", phonetic: "/striːm/", meaning: "dòng suối", audioUrl: "", exampleEn: "A small stream runs through the garden.", exampleVi: "Một con suối nhỏ chảy qua khu vườn." },
  { lesson: 12, word: "lake", type: "noun", phonetic: "/leɪk/", meaning: "hồ nước", audioUrl: "", exampleEn: "We went fishing in the lake.", exampleVi: "Chúng tôi đã đi câu cá ở hồ." },
  { lesson: 12, word: "cave", type: "noun", phonetic: "/keɪv/", meaning: "hang động", audioUrl: "", exampleEn: "Bears sleep in the cave during winter.", exampleVi: "Gấu ngủ trong hang vào mùa đông." },
  { lesson: 12, word: "volcano", type: "noun", phonetic: "/vɒlˈkeɪ.nəʊ/", meaning: "núi lửa", audioUrl: "", exampleEn: "The volcano might erupt soon.", exampleVi: "Núi lửa có thể phun trào sớm." },
  { lesson: 12, word: "scenery", type: "noun", phonetic: "/ˈsiː.nər.i/", meaning: "cảnh vật, phong cảnh", audioUrl: "", exampleEn: "The scenery here is breathtaking.", exampleVi: "Phong cảnh ở đây đẹp đến nghẹt thở." },

  // BÀI 13: Travel & Tourism
  { lesson: 13, word: "journey", type: "noun", phonetic: "/ˈdʒɜː.ni/", meaning: "hành trình (dài)", audioUrl: "", exampleEn: "It is a long journey by train.", exampleVi: "Đó là một hành trình dài bằng tàu hỏa." },
  { lesson: 13, word: "trip", type: "noun", phonetic: "/trɪp/", meaning: "chuyến đi (ngắn)", audioUrl: "", exampleEn: "We took a day trip to the beach.", exampleVi: "Chúng tôi đã có một chuyến đi chơi biển trong ngày." },
  { lesson: 13, word: "tour", type: "noun", phonetic: "/tʊər/", meaning: "chuyến tham quan", audioUrl: "", exampleEn: "They went on a guided tour of the city.", exampleVi: "Họ đã đi một chuyến tham quan thành phố có hướng dẫn viên." },
  { lesson: 13, word: "tourist", type: "noun", phonetic: "/ˈtʊə.rɪst/", meaning: "khách du lịch", audioUrl: "", exampleEn: "The city is full of tourists in summer.", exampleVi: "Thành phố đầy du khách vào mùa hè." },
  { lesson: 13, word: "guide", type: "noun", phonetic: "/ɡaɪd/", meaning: "hướng dẫn viên", audioUrl: "", exampleEn: "Our tour guide was very friendly.", exampleVi: "Hướng dẫn viên du lịch của chúng tôi rất thân thiện." },
  { lesson: 13, word: "luggage", type: "noun", phonetic: "/ˈlʌɡ.ɪdʒ/", meaning: "hành lý", audioUrl: "", exampleEn: "How much luggage do you have?", exampleVi: "Bạn có bao nhiêu hành lý?" },
  { lesson: 13, word: "suitcase", type: "noun", phonetic: "/ˈsuːt.keɪs/", meaning: "va li", audioUrl: "", exampleEn: "I need to pack my suitcase.", exampleVi: "Tôi cần phải đóng gói va li." },
  { lesson: 13, word: "passport", type: "noun", phonetic: "/ˈpɑːs.pɔːt/", meaning: "hộ chiếu", audioUrl: "", exampleEn: "Don't forget your passport when you travel abroad.", exampleVi: "Đừng quên hộ chiếu khi bạn đi du lịch nước ngoài." },
  { lesson: 13, word: "visa", type: "noun", phonetic: "/ˈviː.zə/", meaning: "thị thực", audioUrl: "", exampleEn: "You need a visa to enter this country.", exampleVi: "Bạn cần có visa để nhập cảnh vào quốc gia này." },
  { lesson: 13, word: "ticket", type: "noun", phonetic: "/ˈtɪk.ɪt/", meaning: "vé", audioUrl: "", exampleEn: "I bought a plane ticket to Paris.", exampleVi: "Tôi đã mua một vé máy bay đi Paris." },
  { lesson: 13, word: "flight", type: "noun", phonetic: "/flaɪt/", meaning: "chuyến bay", audioUrl: "", exampleEn: "My flight departs at 7 AM.", exampleVi: "Chuyến bay của tôi khởi hành lúc 7 giờ sáng." },
  { lesson: 13, word: "passenger", type: "noun", phonetic: "/ˈpæs.ən.dʒər/", meaning: "hành khách", audioUrl: "", exampleEn: "All passengers must fasten their seatbelts.", exampleVi: "Tất cả hành khách phải thắt dây an toàn." },
  { lesson: 13, word: "destination", type: "noun", phonetic: "/ˌdes.tɪˈneɪ.ʃən/", meaning: "điểm đến", audioUrl: "", exampleEn: "Paris is our final destination.", exampleVi: "Paris là điểm đến cuối cùng của chúng tôi." },
  { lesson: 13, word: "hotel", type: "noun", phonetic: "/həʊˈtel/", meaning: "khách sạn", audioUrl: "", exampleEn: "We booked a room in a five-star hotel.", exampleVi: "Chúng tôi đã đặt phòng ở một khách sạn năm sao." },
  { lesson: 13, word: "hostel", type: "noun", phonetic: "/ˈhɒs.təl/", meaning: "nhà nghỉ (giá rẻ cho dân phượt)", audioUrl: "", exampleEn: "Many students stay in hostels.", exampleVi: "Nhiều sinh viên ở trong các nhà nghỉ." },
  { lesson: 13, word: "reception", type: "noun", phonetic: "/rɪˈsep.ʃən/", meaning: "quầy lễ tân", audioUrl: "", exampleEn: "Leave your key at the reception.", exampleVi: "Hãy để lại chìa khóa của bạn ở quầy lễ tân." },
  { lesson: 13, word: "reserve", type: "verb", phonetic: "/rɪˈzɜːv/", meaning: "đặt trước", audioUrl: "", exampleEn: "I'd like to reserve a table for two.", exampleVi: "Tôi muốn đặt một bàn cho hai người." },
  { lesson: 13, word: "cancel", type: "verb", phonetic: "/ˈkæn.səl/", meaning: "hủy bỏ", audioUrl: "", exampleEn: "The flight was cancelled due to bad weather.", exampleVi: "Chuyến bay đã bị hủy do thời tiết xấu." },
  { lesson: 13, word: "delay", type: "noun", phonetic: "/dɪˈleɪ/", meaning: "sự chậm trễ, hoãn lại", audioUrl: "", exampleEn: "There is a delay of 30 minutes.", exampleVi: "Có sự chậm trễ 30 phút." },
  { lesson: 13, word: "explore", type: "verb", phonetic: "/ɪkˈsplɔːr/", meaning: "khám phá", audioUrl: "", exampleEn: "We spent the day exploring the city.", exampleVi: "Chúng tôi đã dành cả ngày để khám phá thành phố." },

  // BÀI 14: Transport & Getting Around
  { lesson: 14, word: "transport", type: "noun", phonetic: "/ˈtræn.spɔːt/", meaning: "phương tiện giao thông", audioUrl: "", exampleEn: "Public transport is very convenient here.", exampleVi: "Giao thông công cộng ở đây rất thuận tiện." },
  { lesson: 14, word: "vehicle", type: "noun", phonetic: "/ˈvɪə.kəl/", meaning: "xe cộ, phương tiện", audioUrl: "", exampleEn: "Are you the driver of this vehicle?", exampleVi: "Bạn có phải là người lái chiếc xe này không?" },
  { lesson: 14, word: "traffic", type: "noun", phonetic: "/ˈtræf.ɪk/", meaning: "giao thông", audioUrl: "", exampleEn: "There is heavy traffic in the morning.", exampleVi: "Giao thông rất đông đúc vào buổi sáng." },
  { lesson: 14, word: "commute", type: "verb", phonetic: "/kəˈmjuːt/", meaning: "đi lại (đi làm)", audioUrl: "", exampleEn: "He commutes to London every day.", exampleVi: "Anh ấy đi làm đến London mỗi ngày." },
  { lesson: 14, word: "bicycle", type: "noun", phonetic: "/ˈbaɪ.sɪ.kəl/", meaning: "xe đạp", audioUrl: "", exampleEn: "I ride my bicycle to school.", exampleVi: "Tôi đạp xe đến trường." },
  { lesson: 14, word: "motorcycle", type: "noun", phonetic: "/ˈməʊ.təˌsaɪ.kəl/", meaning: "xe máy", audioUrl: "", exampleEn: "He bought a new motorcycle.", exampleVi: "Anh ấy đã mua một chiếc xe máy mới." },
  { lesson: 14, word: "subway", type: "noun", phonetic: "/ˈsʌb.weɪ/", meaning: "tàu điện ngầm", audioUrl: "", exampleEn: "The subway is the fastest way to get around.", exampleVi: "Tàu điện ngầm là cách nhanh nhất để đi lại." },
  { lesson: 14, word: "platform", type: "noun", phonetic: "/ˈplæt.fɔːm/", meaning: "sân ga", audioUrl: "", exampleEn: "The train leaves from platform 3.", exampleVi: "Chuyến tàu khởi hành từ sân ga số 3." },
  { lesson: 14, word: "station", type: "noun", phonetic: "/ˈsteɪ.ʃən/", meaning: "nhà ga, trạm", audioUrl: "", exampleEn: "I will meet you at the train station.", exampleVi: "Tôi sẽ gặp bạn ở nhà ga xe lửa." },
  { lesson: 14, word: "airport", type: "noun", phonetic: "/ˈeə.pɔːt/", meaning: "sân bay", audioUrl: "", exampleEn: "We arrived at the airport early.", exampleVi: "Chúng tôi đã đến sân bay sớm." },
  { lesson: 14, word: "harbour", type: "noun", phonetic: "/ˈhɑː.bər/", meaning: "bến cảng", audioUrl: "", exampleEn: "There are many boats in the harbour.", exampleVi: "Có rất nhiều thuyền trong bến cảng." },
  { lesson: 14, word: "ferry", type: "noun", phonetic: "/ˈfer.i/", meaning: "phà", audioUrl: "", exampleEn: "We took a ferry across the river.", exampleVi: "Chúng tôi đã đi phà qua sông." },
  { lesson: 14, word: "cruise", type: "noun", phonetic: "/kruːz/", meaning: "chuyến du ngoạn trên biển", audioUrl: "", exampleEn: "They went on a luxury cruise.", exampleVi: "Họ đã đi một chuyến du ngoạn trên biển sang trọng." },
  { lesson: 14, word: "fare", type: "noun", phonetic: "/feər/", meaning: "tiền vé", audioUrl: "", exampleEn: "The bus fare is 2 dollars.", exampleVi: "Giá vé xe buýt là 2 đô la." },
  { lesson: 14, word: "timetable", type: "noun", phonetic: "/ˈtaɪmˌteɪ.bəl/", meaning: "lịch trình, thời gian biểu", audioUrl: "", exampleEn: "Check the train timetable before you leave.", exampleVi: "Hãy kiểm tra lịch trình tàu trước khi bạn rời đi." },
  { lesson: 14, word: "route", type: "noun", phonetic: "/ruːt/", meaning: "tuyến đường", audioUrl: "", exampleEn: "This is the quickest route to the city.", exampleVi: "Đây là tuyến đường nhanh nhất đến thành phố." },
  { lesson: 14, word: "speed", type: "noun", phonetic: "/spiːd/", meaning: "tốc độ", audioUrl: "", exampleEn: "He was driving at high speed.", exampleVi: "Anh ta đang lái xe với tốc độ cao." },
  { lesson: 14, word: "engine", type: "noun", phonetic: "/ˈen.dʒɪn/", meaning: "động cơ", audioUrl: "", exampleEn: "The car has a powerful engine.", exampleVi: "Chiếc xe có một động cơ mạnh mẽ." },
  { lesson: 14, word: "fuel", type: "noun", phonetic: "/ˈfjuː.əl/", meaning: "nhiên liệu", audioUrl: "", exampleEn: "We need to put more fuel in the car.", exampleVi: "Chúng ta cần đổ thêm nhiên liệu vào xe." },
  { lesson: 14, word: "direction", type: "noun", phonetic: "/daɪˈrek.ʃən/", meaning: "phương hướng, sự chỉ dẫn", audioUrl: "", exampleEn: "Can you give me directions to the museum?", exampleVi: "Bạn có thể chỉ đường cho tôi đến bảo tàng được không?" },

  // BÀI 15: Environmental Issues & Solutions
  { lesson: 15, word: "pollution", type: "noun", phonetic: "/pəˈluː.ʃən/", meaning: "sự ô nhiễm", audioUrl: "", exampleEn: "Air pollution is a major problem in cities.", exampleVi: "Ô nhiễm không khí là một vấn đề lớn ở các thành phố." },
  { lesson: 15, word: "rubbish", type: "noun", phonetic: "/ˈrʌb.ɪʃ/", meaning: "rác thải", audioUrl: "", exampleEn: "Please throw your rubbish in the bin.", exampleVi: "Vui lòng vứt rác của bạn vào thùng." },
  { lesson: 15, word: "waste", type: "noun", phonetic: "/weɪst/", meaning: "chất thải, sự lãng phí", audioUrl: "", exampleEn: "We need to reduce plastic waste.", exampleVi: "Chúng ta cần giảm thiểu rác thải nhựa." },
  { lesson: 15, word: "recycle", type: "verb", phonetic: "/ˌriːˈsaɪ.kəl/", meaning: "tái chế", audioUrl: "", exampleEn: "You should recycle glass and paper.", exampleVi: "Bạn nên tái chế thủy tinh và giấy." },
  { lesson: 15, word: "protect", type: "verb", phonetic: "/prəˈtekt/", meaning: "bảo vệ", audioUrl: "", exampleEn: "We must protect endangered species.", exampleVi: "Chúng ta phải bảo vệ các loài có nguy cơ tuyệt chủng." },
  { lesson: 15, word: "damage", type: "verb", phonetic: "/ˈdæm.ɪdʒ/", meaning: "gây thiệt hại", audioUrl: "", exampleEn: "Pollution damages the environment.", exampleVi: "Sự ô nhiễm gây thiệt hại cho môi trường." },
  { lesson: 15, word: "destroy", type: "verb", phonetic: "/dɪˈstrɔɪ/", meaning: "phá hủy", audioUrl: "", exampleEn: "The fire destroyed the forest.", exampleVi: "Ngọn lửa đã phá hủy khu rừng." },
  { lesson: 15, word: "global warming", type: "noun", phonetic: "/ˌɡləʊ.bəl ˈwɔː.mɪŋ/", meaning: "sự nóng lên toàn cầu", audioUrl: "", exampleEn: "Global warming is melting the ice.", exampleVi: "Sự nóng lên toàn cầu đang làm tan chảy băng." },
  { lesson: 15, word: "climate change", type: "noun", phonetic: "/ˈklaɪ.mət ˌtʃeɪndʒ/", meaning: "biến đổi khí hậu", audioUrl: "", exampleEn: "Climate change affects the weather.", exampleVi: "Biến đổi khí hậu ảnh hưởng đến thời tiết." },
  { lesson: 15, word: "energy", type: "noun", phonetic: "/ˈen.ə.dʒi/", meaning: "năng lượng", audioUrl: "", exampleEn: "Solar energy is clean and renewable.", exampleVi: "Năng lượng mặt trời sạch và có thể tái tạo." },
  { lesson: 15, word: "solar", type: "adjective", phonetic: "/ˈsəʊ.lər/", meaning: "thuộc về mặt trời", audioUrl: "", exampleEn: "They installed solar panels on the roof.", exampleVi: "Họ đã lắp đặt các tấm pin năng lượng mặt trời trên mái nhà." },
  { lesson: 15, word: "wind", type: "noun", phonetic: "/wɪnd/", meaning: "gió", audioUrl: "", exampleEn: "Wind power is a form of green energy.", exampleVi: "Năng lượng gió là một dạng năng lượng xanh." },
  { lesson: 15, word: "save", type: "verb", phonetic: "/seɪv/", meaning: "cứu, tiết kiệm", audioUrl: "", exampleEn: "Turn off the lights to save electricity.", exampleVi: "Tắt đèn để tiết kiệm điện." },
  { lesson: 15, word: "reduce", type: "verb", phonetic: "/rɪˈdjuːs/", meaning: "làm giảm", audioUrl: "", exampleEn: "We must reduce our water usage.", exampleVi: "Chúng ta phải giảm thiểu việc sử dụng nước." },
  { lesson: 15, word: "reuse", type: "verb", phonetic: "/ˌriːˈjuːz/", meaning: "tái sử dụng", audioUrl: "", exampleEn: "Try to reuse plastic bags.", exampleVi: "Hãy cố gắng tái sử dụng túi ni lông." },
  { lesson: 15, word: "eco-friendly", type: "adjective", phonetic: "/ˌiː.kəʊˈfrend.li/", meaning: "thân thiện với môi trường", audioUrl: "", exampleEn: "This product is eco-friendly.", exampleVi: "Sản phẩm này thân thiện với môi trường." },
  { lesson: 15, word: "extinct", type: "adjective", phonetic: "/ɪkˈstɪŋkt/", meaning: "tuyệt chủng", audioUrl: "", exampleEn: "Dinosaurs have been extinct for millions of years.", exampleVi: "Khủng long đã tuyệt chủng hàng triệu năm." },
  { lesson: 15, word: "habitat", type: "noun", phonetic: "/ˈhæb.ɪ.tæt/", meaning: "môi trường sống", audioUrl: "", exampleEn: "The forest is the natural habitat of many animals.", exampleVi: "Rừng là môi trường sống tự nhiên của nhiều loài động vật." },
  { lesson: 15, word: "conservation", type: "noun", phonetic: "/ˌkɒn.səˈveɪ.ʃən/", meaning: "sự bảo tồn", audioUrl: "", exampleEn: "Wildlife conservation is very important.", exampleVi: "Bảo tồn động vật hoang dã là rất quan trọng." },
  { lesson: 15, word: "planet", type: "noun", phonetic: "/ˈplæn.ɪt/", meaning: "hành tinh", audioUrl: "", exampleEn: "We must take care of our planet.", exampleVi: "Chúng ta phải chăm sóc cho hành tinh của mình." }
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

  console.log(`\n🎉 Hoàn thành nạp ${successCount} từ vựng Batch 3 cho PET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

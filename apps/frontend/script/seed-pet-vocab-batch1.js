/**
 * SEED SCRIPT: PET Vocabulary — Batch 1 (Bài 1 - 5)
 * Chạy từ thư mục gốc: node seed-pet-vocab-batch1.js
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 1: Daily Routine & Habits
  { lesson: 1, word: "routine", type: "noun", phonetic: "/ruːˈtiːn/", meaning: "thói quen hàng ngày", audioUrl: "", exampleEn: "He has a very strict morning routine.", exampleVi: "Anh ấy có một thói quen buổi sáng rất nghiêm ngặt." },
  { lesson: 1, word: "habit", type: "noun", phonetic: "/ˈhæb.ɪt/", meaning: "thói quen", audioUrl: "", exampleEn: "Biting your nails is a bad habit.", exampleVi: "Cắn móng tay là một thói quen xấu." },
  { lesson: 1, word: "lifestyle", type: "noun", phonetic: "/ˈlaɪf.staɪl/", meaning: "lối sống", audioUrl: "", exampleEn: "They have a very healthy lifestyle.", exampleVi: "Họ có một lối sống rất lành mạnh." },
  { lesson: 1, word: "alarm", type: "noun", phonetic: "/əˈlɑːm/", meaning: "chuông báo thức", audioUrl: "", exampleEn: "My alarm goes off at 6 AM.", exampleVi: "Chuông báo thức của tôi reo lúc 6 giờ sáng." },
  { lesson: 1, word: "commute", type: "verb", phonetic: "/kəˈmjuːt/", meaning: "đi làm (mỗi ngày)", audioUrl: "", exampleEn: "I commute to work by train.", exampleVi: "Tôi đi làm bằng tàu hỏa." },
  { lesson: 1, word: "diary", type: "noun", phonetic: "/ˈdaɪə.ri/", meaning: "nhật ký, sổ ghi chép", audioUrl: "", exampleEn: "I write my appointments in my diary.", exampleVi: "Tôi viết các cuộc hẹn vào sổ ghi chép." },
  { lesson: 1, word: "chore", type: "noun", phonetic: "/tʃɔːr/", meaning: "việc vặt trong nhà", audioUrl: "", exampleEn: "Washing dishes is my daily chore.", exampleVi: "Rửa bát là việc vặt hàng ngày của tôi." },
  { lesson: 1, word: "organise", type: "verb", phonetic: "/ˈɔː.ɡən.aɪz/", meaning: "tổ chức, sắp xếp", audioUrl: "", exampleEn: "I need to organise my schedule.", exampleVi: "Tôi cần sắp xếp lịch trình của mình." },
  { lesson: 1, word: "leisure", type: "noun", phonetic: "/ˈleʒ.ər/", meaning: "thời gian rảnh rỗi", audioUrl: "", exampleEn: "What do you do in your leisure time?", exampleVi: "Bạn làm gì trong thời gian rảnh rỗi?" },
  { lesson: 1, word: "prepare", type: "verb", phonetic: "/prɪˈpeər/", meaning: "chuẩn bị", audioUrl: "", exampleEn: "She is preparing breakfast.", exampleVi: "Cô ấy đang chuẩn bị bữa sáng." },
  { lesson: 1, word: "regularly", type: "adverb", phonetic: "/ˈreɡ.jə.lə.li/", meaning: "một cách thường xuyên", audioUrl: "", exampleEn: "He exercises regularly.", exampleVi: "Anh ấy tập thể dục thường xuyên." },
  { lesson: 1, word: "usually", type: "adverb", phonetic: "/ˈjuː.ʒu.ə.li/", meaning: "thường thường", audioUrl: "", exampleEn: "I usually get up early.", exampleVi: "Tôi thường thức dậy sớm." },
  { lesson: 1, word: "seldom", type: "adverb", phonetic: "/ˈsel.dəm/", meaning: "hiếm khi", audioUrl: "", exampleEn: "I seldom watch television.", exampleVi: "Tôi hiếm khi xem tivi." },
  { lesson: 1, word: "always", type: "adverb", phonetic: "/ˈɔːl.weɪz/", meaning: "luôn luôn", audioUrl: "", exampleEn: "She always brings her umbrella.", exampleVi: "Cô ấy luôn luôn mang theo ô." },
  { lesson: 1, word: "frequently", type: "adverb", phonetic: "/ˈfriː.kwənt.li/", meaning: "thường xuyên", audioUrl: "", exampleEn: "Buses run frequently in this area.", exampleVi: "Xe buýt chạy thường xuyên ở khu vực này." },
  { lesson: 1, word: "schedule", type: "noun", phonetic: "/ˈʃedʒ.uːl/", meaning: "lịch trình", audioUrl: "", exampleEn: "I have a busy schedule today.", exampleVi: "Hôm nay tôi có một lịch trình bận rộn." },
  { lesson: 1, word: "activity", type: "noun", phonetic: "/ækˈtɪv.ə.ti/", meaning: "hoạt động", audioUrl: "", exampleEn: "Reading is a relaxing activity.", exampleVi: "Đọc sách là một hoạt động thư giãn." },
  { lesson: 1, word: "weekend", type: "noun", phonetic: "/ˌwiːkˈend/", meaning: "cuối tuần", audioUrl: "", exampleEn: "We are going to the beach this weekend.", exampleVi: "Chúng tôi sẽ đi biển cuối tuần này." },
  { lesson: 1, word: "weekday", type: "noun", phonetic: "/ˈwiːk.deɪ/", meaning: "ngày trong tuần", audioUrl: "", exampleEn: "I work hard during the weekday.", exampleVi: "Tôi làm việc chăm chỉ vào những ngày trong tuần." },
  { lesson: 1, word: "relax", type: "verb", phonetic: "/rɪˈlæks/", meaning: "thư giãn", audioUrl: "", exampleEn: "I just want to sit down and relax.", exampleVi: "Tôi chỉ muốn ngồi xuống và thư giãn." },

  // BÀI 2: Describing People & Personality
  { lesson: 2, word: "personality", type: "noun", phonetic: "/ˌpɜː.sənˈæl.ə.ti/", meaning: "tính cách", audioUrl: "", exampleEn: "She has a friendly personality.", exampleVi: "Cô ấy có tính cách thân thiện." },
  { lesson: 2, word: "character", type: "noun", phonetic: "/ˈkær.ək.tər/", meaning: "tính nết, nhân vật", audioUrl: "", exampleEn: "He is a man of good character.", exampleVi: "Ông ấy là một người có tính nết tốt." },
  { lesson: 2, word: "confident", type: "adjective", phonetic: "/ˈkɒn.fɪ.dənt/", meaning: "tự tin", audioUrl: "", exampleEn: "He is confident about the exam.", exampleVi: "Cậu ấy tự tin về bài kiểm tra." },
  { lesson: 2, word: "shy", type: "adjective", phonetic: "/ʃaɪ/", meaning: "nhút nhát", audioUrl: "", exampleEn: "The little boy is very shy.", exampleVi: "Cậu bé đó rất nhút nhát." },
  { lesson: 2, word: "outgoing", type: "adjective", phonetic: "/ˌaʊtˈɡəʊ.ɪŋ/", meaning: "cởi mở, hòa đồng", audioUrl: "", exampleEn: "She is an outgoing person.", exampleVi: "Cô ấy là một người cởi mở." },
  { lesson: 2, word: "polite", type: "adjective", phonetic: "/pəˈlaɪt/", meaning: "lịch sự", audioUrl: "", exampleEn: "It is important to be polite to others.", exampleVi: "Điều quan trọng là phải lịch sự với người khác." },
  { lesson: 2, word: "rude", type: "adjective", phonetic: "/ruːd/", meaning: "thô lỗ", audioUrl: "", exampleEn: "He was rude to the waiter.", exampleVi: "Anh ta đã thô lỗ với người phục vụ." },
  { lesson: 2, word: "generous", type: "adjective", phonetic: "/ˈdʒen.ər.əs/", meaning: "hào phóng", audioUrl: "", exampleEn: "It was generous of you to share your food.", exampleVi: "Thật hào phóng khi bạn chia sẻ thức ăn." },
  { lesson: 2, word: "selfish", type: "adjective", phonetic: "/ˈsel.fɪʃ/", meaning: "ích kỷ", audioUrl: "", exampleEn: "Don't be so selfish.", exampleVi: "Đừng quá ích kỷ như vậy." },
  { lesson: 2, word: "lazy", type: "adjective", phonetic: "/ˈleɪ.zi/", meaning: "lười biếng", audioUrl: "", exampleEn: "He is too lazy to clean his room.", exampleVi: "Anh ấy quá lười biếng để dọn phòng." },
  { lesson: 2, word: "hard-working", type: "adjective", phonetic: "/ˌhɑːdˈwɜː.kɪŋ/", meaning: "chăm chỉ", audioUrl: "", exampleEn: "She is a hard-working student.", exampleVi: "Cô ấy là một học sinh chăm chỉ." },
  { lesson: 2, word: "cheerful", type: "adjective", phonetic: "/ˈtʃɪə.fəl/", meaning: "vui vẻ", audioUrl: "", exampleEn: "He is always cheerful and smiling.", exampleVi: "Anh ấy luôn vui vẻ và hay cười." },
  { lesson: 2, word: "serious", type: "adjective", phonetic: "/ˈsɪə.ri.əs/", meaning: "nghiêm túc", audioUrl: "", exampleEn: "You look very serious today.", exampleVi: "Hôm nay trông bạn rất nghiêm túc." },
  { lesson: 2, word: "honest", type: "adjective", phonetic: "/ˈɒn.ɪst/", meaning: "trung thực", audioUrl: "", exampleEn: "I need an honest answer.", exampleVi: "Tôi cần một câu trả lời trung thực." },
  { lesson: 2, word: "patient", type: "adjective", phonetic: "/ˈpeɪ.ʃənt/", meaning: "kiên nhẫn", audioUrl: "", exampleEn: "A teacher must be patient.", exampleVi: "Một giáo viên phải kiên nhẫn." },
  { lesson: 2, word: "clever", type: "adjective", phonetic: "/ˈklev.ər/", meaning: "thông minh", audioUrl: "", exampleEn: "That is a clever idea.", exampleVi: "Đó là một ý kiến thông minh." },
  { lesson: 2, word: "attractive", type: "adjective", phonetic: "/əˈtræk.tɪv/", meaning: "hấp dẫn, lôi cuốn", audioUrl: "", exampleEn: "She is a very attractive woman.", exampleVi: "Cô ấy là một người phụ nữ rất hấp dẫn." },
  { lesson: 2, word: "handsome", type: "adjective", phonetic: "/ˈhæn.səm/", meaning: "đẹp trai", audioUrl: "", exampleEn: "He is tall and handsome.", exampleVi: "Anh ấy cao ráo và đẹp trai." },
  { lesson: 2, word: "pretty", type: "adjective", phonetic: "/ˈprɪt.i/", meaning: "xinh xắn", audioUrl: "", exampleEn: "She wore a pretty dress.", exampleVi: "Cô ấy đã mặc một chiếc váy xinh xắn." },
  { lesson: 2, word: "ugly", type: "adjective", phonetic: "/ˈʌɡ.li/", meaning: "xấu xí", audioUrl: "", exampleEn: "I think this building is ugly.", exampleVi: "Tôi nghĩ tòa nhà này thật xấu xí." },

  // BÀI 3: Health & Fitness
  { lesson: 3, word: "health", type: "noun", phonetic: "/helθ/", meaning: "sức khỏe", audioUrl: "", exampleEn: "Smoking is bad for your health.", exampleVi: "Hút thuốc có hại cho sức khỏe của bạn." },
  { lesson: 3, word: "fitness", type: "noun", phonetic: "/ˈfɪt.nəs/", meaning: "sự khỏe mạnh, cân đối", audioUrl: "", exampleEn: "He goes to the gym to improve his fitness.", exampleVi: "Anh ấy đến phòng tập gym để nâng cao thể lực." },
  { lesson: 3, word: "disease", type: "noun", phonetic: "/dɪˈziːz/", meaning: "căn bệnh", audioUrl: "", exampleEn: "Heart disease is very common.", exampleVi: "Bệnh tim rất phổ biến." },
  { lesson: 3, word: "illness", type: "noun", phonetic: "/ˈɪl.nəs/", meaning: "ốm đau, bệnh tật", audioUrl: "", exampleEn: "She missed school because of illness.", exampleVi: "Cô ấy đã nghỉ học vì ốm." },
  { lesson: 3, word: "symptom", type: "noun", phonetic: "/ˈsɪmp.təm/", meaning: "triệu chứng", audioUrl: "", exampleEn: "A fever is a symptom of flu.", exampleVi: "Sốt là một triệu chứng của bệnh cúm." },
  { lesson: 3, word: "pain", type: "noun", phonetic: "/peɪn/", meaning: "sự đau đớn", audioUrl: "", exampleEn: "Are you in pain?", exampleVi: "Bạn có bị đau không?" },
  { lesson: 3, word: "injury", type: "noun", phonetic: "/ˈɪn.dʒər.i/", meaning: "chấn thương", audioUrl: "", exampleEn: "He suffered a leg injury.", exampleVi: "Anh ấy bị chấn thương ở chân." },
  { lesson: 3, word: "recover", type: "verb", phonetic: "/rɪˈkʌv.ər/", meaning: "hồi phục", audioUrl: "", exampleEn: "It took her weeks to recover from the surgery.", exampleVi: "Cô ấy mất vài tuần để hồi phục sau phẫu thuật." },
  { lesson: 3, word: "medicine", type: "noun", phonetic: "/ˈmed.ɪ.sən/", meaning: "thuốc", audioUrl: "", exampleEn: "Did you take your medicine?", exampleVi: "Bạn đã uống thuốc chưa?" },
  { lesson: 3, word: "treatment", type: "noun", phonetic: "/ˈtriːt.mənt/", meaning: "sự điều trị", audioUrl: "", exampleEn: "This is a new treatment for cancer.", exampleVi: "Đây là một phương pháp điều trị mới cho bệnh ung thư." },
  { lesson: 3, word: "exercise", type: "noun", phonetic: "/ˈek.sə.saɪz/", meaning: "sự tập thể dục", audioUrl: "", exampleEn: "Exercise is good for the heart.", exampleVi: "Tập thể dục rất tốt cho tim mạch." },
  { lesson: 3, word: "diet", type: "noun", phonetic: "/ˈdaɪ.ət/", meaning: "chế độ ăn uống", audioUrl: "", exampleEn: "She is on a strict diet.", exampleVi: "Cô ấy đang trong một chế độ ăn kiêng nghiêm ngặt." },
  { lesson: 3, word: "nutrition", type: "noun", phonetic: "/njuːˈtrɪʃ.ən/", meaning: "dinh dưỡng", audioUrl: "", exampleEn: "Good nutrition is essential for growing children.", exampleVi: "Dinh dưỡng tốt là điều thiết yếu đối với trẻ đang phát triển." },
  { lesson: 3, word: "healthy", type: "adjective", phonetic: "/ˈhel.θi/", meaning: "khỏe mạnh", audioUrl: "", exampleEn: "I try to eat healthy food.", exampleVi: "Tôi cố gắng ăn thức ăn lành mạnh." },
  { lesson: 3, word: "fit", type: "adjective", phonetic: "/fɪt/", meaning: "sung sức, thon gọn", audioUrl: "", exampleEn: "Running helps me keep fit.", exampleVi: "Chạy bộ giúp tôi giữ dáng." },
  { lesson: 3, word: "overweight", type: "adjective", phonetic: "/ˌəʊ.vəˈweɪt/", meaning: "thừa cân", audioUrl: "", exampleEn: "He is slightly overweight.", exampleVi: "Anh ấy hơi thừa cân." },
  { lesson: 3, word: "stress", type: "noun", phonetic: "/stres/", meaning: "sự căng thẳng", audioUrl: "", exampleEn: "Yoga helps reduce stress.", exampleVi: "Yoga giúp giảm căng thẳng." },
  { lesson: 3, word: "relax", type: "verb", phonetic: "/rɪˈlæks/", meaning: "thư giãn", audioUrl: "", exampleEn: "A hot bath will help you relax.", exampleVi: "Một bồn tắm nước nóng sẽ giúp bạn thư giãn." },
  { lesson: 3, word: "energy", type: "noun", phonetic: "/ˈen.ə.dʒi/", meaning: "năng lượng", audioUrl: "", exampleEn: "I don't have the energy to run today.", exampleVi: "Hôm nay tôi không có sức để chạy." },
  { lesson: 3, word: "sleep", type: "verb", phonetic: "/sliːp/", meaning: "ngủ", audioUrl: "", exampleEn: "You need to sleep at least 7 hours a day.", exampleVi: "Bạn cần ngủ ít nhất 7 giờ mỗi ngày." },

  // BÀI 4: Shopping & Consumerism
  { lesson: 4, word: "customer", type: "noun", phonetic: "/ˈkʌs.tə.mər/", meaning: "khách hàng", audioUrl: "", exampleEn: "The shop has many customers on weekends.", exampleVi: "Cửa hàng có nhiều khách hàng vào dịp cuối tuần." },
  { lesson: 4, word: "discount", type: "noun", phonetic: "/ˈdɪs.kaʊnt/", meaning: "sự giảm giá", audioUrl: "", exampleEn: "They offer a 10% discount for students.", exampleVi: "Họ giảm giá 10% cho sinh viên." },
  { lesson: 4, word: "bargain", type: "noun", phonetic: "/ˈbɑː.ɡɪn/", meaning: "món hời, sự mặc cả", audioUrl: "", exampleEn: "This coat was a real bargain.", exampleVi: "Chiếc áo khoác này quả là một món hời." },
  { lesson: 4, word: "receipt", type: "noun", phonetic: "/rɪˈsiːt/", meaning: "hóa đơn, biên lai", audioUrl: "", exampleEn: "Please keep your receipt.", exampleVi: "Vui lòng giữ lại biên lai của bạn." },
  { lesson: 4, word: "refund", type: "noun", phonetic: "/ˈriː.fʌnd/", meaning: "tiền hoàn lại", audioUrl: "", exampleEn: "Can I get a refund if it doesn't fit?", exampleVi: "Tôi có thể được hoàn tiền nếu nó không vừa không?" },
  { lesson: 4, word: "guarantee", type: "noun", phonetic: "/ˌɡær.ənˈtiː/", meaning: "sự bảo hành", audioUrl: "", exampleEn: "The TV comes with a two-year guarantee.", exampleVi: "Chiếc tivi được bảo hành hai năm." },
  { lesson: 4, word: "affordable", type: "adjective", phonetic: "/əˈfɔː.də.bəl/", meaning: "giá cả phải chăng", audioUrl: "", exampleEn: "They sell affordable clothes.", exampleVi: "Họ bán quần áo giá cả phải chăng." },
  { lesson: 4, word: "expensive", type: "adjective", phonetic: "/ɪkˈspen.sɪv/", meaning: "đắt tiền", audioUrl: "", exampleEn: "That watch is too expensive for me.", exampleVi: "Chiếc đồng hồ đó quá đắt đối với tôi." },
  { lesson: 4, word: "cheap", type: "adjective", phonetic: "/tʃiːp/", meaning: "rẻ", audioUrl: "", exampleEn: "I bought a cheap pair of shoes.", exampleVi: "Tôi đã mua một đôi giày rẻ." },
  { lesson: 4, word: "brand", type: "noun", phonetic: "/brænd/", meaning: "nhãn hiệu", audioUrl: "", exampleEn: "What brand of phone do you use?", exampleVi: "Bạn dùng điện thoại nhãn hiệu gì?" },
  { lesson: 4, word: "mall", type: "noun", phonetic: "/mɔːl/", meaning: "trung tâm mua sắm", audioUrl: "", exampleEn: "We went shopping at the mall.", exampleVi: "Chúng tôi đã đi mua sắm ở trung tâm thương mại." },
  { lesson: 4, word: "supermarket", type: "noun", phonetic: "/ˈsuː.pəˌmɑː.kɪt/", meaning: "siêu thị", audioUrl: "", exampleEn: "I buy my food at the local supermarket.", exampleVi: "Tôi mua thức ăn ở siêu thị địa phương." },
  { lesson: 4, word: "cash", type: "noun", phonetic: "/kæʃ/", meaning: "tiền mặt", audioUrl: "", exampleEn: "Do you prefer to pay in cash or by card?", exampleVi: "Bạn muốn thanh toán bằng tiền mặt hay thẻ?" },
  { lesson: 4, word: "credit", type: "noun", phonetic: "/ˈkred.ɪt/", meaning: "tín dụng", audioUrl: "", exampleEn: "I will pay by credit card.", exampleVi: "Tôi sẽ thanh toán bằng thẻ tín dụng." },
  { lesson: 4, word: "currency", type: "noun", phonetic: "/ˈkʌr.ən.si/", meaning: "tiền tệ", audioUrl: "", exampleEn: "The local currency is the Dollar.", exampleVi: "Đồng tiền địa phương là Đô la." },
  { lesson: 4, word: "purchase", type: "verb", phonetic: "/ˈpɜː.tʃəs/", meaning: "mua", audioUrl: "", exampleEn: "You can purchase tickets online.", exampleVi: "Bạn có thể mua vé trực tuyến." },
  { lesson: 4, word: "return", type: "verb", phonetic: "/rɪˈtɜːn/", meaning: "trả lại", audioUrl: "", exampleEn: "I want to return this dress.", exampleVi: "Tôi muốn trả lại chiếc váy này." },
  { lesson: 4, word: "exchange", type: "verb", phonetic: "/ɪksˈtʃeɪndʒ/", meaning: "đổi (hàng)", audioUrl: "", exampleEn: "Can I exchange this for a bigger size?", exampleVi: "Tôi có thể đổi cái này lấy size to hơn không?" },
  { lesson: 4, word: "quality", type: "noun", phonetic: "/ˈkwɒl.ə.ti/", meaning: "chất lượng", audioUrl: "", exampleEn: "The goods are of high quality.", exampleVi: "Hàng hóa có chất lượng cao." },
  { lesson: 4, word: "checkout", type: "noun", phonetic: "/ˈtʃek.aʊt/", meaning: "quầy thanh toán", audioUrl: "", exampleEn: "There is a long queue at the checkout.", exampleVi: "Có một hàng dài người xếp hàng tại quầy thanh toán." },

  // BÀI 5: Housing & Living Space
  { lesson: 5, word: "accommodation", type: "noun", phonetic: "/əˌkɒm.əˈdeɪ.ʃən/", meaning: "chỗ ở", audioUrl: "", exampleEn: "We need to find cheap accommodation.", exampleVi: "Chúng ta cần tìm chỗ ở giá rẻ." },
  { lesson: 5, word: "apartment", type: "noun", phonetic: "/əˈpɑːt.mənt/", meaning: "căn hộ", audioUrl: "", exampleEn: "They live in a modern apartment.", exampleVi: "Họ sống trong một căn hộ hiện đại." },
  { lesson: 5, word: "flat", type: "noun", phonetic: "/flæt/", meaning: "căn hộ (Anh-Anh)", audioUrl: "", exampleEn: "My flat is on the third floor.", exampleVi: "Căn hộ của tôi ở tầng ba." },
  { lesson: 5, word: "neighbourhood", type: "noun", phonetic: "/ˈneɪ.bə.hʊd/", meaning: "khu vực lân cận, hàng xóm", audioUrl: "", exampleEn: "It is a quiet and safe neighbourhood.", exampleVi: "Đó là một khu vực yên tĩnh và an toàn." },
  { lesson: 5, word: "suburb", type: "noun", phonetic: "/ˈsʌb.ɜːb/", meaning: "vùng ngoại ô", audioUrl: "", exampleEn: "Many families move to the suburbs.", exampleVi: "Nhiều gia đình chuyển đến vùng ngoại ô." },
  { lesson: 5, word: "rent", type: "verb", phonetic: "/rent/", meaning: "thuê", audioUrl: "", exampleEn: "We rent a house near the beach.", exampleVi: "Chúng tôi thuê một ngôi nhà gần bãi biển." },
  { lesson: 5, word: "landlord", type: "noun", phonetic: "/ˈlænd.lɔːd/", meaning: "chủ nhà (nam)", audioUrl: "", exampleEn: "The landlord asked for the rent.", exampleVi: "Chủ nhà đã yêu cầu trả tiền thuê." },
  { lesson: 5, word: "tenant", type: "noun", phonetic: "/ˈten.ənt/", meaning: "người thuê nhà", audioUrl: "", exampleEn: "The previous tenant left yesterday.", exampleVi: "Người thuê nhà trước đã rời đi hôm qua." },
  { lesson: 5, word: "mortgage", type: "noun", phonetic: "/ˈmɔː.ɡɪdʒ/", meaning: "khoản vay thế chấp", audioUrl: "", exampleEn: "They took out a mortgage to buy the house.", exampleVi: "Họ đã vay thế chấp để mua nhà." },
  { lesson: 5, word: "furniture", type: "noun", phonetic: "/ˈfɜː.nɪ.tʃər/", meaning: "đồ nội thất", audioUrl: "", exampleEn: "We bought some new furniture.", exampleVi: "Chúng tôi đã mua một số đồ nội thất mới." },
  { lesson: 5, word: "decorate", type: "verb", phonetic: "/ˈdek.ə.reɪt/", meaning: "trang trí", audioUrl: "", exampleEn: "We are going to decorate the bedroom.", exampleVi: "Chúng tôi dự định sẽ trang trí phòng ngủ." },
  { lesson: 5, word: "spacious", type: "adjective", phonetic: "/ˈspeɪ.ʃəs/", meaning: "rộng rãi", audioUrl: "", exampleEn: "The living room is very spacious.", exampleVi: "Phòng khách rất rộng rãi." },
  { lesson: 5, word: "cosy", type: "adjective", phonetic: "/ˈkəʊ.zi/", meaning: "ấm cúng", audioUrl: "", exampleEn: "The cottage was warm and cosy.", exampleVi: "Ngôi nhà gỗ rất ấm áp và ấm cúng." },
  { lesson: 5, word: "messy", type: "adjective", phonetic: "/ˈmes.i/", meaning: "bừa bộn", audioUrl: "", exampleEn: "His room is always messy.", exampleVi: "Phòng của cậu ấy luôn luôn bừa bộn." },
  { lesson: 5, word: "tidy", type: "verb", phonetic: "/ˈtaɪ.di/", meaning: "dọn dẹp", audioUrl: "", exampleEn: "Please tidy your room.", exampleVi: "Vui lòng dọn dẹp phòng của bạn." },
  { lesson: 5, word: "ceiling", type: "noun", phonetic: "/ˈsiː.lɪŋ/", meaning: "trần nhà", audioUrl: "", exampleEn: "The room has a high ceiling.", exampleVi: "Căn phòng có trần nhà cao." },
  { lesson: 5, word: "floor", type: "noun", phonetic: "/flɔːr/", meaning: "sàn nhà, tầng", audioUrl: "", exampleEn: "My office is on the first floor.", exampleVi: "Văn phòng của tôi ở tầng một." },
  { lesson: 5, word: "basement", type: "noun", phonetic: "/ˈbeɪs.mənt/", meaning: "tầng hầm", audioUrl: "", exampleEn: "We keep old boxes in the basement.", exampleVi: "Chúng tôi cất những chiếc hộp cũ trong tầng hầm." },
  { lesson: 5, word: "balcony", type: "noun", phonetic: "/ˈbæl.kə.ni/", meaning: "ban công", audioUrl: "", exampleEn: "She sat on the balcony reading a book.", exampleVi: "Cô ấy ngồi trên ban công đọc sách." },
  { lesson: 5, word: "garage", type: "noun", phonetic: "/ˈɡær.ɑːʒ/", meaning: "ga-ra (để xe)", audioUrl: "", exampleEn: "The car is parked in the garage.", exampleVi: "Chiếc xe được đậu trong ga-ra." }
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
        contentType: 'THEORY', // SỬ DỤNG THEORY THEO CHUẨN UI
        content: { contains: `"word":"${item.word}"` }
      }
    });

    if (!existingContent) {
      await prisma.lessonContent.create({
        data: { lessonId: targetLesson.id, contentType: 'THEORY', content: contentJson }
      });
      await prisma.lessonContent.create({
        data: { lessonId: vocabLesson.id, contentType: 'THEORY', content: contentJson }
      });
      successCount++;
      console.log(`✅ Đã thêm từ: ${item.word} (Bài ${item.lesson})`);
    } else {
      console.log(`⏩ Đã tồn tại từ: ${item.word}`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp ${successCount} từ vựng Batch 1 cho PET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

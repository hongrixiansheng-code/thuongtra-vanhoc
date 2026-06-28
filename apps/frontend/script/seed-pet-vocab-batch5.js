/**
 * SEED SCRIPT: PET Vocabulary — Batch 5 (Bài 21 - 25)
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const VOCAB_DATA = [
  // BÀI 21: Work, Jobs & Careers
  { lesson: 21, word: "career", type: "noun", phonetic: "/kəˈrɪər/", meaning: "sự nghiệp", audioUrl: "", exampleEn: "He wants a career in medicine.", exampleVi: "Anh ấy muốn có một sự nghiệp trong ngành y." },
  { lesson: 21, word: "profession", type: "noun", phonetic: "/prəˈfeʃ.ən/", meaning: "nghề nghiệp (chuyên môn)", audioUrl: "", exampleEn: "Teaching is a noble profession.", exampleVi: "Dạy học là một nghề cao quý." },
  { lesson: 21, word: "employer", type: "noun", phonetic: "/ɪmˈplɔɪ.ər/", meaning: "nhà tuyển dụng, ông chủ", audioUrl: "", exampleEn: "My employer is very generous.", exampleVi: "Ông chủ của tôi rất hào phóng." },
  { lesson: 21, word: "employee", type: "noun", phonetic: "/ɪmˈplɔɪ.iː/", meaning: "nhân viên", audioUrl: "", exampleEn: "The company has over 500 employees.", exampleVi: "Công ty có hơn 500 nhân viên." },
  { lesson: 21, word: "staff", type: "noun", phonetic: "/stɑːf/", meaning: "nhân sự, nhân viên", audioUrl: "", exampleEn: "All staff must wear a uniform.", exampleVi: "Tất cả nhân viên phải mặc đồng phục." },
  { lesson: 21, word: "salary", type: "noun", phonetic: "/ˈsæl.ər.i/", meaning: "tiền lương", audioUrl: "", exampleEn: "She gets a high salary.", exampleVi: "Cô ấy nhận được mức lương cao." },
  { lesson: 21, word: "wage", type: "noun", phonetic: "/weɪdʒ/", meaning: "tiền công (theo giờ/tuần)", audioUrl: "", exampleEn: "The minimum wage is increasing.", exampleVi: "Mức lương tối thiểu đang tăng lên." },
  { lesson: 21, word: "interview", type: "noun", phonetic: "/ˈɪn.tə.vjuː/", meaning: "cuộc phỏng vấn (xin việc)", audioUrl: "", exampleEn: "I have a job interview tomorrow.", exampleVi: "Tôi có một cuộc phỏng vấn xin việc vào ngày mai." },
  { lesson: 21, word: "qualification", type: "noun", phonetic: "/ˌkwɒl.ɪ.fɪˈkeɪ.ʃən/", meaning: "bằng cấp, chứng chỉ", audioUrl: "", exampleEn: "What are your qualifications?", exampleVi: "Bằng cấp của bạn là gì?" },
  { lesson: 21, word: "experience", type: "noun", phonetic: "/ɪkˈspɪə.ri.əns/", meaning: "kinh nghiệm", audioUrl: "", exampleEn: "Do you have any experience in sales?", exampleVi: "Bạn có kinh nghiệm bán hàng không?" },
  { lesson: 21, word: "apply", type: "verb", phonetic: "/əˈplaɪ/", meaning: "nộp đơn (xin việc)", audioUrl: "", exampleEn: "I decided to apply for the job.", exampleVi: "Tôi đã quyết định nộp đơn xin việc." },
  { lesson: 21, word: "hire", type: "verb", phonetic: "/haɪər/", meaning: "thuê, mướn (người)", audioUrl: "", exampleEn: "They are looking to hire a new manager.", exampleVi: "Họ đang tìm thuê một người quản lý mới." },
  { lesson: 21, word: "fire", type: "verb", phonetic: "/faɪər/", meaning: "sa thải", audioUrl: "", exampleEn: "He was fired for being late too often.", exampleVi: "Anh ta đã bị sa thải vì đi muộn quá nhiều." },
  { lesson: 21, word: "quit", type: "verb", phonetic: "/kwɪt/", meaning: "bỏ việc", audioUrl: "", exampleEn: "She quit her job last week.", exampleVi: "Cô ấy đã nghỉ việc vào tuần trước." },
  { lesson: 21, word: "retire", type: "verb", phonetic: "/rɪˈtaɪər/", meaning: "nghỉ hưu", audioUrl: "", exampleEn: "My grandfather retired at age 65.", exampleVi: "Ông tôi đã nghỉ hưu ở tuổi 65." },
  { lesson: 21, word: "promotion", type: "noun", phonetic: "/prəˈməʊ.ʃən/", meaning: "sự thăng chức", audioUrl: "", exampleEn: "He worked hard to get a promotion.", exampleVi: "Anh ấy đã làm việc chăm chỉ để được thăng chức." },
  { lesson: 21, word: "colleague", type: "noun", phonetic: "/ˈkɒl.iːɡ/", meaning: "đồng nghiệp", audioUrl: "", exampleEn: "I get on well with my colleagues.", exampleVi: "Tôi hòa thuận với các đồng nghiệp của mình." },
  { lesson: 21, word: "office", type: "noun", phonetic: "/ˈɒf.ɪs/", meaning: "văn phòng", audioUrl: "", exampleEn: "She works in a busy office.", exampleVi: "Cô ấy làm việc trong một văn phòng bận rộn." },
  { lesson: 21, word: "manager", type: "noun", phonetic: "/ˈmæn.ɪ.dʒər/", meaning: "người quản lý", audioUrl: "", exampleEn: "The manager is in a meeting.", exampleVi: "Người quản lý đang trong một cuộc họp." },
  { lesson: 21, word: "customer", type: "noun", phonetic: "/ˈkʌs.tə.mər/", meaning: "khách hàng", audioUrl: "", exampleEn: "We must provide good customer service.", exampleVi: "Chúng ta phải cung cấp dịch vụ khách hàng tốt." },

  // BÀI 22: Business & Industry
  { lesson: 22, word: "business", type: "noun", phonetic: "/ˈbɪz.nɪs/", meaning: "doanh nghiệp, kinh doanh", audioUrl: "", exampleEn: "He owns a successful business.", exampleVi: "Anh ấy sở hữu một doanh nghiệp thành công." },
  { lesson: 22, word: "company", type: "noun", phonetic: "/ˈkʌm.pə.ni/", meaning: "công ty", audioUrl: "", exampleEn: "She works for a tech company.", exampleVi: "Cô ấy làm việc cho một công ty công nghệ." },
  { lesson: 22, word: "industry", type: "noun", phonetic: "/ˈɪn.də.stri/", meaning: "ngành công nghiệp", audioUrl: "", exampleEn: "The car industry is growing rapidly.", exampleVi: "Ngành công nghiệp ô tô đang phát triển nhanh chóng." },
  { lesson: 22, word: "factory", type: "noun", phonetic: "/ˈfæk.tər.i/", meaning: "nhà máy", audioUrl: "", exampleEn: "They produce shoes in this factory.", exampleVi: "Họ sản xuất giày trong nhà máy này." },
  { lesson: 22, word: "product", type: "noun", phonetic: "/ˈprɒd.ʌkt/", meaning: "sản phẩm", audioUrl: "", exampleEn: "This is our new product.", exampleVi: "Đây là sản phẩm mới của chúng tôi." },
  { lesson: 22, word: "produce", type: "verb", phonetic: "/prəˈdjuːs/", meaning: "sản xuất", audioUrl: "", exampleEn: "The factory produces 100 cars a day.", exampleVi: "Nhà máy sản xuất 100 chiếc xe mỗi ngày." },
  { lesson: 22, word: "market", type: "noun", phonetic: "/ˈmɑː.kɪt/", meaning: "thị trường", audioUrl: "", exampleEn: "We need to study the global market.", exampleVi: "Chúng ta cần nghiên cứu thị trường toàn cầu." },
  { lesson: 22, word: "trade", type: "noun", phonetic: "/treɪd/", meaning: "thương mại", audioUrl: "", exampleEn: "Trade between the two countries has increased.", exampleVi: "Thương mại giữa hai nước đã tăng lên." },
  { lesson: 22, word: "export", type: "verb", phonetic: "/ɪkˈspɔːt/", meaning: "xuất khẩu", audioUrl: "", exampleEn: "They export fruit to Europe.", exampleVi: "Họ xuất khẩu trái cây sang Châu Âu." },
  { lesson: 22, word: "import", type: "verb", phonetic: "/ɪmˈpɔːt/", meaning: "nhập khẩu", audioUrl: "", exampleEn: "We import oil from the Middle East.", exampleVi: "Chúng tôi nhập khẩu dầu từ Trung Đông." },
  { lesson: 22, word: "profit", type: "noun", phonetic: "/ˈprɒf.ɪt/", meaning: "lợi nhuận", audioUrl: "", exampleEn: "The company made a huge profit.", exampleVi: "Công ty đã tạo ra một khoản lợi nhuận khổng lồ." },
  { lesson: 22, word: "loss", type: "noun", phonetic: "/lɒs/", meaning: "sự thua lỗ", audioUrl: "", exampleEn: "The business suffered a big loss last year.", exampleVi: "Doanh nghiệp đã chịu một khoản lỗ lớn vào năm ngoái." },
  { lesson: 22, word: "success", type: "noun", phonetic: "/səkˈses/", meaning: "sự thành công", audioUrl: "", exampleEn: "Her new book is a great success.", exampleVi: "Cuốn sách mới của cô ấy là một thành công lớn." },
  { lesson: 22, word: "fail", type: "verb", phonetic: "/feɪl/", meaning: "thất bại", audioUrl: "", exampleEn: "Many small businesses fail in the first year.", exampleVi: "Nhiều doanh nghiệp nhỏ thất bại trong năm đầu tiên." },
  { lesson: 22, word: "invest", type: "verb", phonetic: "/ɪnˈvest/", meaning: "đầu tư", audioUrl: "", exampleEn: "He decided to invest in real estate.", exampleVi: "Anh ấy đã quyết định đầu tư vào bất động sản." },
  { lesson: 22, word: "partner", type: "noun", phonetic: "/ˈpɑːt.nər/", meaning: "đối tác (kinh doanh)", audioUrl: "", exampleEn: "He is my business partner.", exampleVi: "Anh ấy là đối tác kinh doanh của tôi." },
  { lesson: 22, word: "contract", type: "noun", phonetic: "/ˈkɒn.trækt/", meaning: "hợp đồng", audioUrl: "", exampleEn: "Please sign the contract here.", exampleVi: "Vui lòng ký hợp đồng tại đây." },
  { lesson: 22, word: "meeting", type: "noun", phonetic: "/ˈmiː.tɪŋ/", meaning: "cuộc họp", audioUrl: "", exampleEn: "We have a meeting with the client.", exampleVi: "Chúng tôi có một cuộc họp với khách hàng." },
  { lesson: 22, word: "presentation", type: "noun", phonetic: "/ˌprez.ənˈteɪ.ʃən/", meaning: "bài thuyết trình", audioUrl: "", exampleEn: "She gave a presentation to the board.", exampleVi: "Cô ấy đã thuyết trình trước hội đồng quản trị." },
  { lesson: 22, word: "brand", type: "noun", phonetic: "/brænd/", meaning: "thương hiệu", audioUrl: "", exampleEn: "Apple is a very famous brand.", exampleVi: "Apple là một thương hiệu rất nổi tiếng." },

  // BÀI 23: Money & Finance
  { lesson: 23, word: "money", type: "noun", phonetic: "/ˈmʌn.i/", meaning: "tiền", audioUrl: "", exampleEn: "I don't have enough money to buy it.", exampleVi: "Tôi không có đủ tiền để mua nó." },
  { lesson: 23, word: "cash", type: "noun", phonetic: "/kæʃ/", meaning: "tiền mặt", audioUrl: "", exampleEn: "Can I pay in cash?", exampleVi: "Tôi có thể thanh toán bằng tiền mặt không?" },
  { lesson: 23, word: "coin", type: "noun", phonetic: "/kɔɪn/", meaning: "tiền xu", audioUrl: "", exampleEn: "I have a lot of coins in my pocket.", exampleVi: "Tôi có rất nhiều tiền xu trong túi." },
  { lesson: 23, word: "note", type: "noun", phonetic: "/nəʊt/", meaning: "tiền giấy, tờ tiền", audioUrl: "", exampleEn: "Do you have a ten-pound note?", exampleVi: "Bạn có tờ 10 bảng Anh không?" },
  { lesson: 23, word: "bank", type: "noun", phonetic: "/bæŋk/", meaning: "ngân hàng", audioUrl: "", exampleEn: "I need to go to the bank to get some cash.", exampleVi: "Tôi cần đến ngân hàng để rút ít tiền mặt." },
  { lesson: 23, word: "account", type: "noun", phonetic: "/əˈkaʊnt/", meaning: "tài khoản", audioUrl: "", exampleEn: "I opened a new bank account.", exampleVi: "Tôi đã mở một tài khoản ngân hàng mới." },
  { lesson: 23, word: "borrow", type: "verb", phonetic: "/ˈbɒr.əʊ/", meaning: "mượn, vay", audioUrl: "", exampleEn: "Can I borrow your pen?", exampleVi: "Tôi có thể mượn bút của bạn không?" },
  { lesson: 23, word: "lend", type: "verb", phonetic: "/lend/", meaning: "cho mượn", audioUrl: "", exampleEn: "Could you lend me some money?", exampleVi: "Bạn có thể cho tôi mượn một ít tiền không?" },
  { lesson: 23, word: "owe", type: "verb", phonetic: "/əʊ/", meaning: "nợ", audioUrl: "", exampleEn: "I owe him fifty dollars.", exampleVi: "Tôi nợ anh ấy 50 đô la." },
  { lesson: 23, word: "debt", type: "noun", phonetic: "/det/", meaning: "món nợ", audioUrl: "", exampleEn: "He is deeply in debt.", exampleVi: "Anh ấy đang nợ nần đầm đìa." },
  { lesson: 23, word: "earn", type: "verb", phonetic: "/ɜːn/", meaning: "kiếm (tiền)", audioUrl: "", exampleEn: "She earns a lot of money.", exampleVi: "Cô ấy kiếm được rất nhiều tiền." },
  { lesson: 23, word: "spend", type: "verb", phonetic: "/spend/", meaning: "tiêu xài", audioUrl: "", exampleEn: "Don't spend all your money on clothes.", exampleVi: "Đừng tiêu hết tiền vào quần áo." },
  { lesson: 23, word: "save", type: "verb", phonetic: "/seɪv/", meaning: "tiết kiệm", audioUrl: "", exampleEn: "I am saving up for a car.", exampleVi: "Tôi đang tiết kiệm tiền để mua xe." },
  { lesson: 23, word: "waste", type: "verb", phonetic: "/weɪst/", meaning: "lãng phí", audioUrl: "", exampleEn: "Why waste money on things you don't need?", exampleVi: "Tại sao lại lãng phí tiền vào những thứ bạn không cần?" },
  { lesson: 23, word: "afford", type: "verb", phonetic: "/əˈfɔːd/", meaning: "có đủ khả năng chi trả", audioUrl: "", exampleEn: "I can't afford to buy a house.", exampleVi: "Tôi không có đủ khả năng mua một ngôi nhà." },
  { lesson: 23, word: "price", type: "noun", phonetic: "/praɪs/", meaning: "giá cả", audioUrl: "", exampleEn: "The price of petrol is going up.", exampleVi: "Giá xăng đang tăng." },
  { lesson: 23, word: "cost", type: "verb", phonetic: "/kɒst/", meaning: "có giá (bao nhiêu)", audioUrl: "", exampleEn: "How much does it cost?", exampleVi: "Cái này giá bao nhiêu?" },
  { lesson: 23, word: "cheap", type: "adjective", phonetic: "/tʃiːp/", meaning: "rẻ", audioUrl: "", exampleEn: "This shirt was very cheap.", exampleVi: "Chiếc áo này rất rẻ." },
  { lesson: 23, word: "expensive", type: "adjective", phonetic: "/ɪkˈspen.sɪv/", meaning: "đắt", audioUrl: "", exampleEn: "Jewellery is usually expensive.", exampleVi: "Đồ trang sức thường đắt tiền." },
  { lesson: 23, word: "budget", type: "noun", phonetic: "/ˈbʌdʒ.ɪt/", meaning: "ngân sách", audioUrl: "", exampleEn: "We have a strict budget for the party.", exampleVi: "Chúng tôi có một ngân sách nghiêm ngặt cho bữa tiệc." },

  // BÀI 24: Ambitions & Future Plans
  { lesson: 24, word: "ambition", type: "noun", phonetic: "/æmˈbɪʃ.ən/", meaning: "hoài bão, khát vọng", audioUrl: "", exampleEn: "Her ambition is to become a doctor.", exampleVi: "Hoài bão của cô ấy là trở thành một bác sĩ." },
  { lesson: 24, word: "goal", type: "noun", phonetic: "/ɡəʊl/", meaning: "mục tiêu", audioUrl: "", exampleEn: "My goal is to learn three languages.", exampleVi: "Mục tiêu của tôi là học ba ngôn ngữ." },
  { lesson: 24, word: "dream", type: "noun", phonetic: "/driːm/", meaning: "giấc mơ", audioUrl: "", exampleEn: "It is his dream to travel the world.", exampleVi: "Được đi du lịch vòng quanh thế giới là ước mơ của cậu ấy." },
  { lesson: 24, word: "hope", type: "verb", phonetic: "/həʊp/", meaning: "hy vọng", audioUrl: "", exampleEn: "I hope you feel better soon.", exampleVi: "Tôi hy vọng bạn sẽ sớm khỏe lại." },
  { lesson: 24, word: "plan", type: "noun", phonetic: "/plæn/", meaning: "kế hoạch", audioUrl: "", exampleEn: "Do you have any plans for the weekend?", exampleVi: "Bạn có kế hoạch gì cho cuối tuần không?" },
  { lesson: 24, word: "future", type: "noun", phonetic: "/ˈfjuː.tʃər/", meaning: "tương lai", audioUrl: "", exampleEn: "What do you want to do in the future?", exampleVi: "Bạn muốn làm gì trong tương lai?" },
  { lesson: 24, word: "achieve", type: "verb", phonetic: "/əˈtʃiːv/", meaning: "đạt được", audioUrl: "", exampleEn: "She worked hard to achieve her goals.", exampleVi: "Cô ấy đã làm việc chăm chỉ để đạt được mục tiêu." },
  { lesson: 24, word: "success", type: "noun", phonetic: "/səkˈses/", meaning: "sự thành công", audioUrl: "", exampleEn: "Hard work is the key to success.", exampleVi: "Làm việc chăm chỉ là chìa khóa của sự thành công." },
  { lesson: 24, word: "succeed", type: "verb", phonetic: "/səkˈsiːd/", meaning: "thành công", audioUrl: "", exampleEn: "If you try hard, you will succeed.", exampleVi: "Nếu bạn cố gắng hết sức, bạn sẽ thành công." },
  { lesson: 24, word: "improve", type: "verb", phonetic: "/ɪmˈpruːv/", meaning: "cải thiện", audioUrl: "", exampleEn: "I want to improve my English.", exampleVi: "Tôi muốn cải thiện tiếng Anh của mình." },
  { lesson: 24, word: "develop", type: "verb", phonetic: "/dɪˈvel.əp/", meaning: "phát triển", audioUrl: "", exampleEn: "We need to develop our skills.", exampleVi: "Chúng ta cần phát triển các kỹ năng của mình." },
  { lesson: 24, word: "opportunity", type: "noun", phonetic: "/ˌɒp.əˈtʃuː.nə.ti/", meaning: "cơ hội", audioUrl: "", exampleEn: "This is a great opportunity for you.", exampleVi: "Đây là một cơ hội lớn dành cho bạn." },
  { lesson: 24, word: "chance", type: "noun", phonetic: "/tʃɑːns/", meaning: "cơ hội, sự may rủi", audioUrl: "", exampleEn: "Give him a second chance.", exampleVi: "Hãy cho anh ấy một cơ hội thứ hai." },
  { lesson: 24, word: "decision", type: "noun", phonetic: "/dɪˈsɪʒ.ən/", meaning: "quyết định", audioUrl: "", exampleEn: "She made a quick decision.", exampleVi: "Cô ấy đã đưa ra một quyết định nhanh chóng." },
  { lesson: 24, word: "choose", type: "verb", phonetic: "/tʃuːz/", meaning: "lựa chọn", audioUrl: "", exampleEn: "You can choose any colour you like.", exampleVi: "Bạn có thể chọn bất kỳ màu nào bạn thích." },
  { lesson: 24, word: "imagine", type: "verb", phonetic: "/ɪˈmædʒ.ɪn/", meaning: "tưởng tượng", audioUrl: "", exampleEn: "Imagine a world without war.", exampleVi: "Hãy tưởng tượng một thế giới không có chiến tranh." },
  { lesson: 24, word: "believe", type: "verb", phonetic: "/bɪˈliːv/", meaning: "tin tưởng", audioUrl: "", exampleEn: "You must believe in yourself.", exampleVi: "Bạn phải tin vào chính mình." },
  { lesson: 24, word: "confident", type: "adjective", phonetic: "/ˈkɒn.fɪ.dənt/", meaning: "tự tin", audioUrl: "", exampleEn: "I am confident that we will win.", exampleVi: "Tôi tự tin rằng chúng ta sẽ chiến thắng." },
  { lesson: 24, word: "positive", type: "adjective", phonetic: "/ˈpɒz.ə.tɪv/", meaning: "tích cực", audioUrl: "", exampleEn: "Try to stay positive.", exampleVi: "Hãy cố gắng giữ tinh thần tích cực." },
  { lesson: 24, word: "motivate", type: "verb", phonetic: "/ˈməʊ.tɪ.veɪt/", meaning: "thúc đẩy, động viên", audioUrl: "", exampleEn: "A good teacher motivates students.", exampleVi: "Một giáo viên tốt sẽ truyền động lực cho học sinh." },

  // BÀI 25: Final Review & Exam Practice
  { lesson: 25, word: "review", type: "verb", phonetic: "/rɪˈvjuː/", meaning: "ôn tập, xem lại", audioUrl: "", exampleEn: "We will review everything tomorrow.", exampleVi: "Chúng ta sẽ ôn tập mọi thứ vào ngày mai." },
  { lesson: 25, word: "practice", type: "noun", phonetic: "/ˈpræk.tɪs/", meaning: "sự luyện tập", audioUrl: "", exampleEn: "Practice makes perfect.", exampleVi: "Luyện tập tạo nên sự hoàn hảo." },
  { lesson: 25, word: "prepare", type: "verb", phonetic: "/prɪˈpeər/", meaning: "chuẩn bị", audioUrl: "", exampleEn: "I must prepare for the test.", exampleVi: "Tôi phải chuẩn bị cho bài kiểm tra." },
  { lesson: 25, word: "focus", type: "verb", phonetic: "/ˈfəʊ.kəs/", meaning: "tập trung", audioUrl: "", exampleEn: "You need to focus on your studies.", exampleVi: "Bạn cần tập trung vào việc học." },
  { lesson: 25, word: "concentrate", type: "verb", phonetic: "/ˈkɒn.sən.treɪt/", meaning: "tập trung cao độ", audioUrl: "", exampleEn: "I can't concentrate with all this noise.", exampleVi: "Tôi không thể tập trung với ngần này tiếng ồn." },
  { lesson: 25, word: "memory", type: "noun", phonetic: "/ˈmem.ər.i/", meaning: "trí nhớ", audioUrl: "", exampleEn: "She has an excellent memory.", exampleVi: "Cô ấy có một trí nhớ tuyệt vời." },
  { lesson: 25, word: "remember", type: "verb", phonetic: "/rɪˈmem.bər/", meaning: "nhớ", audioUrl: "", exampleEn: "Do you remember his name?", exampleVi: "Bạn có nhớ tên anh ấy không?" },
  { lesson: 25, word: "forget", type: "verb", phonetic: "/fəˈɡet/", meaning: "quên", audioUrl: "", exampleEn: "Don't forget to lock the door.", exampleVi: "Đừng quên khóa cửa nhé." },
  { lesson: 25, word: "remind", type: "verb", phonetic: "/rɪˈmaɪnd/", meaning: "nhắc nhở", audioUrl: "", exampleEn: "Please remind me to call her.", exampleVi: "Xin hãy nhắc tôi gọi cho cô ấy." },
  { lesson: 25, word: "mistake", type: "noun", phonetic: "/mɪˈsteɪk/", meaning: "lỗi sai", audioUrl: "", exampleEn: "I made a spelling mistake.", exampleVi: "Tôi đã phạm một lỗi chính tả." },
  { lesson: 25, word: "correct", type: "adjective", phonetic: "/kəˈrekt/", meaning: "chính xác", audioUrl: "", exampleEn: "That is the correct answer.", exampleVi: "Đó là câu trả lời chính xác." },
  { lesson: 25, word: "incorrect", type: "adjective", phonetic: "/ˌɪn.kərˈekt/", meaning: "không chính xác", audioUrl: "", exampleEn: "Your guess was incorrect.", exampleVi: "Đoán của bạn là không chính xác." },
  { lesson: 25, word: "check", type: "verb", phonetic: "/tʃek/", meaning: "kiểm tra", audioUrl: "", exampleEn: "Always check your work.", exampleVi: "Luôn luôn kiểm tra lại bài làm của bạn." },
  { lesson: 25, word: "improve", type: "verb", phonetic: "/ɪmˈpruːv/", meaning: "cải thiện", audioUrl: "", exampleEn: "Your reading skills have improved.", exampleVi: "Kỹ năng đọc của bạn đã được cải thiện." },
  { lesson: 25, word: "progress", type: "noun", phonetic: "/ˈprəʊ.ɡres/", meaning: "sự tiến bộ", audioUrl: "", exampleEn: "She is making good progress.", exampleVi: "Cô ấy đang có tiến bộ tốt." },
  { lesson: 25, word: "test", type: "noun", phonetic: "/test/", meaning: "bài kiểm tra", audioUrl: "", exampleEn: "We have a math test on Friday.", exampleVi: "Chúng tôi có một bài kiểm tra toán vào thứ Sáu." },
  { lesson: 25, word: "score", type: "noun", phonetic: "/skɔːr/", meaning: "điểm số", audioUrl: "", exampleEn: "He got a high score on the test.", exampleVi: "Cậu ấy đạt điểm cao trong bài kiểm tra." },
  { lesson: 25, word: "result", type: "noun", phonetic: "/rɪˈzʌlt/", meaning: "kết quả", audioUrl: "", exampleEn: "I am waiting for my exam results.", exampleVi: "Tôi đang đợi kết quả thi của mình." },
  { lesson: 25, word: "certificate", type: "noun", phonetic: "/səˈtɪf.ɪ.kət/", meaning: "chứng chỉ", audioUrl: "", exampleEn: "You will receive a certificate at the end.", exampleVi: "Bạn sẽ nhận được một chứng chỉ khi kết thúc." },
  { lesson: 25, word: "celebrate", type: "verb", phonetic: "/ˈsel.ə.breɪt/", meaning: "ăn mừng", audioUrl: "", exampleEn: "Let's celebrate your graduation!", exampleVi: "Hãy cùng ăn mừng lễ tốt nghiệp của bạn!" }
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

  console.log(`\n🎉 Hoàn thành nạp ${successCount} từ vựng Batch 5 cho PET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

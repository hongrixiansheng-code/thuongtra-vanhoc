/**
 * SEED SCRIPT: YLE KET Dialogue (25 Bài)
 * Chạy từ thư mục gốc: node seed-ket-dialogue.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  // BÀI 1: Daily Life
  {
    lesson: 1,
    title: "A Typical Morning",
    lines: [
      { speaker: "Alex", text: "What time do you usually wake up?", vi: "Cậu thường thức dậy lúc mấy giờ?", audioUrl: "" },
      { speaker: "Ben", text: "I wake up at 6 AM every day.", vi: "Tớ thức dậy lúc 6 giờ sáng mỗi ngày.", audioUrl: "" },
      { speaker: "Alex", text: "Wow, that's early! What do you do then?", vi: "Chà, sớm thế! Rồi cậu làm gì?", audioUrl: "" },
      { speaker: "Ben", text: "I brush my teeth, take a shower, and have breakfast.", vi: "Tớ đánh răng, tắm vòi sen và ăn sáng.", audioUrl: "" },
      { speaker: "Alex", text: "Do you catch the bus to school?", vi: "Cậu có bắt xe buýt đến trường không?", audioUrl: "" },
      { speaker: "Ben", text: "Yes, I leave the house at 7:15 to catch the bus.", vi: "Có, tớ rời khỏi nhà lúc 7:15 để bắt xe buýt.", audioUrl: "" }
    ]
  },
  // BÀI 2: People and Family
  {
    lesson: 2,
    title: "Family Members",
    lines: [
      { speaker: "Sarah", text: "Is that a photo of your family?", vi: "Đó là bức ảnh gia đình cậu phải không?", audioUrl: "" },
      { speaker: "John", text: "Yes, these are my parents and my grandparents.", vi: "Đúng vậy, đây là bố mẹ và ông bà của tớ.", audioUrl: "" },
      { speaker: "Sarah", text: "Who is the young boy next to your father?", vi: "Cậu bé nhỏ tuổi đứng cạnh bố cậu là ai thế?", audioUrl: "" },
      { speaker: "John", text: "That is my cousin, Tom. He is my uncle's son.", vi: "Đó là anh họ tớ, Tom. Anh ấy là con trai của chú tớ.", audioUrl: "" },
      { speaker: "Sarah", text: "You have a very big family!", vi: "Cậu có một gia đình thật lớn!", audioUrl: "" },
      { speaker: "John", text: "Yes, we often meet and have dinner together.", vi: "Đúng vậy, chúng tớ thường gặp nhau và ăn tối cùng nhau.", audioUrl: "" }
    ]
  },
  // BÀI 3: Hobbies and Leisure
  {
    lesson: 3,
    title: "Free Time",
    lines: [
      { speaker: "Lily", text: "What do you like doing in your leisure time?", vi: "Cậu thích làm gì vào thời gian rảnh rỗi?", audioUrl: "" },
      { speaker: "Mike", text: "I love playing the guitar and singing.", vi: "Tớ thích chơi đàn ghi-ta và ca hát.", audioUrl: "" },
      { speaker: "Lily", text: "That's cool! Do you play in a band?", vi: "Tuyệt quá! Cậu có chơi trong ban nhạc nào không?", audioUrl: "" },
      { speaker: "Mike", text: "No, I just play for fun. How about you?", vi: "Không, tớ chỉ chơi cho vui thôi. Còn cậu thì sao?", audioUrl: "" },
      { speaker: "Lily", text: "I enjoy reading comic books and drawing.", vi: "Tớ thích đọc truyện tranh và vẽ.", audioUrl: "" }
    ]
  },
  // BÀI 4: Places and Buildings
  {
    lesson: 4,
    title: "Finding the Museum",
    lines: [
      { speaker: "Tourist", text: "Excuse me, where is the history museum?", vi: "Xin lỗi, bảo tàng lịch sử ở đâu vậy?", audioUrl: "" },
      { speaker: "Local", text: "It is on Main Street, next to the library.", vi: "Nó nằm trên phố Main, cạnh thư viện.", audioUrl: "" },
      { speaker: "Tourist", text: "Is it far from here?", vi: "Nó có xa đây không?", audioUrl: "" },
      { speaker: "Local", text: "No, it takes about ten minutes to walk there.", vi: "Không, chỉ mất khoảng mười phút đi bộ tới đó.", audioUrl: "" },
      { speaker: "Tourist", text: "Thank you very much!", vi: "Cảm ơn bạn rất nhiều!", audioUrl: "" }
    ]
  },
  // BÀI 5: Transport and Travel
  {
    lesson: 5,
    title: "At the Station",
    lines: [
      { speaker: "Clerk", text: "Can I help you?", vi: "Tôi có thể giúp gì cho quý khách?", audioUrl: "" },
      { speaker: "Passenger", text: "I would like a train ticket to London, please.", vi: "Làm ơn cho tôi một vé tàu đi London.", audioUrl: "" },
      { speaker: "Clerk", text: "Single or return?", vi: "Vé một chiều hay khứ hồi ạ?", audioUrl: "" },
      { speaker: "Passenger", text: "Return, please. What time does the train leave?", vi: "Vé khứ hồi. Mấy giờ chuyến tàu khởi hành?", audioUrl: "" },
      { speaker: "Clerk", text: "It leaves at 10 AM. Platform 3.", vi: "Tàu rời đi lúc 10 giờ sáng. Ở sân ga số 3.", audioUrl: "" }
    ]
  },
  // BÀI 6: Food and Drink
  {
    lesson: 6,
    title: "Ordering Food",
    lines: [
      { speaker: "Waiter", text: "Are you ready to order?", vi: "Quý khách đã sẵn sàng gọi món chưa?", audioUrl: "" },
      { speaker: "Customer", text: "Yes, I'll have the roast chicken and a salad.", vi: "Rồi, tôi sẽ lấy gà quay và một phần sa lát.", audioUrl: "" },
      { speaker: "Waiter", text: "Would you like anything to drink?", vi: "Quý khách có muốn uống gì không?", audioUrl: "" },
      { speaker: "Customer", text: "Just a glass of water with ice, please.", vi: "Chỉ một ly nước lọc có đá thôi, cảm ơn.", audioUrl: "" },
      { speaker: "Waiter", text: "Certainly. Your food will be ready soon.", vi: "Chắc chắn rồi. Thức ăn của quý khách sẽ sẵn sàng sớm thôi.", audioUrl: "" }
    ]
  },
  // BÀI 7: School and Study
  {
    lesson: 7,
    title: "Favorite Subject",
    lines: [
      { speaker: "Anna", text: "Do we have a math exam tomorrow?", vi: "Ngày mai chúng ta có bài kiểm tra toán đúng không?", audioUrl: "" },
      { speaker: "David", text: "Yes, we do. Have you studied for it?", vi: "Đúng vậy. Cậu đã học bài cho nó chưa?", audioUrl: "" },
      { speaker: "Anna", text: "Yes, but math is very difficult for me.", vi: "Rồi, nhưng môn toán rất khó đối với tớ.", audioUrl: "" },
      { speaker: "David", text: "Science is my favorite subject. I can help you with math if you want.", vi: "Khoa học là môn yêu thích của tớ. Tớ có thể giúp cậu học toán nếu cậu muốn.", audioUrl: "" },
      { speaker: "Anna", text: "That would be great! Thank you, David.", vi: "Tuyệt quá! Cảm ơn cậu, David.", audioUrl: "" }
    ]
  },
  // BÀI 8: Work and Jobs
  {
    lesson: 8,
    title: "Future Jobs",
    lines: [
      { speaker: "Emma", text: "What do you want to be when you grow up?", vi: "Cậu muốn làm nghề gì khi lớn lên?", audioUrl: "" },
      { speaker: "Ryan", text: "I want to be an engineer. I like building things.", vi: "Tớ muốn trở thành kỹ sư. Tớ thích chế tạo mọi thứ.", audioUrl: "" },
      { speaker: "Emma", text: "My aunt is a dentist. I want to be a doctor.", vi: "Dì tớ là một nha sĩ. Tớ thì muốn trở thành bác sĩ.", audioUrl: "" },
      { speaker: "Ryan", text: "That's a very important job. You have to study hard.", vi: "Đó là một công việc rất quan trọng. Cậu phải học tập chăm chỉ.", audioUrl: "" }
    ]
  },
  // BÀI 9: Health and Medicine
  {
    lesson: 9,
    title: "Feeling Sick",
    lines: [
      { speaker: "Doctor", text: "What seems to be the problem?", vi: "Cháu có vấn đề gì vậy?", audioUrl: "" },
      { speaker: "Patient", text: "I have a terrible headache and a fever.", vi: "Cháu bị đau đầu khủng khiếp và bị sốt.", audioUrl: "" },
      { speaker: "Doctor", text: "Let me check your temperature. You have a cold.", vi: "Để bác sĩ kiểm tra nhiệt độ nào. Cháu bị cảm lạnh rồi.", audioUrl: "" },
      { speaker: "Patient", text: "Should I take some medicine?", vi: "Cháu có nên uống thuốc không ạ?", audioUrl: "" },
      { speaker: "Doctor", text: "Yes, take these pills twice a day and get some rest.", vi: "Có, hãy uống những viên thuốc này hai lần một ngày và nghỉ ngơi nhé.", audioUrl: "" }
    ]
  },
  // BÀI 10: Sports
  {
    lesson: 10,
    title: "The Football Match",
    lines: [
      { speaker: "Kevin", text: "Did you watch the football match last night?", vi: "Cậu có xem trận đấu bóng đá tối qua không?", audioUrl: "" },
      { speaker: "Leo", text: "Yes, I did. Our team played really well.", vi: "Tớ có xem. Đội của chúng ta đã chơi rất hay.", audioUrl: "" },
      { speaker: "Kevin", text: "What was the final score?", vi: "Tỉ số chung cuộc là bao nhiêu?", audioUrl: "" },
      { speaker: "Leo", text: "We won two to nothing. The striker scored a fantastic goal.", vi: "Chúng ta thắng 2-0. Tiền đạo đã ghi một bàn thắng tuyệt vời.", audioUrl: "" },
      { speaker: "Kevin", text: "Awesome! We are the champions.", vi: "Quá đỉnh! Chúng ta là những nhà vô địch.", audioUrl: "" }
    ]
  },
  // BÀI 11: The Natural World
  {
    lesson: 11,
    title: "A Walk in the Forest",
    lines: [
      { speaker: "Guide", text: "Welcome to the national forest. Please don't pick the flowers.", vi: "Chào mừng đến với khu rừng quốc gia. Xin vui lòng không hái hoa.", audioUrl: "" },
      { speaker: "Tourist", text: "Are there any dangerous animals here?", vi: "Ở đây có loài động vật nguy hiểm nào không?", audioUrl: "" },
      { speaker: "Guide", text: "No, but you might see some beautiful birds and insects.", vi: "Không, nhưng bạn có thể sẽ thấy vài loài chim và côn trùng đẹp.", audioUrl: "" },
      { speaker: "Tourist", text: "Look! There is a little bird on that tree.", vi: "Nhìn kìa! Có một chú chim nhỏ trên cái cây đó.", audioUrl: "" }
    ]
  },
  // BÀI 12: Weather and Climate
  {
    lesson: 12,
    title: "A Rainy Day",
    lines: [
      { speaker: "Mom", text: "Put on your warm coat. It's very cold outside.", vi: "Mặc áo khoác ấm vào con. Ngoài trời đang rất lạnh.", audioUrl: "" },
      { speaker: "Son", text: "Is it going to snow today?", vi: "Hôm nay trời có tuyết không mẹ?", audioUrl: "" },
      { speaker: "Mom", text: "No, but it is going to be a rainy day.", vi: "Không, nhưng hôm nay sẽ là một ngày mưa.", audioUrl: "" },
      { speaker: "Son", text: "Then I will bring my umbrella.", vi: "Vậy thì con sẽ mang theo ô.", audioUrl: "" },
      { speaker: "Mom", text: "Good idea. Be careful on the wet roads.", vi: "Ý kiến hay. Hãy cẩn thận trên những con đường trơn ướt nhé.", audioUrl: "" }
    ]
  },
  // BÀI 13: Clothes and Fashion
  {
    lesson: 13,
    title: "Shopping for Clothes",
    lines: [
      { speaker: "Assistant", text: "Can I help you find something?", vi: "Tôi có thể giúp bạn tìm món đồ nào không?", audioUrl: "" },
      { speaker: "Customer", text: "Yes, I am looking for a winter jacket.", vi: "Vâng, tôi đang tìm kiếm một chiếc áo khoác mùa đông.", audioUrl: "" },
      { speaker: "Assistant", text: "We have some nice jackets over here. What size are you?", vi: "Chúng tôi có vài chiếc áo khoác đẹp ở đây. Bạn mặc size mấy?", audioUrl: "" },
      { speaker: "Customer", text: "I wear a medium. Can I try this blue one on?", vi: "Tôi mặc size M. Tôi có thể thử chiếc màu xanh này không?", audioUrl: "" },
      { speaker: "Assistant", text: "Of course. The fitting room is on your right.", vi: "Tất nhiên rồi. Phòng thử đồ ở bên phải bạn.", audioUrl: "" }
    ]
  },
  // BÀI 14: Entertainment and Media
  {
    lesson: 14,
    title: "Going to the Cinema",
    lines: [
      { speaker: "Chris", text: "Would you like to go to the cinema tonight?", vi: "Tối nay cậu có muốn đi xem phim không?", audioUrl: "" },
      { speaker: "Tony", text: "Sure! What movie is playing?", vi: "Chắc chắn rồi! Đang chiếu bộ phim nào vậy?", audioUrl: "" },
      { speaker: "Chris", text: "There is a new action film. My favorite actor is in it.", vi: "Có một bộ phim hành động mới. Nam diễn viên yêu thích của tớ đóng trong đó.", audioUrl: "" },
      { speaker: "Tony", text: "Great. Let's meet at the theatre at 7 PM.", vi: "Tuyệt. Hãy gặp nhau ở rạp hát lúc 7 giờ tối nhé.", audioUrl: "" }
    ]
  },
  // BÀI 15: Technology and Internet
  {
    lesson: 15,
    title: "Computer Problems",
    lines: [
      { speaker: "Alice", text: "Can you help me? My laptop is not working.", vi: "Bạn có thể giúp mình không? Laptop của mình không hoạt động.", audioUrl: "" },
      { speaker: "Bob", text: "Let me see. Did you connect to the internet?", vi: "Để mình xem nào. Bạn đã kết nối với internet chưa?", audioUrl: "" },
      { speaker: "Alice", text: "Yes, but I cannot download this file.", vi: "Rồi, nhưng mình không thể tải tập tin này xuống.", audioUrl: "" },
      { speaker: "Bob", text: "Oh, you need to type your password first. Click here.", vi: "Ồ, bạn cần phải nhập mật khẩu trước. Nhấp chuột vào đây.", audioUrl: "" },
      { speaker: "Alice", text: "It works now. Thank you, Bob!", vi: "Nó hoạt động rồi. Cảm ơn bạn, Bob!", audioUrl: "" }
    ]
  },
  // BÀI 16: Shopping and Money
  {
    lesson: 16,
    title: "Paying for Groceries",
    lines: [
      { speaker: "Cashier", text: "That will be 15 pounds, please.", vi: "Của bạn hết 15 bảng Anh nhé.", audioUrl: "" },
      { speaker: "Customer", text: "Can I pay by credit card?", vi: "Tôi có thể thanh toán bằng thẻ tín dụng không?", audioUrl: "" },
      { speaker: "Cashier", text: "I'm sorry, our machine is broken. Cash only today.", vi: "Tôi xin lỗi, máy của chúng tôi bị hỏng rồi. Hôm nay chỉ nhận tiền mặt.", audioUrl: "" },
      { speaker: "Customer", text: "No problem. Here is a 20-pound note.", vi: "Không vấn đề gì. Đây là tờ 20 bảng.", audioUrl: "" },
      { speaker: "Cashier", text: "Here is your change and your receipt. Have a nice day!", vi: "Đây là tiền thừa và biên lai của bạn. Chúc một ngày tốt lành!", audioUrl: "" }
    ]
  },
  // BÀI 17: House and Home
  {
    lesson: 17,
    title: "A New Apartment",
    lines: [
      { speaker: "Mary", text: "I moved to a new apartment yesterday.", vi: "Tớ đã chuyển đến một căn hộ mới vào ngày hôm qua.", audioUrl: "" },
      { speaker: "Jane", text: "That's exciting! Is it big?", vi: "Thật thú vị! Nó có lớn không?", audioUrl: "" },
      { speaker: "Mary", text: "Yes, it has two bedrooms and a large living room.", vi: "Có, nó có hai phòng ngủ và một phòng khách lớn.", audioUrl: "" },
      { speaker: "Jane", text: "Have you bought any furniture yet?", vi: "Cậu đã mua đồ nội thất nào chưa?", audioUrl: "" },
      { speaker: "Mary", text: "I bought a new sofa and a lamp for the living room.", vi: "Tớ đã mua một chiếc sô-pha mới và một cái đèn cho phòng khách.", audioUrl: "" }
    ]
  },
  // BÀI 18: Feelings and Opinions
  {
    lesson: 18,
    title: "Sharing Opinions",
    lines: [
      { speaker: "Peter", text: "What do you think about the new restaurant?", vi: "Cậu nghĩ sao về nhà hàng mới?", audioUrl: "" },
      { speaker: "Sam", text: "I think the food is good, but it is too expensive.", vi: "Tớ nghĩ thức ăn thì ngon, nhưng mà đắt quá.", audioUrl: "" },
      { speaker: "Peter", text: "I agree with you. I was a bit surprised by the price.", vi: "Tớ đồng ý với cậu. Tớ đã hơi ngạc nhiên về giá cả.", audioUrl: "" },
      { speaker: "Sam", text: "Yes, we shouldn't go there very often.", vi: "Đúng vậy, chúng ta không nên đến đó thường xuyên.", audioUrl: "" }
    ]
  },
  // BÀI 19: Language and Communication
  {
    lesson: 19,
    title: "Learning English",
    lines: [
      { speaker: "Student", text: "Excuse me, how do you spell this word?", vi: "Xin lỗi, thầy đánh vần từ này như thế nào ạ?", audioUrl: "" },
      { speaker: "Teacher", text: "It is spelled P-R-A-C-T-I-C-E.", vi: "Nó được đánh vần là P-R-A-C-T-I-C-E.", audioUrl: "" },
      { speaker: "Student", text: "Thank you. I want to speak English fluently.", vi: "Cảm ơn thầy. Em muốn nói tiếng Anh trôi chảy.", audioUrl: "" },
      { speaker: "Teacher", text: "You must listen to conversations and practice every day.", vi: "Em phải nghe các đoạn hội thoại và luyện tập mỗi ngày.", audioUrl: "" },
      { speaker: "Student", text: "I understand. I will try my best.", vi: "Em hiểu rồi. Em sẽ cố gắng hết sức.", audioUrl: "" }
    ]
  },
  // BÀI 20: Travel and Holidays
  {
    lesson: 20,
    title: "Planning a Trip",
    lines: [
      { speaker: "Lucy", text: "Where are you going for your summer holiday?", vi: "Cậu định đi đâu vào kỳ nghỉ hè?", audioUrl: "" },
      { speaker: "Tom", text: "I am traveling to France. I have already booked my flight.", vi: "Tớ sẽ đi du lịch Pháp. Tớ đã đặt vé máy bay rồi.", audioUrl: "" },
      { speaker: "Lucy", text: "That sounds amazing! Have you packed your suitcase?", vi: "Nghe tuyệt quá! Cậu đã đóng gói va-li chưa?", audioUrl: "" },
      { speaker: "Tom", text: "Not yet. I need to get my passport ready first.", vi: "Vẫn chưa. Tớ cần chuẩn bị sẵn sàng hộ chiếu trước đã.", audioUrl: "" }
    ]
  },
  // BÀI 21: Culture and Festivals
  {
    lesson: 21,
    title: "The New Year Festival",
    lines: [
      { speaker: "Ken", text: "How do you celebrate the New Year in your country?", vi: "Các cậu ăn mừng Năm Mới ở đất nước của mình như thế nào?", audioUrl: "" },
      { speaker: "Mai", text: "We have a big family meal and watch fireworks at midnight.", vi: "Chúng tớ có một bữa ăn gia đình lớn và xem pháo hoa vào lúc nửa đêm.", audioUrl: "" },
      { speaker: "Ken", text: "Do you wear traditional costumes?", vi: "Các cậu có mặc trang phục truyền thống không?", audioUrl: "" },
      { speaker: "Mai", text: "Yes, many people wear beautiful costumes to the parade.", vi: "Có, nhiều người mặc những bộ trang phục đẹp đến xem diễu hành.", audioUrl: "" }
    ]
  },
  // BÀI 22: Future Plans
  {
    lesson: 22,
    title: "Going to University",
    lines: [
      { speaker: "Dad", text: "What are your plans after high school?", vi: "Kế hoạch của con sau khi tốt nghiệp trung học là gì?", audioUrl: "" },
      { speaker: "Son", text: "I am going to study medicine at university.", vi: "Con dự định sẽ học ngành y tại đại học.", audioUrl: "" },
      { speaker: "Dad", text: "That is a great goal. You have to study very hard.", vi: "Đó là một mục tiêu tuyệt vời. Con phải học thật chăm chỉ.", audioUrl: "" },
      { speaker: "Son", text: "I know. I promise I will do my best to succeed.", vi: "Con biết. Con hứa sẽ làm hết sức mình để thành công.", audioUrl: "" }
    ]
  },
  // BÀI 23: Experiences
  {
    lesson: 23,
    title: "A Great Adventure",
    lines: [
      { speaker: "Nick", text: "Have you ever climbed a mountain?", vi: "Cậu đã từng leo núi bao giờ chưa?", audioUrl: "" },
      { speaker: "Jane", text: "Yes, I climbed a big mountain last summer. It was a great adventure.", vi: "Rồi, tớ đã leo một ngọn núi lớn vào mùa hè năm ngoái. Đó là một chuyến phiêu lưu tuyệt vời.", audioUrl: "" },
      { speaker: "Nick", text: "Were you scared?", vi: "Cậu có sợ không?", audioUrl: "" },
      { speaker: "Jane", text: "A little bit, but the view from the top was beautiful.", vi: "Một chút, nhưng quang cảnh nhìn từ trên đỉnh thì rất đẹp.", audioUrl: "" }
    ]
  },
  // BÀI 24: Personal Information
  {
    lesson: 24,
    title: "Filling out a Form",
    lines: [
      { speaker: "Clerk", text: "Please fill in this form to join the club.", vi: "Vui lòng điền vào biểu mẫu này để tham gia câu lạc bộ.", audioUrl: "" },
      { speaker: "Applicant", text: "Okay. Do I need to write my full name and address?", vi: "Vâng. Tôi có cần viết đầy đủ họ tên và địa chỉ không?", audioUrl: "" },
      { speaker: "Clerk", text: "Yes. Also, we need your telephone number and email.", vi: "Có. Ngoài ra, chúng tôi cần số điện thoại và email của bạn.", audioUrl: "" },
      { speaker: "Applicant", text: "Done. Where should I put my signature?", vi: "Xong rồi. Tôi nên ký tên ở đâu?", audioUrl: "" },
      { speaker: "Clerk", text: "Sign at the bottom right corner, please.", vi: "Làm ơn ký tên ở góc dưới cùng bên phải.", audioUrl: "" }
    ]
  },
  // BÀI 25: Final Review - KET
  {
    lesson: 25,
    title: "Reviewing for the Exam",
    lines: [
      { speaker: "Student A", text: "We have an important exam tomorrow, don't we?", vi: "Ngày mai chúng ta có một bài kiểm tra quan trọng, phải không?", audioUrl: "" },
      { speaker: "Student B", text: "Yes, we do. I am a little worried about the grammar section.", vi: "Đúng vậy. Tớ hơi lo lắng về phần ngữ pháp.", audioUrl: "" },
      { speaker: "Student A", text: "Don't worry. We have practiced a lot. We will succeed.", vi: "Đừng lo lắng. Chúng ta đã luyện tập rất nhiều. Chúng ta sẽ làm tốt thôi.", audioUrl: "" },
      { speaker: "Student B", text: "You are right. Let's read the vocabulary list one more time.", vi: "Cậu nói đúng. Hãy đọc lại danh sách từ vựng một lần nữa nhé.", audioUrl: "" }
    ]
  }
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
  let successCount = 0;

  for (const item of DIALOGUE_DATA) {
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!targetLesson) continue;

    const contentJson = JSON.stringify({
      title: item.title,
      lines: item.lines
    });

    const existingContent = await prisma.lessonContent.findFirst({
      where: {
        lessonId: targetLesson.id,
        contentType: 'DIALOGUE'
      }
    });

    if (existingContent) {
      await prisma.lessonContent.update({
        where: { id: existingContent.id },
        data: { content: contentJson }
      });
      console.log(`🔄 Đã cập nhật hội thoại (Bài ${item.lesson})`);
    } else {
      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'DIALOGUE',
          content: contentJson
        }
      });
      successCount++;
      console.log(`✅ Đã tạo mới hội thoại (Bài ${item.lesson})`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp ${successCount} đoạn hội thoại KET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

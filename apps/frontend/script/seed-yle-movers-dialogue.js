/**
 * SEED SCRIPT: YLE Movers Dialogue (25 Bài)
 * Chạy từ thư mục gốc: node seed-yle-movers-dialogue.js
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  {
    lesson: 1, title: "Meet My Family", lines: [
      {speaker: "Tom", en: "Look at this photo. This is my family.", vi: "Hãy nhìn bức ảnh này. Đây là gia đình của tớ."},
      {speaker: "Anna", en: "Who is the boy who is wearing a red shirt?", vi: "Cậu bé người mà đang mặc áo đỏ là ai vậy?"},
      {speaker: "Tom", en: "That is my younger brother. His name is Ben.", vi: "Đó là em trai tớ. Tên em ấy là Ben."},
      {speaker: "Anna", en: "And who is the woman who is holding a baby?", vi: "Còn người phụ nữ người mà đang bế em bé là ai?"},
      {speaker: "Tom", en: "She is my aunt. She is very kind.", vi: "Đó là dì của tớ. Dì ấy rất tốt bụng."}
    ]
  },
  {
    lesson: 2, title: "A Funny Monster", lines: [
      {speaker: "Alex", en: "I am drawing a funny monster.", vi: "Tớ đang vẽ một con quái vật ngộ nghĩnh."},
      {speaker: "Mia", en: "Wow! It has a big round green head.", vi: "Chà! Nó có một cái đầu to tròn màu xanh lá."},
      {speaker: "Alex", en: "Yes, and it has long straight purple hair.", vi: "Đúng vậy, và nó có mái tóc dài thẳng màu tím."},
      {speaker: "Mia", en: "How many eyes has it got?", vi: "Nó có bao nhiêu con mắt vậy?"},
      {speaker: "Alex", en: "It has got three small red eyes.", vi: "Nó có ba con mắt nhỏ màu đỏ."}
    ]
  },
  {
    lesson: 3, title: "At the Doctor's", lines: [
      {speaker: "Doctor", en: "Hello, Peter. What's the matter with you?", vi: "Chào Peter. Cháu bị sao vậy?"},
      {speaker: "Peter", en: "I feel very tired. I have a headache.", vi: "Cháu cảm thấy rất mệt. Cháu bị đau đầu."},
      {speaker: "Doctor", en: "Let me check. Oh, you have a fever too.", vi: "Để bác kiểm tra. Ồ, cháu cũng bị sốt nữa."},
      {speaker: "Peter", en: "Can I go to school tomorrow?", vi: "Ngày mai cháu có thể đi học không ạ?"},
      {speaker: "Doctor", en: "No, you must stay in bed and take this medicine.", vi: "Không, cháu phải ở trên giường và uống thuốc này."}
    ]
  },
  {
    lesson: 4, title: "At the Zoo", lines: [
      {speaker: "Lily", en: "Look at the animals! A lion is bigger than a monkey.", vi: "Hãy nhìn các con vật kìa! Sư tử thì to hơn khỉ."},
      {speaker: "Jack", en: "Yes, but elephants are bigger than lions.", vi: "Đúng vậy, nhưng voi thì to hơn sư tử."},
      {speaker: "Lily", en: "I think giraffes are taller than elephants.", vi: "Tớ nghĩ hươu cao cổ thì cao hơn voi."},
      {speaker: "Jack", en: "Right! And dolphins are more intelligent than sharks.", vi: "Đúng thế! Và cá heo thì thông minh hơn cá mập."},
      {speaker: "Lily", en: "I love animals so much.", vi: "Tớ rất yêu động vật."}
    ]
  },
  {
    lesson: 5, title: "On the Farm", lines: [
      {speaker: "Farmer", en: "Welcome to my farm. This is the biggest cow here.", vi: "Chào mừng đến với nông trại của chú. Đây là con bò to nhất ở đây."},
      {speaker: "Boy", en: "Wow! And what is the smallest animal?", vi: "Chà! Và con vật nhỏ nhất là con gì ạ?"},
      {speaker: "Farmer", en: "The mouse is the smallest animal on the farm.", vi: "Con chuột là con vật nhỏ nhất trong trang trại."},
      {speaker: "Boy", en: "Which animal is the fastest?", vi: "Con vật nào là con nhanh nhất ạ?"},
      {speaker: "Farmer", en: "The horse over there is the fastest.", vi: "Con ngựa đằng kia là con nhanh nhất đấy."}
    ]
  },
  {
    lesson: 6, title: "Let's Make a Pizza", lines: [
      {speaker: "Mom", en: "Let's make a pizza for dinner.", vi: "Chúng ta hãy làm một chiếc bánh pizza cho bữa tối nhé."},
      {speaker: "Son", en: "Great! We need some cheese and some tomatoes.", vi: "Tuyệt quá! Chúng ta cần một chút phô mai và một vài quả cà chua."},
      {speaker: "Mom", en: "Do we have any onions?", vi: "Chúng ta có củ hành tây nào không?"},
      {speaker: "Son", en: "No, we don't have any onions. But we have some mushrooms.", vi: "Không, chúng ta không có củ hành nào. Nhưng chúng ta có nấm."},
      {speaker: "Mom", en: "Perfect! Let's start cooking.", vi: "Hoàn hảo! Bắt đầu nấu thôi."}
    ]
  },
  {
    lesson: 7, title: "In a Café", lines: [
      {speaker: "Waiter", en: "Good morning! What would you like to eat?", vi: "Chào buổi sáng! Quý khách muốn ăn gì ạ?"},
      {speaker: "Customer", en: "I would like a sandwich and some fries, please.", vi: "Cho tôi một chiếc bánh mì kẹp và một ít khoai tây chiên."},
      {speaker: "Waiter", en: "Would you like something to drink?", vi: "Quý khách có muốn uống gì không?"},
      {speaker: "Customer", en: "Yes, I'd like a cup of coffee.", vi: "Vâng, cho tôi một tách cà phê."},
      {speaker: "Waiter", en: "Here you are. Enjoy your meal!", vi: "Của quý khách đây. Chúc ngon miệng!"}
    ]
  },
  {
    lesson: 8, title: "Whose coat is this?", lines: [
      {speaker: "Teacher", en: "Look at this red coat. Is it yours, Mary?", vi: "Nhìn chiếc áo khoác đỏ này xem. Nó là của em phải không Mary?"},
      {speaker: "Mary", en: "No, it isn't mine. My coat is blue.", vi: "Không, nó không phải của em. Áo của em màu xanh."},
      {speaker: "Teacher", en: "Is it his coat?", vi: "Nó là áo của cậu bé kia phải không?"},
      {speaker: "Mary", en: "Yes, I think it is his. He likes red.", vi: "Vâng, em nghĩ nó là của bạn ấy. Bạn ấy thích màu đỏ."},
      {speaker: "Teacher", en: "Please give it to him.", vi: "Làm ơn hãy đưa nó cho bạn ấy nhé."}
    ]
  },
  {
    lesson: 9, title: "Where are my keys?", lines: [
      {speaker: "Dad", en: "Where are my keys? I can't find them.", vi: "Chìa khóa của bố đâu rồi? Bố không tìm thấy chúng."},
      {speaker: "Daughter", en: "Are they on the table?", vi: "Chúng có ở trên bàn không ạ?"},
      {speaker: "Dad", en: "No, they aren't. They are not below the sofa either.", vi: "Không có. Chúng cũng không nằm dưới ghế sofa."},
      {speaker: "Daughter", en: "Look! They are on the shelf, opposite the window.", vi: "Nhìn kìa! Chúng ở trên giá sách, đối diện cửa sổ."},
      {speaker: "Dad", en: "Ah, thank you! You are very helpful.", vi: "À, cảm ơn con! Con thật hữu ích."}
    ]
  },
  {
    lesson: 10, title: "What is it made of?", lines: [
      {speaker: "Boy", en: "Look at this beautiful window.", vi: "Nhìn chiếc cửa sổ đẹp này xem."},
      {speaker: "Girl", en: "What is it made of?", vi: "Nó được làm bằng gì vậy?"},
      {speaker: "Boy", en: "It is made of glass. And look at that big table.", vi: "Nó được làm bằng thủy tinh. Và nhìn cái bàn lớn kia kìa."},
      {speaker: "Girl", en: "Is it made of plastic?", vi: "Nó được làm bằng nhựa phải không?"},
      {speaker: "Boy", en: "No, it isn't. It is made of wood.", vi: "Không phải. Nó được làm bằng gỗ."}
    ]
  },
  {
    lesson: 11, title: "At the Library", lines: [
      {speaker: "Librarian", en: "Welcome to the library. Remember the rules.", vi: "Chào mừng đến với thư viện. Hãy nhớ các quy định nhé."},
      {speaker: "Boy", en: "What are the rules?", vi: "Các quy định là gì ạ?"},
      {speaker: "Librarian", en: "You must be quiet. You mustn't run.", vi: "Cháu phải giữ yên lặng. Cháu không được chạy."},
      {speaker: "Boy", en: "Can I eat my sandwich here?", vi: "Cháu có thể ăn bánh mì ở đây không ạ?"},
      {speaker: "Librarian", en: "No, you mustn't eat in the library.", vi: "Không, cháu không được ăn trong thư viện."}
    ]
  },
  {
    lesson: 12, title: "Finding the Bank", lines: [
      {speaker: "Tourist", en: "Excuse me, where is the bank?", vi: "Xin lỗi, ngân hàng ở đâu vậy?"},
      {speaker: "Police", en: "Go straight on this street.", vi: "Hãy đi thẳng trên con đường này."},
      {speaker: "Tourist", en: "And then?", vi: "Và sau đó thì sao?"},
      {speaker: "Police", en: "Turn left at the corner. The bank is on your right.", vi: "Rẽ trái ở góc đường. Ngân hàng sẽ nằm ở bên tay phải của bạn."},
      {speaker: "Tourist", en: "Thank you very much!", vi: "Cảm ơn rất nhiều!"}
    ]
  },
  {
    lesson: 13, title: "How do you go to school?", lines: [
      {speaker: "Sam", en: "How do you go to school, Lucy?", vi: "Cậu đi đến trường bằng gì thế, Lucy?"},
      {speaker: "Lucy", en: "I go to school by bus. What about you?", vi: "Tớ đi đến trường bằng xe buýt. Còn cậu thì sao?"},
      {speaker: "Sam", en: "I live near the school, so I go on foot.", vi: "Tớ sống gần trường nên tớ đi bộ."},
      {speaker: "Lucy", en: "Does your dad go to work by car?", vi: "Bố cậu có đi làm bằng ô tô không?"},
      {speaker: "Sam", en: "No, he travels to work by train.", vi: "Không, ông ấy đi làm bằng tàu hỏa."}
    ]
  },
  {
    lesson: 14, title: "My Weekend", lines: [
      {speaker: "Girl", en: "What do you usually do at the weekend?", vi: "Bạn thường làm gì vào cuối tuần?"},
      {speaker: "Boy", en: "I play football on Saturday.", vi: "Mình chơi bóng đá vào thứ Bảy."},
      {speaker: "Girl", en: "What time do you play?", vi: "Bạn chơi lúc mấy giờ?"},
      {speaker: "Boy", en: "I play at 9 o'clock in the morning.", vi: "Mình chơi lúc 9 giờ sáng."},
      {speaker: "Girl", en: "That's great! I usually read books at home.", vi: "Tuyệt quá! Mình thường đọc sách ở nhà."}
    ]
  },
  {
    lesson: 15, title: "A Sunny Day", lines: [
      {speaker: "Mom", en: "Wake up, kids! What's the weather like today?", vi: "Dậy đi các con! Thời tiết hôm nay thế nào?"},
      {speaker: "Kids", en: "Let's look out the window. It's sunny and hot!", vi: "Hãy nhìn ra cửa sổ. Trời nắng và nóng!"},
      {speaker: "Mom", en: "Great! We can go to the park.", vi: "Tuyệt! Chúng ta có thể đi công viên."},
      {speaker: "Kids", en: "But it was rainy yesterday. Is the grass wet?", vi: "Nhưng hôm qua trời mưa. Cỏ có bị ướt không mẹ?"},
      {speaker: "Mom", en: "No, it's dry now. Let's go!", vi: "Không, giờ nó khô rồi. Đi thôi!"}
    ]
  },
  {
    lesson: 16, title: "Where were you?", lines: [
      {speaker: "Teacher", en: "Where were you yesterday, John?", vi: "Hôm qua em đã ở đâu vậy John?"},
      {speaker: "John", en: "I was at the hospital. I was ill.", vi: "Em đã ở bệnh viện. Em bị ốm."},
      {speaker: "Teacher", en: "Oh, I'm sorry. Were your friends at the park?", vi: "Ồ, cô rất tiếc. Có phải các bạn của em đã ở công viên không?"},
      {speaker: "John", en: "No, they weren't. They were at school.", vi: "Không, họ không ở đó. Họ đã ở trường học."},
      {speaker: "Teacher", en: "Okay, please sit down and open your book.", vi: "Được rồi, mời em ngồi xuống và mở sách ra."}
    ]
  },
  {
    lesson: 17, title: "Yesterday's Game", lines: [
      {speaker: "Boy", en: "What did you do yesterday?", vi: "Hôm qua cậu đã làm gì?"},
      {speaker: "Girl", en: "I played football with my friends.", vi: "Tớ đã chơi bóng đá với các bạn."},
      {speaker: "Boy", en: "Did you win the game?", vi: "Đội cậu có thắng không?"},
      {speaker: "Girl", en: "Yes! I kicked the ball and scored a goal.", vi: "Có chứ! Tớ đã đá bóng và ghi một bàn thắng."},
      {speaker: "Boy", en: "Wow, you played really well!", vi: "Chà, cậu chơi thật sự rất giỏi!"}
    ]
  },
  {
    lesson: 18, title: "A Great Movie", lines: [
      {speaker: "Anna", en: "Did you go to the cinema last night?", vi: "Cậu có đi xem phim tối qua không?"},
      {speaker: "Tom", en: "Yes, I went with my sister.", vi: "Có, tớ đi với chị gái tớ."},
      {speaker: "Anna", en: "What did you see?", vi: "Cậu đã xem phim gì?"},
      {speaker: "Tom", en: "We saw a funny movie about a dog. We had a great time.", vi: "Bọn tớ đã xem một bộ phim hài hước về một chú chó. Bọn tớ đã có thời gian rất vui."},
      {speaker: "Anna", en: "I want to see it too!", vi: "Tớ cũng muốn xem nó!"}
    ]
  },
  {
    lesson: 19, title: "Future Plans", lines: [
      {speaker: "Teacher", en: "What are you going to be when you grow up?", vi: "Em dự định làm nghề gì khi lớn lên?"},
      {speaker: "Alice", en: "I am going to be a doctor to help sick people.", vi: "Em dự định sẽ làm bác sĩ để giúp người ốm."},
      {speaker: "Teacher", en: "That is a wonderful job. And you, Mark?", vi: "Đó là một công việc tuyệt vời. Còn em thì sao, Mark?"},
      {speaker: "Mark", en: "I am going to be a pilot. I love airplanes.", vi: "Em dự định sẽ là phi công. Em rất yêu máy bay."},
      {speaker: "Teacher", en: "Study hard and you will do it!", vi: "Hãy học hành chăm chỉ và các em sẽ làm được!"}
    ]
  },
  {
    lesson: 20, title: "The Running Race", lines: [
      {speaker: "Commentator", en: "Welcome to the running race! They are running very fast.", vi: "Chào mừng đến với cuộc thi chạy! Họ đang chạy rất nhanh."},
      {speaker: "Fan", en: "Look! Tom is the first.", vi: "Nhìn kìa! Tom đang ở vị trí thứ nhất."},
      {speaker: "Commentator", en: "Yes, Tom is first. Jerry is second.", vi: "Đúng vậy, Tom đứng thứ nhất. Jerry đứng thứ hai."},
      {speaker: "Fan", en: "Who is the third?", vi: "Ai là người thứ ba vậy?"},
      {speaker: "Commentator", en: "The third is Mike. What a great race!", vi: "Người thứ ba là Mike. Thật là một cuộc đua tuyệt vời!"}
    ]
  },
  {
    lesson: 21, title: "A Trip to the Forest", lines: [
      {speaker: "Dad", en: "Why did you go to the forest yesterday?", vi: "Tại sao hôm qua con lại đi vào rừng vậy?"},
      {speaker: "Son", en: "I went to the forest to see the animals.", vi: "Con đã vào rừng để xem các loài động vật."},
      {speaker: "Dad", en: "Did you take any pictures?", vi: "Con có chụp bức ảnh nào không?"},
      {speaker: "Son", en: "Yes, I used my camera to take pictures of a bear.", vi: "Có ạ, con đã dùng máy ảnh để chụp hình một con gấu."},
      {speaker: "Dad", en: "That sounds very exciting!", vi: "Nghe có vẻ rất thú vị đấy!"}
    ]
  },
  {
    lesson: 22, title: "Summer Holidays", lines: [
      {speaker: "Girl", en: "Do you often go to the beach in summer?", vi: "Cậu có thường ra bãi biển vào mùa hè không?"},
      {speaker: "Boy", en: "Yes, I always go to the beach with my family.", vi: "Có, tớ luôn luôn đi biển cùng gia đình."},
      {speaker: "Girl", en: "What do you usually do there?", vi: "Cậu thường làm gì ở đó?"},
      {speaker: "Boy", en: "I usually swim in the sea. Sometimes I find beautiful shells.", vi: "Tớ thường bơi dưới biển. Thỉnh thoảng tớ tìm được những vỏ sò đẹp."},
      {speaker: "Girl", en: "I never find shells. You are lucky!", vi: "Tớ không bao giờ tìm được vỏ sò. Cậu may mắn thật!"}
    ]
  },
  {
    lesson: 23, title: "The Turtle and the Rabbit", lines: [
      {speaker: "Rabbit", en: "Let's have a race! I run very quickly.", vi: "Chúng ta hãy đua đi! Tớ chạy rất nhanh đấy."},
      {speaker: "Turtle", en: "Okay. I walk slowly, but I am careful.", vi: "Đồng ý. Tớ đi bộ chậm chạp, nhưng tớ rất cẩn thận."},
      {speaker: "Rabbit", en: "Haha! You will never win.", vi: "Haha! Cậu sẽ không bao giờ thắng được đâu."},
      {speaker: "Turtle", en: "We will see. I always try my best.", vi: "Chúng ta sẽ chờ xem. Tớ luôn cố gắng hết sức."},
      {speaker: "Rabbit", en: "Oh no! You crossed the line first!", vi: "Ôi không! Cậu đã qua vạch đích trước rồi!"}
    ]
  },
  {
    lesson: 24, title: "How do you feel?", lines: [
      {speaker: "Mom", en: "How do you feel today, Sweetie?", vi: "Hôm nay con cảm thấy thế nào hả cục cưng?"},
      {speaker: "Daughter", en: "I feel very excited! We are going to the zoo.", vi: "Con cảm thấy rất hào hứng! Chúng ta sắp đi sở thú."},
      {speaker: "Mom", en: "Why is your little brother crying?", vi: "Tại sao em trai của con lại khóc vậy?"},
      {speaker: "Daughter", en: "Because he is hungry. He wants an apple.", vi: "Bởi vì em ấy bị đói. Em ấy muốn một quả táo."},
      {speaker: "Mom", en: "Okay, let's give him some food.", vi: "Được rồi, đưa cho em ấy chút đồ ăn nhé."}
    ]
  },
  {
    lesson: 25, title: "A Weekend Plan", lines: [
      {speaker: "Tom", en: "I am very bored. Let's go to the park!", vi: "Tớ chán quá. Chúng ta hãy đi công viên đi!"},
      {speaker: "Jerry", en: "The park is crowded. How about playing a video game?", vi: "Công viên đông lắm. Chơi trò chơi điện tử thì sao?"},
      {speaker: "Tom", en: "No, I played games yesterday. Shall we ride our bikes?", vi: "Không, hôm qua tớ đã chơi game rồi. Chúng ta đạp xe nhé?"},
      {speaker: "Jerry", en: "That is a great idea! Let's go!", vi: "Đó là một ý tưởng tuyệt vời! Đi thôi!"},
      {speaker: "Tom", en: "Bring some water too. We might get thirsty.", vi: "Mang theo chút nước nữa nhé. Chúng ta có thể sẽ bị khát."}
    ]
  }
];

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-movers' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program Movers (en-movers)!');
    return;
  }

  console.log(`✅ Tìm thấy Program: ${program.name}`);

  for (const item of DIALOGUE_DATA) {
    const lesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!lesson) {
      console.error(`❌ Không tìm thấy Lesson ${item.lesson} trong DB.`);
      continue;
    }

    const contentJson = JSON.stringify({
      title: item.title,
      lines: item.lines
    });

    const existing = await prisma.lessonContent.findFirst({
      where: {
        lessonId: lesson.id,
        contentType: 'DIALOGUE',
        content: { contains: `"title":"${item.title}"` }
      }
    });

    if (existing) {
      console.log(`⏭️  Hội thoại Bài ${item.lesson} ("${item.title}") đã tồn tại.`);
      continue;
    }

    await prisma.lessonContent.create({
      data: {
        lessonId: lesson.id,
        contentType: 'DIALOGUE',
        content: contentJson
      }
    });

    console.log(`✅ Đã thêm Hội thoại: Bài ${item.lesson} - ${item.title}`);
  }

  console.log('\n🎉 Hoàn thành nạp 25 đoạn Hội thoại Movers!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

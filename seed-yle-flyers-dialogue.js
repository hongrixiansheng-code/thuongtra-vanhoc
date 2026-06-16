/**
 * SEED SCRIPT: YLE Flyers Dialogue (25 Bài)
 * Chạy từ thư mục gốc: node seed-yle-flyers-dialogue.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  // BÀI 1 - 5
  {
    lesson: 1, title: "A Weekend Activity", lines: [
      {speaker: "Tom", en: "What do you usually do on Saturdays?", vi: "Bạn thường làm gì vào các ngày thứ Bảy?"},
      {speaker: "Anna", en: "I usually walk in the park, but today I am riding my bike.", vi: "Tớ thường đi dạo trong công viên, nhưng hôm nay tớ đang đạp xe."},
      {speaker: "Tom", en: "That sounds fun! Is your sister coming?", vi: "Nghe có vẻ vui đấy! Chị gái của bạn có đến không?"},
      {speaker: "Anna", en: "No, she is reading a book at home now.", vi: "Không, bây giờ chị ấy đang đọc sách ở nhà."},
      {speaker: "Tom", en: "Okay, let's ride together!", vi: "Được rồi, chúng ta hãy cùng đạp xe nhé!"}
    ]
  },
  {
    lesson: 2, title: "A Rainy Afternoon", lines: [
      {speaker: "Mom", en: "What were you doing at 3 PM yesterday?", vi: "Con đang làm gì vào lúc 3 giờ chiều hôm qua?"},
      {speaker: "Boy", en: "I was watching TV when the phone rang.", vi: "Con đang xem TV thì điện thoại reo."},
      {speaker: "Mom", en: "Who was calling?", vi: "Ai gọi vậy?"},
      {speaker: "Boy", en: "It was dad. While we were talking, it started to rain heavily.", vi: "Là bố ạ. Trong khi chúng con đang nói chuyện, trời bắt đầu mưa to."},
      {speaker: "Mom", en: "I hope he had an umbrella.", vi: "Mẹ hy vọng bố đã mang theo ô."}
    ]
  },
  {
    lesson: 3, title: "Looking for Keys", lines: [
      {speaker: "Dad", en: "Oh no! I have lost my keys.", vi: "Ôi không! Bố đã đánh mất chìa khóa rồi."},
      {speaker: "Girl", en: "Have you looked in the living room?", vi: "Bố đã tìm trong phòng khách chưa?"},
      {speaker: "Dad", en: "Yes, I have already searched there.", vi: "Rồi, bố đã tìm ở đó rồi."},
      {speaker: "Girl", en: "Look! I have found them. They are under the newspaper.", vi: "Nhìn này! Con đã tìm thấy chúng. Chúng nằm dưới tờ báo."},
      {speaker: "Dad", en: "Thank you! You are a great detective.", vi: "Cảm ơn con! Con đúng là một thám tử tài ba."}
    ]
  },
  {
    lesson: 4, title: "A Quick Lunch", lines: [
      {speaker: "Mom", en: "Have you eaten your lunch yet?", vi: "Con đã ăn bữa trưa chưa?"},
      {speaker: "Boy", en: "Yes, I have just eaten a sandwich.", vi: "Vâng, con vừa mới ăn một chiếc bánh mì kẹp."},
      {speaker: "Mom", en: "Have you cleaned your room yet?", vi: "Con đã dọn phòng của mình chưa?"},
      {speaker: "Boy", en: "No, I haven't done it yet. I will do it now.", vi: "Chưa, con chưa làm việc đó. Bây giờ con sẽ làm."},
      {speaker: "Mom", en: "Good boy!", vi: "Cậu bé ngoan!"}
    ]
  },
  {
    lesson: 5, title: "A New Pet", lines: [
      {speaker: "Anna", en: "Is that your new dog? How long have you had him?", vi: "Đó là chú chó mới của cậu à? Cậu đã nuôi nó bao lâu rồi?"},
      {speaker: "Tom", en: "I have had him for two weeks.", vi: "Tớ đã nuôi nó được hai tuần rồi."},
      {speaker: "Anna", en: "He is so cute. What is his name?", vi: "Nó dễ thương quá. Tên nó là gì vậy?"},
      {speaker: "Tom", en: "His name is Max. He has been very playful since yesterday.", vi: "Tên nó là Max. Nó rất tinh nghịch từ hôm qua tới giờ."},
      {speaker: "Anna", en: "Can I play with him?", vi: "Tớ có thể chơi với nó không?"}
    ]
  },

  // BÀI 6 - 10
  {
    lesson: 6, title: "Weather Forecast", lines: [
      {speaker: "Dad", en: "What will the weather be like tomorrow?", vi: "Thời tiết ngày mai sẽ như thế nào?"},
      {speaker: "Girl", en: "I think it will be sunny and warm.", vi: "Con nghĩ trời sẽ nắng và ấm áp."},
      {speaker: "Dad", en: "Will we go to the beach?", vi: "Chúng ta sẽ đi biển chứ?"},
      {speaker: "Girl", en: "Yes, I will bring my new swimsuit.", vi: "Vâng, con sẽ mang theo bộ đồ bơi mới của mình."},
      {speaker: "Dad", en: "Great! I will pack some sandwiches.", vi: "Tuyệt quá! Bố sẽ chuẩn bị vài chiếc bánh mì kẹp."}
    ]
  },
  {
    lesson: 7, title: "Weekend Plans", lines: [
      {speaker: "Alex", en: "What are you going to do this weekend?", vi: "Cậu dự định làm gì vào cuối tuần này?"},
      {speaker: "Mia", en: "I am going to visit my grandparents in the countryside.", vi: "Tớ dự định đi thăm ông bà ở vùng quê."},
      {speaker: "Alex", en: "That sounds nice! Are you going by train?", vi: "Nghe tuyệt đấy! Cậu định đi bằng tàu hỏa à?"},
      {speaker: "Mia", en: "No, my dad is going to drive us there.", vi: "Không, bố tớ sẽ lái xe đưa chúng tớ đến đó."},
      {speaker: "Alex", en: "Have a great trip!", vi: "Chúc cậu có một chuyến đi tuyệt vời!"}
    ]
  },
  {
    lesson: 8, title: "Science Facts", lines: [
      {speaker: "Teacher", en: "Let's talk about science. What happens if you heat ice?", vi: "Chúng ta hãy nói về khoa học. Điều gì xảy ra nếu em đun nóng đá?"},
      {speaker: "Student", en: "If you heat ice, it melts and becomes water.", vi: "Nếu đun nóng đá, nó sẽ tan chảy và biến thành nước."},
      {speaker: "Teacher", en: "Exactly! And what happens if you put water in the freezer?", vi: "Chính xác! Và điều gì xảy ra nếu em đặt nước vào tủ đông?"},
      {speaker: "Student", en: "If you freeze water, it turns into ice.", vi: "Nếu làm đông nước, nó sẽ biến thành đá."},
      {speaker: "Teacher", en: "Very good! You understand it perfectly.", vi: "Rất tốt! Em hiểu nó một cách hoàn hảo."}
    ]
  },
  {
    lesson: 9, title: "A Big Match", lines: [
      {speaker: "Coach", en: "If we win this match, we will be the champions.", vi: "Nếu chúng ta thắng trận đấu này, chúng ta sẽ trở thành những nhà vô địch."},
      {speaker: "Player", en: "We must play our best today.", vi: "Hôm nay chúng ta phải thi đấu hết mình."},
      {speaker: "Coach", en: "If you run fast and pass the ball well, you will score a goal.", vi: "Nếu em chạy nhanh và chuyền bóng tốt, em sẽ ghi bàn."},
      {speaker: "Player", en: "I promise I will try my best.", vi: "Em hứa em sẽ cố gắng hết sức mình."},
      {speaker: "Coach", en: "Good luck, team!", vi: "Chúc may mắn nhé, cả đội!"}
    ]
  },
  {
    lesson: 10, title: "A Clean Room", lines: [
      {speaker: "Mom", en: "Wow, this room is very clean!", vi: "Chà, căn phòng này rất sạch sẽ!"},
      {speaker: "Boy", en: "Yes, the room is cleaned every day.", vi: "Vâng, căn phòng được dọn dẹp mỗi ngày."},
      {speaker: "Mom", en: "Are the windows washed too?", vi: "Những cửa sổ cũng được rửa sạch chứ?"},
      {speaker: "Boy", en: "Yes, the windows are washed by my brother.", vi: "Vâng, những cửa sổ được rửa bởi anh trai con."},
      {speaker: "Mom", en: "He did a wonderful job.", vi: "Anh ấy đã làm một công việc tuyệt vời."}
    ]
  },

  // BÀI 11 - 15
  {
    lesson: 11, title: "History Lesson", lines: [
      {speaker: "Teacher", en: "Look at this picture of a castle. It was built in 1500.", vi: "Hãy nhìn bức tranh lâu đài này. Nó được xây dựng vào năm 1500."},
      {speaker: "Student", en: "Was it built by a king?", vi: "Có phải nó được xây bởi một vị vua không ạ?"},
      {speaker: "Teacher", en: "Yes, it was. Many old tools were found there.", vi: "Đúng vậy. Rất nhiều công cụ cổ đã được tìm thấy ở đó."},
      {speaker: "Student", en: "Were any gold coins found?", vi: "Có đồng tiền vàng nào được tìm thấy không ạ?"},
      {speaker: "Teacher", en: "Yes, a box of gold was discovered in the basement.", vi: "Có, một hộp vàng đã được phát hiện dưới tầng hầm."}
    ]
  },
  {
    lesson: 12, title: "Going to the Airport", lines: [
      {speaker: "Dad", en: "We are late for the flight, aren't we?", vi: "Chúng ta bị trễ chuyến bay rồi, phải không?"},
      {speaker: "Mom", en: "No, we have plenty of time. You have the tickets, don't you?", vi: "Không, chúng ta có nhiều thời gian mà. Anh cầm vé rồi, đúng không?"},
      {speaker: "Dad", en: "Yes, they are in my bag. The taxi is arriving soon, isn't it?", vi: "Đúng, chúng ở trong túi anh. Taxi sắp đến rồi, phải không?"},
      {speaker: "Mom", en: "Yes, look! It is waiting outside.", vi: "Đúng vậy, nhìn kìa! Nó đang chờ bên ngoài."},
      {speaker: "Dad", en: "Let's put the luggage in the taxi.", vi: "Hãy đặt hành lý vào xe taxi nào."}
    ]
  },
  {
    lesson: 13, title: "The New Teacher", lines: [
      {speaker: "Anna", en: "Who is that man?", vi: "Người đàn ông kia là ai vậy?"},
      {speaker: "Tom", en: "He is the teacher who teaches us Math.", vi: "Thầy ấy là giáo viên người mà dạy toán cho chúng ta."},
      {speaker: "Anna", en: "And what is that building?", vi: "Thế còn tòa nhà kia là gì?"},
      {speaker: "Tom", en: "That is the library which was built last year.", vi: "Đó là thư viện thứ mà được xây vào năm ngoái."},
      {speaker: "Anna", en: "It looks very modern.", vi: "Nó trông rất hiện đại."}
    ]
  },
  {
    lesson: 14, title: "A Special Place", lines: [
      {speaker: "Boy", en: "Where did you go yesterday?", vi: "Hôm qua bạn đã đi đâu?"},
      {speaker: "Girl", en: "I went to the forest where we usually camp.", vi: "Tớ đã đi đến khu rừng nơi mà chúng ta thường cắm trại."},
      {speaker: "Boy", en: "Is it the place where you saw a deer?", vi: "Đó có phải là nơi mà bạn đã nhìn thấy một con nai không?"},
      {speaker: "Girl", en: "Yes! And I found a cave where bears sleep in winter.", vi: "Đúng rồi! Và tớ còn tìm thấy một hang động nơi mà loài gấu ngủ vào mùa đông."},
      {speaker: "Boy", en: "Wow, that sounds amazing!", vi: "Chà, nghe thật tuyệt vời!"}
    ]
  },
  {
    lesson: 15, title: "He Said, She Said", lines: [
      {speaker: "Mia", en: "Did you talk to Peter?", vi: "Cậu đã nói chuyện với Peter chưa?"},
      {speaker: "Alex", en: "Yes, he said that he was very tired.", vi: "Rồi, cậu ấy nói rằng cậu ấy rất mệt."},
      {speaker: "Mia", en: "Did he go to the doctor?", vi: "Cậu ấy đã đi khám bác sĩ chưa?"},
      {speaker: "Alex", en: "No. His mom told him that he needed to rest at home.", vi: "Chưa. Mẹ cậu ấy bảo rằng cậu ấy cần nghỉ ngơi ở nhà."},
      {speaker: "Mia", en: "I hope he gets well soon.", vi: "Tớ hy vọng cậu ấy mau khỏe."}
    ]
  },

  // BÀI 16 - 20
  {
    lesson: 16, title: "Computer Rules", lines: [
      {speaker: "Teacher", en: "The teacher told us to turn on our computers.", vi: "Giáo viên đã bảo chúng tớ bật máy tính lên."},
      {speaker: "Student", en: "Did she tell us to open the software?", vi: "Cô ấy có bảo chúng ta mở phần mềm không?"},
      {speaker: "Teacher", en: "Yes, and she told us not to play games.", vi: "Có, và cô ấy bảo chúng tớ không được chơi trò chơi."},
      {speaker: "Student", en: "Okay, I will type my password now.", vi: "Được rồi, tớ sẽ gõ mật khẩu của tớ bây giờ."},
      {speaker: "Teacher", en: "Make sure you save your file.", vi: "Hãy đảm bảo rằng bạn đã lưu tập tin của mình."}
    ]
  },
  {
    lesson: 17, title: "Hobbies", lines: [
      {speaker: "Girl", en: "I enjoy reading books in my free time.", vi: "Tớ tận hưởng việc đọc sách trong thời gian rảnh rỗi."},
      {speaker: "Boy", en: "I don't like reading. I prefer playing sports.", vi: "Tớ không thích đọc. Tớ thích chơi thể thao hơn."},
      {speaker: "Girl", en: "Have you decided to join the football club?", vi: "Cậu đã quyết định tham gia câu lạc bộ bóng đá chưa?"},
      {speaker: "Boy", en: "Yes, I want to practice every day.", vi: "Rồi, tớ muốn luyện tập mỗi ngày."},
      {speaker: "Girl", en: "That is a great idea.", vi: "Đó là một ý tưởng tuyệt vời."}
    ]
  },
  {
    lesson: 18, title: "A Movie Night", lines: [
      {speaker: "Tom", en: "Did you like the movie?", vi: "Cậu có thích bộ phim đó không?"},
      {speaker: "Anna", en: "No, I was very bored. The movie was boring.", vi: "Không, tớ cảm thấy rất chán. Bộ phim thật tẻ nhạt."},
      {speaker: "Tom", en: "Really? I thought it was an exciting adventure.", vi: "Thật sao? Tớ đã nghĩ đó là một cuộc phiêu lưu thú vị."},
      {speaker: "Anna", en: "I am more interested in comedies.", vi: "Tớ cảm thấy thích thú với phim hài hơn."},
      {speaker: "Tom", en: "Okay, let's watch a comedy next time.", vi: "Được rồi, lần tới chúng ta hãy xem phim hài nhé."}
    ]
  },
  {
    lesson: 19, title: "A Strange Noise", lines: [
      {speaker: "Girl", en: "Listen! What is that noise?", vi: "Nghe kìa! Đó là âm thanh gì vậy?"},
      {speaker: "Boy", en: "It might be a cat outside.", vi: "Có lẽ là một con mèo ở bên ngoài."},
      {speaker: "Girl", en: "No, it is too loud. It can't be a cat.", vi: "Không, nó quá ồn ào. Nó không thể nào là một con mèo được."},
      {speaker: "Boy", en: "Look! It's a big dog. It must be hungry.", vi: "Nhìn kìa! Đó là một con chó lớn. Chắc hẳn nó đang đói."},
      {speaker: "Girl", en: "Let's give it some food.", vi: "Hãy cho nó một ít thức ăn nhé."}
    ]
  },
  {
    lesson: 20, title: "Health Advice", lines: [
      {speaker: "Doctor", en: "You have a bad cough. You should drink warm water.", vi: "Cháu bị ho nặng đấy. Cháu nên uống nước ấm."},
      {speaker: "Patient", en: "Should I go outside?", vi: "Cháu có nên đi ra ngoài không ạ?"},
      {speaker: "Doctor", en: "No, you shouldn't play outside in the cold weather.", vi: "Không, cháu không nên chơi ở ngoài trời trong thời tiết lạnh."},
      {speaker: "Patient", en: "Okay, doctor. What else ought I to do?", vi: "Vâng thưa bác sĩ. Cháu nên làm gì khác nữa không?"},
      {speaker: "Doctor", en: "You ought to rest in bed for two days.", vi: "Cháu nên nghỉ ngơi trên giường trong hai ngày."}
    ]
  },

  // BÀI 21 - 25
  {
    lesson: 21, title: "When I Was Young", lines: [
      {speaker: "Grandpa", en: "When I was ten, I could run very fast.", vi: "Khi ông mười tuổi, ông đã có thể chạy rất nhanh."},
      {speaker: "Boy", en: "Could you play the guitar, Grandpa?", vi: "Ông có thể chơi ghi-ta không, thưa ông?"},
      {speaker: "Grandpa", en: "No, I couldn't. But I could sing well.", vi: "Không, ông không thể. Nhưng ông có thể hát rất hay."},
      {speaker: "Boy", en: "I can't sing, but I can play the piano.", vi: "Con không thể hát, nhưng con có thể chơi đàn piano."},
      {speaker: "Grandpa", en: "That is wonderful!", vi: "Tuyệt vời quá!"}
    ]
  },
  {
    lesson: 22, title: "Comparing Things", lines: [
      {speaker: "Anna", en: "Your backpack is as heavy as a rock!", vi: "Ba lô của cậu nặng như một hòn đá vậy!"},
      {speaker: "Tom", en: "Yes, I have many books. Is your bag heavy?", vi: "Đúng vậy, tớ có rất nhiều sách. Cặp của cậu có nặng không?"},
      {speaker: "Anna", en: "No, my bag is not as heavy as yours.", vi: "Không, cặp của tớ không nặng bằng cặp của cậu."},
      {speaker: "Tom", en: "You only have one notebook in it!", vi: "Cậu chỉ có một cuốn vở trong đó thôi mà!"},
      {speaker: "Anna", en: "That's why it is light.", vi: "Đó là lý do tại sao nó lại nhẹ."}
    ]
  },
  {
    lesson: 23, title: "Too and Enough", lines: [
      {speaker: "Girl", en: "Can you reach that book on the top shelf?", vi: "Cậu có thể với tới cuốn sách trên giá cao nhất không?"},
      {speaker: "Boy", en: "No, I can't. The shelf is too high.", vi: "Không, tớ không thể. Cái giá sách quá cao."},
      {speaker: "Girl", en: "I am not tall enough to reach it either.", vi: "Tớ cũng không đủ cao để với tới nó."},
      {speaker: "Boy", en: "Let's ask the teacher for help.", vi: "Hãy nhờ giáo viên giúp đỡ nhé."},
      {speaker: "Girl", en: "Good idea. She is tall enough.", vi: "Ý kiến hay đấy. Cô ấy đủ cao mà."}
    ]
  },
  {
    lesson: 24, title: "Finding the Treasure", lines: [
      {speaker: "Captain", en: "We must go through the dark forest.", vi: "Chúng ta phải đi xuyên qua khu rừng tối tăm."},
      {speaker: "Sailor", en: "And then where do we go?", vi: "Và sau đó chúng ta đi đâu ạ?"},
      {speaker: "Captain", en: "Walk over the wooden bridge and go into the cave.", vi: "Hãy đi qua cây cầu gỗ và đi vào trong hang động."},
      {speaker: "Sailor", en: "Is the treasure hidden under a big stone?", vi: "Có phải kho báu được giấu dưới một tảng đá lớn không?"},
      {speaker: "Captain", en: "Yes! Now, take the map out of your pocket and let's go.", vi: "Đúng thế! Bây giờ, hãy lấy tấm bản đồ ra khỏi túi của cậu và chúng ta cùng đi nào."}
    ]
  },
  {
    lesson: 25, title: "A School Trip", lines: [
      {speaker: "Teacher", en: "Although it was raining, we went to the museum.", vi: "Mặc dù trời mưa, chúng tôi vẫn đi tới bảo tàng."},
      {speaker: "Student", en: "Did you see the dinosaur bones?", vi: "Cô có nhìn thấy xương khủng long không ạ?"},
      {speaker: "Teacher", en: "Yes, we did. Because the museum was big, we spent three hours there.", vi: "Có chứ. Bởi vì bảo tàng rất lớn, chúng tôi đã dành ba giờ đồng hồ ở đó."},
      {speaker: "Student", en: "It was late, so you went home?", vi: "Trời đã muộn, vì vậy cô đã về nhà ạ?"},
      {speaker: "Teacher", en: "Exactly. We were tired but very happy.", vi: "Chính xác. Chúng tôi đã rất mệt nhưng vô cùng vui vẻ."}
    ]
  }
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
  
  let successCount = 0;
  for (const item of DIALOGUE_DATA) {
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!targetLesson) {
      console.error(`❌ Không tìm thấy Lesson ${item.lesson} cho hội thoại "${item.title}"`);
      continue;
    }

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

    if (!existingContent) {
      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'DIALOGUE',
          content: contentJson
        }
      });
      successCount++;
      console.log(`✅ Đã thêm Hội thoại: ${item.title} (Bài ${item.lesson})`);
    } else {
      await prisma.lessonContent.update({
        where: { id: existingContent.id },
        data: { content: contentJson }
      });
      successCount++;
      console.log(`🔄 Đã cập nhật Hội thoại: ${item.title} (Bài ${item.lesson})`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp/cập nhật ${successCount} bài hội thoại cho Flyers!`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

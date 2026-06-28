/**
 * SEED SCRIPT: PET Dialogue — 25 bài
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  {
    lesson: 1, title: "Daily Routine", desc: "Nói về thói quen hàng ngày.",
    dialogues: [
      { speaker: "Anna", text: "What time do you usually wake up?", translation: "Bạn thường thức dậy lúc mấy giờ?" },
      { speaker: "Ben", text: "I always wake up at 6:30 AM.", translation: "Tôi luôn thức dậy lúc 6:30 sáng." },
      { speaker: "Anna", text: "That's early! What do you do then?", translation: "Sớm thế! Sau đó bạn làm gì?" },
      { speaker: "Ben", text: "I have a shower and eat breakfast.", translation: "Tôi tắm và ăn sáng." }
    ]
  },
  {
    lesson: 2, title: "Describing People", desc: "Miêu tả tính cách và ngoại hình.",
    dialogues: [
      { speaker: "Sarah", text: "What is your new boss like?", translation: "Sếp mới của bạn là người như thế nào?" },
      { speaker: "Tom", text: "He is very hard-working and polite.", translation: "Ông ấy rất chăm chỉ và lịch sự." },
      { speaker: "Sarah", text: "Is he strict?", translation: "Ông ấy có nghiêm khắc không?" },
      { speaker: "Tom", text: "Not really, but he is quite serious.", translation: "Không hẳn, nhưng ông ấy khá nghiêm túc." }
    ]
  },
  {
    lesson: 3, title: "Health and Fitness", desc: "Nói về sức khỏe và lối sống.",
    dialogues: [
      { speaker: "Doctor", text: "How are you feeling today?", translation: "Hôm nay bạn cảm thấy thế nào?" },
      { speaker: "Patient", text: "I have a terrible headache and a sore throat.", translation: "Tôi bị đau đầu dữ dội và đau họng." },
      { speaker: "Doctor", text: "You need to rest and drink plenty of water.", translation: "Bạn cần nghỉ ngơi và uống nhiều nước." },
      { speaker: "Patient", text: "Should I take some medicine?", translation: "Tôi có nên uống thuốc không?" }
    ]
  },
  {
    lesson: 4, title: "Shopping and Money", desc: "Mua sắm và thanh toán.",
    dialogues: [
      { speaker: "Customer", text: "Excuse me, how much is this jacket?", translation: "Xin lỗi, chiếc áo khoác này bao nhiêu tiền?" },
      { speaker: "Assistant", text: "It's on sale for £45.", translation: "Nó đang được giảm giá còn 45 bảng." },
      { speaker: "Customer", text: "Can I try it on?", translation: "Tôi có thể thử nó không?" },
      { speaker: "Assistant", text: "Of course. The fitting rooms are over there.", translation: "Tất nhiên rồi. Phòng thử đồ ở đằng kia." }
    ]
  },
  {
    lesson: 5, title: "Housing and Home", desc: "Nói về nhà ở.",
    dialogues: [
      { speaker: "Lisa", text: "How is your new apartment?", translation: "Căn hộ mới của bạn thế nào?" },
      { speaker: "Mark", text: "It's great! It's very spacious and bright.", translation: "Tuyệt vời! Nó rất rộng rãi và sáng sủa." },
      { speaker: "Lisa", text: "Does it have a balcony?", translation: "Nó có ban công không?" },
      { speaker: "Mark", text: "Yes, it has a small balcony with a nice view.", translation: "Có, nó có một ban công nhỏ với tầm nhìn đẹp." }
    ]
  },
  {
    lesson: 6, title: "At the Restaurant", desc: "Gọi món tại nhà hàng.",
    dialogues: [
      { speaker: "Waiter", text: "Are you ready to order?", translation: "Quý khách đã sẵn sàng gọi món chưa?" },
      { speaker: "Customer", text: "Yes, I'd like the roast chicken, please.", translation: "Vâng, cho tôi gà quay." },
      { speaker: "Waiter", text: "And would you like something to drink?", translation: "Quý khách có muốn uống gì không?" },
      { speaker: "Customer", text: "Just a glass of water, please.", translation: "Cho tôi một ly nước lọc thôi." }
    ]
  },
  {
    lesson: 7, title: "Festivals", desc: "Nói về lễ hội.",
    dialogues: [
      { speaker: "Jane", text: "What are you doing for New Year's Eve?", translation: "Bạn sẽ làm gì vào đêm giao thừa?" },
      { speaker: "Paul", text: "I'm going to a party with my friends.", translation: "Tôi sẽ đi dự tiệc với bạn bè." },
      { speaker: "Jane", text: "Are you going to watch the fireworks?", translation: "Bạn có đi xem pháo hoa không?" },
      { speaker: "Paul", text: "Yes, at midnight. It's a tradition.", translation: "Có, vào lúc nửa đêm. Đó là một truyền thống." }
    ]
  },
  {
    lesson: 8, title: "University Life", desc: "Nói về việc học đại học.",
    dialogues: [
      { speaker: "Emma", text: "What subject are you studying?", translation: "Bạn đang học ngành gì?" },
      { speaker: "David", text: "I'm studying history at university.", translation: "Tôi đang học lịch sử ở trường đại học." },
      { speaker: "Emma", text: "Do you have a lot of assignments?", translation: "Bạn có nhiều bài tập không?" },
      { speaker: "David", text: "Yes, I have to write an essay every week.", translation: "Có, tôi phải viết một bài luận mỗi tuần." }
    ]
  },
  {
    lesson: 9, title: "Relationships", desc: "Giao tiếp với bạn bè.",
    dialogues: [
      { speaker: "Lucy", text: "Have you seen Mike recently?", translation: "Gần đây bạn có gặp Mike không?" },
      { speaker: "Sam", text: "No, we had an argument last week.", translation: "Không, chúng tôi đã cãi nhau vào tuần trước." },
      { speaker: "Lucy", text: "Oh dear. You should apologise.", translation: "Ôi trời. Bạn nên xin lỗi đi." },
      { speaker: "Sam", text: "I know. I'll call him tomorrow.", translation: "Tôi biết. Tôi sẽ gọi cho cậu ấy vào ngày mai." }
    ]
  },
  {
    lesson: 10, title: "Reporting a Crime", desc: "Báo cáo tội phạm.",
    dialogues: [
      { speaker: "Officer", text: "How can I help you?", translation: "Tôi có thể giúp gì cho ngài?" },
      { speaker: "Victim", text: "Someone stole my wallet on the bus.", translation: "Có ai đó đã lấy trộm ví của tôi trên xe buýt." },
      { speaker: "Officer", text: "Did you see the thief?", translation: "Ngài có nhìn thấy kẻ trộm không?" },
      { speaker: "Victim", text: "No, I just noticed it was missing.", translation: "Không, tôi chỉ nhận ra là nó bị mất thôi." }
    ]
  },
  {
    lesson: 11, title: "The Weather", desc: "Nói về thời tiết.",
    dialogues: [
      { speaker: "Chris", text: "What's the weather forecast for tomorrow?", translation: "Dự báo thời tiết ngày mai thế nào?" },
      { speaker: "Alex", text: "It says it's going to be cold and windy.", translation: "Dự báo nói rằng trời sẽ lạnh và có gió." },
      { speaker: "Chris", text: "Oh no. We can't go to the beach then.", translation: "Ôi không. Thế thì chúng ta không thể đi biển được." },
      { speaker: "Alex", text: "We could go to the museum instead.", translation: "Thay vào đó, chúng ta có thể đến bảo tàng." }
    ]
  },
  {
    lesson: 12, title: "Landscapes", desc: "Mô tả phong cảnh.",
    dialogues: [
      { speaker: "Tourist", text: "The scenery here is absolutely beautiful.", translation: "Phong cảnh ở đây thực sự tuyệt đẹp." },
      { speaker: "Guide", text: "Yes, the mountains and the lake are stunning.", translation: "Vâng, những ngọn núi và hồ nước rất đẹp." },
      { speaker: "Tourist", text: "Can we walk up that hill?", translation: "Chúng ta có thể đi bộ lên ngọn đồi đó không?" },
      { speaker: "Guide", text: "Yes, there is a path that goes to the top.", translation: "Có, có một con đường đi lên đỉnh." }
    ]
  },
  {
    lesson: 13, title: "Travel Plans", desc: "Kế hoạch đi du lịch.",
    dialogues: [
      { speaker: "Mary", text: "Are you ready for the trip to Paris?", translation: "Bạn đã sẵn sàng cho chuyến đi Paris chưa?" },
      { speaker: "John", text: "Almost. I just need to pack my suitcase.", translation: "Gần xong rồi. Tôi chỉ cần đóng gói va li nữa thôi." },
      { speaker: "Mary", text: "Don't forget your passport!", translation: "Đừng quên hộ chiếu nhé!" },
      { speaker: "John", text: "I have it right here in my bag.", translation: "Tôi để nó ngay đây trong túi xách." }
    ]
  },
  {
    lesson: 14, title: "At the Station", desc: "Tại nhà ga.",
    dialogues: [
      { speaker: "Passenger", text: "Which platform does the train to London leave from?", translation: "Tàu đi London khởi hành từ sân ga nào?" },
      { speaker: "Staff", text: "Platform 4. It's delayed by 10 minutes.", translation: "Sân ga số 4. Chuyến tàu bị trễ 10 phút." },
      { speaker: "Passenger", text: "Do I need to change trains?", translation: "Tôi có cần phải đổi tàu không?" },
      { speaker: "Staff", text: "No, it's a direct train.", translation: "Không, đó là chuyến tàu chạy thẳng." }
    ]
  },
  {
    lesson: 15, title: "The Environment", desc: "Bảo vệ môi trường.",
    dialogues: [
      { speaker: "Alice", text: "We need to do more to protect the environment.", translation: "Chúng ta cần làm nhiều hơn để bảo vệ môi trường." },
      { speaker: "Bob", text: "I agree. We should recycle more paper and plastic.", translation: "Tôi đồng ý. Chúng ta nên tái chế nhiều giấy và nhựa hơn." },
      { speaker: "Alice", text: "And we could try walking instead of driving.", translation: "Và chúng ta có thể thử đi bộ thay vì lái xe." },
      { speaker: "Bob", text: "Yes, that would help reduce air pollution.", translation: "Đúng, điều đó sẽ giúp giảm ô nhiễm không khí." }
    ]
  },
  {
    lesson: 16, title: "Hobbies", desc: "Nói về sở thích.",
    dialogues: [
      { speaker: "Kate", text: "What do you do in your free time?", translation: "Bạn làm gì vào thời gian rảnh rỗi?" },
      { speaker: "Oliver", text: "I enjoy photography. I take pictures of nature.", translation: "Tôi thích nhiếp ảnh. Tôi chụp ảnh thiên nhiên." },
      { speaker: "Kate", text: "That sounds interesting. Can I see some?", translation: "Nghe có vẻ thú vị. Tôi xem vài bức được không?" },
      { speaker: "Oliver", text: "Sure, I'll show you my album later.", translation: "Chắc chắn rồi, lát nữa tôi sẽ cho bạn xem album của tôi." }
    ]
  },
  {
    lesson: 17, title: "Sports Match", desc: "Xem thể thao.",
    dialogues: [
      { speaker: "Dan", text: "Did you watch the football match last night?", translation: "Tối qua bạn có xem trận bóng đá không?" },
      { speaker: "Peter", text: "Yes, it was a great game! We won 2-1.", translation: "Có, một trận đấu tuyệt vời! Chúng ta đã thắng 2-1." },
      { speaker: "Dan", text: "Who scored the winning goal?", translation: "Ai đã ghi bàn thắng quyết định?" },
      { speaker: "Peter", text: "Ronaldo scored in the final minute.", translation: "Ronaldo đã ghi bàn ở phút cuối cùng." }
    ]
  },
  {
    lesson: 18, title: "Going to the Cinema", desc: "Đi xem phim.",
    dialogues: [
      { speaker: "Sue", text: "Let's go to the cinema tonight.", translation: "Tối nay chúng ta đi xem phim đi." },
      { speaker: "Jim", text: "Good idea. What kind of movie do you want to see?", translation: "Ý hay đấy. Bạn muốn xem thể loại phim gì?" },
      { speaker: "Sue", text: "How about a comedy? I need a good laugh.", translation: "Một bộ phim hài thì sao? Tôi đang cần một trận cười sảng khoái." },
      { speaker: "Jim", text: "Okay, I'll book the tickets online.", translation: "Được thôi, tôi sẽ đặt vé trực tuyến." }
    ]
  },
  {
    lesson: 19, title: "The News", desc: "Nói về tin tức.",
    dialogues: [
      { speaker: "Amy", text: "Did you read the article in the newspaper today?", translation: "Hôm nay bạn có đọc bài báo trên tờ báo không?" },
      { speaker: "Ben", text: "No, I haven't seen it yet. What is it about?", translation: "Chưa, tôi chưa xem. Bài báo nói về cái gì vậy?" },
      { speaker: "Amy", text: "It's about the new technology company in our city.", translation: "Nó nói về công ty công nghệ mới ở thành phố chúng ta." },
      { speaker: "Ben", text: "I'll read it online later.", translation: "Lát nữa tôi sẽ đọc nó trên mạng." }
    ]
  },
  {
    lesson: 20, title: "Computer Problems", desc: "Sự cố máy tính.",
    dialogues: [
      { speaker: "User", text: "My laptop has frozen. The mouse isn't working.", translation: "Máy tính xách tay của tôi bị treo rồi. Chuột không hoạt động." },
      { speaker: "IT Support", text: "Have you tried restarting the computer?", translation: "Bạn đã thử khởi động lại máy tính chưa?" },
      { speaker: "User", text: "Yes, but it's still not working.", translation: "Rồi, nhưng nó vẫn không hoạt động." },
      { speaker: "IT Support", text: "Okay, bring it to the office and I'll check it.", translation: "Được rồi, mang nó đến văn phòng và tôi sẽ kiểm tra." }
    ]
  },
  {
    lesson: 21, title: "Job Interview", desc: "Phỏng vấn xin việc.",
    dialogues: [
      { speaker: "Manager", text: "Why do you want to work for our company?", translation: "Tại sao bạn muốn làm việc cho công ty chúng tôi?" },
      { speaker: "Candidate", text: "Because you have a great reputation in the industry.", translation: "Bởi vì quý công ty có danh tiếng tuyệt vời trong ngành." },
      { speaker: "Manager", text: "Do you have any experience in sales?", translation: "Bạn có kinh nghiệm bán hàng không?" },
      { speaker: "Candidate", text: "Yes, I worked in retail for three years.", translation: "Vâng, tôi đã làm việc trong ngành bán lẻ ba năm." }
    ]
  },
  {
    lesson: 22, title: "Business Meeting", desc: "Cuộc họp kinh doanh.",
    dialogues: [
      { speaker: "Boss", text: "We need to discuss the new marketing strategy.", translation: "Chúng ta cần thảo luận về chiến lược tiếp thị mới." },
      { speaker: "Employee", text: "I have prepared a presentation with some ideas.", translation: "Tôi đã chuẩn bị một bài thuyết trình với một số ý tưởng." },
      { speaker: "Boss", text: "Excellent. Let's look at the figures first.", translation: "Xuất sắc. Đầu tiên hãy nhìn vào các con số." },
      { speaker: "Employee", text: "As you can see, our sales have increased.", translation: "Như ông có thể thấy, doanh số của chúng ta đã tăng." }
    ]
  },
  {
    lesson: 23, title: "Banking", desc: "Tại ngân hàng.",
    dialogues: [
      { speaker: "Customer", text: "I'd like to open a savings account, please.", translation: "Tôi muốn mở một tài khoản tiết kiệm." },
      { speaker: "Bank Clerk", text: "Certainly. I just need to see your passport.", translation: "Chắc chắn rồi. Tôi chỉ cần xem hộ chiếu của bạn." },
      { speaker: "Customer", text: "Here it is. And how much do I need to deposit?", translation: "Đây ạ. Và tôi cần gửi bao nhiêu tiền?" },
      { speaker: "Bank Clerk", text: "The minimum deposit is 100 dollars.", translation: "Số tiền gửi tối thiểu là 100 đô la." }
    ]
  },
  {
    lesson: 24, title: "Future Plans", desc: "Kế hoạch tương lai.",
    dialogues: [
      { speaker: "Tom", text: "What are your plans after you graduate?", translation: "Kế hoạch của bạn sau khi tốt nghiệp là gì?" },
      { speaker: "Lucy", text: "I hope to travel around Europe for a few months.", translation: "Tôi hy vọng sẽ đi du lịch vòng quanh Châu Âu trong vài tháng." },
      { speaker: "Tom", text: "That sounds amazing! How will you afford it?", translation: "Nghe tuyệt quá! Bạn lấy đâu ra tiền chi trả?" },
      { speaker: "Lucy", text: "I've been saving money from my part-time job.", translation: "Tôi đã tiết kiệm tiền từ công việc bán thời gian của mình." }
    ]
  },
  {
    lesson: 25, title: "Exam Results", desc: "Kết quả thi.",
    dialogues: [
      { speaker: "Mother", text: "Did you get your exam results today?", translation: "Hôm nay con đã nhận được kết quả thi chưa?" },
      { speaker: "Son", text: "Yes, I passed! I got a high score in math.", translation: "Rồi ạ, con đã đỗ! Con được điểm cao môn toán." },
      { speaker: "Mother", text: "Congratulations! I am so proud of you.", translation: "Chúc mừng con! Mẹ rất tự hào về con." },
      { speaker: "Son", text: "Thanks, Mum. Let's go out to celebrate!", translation: "Cảm ơn mẹ. Chúng ta ra ngoài ăn mừng đi!" }
    ]
  }
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

  let successCount = 0;

  for (const item of DIALOGUE_DATA) {
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!targetLesson) continue;

    const contentJson = JSON.stringify({
      id: `pet-dialogue-${item.lesson}`,
      title: item.title,
      desc: item.desc,
      dialogues: item.dialogues
    });

    const existing = await prisma.lessonContent.findFirst({
      where: {
        lessonId: targetLesson.id,
        contentType: 'DIALOGUE'
      }
    });

    if (!existing) {
      await prisma.lessonContent.create({
        data: { lessonId: targetLesson.id, contentType: 'DIALOGUE', content: contentJson }
      });
      successCount++;
      console.log(`✅ Đã thêm hội thoại: ${item.title} (Bài ${item.lesson})`);
    } else {
      await prisma.lessonContent.update({
        where: { id: existing.id },
        data: { content: contentJson }
      });
      console.log(`🔄 Đã cập nhật hội thoại: ${item.title} (Bài ${item.lesson})`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp ${successCount} bài hội thoại cho PET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

/**
 * SEED SCRIPT: KET Dialogue - Batch 3 (orderIndex 8, 9, 10, 11)
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  {
    orderIndex: 8, // Bài 9 (Ngân hàng & bưu điện)
    dialogues: [
      {
        content: JSON.stringify({
          title: "At the Bank",
          lines: [
            { speaker: "Tony", en: "She said that she needed money, so she went to the bank.", vi: "Cô ấy nói rằng cô ấy cần tiền, nên cô ấy đã đi đến ngân hàng." },
            { speaker: "Jenny", en: "He said he wanted to open an account, but he forgot his ID.", vi: "Anh ấy nói anh ấy muốn mở một tài khoản, nhưng anh ấy quên thẻ căn cước." },
            { speaker: "Tony", en: "Please fill in this form, and sign your name at the bottom.", vi: "Vui lòng điền vào biểu mẫu này, và ký tên bạn ở dưới cùng." },
            { speaker: "Jenny", en: "I filled out the application carefully, because I didn't want any mistakes.", vi: "Tôi đã điền tờ đơn đăng ký cẩn thận, bởi vì tôi không muốn có bất kỳ sai sót nào." },
            { speaker: "Tony", en: "They said they were at the post office, which is across the street.", vi: "Họ nói họ đang ở bưu điện, nơi nằm ở bên kia đường." },
            { speaker: "Jenny", en: "I have to post this letter, and then I will send you a message.", vi: "Tôi phải gửi bức thư này, và sau đó tôi sẽ gửi cho bạn một tin nhắn." },
            { speaker: "Tony", en: "The company will deliver the parcel tomorrow, so please wait at home.", vi: "Công ty sẽ giao gói bưu kiện vào ngày mai, vì vậy vui lòng đợi ở nhà." },
            { speaker: "Jenny", en: "That is great news, and I am looking forward to receiving it.", vi: "Đó là một tin tuyệt vời, và tôi rất mong chờ nhận được nó." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Sending a Parcel",
          lines: [
            { speaker: "Peter", en: "The manager said the package was heavy, so it cost more to send.", vi: "Người quản lý nói gói hàng rất nặng, nên tốn nhiều tiền hơn để gửi." },
            { speaker: "Mary", en: "I asked if I could send it by airmail, and they said yes.", vi: "Tôi hỏi xem tôi có thể gửi nó bằng đường hàng không không, và họ bảo có." },
            { speaker: "Peter", en: "You need to fill in this customs form, before we can process it.", vi: "Bạn cần phải điền vào biểu mẫu hải quan này, trước khi chúng tôi có thể xử lý nó." },
            { speaker: "Mary", en: "I filled it in completely, although some questions were difficult.", vi: "Tôi đã điền đầy đủ, mặc dù một số câu hỏi khá khó." },
            { speaker: "Peter", en: "They will deliver it to his address, which is written on the box.", vi: "Họ sẽ giao nó đến địa chỉ của anh ấy, cái được viết trên hộp." },
            { speaker: "Mary", en: "He said he would call me, when the parcel finally arrived.", vi: "Anh ấy nói anh ấy sẽ gọi cho tôi, khi bưu kiện cuối cùng cũng đến nơi." },
            { speaker: "Peter", en: "That sounds like a good plan, so let's hope it arrives safely.", vi: "Nghe có vẻ là một kế hoạch tốt, vì vậy hãy hy vọng nó đến nơi an toàn." },
            { speaker: "Mary", en: "I am sure it will, because the service here is very reliable.", vi: "Tôi chắc chắn nó sẽ đến, bởi vì dịch vụ ở đây rất đáng tin cậy." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 9, // Bài 10 (Thực phẩm & ăn uống)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Choosing Dinner",
          lines: [
            { speaker: "Alex", en: "I would rather eat at home tonight, because I am very tired.", vi: "Tôi thà ăn ở nhà tối nay còn hơn, vì tôi rất mệt." },
            { speaker: "Emma", en: "I prefer cooking to eating out, so that is a perfect idea.", vi: "Tôi thích nấu ăn hơn là đi ăn ngoài, vì vậy đó là một ý tưởng hoàn hảo." },
            { speaker: "Alex", en: "Would you rather have chicken or fish, since we have both in the fridge?", vi: "Bạn muốn ăn gà hay cá hơn, vì chúng ta có cả hai trong tủ lạnh?" },
            { speaker: "Emma", en: "I prefer chicken to fish, but we need to check the ingredients first.", vi: "Tôi thích gà hơn cá, nhưng chúng ta cần kiểm tra nguyên liệu trước." },
            { speaker: "Alex", en: "How much garlic do we need, because I cannot find any?", vi: "Chúng ta cần bao nhiêu tỏi, vì tôi không thể tìm thấy chút nào?" },
            { speaker: "Emma", en: "We only need a little, and I have some onions on the table.", vi: "Chúng ta chỉ cần một ít, và tôi có vài củ hành tây trên bàn." },
            { speaker: "Alex", en: "How many onions should I slice, before you start cooking?", vi: "Tôi nên thái bao nhiêu củ hành tây, trước khi bạn bắt đầu nấu?" },
            { speaker: "Emma", en: "Two onions will be enough, and then we can start preparing the meal.", vi: "Hai củ hành tây sẽ là đủ, và sau đó chúng ta có thể bắt đầu chuẩn bị bữa ăn." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "At the Supermarket",
          lines: [
            { speaker: "Liam", en: "I prefer Italian food to curry, so let's buy some pasta.", vi: "Tôi thích đồ ăn Ý hơn cà ri, nên hãy mua một chút mì ống." },
            { speaker: "Mia", en: "She would rather order a dessert, but we don't have enough time.", vi: "Cô ấy thà gọi món tráng miệng, nhưng chúng ta không có đủ thời gian." },
            { speaker: "Liam", en: "How much milk is in the fridge, because we might need more?", vi: "Còn bao nhiêu sữa trong tủ lạnh, vì chúng ta có thể cần thêm?" },
            { speaker: "Mia", en: "We have only one bottle, so we should buy another one.", vi: "Chúng ta chỉ có một chai, vì vậy chúng ta nên mua thêm một chai nữa." },
            { speaker: "Liam", en: "How many eggs are left, since I want to make a cake?", vi: "Còn lại bao nhiêu quả trứng, vì tôi muốn làm một chiếc bánh ngọt?" },
            { speaker: "Mia", en: "There are six eggs left, which should be enough for the cake.", vi: "Còn lại sáu quả trứng, điều này chắc là đủ cho chiếc bánh." },
            { speaker: "Liam", en: "I would rather pay in cash, but I forgot my wallet at home.", vi: "Tôi thà trả bằng tiền mặt, nhưng tôi đã quên ví ở nhà." },
            { speaker: "Mia", en: "Don't worry, I prefer paying by card, so I will handle it.", vi: "Đừng lo, tôi thích trả bằng thẻ hơn, nên tôi sẽ lo việc đó." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 10, // Bài 11 (Nấu ăn & công thức)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Baking a Cake",
          lines: [
            { speaker: "Tony", en: "The cake is baked at 180 degrees, so you should preheat the oven.", vi: "Bánh được nướng ở 180 độ, vì vậy bạn nên làm nóng lò trước." },
            { speaker: "Jenny", en: "You must mix the ingredients well, otherwise the cake will be ruined.", vi: "Bạn phải trộn đều các nguyên liệu, nếu không chiếc bánh sẽ bị hỏng." },
            { speaker: "Tony", en: "Add 200 grams of flour to the bowl, and stir it slowly.", vi: "Thêm 200 gram bột mì vào bát, và khuấy nó thật chậm." },
            { speaker: "Jenny", en: "The water is boiled, and now we can pour it into the mixture.", vi: "Nước đã được đun sôi, và bây giờ chúng ta có thể đổ nó vào hỗn hợp." },
            { speaker: "Tony", en: "You should use fresh fruit, because it tastes much better.", vi: "Bạn nên sử dụng trái cây tươi, bởi vì nó có vị ngon hơn nhiều." },
            { speaker: "Jenny", en: "Pour half a litre of milk, which will make the cake softer.", vi: "Đổ nửa lít sữa vào, điều này sẽ làm cho chiếc bánh mềm hơn." },
            { speaker: "Tony", en: "The chicken is grilled for 20 minutes, while the cake is baking.", vi: "Thịt gà được nướng trong 20 phút, trong khi chiếc bánh đang được nướng." },
            { speaker: "Jenny", en: "We must clean the kitchen afterwards, or our mom will be angry.", vi: "Chúng ta phải dọn dẹp nhà bếp sau đó, nếu không mẹ chúng ta sẽ tức giận." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Cooking Dinner",
          lines: [
            { speaker: "Peter", en: "The vegetables are washed carefully, before they are cut into pieces.", vi: "Các loại rau củ được rửa cẩn thận, trước khi chúng được cắt thành từng miếng." },
            { speaker: "Mary", en: "You shouldn't eat raw meat, because it is dangerous for your health.", vi: "Bạn không nên ăn thịt sống, bởi vì nó rất nguy hiểm cho sức khỏe của bạn." },
            { speaker: "Peter", en: "We need a kilo of tomatoes, so we can make the tomato soup.", vi: "Chúng ta cần một ký cà chua, để chúng ta có thể làm món súp cà chua." },
            { speaker: "Mary", en: "The soup is cooked slowly, which makes it very delicious.", vi: "Súp được nấu chín từ từ, điều này làm cho nó rất ngon." },
            { speaker: "Peter", en: "You must add some salt and pepper, to give it more flavour.", vi: "Bạn phải thêm chút muối và hạt tiêu, để mang lại cho nó nhiều hương vị hơn." },
            { speaker: "Mary", en: "The potatoes are fried in oil, until they turn golden brown.", vi: "Khoai tây được chiên trong dầu, cho đến khi chúng chuyển sang màu nâu vàng." },
            { speaker: "Peter", en: "You should serve the food hot, so everyone can enjoy it.", vi: "Bạn nên phục vụ thức ăn nóng, để mọi người có thể thưởng thức nó." },
            { speaker: "Mary", en: "The meal is prepared perfectly, and I am ready to eat.", vi: "Bữa ăn được chuẩn bị hoàn hảo, và tôi đã sẵn sàng để ăn." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 11, // Bài 12 (Sức khỏe & y tế)
    dialogues: [
      {
        content: JSON.stringify({
          title: "A Visit to the Doctor",
          lines: [
            { speaker: "Alex", en: "Have you ever been to hospital, because you look very pale?", vi: "Bạn đã từng đến bệnh viện chưa, vì bạn trông rất nhợt nhạt?" },
            { speaker: "Emma", en: "I have never been to London, but I visited a local clinic yesterday.", vi: "Tôi chưa từng đến London, nhưng tôi đã đến thăm một phòng khám địa phương hôm qua." },
            { speaker: "Alex", en: "You should see a doctor if you have pain, so don't wait any longer.", vi: "Bạn nên đi gặp bác sĩ nếu bạn bị đau, vì vậy đừng chờ đợi thêm nữa." },
            { speaker: "Emma", en: "I need to make an appointment with the doctor, but the line is busy.", vi: "Tôi cần đặt lịch hẹn với bác sĩ, nhưng đường dây đang bận." },
            { speaker: "Alex", en: "He shouldn't eat so much sugar, because it is bad for his teeth.", vi: "Anh ấy không nên ăn quá nhiều đường, bởi vì nó có hại cho răng của anh ấy." },
            { speaker: "Emma", en: "She has been to the dentist twice this year, which is very frequent.", vi: "Cô ấy đã đi nha sĩ hai lần trong năm nay, điều đó rất thường xuyên." },
            { speaker: "Alex", en: "You should take this medicine twice a day, after you eat your meals.", vi: "Bạn nên uống thuốc này hai lần một ngày, sau khi bạn ăn xong." },
            { speaker: "Emma", en: "Can I make an appointment for tomorrow, so I can see the specialist?", vi: "Tôi có thể đặt lịch hẹn cho ngày mai được không, để tôi có thể gặp bác sĩ chuyên khoa?" }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Feeling Unwell",
          lines: [
            { speaker: "Liam", en: "She made an appointment for an X-ray, because her arm was hurting.", vi: "Cô ấy đã đặt lịch hẹn để chụp X-quang, bởi vì cánh tay của cô ấy bị đau." },
            { speaker: "Mia", en: "I have never been to the new hospital, although it is near my house.", vi: "Tôi chưa từng đến bệnh viện mới, mặc dù nó nằm gần nhà tôi." },
            { speaker: "Liam", en: "You shouldn't go to work today, since you have a high fever.", vi: "Bạn không nên đi làm hôm nay, vì bạn đang bị sốt cao." },
            { speaker: "Mia", en: "I will make an appointment online, which is much faster.", vi: "Tôi sẽ đặt lịch hẹn trực tuyến, cách này nhanh hơn nhiều." },
            { speaker: "Liam", en: "Have you ever had a broken leg, because it takes a long time to heal?", vi: "Bạn đã bao giờ bị gãy chân chưa, bởi vì nó mất nhiều thời gian để chữa lành?" },
            { speaker: "Mia", en: "No, I haven't, but my brother broke his arm last year.", vi: "Không, tôi chưa, nhưng anh trai tôi đã bị gãy tay vào năm ngoái." },
            { speaker: "Liam", en: "You should drink plenty of water, and you must rest in bed.", vi: "Bạn nên uống nhiều nước, và bạn phải nghỉ ngơi trên giường." },
            { speaker: "Mia", en: "Thank you for your advice, and I will call the clinic now.", vi: "Cảm ơn lời khuyên của bạn, và tôi sẽ gọi cho phòng khám ngay bây giờ." }
          ]
        })
      }
    ]
  }
];

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-ket' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program KET!');
    return;
  }

  for (const item of DIALOGUE_DATA) {
    const targetLesson = program.lessons.find(l => l.orderIndex === item.orderIndex);
    if (!targetLesson) continue;

    await prisma.lessonContent.deleteMany({
      where: {
        lessonId: targetLesson.id,
        contentType: 'DIALOGUE'
      }
    });

    for (const d of item.dialogues) {
      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'DIALOGUE',
          content: d.content
        }
      });
    }
    console.log(`✅ Đã nạp 2 đoạn hội thoại cho Bài có orderIndex ${item.orderIndex}`);
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

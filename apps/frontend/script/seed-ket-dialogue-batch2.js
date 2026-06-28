/**
 * SEED SCRIPT: KET Dialogue - Batch 2 (orderIndex 4, 5, 6, 7)
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  {
    orderIndex: 4, // Bài 5 (Căn hộ & chỗ ở)
    dialogues: [
      {
        content: JSON.stringify({
          title: "A New Flat",
          lines: [
            { speaker: "Tony", en: "This flat was built in 2010, and it is still in good condition.", vi: "Căn hộ này được xây dựng vào năm 2010, và nó vẫn còn trong tình trạng tốt." },
            { speaker: "Jenny", en: "Is there an elevator in the building, because we live on the fifth floor?", vi: "Có thang máy trong tòa nhà không, vì chúng ta sống ở tầng năm?" },
            { speaker: "Tony", en: "Yes, there is, but the room was not cleaned yesterday.", vi: "Có, nhưng căn phòng đã không được dọn dẹp ngày hôm qua." },
            { speaker: "Jenny", en: "We should complain, since we pay a lot for the service.", vi: "Chúng ta nên phàn nàn, vì chúng ta trả nhiều tiền cho dịch vụ." },
            { speaker: "Tony", en: "Is there a bathtub in the bathroom, or just a shower?", vi: "Có bồn tắm trong phòng tắm không, hay chỉ có vòi hoa sen?" },
            { speaker: "Jenny", en: "There is a large bathtub, which was bought last week.", vi: "Có một cái bồn tắm lớn, thứ đã được mua vào tuần trước." },
            { speaker: "Tony", en: "That is wonderful, so I can relax after a long day.", vi: "Điều đó thật tuyệt vời, vì vậy tôi có thể thư giãn sau một ngày dài." },
            { speaker: "Jenny", en: "Let's unpack our bags, and then we will rest on the sofa.", vi: "Hãy dỡ hành lý của chúng ta, và sau đó chúng ta sẽ nghỉ ngơi trên ghế sofa." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Looking for a Guest-house",
          lines: [
            { speaker: "Peter", en: "Is there a guest-house near here, because I need a place to stay?", vi: "Có nhà khách nào gần đây không, vì tôi cần một nơi để ở?" },
            { speaker: "Mary", en: "There is one on the second floor of that tall building.", vi: "Có một cái ở tầng hai của tòa nhà cao tầng đó." },
            { speaker: "Peter", en: "Was it opened recently, or is it an old business?", vi: "Nó mới được mở gần đây, hay là một cơ sở kinh doanh cũ?" },
            { speaker: "Mary", en: "The doors were opened last month, so everything is very new.", vi: "Cánh cửa đã được mở vào tháng trước, vì vậy mọi thứ đều rất mới." },
            { speaker: "Peter", en: "I hope the price is cheap, although it is a new place.", vi: "Tôi hy vọng giá rẻ, mặc dù đó là một nơi mới." },
            { speaker: "Mary", en: "The rooms were decorated beautifully, and breakfast is included.", vi: "Các phòng đã được trang trí đẹp mắt, và bữa sáng đã được bao gồm." },
            { speaker: "Peter", en: "I will go and check it, so thank you for your help.", vi: "Tôi sẽ đi và kiểm tra nó, vì vậy cảm ơn sự giúp đỡ của bạn." },
            { speaker: "Mary", en: "You are welcome, and I hope you enjoy your stay there.", vi: "Không có gì, và tôi hy vọng bạn thích kỳ nghỉ của mình ở đó." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 5, // Bài 6 (Việc nhà & thiết bị)
    dialogues: [
      {
        content: JSON.stringify({
          title: "A Broken Printer",
          lines: [
            { speaker: "Alex", en: "My printer broke down yesterday, so I couldn't print the document.", vi: "Máy in của tôi bị hỏng hôm qua, nên tôi không thể in tài liệu." },
            { speaker: "Emma", en: "The machine needs repairing, or you will have to buy a new one.", vi: "Cái máy cần được sửa chữa, hoặc bạn sẽ phải mua một cái mới." },
            { speaker: "Alex", en: "I need to fix it quickly, because I have a meeting tomorrow.", vi: "Tôi cần sửa nó nhanh chóng, vì tôi có một cuộc họp vào ngày mai." },
            { speaker: "Emma", en: "You should have it repaired by a professional technician.", vi: "Bạn nên nhờ một kỹ thuật viên chuyên nghiệp sửa chữa nó." },
            { speaker: "Alex", en: "I agree, but I also need to buy a new battery for my laptop.", vi: "Tôi đồng ý, nhưng tôi cũng cần mua một cục pin mới cho máy tính xách tay của mình." },
            { speaker: "Emma", en: "Don't forget to turn off the heating before we go out.", vi: "Đừng quên tắt lò sưởi trước khi chúng ta ra ngoài." },
            { speaker: "Alex", en: "I already turned it off, so we can leave right now.", vi: "Tôi đã tắt nó rồi, vì vậy chúng ta có thể rời đi ngay bây giờ." },
            { speaker: "Emma", en: "Let's go to the electronics shop, which is near the station.", vi: "Hãy đến cửa hàng điện tử, nơi gần nhà ga." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Housework Trouble",
          lines: [
            { speaker: "Liam", en: "The television is not working, although I turned it on.", vi: "Chiếc tivi không hoạt động, mặc dù tôi đã bật nó lên." },
            { speaker: "Mia", en: "We had the cable fixed last week, but maybe it broke down again.", vi: "Chúng ta đã cho người sửa lại dây cáp vào tuần trước, nhưng có lẽ nó lại hỏng rồi." },
            { speaker: "Liam", en: "The carpet also needs cleaning, because the dog played on it.", vi: "Tấm thảm cũng cần được giặt, vì con chó đã chơi đùa trên đó." },
            { speaker: "Mia", en: "I need to call the cleaner, so she can wash it for us.", vi: "Tôi cần gọi cho người dọn dẹp, để cô ấy có thể giặt nó cho chúng ta." },
            { speaker: "Liam", en: "We usually have our house cleaned every Saturday morning.", vi: "Chúng tôi thường thuê người dọn dẹp nhà cửa vào mỗi sáng thứ Bảy." },
            { speaker: "Mia", en: "Yes, because we are too busy, and housework takes a lot of time.", vi: "Đúng vậy, bởi vì chúng ta quá bận rộn, và việc nhà thì mất rất nhiều thời gian." },
            { speaker: "Liam", en: "I will try to fix the TV, while you call the cleaner.", vi: "Tôi sẽ cố gắng sửa tivi, trong khi bạn gọi cho người dọn dẹp." },
            { speaker: "Mia", en: "Good luck with that, because it looks very complicated to me.", vi: "Chúc may mắn với việc đó, bởi vì nó trông rất phức tạp đối với tôi." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 6, // Bài 7 (Mua sắm mở rộng)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Buying a Shirt",
          lines: [
            { speaker: "Tony", en: "Excuse me, how much does this shirt cost?", vi: "Xin lỗi, chiếc áo sơ mi này giá bao nhiêu?" },
            { speaker: "Jenny", en: "It costs twenty pounds, and it is our latest design.", vi: "Nó có giá hai mươi bảng, và đó là thiết kế mới nhất của chúng tôi." },
            { speaker: "Tony", en: "Could I try this on, please, because I really like the colour?", vi: "Tôi có thể mặc thử cái này được không, vì tôi thực sự thích màu sắc của nó?" },
            { speaker: "Jenny", en: "Of course, the fitting room is over there, so you can go inside.", vi: "Tất nhiên rồi, phòng thử đồ ở đằng kia, nên bạn có thể vào trong." },
            { speaker: "Tony", en: "It fits perfectly, so I will buy it immediately.", vi: "Nó vừa vặn hoàn hảo, vì vậy tôi sẽ mua nó ngay lập tức." },
            { speaker: "Jenny", en: "How much is the total bill, if I buy a tie too?", vi: "Tổng hóa đơn là bao nhiêu, nếu tôi mua thêm một chiếc cà vạt?" },
            { speaker: "Tony", en: "That will be thirty euros in total, which includes a discount.", vi: "Chỗ đó sẽ là tổng cộng ba mươi euro, mức giá này đã bao gồm giảm giá." },
            { speaker: "Jenny", en: "Can I pay by credit card, since I don't have enough cash?", vi: "Tôi có thể thanh toán bằng thẻ tín dụng không, vì tôi không có đủ tiền mặt?" }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "At the Cashier",
          lines: [
            { speaker: "Peter", en: "What is the price of that book, which is on the top shelf?", vi: "Giá của cuốn sách đó là bao nhiêu, cuốn ở trên kệ trên cùng ấy?" },
            { speaker: "Mary", en: "It is fifteen dollars, but you can get it for ten dollars today.", vi: "Nó có giá mười lăm đô la, nhưng bạn có thể mua nó với giá mười đô la vào hôm nay." },
            { speaker: "Peter", en: "Could I have a receipt, please, after I pay for this?", vi: "Tôi có thể xin hóa đơn được không, sau khi tôi thanh toán cho món này?" },
            { speaker: "Mary", en: "Certainly, here is your receipt, and you have fifty cents in change.", vi: "Chắc chắn rồi, đây là hóa đơn của bạn, và bạn có 50 xu tiền thừa." },
            { speaker: "Peter", en: "Can I also buy a plastic bag, because my hands are full?", vi: "Tôi có thể mua thêm một cái túi nilon không, vì tay tôi đang bận hết rồi?" },
            { speaker: "Mary", en: "It costs ten cents, but I will give it to you for free.", vi: "Nó có giá mười xu, nhưng tôi sẽ đưa nó cho bạn miễn phí." },
            { speaker: "Peter", en: "Thank you very much, because that is very kind of you.", vi: "Cảm ơn bạn rất nhiều, bởi vì bạn thật là tốt bụng." },
            { speaker: "Mary", en: "You are welcome, and please come back to our store again.", vi: "Không có gì, và xin hãy quay lại cửa hàng của chúng tôi lần nữa nhé." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 7, // Bài 8 (Cửa hàng & dịch vụ)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Finding a Pharmacy",
          lines: [
            { speaker: "Alex", en: "Excuse me, is there a pharmacy near here?", vi: "Xin lỗi, có hiệu thuốc nào gần đây không?" },
            { speaker: "Emma", en: "Yes, there is one across the street, which is next to the bank.", vi: "Có, có một cái ở bên kia đường, nằm cạnh ngân hàng." },
            { speaker: "Alex", en: "Where can I buy some medicine for my terrible headache?", vi: "Tôi có thể mua một ít thuốc cho cơn đau đầu tồi tệ của mình ở đâu?" },
            { speaker: "Emma", en: "You can find it at the pharmacy, but they are closed on Sundays.", vi: "Bạn có thể tìm thấy nó ở hiệu thuốc, nhưng họ đóng cửa vào các ngày Chủ nhật." },
            { speaker: "Alex", en: "I also need to find a butcher, because I want to buy meat.", vi: "Tôi cũng cần tìm một cửa hàng thịt, vì tôi muốn mua thịt." },
            { speaker: "Emma", en: "The butcher is far from here, so you should take a bus.", vi: "Cửa hàng thịt thì ở xa đây, vì vậy bạn nên bắt xe buýt." },
            { speaker: "Alex", en: "Thank you for your help, and I will go there right away.", vi: "Cảm ơn sự giúp đỡ của bạn, và tôi sẽ đến đó ngay lập tức." },
            { speaker: "Emma", en: "No problem, and I hope your headache gets better soon.", vi: "Không có gì, và tôi hy vọng cơn đau đầu của bạn sẽ sớm khỏe lại." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "A House for Sale",
          lines: [
            { speaker: "Liam", en: "Is that beautiful house for sale, or does someone live there?", vi: "Ngôi nhà đẹp đó có bán không, hay có ai đang sống ở đó rồi?" },
            { speaker: "Mia", en: "It is for sale, and many people are interested in buying it.", vi: "Nó đang được rao bán, và nhiều người đang quan tâm đến việc mua nó." },
            { speaker: "Liam", en: "Are those shoes on sale, because I want to buy a pair?", vi: "Những đôi giày đó có đang được giảm giá không, vì tôi muốn mua một đôi?" },
            { speaker: "Mia", en: "Yes, they are on sale, so they are very cheap today.", vi: "Vâng, chúng đang được giảm giá, nên hôm nay chúng rất rẻ." },
            { speaker: "Liam", en: "Where can I find a department store, since I want to go shopping?", vi: "Tôi có thể tìm cửa hàng bách hóa ở đâu, vì tôi muốn đi mua sắm?" },
            { speaker: "Mia", en: "There is a big department store near the post office.", vi: "Có một cửa hàng bách hóa lớn nằm gần bưu điện." },
            { speaker: "Liam", en: "I will visit it this afternoon, after I finish my work.", vi: "Tôi sẽ ghé thăm nó vào chiều nay, sau khi tôi làm xong việc." },
            { speaker: "Mia", en: "Have a good time, and remember to check the things on sale.", vi: "Chúc bạn có khoảng thời gian vui vẻ, và nhớ kiểm tra những món đồ đang giảm giá nhé." }
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

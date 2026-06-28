/**
 * SEED SCRIPT: KET Dialogue - Batch 1 (orderIndex 1, 2, 3)
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  {
    orderIndex: 1, // Bài 2 (Tính cách & cảm xúc mở rộng) - Grammar: so...that, such...that, intensifiers
    dialogues: [
      {
        content: JSON.stringify({
          title: "An Exhausting Day",
          lines: [
            { speaker: "Alex", en: "I had such a busy day that I couldn't even eat lunch.", vi: "Tôi đã có một ngày bận rộn đến nỗi tôi thậm chí không thể ăn trưa." },
            { speaker: "Emma", en: "You must be really tired, because you have been working since early morning.", vi: "Bạn hẳn là thực sự mệt mỏi, bởi vì bạn đã làm việc từ sáng sớm." },
            { speaker: "Alex", en: "Yes, I am so exhausted that I just want to go to bed immediately.", vi: "Đúng vậy, tôi quá kiệt sức đến nỗi tôi chỉ muốn đi ngủ ngay lập tức." },
            { speaker: "Emma", en: "You shouldn't work too hard, since health is the most valuable thing.", vi: "Bạn không nên làm việc quá sức, vì sức khỏe là điều quý giá nhất." },
            { speaker: "Alex", en: "My boss gave me such difficult tasks that I almost gave up.", vi: "Sếp của tôi đã giao cho tôi những nhiệm vụ khó đến nỗi tôi gần như đã bỏ cuộc." },
            { speaker: "Emma", en: "He is absolutely demanding, but I know you are very capable.", vi: "Ông ấy hoàn toàn khắt khe, nhưng tôi biết bạn rất có năng lực." },
            { speaker: "Alex", en: "I hope tomorrow will be easier, so I can finally relax a bit.", vi: "Tôi hy vọng ngày mai sẽ dễ dàng hơn, để tôi cuối cùng có thể thư giãn một chút." },
            { speaker: "Emma", en: "It will be a better day, and we can go out for a nice dinner together.", vi: "Đó sẽ là một ngày tốt hơn, và chúng ta có thể ra ngoài ăn một bữa tối ngon miệng cùng nhau." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "The New Colleague",
          lines: [
            { speaker: "Liam", en: "Have you met the new guy, who started working here yesterday?", vi: "Bạn đã gặp anh chàng mới, người bắt đầu làm việc ở đây hôm qua chưa?" },
            { speaker: "Mia", en: "Yes, I have, and he seems to be a very polite and friendly person.", vi: "Vâng, tôi gặp rồi, và anh ấy có vẻ là một người rất lịch sự và thân thiện." },
            { speaker: "Liam", en: "He speaks so quickly that it is sometimes hard to understand him.", vi: "Anh ấy nói nhanh đến nỗi đôi khi rất khó để hiểu anh ấy." },
            { speaker: "Mia", en: "He was extremely nervous, which is quite normal for the first day.", vi: "Anh ấy đã cực kỳ lo lắng, điều này khá bình thường cho ngày đầu tiên." },
            { speaker: "Liam", en: "He made such a good impression on the manager that she praised him.", vi: "Anh ấy đã tạo một ấn tượng tốt đến nỗi người quản lý đã khen ngợi anh ấy." },
            { speaker: "Mia", en: "I heard he is highly experienced, although he looks very young.", vi: "Tôi nghe nói anh ấy có bề dày kinh nghiệm, mặc dù anh ấy trông rất trẻ." },
            { speaker: "Liam", en: "We should invite him to lunch, so he can feel more welcome.", vi: "Chúng ta nên mời anh ấy đi ăn trưa, để anh ấy có thể cảm thấy được chào đón hơn." },
            { speaker: "Mia", en: "That is such a wonderful idea that I will ask him right now.", vi: "Đó là một ý tưởng tuyệt vời đến nỗi tôi sẽ đi hỏi anh ấy ngay bây giờ." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 2, // Bài 3 (Ngoại hình & thời trang) - Grammar: look like vs look, Passive, be wearing/have got on
    dialogues: [
      {
        content: JSON.stringify({
          title: "Shopping for Clothes",
          lines: [
            { speaker: "Tony", en: "This jacket looks very stylish, and it is made of pure leather.", vi: "Chiếc áo khoác này trông rất phong cách, và nó được làm bằng da thật." },
            { speaker: "Jenny", en: "It looks like a designer jacket, but I think it is quite expensive.", vi: "Nó trông giống như một chiếc áo khoác hàng hiệu, nhưng tôi nghĩ nó khá đắt." },
            { speaker: "Tony", en: "What are you wearing to the party, because it is a formal event?", vi: "Bạn sẽ mặc gì đến bữa tiệc, vì đó là một sự kiện trang trọng?" },
            { speaker: "Jenny", en: "I am wearing a black dress, which was bought in Paris last year.", vi: "Tôi sẽ mặc một chiếc váy đen, cái mà đã được mua ở Paris năm ngoái." },
            { speaker: "Tony", en: "That sounds beautiful, so you will definitely look amazing tonight.", vi: "Nghe có vẻ đẹp đấy, vì vậy bạn chắc chắn sẽ trông tuyệt vời tối nay." },
            { speaker: "Jenny", en: "What have you got on right now, since you look very casual?", vi: "Bạn đang mặc gì trên người lúc này vậy, vì bạn trông rất giản dị?" },
            { speaker: "Tony", en: "I have got on my old jeans, which are made of strong denim.", vi: "Tôi đang mặc chiếc quần jean cũ, thứ được làm bằng vải denim chắc chắn." },
            { speaker: "Jenny", en: "You should change your clothes, otherwise they won't let you inside.", vi: "Bạn nên thay quần áo đi, nếu không họ sẽ không cho bạn vào trong đâu." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "A Familiar Face",
          lines: [
            { speaker: "Peter", en: "That woman over there looks like my aunt, who lives in London.", vi: "Người phụ nữ đằng kia trông giống dì của tôi, người sống ở London." },
            { speaker: "Mary", en: "She looks very elegant, and she is wearing a beautiful silk scarf.", vi: "Cô ấy trông rất thanh lịch, và cô ấy đang quàng một chiếc khăn lụa đẹp." },
            { speaker: "Peter", en: "Her shoes are made of leather, which matches her handbag perfectly.", vi: "Đôi giày của cô ấy được làm bằng da, cái mà hoàn toàn phù hợp với túi xách của cô ấy." },
            { speaker: "Mary", en: "What has she got on her wrist, because it shines very brightly?", vi: "Cô ấy đang đeo gì trên cổ tay vậy, vì nó tỏa sáng rất rực rỡ?" },
            { speaker: "Peter", en: "It looks like a gold bracelet, which was probably a gift.", vi: "Nó trông giống một chiếc vòng tay vàng, thứ có lẽ là một món quà." },
            { speaker: "Mary", en: "She looks exhausted, although she is dressed so well.", vi: "Cô ấy trông có vẻ kiệt sức, mặc dù cô ấy ăn mặc rất đẹp." },
            { speaker: "Peter", en: "Let's go and ask her, so we can see if she needs help.", vi: "Hãy đi và hỏi cô ấy, để chúng ta có thể xem cô ấy có cần giúp đỡ không." },
            { speaker: "Mary", en: "Yes, we should do that, because it is the right thing to do.", vi: "Vâng, chúng ta nên làm vậy, bởi vì đó là việc đúng đắn nên làm." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 3, // Bài 4 (Nhà cửa & nội thất) - Grammar: Passive present, need V-ing, have got
    dialogues: [
      {
        content: JSON.stringify({
          title: "Cleaning the House",
          lines: [
            { speaker: "Alex", en: "This apartment is cleaned every week, but it still looks quite messy.", vi: "Căn hộ này được dọn dẹp mỗi tuần, nhưng nó trông vẫn khá bừa bộn." },
            { speaker: "Emma", en: "The carpet needs washing, and the windows are extremely dirty too.", vi: "Tấm thảm cần được giặt, và những cái cửa sổ cũng cực kỳ bẩn." },
            { speaker: "Alex", en: "Have we got any cleaning liquid, because I want to start now?", vi: "Chúng ta có dung dịch tẩy rửa nào không, vì tôi muốn bắt đầu ngay bây giờ?" },
            { speaker: "Emma", en: "We haven't got any left, so I need to go to the supermarket.", vi: "Chúng ta không còn một chút nào, nên tôi cần phải đi siêu thị." },
            { speaker: "Alex", en: "The heating is turned on automatically, which makes the room very warm.", vi: "Lò sưởi được bật tự động, điều này làm cho căn phòng rất ấm áp." },
            { speaker: "Emma", en: "However, the air conditioner needs fixing, since it makes a loud noise.", vi: "Tuy nhiên, máy điều hòa cần được sửa chữa, vì nó phát ra tiếng ồn lớn." },
            { speaker: "Alex", en: "I will call the mechanic tomorrow, so he can check it for us.", vi: "Tôi sẽ gọi thợ sửa chữa vào ngày mai, để anh ấy có thể kiểm tra nó cho chúng ta." },
            { speaker: "Emma", en: "That is a great plan, and I will start cleaning the kitchen now.", vi: "Đó là một kế hoạch tuyệt vời, và tôi sẽ bắt đầu dọn dẹp nhà bếp ngay bây giờ." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Looking for a Flat",
          lines: [
            { speaker: "Liam", en: "Has this flat got a balcony, because I love sitting outside?", vi: "Căn hộ này có ban công không, vì tôi rất thích ngồi bên ngoài?" },
            { speaker: "Mia", en: "No, it hasn't got a balcony, but it has a very large garden.", vi: "Không, nó không có ban công, nhưng nó có một khu vườn rất rộng." },
            { speaker: "Liam", en: "The garden needs clearing, since there are too many dead leaves.", vi: "Khu vườn cần được dọn dẹp, vì có quá nhiều lá khô." },
            { speaker: "Mia", en: "Don't worry, the grass is cut by the gardener every two weeks.", vi: "Đừng lo, cỏ được người làm vườn cắt mỗi hai tuần một lần." },
            { speaker: "Liam", en: "Has it got a modern kitchen, which is very important for me?", vi: "Nó có một nhà bếp hiện đại không, điều mà rất quan trọng đối với tôi?" },
            { speaker: "Mia", en: "Yes, dinner is easily cooked here, because all equipment is brand new.", vi: "Vâng, bữa tối được nấu dễ dàng ở đây, vì mọi thiết bị đều mới tinh." },
            { speaker: "Liam", en: "The bedroom walls need painting, but I can do that myself.", vi: "Các bức tường phòng ngủ cần được sơn lại, nhưng tôi có thể tự làm việc đó." },
            { speaker: "Mia", en: "I think this is a perfect home, so you should sign the contract.", vi: "Tôi nghĩ đây là một ngôi nhà hoàn hảo, vì vậy bạn nên ký hợp đồng." }
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

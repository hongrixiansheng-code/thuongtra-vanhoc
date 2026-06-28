/**
 * SEED SCRIPT: PET Grammar — 25 bài
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = [
  {
    lesson: 1, title: "Present Simple vs Present Continuous", desc: "So sánh hiện tại đơn và hiện tại tiếp diễn.",
    formula: "I work every day. vs I am working now.",
    practiceList: [
      { vi: "Tôi chơi tennis vào mỗi Chủ nhật.", en: "I play tennis every Sunday." },
      { vi: "Tôi đang chơi tennis ngay bây giờ.", en: "I am playing tennis right now." },
      { vi: "Cô ấy luôn luôn dậy sớm.", en: "She always gets up early." }
    ]
  },
  {
    lesson: 2, title: "State Verbs", desc: "Động từ chỉ trạng thái (không dùng với thì tiếp diễn).",
    formula: "believe, know, like, love, hate, want...",
    practiceList: [
      { vi: "Tôi biết câu trả lời.", en: "I know the answer." },
      { vi: "Anh ấy thích sô-cô-la.", en: "He likes chocolate." },
      { vi: "Bạn có hiểu không?", en: "Do you understand?" }
    ]
  },
  {
    lesson: 3, title: "Past Simple vs Past Continuous", desc: "So sánh quá khứ đơn và quá khứ tiếp diễn.",
    formula: "I watched TV yesterday. vs I was watching TV when he called.",
    practiceList: [
      { vi: "Tôi đang ngủ thì điện thoại reo.", en: "I was sleeping when the phone rang." },
      { vi: "Chúng tôi đã chơi bóng đá ngày hôm qua.", en: "We played football yesterday." },
      { vi: "Cô ấy đang đọc sách lúc 8 giờ tối qua.", en: "She was reading a book at 8 PM last night." }
    ]
  },
  {
    lesson: 4, title: "Present Perfect (Experience)", desc: "Hiện tại hoàn thành diễn tả trải nghiệm.",
    formula: "have/has + V3/ed (ever, never)",
    practiceList: [
      { vi: "Tôi đã từng đến Nhật Bản.", en: "I have been to Japan." },
      { vi: "Bạn đã bao giờ ăn sushi chưa?", en: "Have you ever eaten sushi?" },
      { vi: "Cô ấy chưa bao giờ nhìn thấy tuyết.", en: "She has never seen snow." }
    ]
  },
  {
    lesson: 5, title: "Present Perfect with just, already, yet", desc: "Hiện tại hoàn thành với just, already, yet.",
    formula: "I have just finished. I have already eaten. I haven't finished yet.",
    practiceList: [
      { vi: "Tôi vừa mới dọn xong phòng.", en: "I have just cleaned my room." },
      { vi: "Chúng tôi đã ăn tối rồi.", en: "We have already eaten dinner." },
      { vi: "Họ vẫn chưa đến.", en: "They haven't arrived yet." }
    ]
  },
  {
    lesson: 6, title: "Present Perfect vs Past Simple", desc: "So sánh hiện tại hoàn thành và quá khứ đơn.",
    formula: "I have lost my key (I don't have it now). vs I lost my key yesterday.",
    practiceList: [
      { vi: "Tôi đã làm mất chìa khóa (bây giờ vẫn chưa tìm thấy).", en: "I have lost my key." },
      { vi: "Tôi đã làm mất chìa khóa hôm qua.", en: "I lost my key yesterday." },
      { vi: "Cô ấy đã làm việc ở đây từ năm 2010.", en: "She has worked here since 2010." }
    ]
  },
  {
    lesson: 7, title: "Future Forms (will, be going to, present continuous)", desc: "Các thì tương lai.",
    formula: "I will help you. / I am going to buy a car. / I am flying tomorrow.",
    practiceList: [
      { vi: "Tôi sẽ giúp bạn mang cái túi này.", en: "I will help you carry this bag." },
      { vi: "Nhìn những đám mây đen kìa. Trời sắp mưa rồi.", en: "Look at those black clouds. It is going to rain." },
      { vi: "Tôi sẽ gặp bác sĩ vào ngày mai.", en: "I am seeing the doctor tomorrow." }
    ]
  },
  {
    lesson: 8, title: "Modals of Ability (can, could, be able to)", desc: "Động từ khuyết thiếu chỉ khả năng.",
    formula: "can / could / will be able to",
    practiceList: [
      { vi: "Tôi có thể bơi.", en: "I can swim." },
      { vi: "Khi tôi còn nhỏ, tôi không thể bơi.", en: "When I was young, I could not swim." },
      { vi: "Tôi sẽ có thể giúp bạn vào ngày mai.", en: "I will be able to help you tomorrow." }
    ]
  },
  {
    lesson: 9, title: "Modals of Obligation (must, have to, should)", desc: "Động từ khuyết thiếu chỉ sự bắt buộc và lời khuyên.",
    formula: "must / have to / should",
    practiceList: [
      { vi: "Bạn phải mặc đồng phục.", en: "You must wear a uniform." },
      { vi: "Tôi phải thức dậy sớm vào ngày mai.", en: "I have to get up early tomorrow." },
      { vi: "Bạn nên đi ngủ sớm.", en: "You should go to bed early." }
    ]
  },
  {
    lesson: 10, title: "Zero & First Conditionals", desc: "Câu điều kiện loại 0 và loại 1.",
    formula: "If + present simple, present simple. / If + present simple, will + V.",
    practiceList: [
      { vi: "Nếu bạn đun sôi nước, nó sẽ bốc hơi.", en: "If you boil water, it turns into steam." },
      { vi: "Nếu trời mưa, tôi sẽ ở nhà.", en: "If it rains, I will stay at home." },
      { vi: "Nếu tôi có tiền, tôi sẽ mua một chiếc xe máy.", en: "If I have money, I will buy a motorcycle." }
    ]
  },
  {
    lesson: 11, title: "Second Conditional", desc: "Câu điều kiện loại 2 (trái với thực tế hiện tại).",
    formula: "If + past simple, would/could + V.",
    practiceList: [
      { vi: "Nếu tôi là bạn, tôi sẽ không làm điều đó.", en: "If I were you, I would not do that." },
      { vi: "Nếu tôi có một triệu đô la, tôi sẽ đi du lịch vòng quanh thế giới.", en: "If I had a million dollars, I would travel the world." },
      { vi: "Nếu cô ấy biết số của anh ấy, cô ấy sẽ gọi điện.", en: "If she knew his number, she would call." }
    ]
  },
  {
    lesson: 12, title: "Passive Voice (Present & Past Simple)", desc: "Câu bị động (Hiện tại & Quá khứ đơn).",
    formula: "S + is/are/was/were + V3/ed + (by O).",
    practiceList: [
      { vi: "Ngôi nhà này được xây vào năm 1990.", en: "This house was built in 1990." },
      { vi: "Bức thư được viết bởi Mary.", en: "The letter was written by Mary." },
      { vi: "Phô mai được làm từ sữa.", en: "Cheese is made from milk." }
    ]
  },
  {
    lesson: 13, title: "Passive Voice (Present Perfect & Future)", desc: "Câu bị động (Hiện tại hoàn thành & Tương lai đơn).",
    formula: "S + have/has been + V3/ed. / S + will be + V3/ed.",
    practiceList: [
      { vi: "Công việc đã được hoàn thành.", en: "The work has been completed." },
      { vi: "Căn phòng sẽ được dọn dẹp vào ngày mai.", en: "The room will be cleaned tomorrow." },
      { vi: "Máy tính của tôi đã được sửa.", en: "My computer has been repaired." }
    ]
  },
  {
    lesson: 14, title: "Reported Speech (Statements)", desc: "Câu tường thuật (Câu kể).",
    formula: "He said (that) he was tired.",
    practiceList: [
      { vi: "Anh ấy nói rằng anh ấy đang mệt.", en: "He said that he was tired." },
      { vi: "Cô ấy nói với tôi rằng cô ấy sẽ đến.", en: "She told me that she would come." },
      { vi: "Họ nói rằng họ đã sống ở đây 10 năm.", en: "They said they had lived here for 10 years." }
    ]
  },
  {
    lesson: 15, title: "Reported Speech (Questions)", desc: "Câu tường thuật (Câu hỏi).",
    formula: "He asked me if I liked tea. / He asked where I lived.",
    practiceList: [
      { vi: "Anh ấy hỏi tôi có thích trà không.", en: "He asked me if I liked tea." },
      { vi: "Cô ấy hỏi tôi sống ở đâu.", en: "She asked me where I lived." },
      { vi: "Họ hỏi tôi mấy giờ rồi.", en: "They asked me what time it was." }
    ]
  },
  {
    lesson: 16, title: "Relative Clauses (Defining)", desc: "Mệnh đề quan hệ xác định.",
    formula: "The man who/that lives next door is a doctor.",
    practiceList: [
      { vi: "Người đàn ông sống cạnh nhà là một bác sĩ.", en: "The man who lives next door is a doctor." },
      { vi: "Cuốn sách mà bạn cho tôi mượn rất hay.", en: "The book which you lent me is very good." },
      { vi: "Đây là ngôi nhà nơi tôi sinh ra.", en: "This is the house where I was born." }
    ]
  },
  {
    lesson: 17, title: "Relative Clauses (Non-defining)", desc: "Mệnh đề quan hệ không xác định.",
    formula: "My brother, who lives in London, is a teacher.",
    practiceList: [
      { vi: "Anh trai tôi, người sống ở London, là một giáo viên.", en: "My brother, who lives in London, is a teacher." },
      { vi: "Chiếc xe hơi của tôi, thứ mà tôi mới mua tuần trước, đã bị hỏng.", en: "My car, which I bought last week, has broken down." },
      { vi: "Ông Smith, người mà tôi làm việc cùng, rất tốt bụng.", en: "Mr. Smith, who I work with, is very kind." }
    ]
  },
  {
    lesson: 18, title: "Gerunds and Infinitives 1", desc: "Danh động từ và Động từ nguyên thể.",
    formula: "enjoy doing, want to do",
    practiceList: [
      { vi: "Tôi thích đọc sách.", en: "I enjoy reading." },
      { vi: "Cô ấy muốn học tiếng Tây Ban Nha.", en: "She wants to learn Spanish." },
      { vi: "Chúng tôi đã quyết định đi.", en: "We decided to go." }
    ]
  },
  {
    lesson: 19, title: "Gerunds and Infinitives 2", desc: "Các trường hợp đặc biệt của V-ing và To V.",
    formula: "stop doing vs stop to do",
    practiceList: [
      { vi: "Tôi đã ngừng hút thuốc.", en: "I stopped smoking." },
      { vi: "Tôi đã dừng lại để mua báo.", en: "I stopped to buy a newspaper." },
      { vi: "Đừng quên khóa cửa nhé.", en: "Don't forget to lock the door." }
    ]
  },
  {
    lesson: 20, title: "Comparatives and Superlatives", desc: "So sánh hơn và so sánh nhất.",
    formula: "older than / the oldest / more beautiful than / the most beautiful",
    practiceList: [
      { vi: "Anh ấy cao hơn tôi.", en: "He is taller than me." },
      { vi: "Đây là cuốn sách thú vị nhất.", en: "This is the most interesting book." },
      { vi: "Nước Nga là quốc gia lớn nhất thế giới.", en: "Russia is the largest country in the world." }
    ]
  },
  {
    lesson: 21, title: "Too and Enough", desc: "Cấu trúc Too và Enough.",
    formula: "too + adj / adj + enough",
    practiceList: [
      { vi: "Trời quá lạnh để đi bơi.", en: "It is too cold to go swimming." },
      { vi: "Anh ấy không đủ cao để chơi bóng rổ.", en: "He is not tall enough to play basketball." },
      { vi: "Tôi không có đủ tiền.", en: "I don't have enough money." }
    ]
  },
  {
    lesson: 22, title: "So and Such", desc: "Cấu trúc So và Such.",
    formula: "so + adj/adv / such + (a/an) + adj + noun",
    practiceList: [
      { vi: "Trời rất lạnh.", en: "It is so cold." },
      { vi: "Họ là những người rất tử tế.", en: "They are such kind people." },
      { vi: "Bộ phim chán đến nỗi tôi đã ngủ gật.", en: "The movie was so boring that I fell asleep." }
    ]
  },
  {
    lesson: 23, title: "Used to", desc: "Cấu trúc Used to (thói quen trong quá khứ).",
    formula: "used to + V",
    practiceList: [
      { vi: "Tôi đã từng sống ở London.", en: "I used to live in London." },
      { vi: "Cô ấy không từng thích tôi.", en: "She didn't use to like me." },
      { vi: "Bạn có từng chơi đá bóng không?", en: "Did you use to play football?" }
    ]
  },
  {
    lesson: 24, title: "Question Tags", desc: "Câu hỏi đuôi.",
    formula: "You are a student, aren't you?",
    practiceList: [
      { vi: "Bạn là sinh viên, đúng không?", en: "You are a student, aren't you?" },
      { vi: "Anh ấy không đến, phải không?", en: "He didn't come, did he?" },
      { vi: "Chúng ta có thể đi ngay bây giờ, được chứ?", en: "We can go now, can't we?" }
    ]
  },
  {
    lesson: 25, title: "Prepositions of Time and Place", desc: "Giới từ chỉ thời gian và nơi chốn (in, on, at).",
    formula: "in 2020, on Monday, at 8 o'clock / in London, on the table, at the bus stop",
    practiceList: [
      { vi: "Tôi sinh ra vào tháng 5.", en: "I was born in May." },
      { vi: "Chúng ta sẽ gặp nhau vào thứ Hai.", en: "We will meet on Monday." },
      { vi: "Cô ấy đang đợi ở trạm xe buýt.", en: "She is waiting at the bus stop." }
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

  for (const item of GRAMMAR_DATA) {
    let targetLesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!targetLesson) continue;

    const contentJson = JSON.stringify({
      id: `pet-grammar-${item.lesson}`,
      title: item.title,
      desc: item.desc,
      formula: item.formula,
      practiceList: item.practiceList
    });

    const existing = await prisma.lessonContent.findFirst({
      where: {
        lessonId: targetLesson.id,
        contentType: 'GRAMMAR'
      }
    });

    if (!existing) {
      await prisma.lessonContent.create({
        data: { lessonId: targetLesson.id, contentType: 'GRAMMAR', content: contentJson }
      });
      successCount++;
      console.log(`✅ Đã thêm ngữ pháp: ${item.title} (Bài ${item.lesson})`);
    } else {
      await prisma.lessonContent.update({
        where: { id: existing.id },
        data: { content: contentJson }
      });
      console.log(`🔄 Đã cập nhật ngữ pháp: ${item.title} (Bài ${item.lesson})`);
    }
  }

  console.log(`\n🎉 Hoàn thành nạp ${successCount} chủ điểm ngữ pháp cho PET!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

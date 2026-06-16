/**
 * SEED SCRIPT: YLE Movers Grammar (25 Bài)
 * Chạy từ thư mục gốc: node seed-yle-movers-grammar.js
 */
const { PrismaClient } = require('./packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = [
  // Phần 1: Gia đình, Bản thân & Đời sống
  {
    lesson: 1, 
    title: "Mệnh đề quan hệ với WHO", 
    explanation: "Chúng ta dùng từ 'who' (người mà) để cung cấp thêm thông tin về một người nào đó mà không cần phải nhắc lại tên người đó.", 
    structure: "... danh từ chỉ người + WHO + động từ + ...", 
    examples: [
      {en: "The boy who is playing football is my brother.", vi: "Cậu bé người mà đang chơi bóng đá là anh trai tớ."}, 
      {en: "That is the girl who helped me.", vi: "Đó là cô bé người mà đã giúp tớ."}
    ]
  },
  {
    lesson: 2, 
    title: "Trật tự Tính từ miêu tả", 
    explanation: "Khi có nhiều tính từ miêu tả cùng đứng trước một danh từ, ta sắp xếp theo thứ tự: Kích cỡ (Size) -> Hình dáng (Shape) -> Tuổi/Mới Cũ (Age) -> Màu sắc (Color).", 
    structure: "Kích cỡ + Hình dáng + Tuổi/Cũ mới + Màu sắc + Danh từ", 
    examples: [
      {en: "She has long straight blonde hair.", vi: "Cô ấy có mái tóc dài, thẳng và màu vàng."}, 
      {en: "It is a big old black dog.", vi: "Đó là một con chó to, già và màu đen."}
    ]
  },
  {
    lesson: 3, 
    title: "Hỏi đáp về tình trạng sức khỏe", 
    explanation: "Để hỏi xem ai đó đang bị làm sao (đặc biệt là vấn đề sức khỏe), ta dùng câu hỏi 'What's the matter?'.", 
    structure: "Hỏi: What's the matter (with you/him/her)?\nĐáp: I have a / He has a + [tên bệnh]", 
    examples: [
      {en: "What's the matter with you? - I have a headache.", vi: "Bạn bị sao vậy? - Mình bị đau đầu."}, 
      {en: "What's the matter with him? - He has a cold.", vi: "Cậu ấy bị sao vậy? - Cậu ấy bị cảm lạnh."}
    ]
  },
  {
    lesson: 4, 
    title: "So sánh hơn của Tính từ (Comparatives)", 
    explanation: "Chúng ta dùng so sánh hơn để so sánh đặc điểm của hai người hoặc hai vật với nhau. Thêm '-er' vào sau tính từ ngắn và thêm 'more' trước tính từ dài.", 
    structure: "S1 + be + tính từ ngắn-er / more + tính từ dài + THAN + S2", 
    examples: [
      {en: "A lion is bigger than a monkey.", vi: "Một con sư tử thì to hơn một con khỉ."}, 
      {en: "Dolphins are more intelligent than sharks.", vi: "Cá heo thì thông minh hơn cá mập."}
    ]
  },
  {
    lesson: 5, 
    title: "So sánh nhất của Tính từ (Superlatives)", 
    explanation: "Chúng ta dùng so sánh nhất để so sánh một người hoặc một vật với toàn bộ nhóm (từ 3 đối tượng trở lên). Thêm 'the' trước tính từ và '-est' hoặc 'most'.", 
    structure: "S + be + THE + tính từ ngắn-est / most + tính từ dài", 
    examples: [
      {en: "The whale is the biggest animal in the sea.", vi: "Cá voi là động vật lớn nhất dưới biển."}, 
      {en: "This is the most beautiful horse.", vi: "Đây là con ngựa đẹp nhất."}
    ]
  },

  // Phần 2: Ẩm thực & Quần áo
  {
    lesson: 6, 
    title: "Some và Any (Một vài / Bất cứ)", 
    explanation: "Dùng 'some' cho câu khẳng định. Dùng 'any' cho câu phủ định và câu hỏi. Chúng thường đứng trước danh từ không đếm được hoặc danh từ đếm được số nhiều.", 
    structure: "Khẳng định: S + V + SOME + N\nPhủ định/Nghi vấn: S + V + ANY + N", 
    examples: [
      {en: "I have some cheese and some apples.", vi: "Mình có một chút pho mát và vài quả táo."}, 
      {en: "Do you have any milk? - I don't have any milk.", vi: "Bạn có chút sữa nào không? - Mình không có chút sữa nào."}
    ]
  },
  {
    lesson: 7, 
    title: "Lời mời và Yêu cầu với 'Would like'", 
    explanation: "Dùng 'would like' để đưa ra lời mời một cách lịch sự hoặc nói về điều mình muốn.", 
    structure: "Mời: Would you like + Danh từ / to V?\nMuốn: I would like (I'd like) + Danh từ / to V", 
    examples: [
      {en: "Would you like a cup of tea?", vi: "Bạn có muốn một tách trà không?"}, 
      {en: "I'd like some chocolate ice cream, please.", vi: "Cho tớ xin một ít kem sô-cô-la."}
    ]
  },
  {
    lesson: 8, 
    title: "Đại từ Sở hữu (Possessive Pronouns)", 
    explanation: "Đại từ sở hữu dùng để thay thế cho tính từ sở hữu + danh từ đã được nhắc đến trước đó để tránh lặp từ (ví dụ: my book -> mine).", 
    structure: "mine (của tôi), yours (của bạn), his (của anh ấy), hers (của cô ấy), ours (của chúng ta), theirs (của họ)", 
    examples: [
      {en: "This coat is mine. That one is yours.", vi: "Chiếc áo khoác này là của tớ. Chiếc kia là của cậu."}, 
      {en: "Are these socks his or hers?", vi: "Những chiếc tất này là của cậu ấy hay cô ấy?"}
    ]
  },
  {
    lesson: 9, 
    title: "Giới từ chỉ Vị trí (Nâng cao)", 
    explanation: "Chúng ta học thêm một số giới từ để mô tả chính xác vị trí của đồ vật hoặc nơi chốn trong nhà.", 
    structure: "above (ở trên cao), below (ở phía dưới), opposite (đối diện), near (gần), next to (bên cạnh)", 
    examples: [
      {en: "The clock is above the door.", vi: "Chiếc đồng hồ nằm ở phía trên cánh cửa."}, 
      {en: "My bedroom is opposite the bathroom.", vi: "Phòng ngủ của mình đối diện phòng tắm."}
    ]
  },
  {
    lesson: 10, 
    title: "Cấu trúc Chất liệu 'Made of'", 
    explanation: "Dùng 'made of' để diễn tả một đồ vật được làm từ chất liệu gì (gỗ, thủy tinh, nhựa, kim loại...).", 
    structure: "S + be + made of + Chất liệu (wood, glass, plastic, metal...)", 
    examples: [
      {en: "The window is made of glass.", vi: "Cửa sổ được làm bằng thủy tinh."}, 
      {en: "This table is made of wood.", vi: "Cái bàn này được làm bằng gỗ."}
    ]
  },

  // Phần 3: Thị trấn, Giao thông & Thời gian
  {
    lesson: 11, 
    title: "Động từ khuyết thiếu 'Must' và 'Mustn't'", 
    explanation: "Dùng 'must' để nói về một việc bắt buộc phải làm. Dùng 'mustn't' (must not) để cấm đoán, không được phép làm gì.", 
    structure: "S + must / mustn't + Động từ nguyên thể", 
    examples: [
      {en: "You must be quiet in the library.", vi: "Bạn phải giữ yên lặng trong thư viện."}, 
      {en: "You mustn't run in the hospital.", vi: "Bạn không được phép chạy trong bệnh viện."}
    ]
  },
  {
    lesson: 12, 
    title: "Câu mệnh lệnh chỉ đường", 
    explanation: "Chúng ta dùng động từ nguyên thể đứng đầu câu để chỉ đường hoặc hướng dẫn ai đó di chuyển.", 
    structure: "Go straight on (Đi thẳng)\nTurn left / right (Rẽ trái / phải)\nStop at... (Dừng lại ở...)", 
    examples: [
      {en: "Go straight on, then turn left at the corner.", vi: "Hãy đi thẳng, sau đó rẽ trái ở góc đường."}, 
      {en: "The bank is on your right.", vi: "Ngân hàng nằm ở bên phải của bạn."}
    ]
  },
  {
    lesson: 13, 
    title: "Giới từ chỉ Phương tiện giao thông", 
    explanation: "Chúng ta thường dùng giới từ 'by' đứng trước tên phương tiện. Tuy nhiên, khi đi bộ ta dùng 'on foot'.", 
    structure: "by bus / by car / by plane / by boat / by train\nNhưng: on foot (đi bộ)", 
    examples: [
      {en: "I go to school by bus.", vi: "Tớ đi học bằng xe buýt."}, 
      {en: "My dad travels to work on foot.", vi: "Bố tớ đi bộ đi làm."}
    ]
  },
  {
    lesson: 14, 
    title: "Giới từ chỉ Thời gian: IN, ON, AT", 
    explanation: "Quy tắc: IN + tháng/năm/buổi trong ngày; ON + ngày trong tuần/ngày lễ; AT + giờ cụ thể/weekend/night.", 
    structure: "IN: in the morning, in May, in 2023\nON: on Monday, on my birthday\nAT: at 7 o'clock, at night, at the weekend", 
    examples: [
      {en: "I play football on Saturday.", vi: "Tớ chơi bóng đá vào thứ Bảy."}, 
      {en: "She wakes up at 6 o'clock in the morning.", vi: "Cô ấy thức dậy lúc 6 giờ vào buổi sáng."}
    ]
  },
  {
    lesson: 15, 
    title: "Hỏi và đáp về Thời tiết", 
    explanation: "Để hỏi về thời tiết, ta dùng câu hỏi 'What is the weather like?'. Câu trả lời thường bắt đầu bằng 'It is' + tính từ chỉ thời tiết.", 
    structure: "Hỏi: What is the weather like?\nĐáp: It is + sunny / rainy / cloudy / windy / snowy / hot / cold", 
    examples: [
      {en: "What's the weather like today? - It's sunny and hot.", vi: "Thời tiết hôm nay thế nào? - Trời nắng và nóng."}, 
      {en: "It was rainy yesterday.", vi: "Hôm qua trời đã có mưa."}
    ]
  },

  // Phần 4: Trường học, Thể thao & Nghề nghiệp
  {
    lesson: 16, 
    title: "Quá khứ đơn của động từ TO BE", 
    explanation: "Khi nói về sự việc trong quá khứ, động từ 'to be' (am/is/are) chuyển thành 'was' (cho số ít) hoặc 'were' (cho số nhiều).", 
    structure: "I/He/She/It + was (wasn't)\nYou/We/They + were (weren't)", 
    examples: [
      {en: "I was at school yesterday.", vi: "Hôm qua tớ đã ở trường."}, 
      {en: "They weren't in the classroom.", vi: "Họ đã không có mặt trong phòng học."}
    ]
  },
  {
    lesson: 17, 
    title: "Thì Quá khứ đơn: Động từ có quy tắc", 
    explanation: "Để diễn tả hành động đã xảy ra và kết thúc trong quá khứ, với động từ có quy tắc, ta chỉ cần thêm đuôi '-ed' vào sau động từ.", 
    structure: "S + V-ed + ... (ví dụ: played, jumped, watched, walked)", 
    examples: [
      {en: "I played football with my friends last weekend.", vi: "Tớ đã chơi bóng đá với bạn bè vào cuối tuần trước."}, 
      {en: "She watched a good match on TV.", vi: "Cô ấy đã xem một trận đấu hay trên TV."}
    ]
  },
  {
    lesson: 18, 
    title: "Thì Quá khứ đơn: Động từ bất quy tắc", 
    explanation: "Một số động từ khi chuyển sang quá khứ không thêm '-ed' mà biến đổi thành từ khác. Bạn cần học thuộc các từ này.", 
    structure: "go -> went\nsee -> saw\nhave -> had\nride -> rode", 
    examples: [
      {en: "I went to the cinema yesterday.", vi: "Hôm qua tớ đã đi rạp chiếu phim."}, 
      {en: "He saw a beautiful bird in the garden.", vi: "Cậu ấy đã nhìn thấy một chú chim đẹp trong vườn."}
    ]
  },
  {
    lesson: 19, 
    title: "Thì Tương lai gần với 'Be going to'", 
    explanation: "Dùng 'be going to' để nói về một kế hoạch, dự định chắc chắn sẽ làm trong tương lai.", 
    structure: "S + am / is / are + going to + Động từ nguyên thể", 
    examples: [
      {en: "I am going to be a doctor when I grow up.", vi: "Tớ dự định sẽ trở thành bác sĩ khi lớn lên."}, 
      {en: "My dad is going to buy a new car.", vi: "Bố tớ dự định sẽ mua một chiếc ô tô mới."}
    ]
  },
  {
    lesson: 20, 
    title: "Số thứ tự (Ordinal numbers)", 
    explanation: "Khác với số đếm (1, 2, 3), số thứ tự dùng để chỉ thứ bậc, ngày trong tháng hoặc tầng của tòa nhà.", 
    structure: "first (1st), second (2nd), third (3rd), fourth (4th), fifth (5th)...", 
    examples: [
      {en: "I live on the second floor.", vi: "Tớ sống ở tầng hai."}, 
      {en: "Today is the first of May.", vi: "Hôm nay là ngày mùng một tháng Năm."}
    ]
  },

  // Phần 5: Thế giới quanh ta & Cảm xúc
  {
    lesson: 21, 
    title: "Động từ nguyên thể chỉ Mục đích (To + V)", 
    explanation: "Để nói lý do TẠI SAO mình làm một việc gì đó, ta dùng 'to' cộng với động từ nguyên thể (có nghĩa là: để làm gì).", 
    structure: "S + V + ... + TO + Động từ nguyên thể", 
    examples: [
      {en: "I went to the forest to see the animals.", vi: "Tớ đã đi vào rừng để ngắm các loài động vật."}, 
      {en: "He uses a map to find the treasure.", vi: "Cậu ấy dùng bản đồ để tìm kho báu."}
    ]
  },
  {
    lesson: 22, 
    title: "Trạng từ chỉ Tần suất", 
    explanation: "Các trạng từ này dùng để nói xem bạn có thường xuyên làm một việc gì đó không. Chúng thường đứng TRƯỚC động từ thường và SAU động từ 'to be'.", 
    structure: "always (luôn luôn) > usually (thường thường) > sometimes (thỉnh thoảng) > never (không bao giờ)", 
    examples: [
      {en: "I always go to the beach in summer.", vi: "Tớ luôn luôn đi biển vào mùa hè."}, 
      {en: "It is usually hot in July.", vi: "Trời thường nóng vào tháng Bảy."}
    ]
  },
  {
    lesson: 23, 
    title: "Trạng từ chỉ Thể cách", 
    explanation: "Trạng từ thể cách cho biết một hành động được thực hiện NHƯ THẾ NÀO. Chúng ta thường thêm đuôi '-ly' vào sau tính từ để tạo thành trạng từ.", 
    structure: "quick -> quickly, slow -> slowly, careful -> carefully\nBất quy tắc: good -> well", 
    examples: [
      {en: "The turtle walks slowly.", vi: "Con rùa đi bộ một cách chậm chạp."}, 
      {en: "He plays the piano very well.", vi: "Anh ấy chơi đàn piano rất hay."}
    ]
  },
  {
    lesson: 24, 
    title: "Ôn tập Các từ để hỏi (WH- Questions)", 
    explanation: "Trong tiếng Anh có rất nhiều từ dùng để đặt câu hỏi. Mỗi từ sẽ dùng cho một mục đích tìm kiếm thông tin khác nhau.", 
    structure: "Who (Ai), What (Cái gì), Where (Ở đâu), When (Khi nào), Why (Tại sao), How (Như thế nào)", 
    examples: [
      {en: "Why are you sad? - Because I lost my book.", vi: "Tại sao cậu buồn? - Bởi vì tớ làm mất sách."}, 
      {en: "How do you feel today? - I feel excited.", vi: "Hôm nay cậu cảm thấy thế nào? - Tớ cảm thấy hào hứng."}
    ]
  },
  {
    lesson: 25, 
    title: "Câu Đề nghị và Rủ rê", 
    explanation: "Khi muốn rủ ai đó cùng làm việc gì, chúng ta có thể dùng các cấu trúc: Let's, How about hoặc Shall we.", 
    structure: "Let's + Động từ nguyên thể.\nHow about + V-ing?\nShall we + Động từ nguyên thể?", 
    examples: [
      {en: "Let's go to the cinema!", vi: "Chúng ta hãy cùng đi xem phim nhé!"}, 
      {en: "How about playing football?", vi: "Chơi bóng đá thì sao nhỉ?"}, 
      {en: "Shall we help her?", vi: "Chúng ta cùng giúp cô ấy nhé?"}
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

  for (const item of GRAMMAR_DATA) {
    const lesson = program.lessons.find(l => l.orderIndex === item.lesson);
    if (!lesson) {
      console.error(`❌ Không tìm thấy Lesson ${item.lesson} trong DB.`);
      continue;
    }

    const contentJson = JSON.stringify({
      title: item.title,
      explanation: item.explanation,
      structure: item.structure,
      examples: item.examples
    });

    const existing = await prisma.lessonContent.findFirst({
      where: {
        lessonId: lesson.id,
        contentType: 'GRAMMAR',
        content: { contains: `"title":"${item.title}"` }
      }
    });

    if (existing) {
      console.log(`⏭️  Grammar Bài ${item.lesson} ("${item.title}") đã tồn tại.`);
      continue;
    }

    await prisma.lessonContent.create({
      data: {
        lessonId: lesson.id,
        contentType: 'GRAMMAR',
        content: contentJson
      }
    });

    console.log(`✅ Đã thêm Grammar: Bài ${item.lesson} - ${item.title}`);
  }

  console.log('\n🎉 Hoàn thành nạp 25 chủ điểm Ngữ pháp Movers!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

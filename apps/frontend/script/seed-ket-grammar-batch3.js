/**
 * SEED SCRIPT: KET Grammar - Cụm 11,12,13,14 (Bài 21 -> 28)
 * orderIndex: 20 -> 27
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const GRAMMAR_DATA = {
  20: [ // Bài 21
    {
      title: "1. Động từ + V-ing vs To-V",
      desc: "Một số động từ theo sau bắt buộc phải dùng V-ing (gerund) hoặc To-V (infinitive).",
      formula: [
        { text: "Enjoy / Finish / Suggest + V-ing", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
        { text: "Decide / Want / Plan + to-V", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
      ],
      practiceList: [
        { correct: "I enjoy listening to classical music.", meaning: "Tôi thích nghe nhạc cổ điển." },
        { correct: "We decided to go to the exhibition.", meaning: "Chúng tôi đã quyết định đi xem triển lãm." },
        { correct: "She finished practising the piano.", meaning: "Cô ấy đã tập đàn piano xong." }
      ]
    },
    {
      title: "2. Thì Hiện tại hoàn thành (Have been to)",
      desc: "Ôn tập cấu trúc Have been to để hỏi/đáp về kinh nghiệm du lịch, tham quan.",
      formula: [ { text: "Have/Has + S + ever + been to + Nơi chốn?", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "Have you ever been to an opera?", meaning: "Bạn đã từng đi xem opera chưa?" },
        { correct: "I have never been to an art gallery.", meaning: "Tôi chưa từng đến một phòng trưng bày nghệ thuật." },
        { correct: "She has been to this museum twice.", meaning: "Cô ấy đã đến bảo tàng này hai lần." }
      ]
    },
    {
      title: "3. Hỏi về sở thích (What kind of...)",
      desc: "Mẫu câu để hỏi chi tiết hơn về thể loại yêu thích (nhạc, phim, sách).",
      formula: [ { text: "What kind of + Noun + do you like?", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" } ],
      practiceList: [
        { correct: "What kind of music do you like?", meaning: "Bạn thích thể loại nhạc nào?" },
        { correct: "I really like hip hop and rap.", meaning: "Tôi thực sự thích hip hop và rap." },
        { correct: "What kind of instrument does he play?", meaning: "Anh ấy chơi loại nhạc cụ nào?" }
      ]
    }
  ],
  21: [ // Bài 22
    {
      title: "1. Đưa ra ý kiến (Think that...)",
      desc: "Cách diễn đạt ý kiến cá nhân về một bộ phim, diễn viên hoặc sự kiện truyền thông.",
      formula: [ { text: "S + think(s) (that) + S + V", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "I think that the comedy was very funny.", meaning: "Tôi nghĩ rằng bộ phim hài đó rất vui." },
        { correct: "Do you think the main character is good?", meaning: "Bạn có nghĩ nhân vật chính là người tốt không?" },
        { correct: "She thinks that horror movies are scary.", meaning: "Cô ấy nghĩ phim kinh dị thì đáng sợ." }
      ]
    },
    {
      title: "2. Cụm từ 'Be on' (Đang chiếu)",
      desc: "Dùng để nói về một bộ phim hay chương trình truyền hình đang được phát sóng.",
      formula: [ { text: "S (phim/chương trình) + be + on + at/on + Kênh/Rạp", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "The film is on at the cinema.", meaning: "Bộ phim đang được chiếu tại rạp." },
        { correct: "What programme is on Channel 5 tonight?", meaning: "Chương trình gì đang chiếu trên kênh 5 tối nay?" },
        { correct: "The performance is on at 8 p.m.", meaning: "Buổi biểu diễn sẽ diễn ra lúc 8 giờ tối." }
      ]
    },
    {
      title: "3. Recommend / Suggest + V-ing",
      desc: "Đề xuất, giới thiệu ai đó nên xem/làm gì (sau Recommend và Suggest có thể dùng V-ing).",
      formula: [ { text: "S + recommend / suggest + V-ing", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" } ],
      practiceList: [
        { correct: "I suggest watching this action movie.", meaning: "Tôi đề nghị xem bộ phim hành động này." },
        { correct: "He recommended reading the review first.", meaning: "Anh ấy khuyên nên đọc bài đánh giá trước." },
        { correct: "I suggest we go to the cinema.", meaning: "Tôi đề nghị chúng ta đi xem phim." }
      ]
    }
  ],
  22: [ // Bài 23
    {
      title: "1. Khuyên bảo môi trường (Should)",
      desc: "Sử dụng 'should' để kêu gọi và khuyên bảo hành động vì lợi ích môi trường.",
      formula: [ { text: "We / People + should + V(nguyên thể)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" } ],
      practiceList: [
        { correct: "We should recycle more paper.", meaning: "Chúng ta nên tái chế nhiều giấy hơn." },
        { correct: "People should protect wildlife.", meaning: "Mọi người nên bảo vệ động vật hoang dã." },
        { correct: "We shouldn't cause pollution.", meaning: "Chúng ta không nên gây ra ô nhiễm." }
      ]
    },
    {
      title: "2. Câu điều kiện loại 1 (First Conditional)",
      desc: "Dùng để nói về điều kiện có thể xảy ra ở hiện tại hoặc tương lai (nhất là trong ngữ cảnh môi trường).",
      formula: [ { text: "If + S + V(hiện tại), S + will + V(nguyên thể)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" } ],
      practiceList: [
        { correct: "If we don't act, the environment will be damaged.", meaning: "Nếu chúng ta không hành động, môi trường sẽ bị phá hoại." },
        { correct: "If it rains, the rainforest will be saved.", meaning: "Nếu trời mưa, khu rừng nhiệt đới sẽ được cứu." },
        { correct: "We will protect the coast if we clean it up.", meaning: "Chúng ta sẽ bảo vệ được bờ biển nếu chúng ta dọn dẹp nó." }
      ]
    },
    {
      title: "3. Be made from vs Be made of",
      desc: "Be made of: chất liệu không đổi tính chất. Be made from: vật liệu gốc đã biến đổi hoàn toàn.",
      formula: [
        { text: "Be made of (gỗ thành bàn ghế)", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" },
        { text: "Be made from (gỗ thành giấy)", classes: "bg-red-100 text-red-700 border-red-300 font-bold" }
      ],
      practiceList: [
        { correct: "Paper is made from wood.", meaning: "Giấy được làm từ gỗ." },
        { correct: "This chair is made of wood.", meaning: "Chiếc ghế này được làm bằng gỗ." },
        { correct: "Glass is made from sand.", meaning: "Thủy tinh được làm từ cát." }
      ]
    }
  ],
  23: [ // Bài 24
    {
      title: "1. Cấu trúc Used to (Thói quen trong quá khứ)",
      desc: "Diễn tả một thói quen hoặc trạng thái đã từng xảy ra trong quá khứ nhưng nay không còn nữa.",
      formula: [ { text: "S + used to + V(nguyên thể)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "This factory used to make cars.", meaning: "Nhà máy này từng sản xuất ô tô." },
        { correct: "I used to go to that campsite.", meaning: "Tôi đã từng đi đến khu cắm trại đó." },
        { correct: "There didn't use to be a harbour here.", meaning: "Trước đây ở đây không có bến cảng nào." }
      ]
    },
    {
      title: "2. Bị động quá khứ (Tòa nhà, Lịch sử)",
      desc: "Rất hay dùng để nói về việc các công trình kiến trúc được xây dựng hoặc phát hiện vào thời gian nào.",
      formula: [ { text: "S (Công trình) + was/were + V(p.p)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" } ],
      practiceList: [
        { correct: "The cathedral was built in the 12th century.", meaning: "Nhà thờ lớn được xây dựng vào thế kỷ 12." },
        { correct: "The castle was destroyed in a fire.", meaning: "Tòa lâu đài đã bị phá hủy trong một trận hỏa hoạn." },
        { correct: "This stadium was opened last year.", meaning: "Sân vận động này được khánh thành năm ngoái." }
      ]
    },
    {
      title: "3. Hỏi khoảng cách (How far is it...?)",
      desc: "Dùng để hỏi xem khoảng cách từ nơi này đến nơi khác là bao xa.",
      formula: [ { text: "How far is it from + A + to + B?", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "How far is it from here to the coast?", meaning: "Từ đây đến bờ biển bao xa?" },
        { correct: "How far is it from the factory to the port?", meaning: "Từ nhà máy đến bến cảng bao xa?" },
        { correct: "It's not very far to the cathedral.", meaning: "Khoảng cách đến nhà thờ lớn không xa lắm." }
      ]
    }
  ],
  24: [ // Bài 25
    {
      title: "1. Liên từ tương phản A2+ (Although, However, Despite)",
      desc: "Although đi với mệnh đề. Despite đi với danh từ/V-ing. However đứng đầu câu mới.",
      formula: [
        { text: "Although + S + V, S + V", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
        { text: "Despite + Noun / V-ing, S + V", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" },
        { text: "S + V. However, S + V", classes: "bg-green-100 text-green-700 border-green-300 font-bold" }
      ],
      practiceList: [
        { correct: "Although it was raining, we went out.", meaning: "Mặc dù trời mưa, chúng tôi vẫn đi ra ngoài." },
        { correct: "Despite the rain, we went out.", meaning: "Bất chấp cơn mưa, chúng tôi đã đi ra ngoài." },
        { correct: "He is rich. However, he isn't happy.", meaning: "Ông ấy giàu có. Tuy nhiên, ông ấy không hạnh phúc." }
      ]
    },
    {
      title: "2. Tổng ôn Modal Verbs (Động từ khuyết thiếu)",
      desc: "Khả năng (Can/Could), Lời khuyên (Should), Bắt buộc (Must), Dự đoán (May/Might/Will).",
      formula: [ { text: "S + Modal Verb + V(nguyên thể)", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" } ],
      practiceList: [
        { correct: "You must finish this work immediately.", meaning: "Bạn phải hoàn thành công việc này ngay lập tức." },
        { correct: "He might not come tomorrow.", meaning: "Anh ấy có thể sẽ không đến vào ngày mai." },
        { correct: "Can you help me, please?", meaning: "Bạn có thể giúp tôi được không?" }
      ]
    },
    {
      title: "3. Trạng từ mức độ (Adverbs of degree)",
      desc: "Các trạng từ dùng để bổ sung ý nghĩa cho tính từ hoặc động từ (nhấn mạnh hoặc làm nhẹ đi).",
      formula: [ { text: "Trạng từ mức độ: quite, nearly, almost, certainly, probably", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" } ],
      practiceList: [
        { correct: "It will probably rain later.", meaning: "Trời có lẽ sẽ mưa lát nữa." },
        { correct: "He is certainly the best player.", meaning: "Anh ấy chắc chắn là người chơi giỏi nhất." },
        { correct: "I have nearly finished my homework.", meaning: "Tôi gần như đã hoàn thành bài tập về nhà." }
      ]
    }
  ],
  25: [ // Bài 26
    {
      title: "1. Tổng hợp câu tường thuật (Reported Speech)",
      desc: "Quy tắc chung khi tường thuật lại lời nói: Say (that) / Tell + O + (that) / Ask + if.",
      formula: [ { text: "S + say(s)/said + (that) + S + V(lùi thì)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" } ],
      practiceList: [
        { correct: "He explained that he was late.", meaning: "Anh ấy giải thích rằng anh ấy đã đến muộn." },
        { correct: "She told me that she liked the movie.", meaning: "Cô ấy nói với tôi rằng cô ấy thích bộ phim." },
        { correct: "They announced that the flight was delayed.", meaning: "Họ thông báo rằng chuyến bay bị hoãn." }
      ]
    },
    {
      title: "2. Lùi thì trong Reported Speech (Backshift)",
      desc: "Khi động từ tường thuật ở quá khứ (said/told), thì trong câu trực tiếp phải lùi 1 thì (HTĐ -> QKĐ, HTTD -> QKTD...).",
      formula: [ { text: "Am/Is/Are -> Was/Were | V(ht) -> V(qk) | Will -> Would", classes: "bg-orange-100 text-orange-700 border-orange-300 font-bold" } ],
      practiceList: [
        { correct: "\"I am tired.\" -> She said she was tired.", meaning: "\"Tôi mệt.\" -> Cô ấy nói rằng cô ấy mệt." },
        { correct: "\"I will go.\" -> He promised he would go.", meaning: "\"Tôi sẽ đi.\" -> Anh ấy hứa anh ấy sẽ đi." },
        { correct: "\"I can swim.\" -> She said she could swim.", meaning: "\"Tôi có thể bơi.\" -> Cô ấy nói cô ấy có thể bơi." }
      ]
    },
    {
      title: "3. Câu mệnh lệnh tường thuật (Reported Commands)",
      desc: "Tường thuật lại một yêu cầu, mệnh lệnh hoặc lời khuyên.",
      formula: [ { text: "Tell / Ask / Advise / Warn + O + (not) + to-V", classes: "bg-red-100 text-red-700 border-red-300 font-bold" } ],
      practiceList: [
        { correct: "He told me to wait here.", meaning: "Anh ấy bảo tôi đợi ở đây." },
        { correct: "She advised me to study harder.", meaning: "Cô ấy khuyên tôi nên học chăm chỉ hơn." },
        { correct: "The police warned us not to go there.", meaning: "Cảnh sát cảnh báo chúng tôi không được đi đến đó." }
      ]
    }
  ],
  26: [ // Bài 27
    {
      title: "1. Câu điều kiện loại 2 (Conditional 2)",
      desc: "Diễn tả một điều kiện không có thật ở hiện tại và kết quả tưởng tượng.",
      formula: [ { text: "If + S + V(quá khứ đơn), S + would/could + V(nguyên thể)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "If I had more money, I would travel the world.", meaning: "Nếu tôi có nhiều tiền hơn, tôi sẽ đi du lịch vòng quanh thế giới." },
        { correct: "If I were you, I would take the opportunity.", meaning: "Nếu tôi là bạn, tôi sẽ nắm lấy cơ hội." },
        { correct: "Imagine if you won the lottery, what would you do?", meaning: "Tưởng tượng nếu bạn trúng số, bạn sẽ làm gì?" }
      ]
    },
    {
      title: "2. Phân biệt Điều kiện 1 và 2",
      desc: "Điều kiện 1: Có thể xảy ra ở hiện tại/tương lai (If it rains). Điều kiện 2: Trái ngược với thực tế (If I were rich).",
      formula: [
        { text: "If + V(ht), S + will + V (Có thể xảy ra)", classes: "bg-blue-100 text-blue-700 border-blue-300 font-bold" },
        { text: "If + V(qk), S + would + V (Không có thật)", classes: "bg-indigo-100 text-indigo-700 border-indigo-300 font-bold" }
      ],
      practiceList: [
        { correct: "If it rains, I will stay at home. (Real)", meaning: "Nếu trời mưa, tôi sẽ ở nhà. (Có thể xảy ra)" },
        { correct: "If I were a bird, I would fly. (Unreal)", meaning: "Nếu tôi là một con chim, tôi sẽ bay. (Không thể)" },
        { correct: "If you study hard, you will succeed.", meaning: "Nếu bạn học chăm, bạn sẽ thành công." }
      ]
    },
    {
      title: "3. Cấu trúc Unless (Trừ khi)",
      desc: "Unless mang nghĩa phủ định, bằng với 'If ... not'. Động từ theo sau Unless thường ở dạng khẳng định.",
      formula: [ { text: "Unless + S + V(khẳng định) = If + S + V(phủ định)", classes: "bg-green-100 text-green-700 border-green-300 font-bold" } ],
      practiceList: [
        { correct: "I'll go unless it rains.", meaning: "Tôi sẽ đi trừ khi trời mưa." },
        { correct: "You will fail unless you try.", meaning: "Bạn sẽ thất bại trừ khi bạn cố gắng." },
        { correct: "Unless we hurry, we will miss the bus.", meaning: "Trừ khi chúng ta nhanh lên, nếu không chúng ta sẽ lỡ xe buýt." }
      ]
    }
  ],
  27: [ // Bài 28
    {
      title: "1. Ôn tập Câu bị động Tổng hợp (Hiện tại & Quá khứ)",
      desc: "Tổng hợp các mẫu câu bị động phổ biến ở thì HTĐ và QKĐ.",
      formula: [
        { text: "HTĐ: S + am/is/are + V(p.p)", classes: "bg-purple-100 text-purple-700 border-purple-300 font-bold" },
        { text: "QKĐ: S + was/were + V(p.p)", classes: "bg-teal-100 text-teal-700 border-teal-300 font-bold" }
      ],
      practiceList: [
        { correct: "The cars are manufactured in Japan.", meaning: "Những chiếc xe này được sản xuất tại Nhật Bản." },
        { correct: "The phone was invented a long time ago.", meaning: "Chiếc điện thoại được phát minh cách đây rất lâu." },
        { correct: "New products are discovered every day.", meaning: "Sản phẩm mới được phát hiện mỗi ngày." }
      ]
    },
    {
      title: "2. Câu bị động dùng 'by + agent'",
      desc: "Khi muốn nhắc đến người hoặc vật thực hiện hành động trong câu bị động, ta dùng 'by'.",
      formula: [ { text: "S + be + V(p.p) + by + Đối tượng thực hiện", classes: "bg-yellow-100 text-yellow-700 border-yellow-300 font-bold" } ],
      practiceList: [
        { correct: "The book was written by a famous author.", meaning: "Cuốn sách được viết bởi một tác giả nổi tiếng." },
        { correct: "The song was performed by a local band.", meaning: "Bài hát được biểu diễn bởi một ban nhạc địa phương." },
        { correct: "The party is organised by my friend.", meaning: "Bữa tiệc được tổ chức bởi bạn tôi." }
      ]
    },
    {
      title: "3. Ôn tập 'Have something done'",
      desc: "Sử dụng lại cấu trúc nhờ/thuê mướn ai làm việc gì.",
      formula: [ { text: "S + have/get + something + V(p.p)", classes: "bg-pink-100 text-pink-700 border-pink-300 font-bold" } ],
      practiceList: [
        { correct: "I am having my hair cut tomorrow.", meaning: "Ngày mai tôi sẽ đi cắt tóc." },
        { correct: "She had her dress created by a designer.", meaning: "Cô ấy đã nhờ nhà thiết kế làm ra chiếc váy của mình." },
        { correct: "We got the pizza delivered to our house.", meaning: "Chúng tôi đã gọi giao bánh pizza đến nhà." }
      ]
    }
  ]
};

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-ket' },
    include: { lessons: true }
  });

  if (!program) {
    console.error('❌ Không tìm thấy program KET!');
    return;
  }

  let totalSeeded = 0;

  for (const [orderIdxStr, grammarPoints] of Object.entries(GRAMMAR_DATA)) {
    const orderIndex = parseInt(orderIdxStr, 10);
    const targetLesson = program.lessons.find(l => l.orderIndex === orderIndex);
    
    if (!targetLesson) continue;

    await prisma.lessonContent.deleteMany({
      where: {
        lessonId: targetLesson.id,
        contentType: 'GRAMMAR'
      }
    });

    for (const item of grammarPoints) {
      await prisma.lessonContent.create({
        data: {
          lessonId: targetLesson.id,
          contentType: 'GRAMMAR',
          content: JSON.stringify(item)
        }
      });
      totalSeeded++;
    }
    console.log(`✅ Đã nạp ${grammarPoints.length} chủ điểm ngữ pháp cho Bài ${orderIndex}`);
  }

  console.log(`\\n🎉 Hoàn thành nạp ${totalSeeded} chủ điểm ngữ pháp cho batch 3!`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

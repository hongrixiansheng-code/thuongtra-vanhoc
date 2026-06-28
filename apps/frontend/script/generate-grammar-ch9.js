const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Cụm 39: Bài 77 & 78
  {
    cum: 39,
    lessons: [
      {
        order: 77,
        grammar: [
          {
            title: 'Hiện tại hoàn thành (Present Perfect) — Khái niệm cơ bản',
            desc: 'Dùng để diễn tả một hành động đã xảy ra trong quá khứ nhưng KẾT QUẢ vẫn còn ảnh hưởng đến hiện tại, hoặc một TRẢI NGHIỆM tính đến thời điểm hiện tại.',
            formula: [
              { text: "Khẳng định: S + have / has + V3 / V-ed", classes: classes.verb },
              { text: "Phủ định: S + haven't / hasn't + V3 / V-ed", classes: classes.verb }
            ],
            examples: [
              { en: 'I have finished my homework.', vi: 'Tôi đã hoàn thành bài tập về nhà của mình.' },
              { en: 'She has lost her keys.', vi: 'Cô ấy đã làm mất chìa khóa.' },
              { en: 'We haven\'t seen that movie.', vi: 'Chúng tôi chưa xem bộ phim đó.' }
            ],
            note: 'Dùng "have" cho I/You/We/They. Dùng "has" cho He/She/It. V3 là động từ ở dạng quá khứ phân từ (Past Participle).',
            practiceList: [
              { question: 'He ___ completed the task.', correct: 'has', meaning: 'Anh ấy đã hoàn thành nhiệm vụ.', explanation: 'Chủ ngữ "He" đi với "has".' },
              { question: 'I ___ not eaten breakfast yet.', correct: 'have', meaning: 'Tôi vẫn chưa ăn sáng.', explanation: 'Chủ ngữ "I" đi với "have".' },
              { question: 'She has ___ a new car. (buy)', correct: 'bought', meaning: 'Cô ấy vừa mới mua một chiếc ô tô mới.', explanation: 'V3 của "buy" là "bought".' }
            ]
          }
        ]
      },
      {
        order: 78,
        grammar: [
          {
            title: 'Hiện tại hoàn thành — for / since',
            desc: 'Dùng để diễn tả một hành động bắt đầu trong quá khứ và VẪN ĐANG TIẾP TỤC ở hiện tại. "For" đi với KHOẢNG thời gian, "since" đi với MỐC thời gian.',
            formula: [
              { text: "for + Khoảng thời gian (for 2 years, for a month...)", classes: classes.other },
              { text: "since + Mốc thời gian (since 2010, since yesterday...)", classes: classes.other }
            ],
            examples: [
              { en: 'I have lived here for 5 years.', vi: 'Tôi đã sống ở đây được 5 năm rồi.' },
              { en: 'She has worked in this company since 2020.', vi: 'Cô ấy đã làm việc ở công ty này từ năm 2020.' },
              { en: 'We haven\'t met since last week.', vi: 'Chúng tôi đã không gặp nhau kể từ tuần trước.' }
            ],
            note: 'Dấu hiệu nhận biết: "for" đi với số đếm + đơn vị thời gian. "since" đi với một thời điểm cụ thể trong quá khứ.',
            practiceList: [
              { question: 'They have been friends ___ ten years.', correct: 'for', meaning: 'Họ đã là bạn bè được mười năm rồi.', explanation: '"ten years" là một khoảng thời gian, dùng "for".' },
              { question: 'I have known him ___ Monday.', correct: 'since', meaning: 'Tôi đã biết anh ấy từ thứ Hai.', explanation: '"Monday" là một mốc thời gian cụ thể, dùng "since".' },
              { question: 'She has been sick ___ three days.', correct: 'for', meaning: 'Cô ấy đã bị ốm được ba ngày rồi.', explanation: '"three days" là khoảng thời gian.' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 40: Bài 79 & 80
  {
    cum: 40,
    lessons: [
      {
        order: 79,
        grammar: [
          {
            title: 'Phân biệt: Quá khứ đơn (Past Simple) vs Hiện tại hoàn thành (Present Perfect)',
            desc: 'Quá khứ đơn dùng khi thời gian ĐÃ KẾT THÚC, được xác định rõ (yesterday, last year). Hiện tại hoàn thành dùng khi thời gian CHƯA KẾT THÚC hoặc không xác định.',
            formula: [
              { text: "Past Simple: S + V2/ed + Thời gian CỤ THỂ", classes: classes.verb },
              { text: "Present Perfect: S + have/has + V3/ed + Thời gian KHÔNG CỤ THỂ", classes: classes.verb }
            ],
            examples: [
              { en: 'I saw that movie yesterday.', vi: 'Tôi đã xem bộ phim đó ngày hôm qua. (Quá khứ đơn)' },
              { en: 'I have seen that movie three times.', vi: 'Tôi đã xem bộ phim đó 3 lần rồi. (Hiện tại hoàn thành - tính đến nay)' },
              { en: 'She traveled to Japan in 2015.', vi: 'Cô ấy đã du lịch Nhật Bản vào năm 2015.' }
            ],
            note: 'Nếu câu có: yesterday, in 2010, last week, ago... -> LUÔN DÙNG Quá khứ đơn.',
            practiceList: [
              { question: 'I ___ to London last year. (go)', correct: 'went', meaning: 'Tôi đã đi đến London vào năm ngoái.', explanation: 'Có "last year" là quá khứ đơn, dùng "went".' },
              { question: '___ you ever eaten sushi? (ăn)', correct: 'Have', meaning: 'Bạn đã từng ăn sushi chưa?', explanation: 'Hỏi về trải nghiệm không xác định thời gian, dùng "Have you ever...".' },
              { question: 'He ___ his keys this morning, so he can\'t get in now. (lose)', correct: 'lost', meaning: 'Anh ấy đã làm mất chìa khóa sáng nay, nên giờ không vào được.', explanation: '"this morning" là thời điểm đã qua, dùng quá khứ đơn "lost".' }
            ]
          }
        ]
      },
      {
        order: 80,
        grammar: [
          {
            title: 'Câu bị động (Passive Voice) — Thì Hiện tại đơn',
            desc: 'Dùng khi muốn nhấn mạnh vào ĐỐI TƯỢNG chịu tác động của hành động, thay vì người thực hiện hành động.',
            formula: [
              { text: "S (vật bị tác động) + am/is/are + V3/ed + (by O)", classes: classes.verb }
            ],
            examples: [
              { en: 'This car is made in Japan.', vi: 'Chiếc ô tô này được sản xuất tại Nhật Bản.' },
              { en: 'English is spoken all over the world.', vi: 'Tiếng Anh được nói trên toàn thế giới.' },
              { en: 'These products are designed by a famous artist.', vi: 'Những sản phẩm này được thiết kế bởi một nghệ sĩ nổi tiếng.' }
            ],
            note: 'Trong câu bị động, động từ chính luôn ở dạng phân từ 2 (V3/ed).',
            practiceList: [
              { question: 'The house ___ cleaned every day. (be)', correct: 'is', meaning: 'Ngôi nhà được dọn dẹp mỗi ngày.', explanation: 'Hiện tại đơn bị động, chủ ngữ số ít dùng "is".' },
              { question: 'Many books ___ written by him. (be)', correct: 'are', meaning: 'Nhiều cuốn sách được viết bởi anh ấy.', explanation: 'Chủ ngữ số nhiều "books" dùng "are".' },
              { question: 'The letter is ___ by Mary. (write)', correct: 'written', meaning: 'Bức thư được viết bởi Mary.', explanation: 'V3 của "write" là "written".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 41: Bài 81 & 82
  {
    cum: 41,
    lessons: [
      {
        order: 81,
        grammar: [
          {
            title: 'Câu bị động (Passive Voice) — Thì Quá khứ đơn',
            desc: 'Dùng để diễn tả một đối tượng ĐÃ BỊ/ĐƯỢC tác động bởi một hành động trong quá khứ.',
            formula: [
              { text: "S (vật bị tác động) + was/were + V3/ed + (by O)", classes: classes.verb }
            ],
            examples: [
              { en: 'The telephone was invented by Alexander Graham Bell.', vi: 'Điện thoại đã được phát minh bởi Alexander Graham Bell.' },
              { en: 'America was discovered in 1492.', vi: 'Châu Mỹ đã được khám phá vào năm 1492.' },
              { en: 'These houses were built last year.', vi: 'Những ngôi nhà này đã được xây vào năm ngoái.' }
            ],
            note: 'Nếu chủ ngữ số ít dùng "was", chủ ngữ số nhiều dùng "were". Động từ chính vẫn luôn là V3/ed.',
            practiceList: [
              { question: 'The window ___ broken yesterday.', correct: 'was', meaning: 'Cửa sổ đã bị vỡ vào ngày hôm qua.', explanation: 'Quá khứ đơn bị động, "window" số ít dùng "was".' },
              { question: 'The paintings ___ stolen last night.', correct: 'were', meaning: 'Những bức tranh đã bị đánh cắp vào tối qua.', explanation: 'Chủ ngữ "paintings" số nhiều dùng "were".' },
              { question: 'This book was ___ in 1990. (publish)', correct: 'published', meaning: 'Cuốn sách này đã được xuất bản vào năm 1990.', explanation: 'Phân từ 2 của động từ có quy tắc thêm -ed.' }
            ]
          }
        ]
      },
      {
        order: 82,
        grammar: [] // Ôn tập Chương 9, không có điểm ngữ pháp mới
      }
    ]
  }
];

data.forEach(batch => {
  const formatted = batch.lessons.map(l => ({
    lessonOrder: l.order,
    grammar: l.grammar
  }));
  fs.writeFileSync(`data/ielts-grammar-cum${batch.cum}.json`, JSON.stringify(formatted, null, 2));
  console.log(`Generated grammar cum ${batch.cum}`);
});

const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Cụm 6: Bài 11 & 12
  {
    cum: 6,
    lessons: [
      {
        order: 11,
        grammar: [
          {
            title: 'Động từ khuyết thiếu "can" / "can\'t" — Khả năng',
            desc: 'Dùng để diễn tả một người/vật có khả năng hoặc không có khả năng làm một việc gì đó.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "can / can't", classes: classes.verb },
              { text: "Verb (nguyên mẫu)", classes: classes.verb }
            ],
            examples: [
              { en: 'I can swim.', vi: 'Tôi có thể bơi.' },
              { en: 'My sister can sing.', vi: 'Chị gái tôi có thể hát.' },
              { en: 'He can\'t drive a car.', vi: 'Anh ấy không thể lái xe ô tô.' }
            ],
            note: 'can\'t là viết tắt của cannot. Động từ đứng sau can/can\'t luôn ở dạng nguyên mẫu, không chia.',
            practiceList: [
              { question: 'She ___ cook dinner.', correct: 'can', meaning: 'Cô ấy có thể nấu bữa tối.', explanation: 'Dùng "can" để chỉ khả năng nấu ăn.' },
              { question: 'My father ___ speak English. (Không thể)', correct: 'can\'t', meaning: 'Bố tôi không thể nói tiếng Anh.', explanation: 'Dùng "can\'t" để chỉ sự không có khả năng.' },
              { question: 'They ___ play games together.', correct: 'can', meaning: 'Họ có thể chơi game cùng nhau.', explanation: 'Dùng "can" để chỉ khả năng.' }
            ]
          }
        ]
      },
      {
        order: 12,
        grammar: [
          {
            title: 'Động từ khuyết thiếu "can" — Yêu cầu & Xin phép',
            desc: 'Dùng để lịch sự yêu cầu người khác làm gì giúp mình, hoặc xin phép để mình làm một việc gì đó.',
            formula: [
              { text: "Can", classes: classes.verb },
              { text: "Subject", classes: classes.subject },
              { text: "Verb (nguyên mẫu) ?", classes: classes.verb }
            ],
            examples: [
              { en: 'Can you help me?', vi: 'Bạn có thể giúp tôi được không?' },
              { en: 'Can I open the window?', vi: 'Tôi có thể mở cửa sổ được không?' },
              { en: 'Can we sit here?', vi: 'Chúng tôi có thể ngồi đây được không?' }
            ],
            note: 'Can I...? (dùng để xin phép). Can you...? (dùng để nhờ vả).',
            practiceList: [
              { question: '___ you bring me a book?', correct: 'Can', meaning: 'Bạn có thể mang cho tôi một cuốn sách được không?', explanation: 'Dùng "Can you" để đưa ra lời yêu cầu.' },
              { question: 'Can I ___ the door?', correct: 'close', meaning: 'Tôi có thể đóng cửa lại được không?', explanation: 'Động từ sau "can" luôn ở dạng nguyên mẫu, dùng "close".' },
              { question: '___ we go now?', correct: 'Can', meaning: 'Chúng ta có thể đi bây giờ được không?', explanation: 'Dùng "Can we" để xin phép.' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 7: Bài 13 & 14
  {
    cum: 7,
    lessons: [
      {
        order: 13,
        grammar: [
          {
            title: 'Câu Mệnh lệnh (Imperatives)',
            desc: 'Dùng để đưa ra hướng dẫn, chỉ dẫn hoặc yêu cầu ai đó làm gì / không làm gì.',
            formula: [
              { text: "Khẳng định: Verb (nguyên mẫu) + ...", classes: classes.verb },
              { text: "Phủ định: Don't + Verb (nguyên mẫu) + ...", classes: classes.subject }
            ],
            examples: [
              { en: 'Turn left at the corner.', vi: 'Rẽ trái ở góc phố.' },
              { en: 'Press the button.', vi: 'Nhấn vào nút đó.' },
              { en: 'Don\'t open the door.', vi: 'Đừng mở cửa.' }
            ],
            note: 'Câu mệnh lệnh không có chủ ngữ. Thường bắt đầu bằng ngay một động từ nguyên mẫu.',
            practiceList: [
              { question: '___ your name here.', correct: 'Sign', meaning: 'Ký tên của bạn vào đây.', explanation: 'Câu mệnh lệnh khẳng định bắt đầu bằng động từ nguyên mẫu.' },
              { question: '___ mix the colors.', correct: 'Don\'t', meaning: 'Đừng trộn các màu sắc lại.', explanation: 'Câu mệnh lệnh phủ định (Đừng làm gì) bắt đầu bằng "Don\'t".' },
              { question: 'Please ___ the instructions.', correct: 'follow', meaning: 'Vui lòng làm theo các hướng dẫn.', explanation: 'Sau "Please" là động từ nguyên mẫu để yêu cầu lịch sự.' }
            ]
          }
        ]
      },
      {
        order: 14,
        grammar: [
          {
            title: 'Tính từ (Adjectives) — Vị trí trong câu',
            desc: 'Tính từ dùng để miêu tả đặc điểm. Tính từ có 2 vị trí chính: đứng sau động từ "to be" hoặc đứng TRƯỚC danh từ.',
            formula: [
              { text: "S + am/is/are + Adjective", classes: classes.verb },
              { text: "Adjective + Noun", classes: classes.noun }
            ],
            examples: [
              { en: 'The room is clean.', vi: 'Căn phòng thì sạch sẽ.' },
              { en: 'It is a clean room.', vi: 'Nó là một căn phòng sạch sẽ.' },
              { en: 'I have a comfortable bed.', vi: 'Tôi có một cái giường thoải mái.' }
            ],
            note: 'Trong tiếng Việt ta nói "phòng sạch", nhưng tiếng Anh phải đưa tính từ lên trước danh từ "clean room".',
            practiceList: [
              { question: 'The weather is ___.', correct: 'hot', meaning: 'Thời tiết thì nóng.', explanation: 'Tính từ đứng sau động từ to be (is).' },
              { question: 'He is a ___ boy. (tốt bụng)', correct: 'kind', meaning: 'Anh ấy là một cậu bé tốt bụng.', explanation: 'Tính từ (kind) phải đứng trước danh từ (boy).' },
              { question: 'We have ___ towels.', correct: 'dry', meaning: 'Chúng tôi có những chiếc khăn tắm khô.', explanation: 'Tính từ (dry) đứng trước danh từ (towels).' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 8: Bài 15 & 16
  {
    cum: 8,
    lessons: [
      {
        order: 15,
        grammar: [
          {
            title: 'Danh từ số nhiều — Quy tắc & Bất quy tắc',
            desc: 'Cách chuyển danh từ từ số ít (1 cái) sang số nhiều (từ 2 cái trở lên).',
            formula: [
              { text: "Số nhiều quy tắc: Noun + s / es / ies", classes: classes.noun },
              { text: "Bất quy tắc: man -> men, child -> children, ...", classes: classes.other }
            ],
            examples: [
              { en: 'I have two big cars.', vi: 'Tôi có hai chiếc xe lớn.' },
              { en: 'The children are happy.', vi: 'Những đứa trẻ đang vui vẻ.' },
              { en: 'There are three women in the room.', vi: 'Có ba người phụ nữ trong phòng.' }
            ],
            note: 'Quy tắc chung là thêm "s". Đuôi s, x, z, ch, sh thêm "es". Tận cùng là phụ âm + "y" thì đổi thành "ies".',
            practiceList: [
              { question: 'She has two small ___. (dog)', correct: 'dogs', meaning: 'Cô ấy có hai con chó nhỏ.', explanation: 'Danh từ quy tắc bình thường thêm "s".' },
              { question: 'Look at those ___. (man)', correct: 'men', meaning: 'Nhìn những người đàn ông kia kìa.', explanation: 'Dạng số nhiều bất quy tắc của "man" là "men".' },
              { question: 'There are many ___ in the park. (child)', correct: 'children', meaning: 'Có nhiều trẻ em trong công viên.', explanation: 'Dạng số nhiều bất quy tắc của "child" là "children".' }
            ]
          }
        ]
      },
      {
        order: 16,
        grammar: [
          {
            title: 'Cấu trúc This is / These are',
            desc: 'Dùng để giới thiệu hoặc chỉ một/nhiều vật ở gần người nói.',
            formula: [
              { text: "This is", classes: classes.verb },
              { text: "Singular Noun", classes: classes.noun },
              { text: "| These are", classes: classes.verb },
              { text: "Plural Noun", classes: classes.noun }
            ],
            examples: [
              { en: 'This is my phone.', vi: 'Đây là điện thoại của tôi.' },
              { en: 'These are my keys.', vi: 'Đây là những chiếc chìa khóa của tôi.' },
              { en: 'These are his glasses.', vi: 'Đây là mắt kính của anh ấy.' }
            ],
            note: '"This is" dùng cho danh từ số ít. "These are" dùng cho danh từ số nhiều.',
            practiceList: [
              { question: '___ is a pen.', correct: 'This', meaning: 'Đây là một cây bút.', explanation: 'Danh từ số ít (a pen) nên dùng "This".' },
              { question: '___ are my bags.', correct: 'These', meaning: 'Đây là những chiếc túi của tôi.', explanation: 'Danh từ số nhiều (bags) nên dùng "These".' },
              { question: 'These ___ her tickets.', correct: 'are', meaning: 'Đây là những chiếc vé của cô ấy.', explanation: '"These" phải đi kèm với động từ "are".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 9: Bài 17 & 18
  {
    cum: 9,
    lessons: [
      {
        order: 17,
        grammar: [
          {
            title: 'Số thứ tự & Cách nói ngày tháng',
            desc: 'Dùng số thứ tự (first, second...) để chỉ ngày trong tháng hoặc thứ tự. Kết hợp giới từ "on" + ngày.',
            formula: [
              { text: "on the + Số thứ tự + of + Tháng", classes: classes.other }
            ],
            examples: [
              { en: 'My birthday is on the first of May.', vi: 'Sinh nhật của tôi là vào ngày mùng 1 tháng Năm.' },
              { en: 'The meeting is on the tenth of June.', vi: 'Cuộc họp diễn ra vào ngày 10 tháng Sáu.' },
              { en: 'He is the first person to arrive.', vi: 'Anh ấy là người đầu tiên đến.' }
            ],
            note: 'Cách viết tắt: 1st (first), 2nd (second), 3rd (third), 4th (fourth)...',
            practiceList: [
              { question: 'I was born on the ___ of July. (ngày mùng 2)', correct: 'second', meaning: 'Tôi sinh vào ngày mùng 2 tháng Bảy.', explanation: 'Số thứ tự của 2 là "second".' },
              { question: 'This is his ___ time in Vietnam. (lần thứ 3)', correct: 'third', meaning: 'Đây là lần thứ 3 của anh ấy ở Việt Nam.', explanation: 'Số thứ tự của 3 là "third".' },
              { question: 'The party is ___ the fifth of August.', correct: 'on', meaning: 'Bữa tiệc diễn ra vào ngày mùng 5 tháng Tám.', explanation: 'Đứng trước ngày tháng đầy đủ phải dùng giới từ "on".' }
            ]
          }
        ]
      },
      {
        order: 18,
        grammar: [] // Ôn tập, không có điểm ngữ pháp mới
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

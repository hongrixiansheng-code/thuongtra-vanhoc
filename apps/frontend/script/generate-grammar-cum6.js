const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
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
            note: 'can\'t là viết tắt của cannot. Động từ đứng sau can/can\'t luôn ở dạng nguyên mẫu, không chia (không thêm s/es/ed/ing).',
            practiceList: [
              { question: 'She ___ cook dinner.', correct: 'can', meaning: 'Cô ấy có thể nấu bữa tối.', explanation: 'Dùng "can" để chỉ khả năng nấu ăn.' },
              { question: 'My father ___ speak English. (Không thể)', correct: 'can\'t', meaning: 'Bố tôi không thể nói tiếng Anh.', explanation: 'Dùng "can\'t" để chỉ sự không có khả năng.' },
              { question: 'They ___ play games together.', correct: 'can', meaning: 'Họ có thể chơi game cùng nhau.', explanation: 'Dùng "can" để chỉ khả năng thực hiện hành động.' }
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
            note: 'Can I...? (Tôi có thể... không? - dùng để xin phép). Can you...? (Bạn có thể... không? - dùng để yêu cầu nhờ vả).',
            practiceList: [
              { question: '___ you bring me a book?', correct: 'Can', meaning: 'Bạn có thể mang cho tôi một cuốn sách được không?', explanation: 'Dùng "Can you" để đưa ra lời yêu cầu nhờ vả.' },
              { question: 'Can I ___ the door?', correct: 'close', meaning: 'Tôi có thể đóng cửa lại được không?', explanation: 'Động từ sau "can" luôn ở dạng nguyên mẫu, dùng "close".' },
              { question: '___ we go now?', correct: 'Can', meaning: 'Chúng ta có thể đi bây giờ được không?', explanation: 'Dùng "Can we" để xin phép làm một hành động.' }
            ]
          }
        ]
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

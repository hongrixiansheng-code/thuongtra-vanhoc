const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Cụm 20: Bài 39 & 40
  {
    cum: 20,
    lessons: [
      {
        order: 39,
        grammar: [
          {
            title: 'Hiện tại tiếp diễn (Present Continuous) — Khẳng định',
            desc: 'Dùng để diễn tả một hành động ĐANG XẢY RA ngay tại thời điểm nói.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "am / is / are", classes: classes.verb },
              { text: "Verb-ing", classes: classes.verb }
            ],
            examples: [
              { en: 'I am running now.', vi: 'Bây giờ tôi đang chạy.' },
              { en: 'He is sleeping in his room.', vi: 'Anh ấy đang ngủ trong phòng của mình.' },
              { en: 'They are talking.', vi: 'Họ đang nói chuyện.' }
            ],
            note: 'Quy tắc thêm -ing: Động từ tận cùng bằng "e" thì bỏ "e" rồi thêm "-ing" (smile -> smiling). Động từ 1 âm tiết, tận cùng 1 nguyên âm + 1 phụ âm thì gấp đôi phụ âm cuối (run -> running).',
            practiceList: [
              { question: 'She is ___ a book right now. (read)', correct: 'reading', meaning: 'Cô ấy đang đọc sách ngay lúc này.', explanation: 'Hành động đang xảy ra dùng V-ing (reading).' },
              { question: 'Look! The children are ___ in the garden. (play)', correct: 'playing', meaning: 'Nhìn kìa! Những đứa trẻ đang chơi trong vườn.', explanation: 'Dấu hiệu "Look!" (Nhìn kìa) chỉ hành động đang xảy ra.' },
              { question: 'He is ___ on the bed. (lie)', correct: 'lying', meaning: 'Anh ấy đang nằm trên giường.', explanation: 'Động từ "lie" đổi thành "lying".' }
            ]
          }
        ]
      },
      {
        order: 40,
        grammar: [
          {
            title: 'Hiện tại tiếp diễn (Present Continuous) — Phủ định & Câu hỏi',
            desc: 'Phủ định: thêm "not" sau "be". Câu hỏi: đảo "be" lên trước chủ ngữ.',
            formula: [
              { text: "Phủ định: S + am/is/are + not + V-ing", classes: classes.verb },
              { text: "Câu hỏi: Am/Is/Are + S + V-ing ?", classes: classes.verb }
            ],
            examples: [
              { en: 'She is not working today.', vi: 'Hôm nay cô ấy không làm việc.' },
              { en: 'Are you studying English?', vi: 'Bạn đang học tiếng Anh phải không?' },
              { en: 'What is he building?', vi: 'Anh ấy đang xây cái gì vậy?' }
            ],
            note: 'is not = isn\'t. are not = aren\'t. am not không có dạng viết tắt chuẩn (dùng I\'m not).',
            practiceList: [
              { question: 'We ___ not watching TV at the moment.', correct: 'are', meaning: 'Lúc này chúng tôi đang không xem TV.', explanation: 'Chủ ngữ "We" dùng động từ to be "are".' },
              { question: '___ she crying?', correct: 'Is', meaning: 'Cô ấy đang khóc phải không?', explanation: 'Chủ ngữ "she" nên đảo "Is" lên đầu để hỏi.' },
              { question: 'I ___ not sleeping.', correct: 'am', meaning: 'Tôi đang không ngủ.', explanation: 'Chủ ngữ "I" đi với "am".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 21: Bài 41 & 42
  {
    cum: 21,
    lessons: [
      {
        order: 41,
        grammar: [
          {
            title: 'Hiện tại đơn (Simple) vs Hiện tại tiếp diễn (Continuous)',
            desc: 'Hiện tại đơn dùng cho THÓI QUEN. Hiện tại tiếp diễn dùng cho HÀNH ĐỘNG ĐANG XẢY RA.',
            formula: [
              { text: "Thói quen: always, usually, every day... -> S + V / V(s/es)", classes: classes.other },
              { text: "Đang xảy ra: now, at the moment, right now... -> S + be + V-ing", classes: classes.other }
            ],
            examples: [
              { en: 'I usually wear jeans, but today I am wearing a dress.', vi: 'Tôi thường mặc quần jeans, nhưng hôm nay tôi đang mặc một chiếc váy.' },
              { en: 'He plays tennis every Sunday.', vi: 'Anh ấy chơi tennis mỗi Chủ Nhật.' },
              { en: 'They are playing tennis right now.', vi: 'Họ đang chơi tennis ngay bây giờ.' }
            ],
            note: 'Hãy chú ý đến các từ chỉ thời gian trong câu để quyết định thì chính xác.',
            practiceList: [
              { question: 'She usually ___ coffee in the morning. (drink)', correct: 'drinks', meaning: 'Cô ấy thường uống cà phê vào buổi sáng.', explanation: '"usually" (thường xuyên) là dấu hiệu thì Hiện tại đơn.' },
              { question: 'Listen! Someone ___ singing. (be)', correct: 'is', meaning: 'Nghe kìa! Ai đó đang hát.', explanation: '"Listen!" cho thấy hành động đang diễn ra lúc nói.' },
              { question: 'We are ___ English right now. (study)', correct: 'studying', meaning: 'Ngay bây giờ chúng tôi đang học tiếng Anh.', explanation: '"right now" là dấu hiệu Hiện tại tiếp diễn.' }
            ]
          }
        ]
      },
      {
        order: 42,
        grammar: [
          {
            title: 'Động từ trạng thái (Stative Verbs)',
            desc: 'Là những động từ chỉ trạng thái, tình cảm, nhận thức. Các động từ này KHÔNG BAO GIỜ được chia ở thì tiếp diễn (V-ing), dù hành động đang xảy ra.',
            formula: [
              { text: "know, like, want, need, understand, believe, remember...", classes: classes.other }
            ],
            examples: [
              { en: 'I know the answer now.', vi: 'Bây giờ tôi biết câu trả lời.' },
              { en: 'Do you understand this story?', vi: 'Bạn có hiểu câu chuyện này không?' },
              { en: 'She wants a new toy.', vi: 'Cô bé muốn một món đồ chơi mới.' }
            ],
            note: 'Không nói "I am knowing" hay "She is wanting". Chỉ dùng "I know" hoặc "She wants".',
            practiceList: [
              { question: 'I ___ you. (believe)', correct: 'believe', meaning: 'Tôi tin bạn.', explanation: '"believe" là động từ trạng thái, không chia tiếp diễn.' },
              { question: '___ you need some help right now?', correct: 'Do', meaning: 'Bây giờ bạn có cần giúp đỡ không?', explanation: '"need" không chia tiếp diễn, dù có "right now" vẫn dùng thì Hiện tại đơn.' },
              { question: 'He doesn\'t ___ the question. (understand)', correct: 'understand', meaning: 'Anh ấy không hiểu câu hỏi.', explanation: '"understand" là động từ nhận thức.' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 22: Bài 43 & 44
  {
    cum: 22,
    lessons: [
      {
        order: 43,
        grammar: [
          {
            title: 'Quá khứ của Động từ "to be" — Khẳng định & Phủ định',
            desc: 'Dùng để diễn tả một trạng thái, tính chất hoặc vị trí đã xảy ra trong QUÁ KHỨ.',
            formula: [
              { text: "I/He/She/It + was / wasn't", classes: classes.verb },
              { text: "We/You/They + were / weren't", classes: classes.verb }
            ],
            examples: [
              { en: 'I was in London last year.', vi: 'Năm ngoái tôi ở London.' },
              { en: 'They were very happy yesterday.', vi: 'Hôm qua họ đã rất vui.' },
              { en: 'She wasn\'t at home last night.', vi: 'Tối qua cô ấy không có ở nhà.' }
            ],
            note: 'wasn\'t = was not. weren\'t = were not. Các từ nhận biết: yesterday, last night, last year, ago...',
            practiceList: [
              { question: 'He ___ sick yesterday.', correct: 'was', meaning: 'Hôm qua anh ấy bị ốm.', explanation: 'Chủ ngữ "He" số ít đi với "was".' },
              { question: 'We ___ not tired after the trip.', correct: 'were', meaning: 'Chúng tôi đã không mệt sau chuyến đi.', explanation: 'Chủ ngữ "We" số nhiều đi với "were".' },
              { question: 'It ___ a beautiful day.', correct: 'was', meaning: 'Đó đã là một ngày đẹp trời.', explanation: 'Chủ ngữ "It" đi với "was".' }
            ]
          }
        ]
      },
      {
        order: 44,
        grammar: [
          {
            title: 'Quá khứ của Động từ "to be" — Câu hỏi',
            desc: 'Đảo "was" hoặc "were" lên trước chủ ngữ để tạo thành câu hỏi trong quá khứ.',
            formula: [
              { text: "Từ để hỏi + was / were + Subject ?", classes: classes.verb }
            ],
            examples: [
              { en: 'Where were you yesterday?', vi: 'Hôm qua bạn đã ở đâu?' },
              { en: 'Was he a king?', vi: 'Ông ấy có từng là một vị vua không?' },
              { en: 'Why was she sad?', vi: 'Tại sao cô ấy lại buồn?' }
            ],
            note: 'Nếu chủ ngữ là số ít (I, he, she, it) dùng Was. Nếu chủ ngữ là số nhiều (we, you, they) dùng Were.',
            practiceList: [
              { question: '___ they at the party last night?', correct: 'Were', meaning: 'Tối qua họ có ở bữa tiệc không?', explanation: 'Chủ ngữ "they" dùng "Were".' },
              { question: '___ it raining yesterday?', correct: 'Was', meaning: 'Hôm qua trời có mưa không?', explanation: 'Chủ ngữ "it" dùng "Was".' },
              { question: 'Where ___ you born?', correct: 'were', meaning: 'Bạn sinh ra ở đâu?', explanation: 'Chủ ngữ "you" luôn đi với "were".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 23: Bài 45 & 46
  {
    cum: 23,
    lessons: [
      {
        order: 45,
        grammar: [
          {
            title: 'Quá khứ đơn (Past Simple) — Động từ có quy tắc (thêm -ed)',
            desc: 'Dùng để diễn tả một hành động ĐÃ XẢY RA và KẾT THÚC trong quá khứ. Động từ có quy tắc chỉ cần thêm đuôi "-ed".',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "Verb-ed", classes: classes.verb },
              { text: "Object / Time", classes: classes.noun }
            ],
            examples: [
              { en: 'I played football yesterday.', vi: 'Hôm qua tôi đã chơi bóng đá.' },
              { en: 'She washed the dishes last night.', vi: 'Tối qua cô ấy đã rửa bát đĩa.' },
              { en: 'We worked hard last week.', vi: 'Tuần trước chúng tôi đã làm việc chăm chỉ.' }
            ],
            note: 'Nếu tận cùng là "e", chỉ cần thêm "d" (like -> liked). Tận cùng là phụ âm + "y", đổi "y" thành "i" rồi thêm "ed" (study -> studied).',
            practiceList: [
              { question: 'I ___ to music all evening. (listen)', correct: 'listened', meaning: 'Tôi đã nghe nhạc cả buổi tối.', explanation: 'Hành động trong quá khứ, "listen" thêm "ed".' },
              { question: 'He ___ his room yesterday. (clean)', correct: 'cleaned', meaning: 'Hôm qua anh ấy đã dọn dẹp phòng.', explanation: '"yesterday" là dấu hiệu quá khứ.' },
              { question: 'They ___ English last year. (study)', correct: 'studied', meaning: 'Năm ngoái họ đã học tiếng Anh.', explanation: 'Tận cùng là "y" đổi thành "ied".' }
            ]
          }
        ]
      },
      {
        order: 46,
        grammar: [] // Ôn tập Chương 5, không có điểm ngữ pháp mới
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

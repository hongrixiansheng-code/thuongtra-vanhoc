const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Cụm 10: Bài 19 & 20
  {
    cum: 10,
    lessons: [
      {
        order: 19,
        grammar: [
          {
            title: 'Hiện tại đơn (Present Simple) — I/You/We/They (Khẳng định)',
            desc: 'Dùng để diễn tả thói quen, hành động lặp đi lặp lại hàng ngày hoặc sự thật hiển nhiên.',
            formula: [
              { text: "Subject (I/You/We/They)", classes: classes.subject },
              { text: "Verb (nguyên mẫu)", classes: classes.verb },
              { text: "Object / Time", classes: classes.noun }
            ],
            examples: [
              { en: 'I wake up at 6 AM every day.', vi: 'Tôi thức dậy lúc 6 giờ sáng mỗi ngày.' },
              { en: 'We eat breakfast together.', vi: 'Chúng tôi ăn sáng cùng nhau.' },
              { en: 'They go to school by bus.', vi: 'Họ đi đến trường bằng xe buýt.' }
            ],
            note: 'Với các chủ ngữ I, You, We, They và danh từ số nhiều, động từ được giữ nguyên mẫu (không thêm s/es).',
            practiceList: [
              { question: 'I ___ my teeth in the morning.', correct: 'brush', meaning: 'Tôi đánh răng vào buổi sáng.', explanation: 'Chủ ngữ "I" nên động từ "brush" giữ nguyên.' },
              { question: 'They ___ home at 5 PM.', correct: 'leave', meaning: 'Họ rời khỏi nhà lúc 5 giờ chiều.', explanation: 'Chủ ngữ "They" nên động từ "leave" giữ nguyên.' },
              { question: 'You ___ work early.', correct: 'start', meaning: 'Bạn bắt đầu công việc sớm.', explanation: 'Chủ ngữ "You" nên động từ "start" giữ nguyên.' }
            ]
          }
        ]
      },
      {
        order: 20,
        grammar: [
          {
            title: 'Hiện tại đơn (Present Simple) — He/She/It (Thêm s/es/ies)',
            desc: 'Khi chủ ngữ là He/She/It hoặc danh từ số ít, ta phải thêm "s", "es" hoặc "ies" vào sau động từ.',
            formula: [
              { text: "Subject (He/She/It)", classes: classes.subject },
              { text: "Verb + s/es/ies", classes: classes.verb },
              { text: "Object / Time", classes: classes.noun }
            ],
            examples: [
              { en: 'She washes the dishes.', vi: 'Cô ấy rửa bát đĩa.' },
              { en: 'He tidies his room.', vi: 'Anh ấy dọn dẹp phòng của mình.' },
              { en: 'My mother cooks dinner.', vi: 'Mẹ tôi nấu bữa tối.' }
            ],
            note: 'Thêm "es" khi động từ tận cùng bằng o, s, z, x, ch, sh (ví dụ: wash -> washes). Tận cùng là phụ âm + y thì đổi thành "ies" (tidy -> tidies).',
            practiceList: [
              { question: 'He ___ TV every evening. (watch)', correct: 'watches', meaning: 'Anh ấy xem tivi mỗi buổi tối.', explanation: 'Tận cùng là "ch" nên thêm "es" thành "watches".' },
              { question: 'My sister ___ English. (study)', correct: 'studies', meaning: 'Chị gái tôi học tiếng Anh.', explanation: 'Tận cùng là phụ âm + "y", đổi thành "ies".' },
              { question: 'The dog ___ in the garden. (play)', correct: 'plays', meaning: 'Con chó chơi trong khu vườn.', explanation: 'Thêm "s" bình thường với từ "play".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 11: Bài 21 & 22
  {
    cum: 11,
    lessons: [
      {
        order: 21,
        grammar: [
          {
            title: 'Hiện tại đơn (Present Simple) — Câu hỏi với Do/Does',
            desc: 'Dùng trợ động từ Do hoặc Does để đặt câu hỏi ở thì hiện tại đơn.',
            formula: [
              { text: "Từ để hỏi (What/Where...)", classes: classes.other },
              { text: "Do / Does", classes: classes.verb },
              { text: "Subject", classes: classes.subject },
              { text: "Verb (nguyên mẫu) ?", classes: classes.verb }
            ],
            examples: [
              { en: 'Do you clean the house?', vi: 'Bạn có dọn dẹp nhà cửa không?' },
              { en: 'Where does she live?', vi: 'Cô ấy sống ở đâu?' },
              { en: 'What time do they wake up?', vi: 'Họ thức dậy lúc mấy giờ?' }
            ],
            note: 'Dùng "Do" cho I/You/We/They. Dùng "Does" cho He/She/It. Động từ chính LUÔN trở về dạng nguyên mẫu.',
            practiceList: [
              { question: '___ he play tennis?', correct: 'Does', meaning: 'Anh ấy có chơi quần vợt không?', explanation: 'Chủ ngữ "he" đi với trợ động từ "Does".' },
              { question: 'Why ___ you learn English?', correct: 'do', meaning: 'Tại sao bạn học tiếng Anh?', explanation: 'Chủ ngữ "you" đi với trợ động từ "do".' },
              { question: 'Does she ___ a car?', correct: 'have', meaning: 'Cô ấy có ô tô không?', explanation: 'Sau trợ động từ "Does", động từ chính phải để nguyên mẫu "have".' }
            ]
          }
        ]
      },
      {
        order: 22,
        grammar: [
          {
            title: 'Hiện tại đơn (Present Simple) — Câu phủ định',
            desc: 'Dùng để diễn tả việc ai đó không làm hành động gì.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "don't / doesn't", classes: classes.verb },
              { text: "Verb (nguyên mẫu)", classes: classes.verb }
            ],
            examples: [
              { en: 'I don\'t agree with you.', vi: 'Tôi không đồng ý với bạn.' },
              { en: 'He doesn\'t avoid his problems.', vi: 'Anh ấy không trốn tránh vấn đề của mình.' },
              { en: 'We don\'t refuse to help.', vi: 'Chúng tôi không từ chối giúp đỡ.' }
            ],
            note: 'don\'t = do not. doesn\'t = does not. Tương tự như câu hỏi, động từ chính theo sau don\'t/doesn\'t LUÔN ở dạng nguyên mẫu.',
            practiceList: [
              { question: 'I ___ like this shirt.', correct: 'don\'t', meaning: 'Tôi không thích chiếc áo sơ mi này.', explanation: 'Chủ ngữ "I" đi với "don\'t".' },
              { question: 'She ___ eat fast food.', correct: 'doesn\'t', meaning: 'Cô ấy không ăn thức ăn nhanh.', explanation: 'Chủ ngữ "She" đi với "doesn\'t".' },
              { question: 'They don\'t ___ the truth.', correct: 'know', meaning: 'Họ không biết sự thật.', explanation: 'Động từ đi sau don\'t phải ở dạng nguyên mẫu.' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 12: Bài 23 & 24
  {
    cum: 12,
    lessons: [
      {
        order: 23,
        grammar: [
          {
            title: 'Trạng từ tần suất (Adverbs of Frequency)',
            desc: 'Dùng để chỉ mức độ thường xuyên của một hành động (luôn luôn, thường, thỉnh thoảng, không bao giờ...).',
            formula: [
              { text: "S + Trạng từ + V(thường)", classes: classes.other },
              { text: "S + am/is/are + Trạng từ", classes: classes.other }
            ],
            examples: [
              { en: 'I always wake up early.', vi: 'Tôi luôn luôn thức dậy sớm.' },
              { en: 'She is often late for school.', vi: 'Cô ấy thường xuyên đi học muộn.' },
              { en: 'We sometimes go to the cinema.', vi: 'Chúng tôi thỉnh thoảng đi xem phim.' }
            ],
            note: 'Vị trí: Đứng TRƯỚC động từ thường. Đứng SAU động từ to be (am/is/are).',
            practiceList: [
              { question: 'He ___ goes to bed late. (hiếm khi)', correct: 'rarely', meaning: 'Anh ấy hiếm khi đi ngủ muộn.', explanation: 'Trạng từ "rarely" mang nghĩa hiếm khi.' },
              { question: 'They are ___ busy on Mondays. (luôn luôn)', correct: 'always', meaning: 'Họ luôn luôn bận rộn vào các ngày thứ Hai.', explanation: 'Trạng từ đứng sau động từ to be (are).' },
              { question: 'I ___ eat meat. I am a vegetarian. (không bao giờ)', correct: 'never', meaning: 'Tôi không bao giờ ăn thịt. Tôi là người ăn chay.', explanation: '"never" đứng trước động từ thường (eat).' }
            ]
          }
        ]
      },
      {
        order: 24,
        grammar: [
          {
            title: 'Giới từ thời gian: in / on / at',
            desc: 'Dùng để chỉ thời điểm hoặc khoảng thời gian.',
            formula: [
              { text: "in", classes: "border-purple-500 text-purple-600 bg-purple-50" },
              { text: "+ tháng/năm/buổi (in the morning)", classes: classes.noun },
              { text: "on", classes: "border-purple-500 text-purple-600 bg-purple-50" },
              { text: "+ thứ/ngày (on Monday)", classes: classes.noun },
              { text: "at", classes: "border-purple-500 text-purple-600 bg-purple-50" },
              { text: "+ giờ/những dịp lễ (at 7 AM, at night)", classes: classes.noun }
            ],
            examples: [
              { en: 'I sleep at midnight.', vi: 'Tôi ngủ lúc nửa đêm.' },
              { en: 'We don\'t work on weekends.', vi: 'Chúng tôi không làm việc vào cuối tuần.' },
              { en: 'It is hot in the afternoon.', vi: 'Trời nóng vào buổi chiều.' }
            ],
            note: 'Ngoại lệ: at night, at the weekend, at noon.',
            practiceList: [
              { question: 'I always wake up ___ 6 AM.', correct: 'at', meaning: 'Tôi luôn thức dậy lúc 6 giờ sáng.', explanation: 'Đi với giờ cụ thể dùng "at".' },
              { question: 'We have a meeting ___ Friday.', correct: 'on', meaning: 'Chúng tôi có một cuộc họp vào thứ Sáu.', explanation: 'Đi với các thứ trong tuần dùng "on".' },
              { question: 'She was born ___ October.', correct: 'in', meaning: 'Cô ấy sinh vào tháng Mười.', explanation: 'Đi với tháng dùng "in".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 13: Bài 25 & 26
  {
    cum: 13,
    lessons: [
      {
        order: 25,
        grammar: [
          {
            title: 'Hiện tại đơn (Present Simple) — Mô tả nghề nghiệp',
            desc: 'Khi mô tả nghề nghiệp và nhiệm vụ công việc, ta dùng thì hiện tại đơn vì đó là một sự thật, một tình trạng bền vững.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "am / is / are", classes: classes.verb },
              { text: "a / an + Tên nghề nghiệp", classes: classes.noun }
            ],
            examples: [
              { en: 'I am a doctor.', vi: 'Tôi là bác sĩ.' },
              { en: 'She is an engineer.', vi: 'Cô ấy là một kỹ sư.' },
              { en: 'My father drives a taxi. He is a driver.', vi: 'Bố tôi lái xe taxi. Ông ấy là tài xế.' }
            ],
            note: 'Phải dùng mạo từ a/an trước danh từ chỉ nghề nghiệp đếm được số ít.',
            practiceList: [
              { question: 'He is ___ farmer.', correct: 'a', meaning: 'Anh ấy là một nông dân.', explanation: 'Trước danh từ nghề nghiệp số ít bắt đầu bằng phụ âm dùng "a".' },
              { question: 'My sister is ___ artist.', correct: 'an', meaning: 'Chị gái tôi là một họa sĩ.', explanation: 'Trước danh từ bắt đầu bằng nguyên âm (artist) dùng "an".' },
              { question: 'Doctors ___ people. (help)', correct: 'help', meaning: 'Bác sĩ giúp đỡ mọi người.', explanation: 'Danh từ số nhiều (Doctors) nên động từ giữ nguyên.' }
            ]
          }
        ]
      },
      {
        order: 26,
        grammar: [
          {
            title: 'Câu hỏi nghề nghiệp (What do you do?)',
            desc: 'Dùng để hỏi ai đó làm nghề gì thay vì hỏi "What is your job?".',
            formula: [
              { text: "What", classes: classes.other },
              { text: "do / does", classes: classes.verb },
              { text: "Subject", classes: classes.subject },
              { text: "do ?", classes: classes.verb }
            ],
            examples: [
              { en: 'What do you do?', vi: 'Bạn làm nghề gì?' },
              { en: 'What does your mother do?', vi: 'Mẹ bạn làm nghề gì?' },
              { en: 'What do they do?', vi: 'Họ làm nghề gì?' }
            ],
            note: 'Chữ "do" đầu tiên là trợ động từ (chia theo chủ ngữ). Chữ "do" thứ hai là động từ chính (luôn ở nguyên mẫu).',
            practiceList: [
              { question: 'What ___ your brother do?', correct: 'does', meaning: 'Anh trai bạn làm nghề gì?', explanation: 'Chủ ngữ "your brother" là số ít nên dùng trợ động từ "does".' },
              { question: '___ do you do?', correct: 'What', meaning: 'Bạn làm nghề gì?', explanation: 'Từ để hỏi nghề nghiệp là "What".' },
              { question: 'What does a pilot ___?', correct: 'do', meaning: 'Một phi công làm công việc gì?', explanation: 'Động từ chính ở cuối luôn là "do".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 14: Bài 27 & 28
  {
    cum: 14,
    lessons: [
      {
        order: 27,
        grammar: [
          {
            title: 'Hỏi và trả lời về Sở thích',
            desc: 'Dùng thì Hiện tại đơn để nói về những sở thích, thói quen giải trí.',
            formula: [
              { text: "S + like / love / enjoy", classes: classes.verb },
              { text: "V-ing / Noun", classes: classes.noun }
            ],
            examples: [
              { en: 'I like reading books.', vi: 'Tôi thích đọc sách.' },
              { en: 'She loves listening to music.', vi: 'Cô ấy yêu việc nghe nhạc.' },
              { en: 'Do you enjoy traveling?', vi: 'Bạn có tận hưởng việc đi du lịch không?' }
            ],
            note: 'Sau các động từ chỉ sự yêu thích (like, love, enjoy), động từ chính thường ở dạng V-ing.',
            practiceList: [
              { question: 'I enjoy ___ games. (play)', correct: 'playing', meaning: 'Tôi tận hưởng việc chơi game.', explanation: 'Sau "enjoy", động từ thêm "-ing".' },
              { question: 'She ___ watching TV.', correct: 'likes', meaning: 'Cô ấy thích xem tivi.', explanation: 'Chủ ngữ "She" nên động từ "like" phải thêm "s".' },
              { question: 'Do you like ___ to music?', correct: 'listening', meaning: 'Bạn có thích nghe nhạc không?', explanation: 'Sau "like" dùng V-ing (listening).' }
            ]
          }
        ]
      },
      {
        order: 28,
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

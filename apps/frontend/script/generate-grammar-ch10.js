const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Cụm 42: Bài 83 & 84
  {
    cum: 42,
    lessons: [
      {
        order: 83,
        grammar: [
          {
            title: 'Mệnh đề quan hệ (Relative Clauses) — who / which',
            desc: 'Dùng để nối hai câu lại với nhau và giải thích rõ hơn cho một danh từ đứng ngay trước nó.',
            formula: [
              { text: "who: Thay thế cho DANH TỪ CHỈ NGƯỜI", classes: classes.noun },
              { text: "which: Thay thế cho DANH TỪ CHỈ VẬT", classes: classes.noun }
            ],
            examples: [
              { en: 'The man who is talking to Mary is my uncle.', vi: 'Người đàn ông MÀ ĐANG nói chuyện với Mary là chú của tôi.' },
              { en: 'I found the keys which I lost yesterday.', vi: 'Tôi đã tìm thấy những chiếc chìa khóa MÀ tôi làm mất ngày hôm qua.' },
              { en: 'She is the girl who won the first prize.', vi: 'Cô ấy là cô gái MÀ ĐÃ giành giải nhất.' }
            ],
            note: 'Có thể dùng "that" để thay thế cho cả "who" và "which" trong các trường hợp thông thường.',
            practiceList: [
              { question: 'The book ___ is on the table is mine.', correct: 'which', meaning: 'Cuốn sách cái mà ở trên bàn là của tôi.', explanation: '"The book" là vật, dùng đại từ quan hệ "which".' },
              { question: 'He is the doctor ___ saved her life.', correct: 'who', meaning: 'Ông ấy là bác sĩ người mà đã cứu mạng cô ấy.', explanation: '"the doctor" là người, dùng "who".' },
              { question: 'This is the car ___ I bought last year.', correct: 'which', meaning: 'Đây là chiếc ô tô cái mà tôi đã mua năm ngoái.', explanation: '"car" là vật, dùng "which".' }
            ]
          }
        ]
      },
      {
        order: 84,
        grammar: [
          {
            title: 'Mệnh đề quan hệ (Relative Clauses) — where / when',
            desc: 'Dùng để thay thế cho một cụm từ chỉ ĐỊA ĐIỂM (where) hoặc THỜI GIAN (when).',
            formula: [
              { text: "where: Thay thế cho từ chỉ ĐỊA ĐIỂM (in/on/at which)", classes: classes.other },
              { text: "when: Thay thế cho từ chỉ THỜI GIAN", classes: classes.other }
            ],
            examples: [
              { en: 'This is the restaurant where we had dinner.', vi: 'Đây là nhà hàng NƠI MÀ chúng tôi đã ăn tối.' },
              { en: 'I remember the day when we first met.', vi: 'Tôi nhớ cái ngày KHI MÀ chúng ta gặp nhau lần đầu tiên.' },
              { en: 'That is the city where I was born.', vi: 'Đó là thành phố NƠI MÀ tôi sinh ra.' }
            ],
            note: 'Sau "where" và "when" phải là một MỆNH ĐỀ đầy đủ (Subject + Verb). Không dùng where/when làm chủ ngữ.',
            practiceList: [
              { question: 'Do you know the shop ___ they sell good coffee?', correct: 'where', meaning: 'Bạn có biết cửa hàng nơi mà họ bán cà phê ngon không?', explanation: '"shop" là địa điểm, dùng "where".' },
              { question: 'Summer is the season ___ I feel happiest.', correct: 'when', meaning: 'Mùa hè là mùa khi mà tôi cảm thấy hạnh phúc nhất.', explanation: '"season" chỉ thời gian, dùng "when".' },
              { question: 'This is the house ___ I grew up.', correct: 'where', meaning: 'Đây là ngôi nhà nơi mà tôi đã lớn lên.', explanation: 'Nhà là địa điểm, dùng "where".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 43: Bài 85 & 86
  {
    cum: 43,
    lessons: [
      {
        order: 85,
        grammar: [
          {
            title: 'Thói quen trong quá khứ: used to',
            desc: 'Dùng để nói về một thói quen hoặc trạng thái đã từng xảy ra thường xuyên trong QUÁ KHỨ, nhưng BÂY GIỜ KHÔNG CÒN NỮA.',
            formula: [
              { text: "Khẳng định: Subject + used to + Verb (nguyên mẫu)", classes: classes.verb },
              { text: "Phủ định: Subject + didn't use to + Verb", classes: classes.verb }
            ],
            examples: [
              { en: 'I used to smoke, but I stopped last year.', vi: 'Tôi TỪNG hút thuốc, nhưng tôi đã dừng lại vào năm ngoái.' },
              { en: 'She used to live in London.', vi: 'Cô ấy ĐÃ TỪNG sống ở London.' },
              { en: 'We didn\'t use to eat lots of vegetables.', vi: 'Trước đây chúng tôi không có thói quen ăn nhiều rau.' }
            ],
            note: 'Ở dạng phủ định hoặc nghi vấn (did / didn\'t), từ "use" không còn đuôi "d" (không phải used).',
            practiceList: [
              { question: 'He ___ to play tennis a lot.', correct: 'used', meaning: 'Anh ấy từng chơi quần vợt rất nhiều.', explanation: 'Dùng "used to" cho thói quen quá khứ.' },
              { question: 'I didn\'t ___ to like coffee.', correct: 'use', meaning: 'Trước đây tôi không thích cà phê.', explanation: 'Sau "didn\'t", động từ trở về nguyên thể (use), bỏ "d".' },
              { question: '___ you use to go to that school?', correct: 'Did', meaning: 'Bạn đã từng học ở ngôi trường đó phải không?', explanation: 'Câu hỏi quá khứ dùng "Did" đứng đầu.' }
            ]
          }
        ]
      },
      {
        order: 86,
        grammar: [
          {
            title: 'Câu tường thuật (Reported Speech) — Câu kể',
            desc: 'Dùng để thuật lại lời nói của một người khác. Khi tường thuật, ta phải lùi một thì về quá khứ (Hiện tại đơn -> Quá khứ đơn, Hiện tại tiếp diễn -> Quá khứ tiếp diễn...).',
            formula: [
              { text: "S + said (that) + Mệnh đề lùi thì", classes: classes.verb },
              { text: "S + told + Object + (that) + Mệnh đề lùi thì", classes: classes.verb }
            ],
            examples: [
              { en: 'Direct: "I am tired." -> Indirect: He said he was tired.', vi: 'Trực tiếp: "Tôi mệt." -> Gián tiếp: Anh ấy nói anh ấy ĐÃ mệt.' },
              { en: 'Direct: "I like pizza." -> Indirect: She told me she liked pizza.', vi: 'Trực tiếp: "Tôi thích pizza." -> Gián tiếp: Cô ấy bảo tôi rằng cô ấy thích pizza.' },
              { en: 'Direct: "I will go." -> Indirect: He said he would go.', vi: 'Trực tiếp: "Tôi sẽ đi." -> Gián tiếp: Anh ấy nói rằng anh ấy sẽ đi.' }
            ],
            note: '"say" thì không cần tân ngữ (He said that...). "tell" thì PHẢI có tân ngữ (He told ME that...).',
            practiceList: [
              { question: 'She said she ___ very busy today. (be)', correct: 'was', meaning: 'Cô ấy nói rằng cô ấy rất bận hôm nay.', explanation: 'Hiện tại đơn lùi về quá khứ đơn (was).' },
              { question: 'He ___ me that he wanted to leave.', correct: 'told', meaning: 'Anh ấy bảo tôi rằng anh ấy muốn rời đi.', explanation: 'Có tân ngữ "me" nên dùng "told", không dùng "said".' },
              { question: 'John said that he ___ play tennis. (will)', correct: 'would', meaning: 'John nói rằng anh ấy sẽ chơi tennis.', explanation: '"will" lùi thành "would".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 44: Bài 87 & 88
  {
    cum: 44,
    lessons: [
      {
        order: 87,
        grammar: [
          {
            title: 'Quá khứ tiếp diễn (Past Continuous)',
            desc: 'Dùng để diễn tả một hành động ĐANG xảy ra tại một thời điểm XÁC ĐỊNH trong quá khứ.',
            formula: [
              { text: "Subject + was / were + Verb-ing", classes: classes.verb }
            ],
            examples: [
              { en: 'I was sleeping at 10 PM last night.', vi: 'Lúc 10 giờ tối hôm qua, tôi ĐANG ngủ.' },
              { en: 'They were playing football when it rained.', vi: 'Họ ĐANG chơi bóng đá khi trời mưa.' },
              { en: 'What were you doing at 8 AM?', vi: 'Bạn đang làm gì lúc 8 giờ sáng?' }
            ],
            note: 'I/He/She/It dùng "was". You/We/They dùng "were".',
            practiceList: [
              { question: 'She ___ watching TV at 8 PM yesterday.', correct: 'was', meaning: 'Cô ấy đang xem TV lúc 8 giờ tối hôm qua.', explanation: 'Chủ ngữ số ít "She" đi với "was".' },
              { question: 'They ___ having dinner at that time.', correct: 'were', meaning: 'Họ đang ăn tối vào lúc đó.', explanation: 'Chủ ngữ số nhiều "They" đi với "were".' },
              { question: 'What ___ he doing at 10 AM?', correct: 'was', meaning: 'Anh ấy đang làm gì lúc 10 giờ sáng?', explanation: 'Câu hỏi đảo "was" lên trước chủ ngữ "he".' }
            ]
          }
        ]
      },
      {
        order: 88,
        grammar: [
          {
            title: 'Phối hợp thì: Past Simple vs Past Continuous',
            desc: 'Khi một hành động ĐANG diễn ra (Past Continuous) thì có một hành động khác XEN VÀO/CẮT NGANG (Past Simple).',
            formula: [
              { text: "While + S + was/were + V-ing, S + V2/ed", classes: classes.verb },
              { text: "When + S + V2/ed, S + was/were + V-ing", classes: classes.verb }
            ],
            examples: [
              { en: 'While I was taking a shower, the phone rang.', vi: 'TRONG KHI tôi ĐANG tắm, điện thoại ĐÃ RUNG LÊN.' },
              { en: 'I was reading a book when he came.', vi: 'Tôi ĐANG đọc sách KHI anh ấy ĐẾN.' },
              { en: 'When they arrived, we were eating.', vi: 'Khi họ ĐẾN, chúng tôi ĐANG ăn.' }
            ],
            note: 'Hành động dài -> Tiếp diễn (was/were V-ing). Hành động ngắn/đột ngột cắt ngang -> Quá khứ đơn (V2/ed).',
            practiceList: [
              { question: 'I was sleeping when the alarm ___ off. (go)', correct: 'went', meaning: 'Tôi đang ngủ thì chuông báo thức reo.', explanation: 'Hành động ngắn xen vào dùng Quá khứ đơn (went).' },
              { question: 'While we ___ walking, it started to rain. (walk)', correct: 'were', meaning: 'Trong khi chúng tôi đang đi dạo, trời bắt đầu mưa.', explanation: 'Hành động đang kéo dài trong quá khứ dùng Quá khứ tiếp diễn (were walking).' },
              { question: 'She broke the vase while she ___ cleaning. (be)', correct: 'was', meaning: 'Cô ấy đã làm vỡ chiếc bình hoa trong khi cô ấy đang dọn dẹp.', explanation: 'Mệnh đề sau "while" diễn tả hành động đang xảy ra (was cleaning).' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 45: Bài 89 & 90
  {
    cum: 45,
    lessons: [
      {
        order: 89,
        grammar: [] // Tổng ôn toàn khóa, không có điểm ngữ pháp mới
      },
      {
        order: 90,
        grammar: [] // Bài kiểm tra cuối khóa, không có điểm ngữ pháp mới
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

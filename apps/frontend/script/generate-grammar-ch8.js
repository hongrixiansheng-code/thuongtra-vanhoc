const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Cụm 34: Bài 67 & 68
  {
    cum: 34,
    lessons: [
      {
        order: 67,
        grammar: [
          {
            title: 'Động từ khuyết thiếu: must / mustn\'t vs have to / don\'t have to',
            desc: 'Must/Have to đều có nghĩa là PHẢI làm gì. Nhưng thể phủ định của chúng lại mang ý nghĩa hoàn toàn khác nhau.',
            formula: [
              { text: "mustn't: CẤM ĐOÁN (không được phép làm)", classes: classes.verb },
              { text: "don't have to: KHÔNG CẦN THIẾT (làm cũng được, không làm cũng được)", classes: classes.verb }
            ],
            examples: [
              { en: 'You must wear a uniform at work.', vi: 'Bạn phải mặc đồng phục tại nơi làm việc.' },
              { en: 'You mustn\'t smoke in the hospital.', vi: 'Bạn CẤM không được hút thuốc trong bệnh viện.' },
              { en: 'You don\'t have to go if you are tired.', vi: 'Bạn KHÔNG CẦN phải đi nếu bạn mệt.' }
            ],
            note: 'mustn\'t = lệnh cấm tuyệt đối. don\'t have to = sự lựa chọn tự nguyện.',
            practiceList: [
              { question: 'You ___ touch that wire. It\'s dangerous!', correct: 'mustn\'t', meaning: 'Bạn tuyệt đối không được chạm vào dây điện đó. Nó rất nguy hiểm!', explanation: 'Đây là sự cấm đoán, dùng "mustn\'t".' },
              { question: 'Tomorrow is Sunday. We ___ wake up early.', correct: 'don\'t have to', meaning: 'Ngày mai là Chủ Nhật. Chúng ta không cần phải thức dậy sớm.', explanation: 'Không có sự bắt buộc, dùng "don\'t have to".' },
              { question: 'Students ___ wear uniform in this school.', correct: 'have to', meaning: 'Học sinh phải mặc đồng phục ở trường này.', explanation: 'Sự bắt buộc từ nội quy, quy định, dùng "have to" hoặc "must".' }
            ]
          }
        ]
      },
      {
        order: 68,
        grammar: [
          {
            title: 'Động từ khuyết thiếu: need to / needn\'t vs must',
            desc: '"Need to" mang nghĩa "cần phải". Dùng để diễn tả sự cần thiết xuất phát từ hoàn cảnh.',
            formula: [
              { text: "Khẳng định: need to + Verb", classes: classes.verb },
              { text: "Phủ định: needn't + Verb (hoặc don't need to + Verb)", classes: classes.verb }
            ],
            examples: [
              { en: 'I need to buy some medicine.', vi: 'Tôi cần phải mua một chút thuốc.' },
              { en: 'You needn\'t worry about it.', vi: 'Bạn không cần phải lo lắng về điều đó.' },
              { en: 'We don\'t need to hurry.', vi: 'Chúng ta không cần phải vội vã.' }
            ],
            note: '"needn\'t" tương đương với "don\'t have to" / "don\'t need to" (không cần thiết phải làm).',
            practiceList: [
              { question: 'We ___ to follow the rules.', correct: 'need', meaning: 'Chúng ta cần phải tuân theo các quy tắc.', explanation: 'Sau chỗ trống có "to", nên dùng "need".' },
              { question: 'You ___ bring any food. We have plenty.', correct: 'needn\'t', meaning: 'Bạn không cần mang thức ăn đâu. Chúng tôi có nhiều rồi.', explanation: 'Sự không cần thiết, dùng "needn\'t".' },
              { question: 'Do I ___ to sign this document?', correct: 'need', meaning: 'Tôi có cần phải ký tài liệu này không?', explanation: 'Trong câu hỏi với trợ động từ Do/Does, dùng "need to".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 35: Bài 69 & 70
  {
    cum: 35,
    lessons: [
      {
        order: 69,
        grammar: [
          {
            title: 'Khả năng ở hiện tại/tương lai: may / might / could',
            desc: 'Dùng để diễn tả một điều gì đó có khả năng xảy ra, nhưng không chắc chắn 100%.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "may / might / could", classes: classes.verb },
              { text: "Verb (nguyên mẫu)", classes: classes.verb }
            ],
            examples: [
              { en: 'It may rain tomorrow.', vi: 'Ngày mai trời có thể sẽ mưa.' },
              { en: 'He might be at home now.', vi: 'Anh ấy có thể đang ở nhà bây giờ.' },
              { en: 'We could go to the cinema tonight.', vi: 'Chúng ta có thể đi xem phim tối nay.' }
            ],
            note: 'Cả 3 từ đều có nghĩa tương đương "có thể". Phủ định: may not / might not (KHÔNG dùng could not cho tương lai không chắc chắn).',
            practiceList: [
              { question: 'I ___ go to the party, but I am not sure.', correct: 'might', meaning: 'Tôi có thể sẽ đến bữa tiệc, nhưng tôi không chắc.', explanation: 'Diễn tả sự không chắc chắn, dùng "might" hoặc "may".' },
              { question: 'Take an umbrella. It ___ rain.', correct: 'may', meaning: 'Hãy mang theo ô. Trời có thể sẽ mưa.', explanation: 'Dự đoán có thể xảy ra, dùng "may".' },
              { question: 'She might ___ be angry.', correct: 'not', meaning: 'Cô ấy có thể sẽ không tức giận.', explanation: 'Phủ định của might là "might not".' }
            ]
          }
        ]
      },
      {
        order: 70,
        grammar: [
          {
            title: 'Cấu trúc Ước muốn & Lựa chọn: would prefer / would rather',
            desc: 'Dùng để diễn tả sở thích, sự ưu tiên (thích làm cái này hơn cái kia) trong một tình huống cụ thể.',
            formula: [
              { text: "would prefer + to Verb", classes: classes.verb },
              { text: "would rather + Verb (nguyên mẫu)", classes: classes.verb }
            ],
            examples: [
              { en: 'I would prefer to stay at home.', vi: 'Tôi thích ở nhà hơn.' },
              { en: 'I would rather go to the park.', vi: 'Tôi thà đi đến công viên còn hơn.' },
              { en: 'Would you rather drink tea or coffee?', vi: 'Bạn muốn uống trà hay cà phê hơn?' }
            ],
            note: 'would prefer đi với TO VERB. would rather đi với VERB NGUYÊN MẪU (không To).',
            practiceList: [
              { question: 'I would prefer ___ eat at home.', correct: 'to', meaning: 'Tôi thích ăn ở nhà hơn.', explanation: 'Sau "would prefer" là động từ có "to".' },
              { question: 'She would ___ stay single.', correct: 'rather', meaning: 'Cô ấy thà độc thân còn hơn.', explanation: 'Động từ "stay" nguyên mẫu không "to", dùng "would rather".' },
              { question: '___ you rather watch a movie?', correct: 'Would', meaning: 'Bạn có muốn xem phim hơn không?', explanation: 'Cấu trúc câu hỏi là "Would you rather".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 36: Bài 71 & 72
  {
    cum: 36,
    lessons: [
      {
        order: 71,
        grammar: [
          {
            title: 'Trạng từ chỉ thể cách (Adverbs of manner)',
            desc: 'Tính từ dùng để bổ nghĩa cho DANH TỪ. Trạng từ dùng để bổ nghĩa cho ĐỘNG TỪ (chỉ ra cách thức hành động diễn ra).',
            formula: [
              { text: "Quy tắc chung: Tính từ + ly -> Trạng từ (careful -> carefully)", classes: classes.adj },
              { text: "Bất quy tắc: good -> well, fast -> fast, hard -> hard", classes: classes.adj }
            ],
            examples: [
              { en: 'He drives carefully.', vi: 'Anh ấy lái xe một cách cẩn thận.' },
              { en: 'She speaks English very well.', vi: 'Cô ấy nói tiếng Anh rất tốt.' },
              { en: 'They work hard every day.', vi: 'Họ làm việc chăm chỉ mỗi ngày.' }
            ],
            note: 'Không có chữ "fastly" hay "hardly" với nghĩa là nhanh hay chăm chỉ. "hardly" có nghĩa hoàn toàn khác (hiếm khi).',
            practiceList: [
              { question: 'He runs very ___. (fast)', correct: 'fast', meaning: 'Anh ấy chạy rất nhanh.', explanation: '"fast" là trạng từ bất quy tắc, không thêm "ly".' },
              { question: 'She sings ___. (beautiful)', correct: 'beautifully', meaning: 'Cô ấy hát một cách tuyệt đẹp.', explanation: 'Tính từ "beautiful" thêm "ly" thành trạng từ "beautifully".' },
              { question: 'I didn\'t do ___ in the exam. (good)', correct: 'well', meaning: 'Tôi đã làm bài thi không được tốt.', explanation: 'Trạng từ của "good" là "well".' }
            ]
          }
        ]
      },
      {
        order: 72,
        grammar: [
          {
            title: 'Từ chỉ mức độ: too / enough',
            desc: '"too" mang nghĩa là QUÁ (thường mang ý tiêu cực, vượt mức cần thiết). "enough" mang nghĩa là ĐỦ.',
            formula: [
              { text: "too + Tính từ (too hot)", classes: classes.adj },
              { text: "Tính từ + enough (hot enough)", classes: classes.adj }
            ],
            examples: [
              { en: 'This coffee is too hot to drink.', vi: 'Cốc cà phê này quá nóng để uống.' },
              { en: 'He is not tall enough to play basketball.', vi: 'Anh ấy không đủ cao để chơi bóng rổ.' },
              { en: 'Is the water warm enough?', vi: 'Nước có đủ ấm không?' }
            ],
            note: 'Vị trí cực kỳ quan trọng: "too" đứng TRƯỚC tính từ. "enough" đứng SAU tính từ.',
            practiceList: [
              { question: 'The box is ___ heavy for me to lift.', correct: 'too', meaning: 'Chiếc hộp này quá nặng để tôi nâng lên.', explanation: 'Đứng trước tính từ "heavy" dùng "too".' },
              { question: 'She is old ___ to drive a car.', correct: 'enough', meaning: 'Cô ấy đủ tuổi để lái xe.', explanation: 'Đứng sau tính từ "old" dùng "enough".' },
              { question: 'It is ___ dark to see anything.', correct: 'too', meaning: 'Trời quá tối để nhìn thấy bất cứ thứ gì.', explanation: '"too" đứng trước tính từ "dark".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 37: Bài 73 & 74
  {
    cum: 37,
    lessons: [
      {
        order: 73,
        grammar: [
          {
            title: 'So sánh hơn (Comparative) — Tính từ ngắn',
            desc: 'Dùng để so sánh 2 người, 2 vật với nhau. Tính từ ngắn là tính từ có 1 âm tiết, hoặc 2 âm tiết nhưng tận cùng bằng "y".',
            formula: [
              { text: "Tính từ ngắn + er + than", classes: classes.adj }
            ],
            examples: [
              { en: 'My house is smaller than your house.', vi: 'Nhà của tôi nhỏ hơn nhà của bạn.' },
              { en: 'Today is hotter than yesterday.', vi: 'Hôm nay nóng hơn ngày hôm qua.' },
              { en: 'She is happier than me.', vi: 'Cô ấy hạnh phúc hơn tôi.' }
            ],
            note: 'Gấp đôi phụ âm cuối nếu tận cùng là 1 nguyên âm + 1 phụ âm (hot -> hotter). Tận cùng là "y" thì đổi "y" thành "i" rồi thêm "er" (happy -> happier).',
            practiceList: [
              { question: 'A cheetah is ___ than a dog. (fast)', correct: 'faster', meaning: 'Con báo đốm nhanh hơn con chó.', explanation: 'Tính từ ngắn "fast" thêm "er".' },
              { question: 'This box is ___ than that one. (heavy)', correct: 'heavier', meaning: 'Chiếc hộp này nặng hơn chiếc hộp kia.', explanation: 'Tận cùng "y", đổi thành "ier".' },
              { question: 'He is ___ than his brother. (tall)', correct: 'taller', meaning: 'Anh ấy cao hơn anh trai của anh ấy.', explanation: 'Tính từ ngắn "tall" thêm "er".' }
            ]
          }
        ]
      },
      {
        order: 74,
        grammar: [
          {
            title: 'So sánh hơn (Comparative) — Tính từ dài',
            desc: 'Tính từ dài là tính từ có từ 2 âm tiết trở lên (ngoại trừ đuôi "y"). Ta không thêm "-er" mà phải mượn từ "more".',
            formula: [
              { text: "more + Tính từ dài + than", classes: classes.adj }
            ],
            examples: [
              { en: 'This book is more interesting than that one.', vi: 'Cuốn sách này thú vị hơn cuốn kia.' },
              { en: 'She is more beautiful than her sister.', vi: 'Cô ấy xinh đẹp hơn chị gái của cô ấy.' },
              { en: 'Gold is more expensive than silver.', vi: 'Vàng thì đắt đỏ hơn bạc.' }
            ],
            note: 'Bất quy tắc (Dùng chung cho cả ngắn và dài): good -> better | bad -> worse | far -> further/farther.',
            practiceList: [
              { question: 'My car is ___ comfortable than yours.', correct: 'more', meaning: 'Chiếc xe của tôi thoải mái hơn của bạn.', explanation: '"comfortable" là tính từ dài nên phải dùng "more".' },
              { question: 'Your plan is ___ than mine. (good)', correct: 'better', meaning: 'Kế hoạch của bạn tốt hơn của tôi.', explanation: 'So sánh hơn của "good" là từ bất quy tắc "better".' },
              { question: 'This test is more ___ than the last one. (difficult)', correct: 'difficult', meaning: 'Bài kiểm tra này khó hơn bài trước.', explanation: 'Đã có "more", tính từ "difficult" giữ nguyên.' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 38: Bài 75 & 76
  {
    cum: 38,
    lessons: [
      {
        order: 75,
        grammar: [
          {
            title: 'So sánh bằng (Equality): as ... as',
            desc: 'Dùng để so sánh sự ngang bằng (A bằng B) hoặc không ngang bằng (A không bằng B) giữa 2 sự vật.',
            formula: [
              { text: "Khẳng định: as + Tính từ/Trạng từ + as", classes: classes.adj },
              { text: "Phủ định: not as + Tính từ/Trạng từ + as", classes: classes.adj }
            ],
            examples: [
              { en: 'He is as tall as his father.', vi: 'Anh ấy cao bằng bố của anh ấy.' },
              { en: 'This test is not as easy as I thought.', vi: 'Bài kiểm tra này không dễ như tôi đã nghĩ.' },
              { en: 'She speaks English as fluently as a native speaker.', vi: 'Cô ấy nói tiếng Anh lưu loát như một người bản xứ.' }
            ],
            note: 'Tính từ đứng giữa hai từ "as" LUÔN GIỮ NGUYÊN (không thêm -er hay more).',
            practiceList: [
              { question: 'My car is ___ fast as yours.', correct: 'as', meaning: 'Chiếc xe của tôi nhanh bằng xe của bạn.', explanation: 'Cấu trúc so sánh bằng là "as ... as".' },
              { question: 'It is not as ___ as yesterday. (hot)', correct: 'hot', meaning: 'Hôm nay trời không nóng bằng ngày hôm qua.', explanation: 'Tính từ đứng giữa "as ... as" phải giữ nguyên.' },
              { question: 'She doesn\'t run ___ fast as him.', correct: 'as', meaning: 'Cô ấy không chạy nhanh bằng anh ấy.', explanation: 'Cấu trúc phủ định "not as ... as".' }
            ]
          }
        ]
      },
      {
        order: 76,
        grammar: [] // Ôn tập Chương 8, không có điểm ngữ pháp mới
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

const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Cụm 29: Bài 57 & 58
  {
    cum: 29,
    lessons: [
      {
        order: 57,
        grammar: [
          {
            title: 'Tương lai gần (be going to) — Kế hoạch & Ý định',
            desc: 'Dùng để diễn tả một dự định, kế hoạch đã được quyết định TRƯỚC thời điểm nói.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "am/is/are + going to", classes: classes.verb },
              { text: "Verb (nguyên mẫu)", classes: classes.verb }
            ],
            examples: [
              { en: 'I am going to visit my grandparents this weekend.', vi: 'Tôi dự định sẽ đi thăm ông bà vào cuối tuần này.' },
              { en: 'We are going to buy a new house.', vi: 'Chúng tôi dự định sẽ mua một ngôi nhà mới.' },
              { en: 'He isn\'t going to travel tomorrow.', vi: 'Anh ấy không dự định đi du lịch vào ngày mai.' }
            ],
            note: 'Phủ định: thêm "not" sau "am/is/are" (am not / isn\'t / aren\'t going to).',
            practiceList: [
              { question: 'They ___ going to learn French next year.', correct: 'are', meaning: 'Họ dự định sẽ học tiếng Pháp vào năm sau.', explanation: 'Chủ ngữ "They" đi với "are".' },
              { question: 'She is going to ___ a cake for him. (make)', correct: 'make', meaning: 'Cô ấy dự định làm một chiếc bánh cho anh ấy.', explanation: 'Sau "going to" là động từ nguyên mẫu.' },
              { question: 'I ___ going to start a business.', correct: 'am', meaning: 'Tôi dự định sẽ bắt đầu một công việc kinh doanh.', explanation: 'Chủ ngữ "I" đi với "am".' }
            ]
          }
        ]
      },
      {
        order: 58,
        grammar: [
          {
            title: 'Tương lai đơn (will / won\'t) — Dự đoán & Quyết định tức thì',
            desc: 'Dùng "will" để đưa ra quyết định NGAY TẠI LÚC NÓI, hoặc dự đoán điều gì đó trong tương lai không có căn cứ chắc chắn.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "will / won't", classes: classes.verb },
              { text: "Verb (nguyên mẫu)", classes: classes.verb }
            ],
            examples: [
              { en: 'I am tired. I will go to sleep now.', vi: 'Tôi mệt. Tôi sẽ đi ngủ ngay bây giờ.' },
              { en: 'I think it will rain tomorrow.', vi: 'Tôi nghĩ ngày mai trời sẽ mưa.' },
              { en: 'She won\'t come to the party.', vi: 'Cô ấy sẽ không đến bữa tiệc đâu.' }
            ],
            note: 'won\'t = will not. Thường đi kèm các từ: I think, maybe, perhaps, probably.',
            practiceList: [
              { question: 'It\'s cold. I ___ close the window.', correct: 'will', meaning: 'Trời lạnh. Tôi sẽ đóng cửa sổ lại.', explanation: 'Đây là quyết định ngay lúc nói.' },
              { question: 'I think our team ___ win the match.', correct: 'will', meaning: 'Tôi nghĩ đội của chúng ta sẽ thắng trận đấu.', explanation: 'Dự đoán theo suy nghĩ cá nhân dùng "will".' },
              { question: 'He ___ be there on time. (sẽ không)', correct: 'won\'t', meaning: 'Anh ấy sẽ không ở đó đúng giờ đâu.', explanation: 'Dạng phủ định của will là won\'t.' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 30: Bài 59 & 60
  {
    cum: 30,
    lessons: [
      {
        order: 59,
        grammar: [
          {
            title: 'Phân biệt Tương lai: will vs be going to',
            desc: 'Lựa chọn giữa "will" và "be going to" phụ thuộc vào việc bạn đã có kế hoạch từ trước hay chưa.',
            formula: [
              { text: "be going to: Kế hoạch có từ TRƯỚC.", classes: classes.other },
              { text: "will: Quyết định TỨC THÌ lúc nói / Lời hứa.", classes: classes.other }
            ],
            examples: [
              { en: 'A: I don\'t have money. B: I will lend you some.', vi: 'A: Tôi không có tiền. B: Tôi sẽ cho bạn mượn. (Quyết định tức thì)' },
              { en: 'I bought the tickets. I am going to see a movie.', vi: 'Tôi đã mua vé. Tôi sẽ đi xem phim. (Kế hoạch từ trước)' },
              { en: 'I promise I will call you.', vi: 'Tôi hứa tôi sẽ gọi cho bạn.' }
            ],
            note: 'Đối với dự đoán: "be going to" dựa trên bằng chứng hiện tại (Trời nhiều mây đen -> It is going to rain). "will" dựa trên quan điểm cá nhân.',
            practiceList: [
              { question: 'I forgot my wallet! - Don\'t worry, I ___ pay for you.', correct: 'will', meaning: 'Tôi quên ví rồi! - Đừng lo, tôi sẽ trả tiền cho bạn.', explanation: 'Quyết định tức thì giúp đỡ ai đó, dùng "will".' },
              { question: 'She has a plan. She ___ going to study abroad.', correct: 'is', meaning: 'Cô ấy đã có kế hoạch. Cô ấy dự định đi du học.', explanation: 'Đã có kế hoạch từ trước, dùng cấu trúc "be going to".' },
              { question: 'Look at those dark clouds! It is ___ to rain.', correct: 'going', meaning: 'Nhìn những đám mây đen kia kìa! Trời sắp mưa rồi.', explanation: 'Dự đoán có bằng chứng (mây đen), dùng "be going to".' }
            ]
          }
        ]
      },
      {
        order: 60,
        grammar: [
          {
            title: 'Giới từ chỉ địa điểm: in, on, at (Không gian lớn vs nhỏ)',
            desc: 'Sử dụng đúng giới từ để chỉ nơi chốn tùy thuộc vào quy mô của không gian.',
            formula: [
              { text: "in", classes: "border-purple-500 text-purple-600 bg-purple-50" },
              { text: "+ quốc gia, thành phố, không gian kín (in the room)", classes: classes.noun },
              { text: "on", classes: "border-purple-500 text-purple-600 bg-purple-50" },
              { text: "+ bề mặt, con đường (on the table, on the street)", classes: classes.noun },
              { text: "at", classes: "border-purple-500 text-purple-600 bg-purple-50" },
              { text: "+ địa điểm cụ thể, địa chỉ có số (at home, at 123 ABC Street)", classes: classes.noun }
            ],
            examples: [
              { en: 'They live in Vietnam.', vi: 'Họ sống ở Việt Nam.' },
              { en: 'The book is on the desk.', vi: 'Cuốn sách ở trên bàn.' },
              { en: 'She is waiting at the bus stop.', vi: 'Cô ấy đang chờ ở trạm xe buýt.' }
            ],
            note: 'Quy tắc hình tam giác ngược: in (lớn nhất) -> on (vừa) -> at (nhỏ nhất/cụ thể nhất).',
            practiceList: [
              { question: 'I live ___ London.', correct: 'in', meaning: 'Tôi sống ở London.', explanation: 'London là thành phố lớn, dùng "in".' },
              { question: 'There is a picture ___ the wall.', correct: 'on', meaning: 'Có một bức tranh ở trên tường.', explanation: 'Trên một mặt phẳng/bề mặt dùng "on".' },
              { question: 'Let\'s meet ___ the station.', correct: 'at', meaning: 'Hãy gặp nhau tại nhà ga.', explanation: 'Địa điểm cụ thể dùng "at".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 31: Bài 61 & 62
  {
    cum: 31,
    lessons: [
      {
        order: 61,
        grammar: [
          {
            title: 'Giới từ vị trí: in front of, behind, between, next to, under',
            desc: 'Dùng để mô tả vị trí tương đối giữa hai hoặc nhiều vật thể.',
            formula: [
              { text: "in front of (phía trước) | behind (phía sau) | between (ở giữa 2 vật)", classes: classes.other },
              { text: "next to (bên cạnh) | under (bên dưới)", classes: classes.other }
            ],
            examples: [
              { en: 'The car is parked in front of the house.', vi: 'Chiếc xe đỗ ở phía trước ngôi nhà.' },
              { en: 'The cat is hiding under the table.', vi: 'Con mèo đang trốn dưới gầm bàn.' },
              { en: 'I sit between Tom and Mary.', vi: 'Tôi ngồi giữa Tom và Mary.' }
            ],
            note: 'Từ "between" luôn dùng khi một vật nằm giữa HAI vật khác (between A and B).',
            practiceList: [
              { question: 'The bank is ___ to the supermarket.', correct: 'next', meaning: 'Ngân hàng nằm bên cạnh siêu thị.', explanation: 'Cụm từ "next to" nghĩa là bên cạnh.' },
              { question: 'Who is standing ___ you? (phía sau)', correct: 'behind', meaning: 'Ai đang đứng phía sau bạn vậy?', explanation: '"behind" có nghĩa là ở phía sau.' },
              { question: 'The letter B is ___ A and C.', correct: 'between', meaning: 'Chữ cái B nằm giữa A và C.', explanation: 'Nằm giữa hai vật thể/đối tượng dùng "between".' }
            ]
          }
        ]
      },
      {
        order: 62,
        grammar: [
          {
            title: 'Giới từ đi với Phương tiện giao thông',
            desc: 'Cách nói đi bằng phương tiện gì và đang ở trên phương tiện gì.',
            formula: [
              { text: "Cách đi: by + phương tiện (by car, by bus)", classes: classes.other },
              { text: "Đi bộ: on foot", classes: classes.other },
              { text: "Ở trên (vào được, đứng được): on the bus/train/plane", classes: classes.other },
              { text: "Ở trong (không đứng được): in a car/taxi", classes: classes.other }
            ],
            examples: [
              { en: 'I go to work by bus.', vi: 'Tôi đi làm bằng xe buýt.' },
              { en: 'He goes to school on foot.', vi: 'Anh ấy đi bộ đến trường.' },
              { en: 'We are on the train right now.', vi: 'Ngay lúc này chúng tôi đang ở trên tàu hỏa.' }
            ],
            note: 'Không có mạo từ "a/the" sau "by" (chỉ dùng by car, KHÔNG dùng by a car).',
            practiceList: [
              { question: 'They travel to Paris ___ plane.', correct: 'by', meaning: 'Họ đi du lịch tới Paris bằng máy bay.', explanation: 'Chỉ phương thức di chuyển dùng giới từ "by".' },
              { question: 'My house is near. I go there ___ foot.', correct: 'on', meaning: 'Nhà tôi ở gần. Tôi đi bộ tới đó.', explanation: 'Cụm từ đi bộ là "on foot".' },
              { question: 'He is sitting ___ the taxi. (trong)', correct: 'in', meaning: 'Anh ấy đang ngồi trong xe taxi.', explanation: 'Với xe hơi hoặc taxi, dùng "in".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 32: Bài 63 & 64
  {
    cum: 32,
    lessons: [
      {
        order: 63,
        grammar: [
          {
            title: 'Giới từ chỉ Sự chuyển động (Movement)',
            desc: 'Dùng để chỉ hướng hoặc sự di chuyển từ nơi này sang nơi khác.',
            formula: [
              { text: "to (đến) | into (đi vào trong) | out of (ra khỏi)", classes: classes.other },
              { text: "over (vượt qua) | across (băng ngang qua) | through (xuyên qua)", classes: classes.other }
            ],
            examples: [
              { en: 'She walked into the room.', vi: 'Cô ấy đã bước vào trong phòng.' },
              { en: 'The dog jumped over the fence.', vi: 'Con chó đã nhảy qua hàng rào.' },
              { en: 'We drive through the tunnel.', vi: 'Chúng tôi lái xe xuyên qua đường hầm.' }
            ],
            note: '"Across" là băng qua một bề mặt (đi ngang qua đường). "Through" là xuyên qua một không gian 3 chiều (xuyên qua rừng, đường hầm).',
            practiceList: [
              { question: 'Be careful when you walk ___ the street. (băng qua)', correct: 'across', meaning: 'Hãy cẩn thận khi bạn băng qua đường.', explanation: 'Băng qua một bề mặt dùng "across".' },
              { question: 'He took his phone ___ of his pocket. (ra khỏi)', correct: 'out', meaning: 'Anh ấy lấy điện thoại ra khỏi túi.', explanation: 'Cụm từ "out of" nghĩa là ra khỏi.' },
              { question: 'I am going ___ the supermarket.', correct: 'to', meaning: 'Tôi đang đi đến siêu thị.', explanation: 'Chỉ đích đến dùng giới từ "to".' }
            ]
          }
        ]
      },
      {
        order: 64,
        grammar: [
          {
            title: 'Đại từ Tân ngữ (Object Pronouns)',
            desc: 'Đại từ làm tân ngữ, đứng SAU động từ hoặc giới từ để chịu tác động của hành động.',
            formula: [
              { text: "I -> me | you -> you | he -> him | she -> her", classes: classes.noun },
              { text: "it -> it | we -> us | they -> them", classes: classes.noun }
            ],
            examples: [
              { en: 'Can you help me?', vi: 'Bạn có thể giúp tôi được không?' },
              { en: 'I love her.', vi: 'Tôi yêu cô ấy.' },
              { en: 'Look at them!', vi: 'Hãy nhìn họ kìa!' }
            ],
            note: 'Luôn nhớ: Tân ngữ không bao giờ đứng đầu câu làm chủ ngữ. Nó đứng sau Verb hoặc Preposition.',
            practiceList: [
              { question: 'Please give ___ the book. (tôi)', correct: 'me', meaning: 'Làm ơn đưa cho tôi cuốn sách.', explanation: 'Tân ngữ của "I" là "me".' },
              { question: 'We don\'t know ___. (anh ấy)', correct: 'him', meaning: 'Chúng tôi không biết anh ấy.', explanation: 'Tân ngữ của "He" là "him".' },
              { question: 'This present is for ___. (chúng tôi)', correct: 'us', meaning: 'Món quà này là dành cho chúng tôi.', explanation: 'Tân ngữ đứng sau giới từ "for", dùng "us" thay vì "we".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 33: Bài 65 & 66
  {
    cum: 33,
    lessons: [
      {
        order: 65,
        grammar: [
          {
            title: 'Đại từ Sở hữu (Possessive Pronouns)',
            desc: 'Dùng để thay thế cho (Tính từ sở hữu + Danh từ) nhằm tránh lặp từ.',
            formula: [
              { text: "my -> mine | your -> yours | his -> his | her -> hers", classes: classes.noun },
              { text: "our -> ours | their -> theirs", classes: classes.noun }
            ],
            examples: [
              { en: 'This book is mine.', vi: 'Cuốn sách này là của tôi. (mine = my book)' },
              { en: 'Is this pen yours?', vi: 'Cây bút này là của bạn phải không? (yours = your pen)' },
              { en: 'Our house is big. Theirs is small.', vi: 'Nhà của chúng tôi lớn. Nhà của họ thì nhỏ. (Theirs = Their house)' }
            ],
            note: 'Đại từ sở hữu đứng một mình, KHÔNG BAO GIỜ có danh từ theo sau.',
            practiceList: [
              { question: 'That car is not my car. It is ___. (của cô ấy)', correct: 'hers', meaning: 'Chiếc ô tô đó không phải của tôi. Nó là của cô ấy.', explanation: 'Đại từ sở hữu của "her" là "hers".' },
              { question: 'Your phone is black. ___ is white. (của tôi)', correct: 'Mine', meaning: 'Điện thoại của bạn màu đen. Của tôi màu trắng.', explanation: 'Đại từ sở hữu của "my" là "Mine".' },
              { question: 'Are these keys ___? (của bạn)', correct: 'yours', meaning: 'Những chiếc chìa khóa này là của bạn phải không?', explanation: 'Đại từ sở hữu của "your" là "yours".' }
            ]
          }
        ]
      },
      {
        order: 66,
        grammar: [] // Ôn tập Chương 7, không có điểm ngữ pháp mới
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

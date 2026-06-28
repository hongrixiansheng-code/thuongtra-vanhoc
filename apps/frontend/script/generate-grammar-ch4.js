const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Cụm 15: Bài 29 & 30
  {
    cum: 15,
    lessons: [
      {
        order: 29,
        grammar: [
          {
            title: 'Danh từ Đếm được & Không đếm được (Countable & Uncountable)',
            desc: 'Danh từ đếm được có thể thêm số đếm ở trước (1 quả táo, 2 quả táo). Danh từ không đếm được là chất lỏng, bột, khái niệm (không thể nói "1 nước").',
            formula: [
              { text: "Đếm được (Countable): a banana, two bananas", classes: classes.noun },
              { text: "Không đếm được (Uncountable): rice, water", classes: classes.noun }
            ],
            examples: [
              { en: 'I have an apple.', vi: 'Tôi có một quả táo.' },
              { en: 'We need some water.', vi: 'Chúng tôi cần một chút nước.' },
              { en: 'He eats two bananas every day.', vi: 'Anh ấy ăn hai quả chuối mỗi ngày.' }
            ],
            note: 'Không dùng "a/an" hoặc thêm "s/es" vào danh từ không đếm được. Luôn dùng danh từ không đếm được ở dạng số ít.',
            practiceList: [
              { question: 'I need ___ rice for dinner.', correct: 'some', meaning: 'Tôi cần một ít gạo cho bữa tối.', explanation: '"Rice" là danh từ không đếm được nên không dùng "a" hay "an".' },
              { question: 'She bought two ___. (apple)', correct: 'apples', meaning: 'Cô ấy đã mua hai quả táo.', explanation: '"Apple" đếm được nên đi với "two" phải thêm "s".' },
              { question: 'Water ___ good for your health.', correct: 'is', meaning: 'Nước thì tốt cho sức khỏe của bạn.', explanation: 'Danh từ không đếm được (Water) luôn chia động từ số ít (is).' }
            ]
          }
        ]
      },
      {
        order: 30,
        grammar: [
          {
            title: 'Lượng từ "some" và "any"',
            desc: 'Dùng để chỉ một số lượng không xác định (một vài, một ít).',
            formula: [
              { text: "Khẳng định: some + Noun", classes: classes.other },
              { text: "Phủ định & Câu hỏi: any + Noun", classes: classes.other }
            ],
            examples: [
              { en: 'I have some bread.', vi: 'Tôi có một ít bánh mì.' },
              { en: 'We don\'t have any meat.', vi: 'Chúng tôi không có chút thịt nào.' },
              { en: 'Do you have any eggs?', vi: 'Bạn có quả trứng nào không?' }
            ],
            note: '"Some" dùng trong câu khẳng định hoặc câu mời (Would you like some tea?). "Any" dùng trong câu phủ định và câu hỏi.',
            practiceList: [
              { question: 'There is ___ soup in the bowl.', correct: 'some', meaning: 'Có một ít súp trong bát.', explanation: 'Câu khẳng định dùng "some".' },
              { question: 'Are there ___ sandwiches left?', correct: 'any', meaning: 'Có còn cái bánh kẹp nào không?', explanation: 'Câu nghi vấn (câu hỏi) dùng "any".' },
              { question: 'I don\'t want ___ cheese.', correct: 'any', meaning: 'Tôi không muốn chút phô mai nào.', explanation: 'Câu phủ định dùng "any".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 16: Bài 31 & 32
  {
    cum: 16,
    lessons: [
      {
        order: 31,
        grammar: [
          {
            title: 'Lượng từ: a lot of / much / many',
            desc: 'Dùng để chỉ số lượng nhiều.',
            formula: [
              { text: "a lot of + N(số nhiều / không đếm được)", classes: classes.other },
              { text: "many + N(số nhiều đếm được)", classes: classes.other },
              { text: "much + N(không đếm được)", classes: classes.other }
            ],
            examples: [
              { en: 'There are a lot of cups here.', vi: 'Có rất nhiều cốc ở đây.' },
              { en: 'I don\'t have much sugar.', vi: 'Tôi không có nhiều đường.' },
              { en: 'How many apples do you need?', vi: 'Bạn cần bao nhiêu quả táo?' }
            ],
            note: '"a lot of" dùng trong câu khẳng định. "much/many" thường dùng trong câu phủ định và câu hỏi.',
            practiceList: [
              { question: 'We don\'t have ___ time. (nhiều)', correct: 'much', meaning: 'Chúng ta không có nhiều thời gian.', explanation: '"time" là danh từ không đếm được, dùng "much" trong câu phủ định.' },
              { question: 'There are ___ people in the park.', correct: 'many', meaning: 'Có nhiều người trong công viên.', explanation: '"people" là danh từ đếm được số nhiều, dùng "many" hoặc "a lot of".' },
              { question: 'She drinks ___ water every day.', correct: 'a lot of', meaning: 'Cô ấy uống rất nhiều nước mỗi ngày.', explanation: 'Câu khẳng định thường dùng "a lot of".' }
            ]
          }
        ]
      },
      {
        order: 32,
        grammar: [
          {
            title: 'Cụm từ chỉ định lượng (Containers / Quantities)',
            desc: 'Để đếm các danh từ không đếm được (nước, bánh mì...), ta dùng các từ chỉ đơn vị chứa đựng (chai, bát, lát...).',
            formula: [
              { text: "a/two + Container + of + N(không đếm được)", classes: classes.noun }
            ],
            examples: [
              { en: 'I want a bottle of water.', vi: 'Tôi muốn một chai nước.' },
              { en: 'He eats two slices of bread.', vi: 'Anh ấy ăn hai lát bánh mì.' },
              { en: 'Can I have a bowl of soup?', vi: 'Tôi có thể xin một bát súp được không?' }
            ],
            note: 'Khi muốn nói số lượng nhiều (2 chai, 3 bát...), ta thêm "s/es" vào từ chỉ đơn vị (bottles, bowls...), KHÔNG thêm vào danh từ (water, soup).',
            practiceList: [
              { question: 'She bought three ___ of milk. (bottle)', correct: 'bottles', meaning: 'Cô ấy đã mua ba chai sữa.', explanation: '"bottle" là đơn vị đếm được, có số lượng là 3 nên phải thêm "s".' },
              { question: 'I would like a ___ of pizza. (lát)', correct: 'slice', meaning: 'Tôi muốn một lát pizza.', explanation: 'Lát (bánh) trong tiếng Anh là "slice".' },
              { question: 'Please give me two ___ of tea. (cup)', correct: 'cups', meaning: 'Vui lòng cho tôi hai tách trà.', explanation: '"cup" là đơn vị đếm được, số nhiều là "cups".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 17: Bài 33 & 34
  {
    cum: 17,
    lessons: [
      {
        order: 33,
        grammar: [
          {
            title: 'Động từ khuyết thiếu: should / shouldn\'t',
            desc: 'Dùng để đưa ra lời khuyên (nên / không nên làm gì).',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "should / shouldn't", classes: classes.verb },
              { text: "Verb (nguyên mẫu)", classes: classes.verb }
            ],
            examples: [
              { en: 'You should wash your hands.', vi: 'Bạn nên rửa tay của mình.' },
              { en: 'We shouldn\'t eat too much fast food.', vi: 'Chúng ta không nên ăn quá nhiều thức ăn nhanh.' },
              { en: 'Should I boil the water first?', vi: 'Tôi có nên đun sôi nước trước không?' }
            ],
            note: 'Động từ đứng sau should / shouldn\'t luôn ở dạng nguyên mẫu không "to".',
            practiceList: [
              { question: 'You ___ taste the soup now.', correct: 'should', meaning: 'Bạn nên nếm thử súp bây giờ.', explanation: 'Dùng "should" để đưa ra lời khuyên (nên).' },
              { question: 'He ___ drink that dirty water. (không nên)', correct: 'shouldn\'t', meaning: 'Anh ấy không nên uống thứ nước bẩn đó.', explanation: 'Dùng "shouldn\'t" để khuyên ai không nên làm gì.' },
              { question: 'What ___ we do?', correct: 'should', meaning: 'Chúng ta nên làm gì đây?', explanation: 'Cấu trúc câu hỏi với từ để hỏi: Wh-word + should + S + V.' }
            ]
          }
        ]
      },
      {
        order: 34,
        grammar: [
          {
            title: 'Linking Verbs: look, smell, taste + Tính từ',
            desc: 'Một số động từ chỉ giác quan (trông có vẻ, có mùi, có vị) được theo sau bởi TÍNH TỪ (không phải trạng từ) để miêu tả.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "look / smell / taste", classes: classes.verb },
              { text: "Adjective", classes: classes.adj }
            ],
            examples: [
              { en: 'This soup tastes salty.', vi: 'Món súp này có vị mặn.' },
              { en: 'The fresh bread smells good.', vi: 'Bánh mì tươi có mùi thơm.' },
              { en: 'Those apples look delicious.', vi: 'Những quả táo kia trông có vẻ ngon.' }
            ],
            note: 'Sau các động từ này, tuyệt đối dùng Tính từ (Adjective) chứ không dùng Trạng từ (Adverb).',
            practiceList: [
              { question: 'The coffee tastes ___. (bitter)', correct: 'bitter', meaning: 'Cà phê có vị đắng.', explanation: 'Sau "tastes" cộng với một tính từ.' },
              { question: 'It smells ___ in here! (good)', correct: 'good', meaning: 'Ở đây có mùi thơm!', explanation: 'Dùng tính từ "good" sau "smells", không dùng "well".' },
              { question: 'The pizza ___ amazing.', correct: 'looks', meaning: 'Chiếc pizza trông có vẻ tuyệt vời.', explanation: 'Động từ chỉ giác quan "looks" theo sau bởi tính từ.' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 18: Bài 35 & 36
  {
    cum: 18,
    lessons: [
      {
        order: 35,
        grammar: [
          {
            title: 'Câu hỏi số lượng: How much / How many',
            desc: 'Dùng để hỏi số lượng (bao nhiêu).',
            formula: [
              { text: "How many + N(số nhiều đếm được) + ... ?", classes: classes.other },
              { text: "How much + N(không đếm được) + ... ?", classes: classes.other }
            ],
            examples: [
              { en: 'How many forks do we need?', vi: 'Chúng ta cần bao nhiêu chiếc nĩa?' },
              { en: 'How much rice is in the pot?', vi: 'Có bao nhiêu gạo trong nồi?' },
              { en: 'How many pans do you have?', vi: 'Bạn có bao nhiêu cái chảo?' }
            ],
            note: 'How many đi với danh từ ĐẾM ĐƯỢC số nhiều. How much đi với danh từ KHÔNG ĐẾM ĐƯỢC.',
            practiceList: [
              { question: 'How ___ spoons are there?', correct: 'many', meaning: 'Có bao nhiêu chiếc thìa ở đó?', explanation: '"Spoon" (thìa) đếm được, dùng "How many".' },
              { question: 'How ___ water do you drink?', correct: 'much', meaning: 'Bạn uống bao nhiêu nước?', explanation: '"Water" không đếm được, dùng "How much".' },
              { question: 'How ___ apples did you buy?', correct: 'many', meaning: 'Bạn đã mua bao nhiêu quả táo?', explanation: '"Apples" đếm được số nhiều, dùng "How many".' }
            ]
          }
        ]
      },
      {
        order: 36,
        grammar: [
          {
            title: 'Hỏi giá tiền: How much is it?',
            desc: 'Dùng "How much" để hỏi giá cả của một mặt hàng.',
            formula: [
              { text: "How much is / are + Noun ?", classes: classes.other },
              { text: "How much does / do + Noun + cost ?", classes: classes.other }
            ],
            examples: [
              { en: 'How much is this shirt?', vi: 'Chiếc áo sơ mi này giá bao nhiêu?' },
              { en: 'How much are the shoes?', vi: 'Đôi giày đó giá bao nhiêu?' },
              { en: 'How much does it cost?', vi: 'Cái đó tốn bao nhiêu tiền?' }
            ],
            note: '"How much" khi đứng một mình (không có danh từ đằng sau) thường được dùng để hỏi giá.',
            practiceList: [
              { question: 'How much ___ these books?', correct: 'are', meaning: 'Những cuốn sách này giá bao nhiêu?', explanation: 'Chủ ngữ "books" là số nhiều, dùng động từ to be "are".' },
              { question: 'How much does this phone ___?', correct: 'cost', meaning: 'Chiếc điện thoại này có giá bao nhiêu?', explanation: 'Câu hỏi có trợ động từ "does" thì động từ chính "cost" phải giữ nguyên.' },
              { question: 'How ___ is the ticket?', correct: 'much', meaning: 'Cái vé giá bao nhiêu?', explanation: 'Dùng cụm "How much" để hỏi giá tiền.' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 19: Bài 37 & 38
  {
    cum: 19,
    lessons: [
      {
        order: 37,
        grammar: [
          {
            title: 'Cấu trúc lịch sự: would like (Muốn)',
            desc: 'Dùng để gọi món, yêu cầu lịch sự, hoặc đưa ra lời mời (thay cho "want").',
            formula: [
              { text: "S + would like + Noun / to Verb", classes: classes.verb },
              { text: "Would you like + Noun / to Verb ?", classes: classes.verb }
            ],
            examples: [
              { en: 'I would like a cup of coffee, please.', vi: 'Cho tôi một tách cà phê.' },
              { en: 'Would you like to order now?', vi: 'Bạn có muốn gọi món bây giờ không?' },
              { en: 'She would like to see the menu.', vi: 'Cô ấy muốn xem thực đơn.' }
            ],
            note: 'Viết tắt: I would like = I\'d like. Sau "would like" nếu là động từ thì phải có "to" (to Verb).',
            practiceList: [
              { question: 'I ___ like a salad.', correct: 'would', meaning: 'Tôi muốn một đĩa salad.', explanation: 'Dùng cấu trúc "would like" để yêu cầu lịch sự.' },
              { question: 'Would you like ___ drink something?', correct: 'to', meaning: 'Bạn có muốn uống thứ gì đó không?', explanation: 'Theo sau "would like" là một động từ nguyên thể có "to".' },
              { question: 'We ___ like to pay the bill.', correct: 'would', meaning: 'Chúng tôi muốn thanh toán hóa đơn.', explanation: 'Dùng "would like" (chúng tôi muốn).' }
            ]
          }
        ]
      },
      {
        order: 38,
        grammar: [] // Ôn tập Chương 4, không có điểm ngữ pháp mới
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

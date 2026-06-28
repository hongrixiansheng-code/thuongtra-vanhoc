const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Cụm 1: Bài 1 & 2
  {
    cum: 1,
    lessons: [
      {
        order: 1,
        grammar: [
          {
            title: 'Động từ "be" — Khẳng định',
            desc: 'Dùng am/is/are để giới thiệu tên, tuổi, quốc tịch của bản thân và người khác.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "am / is / are", classes: classes.verb },
              { text: "Noun / Adjective", classes: classes.noun }
            ],
            examples: [
              { en: 'I am a student.', vi: 'Tôi là học sinh.' },
              { en: 'He is a teacher.', vi: 'Anh ấy là giáo viên.' }
            ],
            note: '"I" luôn đi với "am". Số ít (he/she/it) đi với "is". Số nhiều (you/we/they) đi với "are".',
            practiceList: [
              { question: 'I ___ a student.', correct: 'am', meaning: 'Tôi là học sinh.', explanation: 'Chủ ngữ "I" luôn đi với động từ "be" là "am".' },
              { question: 'He ___ a teacher.', correct: 'is', meaning: 'Anh ấy là giáo viên.', explanation: 'Chủ ngữ "He" là ngôi thứ 3 số ít, nên dùng "is".' },
              { question: 'They ___ doctors.', correct: 'are', meaning: 'Họ là bác sĩ.', explanation: 'Chủ ngữ "They" là số nhiều, nên dùng "are".' }
            ]
          }
        ]
      },
      {
        order: 2,
        grammar: [
          {
            title: 'Động từ "be" — Phủ định',
            desc: 'Dùng để phủ nhận một thông tin hoặc trạng thái.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "am / is / are + not", classes: classes.verb },
              { text: "Noun / Adjective", classes: classes.noun }
            ],
            examples: [
              { en: 'He isn\'t a father.', vi: 'Anh ấy không phải là bố.' },
              { en: 'They aren\'t a couple.', vi: 'Họ không phải là một cặp đôi.' }
            ],
            note: 'is not = isn\'t, are not = aren\'t. "am not" không có dạng viết tắt chung.',
            practiceList: [
              { question: 'She ___ my sister. (Phủ định)', correct: 'isn\'t', meaning: 'Cô ấy không phải là chị của tôi.', explanation: 'Chủ ngữ "She" đi với "is", phủ định là "isn\'t".' },
              { question: 'They ___ parents yet. (Phủ định)', correct: 'aren\'t', meaning: 'Họ chưa phải là cha mẹ.', explanation: 'Chủ ngữ "They" đi với "are", phủ định là "aren\'t".' }
            ]
          },
          {
            title: 'Động từ "be" — Câu hỏi',
            desc: 'Dùng để đặt câu hỏi xác nhận thông tin.',
            formula: [
              { text: "Am / Is / Are", classes: classes.verb },
              { text: "Subject", classes: classes.subject },
              { text: "Noun / Adjective ?", classes: classes.noun }
            ],
            examples: [
              { en: 'Are they a couple?', vi: 'Họ có phải là một cặp đôi không?' },
              { en: 'Is she a mother?', vi: 'Cô ấy có phải là một người mẹ không?' }
            ],
            note: 'Đảo động từ to be (am/is/are) lên trước chủ ngữ để tạo câu hỏi.',
            practiceList: [
              { question: '___ you a student?', correct: 'Are', meaning: 'Bạn có phải là học sinh không?', explanation: 'Trong câu hỏi với "you", động từ "be" đảo lên đầu là "Are".' },
              { question: '___ he your brother?', correct: 'Is', meaning: 'Anh ấy có phải là anh của bạn không?', explanation: 'Chủ ngữ "he" đi với "is", đảo lên đầu câu hỏi.' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 2: Bài 3 & 4
  {
    cum: 2,
    lessons: [
      {
        order: 3,
        grammar: [
          {
            title: 'Động từ "be" + Tính từ (Mô tả người)',
            desc: 'Dùng am/is/are kết hợp với tính từ để miêu tả tính cách và ngoại hình.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "am / is / are", classes: classes.verb },
              { text: "Adjective", classes: classes.adj }
            ],
            examples: [
              { en: 'My mother is young.', vi: 'Mẹ tôi thì trẻ.' },
              { en: 'He is tall and friendly.', vi: 'Anh ấy cao và thân thiện.' }
            ],
            note: 'Tính từ trong tiếng Anh không thêm "s" kể cả khi chủ ngữ là số nhiều.',
            practiceList: [
              { question: 'My father ___ tall.', correct: 'is', meaning: 'Bố tôi cao.', explanation: '"My father" là số ít nên dùng "is".' },
              { question: 'We ___ friendly.', correct: 'are', meaning: 'Chúng tôi thân thiện.', explanation: '"We" là số nhiều nên dùng "are".' },
              { question: 'She isn\'t fat. She is ___.', correct: 'thin', meaning: 'Cô ấy không béo. Cô ấy gầy.', explanation: 'Dùng tính từ "thin" (gầy).' }
            ]
          }
        ]
      },
      {
        order: 4,
        grammar: [
          {
            title: 'Động từ "have/has" — Sở hữu',
            desc: 'Dùng để diễn tả ai đó có thứ gì hoặc có đặc điểm ngoại hình gì.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "have / has", classes: classes.verb },
              { text: "Noun", classes: classes.noun }
            ],
            examples: [
              { en: 'I have a happy family.', vi: 'Tôi có một gia đình hạnh phúc.' },
              { en: 'She has long hair.', vi: 'Cô ấy có mái tóc dài.' }
            ],
            note: '"have" đi với I/you/we/they. "has" đi với he/she/it.',
            practiceList: [
              { question: 'I ___ a kind brother.', correct: 'have', meaning: 'Tôi có một người anh tốt bụng.', explanation: 'Chủ ngữ "I" đi với "have".' },
              { question: 'She ___ curly hair.', correct: 'has', meaning: 'Cô ấy có mái tóc xoăn.', explanation: 'Chủ ngữ "She" đi với "has".' },
              { question: 'My parents ___ a big house.', correct: 'have', meaning: 'Bố mẹ tôi có một ngôi nhà lớn.', explanation: '"My parents" là số nhiều, đi với "have".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 3: Bài 5 & 6
  {
    cum: 3,
    lessons: [
      {
        order: 5,
        grammar: [
          {
            title: 'Cấu trúc There is / There are — Khẳng định',
            desc: 'Dùng để chỉ sự tồn tại của người hoặc vật ở một nơi nào đó (Có...).',
            formula: [
              { text: "There is / are", classes: classes.verb },
              { text: "Noun", classes: classes.noun },
              { text: "Place", classes: classes.other }
            ],
            examples: [
              { en: 'There is a kitchen.', vi: 'Có một nhà bếp.' },
              { en: 'There are two bedrooms.', vi: 'Có hai phòng ngủ.' }
            ],
            note: 'Nếu theo sau là một chuỗi các vật, dùng "There is" hay "There are" phụ thuộc vào danh từ ĐẦU TIÊN ngay sau nó.',
            practiceList: [
              { question: '___ a garden in my house.', correct: 'There is', meaning: 'Có một khu vườn trong nhà tôi.', explanation: '"a garden" là số ít nên dùng "There is".' },
              { question: '___ three floors.', correct: 'There are', meaning: 'Có ba tầng.', explanation: '"three floors" là số nhiều nên dùng "There are".' },
              { question: '___ a bed and two chairs.', correct: 'There is', meaning: 'Có một cái giường và hai cái ghế.', explanation: 'Danh từ đầu tiên là "a bed" (số ít), nên dùng "There is".' }
            ]
          }
        ]
      },
      {
        order: 6,
        grammar: [
          {
            title: 'Cấu trúc There isn\'t / aren\'t — Phủ định',
            desc: 'Dùng để nói không có vật/người nào đó.',
            formula: [
              { text: "There isn't / aren't", classes: classes.verb },
              { text: "Noun", classes: classes.noun }
            ],
            examples: [
              { en: 'There isn\'t a fridge.', vi: 'Không có tủ lạnh.' },
              { en: 'There aren\'t any chairs.', vi: 'Không có cái ghế nào.' }
            ],
            note: 'Dùng thêm "any" trong câu phủ định số nhiều (aren\'t any chairs).',
            practiceList: [
              { question: '___ a sofa in the room.', correct: 'There isn\'t', meaning: 'Không có ghế sofa trong phòng.', explanation: '"a sofa" là số ít, phủ định dùng "There isn\'t".' },
              { question: 'There ___ any lamps.', correct: 'aren\'t', meaning: 'Không có cái đèn nào cả.', explanation: '"lamps" là số nhiều, phủ định dùng "aren\'t".' }
            ]
          },
          {
            title: 'Cấu trúc Is there / Are there — Câu hỏi',
            desc: 'Dùng để hỏi xem có tồn tại một vật/người nào đó hay không.',
            formula: [
              { text: "Is / Are there", classes: classes.verb },
              { text: "Noun ?", classes: classes.noun }
            ],
            examples: [
              { en: 'Is there a window?', vi: 'Có cửa sổ nào không?' },
              { en: 'Are there any chairs?', vi: 'Có cái ghế nào không?' }
            ],
            note: 'Đảo "Is / Are" lên trước "there".',
            practiceList: [
              { question: '___ a mirror here?', correct: 'Is there', meaning: 'Có cái gương nào ở đây không?', explanation: 'Câu hỏi với danh từ số ít "a mirror".' },
              { question: '___ any doors?', correct: 'Are there', meaning: 'Có cửa ra vào nào không?', explanation: 'Câu hỏi với danh từ số nhiều "doors".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 4: Bài 7 & 8
  {
    cum: 4,
    lessons: [
      {
        order: 7,
        grammar: [
          {
            title: 'Mạo từ: a/an vs the',
            desc: 'Dùng để xác định danh từ đếm được.',
            formula: [
              { text: "a / an / the", classes: classes.other },
              { text: "Noun", classes: classes.noun }
            ],
            examples: [
              { en: 'I see a bank. The bank is big.', vi: 'Tôi thấy một ngân hàng. Ngân hàng đó rất lớn.' },
              { en: 'She is in a hospital.', vi: 'Cô ấy đang ở trong một bệnh viện.' }
            ],
            note: '"a/an": lần đầu nhắc tới. "the": nhắc lại lần 2. "an" dùng trước nguyên âm (u,e,o,a,i).',
            practiceList: [
              { question: 'There is ___ park near my house.', correct: 'a', meaning: 'Có một công viên gần nhà tôi.', explanation: 'Lần đầu nhắc tới, dùng "a".' },
              { question: 'I see a bank. ___ bank is red.', correct: 'The', meaning: 'Tôi thấy một ngân hàng. Ngân hàng đó màu đỏ.', explanation: 'Nhắc lại lần thứ 2, dùng "The".' },
              { question: 'Is there ___ umbrella here?', correct: 'an', meaning: 'Có cây dù nào ở đây không?', explanation: '"umbrella" bắt đầu bằng nguyên âm "u", dùng "an".' }
            ]
          }
        ]
      },
      {
        order: 8,
        grammar: [
          {
            title: 'Giới từ nơi chốn',
            desc: 'Chỉ ra vị trí của đồ vật hoặc địa điểm.',
            formula: [
              { text: "Subject", classes: classes.subject },
              { text: "is / are", classes: classes.verb },
              { text: "Preposition", classes: "border-purple-500 text-purple-600 bg-purple-50" },
              { text: "Place", classes: classes.noun }
            ],
            examples: [
              { en: 'The pharmacy is next to the gym.', vi: 'Tiệm thuốc ở cạnh phòng gym.' },
              { en: 'The café is between the bank and the market.', vi: 'Quán cà phê nằm giữa ngân hàng và chợ.' }
            ],
            note: 'between A and B (giữa A và B). opposite (đối diện).',
            practiceList: [
              { question: 'The book is ___ the table.', correct: 'on', meaning: 'Quyển sách ở trên bàn.', explanation: 'Ở bên trên bề mặt dùng "on".' },
              { question: 'The museum is ___ the cinema.', correct: 'next to', meaning: 'Bảo tàng nằm ngay cạnh rạp chiếu phim.', explanation: 'Nằm ngay bên cạnh dùng "next to".' },
              { question: 'The park is ___ the school and the library.', correct: 'between', meaning: 'Công viên nằm giữa trường học và thư viện.', explanation: 'Có hai vật "the school" và "the library", nên dùng "between".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 5: Bài 9 & 10
  {
    cum: 5,
    lessons: [
      {
        order: 9,
        grammar: [
          {
            title: 'Đại từ chỉ định (This / That / These / Those)',
            desc: 'Dùng để chỉ vị trí của đồ vật so với người nói (gần hay xa).',
            formula: [
              { text: "This / That", classes: classes.subject },
              { text: "is", classes: classes.verb },
              { text: "Singular Noun", classes: classes.noun }
            ],
            examples: [
              { en: 'This is my bag.', vi: 'Đây là cái túi của tôi.' },
              { en: 'That is a beautiful car.', vi: 'Kia là một chiếc xe đẹp.' }
            ],
            note: 'Gần: This (số ít) / These (số nhiều). Xa: That (số ít) / Those (số nhiều).',
            practiceList: [
              { question: '___ is my house. (Gần)', correct: 'This', meaning: 'Đây là nhà của tôi.', explanation: 'Chỉ 1 ngôi nhà (số ít) ở gần, dùng "This".' },
              { question: '___ are my books. (Gần)', correct: 'These', meaning: 'Đây là những quyển sách của tôi.', explanation: 'Nhiều quyển sách (số nhiều) ở gần, dùng "These".' },
              { question: 'Look at ___ birds! (Xa)', correct: 'those', meaning: 'Nhìn những con chim kia kìa!', explanation: 'Nhiều con chim (số nhiều) ở xa, dùng "those".' }
            ]
          }
        ]
      },
      {
        order: 10,
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

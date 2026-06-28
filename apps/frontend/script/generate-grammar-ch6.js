const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Cụm 24: Bài 47 & 48
  {
    cum: 24,
    lessons: [
      {
        order: 47,
        grammar: [
          {
            title: 'Quá khứ đơn (Past Simple) — Động từ bất quy tắc (Nhóm 1)',
            desc: 'Một số động từ khi chuyển sang thì Quá khứ đơn không tuân theo quy tắc thêm "-ed", mà phải học thuộc lòng.',
            formula: [
              { text: "win -> won | run -> ran | swim -> swam", classes: classes.verb }
            ],
            examples: [
              { en: 'We won the football match yesterday.', vi: 'Hôm qua chúng tôi đã thắng trận bóng đá.' },
              { en: 'The dog ran very fast.', vi: 'Con chó đã chạy rất nhanh.' },
              { en: 'She swam in the sea last summer.', vi: 'Cô ấy đã bơi ở biển vào mùa hè năm ngoái.' }
            ],
            note: 'Không thêm "-ed" vào các động từ bất quy tắc (VD: không dùng "runned" hay "swimmed").',
            practiceList: [
              { question: 'Our team ___ the game. (win)', correct: 'won', meaning: 'Đội của chúng tôi đã thắng trò chơi.', explanation: 'Quá khứ của "win" là "won".' },
              { question: 'He ___ five kilometers yesterday. (run)', correct: 'ran', meaning: 'Hôm qua anh ấy đã chạy năm kilomet.', explanation: 'Quá khứ của "run" là "ran".' },
              { question: 'I ___ in the lake yesterday. (swim)', correct: 'swam', meaning: 'Hôm qua tôi đã bơi trong hồ.', explanation: 'Quá khứ của "swim" là "swam".' }
            ]
          }
        ]
      },
      {
        order: 48,
        grammar: [
          {
            title: 'Quá khứ đơn (Past Simple) — Động từ bất quy tắc (Nhóm 2)',
            desc: 'Nhóm các động từ bất quy tắc chỉ hoạt động hàng ngày thường gặp.',
            formula: [
              { text: "go -> went | eat -> ate | drink -> drank", classes: classes.verb },
              { text: "do -> did | have -> had | make -> made", classes: classes.verb }
            ],
            examples: [
              { en: 'I went to the cinema last night.', vi: 'Tối qua tôi đã đi xem phim.' },
              { en: 'She ate a big pizza for dinner.', vi: 'Cô ấy đã ăn một chiếc pizza lớn cho bữa tối.' },
              { en: 'We made a cake together.', vi: 'Chúng tôi đã cùng nhau làm một chiếc bánh.' }
            ],
            note: 'Phải ghi nhớ các động từ này vì chúng xuất hiện rất thường xuyên trong giao tiếp.',
            practiceList: [
              { question: 'I ___ to Paris last year. (go)', correct: 'went', meaning: 'Năm ngoái tôi đã đi đến Paris.', explanation: 'Quá khứ của "go" là "went".' },
              { question: 'They ___ a great time at the party. (have)', correct: 'had', meaning: 'Họ đã có một thời gian tuyệt vời tại bữa tiệc.', explanation: 'Quá khứ của "have" là "had".' },
              { question: 'He ___ his homework quickly. (do)', correct: 'did', meaning: 'Anh ấy đã làm bài tập về nhà của mình một cách nhanh chóng.', explanation: 'Quá khứ của "do" là "did".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 25: Bài 49 & 50
  {
    cum: 25,
    lessons: [
      {
        order: 49,
        grammar: [
          {
            title: 'Quá khứ đơn (Past Simple) — Động từ bất quy tắc (Nhóm 3)',
            desc: 'Nhóm các động từ bất quy tắc liên quan đến nhận thức, giao tiếp và hành động lịch sử.',
            formula: [
              { text: "see -> saw | hear -> heard | say -> said", classes: classes.verb },
              { text: "think -> thought | know -> knew | build -> built", classes: classes.verb }
            ],
            examples: [
              { en: 'I saw him at the park yesterday.', vi: 'Hôm qua tôi đã nhìn thấy anh ấy ở công viên.' },
              { en: 'She said she was tired.', vi: 'Cô ấy nói rằng cô ấy đang mệt.' },
              { en: 'The Romans built this bridge.', vi: 'Người La Mã đã xây cây cầu này.' }
            ],
            note: 'Dù là bất quy tắc nhưng cấu trúc câu khẳng định vẫn không thay đổi (S + V2 + O).',
            practiceList: [
              { question: 'I ___ a loud noise outside. (hear)', correct: 'heard', meaning: 'Tôi đã nghe thấy một tiếng ồn lớn ở bên ngoài.', explanation: 'Quá khứ của "hear" là "heard".' },
              { question: 'He ___ the answer to the question. (know)', correct: 'knew', meaning: 'Anh ấy đã biết đáp án cho câu hỏi.', explanation: 'Quá khứ của "know" là "knew".' },
              { question: 'They ___ a new school in my town. (build)', correct: 'built', meaning: 'Họ đã xây một ngôi trường mới trong thị trấn của tôi.', explanation: 'Quá khứ của "build" là "built".' }
            ]
          }
        ]
      },
      {
        order: 50,
        grammar: [
          {
            title: 'Quá khứ đơn (Past Simple) — Câu hỏi với "Did"',
            desc: 'Để đặt câu hỏi có/không hoặc câu hỏi với Wh-words trong quá khứ, ta dùng trợ động từ "Did".',
            formula: [
              { text: "Did + Subject + Verb (nguyên mẫu) ?", classes: classes.verb },
              { text: "Wh-word + did + Subject + Verb (nguyên mẫu) ?", classes: classes.verb }
            ],
            examples: [
              { en: 'Did you see my keys?', vi: 'Bạn có nhìn thấy chìa khóa của tôi không?' },
              { en: 'Where did you go last night?', vi: 'Tối qua bạn đã đi đâu?' },
              { en: 'When did they arrive?', vi: 'Họ đã đến nơi khi nào?' }
            ],
            note: 'Quan trọng: Khi đã mượn trợ động từ "Did", động từ chính LUÔN trở về dạng nguyên mẫu.',
            practiceList: [
              { question: '___ you finish the project?', correct: 'Did', meaning: 'Bạn đã hoàn thành dự án chưa?', explanation: 'Dùng trợ động từ "Did" ở đầu câu hỏi quá khứ đơn.' },
              { question: 'What ___ he say?', correct: 'did', meaning: 'Anh ấy đã nói gì?', explanation: 'Sau từ để hỏi "What" là trợ động từ "did".' },
              { question: 'Did she ___ the ticket? (buy)', correct: 'buy', meaning: 'Cô ấy đã mua vé chưa?', explanation: 'Có trợ động từ "Did", động từ chính phải ở nguyên mẫu "buy".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 26: Bài 51 & 52
  {
    cum: 26,
    lessons: [
      {
        order: 51,
        grammar: [
          {
            title: 'Quá khứ đơn (Past Simple) — Câu phủ định với "didn\'t"',
            desc: 'Để nói ai đó ĐÃ KHÔNG làm gì trong quá khứ, ta dùng "didn\'t".',
            formula: [
              { text: "Subject + didn't + Verb (nguyên mẫu)", classes: classes.verb }
            ],
            examples: [
              { en: 'I didn\'t sleep well last night.', vi: 'Tối qua tôi đã không ngủ ngon.' },
              { en: 'She didn\'t come to the party.', vi: 'Cô ấy đã không đến dự bữa tiệc.' },
              { en: 'They didn\'t know about the problem.', vi: 'Họ đã không biết về vấn đề đó.' }
            ],
            note: 'didn\'t = did not. Sau "didn\'t" thì động từ chính LUÔN ở dạng nguyên mẫu, không thêm -ed hay bất quy tắc.',
            practiceList: [
              { question: 'We ___ have time to eat. (không có)', correct: 'didn\'t', meaning: 'Chúng tôi đã không có thời gian để ăn.', explanation: 'Câu phủ định ở thì quá khứ đơn dùng "didn\'t".' },
              { question: 'He didn\'t ___ the mistake. (see)', correct: 'see', meaning: 'Anh ấy đã không nhìn thấy lỗi sai đó.', explanation: 'Sau "didn\'t", động từ giữ nguyên mẫu (see).' },
              { question: 'I ___ go out yesterday.', correct: 'didn\'t', meaning: 'Hôm qua tôi đã không ra ngoài.', explanation: 'Dùng trợ động từ "didn\'t" cho câu phủ định.' }
            ]
          }
        ]
      },
      {
        order: 52,
        grammar: [
          {
            title: 'Lỗi chia động từ thường gặp trong Quá khứ đơn',
            desc: 'Học viên rất hay mắc lỗi tiếp tục chia động từ ở dạng quá khứ ngay cả khi đã dùng trợ động từ did/didn\'t.',
            formula: [
              { text: "Sai: I didn't WENT", classes: classes.subject },
              { text: "Đúng: I didn't GO", classes: classes.verb }
            ],
            examples: [
              { en: 'He didn\'t understand the question. (KHÔNG NÓI: didn\'t understood)', vi: 'Anh ấy đã không hiểu câu hỏi.' },
              { en: 'Did you buy a new car? (KHÔNG NÓI: Did you bought)', vi: 'Bạn đã mua một chiếc ô tô mới phải không?' },
              { en: 'I didn\'t see anything. (KHÔNG NÓI: didn\'t saw)', vi: 'Tôi đã không nhìn thấy bất cứ thứ gì.' }
            ],
            note: 'Luôn nhớ quy tắc vàng: Có DID / DIDN\'T -> Động từ nguyên mẫu.',
            practiceList: [
              { question: 'Did they ___ the match? (win / won)', correct: 'win', meaning: 'Họ đã thắng trận đấu phải không?', explanation: 'Có trợ động từ "Did", động từ chính phải là "win".' },
              { question: 'She didn\'t ___ the email. (send / sent)', correct: 'send', meaning: 'Cô ấy đã không gửi email đó.', explanation: 'Sau "didn\'t", động từ chính phải là "send".' },
              { question: 'What did you ___? (do / did)', correct: 'do', meaning: 'Bạn đã làm gì?', explanation: 'Có trợ động từ "did", động từ chính phải là "do".' }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 27: Bài 53 & 54
  {
    cum: 27,
    lessons: [
      {
        order: 53,
        grammar: [
          {
            title: 'Từ nối chỉ trình tự thời gian (Sequence Words)',
            desc: 'Dùng để liên kết các sự kiện trong một câu chuyện theo đúng trình tự thời gian.',
            formula: [
              { text: "First / Then / Next / After that / Finally", classes: classes.other }
            ],
            examples: [
              { en: 'First, I woke up. Then, I had breakfast.', vi: 'Đầu tiên, tôi thức dậy. Sau đó, tôi ăn sáng.' },
              { en: 'After that, we went to the beach.', vi: 'Sau việc đó, chúng tôi đã đi đến bãi biển.' },
              { en: 'Finally, we returned home.', vi: 'Cuối cùng, chúng tôi trở về nhà.' }
            ],
            note: 'Các từ nối này thường đứng ở đầu câu và được theo sau bởi một dấu phẩy (,).',
            practiceList: [
              { question: '___, we packed our bags. (Đầu tiên)', correct: 'First', meaning: 'Đầu tiên, chúng tôi sắp xếp hành lý.', explanation: 'Bắt đầu câu chuyện dùng "First".' },
              { question: 'We played games. ___, we had lunch. (Sau đó)', correct: 'Then', meaning: 'Chúng tôi chơi trò chơi. Sau đó, chúng tôi ăn trưa.', explanation: '"Then" dùng để nối tiếp sự kiện ngay sau đó.' },
              { question: '___, the trip ended. (Cuối cùng)', correct: 'Finally', meaning: 'Cuối cùng, chuyến đi kết thúc.', explanation: '"Finally" dùng để khép lại chuỗi sự kiện.' }
            ]
          }
        ]
      },
      {
        order: 54,
        grammar: [] // Bài thực hành kỹ năng kể chuyện, không có điểm ngữ pháp mới
      }
    ]
  },
  // Cụm 28: Bài 55 & 56
  {
    cum: 28,
    lessons: [
      {
        order: 55,
        grammar: [
          {
            title: 'Câu ghép (Compound Sentences) — and, but, so, because',
            desc: 'Dùng liên từ để nối hai mệnh đề lại với nhau, tạo thành câu dài và chi tiết hơn.',
            formula: [
              { text: "and (và) | but (nhưng)", classes: classes.verb },
              { text: "so (vì vậy) | because (bởi vì)", classes: classes.verb }
            ],
            examples: [
              { en: 'I was tired, so I went to bed early.', vi: 'Tôi đã mệt, vì vậy tôi đi ngủ sớm.' },
              { en: 'He was angry because he lost the game.', vi: 'Anh ấy đã tức giận bởi vì anh ấy thua trò chơi.' },
              { en: 'It rained heavily, but we still played football.', vi: 'Trời mưa to, nhưng chúng tôi vẫn chơi bóng đá.' }
            ],
            note: 'Lưu ý: "so" (chỉ kết quả), "because" (chỉ nguyên nhân). Thường có dấu phẩy trước "but" và "so".',
            practiceList: [
              { question: 'I wanted to go out, ___ it was raining.', correct: 'but', meaning: 'Tôi muốn đi ra ngoài, nhưng trời đang mưa.', explanation: '"but" chỉ sự tương phản.' },
              { question: 'She was sick, ___ she stayed at home.', correct: 'so', meaning: 'Cô ấy bị ốm, vì vậy cô ấy ở nhà.', explanation: '"so" chỉ kết quả của việc bị ốm.' },
              { question: 'They didn\'t swim ___ the water was cold.', correct: 'because', meaning: 'Họ đã không bơi bởi vì nước lạnh.', explanation: '"because" chỉ nguyên nhân.' }
            ]
          }
        ]
      },
      {
        order: 56,
        grammar: [] // Ôn tập Chương 6, không có điểm ngữ pháp mới
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

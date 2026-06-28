const fs = require('fs');

const classes = {
  subject: "border-red-500 text-red-600 bg-red-50",
  verb: "border-blue-500 text-blue-600 bg-blue-50",
  noun: "border-green-500 text-green-600 bg-green-50",
  adj: "border-orange-500 text-orange-600 bg-orange-50",
  other: "border-slate-500 text-slate-600 bg-slate-50"
};

const data = [
  // Chương 5
  {
    orderIndex: 14,
    grammar: [
      {
        title: 'Bày tỏ ý kiến với "I think..."',
        desc: 'Dùng "I think" để đưa ra suy nghĩ, ý kiến cá nhân của mình về một điều gì đó.',
        formula: [
          { text: "I think + (that) + S + V", classes: classes.verb }
        ],
        examples: [
          { en: 'I think that she is a good doctor.', vi: 'Tôi nghĩ rằng cô ấy là một bác sĩ giỏi.' },
          { en: 'I think this book is very interesting.', vi: 'Tôi nghĩ cuốn sách này rất thú vị.' },
          { en: 'Do you think it will rain tomorrow?', vi: 'Bạn có nghĩ ngày mai trời sẽ mưa không?' }
        ],
        note: 'Từ "that" có thể được lược bỏ trong câu nói hàng ngày.',
        practiceList: [
          { question: 'I ___ that English is easy to learn.', correct: 'think', meaning: 'Tôi nghĩ rằng tiếng Anh rất dễ học.', explanation: 'Dùng "think" để bày tỏ ý kiến.' },
          { question: 'I think ___ he is a nice person.', correct: 'that', meaning: 'Tôi nghĩ rằng anh ấy là một người tốt.', explanation: 'Từ nối "that" thường đi sau "I think".' },
          { question: 'What do you ___ about this movie?', correct: 'think', meaning: 'Bạn nghĩ gì về bộ phim này?', explanation: 'Cụm "What do you think" dùng để hỏi ý kiến.' }
        ]
      },
      {
        title: 'Phân biệt "practice" và "practise"',
        desc: 'Hai từ này phát âm giống nhau nhưng khác nhau về từ loại và cách viết (theo Anh-Anh).',
        formula: [
          { text: "practice (Noun - Danh từ): sự thực hành", classes: classes.noun },
          { text: "practise (Verb - Động từ): luyện tập", classes: classes.verb }
        ],
        examples: [
          { en: 'You need more piano practice.', vi: 'Bạn cần thực hành piano nhiều hơn. (Noun)' },
          { en: 'I practise speaking English every day.', vi: 'Tôi luyện nói tiếng Anh mỗi ngày. (Verb)' },
          { en: 'Practice makes perfect.', vi: 'Có công mài sắt có ngày nên kim (Thực hành tạo nên sự hoàn hảo). (Noun)' }
        ],
        note: 'Trong tiếng Anh-Mỹ (US English), người ta chỉ dùng một từ "practice" cho cả danh từ và động từ.',
        practiceList: [
          { question: 'I must ___ playing the guitar tonight. (verb)', correct: 'practise', meaning: 'Tôi phải luyện chơi guitar tối nay.', explanation: 'Đứng sau "must" là động từ (practise).' },
          { question: 'She does a lot of tennis ___. (noun)', correct: 'practice', meaning: 'Cô ấy có rất nhiều bài tập thực hành tennis.', explanation: 'Đứng sau "a lot of" là danh từ (practice).' },
          { question: 'Did you ___ your English today? (verb)', correct: 'practise', meaning: 'Hôm nay bạn đã luyện tiếng Anh chưa?', explanation: 'Đứng sau "Did you" là động từ nguyên mẫu (practise).' }
        ]
      }
    ]
  },
  // Chương 6
  {
    orderIndex: 15,
    grammar: [
      {
        title: 'Danh từ số nhiều bất quy tắc (Irregular Plurals)',
        desc: 'Một số danh từ khi chuyển sang số nhiều không thêm "s/es" mà biến đổi hoàn toàn hoặc giữ nguyên.',
        formula: [
          { text: "leaf -> leaves | wolf -> wolves", classes: classes.noun },
          { text: "child -> children | foot -> feet | tooth -> teeth", classes: classes.noun }
        ],
        examples: [
          { en: 'The tree has many green leaves.', vi: 'Cây có rất nhiều lá xanh.' },
          { en: 'I brush my teeth twice a day.', vi: 'Tôi đánh răng hai lần một ngày.' },
          { en: 'The children are playing outside.', vi: 'Những đứa trẻ đang chơi bên ngoài.' }
        ],
        note: 'Danh từ tận cùng bằng "f" hoặc "fe" thường đổi thành "ves".',
        practiceList: [
          { question: 'There are many yellow ___ on the ground. (leaf)', correct: 'leaves', meaning: 'Có nhiều chiếc lá vàng trên mặt đất.', explanation: 'Số nhiều của "leaf" là "leaves".' },
          { question: 'He has very big ___. (foot)', correct: 'feet', meaning: 'Anh ấy có bàn chân rất to.', explanation: 'Số nhiều của "foot" là "feet".' },
          { question: 'Three ___ are running in the park. (child)', correct: 'children', meaning: 'Ba đứa trẻ đang chạy trong công viên.', explanation: 'Số nhiều của "child" là "children".' }
        ]
      },
      {
        title: 'So sánh hơn của Tính từ ngắn (Giới thiệu)',
        desc: 'Dùng để so sánh 2 người hoặc 2 vật. Tính từ ngắn thêm đuôi "-er".',
        formula: [
          { text: "S + be + Tính từ ngắn + er + than + O", classes: classes.adj }
        ],
        examples: [
          { en: 'An elephant is bigger than a dog.', vi: 'Một con voi thì to hơn một con chó.' },
          { en: 'My brother is taller than me.', vi: 'Anh trai tôi cao hơn tôi.' },
          { en: 'A cheetah is faster than a lion.', vi: 'Một con báo đốm thì nhanh hơn một con sư tử.' }
        ],
        note: 'Nếu tính từ tận cùng là 1 nguyên âm + 1 phụ âm, ta gấp đôi phụ âm cuối (big -> bigger).',
        practiceList: [
          { question: 'A hippo is ___ than a pig. (big)', correct: 'bigger', meaning: 'Một con hà mã to hơn một con lợn.', explanation: 'Gấp đôi phụ âm "g" rồi thêm "er".' },
          { question: 'The monkey is ___ than the cat. (clever)', correct: 'cleverer', meaning: 'Con khỉ thì thông minh hơn con mèo.', explanation: '"clever" có thể thêm "er" thành "cleverer".' },
          { question: 'A mouse is ___ than an elephant. (small)', correct: 'smaller', meaning: 'Một con chuột nhỏ hơn một con voi.', explanation: 'Thêm "er" vào "small".' }
        ]
      }
    ]
  },
  {
    orderIndex: 16,
    grammar: [
      {
        title: 'Cấu trúc "It is + adj" chỉ thời tiết',
        desc: 'Dùng chủ ngữ giả "It" kết hợp với tính từ để mô tả thời tiết.',
        formula: [
          { text: "It is + cloudy / sunny / windy / raining / snowing", classes: classes.adj }
        ],
        examples: [
          { en: 'It is very sunny today.', vi: 'Hôm nay trời rất nắng.' },
          { en: 'It is cloudy in the sky.', vi: 'Trên trời đang có nhiều mây.' },
          { en: 'Look! It is snowing.', vi: 'Nhìn kìa! Trời đang có tuyết rơi.' }
        ],
        note: 'Ngoài tính từ, ta có thể dùng động từ đuôi -ing (raining, snowing) trong thì tiếp diễn.',
        practiceList: [
          { question: '___ is raining outside.', correct: 'It', meaning: 'Bên ngoài trời đang mưa.', explanation: 'Dùng "It" làm chủ ngữ giả chỉ thời tiết.' },
          { question: 'It is very ___ today. Let\'s fly a kite! (wind)', correct: 'windy', meaning: 'Hôm nay trời rất nhiều gió. Hãy đi thả diều nào!', explanation: 'Tính từ của "wind" là "windy".' },
          { question: 'It ___ hot and sunny in summer.', correct: 'is', meaning: 'Trời nóng và nắng vào mùa hè.', explanation: 'Động từ to be đi với "It" là "is".' }
        ]
      },
      {
        title: 'Giới từ chỉ vị trí "near" (Gần)',
        desc: 'Dùng để chỉ một vật thể nằm ở khoảng cách ngắn so với một vật thể khác.',
        formula: [
          { text: "near + Danh từ", classes: classes.other }
        ],
        examples: [
          { en: 'My house is near the river.', vi: 'Nhà của tôi ở gần dòng sông.' },
          { en: 'Do you live near the school?', vi: 'Bạn có sống gần trường học không?' },
          { en: 'There is a tree near the window.', vi: 'Có một cái cây ở gần cửa sổ.' }
        ],
        note: 'Không dùng "near to", chỉ cần dùng "near" + danh từ.',
        practiceList: [
          { question: 'The hospital is ___ the park. (gần)', correct: 'near', meaning: 'Bệnh viện ở gần công viên.', explanation: 'Dùng giới từ "near".' },
          { question: 'Don\'t stand too ___ the fire.', correct: 'near', meaning: 'Đừng đứng quá gần ngọn lửa.', explanation: '"near" chỉ khoảng cách gần.' },
          { question: 'Is there a shop ___ here?', correct: 'near', meaning: 'Có cửa hàng nào gần đây không?', explanation: 'Cụm "near here" nghĩa là gần khu vực này.' }
        ]
      }
    ]
  },
  {
    orderIndex: 17,
    grammar: [
      {
        title: 'So sánh hơn mở rộng (Quy tắc đuôi "y")',
        desc: 'Đối với tính từ có 2 âm tiết kết thúc bằng "y", ta đổi "y" thành "i" rồi thêm "er".',
        formula: [
          { text: "happy -> happier | heavy -> heavier", classes: classes.adj }
        ],
        examples: [
          { en: 'I am happier today than yesterday.', vi: 'Hôm nay tôi vui hơn hôm qua.' },
          { en: 'This bag is heavier than yours.', vi: 'Cái túi này nặng hơn túi của bạn.' },
          { en: 'Math is easier than Science for me.', vi: 'Môn Toán dễ hơn môn Khoa học đối với tôi.' }
        ],
        note: 'Nhớ dùng "than" để so sánh với đối tượng thứ hai.',
        practiceList: [
          { question: 'My dog is ___ than your dog. (funny)', correct: 'funnier', meaning: 'Con chó của tôi buồn cười hơn con chó của bạn.', explanation: 'Đổi "y" thành "i" rồi thêm "er".' },
          { question: 'It is ___ today than yesterday. (sunny)', correct: 'sunnier', meaning: 'Hôm nay trời nắng hơn ngày hôm qua.', explanation: 'sunny -> sunnier.' },
          { question: 'English is ___ than I thought. (easy)', correct: 'easier', meaning: 'Tiếng Anh dễ hơn tôi nghĩ.', explanation: 'easy -> easier.' }
        ]
      },
      {
        title: 'Mô tả cảnh quan với "There is / There are"',
        desc: 'Dùng để giới thiệu sự tồn tại của người, vật hoặc cảnh quan nào đó.',
        formula: [
          { text: "There is + a/an + Noun (số ít)", classes: classes.verb },
          { text: "There are + (số lượng/some/many) + Noun (số nhiều)", classes: classes.verb }
        ],
        examples: [
          { en: 'There is a river near the forest.', vi: 'Có một con sông ở gần khu rừng.' },
          { en: 'There are many beautiful flowers in the garden.', vi: 'Có rất nhiều bông hoa đẹp trong khu vườn.' },
          { en: 'Are there any mountains here?', vi: 'Có ngọn núi nào ở đây không?' }
        ],
        note: 'There is dùng cho danh từ số ít hoặc không đếm được. There are dùng cho danh từ số nhiều.',
        practiceList: [
          { question: '___ is a big tree in the yard.', correct: 'There', meaning: 'Có một cái cây lớn ở trong sân.', explanation: 'Cấu trúc "There is".' },
          { question: 'There ___ three birds on the roof.', correct: 'are', meaning: 'Có ba con chim ở trên mái nhà.', explanation: 'Số nhiều "three birds" dùng "are".' },
          { question: '___ there a lake near your house?', correct: 'Is', meaning: 'Có một cái hồ nào gần nhà bạn không?', explanation: 'Câu hỏi với danh từ số ít "a lake" dùng "Is".' }
        ]
      }
    ]
  },
  {
    orderIndex: 18,
    grammar: [
      {
        title: 'Liên từ chỉ nguyên nhân "because"',
        desc: 'Dùng để giải thích lý do tại sao một sự việc lại xảy ra.',
        formula: [
          { text: "Mệnh đề kết quả + because + Mệnh đề nguyên nhân", classes: classes.other }
        ],
        examples: [
          { en: 'I am wearing a coat because it is cold.', vi: 'Tôi đang mặc áo khoác bởi vì trời lạnh.' },
          { en: 'He was happy because he passed the test.', vi: 'Anh ấy đã rất vui bởi vì anh ấy qua bài kiểm tra.' },
          { en: 'Why are you crying? - Because I lost my toy.', vi: 'Tại sao bạn lại khóc? - Bởi vì tớ làm mất đồ chơi.' }
        ],
        note: '"because" nối 2 mệnh đề (có chủ ngữ và động từ đầy đủ).',
        practiceList: [
          { question: 'I didn\'t go to school ___ I was sick.', correct: 'because', meaning: 'Tôi đã không đi học bởi vì tôi bị ốm.', explanation: 'Dùng "because" để chỉ lý do bị ốm.' },
          { question: 'She is smiling ___ she is happy.', correct: 'because', meaning: 'Cô ấy đang mỉm cười bởi vì cô ấy đang vui.', explanation: 'Chỉ nguyên nhân của nụ cười.' },
          { question: '___ are you late? - Because I missed the bus.', correct: 'Why', meaning: 'Tại sao bạn đến muộn? - Bởi vì tôi lỡ xe buýt.', explanation: 'Hỏi lý do dùng "Why", trả lời bằng "Because".' }
        ]
      }
    ]
  },
  // Chương 7
  {
    orderIndex: 19,
    grammar: [
      {
        title: 'Sở thích: like / love / enjoy + V-ing',
        desc: 'Sau các động từ chỉ sự yêu thích, ta dùng động từ ở dạng V-ing.',
        formula: [
          { text: "S + like / love / enjoy + V-ing", classes: classes.verb }
        ],
        examples: [
          { en: 'I like playing football.', vi: 'Tôi thích chơi bóng đá.' },
          { en: 'She loves reading books.', vi: 'Cô ấy yêu việc đọc sách.' },
          { en: 'They enjoy listening to music.', vi: 'Họ thưởng thức việc nghe nhạc.' }
        ],
        note: 'Cũng có thể dùng "like to Verb" (I like to play), nhưng V-ing phổ biến hơn để chỉ sở thích chung.',
        practiceList: [
          { question: 'He likes ___ TV in the evening. (watch)', correct: 'watching', meaning: 'Anh ấy thích xem TV vào buổi tối.', explanation: 'Sau "likes" là V-ing.' },
          { question: 'Do you enjoy ___ in the pool? (swim)', correct: 'swimming', meaning: 'Bạn có thích bơi trong hồ bơi không?', explanation: 'Sau "enjoy" là V-ing, nhớ gấp đôi chữ "m".' },
          { question: 'My sister loves ___ pictures. (draw)', correct: 'drawing', meaning: 'Chị gái tôi yêu thích việc vẽ tranh.', explanation: 'Sau "loves" dùng V-ing.' }
        ]
      },
      {
        title: 'Sự mong muốn: want to + Verb',
        desc: 'Dùng để diễn tả mong muốn, nhu cầu muốn làm một việc gì đó.',
        formula: [
          { text: "S + want to + Verb (nguyên mẫu)", classes: classes.verb }
        ],
        examples: [
          { en: 'I want to be a doctor.', vi: 'Tôi muốn trở thành một bác sĩ.' },
          { en: 'She wants to buy a new dress.', vi: 'Cô ấy muốn mua một chiếc váy mới.' },
          { en: 'Do you want to play a game?', vi: 'Bạn có muốn chơi một trò chơi không?' }
        ],
        note: 'Sau "want" luôn là "to Verb", KHÔNG bao giờ dùng V-ing.',
        practiceList: [
          { question: 'I want ___ go to the park.', correct: 'to', meaning: 'Tôi muốn đi đến công viên.', explanation: 'Cấu trúc "want to V".' },
          { question: 'He ___ to eat an apple.', correct: 'wants', meaning: 'Anh ấy muốn ăn một quả táo.', explanation: 'Chủ ngữ "He" số ít nên "want" thêm "s".' },
          { question: 'We don\'t want to ___ late. (be)', correct: 'be', meaning: 'Chúng tôi không muốn bị muộn.', explanation: 'Sau "want to" là động từ nguyên thể.' }
        ]
      }
    ]
  },
  {
    orderIndex: 20,
    grammar: [
      {
        title: 'Dự định tương lai: going to + Verb',
        desc: 'Dùng để nói về một kế hoạch, dự định sắp làm trong tương lai.',
        formula: [
          { text: "S + am/is/are + going to + Verb", classes: classes.verb }
        ],
        examples: [
          { en: 'I am going to watch a film tonight.', vi: 'Tối nay tôi dự định sẽ xem một bộ phim.' },
          { en: 'They are going to visit their grandparents.', vi: 'Họ dự định sẽ đi thăm ông bà.' },
          { en: 'Is he going to play football tomorrow?', vi: 'Ngày mai anh ấy có định chơi bóng đá không?' }
        ],
        note: 'Đừng quên động từ "to be" (am/is/are) đứng trước "going to".',
        practiceList: [
          { question: 'She ___ going to buy a new bag.', correct: 'is', meaning: 'Cô ấy dự định sẽ mua một chiếc túi mới.', explanation: 'Chủ ngữ "She" đi với "is".' },
          { question: 'I am going ___ write a letter.', correct: 'to', meaning: 'Tôi dự định sẽ viết một lá thư.', explanation: 'Cấu trúc "going to + Verb".' },
          { question: 'We are going to ___ pizza. (eat)', correct: 'eat', meaning: 'Chúng tôi dự định sẽ ăn pizza.', explanation: 'Sau "going to" là động từ nguyên mẫu.' }
        ]
      }
    ]
  },
  {
    orderIndex: 21,
    grammar: [
      {
        title: 'Hiện tại tiếp diễn (Present Continuous) - Khẳng định',
        desc: 'Dùng để diễn tả hành động đang xảy ra ngay tại lúc nói.',
        formula: [
          { text: "S + am/is/are + Verb-ing", classes: classes.verb }
        ],
        examples: [
          { en: 'I am playing badminton right now.', vi: 'Ngay bây giờ tôi đang chơi cầu lông.' },
          { en: 'Look! He is climbing the tree.', vi: 'Nhìn kìa! Anh ấy đang trèo cây.' },
          { en: 'They are running in the park.', vi: 'Họ đang chạy trong công viên.' }
        ],
        note: 'Các dấu hiệu nhận biết: now, right now, at the moment, Look!, Listen!',
        practiceList: [
          { question: 'She is ___ a book. (read)', correct: 'reading', meaning: 'Cô ấy đang đọc một cuốn sách.', explanation: 'Thêm đuôi -ing vào sau động từ.' },
          { question: 'The birds ___ flying in the sky.', correct: 'are', meaning: 'Những chú chim đang bay trên bầu trời.', explanation: '"birds" số nhiều đi với "are".' },
          { question: 'I ___ catching a ball.', correct: 'am', meaning: 'Tôi đang bắt một quả bóng.', explanation: 'Chủ ngữ "I" đi với "am".' }
        ]
      }
    ]
  },
  {
    orderIndex: 22,
    grammar: [
      {
        title: 'Phân biệt: Present Simple vs Present Continuous',
        desc: 'Hiện tại đơn chỉ THÓI QUEN. Hiện tại tiếp diễn chỉ HÀNH ĐỘNG ĐANG XẢY RA.',
        formula: [
          { text: "HTĐ: every day, always, usually -> V / V(s/es)", classes: classes.other },
          { text: "HTTD: now, at the moment -> am/is/are + V-ing", classes: classes.other }
        ],
        examples: [
          { en: 'I play tennis every Sunday. (Thói quen)', vi: 'Tôi chơi tennis mỗi Chủ Nhật.' },
          { en: 'I am playing tennis right now. (Đang xảy ra)', vi: 'Tôi đang chơi tennis ngay bây giờ.' },
          { en: 'She usually wears a skirt, but today she is wearing jeans.', vi: 'Cô ấy thường mặc váy, nhưng hôm nay cô ấy đang mặc quần bò.' }
        ],
        note: 'Hãy chú ý đến các từ chỉ thời gian ở cuối câu để chọn đúng thì.',
        practiceList: [
          { question: 'He usually ___ up at 6 AM. (wake)', correct: 'wakes', meaning: 'Anh ấy thường thức dậy lúc 6 giờ sáng.', explanation: 'Có "usually" dùng Hiện tại đơn, thêm "s" vì chủ ngữ số ít.' },
          { question: 'Listen! Someone ___ singing. (be)', correct: 'is', meaning: 'Nghe kìa! Ai đó đang hát.', explanation: '"Listen!" chỉ hành động đang xảy ra, dùng "is".' },
          { question: 'They ___ playing football now.', correct: 'are', meaning: 'Bây giờ họ đang chơi bóng đá.', explanation: 'Có "now" dùng Hiện tại tiếp diễn.' }
        ]
      }
    ]
  },
  // Chương 8
  {
    orderIndex: 23,
    grammar: [
      {
        title: 'Quá khứ đơn: Động từ có quy tắc (-ed)',
        desc: 'Dùng để kể lại một sự việc đã xảy ra và kết thúc trong quá khứ.',
        formula: [
          { text: "Khẳng định: S + Verb-ed", classes: classes.verb },
          { text: "Phủ định: S + didn't + Verb (nguyên mẫu)", classes: classes.verb },
          { text: "Câu hỏi: Did + S + Verb (nguyên mẫu) ?", classes: classes.verb }
        ],
        examples: [
          { en: 'I cooked dinner yesterday.', vi: 'Hôm qua tôi đã nấu bữa tối.' },
          { en: 'She didn\'t carry the heavy bag.', vi: 'Cô ấy đã không mang chiếc túi nặng.' },
          { en: 'Did you call me last night?', vi: 'Tối qua bạn có gọi cho tôi không?' }
        ],
        note: 'Với động từ tận cùng là "y" (carry), ta đổi thành "ied" (carried).',
        practiceList: [
          { question: 'They ___ football yesterday. (play)', correct: 'played', meaning: 'Hôm qua họ đã chơi bóng đá.', explanation: 'Thêm "-ed" vào sau động từ có quy tắc.' },
          { question: 'I didn\'t ___ TV last night. (watch)', correct: 'watch', meaning: 'Tối qua tôi đã không xem TV.', explanation: 'Sau "didn\'t" là động từ nguyên mẫu.' },
          { question: '___ he wash his car? (Did / Do)', correct: 'Did', meaning: 'Anh ấy đã rửa xe của anh ấy phải không?', explanation: 'Câu hỏi trong quá khứ dùng trợ động từ "Did".' }
        ]
      }
    ]
  },
  {
    orderIndex: 24,
    grammar: [
      {
        title: 'Quá khứ đơn: Động từ bất quy tắc (Nhóm 1)',
        desc: 'Một số động từ ở quá khứ không thêm "-ed" mà biến đổi hoàn toàn.',
        formula: [
          { text: "get -> got | go -> went | grow -> grew", classes: classes.verb },
          { text: "hide -> hid | lose -> lost | send -> sent", classes: classes.verb }
        ],
        examples: [
          { en: 'I went to the supermarket yesterday.', vi: 'Hôm qua tôi đã đi siêu thị.' },
          { en: 'He lost his phone last week.', vi: 'Tuần trước anh ấy đã làm mất điện thoại.' },
          { en: 'They sent me a letter.', vi: 'Họ đã gửi cho tôi một lá thư.' }
        ],
        note: 'Dù là bất quy tắc, trong câu phủ định (didn\'t) và câu hỏi (Did) động từ vẫn trở về nguyên mẫu (VD: didn\'t go).',
        practiceList: [
          { question: 'I ___ up early this morning. (get)', correct: 'got', meaning: 'Sáng nay tôi đã thức dậy sớm.', explanation: 'Quá khứ của "get" là "got".' },
          { question: 'She ___ shopping yesterday. (go)', correct: 'went', meaning: 'Hôm qua cô ấy đã đi mua sắm.', explanation: 'Quá khứ của "go" là "went".' },
          { question: 'Did you ___ your book? (lose / lost)', correct: 'lose', meaning: 'Bạn đã làm mất sách phải không?', explanation: 'Trong câu hỏi có "Did", động từ nguyên mẫu là "lose".' }
        ]
      },
      {
        title: 'Bắt buộc: have to / has to / have got to',
        desc: 'Dùng để diễn tả sự bắt buộc, việc phải làm.',
        formula: [
          { text: "S + have to / has to + Verb (nguyên mẫu)", classes: classes.verb }
        ],
        examples: [
          { en: 'I have to go to school now.', vi: 'Bây giờ tôi phải đi học.' },
          { en: 'She has to do her homework.', vi: 'Cô ấy phải làm bài tập về nhà.' },
          { en: 'I have got to clean my room.', vi: 'Tôi phải dọn dẹp phòng của mình.' }
        ],
        note: '"have got to" có nghĩa giống hệt "have to" nhưng thường dùng trong văn nói.',
        practiceList: [
          { question: 'He ___ to wake up early tomorrow. (has / have)', correct: 'has', meaning: 'Anh ấy phải thức dậy sớm vào ngày mai.', explanation: 'Chủ ngữ "He" dùng "has to".' },
          { question: 'You have ___ listen to the teacher.', correct: 'to', meaning: 'Bạn phải lắng nghe giáo viên.', explanation: 'Cấu trúc "have to".' },
          { question: 'We have ___ to leave now.', correct: 'got', meaning: 'Chúng tôi phải rời đi bây giờ.', explanation: 'Cấu trúc "have got to".' }
        ]
      }
    ]
  },
  {
    orderIndex: 25,
    grammar: [
      {
        title: 'Quá khứ đơn: Động từ bất quy tắc (Nhóm 2)',
        desc: 'Tiếp tục học các động từ bất quy tắc quen thuộc.',
        formula: [
          { text: "take -> took | teach -> taught | wake -> woke", classes: classes.verb },
          { text: "fall -> fell | catch -> caught | bring -> brought", classes: classes.verb }
        ],
        examples: [
          { en: 'She took a photo of the bear.', vi: 'Cô ấy đã chụp một bức ảnh con gấu.' },
          { en: 'Mr. John taught me English last year.', vi: 'Thầy John đã dạy tôi tiếng Anh năm ngoái.' },
          { en: 'He fell off his bike.', vi: 'Anh ấy đã bị ngã xe đạp.' }
        ],
        note: 'Đọc kỹ đuôi -aught và -ought vì chúng phát âm giống nhau (giống âm "ooc").',
        practiceList: [
          { question: 'My mum ___ me at 7 AM today. (wake)', correct: 'woke', meaning: 'Mẹ tôi đã đánh thức tôi lúc 7 giờ sáng hôm nay.', explanation: 'Quá khứ của "wake" là "woke".' },
          { question: 'He ___ his bag to school. (bring)', correct: 'brought', meaning: 'Anh ấy đã mang cặp của mình đến trường.', explanation: 'Quá khứ của "bring" là "brought".' },
          { question: 'Who ___ this picture? (take)', correct: 'took', meaning: 'Ai đã chụp bức ảnh này?', explanation: 'Quá khứ của "take" là "took".' }
        ]
      }
    ]
  },
  {
    orderIndex: 26,
    grammar: [
      {
        title: 'Trạng từ tần suất (Adverbs of Frequency)',
        desc: 'Chỉ mức độ thường xuyên của hành động (Luôn luôn, Đôi khi, Không bao giờ).',
        formula: [
          { text: "Vị trí 1: TRƯỚC động từ thường (I always go)", classes: classes.verb },
          { text: "Vị trí 2: SAU động từ to be (He is always late)", classes: classes.verb }
        ],
        examples: [
          { en: 'I always brush my teeth.', vi: 'Tôi luôn luôn đánh răng.' },
          { en: 'She sometimes plays tennis.', vi: 'Cô ấy thỉnh thoảng chơi tennis.' },
          { en: 'We are never late for school.', vi: 'Chúng tôi không bao giờ đến trường muộn.' }
        ],
        note: 'always (100%), sometimes (50%), never (0%).',
        practiceList: [
          { question: 'He ___ eats vegetables. (never)', correct: 'never', meaning: 'Anh ấy không bao giờ ăn rau.', explanation: 'Trạng từ đứng trước động từ thường "eats".' },
          { question: 'I am ___ tired after work. (always)', correct: 'always', meaning: 'Tôi luôn luôn mệt mỏi sau giờ làm việc.', explanation: 'Trạng từ đứng sau to be "am".' },
          { question: 'They ___ go to the cinema. (sometimes)', correct: 'sometimes', meaning: 'Họ thỉnh thoảng đi xem phim.', explanation: 'Đứng trước động từ thường "go".' }
        ]
      },
      {
        title: 'Đại từ bất định (Indefinite Pronouns)',
        desc: 'Dùng để chỉ người hoặc vật một cách chung chung, không xác định.',
        formula: [
          { text: "everyone (mọi người) | everything (mọi thứ)", classes: classes.noun },
          { text: "someone (ai đó) | something (thứ gì đó)", classes: classes.noun },
          { text: "no one (không ai) | nothing (không có gì)", classes: classes.noun }
        ],
        examples: [
          { en: 'Everyone is happy.', vi: 'Mọi người đều vui vẻ.' },
          { en: 'I have something in my bag.', vi: 'Tôi có thứ gì đó trong túi của mình.' },
          { en: 'There is nothing in the fridge.', vi: 'Không có gì trong tủ lạnh cả.' }
        ],
        note: 'Các đại từ này luôn đóng vai trò là Chủ ngữ SỐ ÍT (động từ chia is/has/V-s).',
        practiceList: [
          { question: '___ in my class likes music. (mọi người)', correct: 'Everyone', meaning: 'Mọi người trong lớp tôi đều thích âm nhạc.', explanation: '"Everyone" là mọi người.' },
          { question: 'I want ___ to eat. (thứ gì đó)', correct: 'something', meaning: 'Tôi muốn thứ gì đó để ăn.', explanation: 'Chỉ vật chung chung dùng "something".' },
          { question: 'There is ___ here. The room is empty. (không có ai)', correct: 'no one', meaning: 'Không có ai ở đây cả. Căn phòng trống rỗng.', explanation: 'Dùng "no one".' }
        ]
      }
    ]
  },
  {
    orderIndex: 27,
    grammar: [
      {
        title: 'Giới từ chỉ vị trí: opposite',
        desc: 'Dùng để chỉ vị trí "đối diện" (nằm ở phía bên kia của con đường hoặc đối diện mặt nhau).',
        formula: [
          { text: "opposite + Danh từ", classes: classes.other }
        ],
        examples: [
          { en: 'The bank is opposite the supermarket.', vi: 'Ngân hàng nằm đối diện siêu thị.' },
          { en: 'He sat opposite me.', vi: 'Anh ấy đã ngồi đối diện tôi.' },
          { en: 'There is a park opposite my house.', vi: 'Có một công viên đối diện nhà tôi.' }
        ],
        note: 'Không dùng "opposite to" hay "opposite of" trong trường hợp chỉ vị trí không gian.',
        practiceList: [
          { question: 'The cinema is ___ the hospital.', correct: 'opposite', meaning: 'Rạp chiếu phim nằm đối diện bệnh viện.', explanation: 'Dùng "opposite" để chỉ vị trí đối diện.' },
          { question: 'She lives ___ my house.', correct: 'opposite', meaning: 'Cô ấy sống đối diện nhà tôi.', explanation: 'Dùng giới từ "opposite".' },
          { question: 'Who is sitting ___ you?', correct: 'opposite', meaning: 'Ai đang ngồi đối diện bạn vậy?', explanation: 'Dùng "opposite".' }
        ]
      }
    ]
  },
  // Chương 9
  {
    orderIndex: 28,
    grammar: [
      {
        title: 'Câu hỏi sở hữu: Whose...?',
        desc: 'Dùng để hỏi "Của ai?". Đứng ngay sau Whose là danh từ muốn hỏi.',
        formula: [
          { text: "Whose + Danh từ + is this/are these?", classes: classes.noun }
        ],
        examples: [
          { en: 'Whose book is this?', vi: 'Cuốn sách này là của ai?' },
          { en: 'Whose shoes are these?', vi: 'Những chiếc giày này là của ai?' },
          { en: 'Whose bag is on the table?', vi: 'Cái túi của ai ở trên bàn vậy?' }
        ],
        note: 'Nhớ phân biệt "Whose" (của ai) với "Who\'s" (viết tắt của Who is - Ai là).',
        practiceList: [
          { question: '___ car is this?', correct: 'Whose', meaning: 'Chiếc ô tô này là của ai?', explanation: 'Dùng "Whose" để hỏi sở hữu.' },
          { question: 'Whose glasses ___ these?', correct: 'are', meaning: 'Những chiếc kính này là của ai?', explanation: '"glasses" số nhiều đi với "are".' },
          { question: '___ phone is ringing? (Của ai)', correct: 'Whose', meaning: 'Điện thoại của ai đang reo vậy?', explanation: 'Hỏi chủ sở hữu dùng "Whose".' }
        ]
      }
    ]
  },
  {
    orderIndex: 29,
    grammar: [
      {
        title: 'Giới từ mở rộng: between / round',
        desc: '"between" là ở giữa HAI vật. "round" (hoặc around) là ở xung quanh.',
        formula: [
          { text: "between A and B (ở giữa A và B)", classes: classes.other },
          { text: "round + Danh từ (xung quanh)", classes: classes.other }
        ],
        examples: [
          { en: 'I am sitting between Tom and Mary.', vi: 'Tôi đang ngồi giữa Tom và Mary.' },
          { en: 'The earth goes round the sun.', vi: 'Trái đất quay xung quanh mặt trời.' },
          { en: 'They are running round the park.', vi: 'Họ đang chạy vòng quanh công viên.' }
        ],
        note: 'Nếu là 3 vật trở lên, ta dùng "among" chứ không dùng "between".',
        practiceList: [
          { question: 'The hospital is ___ the bank and the school.', correct: 'between', meaning: 'Bệnh viện nằm giữa ngân hàng và trường học.', explanation: 'Ở giữa 2 vật dùng "between".' },
          { question: 'We sat ___ the fire to get warm.', correct: 'round', meaning: 'Chúng tôi đã ngồi xung quanh đống lửa để giữ ấm.', explanation: 'Xung quanh dùng "round".' },
          { question: 'The letter B is ___ A and C.', correct: 'between', meaning: 'Chữ cái B nằm giữa chữ A và C.', explanation: 'Ở giữa 2 chữ cái dùng "between".' }
        ]
      },
      {
        title: 'Cả hai: both',
        desc: 'Dùng để chỉ HAI người, HAI vật cùng chia sẻ một đặc điểm (Cả hai đều...).',
        formula: [
          { text: "both + of + Đại từ (both of us/them)", classes: classes.noun },
          { text: "both + Danh từ số nhiều (both girls)", classes: classes.noun }
        ],
        examples: [
          { en: 'Both of my parents are teachers.', vi: 'Cả bố và mẹ tôi đều là giáo viên.' },
          { en: 'I like both apples and bananas.', vi: 'Tôi thích cả táo và chuối.' },
          { en: 'They both play football.', vi: 'Cả hai bọn họ đều chơi bóng đá.' }
        ],
        note: 'Động từ đi sau "both" LUÔN chia ở số nhiều (are, have, V-nguyên mẫu).',
        practiceList: [
          { question: '___ of my brothers are tall.', correct: 'Both', meaning: 'Cả hai người anh trai của tôi đều cao.', explanation: 'Dùng "Both" (Cả hai).' },
          { question: 'I want ___ shirts. (cả hai)', correct: 'both', meaning: 'Tôi muốn cả hai chiếc áo sơ mi.', explanation: 'Dùng "both".' },
          { question: 'Both of them ___ happy. (be)', correct: 'are', meaning: 'Cả hai người họ đều vui vẻ.', explanation: 'Sau both động từ chia số nhiều (are).' }
        ]
      }
    ]
  },
  // Chương 10
  {
    orderIndex: 30,
    grammar: [
      {
        title: 'Số thứ tự (Ordinal numbers)',
        desc: 'Dùng để nói về ngày trong tháng, tầng nhà, hoặc thứ hạng (Hạng nhất, tầng 2...).',
        formula: [
          { text: "Bất quy tắc: first (1st), second (2nd), third (3rd)", classes: classes.adj },
          { text: "Quy tắc chung: Số đếm + th (fourth, fifth, sixth...)", classes: classes.adj }
        ],
        examples: [
          { en: 'My birthday is on the first of May.', vi: 'Sinh nhật tôi vào ngày mùng một tháng Năm.' },
          { en: 'He lives on the second floor.', vi: 'Anh ấy sống ở tầng hai.' },
          { en: 'She won the third prize.', vi: 'Cô ấy đã giành giải ba.' }
        ],
        note: 'Luôn phải có mạo từ "the" trước số thứ tự (the first, the second).',
        practiceList: [
          { question: 'I was the ___ person to arrive. (đầu tiên)', correct: 'first', meaning: 'Tôi là người đầu tiên đến nơi.', explanation: 'Số thứ tự thứ nhất là "first".' },
          { question: 'This is my ___ time in London. (lần thứ 3)', correct: 'third', meaning: 'Đây là lần thứ 3 tôi ở London.', explanation: 'Số thứ tự thứ 3 là "third".' },
          { question: 'He finished in ___ place. (hạng 2)', correct: 'second', meaning: 'Anh ấy kết thúc ở vị trí thứ hai.', explanation: 'Hạng 2 là "second".' }
        ]
      },
      {
        title: 'Giới từ đi với Thứ/Ngày: on',
        desc: 'Đối với các Ngày trong tuần (Monday, Tuesday...) và Ngày cụ thể trong tháng, ta dùng giới từ "on".',
        formula: [
          { text: "on + Monday / Tuesday...", classes: classes.other },
          { text: "on + the + Số thứ tự", classes: classes.other }
        ],
        examples: [
          { en: 'I have English on Monday.', vi: 'Tôi có môn tiếng Anh vào thứ Hai.' },
          { en: 'The party is on Friday.', vi: 'Bữa tiệc diễn ra vào thứ Sáu.' },
          { en: 'We will meet on the tenth of June.', vi: 'Chúng ta sẽ gặp nhau vào ngày mùng mười tháng Sáu.' }
        ],
        note: 'Nhớ bộ ba giới từ thời gian: IN (tháng, năm), ON (ngày), AT (giờ).',
        practiceList: [
          { question: 'I don\'t go to school ___ Sunday.', correct: 'on', meaning: 'Tôi không đi học vào ngày Chủ Nhật.', explanation: 'Đi với thứ trong tuần dùng "on".' },
          { question: 'Her birthday is ___ the first of August.', correct: 'on', meaning: 'Sinh nhật cô ấy vào mùng một tháng Tám.', explanation: 'Ngày cụ thể trong tháng dùng "on".' },
          { question: 'We play football ___ Saturday mornings.', correct: 'on', meaning: 'Chúng tôi chơi bóng đá vào các buổi sáng thứ Bảy.', explanation: 'Có chứa từ chỉ "Thứ" (Saturday) thì dùng "on".' }
        ]
      }
    ]
  }
];

async function generate() {
  const fileContent = JSON.stringify(data, null, 2);
  fs.writeFileSync('data/movers-grammar-14-30.json', fileContent);
  console.log('Saved data/movers-grammar-14-30.json');
}

generate();

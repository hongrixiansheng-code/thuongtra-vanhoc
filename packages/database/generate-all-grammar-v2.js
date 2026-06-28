const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const chunks = [
  // Chunk 2 (Bài 3-4)
  {
    fileName: "pet-grammar-cum2.json",
    lessons: [
      {
        orderIndex: 2,
        grammar: [
          {
            title: "-ed vs -ing adjectives",
            desc: "Tính từ đuôi -ing miêu tả tính chất của sự vật/sự việc gây ra cảm xúc. Tính từ đuôi -ed miêu tả cảm xúc của người bị tác động.",
            formula: [
              { text: "N(vật) + be + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "S(người) + be/feel + V-ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The movie was boring, so I was bored.", meaning: "Bộ phim thật tẻ nhạt, nên tôi cảm thấy chán." },
              { correct: "This game is exciting. I am excited.", meaning: "Trò chơi này thật thú vị. Tôi rất hào hứng." },
              { correct: "The journey was exhausting.", meaning: "Chuyến đi thật mệt mỏi (rút cạn sức lực)." },
              { correct: "I felt exhausted after work.", "meaning": "Tôi cảm thấy kiệt sức sau giờ làm." }
            ]
          },
          {
            title: "so + adj + that",
            desc: "Cấu trúc diễn tả 'quá... đến nỗi mà...'.",
            formula: [
              { text: "S + be/V + so + Adj/Adv + that + S + V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I was so tired that I fell asleep.", meaning: "Tôi quá mệt đến nỗi tôi ngủ thiếp đi." },
              { correct: "It was so cold that we stayed inside.", meaning: "Trời quá lạnh đến nỗi chúng tôi phải ở trong nhà." },
              { correct: "The test was so difficult that everyone failed.", meaning: "Bài kiểm tra quá khó đến nỗi mọi người đều rớt." },
              { correct: "She was so happy that she cried.", meaning: "Cô ấy quá hạnh phúc đến nỗi bật khóc." }
            ]
          },
          {
            title: "Question Tags với cảm xúc",
            desc: "Dùng câu hỏi đuôi để xác nhận lại cảm giác, trạng thái của ai đó.",
            formula: [
              { text: "Khẳng định, + phủ định?", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "Phủ định, + khẳng định?", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "She's upset, isn't she?", meaning: "Cô ấy đang buồn, phải không?" },
              { correct: "You are feeling better, aren't you?", meaning: "Bạn đang cảm thấy tốt hơn rồi, đúng không?" },
              { correct: "They aren't angry, are they?", meaning: "Họ không tức giận đâu, phải không?" },
              { correct: "He looks happy, doesn't he?", meaning: "Anh ấy trông có vẻ hạnh phúc, phải không?" }
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        grammar: [
          {
            title: "Gerund làm chủ ngữ",
            desc: "Động từ thêm -ing có thể đóng vai trò làm chủ ngữ trong câu, chia động từ số ít.",
            formula: [
              { text: "V-ing + be/V(số ít) + ...", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Reading is important.", meaning: "Việc đọc sách là quan trọng." },
              { correct: "Writing essays takes time.", meaning: "Việc viết tiểu luận tốn nhiều thời gian." },
              { correct: "Learning a new language is fun.", meaning: "Học một ngôn ngữ mới rất thú vị." },
              { correct: "Swimming is good for your health.", meaning: "Bơi lội rất tốt cho sức khỏe của bạn." }
            ]
          },
          {
            title: "It is + adj + to-infinitive",
            desc: "Cấu trúc chủ ngữ giả để đưa ra nhận định về một hành động.",
            formula: [
              { text: "It + is + Adj + (for sb) + to-V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "It is important to read every day.", meaning: "Việc đọc sách mỗi ngày là rất quan trọng." },
              { correct: "It is difficult to learn Chinese.", meaning: "Học tiếng Trung rất khó." },
              { correct: "It is necessary to sleep early.", meaning: "Việc ngủ sớm là rất cần thiết." },
              { correct: "It is easy to make mistakes.", meaning: "Mắc sai lầm thì rất dễ." }
            ]
          },
          {
            title: "enjoy/avoid/suggest/recommend + V-ing",
            desc: "Một số động từ theo sau bắt buộc là danh động từ (V-ing).",
            formula: [
              { text: "S + enjoy/avoid/suggest + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I suggest reading this book.", meaning: "Tôi đề nghị bạn nên đọc cuốn sách này." },
              { correct: "She enjoys listening to music.", meaning: "Cô ấy thích nghe nhạc." },
              { correct: "We should avoid eating too much sugar.", meaning: "Chúng ta nên tránh ăn quá nhiều đường." },
              { correct: "He recommended visiting the museum.", meaning: "Anh ấy khuyên nên đi thăm viện bảo tàng." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 3 (Bài 5-6)
  {
    fileName: "pet-grammar-cum3.json",
    lessons: [
      {
        orderIndex: 4,
        grammar: [
          {
            title: "in order to / so as to",
            desc: "Dùng để chỉ mục đích của hành động (để làm gì). Phủ định thêm 'not' phía trước 'to'.",
            formula: [
              { text: "in order to / so as to + V(nguyên thể)", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "in order not to / so as not to + V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "She studied hard in order to pass.", meaning: "Cô ấy đã học chăm chỉ để thi đậu." },
              { correct: "He got up early so as not to be late.", meaning: "Anh ấy dậy sớm để không bị trễ." },
              { correct: "We ran in order to catch the bus.", meaning: "Chúng tôi đã chạy để bắt kịp xe buýt." },
              { correct: "I am saving money in order to buy a car.", meaning: "Tôi đang tiết kiệm tiền để mua ô tô." }
            ]
          },
          {
            title: "be able to & manage to",
            desc: "Dùng để chỉ khả năng hoặc sự xoay xở thành công để làm việc gì đó khó khăn.",
            formula: [
              { text: "be able to / manage to + V(nguyên thể)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Did you manage to finish the essay?", meaning: "Bạn có xoay xở hoàn thành được bài luận không?" },
              { correct: "I was able to solve the math problem.", meaning: "Tôi đã có khả năng giải bài toán." },
              { correct: "She didn't manage to find the keys.", meaning: "Cô ấy đã không tìm được chìa khóa." },
              { correct: "We were able to see the stars.", meaning: "Chúng tôi đã có thể nhìn thấy những vì sao." }
            ]
          },
          {
            title: "apply for / apply to",
            desc: "Apply for (nộp đơn xin việc/học bổng), Apply to (nộp đơn đến tổ chức/trường học).",
            formula: [
              { text: "apply for + Noun (công việc)", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "apply to + Noun (tổ chức)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I will apply for the job.", meaning: "Tôi sẽ nộp đơn xin công việc đó." },
              { correct: "I applied to the university.", meaning: "Tôi đã nộp đơn vào trường đại học." },
              { correct: "He is applying for a scholarship.", meaning: "Anh ấy đang làm đơn xin học bổng." },
              { correct: "She applied to three different colleges.", meaning: "Cô ấy đã nộp đơn vào ba trường cao đẳng khác nhau." }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        grammar: [
          {
            title: "used to vs would",
            desc: "Used to dùng cho cả trạng thái và hành động lặp lại trong quá khứ. Would chỉ dùng cho hành động lặp lại.",
            formula: [
              { text: "used to / would + V(nguyên thể)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I used to live in London.", meaning: "Tôi đã từng sống ở London." },
              { correct: "We would go fishing every summer.", meaning: "Chúng tôi thường đi câu cá vào mỗi mùa hè." },
              { correct: "She used to have long hair.", meaning: "Cô ấy đã từng có mái tóc dài." },
              { correct: "My grandfather would tell us stories.", meaning: "Ông tôi thường hay kể chuyện cho chúng tôi nghe." }
            ]
          },
          {
            title: "be responsible for + V-ing",
            desc: "Chịu trách nhiệm cho việc gì.",
            formula: [
              { text: "be responsible for + V-ing / Noun", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "She is responsible for training new staff.", meaning: "Cô ấy chịu trách nhiệm đào tạo nhân viên mới." },
              { correct: "Who is responsible for cleaning the room?", meaning: "Ai chịu trách nhiệm dọn phòng?" },
              { correct: "I am responsible for organizing the event.", meaning: "Tôi chịu trách nhiệm tổ chức sự kiện." },
              { correct: "The manager is responsible for making decisions.", meaning: "Quản lý chịu trách nhiệm đưa ra quyết định." }
            ]
          },
          {
            title: "Reported Questions",
            desc: "Câu hỏi gián tiếp: lùi thì và đổi trật tự từ thành giống câu khẳng định.",
            formula: [
              { text: "ask + if/whether/Từ để hỏi + S + V(lùi thì)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "They asked me if I had experience.", meaning: "Họ hỏi tôi xem tôi có kinh nghiệm không." },
              { correct: "She asked where I lived.", meaning: "Cô ấy hỏi tôi sống ở đâu." },
              { correct: "He asked if I could help him.", meaning: "Anh ấy hỏi liệu tôi có thể giúp anh ấy không." },
              { correct: "I wondered what time the train left.", meaning: "Tôi tự hỏi lúc mấy giờ thì tàu chạy." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 4 (Bài 7-8)
  {
    fileName: "pet-grammar-cum4.json",
    lessons: [
      {
        orderIndex: 6,
        grammar: [
          {
            title: "work as vs work for",
            desc: "Work as đi kèm với nghề nghiệp. Work for đi kèm với tên công ty hoặc người chủ.",
            formula: [
              { text: "work as + Nghề nghiệp", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "work for + Tổ chức/Người", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "She works as a lawyer.", meaning: "Cô ấy làm nghề luật sư." },
              { correct: "He works for a big company.", meaning: "Anh ấy làm việc cho một công ty lớn." },
              { correct: "I work as a teacher.", meaning: "Tôi làm giáo viên." },
              { correct: "They work for the government.", meaning: "Họ làm việc cho chính phủ." }
            ]
          },
          {
            title: "Mệnh đề quan hệ whose",
            desc: "Đại từ quan hệ dùng để chỉ sự sở hữu cho người hoặc vật.",
            formula: [
              { text: "Noun + whose + Noun + V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "He is an architect whose designs are famous.", meaning: "Ông ấy là một kiến trúc sư có thiết kế rất nổi tiếng." },
              { correct: "The girl whose dog is barking is my sister.", meaning: "Cô gái có con chó đang sủa là chị tôi." },
              { correct: "I met a man whose car was stolen.", meaning: "Tôi đã gặp một người đàn ông có chiếc xe bị mất cắp." },
              { correct: "That's the student whose grades are the highest.", meaning: "Đó là học sinh có điểm số cao nhất." }
            ]
          },
          {
            title: "Bị động trong mô tả công việc",
            desc: "Sử dụng câu bị động để nhấn mạnh vào công việc được hoàn thành thay vì người làm.",
            formula: [
              { text: "O + be + V3/ed + (by S)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Reports are written by the editor.", meaning: "Các bản báo cáo được viết bởi biên tập viên." },
              { correct: "Emails are sent every morning.", meaning: "Email được gửi đi vào mỗi buổi sáng." },
              { correct: "The website is updated daily.", meaning: "Trang web được cập nhật hàng ngày." },
              { correct: "Meetings are organized by the manager.", meaning: "Các cuộc họp được tổ chức bởi người quản lý." }
            ]
          }
        ]
      },
      {
        orderIndex: 7,
        grammar: [
          {
            title: "not only ... but also",
            desc: "Cấu trúc tương quan mang nghĩa: Không những... mà còn...",
            formula: [
              { text: "not only + A + but also + B", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Not only is it expensive, but it also takes too long.", meaning: "Nó không những đắt đỏ, mà còn tốn quá nhiều thời gian." },
              { correct: "She is not only smart but also hardworking.", meaning: "Cô ấy không chỉ thông minh mà còn chăm chỉ." },
              { correct: "He speaks not only English but also French.", meaning: "Anh ấy nói không những tiếng Anh mà còn tiếng Pháp." },
              { correct: "Not only did he fail, but he also lost his job.", meaning: "Anh ta không chỉ thất bại, mà còn mất việc." }
            ]
          },
          {
            title: "both ... and / neither ... nor",
            desc: "Both... and (Cả hai). Neither... nor (Không cái nào trong hai cái).",
            formula: [
              { text: "both A and B", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "neither A nor B", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Both the government and the community are responsible.", meaning: "Cả chính phủ và cộng đồng đều có trách nhiệm." },
              { correct: "Neither my mother nor my father is at home.", meaning: "Cả mẹ và bố tôi đều không có ở nhà." },
              { correct: "I like both tea and coffee.", meaning: "Tôi thích cả trà và cà phê." },
              { correct: "Neither of the answers is correct.", meaning: "Không có câu trả lời nào trong cả hai là đúng." }
            ]
          },
          {
            title: "should / ought to",
            desc: "Dùng để đưa ra lời khuyên hoặc nói về bổn phận xã hội.",
            formula: [
              { text: "should / ought to + V(nguyên thể)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "People should recycle more.", meaning: "Mọi người nên tái chế nhiều hơn." },
              { correct: "You ought to see a doctor.", meaning: "Bạn nên đi gặp bác sĩ." },
              { correct: "We shouldn't waste water.", meaning: "Chúng ta không nên lãng phí nước." },
              { correct: "Children ought to go to bed early.", meaning: "Trẻ em nên đi ngủ sớm." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 5 (Bài 9-10)
  {
    fileName: "pet-grammar-cum5.json",
    lessons: [
      {
        orderIndex: 8,
        grammar: [
          {
            title: "will & might/could",
            desc: "Will dùng để dự đoán chắc chắn trong tương lai, might/could chỉ khả năng có thể xảy ra (không chắc chắn).",
            formula: [
              { text: "will / might / could + V(nguyên thể)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Temperatures will rise.", meaning: "Nhiệt độ sẽ tăng lên." },
              { correct: "It might get worse.", meaning: "Tình hình có thể sẽ tệ hơn." },
              { correct: "They could win the match.", meaning: "Họ có khả năng sẽ thắng trận đấu." },
              { correct: "It will rain tomorrow.", meaning: "Ngày mai trời sẽ mưa." }
            ]
          },
          {
            title: "Conditional 1",
            desc: "Câu điều kiện loại 1 diễn tả sự việc có khả năng xảy ra ở hiện tại hoặc tương lai.",
            formula: [
              { text: "If + S + V(hiện tại), S + will + V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "If we don't act, the planet will suffer.", meaning: "Nếu chúng ta không hành động, hành tinh sẽ phải gánh chịu hậu quả." },
              { correct: "If it rains, I will stay at home.", meaning: "Nếu trời mưa, tôi sẽ ở nhà." },
              { correct: "She will pass the exam if she studies hard.", meaning: "Cô ấy sẽ đậu kỳ thi nếu cô ấy học chăm." },
              { correct: "If you eat too much, you will get fat.", meaning: "Nếu bạn ăn quá nhiều, bạn sẽ bị béo." }
            ]
          },
          {
            title: "unless",
            desc: "Unless có nghĩa là If ... not (Trừ khi). Động từ đi sau unless luôn ở thể khẳng định.",
            formula: [
              { text: "Unless + S + V (khẳng định)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "We must act unless we want the situation to get worse.", meaning: "Chúng ta phải hành động trừ khi chúng ta muốn tình hình trở nên tồi tệ hơn." },
              { correct: "I won't go unless you come with me.", meaning: "Tôi sẽ không đi trừ khi bạn đi cùng tôi." },
              { correct: "You will fail unless you try harder.", meaning: "Bạn sẽ rớt trừ khi bạn cố gắng hơn." },
              { correct: "Unless it rains, we will play football.", meaning: "Trừ khi trời mưa, chúng tôi sẽ chơi bóng đá." }
            ]
          }
        ]
      },
      {
        orderIndex: 9,
        grammar: [
          {
            title: "Passive Present Continuous",
            desc: "Câu bị động thì hiện tại tiếp diễn, nhấn mạnh hành động đang bị tác động lúc này.",
            formula: [
              { text: "S + am/is/are + being + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Trees are being cut down every day.", meaning: "Cây cối đang bị chặt phá mỗi ngày." },
              { correct: "A new hospital is being built.", meaning: "Một bệnh viện mới đang được xây dựng." },
              { correct: "The car is being repaired.", meaning: "Chiếc xe đang được sửa chữa." },
              { correct: "The problem is being discussed.", meaning: "Vấn đề đang được thảo luận." }
            ]
          },
          {
            title: "Passive Present Perfect",
            desc: "Câu bị động thì hiện tại hoàn thành, dùng cho việc đã bị tác động và kéo dài tới hiện tại.",
            formula: [
              { text: "S + have/has + been + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The river has been polluted for years.", meaning: "Con sông đã bị ô nhiễm trong nhiều năm." },
              { correct: "My bike has been stolen.", meaning: "Xe đạp của tôi đã bị lấy cắp." },
              { correct: "The work has been finished.", meaning: "Công việc đã được hoàn thành." },
              { correct: "Many trees have been planted.", meaning: "Nhiều cây xanh đã được trồng." }
            ]
          },
          {
            title: "It is important that + should/must",
            desc: "Cấu trúc nhấn mạnh tính cấp thiết, quan trọng của một hành động.",
            formula: [
              { text: "It is important/essential that + S + should/must + V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "It is important that we should reduce waste.", meaning: "Việc chúng ta nên giảm thiểu rác thải là rất quan trọng." },
              { correct: "It is essential that you must be here on time.", meaning: "Điều thiết yếu là bạn phải có mặt đúng giờ." },
              { correct: "It is vital that we should protect the environment.", meaning: "Bảo vệ môi trường là một việc sống còn." },
              { correct: "It is necessary that everyone should participate.", meaning: "Tất cả mọi người cần thiết phải tham gia." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 6 (Bài 11-12)
  {
    fileName: "pet-grammar-cum6.json",
    lessons: [
      {
        orderIndex: 10,
        grammar: [
          {
            title: "Past Continuous",
            desc: "Thì quá khứ tiếp diễn diễn tả hành động đang xảy ra tại một thời điểm cụ thể trong quá khứ.",
            formula: [
              { text: "S + was/were + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I was feeling ill when I woke up.", meaning: "Tôi đang cảm thấy ốm khi tôi thức dậy." },
              { correct: "It was raining hard all day yesterday.", meaning: "Trời đã mưa lớn suốt ngày hôm qua." },
              { correct: "We were having dinner at 8 PM.", meaning: "Chúng tôi đang ăn tối vào lúc 8 giờ tối qua." },
              { correct: "She was studying while I was watching TV.", meaning: "Cô ấy đang học trong khi tôi đang xem TV." }
            ]
          },
          {
            title: "have something done",
            desc: "Cấu trúc nhờ vả/thuê người khác làm việc gì đó cho mình (Cầu khiến bị động).",
            formula: [
              { text: "have + Object + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I had an operation last year.", meaning: "Tôi đã trải qua (được người khác thực hiện) một cuộc phẫu thuật vào năm ngoái." },
              { correct: "I had my hair cut yesterday.", meaning: "Tôi đã đi cắt tóc hôm qua." },
              { correct: "We are having our house painted.", meaning: "Chúng tôi đang thuê người sơn lại nhà." },
              { correct: "She had her car repaired.", meaning: "Cô ấy đã mang xe đi sửa." }
            ]
          },
          {
            title: "must / can't suy đoán",
            desc: "Suy đoán logic ở hiện tại: Must be (chắc chắn là), Can't be (chắc chắn không thể là).",
            formula: [
              { text: "must / can't + be + Noun/Adj", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "You must be exhausted.", meaning: "Bạn chắc hẳn là kiệt sức rồi." },
              { correct: "She can't be feeling well.", meaning: "Cô ấy chắc chắn là đang không khỏe." },
              { correct: "That must be John at the door.", meaning: "Đó chắc chắn là John đang ở ngoài cửa." },
              { correct: "It can't be true.", meaning: "Điều đó không thể là sự thật được." }
            ]
          }
        ]
      },
      {
        orderIndex: 11,
        grammar: [
          {
            title: "It's worth + V-ing",
            desc: "Cấu trúc khuyên nhủ ai đó rằng một việc là xứng đáng để làm.",
            formula: [
              { text: "It's worth + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "It's worth trying yoga.", meaning: "Tập yoga thật sự rất đáng thử." },
              { correct: "The museum is worth visiting.", meaning: "Viện bảo tàng đó rất đáng để tham quan." },
              { correct: "That movie is worth watching.", meaning: "Bộ phim đó rất đáng xem." },
              { correct: "It's not worth worrying about.", meaning: "Chẳng đáng để phải lo lắng đâu." }
            ]
          },
          {
            title: "there's no point (in) + V-ing",
            desc: "Cấu trúc phàn nàn/nhận định rằng làm việc gì đó là vô ích.",
            formula: [
              { text: "There is no point (in) + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "There's no point in complaining.", meaning: "Phàn nàn cũng vô ích thôi." },
              { correct: "There is no point in waiting for him.", meaning: "Đợi chờ anh ấy là vô ích." },
              { correct: "There's no point in arguing.", meaning: "Cãi nhau cũng chẳng có ích gì." },
              { correct: "There's no point in doing this again.", meaning: "Chẳng có ích gì khi làm lại việc này." }
            ]
          },
          {
            title: "be worth + V-ing vs be worth + noun",
            desc: "Worth đi với V-ing mang nghĩa 'đáng để làm gì', đi với danh từ/tiền tệ mang nghĩa 'có giá trị bao nhiêu'.",
            formula: [
              { text: "be worth + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "be worth + Noun/Money", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The book is worth reading.", meaning: "Cuốn sách này đáng để đọc." },
              { correct: "It is worth $10.", meaning: "Nó trị giá 10 đô la." },
              { correct: "The painting is worth millions.", meaning: "Bức tranh trị giá hàng triệu đô." },
              { correct: "This idea is worth exploring.", meaning: "Ý tưởng này rất đáng để khám phá." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 7 (Bài 13-14)
  {
    fileName: "pet-grammar-cum7.json",
    lessons: [
      {
        orderIndex: 12,
        grammar: [
          {
            title: "Present Perfect Continuous",
            desc: "Hiện tại hoàn thành tiếp diễn nhấn mạnh quá trình liên tục của hành động từ quá khứ đến hiện tại.",
            formula: [
              { text: "S + have/has + been + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I've been travelling for six months.", meaning: "Tôi đã đi du lịch liên tục suốt sáu tháng nay." },
              { correct: "It has been raining all morning.", meaning: "Trời đã mưa rả rích suốt cả buổi sáng." },
              { correct: "She has been studying for three hours.", meaning: "Cô ấy đã học bài liên tục suốt 3 tiếng." },
              { correct: "We have been waiting since 2 PM.", meaning: "Chúng tôi đã đợi từ lúc 2 giờ chiều." }
            ]
          },
          {
            title: "just / already / yet / still",
            desc: "Các trạng từ thời gian thường gặp trong thì Hiện tại hoàn thành.",
            formula: [
              { text: "have + just/already + V3", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "... yet (cuối câu phủ định/nghi vấn)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Have you packed yet?", meaning: "Bạn đã đóng gói hành lý chưa?" },
              { correct: "I have just finished my homework.", meaning: "Tôi vừa mới làm xong bài tập về nhà." },
              { correct: "She has already eaten dinner.", meaning: "Cô ấy đã ăn tối rồi." },
              { correct: "I still haven't found my keys.", meaning: "Tôi vẫn chưa tìm thấy chìa khóa." }
            ]
          },
          {
            title: "get to / arrive at / reach",
            desc: "Phân biệt các từ diễn tả việc 'đến nơi'. Reach đi trực tiếp với tân ngữ, không cần giới từ.",
            formula: [
              { text: "arrive at/in / get to / reach + Noun", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "We reached the destination.", meaning: "Chúng tôi đã đến đích (không có giới từ)." },
              { correct: "We arrived at the hotel.", meaning: "Chúng tôi đã đến khách sạn." },
              { correct: "What time did you get to the station?", meaning: "Bạn đã đến nhà ga lúc mấy giờ?" },
              { correct: "They finally reached the top of the mountain.", meaning: "Cuối cùng họ cũng lên đến đỉnh núi." }
            ]
          }
        ]
      },
      {
        orderIndex: 13,
        grammar: [
          {
            title: "be going to vs will",
            desc: "Be going to dùng cho dự định, kế hoạch đã lên trước. Will dùng cho quyết định bộc phát hoặc lời hứa.",
            formula: [
              { text: "S + be going to + V", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "S + will + V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I am going to travel to Paris.", meaning: "Tôi dự định sẽ đi Paris." },
              { correct: "I will help you with your bags.", meaning: "Tôi sẽ giúp bạn xách túi (quyết định ngay lúc nói)." },
              { correct: "Look at those clouds! It is going to rain.", meaning: "Nhìn những đám mây kìa! Trời sắp mưa rồi (có bằng chứng)." },
              { correct: "I promise I won't tell anyone.", meaning: "Tôi hứa tôi sẽ không kể cho ai nghe (lời hứa)." }
            ]
          },
          {
            title: "in case",
            desc: "Phòng khi (làm gì đó để chuẩn bị sẵn cho một khả năng trong tương lai).",
            formula: [
              { text: "Mệnh đề + in case + Mệnh đề", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Take a map in case you get lost.", meaning: "Hãy mang theo bản đồ phòng khi bạn bị lạc." },
              { correct: "I'll take an umbrella in case it rains.", meaning: "Tôi sẽ mang ô phòng khi trời mưa." },
              { correct: "Call me in case you need help.", meaning: "Hãy gọi cho tôi phòng khi bạn cần giúp đỡ." },
              { correct: "Keep the receipt in case you want to return it.", meaning: "Hãy giữ biên lai phòng khi bạn muốn trả lại hàng." }
            ]
          },
          {
            title: "make a reservation / book in advance",
            desc: "Các cụm động từ dùng phổ biến trong chủ đề du lịch để nói về việc đặt phòng, đặt vé.",
            formula: [
              { text: "make a reservation", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "book (sth) in advance", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I made a reservation for two.", meaning: "Tôi đã đặt trước bàn cho hai người." },
              { correct: "We need to book the tickets in advance.", meaning: "Chúng ta cần đặt vé trước." },
              { correct: "I'd like to make a reservation, please.", meaning: "Tôi muốn đặt chỗ trước." },
              { correct: "It's cheaper to book in advance.", meaning: "Đặt trước thì sẽ rẻ hơn." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 8 (Bài 15-16)
  {
    fileName: "pet-grammar-cum8.json",
    lessons: [
      {
        orderIndex: 14,
        grammar: [
          {
            title: "Past Continuous ôn tập",
            desc: "Quá khứ tiếp diễn dùng để mô tả một hành động đang xảy ra tại một thời điểm xác định trong quá khứ.",
            formula: [
              { text: "S + was/were + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "They were playing football at 5 PM yesterday.", meaning: "Họ đang chơi bóng đá lúc 5 giờ chiều qua." },
              { correct: "What were you doing last night?", meaning: "Tối qua bạn đang làm gì?" },
              { correct: "She was reading a book while he was cooking.", meaning: "Cô ấy đang đọc sách trong khi anh ấy đang nấu ăn." },
              { correct: "It was raining hard at that time.", meaning: "Lúc đó trời đang mưa rất to." }
            ]
          },
          {
            title: "Past Continuous + Past Simple",
            desc: "Dùng để diễn tả một hành động đang xảy ra (QKTD) thì bị một hành động khác cắt ngang (QKĐ).",
            formula: [
              { text: "When/While + S + was/were + V-ing, S + V2/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I was driving when it started to rain.", meaning: "Tôi đang lái xe thì trời bắt đầu mưa." },
              { correct: "When she arrived, I was waiting.", meaning: "Khi cô ấy đến, tôi đang đợi." },
              { correct: "I was sleeping when the phone rang.", meaning: "Tôi đang ngủ thì điện thoại reo." },
              { correct: "He broke his leg while he was playing soccer.", meaning: "Anh ấy bị gãy chân khi đang chơi bóng đá." }
            ]
          },
          {
            title: "Phrasal verbs giao thông",
            desc: "Các cụm động từ phổ biến về xe cộ: break down (hỏng xe), fill up (đổ đầy xăng), pick up (đón).",
            formula: [
              { text: "break down / fill up / pick up", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "My car broke down on the motorway.", meaning: "Xe của tôi bị hỏng trên đường cao tốc." },
              { correct: "I need to fill up the tank.", meaning: "Tôi cần phải đổ đầy bình xăng." },
              { correct: "Can you pick me up at the station?", meaning: "Bạn có thể đón tôi ở nhà ga không?" },
              { correct: "We ran out of gas.", meaning: "Chúng tôi đã hết sạch xăng." }
            ]
          }
        ]
      },
      {
        orderIndex: 15,
        grammar: [
          {
            title: "by the time + Past Perfect",
            desc: "Vào lúc một việc gì đó xảy ra trong quá khứ, thì một việc khác đã hoàn thành xong trước đó rồi.",
            formula: [
              { text: "By the time + S + V2/ed, S + had + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "By the time I arrived, the train had left.", meaning: "Vào lúc tôi đến, chuyến tàu đã rời đi mất rồi." },
              { correct: "By the time we got to the cinema, the movie had started.", meaning: "Lúc chúng tôi đến rạp, bộ phim đã bắt đầu." },
              { correct: "She had finished cooking by the time I woke up.", meaning: "Cô ấy đã nấu xong trước lúc tôi thức dậy." },
              { correct: "By the time he came, everyone had gone.", meaning: "Vào lúc anh ấy tới, mọi người đã về hết." }
            ]
          },
          {
            title: "Passive Past Perfect",
            desc: "Câu bị động của thì Quá khứ hoàn thành.",
            formula: [
              { text: "S + had + been + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The road had been closed before we got there.", meaning: "Con đường đã bị rào lại trước khi chúng tôi đến." },
              { correct: "The letter had been sent before I called him.", meaning: "Lá thư đã được gửi đi trước khi tôi gọi cho anh ấy." },
              { correct: "The cake had been eaten before I arrived.", meaning: "Chiếc bánh đã bị ăn hết trước khi tôi đến." },
              { correct: "The problem had been solved.", meaning: "Vấn đề đó đã được giải quyết xong xuôi." }
            ]
          },
          {
            title: "How long does it take...?",
            desc: "Cấu trúc để hỏi và trả lời về việc mất bao lâu để làm một việc hoặc đi một quãng đường.",
            formula: [
              { text: "How long does it take to + V?", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "It takes/took + (sb) + time + to V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "How long does it take to get there?", meaning: "Mất bao lâu để đến được đó?" },
              { correct: "It takes about an hour.", meaning: "Mất khoảng một giờ đồng hồ." },
              { correct: "It took me two hours to finish the homework.", meaning: "Tôi đã mất hai tiếng để làm xong bài tập về nhà." },
              { correct: "How long will it take to fix the car?", meaning: "Sẽ mất bao lâu để sửa xong chiếc xe?" }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 9 (Bài 17-18)
  {
    fileName: "pet-grammar-cum9.json",
    lessons: [
      {
        orderIndex: 16,
        grammar: [
          {
            title: "Mệnh đề quan hệ where",
            desc: "Where được dùng thay thế cho trạng từ chỉ nơi chốn (in/on/at which) trong mệnh đề quan hệ.",
            formula: [
              { text: "Noun (nơi chốn) + where + S + V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "This is the gallery where modern art is displayed.", meaning: "Đây là phòng trưng bày nơi nghệ thuật hiện đại được triển lãm." },
              { correct: "The hotel where we stayed was lovely.", meaning: "Khách sạn nơi chúng tôi đã ở rất đáng yêu." },
              { correct: "I want to visit the city where you were born.", meaning: "Tôi muốn thăm thành phố nơi bạn sinh ra." },
              { correct: "That's the restaurant where we met.", meaning: "Đó là nhà hàng nơi chúng ta đã gặp nhau." }
            ]
          },
          {
            title: "Mệnh đề quan hệ when",
            desc: "When được dùng thay thế cho trạng từ chỉ thời gian trong mệnh đề quan hệ.",
            formula: [
              { text: "Noun (thời gian) + when + S + V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "It was a time when people had no TV.", meaning: "Đó là một thời kỳ mà mọi người chưa có ti vi." },
              { correct: "I remember the day when we first met.", meaning: "Tôi nhớ ngày mà lần đầu tiên chúng ta gặp nhau." },
              { correct: "1990 was the year when I was born.", meaning: "1990 là năm mà tôi được sinh ra." },
              { correct: "Summer is the season when I feel happiest.", meaning: "Mùa hè là mùa mà tôi cảm thấy hạnh phúc nhất." }
            ]
          },
          {
            title: "which / who / that / whose",
            desc: "Ôn tập các đại từ quan hệ thay thế cho vật, người, vật/người, hoặc sở hữu.",
            formula: [
              { text: "Noun + who/which/that/whose + ...", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The artist who painted this is famous.", meaning: "Người họa sĩ đã vẽ bức tranh này rất nổi tiếng." },
              { correct: "The book which I am reading is interesting.", meaning: "Cuốn sách mà tôi đang đọc rất thú vị." },
              { correct: "The man whose car was stolen is sad.", meaning: "Người đàn ông có chiếc xe bị mất cắp đang rất buồn." },
              { correct: "This is the house that Jack built.", meaning: "Đây là ngôi nhà mà Jack đã xây." }
            ]
          }
        ]
      },
      {
        orderIndex: 17,
        grammar: [
          {
            title: "Reported Speech phức tạp",
            desc: "Lùi thì trong câu gián tiếp (Hiện tại -> Quá khứ, Quá khứ -> Quá khứ hoàn thành).",
            formula: [
              { text: "S + said (that) + S + V(lùi thì)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "She said she was writing.", meaning: "Cô ấy nói rằng cô ấy đang viết." },
              { correct: "He said he would come tomorrow.", meaning: "Anh ấy nói rằng anh ấy sẽ đến vào ngày mai." },
              { correct: "They said they were busy.", meaning: "Họ nói rằng họ đang bận." },
              { correct: "She told me she could swim.", meaning: "Cô ấy bảo tôi rằng cô ấy biết bơi." }
            ]
          },
          {
            title: "Reported speech với thì hoàn thành",
            desc: "Hiện tại hoàn thành và Quá khứ đơn khi chuyển sang câu gián tiếp đều lùi về Quá khứ hoàn thành.",
            formula: [
              { text: "S + said + S + had + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "He said he had finished.", meaning: "Anh ấy nói rằng anh ấy đã hoàn thành." },
              { correct: "She said she had lost her keys.", meaning: "Cô ấy nói rằng cô ấy đã đánh mất chìa khóa." },
              { correct: "They told me they had been to Paris.", meaning: "Họ bảo tôi rằng họ đã từng đến Paris." },
              { correct: "He said he had seen that movie.", meaning: "Anh ấy nói anh ấy đã xem bộ phim đó rồi." }
            ]
          },
          {
            title: "say vs tell",
            desc: "Say dùng để nói chung chung (say to someone), Tell phải luôn có tân ngữ đi kèm (tell someone something).",
            formula: [
              { text: "say + (that) / say to sb", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "tell + sb + (that)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "He said he was tired.", meaning: "Anh ấy nói anh ấy mệt." },
              { correct: "He told me he was tired.", meaning: "Anh ấy bảo tôi rằng anh ấy mệt." },
              { correct: "She said nothing.", meaning: "Cô ấy không nói gì cả." },
              { correct: "Tell me the truth.", meaning: "Hãy kể cho tôi nghe sự thật." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 10 (Bài 19-20)
  {
    fileName: "pet-grammar-cum10.json",
    lessons: [
      {
        orderIndex: 18,
        grammar: [
          {
            title: "I wish / If only + Past Simple",
            desc: "Điều ước trái ngược với hiện tại. Động từ luôn chia ở quá khứ đơn (tobe chia 'were' cho mọi ngôi).",
            formula: [
              { text: "S + wish + S + V2/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I wish I had more time to read.", meaning: "Tôi ước gì mình có nhiều thời gian hơn để đọc sách." },
              { correct: "If only I knew the answer.", meaning: "Giá như tôi biết câu trả lời." },
              { correct: "I wish I lived closer to the beach.", meaning: "Tôi ước tôi sống gần biển hơn." },
              { correct: "I wish it wasn't raining.", meaning: "Tôi ước gì trời không mưa." }
            ]
          },
          {
            title: "I wish + Past Perfect",
            desc: "Điều ước trái ngược với một việc đã xảy ra trong quá khứ (sự hối tiếc).",
            formula: [
              { text: "S + wish + S + had + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I wish I had read that book before.", meaning: "Tôi ước gì mình đã đọc cuốn sách đó trước đây." },
              { correct: "I wish I had studied harder.", meaning: "Tôi ước gì mình đã học chăm chỉ hơn." },
              { correct: "If only I hadn't eaten so much.", meaning: "Giá như tôi đã không ăn quá nhiều." },
              { correct: "I wish I had brought my umbrella.", meaning: "Tôi ước mình đã mang theo ô." }
            ]
          },
          {
            title: "I wish + would",
            desc: "Diễn tả sự phàn nàn và mong muốn ai đó/điều gì đó thay đổi hành động trong tương lai.",
            formula: [
              { text: "S + wish + S + would + V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I wish you would stop talking.", meaning: "Tôi ước gì bạn ngừng nói chuyện đi." },
              { correct: "I wish it would stop raining.", meaning: "Ước gì trời tạnh mưa." },
              { correct: "I wish he would listen to me.", meaning: "Tôi ước anh ấy chịu lắng nghe tôi." },
              { correct: "I wish they would arrive sooner.", meaning: "Ước gì họ sẽ đến sớm hơn." }
            ]
          }
        ]
      },
      {
        orderIndex: 19,
        grammar: [
          {
            title: "Passive Future",
            desc: "Bị động thì tương lai đơn.",
            formula: [
              { text: "S + will + be + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The update will be released next week.", meaning: "Bản cập nhật sẽ được phát hành vào tuần tới." },
              { correct: "The new bridge will be built next year.", meaning: "Cây cầu mới sẽ được xây dựng vào năm sau." },
              { correct: "You will be informed soon.", meaning: "Bạn sẽ được thông báo sớm thôi." },
              { correct: "The results will be announced tomorrow.", meaning: "Kết quả sẽ được công bố vào ngày mai." }
            ]
          },
          {
            title: "Passive with modal verbs",
            desc: "Bị động đi kèm với các động từ khuyết thiếu (must, should, can...).",
            formula: [
              { text: "S + modal + be + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The data should be backed up.", meaning: "Dữ liệu nên được sao lưu." },
              { correct: "Rules must be followed.", meaning: "Các quy tắc phải được tuân thủ." },
              { correct: "This problem can be solved.", meaning: "Vấn đề này có thể được giải quyết." },
              { correct: "The work has to be finished today.", meaning: "Công việc bắt buộc phải được hoàn thành trong hôm nay." }
            ]
          },
          {
            title: "have been + V-ing",
            desc: "Thì Hiện tại hoàn thành tiếp diễn thường dùng để nói về quá trình làm việc liên tục đến hiện tại.",
            formula: [
              { text: "S + have/has + been + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "They have been developing this software for years.", meaning: "Họ đã và đang phát triển phần mềm này trong nhiều năm." },
              { correct: "I have been learning English for five years.", meaning: "Tôi đã học tiếng Anh được 5 năm rồi." },
              { correct: "She has been waiting for two hours.", meaning: "Cô ấy đã đợi suốt hai tiếng đồng hồ." },
              { correct: "We have been living here since 2010.", meaning: "Chúng tôi đã sống ở đây từ năm 2010." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 11 (Bài 21-22)
  {
    fileName: "pet-grammar-cum11.json",
    lessons: [
      {
        orderIndex: 20,
        grammar: [
          {
            title: "Hệ thống thì hiện tại/quá khứ",
            desc: "Tổng ôn và phân biệt nhanh cách dùng các thì cơ bản (Đơn, Tiếp diễn, Hoàn thành).",
            formula: [
              { text: "Simple / Continuous / Perfect", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I work every day.", meaning: "Tôi làm việc mỗi ngày. (Hiện tại đơn)" },
              { correct: "I am working now.", meaning: "Tôi đang làm việc bây giờ. (Hiện tại tiếp diễn)" },
              { correct: "I have worked here for years.", meaning: "Tôi đã làm việc ở đây nhiều năm. (Hiện tại hoàn thành)" },
              { correct: "I was working when you called.", meaning: "Tôi đang làm việc thì bạn gọi tới. (Quá khứ tiếp diễn)" }
            ]
          },
          {
            title: "Trạng từ thời gian tương ứng",
            desc: "Gắn kết các trạng từ phổ biến với đúng thì của nó (recently -> HTHT, currently -> HTTD...).",
            formula: [
              { text: "recently / currently / previously", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I have recently finished the book.", meaning: "Tôi gần đây đã đọc xong cuốn sách." },
              { correct: "I am currently studying.", meaning: "Hiện tại tôi đang học." },
              { correct: "I lived there previously.", meaning: "Trước đây tôi đã sống ở đó." },
              { correct: "Eventually, he found a job.", meaning: "Cuối cùng, anh ấy đã tìm được một công việc." }
            ]
          },
          {
            title: "Sự hòa hợp giữa các thì",
            desc: "Cách kết hợp đúng các thì trong một câu phức có chứa mệnh đề thời gian hoặc mệnh đề danh ngữ.",
            formula: [
              { text: "Main Clause + Time Clause", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "When he arrived, I had already left.", meaning: "Khi anh ấy đến, tôi đã rời đi rồi." },
              { correct: "She told me that she was tired.", meaning: "Cô ấy nói với tôi rằng cô ấy đang mệt." },
              { correct: "I think I will go tomorrow.", meaning: "Tôi nghĩ tôi sẽ đi vào ngày mai." },
              { correct: "While I was cooking, the phone rang.", meaning: "Trong lúc tôi đang nấu ăn thì điện thoại reo." }
            ]
          }
        ]
      },
      {
        orderIndex: 21,
        grammar: [
          {
            title: "Conditional 3",
            desc: "Điều kiện loại 3 giả định một điều trái ngược với thực tế đã xảy ra trong quá khứ.",
            formula: [
              { text: "If + S + had + V3/ed, S + would have + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "If I had studied, I would have passed.", meaning: "Nếu (hồi đó) tôi đã học, tôi đã đậu rồi." },
              { correct: "If you had told me, I would have helped.", meaning: "Nếu bạn đã nói với tôi, tôi đã giúp bạn rồi." },
              { correct: "We wouldn't have missed the train if we had hurried.", meaning: "Chúng ta đã không lỡ chuyến tàu nếu chúng ta nhanh lên." },
              { correct: "If I had seen her, I would have said hello.", meaning: "Nếu tôi nhìn thấy cô ấy, tôi đã chào cô ấy rồi." }
            ]
          },
          {
            title: "Mixed Conditional",
            desc: "Điều kiện hỗn hợp (thường kết hợp giữa loại 3 và loại 2) giả định việc quá khứ ảnh hưởng đến kết quả hiện tại.",
            formula: [
              { text: "If + S + had + V3/ed, S + would + V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "If I had slept better, I would feel fine now.", meaning: "Nếu (tối qua) tôi ngủ ngon hơn, bây giờ tôi đã cảm thấy khỏe." },
              { correct: "If I had bought that ticket, I would be rich now.", meaning: "Nếu tôi đã mua chiếc vé đó, bây giờ tôi đã giàu rồi." },
              { correct: "If she had taken my advice, she wouldn't be in trouble.", meaning: "Nếu cô ấy đã nghe lời khuyên của tôi, bây giờ cô ấy đã không gặp rắc rối." },
              { correct: "If I knew Chinese, I would have translated it for you.", meaning: "Nếu tôi biết tiếng Trung (sự thật hiện tại), tôi đã dịch nó cho bạn (trong quá khứ)." }
            ]
          },
          {
            title: "Phân biệt Conditional 1/2/3",
            desc: "Loại 1 (có thể xảy ra hiện tại/tương lai), Loại 2 (trái thực tế hiện tại), Loại 3 (trái thực tế quá khứ).",
            formula: [
              { text: "Loại 1 / Loại 2 / Loại 3", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "If it rains, we will stay.", meaning: "Nếu trời mưa, chúng tôi sẽ ở lại. (Loại 1)" },
              { correct: "If it rained, we would stay.", meaning: "Nếu (bây giờ) trời mưa, chúng tôi sẽ ở lại. (Loại 2)" },
              { correct: "If it had rained, we would have stayed.", meaning: "Nếu (hôm qua) trời mưa, chúng tôi đã ở lại. (Loại 3)" },
              { correct: "If I have money, I will buy it.", meaning: "Nếu tôi có tiền, tôi sẽ mua nó. (Loại 1)" }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 12 (Bài 23-24)
  {
    fileName: "pet-grammar-cum12.json",
    lessons: [
      {
        orderIndex: 22,
        grammar: [
          {
            title: "Passive tổng hợp các thì",
            desc: "Hệ thống toàn diện thể bị động qua tất cả các thì cơ bản (Đơn, Tiếp diễn, Hoàn thành).",
            formula: [
              { text: "S + be + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "It is made.", meaning: "Nó được làm ra. (Hiện tại đơn)" },
              { correct: "It was made.", meaning: "Nó đã được làm ra. (Quá khứ đơn)" },
              { correct: "It has been made.", meaning: "Nó vừa được làm ra. (Hiện tại hoàn thành)" },
              { correct: "It is being made.", meaning: "Nó đang được làm ra. (Hiện tại tiếp diễn)" }
            ]
          },
          {
            title: "Passive + modal",
            desc: "Bị động với động từ khuyết thiếu (must/should/can... + be + V3 hoặc + have been + V3).",
            formula: [
              { text: "S + modal + be/have been + V3", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "It must be done.", meaning: "Nó phải được làm." },
              { correct: "It should have been finished.", meaning: "Đáng lẽ nó nên được hoàn thành xong rồi." },
              { correct: "It can be done.", meaning: "Việc đó có thể làm được." },
              { correct: "It might be delayed.", meaning: "Nó có thể bị trì hoãn." }
            ]
          },
          {
            title: "have something done",
            desc: "Cấu trúc cầu khiến bị động: Nhờ vả hoặc thuê người khác làm việc gì đó cho mình.",
            formula: [
              { text: "S + have/get + Object + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "She had her hair cut yesterday.", meaning: "Cô ấy đã đi cắt tóc ngày hôm qua." },
              { correct: "I had my car washed.", meaning: "Tôi đã mang xe đi rửa." },
              { correct: "We are having the roof repaired.", meaning: "Chúng tôi đang thuê người sửa mái nhà." },
              { correct: "He had his house broken into.", meaning: "Nhà anh ấy đã bị trộm đột nhập." }
            ]
          }
        ]
      },
      {
        orderIndex: 23,
        grammar: [
          {
            title: "Modal + deduction (present)",
            desc: "Suy đoán ở hiện tại: must be (chắc chắn), might/could be (có thể), can't be (chắc chắn không).",
            formula: [
              { text: "must / might / can't + be", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "He must be tired.", meaning: "Anh ấy chắc hẳn đang mệt." },
              { correct: "It can't be true.", meaning: "Điều đó chắc chắn không phải sự thật." },
              { correct: "She might be at home.", meaning: "Cô ấy có thể đang ở nhà." },
              { correct: "They could be lost.", meaning: "Họ có thể bị lạc rồi." }
            ]
          },
          {
            title: "Modal + deduction (past)",
            desc: "Suy đoán về quá khứ: must have V3 (chắc chắn đã), might have V3 (có thể đã), can't have V3 (chắc chắn không).",
            formula: [
              { text: "modal + have + V3/ed", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "She must have left early.", meaning: "Cô ấy chắc hẳn đã rời đi sớm." },
              { correct: "He can't have done it.", meaning: "Anh ta chắc chắn không thể đã làm chuyện đó." },
              { correct: "They might have forgotten.", meaning: "Họ có thể đã quên mất." },
              { correct: "You could have been killed!", meaning: "Bạn có thể đã mất mạng rồi đấy!" }
            ]
          },
          {
            title: "should / could / would have V3",
            desc: "Nói về những việc lẽ ra nên làm, có thể làm, hoặc sẽ làm trong quá khứ nhưng thực tế lại không làm.",
            formula: [
              { text: "should/could/would + have + V3", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "You should have told me earlier.", meaning: "Đáng lẽ bạn nên nói với tôi sớm hơn." },
              { correct: "I could have helped you.", meaning: "Đáng lẽ tôi đã có thể giúp bạn." },
              { correct: "I would have called, but I lost my phone.", meaning: "Tôi đáng lẽ đã gọi, nhưng tôi đánh mất điện thoại." },
              { correct: "She shouldn't have said that.", meaning: "Đáng lẽ cô ấy không nên nói điều đó." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 13 (Bài 25-26)
  {
    fileName: "pet-grammar-cum13.json",
    lessons: [
      {
        orderIndex: 24,
        grammar: [
          {
            title: "however / nevertheless",
            desc: "Tuy nhiên (thường đứng đầu câu hoặc giữa hai dấu phẩy/chấm phẩy, thể hiện sự tương phản mạnh).",
            formula: [
              { text: "Mệnh đề 1; however/nevertheless, Mệnh đề 2", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "He was tired; however, he finished the work.", meaning: "Anh ấy rất mệt; tuy nhiên, anh ấy vẫn hoàn thành công việc." },
              { correct: "The weather was bad; nevertheless, we played.", meaning: "Thời tiết rất xấu; dẫu vậy, chúng tôi vẫn chơi." },
              { correct: "It is cheap; however, the quality is poor.", meaning: "Nó rẻ; tuy nhiên, chất lượng lại kém." },
              { correct: "She was ill; nevertheless, she attended the meeting.", meaning: "Cô ấy ốm; tuy nhiên, cô ấy vẫn dự họp." }
            ]
          },
          {
            title: "therefore / consequently",
            desc: "Do đó, kết quả là (chỉ mối quan hệ nguyên nhân - kết quả).",
            formula: [
              { text: "Nguyên nhân; therefore/consequently, Kết quả", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "She studied hard; therefore, she passed.", meaning: "Cô ấy học chăm chỉ; do đó, cô ấy đã thi đậu." },
              { correct: "It rained heavily; consequently, the game was canceled.", meaning: "Mưa lớn; hậu quả là trận đấu bị hủy." },
              { correct: "He was late; as a result, he missed the train.", meaning: "Anh ấy đến trễ; kết quả là, anh ấy lỡ chuyến tàu." },
              { correct: "I have no money; therefore, I can't buy it.", meaning: "Tôi không có tiền; do đó, tôi không thể mua nó." }
            ]
          },
          {
            title: "furthermore / moreover",
            desc: "Hơn nữa, ngoài ra (dùng để bổ sung thêm thông tin cùng chiều lập luận).",
            formula: [
              { text: "Câu 1. Furthermore/Moreover, Câu 2", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The house is beautiful. Furthermore, it's cheap.", meaning: "Ngôi nhà rất đẹp. Hơn nữa, nó lại rẻ." },
              { correct: "He is smart. Moreover, he is very kind.", meaning: "Anh ấy thông minh. Ngoài ra, anh ấy còn rất tốt bụng." },
              { correct: "In addition to his salary, he gets a bonus.", meaning: "Bên cạnh lương, anh ấy còn nhận được tiền thưởng." },
              { correct: "The car is fast; moreover, it's safe.", meaning: "Chiếc xe chạy nhanh; hơn nữa, nó rất an toàn." }
            ]
          }
        ]
      },
      {
        orderIndex: 25,
        grammar: [
          {
            title: "Phrasal verbs tách được vs không",
            desc: "Một số cụm động từ có thể tách rời (tân ngữ đứng giữa), một số thì không được tách.",
            formula: [
              { text: "turn it on", classes: "border-blue-200 bg-blue-50 text-blue-700" },
              { text: "look after it (KHÔNG: look it after)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Turn on the light / Turn it on.", meaning: "Bật đèn lên." },
              { correct: "Take off your shoes / Take them off.", meaning: "Cởi giày của bạn ra." },
              { correct: "Look after the baby.", meaning: "Chăm sóc em bé. (Không thể tách)" },
              { correct: "She gave up smoking.", meaning: "Cô ấy đã từ bỏ việc hút thuốc." }
            ]
          },
          {
            title: "end up + V-ing",
            desc: "Cuối cùng thì lại làm gì (thường là ngoài dự kiến ban đầu).",
            formula: [
              { text: "end up + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "We got lost and ended up staying at home.", meaning: "Chúng tôi bị lạc và cuối cùng đành phải ở nhà." },
              { correct: "He ended up buying a new car.", meaning: "Cuối cùng anh ấy lại mua một chiếc ô tô mới." },
              { correct: "If you don't study, you will end up failing.", meaning: "Nếu bạn không học, kết cục bạn sẽ rớt." },
              { correct: "We ended up going to a different restaurant.", meaning: "Cuối cùng chúng tôi lại đến một nhà hàng khác." }
            ]
          },
          {
            title: "keep on / go on + V-ing",
            desc: "Tiếp tục làm gì đó một cách bền bỉ hoặc không dừng lại.",
            formula: [
              { text: "keep on / go on + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "She kept on talking despite the noise.", meaning: "Cô ấy vẫn tiếp tục nói bất chấp tiếng ồn." },
              { correct: "He went on working until midnight.", meaning: "Anh ấy tiếp tục làm việc cho đến nửa đêm." },
              { correct: "Don't give up, keep on trying.", meaning: "Đừng bỏ cuộc, hãy tiếp tục cố gắng." },
              { correct: "The rain kept on falling.", meaning: "Cơn mưa vẫn tiếp tục rơi." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 14 (Bài 27-28)
  {
    fileName: "pet-grammar-cum14.json",
    lessons: [
      {
        orderIndex: 26,
        grammar: [
          {
            title: "Verb + gerund (B1 nâng cao)",
            desc: "Các động từ B1 nâng cao mà theo sau bắt buộc là V-ing: consider, deny, involve, risk, stand, tolerate.",
            formula: [
              { text: "deny/involve/risk/can't stand + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "He denied stealing the money.", meaning: "Anh ta phủ nhận việc ăn trộm tiền." },
              { correct: "I enjoy reading books.", meaning: "Tôi rất thích đọc sách." },
              { correct: "The job involves travelling a lot.", meaning: "Công việc này đòi hỏi phải đi lại nhiều." },
              { correct: "I can't stand waiting.", meaning: "Tôi không thể chịu đựng được việc chờ đợi." }
            ]
          },
          {
            title: "Verb + infinitive (B1 nâng cao)",
            desc: "Các động từ B1 nâng cao theo sau bắt buộc là To-V: afford, attempt, refuse, manage, fail.",
            formula: [
              { text: "afford/refuse/manage/fail + to-V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "She refused to answer the question.", meaning: "Cô ấy từ chối trả lời câu hỏi." },
              { correct: "We managed to finish the project.", meaning: "Chúng tôi đã xoay xở hoàn thành được dự án." },
              { correct: "They decided to stay.", meaning: "Họ quyết định ở lại." },
              { correct: "I can't afford to buy this car.", meaning: "Tôi không đủ khả năng tài chính để mua chiếc xe này." }
            ]
          },
          {
            title: "Verb + object + infinitive",
            desc: "Yêu cầu/muốn/cho phép ai làm gì: ask/tell/want/allow/expect + tân ngữ + to-verb.",
            formula: [
              { text: "ask/want/allow + Object + to-V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "My parents allowed me to go to the party.", meaning: "Bố mẹ tôi đã cho phép tôi đi dự tiệc." },
              { correct: "He asked me to help him.", meaning: "Anh ấy yêu cầu tôi giúp anh ấy." },
              { correct: "I want you to be happy.", meaning: "Tôi muốn bạn hạnh phúc." },
              { correct: "They told us to wait outside.", meaning: "Họ bảo chúng tôi đứng đợi ở ngoài." }
            ]
          }
        ]
      },
      {
        orderIndex: 27,
        grammar: [
          {
            title: "although / even though",
            desc: "Mặc dù (cộng với một mệnh đề). Even though mang nghĩa nhấn mạnh hơn although.",
            formula: [
              { text: "Although/Even though + S + V, Mệnh đề", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Although it rained, we went out.", meaning: "Mặc dù trời mưa, chúng tôi vẫn ra ngoài." },
              { correct: "Even though he was tired, he kept working.", meaning: "Dù rất mệt, anh ấy vẫn tiếp tục làm việc." },
              { correct: "Although I don't like him, I agree with his idea.", meaning: "Mặc dù không thích anh ta, tôi đồng ý với ý tưởng của anh ta." },
              { correct: "She passed the exam although she didn't study.", meaning: "Cô ấy đậu kỳ thi mặc dù không hề học bài." }
            ]
          },
          {
            title: "despite / in spite of",
            desc: "Mặc dù (cộng với danh từ, cụm danh từ hoặc V-ing).",
            formula: [
              { text: "Despite/In spite of + Noun/V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Despite being tired, she worked late.", meaning: "Mặc dù rất mệt mỏi, cô ấy vẫn làm việc muộn." },
              { correct: "In spite of the rain, we enjoyed the trip.", meaning: "Bất chấp cơn mưa, chúng tôi vẫn tận hưởng chuyến đi." },
              { correct: "Despite his age, he is very active.", meaning: "Dù tuổi đã cao, ông ấy vẫn rất năng động." },
              { correct: "She went out in spite of feeling ill.", meaning: "Cô ấy vẫn đi ra ngoài bất chấp việc cảm thấy ốm." }
            ]
          },
          {
            title: "whereas / while",
            desc: "Trong khi (dùng để đối chiếu sự khác biệt giữa hai đối tượng trong cùng một câu).",
            formula: [
              { text: "Mệnh đề 1, whereas/while + Mệnh đề 2", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "He likes coffee, whereas I like tea.", meaning: "Anh ấy thích cà phê, trong khi tôi thích trà." },
              { correct: "While I was reading, she was watching TV.", meaning: "Trong lúc tôi đang đọc sách, cô ấy đang xem TV." },
              { correct: "She is very tall, whereas her sister is short.", meaning: "Cô ấy rất cao, trong khi em gái cô ấy thì nấm lùn." },
              { correct: "Some people like summer, while others prefer winter.", meaning: "Vài người thích mùa hè, trong khi số khác thích mùa đông hơn." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 15 (Bài 29-30)
  {
    fileName: "pet-grammar-cum15.json",
    lessons: [
      {
        orderIndex: 28,
        grammar: [
          {
            title: "Skimming & scanning",
            desc: "Chiến thuật làm bài đọc hiểu: Đọc lướt lấy ý chính (Skim) và Quét tìm chi tiết cụ thể (Scan).",
            formula: [
              { text: "Skim (Ý chính) - Scan (Chi tiết)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Skim the text to get the main idea quickly.", meaning: "Đọc lướt văn bản để nắm ý chính một cách nhanh chóng." },
              { correct: "Scan the text to find specific names or dates.", meaning: "Quét văn bản để tìm các cái tên hoặc ngày tháng cụ thể." },
              { correct: "Skimming helps you understand the overall topic.", meaning: "Đọc lướt giúp bạn hiểu chủ đề tổng thể." },
              { correct: "Scanning is useful for finding numbers.", meaning: "Kỹ năng quét rất hữu ích khi muốn tìm các con số." }
            ]
          },
          {
            title: "Câu hỏi suy luận",
            desc: "Tìm câu trả lời dựa trên những ẩn ý của tác giả mà không được viết thẳng ra trong bài.",
            formula: [
              { text: "Infer/Suggest/Imply", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "It can be inferred that the author is angry.", meaning: "Có thể suy luận ra rằng tác giả đang tức giận." },
              { correct: "The text suggests that the problem is serious.", meaning: "Văn bản ngụ ý rằng vấn đề này đang rất nghiêm trọng." },
              { correct: "What can be inferred from paragraph 2?", meaning: "Có thể suy luận được gì từ đoạn 2?" },
              { correct: "The writer implies that the solution is not easy.", meaning: "Người viết ám chỉ rằng giải pháp không hề dễ dàng." }
            ]
          },
          {
            title: "Vocabulary in context",
            desc: "Kỹ năng đoán nghĩa của từ vựng mới dựa vào các từ xung quanh và ngữ cảnh của đoạn văn.",
            formula: [
              { text: "Đoán nghĩa qua ngữ cảnh", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Guess the meaning of the word from the surrounding words.", meaning: "Đoán nghĩa của từ dựa vào các từ xung quanh." },
              { correct: "The context helps you understand new vocabulary.", meaning: "Ngữ cảnh giúp bạn hiểu từ vựng mới." },
              { correct: "Read the whole sentence to guess the word's meaning.", meaning: "Đọc toàn bộ câu để đoán nghĩa của từ." },
              { correct: "Look for clues in the previous sentence.", meaning: "Tìm kiếm các manh mối ở câu ngay trước đó." }
            ]
          }
        ]
      },
      {
        orderIndex: 29,
        grammar: [
          {
            title: "Past Simple vs Past Continuous",
            desc: "Trong văn tường thuật: Quá khứ tiếp diễn mô tả bối cảnh nền, Quá khứ đơn mô tả sự kiện chính cắt ngang.",
            formula: [
              { text: "Nền (Past Cont.) + Sự kiện (Past Simple)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The sun was shining when the murder happened.", meaning: "Mặt trời đang chiếu sáng khi vụ án mạng xảy ra." },
              { correct: "I was sleeping when you knocked on the door.", meaning: "Tôi đang ngủ thì bạn gõ cửa." },
              { correct: "It was raining hard when we left the house.", meaning: "Trời đang mưa to lúc chúng tôi rời khỏi nhà." },
              { correct: "She was reading while he was cooking.", meaning: "Cô ấy đang đọc sách trong khi anh ấy đang nấu ăn." }
            ]
          },
          {
            title: "Time expressions in narratives",
            desc: "Các từ chỉ thời gian giúp tạo liên kết và nhịp điệu cho câu chuyện (suddenly, eventually...).",
            formula: [
              { text: "Suddenly/Immediately/Eventually/Finally", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Suddenly, the door opened.", meaning: "Đột nhiên, cánh cửa mở ra." },
              { correct: "Immediately, he called the police.", meaning: "Ngay lập tức, anh ta gọi điện cho cảnh sát." },
              { correct: "Eventually, they found the treasure.", meaning: "Cuối cùng, họ cũng tìm thấy kho báu." },
              { correct: "Finally, the truth was revealed.", meaning: "Cuối cùng thì sự thật cũng đã được phơi bày." }
            ]
          },
          {
            title: "Mệnh đề quan hệ trong văn học",
            desc: "Sử dụng mệnh đề quan hệ không xác định để bổ sung chi tiết miêu tả về nhân vật hoặc địa điểm.",
            formula: [
              { text: "Noun, who/which ..., V", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The man, who was wearing a dark coat, ran away.", meaning: "Người đàn ông, người mà đang mặc áo khoác tối màu, đã bỏ chạy." },
              { correct: "The castle, which stood on the hill, was old.", meaning: "Tòa lâu đài, cái nằm trên đỉnh đồi, đã rất cũ kĩ." },
              { correct: "The ring, which he had lost years ago, was found.", meaning: "Chiếc nhẫn, thứ mà anh đã làm mất nhiều năm trước, đã được tìm thấy." },
              { correct: "The woman whose son was missing cried loudly.", meaning: "Người phụ nữ có đứa con bị mất tích đã khóc rất to." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 16 (Bài 31-32)
  {
    fileName: "pet-grammar-cum16.json",
    lessons: [
      {
        orderIndex: 30,
        grammar: [
          {
            title: "Cấu trúc email/thư B1",
            desc: "Các mẫu câu chuẩn thường dùng để bắt đầu một bức email hoặc lá thư trang trọng.",
            formula: [
              { text: "Dear... / I am writing to... / Best regards", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I am writing to enquire about the course.", meaning: "Tôi viết thư này để hỏi thông tin về khóa học." },
              { correct: "I would be grateful if you could send me more information.", meaning: "Tôi sẽ rất biết ơn nếu ngài có thể gửi thêm thông tin." },
              { correct: "Dear Sir or Madam,", meaning: "Kính gửi Ông/Bà," },
              { correct: "Best regards,", meaning: "Trân trọng," }
            ]
          },
          {
            title: "Lời đề nghị lịch sự B1",
            desc: "Cách nói lịch sự thay vì dùng mệnh lệnh trực tiếp (I wonder if / Would it be possible).",
            formula: [
              { text: "Would it be possible to / I wonder if you could", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Would it be possible to change my room?", meaning: "Liệu có thể đổi phòng cho tôi được không?" },
              { correct: "I wonder if you could help me.", meaning: "Tôi tự hỏi liệu bạn có thể giúp tôi không." },
              { correct: "Could you please send me the file?", meaning: "Bạn làm ơn gửi cho tôi file đó được không?" },
              { correct: "I would appreciate it if you could reply soon.", meaning: "Tôi sẽ rất cảm kích nếu bạn có thể hồi đáp sớm." }
            ]
          },
          {
            title: "Cấu trúc kết thư",
            desc: "Mẫu câu kết thúc thư thông dụng để mong chờ sự phản hồi.",
            formula: [
              { text: "I look forward to + V-ing", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I look forward to hearing from you soon.", meaning: "Tôi mong sớm nhận được hồi âm từ bạn." },
              { correct: "I look forward to receiving your reply.", meaning: "Tôi mong chờ nhận được sự phản hồi của bạn." },
              { correct: "Hope to hear from you soon.", meaning: "Hi vọng sớm nghe tin từ bạn." },
              { correct: "Best wishes,", meaning: "Những lời chúc tốt đẹp nhất," }
            ]
          }
        ]
      },
      {
        orderIndex: 31,
        grammar: [
          {
            title: "Cấu trúc bài luận B1",
            desc: "Một bài luận tiêu chuẩn có 3 phần: Giới thiệu (Introduction), Thân bài (Body), Kết luận (Conclusion).",
            formula: [
              { text: "Introduction -> Body Paragraphs -> Conclusion", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The essay has three main parts.", meaning: "Bài tiểu luận có ba phần chính." },
              { correct: "Start with a clear introduction.", meaning: "Hãy bắt đầu với một phần mở bài rõ ràng." },
              { correct: "Use paragraphs for each main point.", meaning: "Dành riêng các đoạn văn cho mỗi luận điểm chính." },
              { correct: "End with a strong conclusion.", meaning: "Kết thúc bằng một lời kết luận mạnh mẽ." }
            ]
          },
          {
            title: "Cấu trúc nêu ý kiến",
            desc: "Bắt đầu luận điểm bằng các cụm từ thể hiện quan điểm cá nhân.",
            formula: [
              { text: "In my opinion / I believe / It seems to me that", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "In my opinion, living in the city is better.", meaning: "Theo ý kiến của tôi, sống ở thành phố thì tốt hơn." },
              { correct: "I believe that learning a second language is important.", meaning: "Tôi tin rằng việc học ngôn ngữ thứ hai là quan trọng." },
              { correct: "It seems to me that the problem is getting worse.", meaning: "Có vẻ như với tôi thì vấn đề đang ngày càng tệ hơn." },
              { correct: "From my point of view, it is a bad idea.", meaning: "Từ góc nhìn của tôi, đó là một ý tưởng tồi." }
            ]
          },
          {
            title: "Từ nối bài luận",
            desc: "Sắp xếp ý tưởng bài viết mạch lạc bằng các từ nối đầu đoạn.",
            formula: [
              { text: "Firstly / Secondly / Finally / In conclusion", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Firstly, I want to say thank you.", meaning: "Đầu tiên, tôi muốn nói lời cảm ơn." },
              { correct: "Secondly, this saves a lot of time.", meaning: "Thứ hai, điều này giúp tiết kiệm rất nhiều thời gian." },
              { correct: "In conclusion, it is the best choice.", meaning: "Tóm lại, đó là sự lựa chọn tốt nhất." },
              { correct: "On the other hand, it has some disadvantages.", meaning: "Mặt khác, nó cũng có vài nhược điểm." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 17 (Bài 33-34)
  {
    fileName: "pet-grammar-cum17.json",
    lessons: [
      {
        orderIndex: 32,
        grammar: [
          {
            title: "Cụm lấp đầy (Fillers)",
            desc: "Dùng để kéo dài thời gian suy nghĩ trong hội thoại mà không làm ngắt quãng câu chuyện.",
            formula: [
              { text: "Well / Actually / What I mean is / You know", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Well, actually, I don't agree.", meaning: "À thực ra thì, tôi không đồng ý." },
              { correct: "What I mean is, it's too expensive.", meaning: "Ý tôi là, nó quá đắt." },
              { correct: "You know, it's not that simple.", meaning: "Bạn biết đấy, chuyện đó không đơn giản vậy đâu." },
              { correct: "Let me think about it.", meaning: "Hãy để tôi suy nghĩ về chuyện đó." }
            ]
          },
          {
            title: "Tag questions trong hội thoại",
            desc: "Lên giọng ở câu hỏi đuôi để hỏi thật, xuống giọng để tìm kiếm sự đồng tình/xác nhận.",
            formula: [
              { text: "Statement, auxiliary + pronoun?", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "You are coming, aren't you?", meaning: "Bạn sẽ đến mà, phải không?" },
              { correct: "It's a beautiful day, isn't it?", meaning: "Trời hôm nay thật đẹp, phải không nào?" },
              { correct: "You don't like coffee, do you?", meaning: "Bạn không thích cà phê, đúng không?" },
              { correct: "She has finished, hasn't she?", meaning: "Cô ấy đã xong rồi, đúng chứ?" }
            ]
          },
          {
            title: "Reported speech trong bài nghe",
            desc: "Chú ý nghe cách người nói tường thuật lại lời người khác (dùng thì lùi) để hiểu đúng thông tin gián tiếp.",
            formula: [
              { text: "S + said (that) + S + V(lùi thì)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "The speaker said he was tired.", meaning: "Người nói bảo rằng ông ấy đang mệt." },
              { correct: "She told the interviewer she wanted to change her job.", meaning: "Cô ấy nói với người phỏng vấn rằng cô muốn đổi việc." },
              { correct: "He asked if there were any questions.", meaning: "Ông ấy hỏi xem có câu hỏi nào không." },
              { correct: "They said they had enjoyed the trip.", meaning: "Họ nói rằng họ đã rất tận hưởng chuyến đi." }
            ]
          }
        ]
      },
      {
        orderIndex: 33,
        grammar: [
          {
            title: "Diễn đạt ý kiến speaking B1",
            desc: "Sử dụng các mẫu câu tự nhiên hơn để trình bày quan điểm trong bài thi Nói.",
            formula: [
              { text: "I'd say that / In my view / Personally", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I'd say that it's a great idea.", meaning: "Tôi cho rằng đó là một ý tưởng tuyệt vời." },
              { correct: "In my view, we should start immediately.", meaning: "Theo góc nhìn của tôi, chúng ta nên bắt đầu ngay." },
              { correct: "As far as I'm concerned, it's perfect.", meaning: "Theo như tôi thấy thì nó quá hoàn hảo." },
              { correct: "Personally, I think it's a mistake.", meaning: "Cá nhân tôi cho rằng đó là một sai lầm." }
            ]
          },
          {
            title: "Trả lời mở rộng",
            desc: "Luôn đưa ra lý do (because) và ví dụ (for example) khi trả lời các câu hỏi nêu ý kiến.",
            formula: [
              { text: "Idea + Because... + For example...", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I like reading because it relaxes me.", meaning: "Tôi thích đọc sách vì nó giúp tôi thư giãn." },
              { correct: "For example, I read a lot of novels.", meaning: "Ví dụ như, tôi đọc rất nhiều tiểu thuyết." },
              { correct: "I agree because it saves money.", meaning: "Tôi đồng ý vì nó giúp tiết kiệm tiền." },
              { correct: "To give you an example, I usually wake up early.", meaning: "Đưa ra cho bạn một ví dụ nhé, tôi thường thức dậy sớm." }
            ]
          },
          {
            title: "Đề xuất trong speaking",
            desc: "Cách đưa ra gợi ý, đề xuất cho nhóm thảo luận.",
            formula: [
              { text: "Why don't we / How about / Let's", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Why don't we go to the beach?", meaning: "Tại sao chúng ta không đi biển nhỉ?" },
              { correct: "How about watching a movie?", meaning: "Xem một bộ phim thì sao?" },
              { correct: "What if we start tomorrow?", meaning: "Sẽ thế nào nếu chúng ta bắt đầu vào ngày mai?" },
              { correct: "Let's order some pizza.", meaning: "Chúng ta hãy đặt pizza đi." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 18 (Bài 35-36)
  {
    fileName: "pet-grammar-cum18.json",
    lessons: [
      {
        orderIndex: 34,
        grammar: [
          {
            title: "So sánh trong thảo luận",
            desc: "Dùng cấu trúc so sánh hơn/nhất để ưu tiên các giải pháp khi làm bài tập thảo luận nhóm.",
            formula: [
              { text: "more important / better than / the most", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "I think it's more important to save money.", meaning: "Tôi nghĩ việc tiết kiệm tiền quan trọng hơn." },
              { correct: "This option is much better than the other one.", meaning: "Lựa chọn này tốt hơn nhiều so với lựa chọn kia." },
              { correct: "That is the most difficult part.", meaning: "Đó là phần khó nhất." },
              { correct: "It's not as easy as it looks.", meaning: "Nó không dễ như vẻ ngoài đâu." }
            ]
          },
          {
            title: "Cân nhắc 2 phía",
            desc: "Phân tích mặt lợi và mặt hại của một vấn đề (On the one hand... on the other hand).",
            formula: [
              { text: "On the one hand... On the other hand...", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "On the one hand, it is cheap. On the other hand, it's slow.", meaning: "Một mặt thì nó rẻ. Mặt khác thì nó lại chậm." },
              { correct: "Although it's expensive, it's very useful.", meaning: "Mặc dù đắt đỏ, nó lại rất hữu dụng." },
              { correct: "It has both advantages and disadvantages.", meaning: "Nó có cả ưu điểm lẫn nhược điểm." },
              { correct: "We need to consider both sides of the argument.", meaning: "Chúng ta cần xem xét cả hai khía cạnh của cuộc tranh luận." }
            ]
          },
          {
            title: "Conditional trong đề xuất",
            desc: "Sử dụng câu điều kiện loại 1 và 2 để đưa ra đề xuất mang tính thuyết phục.",
            formula: [
              { text: "If we do... / If I were you...", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "If I were you, I would take the job.", meaning: "Nếu tôi là bạn, tôi sẽ nhận công việc đó." },
              { correct: "If we do this, it will save time.", meaning: "Nếu chúng ta làm điều này, nó sẽ giúp tiết kiệm thời gian." },
              { correct: "If we went there, we could see the museum.", meaning: "Nếu chúng ta đến đó, chúng ta có thể tham quan bảo tàng." },
              { correct: "If we leave now, we will catch the train.", meaning: "Nếu chúng ta rời đi bây giờ, chúng ta sẽ bắt kịp tàu." }
            ]
          }
        ]
      },
      {
        orderIndex: 35,
        grammar: [
          {
            title: "Hệ thống thì hoàn chỉnh",
            desc: "Tổng hợp toàn bộ các thì Hiện tại, Quá khứ, Hoàn thành, Tương lai phục vụ cho kỳ thi PET.",
            formula: [
              { text: "Tense Review", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "You need to master all basic tenses for the exam.", meaning: "Bạn cần nắm vững tất cả các thì cơ bản cho kỳ thi." },
              { correct: "Pay attention to time markers.", meaning: "Hãy chú ý đến các dấu hiệu thời gian." },
              { correct: "Understand the difference between present perfect and past simple.", meaning: "Hiểu rõ sự khác biệt giữa hiện tại hoàn thành và quá khứ đơn." },
              { correct: "Practice mixed tense exercises.", meaning: "Hãy luyện tập các bài tập chia thì hỗn hợp." }
            ]
          },
          {
            title: "Bị động toàn tầng",
            desc: "Ôn tập câu bị động kết hợp với mọi thì và với động từ khuyết thiếu.",
            formula: [
              { text: "Passive Review", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Remember the structure: be + V3.", meaning: "Hãy nhớ cấu trúc: động từ tobe + V3/ed." },
              { correct: "Modal passives are very common.", meaning: "Câu bị động với động từ khuyết thiếu rất phổ biến." },
              { correct: "Don't forget 'have something done'.", meaning: "Đừng quên cấu trúc 'nhờ vả ai đó'." },
              { correct: "Active sentences can be transformed into passive ones.", meaning: "Câu chủ động có thể được chuyển thành câu bị động." }
            ]
          },
          {
            title: "Conditionals & Wish",
            desc: "Ôn tập và phân biệt nhanh Điều kiện loại 1/2/3 và cấu trúc Wish.",
            formula: [
              { text: "Conditional / Wish Review", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Review types 1, 2, and 3 conditionals.", meaning: "Hãy ôn lại câu điều kiện loại 1, 2 và 3." },
              { correct: "Understand mixed conditionals.", meaning: "Hãy hiểu rõ về câu điều kiện hỗn hợp." },
              { correct: "Use 'wish' for regrets.", meaning: "Sử dụng 'wish' cho những sự hối tiếc." },
              { correct: "Practice rewriting sentences using 'if only'.", meaning: "Hãy thực hành viết lại câu sử dụng 'giá như'." }
            ]
          }
        ]
      }
    ]
  },
  // Chunk 19 (Bài 37)
  {
    fileName: "pet-grammar-cum19.json",
    lessons: [
      {
        orderIndex: 36,
        grammar: [
          {
            title: "Collocations B1 phổ biến",
            desc: "Các cụm từ cố định thường gặp trong bài thi PET.",
            formula: [
              { text: "make progress / achieve a goal", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "He made a lot of progress this year.", meaning: "Anh ấy đã tiến bộ rất nhiều trong năm nay." },
              { correct: "We need to achieve our goals.", meaning: "Chúng ta cần phải đạt được những mục tiêu của mình." },
              { correct: "You will gain valuable experience.", meaning: "Bạn sẽ thu được những kinh nghiệm quý báu." },
              { correct: "Make sure to do your homework.", meaning: "Hãy đảm bảo là bạn làm bài tập về nhà nhé." }
            ]
          },
          {
            title: "Word formation",
            desc: "Cấu tạo từ vựng: nhận biết danh từ, động từ, tính từ dựa vào đuôi từ (hậu tố).",
            formula: [
              { text: "Verb -> Noun (achieve -> achievement)", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "Her success is well-deserved.", meaning: "Sự thành công của cô ấy là hoàn toàn xứng đáng." },
              { correct: "This is a great achievement.", meaning: "Đây là một thành tựu vĩ đại." },
              { correct: "The failure was a lesson for us.", meaning: "Sự thất bại đó là một bài học cho chúng tôi." },
              { correct: "You need imagination to solve this.", meaning: "Bạn cần có trí tưởng tượng để giải quyết việc này." }
            ]
          },
          {
            title: "have + noun trong collocations",
            desc: "Sử dụng have kết hợp với danh từ để tạo cụm hành động thay vì dùng động từ thường.",
            formula: [
              { text: "have + an argument / a conversation", classes: "border-blue-200 bg-blue-50 text-blue-700" }
            ],
            practiceList: [
              { correct: "We had a long conversation.", meaning: "Chúng tôi đã có một cuộc trò chuyện dài." },
              { correct: "They had a heated argument.", meaning: "Họ đã có một cuộc cãi vã nảy lửa." },
              { correct: "I need to have a rest.", meaning: "Tôi cần phải nghỉ ngơi một chút." },
              { correct: "Let's have a chat later.", meaning: "Chúng ta hãy tán gẫu sau nhé." }
            ]
          }
        ]
      }
    ]
  }
];

async function seedAll() {
  const program = await prisma.program.findUnique({ where: { code: 'en-pet' } });
  if (!program) {
    console.log("Không tìm thấy en-pet");
    return;
  }

  let totalSeeded = 0;

  for (const chunk of chunks) {
    const filePath = path.join(__dirname, '../../data', chunk.fileName);
    fs.writeFileSync(filePath, JSON.stringify({ lessons: chunk.lessons }, null, 2));
    console.log(`Đã tạo file ${chunk.fileName}`);

    for (const lessonData of chunk.lessons) {
      const lesson = await prisma.lesson.findFirst({
        where: { programId: program.id, orderIndex: lessonData.orderIndex }
      });
      if (!lesson) continue;

      await prisma.lessonContent.deleteMany({
        where: { lessonId: lesson.id, contentType: 'GRAMMAR' }
      });

      for (const pt of lessonData.grammar) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'GRAMMAR',
            content: JSON.stringify(pt)
          }
        });
        totalSeeded++;
      }
      console.log(`Đã seed bài học orderIndex ${lessonData.orderIndex}`);
    }
  }

  console.log(`\nHoàn tất toàn bộ! Tổng cộng đã thêm: ${totalSeeded} chủ điểm ngữ pháp.`);
}

seedAll()
  .then(() => prisma.$disconnect())
  .catch(e => { console.error(e); prisma.$disconnect(); });

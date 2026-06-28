const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const grammarData = [
  // Cụm 1 (Bài 1 - 2)
  [
    {
      orderIndex: 0,
      grammar: [
        { point: "look / seem / appear + adj", explanation: "Dùng để diễn tả ấn tượng, vẻ bề ngoài hoặc trạng thái của ai/cái gì.", example_en: "She seems nervous. He appears confident.", example_vi: "Cô ấy có vẻ lo lắng. Anh ấy trông có vẻ tự tin." },
        { point: "be supposed to", explanation: "Dùng để nói về bổn phận, trách nhiệm hoặc những gì được mong đợi phải làm.", example_en: "You're supposed to be on time.", example_vi: "Bạn đáng lẽ phải đến đúng giờ." },
        { point: "look like + noun vs look + adj", explanation: "Look like đi với danh từ để so sánh ngoại hình, look đi với tính từ để miêu tả trạng thái.", example_en: "She looks like her mother. She looks happy.", example_vi: "Cô ấy trông giống mẹ. Cô ấy trông rất vui." }
      ]
    },
    {
      orderIndex: 1,
      grammar: [
        { point: "feel + adj", explanation: "Dùng để diễn tả cảm xúc, cảm giác của bản thân.", example_en: "I feel embarrassed about it.", example_vi: "Tôi cảm thấy xấu hổ về điều đó." },
        { point: "make + object + adj/verb", explanation: "Diễn tả việc làm cho ai đó cảm thấy thế nào hoặc bắt ai đó làm gì.", example_en: "It makes me feel nervous. She made me laugh.", example_vi: "Nó làm tôi cảm thấy lo lắng. Cô ấy đã làm tôi cười." },
        { point: "be/get + adj", explanation: "Phân biệt trạng thái (be) và quá trình thay đổi trạng thái (get).", example_en: "I was confused vs I got confused.", example_vi: "Tôi đã (ở trạng thái) bối rối vs Tôi đã trở nên bối rối." }
      ]
    }
  ],
  // Cụm 2 (Bài 3 - 4)
  [
    {
      orderIndex: 2,
      grammar: [
        { point: "-ed vs -ing adjectives", explanation: "Tính từ đuôi -ing miêu tả tính chất của sự vật/sự việc gây ra cảm xúc. Tính từ đuôi -ed miêu tả cảm xúc của người bị tác động.", example_en: "The movie was boring, so I was bored.", example_vi: "Bộ phim thật tẻ nhạt, nên tôi cảm thấy chán." },
        { point: "so + adj + that", explanation: "Quá... đến nỗi mà...", example_en: "I was so exhausted that I fell asleep immediately.", example_vi: "Tôi đã kiệt sức đến mức tôi ngủ thiếp đi ngay lập tức." },
        { point: "Question Tags với cảm xúc", explanation: "Dùng câu hỏi đuôi để xác nhận lại cảm xúc của người khác.", example_en: "She's upset, isn't she?", example_vi: "Cô ấy đang buồn, phải không?" }
      ]
    },
    {
      orderIndex: 3,
      grammar: [
        { point: "Gerund làm chủ ngữ", explanation: "Động từ thêm -ing có thể đóng vai trò làm chủ ngữ trong câu.", example_en: "Reading is important. Writing essays takes time.", example_vi: "Việc đọc sách là quan trọng. Việc viết luận tốn nhiều thời gian." },
        { point: "It is + adj + to-infinitive", explanation: "Cấu trúc chủ ngữ giả để đưa ra nhận định về một hành động.", example_en: "It is important to read every day.", example_vi: "Việc đọc sách mỗi ngày là rất quan trọng." },
        { point: "enjoy/avoid/suggest/recommend + V-ing", explanation: "Một số động từ theo sau bắt buộc là danh động từ (V-ing).", example_en: "I suggest reading this book.", example_vi: "Tôi đề nghị đọc cuốn sách này." }
      ]
    }
  ],
  // Cụm 3 (Bài 5 - 6)
  [
    {
      orderIndex: 4,
      grammar: [
        { point: "in order to / so as to", explanation: "Dùng để chỉ mục đích (để làm gì). Phủ định là in order not to / so as not to.", example_en: "She studied hard in order to pass.", example_vi: "Cô ấy đã học chăm chỉ để thi đậu." },
        { point: "be able to & manage to", explanation: "Dùng để chỉ khả năng hoặc sự xoay xở thành công để làm việc gì đó khó khăn.", example_en: "Did you manage to finish the essay?", example_vi: "Bạn có xoay xở hoàn thành được bài luận không?" },
        { point: "apply for / apply to", explanation: "Apply for (nộp đơn xin việc/học bổng), Apply to (nộp đơn đến tổ chức/trường học).", example_en: "I will apply for the job. I applied to the university.", example_vi: "Tôi sẽ nộp đơn xin công việc đó. Tôi đã nộp đơn vào trường đại học." }
      ]
    },
    {
      orderIndex: 5,
      grammar: [
        { point: "used to vs would", explanation: "Used to dùng cho cả trạng thái và hành động lặp lại trong quá khứ. Would chỉ dùng cho hành động lặp lại.", example_en: "I used to work there. We would meet every Friday.", example_vi: "Tôi từng làm việc ở đó. Chúng tôi thường gặp nhau vào mỗi thứ Sáu." },
        { point: "be responsible for + V-ing", explanation: "Chịu trách nhiệm cho việc gì.", example_en: "She is responsible for training new staff.", example_vi: "Cô ấy chịu trách nhiệm đào tạo nhân viên mới." },
        { point: "Reported Questions", explanation: "Câu hỏi gián tiếp: từ để hỏi/if/whether + S + V (lùi thì).", example_en: "They asked me if I had experience.", example_vi: "Họ hỏi tôi xem tôi có kinh nghiệm không." }
      ]
    }
  ],
  // Cụm 4 (Bài 7 - 8)
  [
    {
      orderIndex: 6,
      grammar: [
        { point: "work as vs work for", explanation: "Work as + nghề nghiệp. Work for + tên công ty/người chủ.", example_en: "She works as a lawyer. He works for a big company.", example_vi: "Cô ấy làm nghề luật sư. Anh ấy làm việc cho một công ty lớn." },
        { point: "Mệnh đề quan hệ whose", explanation: "Dùng để chỉ sự sở hữu cho người hoặc vật.", example_en: "He is an architect whose designs are famous.", example_vi: "Ông ấy là một kiến trúc sư có những thiết kế rất nổi tiếng." },
        { point: "Bị động trong mô tả công việc", explanation: "Sử dụng bị động để nhấn mạnh vào công việc được hoàn thành thay vì người làm.", example_en: "Reports are written by the editor.", example_vi: "Các bản báo cáo được viết bởi biên tập viên." }
      ]
    },
    {
      orderIndex: 7,
      grammar: [
        { point: "not only ... but also", explanation: "Không những... mà còn...", example_en: "Not only is it expensive, but it also takes too long.", example_vi: "Nó không những đắt đỏ, mà còn tốn quá nhiều thời gian." },
        { point: "both ... and / neither ... nor", explanation: "Cả hai / Không cái nào trong hai cái.", example_en: "Both the government and the community are responsible.", example_vi: "Cả chính phủ và cộng đồng đều có trách nhiệm." },
        { point: "should / ought to", explanation: "Dùng để đưa ra lời khuyên hoặc nói về bổn phận xã hội.", example_en: "People should recycle more.", example_vi: "Mọi người nên tái chế nhiều hơn." }
      ]
    }
  ],
  // Cụm 5 (Bài 9 - 10)
  [
    {
      orderIndex: 8,
      grammar: [
        { point: "will & might/could", explanation: "Will để dự đoán chắc chắn trong tương lai, might/could chỉ khả năng có thể xảy ra.", example_en: "Temperatures will rise. It might get worse.", example_vi: "Nhiệt độ sẽ tăng. Tình hình có thể tồi tệ hơn." },
        { point: "Conditional 1", explanation: "Câu điều kiện loại 1 diễn tả sự việc có thể xảy ra ở hiện tại hoặc tương lai.", example_en: "If we don't act, the planet will suffer.", example_vi: "Nếu chúng ta không hành động, hành tinh sẽ phải gánh chịu hậu quả." },
        { point: "unless", explanation: "Unless = If ... not (Trừ khi).", example_en: "We must act unless we want the situation to get worse.", example_vi: "Chúng ta phải hành động trừ khi chúng ta muốn tình hình trở nên tồi tệ hơn." }
      ]
    },
    {
      orderIndex: 9,
      grammar: [
        { point: "Passive Present Continuous", explanation: "Bị động thì hiện tại tiếp diễn: am/is/are + being + V3/ed.", example_en: "Trees are being cut down every day.", example_vi: "Cây cối đang bị chặt phá mỗi ngày." },
        { point: "Passive Present Perfect", explanation: "Bị động thì hiện tại hoàn thành: have/has + been + V3/ed.", example_en: "The river has been polluted for years.", example_vi: "Con sông đã bị ô nhiễm trong nhiều năm." },
        { point: "It is important that + should/must", explanation: "Cấu trúc nhấn mạnh tầm quan trọng của việc gì.", example_en: "It is important that we should reduce waste.", example_vi: "Việc chúng ta nên giảm thiểu rác thải là rất quan trọng." }
      ]
    }
  ],
  // Cụm 6 (Bài 11 - 12)
  [
    {
      orderIndex: 10,
      grammar: [
        { point: "Past Continuous", explanation: "Thì quá khứ tiếp diễn diễn tả hành động đang xảy ra tại một thời điểm trong quá khứ.", example_en: "I was feeling ill when I woke up.", example_vi: "Tôi đang cảm thấy ốm khi tôi thức dậy." },
        { point: "have something done", explanation: "Cấu trúc nhờ vả/được người khác làm cho việc gì (bị động).", example_en: "I had an operation last year.", example_vi: "Tôi đã trải qua (được thực hiện) một cuộc phẫu thuật vào năm ngoái." },
        { point: "must / can't suy đoán", explanation: "Must: chắc hẳn là, Can't: chắc chắn không thể là (dựa trên bằng chứng hiện tại).", example_en: "You must be exhausted. She can't be feeling well.", example_vi: "Bạn chắc hẳn là kiệt sức rồi. Cô ấy chắc chắn là đang không khỏe." }
      ]
    },
    {
      orderIndex: 11,
      grammar: [
        { point: "It's worth + V-ing", explanation: "Đáng để làm gì.", example_en: "It's worth trying yoga.", example_vi: "Tập yoga thật sự rất đáng thử." },
        { point: "there's no point (in) + V-ing", explanation: "Thật vô ích khi làm gì.", example_en: "There's no point in complaining.", example_vi: "Phàn nàn cũng vô ích thôi." },
        { point: "be worth + V-ing vs be worth + noun", explanation: "Worth + V-ing (đáng để làm hành động), Worth + noun/money (có giá trị bao nhiêu).", example_en: "The book is worth reading. It is worth $10.", example_vi: "Cuốn sách đáng để đọc. Nó trị giá 10 đô la." }
      ]
    }
  ],
  // Cụm 7 (Bài 13 - 14)
  [
    {
      orderIndex: 12,
      grammar: [
        { point: "Present Perfect Continuous", explanation: "Hiện tại hoàn thành tiếp diễn nhấn mạnh quá trình liên tục của hành động bắt đầu từ quá khứ đến hiện tại.", example_en: "I've been travelling for six months.", example_vi: "Tôi đã đi du lịch liên tục suốt 6 tháng nay." },
        { point: "just / already / yet / still", explanation: "Các trạng từ thường dùng với thì hiện tại hoàn thành.", example_en: "Have you packed yet?", example_vi: "Bạn đã đóng gói hành lý chưa?" },
        { point: "get to / arrive at / reach", explanation: "Get to/arrive at/in đi với giới từ, reach + tân ngữ trực tiếp (không giới từ).", example_en: "We reached the destination. We arrived at the hotel.", example_vi: "Chúng tôi đã đến đích. Chúng tôi đã đến khách sạn." }
      ]
    },
    {
      orderIndex: 13,
      grammar: [
        { point: "be going to vs will", explanation: "Be going to cho kế hoạch đã định trước, Will cho quyết định bộc phát hoặc lời hứa.", example_en: "I am going to travel to Paris. I will help you with your bags.", example_vi: "Tôi dự định sẽ đi Paris. Tôi sẽ giúp bạn xách túi." },
        { point: "in case", explanation: "Phòng khi (làm gì đó để chuẩn bị cho một khả năng).", example_en: "Take a map in case you get lost.", example_vi: "Hãy mang theo bản đồ phòng khi bạn bị lạc." },
        { point: "make a reservation / book in advance", explanation: "Các cụm từ dùng để nói về việc đặt trước chỗ ở hoặc dịch vụ.", example_en: "I made a reservation for two.", example_vi: "Tôi đã đặt trước chỗ cho hai người." }
      ]
    }
  ],
  // Cụm 8 (Bài 15 - 16)
  [
    {
      orderIndex: 14,
      grammar: [
        { point: "Past Continuous ôn", explanation: "Ôn tập Quá khứ tiếp diễn diễn tả bối cảnh.", example_en: "I was driving when it started to rain.", example_vi: "Tôi đang lái xe thì trời bắt đầu mưa." },
        { point: "Past Continuous + Past Simple", explanation: "Hành động đang xảy ra (QKTD) thì hành động khác xen vào (QKĐ).", example_en: "When she arrived, I was waiting.", example_vi: "Khi cô ấy đến, tôi đang đợi." },
        { point: "Phrasal verbs giao thông", explanation: "Các cụm động từ thường gặp: break down (hỏng xe), fill up (đổ đầy xăng), pick up (đón ai).", example_en: "My car broke down on the motorway.", example_vi: "Xe của tôi bị hỏng trên đường cao tốc." }
      ]
    },
    {
      orderIndex: 15,
      grammar: [
        { point: "by the time + Past Perfect", explanation: "Vào lúc... thì một việc khác đã xảy ra xong trước đó.", example_en: "By the time I arrived, the train had left.", example_vi: "Vào lúc tôi đến, chuyến tàu đã rời đi rồi." },
        { point: "Passive Past Perfect", explanation: "Bị động thì quá khứ hoàn thành: had + been + V3/ed.", example_en: "The road had been closed before we got there.", example_vi: "Con đường đã bị đóng lại trước khi chúng tôi đến đó." },
        { point: "How long does it take to...?", explanation: "Cấu trúc hỏi và trả lời về thời gian di chuyển/làm việc.", example_en: "How long does it take to get there? It takes about an hour.", example_vi: "Mất bao lâu để đến đó? Mất khoảng một giờ." }
      ]
    }
  ],
  // Cụm 9 (Bài 17 - 18)
  [
    {
      orderIndex: 16,
      grammar: [
        { point: "Mệnh đề quan hệ where", explanation: "Where thay thế cho trạng từ chỉ nơi chốn trong mệnh đề quan hệ.", example_en: "This is the gallery where modern art is displayed.", example_vi: "Đây là phòng trưng bày nơi nghệ thuật hiện đại được triển lãm." },
        { point: "Mệnh đề quan hệ when", explanation: "When thay thế cho trạng từ chỉ thời gian trong mệnh đề quan hệ.", example_en: "It was a time when people had no TV.", example_vi: "Đó là thời điểm mà mọi người chưa có tivi." },
        { point: "which / who / that / whose", explanation: "Hệ thống các đại từ quan hệ thay thế cho vật, người, hoặc sở hữu.", example_en: "The artist who painted this is famous.", example_vi: "Người họa sĩ đã vẽ bức tranh này rất nổi tiếng." }
      ]
    },
    {
      orderIndex: 17,
      grammar: [
        { point: "Reported Speech (backshift)", explanation: "Lùi thì trong câu gián tiếp (Hiện tại -> Quá khứ, Quá khứ -> Quá khứ hoàn thành).", example_en: "'I am writing' -> She said she was writing.", example_vi: "'Tôi đang viết' -> Cô ấy nói rằng cô ấy đang viết." },
        { point: "Reported speech với thì hoàn thành", explanation: "Hiện tại hoàn thành và Quá khứ đơn lùi về Quá khứ hoàn thành.", example_en: "'I have finished' -> He said he had finished.", example_vi: "'Tôi đã hoàn thành' -> Anh ấy nói rằng anh ấy đã hoàn thành." },
        { point: "say vs tell", explanation: "Say (nói chung chung, say to someone), Tell (kể cho ai, tell someone).", example_en: "He said he was tired. He told me he was tired.", example_vi: "Anh ấy nói anh ấy mệt. Anh ấy bảo tôi rằng anh ấy mệt." }
      ]
    }
  ],
  // Cụm 10 (Bài 19 - 20)
  [
    {
      orderIndex: 18,
      grammar: [
        { point: "I wish / If only + Past Simple", explanation: "Điều ước trái ngược với hiện tại.", example_en: "I wish I had more time to read.", example_vi: "Tôi ước gì mình có nhiều thời gian hơn để đọc sách." },
        { point: "I wish + Past Perfect", explanation: "Điều ước trái ngược với một việc đã xảy ra trong quá khứ.", example_en: "I wish I had read that book before.", example_vi: "Tôi ước gì mình đã đọc cuốn sách đó trước đây." },
        { point: "I wish + would", explanation: "Diễn tả sự phàn nàn và mong muốn ai đó thay đổi hành động trong tương lai.", example_en: "I wish you would stop talking.", example_vi: "Tôi ước gì bạn ngừng nói chuyện đi." }
      ]
    },
    {
      orderIndex: 19,
      grammar: [
        { point: "Passive Future", explanation: "Bị động thì tương lai đơn: will + be + V3/ed.", example_en: "The update will be released next week.", example_vi: "Bản cập nhật sẽ được phát hành vào tuần tới." },
        { point: "Passive with modal verbs", explanation: "Bị động với động từ khuyết thiếu: modal + be + V3/ed.", example_en: "The data should be backed up.", example_vi: "Dữ liệu nên được sao lưu." },
        { point: "have been + V-ing", explanation: "Hiện tại hoàn thành tiếp diễn thường dùng để nói về quá trình phát triển công nghệ liên tục.", example_en: "They have been developing this software for years.", example_vi: "Họ đã và đang phát triển phần mềm này trong nhiều năm." }
      ]
    }
  ],
  // Cụm 11 (Bài 21 - 22)
  [
    {
      orderIndex: 20,
      grammar: [
        { point: "Hệ thống thì hiện tại/quá khứ", explanation: "Tổng ôn các thì Hiện tại đơn/tiếp diễn/hoàn thành và Quá khứ đơn/tiếp diễn/hoàn thành.", example_en: "I work every day. I am working now. I have worked here for years.", example_vi: "Tôi làm việc mỗi ngày. Tôi đang làm việc bây giờ. Tôi đã làm việc ở đây nhiều năm." },
        { point: "Trạng từ thời gian tương ứng", explanation: "Gắn kết các trạng từ (recently, currently, previously) với đúng thì của nó.", example_en: "I have recently finished the book.", example_vi: "Tôi gần đây đã đọc xong cuốn sách." },
        { point: "Sự hòa hợp giữa các thì", explanation: "Cách kết hợp các thì trong một câu phức.", example_en: "When he arrived, I had already left.", example_vi: "Khi anh ấy đến, tôi đã rời đi rồi." }
      ]
    },
    {
      orderIndex: 21,
      grammar: [
        { point: "Conditional 3", explanation: "Điều kiện loại 3 giả định một điều trái ngược trong quá khứ. If + Past Perfect, would have + V3/ed.", example_en: "If I had studied, I would have passed.", example_vi: "Nếu tôi đã học, tôi đã đậu rồi." },
        { point: "Mixed Conditional", explanation: "Điều kiện hỗn hợp (thường loại 3 + loại 2) giả định việc quá khứ ảnh hưởng đến kết quả hiện tại.", example_en: "If I had slept better, I would feel fine now.", example_vi: "Nếu (tối qua) tôi ngủ ngon hơn, bây giờ tôi đã cảm thấy khỏe." },
        { point: "Phân biệt Conditional 1/2/3", explanation: "Loại 1 (có thể xảy ra), Loại 2 (trái thực tế hiện tại), Loại 3 (trái thực tế quá khứ).", example_en: "If it rains, we will stay. If it rained, we would stay. If it had rained, we would have stayed.", example_vi: "N/A" }
      ]
    }
  ],
  // Cụm 12 (Bài 23 - 24)
  [
    {
      orderIndex: 22,
      grammar: [
        { point: "Passive tổng hợp các thì", explanation: "Hệ thống toàn diện thể bị động qua các thì cơ bản (Hiện tại, Quá khứ, Hoàn thành).", example_en: "It is made. It was made. It has been made.", example_vi: "Nó được làm ra. Nó đã được làm ra. Nó vừa được làm ra." },
        { point: "Passive + modal", explanation: "Bị động với động từ khuyết thiếu (must/should/can + be + V3 hoặc must/should + have been + V3).", example_en: "It must be done. It should have been finished.", example_vi: "Nó phải được hoàn thành. Đáng lẽ nó nên được hoàn thành xong rồi." },
        { point: "have something done", explanation: "Nhờ vả ai đó làm gì cho mình (Cầu khiến bị động).", example_en: "She had her hair cut yesterday.", example_vi: "Cô ấy đã đi cắt tóc ngày hôm qua." }
      ]
    },
    {
      orderIndex: 23,
      grammar: [
        { point: "Modal + deduction (present)", explanation: "Suy đoán ở hiện tại: must be (chắc chắn), might/could be (có thể), can't be (chắc chắn không).", example_en: "He must be tired. It can't be true.", example_vi: "Anh ấy chắc hẳn đang mệt. Điều đó chắc chắn không phải sự thật." },
        { point: "Modal + deduction (past)", explanation: "Suy đoán về quá khứ: must have V3 (chắc chắn đã), might have V3 (có thể đã), can't have V3 (chắc chắn đã không).", example_en: "She must have left early.", example_vi: "Cô ấy chắc hẳn đã rời đi sớm." },
        { point: "should / could / would have V3", explanation: "Nói về những việc lẽ ra nên làm, có thể làm, hoặc sẽ làm trong quá khứ nhưng thực tế không xảy ra.", example_en: "You should have told me earlier.", example_vi: "Đáng lẽ bạn nên nói với tôi sớm hơn." }
      ]
    }
  ],
  // Cụm 13 (Bài 25 - 26)
  [
    {
      orderIndex: 24,
      grammar: [
        { point: "however / nevertheless", explanation: "Tuy nhiên (thường đứng đầu câu hoặc giữa hai dấu phẩy/chấm phẩy, thể hiện sự tương phản).", example_en: "He was tired; however, he finished the work.", example_vi: "Anh ấy rất mệt; tuy nhiên, anh ấy vẫn hoàn thành công việc." },
        { point: "therefore / consequently / as a result", explanation: "Do đó, hậu quả là (chỉ nguyên nhân - kết quả).", example_en: "She studied hard; therefore, she passed.", example_vi: "Cô ấy học chăm chỉ; do đó, cô ấy đã thi đậu." },
        { point: "furthermore / moreover / in addition", explanation: "Hơn nữa, ngoài ra (bổ sung thêm thông tin cùng chiều).", example_en: "The house is beautiful. Furthermore, it's cheap.", example_vi: "Ngôi nhà rất đẹp. Hơn nữa, nó lại rẻ." }
      ]
    },
    {
      orderIndex: 25,
      grammar: [
        { point: "Phrasal verbs tách được vs không", explanation: "Một số cụm động từ có thể tách rời (turn the light on), một số thì không (look after the baby).", example_en: "Turn on the light / Turn it on.", example_vi: "Bật đèn lên." },
        { point: "end up + V-ing", explanation: "Cuối cùng thì lại làm gì (thường là ngoài dự kiến ban đầu).", example_en: "We got lost and ended up staying at home.", example_vi: "Chúng tôi bị lạc và cuối cùng đành ở nhà." },
        { point: "keep on / go on + V-ing", explanation: "Tiếp tục làm gì đó.", example_en: "She kept on talking despite the noise.", example_vi: "Cô ấy vẫn tiếp tục nói bất chấp tiếng ồn." }
      ]
    }
  ],
  // Cụm 14 (Bài 27 - 28)
  [
    {
      orderIndex: 26,
      grammar: [
        { point: "Verb + gerund (B1 nâng cao)", explanation: "Các động từ theo sau bắt buộc là V-ing: consider, deny, involve, mind, risk, stand, tolerate.", example_en: "He denied stealing the money.", example_vi: "Anh ta phủ nhận việc ăn trộm tiền." },
        { point: "Verb + infinitive (B1 nâng cao)", explanation: "Các động từ theo sau bắt buộc là To-V: afford, attempt, refuse, manage, fail.", example_en: "She refused to answer the question.", example_vi: "Cô ấy từ chối trả lời câu hỏi." },
        { point: "Verb + object + infinitive", explanation: "Yêu cầu/muốn/cho phép ai làm gì: ask/tell/want/allow/expect + someone + to-verb.", example_en: "My parents allowed me to go to the party.", example_vi: "Bố mẹ tôi đã cho phép tôi đi dự tiệc." }
      ]
    },
    {
      orderIndex: 27,
      grammar: [
        { point: "although / even though", explanation: "Mặc dù (+ mệnh đề). Even though mang nghĩa nhấn mạnh hơn although.", example_en: "Although it rained, we went out.", example_vi: "Mặc dù trời mưa, chúng tôi vẫn ra ngoài." },
        { point: "despite / in spite of", explanation: "Mặc dù (+ danh từ / cụm danh từ / V-ing).", example_en: "Despite being tired, she worked late.", example_vi: "Mặc dù rất mệt mỏi, cô ấy vẫn làm việc muộn." },
        { point: "whereas / while", explanation: "Trong khi (dùng để đối chiếu sự khác biệt giữa hai đối tượng trong cùng một câu).", example_en: "He likes coffee, whereas I like tea.", example_vi: "Anh ấy thích cà phê, trong khi tôi thích trà." }
      ]
    }
  ],
  // Cụm 15 (Bài 29 - 30)
  [
    {
      orderIndex: 28,
      grammar: [
        { point: "Skimming & scanning", explanation: "Skimming: đọc lướt lấy ý chính. Scanning: quét để tìm thông tin chi tiết (tên, số, ngày tháng).", example_en: "N/A", example_vi: "N/A" },
        { point: "Câu hỏi suy luận", explanation: "Tìm câu trả lời dựa trên những ẩn ý của tác giả (It can be inferred that...).", example_en: "N/A", example_vi: "N/A" },
        { point: "Vocabulary in context", explanation: "Đoán nghĩa của từ vựng mới dựa vào các từ xung quanh và ngữ cảnh của đoạn văn.", example_en: "N/A", example_vi: "N/A" }
      ]
    },
    {
      orderIndex: 29,
      grammar: [
        { point: "Past Simple vs Past Continuous", explanation: "Trong văn tường thuật: Quá khứ tiếp diễn mô tả bối cảnh nền, Quá khứ đơn mô tả sự kiện chính xảy ra.", example_en: "The sun was shining when the murder happened.", example_vi: "Mặt trời đang chiếu sáng khi vụ án mạng xảy ra." },
        { point: "Time expressions in narratives", explanation: "Các từ chỉ thời gian giúp liên kết câu chuyện: suddenly, immediately, eventually, finally.", example_en: "Suddenly, the door opened.", example_vi: "Đột nhiên, cánh cửa mở ra." },
        { point: "Mệnh đề quan hệ trong văn học", explanation: "Dùng mệnh đề quan hệ để giải thích thêm chi tiết về nhân vật hoặc địa điểm mà không ngắt mạch truyện.", example_en: "The man, who was wearing a dark coat, ran away.", example_vi: "Người đàn ông, người mà đang mặc một chiếc áo khoác tối màu, đã bỏ chạy." }
      ]
    }
  ],
  // Cụm 16 (Bài 31 - 32)
  [
    {
      orderIndex: 30,
      grammar: [
        { point: "Cấu trúc email/thư B1", explanation: "Các câu mẫu thường dùng: I am writing to enquire about... / I would be grateful if...", example_en: "I am writing to enquire about the course.", example_vi: "Tôi viết thư này để hỏi thông tin về khóa học." },
        { point: "Lời đề nghị lịch sự B1", explanation: "Cách nói lịch sự thay vì dùng mệnh lệnh trực tiếp: I wonder if you could... / Would it be possible to...?", example_en: "Would it be possible to change my room?", example_vi: "Liệu có thể đổi phòng cho tôi được không?" },
        { point: "Cấu trúc kết thư", explanation: "Mẫu câu kết thúc thư thông dụng: I look forward to hearing from you.", example_en: "I look forward to hearing from you soon.", example_vi: "Tôi mong sớm nhận được hồi âm từ bạn." }
      ]
    },
    {
      orderIndex: 31,
      grammar: [
        { point: "Cấu trúc bài luận B1", explanation: "Một bài luận tiêu chuẩn có 3 phần: Giới thiệu (Introduction), Thân bài (Body), Kết luận (Conclusion).", example_en: "N/A", example_vi: "N/A" },
        { point: "Cấu trúc nêu ý kiến", explanation: "Bắt đầu luận điểm bằng: In my opinion, I believe, I think, It seems to me that...", example_en: "In my opinion, living in the city is better.", example_vi: "Theo ý kiến của tôi, sống ở thành phố thì tốt hơn." },
        { point: "Từ nối bài luận", explanation: "Sắp xếp ý tưởng bằng các từ nối: Firstly, Secondly, Finally, In conclusion.", example_en: "Finally, I want to say thank you.", example_vi: "Cuối cùng, tôi muốn nói lời cảm ơn." }
      ]
    }
  ],
  // Cụm 17 (Bài 33 - 34)
  [
    {
      orderIndex: 32,
      grammar: [
        { point: "Cụm lấp đầy (Fillers)", explanation: "Dùng để kéo dài thời gian suy nghĩ trong hội thoại: Well, actually... / What I mean is...", example_en: "Well, actually, I don't agree.", example_vi: "À thực ra thì, tôi không đồng ý." },
        { point: "Tag questions trong hội thoại", explanation: "Lên giọng cuối câu hỏi đuôi để hỏi thật, xuống giọng để xác nhận lại điều mình đã biết.", example_en: "You are coming, aren't you? (xuống giọng)", example_vi: "Bạn sẽ đến mà, phải không?" },
        { point: "Reported speech trong bài nghe", explanation: "Chú ý nghe cách người nói tường thuật lại lời người khác để hiểu đúng thông tin gián tiếp.", example_en: "N/A", example_vi: "N/A" }
      ]
    },
    {
      orderIndex: 33,
      grammar: [
        { point: "Diễn đạt ý kiến speaking B1", explanation: "Sử dụng các mẫu câu tự nhiên hơn để trình bày quan điểm: I'd say that... / In my view...", example_en: "I'd say that it's a great idea.", example_vi: "Tôi cho rằng đó là một ý tưởng tuyệt vời." },
        { point: "Trả lời mở rộng", explanation: "Luôn đưa ra lý do (because) và ví dụ (for example) khi trả lời các câu hỏi What do you think about...?", example_en: "N/A", example_vi: "N/A" },
        { point: "Đề xuất trong speaking", explanation: "Cách đưa ra gợi ý cho nhóm: Why don't we...? / How about...? / What if we...?", example_en: "Why don't we go to the beach?", example_vi: "Tại sao chúng ta không đi biển nhỉ?" }
      ]
    }
  ],
  // Cụm 18 (Bài 35 - 36)
  [
    {
      orderIndex: 34,
      grammar: [
        { point: "So sánh trong thảo luận", explanation: "Dùng cấu trúc so sánh để ưu tiên các giải pháp: I think it's more important to...", example_en: "I think it's more important to save money.", example_vi: "Tôi nghĩ việc tiết kiệm tiền quan trọng hơn." },
        { point: "Cân nhắc 2 phía", explanation: "Phân tích mặt lợi và mặt hại: On the one hand... on the other hand...", example_en: "On the one hand, it is cheap. On the other hand, it's slow.", example_vi: "Một mặt, nó rẻ. Mặt khác, nó lại chậm." },
        { point: "Conditional trong đề xuất", explanation: "Sử dụng câu điều kiện loại 1 và 2 để thuyết phục: If we do this, it will... / If I were you, I would...", example_en: "If I were you, I would take the job.", example_vi: "Nếu tôi là bạn, tôi sẽ nhận công việc đó." }
      ]
    },
    {
      orderIndex: 35,
      grammar: [
        { point: "Hệ thống thì hoàn chỉnh", explanation: "Tổng hợp toàn bộ các thì Hiện tại, Quá khứ, Hoàn thành, Tương lai phục vụ cho kỳ thi PET.", example_en: "N/A", example_vi: "N/A" },
        { point: "Bị động toàn tầng", explanation: "Ôn tập câu bị động kết hợp với mọi thì và với động từ khuyết thiếu.", example_en: "N/A", example_vi: "N/A" },
        { point: "Conditionals & Wish", explanation: "Ôn tập và phân biệt nhanh Điều kiện loại 1/2/3 và cấu trúc Wish.", example_en: "N/A", example_vi: "N/A" }
      ]
    }
  ],
  // Cụm 19 (Bài 37)
  [
    {
      orderIndex: 36,
      grammar: [
        { point: "Collocations B1 phổ biến", explanation: "Các cụm từ cố định thường gặp trong bài thi: make progress, achieve a goal, gain experience.", example_en: "He made a lot of progress this year.", example_vi: "Anh ấy đã tiến bộ rất nhiều trong năm nay." },
        { point: "Word formation", explanation: "Cấu tạo từ vựng (danh từ, động từ, tính từ): achieve -> achievement, fail -> failure, succeed -> success.", example_en: "Her success is well-deserved.", example_vi: "Sự thành công của cô ấy là hoàn toàn xứng đáng." },
        { point: "have + noun trong collocations", explanation: "Sử dụng have kết hợp với danh từ để tạo cụm hành động: have an argument, have a conversation.", example_en: "We had a long conversation.", example_vi: "Chúng tôi đã có một cuộc trò chuyện dài." }
      ]
    }
  ]
];

async function main() {
  const program = await prisma.program.findUnique({ where: { code: 'en-pet' } });
  if (!program) {
    console.error("Không tìm thấy chương trình en-pet");
    return;
  }

  let totalPointsAdded = 0;

  for (let i = 0; i < grammarData.length; i++) {
    const chunk = grammarData[i];
    
    // Ghi file JSON cho mỗi cụm
    const fileName = `pet-grammar-cum${i + 1}.json`;
    const filePath = path.join(__dirname, '../../data', fileName);
    fs.writeFileSync(filePath, JSON.stringify({ lessons: chunk }, null, 2));
    console.log(`Đã tạo file ${fileName}`);

    // Seed vào database
    for (const lessonData of chunk) {
      const lesson = await prisma.lesson.findFirst({
        where: { programId: program.id, orderIndex: lessonData.orderIndex }
      });

      if (!lesson) {
        console.error(`Không tìm thấy bài học có orderIndex ${lessonData.orderIndex}`);
        continue;
      }

      // Xóa grammar cũ nếu có
      await prisma.lessonContent.deleteMany({
        where: { lessonId: lesson.id, contentType: 'GRAMMAR' }
      });

      // Thêm grammar mới
      for (const point of lessonData.grammar) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'GRAMMAR',
            content: JSON.stringify(point)
          }
        });
        totalPointsAdded++;
      }
      console.log(`Đã seed ${lessonData.grammar.length} chủ điểm ngữ pháp vào bài học orderIndex ${lessonData.orderIndex}`);
    }
  }

  console.log(`\\nHoàn thành! Tổng số chủ điểm ngữ pháp đã thêm: ${totalPointsAdded}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => { console.error(e); prisma.$disconnect(); });

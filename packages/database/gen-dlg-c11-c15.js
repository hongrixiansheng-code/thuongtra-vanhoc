const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = [
  // Cụm 11: Bài 21 (orderIndex 20), Bài 22 (orderIndex 21)
  {
    fileName: 'pet-dialogue-cum11.json',
    lessons: [
      {
        orderIndex: 20,
        dialogues: [
          {
            title: "Discussing recent events",
            lines: [
              { speaker: "Leo", "en": "I have been trying to call you all morning, but your phone was switched off. What were you doing when I tried to contact you?", vi: "Tôi đã cố gắng gọi cho bạn cả buổi sáng, nhưng điện thoại của bạn đã bị tắt. Bạn đang làm gì khi tôi cố gắng liên lạc với bạn?" },
              { speaker: "Grace", "en": "I was attending a long seminar which started at eight o'clock. By the time it finished, my phone had already run out of battery.", vi: "Tôi đang tham dự một buổi hội thảo kéo dài cái mà bắt đầu lúc tám giờ. Vào thời điểm nó kết thúc, điện thoại của tôi đã hết pin." },
              { speaker: "Leo", "en": "Have you heard the news about the new manager who was hired yesterday? He has already introduced several changes to our daily schedule.", vi: "Bạn đã nghe tin tức về người quản lý mới người đã được thuê hôm qua chưa? Ông ấy đã giới thiệu một số thay đổi đối với lịch trình hàng ngày của chúng ta." },
              { speaker: "Grace", "en": "I haven't met him yet, but my colleagues were talking about him during the break. They said that he is very strict and professional.", vi: "Tôi vẫn chưa gặp ông ấy, nhưng các đồng nghiệp của tôi đang nói về ông ấy trong giờ nghỉ. Họ nói rằng ông ấy rất nghiêm khắc và chuyên nghiệp." },
              { speaker: "Leo", "en": "He had worked in Germany for five years before he moved to our company. He will probably expect us to work much harder now.", vi: "Ông ấy đã làm việc ở Đức trong năm năm trước khi ông ấy chuyển đến công ty chúng ta. Có lẽ bây giờ ông ấy sẽ mong đợi chúng ta làm việc chăm chỉ hơn nhiều." },
              { speaker: "Grace", "en": "I am currently working on a big project, which takes up all my time. I will be sending the final report to him by Friday.", vi: "Tôi hiện đang làm việc cho một dự án lớn, cái mà chiếm toàn bộ thời gian của tôi. Tôi sẽ gửi bản báo cáo cuối cùng cho ông ấy trước thứ Sáu." },
              { speaker: "Leo", "en": "We are having a team meeting tomorrow afternoon where he will present his plans. You should definitely attend it if you want to know his expectations.", vi: "Chúng ta sẽ có một cuộc họp nhóm vào chiều mai nơi ông ấy sẽ trình bày các kế hoạch của mình. Bạn chắc chắn nên tham dự nếu bạn muốn biết những kỳ vọng của ông ấy." },
              { speaker: "Grace", "en": "I will make sure to be there because I want to make a good impression. Hopefully, the changes which he makes will benefit everyone.", vi: "Tôi sẽ đảm bảo có mặt ở đó vì tôi muốn tạo ấn tượng tốt. Hy vọng rằng, những thay đổi mà ông ấy thực hiện sẽ mang lại lợi ích cho mọi người." }
            ]
          },
          {
            title: "Catching up with an old friend",
            lines: [
              { speaker: "Sam", "en": "I haven't seen you since we graduated from university five years ago! What have you been doing lately in this big city?", vi: "Tôi đã không gặp bạn kể từ khi chúng ta tốt nghiệp đại học năm năm trước! Gần đây bạn đang làm gì ở thành phố lớn này?" },
              { speaker: "Lily", "en": "I have been working as a graphic designer for a marketing agency. I moved here last year because I wanted to find better opportunities.", vi: "Tôi đang làm thiết kế đồ họa cho một công ty tiếp thị. Tôi đã chuyển đến đây vào năm ngoái vì tôi muốn tìm kiếm những cơ hội tốt hơn." },
              { speaker: "Sam", "en": "That is amazing, and I am currently running my own small business. I started it after I had quit my boring office job.", vi: "Điều đó thật tuyệt vời, và tôi hiện đang điều hành doanh nghiệp nhỏ của riêng mình. Tôi đã bắt đầu nó sau khi tôi từ bỏ công việc văn phòng nhàm chán của mình." },
              { speaker: "Lily", "en": "You were always very creative, so I am not surprised at all. Has your business been growing well over the past few months?", vi: "Bạn đã luôn rất sáng tạo, vì vậy tôi hoàn toàn không ngạc nhiên. Doanh nghiệp của bạn có đang phát triển tốt trong vài tháng qua không?" },
              { speaker: "Sam", "en": "Yes, we have opened two new shops, which are doing quite well. By the end of this year, we will have expanded to another city.", vi: "Có, chúng tôi đã mở hai cửa hàng mới, những nơi đang làm ăn khá tốt. Vào cuối năm nay, chúng tôi sẽ mở rộng sang một thành phố khác." },
              { speaker: "Lily", "en": "I am so happy for you, and we should definitely stay in touch. Let's exchange numbers so that we can meet up again soon.", vi: "Tôi rất mừng cho bạn, và chúng ta chắc chắn nên giữ liên lạc. Hãy trao đổi số điện thoại để chúng ta có thể gặp lại nhau sớm." },
              { speaker: "Sam", "en": "I will text you my new address, which is near the central park. We can have dinner together when you have some free time.", vi: "Tôi sẽ nhắn tin cho bạn địa chỉ mới của tôi, cái mà nằm gần công viên trung tâm. Chúng ta có thể ăn tối cùng nhau khi bạn có chút thời gian rảnh." },
              { speaker: "Lily", "en": "I would love that, and I will call you next weekend. It was so wonderful to see you after such a long time.", vi: "Tôi rất thích điều đó, và tôi sẽ gọi cho bạn vào cuối tuần tới. Thật tuyệt vời khi được gặp bạn sau một thời gian dài như vậy." }
            ]
          }
        ]
      },
      {
        orderIndex: 21,
        dialogues: [
          {
            title: "Discussing hypothetical situations",
            lines: [
              { speaker: "Max", "en": "If I win the lottery this weekend, I will buy a huge house near the beach. What would you do if you had a million dollars?", vi: "Nếu tôi trúng xổ số cuối tuần này, tôi sẽ mua một ngôi nhà khổng lồ gần bãi biển. Bạn sẽ làm gì nếu bạn có một triệu đô la?" },
              { speaker: "Chloe", "en": "If I had that much money, I would travel around the world for a year. I would visit countries which I have never seen before.", vi: "Nếu tôi có ngần ấy tiền, tôi sẽ đi du lịch vòng quanh thế giới trong một năm. Tôi sẽ đến thăm những quốc gia mà tôi chưa từng thấy trước đây." },
              { speaker: "Max", "en": "That sounds like a great dream, but we won't win unless we buy a ticket. If you don't take risks, you will never achieve anything extraordinary.", vi: "Điều đó nghe có vẻ là một giấc mơ tuyệt vời, nhưng chúng ta sẽ không trúng trừ khi chúng ta mua một tấm vé. Nếu bạn không chấp nhận rủi ro, bạn sẽ không bao giờ đạt được điều gì phi thường." },
              { speaker: "Chloe", "en": "If I had known the winning numbers yesterday, I would be rich right now. Unfortunately, predicting the future is something which is impossible.", vi: "Nếu tôi biết những con số trúng thưởng ngày hôm qua, tôi đã giàu có ngay bây giờ rồi. Thật không may, dự đoán tương lai là một việc cái mà bất khả thi." },
              { speaker: "Max", "en": "If I were the president, I would spend more money on education and healthcare. Society would be much better if everyone had equal opportunities.", vi: "Nếu tôi là tổng thống, tôi sẽ chi nhiều tiền hơn cho giáo dục và chăm sóc sức khỏe. Xã hội sẽ tốt hơn nhiều nếu mọi người đều có cơ hội bình đẳng." },
              { speaker: "Chloe", "en": "If people cared more about the environment, the planet wouldn't be suffering from climate change. We must act now if we want to save our home.", vi: "Nếu mọi người quan tâm nhiều hơn đến môi trường, hành tinh sẽ không phải chịu đựng biến đổi khí hậu. Chúng ta phải hành động ngay bây giờ nếu chúng ta muốn cứu lấy ngôi nhà của mình." },
              { speaker: "Max", "en": "I completely agree with you, and I will start recycling if my town provides the bins. Every small action matters when we face global challenges.", vi: "Tôi hoàn toàn đồng ý với bạn, và tôi sẽ bắt đầu tái chế nếu thị trấn của tôi cung cấp các thùng rác. Mỗi hành động nhỏ đều quan trọng khi chúng ta đối mặt với những thách thức toàn cầu." },
              { speaker: "Chloe", "en": "If we all work together, we can make a huge difference. Let's hope that more people will realize this before it is too late.", vi: "Nếu tất cả chúng ta cùng làm việc, chúng ta có thể tạo ra một sự khác biệt lớn. Hãy hy vọng rằng nhiều người hơn sẽ nhận ra điều này trước khi quá muộn." }
            ]
          },
          {
            title: "Planning for the weekend",
            lines: [
              { speaker: "Ryan", "en": "If it doesn't rain tomorrow, we will go hiking in the mountains. However, if the weather is bad, we will stay at home and watch movies.", vi: "Nếu ngày mai trời không mưa, chúng ta sẽ đi bộ đường dài trên núi. Tuy nhiên, nếu thời tiết xấu, chúng ta sẽ ở nhà và xem phim." },
              { speaker: "Mia", "en": "If you had checked the forecast earlier, we could have planned something else indoors. The weatherman said that heavy storms are approaching our area.", vi: "Nếu bạn kiểm tra dự báo thời tiết sớm hơn, chúng ta đã có thể lên kế hoạch cho thứ gì đó khác ở trong nhà. Người dẫn chương trình thời tiết nói rằng những cơn bão lớn đang đến gần khu vực của chúng ta." },
              { speaker: "Ryan", "en": "If we stay inside, I will bake the chocolate cake which you like so much. It is a perfect treat for a cold and rainy day.", vi: "Nếu chúng ta ở trong nhà, tôi sẽ nướng chiếc bánh sôcôla cái mà bạn rất thích. Nó là một món ngon hoàn hảo cho một ngày lạnh và mưa." },
              { speaker: "Mia", "en": "I would be very happy if you did that! If I had bought some strawberries, we could have used them for the cake decoration.", vi: "Tôi sẽ rất vui nếu bạn làm vậy! Nếu tôi mua một ít dâu tây, chúng ta đã có thể sử dụng chúng để trang trí bánh." },
              { speaker: "Ryan", "en": "If the supermarket is still open, I will drive there quickly and buy some. I wouldn't mind going out if the rain hasn't started yet.", vi: "Nếu siêu thị vẫn còn mở cửa, tôi sẽ lái xe đến đó nhanh chóng và mua một ít. Tôi sẽ không ngại ra ngoài nếu trời vẫn chưa bắt đầu mưa." },
              { speaker: "Mia", "en": "Unless you hurry, the shop will close before you arrive. If you go now, you will definitely make it on time.", vi: "Trừ khi bạn nhanh lên, cửa hàng sẽ đóng cửa trước khi bạn đến. Nếu bạn đi ngay bây giờ, bạn chắc chắn sẽ đến kịp lúc." },
              { speaker: "Ryan", "en": "If I am late, I will just buy some vanilla ice cream from the local convenience store. It also tastes great with hot chocolate cake.", vi: "Nếu tôi bị trễ, tôi sẽ chỉ mua một ít kem vani từ cửa hàng tiện lợi địa phương. Nó cũng rất ngon khi ăn cùng bánh sôcôla nóng." },
              { speaker: "Mia", "en": "That is a fantastic alternative, so don't drive too fast on the slippery roads. Call me if you need anything else from the shop.", vi: "Đó là một sự thay thế tuyệt vời, vì vậy đừng lái xe quá nhanh trên những con đường trơn trượt. Hãy gọi cho tôi nếu bạn cần bất cứ thứ gì khác từ cửa hàng." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 12: Bài 23 (orderIndex 22), Bài 24 (orderIndex 23)
  {
    fileName: 'pet-dialogue-cum12.json',
    lessons: [
      {
        orderIndex: 22,
        dialogues: [
          {
            title: "Discussing an upcoming event",
            lines: [
              { speaker: "Alice", "en": "The annual conference is being organized by the marketing department this year. All the invitations have already been sent to the guests.", vi: "Hội nghị thường niên đang được tổ chức bởi bộ phận tiếp thị năm nay. Tất cả các lời mời đã được gửi tới khách mời." },
              { speaker: "Bob", "en": "A famous speaker has been invited to talk about digital trends. The event will be held in the grand hall which is located downtown.", vi: "Một diễn giả nổi tiếng đã được mời để nói về các xu hướng kỹ thuật số. Sự kiện sẽ được tổ chức trong đại sảnh nơi mà tọa lạc ở trung tâm thành phố." },
              { speaker: "Alice", "en": "The catering service was hired yesterday, and the food will be prepared by top chefs. A special menu has been designed for the vegetarian attendees.", vi: "Dịch vụ phục vụ ăn uống đã được thuê ngày hôm qua, và thức ăn sẽ được chuẩn bị bởi những đầu bếp hàng đầu. Một thực đơn đặc biệt đã được thiết kế cho những người tham dự ăn chay." },
              { speaker: "Bob", "en": "That is excellent news because high-quality meals are expected by everyone. The presentation slides must be submitted before Friday.", vi: "Đó là một tin xuất sắc vì những bữa ăn chất lượng cao được mong đợi bởi mọi người. Các slide thuyết trình phải được nộp trước thứ Sáu." },
              { speaker: "Alice", "en": "My slides were finished last night, and they have been approved by my manager. The projectors are being tested by the technical team right now.", vi: "Các slide của tôi đã được hoàn thành tối qua, và chúng đã được phê duyệt bởi người quản lý của tôi. Các máy chiếu hiện đang được kiểm tra bởi đội ngũ kỹ thuật." },
              { speaker: "Bob", "en": "I hope no technical issues will be encountered during the conference. The microphones should be checked thoroughly before the event starts.", vi: "Tôi hy vọng không có vấn đề kỹ thuật nào sẽ bị gặp phải trong suốt hội nghị. Các micrô nên được kiểm tra kỹ lưỡng trước khi sự kiện bắt đầu." },
              { speaker: "Alice", "en": "Everything has been planned carefully, so there is no need to worry. The entire conference will be recorded by professional cameramen.", vi: "Mọi thứ đã được lên kế hoạch cẩn thận, vì vậy không cần phải lo lắng. Toàn bộ hội nghị sẽ được ghi hình bởi những người quay phim chuyên nghiệp." },
              { speaker: "Bob", "en": "The videos will be uploaded to the company website later. I am sure the event will be remembered as a great success.", vi: "Các video sẽ được tải lên trang web của công ty sau đó. Tôi chắc chắn sự kiện này sẽ được nhớ đến như một thành công lớn." }
            ]
          },
          {
            title: "A stolen bicycle",
            lines: [
              { speaker: "Emma", "en": "My new bicycle was stolen while I was shopping at the supermarket yesterday. It had been locked securely to the fence before I went inside.", vi: "Chiếc xe đạp mới của tôi đã bị đánh cắp trong khi tôi đang mua sắm tại siêu thị hôm qua. Nó đã được khóa an toàn vào hàng rào trước khi tôi đi vào trong." },
              { speaker: "Jake", "en": "That is terrible! Has the incident been reported to the local police station yet? The thieves must be caught immediately.", vi: "Thật tồi tệ! Sự việc đã được báo cáo cho đồn cảnh sát địa phương chưa? Những tên trộm phải bị bắt ngay lập tức." },
              { speaker: "Emma", "en": "Yes, a police report was filed immediately, and they told me they would investigate it. The security cameras were checked by the manager this morning.", vi: "Có, một báo cáo cảnh sát đã được lập ngay lập tức, và họ bảo tôi rằng họ sẽ điều tra nó. Các camera an ninh đã được kiểm tra bởi người quản lý sáng nay." },
              { speaker: "Jake", "en": "Hopefully, the thief's face was captured by the cameras. Your bike is quite unique, so it might be recognized by someone.", vi: "Hy vọng rằng khuôn mặt của tên trộm đã bị ghi lại bởi các camera. Chiếc xe của bạn khá độc đáo, vì vậy nó có thể được nhận ra bởi ai đó." },
              { speaker: "Emma", "en": "A picture of the bike has been posted on several local Facebook groups. A small reward is being offered to anyone who finds it.", vi: "Một bức ảnh của chiếc xe đạp đã được đăng tải trên một vài nhóm Facebook địa phương. Một phần thưởng nhỏ đang được đưa ra cho bất cứ ai tìm thấy nó." },
              { speaker: "Jake", "en": "I hope your bicycle will be returned to you safely. A lot of bikes have been stolen in this area recently.", vi: "Tôi hy vọng xe đạp của bạn sẽ được trả lại cho bạn an toàn. Rất nhiều xe đạp đã bị đánh cắp trong khu vực này gần đây." },
              { speaker: "Emma", "en": "More street lights should be installed to prevent these crimes. Citizens are advised by the police to use stronger locks.", vi: "Nhiều đèn đường hơn nên được lắp đặt để ngăn chặn những tội ác này. Công dân được khuyên bởi cảnh sát hãy sử dụng những ổ khóa chắc chắn hơn." },
              { speaker: "Jake", "en": "A community meeting will be held next week to discuss this problem. We must ensure that our neighborhood is protected properly.", vi: "Một cuộc họp cộng đồng sẽ được tổ chức vào tuần tới để thảo luận về vấn đề này. Chúng ta phải đảm bảo rằng khu phố của chúng ta được bảo vệ đúng cách." }
            ]
          }
        ]
      },
      {
        orderIndex: 23,
        dialogues: [
          {
            title: "Rules and advice at school",
            lines: [
              { speaker: "Teacher", "en": "You must submit your final essays before next Monday, or you will lose twenty percent of the marks. You ought to start writing them immediately.", vi: "Các em phải nộp bài luận cuối kỳ của mình trước thứ Hai tuần sau, hoặc các em sẽ mất hai mươi phần trăm số điểm. Các em nên bắt đầu viết chúng ngay lập tức." },
              { speaker: "Student", "en": "I have to do a lot of research because my topic is quite complicated. Do we have to include at least three different sources?", vi: "Em phải làm rất nhiều nghiên cứu vì chủ đề của em khá phức tạp. Chúng em có bắt buộc phải bao gồm ít nhất ba nguồn tài liệu khác nhau không?" },
              { speaker: "Teacher", "en": "Yes, you must cite reliable sources which support your arguments. You don't need to write a very long conclusion, but it must be clear.", vi: "Có, các em phải trích dẫn các nguồn đáng tin cậy những nguồn mà củng cố lập luận của các em. Các em không cần viết một kết luận quá dài, nhưng nó phải rõ ràng." },
              { speaker: "Student", "en": "May I ask you a question about the formatting rules? We shouldn't use colored ink for the text, should we?", vi: "Em có thể hỏi thầy một câu hỏi về các quy tắc định dạng không? Chúng em không nên sử dụng mực màu cho văn bản, đúng không?" },
              { speaker: "Teacher", "en": "You must use black ink only, and you should use a standard font like Arial or Times New Roman. You can't use informal language in academic writing.", vi: "Các em chỉ được phép sử dụng mực đen, và các em nên sử dụng phông chữ tiêu chuẩn như Arial hoặc Times New Roman. Các em không thể sử dụng ngôn ngữ không trang trọng trong văn phong học thuật." },
              { speaker: "Student", "en": "I might finish the first draft tonight, so could I send it to you for some feedback? I want to make sure it is perfect.", vi: "Em có thể hoàn thành bản nháp đầu tiên vào tối nay, vậy em có thể gửi nó cho thầy để nhận vài phản hồi không? Em muốn đảm bảo nó thật hoàn hảo." },
              { speaker: "Teacher", "en": "You can send it to my email, but I might not reply until tomorrow morning. You had better check the spelling carefully before you send it.", vi: "Em có thể gửi nó đến email của thầy, nhưng thầy có thể sẽ không trả lời cho đến sáng mai. Tốt hơn là em nên kiểm tra chính tả cẩn thận trước khi gửi." },
              { speaker: "Student", "en": "I will definitely proofread it twice, which will help eliminate any stupid errors. Thank you so much for your guidance and support.", vi: "Em chắc chắn sẽ đọc rà soát nó hai lần, điều này sẽ giúp loại bỏ bất kỳ lỗi ngớ ngẩn nào. Cảm ơn thầy rất nhiều vì sự hướng dẫn và hỗ trợ." }
            ]
          },
          {
            title: "Deducing what happened",
            lines: [
              { speaker: "Detective", "en": "The window is broken from the outside, so the thief must have entered through here. He couldn't have opened the front door because it was double-locked.", vi: "Cửa sổ bị vỡ từ bên ngoài, vì vậy tên trộm chắc hẳn đã vào qua đường này. Hắn không thể nào mở được cửa trước vì nó đã bị khóa kép." },
              { speaker: "Officer", "en": "There is some mud on the carpet, which means he might have stepped in the garden first. The footprint could belong to a man wearing heavy boots.", vi: "Có một ít bùn trên thảm, điều đó có nghĩa là hắn có thể đã bước vào khu vườn trước. Dấu chân có thể thuộc về một người đàn ông đi đôi ủng nặng." },
              { speaker: "Detective", "en": "He must be quite strong to carry that heavy safe out of the house. He may have had an accomplice who was waiting in a car.", vi: "Hắn chắc hẳn phải khá khỏe mới có thể mang chiếc két sắt nặng đó ra khỏi nhà. Hắn có thể đã có một đồng phạm người đang đợi trong một chiếc ô tô." },
              { speaker: "Officer", "en": "The neighbors didn't hear anything, so the criminals must have been very quiet. They might have used professional tools to break the glass silently.", vi: "Những người hàng xóm không nghe thấy gì cả, vì vậy những tên tội phạm chắc hẳn đã rất im lặng. Họ có thể đã sử dụng các công cụ chuyên nghiệp để làm vỡ kính một cách không tiếng động." },
              { speaker: "Detective", "en": "The family was away on vacation, so they couldn't have witnessed the crime. We should interview the postman who visits this street every morning.", vi: "Gia đình đã đi vắng trong kỳ nghỉ, vì vậy họ không thể nào chứng kiến được tội ác. Chúng ta nên phỏng vấn người đưa thư người đến thăm con phố này mỗi sáng." },
              { speaker: "Officer", "en": "He might have noticed something suspicious when he delivered the letters. I will contact him immediately so that we can ask him some questions.", vi: "Anh ta có thể đã nhận thấy điều gì đó khả nghi khi anh ta giao những bức thư. Tôi sẽ liên lạc với anh ta ngay lập tức để chúng ta có thể hỏi anh ta vài câu hỏi." },
              { speaker: "Detective", "en": "You ought to check the security cameras from the shop at the corner. The getaway car must have driven past that shop to escape.", vi: "Bạn nên kiểm tra các camera an ninh từ cửa hàng ở góc đường. Chiếc xe tẩu thoát chắc hẳn đã lái ngang qua cửa hàng đó để trốn chạy." },
              { speaker: "Officer", "en": "I will do that right now. We have to gather all the evidence before it is too late.", vi: "Tôi sẽ làm điều đó ngay bây giờ. Chúng ta phải thu thập mọi bằng chứng trước khi quá muộn." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 13: Bài 25 (orderIndex 24), Bài 26 (orderIndex 25)
  {
    fileName: 'pet-dialogue-cum13.json',
    lessons: [
      {
        orderIndex: 24,
        dialogues: [
          {
            title: "Discussing moving to a new city",
            lines: [
              { speaker: "Tom", "en": "I got a job offer in London yesterday; therefore, I am thinking about moving there. Although it is a big decision, I feel very excited about the opportunity.", vi: "Hôm qua tôi nhận được một lời mời làm việc ở London; do đó, tôi đang nghĩ về việc chuyển đến đó. Mặc dù đó là một quyết định lớn, tôi cảm thấy rất hào hứng về cơ hội này." },
              { speaker: "Emma", "en": "London is a fantastic city, in spite of the expensive living costs. You will meet many interesting people who work in the same industry.", vi: "London là một thành phố tuyệt vời, mặc dù chi phí sinh hoạt đắt đỏ. Bạn sẽ gặp gỡ nhiều người thú vị những người làm việc trong cùng ngành." },
              { speaker: "Tom", "en": "I have to find an apartment quickly, even though I don't know the neighborhoods well. Furthermore, I need to pack all my belongings before the end of the month.", vi: "Tôi phải tìm một căn hộ nhanh chóng, mặc dù tôi không rành về các khu dân cư. Hơn nữa, tôi cần đóng gói tất cả đồ đạc của mình trước cuối tháng." },
              { speaker: "Emma", "en": "You should hire a moving company so that you don't stress yourself out. In addition, you can ask your new company for some relocation advice.", vi: "Bạn nên thuê một công ty chuyển nhà để bạn không làm bản thân căng thẳng. Ngoài ra, bạn có thể hỏi công ty mới của bạn xin vài lời khuyên về việc tái định cư." },
              { speaker: "Tom", "en": "That is a good idea. However, I am worried about leaving my friends and family behind. It will be lonely until I make new friends.", vi: "Đó là một ý tưởng hay. Tuy nhiên, tôi lo lắng về việc bỏ lại bạn bè và gia đình phía sau. Sẽ rất cô đơn cho đến khi tôi kết bạn mới." },
              { speaker: "Emma", "en": "We can always video call each other, despite the distance between us. Moreover, you can visit us during the holidays when you have free time.", vi: "Chúng ta luôn có thể gọi video cho nhau, bất chấp khoảng cách giữa chúng ta. Hơn nữa, bạn có thể về thăm chúng tôi trong các kỳ nghỉ khi bạn có thời gian rảnh." },
              { speaker: "Tom", "en": "As a result of your encouragement, I feel much more confident now. Therefore, I will accept the offer and start preparing for the big move.", vi: "Nhờ vào sự động viên của bạn, bây giờ tôi cảm thấy tự tin hơn nhiều. Do đó, tôi sẽ chấp nhận lời mời và bắt đầu chuẩn bị cho đợt chuyển nhà lớn." },
              { speaker: "Emma", "en": "I am so proud of you, and I will help you pack your bags this weekend. Let's celebrate your success by having dinner at your favorite restaurant tonight.", vi: "Tôi rất tự hào về bạn, và tôi sẽ giúp bạn đóng gói hành lý vào cuối tuần này. Hãy ăn mừng thành công của bạn bằng cách ăn tối tại nhà hàng yêu thích của bạn tối nay." }
            ]
          },
          {
            title: "Evaluating a presentation",
            lines: [
              { speaker: "Manager", "en": "Your presentation was very informative; however, it was a bit too long for the audience. Furthermore, some of the charts were difficult to read.", vi: "Bài thuyết trình của bạn rất nhiều thông tin; tuy nhiên, nó hơi quá dài so với khán giả. Hơn nữa, một số biểu đồ khá khó đọc." },
              { speaker: "Employee", "en": "I apologize for that, although I tried my best to summarize the main points. In addition, I will use larger fonts for the graphics next time.", vi: "Tôi xin lỗi về điều đó, mặc dù tôi đã cố gắng hết sức để tóm tắt những điểm chính. Ngoài ra, tôi sẽ sử dụng phông chữ lớn hơn cho các đồ họa vào lần tới." },
              { speaker: "Manager", "en": "In spite of those minor issues, your confidence on stage was impressive. Therefore, the clients were genuinely interested in our new software product.", vi: "Mặc dù có những vấn đề nhỏ đó, sự tự tin của bạn trên sân khấu rất ấn tượng. Do đó, các khách hàng đã thực sự quan tâm đến sản phẩm phần mềm mới của chúng ta." },
              { speaker: "Employee", "en": "I practiced speaking in front of a mirror, so that I wouldn't stutter during the speech. Moreover, I anticipated their questions and prepared the answers carefully.", vi: "Tôi đã luyện tập nói trước gương, để tôi không bị nói lắp trong suốt bài phát biểu. Hơn thế nữa, tôi đã đoán trước các câu hỏi của họ và chuẩn bị các câu trả lời cẩn thận." },
              { speaker: "Manager", "en": "Your preparation definitely paid off. As a result, we have secured a very profitable contract which will boost our revenue significantly.", vi: "Sự chuẩn bị của bạn chắc chắn đã được đền đáp. Kết quả là, chúng ta đã đảm bảo được một hợp đồng rất béo bở cái mà sẽ thúc đẩy doanh thu của chúng ta đáng kể." },
              { speaker: "Employee", "en": "That is wonderful news, even though the negotiation process was quite challenging. We achieved our goal despite the tough competition from other companies.", vi: "Đó là một tin tuyệt vời, mặc dù quá trình đàm phán khá là thử thách. Chúng ta đã đạt được mục tiêu bất chấp sự cạnh tranh gay gắt từ các công ty khác." },
              { speaker: "Manager", "en": "I want you to lead the implementation phase; therefore, you will need to organize a team meeting soon. Furthermore, you will report directly to me every week.", vi: "Tôi muốn bạn dẫn dắt giai đoạn triển khai; do đó, bạn sẽ cần tổ chức một cuộc họp nhóm sớm. Hơn nữa, bạn sẽ báo cáo trực tiếp cho tôi mỗi tuần." },
              { speaker: "Employee", "en": "I am ready for the responsibility, and I will draft an action plan today. Thank you for giving me this fantastic opportunity to prove myself.", vi: "Tôi đã sẵn sàng cho trách nhiệm này, và tôi sẽ phác thảo một kế hoạch hành động hôm nay. Cảm ơn ông đã cho tôi cơ hội tuyệt vời này để chứng tỏ bản thân." }
            ]
          }
        ]
      },
      {
        orderIndex: 25,
        dialogues: [
          {
            title: "Solving computer issues",
            lines: [
              { speaker: "David", "en": "My computer suddenly broke down this morning, and I lost all my files. I need to figure out what went wrong before my boss finds out.", vi: "Máy tính của tôi đột nhiên hỏng sáng nay, và tôi đã mất tất cả các tệp của mình. Tôi cần tìm ra chuyện gì đã xảy ra trước khi sếp tôi phát hiện ra." },
              { speaker: "Chloe", "en": "Did you try to turn it off and turn it on again? Sometimes a simple restart can sort out technical glitches.", vi: "Bạn đã thử tắt nó đi và bật lại chưa? Đôi khi một thao tác khởi động lại đơn giản có thể giải quyết các trục trặc kỹ thuật." },
              { speaker: "David", "en": "I tried that, but it didn't work. I am looking for a reliable technician who can back up my important data.", vi: "Tôi đã thử rồi, nhưng không hiệu quả. Tôi đang tìm kiếm một kỹ thuật viên đáng tin cậy người có thể sao lưu dữ liệu quan trọng của tôi." },
              { speaker: "Chloe", "en": "You shouldn't put off fixing it because the hard drive might be permanently damaged. I will look up the number of a good repair shop.", vi: "Bạn không nên trì hoãn việc sửa chữa nó vì ổ cứng có thể bị hư hỏng vĩnh viễn. Tôi sẽ tra cứu số điện thoại của một cửa hàng sửa chữa tốt." },
              { speaker: "David", "en": "Thank you, I really appreciate it. I was trying to carry out an update when the screen went completely black.", vi: "Cảm ơn bạn, tôi thực sự trân trọng điều đó. Tôi đang cố gắng thực hiện một bản cập nhật thì màn hình trở nên đen kịt." },
              { speaker: "Chloe", "en": "I found the number, so you can write it down now. You should set off immediately so that they can examine the machine today.", vi: "Tôi đã tìm thấy số rồi, vậy bạn có thể ghi chú nó xuống bây giờ. Bạn nên khởi hành ngay lập tức để họ có thể kiểm tra máy móc trong hôm nay." },
              { speaker: "David", "en": "I will take off right away, and I hope they won't rip me off. Repairing computers can sometimes cost a fortune.", vi: "Tôi sẽ rời đi ngay bây giờ, và tôi hy vọng họ sẽ không chặt chém tôi. Việc sửa chữa máy tính đôi khi có thể tốn cả một gia tài." },
              { speaker: "Chloe", "en": "Don't worry, this shop has great reviews, and they will sort it out quickly. Give me a call when you find out the problem.", vi: "Đừng lo, cửa hàng này có những đánh giá rất tốt, và họ sẽ giải quyết nó nhanh chóng. Hãy gọi cho tôi khi bạn tìm ra vấn đề." }
            ]
          },
          {
            title: "Cleaning up the house",
            lines: [
              { speaker: "Mom", "en": "Your bedroom is a complete mess, and you need to tidy it up immediately. Please pick up those dirty clothes which are lying on the floor.", vi: "Phòng ngủ của con là một mớ hỗn độn hoàn toàn, và con cần dọn dẹp nó ngay lập tức. Làm ơn nhặt những bộ quần áo bẩn đang nằm trên sàn nhà lên." },
              { speaker: "Son", "en": "I will clean it up right now, Mom. I was just looking for my favorite jacket, but I couldn't find it anywhere.", vi: "Con sẽ dọn dẹp nó ngay bây giờ, mẹ. Con chỉ đang tìm kiếm chiếc áo khoác yêu thích của mình, nhưng con không thể tìm thấy nó ở đâu cả." },
              { speaker: "Mom", "en": "You should throw away the old magazines which you no longer read. They just take up too much valuable space on your desk.", vi: "Con nên vứt bỏ những cuốn tạp chí cũ những thứ con không còn đọc nữa. Chúng chỉ chiếm quá nhiều không gian quý giá trên bàn của con." },
              { speaker: "Son", "en": "I will put them in the recycling bin later. Can I keep the comic books which I bought last summer?", vi: "Lát nữa con sẽ bỏ chúng vào thùng tái chế. Con có thể giữ lại những cuốn truyện tranh những cuốn con đã mua vào mùa hè năm ngoái không?" },
              { speaker: "Mom", "en": "Yes, but you must put them away neatly on the bookshelf. You also need to take out the garbage before the truck comes.", vi: "Được, nhưng con phải cất chúng đi gọn gàng trên giá sách. Con cũng cần mang rác ra ngoài trước khi xe tải đến." },
              { speaker: "Son", "en": "I will do that as soon as I finish organizing my shoes. I am trying to figure out how to arrange them properly.", vi: "Con sẽ làm việc đó ngay khi con hoàn thành việc sắp xếp giày của mình. Con đang cố gắng tìm ra cách sắp xếp chúng một cách hợp lý." },
              { speaker: "Mom", "en": "Don't put off your chores until the evening, because we are going out for dinner. We need to set off by six o'clock sharp.", vi: "Đừng trì hoãn công việc nhà của con cho đến tối, bởi vì chúng ta sẽ ra ngoài ăn tối. Chúng ta cần khởi hành đúng lúc sáu giờ." },
              { speaker: "Son", "en": "I promise I will wrap everything up in thirty minutes. Then I will go take a shower so that I am ready to go.", vi: "Con hứa con sẽ hoàn tất mọi thứ trong ba mươi phút. Sau đó con sẽ đi tắm để sẵn sàng đi." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 14: Bài 27 (orderIndex 26), Bài 28 (orderIndex 27)
  {
    fileName: 'pet-dialogue-cum14.json',
    lessons: [
      {
        orderIndex: 26,
        dialogues: [
          {
            title: "Learning new skills",
            lines: [
              { speaker: "Lucas", "en": "I am interested in learning how to play the guitar, but I don't know where to begin. Do you recommend taking online classes or hiring a private tutor?", vi: "Tôi quan tâm đến việc học cách chơi guitar, nhưng tôi không biết bắt đầu từ đâu. Bạn khuyên nên học các lớp trực tuyến hay thuê một gia sư riêng?" },
              { speaker: "Hannah", "en": "I suggest watching YouTube tutorials first to see if you really enjoy practicing. Buying a cheap instrument is a good way to start without spending too much.", vi: "Tôi đề nghị xem các video hướng dẫn trên YouTube trước để xem liệu bạn có thực sự thích việc luyện tập hay không. Mua một nhạc cụ rẻ tiền là một cách tốt để bắt đầu mà không tốn quá nhiều tiền." },
              { speaker: "Lucas", "en": "That makes sense because I usually give up playing after a few weeks. It is quite difficult to memorize all the different chords.", vi: "Điều đó có lý vì tôi thường từ bỏ việc chơi nhạc sau vài tuần. Thật khá khó để ghi nhớ tất cả các hợp âm khác nhau." },
              { speaker: "Hannah", "en": "You should avoid practicing for long hours at the beginning. It is better to play for twenty minutes every day to build a strong habit.", vi: "Bạn nên tránh luyện tập trong nhiều giờ liền lúc ban đầu. Tốt hơn là chơi hai mươi phút mỗi ngày để xây dựng một thói quen vững chắc." },
              { speaker: "Lucas", "en": "I am looking forward to playing my favorite songs, which are mostly acoustic rock. I remember listening to them when I was a teenager.", vi: "Tôi đang mong đợi được chơi những bài hát yêu thích của mình, những bài chủ yếu là acoustic rock. Tôi nhớ đã nghe chúng khi tôi còn là một thiếu niên." },
              { speaker: "Hannah", "en": "Don't forget to tune your guitar before you start playing any notes. Tuning the strings properly is essential for producing a beautiful sound.", vi: "Đừng quên chỉnh âm guitar của bạn trước khi bạn bắt đầu chơi bất kỳ nốt nhạc nào. Việc chỉnh dây đúng cách là thiết yếu để tạo ra một âm thanh đẹp." },
              { speaker: "Lucas", "en": "I hope to perform in front of my friends when we have a party next month. I need to practice hard to avoid embarrassing myself.", vi: "Tôi hy vọng sẽ biểu diễn trước mặt bạn bè khi chúng tôi có một bữa tiệc vào tháng tới. Tôi cần luyện tập chăm chỉ để tránh làm bản thân xấu hổ." },
              { speaker: "Hannah", "en": "I am sure they will enjoy listening to your music regardless of your skill level. Just focus on having fun and expressing your emotions.", vi: "Tôi chắc chắn họ sẽ thích nghe âm nhạc của bạn bất kể cấp độ kỹ năng của bạn. Chỉ cần tập trung vào việc tận hưởng và thể hiện cảm xúc của bạn." }
            ]
          },
          {
            title: "Discussing extreme sports",
            lines: [
              { speaker: "Alex", "en": "I am thinking about trying skydiving next summer because I love experiencing intense thrills. Jumping out of an airplane sounds like an incredible adventure.", vi: "Tôi đang suy nghĩ về việc thử nhảy dù vào mùa hè tới vì tôi thích trải nghiệm những cảm giác mạnh dữ dội. Nhảy ra khỏi một chiếc máy bay nghe có vẻ như một cuộc phiêu lưu đáng kinh ngạc." },
              { speaker: "Mia", "en": "I can't imagine doing something so dangerous! I am terrified of heights, so I avoid climbing tall buildings or looking down from bridges.", vi: "Tôi không thể tưởng tượng được việc làm điều gì đó nguy hiểm như vậy! Tôi sợ độ cao, vì vậy tôi tránh việc leo lên các tòa nhà cao tầng hay nhìn xuống từ những cây cầu." },
              { speaker: "Alex", "en": "You don't need to worry because they provide professional training before you jump. Being strapped to an experienced instructor makes it completely safe.", vi: "Bạn không cần phải lo lắng vì họ cung cấp đào tạo chuyên nghiệp trước khi bạn nhảy. Việc được buộc chặt vào một người hướng dẫn giàu kinh nghiệm khiến nó hoàn toàn an toàn." },
              { speaker: "Mia", "en": "Even so, I prefer staying on the ground where I feel much more secure. Have you ever considered trying scuba diving instead?", vi: "Mặc dù vậy, tôi thích ở trên mặt đất hơn nơi tôi cảm thấy an tâm hơn nhiều. Bạn đã bao giờ cân nhắc việc thử lặn biển có bình dưỡng khí thay thế chưa?" },
              { speaker: "Alex", "en": "I enjoy swimming in the ocean, but exploring deep underwater caves seems a bit claustrophobic. I want to feel the wind hitting my face at high speed.", vi: "Tôi thích bơi trong đại dương, nhưng việc khám phá những hang động sâu dưới nước có vẻ hơi gây hội chứng sợ không gian hẹp. Tôi muốn cảm nhận gió đập vào mặt mình ở tốc độ cao." },
              { speaker: "Mia", "en": "Well, you must remember to follow all the safety instructions carefully. Taking unnecessary risks is foolish when you are doing extreme sports.", vi: "Chà, bạn phải nhớ tuân theo tất cả các hướng dẫn an toàn một cách cẩn thận. Chấp nhận những rủi ro không cần thiết là ngu ngốc khi bạn đang chơi thể thao mạo hiểm." },
              { speaker: "Alex", "en": "I promise to pay close attention to everything which the instructor says. I am looking forward to recording a video of my first jump.", vi: "Tôi hứa sẽ đặc biệt chú ý đến mọi điều mà người hướng dẫn nói. Tôi đang mong đợi việc quay một video về cú nhảy đầu tiên của mình." },
              { speaker: "Mia", "en": "I will be happy to watch the video from the comfort of my living room. I hope you have a wonderful and safe experience.", vi: "Tôi sẽ rất vui khi xem video đó từ sự thoải mái trong phòng khách của mình. Tôi hy vọng bạn có một trải nghiệm tuyệt vời và an toàn." }
            ]
          }
        ]
      },
      {
        orderIndex: 27,
        dialogues: [
          {
            title: "Applying for a visa",
            lines: [
              { speaker: "Applicant", "en": "I am submitting my visa application today so that I can study in Canada next semester. I have brought all the documents which were listed on your website.", vi: "Hôm nay tôi đang nộp đơn xin thị thực của mình để tôi có thể học ở Canada vào học kỳ tới. Tôi đã mang theo tất cả các tài liệu những thứ được liệt kê trên trang web của bạn." },
              { speaker: "Officer", "en": "Please hand me your passport and the admission letter which you received from the university. I need to verify your identity before we proceed.", vi: "Vui lòng đưa tôi hộ chiếu của bạn và thư nhập học cái mà bạn đã nhận được từ trường đại học. Tôi cần xác minh danh tính của bạn trước khi chúng ta tiếp tục." },
              { speaker: "Applicant", "en": "Here they are. I also included my bank statements, which prove that I have enough money to cover my living expenses.", vi: "Chúng đây ạ. Tôi cũng đã bao gồm các bản sao kê ngân hàng của mình, những thứ chứng minh rằng tôi có đủ tiền để trang trải chi phí sinh hoạt." },
              { speaker: "Officer", "en": "Thank you. The financial proof is crucial because international students are not allowed to work full-time while they are studying.", vi: "Cảm ơn. Bằng chứng tài chính là cực kỳ quan trọng bởi vì sinh viên quốc tế không được phép làm việc toàn thời gian trong khi họ đang học." },
              { speaker: "Applicant", "en": "I understand that rule, and my parents, who are sponsoring my education, have deposited the required funds. How long does it usually take to process the application?", vi: "Tôi hiểu quy định đó, và bố mẹ tôi, những người đang tài trợ cho việc học của tôi, đã gửi khoản tiền được yêu cầu. Thường mất bao lâu để xử lý hồ sơ?" },
              { speaker: "Officer", "en": "It usually takes about four weeks, provided that no additional information is required. You will receive an email as soon as a decision has been made.", vi: "Thường mất khoảng bốn tuần, với điều kiện là không có thông tin bổ sung nào được yêu cầu. Bạn sẽ nhận được một email ngay khi một quyết định đã được đưa ra." },
              { speaker: "Applicant", "en": "I hope everything is in order, as I have booked my flight for the first week of September. I want to arrive early so as to find an apartment.", vi: "Tôi hy vọng mọi thứ đều ổn thỏa, vì tôi đã đặt chuyến bay cho tuần đầu tiên của tháng Chín. Tôi muốn đến sớm để tìm một căn hộ." },
              { speaker: "Officer", "en": "Your documents seem complete, so there shouldn't be any major problems. We wish you the best of luck with your studies in Canada.", vi: "Các tài liệu của bạn có vẻ đầy đủ, vì vậy không nên có bất kỳ vấn đề lớn nào. Chúng tôi chúc bạn may mắn nhất với việc học tập của bạn tại Canada." }
            ]
          },
          {
            title: "Organizing a charity marathon",
            lines: [
              { speaker: "Julia", "en": "We need to plan the charity marathon carefully so that we can raise as much money as possible. The funds, which will be collected, are going to the local children's hospital.", vi: "Chúng ta cần lên kế hoạch cho cuộc thi marathon từ thiện một cách cẩn thận để chúng ta có thể quyên góp được nhiều tiền nhất có thể. Các quỹ, những thứ sẽ được thu thập, sẽ được chuyển đến bệnh viện nhi đồng địa phương." },
              { speaker: "Ben", "en": "I agree completely. We should create a website where people can register online easily. The simpler the process is, the more participants we will get.", vi: "Tôi hoàn toàn đồng ý. Chúng ta nên tạo một trang web nơi mọi người có thể đăng ký trực tuyến một cách dễ dàng. Quy trình càng đơn giản thì chúng ta sẽ càng có nhiều người tham gia." },
              { speaker: "Julia", "en": "I will contact the city council tomorrow in order to get permission to use the main roads. It is essential that we ensure the safety of all the runners.", vi: "Ngày mai tôi sẽ liên hệ với hội đồng thành phố để xin phép sử dụng các con đường chính. Việc chúng ta đảm bảo an toàn cho tất cả những người chạy bộ là điều thiết yếu." },
              { speaker: "Ben", "en": "We also need to ask local businesses whether they would like to sponsor the event. Companies which sponsor charity events often receive good publicity.", vi: "Chúng ta cũng cần hỏi các doanh nghiệp địa phương xem họ có muốn tài trợ cho sự kiện không. Các công ty những nơi tài trợ cho các sự kiện từ thiện thường nhận được sự quảng bá tốt." },
              { speaker: "Julia", "en": "I have already drafted a letter which explains our mission clearly. I will send it to fifty companies as soon as you review the content.", vi: "Tôi đã phác thảo một bức thư cái mà giải thích rõ ràng sứ mệnh của chúng ta. Tôi sẽ gửi nó cho năm mươi công ty ngay khi bạn xem xét nội dung." },
              { speaker: "Ben", "en": "The letter looks great, but you should add some photos of the hospital so that it touches people's hearts. Visual elements make the message much more powerful.", vi: "Bức thư trông rất tuyệt, nhưng bạn nên thêm một vài bức ảnh của bệnh viện để nó chạm đến trái tim mọi người. Các yếu tố hình ảnh làm cho thông điệp mạnh mẽ hơn nhiều." },
              { speaker: "Julia", "en": "That is a brilliant suggestion, and I will insert a few pictures before I print the letters. We must work hard if we want this marathon to be successful.", vi: "Đó là một gợi ý xuất sắc, và tôi sẽ chèn một vài bức ảnh trước khi in các bức thư. Chúng ta phải làm việc chăm chỉ nếu chúng ta muốn cuộc thi marathon này thành công." },
              { speaker: "Ben", "en": "With such careful preparation, I am confident that we will exceed our fundraising goal. Let's schedule a meeting with the volunteers next Friday.", vi: "Với sự chuẩn bị cẩn thận như vậy, tôi tự tin rằng chúng ta sẽ vượt qua mục tiêu gây quỹ. Hãy lên lịch một cuộc họp với các tình nguyện viên vào thứ Sáu tới." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 15: Bài 29 (orderIndex 28), Bài 30 (orderIndex 29)
  {
    fileName: 'pet-dialogue-cum15.json',
    lessons: [
      {
        orderIndex: 28,
        dialogues: [
          {
            title: "Discussing an informational article",
            lines: [
              { speaker: "Ethan", "en": "Did you read the article about the newly discovered pyramids which was published in the science magazine today? The archaeologists used advanced satellite imaging to find them.", vi: "Bạn có đọc bài báo về những kim tự tháp mới được phát hiện cái mà được xuất bản trên tạp chí khoa học hôm nay không? Các nhà khảo cổ đã sử dụng hình ảnh vệ tinh tiên tiến để tìm ra chúng." },
              { speaker: "Sophia", "en": "Yes, I found the details about their construction methods particularly fascinating. The ancient engineers must have possessed incredible mathematical knowledge to build such structures.", vi: "Có, tôi thấy những chi tiết về các phương pháp xây dựng của họ đặc biệt hấp dẫn. Các kỹ sư cổ đại chắc hẳn đã sở hữu kiến thức toán học đáng kinh ngạc để xây dựng những cấu trúc như vậy." },
              { speaker: "Ethan", "en": "The text mainly focuses on the daily lives of the workers who lived near the site. It is surprising that they were paid with food rather than money.", vi: "Văn bản chủ yếu tập trung vào cuộc sống hàng ngày của những công nhân những người sống gần địa điểm. Thật đáng ngạc nhiên khi họ được trả công bằng thức ăn thay vì tiền." },
              { speaker: "Sophia", "en": "According to the passage, the climate in that region used to be much wetter thousands of years ago. The author provided a lot of evidence to support this theory.", vi: "Theo đoạn văn, khí hậu ở khu vực đó từng ẩm ướt hơn nhiều hàng ngàn năm trước. Tác giả đã cung cấp rất nhiều bằng chứng để củng cố lý thuyết này." },
              { speaker: "Ethan", "en": "I highlighted several paragraphs which explained the political system of the ancient civilization. Understanding their society helps us appreciate their architectural achievements.", vi: "Tôi đã đánh dấu vài đoạn văn những đoạn giải thích hệ thống chính trị của nền văn minh cổ đại. Việc hiểu xã hội của họ giúp chúng ta trân trọng những thành tựu kiến trúc của họ." },
              { speaker: "Sophia", "en": "I struggled a bit with the vocabulary, especially the technical terms related to geology. I had to look up several words in the dictionary while I was reading.", vi: "Tôi đã hơi chật vật với từ vựng, đặc biệt là các thuật ngữ chuyên ngành liên quan đến địa chất học. Tôi đã phải tra cứu một vài từ trong từ điển trong khi tôi đang đọc." },
              { speaker: "Ethan", "en": "That is completely normal when reading academic texts. The main purpose of the article is to inform the public about the latest historical discoveries.", vi: "Điều đó hoàn toàn bình thường khi đọc các văn bản học thuật. Mục đích chính của bài báo là thông báo cho công chúng về những khám phá lịch sử mới nhất." },
              { speaker: "Sophia", "en": "I am going to summarize the key points so that I can use them in my history presentation tomorrow. It is a fantastic source of reliable information.", vi: "Tôi dự định sẽ tóm tắt những điểm chính để tôi có thể sử dụng chúng trong bài thuyết trình lịch sử của mình vào ngày mai. Nó là một nguồn thông tin đáng tin cậy tuyệt vời." }
            ]
          },
          {
            title: "Analyzing a travel brochure",
            lines: [
              { speaker: "David", "en": "Look at this travel brochure which advertises a luxurious cruise around the Mediterranean. The stunning photographs of the Greek islands make me want to book a ticket immediately.", vi: "Hãy nhìn cuốn sách nhỏ du lịch này cuốn mà quảng cáo một chuyến du thuyền sang trọng quanh biển Địa Trung Hải. Những bức ảnh tuyệt đẹp về các hòn đảo Hy Lạp khiến tôi muốn đặt vé ngay lập tức." },
              { speaker: "Emma", "en": "I read the section which details the activities available on the ship. They offer everything from cooking classes to evening theater performances.", vi: "Tôi đã đọc phần cái mà trình bày chi tiết các hoạt động có sẵn trên tàu. Họ cung cấp mọi thứ từ các lớp học nấu ăn đến các buổi biểu diễn nhà hát buổi tối." },
              { speaker: "David", "en": "The brochure highlights that all meals and guided tours are included in the final price. However, we should read the small print to check for hidden fees.", vi: "Cuốn sách nhỏ làm nổi bật rằng tất cả các bữa ăn và các chuyến tham quan có hướng dẫn đều được bao gồm trong giá cuối cùng. Tuy nhiên, chúng ta nên đọc những dòng chữ nhỏ để kiểm tra các khoản phí ẩn." },
              { speaker: "Emma", "en": "You are right, because companies often use persuasive language to attract potential customers. The text aims to create a sense of exclusivity and relaxation.", vi: "Bạn đúng, bởi vì các công ty thường sử dụng ngôn ngữ mang tính thuyết phục để thu hút khách hàng tiềm năng. Văn bản nhằm mục đích tạo ra một cảm giác độc quyền và thư giãn." },
              { speaker: "David", "en": "The heading says 'Experience the Journey of a Lifetime', which is a classic advertising technique. It appeals directly to our desire for adventure.", vi: "Tiêu đề nói rằng 'Trải nghiệm Hành trình của Đời người', đó là một kỹ thuật quảng cáo kinh điển. Nó đánh trực tiếp vào khao khát phiêu lưu của chúng ta." },
              { speaker: "Emma", "en": "I noticed that the paragraphs describing the destinations are very descriptive and vivid. They use lots of adjectives like 'breathtaking' and 'crystal-clear'.", vi: "Tôi nhận thấy rằng các đoạn văn mô tả các điểm đến rất mang tính miêu tả và sinh động. Họ sử dụng nhiều tính từ như 'ngoạn mục' và 'trong vắt'." },
              { speaker: "David", "en": "Despite the attractive marketing, we need to gather practical information like departure dates. Let's find the page which contains the contact details and booking instructions.", vi: "Bất chấp cách tiếp thị hấp dẫn, chúng ta cần thu thập các thông tin thực tế như ngày khởi hành. Hãy tìm trang cái mà chứa thông tin liên hệ và hướng dẫn đặt chỗ." },
              { speaker: "Emma", "en": "The contact information is located at the back cover, along with some customer reviews. We can call them tomorrow morning to ask a few questions.", vi: "Thông tin liên hệ được đặt ở bìa sau, cùng với một vài đánh giá của khách hàng. Chúng ta có thể gọi cho họ vào sáng mai để hỏi vài câu hỏi." }
            ]
          }
        ]
      },
      {
        orderIndex: 29,
        dialogues: [
          {
            title: "Discussing a short story",
            lines: [
              { speaker: "Oliver", "en": "The short story which we read for homework had a very mysterious atmosphere. The author set the scene perfectly by describing the foggy, abandoned village.", vi: "Truyện ngắn mà chúng ta đã đọc cho bài tập về nhà có một bầu không khí rất bí ẩn. Tác giả đã dàn cảnh một cách hoàn hảo bằng việc miêu tả ngôi làng sương mù, bị bỏ hoang." },
              { speaker: "Ava", "en": "I was totally captivated by the opening paragraph, which immediately created a sense of suspense. I kept wondering what the protagonist would discover inside the old mansion.", vi: "Tôi đã hoàn toàn bị thu hút bởi đoạn mở đầu, đoạn mà ngay lập tức tạo ra một cảm giác hồi hộp. Tôi cứ tự hỏi nhân vật chính sẽ khám phá ra điều gì bên trong dinh thự cũ." },
              { speaker: "Oliver", "en": "The writer's attitude towards the main character seemed quite sympathetic throughout the narrative. She portrayed him as a lonely man who was seeking the truth.", vi: "Thái độ của nhà văn đối với nhân vật chính có vẻ khá đồng cảm xuyên suốt câu chuyện. Bà ấy đã phác họa anh ta như một người đàn ông cô đơn người đang tìm kiếm sự thật." },
              { speaker: "Ava", "en": "I loved the way the plot developed slowly, revealing clues one by one. The dialogue between the man and the stranger was extremely tense.", vi: "Tôi thích cách cốt truyện phát triển chậm rãi, hé lộ các manh mối từng cái một. Cuộc đối thoại giữa người đàn ông và người lạ mặt cực kỳ căng thẳng." },
              { speaker: "Oliver", "en": "The climax of the story, when the secret door suddenly opens, gave me goosebumps. It was a brilliant piece of narrative writing which kept me guessing.", vi: "Cao trào của câu chuyện, khi cánh cửa bí mật đột nhiên mở ra, đã làm tôi nổi da gà. Đó là một tác phẩm viết tường thuật xuất sắc thứ đã khiến tôi phải suy đoán liên tục." },
              { speaker: "Ava", "en": "However, I felt that the ending was a bit ambiguous and left too many unanswered questions. Do you think the protagonist actually found the hidden treasure?", vi: "Tuy nhiên, tôi cảm thấy rằng cái kết hơi mơ hồ và để lại quá nhiều câu hỏi chưa có lời giải. Bạn có nghĩ nhân vật chính thực sự đã tìm thấy kho báu ẩn giấu không?" },
              { speaker: "Oliver", "en": "I think the author intended to let the readers draw their own conclusions. An open ending makes the story much more memorable and thought-provoking.", vi: "Tôi nghĩ tác giả đã có ý định để độc giả tự rút ra kết luận của riêng họ. Một cái kết mở làm cho câu chuyện trở nên đáng nhớ và gợi suy nghĩ hơn nhiều." },
              { speaker: "Ava", "en": "That makes sense, and I will mention that point in my literature essay. Analyzing character motivation is the most interesting part of reading fiction.", vi: "Điều đó có lý, và tôi sẽ đề cập đến điểm đó trong bài luận văn học của mình. Việc phân tích động cơ của nhân vật là phần thú vị nhất của việc đọc tiểu thuyết hư cấu." }
            ]
          },
          {
            title: "Sharing a personal anecdote",
            lines: [
              { speaker: "Noah", "en": "Let me tell you about a terrifying experience which happened to me last winter. I was skiing in the mountains when a sudden snowstorm hit the area.", vi: "Để tôi kể cho bạn nghe về một trải nghiệm kinh hoàng cái mà đã xảy ra với tôi vào mùa đông năm ngoái. Tôi đang trượt tuyết trên núi thì một trận bão tuyết bất ngờ đổ bộ vào khu vực." },
              { speaker: "Isabella", "en": "That sounds incredibly dangerous! Were you skiing alone, or were you with a group of friends when the storm started?", vi: "Nghe có vẻ cực kỳ nguy hiểm! Bạn đang trượt tuyết một mình, hay bạn đang ở cùng một nhóm bạn khi cơn bão bắt đầu?" },
              { speaker: "Noah", "en": "I was with two friends, but we got separated because the visibility was almost zero. I couldn't see anything which was further than two meters away.", vi: "Tôi đang ở cùng hai người bạn, nhưng chúng tôi đã bị lạc nhau vì tầm nhìn gần như bằng không. Tôi đã không thể nhìn thấy bất cứ thứ gì thứ mà cách xa hơn hai mét." },
              { speaker: "Isabella", "en": "I can only imagine how frightened you must have felt in that situation. What did you do to survive the freezing cold?", vi: "Tôi chỉ có thể tưởng tượng bạn chắc hẳn đã cảm thấy sợ hãi như thế nào trong tình huống đó. Bạn đã làm gì để sống sót qua cái lạnh thấu xương?" },
              { speaker: "Noah", "en": "I managed to find a small wooden cabin which was luckily unlocked. I stayed inside and wrapped myself in some old blankets which I found.", vi: "Tôi đã xoay xở tìm thấy một căn chòi gỗ nhỏ cái mà may mắn thay không bị khóa. Tôi đã ở bên trong và quấn mình trong một vài chiếc chăn cũ mà tôi tìm thấy." },
              { speaker: "Isabella", "en": "You were extremely fortunate to discover that shelter! How long did you have to wait before the rescue team arrived?", vi: "Bạn đã cực kỳ may mắn khi phát hiện ra nơi trú ẩn đó! Bạn đã phải đợi bao lâu trước khi đội cứu hộ đến?" },
              { speaker: "Noah", "en": "I waited there for about six hours, listening to the howling wind outside. Eventually, I heard the sound of a snowmobile which was searching for me.", vi: "Tôi đã đợi ở đó khoảng sáu giờ đồng hồ, lắng nghe tiếng gió rít bên ngoài. Cuối cùng, tôi nghe thấy âm thanh của một chiếc xe trượt tuyết cái mà đang tìm kiếm tôi." },
              { speaker: "Isabella", "en": "What a relief! It is a gripping story which sounds like a scene from an action movie. I am just glad that you are safe now.", vi: "Thật nhẹ nhõm! Đó là một câu chuyện lôi cuốn nghe giống như một cảnh từ một bộ phim hành động. Tôi chỉ thấy vui vì bây giờ bạn đã an toàn." }
            ]
          }
        ]
      }
    ]
  }
];

async function seedBatches() {
  const program = await prisma.program.findUnique({ where: { code: 'en-pet' } });
  if (!program) return;

  for (const chunk of data) {
    const filePath = path.join(__dirname, '../../data', chunk.fileName);
    fs.writeFileSync(filePath, JSON.stringify({ lessons: chunk.lessons }, null, 2));

    for (const lessonData of chunk.lessons) {
      const lesson = await prisma.lesson.findFirst({
        where: { programId: program.id, orderIndex: lessonData.orderIndex }
      });
      if (!lesson) continue;

      await prisma.lessonContent.deleteMany({
        where: { lessonId: lesson.id, contentType: 'DIALOGUE' }
      });

      for (const dlg of lessonData.dialogues) {
        await prisma.lessonContent.create({
          data: {
            lessonId: lesson.id,
            contentType: 'DIALOGUE',
            content: JSON.stringify(dlg)
          }
        });
      }
      console.log(`Đã seed hội thoại vào orderIndex ${lessonData.orderIndex}`);
    }
  }
  console.log("Hoàn thành cụm 11, 12, 13, 14, 15!");
}

seedBatches()
  .finally(() => prisma.$disconnect());

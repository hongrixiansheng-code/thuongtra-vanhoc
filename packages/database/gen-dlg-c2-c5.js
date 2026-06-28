const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = [
  // Cụm 2: Bài 3 (orderIndex 2), Bài 4 (orderIndex 3)
  {
    fileName: 'pet-dialogue-cum2.json',
    lessons: [
      {
        orderIndex: 2,
        dialogues: [
          {
            title: "Discussing a new movie",
            lines: [
              { speaker: "John", en: "Did you watch that new action movie which was released last night? The ending was so surprising that I couldn't believe it.", vi: "Bạn đã xem bộ phim hành động mới được phát hành đêm qua chưa? Cái kết quá bất ngờ đến nỗi tôi không thể tin được." },
              { speaker: "Mary", "en": "I watched it yesterday, but I actually found the storyline quite boring. I was so bored that I almost fell asleep during the film.", "vi": "Tôi đã xem nó hôm qua, nhưng thực sự tôi thấy cốt truyện khá tẻ nhạt. Tôi đã quá chán đến nỗi gần như ngủ gật trong lúc xem." },
              { speaker: "John", "en": "You didn't enjoy the special effects, did you? I thought they were exciting and made the action scenes look very realistic.", "vi": "Bạn không thích các hiệu ứng đặc biệt à? Tôi nghĩ chúng rất thú vị và làm cho các cảnh hành động trông rất chân thực." },
              { speaker: "Mary", "en": "They were okay, but the movie was so loud that my ears started hurting. I prefer films which have a good plot and character development.", "vi": "Chúng cũng được, nhưng bộ phim ồn ào đến nỗi tai tôi bắt đầu đau. Tôi thích những bộ phim có cốt truyện và sự phát triển nhân vật tốt." },
              { speaker: "John", "en": "The main actor's performance was disappointing, wasn't it? He seemed to struggle with the emotional scenes which were crucial to the story.", "vi": "Màn trình diễn của nam diễn viên chính thật đáng thất vọng, đúng không? Anh ấy có vẻ chật vật với những cảnh quay cảm xúc vốn rất quan trọng đối với câu chuyện." },
              { speaker: "Mary", "en": "I agree with you, and I felt quite disappointed when he didn't show much expression. The supporting cast was much better, weren't they?", "vi": "Tôi đồng ý với bạn, và tôi cảm thấy khá thất vọng khi anh ấy không thể hiện nhiều biểu cảm. Dàn diễn viên phụ tốt hơn nhiều, phải không?" },
              { speaker: "John", "en": "Yes, the villain was absolutely terrifying, which made the final battle much more intense. We should watch a comedy next time to relax.", "vi": "Đúng vậy, nhân vật phản diện hoàn toàn đáng sợ, điều đó khiến trận chiến cuối cùng căng thẳng hơn nhiều. Lần tới chúng ta nên xem một bộ phim hài để thư giãn." },
              { speaker: "Mary", "en": "That sounds like a great plan because comedy is always relaxing. Let's find a movie which we both want to see.", "vi": "Nghe có vẻ là một kế hoạch tuyệt vời vì phim hài luôn mang tính thư giãn. Hãy tìm một bộ phim mà cả hai chúng ta đều muốn xem." }
            ]
          },
          {
            title: "A tiring journey",
            lines: [
              { speaker: "Tom", "en": "That bus trip was so exhausting that I need to lie down immediately. I am completely exhausted after traveling for ten hours.", "vi": "Chuyến xe buýt đó quá mệt mỏi đến nỗi tôi cần phải nằm xuống ngay lập tức. Tôi hoàn toàn kiệt sức sau khi di chuyển mười tiếng đồng hồ." },
              { speaker: "Lisa", "en": "The weather was so terrible that the driver had to slow down frequently. You must be feeling very frustrated, aren't you?", "vi": "Thời tiết tồi tệ đến mức người lái xe phải thường xuyên đi chậm lại. Bạn hẳn đang cảm thấy rất bực bội, đúng không?" },
              { speaker: "Tom", "en": "I am, but the scenery was truly amazing when we drove through the mountains. Seeing those huge peaks was an exciting experience.", "vi": "Tôi có bực, nhưng phong cảnh thực sự đáng kinh ngạc khi chúng ta lái xe qua những ngọn núi. Nhìn thấy những đỉnh núi khổng lồ đó là một trải nghiệm đầy hào hứng." },
              { speaker: "Lisa", "en": "We were quite lucky to see the snow, weren't we? It was so beautiful that I couldn't stop taking pictures.", "vi": "Chúng ta đã khá may mắn khi nhìn thấy tuyết, phải không? Nó đẹp đến nỗi tôi không thể ngừng chụp ảnh." },
              { speaker: "Tom", "en": "However, the seats were so uncomfortable that my back is hurting right now. Next time we travel, we should book tickets for the train.", "vi": "Tuy nhiên, những chiếc ghế quá khó chịu đến nỗi lưng tôi đang bị đau. Lần tới chúng ta đi du lịch, chúng ta nên đặt vé tàu." },
              { speaker: "Lisa", "en": "Traveling by train is usually more relaxing, which is why I prefer it over buses. We should start planning our next trip soon.", "vi": "Đi lại bằng tàu hỏa thường thư giãn hơn, đó là lý do tôi thích nó hơn xe buýt. Chúng ta nên bắt đầu lên kế hoạch cho chuyến đi tiếp theo sớm." },
              { speaker: "Tom", "en": "I agree, but we need to rest for a few days before doing anything else. The journey was confusing at times, wasn't it?", "vi": "Tôi đồng ý, nhưng chúng ta cần nghỉ ngơi vài ngày trước khi làm bất cứ điều gì khác. Chuyến đi đôi lúc thật rắc rối, đúng không?" },
              { speaker: "Lisa", "en": "Yes, especially when the map was so complicated that we couldn't understand it. Anyway, let's unpack our bags and get some sleep.", "vi": "Đúng vậy, đặc biệt là khi bản đồ quá phức tạp đến nỗi chúng ta không thể hiểu được nó. Dù sao thì, hãy cất đồ đạc và đi ngủ thôi." }
            ]
          }
        ]
      },
      {
        orderIndex: 3,
        dialogues: [
          {
            title: "Advice on learning English",
            lines: [
              { speaker: "Alex", "en": "Learning a new language is quite challenging, but it is necessary to practice every day. What methods do you suggest using?", "vi": "Học một ngôn ngữ mới khá là thử thách, nhưng việc thực hành mỗi ngày là điều cần thiết. Bạn đề xuất sử dụng những phương pháp nào?" },
              { speaker: "Emma", "en": "I enjoy listening to English podcasts, which really helps me improve my pronunciation. Watching movies without subtitles is also very useful.", "vi": "Tôi thích nghe các bài podcast tiếng Anh, thứ mà thực sự giúp tôi cải thiện phát âm. Xem phim không có phụ đề cũng rất hữu ích." },
              { speaker: "Alex", "en": "It is difficult to understand native speakers when they talk too fast. Do you recommend watching shows which are made for children?", "vi": "Thật khó để hiểu người bản xứ khi họ nói quá nhanh. Bạn có khuyên xem những chương trình được làm cho trẻ em không?" },
              { speaker: "Emma", "en": "That is a great idea, and I suggest keeping a vocabulary notebook. Writing new words down makes it easier to remember them.", "vi": "Đó là một ý tưởng tuyệt vời, và tôi khuyên bạn nên giữ một cuốn sổ tay từ vựng. Việc viết những từ mới ra sẽ giúp dễ nhớ chúng hơn." },
              { speaker: "Alex", "en": "I often avoid speaking with foreigners because I am afraid of making mistakes. It is embarrassing to mispronounce simple words.", "vi": "Tôi thường tránh nói chuyện với người nước ngoài vì tôi sợ mắc lỗi. Thật xấu hổ khi phát âm sai những từ đơn giản." },
              { speaker: "Emma", "en": "Making mistakes is a normal part of the process, and you should not worry about it. Communicating with others is the best way to learn.", "vi": "Mắc lỗi là một phần bình thường của quá trình, và bạn không nên lo lắng về điều đó. Giao tiếp với người khác là cách tốt nhất để học." },
              { speaker: "Alex", "en": "I will try to be more confident, and I will start reading English news today. Reading articles is a good way to learn grammar.", "vi": "Tôi sẽ cố gắng tự tin hơn, và tôi sẽ bắt đầu đọc tin tức tiếng Anh hôm nay. Đọc các bài báo là một cách tốt để học ngữ pháp." },
              { speaker: "Emma", "en": "It is important to find topics which interest you. Enjoying the process is the key to mastering any language.", "vi": "Việc tìm kiếm những chủ đề khiến bạn hứng thú là rất quan trọng. Tận hưởng quá trình là chìa khóa để thành thạo bất kỳ ngôn ngữ nào." }
            ]
          },
          {
            title: "Planning study schedules",
            lines: [
              { speaker: "Sarah", "en": "Studying for the final exams takes a lot of energy, and I feel completely exhausted. It is hard to stay focused for hours.", "vi": "Việc ôn tập cho kỳ thi cuối kỳ tốn rất nhiều năng lượng, và tôi cảm thấy hoàn toàn kiệt sức. Thật khó để giữ tập trung trong nhiều giờ." },
              { speaker: "Mark", "en": "I suggest taking short breaks every 45 minutes, which helps refresh your mind. Avoiding distractions like mobile phones is also very important.", "vi": "Tôi khuyên bạn nên nghỉ giải lao ngắn mỗi 45 phút, điều này giúp làm mới tâm trí của bạn. Việc tránh các sự phân tâm như điện thoại di động cũng rất quan trọng." },
              { speaker: "Sarah", "en": "It is easy to say, but ignoring my phone when it rings is almost impossible. What do you recommend doing in this situation?", "vi": "Nói thì dễ, nhưng việc phớt lờ điện thoại khi nó reo là gần như không thể. Bạn khuyên nên làm gì trong tình huống này?" },
              { speaker: "Mark", "en": "I recommend putting your phone in another room while you are studying. Creating a quiet environment is necessary to achieve good results.", "vi": "Tôi khuyên bạn nên đặt điện thoại ở một phòng khác trong khi bạn đang học. Việc tạo ra một môi trường yên tĩnh là cần thiết để đạt kết quả tốt." },
              { speaker: "Sarah", "en": "That makes sense, and I will try to organize my desk properly today. Having a clean workspace definitely helps me concentrate better.", "vi": "Điều đó nghe có lý, và tôi sẽ cố gắng sắp xếp bàn làm việc của mình gọn gàng hôm nay. Có một không gian làm việc sạch sẽ chắc chắn giúp tôi tập trung tốt hơn." },
              { speaker: "Mark", "en": "I enjoy studying with a group of friends, which makes the subjects less boring. We can explain difficult concepts to each other.", "vi": "Tôi thích học cùng một nhóm bạn, điều đó làm cho các môn học bớt nhàm chán hơn. Chúng ta có thể giải thích những khái niệm khó cho nhau." },
              { speaker: "Sarah", "en": "It is great to have study partners, and I would love to join your group. Reviewing the notes together is always helpful.", "vi": "Thật tuyệt khi có những người bạn học cùng, và tôi rất muốn tham gia vào nhóm của bạn. Việc cùng nhau ôn lại các ghi chép luôn luôn hữu ích." },
              { speaker: "Mark", "en": "We are meeting tomorrow at the library, so you should come along. Preparing early is the best way to reduce exam stress.", "vi": "Chúng tôi sẽ gặp nhau vào ngày mai tại thư viện, nên bạn hãy đi cùng nhé. Việc chuẩn bị sớm là cách tốt nhất để giảm bớt căng thẳng thi cử." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 3: Bài 5 (orderIndex 4), Bài 6 (orderIndex 5)
  {
    fileName: 'pet-dialogue-cum3.json',
    lessons: [
      {
        orderIndex: 4,
        dialogues: [
          {
            title: "Applying for a university program",
            lines: [
              { speaker: "David", "en": "I am applying for a scholarship in order to study abroad next year. I need to get high scores so as to impress the admission board.", "vi": "Tôi đang nộp đơn xin học bổng để đi du học vào năm tới. Tôi cần đạt điểm cao để gây ấn tượng với hội đồng tuyển sinh." },
              { speaker: "Lucy", "en": "Which universities are you going to apply to? I know a few excellent colleges which offer programs for international students.", "vi": "Bạn dự định nộp đơn vào những trường đại học nào? Tôi biết một vài trường xuất sắc có cung cấp các chương trình cho sinh viên quốc tế." },
              { speaker: "David", "en": "I applied to Oxford and Cambridge, but I wasn't able to submit all the documents yesterday. The website crashed suddenly.", "vi": "Tôi đã nộp đơn vào Oxford và Cambridge, nhưng hôm qua tôi đã không thể nộp tất cả các tài liệu. Trang web đột nhiên bị sập." },
              { speaker: "Lucy", "en": "Did you manage to contact their technical support team? You should write an email in order not to miss the final deadline.", "vi": "Bạn có xoay xở liên hệ được với nhóm hỗ trợ kỹ thuật của họ không? Bạn nên viết một email để không bỏ lỡ hạn chót." },
              { speaker: "David", "en": "I sent them a message this morning, and I finally managed to upload my essays. I worked all night in order to finish them.", "vi": "Tôi đã gửi cho họ một tin nhắn sáng nay, và cuối cùng tôi đã xoay xở tải lên được các bài luận của mình. Tôi đã làm việc cả đêm để hoàn thành chúng." },
              { speaker: "Lucy", "en": "I am sure you will be able to get accepted because your academic record is outstanding. Have you prepared for the interview yet?", "vi": "Tôi chắc chắn bạn sẽ có khả năng được chấp nhận vì thành tích học tập của bạn rất xuất sắc. Bạn đã chuẩn bị cho cuộc phỏng vấn chưa?" },
              { speaker: "David", "en": "I am currently taking a communication course so as to improve my speaking skills. I want to speak confidently when I meet the professors.", "vi": "Tôi hiện đang tham gia một khóa học giao tiếp để cải thiện kỹ năng nói của mình. Tôi muốn nói chuyện một cách tự tin khi gặp các giáo sư." },
              { speaker: "Lucy", "en": "That is a smart decision, and I can help you practice your answers this weekend. We can do a mock interview in order to prepare fully.", "vi": "Đó là một quyết định thông minh, và tôi có thể giúp bạn luyện tập các câu trả lời vào cuối tuần này. Chúng ta có thể làm một cuộc phỏng vấn thử để chuẩn bị đầy đủ." }
            ]
          },
          {
            title: "Finding a new job",
            lines: [
              { speaker: "Brian", "en": "I decided to apply for the marketing position which was advertised in the newspaper. I am looking for a job in order to earn more money.", "vi": "Tôi quyết định nộp đơn xin vào vị trí tiếp thị được quảng cáo trên tờ báo. Tôi đang tìm kiếm một công việc để kiếm thêm tiền." },
              { speaker: "Anna", "en": "You have a lot of experience in sales, so you should be able to get the job easily. Did you manage to update your CV?", "vi": "Bạn có nhiều kinh nghiệm trong việc bán hàng, vì vậy bạn có khả năng nhận được công việc đó một cách dễ dàng. Bạn đã xoay xở cập nhật CV của mình chưa?" },
              { speaker: "Brian", "en": "Yes, I rewrote the entire document so as to highlight my recent achievements. I also applied to a few other local companies.", "vi": "Có, tôi đã viết lại toàn bộ tài liệu để làm nổi bật những thành tựu gần đây của mình. Tôi cũng đã nộp đơn vào một vài công ty địa phương khác." },
              { speaker: "Anna", "en": "I heard that the interviews are very challenging, and the managers ask tricky questions in order to test your reactions.", "vi": "Tôi nghe nói rằng các cuộc phỏng vấn rất thử thách, và các quản lý đặt ra những câu hỏi hóc búa để kiểm tra phản ứng của bạn." },
              { speaker: "Brian", "en": "I wasn't able to answer a difficult question during my last interview. Therefore, I am practicing every day in order not to repeat the same mistake.", "vi": "Tôi đã không thể trả lời một câu hỏi khó trong cuộc phỏng vấn lần trước. Do đó, tôi đang luyện tập mỗi ngày để không lặp lại sai lầm tương tự." },
              { speaker: "Anna", "en": "If you are well-prepared, you will manage to handle any situation. It is important to stay calm so as to show your confidence.", "vi": "Nếu bạn chuẩn bị tốt, bạn sẽ xoay xở xử lý được mọi tình huống. Việc giữ bình tĩnh là rất quan trọng để thể hiện sự tự tin của bạn." },
              { speaker: "Brian", "en": "I will wear my best suit in order to look professional and serious. First impressions are crucial when you apply for a job.", "vi": "Tôi sẽ mặc bộ vest đẹp nhất của mình để trông thật chuyên nghiệp và nghiêm túc. Những ấn tượng ban đầu là cực kỳ quan trọng khi bạn nộp đơn xin việc." },
              { speaker: "Anna", "en": "I wish you the best of luck, and I am sure you will be able to impress the interviewers. Call me as soon as it is over!", "vi": "Tôi chúc bạn may mắn nhất, và tôi chắc chắn bạn sẽ có thể gây ấn tượng với những người phỏng vấn. Hãy gọi cho tôi ngay khi nó kết thúc nhé!" }
            ]
          }
        ]
      },
      {
        orderIndex: 5,
        dialogues: [
          {
            title: "Talking about past jobs",
            lines: [
              { speaker: "Peter", "en": "I used to work in a busy restaurant where I was responsible for serving the customers. We would usually stay until midnight to clean the tables.", "vi": "Tôi từng làm việc trong một nhà hàng bận rộn nơi tôi chịu trách nhiệm phục vụ khách hàng. Chúng tôi thường hay ở lại đến nửa đêm để lau dọn bàn." },
              { speaker: "Alice", "en": "That sounds exhausting, and my manager asked me if I had ever worked long hours. I told him that I used to have a very relaxing job.", "vi": "Nghe có vẻ mệt mỏi nhỉ, và quản lý của tôi đã hỏi tôi xem tôi có từng làm việc nhiều giờ liền chưa. Tôi đã bảo ông ấy rằng tôi từng có một công việc rất nhàn rỗi." },
              { speaker: "Peter", "en": "In my previous job, I was responsible for managing the daily inventory. My boss asked how I handled the pressure when things went wrong.", "vi": "Ở công việc trước đây của tôi, tôi chịu trách nhiệm quản lý hàng tồn kho hàng ngày. Sếp tôi đã hỏi tôi xử lý áp lực ra sao khi mọi việc đi chệch hướng." },
              { speaker: "Alice", "en": "I also had an interview yesterday, and the director asked why I left my old company. I explained that I wanted to find new challenges.", "vi": "Hôm qua tôi cũng có một cuộc phỏng vấn, và giám đốc đã hỏi tại sao tôi lại rời bỏ công ty cũ. Tôi giải thích rằng tôi muốn tìm kiếm những thử thách mới." },
              { speaker: "Peter", "en": "When I was younger, I would often switch jobs because I didn't know what my passion was. Now, I am responsible for leading a whole team.", "vi": "Khi tôi còn trẻ hơn, tôi thường hay nhảy việc vì tôi không biết đam mê của mình là gì. Bây giờ, tôi chịu trách nhiệm dẫn dắt cả một đội ngũ." },
              { speaker: "Alice", "en": "That is a huge responsibility, which requires excellent communication skills. They asked me what my greatest weakness was.", "vi": "Đó là một trách nhiệm khổng lồ, thứ mà đòi hỏi kỹ năng giao tiếp xuất sắc. Họ đã hỏi tôi điểm yếu lớn nhất của tôi là gì." },
              { speaker: "Peter", "en": "I used to get nervous during interviews, but now I feel much more confident. They usually ask if you are willing to work overtime.", "vi": "Tôi từng hay lo lắng trong các cuộc phỏng vấn, nhưng bây giờ tôi cảm thấy tự tin hơn nhiều. Họ thường hỏi xem bạn có sẵn sàng làm thêm giờ không." },
              { speaker: "Alice", "en": "I answered that I would always support the team when necessary. Hopefully, they will call me back with good news next week.", "vi": "Tôi đã trả lời rằng tôi sẽ luôn hỗ trợ nhóm khi cần thiết. Hi vọng rằng họ sẽ gọi lại cho tôi với tin tức tốt lành vào tuần tới." }
            ]
          },
          {
            title: "Discussing team responsibilities",
            lines: [
              { speaker: "Chris", "en": "We need to clearly define who is responsible for updating the website. In the past, John would always handle the technical issues.", "vi": "Chúng ta cần xác định rõ ai là người chịu trách nhiệm cập nhật trang web. Trong quá khứ, John thường hay xử lý các vấn đề kỹ thuật." },
              { speaker: "Emma", "en": "John used to do it perfectly, but he asked if we could assign someone else this month. He is currently responsible for training the new interns.", "vi": "John từng làm việc đó rất hoàn hảo, nhưng anh ấy đã hỏi liệu chúng ta có thể giao cho ai khác trong tháng này không. Hiện tại anh ấy chịu trách nhiệm đào tạo các thực tập sinh mới." },
              { speaker: "Chris", "en": "I used to write the code myself when the company was still small. The manager asked whether I could take over the task temporarily.", "vi": "Tôi từng tự mình viết mã code khi công ty vẫn còn nhỏ. Quản lý đã hỏi xem liệu tôi có thể tiếp quản nhiệm vụ đó tạm thời không." },
              { speaker: "Emma", "en": "That would be great because I am already responsible for writing the weekly reports. They also asked what time the website would be online.", "vi": "Thế thì tuyệt quá vì tôi đã chịu trách nhiệm viết các báo cáo hàng tuần rồi. Họ cũng đã hỏi lúc mấy giờ thì trang web sẽ trực tuyến." },
              { speaker: "Chris", "en": "I told them that the site would be ready by Friday afternoon. We would often launch new features on Fridays so we could monitor them over the weekend.", "vi": "Tôi đã bảo họ rằng trang web sẽ sẵn sàng vào chiều thứ Sáu. Chúng ta thường hay ra mắt các tính năng mới vào thứ Sáu để chúng ta có thể theo dõi chúng qua cuối tuần." },
              { speaker: "Emma", "en": "I remember that we used to have a lot of bugs after every update. Who is responsible for testing the software before the launch?", "vi": "Tôi nhớ là chúng ta từng có rất nhiều lỗi phần mềm sau mỗi lần cập nhật. Ai là người chịu trách nhiệm kiểm tra phần mềm trước khi ra mắt?" },
              { speaker: "Chris", "en": "Lisa is responsible for finding errors, and she asked me if the database was secured. I assured her that everything was protected.", "vi": "Lisa chịu trách nhiệm tìm lỗi, và cô ấy đã hỏi tôi xem cơ sở dữ liệu đã được bảo mật chưa. Tôi đã trấn an cô ấy rằng mọi thứ đã được bảo vệ." },
              { speaker: "Emma", "en": "She used to be very strict about quality control, which is exactly what we need. Let's start working so we can finish on time.", "vi": "Cô ấy từng rất nghiêm ngặt về việc kiểm soát chất lượng, đó chính xác là những gì chúng ta cần. Hãy bắt đầu làm việc thôi để chúng ta có thể hoàn thành đúng hạn." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 4: Bài 7 (orderIndex 6), Bài 8 (orderIndex 7)
  {
    fileName: 'pet-dialogue-cum4.json',
    lessons: [
      {
        orderIndex: 6,
        dialogues: [
          {
            title: "Talking about professions",
            lines: [
              { speaker: "Harry", "en": "I currently work as a graphic designer for a large advertising agency. The campaigns are usually created by a team of highly skilled artists.", "vi": "Hiện tại tôi làm nghề thiết kế đồ họa cho một công ty quảng cáo lớn. Các chiến dịch thường được tạo ra bởi một đội ngũ các nghệ sĩ có tay nghề cao." },
              { speaker: "Jane", "en": "That sounds amazing! I met a woman whose son works for the same company, and she said the working environment is excellent.", "vi": "Nghe tuyệt quá! Tôi đã gặp một người phụ nữ có con trai làm việc cho cùng công ty đó, và bà ấy nói môi trường làm việc rất xuất sắc." },
              { speaker: "Harry", "en": "Yes, our projects are often managed by senior directors whose experience is vast. I used to work as a freelancer before I joined them.", "vi": "Đúng vậy, các dự án của chúng tôi thường được quản lý bởi các giám đốc cấp cao, những người có kinh nghiệm rất sâu rộng. Tôi từng làm nghề tự do trước khi gia nhập công ty họ." },
              { speaker: "Jane", "en": "I work for the local hospital where patient records are strictly protected by the system. My sister, whose husband is a doctor, also works there.", "vi": "Tôi làm việc cho bệnh viện địa phương nơi mà hồ sơ bệnh nhân được bảo vệ nghiêm ngặt bởi hệ thống. Chị gái tôi, người có chồng là một bác sĩ, cũng làm việc ở đó." },
              { speaker: "Harry", "en": "It must be challenging to work as a nurse in such a busy place. Medicine is ordered and distributed by the pharmacy every hour.", "vi": "Chắc hẳn rất thử thách khi làm y tá ở một nơi bận rộn như vậy. Thuốc men được đặt hàng và phân phối bởi nhà thuốc mỗi giờ." },
              { speaker: "Jane", "en": "It is, but the patients whose health improves make me feel very happy. The hospital is supported by the government and many local charities.", "vi": "Đúng vậy, nhưng những bệnh nhân có sức khỏe được cải thiện làm tôi cảm thấy rất hạnh phúc. Bệnh viện được hỗ trợ bởi chính phủ và nhiều tổ chức từ thiện địa phương." },
              { speaker: "Harry", "en": "You are doing a noble job which requires a lot of patience. My designs are just seen by people on the internet.", "vi": "Bạn đang làm một công việc cao quý thứ mà đòi hỏi rất nhiều sự kiên nhẫn. Các thiết kế của tôi chỉ được nhìn thấy bởi mọi người trên internet thôi." },
              { speaker: "Jane", "en": "Your work is also important because beautiful art is appreciated by everyone. We both contribute to society in our own different ways.", "vi": "Công việc của bạn cũng quan trọng vì nghệ thuật đẹp đẽ được trân trọng bởi tất cả mọi người. Cả hai chúng ta đều đóng góp cho xã hội theo những cách khác nhau của riêng mình." }
            ]
          },
          {
            title: "Office discussions",
            lines: [
              { speaker: "Kevin", "en": "I work for a software company whose main office is located in London. The daily reports are written by the junior developers.", "vi": "Tôi làm việc cho một công ty phần mềm có văn phòng chính tọa lạc ở London. Các báo cáo hàng ngày được viết bởi các lập trình viên cấp dưới." },
              { speaker: "Sophia", "en": "I work as an accountant, and all the financial data is reviewed by me at the end of the month. The manager whose office is next to mine is very strict.", "vi": "Tôi làm nghề kế toán, và tất cả dữ liệu tài chính được xem xét bởi tôi vào cuối tháng. Người quản lý có văn phòng nằm cạnh tôi thì rất nghiêm khắc." },
              { speaker: "Kevin", "en": "In my company, emails are sent to the clients automatically by the new system. I work as a project manager, so I oversee the whole process.", "vi": "Trong công ty tôi, email được gửi cho khách hàng một cách tự động bởi hệ thống mới. Tôi làm nghề quản lý dự án, vì vậy tôi giám sát toàn bộ quy trình." },
              { speaker: "Sophia", "en": "The employees whose performance is outstanding are rewarded by the board of directors. A lot of effort is required to get a promotion.", "vi": "Những nhân viên có thành tích xuất sắc được khen thưởng bởi hội đồng quản trị. Rất nhiều nỗ lực được yêu cầu để có được sự thăng tiến." },
              { speaker: "Kevin", "en": "Meetings are organized by the secretary every Monday morning. We discuss issues with the clients whose projects are currently active.", "vi": "Các cuộc họp được tổ chức bởi thư ký vào mỗi sáng thứ Hai. Chúng tôi thảo luận các vấn đề với những khách hàng có dự án hiện đang hoạt động." },
              { speaker: "Sophia", "en": "Our salaries are paid by the finance department on the last day of the month. I know a guy whose salary was delayed, and he was very angry.", "vi": "Lương của chúng tôi được trả bởi bộ phận tài chính vào ngày cuối cùng của tháng. Tôi biết một anh chàng có tiền lương bị chậm trễ, và anh ấy đã rất tức giận." },
              { speaker: "Kevin", "en": "That rarely happens where I work because the accounting software is updated regularly. We try to avoid mistakes which cost the company money.", "vi": "Điều đó hiếm khi xảy ra ở nơi tôi làm việc vì phần mềm kế toán được cập nhật thường xuyên. Chúng tôi cố gắng tránh những sai lầm làm tiêu tốn tiền bạc của công ty." },
              { speaker: "Sophia", "en": "Working for a large organization is stressful, but the benefits are provided generously. I am quite satisfied with my current position.", "vi": "Làm việc cho một tổ chức lớn rất căng thẳng, nhưng các phúc lợi được cung cấp rất hào phóng. Tôi khá hài lòng với vị trí hiện tại của mình." }
            ]
          }
        ]
      },
      {
        orderIndex: 7,
        dialogues: [
          {
            title: "Community volunteering",
            lines: [
              { speaker: "Leo", "en": "Not only is the local park dirty, but it is also unsafe for children to play. We ought to organize a cleaning event this weekend.", "vi": "Công viên địa phương không những bẩn thỉu, mà còn không an toàn cho trẻ em vui chơi. Chúng ta nên tổ chức một sự kiện dọn dẹp vào cuối tuần này." },
              { speaker: "Mia", "en": "I agree, and both the teenagers and the adults should participate in this activity. Neither the government nor the council has done anything about it.", "vi": "Tôi đồng ý, và cả thanh thiếu niên lẫn người lớn đều nên tham gia vào hoạt động này. Cả chính phủ và hội đồng đều chưa làm bất cứ điều gì về nó." },
              { speaker: "Leo", "en": "We should print some posters and distribute them around the neighborhood. Not only will this raise awareness, but it will also attract more volunteers.", "vi": "Chúng ta nên in một vài tấm áp phích và phân phát chúng quanh khu phố. Việc này không những sẽ nâng cao nhận thức, mà nó còn thu hút thêm nhiều tình nguyện viên." },
              { speaker: "Mia", "en": "I can buy both gloves and trash bags, which are essential for the cleaning process. People ought to care more about their living environment.", "vi": "Tôi có thể mua cả găng tay và túi đựng rác, những thứ rất cần thiết cho quá trình dọn dẹp. Mọi người nên quan tâm nhiều hơn đến môi trường sống của họ." },
              { speaker: "Leo", "en": "Neither my brother nor my sister is busy on Sunday, so they can come to help. We should start early in the morning before it gets too hot.", "vi": "Cả anh trai và chị gái tôi đều không bận vào Chủ nhật, vì vậy họ có thể đến giúp. Chúng ta nên bắt đầu vào sáng sớm trước khi trời trở nên quá nóng." },
              { speaker: "Mia", "en": "That is not only a great idea, but it is also a wonderful way to bring people together. The community ought to be united when facing such problems.", "vi": "Đó không chỉ là một ý tưởng tuyệt vời, mà nó còn là một cách tuyệt hay để gắn kết mọi người lại với nhau. Cộng đồng nên đoàn kết khi đối mặt với những vấn đề như thế này." },
              { speaker: "Leo", "en": "We should contact the local newspaper, which might write an article about our efforts. Both the schools and the local businesses will see it.", "vi": "Chúng ta nên liên hệ với tờ báo địa phương, thứ có thể sẽ viết một bài báo về những nỗ lực của chúng ta. Cả các trường học và doanh nghiệp địa phương sẽ nhìn thấy nó." },
              { speaker: "Mia", "en": "I am excited because neither bad weather nor hard work will stop us. We ought to make our community a better place to live.", "vi": "Tôi đang rất hào hứng vì cả thời tiết xấu lẫn công việc cực nhọc đều sẽ không ngăn cản được chúng ta. Chúng ta nên biến cộng đồng của mình thành một nơi tốt đẹp hơn để sống." }
            ]
          },
          {
            title: "Discussing social issues",
            lines: [
              { speaker: "Paul", "en": "Poverty is a serious issue, and we ought to find ways to support homeless people. Not only do they lack food, but they also have no shelter.", "vi": "Nghèo đói là một vấn đề nghiêm trọng, và chúng ta nên tìm cách hỗ trợ những người vô gia cư. Họ không chỉ thiếu thức ăn, mà họ còn không có chỗ trú ẩn." },
              { speaker: "Nancy", "en": "Both the charities and the citizens should take action immediately. Neither ignoring the problem nor blaming the economy will solve anything.", "vi": "Cả các tổ chức từ thiện và công dân đều nên hành động ngay lập tức. Cả việc làm ngơ vấn đề lẫn việc đổ lỗi cho nền kinh tế đều sẽ không giải quyết được gì." },
              { speaker: "Paul", "en": "I think the government ought to build more affordable houses for low-income families. Both education and healthcare should be accessible to everyone.", "vi": "Tôi nghĩ chính phủ nên xây dựng nhiều nhà ở giá rẻ hơn cho các gia đình thu nhập thấp. Cả giáo dục và chăm sóc sức khỏe đều nên được tiếp cận bởi tất cả mọi người." },
              { speaker: "Nancy", "en": "The new policy is not only expensive, but it is also difficult to implement. People shouldn't wait for others to act, but they should start volunteering.", "vi": "Chính sách mới không những tốn kém, mà nó còn khó thực thi. Mọi người không nên chờ đợi người khác hành động, mà họ nên bắt đầu làm tình nguyện." },
              { speaker: "Paul", "en": "Neither my friends nor my colleagues knew about the charity event which happened yesterday. We ought to advertise these events more widely on social media.", "vi": "Cả bạn bè lẫn đồng nghiệp của tôi đều đã không biết về sự kiện từ thiện cái mà diễn ra hôm qua. Chúng ta nên quảng cáo các sự kiện này rộng rãi hơn trên mạng xã hội." },
              { speaker: "Nancy", "en": "I agree, and not only should we donate money, but we also ought to donate clothes. Helping others brings both joy and meaning to our lives.", "vi": "Tôi đồng ý, và chúng ta không những nên quyên góp tiền, mà chúng ta còn nên quyên góp quần áo. Giúp đỡ người khác mang lại cả niềm vui và ý nghĩa cho cuộc sống của chúng ta." },
              { speaker: "Paul", "en": "You ought to talk to the local manager, who organizes the food banks. Both you and I can spend a few hours there next weekend.", "vi": "Bạn nên nói chuyện với quản lý địa phương, người tổ chức các ngân hàng thực phẩm. Cả bạn và tôi đều có thể dành vài giờ ở đó vào cuối tuần tới." },
              { speaker: "Nancy", "en": "Neither distance nor lack of time should be an excuse when people need help. We ought to do our best to make a difference.", "vi": "Cả khoảng cách lẫn sự thiếu thời gian đều không nên là cái cớ khi có người cần giúp đỡ. Chúng ta nên làm hết sức mình để tạo ra sự khác biệt." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 5: Bài 9 (orderIndex 8), Bài 10 (orderIndex 9)
  {
    fileName: 'pet-dialogue-cum5.json',
    lessons: [
      {
        orderIndex: 8,
        dialogues: [
          {
            title: "Climate change consequences",
            lines: [
              { speaker: "Ryan", "en": "Unless we reduce carbon emissions, the global temperatures will continue to rise rapidly. The polar ice caps might melt completely in the next few decades.", "vi": "Trừ khi chúng ta giảm lượng khí thải carbon, nhiệt độ toàn cầu sẽ tiếp tục tăng nhanh chóng. Các chỏm băng ở hai cực có thể tan chảy hoàn toàn trong vài thập kỷ tới." },
              { speaker: "Lily", "en": "If the ice melts, sea levels will rise and flood many coastal cities. Millions of people could lose their homes, which is a terrifying thought.", "vi": "Nếu băng tan, mực nước biển sẽ dâng cao và làm ngập nhiều thành phố ven biển. Hàng triệu người có khả năng mất đi nhà cửa, điều đó là một suy nghĩ thật đáng sợ." },
              { speaker: "Ryan", "en": "If we start using renewable energy, we will protect the environment for future generations. However, this transition might take a lot of time and money.", "vi": "Nếu chúng ta bắt đầu sử dụng năng lượng tái tạo, chúng ta sẽ bảo vệ được môi trường cho các thế hệ tương lai. Tuy nhiên, sự chuyển đổi này có thể sẽ tốn rất nhiều thời gian và tiền bạc." },
              { speaker: "Lily", "en": "Unless governments take immediate action, the situation will become irreversible. Many animal species could become extinct if their habitats are destroyed.", "vi": "Trừ khi các chính phủ hành động ngay lập tức, tình hình sẽ trở nên không thể đảo ngược. Nhiều loài động vật có khả năng tuyệt chủng nếu môi trường sống của chúng bị phá hủy." },
              { speaker: "Ryan", "en": "If everyone plants a tree, the air quality will improve significantly. A small effort could make a massive difference to our planet.", "vi": "Nếu mỗi người đều trồng một cái cây, chất lượng không khí sẽ cải thiện đáng kể. Một nỗ lực nhỏ có thể tạo ra một sự khác biệt to lớn cho hành tinh của chúng ta." },
              { speaker: "Lily", "en": "We will face severe droughts in the summer unless we stop wasting water. Our agriculture might suffer heavily if the rain patterns change.", "vi": "Chúng ta sẽ đối mặt với hạn hán nghiêm trọng vào mùa hè trừ khi chúng ta ngừng lãng phí nước. Nông nghiệp của chúng ta có thể bị thiệt hại nặng nề nếu các kiểu hình mưa thay đổi." },
              { speaker: "Ryan", "en": "If we educate children about recycling, they will grow up to be responsible citizens. I believe human ingenuity will solve this crisis eventually.", "vi": "Nếu chúng ta giáo dục trẻ em về việc tái chế, chúng sẽ lớn lên trở thành những công dân có trách nhiệm. Tôi tin rằng sự khéo léo của con người rốt cuộc sẽ giải quyết được cuộc khủng hoảng này." },
              { speaker: "Lily", "en": "The future could be bright, but it will definitely depend on our choices today. We won't survive unless we learn to live in harmony with nature.", "vi": "Tương lai có thể sẽ tươi sáng, nhưng nó chắc chắn sẽ phụ thuộc vào những lựa chọn của chúng ta hôm nay. Chúng ta sẽ không sống sót trừ khi chúng ta học cách sống hòa hợp với thiên nhiên." }
            ]
          },
          {
            title: "Planning an eco-friendly event",
            lines: [
              { speaker: "Jake", "en": "If we organize a beach cleanup, many local residents will join us. Unless we advertise it properly, nobody will know about the event.", "vi": "Nếu chúng ta tổ chức một buổi dọn dẹp bãi biển, nhiều cư dân địa phương sẽ tham gia cùng chúng ta. Trừ khi chúng ta quảng cáo nó đúng cách, sẽ không ai biết về sự kiện này." },
              { speaker: "Sophie", "en": "I will create a Facebook page which will help spread the information quickly. We might need to ask the local council for some trash bags.", "vi": "Tôi sẽ tạo một trang Facebook thứ mà sẽ giúp lan truyền thông tin nhanh chóng. Chúng ta có thể sẽ cần xin hội đồng địa phương một số túi đựng rác." },
              { speaker: "Jake", "en": "Unless the weather is terrible, the event will take place this Saturday morning. If it rains heavily, we will postpone it to the next week.", "vi": "Trừ khi thời tiết quá tồi tệ, sự kiện sẽ diễn ra vào sáng thứ Bảy này. Nếu trời mưa lớn, chúng ta sẽ hoãn nó sang tuần sau." },
              { speaker: "Sophie", "en": "I will bring some sandwiches and drinks for the volunteers who come to help. The kids could play games after the cleanup is finished.", "vi": "Tôi sẽ mang một ít bánh mì sandwich và đồ uống cho những tình nguyện viên đến giúp. Bọn trẻ có khả năng sẽ chơi các trò chơi sau khi việc dọn dẹp hoàn tất." },
              { speaker: "Jake", "en": "If we collect enough plastic bottles, we will send them to the recycling center. The ocean might become cleaner if every community does this.", "vi": "Nếu chúng ta thu gom đủ chai nhựa, chúng ta sẽ gửi chúng đến trung tâm tái chế. Đại dương có thể sẽ trở nên sạch hơn nếu mọi cộng đồng đều làm điều này." },
              { speaker: "Sophie", "en": "Unless people change their habits, the pollution problem will never be solved. We will need to educate tourists about protecting marine life.", "vi": "Trừ khi con người thay đổi thói quen của họ, vấn đề ô nhiễm sẽ không bao giờ được giải quyết. Chúng ta sẽ cần giáo dục du khách về việc bảo vệ sinh vật biển." },
              { speaker: "Jake", "en": "If the local news reporter comes, our campaign will get a lot of attention. We could become a role model for other coastal towns.", "vi": "Nếu phóng viên tin tức địa phương đến, chiến dịch của chúng ta sẽ nhận được nhiều sự chú ý. Chúng ta có thể trở thành một hình mẫu cho các thị trấn ven biển khác." },
              { speaker: "Sophie", "en": "I am sure the event will be highly successful if we work hard together. The beaches won't stay clean unless we maintain them regularly.", "vi": "Tôi chắc chắn sự kiện sẽ rất thành công nếu chúng ta cùng nhau làm việc chăm chỉ. Các bãi biển sẽ không giữ được sự sạch sẽ trừ khi chúng ta duy trì chúng thường xuyên." }
            ]
          }
        ]
      },
      {
        orderIndex: 9,
        dialogues: [
          {
            title: "Environmental protection efforts",
            lines: [
              { speaker: "Oscar", "en": "Thousands of trees are being cut down in the Amazon rainforest every day. It is important that governments should ban illegal logging immediately.", "vi": "Hàng ngàn cái cây đang bị đốn hạ trong rừng mưa Amazon mỗi ngày. Việc các chính phủ nên cấm khai thác gỗ bất hợp pháp ngay lập tức là rất quan trọng." },
              { speaker: "Chloe", "en": "Many endangered species have been driven to the edge of extinction because of this. It is essential that we must protect their natural habitats.", "vi": "Nhiều loài có nguy cơ tuyệt chủng đã bị đẩy đến bờ vực diệt vong vì điều này. Điều thiết yếu là chúng ta phải bảo vệ môi trường sống tự nhiên của chúng." },
              { speaker: "Oscar", "en": "A new solar power plant is being built near our city, which is great news. The old coal factory has been shut down permanently.", "vi": "Một nhà máy năng lượng mặt trời mới đang được xây dựng gần thành phố của chúng ta, đó là một tin tuyệt vời. Nhà máy than cũ đã bị đóng cửa vĩnh viễn." },
              { speaker: "Chloe", "en": "The local river has been heavily polluted by industrial waste for years. It is vital that companies must treat their wastewater before releasing it.", "vi": "Con sông địa phương đã bị ô nhiễm nặng nề bởi chất thải công nghiệp trong nhiều năm. Sống còn là việc các công ty phải xử lý nước thải của họ trước khi xả ra." },
              { speaker: "Oscar", "en": "Fortunately, the river is being cleaned up by a group of environmental activists right now. Millions of dollars have been donated to this cause.", "vi": "May mắn thay, con sông hiện đang được làm sạch bởi một nhóm các nhà hoạt động môi trường ngay lúc này. Hàng triệu đô la đã được quyên góp cho mục đích này." },
              { speaker: "Chloe", "en": "It is necessary that everyone should participate in reducing plastic consumption. Too much plastic trash is being thrown into the ocean every minute.", "vi": "Tất cả mọi người cần thiết nên tham gia vào việc giảm tiêu thụ nhựa. Quá nhiều rác thải nhựa đang bị ném xuống đại dương mỗi phút." },
              { speaker: "Oscar", "en": "Paper bags are being used in supermarkets instead of plastic ones. Eco-friendly policies have been implemented by many countries around the world.", "vi": "Túi giấy đang được sử dụng trong các siêu thị thay cho túi nhựa. Các chính sách thân thiện với môi trường đã được thực thi bởi nhiều quốc gia trên toàn thế giới." },
              { speaker: "Chloe", "en": "It is important that children must be taught about the environment at school. Awareness has been raised significantly over the last decade.", "vi": "Việc trẻ em phải được dạy về môi trường ở trường học là rất quan trọng. Nhận thức đã được nâng cao đáng kể trong vòng một thập kỷ qua." }
            ]
          },
          {
            title: "Discussing local pollution",
            lines: [
              { speaker: "Liam", "en": "The air quality in our town has been monitored closely since last year. It is crucial that factories must install air filters to reduce smoke.", "vi": "Chất lượng không khí ở thị trấn của chúng ta đã được theo dõi sát sao từ năm ngoái. Yếu tố then chốt là các nhà máy phải lắp đặt bộ lọc không khí để giảm khói." },
              { speaker: "Emma", "en": "A new public transport system is being developed, which will reduce the number of cars. It is essential that citizens should use buses more often.", "vi": "Một hệ thống giao thông công cộng mới đang được phát triển, cái mà sẽ giảm thiểu số lượng xe hơi. Điều thiết yếu là công dân nên sử dụng xe buýt thường xuyên hơn." },
              { speaker: "Liam", "en": "Old diesel buses have been replaced by electric ones in the city center. The roads are being repaired to encourage people to ride bicycles.", "vi": "Các xe buýt chạy bằng diesel cũ đã được thay thế bằng xe điện ở trung tâm thành phố. Những con đường đang được sửa chữa để khuyến khích người dân đi xe đạp." },
              { speaker: "Emma", "en": "It is necessary that heavy vehicles must be banned during rush hours. The traffic congestion has been improved a lot since the new law passed.", "vi": "Việc các xe cộ hạng nặng phải bị cấm trong giờ cao điểm là cần thiết. Tình trạng ùn tắc giao thông đã được cải thiện rất nhiều kể từ khi luật mới được thông qua." },
              { speaker: "Liam", "en": "Several green parks are being constructed in areas where factories used to be. Trees have been planted along the main streets to provide shade.", "vi": "Một vài công viên xanh đang được xây dựng ở những khu vực từng là nhà máy. Cây xanh đã được trồng dọc theo các con đường chính để cung cấp bóng mát." },
              { speaker: "Emma", "en": "It is important that strict fines should be given to people who litter. Too much rubbish is being left on the streets by careless tourists.", "vi": "Việc nên áp dụng các khoản tiền phạt nghiêm ngặt đối với những người xả rác là rất quan trọng. Quá nhiều rác thải đang bị bỏ lại trên đường phố bởi những du khách bất cẩn." },
              { speaker: "Liam", "en": "Trash bins for recycling have been placed at every corner of the city. The recycling rate is being increased thanks to these new facilities.", "vi": "Thùng rác dành cho tái chế đã được đặt ở mỗi góc của thành phố. Tỷ lệ tái chế đang được gia tăng nhờ vào những cơ sở vật chất mới này." },
              { speaker: "Emma", "en": "Our town has been transformed into a much cleaner and greener place. It is vital that we must maintain this progress for our future.", "vi": "Thị trấn của chúng ta đã được biến đổi thành một nơi sạch hơn và xanh hơn nhiều. Sống còn là chúng ta phải duy trì sự tiến bộ này cho tương lai của chúng ta." }
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
  console.log("Hoàn thành cụm 2, 3, 4, 5!");
}

seedBatches()
  .finally(() => prisma.$disconnect());

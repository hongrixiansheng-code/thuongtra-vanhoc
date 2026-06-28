const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = [
  // Cụm 16: Bài 31 (orderIndex 30), Bài 32 (orderIndex 31)
  {
    fileName: 'pet-dialogue-cum16.json',
    lessons: [
      {
        orderIndex: 30,
        dialogues: [
          {
            title: "Writing a formal email",
            lines: [
              { speaker: "Lily", "en": "I need to write a formal email to the university admissions office to ask about the scholarship. How should I start the letter properly?", vi: "Tôi cần viết một email trang trọng cho văn phòng tuyển sinh đại học để hỏi về học bổng. Tôi nên bắt đầu bức thư thế nào cho đúng?" },
              { speaker: "James", "en": "You should begin with 'Dear Sir or Madam' if you don't know the exact name of the person. It is the most polite and standard opening phrase.", vi: "Bạn nên bắt đầu bằng 'Dear Sir or Madam' nếu bạn không biết tên chính xác của người đó. Nó là cụm từ mở đầu lịch sự và tiêu chuẩn nhất." },
              { speaker: "Lily", "en": "Thank you! I also want to mention that my academic records have been attached to the email. Should I use the passive voice for this sentence?", vi: "Cảm ơn bạn! Tôi cũng muốn đề cập rằng hồ sơ học tập của tôi đã được đính kèm vào email. Tôi có nên sử dụng thể bị động cho câu này không?" },
              { speaker: "James", "en": "Yes, saying 'Please find my academic records attached' sounds very professional. You must ensure that the tone remains respectful throughout the email.", vi: "Có, việc nói 'Please find my academic records attached' nghe rất chuyên nghiệp. Bạn phải đảm bảo rằng giọng điệu duy trì sự tôn trọng xuyên suốt email." },
              { speaker: "Lily", "en": "I am writing to inquire about the deadline for international applicants, which is not clear on the website. I hope they will reply quickly.", vi: "Tôi viết thư này để hỏi về hạn chót dành cho người nộp đơn quốc tế, điều mà không rõ ràng trên trang web. Tôi hy vọng họ sẽ trả lời nhanh chóng." },
              { speaker: "James", "en": "Make sure you include your contact details at the end so that they can reach you easily. What closing phrase are you planning to use?", vi: "Đảm bảo rằng bạn bao gồm thông tin liên hệ của mình ở phần cuối để họ có thể liên lạc với bạn dễ dàng. Bạn dự định sử dụng cụm từ kết thúc nào?" },
              { speaker: "Lily", "en": "I will close the email with 'Yours faithfully', followed by my full name. I will proofread it twice before I hit the send button.", vi: "Tôi sẽ kết thúc email bằng 'Yours faithfully', theo sau là tên đầy đủ của tôi. Tôi sẽ đọc rà soát nó hai lần trước khi tôi nhấn nút gửi." },
              { speaker: "James", "en": "That is absolutely correct! Writing a clear and polite email is an essential skill which everyone should master.", vi: "Điều đó hoàn toàn chính xác! Viết một email rõ ràng và lịch sự là một kỹ năng thiết yếu thứ mà mọi người đều nên thành thạo." }
            ]
          },
          {
            title: "Replying to an invitation",
            lines: [
              { speaker: "Max", "en": "I received an invitation to the annual charity dinner which will take place next month. I need to write a polite reply to confirm my attendance.", vi: "Tôi đã nhận được một lời mời tham dự bữa tối từ thiện thường niên cái mà sẽ diễn ra vào tháng tới. Tôi cần viết một câu trả lời lịch sự để xác nhận sự tham dự của mình." },
              { speaker: "Chloe", "en": "It is always a good idea to express your gratitude first when you reply to an invitation. You can say 'Thank you very much for inviting me'.", vi: "Luôn luôn là một ý tưởng hay khi bày tỏ sự biết ơn của bạn trước tiên khi bạn trả lời một lời mời. Bạn có thể nói 'Cảm ơn rất nhiều vì đã mời tôi'." },
              { speaker: "Max", "en": "I will write that down immediately. Furthermore, I must inform them that I am a vegetarian so they can prepare a suitable meal.", vi: "Tôi sẽ ghi lại điều đó ngay lập tức. Hơn nữa, tôi phải thông báo cho họ rằng tôi là người ăn chay để họ có thể chuẩn bị một bữa ăn phù hợp." },
              { speaker: "Chloe", "en": "You should add a brief sentence like 'Please note that I require a vegetarian menu'. The organizers usually appreciate knowing dietary requirements in advance.", vi: "Bạn nên thêm một câu ngắn gọn như 'Xin lưu ý rằng tôi yêu cầu một thực đơn ăn chay'. Những người tổ chức thường đánh giá cao việc biết trước các yêu cầu về chế độ ăn uống." },
              { speaker: "Max", "en": "I would also like to bring a guest with me, if it is allowed. How can I ask them politely without sounding too demanding?", vi: "Tôi cũng muốn dẫn theo một người khách đi cùng, nếu điều đó được cho phép. Tôi có thể hỏi họ một cách lịch sự như thế nào mà không nghe quá đòi hỏi?" },
              { speaker: "Chloe", "en": "You could write, 'I was wondering if it would be possible to bring a plus-one to the event'. It sounds very respectful and gentle.", vi: "Bạn có thể viết, 'Tôi tự hỏi liệu có khả năng mang theo một người đi cùng đến sự kiện không'. Nó nghe rất tôn trọng và nhẹ nhàng." },
              { speaker: "Max", "en": "That sounds perfect! I will end the letter by saying 'I look forward to attending the dinner'. Is there anything else which I should add?", vi: "Nghe hoàn hảo quá! Tôi sẽ kết thúc bức thư bằng cách nói 'Tôi mong đợi được tham dự bữa tối'. Có điều gì khác mà tôi nên thêm vào không?" },
              { speaker: "Chloe", "en": "No, your email is concise and covers all the necessary points. A well-written reply shows that you are a considerate person.", vi: "Không, email của bạn súc tích và bao hàm tất cả các điểm cần thiết. Một câu trả lời được viết tốt cho thấy rằng bạn là một người chu đáo." }
            ]
          }
        ]
      },
      {
        orderIndex: 31,
        dialogues: [
          {
            title: "Structuring a short essay",
            lines: [
              { speaker: "Sam", "en": "I have to write a short essay about the benefits of public transport, but I am struggling with the structure. How many paragraphs should I include?", vi: "Tôi phải viết một bài luận ngắn về những lợi ích của giao thông công cộng, nhưng tôi đang chật vật với cấu trúc. Tôi nên bao gồm bao nhiêu đoạn văn?" },
              { speaker: "Teacher", "en": "A standard short essay usually consists of four or five paragraphs. You should always start with an introduction which presents your main thesis.", vi: "Một bài luận ngắn tiêu chuẩn thường bao gồm bốn hoặc năm đoạn văn. Bạn nên luôn luôn bắt đầu với một phần mở bài cái mà trình bày luận điểm chính của bạn." },
              { speaker: "Sam", "en": "In the introduction, I will state that public transport reduces pollution and traffic jams. Then, I need to write the body paragraphs, don't I?", vi: "Trong phần mở bài, tôi sẽ tuyên bố rằng giao thông công cộng làm giảm ô nhiễm và tắc nghẽn giao thông. Sau đó, tôi cần viết các đoạn thân bài, phải không?" },
              { speaker: "Teacher", "en": "Exactly! Each body paragraph must focus on a single idea which supports your thesis. You ought to use linking words to connect your sentences smoothly.", vi: "Chính xác! Mỗi đoạn thân bài phải tập trung vào một ý tưởng duy nhất thứ mà củng cố luận điểm của bạn. Bạn nên sử dụng các từ nối để kết nối các câu của bạn một cách mượt mà." },
              { speaker: "Sam", "en": "For instance, I can use 'Furthermore' to add more information, and 'However' to show a contrasting point. Providing concrete examples is also important.", vi: "Ví dụ, tôi có thể sử dụng 'Hơn nữa' để thêm thông tin, và 'Tuy nhiên' để thể hiện một điểm tương phản. Việc cung cấp các ví dụ cụ thể cũng rất quan trọng." },
              { speaker: "Teacher", "en": "That is an excellent strategy, which will make your arguments much more convincing. Finally, you must write a conclusion to summarize your main points.", vi: "Đó là một chiến lược xuất sắc, điều này sẽ làm cho các lập luận của bạn thuyết phục hơn nhiều. Cuối cùng, bạn phải viết một phần kết luận để tóm tắt những điểm chính của bạn." },
              { speaker: "Sam", "en": "In the conclusion, I will restate my opinion without introducing any new ideas. Thank you for your guidance, which has been extremely helpful.", vi: "Trong phần kết luận, tôi sẽ khẳng định lại quan điểm của mình mà không đưa ra bất kỳ ý tưởng mới nào. Cảm ơn vì sự hướng dẫn của thầy, điều mà đã cực kỳ hữu ích." },
              { speaker: "Teacher", "en": "You are very welcome! Make sure you check your spelling and grammar before submitting the final draft.", vi: "Không có chi! Đảm bảo rằng bạn kiểm tra chính tả và ngữ pháp trước khi nộp bản nháp cuối cùng." }
            ]
          },
          {
            title: "Discussing an essay topic",
            lines: [
              { speaker: "Fiona", "en": "We have to write an opinion essay discussing whether technology makes people lazier. I personally believe that it does, because we rely on machines for everything.", vi: "Chúng ta phải viết một bài luận quan điểm thảo luận xem liệu công nghệ có làm con người lười biếng hơn không. Cá nhân tôi tin rằng nó có, bởi vì chúng ta dựa vào máy móc cho mọi thứ." },
              { speaker: "Leo", "en": "On the other hand, I think technology helps us work more efficiently. It saves us a lot of time which we can use for creative activities.", vi: "Mặt khác, tôi nghĩ công nghệ giúp chúng ta làm việc hiệu quả hơn. Nó tiết kiệm cho chúng ta rất nhiều thời gian thứ mà chúng ta có thể sử dụng cho các hoạt động sáng tạo." },
              { speaker: "Fiona", "en": "That is a valid point, but people nowadays spend hours scrolling through social media instead of exercising. Consequently, obesity rates have been rising significantly.", vi: "Đó là một điểm hợp lý, nhưng mọi người ngày nay dành hàng giờ lướt qua mạng xã hội thay vì tập thể dục. Hậu quả là, tỷ lệ béo phì đã và đang tăng lên đáng kể." },
              { speaker: "Leo", "en": "In contrast, many fitness applications, which track our daily steps, motivate people to stay active. Technology itself isn't bad; it depends on how we use it.", vi: "Ngược lại, nhiều ứng dụng thể dục, những thứ theo dõi số bước đi hàng ngày của chúng ta, thúc đẩy mọi người duy trì sự năng động. Bản thân công nghệ không xấu; nó phụ thuộc vào cách chúng ta sử dụng nó." },
              { speaker: "Fiona", "en": "I will include your perspective in my essay so as to provide a balanced argument. Acknowledging the opposite view makes the essay much stronger.", vi: "Tôi sẽ bao gồm góc nhìn của bạn trong bài luận của mình để đưa ra một lập luận cân bằng. Việc công nhận quan điểm đối lập làm cho bài luận mạnh mẽ hơn nhiều." },
              { speaker: "Leo", "en": "You should use phrases like 'Some people argue that' or 'Despite this fact' to introduce opposing views. It shows that you have analyzed the topic deeply.", vi: "Bạn nên sử dụng các cụm từ như 'Một số người tranh luận rằng' hoặc 'Bất chấp sự thật này' để giới thiệu các quan điểm đối lập. Nó cho thấy rằng bạn đã phân tích chủ đề một cách sâu sắc." },
              { speaker: "Fiona", "en": "I am going to start writing the introduction tonight, which will contain a strong hook to grab the reader's attention. Then, I will outline the body paragraphs.", vi: "Tôi dự định sẽ bắt đầu viết phần mở bài tối nay, phần mà sẽ chứa một câu dẫn dắt mạnh mẽ để thu hút sự chú ý của người đọc. Sau đó, tôi sẽ phác thảo các đoạn thân bài." },
              { speaker: "Leo", "en": "I am sure you will write a fantastic essay because you always express your ideas clearly. Let me know if you need someone to proofread it.", vi: "Tôi chắc chắn bạn sẽ viết một bài luận tuyệt vời vì bạn luôn diễn đạt các ý tưởng của mình một cách rõ ràng. Hãy cho tôi biết nếu bạn cần ai đó đọc rà soát nó." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 17: Bài 33 (orderIndex 32), Bài 34 (orderIndex 33)
  {
    fileName: 'pet-dialogue-cum17.json',
    lessons: [
      {
        orderIndex: 32,
        dialogues: [
          {
            title: "Listening to an interview",
            lines: [
              { speaker: "Interviewer", "en": "Welcome to our show! Today, we are talking to a wildlife photographer who has just returned from Africa. Could you describe your most exciting encounter?", vi: "Chào mừng đến với chương trình của chúng tôi! Hôm nay, chúng ta đang trò chuyện với một nhiếp ảnh gia động vật hoang dã người vừa mới trở về từ Châu Phi. Bạn có thể mô tả cuộc chạm trán thú vị nhất của bạn không?" },
              { speaker: "Photographer", "en": "Thank you for having me! The most thrilling moment was when I got incredibly close to a lion, which was resting under a tree.", vi: "Cảm ơn vì đã mời tôi! Khoảnh khắc hồi hộp nhất là khi tôi tiến đến gần vô cùng một con sư tử, con vật mà đang nghỉ ngơi dưới một gốc cây." },
              { speaker: "Interviewer", "en": "That sounds terrifying! Weren't you afraid that the lion might attack you while you were taking pictures?", vi: "Nghe có vẻ đáng sợ quá! Bạn đã không sợ rằng con sư tử có thể tấn công bạn trong khi bạn đang chụp ảnh sao?" },
              { speaker: "Photographer", "en": "I was inside a secure vehicle, which prevented any direct danger. However, my heart was beating so fast because the animal was staring right at me.", vi: "Tôi đang ở bên trong một phương tiện an toàn, thứ mà đã ngăn chặn bất kỳ mối nguy hiểm trực tiếp nào. Tuy nhiên, tim tôi đập rất nhanh vì con vật đang nhìn chằm chằm ngay vào tôi." },
              { speaker: "Interviewer", "en": "Your photographs, which have been published in major magazines, often highlight the fragile beauty of nature. What message do you want to convey to your audience?", vi: "Những bức ảnh của bạn, những bức đã được xuất bản trên các tạp chí lớn, thường làm nổi bật vẻ đẹp mong manh của thiên nhiên. Bạn muốn truyền tải thông điệp gì đến khán giả của mình?" },
              { speaker: "Photographer", "en": "I want people to realize that these majestic creatures will disappear unless we protect their habitats. Conservation is the most urgent issue which we are facing today.", vi: "Tôi muốn mọi người nhận ra rằng những sinh vật hùng vĩ này sẽ biến mất trừ khi chúng ta bảo vệ môi trường sống của chúng. Bảo tồn là vấn đề cấp bách nhất cái mà chúng ta đang đối mặt ngày nay." },
              { speaker: "Interviewer", "en": "It is definitely a powerful message which everyone needs to hear. Are you planning any new expeditions in the near future?", vi: "Đó chắc chắn là một thông điệp mạnh mẽ thông điệp mà mọi người đều cần nghe. Bạn có đang lên kế hoạch cho bất kỳ chuyến thám hiểm mới nào trong tương lai gần không?" },
              { speaker: "Photographer", "en": "Yes, I am traveling to the Amazon rainforest next month to document the endangered species there. I hope to capture some unique images.", vi: "Có, tôi sẽ đi đến rừng mưa Amazon vào tháng tới để ghi liệu về các loài có nguy cơ tuyệt chủng ở đó. Tôi hy vọng sẽ chụp được một số hình ảnh độc đáo." }
            ]
          },
          {
            title: "Discussing a radio broadcast",
            lines: [
              { speaker: "Emma", "en": "Did you listen to the radio interview with the local mayor this morning? He announced several new policies which will affect our neighborhood directly.", vi: "Bạn có nghe cuộc phỏng vấn trên đài phát thanh với thị trưởng địa phương sáng nay không? Ông ấy đã công bố một số chính sách mới những chính sách sẽ ảnh hưởng trực tiếp đến khu phố của chúng ta." },
              { speaker: "Daniel", "en": "I missed it because I was driving to work, but I heard some rumors. Did he mention anything about the new park which is being built?", vi: "Tôi đã bỏ lỡ nó vì tôi đang lái xe đến chỗ làm, nhưng tôi có nghe vài lời đồn. Ông ấy có đề cập bất cứ điều gì về công viên mới cái mà đang được xây dựng không?" },
              { speaker: "Emma", "en": "Yes, he confirmed that the park will be completed by next spring. Furthermore, a new sports center will be constructed right next to it.", vi: "Có, ông ấy xác nhận rằng công viên sẽ được hoàn thành trước mùa xuân tới. Hơn nữa, một trung tâm thể thao mới sẽ được xây dựng ngay cạnh nó." },
              { speaker: "Daniel", "en": "That is brilliant news because we definitely lack recreational facilities in this area. Who is going to fund these expensive projects?", vi: "Đó là một tin tuyệt vời vì chúng ta chắc chắn đang thiếu các cơ sở giải trí trong khu vực này. Ai sẽ tài trợ cho những dự án đắt đỏ này?" },
              { speaker: "Emma", "en": "The projects will be funded by a combination of government grants and private donations. A famous businessman, whose name wasn't revealed, has donated a large sum.", vi: "Các dự án sẽ được tài trợ bởi sự kết hợp của các khoản trợ cấp chính phủ và các khoản quyên góp tư nhân. Một doanh nhân nổi tiếng, người có tên không được tiết lộ, đã quyên góp một số tiền lớn." },
              { speaker: "Daniel", "en": "It is always good to see wealthy individuals supporting the local community. Did the mayor talk about the traffic congestion problem?", vi: "Luôn luôn là điều tốt khi thấy những cá nhân giàu có hỗ trợ cộng đồng địa phương. Thị trưởng có nói về vấn đề tắc nghẽn giao thông không?" },
              { speaker: "Emma", "en": "He promised that the main roads would be expanded to reduce the traffic jams. However, this construction work might cause some temporary inconvenience for commuters.", vi: "Ông ấy hứa rằng các con đường chính sẽ được mở rộng để giảm thiểu tắc nghẽn giao thông. Tuy nhiên, công việc xây dựng này có thể gây ra một số bất tiện tạm thời cho người đi lại." },
              { speaker: "Daniel", "en": "I don't mind a little inconvenience if the long-term results are beneficial. I will listen to the podcast version of the interview tonight.", vi: "Tôi không ngại một chút bất tiện nếu các kết quả dài hạn mang lại lợi ích. Tôi sẽ nghe phiên bản podcast của cuộc phỏng vấn vào tối nay." }
            ]
          }
        ]
      },
      {
        orderIndex: 33,
        dialogues: [
          {
            title: "Presenting an opinion",
            lines: [
              { speaker: "Alice", "en": "In my opinion, learning a foreign language is the most valuable skill which a student can acquire. It opens up completely new worlds of opportunities.", vi: "Theo ý kiến của tôi, học một ngoại ngữ là kỹ năng giá trị nhất cái mà một sinh viên có thể có được. Nó mở ra những thế giới cơ hội hoàn toàn mới." },
              { speaker: "Mark", "en": "I partially agree with you, but I believe that computer programming is even more important nowadays. Everything in our modern society relies on technology.", vi: "Tôi đồng ý một phần với bạn, nhưng tôi tin rằng lập trình máy tính thậm chí còn quan trọng hơn ngày nay. Mọi thứ trong xã hội hiện đại của chúng ta đều dựa vào công nghệ." },
              { speaker: "Alice", "en": "Programming is definitely crucial, yet language skills allow us to connect with different cultures deeply. Without effective communication, global cooperation would be impossible.", vi: "Lập trình chắc chắn là cốt yếu, song các kỹ năng ngôn ngữ cho phép chúng ta kết nối với những nền văn hóa khác nhau một cách sâu sắc. Không có giao tiếp hiệu quả, sự hợp tác toàn cầu sẽ là bất khả thi." },
              { speaker: "Mark", "en": "That is a fair point, which highlights the importance of human connections. However, artificial intelligence can now translate languages almost instantly.", vi: "Đó là một điểm hợp lý, cái mà làm nổi bật tầm quan trọng của các kết nối con người. Tuy nhiên, trí tuệ nhân tạo giờ đây có thể dịch các ngôn ngữ gần như ngay lập tức." },
              { speaker: "Alice", "en": "While AI translators are useful, they cannot understand the subtle emotions and cultural nuances which exist in human speech. A machine cannot replace genuine empathy.", vi: "Trong khi các trình dịch AI hữu ích, chúng không thể hiểu được những cảm xúc tinh tế và những sắc thái văn hóa những thứ tồn tại trong lời nói của con người. Một cỗ máy không thể thay thế sự đồng cảm chân thực." },
              { speaker: "Mark", "en": "You have a very convincing argument, and I must admit that you are right. Speaking to someone in their native language builds immediate trust.", vi: "Bạn có một lập luận rất thuyết phục, và tôi phải thừa nhận rằng bạn đúng. Việc nói chuyện với ai đó bằng ngôn ngữ mẹ đẻ của họ xây dựng sự tin tưởng ngay lập tức." },
              { speaker: "Alice", "en": "Therefore, schools should encourage students to learn both technical skills and foreign languages. Both areas are essential for a well-rounded education.", vi: "Do đó, các trường học nên khuyến khích học sinh học cả kỹ năng kỹ thuật và ngoại ngữ. Cả hai lĩnh vực đều thiết yếu cho một nền giáo dục toàn diện." },
              { speaker: "Mark", "en": "I completely support that idea, which would prepare young people for the complex future. We need professionals who are both tech-savvy and culturally aware.", vi: "Tôi hoàn toàn ủng hộ ý tưởng đó, điều mà sẽ chuẩn bị cho những người trẻ tuổi đối phó với tương lai phức tạp. Chúng ta cần những chuyên gia những người vừa am hiểu công nghệ vừa có nhận thức văn hóa." }
            ]
          },
          {
            title: "Discussing the best way to travel",
            lines: [
              { speaker: "Sophie", "en": "I firmly believe that traveling by train is the best way to explore Europe. You can enjoy the breathtaking scenery while relaxing in a comfortable seat.", vi: "Tôi tin chắc rằng đi du lịch bằng tàu hỏa là cách tốt nhất để khám phá Châu Âu. Bạn có thể thưởng thức phong cảnh ngoạn mục trong khi thư giãn trên một chỗ ngồi thoải mái." },
              { speaker: "Jack", "en": "I see your point, but flying is much faster and often cheaper if you book in advance. Time is very precious when you only have a short holiday.", vi: "Tôi hiểu ý của bạn, nhưng đi máy bay nhanh hơn nhiều và thường rẻ hơn nếu bạn đặt trước. Thời gian rất quý giá khi bạn chỉ có một kỳ nghỉ ngắn." },
              { speaker: "Sophie", "en": "Airports are usually located far from the city centers, which makes the whole journey quite exhausting. Trains take you directly to the heart of the city.", vi: "Các sân bay thường tọa lạc xa trung tâm thành phố, điều này làm cho toàn bộ hành trình khá mệt mỏi. Tàu hỏa đưa bạn trực tiếp đến trung tâm của thành phố." },
              { speaker: "Jack", "en": "That is true, although you can always take a quick taxi from the airport. Furthermore, low-cost airlines have revolutionized the way we travel.", vi: "Điều đó đúng, mặc dù bạn luôn có thể đi một chiếc taxi nhanh từ sân bay. Hơn nữa, các hãng hàng không giá rẻ đã cách mạng hóa cách chúng ta đi du lịch." },
              { speaker: "Sophie", "en": "However, we must consider the environmental impact, which is a significant concern today. Trains produce much lower carbon emissions compared to airplanes.", vi: "Tuy nhiên, chúng ta phải cân nhắc tác động môi trường, thứ mà là một mối quan tâm đáng kể ngày nay. Tàu hỏa tạo ra lượng khí thải carbon thấp hơn nhiều so với máy bay." },
              { speaker: "Jack", "en": "I agree that sustainability is important, and many airlines are trying to become greener. I suppose the choice depends on the specific destination and distance.", vi: "Tôi đồng ý rằng tính bền vững là quan trọng, và nhiều hãng hàng không đang cố gắng trở nên xanh hơn. Tôi cho rằng sự lựa chọn phụ thuộc vào điểm đến và khoảng cách cụ thể." },
              { speaker: "Sophie", "en": "Exactly! If I travel to a neighboring country, I will always choose the train. It is a more romantic and peaceful way to travel.", vi: "Chính xác! Nếu tôi đi du lịch đến một quốc gia láng giềng, tôi sẽ luôn chọn tàu hỏa. Nó là một cách đi du lịch lãng mạn và yên bình hơn." },
              { speaker: "Jack", "en": "You have persuaded me to try taking a train for my next trip to Paris. I look forward to reading a book while watching the countryside roll by.", vi: "Bạn đã thuyết phục được tôi thử đi tàu hỏa cho chuyến đi tiếp theo đến Paris. Tôi mong đợi việc đọc một cuốn sách trong khi ngắm nhìn vùng nông thôn trôi qua." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 18: Bài 35 (orderIndex 34), Bài 36 (orderIndex 35)
  {
    fileName: 'pet-dialogue-cum18.json',
    lessons: [
      {
        orderIndex: 34,
        dialogues: [
          {
            title: "Group project discussion",
            lines: [
              { speaker: "Emma", "en": "Let's discuss how we should organize our group presentation about renewable energy. I suggest that we divide the topic into three main sections.", vi: "Hãy thảo luận về cách chúng ta nên tổ chức bài thuyết trình nhóm của mình về năng lượng tái tạo. Tôi đề nghị rằng chúng ta chia chủ đề thành ba phần chính." },
              { speaker: "Lucas", "en": "That sounds like a logical approach, which will make the presentation easier to follow. I can take the section which explains solar power technologies.", vi: "Đó nghe có vẻ là một cách tiếp cận hợp lý, điều sẽ làm cho bài thuyết trình dễ theo dõi hơn. Tôi có thể đảm nhận phần cái mà giải thích các công nghệ năng lượng mặt trời." },
              { speaker: "Sophia", "en": "I would like to focus on wind energy, because I have already done some research on it. The statistics which I found are quite shocking.", vi: "Tôi muốn tập trung vào năng lượng gió, bởi vì tôi đã thực hiện vài nghiên cứu về nó rồi. Những số liệu thống kê mà tôi tìm thấy khá là gây sốc." },
              { speaker: "Emma", "en": "That leaves me with hydropower and the conclusion, which is absolutely fine with me. We must ensure that our sections flow smoothly into one another.", vi: "Vậy là để lại cho tôi thủy điện và phần kết luận, điều này hoàn toàn ổn đối với tôi. Chúng ta phải đảm bảo rằng các phần của chúng ta trôi chảy mượt mà với nhau." },
              { speaker: "Lucas", "en": "We should also prepare some visual aids to make the data more understandable. Graphs and charts are usually very effective in capturing the audience's attention.", vi: "Chúng ta cũng nên chuẩn bị một số thiết bị hỗ trợ hình ảnh để làm cho dữ liệu dễ hiểu hơn. Đồ thị và biểu đồ thường rất hiệu quả trong việc thu hút sự chú ý của khán giả." },
              { speaker: "Sophia", "en": "I completely agree, and I can design the PowerPoint slides if you guys send me your notes. We ought to keep the text on the slides minimal.", vi: "Tôi hoàn toàn đồng ý, và tôi có thể thiết kế các slide PowerPoint nếu các bạn gửi cho tôi ghi chú của các bạn. Chúng ta nên giữ cho văn bản trên các slide ở mức tối thiểu." },
              { speaker: "Emma", "en": "That is a great idea, because the audience should listen to us rather than read the slides. Let's meet again on Thursday to practice our speech together.", vi: "Đó là một ý tưởng tuyệt vời, bởi vì khán giả nên lắng nghe chúng ta thay vì đọc các slide. Hãy gặp lại nhau vào thứ Năm để cùng luyện tập bài phát biểu của chúng ta." },
              { speaker: "Lucas", "en": "Perfect! I will email my draft to both of you tonight so that we have enough time to review it.", vi: "Hoàn hảo! Tôi sẽ gửi email bản nháp của mình cho cả hai bạn tối nay để chúng ta có đủ thời gian xem xét nó." }
            ]
          },
          {
            title: "Planning a class party",
            lines: [
              { speaker: "Liam", "en": "We need to plan the end-of-year class party, which is happening next Friday. Has anyone come up with a good theme for the event yet?", vi: "Chúng ta cần lên kế hoạch cho bữa tiệc lớp cuối năm, cái mà sẽ diễn ra vào thứ Sáu tới. Đã có ai nghĩ ra một chủ đề hay cho sự kiện chưa?" },
              { speaker: "Chloe", "en": "I think a Hollywood movie theme would be incredibly fun and easy to organize. Everyone could dress up as their favorite movie character.", vi: "Tôi nghĩ một chủ đề phim Hollywood sẽ vô cùng thú vị và dễ tổ chức. Mọi người có thể hóa trang thành nhân vật điện ảnh yêu thích của họ." },
              { speaker: "Noah", "en": "That is a brilliant idea, which will definitely encourage people to participate. We should also set up a photo booth with some funny props.", vi: "Đó là một ý tưởng xuất sắc, điều chắc chắn sẽ khuyến khích mọi người tham gia. Chúng ta cũng nên dựng một gian hàng chụp ảnh với một số đạo cụ vui nhộn." },
              { speaker: "Liam", "en": "What about the food and drinks? If we order pizza, it will be much cheaper than hiring a catering service.", vi: "Còn về thức ăn và đồ uống thì sao? Nếu chúng ta đặt pizza, nó sẽ rẻ hơn nhiều so với việc thuê một dịch vụ phục vụ ăn uống." },
              { speaker: "Chloe", "en": "Pizza is a safe choice which everyone usually enjoys. I can bake some cupcakes for dessert, because I love baking.", vi: "Pizza là một sự lựa chọn an toàn thứ mà mọi người thường thích. Tôi có thể nướng một ít bánh nướng xốp cho món tráng miệng, bởi vì tôi thích nướng bánh." },
              { speaker: "Noah", "en": "I will take responsibility for the music playlist, which is crucial for a good party. I will ask our classmates to suggest their favorite songs.", vi: "Tôi sẽ chịu trách nhiệm cho danh sách phát nhạc, thứ rất cốt yếu cho một bữa tiệc hay. Tôi sẽ nhờ các bạn cùng lớp đề xuất những bài hát yêu thích của họ." },
              { speaker: "Liam", "en": "We also need someone to decorate the classroom before the party starts. Who is willing to help me hang the balloons and posters?", vi: "Chúng ta cũng cần ai đó trang trí lớp học trước khi bữa tiệc bắt đầu. Ai sẵn lòng giúp tôi treo bóng bay và áp phích?" },
              { speaker: "Chloe", "en": "I will come early to help you, and I am sure Noah will lend a hand too. Let's make this the best party which our class has ever had!", vi: "Tôi sẽ đến sớm để giúp bạn, và tôi chắc chắn Noah cũng sẽ giúp một tay. Hãy biến đây thành bữa tiệc tuyệt vời nhất mà lớp chúng ta từng có!" }
            ]
          }
        ]
      },
      {
        orderIndex: 35,
        dialogues: [
          {
            title: "Grammar review session",
            lines: [
              { speaker: "Student A", "en": "I am still confused about when to use the present perfect and the past simple. Can you explain the difference, which always tricks me during exams?", vi: "Tôi vẫn còn bối rối về việc khi nào thì sử dụng thì hiện tại hoàn thành và quá khứ đơn. Bạn có thể giải thích sự khác biệt, thứ mà luôn đánh lừa tôi trong các kỳ thi không?" },
              { speaker: "Student B", "en": "We use the past simple for actions which were completed in the past at a specific time. For example, 'I visited Paris last year'.", vi: "Chúng ta sử dụng thì quá khứ đơn cho những hành động đã được hoàn thành trong quá khứ tại một thời điểm cụ thể. Ví dụ, 'Tôi đã đến thăm Paris năm ngoái'." },
              { speaker: "Student A", "en": "Ah, I see! And the present perfect is used for experiences which happen at an unspecified time in the past. Like 'I have visited Paris twice'.", vi: "À, tôi hiểu rồi! Và thì hiện tại hoàn thành được sử dụng cho những trải nghiệm diễn ra tại một thời điểm không xác định trong quá khứ. Giống như 'Tôi đã đến thăm Paris hai lần'." },
              { speaker: "Student B", "en": "Exactly! The present perfect also connects a past action to the present moment. For instance, 'I have lost my keys, so I can't enter the house'.", vi: "Chính xác! Thì hiện tại hoàn thành cũng kết nối một hành động trong quá khứ với thời điểm hiện tại. Chẳng hạn, 'Tôi đã đánh mất chìa khóa của mình, nên tôi không thể vào nhà'." },
              { speaker: "Student A", "en": "What about the passive voice? I often forget to include the verb 'to be' when I transform the sentences.", vi: "Thế còn thể bị động thì sao? Tôi thường quên bao gồm động từ 'to be' khi tôi chuyển đổi các câu." },
              { speaker: "Student B", "en": "The passive voice is formed by using 'to be' plus the past participle. For example, 'The letter was written by John'.", vi: "Thể bị động được hình thành bằng cách sử dụng 'to be' cộng với quá khứ phân từ. Ví dụ, 'Bức thư đã được viết bởi John'." },
              { speaker: "Student A", "en": "That makes it much clearer, and I will practice writing more sentences tonight. Grammar rules become easier once you understand the logic behind them.", vi: "Điều đó làm nó rõ ràng hơn nhiều, và tôi sẽ luyện tập viết thêm nhiều câu vào tối nay. Các quy tắc ngữ pháp trở nên dễ dàng hơn một khi bạn hiểu được logic đằng sau chúng." },
              { speaker: "Student B", "en": "If you need more help, we can review the conditional sentences together tomorrow. Practicing with a partner is the best way to learn.", vi: "Nếu bạn cần thêm sự giúp đỡ, chúng ta có thể cùng nhau ôn lại các câu điều kiện vào ngày mai. Luyện tập với một người bạn là cách tốt nhất để học." }
            ]
          },
          {
            title: "Discussing tricky grammar rules",
            lines: [
              { speaker: "David", "en": "I always make mistakes when I use gerunds and infinitives in my essays. Is there a simple rule which can help me remember them?", vi: "Tôi luôn mắc lỗi khi tôi sử dụng danh động từ và động từ nguyên thể trong các bài luận của mình. Có quy tắc đơn giản nào có thể giúp tôi nhớ chúng không?" },
              { speaker: "Sarah", "en": "There is no single rule, but certain verbs are always followed by a gerund. For instance, you should say 'I enjoy reading', not 'I enjoy to read'.", vi: "Không có một quy tắc duy nhất nào, nhưng một số động từ nhất định luôn được theo sau bởi một danh động từ. Chẳng hạn, bạn nên nói 'I enjoy reading', chứ không phải 'I enjoy to read'." },
              { speaker: "David", "en": "I also struggle with reported speech, especially when I have to change the tenses. It gets very complicated when the original sentence is a question.", vi: "Tôi cũng chật vật với câu tường thuật, đặc biệt là khi tôi phải lùi thì. Nó trở nên rất phức tạp khi câu gốc là một câu hỏi." },
              { speaker: "Sarah", "en": "When you report a question, you must change the word order to a normal statement. You don't use 'do' or 'does' in reported questions.", vi: "Khi bạn tường thuật một câu hỏi, bạn phải thay đổi trật tự từ thành một câu trần thuật bình thường. Bạn không sử dụng 'do' hoặc 'does' trong các câu hỏi tường thuật." },
              { speaker: "David", "en": "So, 'Where do you live?' becomes 'He asked me where I lived'. That actually makes perfect sense when you explain it like that.", vi: "Vậy, 'Bạn sống ở đâu?' trở thành 'Anh ấy đã hỏi tôi rằng tôi sống ở đâu'. Điều đó thực sự hoàn toàn có lý khi bạn giải thích nó như vậy." },
              { speaker: "Sarah", "en": "Yes, and remember to shift the tense back if the reporting verb is in the past. Constant practice is the key to mastering these rules.", vi: "Đúng vậy, và hãy nhớ lùi thì lại nếu động từ tường thuật ở trong quá khứ. Sự luyện tập liên tục là chìa khóa để thành thạo những quy tắc này." },
              { speaker: "David", "en": "I will complete the exercises which the teacher assigned us for homework. If I make any mistakes, I will ask you to correct them.", vi: "Tôi sẽ hoàn thành các bài tập những bài mà giáo viên đã giao cho chúng ta làm bài tập về nhà. Nếu tôi mắc bất kỳ lỗi nào, tôi sẽ nhờ bạn sửa chúng." },
              { speaker: "Sarah", "en": "I would be glad to help you anytime. Don't stress too much, because everyone finds these grammar points challenging at first.", vi: "Tôi sẽ rất vui lòng giúp bạn bất cứ lúc nào. Đừng quá căng thẳng, bởi vì lúc đầu mọi người đều thấy những điểm ngữ pháp này mang tính thử thách." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 19: Bài 37 (orderIndex 36), Bài 38 (orderIndex 37)
  {
    fileName: 'pet-dialogue-cum19.json',
    lessons: [
      {
        orderIndex: 36,
        dialogues: [
          {
            title: "Vocabulary review game",
            lines: [
              { speaker: "Teacher", "en": "Today we are going to review the vocabulary which we have learned during this course. Let's play a game where you have to guess the word from its definition.", vi: "Hôm nay chúng ta sẽ ôn lại từ vựng những từ mà chúng ta đã học trong suốt khóa học này. Hãy chơi một trò chơi nơi các em phải đoán từ dựa vào định nghĩa của nó." },
              { speaker: "Student", "en": "That sounds like a lot of fun, and it will help us prepare for the final test. I am ready for the first definition.", vi: "Nghe có vẻ rất vui, và nó sẽ giúp chúng em chuẩn bị cho bài kiểm tra cuối kỳ. Em đã sẵn sàng cho định nghĩa đầu tiên." },
              { speaker: "Teacher", "en": "What is the adjective which describes a person who always expects good things to happen? This person usually has a positive attitude.", vi: "Tính từ nào mô tả một người luôn mong đợi những điều tốt đẹp xảy ra? Người này thường có một thái độ tích cực." },
              { speaker: "Student", "en": "The word is 'optimistic', which is the opposite of 'pessimistic'. My best friend is very optimistic, even when things go wrong.", vi: "Từ đó là 'optimistic' (lạc quan), thứ mà trái nghĩa với 'pessimistic' (bi quan). Bạn thân nhất của em rất lạc quan, ngay cả khi mọi việc đi chệch hướng." },
              { speaker: "Teacher", "en": "Excellent! Now, what is the noun which refers to the people who live in a particular area? They form a society together.", vi: "Xuất sắc! Bây giờ, danh từ nào dùng để chỉ những người sống trong một khu vực cụ thể? Họ cùng nhau tạo thành một xã hội." },
              { speaker: "Student", "en": "That must be a 'community', which is an important concept in our social studies class. People in a strong community always support each other.", vi: "Đó chắc hẳn là 'community' (cộng đồng), đó là một khái niệm quan trọng trong lớp học nghiên cứu xã hội của chúng em. Những người trong một cộng đồng vững mạnh luôn hỗ trợ lẫn nhau." },
              { speaker: "Teacher", "en": "You are absolutely right. Learning vocabulary in context is much more effective than memorizing a long list of words.", vi: "Em hoàn toàn đúng. Việc học từ vựng trong ngữ cảnh thì hiệu quả hơn nhiều so với việc ghi nhớ một danh sách dài các từ." },
              { speaker: "Student", "en": "I agree, because knowing the definition helps me use the word correctly in my sentences. This game is incredibly helpful for my revision.", vi: "Em đồng ý, bởi vì việc biết định nghĩa giúp em sử dụng từ đó một cách chính xác trong các câu của mình. Trò chơi này vô cùng hữu ích cho việc ôn tập của em." }
            ]
          },
          {
            title: "Discussing word building",
            lines: [
              { speaker: "Alex", "en": "I often lose marks because I use the wrong form of a word in the writing test. I need to improve my knowledge of prefixes and suffixes.", vi: "Tôi thường bị mất điểm vì tôi sử dụng sai dạng của một từ trong bài kiểm tra viết. Tôi cần cải thiện kiến thức của mình về tiền tố và hậu tố." },
              { speaker: "Emma", "en": "Word building is very important, because it allows you to expand your vocabulary quickly. For example, if you know the verb 'manage', you can form the noun 'management'.", vi: "Việc cấu tạo từ là rất quan trọng, bởi vì nó cho phép bạn mở rộng vốn từ vựng của mình một cách nhanh chóng. Ví dụ, nếu bạn biết động từ 'manage', bạn có thể tạo thành danh từ 'management'." },
              { speaker: "Alex", "en": "Yes, and the adjective is 'manageable', which describes a task that can be done easily. What about the negative prefix for 'patient'?", vi: "Đúng vậy, và tính từ là 'manageable' (có thể quản lý được), cái mà mô tả một nhiệm vụ có thể được thực hiện dễ dàng. Còn tiền tố mang nghĩa phủ định của 'patient' (kiên nhẫn) thì sao?" },
              { speaker: "Emma", "en": "The negative form is 'impatient', which describes someone who hates waiting. Another useful suffix is '-ful', which turns a noun into an adjective, like 'careful'.", vi: "Dạng phủ định là 'impatient' (thiếu kiên nhẫn), cái mà mô tả một người rất ghét việc phải chờ đợi. Một hậu tố hữu ích khác là '-ful', thứ mà biến một danh từ thành một tính từ, giống như 'careful' (cẩn thận)." },
              { speaker: "Alex", "en": "And the opposite of 'careful' is 'careless', which uses the suffix '-less' to mean 'without'. This method makes learning new words much more logical.", vi: "Và từ trái nghĩa của 'careful' là 'careless' (bất cẩn), từ mà sử dụng hậu tố '-less' để mang ý nghĩa 'không có'. Phương pháp này làm cho việc học các từ mới trở nên logic hơn nhiều." },
              { speaker: "Emma", "en": "Exactly! You should create a table in your notebook which lists the verb, noun, adjective, and adverb forms of common words.", vi: "Chính xác! Bạn nên tạo một bảng trong cuốn sổ tay của mình cái mà liệt kê các dạng động từ, danh từ, tính từ và trạng từ của những từ thông dụng." },
              { speaker: "Alex", "en": "I will do that tonight, which will definitely help me score higher in the exam. Thank you for sharing this brilliant study tip with me.", vi: "Tôi sẽ làm điều đó vào tối nay, điều này chắc chắn sẽ giúp tôi đạt điểm cao hơn trong kỳ thi. Cảm ơn vì đã chia sẻ mẹo học tập xuất sắc này với tôi." },
              { speaker: "Emma", "en": "You are welcome. We can test each other tomorrow to see how many word families we have memorized successfully.", vi: "Không có chi. Ngày mai chúng ta có thể kiểm tra lẫn nhau để xem chúng ta đã ghi nhớ thành công được bao nhiêu họ từ." }
            ]
          }
        ]
      },
      {
        orderIndex: 37,
        dialogues: [
          {
            title: "Mock test strategy",
            lines: [
              { speaker: "Oliver", "en": "The mock test is scheduled for tomorrow morning, and I feel a bit nervous about the reading section. It is always the most difficult part for me.", vi: "Bài kiểm tra thử được lên lịch vào sáng mai, và tôi cảm thấy hơi lo lắng về phần đọc. Nó luôn là phần khó nhất đối với tôi." },
              { speaker: "Sophia", "en": "You shouldn't panic, because the mock test is just a tool which helps us identify our weaknesses. You must read the questions carefully before you read the text.", vi: "Bạn không nên hoảng sợ, bởi vì bài kiểm tra thử chỉ là một công cụ thứ mà giúp chúng ta xác định những điểm yếu của mình. Bạn phải đọc kỹ các câu hỏi trước khi bạn đọc văn bản." },
              { speaker: "Oliver", "en": "That is a good strategy, which saves a lot of time during the exam. I often waste time reading every single word slowly.", vi: "Đó là một chiến lược tốt, điều này giúp tiết kiệm rất nhiều thời gian trong suốt kỳ thi. Tôi thường lãng phí thời gian khi đọc thật chậm từng từ một." },
              { speaker: "Sophia", "en": "You should practice skimming and scanning, which are essential techniques for finding information quickly. Don't worry if you don't understand every vocabulary word.", vi: "Bạn nên luyện tập đọc lướt và đọc quét, những kỹ thuật thiết yếu để tìm thông tin một cách nhanh chóng. Đừng lo lắng nếu bạn không hiểu tất cả các từ vựng." },
              { speaker: "Oliver", "en": "I will try to guess the meaning of unknown words from the context. What advice do you have for the writing section?", vi: "Tôi sẽ cố gắng đoán nghĩa của các từ chưa biết từ ngữ cảnh. Bạn có lời khuyên nào cho phần viết không?" },
              { speaker: "Sophia", "en": "You must plan your essay before you start writing, so that your ideas are organized logically. Make sure you leave five minutes at the end to check for errors.", vi: "Bạn phải lập dàn ý cho bài luận của mình trước khi bạn bắt đầu viết, để các ý tưởng của bạn được tổ chức một cách logic. Đảm bảo rằng bạn để lại năm phút ở cuối để kiểm tra các lỗi." },
              { speaker: "Oliver", "en": "I always forget to check my spelling, which causes me to lose silly marks. I will definitely set a timer tomorrow to manage my time better.", vi: "Tôi luôn quên kiểm tra chính tả của mình, điều đó khiến tôi bị mất những điểm số ngớ ngẩn. Ngày mai tôi chắc chắn sẽ đặt hẹn giờ để quản lý thời gian của mình tốt hơn." },
              { speaker: "Sophia", "en": "Time management is the key to success in any exam. Just get a good night's sleep tonight so that your brain is fresh tomorrow.", vi: "Quản lý thời gian là chìa khóa dẫn đến thành công trong bất kỳ kỳ thi nào. Chỉ cần có một giấc ngủ ngon đêm nay để não bộ của bạn thật sảng khoái vào ngày mai." }
            ]
          },
          {
            title: "Reviewing test results",
            lines: [
              { speaker: "Jack", "en": "I received the results of my mock test today, and I am quite disappointed with my score in the listening section. I missed several important details in the second recording.", vi: "Hôm nay tôi đã nhận được kết quả của bài kiểm tra thử, và tôi khá thất vọng với điểm số của mình ở phần nghe. Tôi đã bỏ lỡ vài chi tiết quan trọng trong đoạn ghi âm thứ hai." },
              { speaker: "Teacher", "en": "Don't be discouraged, because the listening tracks were deliberately chosen to challenge you. The speakers in the recording talked very fast and used complex vocabulary.", vi: "Đừng nản lòng, bởi vì các đoạn băng nghe đã được cố tình lựa chọn để thử thách bạn. Những người nói trong đoạn ghi âm đã nói rất nhanh và sử dụng từ vựng phức tạp." },
              { speaker: "Jack", "en": "I found it difficult to concentrate when there was background noise in the audio. What should I do to improve my listening comprehension skills?", vi: "Tôi thấy khó tập trung khi có tiếng ồn xung quanh trong đoạn âm thanh. Tôi nên làm gì để cải thiện kỹ năng nghe hiểu của mình?" },
              { speaker: "Teacher", "en": "You should listen to English podcasts or news broadcasts every day, which will train your ears to understand different accents. Exposure to natural speech is extremely beneficial.", vi: "Bạn nên nghe podcast hoặc các bản tin tiếng Anh mỗi ngày, điều này sẽ rèn luyện đôi tai của bạn hiểu được các giọng khác nhau. Việc tiếp xúc với lời nói tự nhiên là cực kỳ có lợi." },
              { speaker: "Jack", "en": "That makes sense, and I will start listening to a BBC program tomorrow morning. However, I am very happy with my writing score, which was the highest in the class.", vi: "Điều đó có lý, và tôi sẽ bắt đầu nghe một chương trình của BBC vào sáng mai. Tuy nhiên, tôi rất hài lòng với điểm viết của mình, điểm số mà cao nhất trong lớp." },
              { speaker: "Teacher", "en": "Your essay was wonderfully structured, and you used a wide range of advanced grammatical forms. You should maintain that high standard for the final exam.", vi: "Bài luận của bạn đã được cấu trúc một cách tuyệt vời, và bạn đã sử dụng đa dạng các dạng ngữ pháp nâng cao. Bạn nên duy trì tiêu chuẩn cao đó cho bài kiểm tra cuối kỳ." },
              { speaker: "Jack", "en": "I will review the mistakes which I made in the listening test tonight. Understanding my errors will prevent me from repeating them in the future.", vi: "Tối nay tôi sẽ xem xét lại những lỗi mà tôi đã mắc phải trong bài kiểm tra nghe. Việc hiểu rõ những lỗi sai của mình sẽ ngăn tôi lặp lại chúng trong tương lai." },
              { speaker: "Teacher", "en": "That is the perfect attitude to have towards learning. If you keep practicing diligently, you will definitely achieve a great result in the real exam.", vi: "Đó là thái độ hoàn hảo để có đối với việc học. Nếu bạn tiếp tục luyện tập một cách siêng năng, bạn chắc chắn sẽ đạt được một kết quả tuyệt vời trong kỳ thi thực tế." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 20: Bài 39 (orderIndex 38), Bài 40 (orderIndex 39)
  {
    fileName: 'pet-dialogue-cum20.json',
    lessons: [
      {
        orderIndex: 38,
        dialogues: [
          {
            title: "Speaking test practice",
            lines: [
              { speaker: "Examiner", "en": "Good morning. In this part of the test, I am going to give each of you a photograph. I would like you to describe what you can see in the picture.", vi: "Chào buổi sáng. Trong phần này của bài kiểm tra, tôi sẽ đưa cho mỗi bạn một bức ảnh. Tôi muốn bạn mô tả những gì bạn có thể nhìn thấy trong bức tranh." },
              { speaker: "Candidate", "en": "In this photograph, I can see a family who are enjoying a picnic in a beautiful park. The weather seems to be very sunny and pleasant.", vi: "Trong bức ảnh này, tôi có thể nhìn thấy một gia đình những người đang tận hưởng một chuyến dã ngoại trong một công viên tuyệt đẹp. Thời tiết có vẻ rất nắng và dễ chịu." },
              { speaker: "Examiner", "en": "That is a good start. Could you tell me more about the people and what they are doing? Try to use a variety of descriptive adjectives.", vi: "Đó là một khởi đầu tốt. Bạn có thể cho tôi biết thêm về những người đó và họ đang làm gì không? Hãy cố gắng sử dụng đa dạng các tính từ miêu tả." },
              { speaker: "Candidate", "en": "The father, who is wearing a blue shirt, is pouring some juice into the glasses. The mother is smiling brightly while she is cutting a large sandwich.", vi: "Người cha, người đang mặc một chiếc áo sơ mi xanh, đang rót một ít nước trái cây vào những chiếc ly. Người mẹ đang mỉm cười rạng rỡ trong khi cô ấy đang cắt một chiếc bánh sandwich lớn." },
              { speaker: "Examiner", "en": "Excellent. Now, why do you think they decided to have a picnic today instead of eating at a restaurant?", vi: "Xuất sắc. Bây giờ, tại sao bạn nghĩ rằng họ đã quyết định đi dã ngoại hôm nay thay vì ăn tại một nhà hàng?" },
              { speaker: "Candidate", "en": "I think they chose to have a picnic because spending time in nature is very relaxing. Furthermore, it is a great way for children to play outside freely.", vi: "Tôi nghĩ họ đã chọn đi dã ngoại bởi vì việc dành thời gian trong thiên nhiên là rất thư giãn. Hơn nữa, nó là một cách tuyệt vời để trẻ em được tự do chơi đùa bên ngoài." },
              { speaker: "Examiner", "en": "You have explained your ideas clearly and used appropriate vocabulary. Always remember to organize your thoughts before you start speaking.", vi: "Bạn đã giải thích các ý tưởng của mình một cách rõ ràng và sử dụng từ vựng phù hợp. Hãy luôn nhớ sắp xếp các suy nghĩ của bạn trước khi bạn bắt đầu nói." },
              { speaker: "Candidate", "en": "Thank you for the feedback, which is very encouraging. I will continue to practice describing pictures at home to build my confidence.", vi: "Cảm ơn vì những phản hồi, điều mà rất đáng khích lệ. Tôi sẽ tiếp tục luyện tập mô tả tranh ở nhà để xây dựng sự tự tin của mình." }
            ]
          },
          {
            title: "Discussing an interactive task",
            lines: [
              { speaker: "Student A", "en": "For this collaborative task, we need to decide which gift is the most suitable for our teacher who is retiring next week. What do you think about buying a watch?", vi: "Đối với nhiệm vụ hợp tác này, chúng ta cần quyết định món quà nào là phù hợp nhất cho giáo viên của chúng ta người sẽ nghỉ hưu vào tuần tới. Bạn nghĩ sao về việc mua một chiếc đồng hồ?" },
              { speaker: "Student B", "en": "A watch is a classic gift, but it might be too expensive for our budget. I suggest buying a photo album which contains pictures of all her students.", vi: "Một chiếc đồng hồ là một món quà kinh điển, nhưng nó có thể quá đắt so với ngân sách của chúng ta. Tôi đề nghị mua một cuốn album ảnh cuốn mà chứa những bức tranh của tất cả các học sinh của cô ấy." },
              { speaker: "Student A", "en": "That is a very thoughtful idea, which she will definitely appreciate. It has a lot of sentimental value compared to a generic piece of jewelry.", vi: "Đó là một ý tưởng rất chu đáo, thứ mà cô ấy chắc chắn sẽ trân trọng. Nó có rất nhiều giá trị tình cảm so với một món đồ trang sức chung chung." },
              { speaker: "Student B", "en": "We could also write a personalized message under each photograph. However, compiling all those photos might take a considerable amount of time.", vi: "Chúng ta cũng có thể viết một thông điệp mang dấu ấn cá nhân dưới mỗi bức ảnh. Tuy nhiên, việc biên soạn tất cả những bức ảnh đó có thể tốn một khoảng thời gian đáng kể." },
              { speaker: "Student A", "en": "If we divide the work among the classmates, it won't take long at all. Another option is a gift voucher for a nice restaurant.", vi: "Nếu chúng ta chia công việc giữa các bạn cùng lớp, nó sẽ không mất nhiều thời gian đâu. Một lựa chọn khác là một phiếu quà tặng cho một nhà hàng sang trọng." },
              { speaker: "Student B", "en": "A restaurant voucher is practical, but the photo album is much more personal and memorable. She can look at it whenever she misses teaching.", vi: "Một phiếu nhà hàng thì thiết thực, nhưng album ảnh cá nhân và đáng nhớ hơn nhiều. Cô ấy có thể nhìn vào nó bất cứ khi nào cô ấy nhớ việc giảng dạy." },
              { speaker: "Student A", "en": "I completely agree with your reasoning, so let's choose the photo album. We must start collecting the pictures immediately if we want to finish on time.", vi: "Tôi hoàn toàn đồng ý với lý lẽ của bạn, vì vậy hãy chọn album ảnh. Chúng ta phải bắt đầu thu thập các bức ảnh ngay lập tức nếu chúng ta muốn hoàn thành đúng hạn." },
              { speaker: "Student B", "en": "We have reached a sensible conclusion by discussing the pros and cons of each option. This is exactly what the examiner expects us to do.", vi: "Chúng ta đã đạt được một kết luận hợp lý bằng cách thảo luận về ưu và nhược điểm của từng lựa chọn. Đây chính xác là những gì giám khảo mong đợi chúng ta làm." }
            ]
          }
        ]
      },
      {
        orderIndex: 39,
        dialogues: [
          {
            title: "Final preparations before exam",
            lines: [
              { speaker: "Ben", "en": "The final PET exam is tomorrow, and I feel completely overwhelmed. I have been studying grammar rules for hours, but my brain can't absorb any more information.", vi: "Kỳ thi PET cuối cùng là vào ngày mai, và tôi cảm thấy hoàn toàn bị choáng ngợp. Tôi đã học các quy tắc ngữ pháp trong nhiều giờ, nhưng não của tôi không thể hấp thụ thêm bất kỳ thông tin nào nữa." },
              { speaker: "Lily", "en": "You need to stop studying right now and let your mind rest. Cramming the night before the exam will only make you more anxious and confused.", vi: "Bạn cần ngừng học ngay bây giờ và để tâm trí được nghỉ ngơi. Việc nhồi nhét vào đêm trước kỳ thi sẽ chỉ làm bạn thêm lo âu và bối rối." },
              { speaker: "Ben", "en": "I know you are right, but I am terrified of failing the speaking test. I always freeze when I have to speak English in front of an examiner.", vi: "Tôi biết bạn đúng, nhưng tôi vô cùng sợ hãi việc rớt bài kiểm tra nói. Tôi luôn bị đơ khi tôi phải nói tiếng Anh trước mặt một giám khảo." },
              { speaker: "Lily", "en": "Take a deep breath and remember that the examiner is there to help you, not to judge you harshly. Just speak slowly and clearly, which will show your confidence.", vi: "Hãy hít một hơi thật sâu và nhớ rằng giám khảo ở đó để giúp bạn, chứ không phải để phán xét bạn một cách gay gắt. Chỉ cần nói chậm rãi và rõ ràng, điều này sẽ thể hiện sự tự tin của bạn." },
              { speaker: "Ben", "en": "I will try to relax and go to bed early tonight. I have already packed my bag with two pens, my ID card, and a bottle of water.", vi: "Tôi sẽ cố gắng thư giãn và đi ngủ sớm vào tối nay. Tôi đã đóng gói túi của mình với hai cây bút, thẻ ID của tôi và một chai nước." },
              { speaker: "Lily", "en": "That is excellent preparation! Don't forget to eat a healthy breakfast tomorrow morning, because your brain needs energy to perform well.", vi: "Sự chuẩn bị thật xuất sắc! Đừng quên ăn một bữa sáng lành mạnh vào sáng mai, bởi vì bộ não của bạn cần năng lượng để hoạt động tốt." },
              { speaker: "Ben", "en": "Thank you for being so supportive, which really means a lot to me. I feel much more prepared to tackle the challenges tomorrow.", vi: "Cảm ơn vì đã luôn ủng hộ, điều mà thực sự có ý nghĩa rất lớn đối với tôi. Tôi cảm thấy đã sẵn sàng hơn nhiều để giải quyết các thử thách vào ngày mai." },
              { speaker: "Lily", "en": "You have worked incredibly hard over the past few months, and your English has improved significantly. I am sure you will pass the exam with flying colors.", vi: "Bạn đã làm việc vô cùng chăm chỉ trong suốt vài tháng qua, và tiếng Anh của bạn đã được cải thiện đáng kể. Tôi chắc chắn bạn sẽ vượt qua kỳ thi với thành tích xuất sắc." }
            ]
          },
          {
            title: "Post-exam reflections",
            lines: [
              { speaker: "Mia", "en": "I can't believe the exam is finally over! A huge weight has been lifted off my shoulders, and I feel incredibly relieved right now.", vi: "Tôi không thể tin được kỳ thi cuối cùng cũng kết thúc! Một gánh nặng khổng lồ đã được trút khỏi vai tôi, và tôi cảm thấy vô cùng nhẹ nhõm ngay lúc này." },
              { speaker: "Noah", "en": "I feel the same way, although the reading section was much harder than I had anticipated. One of the articles contained a lot of unfamiliar scientific vocabulary.", vi: "Tôi cũng cảm thấy như vậy, mặc dù phần đọc đã khó hơn nhiều so với tôi đã dự đoán. Một trong những bài báo đã chứa rất nhiều từ vựng khoa học xa lạ." },
              { speaker: "Mia", "en": "I managed to guess the meanings from the context, which saved me a lot of time. How did you perform in the writing part?", vi: "Tôi đã xoay xở đoán được ý nghĩa từ ngữ cảnh, điều này đã giúp tôi tiết kiệm được nhiều thời gian. Bạn đã làm bài như thế nào trong phần viết?" },
              { speaker: "Noah", "en": "The writing topic was quite interesting, so I was able to write a well-structured essay quickly. I made sure to use several complex grammatical structures.", vi: "Chủ đề viết khá thú vị, vì vậy tôi đã có thể viết một bài luận có cấu trúc tốt một cách nhanh chóng. Tôi đã đảm bảo việc sử dụng một vài cấu trúc ngữ pháp phức tạp." },
              { speaker: "Mia", "en": "I am glad to hear that! In the speaking test, my partner was very cooperative, which made the collaborative task proceed smoothly.", vi: "Tôi rất vui khi nghe điều đó! Trong bài kiểm tra nói, người bạn cặp của tôi rất hợp tác, điều đó đã làm cho nhiệm vụ hợp tác diễn ra trôi chảy." },
              { speaker: "Noah", "en": "The examiners were also very friendly and smiled constantly, which helped reduce my anxiety. I think we both performed to the best of our abilities.", vi: "Các giám khảo cũng rất thân thiện và mỉm cười liên tục, điều này đã giúp giảm bớt sự lo âu của tôi. Tôi nghĩ cả hai chúng ta đều đã thể hiện tốt nhất khả năng của mình." },
              { speaker: "Mia", "en": "Now we just have to wait for the results, which will be published in four weeks. Let's go celebrate our hard work by getting some ice cream.", vi: "Bây giờ chúng ta chỉ cần chờ đợi kết quả, những kết quả sẽ được công bố trong bốn tuần tới. Hãy đi ăn mừng sự chăm chỉ của chúng ta bằng cách đi ăn kem." },
              { speaker: "Noah", "en": "That is the best idea I have heard all day. Whatever the results are, we should be proud of the progress which we have made.", vi: "Đó là ý tưởng hay nhất tôi nghe được trong suốt cả ngày. Bất kể kết quả có ra sao, chúng ta nên tự hào về sự tiến bộ mà chúng ta đã đạt được." }
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
  console.log("Hoàn thành cụm 16, 17, 18, 19, 20!");
}

seedBatches()
  .finally(() => prisma.$disconnect());

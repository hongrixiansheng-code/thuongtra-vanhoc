/**
 * SEED SCRIPT: KET Dialogue - Batch 6 (orderIndex 28 -> 35)
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  {
    orderIndex: 28, // Bài 29 (Cụm động từ)
    dialogues: [
      {
        content: JSON.stringify({
          title: "A New Hobby",
          lines: [
            { speaker: "Tony", en: "I am looking forward to seeing my friends at the weekend.", vi: "Tôi rất mong chờ được gặp bạn bè của mình vào cuối tuần." },
            { speaker: "Jenny", en: "Did you finally give up smoking, because it is bad for you?", vi: "Cuối cùng bạn đã từ bỏ việc hút thuốc chưa, bởi vì nó có hại cho bạn?" },
            { speaker: "Tony", en: "Yes, I gave it up, and I decided to take up swimming.", vi: "Vâng, tôi đã từ bỏ nó, và tôi quyết định bắt đầu môn bơi lội." },
            { speaker: "Jenny", en: "That is a great idea, and you can easily find out more information online.", vi: "Đó là một ý tưởng tuyệt vời, và bạn có thể dễ dàng tìm ra thêm thông tin trực tuyến." },
            { speaker: "Tony", en: "My car broke down yesterday, so I had to walk to the pool.", vi: "Xe của tôi bị hỏng hôm qua, nên tôi phải đi bộ đến hồ bơi." },
            { speaker: "Jenny", en: "When will you get your car back from the repair shop?", vi: "Khi nào bạn sẽ lấy lại xe từ tiệm sửa chữa?" },
            { speaker: "Tony", en: "I hope it comes back tomorrow, so I can drive again.", vi: "Tôi hy vọng nó sẽ quay trở lại vào ngày mai, để tôi có thể lái xe trở lại." },
            { speaker: "Jenny", en: "I will pick you up later, and we can go together.", vi: "Tôi sẽ đón bạn sau, và chúng ta có thể đi cùng nhau." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Weekend Plans",
          lines: [
            { speaker: "Peter", en: "We set off early in the morning, so we could avoid the traffic.", vi: "Chúng tôi đã khởi hành sớm vào buổi sáng, để chúng tôi có thể tránh tắc đường." },
            { speaker: "Mary", en: "I am looking forward to visiting the museum with my family.", vi: "Tôi rất mong chờ được đến thăm bảo tàng với gia đình tôi." },
            { speaker: "Peter", en: "He has to look after his little sister, so he cannot come.", vi: "Anh ấy phải chăm sóc em gái nhỏ của mình, nên anh ấy không thể đến." },
            { speaker: "Mary", en: "Did she find out who broke the beautiful vase in the living room?", vi: "Cô ấy đã tìm ra ai là người làm vỡ chiếc bình đẹp trong phòng khách chưa?" },
            { speaker: "Peter", en: "Yes, she did, and she gave up asking them to be careful.", vi: "Rồi, cô ấy đã tìm ra, và cô ấy từ bỏ việc yêu cầu họ cẩn thận." },
            { speaker: "Mary", en: "I decided to take up a new sport, because I need to be healthier.", vi: "Tôi quyết định bắt đầu một môn thể thao mới, bởi vì tôi cần khỏe mạnh hơn." },
            { speaker: "Peter", en: "I will pick you up at seven, before the game starts.", vi: "Tôi sẽ đón bạn lúc bảy giờ, trước khi trận đấu bắt đầu." },
            { speaker: "Mary", en: "Thank you, and I hope we don't break down on the road.", vi: "Cảm ơn bạn, và tôi hy vọng chúng ta không bị hỏng xe trên đường." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 29, // Bài 30 (Verb + infinitive / gerund)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Making Decisions",
          lines: [
            { speaker: "Alex", en: "I cannot afford to buy a new car, because it is too expensive.", vi: "Tôi không có khả năng mua một chiếc xe mới, bởi vì nó quá đắt." },
            { speaker: "Emma", en: "You should avoid spending too much money on useless things.", vi: "Bạn nên tránh dành quá nhiều tiền vào những thứ vô dụng." },
            { speaker: "Alex", en: "He managed to pass the difficult exam, which made his parents happy.", vi: "Anh ấy đã xoay xở để vượt qua kỳ thi khó khăn, điều làm bố mẹ anh ấy vui." },
            { speaker: "Emma", en: "I really enjoy reading books, and it helps me relax.", vi: "Tôi thực sự thích đọc sách, và nó giúp tôi thư giãn." },
            { speaker: "Alex", en: "She refused to help me, although I asked her politely.", vi: "Cô ấy từ chối giúp đỡ tôi, mặc dù tôi đã yêu cầu cô ấy một cách lịch sự." },
            { speaker: "Emma", en: "They decided to travel to Italy, after they finished their project.", vi: "Họ quyết định đi du lịch đến Ý, sau khi họ hoàn thành dự án của mình." },
            { speaker: "Alex", en: "I hope to see you again soon, before you leave the city.", vi: "Tôi hy vọng sẽ sớm gặp lại bạn, trước khi bạn rời khỏi thành phố." },
            { speaker: "Emma", en: "I expect to receive a letter from him, but he hasn't written.", vi: "Tôi mong đợi nhận được một bức thư từ anh ấy, nhưng anh ấy vẫn chưa viết." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Agreeing to Help",
          lines: [
            { speaker: "Liam", en: "He agreed to lend me his laptop, so I could finish my work.", vi: "Anh ấy đồng ý cho tôi mượn máy tính xách tay, để tôi có thể hoàn thành công việc." },
            { speaker: "Mia", en: "She offered to cook dinner for us, which was very kind of her.", vi: "Cô ấy đề nghị nấu bữa tối cho chúng tôi, điều đó thật tử tế từ cô ấy." },
            { speaker: "Liam", en: "I managed to fix the broken window, although it was difficult.", vi: "Tôi đã xoay xở sửa được chiếc cửa sổ bị hỏng, mặc dù nó rất khó." },
            { speaker: "Mia", en: "Did you remember to lock the door before you left?", vi: "Bạn có nhớ khóa cửa trước khi rời đi không?" },
            { speaker: "Liam", en: "I clearly remember locking it, so you don't need to worry.", vi: "Tôi nhớ rõ ràng đã khóa nó, vì vậy bạn không cần phải lo lắng." },
            { speaker: "Mia", en: "We avoid going out during the rush hour, because the traffic is bad.", vi: "Chúng tôi tránh ra ngoài trong giờ cao điểm, bởi vì giao thông rất tệ." },
            { speaker: "Liam", en: "I enjoy walking in the park, and I also love cycling.", vi: "Tôi thích đi dạo trong công viên, và tôi cũng yêu thích đi xe đạp." },
            { speaker: "Mia", en: "They can't afford to live in the city centre anymore.", vi: "Họ không có khả năng sống ở trung tâm thành phố nữa." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 30, // Bài 31 (Câu hỏi đuôi & Từ nối)
    dialogues: [
      {
        content: JSON.stringify({
          title: "A Casual Chat",
          lines: [
            { speaker: "Tony", en: "You have finished your homework, haven't you?", vi: "Bạn đã hoàn thành bài tập về nhà của bạn, phải không?" },
            { speaker: "Jenny", en: "Yes, I have; however, it was extremely difficult.", vi: "Vâng, tôi đã làm xong; tuy nhiên, nó cực kỳ khó." },
            { speaker: "Tony", en: "He isn't going to the party tonight, is he?", vi: "Anh ấy sẽ không đến bữa tiệc tối nay, phải không?" },
            { speaker: "Jenny", en: "Actually, he is coming, besides, he is bringing a delicious cake.", vi: "Thực ra, anh ấy có đến, ngoài ra, anh ấy sẽ mang theo một chiếc bánh ngon." },
            { speaker: "Tony", en: "It was a wonderful movie, wasn't it?", vi: "Đó là một bộ phim tuyệt vời, phải không?" },
            { speaker: "Jenny", en: "Basically, the story was good, but the ending was quite sad.", vi: "Về cơ bản, câu chuyện thì hay, nhưng phần kết thì khá buồn." },
            { speaker: "Tony", en: "You will help me clean the room, won't you?", vi: "Bạn sẽ giúp tôi dọn dẹp căn phòng, đúng không?" },
            { speaker: "Jenny", en: "Certainly, I will help you; therefore, we can finish it quickly.", vi: "Chắc chắn rồi, tôi sẽ giúp bạn; do đó, chúng ta có thể hoàn thành nó nhanh chóng." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Making Plans",
          lines: [
            { speaker: "Peter", en: "They don't like playing football, do they?", vi: "Họ không thích chơi bóng đá, phải không?" },
            { speaker: "Mary", en: "Frankly, they hate it; moreover, they never watch sports on TV.", vi: "Thành thật mà nói, họ ghét nó; hơn nữa, họ không bao giờ xem thể thao trên tivi." },
            { speaker: "Peter", en: "You haven't seen my keys anywhere, have you?", vi: "Bạn chưa thấy chìa khóa của tôi ở đâu, phải không?" },
            { speaker: "Mary", en: "No, I haven't seen them; anyway, let's keep looking for them.", vi: "Không, tôi chưa thấy chúng; dù sao thì, hãy tiếp tục tìm kiếm chúng đi." },
            { speaker: "Peter", en: "She can speak English fluently, can't she?", vi: "Cô ấy có thể nói tiếng Anh trôi chảy, đúng không?" },
            { speaker: "Mary", en: "Yes, she can; eventually, she wants to become an English teacher.", vi: "Vâng, cô ấy có thể; cuối cùng thì, cô ấy muốn trở thành một giáo viên tiếng Anh." },
            { speaker: "Peter", en: "We should leave early today, shouldn't we?", vi: "Hôm nay chúng ta nên rời đi sớm, đúng không?" },
            { speaker: "Mary", en: "Yes, we must leave now, otherwise we will miss the train.", vi: "Vâng, chúng ta phải rời đi ngay bây giờ, nếu không chúng ta sẽ lỡ chuyến tàu." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 31, // Bài 32 (Biển hiệu & Thông báo)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Reading Signs",
          lines: [
            { speaker: "Alex", en: "Look at that warning sign, because it says 'Do not enter'.", vi: "Nhìn vào biển cảnh báo đó kìa, bởi vì nó nói 'Không được vào'." },
            { speaker: "Emma", en: "Passengers must present their tickets, before they board the train.", vi: "Hành khách phải xuất trình vé của họ, trước khi họ lên tàu." },
            { speaker: "Alex", en: "The notice says 'No parking', so we have to find another place.", vi: "Thông báo nói 'Cấm đỗ xe', vì vậy chúng ta phải tìm một nơi khác." },
            { speaker: "Emma", en: "Read the instructions carefully, before you start the machine.", vi: "Hãy đọc kỹ hướng dẫn, trước khi bạn khởi động máy." },
            { speaker: "Alex", en: "The sign says 'Dogs must be kept on leads', which is a strict rule.", vi: "Biển báo nói 'Chó phải được xích lại', điều này là một quy định nghiêm ngặt." },
            { speaker: "Emma", en: "Entry is not permitted, so we should leave immediately.", vi: "Việc đi vào không được phép, vì vậy chúng ta nên rời đi ngay lập tức." },
            { speaker: "Alex", en: "Please switch off your mobile phones during the movie.", vi: "Vui lòng tắt điện thoại di động của bạn trong suốt bộ phim." },
            { speaker: "Emma", en: "I saw an advertisement for a new job, and I want to apply.", vi: "Tôi đã thấy một quảng cáo cho công việc mới, và tôi muốn nộp đơn." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Public Announcements",
          lines: [
            { speaker: "Liam", en: "Did you hear the announcement, because the train is delayed?", vi: "Bạn có nghe thông báo không, bởi vì chuyến tàu bị hoãn lại rồi?" },
            { speaker: "Mia", en: "Yes, it said we must wait for twenty minutes at the station.", vi: "Có, nó nói chúng ta phải đợi trong hai mươi phút ở nhà ga." },
            { speaker: "Liam", en: "The sign offers a great discount, so let's go inside the shop.", vi: "Biển hiệu cung cấp một sự giảm giá tuyệt vời, nên hãy vào trong cửa hàng." },
            { speaker: "Mia", en: "You may not smoke in this area, because it is very dangerous.", vi: "Bạn không được phép hút thuốc trong khu vực này, bởi vì nó rất nguy hiểm." },
            { speaker: "Liam", en: "I asked the guard for directions, and he was very helpful.", vi: "Tôi đã hỏi người bảo vệ để chỉ đường, và ông ấy rất hữu ích." },
            { speaker: "Mia", en: "The warning says 'Wet floor', so please walk carefully.", vi: "Lời cảnh báo nói 'Sàn ướt', vì vậy vui lòng đi lại cẩn thận." },
            { speaker: "Liam", en: "Follow the safety instructions, in case there is a fire.", vi: "Hãy tuân theo các hướng dẫn an toàn, phòng trường hợp có hỏa hoạn." },
            { speaker: "Mia", en: "We need more information about the trip, before we book it.", vi: "Chúng tôi cần thêm thông tin về chuyến đi, trước khi chúng tôi đặt nó." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 32, // Bài 33 (Kỹ năng viết: Email & Tin nhắn)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Sending an Email",
          lines: [
            { speaker: "Tony", en: "I am writing to tell you about the meeting tomorrow.", vi: "Tôi đang viết thư để nói cho bạn biết về cuộc họp ngày mai." },
            { speaker: "Jenny", en: "Thanks for your email, and I will definitely be there.", vi: "Cảm ơn vì email của bạn, và tôi chắc chắn sẽ có mặt ở đó." },
            { speaker: "Tony", en: "Please see the attached document, which contains all the details.", vi: "Vui lòng xem tài liệu đính kèm, cái mà chứa tất cả các chi tiết." },
            { speaker: "Jenny", en: "Would you like to have lunch together, after the meeting finishes?", vi: "Bạn có muốn ăn trưa cùng nhau, sau khi cuộc họp kết thúc không?" },
            { speaker: "Tony", en: "I am afraid I cannot come, because I have another appointment.", vi: "Tôi e rằng tôi không thể đến, bởi vì tôi có một cuộc hẹn khác." },
            { speaker: "Jenny", en: "Why don't we meet on Friday instead, if you are free?", vi: "Tại sao chúng ta không gặp nhau vào thứ Sáu thay thế, nếu bạn rảnh?" },
            { speaker: "Tony", en: "That sounds like a great idea, so I will see you then.", vi: "Nghe có vẻ là một ý tưởng tuyệt vời, vậy hẹn gặp bạn vào lúc đó nhé." },
            { speaker: "Jenny", en: "Hope to hear from you soon, and please send my best regards.", vi: "Hy vọng sớm nhận được tin từ bạn, và vui lòng gửi lời chào trân trọng nhất của tôi." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Texting a Friend",
          lines: [
            { speaker: "Peter", en: "Hi Mary, what about going to the cinema this evening?", vi: "Chào Mary, thế còn việc đi xem phim vào tối nay thì sao?" },
            { speaker: "Mary", en: "I would love to go, but I have to finish my homework first.", vi: "Tôi rất muốn đi, nhưng tôi phải hoàn thành bài tập về nhà trước." },
            { speaker: "Peter", en: "How about tomorrow night, since we both have free time?", vi: "Vậy còn tối mai thì sao, vì cả hai chúng ta đều có thời gian rảnh?" },
            { speaker: "Mary", en: "That is a perfect plan, so I will reply to you later to confirm.", vi: "Đó là một kế hoạch hoàn hảo, nên tôi sẽ trả lời bạn sau để xác nhận." },
            { speaker: "Peter", en: "I will forward the movie tickets to your email address.", vi: "Tôi sẽ chuyển tiếp vé xem phim đến địa chỉ email của bạn." },
            { speaker: "Mary", en: "Make sure you put the correct subject, so I don't miss it.", vi: "Hãy chắc chắn bạn đặt đúng tiêu đề, để tôi không bỏ lỡ nó." },
            { speaker: "Peter", en: "The sender's name will be mine, and my signature is at the bottom.", vi: "Tên người gửi sẽ là tôi, và chữ ký của tôi ở dưới cùng." },
            { speaker: "Mary", en: "Thank you so much, and I sincerely appreciate your help.", vi: "Cảm ơn bạn rất nhiều, và tôi chân thành đánh giá cao sự giúp đỡ của bạn." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 33, // Bài 34 (Kỹ năng nghe: Hội thoại thực tế)
    dialogues: [
      {
        content: JSON.stringify({
          title: "At the Restaurant",
          lines: [
            { speaker: "Alex", en: "I'm sorry, but we have been waiting for our food for an hour.", vi: "Tôi xin lỗi, nhưng chúng tôi đã chờ thức ăn của mình trong một giờ rồi." },
            { speaker: "Emma", en: "I apologise for the delay, because the kitchen is very busy.", vi: "Tôi xin lỗi vì sự chậm trễ, bởi vì nhà bếp đang rất bận rộn." },
            { speaker: "Alex", en: "We would like to cancel our order, if it is not ready yet.", vi: "Chúng tôi muốn hủy đơn đặt hàng của chúng tôi, nếu nó vẫn chưa sẵn sàng." },
            { speaker: "Emma", en: "Please don't cancel it, because your meal is coming right now.", vi: "Xin đừng hủy nó, bởi vì bữa ăn của bạn đang ra ngay bây giờ." },
            { speaker: "Alex", en: "I'm afraid the soup is cold, which is very disappointing.", vi: "Tôi e rằng món súp bị nguội, điều đó rất đáng thất vọng." },
            { speaker: "Emma", en: "I will replace it immediately, and we will give you a free dessert.", vi: "Tôi sẽ thay thế nó ngay lập tức, và chúng tôi sẽ tặng bạn một món tráng miệng miễn phí." },
            { speaker: "Alex", en: "I agree with your solution, so we will wait a bit longer.", vi: "Tôi đồng ý với giải pháp của bạn, nên chúng tôi sẽ đợi thêm một chút." },
            { speaker: "Emma", en: "Thank you for your patience, and we will serve you soon.", vi: "Cảm ơn sự kiên nhẫn của bạn, và chúng tôi sẽ phục vụ bạn sớm." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "On the Phone",
          lines: [
            { speaker: "Liam", en: "Hello, this is Liam speaking, and I would like to reserve a table.", vi: "Xin chào, tôi là Liam đang nói đây, và tôi muốn đặt một bàn." },
            { speaker: "Mia", en: "Can I take a message, because the manager is not here right now?", vi: "Tôi có thể nhận tin nhắn lại không, vì người quản lý không có ở đây lúc này?" },
            { speaker: "Liam", en: "Please tell him that I need to confirm my booking for tonight.", vi: "Vui lòng nói với ông ấy rằng tôi cần xác nhận việc đặt bàn của tôi cho tối nay." },
            { speaker: "Mia", en: "I will contact him immediately, and he will call back.", vi: "Tôi sẽ liên lạc với ông ấy ngay lập tức, và ông ấy sẽ gọi lại." },
            { speaker: "Liam", en: "I completely disagree with the new policy, because it is unfair.", vi: "Tôi hoàn toàn không đồng ý với chính sách mới, bởi vì nó không công bằng." },
            { speaker: "Mia", en: "If you have a complaint, please send an email to our office.", vi: "Nếu bạn có lời phàn nàn, vui lòng gửi một email đến văn phòng của chúng tôi." },
            { speaker: "Liam", en: "I will do that, and I hope you can solve this problem quickly.", vi: "Tôi sẽ làm vậy, và tôi hy vọng các bạn có thể giải quyết vấn đề này một cách nhanh chóng." },
            { speaker: "Mia", en: "We are trying our best, isn't that what we always do?", vi: "Chúng tôi đang cố gắng hết sức, đó chẳng phải là điều chúng tôi luôn làm sao?" }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 34, // Bài 35 (Ôn tập tổng kết KET)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Reviewing the Course",
          lines: [
            { speaker: "Tony", en: "I have learned a lot of new skills since the course started.", vi: "Tôi đã học được rất nhiều kỹ năng mới kể từ khi khóa học bắt đầu." },
            { speaker: "Jenny", en: "If I studied harder, I would get a much better result.", vi: "Nếu tôi học chăm chỉ hơn, tôi sẽ đạt kết quả tốt hơn nhiều." },
            { speaker: "Tony", en: "The final decision was made by the teacher, and everyone agreed.", vi: "Quyết định cuối cùng được đưa ra bởi giáo viên, và mọi người đều đồng ý." },
            { speaker: "Jenny", en: "My opinion is that this grammar is difficult, but it is useful.", vi: "Ý kiến của tôi là ngữ pháp này khó, nhưng nó hữu ích." },
            { speaker: "Tony", en: "He asked me what the reason was, and I explained it clearly.", vi: "Anh ấy hỏi tôi lý do là gì, và tôi đã giải thích rõ ràng." },
            { speaker: "Jenny", en: "The knowledge we gained is important, because it prepares us for the exam.", vi: "Kiến thức chúng ta có được rất quan trọng, bởi vì nó chuẩn bị cho chúng ta bước vào kỳ thi." },
            { speaker: "Tony", en: "Is there any possibility that we can pass the test easily?", vi: "Có khả năng nào mà chúng ta có thể vượt qua bài kiểm tra một cách dễ dàng không?" },
            { speaker: "Jenny", en: "Yes, if we practice every day, we will definitely succeed.", vi: "Có, nếu chúng ta luyện tập mỗi ngày, chúng ta chắc chắn sẽ thành công." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "A Great Experience",
          lines: [
            { speaker: "Peter", en: "I will give you a suggestion, so you can improve your writing.", vi: "Tôi sẽ cho bạn một gợi ý, để bạn có thể cải thiện kỹ năng viết của mình." },
            { speaker: "Mary", en: "That is a great solution, and I will try to use it.", vi: "Đó là một giải pháp tuyệt vời, và tôi sẽ cố gắng sử dụng nó." },
            { speaker: "Peter", en: "The letters had been delivered before the storm finally arrived.", vi: "Những bức thư đã được giao trước khi cơn bão cuối cùng cũng đến." },
            { speaker: "Mary", en: "We are going to take the exam tomorrow, and I am ready.", vi: "Chúng ta sẽ làm bài kiểm tra vào ngày mai, và tôi đã sẵn sàng." },
            { speaker: "Peter", en: "The book was written by an expert, which makes it very valuable.", vi: "Cuốn sách được viết bởi một chuyên gia, điều này làm cho nó rất có giá trị." },
            { speaker: "Mary", en: "He said that he was tired, but he still wanted to study.", vi: "Anh ấy nói rằng anh ấy mệt, nhưng anh ấy vẫn muốn học." },
            { speaker: "Peter", en: "If you need help, you should ask the teacher immediately.", vi: "Nếu bạn cần giúp đỡ, bạn nên hỏi giáo viên ngay lập tức." },
            { speaker: "Mary", en: "This has been a wonderful experience, and I will never forget it.", vi: "Đây là một trải nghiệm tuyệt vời, và tôi sẽ không bao giờ quên nó." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 35, // Bài 36 (Luyện đề thi KET)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Mock Test Practice",
          lines: [
            { speaker: "Alex", en: "We have to finish the reading part in thirty minutes, which is quite fast.", vi: "Chúng ta phải hoàn thành phần đọc trong ba mươi phút, tốc độ này khá nhanh." },
            { speaker: "Emma", en: "The sign means that you cannot park here, so we must move.", vi: "Biển báo có nghĩa là bạn không thể đậu xe ở đây, vì vậy chúng ta phải di chuyển." },
            { speaker: "Alex", en: "If I didn't know the vocabulary, I couldn't answer the questions.", vi: "Nếu tôi không biết từ vựng, tôi không thể trả lời các câu hỏi." },
            { speaker: "Emma", en: "You must write an email of forty words, and it must be clear.", vi: "Bạn phải viết một email dài bốn mươi từ, và nó phải rõ ràng." },
            { speaker: "Alex", en: "The listening part is always played twice, so you can check your answers.", vi: "Phần nghe luôn được phát hai lần, để bạn có thể kiểm tra các câu trả lời của mình." },
            { speaker: "Emma", en: "She asked me to describe the picture, but I was very nervous.", vi: "Cô ấy yêu cầu tôi mô tả bức tranh, nhưng tôi rất lo lắng." },
            { speaker: "Alex", en: "The exam is not as difficult as I thought, which makes me happy.", vi: "Bài kiểm tra không khó như tôi nghĩ, điều này làm tôi vui." },
            { speaker: "Emma", en: "We will pass the KET test, if we stay calm and focus.", vi: "Chúng ta sẽ vượt qua bài kiểm tra KET, nếu chúng ta giữ bình tĩnh và tập trung." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Speaking Test Tips",
          lines: [
            { speaker: "Liam", en: "In the speaking test, you should talk about your daily life.", vi: "Trong bài kiểm tra nói, bạn nên nói về cuộc sống hàng ngày của bạn." },
            { speaker: "Mia", en: "He asked me where I lived, and I answered him confidently.", vi: "Ông ấy hỏi tôi sống ở đâu, và tôi đã trả lời ông ấy một cách tự tin." },
            { speaker: "Liam", en: "The picture shows a family who are eating dinner together.", vi: "Bức tranh cho thấy một gia đình đang ăn tối cùng nhau." },
            { speaker: "Mia", en: "I told him that I enjoyed playing sports, because it was healthy.", vi: "Tôi nói với ông ấy rằng tôi thích chơi thể thao, bởi vì nó tốt cho sức khỏe." },
            { speaker: "Liam", en: "If you don't understand the question, you can ask them to repeat it.", vi: "Nếu bạn không hiểu câu hỏi, bạn có thể yêu cầu họ lặp lại." },
            { speaker: "Mia", en: "The instructions are given clearly, so you don't need to worry.", vi: "Các hướng dẫn được đưa ra rõ ràng, vì vậy bạn không cần phải lo lắng." },
            { speaker: "Liam", en: "I have prepared very well, and I am looking forward to the test.", vi: "Tôi đã chuẩn bị rất kỹ, và tôi đang mong chờ bài kiểm tra." },
            { speaker: "Mia", en: "Good luck with your exam, and I hope you get an excellent score.", vi: "Chúc may mắn với kỳ thi của bạn, và tôi hy vọng bạn đạt điểm xuất sắc." }
          ]
        })
      }
    ]
  }
];

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-ket' },
    include: { lessons: true }
  });

  if (!program) return;

  for (const item of DIALOGUE_DATA) {
    const targetLesson = program.lessons.find(l => l.orderIndex === item.orderIndex);
    if (!targetLesson) continue;

    await prisma.lessonContent.deleteMany({
      where: { lessonId: targetLesson.id, contentType: 'DIALOGUE' }
    });

    for (const d of item.dialogues) {
      await prisma.lessonContent.create({
        data: { lessonId: targetLesson.id, contentType: 'DIALOGUE', content: d.content }
      });
    }
    console.log(`✅ Đã nạp 2 đoạn hội thoại cho Bài có orderIndex ${item.orderIndex}`);
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());

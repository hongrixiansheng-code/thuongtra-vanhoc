/**
 * SEED SCRIPT: KET Dialogue - Batch 4 (orderIndex 12 -> 19)
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  {
    orderIndex: 12, // Bài 13 (Thể thao)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Sports Club",
          lines: [
            { speaker: "Tony", en: "I want to go climbing in the mountains, but I don't have the equipment.", vi: "Tôi muốn đi leo núi, nhưng tôi không có thiết bị." },
            { speaker: "Jenny", en: "We go sailing every weekend, so you can join us instead.", vi: "Chúng tôi đi chèo thuyền mỗi cuối tuần, vì vậy bạn có thể tham gia cùng chúng tôi thay thế." },
            { speaker: "Tony", en: "Will you be able to teach me, because I am a beginner?", vi: "Bạn sẽ có thể dạy tôi chứ, bởi vì tôi là người mới bắt đầu?" },
            { speaker: "Jenny", en: "I am able to swim 100 metres, and I can teach you the basics.", vi: "Tôi có khả năng bơi được 100 mét, và tôi có thể dạy bạn những điều cơ bản." },
            { speaker: "Tony", en: "Who is the fastest runner in your team, because I want to race him?", vi: "Ai là người chạy nhanh nhất trong đội của bạn, vì tôi muốn đua với anh ấy?" },
            { speaker: "Jenny", en: "He went diving last summer, which made him very strong.", vi: "Anh ấy đã đi lặn biển mùa hè năm ngoái, điều đó làm anh ấy rất khỏe." },
            { speaker: "Tony", en: "She is the strongest athlete here, although she is very young.", vi: "Cô ấy là vận động viên khỏe nhất ở đây, mặc dù cô ấy còn rất trẻ." },
            { speaker: "Jenny", en: "That was the most exciting match, and I will never forget it.", vi: "Đó là trận đấu thú vị nhất, và tôi sẽ không bao giờ quên nó." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "The Big Race",
          lines: [
            { speaker: "Peter", en: "Are you able to run a marathon, or is it too difficult?", vi: "Bạn có khả năng chạy marathon không, hay điều đó quá khó?" },
            { speaker: "Mary", en: "I wasn't able to finish the race last year, but I will try again.", vi: "Tôi đã không thể hoàn thành cuộc đua năm ngoái, nhưng tôi sẽ thử lại." },
            { speaker: "Peter", en: "We often go cycling on Sundays, so you should practice with us.", vi: "Chúng tôi thường đi xe đạp vào các ngày Chủ nhật, vì vậy bạn nên luyện tập cùng chúng tôi." },
            { speaker: "Mary", en: "I will go swimming tomorrow morning, which is also a good exercise.", vi: "Tôi sẽ đi bơi vào sáng mai, điều đó cũng là một bài tập tốt." },
            { speaker: "Peter", en: "He is the best player in our club, because he trains every day.", vi: "Anh ấy là người chơi giỏi nhất câu lạc bộ của chúng tôi, bởi vì anh ấy tập luyện mỗi ngày." },
            { speaker: "Mary", en: "That was the hardest competition, yet he won the first prize.", vi: "Đó là cuộc thi khó khăn nhất, nhưng anh ấy đã giành giải nhất." },
            { speaker: "Peter", en: "I hope I will be able to join the team next month.", vi: "Tôi hy vọng tôi sẽ có thể tham gia đội vào tháng tới." },
            { speaker: "Mary", en: "You must practice hard, otherwise you won't pass the test.", vi: "Bạn phải luyện tập chăm chỉ, nếu không bạn sẽ không vượt qua bài kiểm tra." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 13, // Bài 14 (Phương tiện & kế hoạch)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Planning a Trip",
          lines: [
            { speaker: "Alex", en: "We are going to travel to Paris next week, and we already bought the tickets.", vi: "Chúng tôi dự định sẽ đi du lịch Paris tuần tới, và chúng tôi đã mua vé rồi." },
            { speaker: "Emma", en: "By the time we arrived, the flight had left, so we were very sad.", vi: "Vào lúc chúng tôi đến, chuyến bay đã rời đi, nên chúng tôi rất buồn." },
            { speaker: "Alex", en: "I think the new flight will be delayed, because the weather is bad.", vi: "Tôi nghĩ chuyến bay mới sẽ bị hoãn, vì thời tiết rất xấu." },
            { speaker: "Emma", en: "I'll carry that luggage for you, so you can walk faster.", vi: "Tôi sẽ mang hành lý đó cho bạn, để bạn có thể đi nhanh hơn." },
            { speaker: "Alex", en: "How long does it take to get to the airport by taxi?", vi: "Mất bao lâu để đến sân bay bằng taxi?" },
            { speaker: "Emma", en: "It takes about two hours to fly there, if there is no delay.", vi: "Mất khoảng hai giờ để bay tới đó, nếu không có sự chậm trễ nào." },
            { speaker: "Alex", en: "By the time I got to the airport, the check-in had closed.", vi: "Khi tôi đến sân bay, quầy thủ tục đã đóng cửa." },
            { speaker: "Emma", en: "We will book another flight, so please don't worry about it.", vi: "Chúng ta sẽ đặt một chuyến bay khác, vì vậy xin đừng lo lắng về nó." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Travel Arrangements",
          lines: [
            { speaker: "Liam", en: "How long did it take you to pack your luggage?", vi: "Bạn mất bao lâu để sắp xếp hành lý?" },
            { speaker: "Mia", en: "It took me an hour, and I am going to call a taxi now.", vi: "Tôi mất một giờ, và tôi dự định sẽ gọi taxi bây giờ." },
            { speaker: "Liam", en: "By the time she woke up, the sun had risen, so she was late.", vi: "Lúc cô ấy thức dậy, mặt trời đã mọc, nên cô ấy bị trễ." },
            { speaker: "Mia", en: "I will check the train schedule, while you wait here.", vi: "Tôi sẽ kiểm tra lịch trình tàu, trong khi bạn đợi ở đây." },
            { speaker: "Liam", en: "Are you going to drive to the station, or will you take a bus?", vi: "Bạn dự định sẽ lái xe đến nhà ga, hay bạn sẽ đi xe buýt?" },
            { speaker: "Mia", en: "I will take a bus, because my car is broken.", vi: "Tôi sẽ đi xe buýt, bởi vì xe của tôi bị hỏng." },
            { speaker: "Liam", en: "We are going to stay in a hotel, which is near the beach.", vi: "Chúng tôi dự định sẽ ở trong một khách sạn, nơi gần bãi biển." },
            { speaker: "Mia", en: "That sounds wonderful, and I hope you will enjoy your trip.", vi: "Điều đó nghe thật tuyệt vời, và tôi hy vọng bạn sẽ tận hưởng chuyến đi của mình." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 14, // Bài 15 (Du lịch)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Lost in the City",
          lines: [
            { speaker: "Tony", en: "When I arrived at the station, the bus had already left.", vi: "Khi tôi đến nhà ga, chiếc xe buýt đã rời đi mất rồi." },
            { speaker: "Jenny", en: "We need to get off at the next stop, and then turn left at the roundabout.", vi: "Chúng ta cần xuống ở trạm tiếp theo, và sau đó rẽ trái ở bùng binh." },
            { speaker: "Tony", en: "He got into the taxi quickly, because it was raining heavily.", vi: "Anh ấy bước vào xe taxi một cách nhanh chóng, bởi vì trời đang mưa lớn." },
            { speaker: "Jenny", en: "She had never seen a tram before she visited Europe.", vi: "Cô ấy chưa từng thấy xe điện trước khi đến châu Âu." },
            { speaker: "Tony", en: "You must go past the petrol station, and you will see the museum.", vi: "Bạn phải đi ngang qua trạm xăng, và bạn sẽ thấy bảo tàng." },
            { speaker: "Jenny", en: "I realised I had forgotten my driving licence, so I couldn't drive.", vi: "Tôi nhận ra mình đã quên bằng lái xe, nên tôi không thể lái xe." },
            { speaker: "Tony", en: "They are getting on the coach now, which is heading to London.", vi: "Họ đang lên xe khách bây giờ, chuyến xe đang hướng đến London." },
            { speaker: "Jenny", en: "You pass a bridge and then turn right, which is the easiest way.", vi: "Bạn đi qua một cây cầu rồi rẽ phải, đó là con đường dễ nhất." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Exploring Europe",
          lines: [
            { speaker: "Peter", en: "I had never been on a plane, until I travelled to France.", vi: "Tôi chưa bao giờ đi máy bay, cho đến khi tôi đi du lịch đến Pháp." },
            { speaker: "Mary", en: "You should get out of the car, and look at this beautiful view.", vi: "Bạn nên ra khỏi xe, và nhìn ngắm khung cảnh tuyệt đẹp này." },
            { speaker: "Peter", en: "We got off the train in Paris, and we went straight to the hotel.", vi: "Chúng tôi đã xuống tàu ở Paris, và chúng tôi đi thẳng đến khách sạn." },
            { speaker: "Mary", en: "By the time we got there, the museum had closed for the day.", vi: "Khi chúng tôi đến đó, bảo tàng đã đóng cửa trong ngày." },
            { speaker: "Peter", en: "Turn right at the traffic lights, and you will find the restaurant.", vi: "Rẽ phải ở đèn giao thông, và bạn sẽ tìm thấy nhà hàng." },
            { speaker: "Mary", en: "She had booked the ticket, before the price went up.", vi: "Cô ấy đã đặt vé, trước khi giá cả tăng lên." },
            { speaker: "Peter", en: "We are getting into the taxi, so we won't be late for the flight.", vi: "Chúng tôi đang bước vào taxi, vì vậy chúng tôi sẽ không bị muộn chuyến bay." },
            { speaker: "Mary", en: "Follow this street and go past the park, then you will see the river.", vi: "Đi theo con đường này và đi ngang qua công viên, sau đó bạn sẽ thấy dòng sông." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 15, // Bài 16 (Khách sạn)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Booking a Room",
          lines: [
            { speaker: "Alex", en: "I would like to make a reservation for two nights, if it is possible.", vi: "Tôi muốn đặt phòng cho hai đêm, nếu điều đó là có thể." },
            { speaker: "Emma", en: "The room had already been booked when we arrived at the reception.", vi: "Căn phòng đã được đặt trước khi chúng tôi đến quầy lễ tân." },
            { speaker: "Alex", en: "Does the hotel have a swimming pool, because my kids love swimming?", vi: "Khách sạn có hồ bơi không, vì các con tôi rất thích bơi lội?" },
            { speaker: "Emma", en: "Yes, and the bill had been paid before we checked out.", vi: "Có, và hóa đơn đã được thanh toán trước khi chúng tôi trả phòng." },
            { speaker: "Alex", en: "Did you book a single or a double room, since we need more space?", vi: "Bạn đã đặt phòng đơn hay phòng đôi, vì chúng ta cần nhiều không gian hơn?" },
            { speaker: "Emma", en: "I booked a double room, which has a very beautiful sea view.", vi: "Tôi đã đặt một phòng đôi, thứ có tầm nhìn ra biển rất đẹp." },
            { speaker: "Alex", en: "Is there a gym in the accommodation, so I can exercise in the morning?", vi: "Có phòng tập thể dục trong khu nhà ở không, để tôi có thể tập thể dục vào buổi sáng?" },
            { speaker: "Emma", en: "Yes, there is, but the tour had been cancelled due to bad weather.", vi: "Có, nhưng chuyến tham quan đã bị hủy do thời tiết xấu." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Checking In",
          lines: [
            { speaker: "Liam", en: "Does it have a good view, because I want to see the ocean?", vi: "Nó có tầm nhìn đẹp không, vì tôi muốn nhìn thấy đại dương?" },
            { speaker: "Mia", en: "Yes, it does, and the room had been cleaned perfectly before we entered.", vi: "Có, và căn phòng đã được dọn dẹp hoàn hảo trước khi chúng ta vào." },
            { speaker: "Liam", en: "Please call the receptionist to book a tour, so we can explore the city.", vi: "Vui lòng gọi tiếp tân để đặt một chuyến tham quan, để chúng ta có thể khám phá thành phố." },
            { speaker: "Mia", en: "I tried calling, but the line had been disconnected.", vi: "Tôi đã thử gọi, nhưng đường dây đã bị ngắt kết nối." },
            { speaker: "Liam", en: "Is there a restaurant inside the hotel, or do we have to go out?", vi: "Có nhà hàng bên trong khách sạn không, hay chúng ta phải ra ngoài?" },
            { speaker: "Mia", en: "The breakfast had been prepared, before the guests woke up.", vi: "Bữa sáng đã được chuẩn bị, trước khi các vị khách thức dậy." },
            { speaker: "Liam", en: "I will make a reservation for dinner, so we can eat here tonight.", vi: "Tôi sẽ đặt bàn cho bữa tối, để chúng ta có thể ăn ở đây tối nay." },
            { speaker: "Mia", en: "That is a great idea, and we can enjoy the live music too.", vi: "Đó là một ý tưởng tuyệt vời, và chúng ta cũng có thể thưởng thức nhạc sống." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 16, // Bài 17 (Nghề nghiệp)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Talking About Jobs",
          lines: [
            { speaker: "Tony", en: "She works as a secretary, and she is very busy every day.", vi: "Cô ấy làm nghề thư ký, và cô ấy rất bận rộn mỗi ngày." },
            { speaker: "Jenny", en: "A scientist is a person who does research in a laboratory.", vi: "Nhà khoa học là người làm công tác nghiên cứu trong phòng thí nghiệm." },
            { speaker: "Tony", en: "He is responsible for managing the team, which is a hard job.", vi: "Anh ấy chịu trách nhiệm quản lý nhóm, điều đó là một công việc khó khăn." },
            { speaker: "Jenny", en: "An assistant is someone who helps the boss with daily tasks.", vi: "Trợ lý là người giúp sếp thực hiện các công việc hàng ngày." },
            { speaker: "Tony", en: "My brother works as a chef in a restaurant, and he cooks well.", vi: "Anh trai tôi làm đầu bếp trong một nhà hàng, và anh ấy nấu ăn rất ngon." },
            { speaker: "Jenny", en: "The cleaner is responsible for keeping the office clean.", vi: "Người dọn dẹp có trách nhiệm giữ văn phòng sạch sẽ." },
            { speaker: "Tony", en: "I hope to work as a scientist one day, because I love chemistry.", vi: "Tôi hy vọng một ngày nào đó sẽ làm nhà khoa học, bởi vì tôi yêu hóa học." },
            { speaker: "Jenny", en: "A scanner is a machine which copies documents quickly.", vi: "Máy quét là một cái máy dùng để sao chép tài liệu một cách nhanh chóng." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Work Responsibilities",
          lines: [
            { speaker: "Peter", en: "Are you responsible for this project, or is someone else leading it?", vi: "Bạn có chịu trách nhiệm cho dự án này không, hay có ai khác đang dẫn dắt nó?" },
            { speaker: "Mary", en: "I work as a manager, so I am responsible for everything here.", vi: "Tôi làm quản lý, vì vậy tôi chịu trách nhiệm cho mọi thứ ở đây." },
            { speaker: "Peter", en: "A teacher is a person who educates students at school.", vi: "Giáo viên là người giáo dục học sinh ở trường." },
            { speaker: "Mary", en: "He works as a driver, and he drives a bus every morning.", vi: "Anh ấy làm tài xế, và anh ấy lái xe buýt mỗi buổi sáng." },
            { speaker: "Peter", en: "The IT guy is responsible for fixing the computers.", vi: "Anh chàng công nghệ thông tin chịu trách nhiệm sửa chữa các máy tính." },
            { speaker: "Mary", en: "A smartphone is a device which helps people communicate easily.", vi: "Điện thoại thông minh là một thiết bị giúp mọi người giao tiếp dễ dàng." },
            { speaker: "Peter", en: "She works as a nurse, and she takes care of the patients.", vi: "Cô ấy làm y tá, và cô ấy chăm sóc các bệnh nhân." },
            { speaker: "Mary", en: "That is a noble job, because she helps a lot of people.", vi: "Đó là một công việc cao quý, bởi vì cô ấy giúp đỡ rất nhiều người." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 17, // Bài 18 (Quy tắc & tuyển dụng)
    dialogues: [
      {
        content: JSON.stringify({
          title: "A Job Interview",
          lines: [
            { speaker: "Alex", en: "She asked me where I worked, and I told her the truth.", vi: "Cô ấy đã hỏi tôi làm việc ở đâu, và tôi đã nói cho cô ấy sự thật." },
            { speaker: "Emma", en: "We have to attend a meeting at 9 a.m., so don't be late.", vi: "Chúng tôi phải tham dự một cuộc họp lúc 9 giờ sáng, vì vậy đừng đến muộn." },
            { speaker: "Alex", en: "He asked if I had experience, because the job is very demanding.", vi: "Anh ấy đã hỏi liệu tôi có kinh nghiệm không, bởi vì công việc rất khắt khe." },
            { speaker: "Emma", en: "You have to fill in an application form, before they interview you.", vi: "Bạn phải điền vào một đơn xin việc, trước khi họ phỏng vấn bạn." },
            { speaker: "Alex", en: "The boss asked what my qualifications were, and I showed my degree.", vi: "Sếp đã hỏi bằng cấp của tôi là gì, và tôi đã cho xem bằng của mình." },
            { speaker: "Emma", en: "You don't have to wear a suit on Fridays, which is very comfortable.", vi: "Bạn không cần phải mặc vest vào các ngày thứ Sáu, điều đó rất thoải mái." },
            { speaker: "Alex", en: "I applied for the job online, but I haven't received a reply yet.", vi: "Tôi đã nộp đơn xin việc trực tuyến, nhưng tôi chưa nhận được hồi âm." },
            { speaker: "Emma", en: "She has to earn a high salary, because she has a big family.", vi: "Cô ấy phải kiếm được mức lương cao, bởi vì cô ấy có một gia đình lớn." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Office Rules",
          lines: [
            { speaker: "Liam", en: "Did you fill out all the details, when you applied for the job?", vi: "Bạn đã điền đầy đủ các chi tiết chưa, khi bạn nộp đơn xin việc?" },
            { speaker: "Mia", en: "Yes, and the manager asked if I could start working next Monday.", vi: "Rồi, và người quản lý đã hỏi liệu tôi có thể bắt đầu làm việc vào thứ Hai tới không." },
            { speaker: "Liam", en: "We have to finish this report today, otherwise the boss will be angry.", vi: "Chúng ta phải hoàn thành bản báo cáo này hôm nay, nếu không sếp sẽ tức giận." },
            { speaker: "Mia", en: "He asked me why I left my previous job, and I explained it clearly.", vi: "Anh ấy hỏi tôi tại sao tôi lại rời bỏ công việc trước đây, và tôi đã giải thích rõ ràng." },
            { speaker: "Liam", en: "You don't have to work on weekends, so you can relax.", vi: "Bạn không cần phải làm việc vào cuối tuần, vì vậy bạn có thể thư giãn." },
            { speaker: "Mia", en: "I have to send an email to the client, before I go home.", vi: "Tôi phải gửi một email cho khách hàng, trước khi tôi về nhà." },
            { speaker: "Liam", en: "She asked me how much I wanted to earn, which was a tricky question.", vi: "Cô ấy hỏi tôi muốn kiếm được bao nhiêu tiền, đó là một câu hỏi hóc búa." },
            { speaker: "Mia", en: "You must always be honest, because trust is very important.", vi: "Bạn phải luôn thành thật, bởi vì sự tin tưởng rất quan trọng." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 18, // Bài 19 (Mạng xã hội & thiết bị)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Using Social Media",
          lines: [
            { speaker: "Tony", en: "I've been using this app for two years, and it is really helpful.", vi: "Tôi đã và đang sử dụng ứng dụng này được hai năm rồi, và nó thực sự hữu ích." },
            { speaker: "Jenny", en: "I posted a selfie on social media, but no one liked it.", vi: "Tôi đã đăng một bức ảnh tự sướng lên mạng xã hội, nhưng không ai thích nó cả." },
            { speaker: "Tony", en: "May I use your keyboard, because mine is completely broken?", vi: "Tôi có thể sử dụng bàn phím của bạn không, vì của tôi bị hỏng hoàn toàn rồi?" },
            { speaker: "Jenny", en: "She has been writing a blog since 2020, and she has many readers.", vi: "Cô ấy đã đang viết blog từ năm 2020, và cô ấy có rất nhiều độc giả." },
            { speaker: "Tony", en: "Please share this link with your friends, so they can see the video.", vi: "Vui lòng chia sẻ liên kết này với bạn bè của bạn, để họ có thể xem video." },
            { speaker: "Jenny", en: "Can I download this file, or is it protected by a password?", vi: "Tôi có thể tải tập tin này xuống không, hay nó được bảo vệ bằng mật khẩu?" },
            { speaker: "Tony", en: "They have been chatting in the chatroom for hours, which is a waste of time.", vi: "Họ đã trò chuyện trong phòng chat hàng giờ liền, điều này thật lãng phí thời gian." },
            { speaker: "Jenny", en: "How many people follow your account, because you are very famous?", vi: "Có bao nhiêu người theo dõi tài khoản của bạn, vì bạn rất nổi tiếng?" }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Internet Connection",
          lines: [
            { speaker: "Peter", en: "Could I have your Wi-Fi password, so I can connect to the internet?", vi: "Tôi có thể xin mật khẩu Wi-Fi của bạn không, để tôi có thể kết nối internet?" },
            { speaker: "Mary", en: "Sure, and I have been playing this online game all morning.", vi: "Chắc chắn rồi, và tôi đã và đang chơi trò chơi trực tuyến này suốt cả buổi sáng." },
            { speaker: "Peter", en: "He has been uploading the pictures since yesterday, but it is too slow.", vi: "Anh ấy đã tải những bức ảnh lên từ hôm qua, nhưng nó quá chậm." },
            { speaker: "Mary", en: "You should post it on your profile, so everyone will know.", vi: "Bạn nên đăng nó trên hồ sơ của bạn, để mọi người sẽ biết." },
            { speaker: "Peter", en: "May I borrow your tablet, because I want to read the news?", vi: "Tôi có thể mượn máy tính bảng của bạn không, vì tôi muốn đọc tin tức?" },
            { speaker: "Mary", en: "I share a lot of funny posts, and my friends always laugh.", vi: "Tôi chia sẻ rất nhiều bài đăng hài hước, và bạn bè của tôi luôn cười." },
            { speaker: "Peter", en: "We have been watching movies online for three hours, so let's take a break.", vi: "Chúng tôi đã xem phim trực tuyến được ba giờ rồi, nên hãy nghỉ ngơi một chút." },
            { speaker: "Mary", en: "That is a good idea, because my eyes are getting tired.", vi: "Đó là một ý tưởng hay, bởi vì mắt tôi đang trở nên mệt mỏi." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 19, // Bài 20 (Công nghệ & điều khiển)
    dialogues: [
      {
        content: JSON.stringify({
          title: "How Does It Work?",
          lines: [
            { speaker: "Alex", en: "Photos are stored on the cloud, so you will never lose them.", vi: "Những bức ảnh được lưu trữ trên đám mây, vì vậy bạn sẽ không bao giờ làm mất chúng." },
            { speaker: "Emma", en: "How does this DVD player work, because I have never used one?", vi: "Máy phát DVD này hoạt động như thế nào, vì tôi chưa từng sử dụng cái nào?" },
            { speaker: "Alex", en: "Messages are sent automatically, which saves us a lot of time.", vi: "Tin nhắn được gửi tự động, điều này giúp chúng ta tiết kiệm rất nhiều thời gian." },
            { speaker: "Emma", en: "Please turn down the volume, because the music is too loud.", vi: "Vui lòng vặn nhỏ âm lượng xuống, bởi vì âm nhạc quá ồn." },
            { speaker: "Alex", en: "The documents are printed on this printer, but it is currently broken.", vi: "Tài liệu được in trên máy in này, nhưng nó hiện đang bị hỏng." },
            { speaker: "Emma", en: "Can you explain how this microphone works, so I can use it?", vi: "Bạn có thể giải thích cách micro này hoạt động không, để tôi có thể sử dụng nó?" },
            { speaker: "Alex", en: "Can you turn up the CD player, since I want to hear the song?", vi: "Bạn có thể mở đầu CD to lên chút không, vì tôi muốn nghe bài hát?" },
            { speaker: "Emma", en: "He turned off the PC and went home, after he finished his work.", vi: "Anh ấy đã tắt máy tính cá nhân và về nhà, sau khi anh ấy hoàn thành công việc của mình." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Smart Devices",
          lines: [
            { speaker: "Liam", en: "I don't know how the new digital camera works, so can you teach me?", vi: "Tôi không biết máy ảnh kỹ thuật số mới hoạt động thế nào, nên bạn có thể dạy tôi không?" },
            { speaker: "Mia", en: "Data is protected by a strong password, which keeps it safe.", vi: "Dữ liệu được bảo vệ bằng một mật khẩu mạnh, điều này giữ cho nó an toàn." },
            { speaker: "Liam", en: "Turn on the television, because my favourite programme is starting now.", vi: "Bật tivi lên đi, vì chương trình yêu thích của tôi đang bắt đầu bây giờ." },
            { speaker: "Mia", en: "The software is updated every month, so it runs very smoothly.", vi: "Phần mềm được cập nhật mỗi tháng, nên nó chạy rất mượt mà." },
            { speaker: "Liam", en: "How does the smart home system work, when you are not there?", vi: "Hệ thống nhà thông minh hoạt động như thế nào, khi bạn không có ở đó?" },
            { speaker: "Mia", en: "It is controlled by an app on my phone, which is very convenient.", vi: "Nó được điều khiển bởi một ứng dụng trên điện thoại của tôi, điều này rất tiện lợi." },
            { speaker: "Liam", en: "Please turn off the lights, before you leave the room.", vi: "Vui lòng tắt đèn, trước khi bạn rời khỏi phòng." },
            { speaker: "Mia", en: "Everything is connected to the internet, so life is much easier.", vi: "Mọi thứ đều được kết nối với internet, vì vậy cuộc sống dễ dàng hơn nhiều." }
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

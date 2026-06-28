const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = [
  // Cụm 6: Bài 11 (orderIndex 10), Bài 12 (orderIndex 11)
  {
    fileName: 'pet-dialogue-cum6.json',
    lessons: [
      {
        orderIndex: 10,
        dialogues: [
          {
            title: "Discussing an injury",
            lines: [
              { speaker: "Mike", en: "My ankle has been hurting since yesterday morning. I was playing basketball when I suddenly fell over and twisted it.", vi: "Mắt cá chân của tôi đã bị đau từ sáng hôm qua. Tôi đang chơi bóng rổ thì đột nhiên bị ngã và bong gân." },
              { speaker: "Helen", en: "You should see a doctor as soon as possible. Have you applied any ice to reduce the swelling?", vi: "Bạn nên đi khám bác sĩ càng sớm càng tốt. Bạn đã chườm đá để giảm sưng chưa?" },
              { speaker: "Mike", en: "I put some ice on it, but the pain hasn't stopped yet. It hurts a lot when I try to walk or stand up.", vi: "Tôi đã chườm một ít đá lên đó, nhưng cơn đau vẫn chưa dứt. Nó rất đau khi tôi cố gắng đi lại hoặc đứng lên." },
              { speaker: "Helen", en: "I can drive you to the local hospital right now. We shouldn't wait until the condition becomes worse.", vi: "Tôi có thể lái xe đưa bạn đến bệnh viện địa phương ngay bây giờ. Chúng ta không nên đợi cho đến khi tình trạng trở nên tồi tệ hơn." },
              { speaker: "Mike", en: "Thank you, that would be very helpful because I cannot drive myself. I hope the doctor won't say that it is broken.", vi: "Cảm ơn bạn, điều đó sẽ rất hữu ích vì tôi không thể tự lái xe. Tôi hy vọng bác sĩ sẽ không nói rằng nó bị gãy." },
              { speaker: "Helen", en: "Try to keep your leg elevated while we are in the car. It is important to avoid putting any pressure on your foot.", vi: "Hãy cố gắng giữ chân bạn nâng cao lên trong khi chúng ta ở trong xe. Điều quan trọng là tránh đặt bất kỳ áp lực nào lên bàn chân của bạn." },
              { speaker: "Mike", en: "I had a similar injury last year, which took a whole month to heal completely. I don't want to miss the upcoming tournament.", vi: "Tôi đã bị một chấn thương tương tự vào năm ngoái, cái mà mất cả tháng để lành hoàn toàn. Tôi không muốn bỏ lỡ giải đấu sắp tới." },
              { speaker: "Helen", en: "Your health is the most important thing right now. Don't worry about the tournament until you are fully recovered.", vi: "Sức khỏe của bạn là điều quan trọng nhất ngay bây giờ. Đừng lo lắng về giải đấu cho đến khi bạn bình phục hoàn toàn." }
            ]
          },
          {
            title: "Dealing with a headache",
            lines: [
              { speaker: "Sophia", en: "I have had a terrible headache all day, which makes it impossible to concentrate on my work. The pain feels like a heavy weight on my forehead.", vi: "Tôi đã bị một cơn đau đầu khủng khiếp cả ngày nay, điều này khiến tôi không thể tập trung vào công việc. Cơn đau có cảm giác như một vật nặng đè lên trán tôi." },
              { speaker: "Lucas", en: "Have you taken any painkillers yet? You should take a break from staring at the computer screen.", vi: "Bạn đã uống thuốc giảm đau chưa? Bạn nên nghỉ ngơi khỏi việc nhìn chằm chằm vào màn hình máy tính." },
              { speaker: "Sophia", "en": "I took two pills an hour ago, but they haven't worked at all. I might have caught a cold from walking in the rain yesterday.", vi: "Tôi đã uống hai viên thuốc cách đây một giờ, nhưng chúng hoàn toàn không có tác dụng. Tôi có thể đã bị cảm lạnh do đi dưới mưa ngày hôm qua." },
              { speaker: "Lucas", "en": "Your forehead feels quite warm, so you might have a fever as well. You had better go home and get some rest.", vi: "Trán của bạn có cảm giác khá ấm, vì vậy bạn cũng có thể bị sốt. Tốt hơn là bạn nên về nhà và nghỉ ngơi một chút." },
              { speaker: "Sophia", "en": "I still have to finish this report before the end of the day. The manager needs it for the meeting which starts tomorrow.", vi: "Tôi vẫn phải hoàn thành bản báo cáo này trước khi hết ngày. Người quản lý cần nó cho cuộc họp sẽ bắt đầu vào ngày mai." },
              { speaker: "Lucas", "en": "I can finish the report for you if you tell me what to do. Health must always come first in these situations.", vi: "Tôi có thể hoàn thành báo cáo cho bạn nếu bạn cho tôi biết phải làm gì. Sức khỏe phải luôn được đặt lên hàng đầu trong những tình huống này." },
              { speaker: "Sophia", "en": "That is so kind of you, and I really appreciate your help. I will send you the documents which contain the necessary data.", vi: "Bạn thật tốt bụng, và tôi thực sự trân trọng sự giúp đỡ của bạn. Tôi sẽ gửi cho bạn các tài liệu có chứa những dữ liệu cần thiết." },
              { speaker: "Lucas", "en": "Don't worry about work, just focus on recovering. Drink plenty of water and sleep as much as you can.", vi: "Đừng lo lắng về công việc, chỉ cần tập trung vào việc hồi phục. Hãy uống nhiều nước và ngủ càng nhiều càng tốt." }
            ]
          }
        ]
      },
      {
        orderIndex: 11,
        dialogues: [
          {
            title: "Discussing healthy diets",
            lines: [
              { speaker: "Oliver", en: "I have been trying to eat more vegetables recently, but I still crave junk food. It is difficult to change old habits which have been formed over years.", vi: "Gần đây tôi đang cố gắng ăn nhiều rau hơn, nhưng tôi vẫn thèm đồ ăn vặt. Thật khó để thay đổi những thói quen cũ cái mà đã được hình thành trong nhiều năm." },
              { speaker: "Ava", "en": "You don't have to give up junk food completely. You can eat healthy meals during the week, and allow yourself a treat on weekends.", vi: "Bạn không cần phải từ bỏ hoàn toàn đồ ăn vặt. Bạn có thể ăn những bữa ăn lành mạnh trong tuần, và cho phép bản thân thưởng thức một món ngon vào cuối tuần." },
              { speaker: "Oliver", en: "That sounds like a balanced approach, which is much easier to maintain. I usually buy fast food when I am too tired to cook.", vi: "Đó nghe có vẻ là một cách tiếp cận cân bằng, thứ mà dễ duy trì hơn nhiều. Tôi thường hay mua đồ ăn nhanh khi tôi quá mệt để nấu nướng." },
              { speaker: "Ava", "en": "You should try preparing your meals in advance on Sundays. It saves a lot of time, and you will always have something healthy to eat.", vi: "Bạn nên thử chuẩn bị trước các bữa ăn vào ngày Chủ nhật. Nó tiết kiệm được rất nhiều thời gian, và bạn sẽ luôn có thứ gì đó tốt cho sức khỏe để ăn." },
              { speaker: "Oliver", en: "I will buy some fresh fruits and vegetables from the local market tomorrow. Cooking at home is also cheaper than eating out.", vi: "Ngày mai tôi sẽ mua một ít trái cây và rau quả tươi từ khu chợ địa phương. Việc nấu ăn tại nhà cũng rẻ hơn so với ăn ngoài." },
              { speaker: "Ava", "en": "Exactly! You should also avoid sugary drinks, which contain a lot of empty calories. Drinking water is much better for your body.", vi: "Chính xác! Bạn cũng nên tránh các đồ uống có đường, những thứ chứa rất nhiều calo rỗng. Việc uống nước thì tốt hơn nhiều cho cơ thể bạn." },
              { speaker: "Oliver", en: "I used to drink three cans of soda every day, but I have reduced it to one. My goal is to stop drinking soda entirely by next month.", vi: "Tôi từng uống ba lon soda mỗi ngày, nhưng tôi đã giảm xuống còn một lon. Mục tiêu của tôi là ngừng uống soda hoàn toàn vào tháng tới." },
              { speaker: "Ava", "en": "You are making great progress, which will definitely improve your overall health. I can share some delicious salad recipes if you are interested.", vi: "Bạn đang đạt được tiến bộ lớn, điều này chắc chắn sẽ cải thiện sức khỏe tổng thể của bạn. Tôi có thể chia sẻ một số công thức làm salad ngon tuyệt nếu bạn quan tâm." }
            ]
          },
          {
            title: "Starting a fitness routine",
            lines: [
              { speaker: "James", en: "I feel like I need to start exercising because I have gained some weight recently. I spend most of my day sitting at a desk.", vi: "Tôi cảm thấy như mình cần bắt đầu tập thể dục vì gần đây tôi đã tăng vài cân. Tôi dành phần lớn thời gian trong ngày ngồi ở bàn làm việc." },
              { speaker: "Charlotte", "en": "Joining a gym is a good idea, or you can start by jogging in the park. Regular exercise will give you more energy throughout the day.", vi: "Tham gia một phòng tập thể dục là một ý tưởng hay, hoặc bạn có thể bắt đầu bằng việc chạy bộ trong công viên. Việc tập thể dục thường xuyên sẽ mang lại cho bạn nhiều năng lượng hơn suốt cả ngày." },
              { speaker: "James", "en": "I bought a pair of running shoes last week, but I haven't used them yet. It is hard to find the motivation when the weather is bad.", vi: "Tôi đã mua một đôi giày chạy bộ vào tuần trước, nhưng tôi vẫn chưa sử dụng chúng. Thật khó để tìm thấy động lực khi thời tiết xấu." },
              { speaker: "Charlotte", "en": "You should find a workout partner who can keep you motivated. We could go jogging together every morning before work.", "vi": "Bạn nên tìm một người bạn tập cùng, người có thể giữ cho bạn có động lực. Chúng ta có thể cùng nhau đi chạy bộ mỗi sáng trước khi làm việc." },
              { speaker: "James", "en": "That would be fantastic, and I would definitely wake up early if someone was waiting for me. What time should we meet tomorrow?", "vi": "Thế thì tuyệt quá, và tôi chắc chắn sẽ thức dậy sớm nếu có ai đó đang đợi tôi. Chúng ta nên gặp nhau lúc mấy giờ ngày mai?" },
              { speaker: "Charlotte", "en": "Let's meet at 6:30 AM at the park entrance, which is not too far from your house. We can start with a short distance on the first day.", "vi": "Hãy gặp nhau lúc 6:30 sáng tại lối vào công viên, nơi không quá xa nhà bạn. Chúng ta có thể bắt đầu với một quãng đường ngắn trong ngày đầu tiên." },
              { speaker: "James", "en": "I will stretch my muscles properly so that I don't get injured. Warming up is essential before doing any intense physical activity.", "vi": "Tôi sẽ giãn cơ đúng cách để không bị chấn thương. Việc khởi động là thiết yếu trước khi thực hiện bất kỳ hoạt động thể chất cường độ cao nào." },
              { speaker: "Charlotte", "en": "Yes, and we must remember to drink plenty of water after the run. Staying hydrated is very important for muscle recovery.", "vi": "Đúng vậy, và chúng ta phải nhớ uống nhiều nước sau khi chạy. Việc giữ đủ nước là rất quan trọng cho sự phục hồi cơ bắp." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 7: Bài 13 (orderIndex 12), Bài 14 (orderIndex 13)
  {
    fileName: 'pet-dialogue-cum7.json',
    lessons: [
      {
        orderIndex: 12,
        dialogues: [
          {
            title: "Planning a summer holiday",
            lines: [
              { speaker: "Ethan", en: "I am looking forward to our summer holiday, which is only two weeks away. Have you booked the flights to Spain yet?", vi: "Tôi đang rất mong chờ kỳ nghỉ hè của chúng ta, cái mà chỉ còn hai tuần nữa. Bạn đã đặt chuyến bay đến Tây Ban Nha chưa?" },
              { speaker: "Mia", "en": "I booked them yesterday evening, and I also found a beautiful hotel near the beach. We will have a spectacular view of the ocean from our balcony.", vi: "Tôi đã đặt chúng vào tối hôm qua, và tôi cũng tìm thấy một khách sạn tuyệt đẹp gần bãi biển. Chúng ta sẽ có một tầm nhìn ngoạn mục ra đại dương từ ban công của mình." },
              { speaker: "Ethan", "en": "That sounds absolutely wonderful. I need to buy a new suitcase because my old one is broken.", vi: "Nghe thật sự tuyệt vời. Tôi cần mua một chiếc vali mới vì cái cũ của tôi đã bị hỏng." },
              { speaker: "Mia", "en": "You should get a lightweight suitcase, which is much easier to carry around. Don't forget to pack plenty of sunscreen and your sunglasses.", vi: "Bạn nên mua một chiếc vali nhẹ, thứ mà dễ mang theo hơn nhiều. Đừng quên mang theo nhiều kem chống nắng và kính râm của bạn." },
              { speaker: "Ethan", "en": "I will make a packing list so that I don't leave anything important behind. I also want to buy a guidebook about the local attractions.", vi: "Tôi sẽ lập một danh sách đóng gói để không bỏ quên bất cứ thứ gì quan trọng. Tôi cũng muốn mua một cuốn sách hướng dẫn về các điểm tham quan địa phương." },
              { speaker: "Mia", "en": "I have already downloaded a travel app which has all the maps and recommendations. We can explore the historic castle on our second day.", vi: "Tôi đã tải xuống một ứng dụng du lịch cái mà có tất cả các bản đồ và đề xuất. Chúng ta có thể khám phá lâu đài lịch sử vào ngày thứ hai của mình." },
              { speaker: "Ethan", "en": "We should also try the traditional food at the local markets. Tasting new dishes is my favorite part of traveling to a foreign country.", vi: "Chúng ta cũng nên thử thức ăn truyền thống tại các khu chợ địa phương. Nếm thử các món ăn mới là phần tôi yêu thích nhất khi đi du lịch đến một quốc gia xa lạ." },
              { speaker: "Mia", "en": "I completely agree, and I heard that the seafood there is incredibly fresh. This trip will definitely be an unforgettable experience.", vi: "Tôi hoàn toàn đồng ý, và tôi nghe nói rằng hải sản ở đó vô cùng tươi ngon. Chuyến đi này chắc chắn sẽ là một trải nghiệm khó quên." }
            ]
          },
          {
            title: "Arriving at the airport",
            lines: [
              { speaker: "Noah", "en": "We need to check in our luggage immediately because the queue is getting very long. Our flight to Paris departs in exactly two hours.", vi: "Chúng ta cần làm thủ tục ký gửi hành lý ngay lập tức vì hàng người đang trở nên rất dài. Chuyến bay của chúng ta đến Paris sẽ khởi hành trong đúng hai giờ nữa." },
              { speaker: "Isabella", "en": "I have our passports and boarding passes ready in my handbag. Did you remember to attach the name tags to your bags?", vi: "Tôi đã có sẵn hộ chiếu và thẻ lên máy bay trong túi xách của mình. Bạn có nhớ gắn thẻ tên vào túi của mình chưa?" },
              { speaker: "Noah", "en": "Yes, I did that last night before we went to sleep. The security check usually takes a long time, so we shouldn't waste any minutes.", vi: "Có, tôi đã làm điều đó tối qua trước khi chúng ta đi ngủ. Việc kiểm tra an ninh thường tốn nhiều thời gian, vì vậy chúng ta không nên lãng phí phút nào." },
              { speaker: "Isabella", "en": "Once we pass through security, we can buy some snacks at the duty-free shop. I want to get some chocolates for my friends in France.", vi: "Sau khi đi qua cửa an ninh, chúng ta có thể mua vài món ăn nhẹ tại cửa hàng miễn thuế. Tôi muốn mua một ít sôcôla cho những người bạn của tôi ở Pháp." },
              { speaker: "Noah", "en": "We also need to check the screens to find our departure gate. The gate number was not printed on the ticket which I received.", vi: "Chúng ta cũng cần kiểm tra các màn hình để tìm cổng khởi hành của mình. Số cổng đã không được in trên vé cái mà tôi nhận được." },
              { speaker: "Isabella", "en": "The screen says that our flight will board from Gate 14. We should head there early so that we can find some empty seats.", vi: "Màn hình nói rằng chuyến bay của chúng ta sẽ lên máy bay từ Cổng 14. Chúng ta nên đến đó sớm để có thể tìm được một số ghế trống." },
              { speaker: "Noah", "en": "I feel a bit nervous because I haven't flown in a long time. However, I am really excited about visiting the Eiffel Tower.", vi: "Tôi cảm thấy hơi lo lắng vì tôi đã không đi máy bay trong một thời gian dài. Tuy nhiên, tôi thực sự háo hức về việc đến thăm tháp Eiffel." },
              { speaker: "Isabella", "en": "Don't worry, the flight is very short, and we will be there before you know it. It will be a fantastic adventure for both of us.", vi: "Đừng lo lắng, chuyến bay rất ngắn, và chúng ta sẽ đến nơi trước khi bạn kịp nhận ra. Nó sẽ là một cuộc phiêu lưu tuyệt vời cho cả hai chúng ta." }
            ]
          }
        ]
      },
      {
        orderIndex: 13,
        dialogues: [
          {
            title: "Checking into a hotel",
            lines: [
              { speaker: "William", "en": "Good afternoon, I have a reservation under the name of William Smith. I booked a double room with a sea view for three nights.", vi: "Chào buổi chiều, tôi có một đặt phòng dưới tên William Smith. Tôi đã đặt một phòng đôi có tầm nhìn ra biển cho ba đêm." },
              { speaker: "Receptionist", "en": "Welcome to our hotel, Mr. Smith. Let me find your booking in the system, which will just take a moment.", vi: "Chào mừng đến với khách sạn của chúng tôi, ông Smith. Hãy để tôi tìm đặt phòng của ông trong hệ thống, việc này sẽ chỉ mất một chút thời gian." },
              { speaker: "William", "en": "Thank you, and I also requested a room which is located on a higher floor. It is usually quieter and the view is much better.", vi: "Cảm ơn, và tôi cũng đã yêu cầu một căn phòng cái mà nằm ở tầng cao hơn. Nó thường yên tĩnh hơn và tầm nhìn thì tốt hơn nhiều." },
              { speaker: "Receptionist", "en": "I can see your request here, and I have assigned you a beautiful room on the tenth floor. Can I please see your passport and credit card?", vi: "Tôi có thể thấy yêu cầu của ông ở đây, và tôi đã sắp xếp cho ông một căn phòng tuyệt đẹp trên tầng mười. Tôi có thể xem hộ chiếu và thẻ tín dụng của ông không?" },
              { speaker: "William", "en": "Here are my documents. Could you also tell me what time the breakfast is served in the morning?", vi: "Đây là các giấy tờ của tôi. Cô có thể cho tôi biết bữa sáng được phục vụ lúc mấy giờ vào buổi sáng không?" },
              { speaker: "Receptionist", "en": "Breakfast is served from 7:00 AM to 10:00 AM in the restaurant, which is situated on the ground floor. Here is your room key.", vi: "Bữa sáng được phục vụ từ 7:00 sáng đến 10:00 sáng tại nhà hàng, nơi mà tọa lạc ở tầng trệt. Đây là chìa khóa phòng của ông." },
              { speaker: "William", "en": "That is perfect, and we would like to use the swimming pool this evening. Do we need to bring towels from our room?", vi: "Tuyệt vời, và chúng tôi muốn sử dụng hồ bơi vào tối nay. Chúng tôi có cần mang khăn tắm từ phòng của mình đi không?" },
              { speaker: "Receptionist", "en": "Fresh towels are provided at the pool area, so you don't need to bring anything. Have a wonderful stay with us, Mr. Smith.", vi: "Khăn tắm sạch được cung cấp tại khu vực hồ bơi, vì vậy ông không cần mang theo thứ gì. Chúc ông có một kỳ nghỉ tuyệt vời cùng chúng tôi, ông Smith." }
            ]
          },
          {
            title: "Getting lost in a city",
            lines: [
              { speaker: "Jack", "en": "I think we have been walking in the wrong direction for twenty minutes. The museum which we are trying to find is not on this street.", vi: "Tôi nghĩ chúng ta đã đi sai hướng trong hai mươi phút rồi. Bảo tàng cái mà chúng ta đang cố tìm không nằm trên con đường này." },
              { speaker: "Grace", "en": "My phone battery has died, so I can't check the digital map anymore. We should ask a local person for directions.", vi: "Pin điện thoại của tôi đã hết, nên tôi không thể kiểm tra bản đồ kỹ thuật số được nữa. Chúng ta nên hỏi một người dân địa phương để được chỉ đường." },
              { speaker: "Jack", "en": "Excuse me, could you tell us how to get to the National History Museum? We seem to be completely lost in this neighborhood.", vi: "Xin lỗi, bạn có thể cho chúng tôi biết làm thế nào để đi đến Bảo tàng Lịch sử Quốc gia không? Chúng tôi có vẻ như đã hoàn toàn bị lạc trong khu vực này." },
              { speaker: "Passerby", "en": "You are quite far away from the museum, which is located near the central square. You should take the subway to get there faster.", vi: "Bạn đang ở khá xa bảo tàng, nơi mà nằm gần quảng trường trung tâm. Bạn nên đi tàu điện ngầm để đến đó nhanh hơn." },
              { speaker: "Jack", "en": "We haven't used the public transport here yet. Is the subway station far from where we are standing right now?", vi: "Chúng tôi vẫn chưa sử dụng giao thông công cộng ở đây. Trạm tàu điện ngầm có xa nơi chúng ta đang đứng bây giờ không?" },
              { speaker: "Passerby", "en": "No, it is just around the corner, and you need to take the blue line. You will get off at the third stop, which is exactly opposite the museum.", vi: "Không, nó chỉ ở ngay góc đường, và bạn cần đi tuyến màu xanh lam. Bạn sẽ xuống ở trạm thứ ba, nơi mà nằm chính xác đối diện với bảo tàng." },
              { speaker: "Grace", "en": "Thank you very much for your help! We would have walked for another hour if we hadn't met you.", vi: "Cảm ơn bạn rất nhiều vì sự giúp đỡ! Chúng tôi lẽ ra đã phải đi bộ thêm một giờ nữa nếu không gặp bạn." },
              { speaker: "Passerby", "en": "You are very welcome! Be careful with your bags when you are on the train, as it can get very crowded.", vi: "Không có chi! Hãy cẩn thận với túi xách của bạn khi bạn ở trên tàu, vì nó có thể trở nên rất đông đúc." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 8: Bài 15 (orderIndex 14), Bài 16 (orderIndex 15)
  {
    fileName: 'pet-dialogue-cum8.json',
    lessons: [
      {
        orderIndex: 14,
        dialogues: [
          {
            title: "Commuting to work",
            lines: [
              { speaker: "Dan", "en": "The traffic jam on the highway was terrible this morning, which caused me to be late for work. I spent an hour just sitting in my car.", vi: "Trận kẹt xe trên đường cao tốc sáng nay thật tồi tệ, điều đó khiến tôi bị trễ giờ làm. Tôi đã dành cả một giờ chỉ để ngồi trong xe ô tô của mình." },
              { speaker: "Fiona", "en": "I always take the subway because it avoids all the traffic on the roads. It is much faster and you don't have to worry about parking.", vi: "Tôi luôn đi tàu điện ngầm vì nó tránh được mọi sự tắc nghẽn trên đường. Nó nhanh hơn nhiều và bạn không phải lo lắng về việc đỗ xe." },
              { speaker: "Dan", "en": "I considered taking the train, but the station is too far from my house. I would have to walk for twenty minutes in the rain.", vi: "Tôi đã cân nhắc việc đi tàu, nhưng nhà ga lại quá xa nhà tôi. Tôi sẽ phải đi bộ trong hai mươi phút dưới trời mưa." },
              { speaker: "Fiona", "en": "You could buy a bicycle and ride it to the station every day. There is a secure parking area where you can leave your bike safely.", vi: "Bạn có thể mua một chiếc xe đạp và đạp nó đến nhà ga mỗi ngày. Có một khu vực đỗ xe an ninh nơi bạn có thể để xe đạp một cách an toàn." },
              { speaker: "Dan", "en": "That is actually a brilliant idea, which would also help me get some exercise. Driving in the city center is becoming too stressful.", vi: "Đó thực ra là một ý tưởng xuất sắc, điều này cũng sẽ giúp tôi tập thể dục. Việc lái xe ở trung tâm thành phố đang trở nên quá căng thẳng." },
              { speaker: "Fiona", "en": "Public transport is also better for the environment than driving a car alone. A monthly pass is quite affordable if you buy it in advance.", vi: "Giao thông công cộng cũng tốt hơn cho môi trường so với việc lái xe ô tô một mình. Một vé tháng khá phải chăng nếu bạn mua nó trước." },
              { speaker: "Dan", "en": "I will check the train schedules tonight to see if they match my working hours. If it works out, I will sell my old car soon.", vi: "Tôi sẽ kiểm tra lịch trình tàu tối nay để xem liệu chúng có khớp với giờ làm việc của tôi không. Nếu ổn thỏa, tôi sẽ sớm bán chiếc xe cũ của mình." },
              { speaker: "Fiona", "en": "I am sure you will notice the difference immediately. Reading a book on the train is much more relaxing than navigating through heavy traffic.", vi: "Tôi chắc chắn bạn sẽ nhận thấy sự khác biệt ngay lập tức. Đọc một cuốn sách trên tàu thì thư giãn hơn nhiều so với việc loay hoay vượt qua dòng giao thông đông đúc." }
            ]
          },
          {
            title: "Asking for directions",
            lines: [
              { speaker: "Tourist", "en": "Excuse me, I am trying to find the central railway station. Is there a direct bus which goes there from this stop?", vi: "Xin lỗi, tôi đang cố tìm ga đường sắt trung tâm. Có chuyến xe buýt trực tiếp nào đi đến đó từ bến này không?" },
              { speaker: "Local", "en": "Yes, bus number 45 goes straight to the station, but it just left five minutes ago. You will have to wait twenty minutes for the next one.", vi: "Có, xe buýt số 45 đi thẳng đến nhà ga, nhưng nó vừa mới rời đi năm phút trước. Bạn sẽ phải đợi hai mươi phút cho chuyến tiếp theo." },
              { speaker: "Tourist", "en": "I have a train to catch at three o'clock, so I am in a bit of a hurry. Can I walk there if it is not too far?", vi: "Tôi có một chuyến tàu phải bắt lúc ba giờ, vì vậy tôi đang hơi vội. Tôi có thể đi bộ đến đó nếu nó không quá xa không?" },
              { speaker: "Local", "en": "It is a long walk, which would take you at least forty minutes. I recommend taking a taxi if you want to arrive on time.", vi: "Đó là một đoạn đi bộ dài, việc đó sẽ mất của bạn ít nhất bốn mươi phút. Tôi khuyên bạn nên đi taxi nếu bạn muốn đến đúng giờ." },
              { speaker: "Tourist", "en": "Where can I find a taxi stand near here? I don't see any empty cabs driving along this street.", vi: "Tôi có thể tìm thấy một trạm taxi gần đây ở đâu? Tôi không thấy bất kỳ chiếc taxi trống nào chạy dọc theo con đường này." },
              { speaker: "Local", "en": "There is a taxi rank just opposite the supermarket, which is about two blocks away. You can easily get a ride from there.", vi: "Có một bãi đỗ taxi ngay đối diện siêu thị, nơi cách đây khoảng hai dãy nhà. Bạn có thể dễ dàng bắt một chuyến xe từ đó." },
              { speaker: "Tourist", "en": "Thank you for the detailed information. I will hurry over to the supermarket so that I don't miss my train.", vi: "Cảm ơn bạn vì thông tin chi tiết. Tôi sẽ nhanh chóng đi tới siêu thị để không lỡ chuyến tàu của mình." },
              { speaker: "Local", "en": "You are welcome, and I hope you have a safe journey. The drivers here know the quickest routes to the station.", vi: "Không có chi, và tôi chúc bạn có một chuyến đi an toàn. Các tài xế ở đây biết những tuyến đường nhanh nhất để đến nhà ga." }
            ]
          }
        ]
      },
      {
        orderIndex: 15,
        dialogues: [
          {
            title: "Discussing modern vehicles",
            lines: [
              { speaker: "Sam", "en": "Electric cars are becoming increasingly popular, and many people are buying them. The government provides subsidies which make these vehicles more affordable.", vi: "Ô tô điện đang trở nên ngày càng phổ biến, và nhiều người đang mua chúng. Chính phủ cung cấp các khoản trợ cấp cái mà làm cho những phương tiện này có giá phải chăng hơn." },
              { speaker: "Rachel", "en": "I am thinking about buying a hybrid car because I worry about running out of battery. Finding a charging station can be difficult in rural areas.", vi: "Tôi đang suy nghĩ về việc mua một chiếc xe lai (hybrid) vì tôi lo lắng về việc hết pin. Việc tìm kiếm một trạm sạc có thể khó khăn ở các khu vực nông thôn." },
              { speaker: "Sam", "en": "The charging infrastructure has improved significantly, and there are fast chargers everywhere now. An electric vehicle is much cheaper to maintain than a petrol car.", vi: "Cơ sở hạ tầng sạc đã được cải thiện đáng kể, và hiện tại có các bộ sạc nhanh ở khắp mọi nơi. Một phương tiện điện thì rẻ hơn nhiều để bảo trì so với xe xăng." },
              { speaker: "Rachel", "en": "That is true, but the initial cost is still quite high for an average family. I also read that replacing the battery is extremely expensive.", vi: "Điều đó đúng, nhưng chi phí ban đầu vẫn còn khá cao đối với một gia đình trung bình. Tôi cũng đọc được rằng việc thay pin là cực kỳ đắt đỏ." },
              { speaker: "Sam", "en": "Technology is advancing rapidly, which means prices will continue to drop in the future. Self-driving cars will probably be the next big revolution in transport.", vi: "Công nghệ đang tiến bộ nhanh chóng, điều đó có nghĩa là giá cả sẽ tiếp tục giảm trong tương lai. Xe tự lái có lẽ sẽ là cuộc cách mạng lớn tiếp theo trong giao thông." },
              { speaker: "Rachel", "en": "I don't trust autonomous vehicles yet because I like to be in control when I drive. A machine cannot react to unexpected situations like a human can.", vi: "Tôi vẫn chưa tin tưởng các phương tiện tự trị vì tôi thích được làm chủ khi tôi lái xe. Một cỗ máy không thể phản ứng với những tình huống bất ngờ giống như một con người có thể làm." },
              { speaker: "Sam", "en": "Computers are actually much faster than human brains, which reduces the risk of accidents. Most crashes are caused by human errors, such as distraction.", vi: "Máy tính thực ra nhanh hơn nhiều so với bộ não con người, điều này làm giảm nguy cơ tai nạn. Hầu hết các vụ va chạm đều do lỗi của con người gây ra, chẳng hạn như sự xao nhãng." },
              { speaker: "Rachel", "en": "I suppose you are right, but it will take time for people to adapt. The transition to smart transport will definitely change our cities completely.", vi: "Tôi cho là bạn đúng, nhưng sẽ cần thời gian để mọi người thích nghi. Việc chuyển đổi sang giao thông thông minh chắc chắn sẽ thay đổi hoàn toàn các thành phố của chúng ta." }
            ]
          },
          {
            title: "Problems with a flight",
            lines: [
              { speaker: "Passenger", "en": "Excuse me, the departure board says that flight BA205 has been delayed by three hours. Can you explain the reason which caused this delay?", vi: "Xin lỗi, bảng khởi hành ghi rằng chuyến bay BA205 đã bị hoãn ba tiếng đồng hồ. Bạn có thể giải thích lý do cái mà đã gây ra sự chậm trễ này không?" },
              { speaker: "Agent", "en": "I apologize for the inconvenience, sir. The aircraft has experienced a minor technical issue which needs to be inspected by the engineers.", vi: "Tôi xin lỗi vì sự bất tiện này, thưa ông. Máy bay đã gặp một vấn đề kỹ thuật nhỏ thứ mà cần được kiểm tra bởi các kỹ sư." },
              { speaker: "Passenger", "en": "I have an important business meeting in London, and I cannot afford to be late. Are there any alternative flights which I can take this morning?", vi: "Tôi có một cuộc họp kinh doanh quan trọng ở London, và tôi không thể để bị trễ. Có chuyến bay thay thế nào mà tôi có thể đi vào sáng nay không?" },
              { speaker: "Agent", "en": "Let me check the system for you immediately. There is another flight operated by our partner airline, which departs in forty-five minutes.", vi: "Hãy để tôi kiểm tra hệ thống cho ông ngay lập tức. Có một chuyến bay khác được điều hành bởi hãng hàng không đối tác của chúng tôi, chuyến bay này khởi hành trong bốn mươi lăm phút nữa." },
              { speaker: "Passenger", "en": "That would be perfect! Is it possible to transfer my ticket to that flight without paying extra fees?", vi: "Thế thì thật hoàn hảo! Có khả năng nào để chuyển vé của tôi sang chuyến bay đó mà không phải trả thêm phí không?" },
              { speaker: "Agent", "en": "Yes, we can transfer your booking for free because the delay is our responsibility. I will print your new boarding pass right away.", vi: "Có, chúng tôi có thể chuyển đặt chỗ của ông miễn phí vì sự chậm trễ là trách nhiệm của chúng tôi. Tôi sẽ in thẻ lên máy bay mới của ông ngay lập tức." },
              { speaker: "Passenger", "en": "Thank you for handling the situation so efficiently. Where is the gate which I need to go to for this new flight?", vi: "Cảm ơn bạn đã xử lý tình huống một cách hiệu quả như vậy. Cổng nào mà tôi cần đi tới cho chuyến bay mới này ở đâu?" },
              { speaker: "Agent", "en": "You need to proceed to Gate 8, which is located in Terminal 2. You will have to take the shuttle bus to get there quickly.", vi: "Ông cần tiến tới Cổng 8, cái mà nằm ở Nhà ga số 2. Ông sẽ phải đi xe buýt đưa đón để đến đó thật nhanh." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 9: Bài 17 (orderIndex 16), Bài 18 (orderIndex 17)
  {
    fileName: 'pet-dialogue-cum9.json',
    lessons: [
      {
        orderIndex: 16,
        dialogues: [
          {
            title: "Visiting an art gallery",
            lines: [
              { speaker: "Emma", "en": "Have you seen the new exhibition which just opened at the National Gallery? It features paintings by several famous contemporary artists.", vi: "Bạn đã xem triển lãm mới cái mà vừa mở cửa tại Phòng trưng bày Quốc gia chưa? Nó nổi bật với các bức tranh của một số nghệ sĩ đương đại nổi tiếng." },
              { speaker: "Liam", "en": "No, I haven't been there yet, but I read an amazing review about it in the newspaper. The abstract pieces are supposed to be incredible.", vi: "Chưa, tôi vẫn chưa đến đó, nhưng tôi đã đọc một bài đánh giá tuyệt vời về nó trên báo. Những tác phẩm trừu tượng được cho là rất đáng kinh ngạc." },
              { speaker: "Emma", "en": "I went there yesterday afternoon, and the portraits were extremely detailed and realistic. The colors which the artist used made the subjects look alive.", vi: "Tôi đã đến đó vào chiều hôm qua, và những bức chân dung cực kỳ chi tiết và chân thực. Những màu sắc mà người họa sĩ đã sử dụng khiến các chủ thể trông như đang sống." },
              { speaker: "Liam", "en": "I have always preferred landscape paintings over portraits because they feel more relaxing. Nature has a calming effect which I really enjoy.", vi: "Tôi luôn thích tranh phong cảnh hơn tranh chân dung vì chúng mang lại cảm giác thư giãn hơn. Thiên nhiên có một tác dụng làm dịu thứ mà tôi thực sự yêu thích." },
              { speaker: "Emma", "en": "There is a whole room dedicated to landscapes, which includes both mountains and ocean scenes. You will definitely love the watercolor paintings.", vi: "Có cả một căn phòng dành riêng cho phong cảnh, cái mà bao gồm cả cảnh núi non và đại dương. Chắc chắn bạn sẽ yêu thích những bức tranh màu nước." },
              { speaker: "Liam", "en": "We should go together this Saturday if you are free. We can spend a few hours admiring the artwork and then get some coffee.", vi: "Chúng ta nên đi cùng nhau vào thứ Bảy này nếu bạn rảnh. Chúng ta có thể dành vài giờ để chiêm ngưỡng các tác phẩm nghệ thuật và sau đó đi uống cà phê." },
              { speaker: "Emma", "en": "That sounds like a lovely plan! I can also show you the sculpture which won the international prize last year.", vi: "Nghe có vẻ là một kế hoạch dễ thương! Tôi cũng có thể chỉ cho bạn tác phẩm điêu khắc thứ mà đã giành được giải thưởng quốc tế năm ngoái." },
              { speaker: "Liam", "en": "I will buy the tickets online tonight so that we don't have to queue up. Art exhibitions are usually very crowded on weekends.", vi: "Tôi sẽ mua vé trực tuyến tối nay để chúng ta không phải xếp hàng. Các triển lãm nghệ thuật thường rất đông đúc vào cuối tuần." }
            ]
          },
          {
            title: "Discussing a music concert",
            lines: [
              { speaker: "Oliver", "en": "The rock concert which we attended last night was absolutely phenomenal. The lead singer's voice was so powerful that the crowd went crazy.", vi: "Buổi hòa nhạc rock mà chúng ta đã tham dự tối qua thực sự là một hiện tượng. Giọng hát của ca sĩ hát chính mạnh mẽ đến nỗi đám đông đã phát cuồng." },
              { speaker: "Mia", "en": "I totally agree! The guitarist played a solo which was the best performance I have ever seen. The energy in the stadium was electric.", vi: "Tôi hoàn toàn đồng ý! Nghệ sĩ guitar đã chơi một đoạn solo thứ mà là màn trình diễn tuyệt vời nhất tôi từng thấy. Năng lượng trong sân vận động thật bùng nổ." },
              { speaker: "Oliver", "en": "However, the sound system wasn't perfect, and the bass was a bit too loud for my ears. My ears are still ringing this morning.", vi: "Tuy nhiên, hệ thống âm thanh không hoàn hảo, và tiếng bass hơi quá lớn so với tai của tôi. Tai tôi vẫn còn lùng bùng vào sáng nay." },
              { speaker: "Mia", "en": "I noticed that too, but the spectacular light show completely distracted me from the noise. The visual effects were perfectly synchronized with the rhythm.", vi: "Tôi cũng nhận thấy điều đó, nhưng màn trình diễn ánh sáng ngoạn mục đã hoàn toàn làm tôi phân tâm khỏi tiếng ồn. Các hiệu ứng hình ảnh đã được đồng bộ hóa hoàn hảo với nhịp điệu." },
              { speaker: "Oliver", "en": "They performed all their classic hits, which everyone in the audience sang along to. It was a memorable experience to share with thousands of fans.", vi: "Họ đã biểu diễn tất cả các bản hit cổ điển của họ, thứ mà tất cả mọi người trong khán giả đều hát theo. Đó là một trải nghiệm đáng nhớ khi được chia sẻ cùng hàng ngàn người hâm mộ." },
              { speaker: "Mia", "en": "Did you manage to buy any merchandise after the show ended? The queues for the t-shirts were extremely long when we left.", vi: "Bạn có xoay xở mua được bất kỳ món đồ lưu niệm nào sau khi buổi biểu diễn kết thúc không? Hàng người xếp hàng mua áo thun cực kỳ dài khi chúng ta rời đi." },
              { speaker: "Oliver", "en": "I bought a poster which features the band's signatures. I am going to frame it and hang it on my bedroom wall.", vi: "Tôi đã mua một tấm áp phích cái mà có chữ ký của ban nhạc. Tôi dự định sẽ đóng khung nó và treo nó trên tường phòng ngủ của mình." },
              { speaker: "Mia", "en": "That is an awesome souvenir! We must definitely book tickets when they go on tour again next year.", vi: "Đó là một món quà lưu niệm tuyệt vời! Chúng ta chắc chắn phải đặt vé khi họ đi lưu diễn trở lại vào năm sau." }
            ]
          }
        ]
      },
      {
        orderIndex: 17,
        dialogues: [
          {
            title: "Talking about news sources",
            lines: [
              { speaker: "Noah", "en": "I read an interesting article in the daily newspaper this morning, which discussed the local election results. The political situation seems to be changing rapidly.", vi: "Sáng nay tôi đã đọc một bài báo thú vị trên tờ nhật báo, cái mà thảo luận về kết quả bầu cử địa phương. Tình hình chính trị có vẻ như đang thay đổi nhanh chóng." },
              { speaker: "Ava", "en": "I prefer reading news on the internet because websites are updated instantly when something happens. Printed newspapers are often out of date by the time they are published.", vi: "Tôi thích đọc tin tức trên internet hơn vì các trang web được cập nhật ngay lập tức khi có sự kiện gì đó xảy ra. Báo in thường đã bị lỗi thời vào lúc chúng được xuất bản." },
              { speaker: "Noah", "en": "That is true, but online articles sometimes contain fake news which is spread by unreliable sources. I trust the established journalists who work for traditional media.", vi: "Điều đó đúng, nhưng các bài báo trực tuyến đôi khi chứa những tin tức giả mạo thứ mà bị lan truyền bởi các nguồn không đáng tin cậy. Tôi tin tưởng những nhà báo lâu năm những người làm việc cho truyền thông truyền thống." },
              { speaker: "Ava", "en": "You have to verify the facts across different websites to make sure the information is accurate. Social media can be very misleading if you are not careful.", vi: "Bạn phải xác minh các dữ kiện qua nhiều trang web khác nhau để đảm bảo thông tin là chính xác. Mạng xã hội có thể rất dễ gây hiểu lầm nếu bạn không cẩn thận." },
              { speaker: "Noah", "en": "My grandfather still listens to the radio, which broadcasts detailed news bulletins every hour. He enjoys the deep analysis provided by the expert commentators.", vi: "Ông của tôi vẫn nghe đài phát thanh, thứ mà phát sóng các bản tin chi tiết mỗi giờ. Ông ấy thích những phân tích sâu sắc được cung cấp bởi các bình luận viên chuyên môn." },
              { speaker: "Ava", "en": "Podcasts have become very popular recently, and they offer high-quality journalism in an audio format. You can listen to them while you are commuting to work.", vi: "Podcast đã trở nên rất phổ biến dạo gần đây, và chúng cung cấp báo chí chất lượng cao ở định dạng âm thanh. Bạn có thể nghe chúng trong khi bạn đang đi lại tới chỗ làm." },
              { speaker: "Noah", "en": "I will try downloading a news podcast today, which might save me some time. It is crucial to stay informed about global events.", vi: "Hôm nay tôi sẽ thử tải xuống một podcast tin tức, điều này có thể sẽ tiết kiệm cho tôi một ít thời gian. Việc giữ cho bản thân được cập nhật thông tin về các sự kiện toàn cầu là rất quan trọng." },
              { speaker: "Ava", "en": "A well-informed citizen can make better decisions, especially when voting. The media plays a powerful role in shaping public opinions.", vi: "Một công dân nắm bắt thông tin tốt có thể đưa ra những quyết định tốt hơn, đặc biệt là khi bỏ phiếu. Truyền thông đóng một vai trò mạnh mẽ trong việc định hình các quan điểm của công chúng." }
            ]
          },
          {
            title: "Discussing an interview",
            lines: [
              { speaker: "Reporter", "en": "Thank you for accepting this interview, which will be broadcast on national television tonight. Our viewers are very eager to hear about your latest film.", vi: "Cảm ơn vì đã chấp nhận cuộc phỏng vấn này, cuộc phỏng vấn mà sẽ được phát sóng trên truyền hình quốc gia tối nay. Khán giả của chúng tôi đang rất háo hức muốn nghe về bộ phim mới nhất của bạn." },
              { speaker: "Actor", "en": "It is a pleasure to be here. This project, which took two years to film, is definitely the most challenging work of my career.", vi: "Thật hân hạnh khi được ở đây. Dự án này, dự án mà đã mất hai năm để quay, chắc chắn là tác phẩm thử thách nhất trong sự nghiệp của tôi." },
              { speaker: "Reporter", "en": "Many critics have praised your performance, calling it a masterpiece of modern cinema. What inspired you to accept such a complex role?", vi: "Nhiều nhà phê bình đã khen ngợi màn trình diễn của bạn, gọi nó là một kiệt tác của điện ảnh hiện đại. Điều gì đã truyền cảm hứng cho bạn để chấp nhận một vai diễn phức tạp như vậy?" },
              { speaker: "Actor", "en": "I was fascinated by the script, which was written by an incredibly talented young director. The character has a deep psychological background which I wanted to explore.", vi: "Tôi đã bị cuốn hút bởi kịch bản, cái mà được viết bởi một đạo diễn trẻ vô cùng tài năng. Nhân vật có một bối cảnh tâm lý sâu sắc thứ mà tôi muốn khám phá." },
              { speaker: "Reporter", "en": "There was a rumor that you performed all your own stunts during the action sequences. Is that true, or did you use a professional stunt double?", vi: "Đã có một tin đồn rằng bạn đã tự mình thực hiện tất cả các pha nguy hiểm trong suốt các phân cảnh hành động. Điều đó có đúng không, hay bạn đã sử dụng một người đóng thế chuyên nghiệp?" },
              { speaker: "Actor", "en": "I performed most of them, but I needed a stunt double for the scene where I jump off the roof. Safety is always the highest priority on set.", vi: "Tôi đã tự thực hiện hầu hết chúng, nhưng tôi đã cần một người đóng thế cho cảnh quay nơi tôi nhảy khỏi mái nhà. Sự an toàn luôn là ưu tiên cao nhất trên phim trường." },
              { speaker: "Reporter", "en": "Your fans, who are waiting outside the studio, will be thrilled to watch this movie. Do you have any message for them before we conclude?", vi: "Người hâm mộ của bạn, những người đang chờ đợi bên ngoài trường quay, sẽ rất phấn khích khi xem bộ phim này. Bạn có thông điệp nào dành cho họ trước khi chúng ta kết thúc không?" },
              { speaker: "Actor", "en": "I just want to express my gratitude for their endless support over the years. I hope they enjoy the film which we worked so hard to create.", vi: "Tôi chỉ muốn bày tỏ sự biết ơn của mình vì sự ủng hộ không ngừng nghỉ của họ qua nhiều năm. Tôi hy vọng họ sẽ thích bộ phim cái mà chúng tôi đã làm việc rất chăm chỉ để tạo ra." }
            ]
          }
        ]
      }
    ]
  },
  // Cụm 10: Bài 19 (orderIndex 18), Bài 20 (orderIndex 19)
  {
    fileName: 'pet-dialogue-cum10.json',
    lessons: [
      {
        orderIndex: 18,
        dialogues: [
          {
            title: "Talking about a novel",
            lines: [
              { speaker: "Sarah", "en": "I have just finished reading the fantasy novel which you lent me last week. The author created a magical world which is incredibly imaginative.", vi: "Tôi vừa mới đọc xong cuốn tiểu thuyết giả tưởng mà bạn đã cho tôi mượn tuần trước. Tác giả đã tạo ra một thế giới phép thuật cái mà vô cùng giàu trí tưởng tượng." },
              { speaker: "John", "en": "I am glad you liked it! The plot twists in the second half of the book were completely unexpected, weren't they?", vi: "Tôi rất vui vì bạn đã thích nó! Những cú ngoặt cốt truyện ở nửa sau của cuốn sách hoàn toàn không thể lường trước được, đúng không?" },
              { speaker: "Sarah", "en": "Absolutely, I couldn't put the book down until I reached the final page. The main character, who starts as an ordinary farmer, develops into a brave hero.", vi: "Chắc chắn rồi, tôi đã không thể đặt cuốn sách xuống cho đến khi tôi đọc đến trang cuối cùng. Nhân vật chính, người bắt đầu như một nông dân bình thường, phát triển thành một anh hùng dũng cảm." },
              { speaker: "John", "en": "The character development is excellent, and the descriptive language makes you feel like you are there. I have already bought the sequel, which was published yesterday.", vi: "Sự phát triển nhân vật rất xuất sắc, và ngôn ngữ miêu tả khiến bạn cảm thấy như mình đang ở đó. Tôi đã mua luôn phần tiếp theo, cuốn mà được xuất bản hôm qua." },
              { speaker: "Sarah", "en": "Oh, please lend it to me as soon as you finish reading it! I am dying to know what happens to the kingdom next.", vi: "Ồ, làm ơn cho tôi mượn nó ngay khi bạn đọc xong nhé! Tôi đang chết mê chết mệt muốn biết điều gì sẽ xảy ra với vương quốc tiếp theo." },
              { speaker: "John", "en": "I am a fast reader, so I should be done with it by this weekend. We can discuss both books when we meet for coffee.", vi: "Tôi là một người đọc nhanh, vì vậy tôi sẽ đọc xong nó vào cuối tuần này. Chúng ta có thể thảo luận về cả hai cuốn sách khi gặp nhau uống cà phê." },
              { speaker: "Sarah", "en": "That sounds perfect! Reading fiction is such a wonderful way to escape from the stress of daily life.", vi: "Nghe thật hoàn hảo! Đọc tiểu thuyết hư cấu là một cách tuyệt vời để thoát khỏi những căng thẳng của cuộc sống hằng ngày." },
              { speaker: "John", "en": "Indeed, a good story can transport you to places which you have never imagined. Literature is truly a powerful form of art.", vi: "Quả thật, một câu chuyện hay có thể đưa bạn đến những nơi mà bạn chưa từng tưởng tượng. Văn học thực sự là một hình thức nghệ thuật đầy sức mạnh." }
            ]
          },
          {
            title: "Visiting a library",
            lines: [
              { speaker: "Student", "en": "Excuse me, I am looking for a biography of Albert Einstein which was recommended by my physics professor. Could you help me find it?", vi: "Xin lỗi, tôi đang tìm một cuốn tiểu sử về Albert Einstein cuốn mà đã được giáo sư vật lý của tôi giới thiệu. Bạn có thể giúp tôi tìm nó không?" },
              { speaker: "Librarian", "en": "Of course! Biographies are located on the second floor, in the non-fiction section. Do you know the exact title or the author's name?", vi: "Tất nhiên rồi! Các cuốn tiểu sử được đặt ở tầng hai, trong khu vực sách phi hư cấu. Bạn có biết tựa đề chính xác hoặc tên tác giả không?" },
              { speaker: "Student", "en": "I think the author's surname is Isaacson, but I am not entirely sure. It is supposed to be a very detailed book about his life and theories.", vi: "Tôi nghĩ họ của tác giả là Isaacson, nhưng tôi không hoàn toàn chắc chắn. Nó được cho là một cuốn sách rất chi tiết về cuộc đời và các lý thuyết của ông ấy." },
              { speaker: "Librarian", "en": "Let me search the catalog on the computer. Yes, we have two copies of that book, which are currently available on the shelf.", vi: "Để tôi tìm kiếm trong danh mục trên máy tính. Vâng, chúng tôi có hai bản sao của cuốn sách đó, những cuốn mà hiện đang có sẵn trên kệ." },
              { speaker: "Student", "en": "That is wonderful news because I need it for an essay which is due next week. How many books am I allowed to borrow at the same time?", vi: "Đó là một tin tuyệt vời vì tôi cần nó cho một bài luận bài mà đến hạn vào tuần sau. Tôi được phép mượn bao nhiêu cuốn sách cùng một lúc?" },
              { speaker: "Librarian", "en": "With a student card, you can borrow up to five books for a period of three weeks. Please bring the books to the front desk when you are ready.", vi: "Với thẻ sinh viên, bạn có thể mượn tối đa năm cuốn sách trong khoảng thời gian ba tuần. Vui lòng mang sách đến quầy lễ tân khi bạn đã sẵn sàng." },
              { speaker: "Student", "en": "I will also look for a poetry collection while I am upstairs. I enjoy reading poems which explore the beauty of nature.", vi: "Tôi cũng sẽ tìm kiếm một tập thơ trong khi tôi ở trên lầu. Tôi thích đọc những bài thơ những bài mà khám phá vẻ đẹp của thiên nhiên." },
              { speaker: "Librarian", "en": "The poetry section is right next to the biographies, so you will find it easily. Let me know if you need any further assistance.", vi: "Khu vực thơ ca nằm ngay cạnh khu tiểu sử, vì vậy bạn sẽ tìm thấy nó dễ dàng. Hãy cho tôi biết nếu bạn cần bất kỳ sự hỗ trợ nào thêm." }
            ]
          }
        ]
      },
      {
        orderIndex: 19,
        dialogues: [
          {
            title: "Buying a new smartphone",
            lines: [
              { speaker: "Mark", "en": "I am looking for a new smartphone which has a high-quality camera. My current phone is five years old, and it has become very slow.", vi: "Tôi đang tìm kiếm một chiếc điện thoại thông minh mới cái mà có camera chất lượng cao. Điện thoại hiện tại của tôi đã năm năm tuổi, và nó đã trở nên rất chậm." },
              { speaker: "Salesperson", "en": "We have the latest model from TechPro, which features an incredible camera system. It takes stunning photos even in low light conditions.", vi: "Chúng tôi có mẫu mới nhất từ TechPro, mẫu mà sở hữu hệ thống camera đáng kinh ngạc. Nó chụp được những bức ảnh tuyệt đẹp ngay cả trong điều kiện ánh sáng yếu." },
              { speaker: "Mark", "en": "That sounds perfect, but I am also concerned about the battery life. I often use my phone for navigation when I am driving.", vi: "Nghe hoàn hảo đấy, nhưng tôi cũng quan tâm đến thời lượng pin. Tôi thường sử dụng điện thoại của mình để điều hướng khi tôi đang lái xe." },
              { speaker: "Salesperson", "en": "This model has a massive battery which can last for two days on a single charge. It also supports fast charging, which is very convenient.", vi: "Mẫu này có một viên pin khổng lồ cái mà có thể kéo dài trong hai ngày chỉ với một lần sạc. Nó cũng hỗ trợ sạc nhanh, điều này rất tiện lợi." },
              { speaker: "Mark", "en": "How much storage capacity does it have? I download a lot of large applications which take up a lot of space.", vi: "Nó có dung lượng lưu trữ bao nhiêu? Tôi tải xuống rất nhiều ứng dụng lớn những ứng dụng chiếm rất nhiều không gian." },
              { speaker: "Salesperson", "en": "It comes with 256 gigabytes of storage, and you can also expand it using a memory card. Would you like to test the device yourself?", vi: "Nó đi kèm với 256 gigabyte bộ nhớ, và bạn cũng có thể mở rộng nó bằng cách sử dụng thẻ nhớ. Bạn có muốn tự mình thử nghiệm thiết bị không?" },
              { speaker: "Mark", "en": "Yes, please. The screen resolution is remarkably clear, and the interface is very smooth to operate.", vi: "Vâng, làm ơn. Độ phân giải màn hình rõ ràng một cách đáng chú ý, và giao diện rất mượt mà khi thao tác." },
              { speaker: "Salesperson", "en": "It is currently on sale, so you get a twenty percent discount if you buy it today. It is definitely the best deal which we offer.", vi: "Nó hiện đang được giảm giá, vì vậy bạn được giảm giá hai mươi phần trăm nếu bạn mua nó hôm nay. Nó chắc chắn là thỏa thuận tốt nhất cái mà chúng tôi cung cấp." }
            ]
          },
          {
            title: "Discussing artificial intelligence",
            lines: [
              { speaker: "Daniel", "en": "I watched a fascinating documentary about artificial intelligence last night. The robots which are being developed can perform complex surgeries with extreme precision.", vi: "Tôi đã xem một bộ phim tài liệu hấp dẫn về trí tuệ nhân tạo tối qua. Những robot mà đang được phát triển có thể thực hiện các ca phẫu thuật phức tạp với độ chính xác cực cao." },
              { speaker: "Chloe", "en": "Technology is advancing so fast that it is sometimes scary to think about the future. Will machines replace doctors completely one day?", vi: "Công nghệ đang tiến bộ quá nhanh đến nỗi đôi khi thật đáng sợ khi nghĩ về tương lai. Liệu máy móc có thay thế hoàn toàn bác sĩ vào một ngày nào đó không?" },
              { speaker: "Daniel", "en": "I don't think they will replace doctors entirely, but they will serve as powerful tools. An AI system can analyze medical data much faster than a human.", vi: "Tôi không nghĩ chúng sẽ thay thế bác sĩ hoàn toàn, nhưng chúng sẽ đóng vai trò như những công cụ mạnh mẽ. Một hệ thống AI có thể phân tích dữ liệu y tế nhanh hơn nhiều so với con người." },
              { speaker: "Chloe", "en": "That is definitely an advantage, but what about the jobs which involve creative thinking? Computers cannot write emotional poetry or compose original music.", vi: "Đó chắc chắn là một lợi thế, nhưng còn những công việc đòi hỏi tư duy sáng tạo thì sao? Máy tính không thể viết thơ giàu cảm xúc hoặc sáng tác âm nhạc nguyên bản." },
              { "speaker": "Daniel", "en": "Actually, some programs have been trained to compose music which sounds surprisingly good. However, they lack the true human emotions which make art special.", "vi": "Thực ra, một số chương trình đã được đào tạo để sáng tác âm nhạc thứ mà nghe hay một cách đáng ngạc nhiên. Tuy nhiên, chúng thiếu đi những cảm xúc chân thực của con người thứ tạo nên sự đặc biệt cho nghệ thuật." },
              { "speaker": "Chloe", "en": "I worry about privacy issues when algorithms collect so much personal data. Companies know exactly what we want to buy before we even search for it.", "vi": "Tôi lo lắng về các vấn đề quyền riêng tư khi các thuật toán thu thập quá nhiều dữ liệu cá nhân. Các công ty biết chính xác chúng ta muốn mua gì trước cả khi chúng ta tìm kiếm nó." },
              { "speaker": "Daniel", "en": "That is a valid concern, and governments need to pass strict laws to regulate AI. We must ensure that technology benefits society instead of controlling it.", "vi": "Đó là một mối quan tâm chính đáng, và các chính phủ cần thông qua những luật lệ nghiêm ngặt để quản lý AI. Chúng ta phải đảm bảo rằng công nghệ mang lại lợi ích cho xã hội thay vì kiểm soát nó." },
              { "speaker": "Chloe", "en": "It is a complex issue, but we cannot stop the progress of innovation. We must learn to adapt to these new technologies responsibly.", "vi": "Đó là một vấn đề phức tạp, nhưng chúng ta không thể ngăn cản sự tiến bộ của đổi mới. Chúng ta phải học cách thích nghi với những công nghệ mới này một cách có trách nhiệm." }
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
  console.log("Hoàn thành cụm 6, 7, 8, 9, 10!");
}

seedBatches()
  .finally(() => prisma.$disconnect());

/**
 * SEED SCRIPT: KET Dialogue - Batch 5 (orderIndex 20 -> 27)
 */
const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

const DIALOGUE_DATA = [
  {
    orderIndex: 20, // Bài 21 (Học tập & thi cử)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Exam Preparation",
          lines: [
            { speaker: "Tony", en: "I have been studying for this exam since early morning, but I am still nervous.", vi: "Tôi đã học cho kỳ thi này từ sáng sớm, nhưng tôi vẫn còn lo lắng." },
            { speaker: "Jenny", en: "She has lived in this city for ten years, so she knows the best libraries.", vi: "Cô ấy đã sống ở thành phố này mười năm, vì vậy cô ấy biết những thư viện tốt nhất." },
            { speaker: "Tony", en: "How long have you been learning French, because your pronunciation is excellent?", vi: "Bạn đã học tiếng Pháp được bao lâu rồi, vì cách phát âm của bạn thật xuất sắc?" },
            { speaker: "Jenny", en: "I asked him to lend me his textbook, but he refused.", vi: "Tôi đã yêu cầu anh ấy cho tôi mượn sách giáo khoa của anh ấy, nhưng anh ấy từ chối." },
            { speaker: "Tony", en: "The teacher told us to study hard, so we could pass the test.", vi: "Giáo viên bảo chúng tôi học tập chăm chỉ, để chúng tôi có thể vượt qua bài kiểm tra." },
            { speaker: "Jenny", en: "They have been waiting for the result since last week.", vi: "Họ đã chờ đợi kết quả kể từ tuần trước." },
            { speaker: "Tony", en: "I asked the professor to explain the grammar rule again.", vi: "Tôi đã yêu cầu giáo sư giải thích lại quy tắc ngữ pháp." },
            { speaker: "Jenny", en: "We have known each other for a long time, so we often study together.", vi: "Chúng tôi đã biết nhau trong một thời gian dài, vì vậy chúng tôi thường học cùng nhau." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Language Class",
          lines: [
            { speaker: "Peter", en: "How long has he been working on this difficult project?", vi: "Anh ấy đã làm việc trong dự án khó khăn này bao lâu rồi?" },
            { speaker: "Mary", en: "He has been doing it since Monday, and he is very tired.", vi: "Anh ấy đã làm việc đó từ thứ Hai, và anh ấy rất mệt." },
            { speaker: "Peter", en: "My mother told me to turn off the computer and go to sleep.", vi: "Mẹ tôi bảo tôi tắt máy tính và đi ngủ." },
            { speaker: "Mary", en: "I asked my friend to help me with the math homework.", vi: "Tôi nhờ bạn tôi giúp tôi làm bài tập toán về nhà." },
            { speaker: "Peter", en: "We have been learning English for five years, so we can speak fluently.", vi: "Chúng tôi đã học tiếng Anh được năm năm, vì vậy chúng tôi có thể nói trôi chảy." },
            { speaker: "Mary", en: "The student asked the teacher to repeat the question.", vi: "Học sinh yêu cầu giáo viên lặp lại câu hỏi." },
            { speaker: "Peter", en: "She has been reading that book since she arrived at the library.", vi: "Cô ấy đã đang đọc cuốn sách đó kể từ khi cô ấy đến thư viện." },
            { speaker: "Mary", en: "I told my brother to be quiet, because I was trying to concentrate.", vi: "Tôi bảo em trai tôi giữ im lặng, bởi vì tôi đang cố gắng tập trung." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 21, // Bài 22 (Giải trí & sở thích)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Hobbies and Free Time",
          lines: [
            { speaker: "Alex", en: "I really enjoy collecting stamps, because it is very relaxing.", vi: "Tôi thực sự thích sưu tập tem, bởi vì nó rất thư giãn." },
            { speaker: "Emma", en: "She loves taking photographs, and she is very good at it too.", vi: "Cô ấy thích chụp ảnh, và cô ấy cũng rất giỏi việc đó." },
            { speaker: "Alex", en: "I don't like playing chess, because it requires too much thinking.", vi: "Tôi không thích chơi cờ vua, bởi vì nó đòi hỏi suy nghĩ quá nhiều." },
            { speaker: "Emma", en: "I don't like it either, so we can play something else instead.", vi: "Tôi cũng không thích nó, nên thay vào đó chúng ta có thể chơi thứ khác." },
            { speaker: "Alex", en: "Do you like listening to rock music, or do you prefer pop?", vi: "Bạn có thích nghe nhạc rock không, hay bạn thích nhạc pop hơn?" },
            { speaker: "Emma", en: "I love listening to pop music, and my sister loves it too.", vi: "Tôi thích nghe nhạc pop, và em gái tôi cũng thích nó." },
            { speaker: "Alex", en: "We enjoy spending time outdoors, because the weather is lovely.", vi: "Chúng tôi thích dành thời gian ngoài trời, bởi vì thời tiết rất đẹp." },
            { speaker: "Emma", en: "They hate getting up early, and I hate it either.", vi: "Họ ghét dậy sớm, và tôi cũng ghét việc đó." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Planning a Weekend",
          lines: [
            { speaker: "Liam", en: "I love watching movies at the cinema, because the screen is huge.", vi: "Tôi thích xem phim ở rạp, bởi vì màn hình rất lớn." },
            { speaker: "Mia", en: "I enjoy watching them too, so let's go this Saturday.", vi: "Tôi cũng thích xem chúng, nên hãy đi vào thứ Bảy này." },
            { speaker: "Liam", en: "He hates cleaning his room, but he has to do it every week.", vi: "Anh ấy ghét dọn dẹp phòng của mình, nhưng anh ấy phải làm điều đó mỗi tuần." },
            { speaker: "Mia", en: "I don't enjoy cooking, and my brother doesn't like it either.", vi: "Tôi không thích nấu ăn, và anh trai tôi cũng không thích nó." },
            { speaker: "Liam", en: "Do you enjoy reading comics, because I have a large collection?", vi: "Bạn có thích đọc truyện tranh không, vì tôi có một bộ sưu tập lớn?" },
            { speaker: "Mia", en: "Yes, I absolutely love reading them, especially before going to bed.", vi: "Vâng, tôi hoàn toàn thích đọc chúng, đặc biệt là trước khi đi ngủ." },
            { speaker: "Liam", en: "I like playing video games, and my friends like it too.", vi: "Tôi thích chơi trò chơi điện tử, và bạn bè của tôi cũng thích nó." },
            { speaker: "Mia", en: "Let's organize a game night, so we can have fun together.", vi: "Hãy tổ chức một đêm chơi game, để chúng ta có thể vui vẻ cùng nhau." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 22, // Bài 23 (Âm nhạc & kịch)
    dialogues: [
      {
        content: JSON.stringify({
          title: "A Concert Experience",
          lines: [
            { speaker: "Tony", en: "I used to play the piano, but I don't have time anymore.", vi: "Tôi đã từng chơi piano, nhưng tôi không còn thời gian nữa." },
            { speaker: "Jenny", en: "This new song is as popular as the old one, which is amazing.", vi: "Bài hát mới này cũng phổ biến như bài hát cũ, điều đó thật tuyệt vời." },
            { speaker: "Tony", en: "He didn't use to like jazz music, but now he loves it.", vi: "Anh ấy từng không thích nhạc jazz, nhưng bây giờ anh ấy rất thích nó." },
            { speaker: "Jenny", en: "Did you use to go to concerts when you were a teenager?", vi: "Bạn có từng đi xem hòa nhạc khi bạn còn là thanh thiếu niên không?" },
            { speaker: "Tony", en: "Yes, I did, and the atmosphere was always as exciting as a festival.", vi: "Có, tôi đã từng, và bầu không khí luôn thú vị như một lễ hội." },
            { speaker: "Jenny", en: "The concert tonight is not as crowded as I expected.", vi: "Buổi hòa nhạc tối nay không đông đúc như tôi mong đợi." },
            { speaker: "Tony", en: "They used to practice in a garage, before they became famous.", vi: "Họ từng luyện tập trong một ga ra, trước khi họ trở nên nổi tiếng." },
            { speaker: "Jenny", en: "The drummer is as talented as the singer, so the band is great.", vi: "Tay trống cũng tài năng như ca sĩ, nên ban nhạc rất tuyệt vời." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Learning an Instrument",
          lines: [
            { speaker: "Peter", en: "I didn't use to listen to classical music, but it helps me study.", vi: "Tôi đã từng không nghe nhạc cổ điển, nhưng nó giúp tôi học tập." },
            { speaker: "Mary", en: "Learning the guitar is not as difficult as learning the violin.", vi: "Học chơi guitar không khó bằng học chơi violin." },
            { speaker: "Peter", en: "She used to sing in a choir, when she was in high school.", vi: "Cô ấy từng hát trong một dàn hợp xướng, khi cô ấy học trung học." },
            { speaker: "Mary", en: "Did he use to play the drums, because he has a good rhythm?", vi: "Anh ấy có từng chơi trống không, vì anh ấy có nhịp điệu tốt?" },
            { speaker: "Peter", en: "The new album is as good as their previous one.", vi: "Album mới cũng hay như album trước của họ." },
            { speaker: "Mary", en: "I used to hate practicing scales, but now I understand their importance.", vi: "Tôi từng ghét việc luyện tập âm giai, nhưng bây giờ tôi hiểu tầm quan trọng của chúng." },
            { speaker: "Peter", en: "This theatre is as big as the one in the city centre.", vi: "Nhà hát này cũng lớn như nhà hát ở trung tâm thành phố." },
            { speaker: "Mary", en: "We used to watch plays there, and the actors were brilliant.", vi: "Chúng tôi đã từng xem các vở kịch ở đó, và các diễn viên thật xuất sắc." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 23, // Bài 24 (Nghệ thuật & triển lãm)
    dialogues: [
      {
        content: JSON.stringify({
          title: "At the Art Gallery",
          lines: [
            { speaker: "Alex", en: "This beautiful picture was painted by a famous artist in 1890.", vi: "Bức tranh tuyệt đẹp này được vẽ bởi một họa sĩ nổi tiếng vào năm 1890." },
            { speaker: "Emma", en: "The colours are so bright, which makes me feel very happy.", vi: "Màu sắc rất tươi sáng, điều này làm tôi cảm thấy rất hạnh phúc." },
            { speaker: "Alex", en: "The sculpture was discovered in an old cave last century.", vi: "Bức điêu khắc được phát hiện trong một hang động cũ vào thế kỷ trước." },
            { speaker: "Emma", en: "Looking at modern art always makes him a bit confused.", vi: "Nhìn vào nghệ thuật hiện đại luôn khiến anh ấy hơi bối rối." },
            { speaker: "Alex", en: "These photographs were taken by my grandfather during the war.", vi: "Những bức ảnh này được chụp bởi ông tôi trong suốt cuộc chiến tranh." },
            { speaker: "Emma", en: "The sad story behind the painting makes me cry.", vi: "Câu chuyện buồn đằng sau bức tranh khiến tôi khóc." },
            { speaker: "Alex", en: "The exhibition was visited by thousands of people yesterday.", vi: "Triển lãm đã được hàng ngàn người đến thăm ngày hôm qua." },
            { speaker: "Emma", en: "The soft music in the gallery makes the atmosphere very peaceful.", vi: "Âm nhạc nhẹ nhàng trong phòng trưng bày làm cho bầu không khí rất yên bình." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "A Creative Hobby",
          lines: [
            { speaker: "Liam", en: "The prize was won by a young student, which surprised everyone.", vi: "Giải thưởng đã được giành bởi một học sinh trẻ tuổi, điều này làm mọi người ngạc nhiên." },
            { speaker: "Mia", en: "Practicing drawing every day makes you a better artist.", vi: "Luyện tập vẽ mỗi ngày giúp bạn trở thành một nghệ sĩ tốt hơn." },
            { speaker: "Liam", en: "This famous bridge was designed by an Italian architect.", vi: "Cây cầu nổi tiếng này được thiết kế bởi một kiến trúc sư người Ý." },
            { speaker: "Mia", en: "The funny movie makes the children laugh a lot.", vi: "Bộ phim hài hước làm cho bọn trẻ cười rất nhiều." },
            { speaker: "Liam", en: "The walls were decorated with colorful posters and beautiful lights.", vi: "Các bức tường được trang trí bằng những tấm áp phích đầy màu sắc và ánh đèn đẹp mắt." },
            { speaker: "Mia", en: "Her angry voice made the dog run away immediately.", vi: "Giọng nói tức giận của cô ấy khiến con chó chạy đi ngay lập tức." },
            { speaker: "Liam", en: "The museum was built in 1950, and it is still very popular.", vi: "Bảo tàng được xây dựng vào năm 1950, và nó vẫn rất nổi tiếng." },
            { speaker: "Mia", en: "Seeing all these beautiful paintings makes me want to learn painting.", vi: "Nhìn thấy tất cả những bức tranh tuyệt đẹp này khiến tôi muốn học hội họa." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 24, // Bài 25 (Báo chí & thông tin)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Reading the News",
          lines: [
            { speaker: "Tony", en: "Although it was raining heavily, the reporter still went outside.", vi: "Mặc dù trời đang mưa lớn, người phóng viên vẫn đi ra ngoài." },
            { speaker: "Jenny", en: "The article was very long; however, I read it completely.", vi: "Bài báo rất dài; tuy nhiên, tôi đã đọc nó hoàn toàn." },
            { speaker: "Tony", en: "Both the newspaper and the magazine have interesting stories today.", vi: "Cả tờ báo và cuốn tạp chí đều có những câu chuyện thú vị hôm nay." },
            { speaker: "Jenny", en: "Despite the bad weather, the football match was not cancelled.", vi: "Bất chấp thời tiết xấu, trận bóng đá đã không bị hủy bỏ." },
            { speaker: "Tony", en: "You can read either the sports section or the local news.", vi: "Bạn có thể đọc phần thể thao hoặc tin tức địa phương." },
            { speaker: "Jenny", en: "Neither the radio nor the television is working right now.", vi: "Cả đài phát thanh và tivi đều không hoạt động lúc này." },
            { speaker: "Tony", en: "He bought the newspaper, although he didn't have time to read.", vi: "Anh ấy đã mua tờ báo, mặc dù anh ấy không có thời gian để đọc." },
            { speaker: "Jenny", en: "She enjoys both writing articles and taking photos for the blog.", vi: "Cô ấy thích cả việc viết báo và chụp ảnh cho trang blog." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Weather Forecast",
          lines: [
            { speaker: "Peter", en: "Despite feeling very tired, she finished writing the report.", vi: "Bất chấp cảm giác rất mệt mỏi, cô ấy đã hoàn thành việc viết báo cáo." },
            { speaker: "Mary", en: "The weather forecast said it would be sunny; however, it rained.", vi: "Dự báo thời tiết nói trời sẽ nắng; tuy nhiên, trời đã mưa." },
            { speaker: "Peter", en: "Neither my brother nor my sister likes watching the news.", vi: "Cả anh trai tôi và em gái tôi đều không thích xem bản tin." },
            { speaker: "Mary", en: "Although the headline was shocking, the story was quite boring.", vi: "Mặc dù tiêu đề rất gây sốc, câu chuyện lại khá nhàm chán." },
            { speaker: "Peter", en: "We can listen to the news either on the radio or online.", vi: "Chúng ta có thể nghe tin tức trên đài phát thanh hoặc trực tuyến." },
            { speaker: "Mary", en: "Both the journalist and the photographer arrived at the scene early.", vi: "Cả nhà báo và nhiếp ảnh gia đều đến hiện trường sớm." },
            { speaker: "Peter", en: "He failed the test, despite studying hard every night.", vi: "Anh ấy trượt bài kiểm tra, mặc dù đã học chăm chỉ mỗi đêm." },
            { speaker: "Mary", en: "I read the magazine, although I prefer reading books.", vi: "Tôi đã đọc cuốn tạp chí, mặc dù tôi thích đọc sách hơn." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 25, // Bài 26 (Tự nhiên & không gian)
    dialogues: [
      {
        content: JSON.stringify({
          title: "A Camping Trip",
          lines: [
            { speaker: "Alex", en: "The guide told us to stay together in the dark forest.", vi: "Người hướng dẫn bảo chúng tôi ở lại cùng nhau trong khu rừng tối." },
            { speaker: "Emma", en: "If I saw a bear, I would run away immediately.", vi: "Nếu tôi nhìn thấy một con gấu, tôi sẽ chạy trốn ngay lập tức." },
            { speaker: "Alex", en: "He ordered the children not to touch the wild plants.", vi: "Anh ấy ra lệnh cho bọn trẻ không được chạm vào những loài cây dại." },
            { speaker: "Emma", en: "If we had more money, we would travel to the moon.", vi: "Nếu chúng tôi có nhiều tiền hơn, chúng tôi sẽ đi du lịch lên mặt trăng." },
            { speaker: "Alex", en: "The captain commanded the team to set up the tent quickly.", vi: "Đội trưởng ra lệnh cho đội nhanh chóng dựng lều." },
            { speaker: "Emma", en: "If I were an astronaut, I would explore the entire universe.", vi: "Nếu tôi là một phi hành gia, tôi sẽ khám phá toàn bộ vũ trụ." },
            { speaker: "Alex", en: "My mother told me to bring a warm jacket for the trip.", vi: "Mẹ tôi bảo tôi mang theo một chiếc áo khoác ấm cho chuyến đi." },
            { speaker: "Emma", en: "If the sky were clear, we could see millions of stars.", vi: "Nếu bầu trời quang đãng, chúng ta có thể nhìn thấy hàng triệu vì sao." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Exploring Nature",
          lines: [
            { speaker: "Liam", en: "The police officer ordered them not to swim in the deep river.", vi: "Viên cảnh sát ra lệnh cho họ không được bơi ở dòng sông sâu." },
            { speaker: "Mia", en: "If I found a hidden cave, I would explore it carefully.", vi: "Nếu tôi tìm thấy một hang động ẩn, tôi sẽ khám phá nó cẩn thận." },
            { speaker: "Liam", en: "The scientist told us to observe the insects in the garden.", vi: "Nhà khoa học bảo chúng tôi quan sát những loài côn trùng trong vườn." },
            { speaker: "Mia", en: "If he lived in the mountains, he would climb every day.", vi: "Nếu anh ấy sống ở vùng núi, anh ấy sẽ leo núi mỗi ngày." },
            { speaker: "Liam", en: "She commanded the dog to sit down, and it obeyed her.", vi: "Cô ấy ra lệnh cho con chó ngồi xuống, và nó đã vâng lời cô ấy." },
            { speaker: "Mia", en: "If we didn't have gravity, we would float into space.", vi: "Nếu chúng ta không có trọng lực, chúng ta sẽ lơ lửng vào không gian." },
            { speaker: "Liam", en: "The ranger told the tourists to take their rubbish home.", vi: "Người kiểm lâm bảo du khách mang rác của họ về nhà." },
            { speaker: "Mia", en: "If I knew the answer, I would definitely tell you.", vi: "Nếu tôi biết câu trả lời, tôi chắc chắn sẽ nói cho bạn." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 26, // Bài 27 (Môi trường & thời tiết)
    dialogues: [
      {
        content: JSON.stringify({
          title: "Protecting the Earth",
          lines: [
            { speaker: "Tony", en: "I won't go outside unless the rain stops completely.", vi: "Tôi sẽ không ra ngoài trừ khi cơn mưa tạnh hoàn toàn." },
            { speaker: "Jenny", en: "The trash is collected every morning by the environmental workers.", vi: "Rác được thu gom mỗi buổi sáng bởi các công nhân vệ sinh môi trường." },
            { speaker: "Tony", en: "Take an umbrella in case it rains later this afternoon.", vi: "Mang theo một chiếc ô phòng trường hợp trời mưa vào chiều nay." },
            { speaker: "Jenny", en: "More trees should be planted to reduce the air pollution.", vi: "Nhiều cây xanh nên được trồng để giảm thiểu ô nhiễm không khí." },
            { speaker: "Tony", en: "We will miss the bus unless we hurry up now.", vi: "Chúng ta sẽ lỡ chuyến xe buýt trừ khi chúng ta nhanh lên ngay bây giờ." },
            { speaker: "Jenny", en: "Plastic bags are being banned in many supermarkets around the world.", vi: "Túi nilon đang bị cấm ở nhiều siêu thị trên khắp thế giới." },
            { speaker: "Tony", en: "Write down my phone number in case you get lost.", vi: "Hãy viết lại số điện thoại của tôi phòng trường hợp bạn bị lạc." },
            { speaker: "Jenny", en: "Solar energy must be used to protect our beautiful planet.", vi: "Năng lượng mặt trời phải được sử dụng để bảo vệ hành tinh xinh đẹp của chúng ta." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "A Windy Day",
          lines: [
            { speaker: "Peter", en: "Unless you wear a coat, you will catch a bad cold.", vi: "Trừ khi bạn mặc áo khoác, bạn sẽ bị cảm lạnh nặng." },
            { speaker: "Mary", en: "The old building was destroyed by the terrible storm last night.", vi: "Tòa nhà cũ đã bị phá hủy bởi cơn bão khủng khiếp đêm qua." },
            { speaker: "Peter", en: "I will bring some extra food in case we are hungry.", vi: "Tôi sẽ mang thêm một ít thức ăn phòng trường hợp chúng ta bị đói." },
            { speaker: "Mary", en: "The rivers have been polluted by the dangerous chemicals from factories.", vi: "Các dòng sông đã bị ô nhiễm bởi các hóa chất nguy hiểm từ các nhà máy." },
            { speaker: "Peter", en: "Unless we stop cutting down forests, the animals will die.", vi: "Trừ khi chúng ta ngừng việc chặt phá rừng, các loài động vật sẽ chết." },
            { speaker: "Mary", en: "A new recycling plant is going to be built next year.", vi: "Một nhà máy tái chế mới sẽ được xây dựng vào năm tới." },
            { speaker: "Peter", en: "Keep your windows closed in case the strong wind blows.", vi: "Hãy đóng kín cửa sổ của bạn phòng trường hợp có gió mạnh thổi tới." },
            { speaker: "Mary", en: "The clean water project was supported by many local people.", vi: "Dự án nước sạch đã được ủng hộ bởi nhiều người dân địa phương." }
          ]
        })
      }
    ]
  },
  {
    orderIndex: 27, // Bài 28 (Động vật)
    dialogues: [
      {
        content: JSON.stringify({
          title: "A Visit to the Vet",
          lines: [
            { speaker: "Alex", en: "I am having my dog's teeth checked at the vet tomorrow.", vi: "Tôi sẽ nhờ bác sĩ thú y kiểm tra răng cho con chó của tôi vào ngày mai." },
            { speaker: "Emma", en: "Did you find out what was wrong with your little cat?", vi: "Bạn đã tìm ra có chuyện gì không ổn với chú mèo nhỏ của bạn chưa?" },
            { speaker: "Alex", en: "Yes, we had its leg bandaged because it was injured.", vi: "Rồi, chúng tôi đã nhờ người băng bó chân cho nó vì nó bị thương." },
            { speaker: "Emma", en: "I am looking after my neighbor's bird while he is away.", vi: "Tôi đang chăm sóc con chim của người hàng xóm trong khi anh ấy đi vắng." },
            { speaker: "Alex", en: "They had their horses washed before the big show started.", vi: "Họ đã nhờ người tắm cho những con ngựa của họ trước khi buổi biểu diễn lớn bắt đầu." },
            { speaker: "Emma", en: "I am looking forward to seeing the new baby monkeys.", vi: "Tôi rất mong chờ được nhìn thấy những chú khỉ con mới sinh." },
            { speaker: "Alex", en: "We are having a new cage built for the beautiful parrots.", vi: "Chúng tôi đang nhờ người xây một chiếc lồng mới cho những con vẹt xinh đẹp." },
            { speaker: "Emma", en: "He gave up trying to catch the fast rabbit in the garden.", vi: "Anh ấy đã từ bỏ việc cố gắng bắt con thỏ chạy nhanh trong vườn." }
          ]
        })
      },
      {
        content: JSON.stringify({
          title: "Animal Care",
          lines: [
            { speaker: "Liam", en: "She had her cat's fur cut yesterday, because it was too long.", vi: "Cô ấy đã nhờ người cắt tỉa lông cho con mèo của mình hôm qua, vì nó quá dài." },
            { speaker: "Mia", en: "I took up horse riding last year, and I absolutely love it.", vi: "Tôi đã bắt đầu môn cưỡi ngựa vào năm ngoái, và tôi hoàn toàn yêu thích nó." },
            { speaker: "Liam", en: "We are having the fish tank cleaned by a professional company.", vi: "Chúng tôi đang nhờ một công ty chuyên nghiệp dọn dẹp bể cá." },
            { speaker: "Mia", en: "Our car broke down on the way to the famous zoo.", vi: "Xe của chúng tôi bị hỏng trên đường đến sở thú nổi tiếng." },
            { speaker: "Liam", en: "He had his dog trained to bring the newspaper every morning.", vi: "Anh ấy đã nhờ người huấn luyện con chó của mình để mang tờ báo đến mỗi sáng." },
            { speaker: "Mia", en: "We will set off early to see the wild elephants.", vi: "Chúng tôi sẽ khởi hành sớm để xem những con voi hoang dã." },
            { speaker: "Liam", en: "Are you having the cow milked by the new farm worker?", vi: "Bạn có nhờ người công nhân nông trại mới vắt sữa bò không?" },
            { speaker: "Mia", en: "Yes, and we will get back before it gets too dark.", vi: "Có, và chúng tôi sẽ quay trở lại trước khi trời quá tối." }
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

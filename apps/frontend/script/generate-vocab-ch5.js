const fs = require('fs');

const data = [
  // Cụm 19: Bài 37 & 38
  {
    cum: 19,
    lessons: [
      {
        order: 37,
        vocab: [
          { w: 'yesterday', ipa: '/ˈjes.tə.deɪ/', t: 'adverb', ts: 'adv.', m: 'hôm qua', ee: 'I played football yesterday.', ev: 'Tôi đã chơi bóng đá hôm qua.' },
          { w: 'ago', ipa: '/əˈɡəʊ/', t: 'adverb', ts: 'adv.', m: 'cách đây, trước đây', ee: 'Two years ago.', ev: 'Hai năm trước.' },
          { w: 'last week', ipa: '/lɑːst wiːk/', t: 'phrase', ts: 'phr.', m: 'tuần trước', ee: 'I visited my mother last week.', ev: 'Tôi đã thăm mẹ tôi vào tuần trước.' },
          { w: 'last month', ipa: '/lɑːst mʌnθ/', t: 'phrase', ts: 'phr.', m: 'tháng trước', ee: 'We traveled last month.', ev: 'Chúng tôi đã đi du lịch vào tháng trước.' },
          { w: 'last year', ipa: '/lɑːst jɪər/', t: 'phrase', ts: 'phr.', m: 'năm ngoái', ee: 'I bought a car last year.', ev: 'Tôi đã mua một chiếc ô tô vào năm ngoái.' },
          { w: 'past', ipa: '/pɑːst/', t: 'noun', ts: 'n.', m: 'quá khứ', ee: 'In the past, I was lazy.', ev: 'Trong quá khứ, tôi đã rất lười biếng.' },
          { w: 'childhood', ipa: '/ˈtʃaɪld.hʊd/', t: 'noun', ts: 'n.', m: 'thời thơ ấu', ee: 'I had a happy childhood.', ev: 'Tôi đã có một tuổi thơ hạnh phúc.' },
          { w: 'memory', ipa: '/ˈmem.ər.i/', t: 'noun', ts: 'n.', m: 'ký ức', ee: 'I have a good memory.', ev: 'Tôi có một ký ức đẹp.' },
          { w: 'recall', ipa: '/rɪˈkɔːl/', t: 'verb', ts: 'v.', m: 'gợi nhớ, nhớ lại', ee: 'I can recall my childhood.', ev: 'Tôi có thể nhớ lại thời thơ ấu của mình.' },
          { w: 'remember', ipa: '/rɪˈmem.bər/', t: 'verb', ts: 'v.', m: 'nhớ', ee: 'Do you remember me?', ev: 'Bạn có nhớ tôi không?' }
        ]
      },
      {
        order: 38,
        vocab: [
          { w: 'travel', ipa: '/ˈtræv.əl/', t: 'verb', ts: 'v.', m: 'du lịch', ee: 'We traveled to Hanoi.', ev: 'Chúng tôi đã đi du lịch Hà Nội.' },
          { w: 'visit', ipa: '/ˈvɪz.ɪt/', t: 'verb', ts: 'v.', m: 'thăm', ee: 'I visited my friends.', ev: 'Tôi đã đi thăm bạn bè.' },
          { w: 'stay', ipa: '/steɪ/', t: 'verb', ts: 'v.', m: 'ở lại', ee: 'We stayed in a hotel.', ev: 'Chúng tôi đã ở lại trong một khách sạn.' },
          { w: 'arrive', ipa: '/əˈraɪv/', t: 'verb', ts: 'v.', m: 'đến nơi', ee: 'They arrived yesterday.', ev: 'Họ đã đến nơi vào hôm qua.' },
          { w: 'leave', ipa: '/liːv/', t: 'verb', ts: 'v.', m: 'rời đi', ee: 'She left the house.', ev: 'Cô ấy đã rời khỏi nhà.' },
          { w: 'fly', ipa: '/flaɪ/', t: 'verb', ts: 'v.', m: 'bay', ee: 'We flew to London.', ev: 'Chúng tôi đã bay tới Luân Đôn.' },
          { w: 'drive', ipa: '/draɪv/', t: 'verb', ts: 'v.', m: 'lái xe', ee: 'I drove a car.', ev: 'Tôi đã lái một chiếc ô tô.' },
          { w: 'ride', ipa: '/raɪd/', t: 'verb', ts: 'v.', m: 'cưỡi, đi (xe đạp)', ee: 'I rode a bike.', ev: 'Tôi đã đi xe đạp.' },
          { w: 'walk', ipa: '/wɔːk/', t: 'verb', ts: 'v.', m: 'đi bộ', ee: 'We walked in the park.', ev: 'Chúng tôi đã đi bộ trong công viên.' },
          { w: 'trip', ipa: '/trɪp/', t: 'noun', ts: 'n.', m: 'chuyến đi', ee: 'It was a good trip.', ev: 'Đó đã là một chuyến đi thú vị.' }
        ]
      }
    ]
  },
  // Cụm 20: Bài 39 & 40
  {
    cum: 20,
    lessons: [
      {
        order: 39,
        vocab: [
          { w: 'play', ipa: '/pleɪ/', t: 'verb', ts: 'v.', m: 'chơi', ee: 'We played basketball.', ev: 'Chúng tôi đã chơi bóng rổ.' },
          { w: 'win', ipa: '/wɪn/', t: 'verb', ts: 'v.', m: 'thắng', ee: 'They won the game.', ev: 'Họ đã thắng trận đấu.' },
          { w: 'lose', ipa: '/luːz/', t: 'verb', ts: 'v.', m: 'thua', ee: 'We lost the game.', ev: 'Chúng tôi đã thua trận đấu.' },
          { w: 'score', ipa: '/skɔːr/', t: 'verb', ts: 'v.', m: 'ghi bàn', ee: 'He scored a goal.', ev: 'Anh ấy đã ghi một bàn.' },
          { w: 'run', ipa: '/rʌn/', t: 'verb', ts: 'v.', m: 'chạy', ee: 'She ran fast.', ev: 'Cô ấy đã chạy nhanh.' },
          { w: 'jump', ipa: '/dʒʌmp/', t: 'verb', ts: 'v.', m: 'nhảy', ee: 'He jumped high.', ev: 'Anh ấy đã nhảy cao.' },
          { w: 'kick', ipa: '/kɪk/', t: 'verb', ts: 'v.', m: 'đá', ee: 'Kick the ball.', ev: 'Đá quả bóng.' },
          { w: 'hit', ipa: '/hɪt/', t: 'verb', ts: 'v.', m: 'đánh', ee: 'He hit the ball.', ev: 'Anh ấy đã đánh quả bóng.' },
          { w: 'throw', ipa: '/θrəʊ/', t: 'verb', ts: 'v.', m: 'ném', ee: 'Throw the ball.', ev: 'Ném quả bóng đi.' },
          { w: 'catch', ipa: '/kætʃ/', t: 'verb', ts: 'v.', m: 'bắt', ee: 'Catch the ball.', ev: 'Bắt lấy quả bóng.' }
        ]
      },
      {
        order: 40,
        vocab: [
          { w: 'be', ipa: '/biː/', t: 'verb', ts: 'v.', m: 'thì, là, ở', ee: 'I was a student.', ev: 'Tôi đã từng là một học sinh.' },
          { w: 'have', ipa: '/hæv/', t: 'verb', ts: 'v.', m: 'có', ee: 'I had a car.', ev: 'Tôi đã từng có một chiếc ô tô.' },
          { w: 'do', ipa: '/duː/', t: 'verb', ts: 'v.', m: 'làm', ee: 'I did my homework.', ev: 'Tôi đã làm bài tập về nhà.' },
          { w: 'go', ipa: '/ɡəʊ/', t: 'verb', ts: 'v.', m: 'đi', ee: 'She went to school.', ev: 'Cô ấy đã đi tới trường.' },
          { w: 'come', ipa: '/kʌm/', t: 'verb', ts: 'v.', m: 'đến', ee: 'He came here yesterday.', ev: 'Anh ấy đã đến đây hôm qua.' },
          { w: 'see', ipa: '/siː/', t: 'verb', ts: 'v.', m: 'nhìn, thấy', ee: 'I saw him.', ev: 'Tôi đã nhìn thấy anh ấy.' },
          { w: 'hear', ipa: '/hɪər/', t: 'verb', ts: 'v.', m: 'nghe', ee: 'I heard a loud noise.', ev: 'Tôi đã nghe một tiếng ồn lớn.' },
          { w: 'say', ipa: '/seɪ/', t: 'verb', ts: 'v.', m: 'nói', ee: 'She said hello.', ev: 'Cô ấy đã nói xin chào.' },
          { w: 'tell', ipa: '/tel/', t: 'verb', ts: 'v.', m: 'kể, bảo', ee: 'He told me a story.', ev: 'Anh ấy đã kể cho tôi một câu chuyện.' },
          { w: 'make', ipa: '/meɪk/', t: 'verb', ts: 'v.', m: 'làm, chế tạo', ee: 'I made a cake.', ev: 'Tôi đã làm một chiếc bánh.' }
        ]
      }
    ]
  },
  // Cụm 21: Bài 41 & 42
  {
    cum: 21,
    lessons: [
      {
        order: 41,
        vocab: [
          { w: 'think', ipa: '/θɪŋk/', t: 'verb', ts: 'v.', m: 'nghĩ', ee: 'I thought about you.', ev: 'Tôi đã nghĩ về bạn.' },
          { w: 'know', ipa: '/nəʊ/', t: 'verb', ts: 'v.', m: 'biết', ee: 'I knew it.', ev: 'Tôi đã biết điều đó.' },
          { w: 'understand', ipa: '/ˌʌn.dəˈstænd/', t: 'verb', ts: 'v.', m: 'hiểu', ee: 'She understood me.', ev: 'Cô ấy đã hiểu tôi.' },
          { w: 'believe', ipa: '/bɪˈliːv/', t: 'verb', ts: 'v.', m: 'tin', ee: 'I believed him.', ev: 'Tôi đã tin anh ấy.' },
          { w: 'feel', ipa: '/fiːl/', t: 'verb', ts: 'v.', m: 'cảm thấy', ee: 'I felt happy.', ev: 'Tôi đã cảm thấy vui.' },
          { w: 'find', ipa: '/faɪnd/', t: 'verb', ts: 'v.', m: 'tìm thấy', ee: 'He found his key.', ev: 'Anh ấy đã tìm thấy chìa khóa.' },
          { w: 'leave', ipa: '/liːv/', t: 'verb', ts: 'v.', m: 'rời đi, để lại', ee: 'They left early.', ev: 'Họ đã rời đi sớm.' },
          { w: 'give', ipa: '/ɡɪv/', t: 'verb', ts: 'v.', m: 'cho, đưa', ee: 'She gave me a book.', ev: 'Cô ấy đã tặng tôi một cuốn sách.' },
          { w: 'take', ipa: '/teɪk/', t: 'verb', ts: 'v.', m: 'lấy', ee: 'He took my bag.', ev: 'Anh ấy đã lấy túi của tôi.' },
          { w: 'get', ipa: '/ɡet/', t: 'verb', ts: 'v.', m: 'nhận được', ee: 'I got a letter.', ev: 'Tôi đã nhận được một lá thư.' }
        ]
      },
      {
        order: 42,
        vocab: [
          { w: 'king', ipa: '/kɪŋ/', t: 'noun', ts: 'n.', m: 'nhà vua', ee: 'He was a king.', ev: 'Ông ấy đã là một nhà vua.' },
          { w: 'queen', ipa: '/kwiːn/', t: 'noun', ts: 'n.', m: 'nữ hoàng', ee: 'She was a queen.', ev: 'Bà ấy đã là một nữ hoàng.' },
          { w: 'war', ipa: '/wɔːr/', t: 'noun', ts: 'n.', m: 'chiến tranh', ee: 'There was a war.', ev: 'Đã có một cuộc chiến tranh.' },
          { w: 'peace', ipa: '/piːs/', t: 'noun', ts: 'n.', m: 'hòa bình', ee: 'We want peace.', ev: 'Chúng tôi muốn hòa bình.' },
          { w: 'history', ipa: '/ˈhɪs.tər.i/', t: 'noun', ts: 'n.', m: 'lịch sử', ee: 'I read history.', ev: 'Tôi đã đọc lịch sử.' },
          { w: 'event', ipa: '/ɪˈvent/', t: 'noun', ts: 'n.', m: 'sự kiện', ee: 'It was a big event.', ev: 'Đó đã là một sự kiện lớn.' },
          { w: 'hero', ipa: '/ˈhɪə.rəʊ/', t: 'noun', ts: 'n.', m: 'anh hùng', ee: 'He is my hero.', ev: 'Anh ấy là người anh hùng của tôi.' },
          { w: 'leader', ipa: '/ˈliː.dər/', t: 'noun', ts: 'n.', m: 'lãnh đạo', ee: 'She was a great leader.', ev: 'Bà ấy đã là một nhà lãnh đạo xuất sắc.' },
          { w: 'battle', ipa: '/ˈbæt.əl/', t: 'noun', ts: 'n.', m: 'trận chiến', ee: 'They won the battle.', ev: 'Họ đã thắng trận chiến.' },
          { w: 'victory', ipa: '/ˈvɪk.tər.i/', t: 'noun', ts: 'n.', m: 'chiến thắng', ee: 'It was a victory.', ev: 'Đó đã là một chiến thắng.' }
        ]
      }
    ]
  },
  // Cụm 22: Bài 43 & 44
  {
    cum: 22,
    lessons: [
      {
        order: 43,
        vocab: [
          { w: 'did', ipa: '/dɪd/', t: 'verb', ts: 'v.', m: 'đã làm (trợ động từ)', ee: 'Did you go?', ev: 'Bạn có đi không?' },
          { w: 'what', ipa: '/wɒt/', t: 'pronoun', ts: 'pron.', m: 'cái gì', ee: 'What did you do?', ev: 'Bạn đã làm gì?' },
          { w: 'where', ipa: '/weər/', t: 'adverb', ts: 'adv.', m: 'ở đâu', ee: 'Where did they go?', ev: 'Họ đã đi đâu?' },
          { w: 'when', ipa: '/wen/', t: 'adverb', ts: 'adv.', m: 'khi nào', ee: 'When did he leave?', ev: 'Anh ấy đã rời đi khi nào?' },
          { w: 'why', ipa: '/waɪ/', t: 'adverb', ts: 'adv.', m: 'tại sao', ee: 'Why did she cry?', ev: 'Tại sao cô ấy khóc?' },
          { w: 'how', ipa: '/haʊ/', t: 'adverb', ts: 'adv.', m: 'như thế nào', ee: 'How did you know?', ev: 'Làm sao bạn biết?' },
          { w: 'who', ipa: '/huː/', t: 'pronoun', ts: 'pron.', m: 'ai', ee: 'Who did you meet?', ev: 'Bạn đã gặp ai?' },
          { w: 'which', ipa: '/wɪtʃ/', t: 'pronoun', ts: 'pron.', m: 'cái nào', ee: 'Which one did you choose?', ev: 'Bạn đã chọn cái nào?' },
          { w: 'happen', ipa: '/ˈhæp.ən/', t: 'verb', ts: 'v.', m: 'xảy ra', ee: 'What happened?', ev: 'Chuyện gì đã xảy ra?' },
          { w: 'occur', ipa: '/əˈkɜːr/', t: 'verb', ts: 'v.', m: 'xảy ra', ee: 'It occurred yesterday.', ev: 'Nó đã xảy ra hôm qua.' }
        ]
      },
      {
        order: 44,
        vocab: [
          { w: 'didn\'t', ipa: '/ˈdɪd.ənt/', t: 'verb', ts: 'v.', m: 'đã không (trợ động từ)', ee: 'I didn\'t see him.', ev: 'Tôi đã không nhìn thấy anh ấy.' },
          { w: 'mistake', ipa: '/mɪˈsteɪk/', t: 'noun', ts: 'n.', m: 'lỗi lầm', ee: 'I made a mistake.', ev: 'Tôi đã mắc một sai lầm.' },
          { w: 'error', ipa: '/ˈer.ər/', t: 'noun', ts: 'n.', m: 'lỗi', ee: 'It was an error.', ev: 'Đó đã là một lỗi.' },
          { w: 'wrong', ipa: '/rɒŋ/', t: 'adjective', ts: 'adj.', m: 'sai', ee: 'You were wrong.', ev: 'Bạn đã sai.' },
          { w: 'false', ipa: '/fɒls/', t: 'adjective', ts: 'adj.', m: 'sai, không đúng', ee: 'That is false.', ev: 'Điều đó là sai.' },
          { w: 'fail', ipa: '/feɪl/', t: 'verb', ts: 'v.', m: 'thất bại, trượt', ee: 'He failed the test.', ev: 'Anh ấy đã thi trượt.' },
          { w: 'forget', ipa: '/fəˈɡet/', t: 'verb', ts: 'v.', m: 'quên', ee: 'I forgot my book.', ev: 'Tôi đã quên sách của tôi.' },
          { w: 'lose', ipa: '/luːz/', t: 'verb', ts: 'v.', m: 'đánh mất', ee: 'I lost my keys.', ev: 'Tôi đã làm mất chìa khóa.' },
          { w: 'miss', ipa: '/mɪs/', t: 'verb', ts: 'v.', m: 'bỏ lỡ, nhớ', ee: 'I missed the bus.', ev: 'Tôi đã bị lỡ xe buýt.' },
          { w: 'drop', ipa: '/drɒp/', t: 'verb', ts: 'v.', m: 'đánh rơi', ee: 'He dropped the glass.', ev: 'Anh ấy đã đánh rơi cái ly.' }
        ]
      }
    ]
  },
  // Cụm 23: Bài 45 & 46
  {
    cum: 23,
    lessons: [
      {
        order: 45,
        vocab: [
          { w: 'then', ipa: '/ðen/', t: 'adverb', ts: 'adv.', m: 'sau đó', ee: 'Then we went home.', ev: 'Sau đó chúng tôi đã về nhà.' },
          { w: 'later', ipa: '/ˈleɪ.tər/', t: 'adverb', ts: 'adv.', m: 'muộn hơn, sau này', ee: 'See you later.', ev: 'Hẹn gặp bạn sau.' },
          { w: 'after', ipa: '/ˈɑːf.tər/', t: 'preposition', ts: 'prep.', m: 'sau khi', ee: 'After the game, we ate.', ev: 'Sau trận đấu, chúng tôi đã ăn.' },
          { w: 'before', ipa: '/bɪˈfɔːr/', t: 'preposition', ts: 'prep.', m: 'trước khi', ee: 'Before the game, we slept.', ev: 'Trước trận đấu, chúng tôi đã ngủ.' },
          { w: 'next', ipa: '/nekst/', t: 'adverb', ts: 'adv.', m: 'tiếp theo', ee: 'What happened next?', ev: 'Chuyện gì đã xảy ra tiếp theo?' },
          { w: 'finally', ipa: '/ˈfaɪ.nəl.i/', t: 'adverb', ts: 'adv.', m: 'cuối cùng', ee: 'Finally, we arrived.', ev: 'Cuối cùng, chúng tôi đã tới nơi.' },
          { w: 'suddenly', ipa: '/ˈsʌd.ən.li/', t: 'adverb', ts: 'adv.', m: 'đột nhiên', ee: 'Suddenly, he cried.', ev: 'Đột nhiên, anh ấy đã khóc.' },
          { w: 'immediately', ipa: '/ɪˈmiː.di.ət.li/', t: 'adverb', ts: 'adv.', m: 'ngay lập tức', ee: 'He left immediately.', ev: 'Anh ấy đã rời đi ngay lập tức.' },
          { w: 'soon', ipa: '/suːn/', t: 'adverb', ts: 'adv.', m: 'sớm', ee: 'See you soon.', ev: 'Hẹn sớm gặp lại bạn.' },
          { w: 'early', ipa: '/ˈɜː.li/', t: 'adverb', ts: 'adv.', m: 'sớm', ee: 'We arrived early.', ev: 'Chúng tôi đã đến sớm.' }
        ]
      },
      {
        order: 46,
        vocab: [] // Ôn tập, không có từ vựng mới
      }
    ]
  }
];

data.forEach(batch => {
  const formatted = batch.lessons.map(l => ({
    lessonOrder: l.order,
    vocab: l.vocab.map(v => ({
      word: v.w,
      ipa: v.ipa,
      type: v.t,
      type_short: v.ts,
      meaning: v.m,
      example_en: v.ee,
      example_vi: v.ev,
      level: 'A2'
    }))
  }));
  fs.writeFileSync(`data/ielts-vocab-cum${batch.cum}.json`, JSON.stringify(formatted, null, 2));
  console.log(`Generated cum ${batch.cum}`);
});

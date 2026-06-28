const fs = require('fs');

const data = [
  // Cụm 34: Bài 65 & 66
  {
    cum: 34,
    lessons: [
      {
        order: 65,
        vocab: [
          { w: 'ever', ipa: '/ˈev.ər/', t: 'adverb', ts: 'adv.', m: 'từng, bao giờ', ee: 'Have you ever been there?', ev: 'Bạn đã từng đến đó chưa?' },
          { w: 'never', ipa: '/ˈnev.ər/', t: 'adverb', ts: 'adv.', m: 'chưa bao giờ', ee: 'I have never seen it.', ev: 'Tôi chưa bao giờ nhìn thấy nó.' },
          { w: 'just', ipa: '/dʒʌst/', t: 'adverb', ts: 'adv.', m: 'vừa mới', ee: 'I have just eaten.', ev: 'Tôi vừa mới ăn xong.' },
          { w: 'already', ipa: '/ɔːlˈred.i/', t: 'adverb', ts: 'adv.', m: 'rồi', ee: 'I have already finished.', ev: 'Tôi đã hoàn thành rồi.' },
          { w: 'yet', ipa: '/jet/', t: 'adverb', ts: 'adv.', m: 'chưa', ee: 'I haven\'t started yet.', ev: 'Tôi vẫn chưa bắt đầu.' },
          { w: 'still', ipa: '/stɪl/', t: 'adverb', ts: 'adv.', m: 'vẫn', ee: 'I still haven\'t finished.', ev: 'Tôi vẫn chưa hoàn thành.' },
          { w: 'before', ipa: '/bɪˈfɔːr/', t: 'adverb', ts: 'adv.', m: 'trước đây', ee: 'I have been there before.', ev: 'Tôi đã từng đến đó trước đây.' },
          { w: 'recently', ipa: '/ˈriː.sənt.li/', t: 'adverb', ts: 'adv.', m: 'gần đây', ee: 'I saw him recently.', ev: 'Gần đây tôi đã gặp anh ấy.' },
          { w: 'lately', ipa: '/ˈleɪt.li/', t: 'adverb', ts: 'adv.', m: 'dạo này, mới đây', ee: 'Have you seen her lately?', ev: 'Dạo này bạn có gặp cô ấy không?' },
          { w: 'so far', ipa: '/səʊ fɑːr/', t: 'phrase', ts: 'phr.', m: 'cho đến nay', ee: 'So far, so good.', ev: 'Cho đến nay, mọi thứ vẫn tốt.' }
        ]
      },
      {
        order: 66,
        vocab: [
          { w: 'see', ipa: '/siː/', t: 'verb', ts: 'v.', m: 'nhìn thấy', ee: 'I see a bird.', ev: 'Tôi nhìn thấy một con chim.' },
          { w: 'hear', ipa: '/hɪər/', t: 'verb', ts: 'v.', m: 'nghe', ee: 'I can hear you.', ev: 'Tôi có thể nghe bạn.' },
          { w: 'taste', ipa: '/teɪst/', t: 'verb', ts: 'v.', m: 'nếm', ee: 'It tastes good.', ev: 'Nó có vị ngon.' },
          { w: 'smell', ipa: '/smel/', t: 'verb', ts: 'v.', m: 'ngửi, có mùi', ee: 'It smells nice.', ev: 'Nó có mùi thơm.' },
          { w: 'feel', ipa: '/fiːl/', t: 'verb', ts: 'v.', m: 'cảm thấy', ee: 'It feels soft.', ev: 'Cảm giác nó rất mềm.' },
          { w: 'touch', ipa: '/tʌtʃ/', t: 'verb', ts: 'v.', m: 'chạm vào', ee: 'Do not touch it.', ev: 'Đừng chạm vào nó.' },
          { w: 'look', ipa: '/lʊk/', t: 'verb', ts: 'v.', m: 'trông có vẻ', ee: 'You look tired.', ev: 'Bạn trông có vẻ mệt.' },
          { w: 'sound', ipa: '/saʊnd/', t: 'verb', ts: 'v.', m: 'nghe có vẻ', ee: 'That sounds great.', ev: 'Nghe tuyệt đấy.' },
          { w: 'seem', ipa: '/siːm/', t: 'verb', ts: 'v.', m: 'có vẻ như', ee: 'It seems fine.', ev: 'Nó có vẻ ổn.' },
          { w: 'appear', ipa: '/əˈpɪər/', t: 'verb', ts: 'v.', m: 'xuất hiện, có vẻ', ee: 'He appears happy.', ev: 'Anh ấy có vẻ hạnh phúc.' }
        ]
      }
    ]
  },
  // Cụm 35: Bài 67 & 68
  {
    cum: 35,
    lessons: [
      {
        order: 67,
        vocab: [
          { w: 'open', ipa: '/ˈəʊ.pən/', t: 'verb', ts: 'v.', m: 'mở', ee: 'The door was opened.', ev: 'Cửa đã được mở.' },
          { w: 'close', ipa: '/kləʊz/', t: 'verb', ts: 'v.', m: 'đóng', ee: 'The shop is closed.', ev: 'Cửa hàng đã đóng cửa.' },
          { w: 'break', ipa: '/breɪk/', t: 'verb', ts: 'v.', m: 'làm vỡ', ee: 'The glass was broken.', ev: 'Cái ly đã bị vỡ.' },
          { w: 'fix', ipa: '/fɪks/', t: 'verb', ts: 'v.', m: 'sửa chữa', ee: 'The car is fixed.', ev: 'Chiếc xe đã được sửa.' },
          { w: 'build', ipa: '/bɪld/', t: 'verb', ts: 'v.', m: 'xây dựng', ee: 'The house was built.', ev: 'Ngôi nhà đã được xây.' },
          { w: 'destroy', ipa: '/dɪˈstrɔɪ/', t: 'verb', ts: 'v.', m: 'phá hủy', ee: 'The building was destroyed.', ev: 'Tòa nhà đã bị phá hủy.' },
          { w: 'create', ipa: '/kriˈeɪt/', t: 'verb', ts: 'v.', m: 'tạo ra', ee: 'The art was created.', ev: 'Tác phẩm nghệ thuật đã được tạo ra.' },
          { w: 'make', ipa: '/meɪk/', t: 'verb', ts: 'v.', m: 'làm, chế tạo', ee: 'The cake was made.', ev: 'Chiếc bánh đã được làm.' },
          { w: 'finish', ipa: '/ˈfɪn.ɪʃ/', t: 'verb', ts: 'v.', m: 'hoàn thành', ee: 'The job is finished.', ev: 'Công việc đã được hoàn thành.' },
          { w: 'complete', ipa: '/kəmˈpliːt/', t: 'verb', ts: 'v.', m: 'hoàn tất', ee: 'The task is completed.', ev: 'Nhiệm vụ đã hoàn tất.' }
        ]
      },
      {
        order: 68,
        vocab: [
          { w: 'for', ipa: '/fɔːr/', t: 'preposition', ts: 'prep.', m: 'trong (khoảng thời gian)', ee: 'For two years.', ev: 'Trong vòng hai năm.' },
          { w: 'since', ipa: '/sɪns/', t: 'preposition', ts: 'prep.', m: 'từ khi', ee: 'Since yesterday.', ev: 'Từ hôm qua.' },
          { w: 'during', ipa: '/ˈdʒʊə.rɪŋ/', t: 'preposition', ts: 'prep.', m: 'trong suốt (quá trình)', ee: 'During the game.', ev: 'Trong suốt trận đấu.' },
          { w: 'while', ipa: '/waɪl/', t: 'conjunction', ts: 'conj.', m: 'trong khi', ee: 'While I was sleeping.', ev: 'Trong khi tôi đang ngủ.' },
          { w: 'from', ipa: '/frɒm/', t: 'preposition', ts: 'prep.', m: 'từ', ee: 'From morning to night.', ev: 'Từ sáng đến tối.' },
          { w: 'to', ipa: '/tuː/', t: 'preposition', ts: 'prep.', m: 'đến', ee: 'From here to there.', ev: 'Từ đây đến đó.' },
          { w: 'until', ipa: '/ʌnˈtɪl/', t: 'preposition', ts: 'prep.', m: 'cho đến khi', ee: 'Wait until tomorrow.', ev: 'Đợi cho đến ngày mai.' },
          { w: 'by', ipa: '/baɪ/', t: 'preposition', ts: 'prep.', m: 'trước (thời điểm)', ee: 'Finish by tomorrow.', ev: 'Hoàn thành trước ngày mai.' },
          { w: 'within', ipa: '/wɪˈðɪn/', t: 'preposition', ts: 'prep.', m: 'trong vòng', ee: 'Within an hour.', ev: 'Trong vòng một giờ.' },
          { w: 'throughout', ipa: '/θruːˈaʊt/', t: 'preposition', ts: 'prep.', m: 'xuyên suốt', ee: 'Throughout the year.', ev: 'Xuyên suốt năm.' }
        ]
      }
    ]
  },
  // Cụm 36: Bài 69 & 70
  {
    cum: 36,
    lessons: [
      {
        order: 69,
        vocab: [
          { w: 'often', ipa: '/ˈɒf.ən/', t: 'adverb', ts: 'adv.', m: 'thường xuyên', ee: 'I often swim.', ev: 'Tôi thường xuyên bơi.' },
          { w: 'usually', ipa: '/ˈjuː.ʒu.ə.li/', t: 'adverb', ts: 'adv.', m: 'thường thường', ee: 'I usually cook.', ev: 'Tôi thường nấu ăn.' },
          { w: 'sometimes', ipa: '/ˈsʌm.taɪmz/', t: 'adverb', ts: 'adv.', m: 'thỉnh thoảng', ee: 'I sometimes read.', ev: 'Thỉnh thoảng tôi đọc sách.' },
          { w: 'always', ipa: '/ˈɔːl.weɪz/', t: 'adverb', ts: 'adv.', m: 'luôn luôn', ee: 'I always try.', ev: 'Tôi luôn luôn cố gắng.' },
          { w: 'never', ipa: '/ˈnev.ər/', t: 'adverb', ts: 'adv.', m: 'không bao giờ', ee: 'I never give up.', ev: 'Tôi không bao giờ bỏ cuộc.' },
          { w: 'exactly', ipa: '/ɪɡˈzækt.li/', t: 'adverb', ts: 'adv.', m: 'chính xác', ee: 'That is exactly right.', ev: 'Điều đó hoàn toàn chính xác.' },
          { w: 'strictly', ipa: '/ˈstrɪkt.li/', t: 'adverb', ts: 'adv.', m: 'nghiêm ngặt', ee: 'Strictly speaking.', ev: 'Nói một cách nghiêm ngặt.' },
          { w: 'generally', ipa: '/ˈdʒen.ər.əl.i/', t: 'adverb', ts: 'adv.', m: 'nhìn chung', ee: 'Generally, it is good.', ev: 'Nhìn chung, nó tốt.' },
          { w: 'mostly', ipa: '/ˈməʊst.li/', t: 'adverb', ts: 'adv.', m: 'chủ yếu', ee: 'I mostly read books.', ev: 'Tôi chủ yếu đọc sách.' },
          { w: 'mainly', ipa: '/ˈmeɪn.li/', t: 'adverb', ts: 'adv.', m: 'chính, chủ yếu', ee: 'It is mainly water.', ev: 'Nó chủ yếu là nước.' }
        ]
      },
      {
        order: 70,
        vocab: [
          { w: 'paper', ipa: '/ˈpeɪ.pər/', t: 'noun', ts: 'n.', m: 'giấy', ee: 'It is made of paper.', ev: 'Nó được làm bằng giấy.' },
          { w: 'glass', ipa: '/ɡlɑːs/', t: 'noun', ts: 'n.', m: 'thủy tinh', ee: 'A glass window.', ev: 'Một cửa sổ thủy tinh.' },
          { w: 'plastic', ipa: '/ˈplæs.tɪk/', t: 'noun', ts: 'n.', m: 'nhựa', ee: 'A plastic cup.', ev: 'Một cái cốc nhựa.' },
          { w: 'metal', ipa: '/ˈmet.əl/', t: 'noun', ts: 'n.', m: 'kim loại', ee: 'A metal box.', ev: 'Một hộp kim loại.' },
          { w: 'wood', ipa: '/wʊd/', t: 'noun', ts: 'n.', m: 'gỗ', ee: 'A wood table.', ev: 'Một cái bàn gỗ.' },
          { w: 'factory', ipa: '/ˈfæk.tər.i/', t: 'noun', ts: 'n.', m: 'nhà máy', ee: 'The factory produces cars.', ev: 'Nhà máy sản xuất ô tô.' },
          { w: 'machine', ipa: '/məˈʃiːn/', t: 'noun', ts: 'n.', m: 'máy móc', ee: 'A washing machine.', ev: 'Một chiếc máy giặt.' },
          { w: 'tool', ipa: '/tuːl/', t: 'noun', ts: 'n.', m: 'công cụ', ee: 'A useful tool.', ev: 'Một công cụ hữu ích.' },
          { w: 'engine', ipa: '/ˈen.dʒɪn/', t: 'noun', ts: 'n.', m: 'động cơ', ee: 'The car engine.', ev: 'Động cơ ô tô.' },
          { w: 'system', ipa: '/ˈsɪs.təm/', t: 'noun', ts: 'n.', m: 'hệ thống', ee: 'A new system.', ev: 'Một hệ thống mới.' }
        ]
      }
    ]
  },
  // Cụm 37: Bài 71 & 72
  {
    cum: 37,
    lessons: [
      {
        order: 71,
        vocab: [
          { w: 'discover', ipa: '/dɪˈskʌv.ər/', t: 'verb', ts: 'v.', m: 'khám phá', ee: 'He discovered a cave.', ev: 'Anh ấy đã khám phá ra một hang động.' },
          { w: 'invent', ipa: '/ɪnˈvent/', t: 'verb', ts: 'v.', m: 'phát minh', ee: 'Who invented the phone?', ev: 'Ai đã phát minh ra điện thoại?' },
          { w: 'explore', ipa: '/ɪkˈsplɔːr/', t: 'verb', ts: 'v.', m: 'thăm dò', ee: 'Explore the city.', ev: 'Thăm dò thành phố.' },
          { w: 'design', ipa: '/dɪˈzaɪn/', t: 'verb', ts: 'v.', m: 'thiết kế', ee: 'She designed a house.', ev: 'Cô ấy đã thiết kế một ngôi nhà.' },
          { w: 'test', ipa: '/test/', t: 'verb', ts: 'v.', m: 'kiểm tra, thử', ee: 'Test the machine.', ev: 'Kiểm tra chiếc máy.' },
          { w: 'measure', ipa: '/ˈmeʒ.ər/', t: 'verb', ts: 'v.', m: 'đo lường', ee: 'Measure the table.', ev: 'Đo lường chiếc bàn.' },
          { w: 'prove', ipa: '/pruːv/', t: 'verb', ts: 'v.', m: 'chứng minh', ee: 'Can you prove it?', ev: 'Bạn có thể chứng minh nó không?' },
          { w: 'record', ipa: '/rɪˈkɔːd/', t: 'verb', ts: 'v.', m: 'ghi âm, ghi lại', ee: 'Record the song.', ev: 'Ghi âm lại bài hát.' },
          { w: 'note', ipa: '/nəʊt/', t: 'verb', ts: 'v.', m: 'ghi chú', ee: 'Note this down.', ev: 'Ghi chú cái này lại.' },
          { w: 'study', ipa: '/ˈstʌd.i/', t: 'verb', ts: 'v.', m: 'nghiên cứu, học', ee: 'Study history.', ev: 'Nghiên cứu lịch sử.' }
        ]
      },
      {
        order: 72,
        vocab: [
          { w: 'TV', ipa: '/ˌtiːˈviː/', t: 'noun', ts: 'n.', m: 'ti vi', ee: 'Watch TV.', ev: 'Xem ti vi.' },
          { w: 'radio', ipa: '/ˈreɪ.di.əʊ/', t: 'noun', ts: 'n.', m: 'đài phát thanh', ee: 'Listen to the radio.', ev: 'Nghe đài phát thanh.' },
          { w: 'internet', ipa: '/ˈɪn.tə.net/', t: 'noun', ts: 'n.', m: 'mạng internet', ee: 'Use the internet.', ev: 'Sử dụng internet.' },
          { w: 'news', ipa: '/njuːz/', t: 'noun', ts: 'n.', m: 'tin tức', ee: 'Read the news.', ev: 'Đọc tin tức.' },
          { w: 'paper', ipa: '/ˈpeɪ.pər/', t: 'noun', ts: 'n.', m: 'báo giấy', ee: 'Read the paper.', ev: 'Đọc báo giấy.' },
          { w: 'magazine', ipa: '/ˌmæɡ.əˈziːn/', t: 'noun', ts: 'n.', m: 'tạp chí', ee: 'Buy a magazine.', ev: 'Mua một cuốn tạp chí.' },
          { w: 'article', ipa: '/ˈɑː.tɪ.kəl/', t: 'noun', ts: 'n.', m: 'bài báo', ee: 'An interesting article.', ev: 'Một bài báo thú vị.' },
          { w: 'report', ipa: '/rɪˈpɔːt/', t: 'noun', ts: 'n.', m: 'bản báo cáo', ee: 'A long report.', ev: 'Một bản báo cáo dài.' },
          { w: 'program', ipa: '/ˈprəʊ.ɡræm/', t: 'noun', ts: 'n.', m: 'chương trình', ee: 'A TV program.', ev: 'Một chương trình TV.' },
          { w: 'channel', ipa: '/ˈtʃæn.əl/', t: 'noun', ts: 'n.', m: 'kênh', ee: 'Change the channel.', ev: 'Chuyển kênh.' }
        ]
      }
    ]
  },
  // Cụm 38: Bài 73
  {
    cum: 38,
    lessons: [
      {
        order: 73,
        vocab: [] // Ôn tập Chương 8, không có từ vựng mới
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

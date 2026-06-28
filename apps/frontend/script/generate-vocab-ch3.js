const fs = require('fs');

const data = [
  // Cụm 10: Bài 19 & 20
  {
    cum: 10,
    lessons: [
      {
        order: 19,
        vocab: [
          { w: 'morning', ipa: '/ˈmɔː.nɪŋ/', t: 'noun', ts: 'n.', m: 'buổi sáng', ee: 'Good morning.', ev: 'Chào buổi sáng.' },
          { w: 'get up', ipa: '/ɡet ʌp/', t: 'verb', ts: 'v.', m: 'thức dậy', ee: 'I get up early.', ev: 'Tôi thức dậy sớm.' },
          { w: 'wash', ipa: '/wɒʃ/', t: 'verb', ts: 'v.', m: 'rửa', ee: 'Wash your face.', ev: 'Rửa mặt đi.' },
          { w: 'brush', ipa: '/brʌʃ/', t: 'verb', ts: 'v.', m: 'chải', ee: 'Brush your teeth.', ev: 'Đánh răng đi.' },
          { w: 'breakfast', ipa: '/ˈbrek.fəst/', t: 'noun', ts: 'n.', m: 'bữa sáng', ee: 'Eat breakfast.', ev: 'Ăn bữa sáng.' },
          { w: 'dress', ipa: '/dres/', t: 'verb', ts: 'v.', m: 'mặc quần áo', ee: 'I dress quickly.', ev: 'Tôi mặc quần áo nhanh.' },
          { w: 'work', ipa: '/wɜːk/', t: 'verb', ts: 'v.', m: 'làm việc', ee: 'I work every day.', ev: 'Tôi làm việc mỗi ngày.' },
          { w: 'lunch', ipa: '/lʌntʃ/', t: 'noun', ts: 'n.', m: 'bữa trưa', ee: 'Have lunch.', ev: 'Ăn bữa trưa.' },
          { w: 'afternoon', ipa: '/ˌɑːf.təˈnuːn/', t: 'noun', ts: 'n.', m: 'buổi chiều', ee: 'Good afternoon.', ev: 'Chào buổi chiều.' },
          { w: 'evening', ipa: '/ˈiːv.nɪŋ/', t: 'noun', ts: 'n.', m: 'buổi tối', ee: 'Good evening.', ev: 'Chào buổi tối.' }
        ]
      },
      {
        order: 20,
        vocab: [
          { w: 'clean', ipa: '/kliːn/', t: 'verb', ts: 'v.', m: 'dọn dẹp', ee: 'Clean the room.', ev: 'Dọn phòng đi.' },
          { w: 'sweep', ipa: '/swiːp/', t: 'verb', ts: 'v.', m: 'quét', ee: 'Sweep the floor.', ev: 'Quét sàn nhà.' },
          { w: 'wash', ipa: '/wɒʃ/', t: 'verb', ts: 'v.', m: 'giặt, rửa', ee: 'Wash the clothes.', ev: 'Giặt quần áo.' },
          { w: 'fold', ipa: '/fəʊld/', t: 'verb', ts: 'v.', m: 'gấp', ee: 'Fold the clothes.', ev: 'Gấp quần áo.' },
          { w: 'tidy', ipa: '/ˈtaɪ.di/', t: 'verb', ts: 'v.', m: 'dọn dẹp ngăn nắp', ee: 'Tidy the bedroom.', ev: 'Dọn dẹp phòng ngủ.' },
          { w: 'make bed', ipa: '/meɪk bed/', t: 'verb', ts: 'v.', m: 'dọn giường', ee: 'Make your bed.', ev: 'Dọn giường của bạn.' },
          { w: 'vacuum', ipa: '/ˈvæk.juːm/', t: 'verb', ts: 'v.', m: 'hút bụi', ee: 'Vacuum the floor.', ev: 'Hút bụi sàn nhà.' },
          { w: 'dust', ipa: '/dʌst/', t: 'verb', ts: 'v.', m: 'phủi bụi', ee: 'Dust the table.', ev: 'Phủi bụi bàn.' },
          { w: 'iron', ipa: '/aɪən/', t: 'verb', ts: 'v.', m: 'ủi đồ', ee: 'Iron the clothes.', ev: 'Ủi quần áo.' },
          { w: 'trash', ipa: '/træʃ/', t: 'noun', ts: 'n.', m: 'rác', ee: 'Take out the trash.', ev: 'Đổ rác.' }
        ]
      }
    ]
  },
  // Cụm 11: Bài 21 & 22
  {
    cum: 11,
    lessons: [
      {
        order: 21,
        vocab: [
          { w: 'what', ipa: '/wɒt/', t: 'pronoun', ts: 'pron.', m: 'cái gì', ee: 'What is this?', ev: 'Cái này là gì?' },
          { w: 'who', ipa: '/huː/', t: 'pronoun', ts: 'pron.', m: 'ai', ee: 'Who is she?', ev: 'Cô ấy là ai?' },
          { w: 'where', ipa: '/weər/', t: 'adverb', ts: 'adv.', m: 'ở đâu', ee: 'Where are you?', ev: 'Bạn ở đâu?' },
          { w: 'when', ipa: '/wen/', t: 'adverb', ts: 'adv.', m: 'khi nào', ee: 'When do you get up?', ev: 'Khi nào bạn thức dậy?' },
          { w: 'why', ipa: '/waɪ/', t: 'adverb', ts: 'adv.', m: 'tại sao', ee: 'Why are you sad?', ev: 'Tại sao bạn buồn?' },
          { w: 'how', ipa: '/haʊ/', t: 'adverb', ts: 'adv.', m: 'như thế nào', ee: 'How are you?', ev: 'Bạn có khỏe không?' },
          { w: 'which', ipa: '/wɪtʃ/', t: 'pronoun', ts: 'pron.', m: 'cái nào', ee: 'Which one?', ev: 'Cái nào?' },
          { w: 'whose', ipa: '/huːz/', t: 'pronoun', ts: 'pron.', m: 'của ai', ee: 'Whose bag is this?', ev: 'Cái túi này của ai?' },
          { w: 'how much', ipa: '/haʊ mʌtʃ/', t: 'phrase', ts: 'phr.', m: 'bao nhiêu (không đếm được)', ee: 'How much water?', ev: 'Bao nhiêu nước?' },
          { w: 'how many', ipa: '/haʊ ˈmen.i/', t: 'phrase', ts: 'phr.', m: 'bao nhiêu (đếm được)', ee: 'How many books?', ev: 'Bao nhiêu cuốn sách?' }
        ]
      },
      {
        order: 22,
        vocab: [
          { w: 'not', ipa: '/nɒt/', t: 'adverb', ts: 'adv.', m: 'không', ee: 'I am not happy.', ev: 'Tôi không vui.' },
          { w: 'no', ipa: '/nəʊ/', t: 'adverb', ts: 'adv.', m: 'không', ee: 'No, I don\'t.', ev: 'Không, tôi không.' },
          { w: 'never', ipa: '/ˈnev.ər/', t: 'adverb', ts: 'adv.', m: 'không bao giờ', ee: 'I never swim.', ev: 'Tôi không bao giờ bơi.' },
          { w: 'don\'t', ipa: '/dəʊnt/', t: 'verb', ts: 'v.', m: 'không (trợ động từ)', ee: 'I don\'t know.', ev: 'Tôi không biết.' },
          { w: 'doesn\'t', ipa: '/ˈdʌz.ənt/', t: 'verb', ts: 'v.', m: 'không (trợ động từ)', ee: 'He doesn\'t know.', ev: 'Anh ấy không biết.' },
          { w: 'disagree', ipa: '/ˌdɪs.əˈɡriː/', t: 'verb', ts: 'v.', m: 'không đồng ý', ee: 'I disagree with you.', ev: 'Tôi không đồng ý với bạn.' },
          { w: 'wrong', ipa: '/rɒŋ/', t: 'adjective', ts: 'adj.', m: 'sai', ee: 'It is wrong.', ev: 'Điều đó sai.' },
          { w: 'false', ipa: '/fɒls/', t: 'adjective', ts: 'adj.', m: 'sai, giả', ee: 'That is false.', ev: 'Điều đó là sai.' },
          { w: 'impossible', ipa: '/ɪmˈpɒs.ə.bəl/', t: 'adjective', ts: 'adj.', m: 'không thể', ee: 'It is impossible.', ev: 'Điều đó là không thể.' },
          { w: 'can\'t', ipa: '/kɑːnt/', t: 'verb', ts: 'v.', m: 'không thể', ee: 'I can\'t swim.', ev: 'Tôi không thể bơi.' }
        ]
      }
    ]
  },
  // Cụm 12: Bài 23 & 24
  {
    cum: 12,
    lessons: [
      {
        order: 23,
        vocab: [
          { w: 'always', ipa: '/ˈɔːl.weɪz/', t: 'adverb', ts: 'adv.', m: 'luôn luôn', ee: 'I always clean the room.', ev: 'Tôi luôn luôn dọn phòng.' },
          { w: 'usually', ipa: '/ˈjuː.ʒu.ə.li/', t: 'adverb', ts: 'adv.', m: 'thường thường', ee: 'I usually cook.', ev: 'Tôi thường nấu ăn.' },
          { w: 'often', ipa: '/ˈɒf.ən/', t: 'adverb', ts: 'adv.', m: 'thường xuyên', ee: 'I often swim.', ev: 'Tôi thường xuyên bơi.' },
          { w: 'sometimes', ipa: '/ˈsʌm.taɪmz/', t: 'adverb', ts: 'adv.', m: 'thỉnh thoảng', ee: 'I sometimes read.', ev: 'Thỉnh thoảng tôi đọc sách.' },
          { w: 'rarely', ipa: '/ˈreə.li/', t: 'adverb', ts: 'adv.', m: 'hiếm khi', ee: 'I rarely sing.', ev: 'Tôi hiếm khi hát.' },
          { w: 'hardly', ipa: '/ˈhɑːd.li/', t: 'adverb', ts: 'adv.', m: 'hầu như không', ee: 'I hardly watch TV.', ev: 'Tôi hầu như không xem TV.' },
          { w: 'daily', ipa: '/ˈdeɪ.li/', t: 'adverb', ts: 'adv.', m: 'hàng ngày', ee: 'I work daily.', ev: 'Tôi làm việc hàng ngày.' },
          { w: 'weekly', ipa: '/ˈwiːk.li/', t: 'adverb', ts: 'adv.', m: 'hàng tuần', ee: 'I swim weekly.', ev: 'Tôi bơi hàng tuần.' },
          { w: 'monthly', ipa: '/ˈmʌnθ.li/', t: 'adverb', ts: 'adv.', m: 'hàng tháng', ee: 'I check it monthly.', ev: 'Tôi kiểm tra nó hàng tháng.' }
        ]
      },
      {
        order: 24,
        vocab: [
          { w: 'night', ipa: '/naɪt/', t: 'noun', ts: 'n.', m: 'đêm', ee: 'Good night.', ev: 'Chúc ngủ ngon.' },
          { w: 'midnight', ipa: '/ˈmɪd.naɪt/', t: 'noun', ts: 'n.', m: 'nửa đêm', ee: 'It is midnight.', ev: 'Bây giờ là nửa đêm.' },
          { w: 'dawn', ipa: '/dɔːn/', t: 'noun', ts: 'n.', m: 'bình minh', ee: 'I get up at dawn.', ev: 'Tôi thức dậy lúc bình minh.' },
          { w: 'dusk', ipa: '/dʌsk/', t: 'noun', ts: 'n.', m: 'hoàng hôn', ee: 'It is dusk.', ev: 'Bây giờ là hoàng hôn.' },
          { w: 'noon', ipa: '/nuːn/', t: 'noun', ts: 'n.', m: 'trưa', ee: 'It is noon.', ev: 'Bây giờ là buổi trưa.' },
          { w: 'today', ipa: '/təˈdeɪ/', t: 'noun', ts: 'n.', m: 'hôm nay', ee: 'How are you today?', ev: 'Hôm nay bạn thế nào?' },
          { w: 'tomorrow', ipa: '/təˈmɒr.əʊ/', t: 'noun', ts: 'n.', m: 'ngày mai', ee: 'See you tomorrow.', ev: 'Hẹn gặp bạn vào ngày mai.' }
        ]
      }
    ]
  },
  // Cụm 13: Bài 25 & 26
  {
    cum: 13,
    lessons: [
      {
        order: 25,
        vocab: [
          { w: 'doctor', ipa: '/ˈdɒk.tər/', t: 'noun', ts: 'n.', m: 'bác sĩ', ee: 'She is a doctor.', ev: 'Cô ấy là bác sĩ.' },
          { w: 'nurse', ipa: '/nɜːs/', t: 'noun', ts: 'n.', m: 'y tá', ee: 'He is a nurse.', ev: 'Anh ấy là y tá.' },
          { w: 'teacher', ipa: '/ˈtiː.tʃər/', t: 'noun', ts: 'n.', m: 'giáo viên', ee: 'I am a teacher.', ev: 'Tôi là giáo viên.' },
          { w: 'student', ipa: '/ˈstjuː.dənt/', t: 'noun', ts: 'n.', m: 'học sinh', ee: 'Are you a student?', ev: 'Bạn có phải là học sinh không?' },
          { w: 'pilot', ipa: '/ˈpaɪ.lət/', t: 'noun', ts: 'n.', m: 'phi công', ee: 'The pilot is busy.', ev: 'Người phi công đang bận.' },
          { w: 'driver', ipa: '/ˈdraɪ.vər/', t: 'noun', ts: 'n.', m: 'tài xế', ee: 'The driver is kind.', ev: 'Tài xế rất tốt bụng.' },
          { w: 'chef', ipa: '/ʃef/', t: 'noun', ts: 'n.', m: 'đầu bếp', ee: 'The chef cooks well.', ev: 'Đầu bếp nấu ăn ngon.' },
          { w: 'waiter', ipa: '/ˈweɪ.tər/', t: 'noun', ts: 'n.', m: 'bồi bàn', ee: 'Call the waiter.', ev: 'Gọi bồi bàn.' },
          { w: 'farmer', ipa: '/ˈfɑː.mər/', t: 'noun', ts: 'n.', m: 'nông dân', ee: 'The farmer works hard.', ev: 'Người nông dân làm việc chăm chỉ.' },
          { w: 'worker', ipa: '/ˈwɜː.kər/', t: 'noun', ts: 'n.', m: 'công nhân', ee: 'The worker is tired.', ev: 'Người công nhân đang mệt.' }
        ]
      },
      {
        order: 26,
        vocab: [
          { w: 'engineer', ipa: '/ˌen.dʒɪˈnɪər/', t: 'noun', ts: 'n.', m: 'kỹ sư', ee: 'He is an engineer.', ev: 'Anh ấy là kỹ sư.' },
          { w: 'artist', ipa: '/ˈɑː.tɪst/', t: 'noun', ts: 'n.', m: 'nghệ sĩ', ee: 'She is an artist.', ev: 'Cô ấy là nghệ sĩ.' },
          { w: 'actor', ipa: '/ˈæk.tər/', t: 'noun', ts: 'n.', m: 'diễn viên nam', ee: 'He is an actor.', ev: 'Anh ấy là nam diễn viên.' },
          { w: 'singer', ipa: '/ˈsɪŋ.ər/', t: 'noun', ts: 'n.', m: 'ca sĩ', ee: 'She is a singer.', ev: 'Cô ấy là ca sĩ.' },
          { w: 'dancer', ipa: '/ˈdɑːn.sər/', t: 'noun', ts: 'n.', m: 'vũ công', ee: 'He is a dancer.', ev: 'Anh ấy là vũ công.' },
          { w: 'writer', ipa: '/ˈraɪ.tər/', t: 'noun', ts: 'n.', m: 'nhà văn', ee: 'I am a writer.', ev: 'Tôi là nhà văn.' },
          { w: 'manager', ipa: '/ˈmæn.ɪ.dʒər/', t: 'noun', ts: 'n.', m: 'quản lý', ee: 'Call the manager.', ev: 'Gọi quản lý đi.' },
          { w: 'assistant', ipa: '/əˈsɪs.tənt/', t: 'noun', ts: 'n.', m: 'trợ lý', ee: 'She is my assistant.', ev: 'Cô ấy là trợ lý của tôi.' },
          { w: 'guard', ipa: '/ɡɑːd/', t: 'noun', ts: 'n.', m: 'bảo vệ', ee: 'The guard is here.', ev: 'Bảo vệ đang ở đây.' },
          { w: 'police', ipa: '/pəˈliːs/', t: 'noun', ts: 'n.', m: 'cảnh sát', ee: 'Call the police.', ev: 'Gọi cảnh sát.' }
        ]
      }
    ]
  },
  // Cụm 14: Bài 27 & 28
  {
    cum: 14,
    lessons: [
      {
        order: 27,
        vocab: [
          { w: 'watch', ipa: '/wɒtʃ/', t: 'verb', ts: 'v.', m: 'xem', ee: 'Watch TV.', ev: 'Xem TV.' },
          { w: 'listen', ipa: '/ˈlɪs.ən/', t: 'verb', ts: 'v.', m: 'nghe', ee: 'Listen to music.', ev: 'Nghe nhạc.' },
          { w: 'collect', ipa: '/kəˈlekt/', t: 'verb', ts: 'v.', m: 'sưu tầm', ee: 'Collect stamps.', ev: 'Sưu tầm tem.' },
          { w: 'paint', ipa: '/peɪnt/', t: 'verb', ts: 'v.', m: 'sơn, vẽ sơn', ee: 'Paint a picture.', ev: 'Vẽ một bức tranh.' },
          { w: 'run', ipa: '/rʌn/', t: 'verb', ts: 'v.', m: 'chạy', ee: 'Run fast.', ev: 'Chạy nhanh.' },
          { w: 'jump', ipa: '/dʒʌmp/', t: 'verb', ts: 'v.', m: 'nhảy', ee: 'Jump high.', ev: 'Nhảy cao.' }
        ]
      },
      {
        order: 28,
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
      level: 'A1'
    }))
  }));
  fs.writeFileSync(`data/ielts-vocab-cum${batch.cum}.json`, JSON.stringify(formatted, null, 2));
  console.log(`Generated cum ${batch.cum}`);
});

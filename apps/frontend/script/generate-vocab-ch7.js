const fs = require('fs');

const data = [
  // Cụm 29: Bài 56 & 57
  {
    cum: 29,
    lessons: [
      {
        order: 56,
        vocab: [
          { w: 'must', ipa: '/mʌst/', t: 'verb', ts: 'v.', m: 'phải', ee: 'You must go now.', ev: 'Bạn phải đi ngay bây giờ.' },
          { w: 'have to', ipa: '/hæv tuː/', t: 'verb', ts: 'v.', m: 'phải', ee: 'I have to work.', ev: 'Tôi phải làm việc.' },
          { w: 'should', ipa: '/ʃʊd/', t: 'verb', ts: 'v.', m: 'nên', ee: 'You should sleep.', ev: 'Bạn nên ngủ.' },
          { w: 'rule', ipa: '/ruːl/', t: 'noun', ts: 'n.', m: 'quy tắc', ee: 'Follow the rules.', ev: 'Hãy tuân theo các quy tắc.' },
          { w: 'law', ipa: '/lɔː/', t: 'noun', ts: 'n.', m: 'luật pháp', ee: 'It is the law.', ev: 'Đó là luật.' },
          { w: 'order', ipa: '/ˈɔː.dər/', t: 'noun', ts: 'n.', m: 'mệnh lệnh', ee: 'It is an order.', ev: 'Đó là một mệnh lệnh.' },
          { w: 'follow', ipa: '/ˈfɒl.əʊ/', t: 'verb', ts: 'v.', m: 'tuân theo', ee: 'Follow me.', ev: 'Hãy theo tôi.' },
          { w: 'break', ipa: '/breɪk/', t: 'verb', ts: 'v.', m: 'phá vỡ, vi phạm', ee: 'Do not break the law.', ev: 'Đừng vi phạm luật pháp.' },
          { w: 'fine', ipa: '/faɪn/', t: 'noun', ts: 'n.', m: 'tiền phạt', ee: 'Pay the fine.', ev: 'Đóng tiền phạt đi.' },
          { w: 'punish', ipa: '/ˈpʌn.ɪʃ/', t: 'verb', ts: 'v.', m: 'trừng phạt', ee: 'They will punish him.', ev: 'Họ sẽ trừng phạt anh ấy.' }
        ]
      },
      {
        order: 57,
        vocab: [
          { w: 'doctor', ipa: '/ˈdɒk.tər/', t: 'noun', ts: 'n.', m: 'bác sĩ', ee: 'See a doctor.', ev: 'Hãy đi khám bác sĩ.' },
          { w: 'hospital', ipa: '/ˈhɒs.pɪ.təl/', t: 'noun', ts: 'n.', m: 'bệnh viện', ee: 'Go to the hospital.', ev: 'Hãy đến bệnh viện.' },
          { w: 'sick', ipa: '/sɪk/', t: 'adjective', ts: 'adj.', m: 'ốm, bệnh', ee: 'I feel sick.', ev: 'Tôi cảm thấy bị ốm.' },
          { w: 'ill', ipa: '/ɪl/', t: 'adjective', ts: 'adj.', m: 'ốm, bệnh', ee: 'He is very ill.', ev: 'Anh ấy đang rất ốm.' },
          { w: 'pain', ipa: '/peɪn/', t: 'noun', ts: 'n.', m: 'sự đau đớn', ee: 'I have a pain.', ev: 'Tôi có một cơn đau.' },
          { w: 'ache', ipa: '/eɪk/', t: 'noun', ts: 'n.', m: 'cơn đau', ee: 'My head aches.', ev: 'Đầu tôi bị đau.' },
          { w: 'pill', ipa: '/pɪl/', t: 'noun', ts: 'n.', m: 'viên thuốc', ee: 'Take a pill.', ev: 'Hãy uống một viên thuốc.' },
          { w: 'medicine', ipa: '/ˈmed.ɪ.sən/', t: 'noun', ts: 'n.', m: 'thuốc', ee: 'Take this medicine.', ev: 'Hãy uống loại thuốc này.' },
          { w: 'health', ipa: '/helθ/', t: 'noun', ts: 'n.', m: 'sức khỏe', ee: 'Health is important.', ev: 'Sức khỏe là điều quan trọng.' },
          { w: 'advice', ipa: '/ədˈvaɪs/', t: 'noun', ts: 'n.', m: 'lời khuyên', ee: 'I need your advice.', ev: 'Tôi cần lời khuyên của bạn.' }
        ]
      }
    ]
  },
  // Cụm 30: Bài 58 & 59
  {
    cum: 30,
    lessons: [
      {
        order: 58,
        vocab: [
          { w: 'need to', ipa: '/niːd tuː/', t: 'verb', ts: 'v.', m: 'cần phải', ee: 'You need to rest.', ev: 'Bạn cần phải nghỉ ngơi.' },
          { w: 'want to', ipa: '/wɒnt tuː/', t: 'verb', ts: 'v.', m: 'muốn', ee: 'I want to sleep.', ev: 'Tôi muốn ngủ.' },
          { w: 'choose to', ipa: '/tʃuːz tuː/', t: 'verb', ts: 'v.', m: 'chọn', ee: 'I choose to go.', ev: 'Tôi chọn việc rời đi.' },
          { w: 'volunteer', ipa: '/ˌvɒl.ənˈtɪər/', t: 'verb', ts: 'v.', m: 'tình nguyện', ee: 'I will volunteer.', ev: 'Tôi sẽ tình nguyện.' },
          { w: 'help', ipa: '/help/', t: 'verb', ts: 'v.', m: 'giúp đỡ', ee: 'Please help me.', ev: 'Làm ơn hãy giúp tôi.' },
          { w: 'join', ipa: '/dʒɔɪn/', t: 'verb', ts: 'v.', m: 'tham gia', ee: 'Join the club.', ev: 'Hãy tham gia câu lạc bộ.' },
          { w: 'free', ipa: '/friː/', t: 'adjective', ts: 'adj.', m: 'tự do, miễn phí', ee: 'I am free today.', ev: 'Tôi rảnh vào hôm nay.' },
          { w: 'force', ipa: '/fɔːs/', t: 'verb', ts: 'v.', m: 'ép buộc', ee: 'Do not force him.', ev: 'Đừng ép buộc anh ấy.' },
          { w: 'allow', ipa: '/əˈlaʊ/', t: 'verb', ts: 'v.', m: 'cho phép', ee: 'They allowed it.', ev: 'Họ đã cho phép điều đó.' }
        ]
      },
      {
        order: 59,
        vocab: [
          { w: 'can', ipa: '/kæn/', t: 'verb', ts: 'v.', m: 'có thể', ee: 'I can swim.', ev: 'Tôi có thể bơi.' },
          { w: 'could', ipa: '/kʊd/', t: 'verb', ts: 'v.', m: 'có thể (quá khứ/lịch sự)', ee: 'Could you help?', ev: 'Bạn có thể giúp không?' },
          { w: 'might', ipa: '/maɪt/', t: 'verb', ts: 'v.', m: 'có thể (khả năng thấp)', ee: 'It might rain.', ev: 'Trời có thể sẽ mưa.' },
          { w: 'may', ipa: '/meɪ/', t: 'verb', ts: 'v.', m: 'có thể (xin phép/khả năng)', ee: 'May I come in?', ev: 'Tôi có thể vào không?' },
          { w: 'possible', ipa: '/ˈpɒs.ə.bəl/', t: 'adjective', ts: 'adj.', m: 'có thể', ee: 'It is possible.', ev: 'Điều đó là có thể.' },
          { w: 'probable', ipa: '/ˈprɒb.ə.bəl/', t: 'adjective', ts: 'adj.', m: 'có khả năng xảy ra', ee: 'It is probable.', ev: 'Điều đó có khả năng xảy ra.' },
          { w: 'sure', ipa: '/ʃɔːr/', t: 'adjective', ts: 'adj.', m: 'chắc chắn', ee: 'Are you sure?', ev: 'Bạn có chắc không?' },
          { w: 'certain', ipa: '/ˈsɜː.tən/', t: 'adjective', ts: 'adj.', m: 'chắc chắn', ee: 'I am certain.', ev: 'Tôi chắc chắn.' },
          { w: 'guess', ipa: '/ɡes/', t: 'verb', ts: 'v.', m: 'đoán', ee: 'I guess so.', ev: 'Tôi đoán vậy.' },
          { w: 'doubt', ipa: '/daʊt/', t: 'verb', ts: 'v.', m: 'nghi ngờ', ee: 'I doubt it.', ev: 'Tôi nghi ngờ điều đó.' }
        ]
      }
    ]
  },
  // Cụm 31: Bài 60 & 61
  {
    cum: 31,
    lessons: [
      {
        order: 60,
        vocab: [
          { w: 'wish', ipa: '/wɪʃ/', t: 'verb', ts: 'v.', m: 'ước, mong muốn', ee: 'I wish you well.', ev: 'Tôi chúc bạn mạnh khỏe.' },
          { w: 'hope', ipa: '/həʊp/', t: 'verb', ts: 'v.', m: 'hy vọng', ee: 'I hope so.', ev: 'Tôi hy vọng vậy.' },
          { w: 'decide', ipa: '/dɪˈsaɪd/', t: 'verb', ts: 'v.', m: 'quyết định', ee: 'I decided to stay.', ev: 'Tôi đã quyết định ở lại.' },
          { w: 'select', ipa: '/sɪˈlekt/', t: 'verb', ts: 'v.', m: 'lựa chọn', ee: 'Select an option.', ev: 'Hãy chọn một phương án.' },
          { w: 'pick', ipa: '/pɪk/', t: 'verb', ts: 'v.', m: 'chọn, hái', ee: 'Pick a card.', ev: 'Hãy chọn một lá bài.' },
          { w: 'mind', ipa: '/maɪnd/', t: 'noun', ts: 'n.', m: 'tâm trí', ee: 'Keep it in mind.', ev: 'Hãy ghi nhớ điều đó.' },
          { w: 'brain', ipa: '/breɪn/', t: 'noun', ts: 'n.', m: 'não bộ', ee: 'Use your brain.', ev: 'Hãy sử dụng bộ não của bạn.' },
          { w: 'heart', ipa: '/hɑːt/', t: 'noun', ts: 'n.', m: 'trái tim', ee: 'My heart beats fast.', ev: 'Trái tim tôi đập nhanh.' },
          { w: 'soul', ipa: '/səʊl/', t: 'noun', ts: 'n.', m: 'linh hồn', ee: 'A kind soul.', ev: 'Một tâm hồn lương thiện.' }
        ]
      },
      {
        order: 61,
        vocab: [
          { w: 'read', ipa: '/riːd/', t: 'verb', ts: 'v.', m: 'đọc', ee: 'I like to read.', ev: 'Tôi thích đọc sách.' },
          { w: 'watch', ipa: '/wɒtʃ/', t: 'verb', ts: 'v.', m: 'xem', ee: 'Watch a movie.', ev: 'Xem một bộ phim.' },
          { w: 'listen', ipa: '/ˈlɪs.ən/', t: 'verb', ts: 'v.', m: 'nghe', ee: 'Listen to me.', ev: 'Hãy nghe tôi nói.' },
          { w: 'play', ipa: '/pleɪ/', t: 'verb', ts: 'v.', m: 'chơi', ee: 'Play the guitar.', ev: 'Chơi đàn ghi ta.' },
          { w: 'enjoy', ipa: '/ɪnˈdʒɔɪ/', t: 'verb', ts: 'v.', m: 'thưởng thức, thích', ee: 'Enjoy the meal.', ev: 'Hãy thưởng thức bữa ăn.' },
          { w: 'love', ipa: '/lʌv/', t: 'verb', ts: 'v.', m: 'yêu thích', ee: 'I love this song.', ev: 'Tôi yêu bài hát này.' },
          { w: 'like', ipa: '/laɪk/', t: 'verb', ts: 'v.', m: 'thích', ee: 'I like it.', ev: 'Tôi thích nó.' },
          { w: 'prefer', ipa: '/prɪˈfɜːr/', t: 'verb', ts: 'v.', m: 'thích hơn', ee: 'I prefer coffee.', ev: 'Tôi thích cà phê hơn.' },
          { w: 'interest', ipa: '/ˈɪn.trəst/', t: 'noun', ts: 'n.', m: 'sự quan tâm, sở thích', ee: 'I have an interest.', ev: 'Tôi có một sở thích.' },
          { w: 'hobby', ipa: '/ˈhɒb.i/', t: 'noun', ts: 'n.', m: 'sở thích', ee: 'My hobby is reading.', ev: 'Sở thích của tôi là đọc sách.' }
        ]
      }
    ]
  },
  // Cụm 32: Bài 62 & 63
  {
    cum: 32,
    lessons: [
      {
        order: 62,
        vocab: [
          { w: 'problem', ipa: '/ˈprɒb.ləm/', t: 'noun', ts: 'n.', m: 'vấn đề', ee: 'It is a big problem.', ev: 'Đó là một vấn đề lớn.' },
          { w: 'issue', ipa: '/ˈɪʃ.uː/', t: 'noun', ts: 'n.', m: 'vấn đề', ee: 'A serious issue.', ev: 'Một vấn đề nghiêm trọng.' },
          { w: 'trouble', ipa: '/ˈtrʌb.əl/', t: 'noun', ts: 'n.', m: 'rắc rối', ee: 'I am in trouble.', ev: 'Tôi đang gặp rắc rối.' },
          { w: 'limit', ipa: '/ˈlɪm.ɪt/', t: 'noun', ts: 'n.', m: 'giới hạn', ee: 'Know your limit.', ev: 'Hãy biết giới hạn của bạn.' },
          { w: 'border', ipa: '/ˈbɔː.dər/', t: 'noun', ts: 'n.', m: 'biên giới', ee: 'Cross the border.', ev: 'Băng qua biên giới.' },
          { w: 'boundary', ipa: '/ˈbaʊn.dər.i/', t: 'noun', ts: 'n.', m: 'ranh giới', ee: 'A clear boundary.', ev: 'Một ranh giới rõ ràng.' },
          { w: 'edge', ipa: '/edʒ/', t: 'noun', ts: 'n.', m: 'rìa, mép', ee: 'The edge of the table.', ev: 'Mép bàn.' },
          { w: 'end', ipa: '/end/', t: 'noun', ts: 'n.', m: 'kết thúc', ee: 'The end of the book.', ev: 'Phần kết của cuốn sách.' },
          { w: 'stop', ipa: '/stɒp/', t: 'verb', ts: 'v.', m: 'dừng lại', ee: 'Stop here.', ev: 'Dừng lại ở đây.' },
          { w: 'block', ipa: '/blɒk/', t: 'verb', ts: 'v.', m: 'ngăn chặn', ee: 'Block the road.', ev: 'Chặn đường lại.' }
        ]
      },
      {
        order: 63,
        vocab: [
          { w: 'cause', ipa: '/kɔːz/', t: 'noun', ts: 'n.', m: 'nguyên nhân', ee: 'What is the cause?', ev: 'Nguyên nhân là gì?' },
          { w: 'effect', ipa: '/ɪˈfekt/', t: 'noun', ts: 'n.', m: 'tác động, hiệu ứng', ee: 'A bad effect.', ev: 'Một tác động xấu.' },
          { w: 'reason', ipa: '/ˈriː.zən/', t: 'noun', ts: 'n.', m: 'lý do', ee: 'Give me a reason.', ev: 'Hãy cho tôi một lý do.' },
          { w: 'result', ipa: '/rɪˈzʌlt/', t: 'noun', ts: 'n.', m: 'kết quả', ee: 'The final result.', ev: 'Kết quả cuối cùng.' },
          { w: 'so', ipa: '/səʊ/', t: 'conjunction', ts: 'conj.', m: 'vì vậy', ee: 'It rained, so I stayed.', ev: 'Trời mưa, vì vậy tôi đã ở lại.' },
          { w: 'because', ipa: '/bɪˈkɒz/', t: 'conjunction', ts: 'conj.', m: 'bởi vì', ee: 'Because I was sick.', ev: 'Bởi vì tôi đã bị ốm.' },
          { w: 'therefore', ipa: '/ˈðeə.fɔːr/', t: 'adverb', ts: 'adv.', m: 'do đó', ee: 'He was late, therefore he ran.', ev: 'Anh ấy đã đến muộn, do đó anh ấy đã chạy.' },
          { w: 'since', ipa: '/sɪns/', t: 'conjunction', ts: 'conj.', m: 'từ khi, bởi vì', ee: 'Since you are here...', ev: 'Bởi vì bạn đã ở đây...' },
          { w: 'as', ipa: '/æz/', t: 'conjunction', ts: 'conj.', m: 'bởi vì, khi', ee: 'As it was raining...', ev: 'Bởi vì trời đang mưa...' },
          { w: 'due to', ipa: '/dʒuː tuː/', t: 'phrase', ts: 'phr.', m: 'do, bởi', ee: 'Due to the weather.', ev: 'Do thời tiết.' }
        ]
      }
    ]
  },
  // Cụm 33: Bài 64
  {
    cum: 33,
    lessons: [
      {
        order: 64,
        vocab: [] // Ôn tập Chương 7, không có từ vựng mới
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

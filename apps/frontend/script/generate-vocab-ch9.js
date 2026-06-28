const fs = require('fs');

const data = [
  // Cụm 39: Bài 74 & 75
  {
    cum: 39,
    lessons: [
      {
        order: 74,
        vocab: [
          { w: 'if', ipa: '/ɪf/', t: 'conjunction', ts: 'conj.', m: 'nếu', ee: 'If you go, I will go.', ev: 'Nếu bạn đi, tôi sẽ đi.' },
          { w: 'unless', ipa: '/ʌnˈles/', t: 'conjunction', ts: 'conj.', m: 'trừ khi', ee: 'Unless you try, you fail.', ev: 'Trừ khi bạn cố gắng, bạn sẽ thất bại.' },
          { w: 'condition', ipa: '/kənˈdɪʃ.ən/', t: 'noun', ts: 'n.', m: 'điều kiện', ee: 'A good condition.', ev: 'Một điều kiện tốt.' },
          { w: 'real', ipa: '/rɪəl/', t: 'adjective', ts: 'adj.', m: 'thực tế', ee: 'A real story.', ev: 'Một câu chuyện thực tế.' },
          { w: 'true', ipa: '/truː/', t: 'adjective', ts: 'adj.', m: 'đúng, sự thật', ee: 'It is a true story.', ev: 'Đó là một câu chuyện có thật.' },
          { w: 'happen', ipa: '/ˈhæp.ən/', t: 'verb', ts: 'v.', m: 'xảy ra', ee: 'It happened yesterday.', ev: 'Nó đã xảy ra hôm qua.' },
          { w: 'fact', ipa: '/fækt/', t: 'noun', ts: 'n.', m: 'sự thật', ee: 'It is a fact.', ev: 'Đó là một sự thật.' },
          { w: 'reality', ipa: '/riˈæl.ə.ti/', t: 'noun', ts: 'n.', m: 'thực tại', ee: 'In reality, it is hard.', ev: 'Trên thực tế, điều đó rất khó.' },
          { w: 'situation', ipa: '/ˌsɪtʃ.uˈeɪ.ʃən/', t: 'noun', ts: 'n.', m: 'tình huống', ee: 'A bad situation.', ev: 'Một tình huống tồi tệ.' },
          { w: 'normal', ipa: '/ˈnɔː.məl/', t: 'adjective', ts: 'adj.', m: 'bình thường', ee: 'A normal day.', ev: 'Một ngày bình thường.' }
        ]
      },
      {
        order: 75,
        vocab: [
          { w: 'would', ipa: '/wʊd/', t: 'verb', ts: 'v.', m: 'sẽ (quá khứ/giả định)', ee: 'I would go if I could.', ev: 'Tôi sẽ đi nếu tôi có thể.' },
          { w: 'could', ipa: '/kʊd/', t: 'verb', ts: 'v.', m: 'có thể (quá khứ/giả định)', ee: 'I could do it.', ev: 'Tôi có thể làm điều đó.' },
          { w: 'might', ipa: '/maɪt/', t: 'verb', ts: 'v.', m: 'có thể', ee: 'He might come.', ev: 'Anh ấy có thể sẽ đến.' },
          { w: 'unreal', ipa: '/ʌnˈrɪəl/', t: 'adjective', ts: 'adj.', m: 'không thực tế', ee: 'An unreal dream.', ev: 'Một giấc mơ không thực tế.' },
          { w: 'imagine', ipa: '/ɪˈmædʒ.ɪn/', t: 'verb', ts: 'v.', m: 'tưởng tượng', ee: 'Imagine a big house.', ev: 'Hãy tưởng tượng một ngôi nhà lớn.' },
          { w: 'suppose', ipa: '/səˈpəʊz/', t: 'verb', ts: 'v.', m: 'giả sử, cho rằng', ee: 'I suppose you are right.', ev: 'Tôi cho rằng bạn đúng.' },
          { w: 'wish', ipa: '/wɪʃ/', t: 'verb', ts: 'v.', m: 'ước', ee: 'I wish I had a car.', ev: 'Tôi ước tôi có một chiếc ô tô.' },
          { w: 'dream', ipa: '/driːm/', t: 'noun', ts: 'n.', m: 'giấc mơ', ee: 'A beautiful dream.', ev: 'Một giấc mơ đẹp.' },
          { w: 'desire', ipa: '/dɪˈzaɪər/', t: 'noun', ts: 'n.', m: 'khao khát', ee: 'A strong desire.', ev: 'Một khao khát mãnh liệt.' },
          { w: 'expect', ipa: '/ɪkˈspekt/', t: 'verb', ts: 'v.', m: 'mong đợi', ee: 'I expect to win.', ev: 'Tôi mong đợi sẽ chiến thắng.' }
        ]
      }
    ]
  },
  // Cụm 40: Bài 76 & 77
  {
    cum: 40,
    lessons: [
      {
        order: 76,
        vocab: [
          { w: 'different', ipa: '/ˈdɪf.ər.ənt/', t: 'adjective', ts: 'adj.', m: 'khác biệt', ee: 'We are different.', ev: 'Chúng tôi khác biệt.' },
          { w: 'compare', ipa: '/kəmˈpeər/', t: 'verb', ts: 'v.', m: 'so sánh', ee: 'Compare these two.', ev: 'Hãy so sánh hai cái này.' },
          { w: 'similar', ipa: '/ˈsɪm.ɪ.lər/', t: 'adjective', ts: 'adj.', m: 'tương tự', ee: 'They look similar.', ev: 'Họ trông tương tự nhau.' },
          { w: 'contrast', ipa: '/ˈkɒn.trɑːst/', t: 'noun', ts: 'n.', m: 'sự tương phản', ee: 'A sharp contrast.', ev: 'Một sự tương phản rõ rệt.' },
          { w: 'alike', ipa: '/əˈlaɪk/', t: 'adverb', ts: 'adv.', m: 'giống nhau', ee: 'They think alike.', ev: 'Họ có suy nghĩ giống nhau.' },
          { w: 'unlike', ipa: '/ʌnˈlaɪk/', t: 'preposition', ts: 'prep.', m: 'không giống', ee: 'Unlike you, I like coffee.', ev: 'Không giống bạn, tôi thích cà phê.' },
          { w: 'differentiate', ipa: '/ˌdɪf.əˈren.ʃi.eɪt/', t: 'verb', ts: 'v.', m: 'phân biệt', ee: 'It is hard to differentiate.', ev: 'Thật khó để phân biệt.' },
          { w: 'distinction', ipa: '/dɪˈstɪŋk.ʃən/', t: 'noun', ts: 'n.', m: 'sự khác biệt', ee: 'A clear distinction.', ev: 'Một sự khác biệt rõ ràng.' },
          { w: 'separate', ipa: '/ˈsep.ər.ət/', t: 'adjective', ts: 'adj.', m: 'riêng biệt', ee: 'A separate room.', ev: 'Một căn phòng riêng biệt.' },
          { w: 'divide', ipa: '/dɪˈvaɪd/', t: 'verb', ts: 'v.', m: 'chia ra', ee: 'Divide the cake.', ev: 'Hãy chia chiếc bánh.' }
        ]
      },
      {
        order: 77,
        vocab: [
          { w: 'who', ipa: '/huː/', t: 'pronoun', ts: 'pron.', m: 'người mà', ee: 'The boy who ran.', ev: 'Cậu bé người mà đã chạy.' },
          { w: 'whom', ipa: '/huːm/', t: 'pronoun', ts: 'pron.', m: 'người mà (tân ngữ)', ee: 'The man whom I met.', ev: 'Người đàn ông mà tôi đã gặp.' },
          { w: 'whose', ipa: '/huːz/', t: 'pronoun', ts: 'pron.', m: 'của người mà', ee: 'The girl whose bag is lost.', ev: 'Cô gái người có chiếc túi bị mất.' },
          { w: 'which', ipa: '/wɪtʃ/', t: 'pronoun', ts: 'pron.', m: 'cái mà', ee: 'The book which I read.', ev: 'Cuốn sách cái mà tôi đã đọc.' },
          { w: 'that', ipa: '/ðæt/', t: 'pronoun', ts: 'pron.', m: 'người/cái mà', ee: 'The car that I bought.', ev: 'Chiếc xe mà tôi đã mua.' },
          { w: 'person', ipa: '/ˈpɜː.sən/', t: 'noun', ts: 'n.', m: 'người', ee: 'A nice person.', ev: 'Một người tốt bụng.' },
          { w: 'thing', ipa: '/θɪŋ/', t: 'noun', ts: 'n.', m: 'vật', ee: 'A small thing.', ev: 'Một vật nhỏ.' },
          { w: 'object', ipa: '/ˈɒb.dʒɪkt/', t: 'noun', ts: 'n.', m: 'đồ vật', ee: 'A heavy object.', ev: 'Một đồ vật nặng.' },
          { w: 'item', ipa: '/ˈaɪ.təm/', t: 'noun', ts: 'n.', m: 'món đồ', ee: 'An expensive item.', ev: 'Một món đồ đắt tiền.' },
          { w: 'detail', ipa: '/ˈdiː.teɪl/', t: 'noun', ts: 'n.', m: 'chi tiết', ee: 'A small detail.', ev: 'Một chi tiết nhỏ.' }
        ]
      }
    ]
  },
  // Cụm 41: Bài 78 & 79
  {
    cum: 41,
    lessons: [
      {
        order: 78,
        vocab: [
          { w: 'where', ipa: '/weər/', t: 'adverb', ts: 'adv.', m: 'nơi mà', ee: 'The house where I live.', ev: 'Ngôi nhà nơi mà tôi sống.' },
          { w: 'when', ipa: '/wen/', t: 'adverb', ts: 'adv.', m: 'khi mà', ee: 'The day when we met.', ev: 'Ngày mà chúng ta gặp nhau.' },
          { w: 'why', ipa: '/waɪ/', t: 'adverb', ts: 'adv.', m: 'tại sao mà', ee: 'The reason why he left.', ev: 'Lý do tại sao anh ấy rời đi.' },
          { w: 'place', ipa: '/pleɪs/', t: 'noun', ts: 'n.', m: 'nơi chốn', ee: 'A beautiful place.', ev: 'Một nơi chốn xinh đẹp.' },
          { w: 'location', ipa: '/ləʊˈkeɪ.ʃən/', t: 'noun', ts: 'n.', m: 'vị trí', ee: 'A good location.', ev: 'Một vị trí tốt.' },
          { w: 'time', ipa: '/taɪm/', t: 'noun', ts: 'n.', m: 'thời gian', ee: 'I have no time.', ev: 'Tôi không có thời gian.' },
          { w: 'moment', ipa: '/ˈməʊ.mənt/', t: 'noun', ts: 'n.', m: 'khoảnh khắc', ee: 'A happy moment.', ev: 'Một khoảnh khắc hạnh phúc.' },
          { w: 'reason', ipa: '/ˈriː.zən/', t: 'noun', ts: 'n.', m: 'lý do', ee: 'Give me a reason.', ev: 'Hãy cho tôi một lý do.' },
          { w: 'purpose', ipa: '/ˈpɜː.pəs/', t: 'noun', ts: 'n.', m: 'mục đích', ee: 'What is your purpose?', ev: 'Mục đích của bạn là gì?' },
          { w: 'goal', ipa: '/ɡəʊl/', t: 'noun', ts: 'n.', m: 'mục tiêu', ee: 'A big goal.', ev: 'Một mục tiêu lớn.' }
        ]
      },
      {
        order: 79,
        vocab: [
          { w: 'used to', ipa: '/ˈjuːst tuː/', t: 'phrase', ts: 'phr.', m: 'đã từng', ee: 'I used to swim.', ev: 'Tôi đã từng đi bơi.' },
          { w: 'habit', ipa: '/ˈhæb.ɪt/', t: 'noun', ts: 'n.', m: 'thói quen', ee: 'A bad habit.', ev: 'Một thói quen xấu.' },
          { w: 'past', ipa: '/pɑːst/', t: 'noun', ts: 'n.', m: 'quá khứ', ee: 'In the past.', ev: 'Trong quá khứ.' },
          { w: 'normal', ipa: '/ˈnɔː.məl/', t: 'adjective', ts: 'adj.', m: 'bình thường', ee: 'It is normal.', ev: 'Điều đó là bình thường.' },
          { w: 'common', ipa: '/ˈkɒm.ən/', t: 'adjective', ts: 'adj.', m: 'phổ biến', ee: 'A common name.', ev: 'Một cái tên phổ biến.' },
          { w: 'regular', ipa: '/ˈreɡ.jə.lər/', t: 'adjective', ts: 'adj.', m: 'đều đặn', ee: 'A regular customer.', ev: 'Một khách hàng thường xuyên.' },
          { w: 'frequent', ipa: '/ˈfriː.kwənt/', t: 'adjective', ts: 'adj.', m: 'thường xuyên', ee: 'A frequent visitor.', ev: 'Một du khách thường xuyên.' },
          { w: 'usual', ipa: '/ˈjuː.ʒu.əl/', t: 'adjective', ts: 'adj.', m: 'thông thường', ee: 'As usual.', ev: 'Như thường lệ.' },
          { w: 'familiar', ipa: '/fəˈmɪl.i.ər/', t: 'adjective', ts: 'adj.', m: 'quen thuộc', ee: 'A familiar face.', ev: 'Một khuôn mặt quen thuộc.' },
          { w: 'custom', ipa: '/ˈkʌs.təm/', t: 'noun', ts: 'n.', m: 'phong tục, thói quen', ee: 'A local custom.', ev: 'Một phong tục địa phương.' }
        ]
      }
    ]
  },
  // Cụm 42: Bài 80 & 81
  {
    cum: 42,
    lessons: [
      {
        order: 80,
        vocab: [
          { w: 'say', ipa: '/seɪ/', t: 'verb', ts: 'v.', m: 'nói', ee: 'He said hello.', ev: 'Anh ấy đã nói xin chào.' },
          { w: 'tell', ipa: '/tel/', t: 'verb', ts: 'v.', m: 'bảo, kể', ee: 'Tell me the truth.', ev: 'Hãy kể cho tôi sự thật.' },
          { w: 'ask', ipa: '/ɑːsk/', t: 'verb', ts: 'v.', m: 'hỏi, yêu cầu', ee: 'I asked him.', ev: 'Tôi đã hỏi anh ấy.' },
          { w: 'reply', ipa: '/rɪˈplaɪ/', t: 'verb', ts: 'v.', m: 'trả lời', ee: 'She replied quickly.', ev: 'Cô ấy đã trả lời nhanh chóng.' },
          { w: 'answer', ipa: '/ˈɑːn.sər/', t: 'verb', ts: 'v.', m: 'trả lời', ee: 'Answer the question.', ev: 'Trả lời câu hỏi đi.' },
          { w: 'state', ipa: '/steɪt/', t: 'verb', ts: 'v.', m: 'phát biểu', ee: 'He stated the fact.', ev: 'Anh ấy đã phát biểu sự thật.' },
          { w: 'claim', ipa: '/kleɪm/', t: 'verb', ts: 'v.', m: 'tuyên bố, khẳng định', ee: 'She claimed it was true.', ev: 'Cô ấy đã khẳng định điều đó là thật.' },
          { w: 'report', ipa: '/rɪˈpɔːt/', t: 'verb', ts: 'v.', m: 'báo cáo', ee: 'They reported the news.', ev: 'Họ đã báo cáo tin tức.' },
          { w: 'announce', ipa: '/əˈnaʊns/', t: 'verb', ts: 'v.', m: 'thông báo', ee: 'They announced the winner.', ev: 'Họ đã thông báo người chiến thắng.' },
          { w: 'mention', ipa: '/ˈmen.ʃən/', t: 'verb', ts: 'v.', m: 'nhắc đến', ee: 'He mentioned your name.', ev: 'Anh ấy đã nhắc đến tên bạn.' }
        ]
      },
      {
        order: 81,
        vocab: [
          { w: 'cut', ipa: '/kʌt/', t: 'verb', ts: 'v.', m: 'cắt', ee: 'Cut the cake.', ev: 'Cắt chiếc bánh đi.' },
          { w: 'interrupt', ipa: '/ˌɪn.təˈrʌpt/', t: 'verb', ts: 'v.', m: 'ngắt lời, làm gián đoạn', ee: 'Do not interrupt me.', ev: 'Đừng ngắt lời tôi.' },
          { w: 'pause', ipa: '/pɔːz/', t: 'verb', ts: 'v.', m: 'tạm dừng', ee: 'Pause the music.', ev: 'Tạm dừng bản nhạc.' },
          { w: 'stop', ipa: '/stɒp/', t: 'verb', ts: 'v.', m: 'dừng lại', ee: 'Stop the car.', ev: 'Dừng xe lại.' },
          { w: 'sudden', ipa: '/ˈsʌd.ən/', t: 'adjective', ts: 'adj.', m: 'đột ngột', ee: 'A sudden change.', ev: 'Một sự thay đổi đột ngột.' },
          { w: 'break', ipa: '/breɪk/', t: 'noun', ts: 'n.', m: 'giờ nghỉ', ee: 'Take a break.', ev: 'Hãy nghỉ ngơi một lát.' },
          { w: 'quick', ipa: '/kwɪk/', t: 'adjective', ts: 'adj.', m: 'nhanh', ee: 'A quick run.', ev: 'Một cuộc chạy nhanh.' },
          { w: 'fast', ipa: '/fɑːst/', t: 'adjective', ts: 'adj.', m: 'nhanh', ee: 'He runs fast.', ev: 'Anh ấy chạy nhanh.' },
          { w: 'unexpected', ipa: '/ˌʌn.ɪkˈspek.tɪd/', t: 'adjective', ts: 'adj.', m: 'không mong đợi, bất ngờ', ee: 'An unexpected visit.', ev: 'Một chuyến thăm bất ngờ.' },
          { w: 'surprising', ipa: '/səˈpraɪ.zɪŋ/', t: 'adjective', ts: 'adj.', m: 'đáng ngạc nhiên', ee: 'A surprising event.', ev: 'Một sự kiện đáng ngạc nhiên.' }
        ]
      }
    ]
  },
  // Cụm 43: Bài 82
  {
    cum: 43,
    lessons: [
      {
        order: 82,
        vocab: [] // Ôn tập Chương 9, không có từ vựng mới
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
      level: 'B1' // Chuyển sang B1 từ bài 74
    }))
  }));
  fs.writeFileSync(`data/ielts-vocab-cum${batch.cum}.json`, JSON.stringify(formatted, null, 2));
  console.log(`Generated cum ${batch.cum}`);
});

const fs = require('fs');

const data = [
  // Cụm 24: Bài 47 & 48
  {
    cum: 24,
    lessons: [
      {
        order: 47,
        vocab: [
          { w: 'will', ipa: '/wɪl/', t: 'verb', ts: 'v.', m: 'sẽ', ee: 'I will go tomorrow.', ev: 'Tôi sẽ đi vào ngày mai.' },
          { w: 'won\'t', ipa: '/wəʊnt/', t: 'verb', ts: 'v.', m: 'sẽ không', ee: 'I won\'t eat fish.', ev: 'Tôi sẽ không ăn cá.' },
          { w: 'probably', ipa: '/ˈprɒb.ə.bli/', t: 'adverb', ts: 'adv.', m: 'có lẽ', ee: 'He will probably come.', ev: 'Có lẽ anh ấy sẽ đến.' },
          { w: 'maybe', ipa: '/ˈmeɪ.bi/', t: 'adverb', ts: 'adv.', m: 'có thể', ee: 'Maybe she is busy.', ev: 'Có thể cô ấy bận.' },
          { w: 'perhaps', ipa: '/pəˈhæps/', t: 'adverb', ts: 'adv.', m: 'có lẽ', ee: 'Perhaps it will rain.', ev: 'Có lẽ trời sẽ mưa.' },
          { w: 'think', ipa: '/θɪŋk/', t: 'verb', ts: 'v.', m: 'nghĩ', ee: 'I think it will rain.', ev: 'Tôi nghĩ trời sẽ mưa.' },
          { w: 'hope', ipa: '/həʊp/', t: 'verb', ts: 'v.', m: 'hi vọng', ee: 'I hope you win.', ev: 'Tôi hi vọng bạn thắng.' },
          { w: 'expect', ipa: '/ɪkˈspekt/', t: 'verb', ts: 'v.', m: 'mong đợi', ee: 'I expect him soon.', ev: 'Tôi mong đợi anh ấy sẽ đến sớm.' },
          { w: 'predict', ipa: '/prɪˈdɪkt/', t: 'verb', ts: 'v.', m: 'dự đoán', ee: 'He predicted the rain.', ev: 'Anh ấy đã dự đoán trời mưa.' },
          { w: 'future', ipa: '/ˈfjuː.tʃər/', t: 'noun', ts: 'n.', m: 'tương lai', ee: 'In the future, I will travel.', ev: 'Trong tương lai, tôi sẽ đi du lịch.' }
        ]
      },
      {
        order: 48,
        vocab: [
          { w: 'going to', ipa: '/ˈɡəʊ.ɪŋ tuː/', t: 'phrase', ts: 'phr.', m: 'sắp, dự định', ee: 'I am going to read.', ev: 'Tôi dự định sẽ đọc sách.' },
          { w: 'plan', ipa: '/plæn/', t: 'verb', ts: 'v.', m: 'lên kế hoạch', ee: 'We plan to travel.', ev: 'Chúng tôi lên kế hoạch đi du lịch.' },
          { w: 'intend', ipa: '/ɪnˈtend/', t: 'verb', ts: 'v.', m: 'định, dự định', ee: 'I intend to study.', ev: 'Tôi dự định học.' },
          { w: 'aim', ipa: '/eɪm/', t: 'verb', ts: 'v.', m: 'mục đích, hướng tới', ee: 'We aim to win.', ev: 'Chúng tôi hướng tới chiến thắng.' },
          { w: 'want', ipa: '/wɒnt/', t: 'verb', ts: 'v.', m: 'muốn', ee: 'I want to go.', ev: 'Tôi muốn đi.' },
          { w: 'decide', ipa: '/dɪˈsaɪd/', t: 'verb', ts: 'v.', m: 'quyết định', ee: 'He decided to leave.', ev: 'Anh ấy đã quyết định rời đi.' },
          { w: 'choose', ipa: '/tʃuːz/', t: 'verb', ts: 'v.', m: 'chọn', ee: 'I choose this book.', ev: 'Tôi chọn cuốn sách này.' },
          { w: 'arrange', ipa: '/əˈreɪndʒ/', t: 'verb', ts: 'v.', m: 'sắp xếp', ee: 'They arranged a meeting.', ev: 'Họ đã sắp xếp một cuộc họp.' },
          { w: 'prepare', ipa: '/prɪˈpeər/', t: 'verb', ts: 'v.', m: 'chuẩn bị', ee: 'Prepare the food.', ev: 'Chuẩn bị đồ ăn đi.' },
          { w: 'ready', ipa: '/ˈred.i/', t: 'adjective', ts: 'adj.', m: 'sẵn sàng', ee: 'Are you ready?', ev: 'Bạn đã sẵn sàng chưa?' }
        ]
      }
    ]
  },
  // Cụm 25: Bài 49 & 50
  {
    cum: 25,
    lessons: [
      {
        order: 49,
        vocab: [
          { w: 'soon', ipa: '/suːn/', t: 'adverb', ts: 'adv.', m: 'sớm', ee: 'He will arrive soon.', ev: 'Anh ấy sẽ đến sớm.' },
          { w: 'later', ipa: '/ˈleɪ.tər/', t: 'adverb', ts: 'adv.', m: 'sau này', ee: 'Call me later.', ev: 'Gọi cho tôi sau nhé.' },
          { w: 'tomorrow', ipa: '/təˈmɒr.əʊ/', t: 'noun', ts: 'n.', m: 'ngày mai', ee: 'I will call tomorrow.', ev: 'Tôi sẽ gọi vào ngày mai.' },
          { w: 'next', ipa: '/nekst/', t: 'adjective', ts: 'adj.', m: 'kế tiếp', ee: 'Next week is good.', ev: 'Tuần sau thì tốt.' },
          { w: 'future', ipa: '/ˈfjuː.tʃər/', t: 'noun', ts: 'n.', m: 'tương lai', ee: 'My future is bright.', ev: 'Tương lai của tôi tươi sáng.' },
          { w: 'promise', ipa: '/ˈprɒm.ɪs/', t: 'verb', ts: 'v.', m: 'hứa', ee: 'I promise to help.', ev: 'Tôi hứa sẽ giúp.' },
          { w: 'offer', ipa: '/ˈɒf.ər/', t: 'verb', ts: 'v.', m: 'đề nghị', ee: 'He offered to help.', ev: 'Anh ấy đã đề nghị giúp đỡ.' },
          { w: 'agree', ipa: '/əˈɡriː/', t: 'verb', ts: 'v.', m: 'đồng ý', ee: 'I agree with you.', ev: 'Tôi đồng ý với bạn.' },
          { w: 'refuse', ipa: '/rɪˈfjuːz/', t: 'verb', ts: 'v.', m: 'từ chối', ee: 'She refused the money.', ev: 'Cô ấy đã từ chối nhận tiền.' },
          { w: 'accept', ipa: '/əkˈsept/', t: 'verb', ts: 'v.', m: 'chấp nhận', ee: 'I accept your offer.', ev: 'Tôi chấp nhận lời đề nghị của bạn.' }
        ]
      },
      {
        order: 50,
        vocab: [
          { w: 'good', ipa: '/ɡʊd/', t: 'adjective', ts: 'adj.', m: 'tốt', ee: 'It is a good book.', ev: 'Đó là một cuốn sách tốt.' },
          { w: 'bad', ipa: '/bæd/', t: 'adjective', ts: 'adj.', m: 'xấu, tồi', ee: 'The weather is bad.', ev: 'Thời tiết thật tồi tệ.' },
          { w: 'beautiful', ipa: '/ˈbjuː.tɪ.fəl/', t: 'adjective', ts: 'adj.', m: 'xinh đẹp', ee: 'She is beautiful.', ev: 'Cô ấy xinh đẹp.' },
          { w: 'ugly', ipa: '/ˈʌɡ.li/', t: 'adjective', ts: 'adj.', m: 'xấu xí', ee: 'The bag is ugly.', ev: 'Chiếc túi trông xấu xí.' },
          { w: 'fast', ipa: '/fɑːst/', t: 'adjective', ts: 'adj.', m: 'nhanh', ee: 'He runs fast.', ev: 'Anh ấy chạy nhanh.' },
          { w: 'slow', ipa: '/sləʊ/', t: 'adjective', ts: 'adj.', m: 'chậm', ee: 'The car is slow.', ev: 'Chiếc ô tô thì chậm.' },
          { w: 'hard', ipa: '/hɑːd/', t: 'adjective', ts: 'adj.', m: 'cứng, khó', ee: 'The bed is hard.', ev: 'Giường thì cứng.' },
          { w: 'soft', ipa: '/sɒft/', t: 'adjective', ts: 'adj.', m: 'mềm mại', ee: 'The pillow is soft.', ev: 'Chiếc gối thì mềm.' },
          { w: 'heavy', ipa: '/ˈhev.i/', t: 'adjective', ts: 'adj.', m: 'nặng', ee: 'The box is heavy.', ev: 'Chiếc hộp rất nặng.' },
          { w: 'light', ipa: '/laɪt/', t: 'adjective', ts: 'adj.', m: 'nhẹ', ee: 'The bag is light.', ev: 'Chiếc túi thì nhẹ.' }
        ]
      }
    ]
  },
  // Cụm 26: Bài 51 & 52
  {
    cum: 26,
    lessons: [
      {
        order: 51,
        vocab: [
          { w: 'more', ipa: '/mɔːr/', t: 'adverb', ts: 'adv.', m: 'nhiều hơn', ee: 'I need more time.', ev: 'Tôi cần nhiều thời gian hơn.' },
          { w: 'less', ipa: '/les/', t: 'adverb', ts: 'adv.', m: 'ít hơn', ee: 'Eat less sugar.', ev: 'Hãy ăn ít đường hơn.' },
          { w: 'most', ipa: '/məʊst/', t: 'adverb', ts: 'adv.', m: 'nhiều nhất', ee: 'He is the most clever.', ev: 'Anh ấy thông minh nhất.' },
          { w: 'least', ipa: '/liːst/', t: 'adverb', ts: 'adv.', m: 'ít nhất', ee: 'It is the least expensive.', ev: 'Nó rẻ nhất (ít đắt nhất).' },
          { w: 'better', ipa: '/ˈbet.ər/', t: 'adjective', ts: 'adj.', m: 'tốt hơn', ee: 'My car is better.', ev: 'Xe của tôi tốt hơn.' },
          { w: 'worse', ipa: '/wɜːs/', t: 'adjective', ts: 'adj.', m: 'tệ hơn', ee: 'The weather is worse.', ev: 'Thời tiết tệ hơn.' },
          { w: 'best', ipa: '/best/', t: 'adjective', ts: 'adj.', m: 'tốt nhất', ee: 'She is the best singer.', ev: 'Cô ấy là ca sĩ giỏi nhất.' },
          { w: 'worst', ipa: '/wɜːst/', t: 'adjective', ts: 'adj.', m: 'tệ nhất', ee: 'It was the worst day.', ev: 'Đó đã là ngày tồi tệ nhất.' },
          { w: 'highly', ipa: '/ˈhaɪ.li/', t: 'adverb', ts: 'adv.', m: 'cao, rất', ee: 'It is highly important.', ev: 'Nó rất quan trọng.' },
          { w: 'deeply', ipa: '/ˈdiːp.li/', t: 'adverb', ts: 'adv.', m: 'sâu sắc', ee: 'I deeply regret it.', ev: 'Tôi vô cùng hối hận.' }
        ]
      },
      {
        order: 52,
        vocab: [
          { w: 'same', ipa: '/seɪm/', t: 'adjective', ts: 'adj.', m: 'giống nhau', ee: 'We have the same book.', ev: 'Chúng tôi có cuốn sách giống nhau.' },
          { w: 'different', ipa: '/ˈdɪf.ər.ənt/', t: 'adjective', ts: 'adj.', m: 'khác biệt', ee: 'They are different.', ev: 'Chúng thì khác nhau.' },
          { w: 'similar', ipa: '/ˈsɪm.ɪ.lər/', t: 'adjective', ts: 'adj.', m: 'tương tự', ee: 'My bag is similar.', ev: 'Túi của tôi tương tự thế.' },
          { w: 'like', ipa: '/laɪk/', t: 'preposition', ts: 'prep.', m: 'như, giống như', ee: 'She looks like her mother.', ev: 'Cô ấy trông giống mẹ.' },
          { w: 'alike', ipa: '/əˈlaɪk/', t: 'adverb', ts: 'adv.', m: 'giống nhau', ee: 'They look alike.', ev: 'Họ trông giống nhau.' },
          { w: 'both', ipa: '/bəʊθ/', t: 'pronoun', ts: 'pron.', m: 'cả hai', ee: 'Both of them are tall.', ev: 'Cả hai đều cao.' },
          { w: 'either', ipa: '/ˈaɪ.ðər/', t: 'conjunction', ts: 'conj.', m: 'hoặc cái này, hoặc cái kia', ee: 'Either you or me.', ev: 'Hoặc bạn hoặc tôi.' },
          { w: 'neither', ipa: '/ˈnaɪ.ðər/', t: 'conjunction', ts: 'conj.', m: 'không ai (trong hai)', ee: 'Neither of them came.', ev: 'Cả hai đều không đến.' },
          { w: 'nor', ipa: '/nɔːr/', t: 'conjunction', ts: 'conj.', m: 'cũng không', ee: 'Neither big nor small.', ev: 'Không to cũng không nhỏ.' },
          { w: 'or', ipa: '/ɔːr/', t: 'conjunction', ts: 'conj.', m: 'hoặc', ee: 'Tea or coffee?', ev: 'Trà hay cà phê?' }
        ]
      }
    ]
  },
  // Cụm 27: Bài 53 & 54
  {
    cum: 27,
    lessons: [
      {
        order: 53,
        vocab: [
          { w: 'environment', ipa: '/ɪnˈvaɪ.rən.mənt/', t: 'noun', ts: 'n.', m: 'môi trường', ee: 'Protect the environment.', ev: 'Hãy bảo vệ môi trường.' },
          { w: 'pollution', ipa: '/pəˈluː.ʃən/', t: 'noun', ts: 'n.', m: 'sự ô nhiễm', ee: 'Pollution is bad.', ev: 'Ô nhiễm là xấu.' },
          { w: 'nature', ipa: '/ˈneɪ.tʃər/', t: 'noun', ts: 'n.', m: 'thiên nhiên', ee: 'I love nature.', ev: 'Tôi yêu thiên nhiên.' },
          { w: 'climate', ipa: '/ˈklaɪ.mət/', t: 'noun', ts: 'n.', m: 'khí hậu', ee: 'The climate is warm.', ev: 'Khí hậu thì ấm áp.' },
          { w: 'weather', ipa: '/ˈweð.ər/', t: 'noun', ts: 'n.', m: 'thời tiết', ee: 'The weather is cold.', ev: 'Thời tiết lạnh.' },
          { w: 'protect', ipa: '/prəˈtekt/', t: 'verb', ts: 'v.', m: 'bảo vệ', ee: 'Protect the trees.', ev: 'Bảo vệ những cái cây.' },
          { w: 'save', ipa: '/seɪv/', t: 'verb', ts: 'v.', m: 'cứu, tiết kiệm', ee: 'Save water.', ev: 'Tiết kiệm nước.' },
          { w: 'destroy', ipa: '/dɪˈstrɔɪ/', t: 'verb', ts: 'v.', m: 'phá hủy', ee: 'Fire destroyed the house.', ev: 'Lửa đã phá hủy ngôi nhà.' },
          { w: 'waste', ipa: '/weɪst/', t: 'verb', ts: 'v.', m: 'lãng phí', ee: 'Don\'t waste time.', ev: 'Đừng lãng phí thời gian.' },
          { w: 'recycle', ipa: '/ˌriːˈsaɪ.kəl/', t: 'verb', ts: 'v.', m: 'tái chế', ee: 'Recycle plastic bottles.', ev: 'Tái chế chai nhựa.' }
        ]
      },
      {
        order: 54,
        vocab: [
          { w: 'population', ipa: '/ˌpɒp.jəˈleɪ.ʃən/', t: 'noun', ts: 'n.', m: 'dân số', ee: 'The population is big.', ev: 'Dân số thì lớn.' },
          { w: 'city', ipa: '/ˈsɪt.i/', t: 'noun', ts: 'n.', m: 'thành phố', ee: 'I live in a city.', ev: 'Tôi sống ở một thành phố.' },
          { w: 'country', ipa: '/ˈkʌn.tri/', t: 'noun', ts: 'n.', m: 'quốc gia, nông thôn', ee: 'My country is beautiful.', ev: 'Đất nước tôi rất đẹp.' },
          { w: 'urban', ipa: '/ˈɜː.bən/', t: 'adjective', ts: 'adj.', m: 'thuộc đô thị', ee: 'Urban areas are busy.', ev: 'Khu vực đô thị rất bận rộn.' },
          { w: 'rural', ipa: '/ˈrʊə.rəl/', t: 'adjective', ts: 'adj.', m: 'thuộc nông thôn', ee: 'Rural life is quiet.', ev: 'Cuộc sống nông thôn yên tĩnh.' },
          { w: 'citizen', ipa: '/ˈsɪt.ɪ.zən/', t: 'noun', ts: 'n.', m: 'công dân', ee: 'I am a citizen.', ev: 'Tôi là một công dân.' },
          { w: 'public', ipa: '/ˈpʌb.lɪk/', t: 'adjective', ts: 'adj.', m: 'công cộng', ee: 'A public park.', ev: 'Một công viên công cộng.' },
          { w: 'private', ipa: '/ˈpraɪ.vət/', t: 'adjective', ts: 'adj.', m: 'riêng tư', ee: 'A private room.', ev: 'Một phòng riêng tư.' },
          { w: 'local', ipa: '/ˈləʊ.kəl/', t: 'adjective', ts: 'adj.', m: 'địa phương', ee: 'Local food is good.', ev: 'Đồ ăn địa phương rất ngon.' },
          { w: 'global', ipa: '/ˈɡləʊ.bəl/', t: 'adjective', ts: 'adj.', m: 'toàn cầu', ee: 'A global problem.', ev: 'Một vấn đề toàn cầu.' }
        ]
      }
    ]
  },
  // Cụm 28: Bài 55
  {
    cum: 28,
    lessons: [
      {
        order: 55,
        vocab: [] // Ôn tập Chương 6, không có từ vựng mới
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

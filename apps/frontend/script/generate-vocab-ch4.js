const fs = require('fs');

const data = [
  // Cụm 15: Bài 29 & 30
  {
    cum: 15,
    lessons: [
      {
        order: 29,
        vocab: [
          { w: 'apple', ipa: '/ˈæp.əl/', t: 'noun', ts: 'n.', m: 'quả táo', ee: 'I eat an apple.', ev: 'Tôi ăn một quả táo.' },
          { w: 'banana', ipa: '/bəˈnɑː.nə/', t: 'noun', ts: 'n.', m: 'quả chuối', ee: 'She likes banana.', ev: 'Cô ấy thích chuối.' },
          { w: 'orange', ipa: '/ˈɒr.ɪndʒ/', t: 'noun', ts: 'n.', m: 'quả cam', ee: 'Buy an orange.', ev: 'Mua một quả cam.' },
          { w: 'milk', ipa: '/mɪlk/', t: 'noun', ts: 'n.', m: 'sữa', ee: 'Drink milk.', ev: 'Uống sữa.' },
          { w: 'water', ipa: '/ˈwɔː.tər/', t: 'noun', ts: 'n.', m: 'nước', ee: 'I need water.', ev: 'Tôi cần nước.' },
          { w: 'bread', ipa: '/bred/', t: 'noun', ts: 'n.', m: 'bánh mì', ee: 'Eat bread.', ev: 'Ăn bánh mì.' },
          { w: 'meat', ipa: '/miːt/', t: 'noun', ts: 'n.', m: 'thịt', ee: 'Cook the meat.', ev: 'Nấu thịt.' },
          { w: 'fish', ipa: '/fɪʃ/', t: 'noun', ts: 'n.', m: 'cá', ee: 'I eat fish.', ev: 'Tôi ăn cá.' },
          { w: 'chicken', ipa: '/ˈtʃɪk.ɪn/', t: 'noun', ts: 'n.', m: 'thịt gà', ee: 'Cook chicken.', ev: 'Nấu thịt gà.' },
          { w: 'egg', ipa: '/eɡ/', t: 'noun', ts: 'n.', m: 'trứng', ee: 'Fry an egg.', ev: 'Rán trứng.' }
        ]
      },
      {
        order: 30,
        vocab: [
          { w: 'sugar', ipa: '/ˈʃʊɡ.ər/', t: 'noun', ts: 'n.', m: 'đường', ee: 'Add sugar.', ev: 'Thêm đường vào.' },
          { w: 'salt', ipa: '/sɒlt/', t: 'noun', ts: 'n.', m: 'muối', ee: 'Add salt.', ev: 'Thêm muối vào.' },
          { w: 'rice', ipa: '/raɪs/', t: 'noun', ts: 'n.', m: 'gạo, cơm', ee: 'Cook rice.', ev: 'Nấu cơm.' },
          { w: 'soup', ipa: '/suːp/', t: 'noun', ts: 'n.', m: 'súp, canh', ee: 'Hot soup.', ev: 'Súp nóng.' },
          { w: 'butter', ipa: '/ˈbʌt.ər/', t: 'noun', ts: 'n.', m: 'bơ', ee: 'Bread and butter.', ev: 'Bánh mì và bơ.' },
          { w: 'cheese', ipa: '/tʃiːz/', t: 'noun', ts: 'n.', m: 'phô mai', ee: 'I like cheese.', ev: 'Tôi thích phô mai.' },
          { w: 'flour', ipa: '/flaʊər/', t: 'noun', ts: 'n.', m: 'bột mì', ee: 'Add flour.', ev: 'Thêm bột mì.' },
          { w: 'tea', ipa: '/tiː/', t: 'noun', ts: 'n.', m: 'trà', ee: 'Drink tea.', ev: 'Uống trà.' },
          { w: 'coffee', ipa: '/ˈkɒf.i/', t: 'noun', ts: 'n.', m: 'cà phê', ee: 'Drink coffee.', ev: 'Uống cà phê.' },
          { w: 'juice', ipa: '/dʒuːs/', t: 'noun', ts: 'n.', m: 'nước ép', ee: 'Drink juice.', ev: 'Uống nước ép.' }
        ]
      }
    ]
  },
  // Cụm 16: Bài 31 & 32
  {
    cum: 16,
    lessons: [
      {
        order: 31,
        vocab: [
          { w: 'cup', ipa: '/kʌp/', t: 'noun', ts: 'n.', m: 'cái tách', ee: 'A cup of tea.', ev: 'Một tách trà.' },
          { w: 'glass', ipa: '/ɡlɑːs/', t: 'noun', ts: 'n.', m: 'cái ly', ee: 'A glass of water.', ev: 'Một ly nước.' },
          { w: 'bowl', ipa: '/bəʊl/', t: 'noun', ts: 'n.', m: 'cái bát', ee: 'A bowl of soup.', ev: 'Một bát súp.' },
          { w: 'plate', ipa: '/pleɪt/', t: 'noun', ts: 'n.', m: 'cái đĩa', ee: 'A plate of rice.', ev: 'Một đĩa cơm.' },
          { w: 'spoon', ipa: '/spuːn/', t: 'noun', ts: 'n.', m: 'cái thìa', ee: 'Take a spoon.', ev: 'Lấy một cái thìa.' },
          { w: 'fork', ipa: '/fɔːk/', t: 'noun', ts: 'n.', m: 'cái nĩa', ee: 'Take a fork.', ev: 'Lấy một cái nĩa.' },
          { w: 'knife', ipa: '/naɪf/', t: 'noun', ts: 'n.', m: 'con dao', ee: 'Take a knife.', ev: 'Lấy một con dao.' },
          { w: 'bottle', ipa: '/ˈbɒt.əl/', t: 'noun', ts: 'n.', m: 'cái chai', ee: 'A bottle of water.', ev: 'Một chai nước.' },
          { w: 'pot', ipa: '/pɒt/', t: 'noun', ts: 'n.', m: 'cái nồi', ee: 'The pot is hot.', ev: 'Cái nồi thì nóng.' },
          { w: 'pan', ipa: '/pæn/', t: 'noun', ts: 'n.', m: 'cái chảo', ee: 'The pan is hot.', ev: 'Cái chảo thì nóng.' }
        ]
      },
      {
        order: 32,
        vocab: [
          { w: 'buy', ipa: '/baɪ/', t: 'verb', ts: 'v.', m: 'mua', ee: 'I buy a book.', ev: 'Tôi mua một cuốn sách.' },
          { w: 'sell', ipa: '/sel/', t: 'verb', ts: 'v.', m: 'bán', ee: 'I sell a car.', ev: 'Tôi bán một chiếc ô tô.' },
          { w: 'pay', ipa: '/peɪ/', t: 'verb', ts: 'v.', m: 'trả tiền', ee: 'I pay the money.', ev: 'Tôi trả tiền.' },
          { w: 'cost', ipa: '/kɒst/', t: 'verb', ts: 'v.', m: 'có giá', ee: 'How much does it cost?', ev: 'Nó có giá bao nhiêu?' },
          { w: 'cheap', ipa: '/tʃiːp/', t: 'adjective', ts: 'adj.', m: 'rẻ', ee: 'It is cheap.', ev: 'Nó rẻ.' },
          { w: 'expensive', ipa: '/ɪkˈspen.sɪv/', t: 'adjective', ts: 'adj.', m: 'đắt', ee: 'It is expensive.', ev: 'Nó đắt.' },
          { w: 'price', ipa: '/praɪs/', t: 'noun', ts: 'n.', m: 'giá cả', ee: 'What is the price?', ev: 'Giá là bao nhiêu?' },
          { w: 'money', ipa: '/ˈmʌn.i/', t: 'noun', ts: 'n.', m: 'tiền', ee: 'I have money.', ev: 'Tôi có tiền.' },
          { w: 'cash', ipa: '/kæʃ/', t: 'noun', ts: 'n.', m: 'tiền mặt', ee: 'Pay in cash.', ev: 'Trả bằng tiền mặt.' },
          { w: 'card', ipa: '/kɑːd/', t: 'noun', ts: 'n.', m: 'thẻ', ee: 'Pay by card.', ev: 'Trả bằng thẻ.' }
        ]
      }
    ]
  },
  // Cụm 17: Bài 33 & 34
  {
    cum: 17,
    lessons: [
      {
        order: 33,
        vocab: [
          { w: 'now', ipa: '/naʊ/', t: 'adverb', ts: 'adv.', m: 'bây giờ', ee: 'I am eating now.', ev: 'Bây giờ tôi đang ăn.' },
          { w: 'right now', ipa: '/raɪt naʊ/', t: 'phrase', ts: 'phr.', m: 'ngay bây giờ', ee: 'I am reading right now.', ev: 'Tôi đang đọc ngay bây giờ.' },
          { w: 'at the moment', ipa: '/ət ðə ˈməʊ.mənt/', t: 'phrase', ts: 'phr.', m: 'lúc này', ee: 'She is sleeping at the moment.', ev: 'Lúc này cô ấy đang ngủ.' },
          { w: 'currently', ipa: '/ˈkʌr.ənt.li/', t: 'adverb', ts: 'adv.', m: 'hiện tại', ee: 'He is currently working.', ev: 'Hiện tại anh ấy đang làm việc.' },
          { w: 'presently', ipa: '/ˈprez.ənt.li/', t: 'adverb', ts: 'adv.', m: 'hiện nay', ee: 'We are presently playing.', ev: 'Hiện nay chúng tôi đang chơi.' },
          { w: 'still', ipa: '/stɪl/', t: 'adverb', ts: 'adv.', m: 'vẫn', ee: 'I am still waiting.', ev: 'Tôi vẫn đang đợi.' },
          { w: 'today', ipa: '/təˈdeɪ/', t: 'adverb', ts: 'adv.', m: 'hôm nay', ee: 'I am cooking today.', ev: 'Hôm nay tôi đang nấu ăn.' },
          { w: 'tonight', ipa: '/təˈnaɪt/', t: 'adverb', ts: 'adv.', m: 'tối nay', ee: 'We are watching TV tonight.', ev: 'Tối nay chúng tôi đang xem TV.' },
          { w: 'this week', ipa: '/ðɪs wiːk/', t: 'phrase', ts: 'phr.', m: 'tuần này', ee: 'I am studying this week.', ev: 'Tuần này tôi đang học.' },
          { w: 'this year', ipa: '/ðɪs jɪər/', t: 'phrase', ts: 'phr.', m: 'năm nay', ee: 'I am working this year.', ev: 'Năm nay tôi đang làm việc.' }
        ]
      },
      {
        order: 34,
        vocab: [
          { w: 'change', ipa: '/tʃeɪndʒ/', t: 'verb', ts: 'v.', m: 'thay đổi', ee: 'The weather is changing.', ev: 'Thời tiết đang thay đổi.' },
          { w: 'grow', ipa: '/ɡrəʊ/', t: 'verb', ts: 'v.', m: 'lớn lên, phát triển', ee: 'The tree is growing.', ev: 'Cây đang lớn lên.' },
          { w: 'increase', ipa: '/ɪnˈkriːs/', t: 'verb', ts: 'v.', m: 'tăng lên', ee: 'The price is increasing.', ev: 'Giá cả đang tăng lên.' },
          { w: 'decrease', ipa: '/dɪˈkriːs/', t: 'verb', ts: 'v.', m: 'giảm xuống', ee: 'The price is decreasing.', ev: 'Giá cả đang giảm xuống.' },
          { w: 'rise', ipa: '/raɪz/', t: 'verb', ts: 'v.', m: 'tăng, mọc', ee: 'Prices are rising.', ev: 'Giá cả đang tăng.' },
          { w: 'fall', ipa: '/fɔːl/', t: 'verb', ts: 'v.', m: 'rơi, giảm', ee: 'Prices are falling.', ev: 'Giá cả đang giảm.' },
          { w: 'improve', ipa: '/ɪmˈpruːv/', t: 'verb', ts: 'v.', m: 'cải thiện', ee: 'My English is improving.', ev: 'Tiếng Anh của tôi đang cải thiện.' },
          { w: 'get', ipa: '/ɡet/', t: 'verb', ts: 'v.', m: 'trở nên', ee: 'It is getting hot.', ev: 'Trời đang trở nên nóng.' },
          { w: 'become', ipa: '/bɪˈkʌm/', t: 'verb', ts: 'v.', m: 'trở thành, trở nên', ee: 'She is becoming angry.', ev: 'Cô ấy đang trở nên tức giận.' },
          { w: 'start', ipa: '/stɑːt/', t: 'verb', ts: 'v.', m: 'bắt đầu', ee: 'It is starting.', ev: 'Nó đang bắt đầu.' }
        ]
      }
    ]
  },
  // Cụm 18: Bài 35 & 36
  {
    cum: 18,
    lessons: [
      {
        order: 35,
        vocab: [
          { w: 'understand', ipa: '/ˌʌn.dəˈstænd/', t: 'verb', ts: 'v.', m: 'hiểu', ee: 'I understand you.', ev: 'Tôi hiểu bạn.' },
          { w: 'know', ipa: '/nəʊ/', t: 'verb', ts: 'v.', m: 'biết', ee: 'I know him.', ev: 'Tôi biết anh ấy.' },
          { w: 'like', ipa: '/laɪk/', t: 'verb', ts: 'v.', m: 'thích', ee: 'I like apples.', ev: 'Tôi thích táo.' },
          { w: 'love', ipa: '/lʌv/', t: 'verb', ts: 'v.', m: 'yêu', ee: 'I love my family.', ev: 'Tôi yêu gia đình tôi.' },
          { w: 'hate', ipa: '/heɪt/', t: 'verb', ts: 'v.', m: 'ghét', ee: 'I hate the cold.', ev: 'Tôi ghét trời lạnh.' },
          { w: 'want', ipa: '/wɒnt/', t: 'verb', ts: 'v.', m: 'muốn', ee: 'I want a book.', ev: 'Tôi muốn một cuốn sách.' },
          { w: 'need', ipa: '/niːd/', t: 'verb', ts: 'v.', m: 'cần', ee: 'I need water.', ev: 'Tôi cần nước.' },
          { w: 'prefer', ipa: '/prɪˈfɜːr/', t: 'verb', ts: 'v.', m: 'thích hơn', ee: 'I prefer tea.', ev: 'Tôi thích trà hơn.' },
          { w: 'believe', ipa: '/bɪˈliːv/', t: 'verb', ts: 'v.', m: 'tin tưởng', ee: 'I believe you.', ev: 'Tôi tin bạn.' },
          { w: 'remember', ipa: '/rɪˈmem.bər/', t: 'verb', ts: 'v.', m: 'nhớ', ee: 'I remember her.', ev: 'Tôi nhớ cô ấy.' }
        ]
      },
      {
        order: 36,
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

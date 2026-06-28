const fs = require('fs');

const data = [
  // Cụm 2: Bài 3 & 4
  {
    cum: 2,
    lessons: [
      {
        order: 3,
        vocab: [
          { w: 'tall', ipa: '/tɔːl/', t: 'adjective', ts: 'adj.', m: 'cao', ee: 'My father is tall.', ev: 'Bố tôi cao.' },
          { w: 'short', ipa: '/ʃɔːt/', t: 'adjective', ts: 'adj.', m: 'thấp, ngắn', ee: 'My mother is short.', ev: 'Mẹ tôi thấp.' },
          { w: 'young', ipa: '/jʌŋ/', t: 'adjective', ts: 'adj.', m: 'trẻ', ee: 'My sister is young.', ev: 'Chị tôi trẻ.' },
          { w: 'old', ipa: '/əʊld/', t: 'adjective', ts: 'adj.', m: 'già, cũ', ee: 'My grandfather is old.', ev: 'Ông tôi đã già.' },
          { w: 'fat', ipa: '/fæt/', t: 'adjective', ts: 'adj.', m: 'béo', ee: 'The cat is fat.', ev: 'Con mèo béo.' },
          { w: 'thin', ipa: '/θɪn/', t: 'adjective', ts: 'adj.', m: 'gầy', ee: 'My brother is thin.', ev: 'Anh trai tôi gầy.' },
          { w: 'long', ipa: '/lɒŋ/', t: 'adjective', ts: 'adj.', m: 'dài', ee: 'Her hair is long.', ev: 'Tóc cô ấy dài.' },
          { w: 'curly', ipa: '/ˈkɜː.li/', t: 'adjective', ts: 'adj.', m: 'xoăn', ee: 'My hair is curly.', ev: 'Tóc tôi xoăn.' },
          { w: 'blonde', ipa: '/blɒnd/', t: 'adjective', ts: 'adj.', m: 'vàng hoe', ee: 'She is blonde.', ev: 'Cô ấy có mái tóc vàng hoe.' },
          { w: 'friendly', ipa: '/ˈfrend.li/', t: 'adjective', ts: 'adj.', m: 'thân thiện', ee: 'My family is friendly.', ev: 'Gia đình tôi thân thiện.' }
        ]
      },
      {
        order: 4,
        vocab: [
          { w: 'happy', ipa: '/ˈhæp.i/', t: 'adjective', ts: 'adj.', m: 'vui vẻ', ee: 'I am happy.', ev: 'Tôi vui vẻ.' },
          { w: 'sad', ipa: '/sæd/', t: 'adjective', ts: 'adj.', m: 'buồn', ee: 'He is sad.', ev: 'Anh ấy buồn.' },
          { w: 'nervous', ipa: '/ˈnɜː.vəs/', t: 'adjective', ts: 'adj.', m: 'lo lắng', ee: 'She is nervous.', ev: 'Cô ấy lo lắng.' },
          { w: 'shy', ipa: '/ʃaɪ/', t: 'adjective', ts: 'adj.', m: 'nhút nhát', ee: 'My son is shy.', ev: 'Con trai tôi nhút nhát.' },
          { w: 'kind', ipa: '/kaɪnd/', t: 'adjective', ts: 'adj.', m: 'tốt bụng', ee: 'My mother is kind.', ev: 'Mẹ tôi tốt bụng.' },
          { w: 'clever', ipa: '/ˈklev.ər/', t: 'adjective', ts: 'adj.', m: 'thông minh', ee: 'My brother is clever.', ev: 'Anh tôi thông minh.' },
          { w: 'lazy', ipa: '/ˈleɪ.zi/', t: 'adjective', ts: 'adj.', m: 'lười biếng', ee: 'He is lazy.', ev: 'Anh ấy lười biếng.' },
          { w: 'busy', ipa: '/ˈbɪz.i/', t: 'adjective', ts: 'adj.', m: 'bận rộn', ee: 'My father is busy.', ev: 'Bố tôi bận rộn.' },
          { w: 'angry', ipa: '/ˈæŋ.ɡri/', t: 'adjective', ts: 'adj.', m: 'tức giận', ee: 'She is angry.', ev: 'Cô ấy đang tức giận.' },
          { w: 'calm', ipa: '/kɑːm/', t: 'adjective', ts: 'adj.', m: 'bình tĩnh', ee: 'I am calm.', ev: 'Tôi bình tĩnh.' }
        ]
      }
    ]
  },
  // Cụm 3: Bài 5 & 6
  {
    cum: 3,
    lessons: [
      {
        order: 5,
        vocab: [
          { w: 'house', ipa: '/haʊs/', t: 'noun', ts: 'n.', m: 'ngôi nhà', ee: 'There is a house.', ev: 'Có một ngôi nhà.' },
          { w: 'apartment', ipa: '/əˈpɑːt.mənt/', t: 'noun', ts: 'n.', m: 'căn hộ', ee: 'There is an apartment.', ev: 'Có một căn hộ.' },
          { w: 'bedroom', ipa: '/ˈbed.ruːm/', t: 'noun', ts: 'n.', m: 'phòng ngủ', ee: 'There is a bedroom.', ev: 'Có một phòng ngủ.' },
          { w: 'kitchen', ipa: '/ˈkɪtʃ.ən/', t: 'noun', ts: 'n.', m: 'nhà bếp', ee: 'There is a kitchen.', ev: 'Có một nhà bếp.' },
          { w: 'living room', ipa: '/ˈlɪv.ɪŋ ˌruːm/', t: 'noun', ts: 'n.', m: 'phòng khách', ee: 'There is a living room.', ev: 'Có một phòng khách.' },
          { w: 'bathroom', ipa: '/ˈbɑːθ.ruːm/', t: 'noun', ts: 'n.', m: 'phòng tắm', ee: 'There is a bathroom.', ev: 'Có một phòng tắm.' },
          { w: 'garden', ipa: '/ˈɡɑː.dən/', t: 'noun', ts: 'n.', m: 'khu vườn', ee: 'There is a garden.', ev: 'Có một khu vườn.' },
          { w: 'balcony', ipa: '/ˈbæl.kə.ni/', t: 'noun', ts: 'n.', m: 'ban công', ee: 'There is a balcony.', ev: 'Có một ban công.' },
          { w: 'floor', ipa: '/flɔːr/', t: 'noun', ts: 'n.', m: 'sàn nhà, tầng', ee: 'There is a floor.', ev: 'Có một tầng.' },
          { w: 'roof', ipa: '/ruːf/', t: 'noun', ts: 'n.', m: 'mái nhà', ee: 'There is a roof.', ev: 'Có một mái nhà.' }
        ]
      },
      {
        order: 6,
        vocab: [
          { w: 'table', ipa: '/ˈteɪ.bəl/', t: 'noun', ts: 'n.', m: 'cái bàn', ee: 'There is a table.', ev: 'Có một cái bàn.' },
          { w: 'chair', ipa: '/tʃeər/', t: 'noun', ts: 'n.', m: 'cái ghế', ee: 'There is not a chair.', ev: 'Không có cái ghế nào.' },
          { w: 'bed', ipa: '/bed/', t: 'noun', ts: 'n.', m: 'giường', ee: 'Are there beds?', ev: 'Có giường không?' },
          { w: 'sofa', ipa: '/ˈsəʊ.fə/', t: 'noun', ts: 'n.', m: 'ghế sofa', ee: 'There is a sofa.', ev: 'Có một chiếc sofa.' },
          { w: 'lamp', ipa: '/læmp/', t: 'noun', ts: 'n.', m: 'cái đèn', ee: 'There is a lamp.', ev: 'Có một cái đèn.' },
          { w: 'mirror', ipa: '/ˈmɪr.ər/', t: 'noun', ts: 'n.', m: 'cái gương', ee: 'There is a mirror.', ev: 'Có một cái gương.' },
          { w: 'shelf', ipa: '/ʃelf/', t: 'noun', ts: 'n.', m: 'cái giá, kệ', ee: 'There is a shelf.', ev: 'Có một cái kệ.' },
          { w: 'fridge', ipa: '/frɪdʒ/', t: 'noun', ts: 'n.', m: 'tủ lạnh', ee: 'There is not a fridge.', ev: 'Không có tủ lạnh.' },
          { w: 'window', ipa: '/ˈwɪn.dəʊ/', t: 'noun', ts: 'n.', m: 'cửa sổ', ee: 'There is a window.', ev: 'Có một cửa sổ.' },
          { w: 'door', ipa: '/dɔːr/', t: 'noun', ts: 'n.', m: 'cửa ra vào', ee: 'There is a door.', ev: 'Có một cửa ra vào.' }
        ]
      }
    ]
  },
  // Cụm 4: Bài 7 & 8
  {
    cum: 4,
    lessons: [
      {
        order: 7,
        vocab: [
          { w: 'supermarket', ipa: '/ˈsuː.pəˌmɑː.kɪt/', t: 'noun', ts: 'n.', m: 'siêu thị', ee: 'The supermarket is big.', ev: 'Siêu thị thì lớn.' },
          { w: 'hospital', ipa: '/ˈhɒs.pɪ.təl/', t: 'noun', ts: 'n.', m: 'bệnh viện', ee: 'The hospital is clean.', ev: 'Bệnh viện thì sạch sẽ.' },
          { w: 'school', ipa: '/skuːl/', t: 'noun', ts: 'n.', m: 'trường học', ee: 'A school is near.', ev: 'Một trường học ở gần đây.' },
          { w: 'park', ipa: '/pɑːk/', t: 'noun', ts: 'n.', m: 'công viên', ee: 'The park is beautiful.', ev: 'Công viên thật đẹp.' },
          { w: 'bank', ipa: '/bæŋk/', t: 'noun', ts: 'n.', m: 'ngân hàng', ee: 'A bank is open.', ev: 'Một ngân hàng đang mở cửa.' },
          { w: 'library', ipa: '/ˈlaɪ.brər.i/', t: 'noun', ts: 'n.', m: 'thư viện', ee: 'The library is quiet.', ev: 'Thư viện thì yên tĩnh.' },
          { w: 'restaurant', ipa: '/ˈres.trɒnt/', t: 'noun', ts: 'n.', m: 'nhà hàng', ee: 'The restaurant is nice.', ev: 'Nhà hàng thì đẹp.' },
          { w: 'church', ipa: '/tʃɜːtʃ/', t: 'noun', ts: 'n.', m: 'nhà thờ', ee: 'The church is old.', ev: 'Nhà thờ thì cổ.' },
          { w: 'station', ipa: '/ˈsteɪ.ʃən/', t: 'noun', ts: 'n.', m: 'nhà ga, trạm', ee: 'The station is busy.', ev: 'Nhà ga thì đông đúc.' }
        ]
      },
      {
        order: 8,
        vocab: [
          { w: 'post office', ipa: '/ˈpəʊst ˌɒf.ɪs/', t: 'noun', ts: 'n.', m: 'bưu điện', ee: 'The post office is next to the bank.', ev: 'Bưu điện nằm cạnh ngân hàng.' },
          { w: 'pharmacy', ipa: '/ˈfɑː.mə.si/', t: 'noun', ts: 'n.', m: 'hiệu thuốc', ee: 'The pharmacy is opposite the hospital.', ev: 'Hiệu thuốc đối diện bệnh viện.' },
          { w: 'gym', ipa: '/dʒɪm/', t: 'noun', ts: 'n.', m: 'phòng tập thể hình', ee: 'The gym is in the park.', ev: 'Phòng gym ở trong công viên.' },
          { w: 'cinema', ipa: '/ˈsɪn.ə.mə/', t: 'noun', ts: 'n.', m: 'rạp chiếu phim', ee: 'The cinema is next to the restaurant.', ev: 'Rạp chiếu phim nằm cạnh nhà hàng.' },
          { w: 'museum', ipa: '/mjuːˈziː.əm/', t: 'noun', ts: 'n.', m: 'bảo tàng', ee: 'The museum is old.', ev: 'Bảo tàng thì cổ kính.' },
          { w: 'market', ipa: '/ˈmɑː.kɪt/', t: 'noun', ts: 'n.', m: 'chợ', ee: 'The market is opposite the school.', ev: 'Chợ đối diện trường học.' },
          { w: 'café', ipa: '/ˈkæf.eɪ/', t: 'noun', ts: 'n.', m: 'quán cà phê', ee: 'The café is between the bank and the pharmacy.', ev: 'Quán cà phê nằm giữa ngân hàng và hiệu thuốc.' },
          { w: 'hotel', ipa: '/həʊˈtel/', t: 'noun', ts: 'n.', m: 'khách sạn', ee: 'The hotel is next to the station.', ev: 'Khách sạn ở cạnh nhà ga.' },
          { w: 'bridge', ipa: '/brɪdʒ/', t: 'noun', ts: 'n.', m: 'cây cầu', ee: 'The bridge is long.', ev: 'Cây cầu thì dài.' },
          { w: 'road', ipa: '/rəʊd/', t: 'noun', ts: 'n.', m: 'con đường', ee: 'The road is wide.', ev: 'Con đường thì rộng.' }
        ]
      }
    ]
  },
  // Cụm 5: Bài 9 & 10
  {
    cum: 5,
    lessons: [
      {
        order: 9,
        vocab: [
          { w: 'left', ipa: '/left/', t: 'noun', ts: 'n.', m: 'bên trái', ee: 'The hospital is on the left.', ev: 'Bệnh viện ở bên trái.' },
          { w: 'right', ipa: '/raɪt/', t: 'noun', ts: 'n.', m: 'bên phải', ee: 'The park is on the right.', ev: 'Công viên ở bên phải.' },
          { w: 'straight', ipa: '/streɪt/', t: 'adverb', ts: 'adv.', m: 'thẳng', ee: 'Go straight.', ev: 'Đi thẳng.' },
          { w: 'corner', ipa: '/ˈkɔː.nər/', t: 'noun', ts: 'n.', m: 'góc đường', ee: 'The café is at the corner.', ev: 'Quán cà phê ở góc đường.' },
          { w: 'turn', ipa: '/tɜːn/', t: 'verb', ts: 'v.', m: 'rẽ', ee: 'Turn left.', ev: 'Rẽ trái.' },
          { w: 'pass', ipa: '/pɑːs/', t: 'verb', ts: 'v.', m: 'đi qua', ee: 'Pass the bank.', ev: 'Đi ngang qua ngân hàng.' },
          { w: 'cross', ipa: '/krɒs/', t: 'verb', ts: 'v.', m: 'băng qua', ee: 'Cross the road.', ev: 'Băng qua đường.' },
          { w: 'near', ipa: '/nɪər/', t: 'preposition', ts: 'prep.', m: 'gần', ee: 'The station is near.', ev: 'Nhà ga ở gần.' },
          { w: 'far', ipa: '/fɑːr/', t: 'adverb', ts: 'adv.', m: 'xa', ee: 'The hospital is far.', ev: 'Bệnh viện ở xa.' },
          { w: 'behind', ipa: '/bɪˈhaɪnd/', t: 'preposition', ts: 'prep.', m: 'đằng sau', ee: 'The market is behind the school.', ev: 'Chợ ở đằng sau trường học.' }
        ]
      },
      {
        order: 10,
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

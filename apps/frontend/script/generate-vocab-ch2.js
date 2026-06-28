const fs = require('fs');

const data = [
  // Cụm 6: Bài 11 & 12
  {
    cum: 6,
    lessons: [
      {
        order: 11,
        vocab: [
          { w: 'swim', ipa: '/swɪm/', t: 'verb', ts: 'v.', m: 'bơi', ee: 'I swim in the river.', ev: 'Tôi bơi dưới sông.' },
          { w: 'drive', ipa: '/draɪv/', t: 'verb', ts: 'v.', m: 'lái xe', ee: 'My father drives a car.', ev: 'Bố tôi lái xe ô tô.' },
          { w: 'cook', ipa: '/kʊk/', t: 'verb', ts: 'v.', m: 'nấu ăn', ee: 'My mother cooks well.', ev: 'Mẹ tôi nấu ăn ngon.' },
          { w: 'speak', ipa: '/spiːk/', t: 'verb', ts: 'v.', m: 'nói', ee: 'I speak English.', ev: 'Tôi nói tiếng Anh.' },
          { w: 'read', ipa: '/riːd/', t: 'verb', ts: 'v.', m: 'đọc', ee: 'She reads a book.', ev: 'Cô ấy đọc một cuốn sách.' },
          { w: 'write', ipa: '/raɪt/', t: 'verb', ts: 'v.', m: 'viết', ee: 'He writes a letter.', ev: 'Anh ấy viết một bức thư.' },
          { w: 'sing', ipa: '/sɪŋ/', t: 'verb', ts: 'v.', m: 'hát', ee: 'They sing a song.', ev: 'Họ hát một bài hát.' },
          { w: 'play', ipa: '/pleɪ/', t: 'verb', ts: 'v.', m: 'chơi', ee: 'We play in the park.', ev: 'Chúng tôi chơi trong công viên.' },
          { w: 'draw', ipa: '/drɔː/', t: 'verb', ts: 'v.', m: 'vẽ', ee: 'I draw a picture.', ev: 'Tôi vẽ một bức tranh.' },
          { w: 'dance', ipa: '/dɑːns/', t: 'verb', ts: 'v.', m: 'nhảy múa', ee: 'She dances nicely.', ev: 'Cô ấy nhảy đẹp.' }
        ]
      },
      {
        order: 12,
        vocab: [
          { w: 'help', ipa: '/help/', t: 'verb', ts: 'v.', m: 'giúp đỡ', ee: 'Please help me.', ev: 'Làm ơn giúp tôi.' },
          { w: 'open', ipa: '/ˈəʊ.pən/', t: 'verb', ts: 'v.', m: 'mở', ee: 'Open the door.', ev: 'Mở cửa ra.' },
          { w: 'close', ipa: '/kləʊz/', t: 'verb', ts: 'v.', m: 'đóng', ee: 'Close the window.', ev: 'Đóng cửa sổ lại.' },
          { w: 'bring', ipa: '/brɪŋ/', t: 'verb', ts: 'v.', m: 'mang đến', ee: 'Bring me the book.', ev: 'Mang sách cho tôi.' },
          { w: 'take', ipa: '/teɪk/', t: 'verb', ts: 'v.', m: 'lấy, mang đi', ee: 'Take the keys.', ev: 'Lấy chìa khóa đi.' },
          { w: 'wait', ipa: '/weɪt/', t: 'verb', ts: 'v.', m: 'chờ đợi', ee: 'Wait for me.', ev: 'Chờ tôi với.' },
          { w: 'stop', ipa: '/stɒp/', t: 'verb', ts: 'v.', m: 'dừng lại', ee: 'Stop here.', ev: 'Dừng ở đây.' },
          { w: 'go', ipa: '/ɡəʊ/', t: 'verb', ts: 'v.', m: 'đi', ee: 'Go straight.', ev: 'Đi thẳng.' },
          { w: 'come', ipa: '/kʌm/', t: 'verb', ts: 'v.', m: 'đến', ee: 'Come here.', ev: 'Đến đây.' },
          { w: 'sit', ipa: '/sɪt/', t: 'verb', ts: 'v.', m: 'ngồi', ee: 'Sit on the chair.', ev: 'Ngồi lên ghế.' }
        ]
      }
    ]
  },
  // Cụm 7: Bài 13 & 14
  {
    cum: 7,
    lessons: [
      {
        order: 13,
        vocab: [
          { w: 'add', ipa: '/æd/', t: 'verb', ts: 'v.', m: 'thêm vào', ee: 'Add water to the bowl.', ev: 'Thêm nước vào bát.' },
          { w: 'mix', ipa: '/mɪks/', t: 'verb', ts: 'v.', m: 'trộn', ee: 'Mix them together.', ev: 'Trộn chúng với nhau.' },
          { w: 'turn', ipa: '/tɜːn/', t: 'verb', ts: 'v.', m: 'xoay, rẽ', ee: 'Turn left.', ev: 'Rẽ trái.' },
          { w: 'press', ipa: '/pres/', t: 'verb', ts: 'v.', m: 'nhấn', ee: 'Press the button.', ev: 'Nhấn nút.' },
          { w: 'click', ipa: '/klɪk/', t: 'verb', ts: 'v.', m: 'nhấn chuột', ee: 'Click here.', ev: 'Nhấn chuột vào đây.' },
          { w: 'follow', ipa: '/ˈfɒl.əʊ/', t: 'verb', ts: 'v.', m: 'đi theo, theo dõi', ee: 'Follow me.', ev: 'Đi theo tôi.' },
          { w: 'check', ipa: '/tʃek/', t: 'verb', ts: 'v.', m: 'kiểm tra', ee: 'Check your email.', ev: 'Kiểm tra email của bạn.' },
          { w: 'fill', ipa: '/fɪl/', t: 'verb', ts: 'v.', m: 'lấp đầy, điền', ee: 'Fill the form.', ev: 'Điền vào biểu mẫu.' },
          { w: 'sign', ipa: '/saɪn/', t: 'verb', ts: 'v.', m: 'ký tên', ee: 'Sign your name here.', ev: 'Ký tên của bạn ở đây.' },
          { w: 'enter', ipa: '/ˈen.tər/', t: 'verb', ts: 'v.', m: 'đi vào, nhập', ee: 'Enter the password.', ev: 'Nhập mật khẩu.' }
        ]
      },
      {
        order: 14,
        vocab: [
          { w: 'hot', ipa: '/hɒt/', t: 'adjective', ts: 'adj.', m: 'nóng', ee: 'The water is hot.', ev: 'Nước nóng.' },
          { w: 'cold', ipa: '/kəʊld/', t: 'adjective', ts: 'adj.', m: 'lạnh', ee: 'It is cold.', ev: 'Trời lạnh.' },
          { w: 'warm', ipa: '/wɔːm/', t: 'adjective', ts: 'adj.', m: 'ấm áp', ee: 'The room is warm.', ev: 'Căn phòng ấm áp.' },
          { w: 'wet', ipa: '/wet/', t: 'adjective', ts: 'adj.', m: 'ướt', ee: 'My hair is wet.', ev: 'Tóc tôi bị ướt.' },
          { w: 'dry', ipa: '/draɪ/', t: 'adjective', ts: 'adj.', m: 'khô', ee: 'The clothes are dry.', ev: 'Quần áo đã khô.' },
          { w: 'loud', ipa: '/laʊd/', t: 'adjective', ts: 'adj.', m: 'ồn ào, to tiếng', ee: 'The music is loud.', ev: 'Nhạc to quá.' },
          { w: 'quiet', ipa: '/ˈkwaɪ.ət/', t: 'adjective', ts: 'adj.', m: 'yên tĩnh', ee: 'Please be quiet.', ev: 'Làm ơn trật tự.' },
          { w: 'clean', ipa: '/kliːn/', t: 'adjective', ts: 'adj.', m: 'sạch sẽ', ee: 'The house is clean.', ev: 'Ngôi nhà sạch sẽ.' },
          { w: 'dirty', ipa: '/ˈdɜː.ti/', t: 'adjective', ts: 'adj.', m: 'bẩn', ee: 'My hands are dirty.', ev: 'Tay tôi bẩn.' },
          { w: 'comfortable', ipa: '/ˈkʌm.fə.tə.bəl/', t: 'adjective', ts: 'adj.', m: 'thoải mái', ee: 'The bed is comfortable.', ev: 'Giường rất thoải mái.' }
        ]
      }
    ]
  },
  // Cụm 8: Bài 15 & 16
  {
    cum: 8,
    lessons: [
      {
        order: 15,
        vocab: [
          { w: 'red', ipa: '/red/', t: 'adjective', ts: 'adj.', m: 'màu đỏ', ee: 'The apple is red.', ev: 'Quả táo màu đỏ.' },
          { w: 'blue', ipa: '/bluː/', t: 'adjective', ts: 'adj.', m: 'màu xanh dương', ee: 'The sky is blue.', ev: 'Bầu trời màu xanh dương.' },
          { w: 'green', ipa: '/ɡriːn/', t: 'adjective', ts: 'adj.', m: 'màu xanh lá', ee: 'The grass is green.', ev: 'Cỏ màu xanh lá.' },
          { w: 'white', ipa: '/waɪt/', t: 'adjective', ts: 'adj.', m: 'màu trắng', ee: 'The wall is white.', ev: 'Bức tường màu trắng.' },
          { w: 'black', ipa: '/blæk/', t: 'adjective', ts: 'adj.', m: 'màu đen', ee: 'My bag is black.', ev: 'Cái túi của tôi màu đen.' },
          { w: 'small', ipa: '/smɔːl/', t: 'adjective', ts: 'adj.', m: 'nhỏ', ee: 'The box is small.', ev: 'Cái hộp thì nhỏ.' },
          { w: 'big', ipa: '/bɪɡ/', t: 'adjective', ts: 'adj.', m: 'to lớn', ee: 'My house is big.', ev: 'Nhà của tôi thì lớn.' },
          { w: 'large', ipa: '/lɑːdʒ/', t: 'adjective', ts: 'adj.', m: 'rộng lớn', ee: 'It is a large room.', ev: 'Đó là một căn phòng rộng lớn.' },
          { w: 'tiny', ipa: '/ˈtaɪ.ni/', t: 'adjective', ts: 'adj.', m: 'bé xíu', ee: 'The insect is tiny.', ev: 'Côn trùng thì bé xíu.' },
          { w: 'wide', ipa: '/waɪd/', t: 'adjective', ts: 'adj.', m: 'rộng rãi', ee: 'The road is wide.', ev: 'Con đường thì rộng rãi.' }
        ]
      },
      {
        order: 16,
        vocab: [
          { w: 'bag', ipa: '/bæɡ/', t: 'noun', ts: 'n.', m: 'cái túi', ee: 'I have a bag.', ev: 'Tôi có một cái túi.' },
          { w: 'key', ipa: '/kiː/', t: 'noun', ts: 'n.', m: 'chìa khóa', ee: 'Where is the key?', ev: 'Chìa khóa ở đâu?' },
          { w: 'phone', ipa: '/fəʊn/', t: 'noun', ts: 'n.', m: 'điện thoại', ee: 'My phone is new.', ev: 'Điện thoại của tôi mới.' },
          { w: 'book', ipa: '/bʊk/', t: 'noun', ts: 'n.', m: 'cuốn sách', ee: 'Read this book.', ev: 'Đọc cuốn sách này.' },
          { w: 'pen', ipa: '/pen/', t: 'noun', ts: 'n.', m: 'cái bút', ee: 'Give me a pen.', ev: 'Đưa tôi một cái bút.' },
          { w: 'wallet', ipa: '/ˈwɒl.ɪt/', t: 'noun', ts: 'n.', m: 'cái ví', ee: 'My wallet is empty.', ev: 'Cái ví của tôi trống rỗng.' },
          { w: 'glasses', ipa: '/ˈɡlɑː.sɪz/', t: 'noun', ts: 'n.', m: 'kính mắt', ee: 'She wears glasses.', ev: 'Cô ấy đeo kính mắt.' },
          { w: 'umbrella', ipa: '/ʌmˈbrel.ə/', t: 'noun', ts: 'n.', m: 'cái ô', ee: 'Take an umbrella.', ev: 'Mang theo một cái ô.' },
          { w: 'ticket', ipa: '/ˈtɪk.ɪt/', t: 'noun', ts: 'n.', m: 'vé', ee: 'Buy a ticket.', ev: 'Mua một tấm vé.' },
          { w: 'card', ipa: '/kɑːd/', t: 'noun', ts: 'n.', m: 'thẻ', ee: 'Use your card.', ev: 'Sử dụng thẻ của bạn.' }
        ]
      }
    ]
  },
  // Cụm 9: Bài 17 & 18
  {
    cum: 9,
    lessons: [
      {
        order: 17,
        vocab: [
          { w: 'hundred', ipa: '/ˈhʌn.drəd/', t: 'number', ts: 'num.', m: 'trăm', ee: 'One hundred people.', ev: 'Một trăm người.' },
          { w: 'first', ipa: '/fɜːst/', t: 'adjective', ts: 'adj.', m: 'đầu tiên, thứ nhất', ee: 'The first day.', ev: 'Ngày đầu tiên.' },
          { w: 'tenth', ipa: '/tenθ/', t: 'adjective', ts: 'adj.', m: 'thứ mười', ee: 'The tenth floor.', ev: 'Tầng thứ mười.' },
          { w: 'date', ipa: '/deɪt/', t: 'noun', ts: 'n.', m: 'ngày tháng', ee: 'What is the date?', ev: 'Hôm nay là ngày bao nhiêu?' },
          { w: 'month', ipa: '/mʌnθ/', t: 'noun', ts: 'n.', m: 'tháng', ee: 'Next month.', ev: 'Tháng tới.' },
          { w: 'year', ipa: '/jɪər/', t: 'noun', ts: 'n.', m: 'năm', ee: 'Last year.', ev: 'Năm ngoái.' },
          { w: 'century', ipa: '/ˈsen.tʃər.i/', t: 'noun', ts: 'n.', m: 'thế kỷ', ee: 'The 21st century.', ev: 'Thế kỷ 21.' },
          { w: 'season', ipa: '/ˈsiː.zən/', t: 'noun', ts: 'n.', m: 'mùa', ee: 'My favorite season.', ev: 'Mùa yêu thích của tôi.' }
        ]
      },
      {
        order: 18,
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

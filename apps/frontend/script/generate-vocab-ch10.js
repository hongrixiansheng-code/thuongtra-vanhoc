const fs = require('fs');

const data = [
  // Cụm 44: Bài 83 & 84
  {
    cum: 44,
    lessons: [
      {
        order: 83,
        vocab: [
          { w: 'allow', ipa: '/əˈlaʊ/', t: 'verb', ts: 'v.', m: 'cho phép', ee: 'They allow it.', ev: 'Họ cho phép điều đó.' },
          { w: 'permit', ipa: '/pəˈmɪt/', t: 'verb', ts: 'v.', m: 'cho phép', ee: 'They permitted him to leave.', ev: 'Họ đã cho phép anh ấy rời đi.' },
          { w: 'let', ipa: '/let/', t: 'verb', ts: 'v.', m: 'để cho, cho phép', ee: 'Let me go.', ev: 'Hãy để tôi đi.' },
          { w: 'forbid', ipa: '/fəˈbɪd/', t: 'verb', ts: 'v.', m: 'cấm', ee: 'They forbid it.', ev: 'Họ cấm điều đó.' },
          { w: 'ban', ipa: '/bæn/', t: 'verb', ts: 'v.', m: 'cấm', ee: 'They banned the book.', ev: 'Họ đã cấm cuốn sách đó.' },
          { w: 'illegal', ipa: '/ɪˈliː.ɡəl/', t: 'adjective', ts: 'adj.', m: 'bất hợp pháp', ee: 'It is illegal.', ev: 'Điều đó là bất hợp pháp.' },
          { w: 'legal', ipa: '/ˈliː.ɡəl/', t: 'adjective', ts: 'adj.', m: 'hợp pháp', ee: 'It is a legal action.', ev: 'Đó là một hành động hợp pháp.' },
          { w: 'crime', ipa: '/kraɪm/', t: 'noun', ts: 'n.', m: 'tội phạm', ee: 'A serious crime.', ev: 'Một tội ác nghiêm trọng.' },
          { w: 'police', ipa: '/pəˈliːs/', t: 'noun', ts: 'n.', m: 'cảnh sát', ee: 'Call the police.', ev: 'Gọi cảnh sát đi.' },
          { w: 'judge', ipa: '/dʒʌdʒ/', t: 'noun', ts: 'n.', m: 'thẩm phán, quan tòa', ee: 'The judge was strict.', ev: 'Vị thẩm phán rất nghiêm khắc.' }
        ]
      },
      {
        order: 84,
        vocab: [
          { w: 'amount', ipa: '/əˈmaʊnt/', t: 'noun', ts: 'n.', m: 'số lượng', ee: 'A large amount of money.', ev: 'Một số lượng lớn tiền.' },
          { w: 'number', ipa: '/ˈnʌm.bər/', t: 'noun', ts: 'n.', m: 'con số, số', ee: 'A large number of people.', ev: 'Một số lượng lớn người.' },
          { w: 'quantity', ipa: '/ˈkwɒn.tə.ti/', t: 'noun', ts: 'n.', m: 'số lượng', ee: 'A big quantity.', ev: 'Một số lượng lớn.' },
          { w: 'measure', ipa: '/ˈmeʒ.ər/', t: 'verb', ts: 'v.', m: 'đo lường', ee: 'Measure the water.', ev: 'Đo lường lượng nước.' },
          { w: 'size', ipa: '/saɪz/', t: 'noun', ts: 'n.', m: 'kích thước', ee: 'What is the size?', ev: 'Kích thước là bao nhiêu?' },
          { w: 'level', ipa: '/ˈlev.əl/', t: 'noun', ts: 'n.', m: 'mức độ', ee: 'A high level.', ev: 'Một mức độ cao.' },
          { w: 'degree', ipa: '/dɪˈɡriː/', t: 'noun', ts: 'n.', m: 'trình độ, bằng cấp', ee: 'A high degree.', ev: 'Một trình độ cao.' },
          { w: 'scale', ipa: '/skeɪl/', t: 'noun', ts: 'n.', m: 'quy mô', ee: 'A large scale.', ev: 'Một quy mô lớn.' },
          { w: 'rate', ipa: '/reɪt/', t: 'noun', ts: 'n.', m: 'tỷ lệ', ee: 'A high rate.', ev: 'Một tỷ lệ cao.' },
          { w: 'share', ipa: '/ʃeər/', t: 'noun', ts: 'n.', m: 'cổ phần, phần', ee: 'My share of the cake.', ev: 'Phần bánh của tôi.' }
        ]
      }
    ]
  },
  // Cụm 45: Bài 85 & 86
  {
    cum: 45,
    lessons: [
      {
        order: 85,
        vocab: [
          { w: 'argue', ipa: '/ˈɑːɡ.juː/', t: 'verb', ts: 'v.', m: 'tranh luận', ee: 'They argue a lot.', ev: 'Họ tranh luận rất nhiều.' },
          { w: 'debate', ipa: '/dɪˈbeɪt/', t: 'verb', ts: 'v.', m: 'tranh luận, thảo luận', ee: 'We debated the issue.', ev: 'Chúng tôi đã thảo luận về vấn đề đó.' },
          { w: 'discuss', ipa: '/dɪˈskʌs/', t: 'verb', ts: 'v.', m: 'thảo luận', ee: 'Let us discuss it.', ev: 'Hãy cùng thảo luận điều đó.' },
          { w: 'point', ipa: '/pɔɪnt/', t: 'noun', ts: 'n.', m: 'điểm, ý', ee: 'That is a good point.', ev: 'Đó là một ý hay.' },
          { w: 'view', ipa: '/vjuː/', t: 'noun', ts: 'n.', m: 'quan điểm', ee: 'In my view...', ev: 'Theo quan điểm của tôi...' },
          { w: 'opinion', ipa: '/əˈpɪn.jən/', t: 'noun', ts: 'n.', m: 'ý kiến', ee: 'My opinion is different.', ev: 'Ý kiến của tôi thì khác.' },
          { w: 'idea', ipa: '/aɪˈdɪə/', t: 'noun', ts: 'n.', m: 'ý tưởng', ee: 'A great idea.', ev: 'Một ý tưởng tuyệt vời.' },
          { w: 'agree', ipa: '/əˈɡriː/', t: 'verb', ts: 'v.', m: 'đồng ý', ee: 'I agree with him.', ev: 'Tôi đồng ý với anh ấy.' },
          { w: 'disagree', ipa: '/ˌdɪs.əˈɡriː/', t: 'verb', ts: 'v.', m: 'không đồng ý', ee: 'I completely disagree.', ev: 'Tôi hoàn toàn không đồng ý.' },
          { w: 'conclusion', ipa: '/kənˈkluː.ʒən/', t: 'noun', ts: 'n.', m: 'kết luận', ee: 'The final conclusion.', ev: 'Kết luận cuối cùng.' }
        ]
      },
      {
        order: 86,
        vocab: [] // Ôn tập, không có từ mới
      }
    ]
  },
  // Cụm 46: Bài 87 & 88
  {
    cum: 46,
    lessons: [
      {
        order: 87,
        vocab: [] // Ôn tập, không có từ mới
      },
      {
        order: 88,
        vocab: [] // Mock test, không có từ mới
      }
    ]
  },
  // Cụm 47: Bài 89 & 90
  {
    cum: 47,
    lessons: [
      {
        order: 89,
        vocab: [] // Mock test, không có từ mới
      },
      {
        order: 90,
        vocab: [] // Chiến lược thi, không có từ mới
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
      level: 'B1' // Trình độ B1
    }))
  }));
  fs.writeFileSync(`data/ielts-vocab-cum${batch.cum}.json`, JSON.stringify(formatted, null, 2));
  console.log(`Generated cum ${batch.cum}`);
});

const {PrismaClient} = require('./packages/database/index');
const p = new PrismaClient();

const EXTRA = {
  "cross": "băng qua, dấu chéo, đi qua",
  "candy": "kẹo, đồ ngọt, bánh kẹo",
  "butterfly": "con bướm, bướm",
  "board game": "trò chơi cờ bàn, trò chơi board game",
  "young": "trẻ, trẻ tuổi, trẻ trung",
  "sad": "buồn, buồn bã, buồn rầu",
  "funny": "vui nhộn, hài hước, buồn cười",
  "color": "màu sắc, tô màu, màu",
  "laugh": "cười, cười to, cười phá lên",
  "look": "nhìn, trông, xem, vẻ ngoài",
  "hundred": "một trăm, số một trăm",
  "shoes": "đôi giày, giày",
  "socks": "đôi tất, vớ, tất",
  "swimming pool": "hồ bơi, bể bơi",
  "moon": "mặt trăng, vầng trăng",
  "sky": "bầu trời, không trung, trời",
  "star": "ngôi sao, vì sao, sao",
  "can": "có thể, cái lon, hộp thiếc",
  "need": "cần, cần thiết, nhu cầu",
  "see": "nhìn thấy, trông thấy, xem",
  "here": "ở đây, tại đây, chỗ này",
  "there": "ở đó, tại đó, chỗ đó",
  "where": "ở đâu, nơi nào, chốn nào",
  "who": "ai, người nào, kẻ nào",
  "how": "thế nào, làm sao, bằng cách nào",
  "when": "khi nào, bao giờ, lúc nào",
  "why": "tại sao, vì sao, lý do gì",
  "which": "nào, cái nào, chiếc nào",
  "because": "vì, bởi vì, do",
  "sick": "ốm, bệnh, đau ốm, phát ốm"
};

p.lessonContent.findMany({
  where:{ contentType:'THEORY', lesson:{ program:{ code:{ contains:'starters' } } } }
}).then(async records => {
  let updated = 0;
  for (const r of records) {
    try {
      const d = JSON.parse(r.content);
      const newMeaning = EXTRA[d.word] || EXTRA[d.word?.toLowerCase()];
      if (!newMeaning) continue;
      d.meaning = newMeaning;
      await p.lessonContent.update({ where:{ id: r.id }, data:{ content: JSON.stringify(d) } });
      updated++;
      console.log('✅', d.word, '->', newMeaning);
    } catch {}
  }
  console.log('\n🎉 Đã update thêm:', updated, 'từ');
});

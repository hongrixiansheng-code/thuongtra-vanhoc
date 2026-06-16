const fs = require('fs');
const path = require('path');

const batch2Grammar = {
  // Bài 6A (OrderIndex 10)
  10: [
    {
      title: "1. Câu chữ 把 (把字句) nâng cao",
      desc: "Nhấn mạnh sự xử lý, tác động lên tân ngữ và kết quả của nó.",
      formula: "Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác (Bổ ngữ/了/着)",
      examples: [
        { cn: "请把空调打开。", vi: "Xin hãy bật điều hòa lên." },
        { cn: "他把书放在桌子上了。", vi: "Anh ấy đã đặt quyển sách lên bàn rồi." }
      ]
    },
    {
      title: "2. Câu bị động 被 (被字句) nâng cao",
      desc: "Nhấn mạnh đối tượng bị tác động, thường mang sắc thái không như ý.",
      formula: "Chủ ngữ (Bị động) + 被/叫/让 + (Tân ngữ) + Động từ + Thành phần khác",
      examples: [
        { cn: "我的钱包被小偷偷走了。", vi: "Ví của tôi bị trộm lấy mất rồi." }
      ]
    },
    {
      title: "3. Động từ + 起来",
      desc: "Đánh giá, nhận xét sự vật thông qua một hành động nào đó.",
      formula: "Chủ ngữ + Động từ + 起来 + Tính từ",
      examples: [
        { cn: "这件衣服看起来很贵。", vi: "Bộ quần áo này thoạt nhìn có vẻ rất đắt." },
        { cn: "这个菜吃起来很香。", vi: "Món này ăn vào rất thơm." }
      ]
    }
  ],
  // Bài 6B (OrderIndex 11)
  11: [
    {
      title: "1. Động từ + 下去",
      desc: "Biểu thị hành động đang tiếp tục diễn ra từ hiện tại đến tương lai.",
      formula: "Động từ + 下去",
      examples: [
        { cn: "请你继续说下去。", vi: "Xin bạn hãy tiếp tục nói đi." },
        { cn: "只要坚持下去，就能成功。", vi: "Chỉ cần kiên trì tiếp, là có thể thành công." }
      ]
    },
    {
      title: "2. 看来… (Xem ra...)",
      desc: "Đưa ra nhận định, đánh giá dựa trên tình hình thực tế.",
      formula: "看来，+ Đánh giá / Suy đoán",
      examples: [
        { cn: "天阴了，看来要下雨。", vi: "Trời âm u rồi, xem ra sắp mưa." }
      ]
    }
  ],
  // Bài 7A (OrderIndex 12)
  12: [
    {
      title: "1. 为了… (Để... / Vì...)",
      desc: "Biểu thị mục đích của hành động.",
      formula: "为了 + Mục đích，Chủ ngữ + Hành động",
      examples: [
        { cn: "为了健康，他每天跑步。", vi: "Vì sức khỏe, anh ấy chạy bộ mỗi ngày." }
      ]
    },
    {
      title: "2. 有助于… (Có ích cho...)",
      desc: "Mang lại lợi ích, tác dụng tốt cho một việc gì đó.",
      formula: "A + 有助于 + B",
      examples: [
        { cn: "多读书有助于提高写作能力。", vi: "Đọc sách nhiều có ích cho việc nâng cao khả năng viết." }
      ]
    }
  ],
  // Bài 7B (OrderIndex 13)
  13: [
    {
      title: "1. 对…有好处 (Có lợi cho...)",
      desc: "Biểu đạt sự vật, hành động mang lại lợi ích cho ai/cái gì.",
      formula: "A + 对 + B + 有好处",
      examples: [
        { cn: "早睡早起对身体有好处。", vi: "Ngủ sớm dậy sớm có lợi cho cơ thể." }
      ]
    },
    {
      title: "2. 适合… (Phù hợp với...)",
      desc: "Biểu thị sự vừa vặn, thích hợp về đặc điểm, tính chất.",
      formula: "A + 适合 + B (Danh từ/Đại từ/Động từ)",
      examples: [
        { cn: "这件毛衣很适合你。", vi: "Chiếc áo len này rất phù hợp với bạn." }
      ]
    },
    {
      title: "3. 与…有关 (Liên quan đến...)",
      desc: "Biểu thị sự việc có mối liên hệ với đối tượng nào đó.",
      formula: "A + 与 + B + 有关",
      examples: [
        { cn: "这件事与他无关。", vi: "Chuyện này không liên quan đến anh ấy." }
      ]
    }
  ],
  // Bài 8A (OrderIndex 14)
  14: [
    {
      title: "1. 宁可…也不… (Thà... chứ không...)",
      desc: "Đứng trước hai sự lựa chọn đều không lý tưởng, chọn cái ít xấu hơn.",
      formula: "宁可 + Lựa chọn A (chấp nhận được) + 也不 + Lựa chọn B (tuyệt đối không)",
      examples: [
        { cn: "我宁可走路去，也不坐他的车。", vi: "Tôi thà đi bộ, chứ không ngồi xe anh ta." }
      ]
    },
    {
      title: "2. 即使…也… (Cho dù... thì cũng...)",
      desc: "Biểu thị sự nhượng bộ, dù điều kiện có xảy ra thì kết quả vẫn không đổi.",
      formula: "即使 + Điều kiện giả định，也 + Kết quả không đổi",
      examples: [
        { cn: "即使明天下雨，我也要去。", vi: "Cho dù ngày mai trời mưa, tôi cũng phải đi." }
      ]
    }
  ],
  // Bài 8B (OrderIndex 15)
  15: [
    {
      title: "1. 尽管…还是… (Mặc dù... nhưng vẫn...)",
      desc: "Nhượng bộ thực tế (khác với 即使 là giả định).",
      formula: "尽管 + Sự thật，(但是) 还是 + Kết quả",
      examples: [
        { cn: "尽管很累，他还是坚持工作。", vi: "Mặc dù rất mệt, anh ấy vẫn kiên trì làm việc." }
      ]
    },
    {
      title: "2. 不然… (Nếu không thì...)",
      desc: "Nối câu, đưa ra hậu quả nếu không làm theo vế trước.",
      formula: "Điều kiện / Lời khuyên，不然 + Hậu quả",
      examples: [
        { cn: "快点走吧，不然会迟到的。", vi: "Đi nhanh lên, nếu không thì sẽ muộn đấy." }
      ]
    },
    {
      title: "3. 否则… (Nếu không thì...)",
      desc: "Cách dùng giống 不然 nhưng trang trọng hơn (thường dùng trong văn viết).",
      formula: "Điều kiện，否则 + Hậu果",
      examples: [
        { cn: "必须努力学习，否则无法通过考试。", vi: "Bắt buộc phải nỗ lực học, nếu không thì không cách nào qua kỳ thi." }
      ]
    }
  ],
  // Bài 9A (OrderIndex 16)
  16: [
    {
      title: "1. Bị động với 受 / 挨 / 遭 (Bị động nâng cao)",
      desc: "Sử dụng các động từ mang ý nghĩa bị động sẵn có thay cho 被.",
      formula: "Chủ ngữ + 受(được/bị) / 挨(bị đòn/mắng) / 遭(gặp nạn) + Động từ/Danh từ",
      examples: [
        { cn: "他受到了大家的欢迎。", vi: "Anh ấy nhận được sự hoan nghênh của mọi người." }
      ]
    },
    {
      title: "2. 让 / 叫 / 请 + Tân ngữ + Động từ",
      desc: "Câu kiêm ngữ (Bảo/Khiến/Mời ai đó làm gì).",
      formula: "Chủ ngữ + 让 / 叫 / 请 + Người + Động từ",
      examples: [
        { cn: "老板让他明天去出差。", vi: "Ông chủ bảo anh ấy ngày mai đi công tác." }
      ]
    }
  ],
  // Bài 9B (OrderIndex 17)
  17: [
    {
      title: "1. 受到… (Nhận được / Bị...)",
      desc: "Diễn tả việc nhận được tác động trừu tượng (như ảnh hưởng, giáo dục, hoan nghênh).",
      formula: "受到 + Tân ngữ trừu tượng",
      examples: [
        { cn: "这个电影受到了年轻人的喜爱。", vi: "Bộ phim này nhận được sự yêu thích của người trẻ." }
      ]
    },
    {
      title: "2. 引起… (Gây ra / Thu hút...)",
      desc: "Dẫn đến sự chú ý, quan tâm hoặc một vấn đề nào đó.",
      formula: "引起 + 注意/兴趣/讨论/问题",
      examples: [
        { cn: "他的话引起了大家的讨论。", vi: "Lời của anh ấy đã gây ra sự thảo luận của mọi người." }
      ]
    },
    {
      title: "3. 影响… (Ảnh hưởng...)",
      desc: "Tác động đến người hoặc sự việc khác.",
      formula: "影响 + Người/Sự việc (hoặc: 对...产生影响)",
      examples: [
        { cn: "不要影响别人休息。", vi: "Đừng ảnh hưởng người khác nghỉ ngơi." }
      ]
    }
  ],
  // Bài 10A (OrderIndex 18)
  18: [
    {
      title: "1. 不是…而是… (Không phải là... mà là...)",
      desc: "Phủ định vế đầu và khẳng định vế sau để làm rõ sự thật.",
      formula: "不是 + A，而是 + B",
      examples: [
        { cn: "这本字典不是我的，而是借来的。", vi: "Quyển từ điển này không phải của tôi, mà là đi mượn." }
      ]
    },
    {
      title: "2. 并不是… (Hoàn toàn không phải là...)",
      desc: "Dùng để nhấn mạnh sự phủ định, phản bác lại suy nghĩ của người khác.",
      formula: "并 + 不是 + Điều người khác nghĩ",
      examples: [
        { cn: "他并不是不想帮你，而是没有能力。", vi: "Anh ấy hoàn toàn không phải không muốn giúp bạn, mà là không có khả năng." }
      ]
    }
  ],
  // Bài 10B (OrderIndex 19)
  19: [
    {
      title: "1. 原来… (Hóa ra... / Vốn dĩ...)",
      desc: "Chỉ sự thật đến bây giờ mới phát hiện ra, hoặc tình trạng ban đầu.",
      formula: "原来 + Sự thật vừa phát hiện",
      examples: [
        { cn: "原来是你啊！我还以为是谁呢。", vi: "Hóa ra là bạn à! Tôi còn tưởng là ai cơ." }
      ]
    },
    {
      title: "2. 怪不得… (Thảo nào... / Chẳng trách...)",
      desc: "Thể hiện sự vỡ lẽ, hiểu ra nguyên nhân của một hiện tượng.",
      formula: "Nguyên nhân，怪不得 + Kết quả",
      examples: [
        { cn: "他病了，怪不得今天没来。", vi: "Anh ấy ốm rồi, thảo nào hôm nay không đến." }
      ]
    },
    {
      title: "3. 难怪… (Thảo nào...)",
      desc: "Tương đương với 怪不得, dùng để bày tỏ sự hiểu ra.",
      formula: "难怪 + Kết quả",
      examples: [
        { cn: "难怪他这么高兴，原来中奖了。", vi: "Thảo nào anh ấy vui thế, hóa ra trúng thưởng rồi." }
      ]
    }
  ]
};

const targetPath = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk4-batch2.json');
let data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

for (let i = 0; i < data.length; i++) {
  const lesson = data[i];
  if (batch2Grammar[lesson.orderIndex]) {
    lesson.grammar = batch2Grammar[lesson.orderIndex].map((g, idx) => ({
      id: (idx + 1).toString(),
      title: g.title,
      description: g.desc,
      formula: g.formula,
      examples: g.examples.map((ex, exIdx) => ({
        id: (exIdx + 1).toString(),
        chinese: ex.cn,
        vietnamese: ex.vi
      }))
    }));
  }
}

fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Cập nhật ngữ pháp cho HSK 4 Batch 2 thành công!');

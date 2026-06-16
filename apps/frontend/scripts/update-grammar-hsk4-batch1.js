const fs = require('fs');
const path = require('path');

const batch1Grammar = {
  // Bài 1A (OrderIndex 0)
  0: [
    {
      title: "1. 越来越… (Ngày càng...)",
      desc: "Biểu thị mức độ thay đổi theo thời gian.",
      formula: "越来越 + Tính từ / Động từ tâm lý",
      examples: [
        { cn: "天气越来越热了。", vi: "Thời tiết ngày càng nóng rồi." },
        { cn: "我越来越喜欢汉语。", vi: "Tôi ngày càng thích tiếng Hán." }
      ]
    },
    {
      title: "2. 对…来说 (Đối với...)",
      desc: "Đưa ra góc nhìn, đánh giá từ lập trường của một người hay sự vật nào đó.",
      formula: "对 + Đối tượng + 来说，...",
      examples: [
        { cn: "对我来说，经验很重要。", vi: "Đối với tôi mà nói, kinh nghiệm rất quan trọng." }
      ]
    },
    {
      title: "3. 关于… (Về...)",
      desc: "Giới thiệu phạm vi hoặc chủ đề liên quan của hành động, sự vật.",
      formula: "关于 + Danh từ/Đại từ，...",
      examples: [
        { cn: "关于这个问题，我们还要讨论。", vi: "Về vấn đề này, chúng ta còn phải thảo luận." }
      ]
    }
  ],
  // Bài 1B (OrderIndex 1)
  1: [
    {
      title: "1. 除了…之外… (Ngoài ra...)",
      desc: "Loại trừ một phần để nói về phần còn lại, hoặc bổ sung thêm ngoài cái đã nói.",
      formula: "除了 + A + 之外，...",
      examples: [
        { cn: "除了他之外，大家都来了。", vi: "Ngoài anh ấy ra, mọi người đều đến rồi." }
      ]
    },
    {
      title: "2. Cấu trúc giới từ 对",
      desc: "Biểu thị đối tượng chịu sự tác động của hành động hoặc thái độ.",
      formula: "Chủ ngữ + 对 + Tân ngữ + Động từ/Tính từ",
      examples: [
        { cn: "他对人很热情。", vi: "Anh ấy rất nhiệt tình với mọi người." },
        { cn: "运动对身体有好处。", vi: "Thể thao có lợi cho sức khỏe." }
      ]
    }
  ],
  // Bài 2A (OrderIndex 2)
  2: [
    {
      title: "1. 不但…而且… (Không những... mà còn...)",
      desc: "Biểu thị quan hệ tăng tiến.",
      formula: "不但 + A，而且 + B",
      examples: [
        { cn: "他不但聪明，而且很努力。", vi: "Anh ấy không những thông minh, mà còn rất nỗ lực." }
      ]
    },
    {
      title: "2. 既…又… (Vừa... vừa...)",
      desc: "Kết nối hai tính chất, trạng thái cùng tồn tại.",
      formula: "既 + A + 又 + B",
      examples: [
        { cn: "这件衣服既便宜又好看。", vi: "Bộ quần áo này vừa rẻ vừa đẹp." }
      ]
    },
    {
      title: "3. 一方面…另一方面… (Một mặt... mặt khác...)",
      desc: "Trình bày hai phương diện của cùng một vấn đề.",
      formula: "一方面...，另一方面...",
      examples: [
        { cn: "他一方面想去，另一方面又怕花钱。", vi: "Anh ấy một mặt muốn đi, mặt khác lại sợ tốn tiền." }
      ]
    }
  ],
  // Bài 2B (OrderIndex 3)
  3: [
    {
      title: "1. 越…越… (Càng... càng...)",
      desc: "Sự thay đổi của B phụ thuộc vào mức độ của A.",
      formula: "越 + Động từ/Tính từ A + 越 + Động từ/Tính từ B",
      examples: [
        { cn: "雨越下越大。", vi: "Mưa càng lúc càng to." }
      ]
    },
    {
      title: "2. 甚至 (Thậm chí)",
      desc: "Nhấn mạnh một mức độ cao hơn hoặc trường hợp cực đoan.",
      formula: "A... 甚至 + B",
      examples: [
        { cn: "他太忙了，甚至没时间吃饭。", vi: "Anh ấy quá bận, thậm chí không có thời gian ăn cơm." }
      ]
    }
  ],
  // Bài 3A (OrderIndex 4)
  4: [
    {
      title: "1. 一…就… (Vừa... đã...)",
      desc: "Hai hành động xảy ra liên tiếp nhau rất nhanh.",
      formula: "一 + Động từ 1 + 就 + Động từ 2",
      examples: [
        { cn: "他一回家就做作业。", vi: "Anh ấy vừa về nhà đã làm bài tập." }
      ]
    },
    {
      title: "2. 刚…就… (Vừa mới... đã...)",
      desc: "Tương tự 一...就... nhưng nhấn mạnh tính thời gian (vừa mới xảy ra).",
      formula: "刚 + Hành động 1 + 就 + Hành động 2",
      examples: [
        { cn: "我刚出门就下雨了。", vi: "Tôi vừa ra khỏi nhà thì trời đổ mưa." }
      ]
    },
    {
      title: "3. Phân biệt 才 và 就",
      desc: "就 chỉ sự việc xảy ra sớm, nhanh, thuận lợi. 才 chỉ sự việc xảy ra muộn, chậm, khó khăn.",
      formula: "才 (Mới) vs 就 (Đã)",
      examples: [
        { cn: "他早上五点就起床了。(Sớm)", vi: "Anh ấy 5 giờ sáng đã dậy rồi." },
        { cn: "他晚上十二点才睡觉。(Muộn)", vi: "Anh ấy 12 giờ đêm mới ngủ." }
      ]
    }
  ],
  // Bài 3B (OrderIndex 5)
  5: [
    {
      title: "1. 已经…了 (Đã... rồi)",
      desc: "Nhấn mạnh sự việc đã xảy ra hoặc thời gian đã trôi qua.",
      formula: "已经 + Hành động / Trạng thái + 了",
      examples: [
        { cn: "我已经吃过饭了。", vi: "Tôi đã ăn cơm rồi." }
      ]
    },
    {
      title: "2. 从来不… (Từ trước tới nay không...)",
      desc: "Diễn tả thói quen không làm gì từ quá khứ đến hiện tại.",
      formula: "从来不 + Động từ",
      examples: [
        { cn: "他从来不抽烟。", vi: "Anh ấy từ trước đến nay không hút thuốc." }
      ]
    }
  ],
  // Bài 4A (OrderIndex 6)
  6: [
    {
      title: "1. 由于… (Do... / Bởi vì...)",
      desc: "Biểu thị nguyên nhân, thường dùng trong văn viết trang trọng.",
      formula: "由于 + Nguyên nhân，...",
      examples: [
        { cn: "由于天气不好，比赛取消了。", vi: "Do thời tiết không tốt, trận đấu đã bị hủy." }
      ]
    },
    {
      title: "2. 因此… (Do đó / Bởi vậy...)",
      desc: "Biểu thị kết quả dựa trên nguyên nhân trước đó.",
      formula: "Nguyên nhân，因此 + Kết quả",
      examples: [
        { cn: "他工作很努力，因此成功了。", vi: "Anh ấy làm việc rất nỗ lực, do đó đã thành công." }
      ]
    },
    {
      title: "3. 因…而… (Vì... mà...)",
      desc: "Nối nguyên nhân và kết quả gọn gàng trong văn viết.",
      formula: "因 + Nguyên nhân + 而 + Kết quả/Thay đổi",
      examples: [
        { cn: "他因生病而请假。", vi: "Anh ấy vì bị bệnh mà xin nghỉ." }
      ]
    }
  ],
  // Bài 4B (OrderIndex 7)
  7: [
    {
      title: "1. 结果… (Kết quả là...)",
      desc: "Đưa ra kết quả cuối cùng (thường là bất ngờ hoặc không như ý muốn).",
      formula: "Sự việc，结果 + Kết quả",
      examples: [
        { cn: "我跑得很快，结果还是迟到了。", vi: "Tôi chạy rất nhanh, kết quả vẫn bị muộn." }
      ]
    },
    {
      title: "2. 造成… (Gây ra...)",
      desc: "Dẫn đến kết quả xấu, không mong muốn.",
      formula: "造成 + Hậu quả xấu",
      examples: [
        { cn: "粗心造成了错误。", vi: "Sự cẩu thả đã gây ra sai sót." }
      ]
    }
  ],
  // Bài 5A (OrderIndex 8)
  8: [
    {
      title: "1. 只要…就… (Chỉ cần... là...)",
      desc: "Đưa ra điều kiện đủ để có kết quả.",
      formula: "只要 + Điều kiện，就 + Kết quả",
      examples: [
        { cn: "只要努力，就会成功。", vi: "Chỉ cần nỗ lực là sẽ thành công." }
      ]
    },
    {
      title: "2. 只有…才… (Chỉ có... mới...)",
      desc: "Đưa ra điều kiện duy nhất, bắt buộc.",
      formula: "只有 + Điều kiện duy nhất，才 + Kết quả",
      examples: [
        { cn: "只有多练习，才能学好汉语。", vi: "Chỉ có luyện tập nhiều, mới có thể học tốt tiếng Hán." }
      ]
    },
    {
      title: "3. 与其…不如… (Thà... còn hơn...)",
      desc: "So sánh hai lựa chọn và chọn cái sau (B).",
      formula: "与其 + Lựa chọn A，不如 + Lựa chọn B",
      examples: [
        { cn: "与其抱怨，不如行动。", vi: "Thà phàn nàn thì thà hành động còn hơn." }
      ]
    }
  ],
  // Bài 5B (OrderIndex 9)
  9: [
    {
      title: "1. 靠… (Dựa vào...)",
      desc: "Chỉ sự nương tựa, phương tiện hoặc cách thức.",
      formula: "靠 + Đối tượng / Cách thức",
      examples: [
        { cn: "在家靠父母，出门靠朋友。", vi: "Ở nhà dựa vào cha mẹ, ra ngoài dựa vào bạn bè." }
      ]
    },
    {
      title: "2. 通过… (Thông qua...)",
      desc: "Đạt được kết quả nào đó nhờ phương tiện hoặc quá trình.",
      formula: "通过 + Cách thức / Quá trình，...",
      examples: [
        { cn: "通过努力，他通过了考试。", vi: "Thông qua nỗ lực, anh ấy đã qua kỳ thi." }
      ]
    }
  ]
};

const targetPath = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk4-batch1.json');
let data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

for (let i = 0; i < data.length; i++) {
  const lesson = data[i];
  if (batch1Grammar[lesson.orderIndex]) {
    lesson.grammar = batch1Grammar[lesson.orderIndex].map((g, idx) => ({
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
console.log('Cập nhật ngữ pháp cho HSK 4 Batch 1 thành công!');

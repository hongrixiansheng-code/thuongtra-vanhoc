const fs = require('fs');
const path = require('path');

const batch3Grammar = {
  // Bài 11A (OrderIndex 20)
  20: [
    {
      title: "1. 比起… (So với...)",
      desc: "Dùng để so sánh hai sự vật, sự việc, nhấn mạnh sự khác biệt.",
      formula: "比起 + A，B + 更 / 最 / 还...",
      examples: [
        { cn: "比起跑步，我更喜欢游泳。", vi: "So với chạy bộ, tôi thích bơi hơn." }
      ]
    },
    {
      title: "2. 与…相比… (So sánh với...)",
      desc: "Trang trọng hơn 比起, thường dùng trong văn viết.",
      formula: "与 + A + 相比，B...",
      examples: [
        { cn: "与去年相比，今年的收入增加了。", vi: "So với năm ngoái, thu nhập năm nay đã tăng." }
      ]
    }
  ],
  // Bài 11B (OrderIndex 21)
  21: [
    {
      title: "1. 占… (Chiếm...)",
      desc: "Biểu thị tỷ lệ, số lượng chiếm bao nhiêu phần.",
      formula: "Chủ ngữ + 占 + Tỷ lệ/Số lượng",
      examples: [
        { cn: "女性员工占总人数的一半。", vi: "Nhân viên nữ chiếm một nửa tổng số người." }
      ]
    },
    {
      title: "2. 达到… (Đạt đến...)",
      desc: "Biểu thị sự việc đạt tới một mức độ, số lượng nhất định.",
      formula: "达到 + Mức độ/Số lượng",
      examples: [
        { cn: "温度达到了40度。", vi: "Nhiệt độ đã đạt đến 40 độ." }
      ]
    },
    {
      title: "3. 超过… (Vượt quá...)",
      desc: "Biểu thị sự vượt qua một mức độ, số lượng hay giới hạn nào đó.",
      formula: "超过 + Mức độ/Số lượng",
      examples: [
        { cn: "报名人数超过了一百人。", vi: "Số người đăng ký đã vượt quá một trăm người." }
      ]
    }
  ],
  // Bài 12A (OrderIndex 22)
  22: [
    {
      title: "1. 一边…一边… (Vừa... vừa...)",
      desc: "Hai hành động do một người thực hiện cùng một lúc.",
      formula: "一边 + Động từ 1，一边 + Động从 2",
      examples: [
        { cn: "他一边吃饭一边看手机。", vi: "Anh ấy vừa ăn cơm vừa xem điện thoại." }
      ]
    },
    {
      title: "2. 一面…一面… (Vừa... vừa...)",
      desc: "Tương tự như 一边…一边… nhưng thường dùng trong văn viết hoặc trang trọng hơn.",
      formula: "一面 + Động从 1，一面 + Động从 2",
      examples: [
        { cn: "他一面工作，一面学习。", vi: "Anh ấy vừa làm việc, vừa học tập." }
      ]
    }
  ],
  // Bài 12B (OrderIndex 23)
  23: [
    {
      title: "1. Bổ ngữ kết quả 到 (Đến / Được)",
      desc: "Nhấn mạnh hành động đã đạt đến một mục đích hoặc kết quả.",
      formula: "Động từ + 到",
      examples: [
        { cn: "我找到我的钥匙了。", vi: "Tôi tìm thấy chìa khóa của mình rồi." }
      ]
    },
    {
      title: "2. Bổ ngữ kết quả 见 (Thấy)",
      desc: "Nhấn mạnh kết quả của các giác quan (nhìn, nghe).",
      formula: "Động từ (听/看) + 见",
      examples: [
        { cn: "你看见我的眼镜了吗？", vi: "Bạn có nhìn thấy kính của tôi không?" }
      ]
    },
    {
      title: "3. Bổ ngữ kết quả 着 (Được / Trúng)",
      desc: "Nhấn mạnh mục đích của hành động đã đạt được (đọc là zháo).",
      formula: "Động từ (买/找/猜) + 着",
      examples: [
        { cn: "那本书我买着了。", vi: "Cuốn sách đó tôi mua được rồi." }
      ]
    }
  ],
  // Bài 13A (OrderIndex 24)
  24: [
    {
      title: "1. 无论…都/也… (Bất luận / Cho dù... đều...)",
      desc: "Biểu thị kết quả không thay đổi dù trong bất kỳ điều kiện nào.",
      formula: "无论 + Điều kiện / Từ để hỏi，Chủ ngữ + 都 / 也...",
      examples: [
        { cn: "无论多困难，我们都要完成。", vi: "Bất luận khó khăn nhường nào, chúng ta đều phải hoàn thành." }
      ]
    },
    {
      title: "2. 不管…都/也… (Cho dù... đều...)",
      desc: "Ý nghĩa giống 无论 nhưng dùng nhiều trong khẩu ngữ.",
      formula: "不管 + Điều kiện，Chủ ngữ + 都 / 也...",
      examples: [
        { cn: "不管他同意不同意，我都要去。", vi: "Cho dù anh ta đồng ý hay không, tôi đều phải đi." }
      ]
    }
  ],
  // Bài 13B (OrderIndex 25)
  25: [
    {
      title: "1. 即便…也… (Cho dù... cũng...)",
      desc: "Tương đương với 即使, nhấn mạnh giả định.",
      formula: "即便 + Điều kiện giả định，也 + Kết quả",
      examples: [
        { cn: "即便失败了，也不要后悔。", vi: "Cho dù thất bại rồi, cũng đừng hối hận." }
      ]
    },
    {
      title: "2. 至于… (Còn về...)",
      desc: "Chuyển sang một khía cạnh hoặc chủ đề khác liên quan.",
      formula: "A... 至于 B，...",
      examples: [
        { cn: "我同意去。至于什么时候去，大家再商量。", vi: "Tôi đồng ý đi. Còn về đi lúc nào, mọi người bàn lại." }
      ]
    },
    {
      title: "3. 对于… (Đối với...)",
      desc: "Chỉ ra đối tượng mà hành động hoặc thái độ hướng tới.",
      formula: "对于 + Đối tượng，...",
      examples: [
        { cn: "对于这件事，我的看法不同。", vi: "Đối với việc này, cách nhìn của tôi khác." }
      ]
    }
  ],
  // Bài 14A (OrderIndex 26)
  26: [
    {
      title: "1. 随着… (Cùng với... / Theo...)",
      desc: "Biểu thị sự việc xảy ra đồng thời với sự thay đổi của một điều kiện nào đó.",
      formula: "随着 + Sự thay đổi A，B 也 thay đổi",
      examples: [
        { cn: "随着经济的发展，环境问题越来越严重。", vi: "Cùng với sự phát triển của kinh tế, vấn đề môi trường ngày càng nghiêm trọng." }
      ]
    },
    {
      title: "2. 伴随着… (Cùng với...)",
      desc: "Trang trọng hơn 随着, thường dùng trong văn viết.",
      formula: "伴随着 + Sự kiện/Thay đổi，...",
      examples: [
        { cn: "伴随着音乐的停止，表演结束了。", vi: "Cùng với việc âm nhạc dừng lại, buổi biểu diễn kết thúc." }
      ]
    },
    {
      title: "3. 随着…越来越… (Cùng với... ngày càng...)",
      desc: "Sự kết hợp cấu trúc biểu đạt mức độ tăng dần theo sự thay đổi.",
      formula: "随着 + A，B 越来越...",
      examples: [
        { cn: "随着时间的推移，他越来越想家。", vi: "Cùng với sự trôi đi của thời gian, anh ấy ngày càng nhớ nhà." }
      ]
    }
  ],
  // Bài 14B (OrderIndex 27)
  27: [
    {
      title: "1. Bổ ngữ xu hướng kép nâng cao (趋向补语)",
      desc: "Biểu thị phương hướng của hành động có sự di chuyển phức tạp.",
      formula: "Động từ + (上来/下去/过来/过去/起来...)",
      examples: [
        { cn: "他跑过去了。", vi: "Anh ấy chạy qua đó rồi." }
      ]
    },
    {
      title: "2. Bổ ngữ khả năng (Potential complements)",
      desc: "Biểu thị khả năng có thể hoặc không thể đạt được kết quả.",
      formula: "Động từ + 得 / 不 + Bổ ngữ kết quả/xu hướng",
      examples: [
        { cn: "字太小了，我看不清。", vi: "Chữ nhỏ quá, tôi nhìn không rõ." },
        { cn: "这句话你听得懂吗？", vi: "Câu này bạn nghe hiểu không?" }
      ]
    }
  ],
  // Bài 15A (OrderIndex 28)
  28: [
    {
      title: "1. 据说… (Nghe nói...)",
      desc: "Đưa ra thông tin nghe được từ người khác, không chắc chắn 100%.",
      formula: "据说 + Thông tin",
      examples: [
        { cn: "据说他马上要结婚了。", vi: "Nghe nói anh ấy sắp kết hôn rồi." }
      ]
    },
    {
      title: "2. 据报道… (Theo tin tức đưa...)",
      desc: "Trích dẫn thông tin từ báo chí, truyền thông.",
      formula: "据报道，...",
      examples: [
        { cn: "据报道，昨天发生了一起交通事故。", vi: "Theo tin đưa, hôm qua đã xảy ra một vụ tai nạn giao thông." }
      ]
    }
  ],
  // Bài 15B (OrderIndex 29)
  29: [
    {
      title: "1. 据…统计… (Theo thống kê...)",
      desc: "Trích dẫn số liệu thống kê chính thức.",
      formula: "据统计，+ Số liệu",
      examples: [
        { cn: "据统计，该市人口已超过五百万。", vi: "Theo thống kê, dân số thành phố này đã vượt quá năm triệu." }
      ]
    },
    {
      title: "2. 所谓… (Cái gọi là...)",
      desc: "Dùng để giải thích hoặc mỉa mai một khái niệm.",
      formula: "所谓(的) + Khái niệm，就是...",
      examples: [
        { cn: "所谓的幸福，就是一家人在一起。", vi: "Cái gọi là hạnh phúc, chính là cả nhà ở cùng nhau." }
      ]
    },
    {
      title: "3. 可见… (Có thể thấy...)",
      desc: "Đưa ra kết luận hiển nhiên từ những sự kiện trước đó.",
      formula: "Sự việc，可见 + Kết luận",
      examples: [
        { cn: "他每天复习到深夜，可见他很重视这次考试。", vi: "Anh ấy mỗi ngày ôn tập đến đêm khuya, có thể thấy anh ấy rất coi trọng kỳ thi này." }
      ]
    }
  ]
};

const targetPath = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk4-batch3.json');
let data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

for (let i = 0; i < data.length; i++) {
  const lesson = data[i];
  if (batch3Grammar[lesson.orderIndex]) {
    lesson.grammar = batch3Grammar[lesson.orderIndex].map((g, idx) => ({
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
console.log('Cập nhật ngữ pháp cho HSK 4 Batch 3 thành công!');

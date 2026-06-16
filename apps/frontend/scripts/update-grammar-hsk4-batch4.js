const fs = require('fs');
const path = require('path');

const batch4Grammar = {
  // Bài 16A (OrderIndex 30)
  30: [
    {
      title: "1. 之所以…是因为… (Sở dĩ... là bởi vì...)",
      desc: "Nhấn mạnh nguyên nhân của một sự việc hoặc kết quả đã được nêu trước.",
      formula: "Chủ ngữ + 之所以 + Kết quả，是因为 + Nguyên nhân",
      examples: [
        { cn: "他之所以成功，是因为他很努力。", vi: "Anh ấy sở dĩ thành công, là bởi vì anh ấy rất nỗ lực." }
      ]
    },
    {
      title: "2. 正是…才… (Chính là... mới...)",
      desc: "Nhấn mạnh điều kiện hoặc nguyên nhân duy nhất dẫn đến kết quả.",
      formula: "正是 (因为) + Nguyên nhân，才 + Kết quả",
      examples: [
        { cn: "正是你的鼓励，我才没有放弃。", vi: "Chính là nhờ sự khích lệ của bạn, tôi mới không từ bỏ." }
      ]
    }
  ],
  // Bài 16B (OrderIndex 31)
  31: [
    {
      title: "1. 之所以… (Sở dĩ...)",
      desc: "Dùng độc lập để nhấn mạnh kết quả trước khi giải thích nguyên nhân.",
      formula: "之所以 + Kết quả，(是因为...)",
      examples: [
        { cn: "我们之所以这样做，有我们的苦衷。", vi: "Chúng tôi sở dĩ làm như vậy, là có nỗi khổ riêng." }
      ]
    },
    {
      title: "2. 恰恰… (Đúng lúc / Trái lại...)",
      desc: "Nhấn mạnh sự việc xảy ra trùng hợp hoặc hoàn toàn trái ngược với dự đoán.",
      formula: "恰恰 + Động từ/Phó từ",
      examples: [
        { cn: "他说的，恰恰证明了我的观点。", vi: "Những gì anh ấy nói, vừa đúng chứng minh quan điểm của tôi." }
      ]
    },
    {
      title: "3. 反而… (Trái lại / Lại còn...)",
      desc: "Biểu thị kết quả hoàn toàn trái ngược với mong đợi thông thường.",
      formula: "A...，反而 + Kết quả trái ngược B",
      examples: [
        { cn: "吃了药，他的病反而更重了。", vi: "Uống thuốc rồi, bệnh của anh ta trái lại càng nặng hơn." }
      ]
    }
  ],
  // Bài 17A (OrderIndex 32)
  32: [
    {
      title: "1. 既然…就/也… (Đã... thì...)",
      desc: "Dựa trên tiền đề đã xảy ra để đưa ra kết luận hoặc lời khuyên.",
      formula: "既然 + Tiền đề / Sự thật，就 / 也 + Kết luận",
      examples: [
        { cn: "既然来了，就吃完饭再走吧。", vi: "Đã đến rồi, thì ăn cơm xong hẵng đi." }
      ]
    },
    {
      title: "2. 不如… (Không bằng / Thà...)",
      desc: "So sánh và đưa ra lời khuyên hoặc sự lựa chọn tốt hơn.",
      formula: "A 不如 B (Hoặc: 与其 A，不如 B)",
      examples: [
        { cn: "与其在这里等，不如我们自己去。", vi: "Thay vì ở đây đợi, thà chúng ta tự đi." }
      ]
    }
  ],
  // Bài 17B (OrderIndex 33)
  33: [
    {
      title: "1. 宁愿…也不… (Thà... chứ không...)",
      desc: "Tương đương với 宁可...也不..., thể hiện sự lựa chọn dứt khoát.",
      formula: "宁愿 + A (chấp nhận được) + 也不 + B (tuyệt đối không)",
      examples: [
        { cn: "他宁愿饿着，也不吃这种东西。", vi: "Anh ấy thà chịu đói, chứ không ăn loại đồ này." }
      ]
    },
    {
      title: "2. 共同… (Cùng nhau...)",
      desc: "Nhấn mạnh sự hợp tác, cùng chung chí hướng hoặc hành động.",
      formula: "共同 + Động từ",
      examples: [
        { cn: "共同解决问题。", vi: "Cùng nhau giải quyết vấn đề." }
      ]
    }
  ],
  // Bài 18A (OrderIndex 34)
  34: [
    {
      title: "1. 无法… (Không có cách nào... / Không thể...)",
      desc: "Văn viết trang trọng của 没办法 / 不能.",
      formula: "无法 + Động từ (giải quyết / hiểu...)",
      examples: [
        { cn: "我无法理解他的想法。", vi: "Tôi không có cách nào hiểu được suy nghĩ của anh ấy." }
      ]
    },
    {
      title: "2. 难以… (Khó mà...)",
      desc: "Biểu thị sự việc rất khó thực hiện, thường dùng trong văn viết.",
      formula: "难以 + Động từ (相信 / 忘记...)",
      examples: [
        { cn: "真是令人难以相信。", vi: "Thật là khiến người ta khó mà tin được." }
      ]
    }
  ],
  // Bài 18B (OrderIndex 35)
  35: [
    {
      title: "1. 以便… (Để tiện cho / Để...)",
      desc: "Chỉ mục đích của hành động phía trước, thường dùng trong văn viết.",
      formula: "Hành động，以便 + Mục đích",
      examples: [
        { cn: "请留下电话，以便我们联系您。", vi: "Xin để lại số điện thoại, để tiện cho chúng tôi liên hệ ngài." }
      ]
    },
    {
      title: "2. 从而… (Từ đó mà...)",
      desc: "Kết nối nguyên nhân - kết quả hoặc phương pháp - mục đích một cách logic.",
      formula: "A...，从而 + Kết quả B",
      examples: [
        { cn: "他每天练习，从而提高了水平。", vi: "Anh ấy luyện tập mỗi ngày, từ đó mà nâng cao được trình độ." }
      ]
    },
    {
      title: "3. 进而… (Hơn thế nữa / Tiến tới...)",
      desc: "Biểu thị mức độ phát triển thêm một bước so với trước đó.",
      formula: "A...，进而 + B (mức độ cao hơn)",
      examples: [
        { cn: "先解决小问题，进而解决大问题。", vi: "Giải quyết vấn đề nhỏ trước, tiến tới giải quyết vấn đề lớn." }
      ]
    }
  ],
  // Bài 19A (OrderIndex 36)
  36: [
    {
      title: "1. 在我看来… (Theo tôi thấy...)",
      desc: "Đưa ra quan điểm cá nhân một cách khách quan.",
      formula: "在我看来，+ Quan điểm",
      examples: [
        { cn: "在我看来，这件事没有那么简单。", vi: "Theo tôi thấy, việc này không đơn giản như vậy." }
      ]
    },
    {
      title: "2. 我认为… (Tôi cho rằng...)",
      desc: "Khẳng định ý kiến cá nhân (thường dùng trong văn nói và viết).",
      formula: "我认为 + Mệnh đề",
      examples: [
        { cn: "我认为你的计划很好。", vi: "Tôi cho rằng kế hoạch của bạn rất tốt." }
      ]
    }
  ],
  // Bài 19B (OrderIndex 37)
  37: [
    {
      title: "1. 总的来说… (Nói tóm lại / Nhìn chung...)",
      desc: "Đưa ra kết luận tổng quát sau khi phân tích chi tiết.",
      formula: "总的来说，+ Kết luận",
      examples: [
        { cn: "总的来说，今年的成绩不错。", vi: "Nhìn chung, thành tích năm nay không tồi." }
      ]
    },
    {
      title: "2. 换句话说… (Nói cách khác...)",
      desc: "Dùng cách diễn đạt khác để làm rõ ý trước đó.",
      formula: "A...，换句话说，+ B (ý nghĩa tương đương)",
      examples: [
        { cn: "他不想去，换句话说，他觉得没意思。", vi: "Anh ấy không muốn đi, nói cách khác, anh ấy thấy không thú vị." }
      ]
    },
    {
      title: "3. 也就是说… (Nói cách khác là...)",
      desc: "Tương đương 换句话说, dùng để giải thích rõ hơn.",
      formula: "A...，也就是说，+ B",
      examples: [
        { cn: "我们明天放假，也就是说，不用去上班了。", vi: "Ngày mai chúng ta được nghỉ, nói cách khác là, không cần đi làm nữa." }
      ]
    }
  ],
  // Bài 20A (OrderIndex 38)
  38: [
    {
      title: "1. 将… (Sẽ / Đem...)",
      desc: "Biểu thị tương lai hoặc cấu trúc giống chữ 把 trong văn viết.",
      formula: "将 + Động từ (Sẽ) / 将 + Tân ngữ + Động từ (Giống 把)",
      examples: [
        { cn: "会议将在这周末举行。", vi: "Cuộc họp sẽ được tổ chức vào cuối tuần này." }
      ]
    },
    {
      title: "2. 打算… (Dự định...)",
      desc: "Đưa ra kế hoạch trong tương lai gần.",
      formula: "打算 + Động từ",
      examples: [
        { cn: "我打算明年去中国。", vi: "Tôi dự định sang năm đi Trung Quốc." }
      ]
    },
    {
      title: "3. 计划… (Kế hoạch...)",
      desc: "Trang trọng hơn 打算, thường dùng cho kế hoạch cụ thể, rõ ràng.",
      formula: "计划 + Động từ",
      examples: [
        { cn: "我们计划开发新产品。", vi: "Chúng tôi lên kế hoạch phát triển sản phẩm mới." }
      ]
    }
  ],
  // Bài 20B (OrderIndex 39)
  39: [
    {
      title: "1. 希望… (Hy vọng...)",
      desc: "Bày tỏ mong muốn tốt đẹp.",
      formula: "希望 + Mệnh đề",
      examples: [
        { cn: "希望你能成功。", vi: "Hy vọng bạn có thể thành công." }
      ]
    },
    {
      title: "2. 展望… (Triển vọng / Nhìn về...)",
      desc: "Nhìn về tương lai với sự mong đợi, thường dùng trong văn viết.",
      formula: "展望 + 未来/前景",
      examples: [
        { cn: "展望未来，我们充满信心。", vi: "Nhìn về tương lai, chúng ta tràn đầy niềm tin." }
      ]
    },
    {
      title: "3. 总之… (Tóm lại...)",
      desc: "Đúc kết toàn bộ ý nghĩa của các câu trước thành một kết luận cuối cùng.",
      formula: "总之，+ Kết luận cuối",
      examples: [
        { cn: "总之，我们要继续努力。", vi: "Tóm lại, chúng ta phải tiếp tục nỗ lực." }
      ]
    }
  ]
};

const targetPath = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk4-batch4.json');
let data = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

for (let i = 0; i < data.length; i++) {
  const lesson = data[i];
  if (batch4Grammar[lesson.orderIndex]) {
    lesson.grammar = batch4Grammar[lesson.orderIndex].map((g, idx) => ({
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
console.log('Cập nhật ngữ pháp cho HSK 4 Batch 4 thành công!');

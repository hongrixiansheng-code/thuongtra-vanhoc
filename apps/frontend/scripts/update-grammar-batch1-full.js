const fs = require('fs');
const path = require('path');

const grammarBatch1 = {
  // Bài 1: 9 điểm
  0: [
    {
      "title": "1. Trợ từ thể: 了 (Hành động đã hoàn thành)",
      "desc": "Đứng ngay sau động từ để biểu thị hành động đã xảy ra và hoàn thành trong quá khứ.",
      "formula": [{"text": "Động từ + 了", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我吃饭了。", "meaning": "Tôi đã ăn cơm rồi."}]
    },
    {
      "title": "2. Trợ từ thể: 过 (Trải nghiệm trong quá khứ)",
      "desc": "Đứng ngay sau động từ để diễn tả một hành động đã từng xảy ra (trải nghiệm).",
      "formula": [{"text": "Động từ + 过", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我去过北京。", "meaning": "Tôi đã từng đi Bắc Kinh."}]
    },
    {
      "title": "3. Trợ từ thể: 着 (Trạng thái đang tiếp diễn)",
      "desc": "Đứng sau động từ để diễn tả một trạng thái đang diễn ra và duy trì ổn định.",
      "formula": [{"text": "Động từ + 着", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "门开着。", "meaning": "Cửa đang mở."}]
    },
    {
      "title": "4. Phó từ mức độ: 极了 (Cực kỳ)",
      "desc": "Đứng sau tính từ hoặc động từ tâm lý để chỉ mức độ cao nhất.",
      "formula": [{"text": "Tính từ + 极了", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "今天的天气好极了。", "meaning": "Thời tiết hôm nay tốt cực kỳ."}]
    },
    {
      "title": "5. Liên từ: 越…越… (Càng... càng...)",
      "desc": "Biểu thị mức độ của vế sau thay đổi theo sự phát triển của vế trước.",
      "formula": [{"text": "越 A 越 B", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "雨越下越大。", "meaning": "Mưa càng lúc càng lớn."}]
    },
    {
      "title": "6. Liên từ: 越来越… (Càng ngày càng...)",
      "desc": "Biểu thị sự thay đổi tăng tiến theo thời gian.",
      "formula": [{"text": "越来越 + Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "天气越来越冷。", "meaning": "Thời tiết càng ngày càng lạnh."}]
    },
    {
      "title": "7. Giới từ: 从…到… (Từ... đến...)",
      "desc": "Chỉ điểm bắt đầu và kết thúc của thời gian hoặc không gian.",
      "formula": [{"text": "从 A 到 B", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我从早上到下午都在学习。", "meaning": "Tôi học từ sáng đến chiều."}]
    },
    {
      "title": "8. Giới từ: 离 (Cách)",
      "desc": "Biểu thị khoảng cách giữa hai địa điểm hoặc thời điểm.",
      "formula": [{"text": "A 离 B 很远/近", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我家离学校很近。", "meaning": "Nhà tôi cách trường rất gần."}]
    },
    {
      "title": "9. Liên từ lựa chọn: 还是 vs 或者 (Hay là / Hoặc)",
      "desc": "还是 dùng cho câu hỏi, 或者 dùng cho câu trần thuật.",
      "formula": [{"text": "A 还是/或者 B", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你喝茶还是喝咖啡？", "meaning": "Bạn uống trà hay uống cà phê?"}]
    }
  ],

  // Bài 2: 8 điểm
  1: [
    {
      "title": "1. Câu tồn hiện: Place + 有 + Noun (Sự tồn tại)",
      "desc": "Nhấn mạnh tại một địa điểm tồn tại người hoặc vật.",
      "formula": [{"text": "Địa điểm + 有 + Danh từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "桌子上有一本书。", "meaning": "Trên bàn có một cuốn sách."}]
    },
    {
      "title": "2. Câu tồn hiện: Place + 是 + Noun (Khẳng định)",
      "desc": "Khẳng định chắc chắn người/vật duy nhất tồn tại ở địa điểm đó.",
      "formula": [{"text": "Địa điểm + 是 + Danh từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我家前面是一个公园。", "meaning": "Phía trước nhà tôi là một công viên."}]
    },
    {
      "title": "3. Câu tồn hiện: Place + V + 着 + Noun (Trạng thái)",
      "desc": "Diễn tả trạng thái tĩnh của người/vật đang được duy trì tại một địa điểm.",
      "formula": [{"text": "Địa điểm + Động từ + 着 + Danh từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "墙上挂着一幅画。", "meaning": "Trên tường đang treo một bức tranh."}]
    },
    {
      "title": "4. Câu điều kiện: 只要…就… (Chỉ cần... thì...)",
      "desc": "Biểu đạt điều kiện đủ.",
      "formula": [{"text": "只要 + Điều kiện, 就 + Kết quả", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "只要努力，就会成功。", "meaning": "Chỉ cần nỗ lực, thì sẽ thành công."}]
    },
    {
      "title": "5. Câu điều kiện: 只有…才… (Chỉ có... mới...)",
      "desc": "Biểu đạt điều kiện duy nhất bắt buộc phải có.",
      "formula": [{"text": "只有 + Điều kiện duy nhất, 才 + Kết quả", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "只有多听多说，才能学好外语。", "meaning": "Chỉ có nghe nhiều nói nhiều, mới có thể học tốt ngoại ngữ."}]
    },
    {
      "title": "6. Thời gian: …以前 (Trước khi)",
      "desc": "Chỉ thời điểm trước khi một hành động khác xảy ra.",
      "formula": [{"text": "Hành động + 以前", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "睡觉以前看书。", "meaning": "Đọc sách trước khi đi ngủ."}]
    },
    {
      "title": "7. Thời gian: …以后 (Sau khi)",
      "desc": "Chỉ thời điểm sau khi hoàn thành một hành động.",
      "formula": [{"text": "Hành động + 以后", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "下课以后我回家。", "meaning": "Sau khi tan học tôi về nhà."}]
    },
    {
      "title": "8. Thời gian: …的时候 (Vào lúc / Khi)",
      "desc": "Chỉ thời điểm đang diễn ra hành động.",
      "formula": [{"text": "Hành động + 的时候", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "吃饭的时候不要看手机。", "meaning": "Khi ăn cơm đừng xem điện thoại."}]
    }
  ],

  // Bài 3: 9 điểm
  2: [
    {
      "title": "1. Động từ năng nguyện: 应该 (Nên)",
      "desc": "Đưa ra lời khuyên người khác nên làm gì đó.",
      "formula": [{"text": "应该 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你应该多休息。", "meaning": "Bạn nên nghỉ ngơi nhiều hơn."}]
    },
    {
      "title": "2. Động từ năng nguyện: 愿意 (Sẵn lòng)",
      "desc": "Biểu thị sự đồng ý, tự nguyện làm việc gì.",
      "formula": [{"text": "愿意 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我愿意帮助你。", "meaning": "Tôi sẵn lòng giúp đỡ bạn."}]
    },
    {
      "title": "3. Động từ năng nguyện: 必须 (Bắt buộc)",
      "desc": "Biểu thị sự bắt buộc, không có lựa chọn khác.",
      "formula": [{"text": "必须 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你必须去。", "meaning": "Bạn bắt buộc phải đi."}]
    },
    {
      "title": "4. Động từ năng nguyện: 需要 (Cần thiết)",
      "desc": "Biểu thị nhu cầu cần phải làm gì.",
      "formula": [{"text": "需要 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我需要买一本书。", "meaning": "Tôi cần mua một cuốn sách."}]
    },
    {
      "title": "5. Động từ năng nguyện: 可能 (Có thể / Có lẽ)",
      "desc": "Chỉ sự phỏng đoán, dự đoán một việc có khả năng xảy ra.",
      "formula": [{"text": "可能 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "明天可能下雨。", "meaning": "Ngày mai có thể trời mưa."}]
    },
    {
      "title": "6. Câu phức: 如果…就… (Nếu... thì...)",
      "desc": "Giả thiết điều kiện và hệ quả.",
      "formula": [{"text": "如果 A，就 B", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "如果下雨，我就不去。", "meaning": "Nếu trời mưa, tôi sẽ không đi."}]
    },
    {
      "title": "7. Câu phức: 虽然…但是… (Tuy... nhưng...)",
      "desc": "Quan hệ nhượng bộ, trái ngược.",
      "formula": [{"text": "虽然 A，但是 B", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "虽然他很忙，但是他来了。", "meaning": "Tuy anh ấy bận, nhưng anh ấy vẫn đến."}]
    },
    {
      "title": "8. Câu phức: 不但…而且… (Không những... mà còn...)",
      "desc": "Quan hệ bổ sung, tăng tiến.",
      "formula": [{"text": "不但 A，而且 B", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "她不但漂亮，而且聪明。", "meaning": "Cô ấy không những xinh đẹp, mà còn thông minh."}]
    },
    {
      "title": "9. Câu phức: 除了…以外… (Ngoài... ra)",
      "desc": "Loại trừ một đối tượng ra khỏi tổng thể.",
      "formula": [{"text": "除了 A 以外，B...", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "除了星期天以外，我每天都工作。", "meaning": "Ngoài Chủ Nhật ra, tôi làm việc mỗi ngày."}]
    }
  ],

  // Bài 4: 8 điểm
  3: [
    {
      "title": "1. Bổ ngữ kết quả: 懂 (Hiểu)",
      "desc": "Nghe/nhìn và hiểu được ý nghĩa.",
      "formula": [{"text": "听懂 / 看懂", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我听懂了。", "meaning": "Tôi nghe hiểu rồi."}]
    },
    {
      "title": "2. Bổ ngữ kết quả: 完 (Xong)",
      "desc": "Hành động đã hoàn tất toàn bộ.",
      "formula": [{"text": "做完 / 写完", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我写完作业了。", "meaning": "Tôi viết xong bài tập rồi."}]
    },
    {
      "title": "3. Bổ ngữ kết quả: 好 (Hoàn thành tốt)",
      "desc": "Hành động xong và đạt kết quả mỹ mãn, sẵn sàng.",
      "formula": [{"text": "做好 / 准备好", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我准备好了。", "meaning": "Tôi đã chuẩn bị xong (sẵn sàng) rồi."}]
    },
    {
      "title": "4. Bổ ngữ kết quả: 到 (Đạt được/Tìm thấy)",
      "desc": "Hành động đạt được mục đích.",
      "formula": [{"text": "找到 / 买到", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我找到了钥匙。", "meaning": "Tôi đã tìm thấy chìa khóa."}]
    },
    {
      "title": "5. Bổ ngữ kết quả: 见 (Cảm nhận bằng giác quan)",
      "desc": "Nhìn thấy, nghe thấy một cách khách quan.",
      "formula": [{"text": "看见 / 听见", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我看见他了。", "meaning": "Tôi đã nhìn thấy anh ấy."}]
    },
    {
      "title": "6. Bổ ngữ kết quả: 在 (Vị trí)",
      "desc": "Hành động làm thay đổi vị trí của đối tượng.",
      "formula": [{"text": "放在 / 坐在", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "书放在桌子上。", "meaning": "Sách được đặt ở trên bàn."}]
    },
    {
      "title": "7. Bổ ngữ kết quả: 给 (Chuyển giao)",
      "desc": "Hành động giao/đưa vật cho người khác.",
      "formula": [{"text": "交给 / 送给", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我把礼物送给他了。", "meaning": "Tôi đã tặng quà cho anh ấy rồi."}]
    },
    {
      "title": "8. Bổ ngữ kết quả: 成 (Thành / Trở thành)",
      "desc": "Hành động làm đối tượng biến đổi thành thứ khác.",
      "formula": [{"text": "翻译成 / 变成", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "把这句话翻译成中文。", "meaning": "Hãy dịch câu này thành tiếng Trung."}]
    }
  ],

  // Bài 5: 9 điểm
  4: [
    {
      "title": "1. Năng lực 1: 会 (Biết do học / Sẽ)",
      "desc": "Chỉ kỹ năng học được hoặc khả năng xảy ra trong tương lai.",
      "formula": [{"text": "会 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我会游泳。", "meaning": "Tôi biết bơi. (Do học)"}]
    },
    {
      "title": "2. Năng lực 2: 能 (Khả năng thực tế)",
      "desc": "Chỉ khả năng thực hiện được do điều kiện chủ quan/khách quan cho phép.",
      "formula": [{"text": "能 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我今天不能去上班。", "meaning": "Hôm nay tôi không thể đi làm."}]
    },
    {
      "title": "3. Năng lực 3: 可以 (Được phép)",
      "desc": "Biểu thị sự cho phép hoặc xin phép.",
      "formula": [{"text": "可以 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我可以进来吗？", "meaning": "Tôi có thể vào không?"}]
    },
    {
      "title": "4. Bổ ngữ khả năng: V + 得 + Kết quả (Làm được)",
      "desc": "Khẳng định có khả năng đạt được kết quả của hành động.",
      "formula": [{"text": "Động từ + 得 + Bổ ngữ kết quả", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我听得懂。", "meaning": "Tôi có thể nghe hiểu được."}]
    },
    {
      "title": "5. Bổ ngữ khả năng: V + 不 + Kết quả (Không làm được)",
      "desc": "Phủ định khả năng đạt được kết quả của hành động.",
      "formula": [{"text": "Động từ + 不 + Bổ ngữ kết quả", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "太多了，我吃不完。", "meaning": "Nhiều quá, tôi không thể ăn hết được."}]
    },
    {
      "title": "6. Phó từ: 又 (Lại - Quá khứ)",
      "desc": "Hành động ĐÃ lặp lại trong quá khứ.",
      "formula": [{"text": "又 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "昨天他来了，今天他又来了。", "meaning": "Hôm qua anh ấy đến, hôm nay anh ấy lại đến nữa."}]
    },
    {
      "title": "7. Phó từ: 再 (Lại - Tương lai)",
      "desc": "Hành động SẼ lặp lại trong tương lai (hoặc câu cầu khiến).",
      "formula": [{"text": "再 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "欢迎下次再来。", "meaning": "Hoan nghênh lần sau lại đến."}]
    },
    {
      "title": "8. Phó từ: 还 (Vẫn / Còn)",
      "desc": "Biểu thị trạng thái đang tiếp diễn, chưa thay đổi.",
      "formula": [{"text": "还 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他还在睡觉。", "meaning": "Anh ấy vẫn đang ngủ."}]
    },
    {
      "title": "9. Phó từ: 已经 (Đã)",
      "desc": "Biểu thị sự việc đã hoàn thành hoặc trạng thái đã xảy ra.",
      "formula": [{"text": "已经 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我已经做完了。", "meaning": "Tôi đã làm xong rồi."}]
    }
  ]
};

const file = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk3-batch1.json');
if (fs.existsSync(file)) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const lesson of data) {
    if (grammarBatch1[lesson.orderIndex]) {
      lesson.grammar = grammarBatch1[lesson.orderIndex];
    }
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Successfully updated 43 highly-detailed grammar points for Batch 1 (Bài 1 - 5).');
} else {
  console.log('File not found:', file);
}

const fs = require('fs');
const path = require('path');

const hsk2GrammarMapping = {
  // BATCH 1 (Bài 1 - Bài 5)
  0: [ // Bài 1
    {
      "title": "1. Yêu cầu, mong muốn: 要",
      "desc": "Biểu đạt nhu cầu, mong muốn có một thứ gì đó.",
      "formula": [{"text": "Chủ ngữ + 要 + Danh từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我要一杯咖啡。", "meaning": "Tôi muốn một ly cà phê."}]
    },
    {
      "title": "2. Sở thích: 喜欢",
      "desc": "Bày tỏ sự yêu thích đối với hành động hoặc sự vật.",
      "formula": [{"text": "Chủ ngữ + 喜欢 + Động từ/Danh từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我喜欢看电影。", "meaning": "Tôi thích xem phim."}]
    },
    {
      "title": "3. Cảm nhận: 觉得",
      "desc": "Dùng để diễn đạt quan điểm, cảm giác cá nhân.",
      "formula": [{"text": "Chủ ngữ + 觉得 + Nhận định", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我觉得很好。", "meaning": "Tôi cảm thấy rất tốt."}]
    }
  ],
  1: [ // Bài 2
    {
      "title": "1. Lời khuyên: 应该",
      "desc": "Đưa ra lời khuyên người khác nên làm gì đó.",
      "formula": [{"text": "Chủ ngữ + 应该 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你应该休息。", "meaning": "Bạn nên nghỉ ngơi."}]
    },
    {
      "title": "2. Cùng nhau: 一起",
      "desc": "Rủ rê hoặc thực hiện hành động cùng với người khác.",
      "formula": [{"text": "我们 + 一起 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我们一起去吧。", "meaning": "Chúng ta cùng đi đi."}]
    },
    {
      "title": "3. Trợ từ ngữ khí: 吧",
      "desc": "Đặt ở cuối câu để đề nghị, rủ rê (nhé, đi, thôi).",
      "formula": [{"text": "Câu đề nghị + 吧", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "走吧。", "meaning": "Đi thôi."}]
    }
  ],
  2: [ // Bài 3
    {
      "title": "1. Hỏi giá: 多少钱",
      "desc": "Cách hỏi giá cả thông dụng nhất.",
      "formula": [{"text": "Đồ vật + 多少钱？", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "这个多少钱？", "meaning": "Cái này bao nhiêu tiền?"}]
    },
    {
      "title": "2. Hỏi số lượng nhỏ: 几",
      "desc": "Dùng để hỏi số lượng thường dưới 10. Bắt buộc phải có Lượng từ.",
      "formula": [{"text": "几 + Lượng từ + Danh từ？", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "几个人？", "meaning": "Mấy người?"}]
    },
    {
      "title": "3. Hỏi số lượng lớn: 多少",
      "desc": "Hỏi số lượng nói chung, có thể không cần Lượng từ.",
      "formula": [{"text": "多少 + (Lượng từ) + Danh từ？", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "多少水？", "meaning": "Bao nhiêu nước?"}]
    }
  ],
  3: [ // Bài 4
    {
      "title": "1. Lựa chọn: 还是",
      "desc": "Dùng trong câu hỏi lựa chọn 'hay là'.",
      "formula": [{"text": "A 还是 B？", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你喝茶还是咖啡？", "meaning": "Bạn uống trà hay uống cà phê?"}]
    },
    {
      "title": "2. Hỏi phương thức: 怎么",
      "desc": "Dùng để hỏi cách thức thực hiện hành động.",
      "formula": [{"text": "怎么 + Động từ？", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你怎么去学校？", "meaning": "Bạn đi đến trường bằng cách nào?"}]
    },
    {
      "title": "3. Hỏi tính chất/ý kiến: 怎么样",
      "desc": "Dùng để hỏi ý kiến, nhận xét về một sự vật/sự việc.",
      "formula": [{"text": "Sự vật/Sự việc + 怎么样？", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "这个菜怎么样？", "meaning": "Món ăn này thế nào?"}]
    }
  ],
  4: [ // Bài 5
    {
      "title": "1. Phương vị từ: 上 / 下 / 前 / 后 / 里",
      "desc": "Chỉ vị trí của sự vật (trên, dưới, trước, sau, trong).",
      "formula": [{"text": "Danh từ + Phương vị từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "书在桌子上。", "meaning": "Sách ở trên bàn."}, {"correct": "在房间里。", "meaning": "Ở trong phòng."}]
    },
    {
      "title": "2. Khoảng cách: 离",
      "desc": "Biểu thị khoảng cách giữa hai địa điểm.",
      "formula": [{"text": "A 离 B 很远/很近", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我家离学校很近。", "meaning": "Nhà tôi cách trường rất gần."}]
    }
  ],

  // BATCH 2 (Bài 6 - Bài 10)
  5: [ // Bài 6
    {
      "title": "1. Đang diễn ra: 正在",
      "desc": "Nhấn mạnh quá trình đang diễn ra (chú trọng về thời gian).",
      "formula": [{"text": "Chủ ngữ + 正在 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我正在吃饭。", "meaning": "Tôi đang ăn cơm."}]
    },
    {
      "title": "2. Đang diễn ra: 在",
      "desc": "Biểu thị hành động đang được thực hiện (chú trọng về trạng thái hành động).",
      "formula": [{"text": "Chủ ngữ + 在 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他在学习。", "meaning": "Anh ấy đang học."}]
    }
  ],
  6: [ // Bài 7
    {
      "title": "1. Quá... : 太…了",
      "desc": "Biểu thị mức độ cao, thường đi kèm cảm thán hoặc than phiền.",
      "formula": [{"text": "太 + Tính từ + 了", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "太贵了！", "meaning": "Đắt quá!"}]
    },
    {
      "title": "2. Thật là... : 真",
      "desc": "Dùng trong câu cảm thán, khen ngợi từ đáy lòng.",
      "formula": [{"text": "真 + Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "真漂亮！", "meaning": "Đẹp thật!"}]
    },
    {
      "title": "3. Hơi... : 有点",
      "desc": "Chỉ mức độ nhẹ nhưng thường mang nghĩa không hài lòng, tiêu cực.",
      "formula": [{"text": "有点(儿) + Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "有点累。", "meaning": "Hơi mệt."}]
    }
  ],
  7: [ // Bài 8
    {
      "title": "1. Cũng: 也",
      "desc": "Biểu thị sự việc có tính chất giống với sự việc trước đó.",
      "formula": [{"text": "Chủ ngữ + 也 + Động từ/Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我也去。", "meaning": "Tôi cũng đi."}]
    },
    {
      "title": "2. Đều, tất cả: 都",
      "desc": "Gộp tất cả đối tượng ở phía trước.",
      "formula": [{"text": "Chủ ngữ số nhiều + 都 + Động từ/Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我们都来了。", "meaning": "Tất cả chúng tôi đều đến rồi."}]
    },
    {
      "title": "3. Vẫn, còn: 还",
      "desc": "Biểu thị hành động/trạng thái đang tiếp diễn chưa dừng lại.",
      "formula": [{"text": "还 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他还没来。", "meaning": "Anh ấy vẫn chưa đến."}]
    }
  ],
  8: [ // Bài 9
    {
      "title": "1. Biết / Sẽ: 会",
      "desc": "Biết làm gì đó nhờ học tập. Hoặc dự báo 'sẽ' làm gì.",
      "formula": [{"text": "会 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我会说汉语。", "meaning": "Tôi biết nói tiếng Trung."}, {"correct": "明天会下雨。", "meaning": "Ngày mai sẽ mưa."}]
    },
    {
      "title": "2. Có khả năng: 能",
      "desc": "Khả năng thực tế cho phép thực hiện việc gì.",
      "formula": [{"text": "能 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我今天不能去。", "meaning": "Hôm nay tôi không thể đi."}]
    },
    {
      "title": "3. Có thể / Được phép: 可以",
      "desc": "Sự cho phép làm gì đó.",
      "formula": [{"text": "可以 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你可以进来。", "meaning": "Bạn có thể vào."}]
    },
    {
      "title": "4. Muốn: 想",
      "desc": "Suy nghĩ, dự định hoặc mong muốn làm một việc.",
      "formula": [{"text": "想 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我想喝茶。", "meaning": "Tôi muốn uống trà."}]
    }
  ],
  9: [ // Bài 10
    {
      "title": "1. Thường xuyên: 常常",
      "desc": "Biểu thị tần suất hành động thường diễn ra.",
      "formula": [{"text": "常常 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我常常游泳。", "meaning": "Tôi thường xuyên bơi."}]
    },
    {
      "title": "2. Liên tục: 一直",
      "desc": "Hành động diễn ra liên tục không ngừng.",
      "formula": [{"text": "一直 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他一直工作。", "meaning": "Anh ấy làm việc liên tục."}]
    },
    {
      "title": "3. Lại: 再",
      "desc": "Biểu thị hành động lặp lại trong tương lai.",
      "formula": [{"text": "再 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "请再说一次。", "meaning": "Xin nói lại lần nữa."}]
    }
  ],

  // BATCH 3 (Bài 11 - Bài 15)
  10: [ // Bài 11
    {
      "title": "1. So sánh hơn: 比",
      "desc": "A có mức độ cao hơn B.",
      "formula": [{"text": "A + 比 + B + Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他比我高。", "meaning": "Anh ấy cao hơn tôi."}, {"correct": "今天比昨天热。", "meaning": "Hôm nay nóng hơn hôm qua."}]
    },
    {
      "title": "2. So sánh kém: 没有…那么…",
      "desc": "A không đạt được đến mức độ như B.",
      "formula": [{"text": "A + 没有 + B + 那么 + Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我没有他那么高。", "meaning": "Tôi không cao bằng anh ấy."}]
    }
  ],
  11: [ // Bài 12
    {
      "title": "1. Trình tự: 先…然后…",
      "desc": "Sắp xếp thứ tự hành động (Trước tiên... sau đó).",
      "formula": [{"text": "先 + Hành động 1，然后 + Hành động 2", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我先洗澡，然后睡觉。", "meaning": "Tôi tắm trước rồi ngủ."}]
    },
    {
      "title": "2. Thời gian: …以后",
      "desc": "Sau khi sự việc diễn ra.",
      "formula": [{"text": "Hành động/Sự việc + 以后", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "吃饭以后去学校。", "meaning": "Sau khi ăn thì đi trường học."}]
    },
    {
      "title": "3. Từ... đến... : 从…到…",
      "desc": "Chỉ điểm bắt đầu và kết thúc của không gian/thời gian.",
      "formula": [{"text": "从 A 到 B", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "从学校到医院。", "meaning": "Từ trường học đến bệnh viện."}]
    }
  ],
  12: [ // Bài 13
    {
      "title": "1. Nguyên nhân - kết quả: 因为…所以…",
      "desc": "Bởi vì... cho nên...",
      "formula": [{"text": "因为 + Nguyên nhân，所以 + Kết quả", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "因为下雨，所以我不去。", "meaning": "Vì trời mưa nên tôi không đi."}]
    },
    {
      "title": "2. Liền / Đã: 就",
      "desc": "Nhấn mạnh hành động xảy ra sớm, nhanh chóng hoặc nối tiếp nhau.",
      "formula": [{"text": "Thời gian + 就 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我六点就起床。", "meaning": "Tôi 6 giờ đã dậy rồi."}]
    }
  ],
  13: [ // Bài 14
    {
      "title": "1. Câu liên động đơn giản (连动句)",
      "desc": "Hai động từ nối tiếp nhau, cùng một chủ ngữ. Động từ 2 thường mang ý nghĩa mục đích.",
      "formula": [{"text": "Chủ ngữ + V1 (Đi/Đến...) + V2 (Mục đích)", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我去商店买东西。", "meaning": "Tôi đi cửa hàng mua đồ."}, {"correct": "他坐车上班。", "meaning": "Anh ấy đi xe đi làm (V1 là phương thức)."}]
    }
  ],
  14: [ // Bài 15
    {
      "title": "1. Bổ ngữ kết thúc: 完",
      "desc": "Báo hiệu hành động đã hoàn tất.",
      "formula": [{"text": "Động từ + 完", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我吃完了。", "meaning": "Tôi ăn xong rồi."}]
    },
    {
      "title": "2. Bổ ngữ đạt được: 到",
      "desc": "Báo hiệu hành động đã tìm thấy, đạt được mục đích.",
      "formula": [{"text": "Động từ + 到", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我找到了。", "meaning": "Tôi tìm thấy rồi."}]
    }
  ]
};

const baseDir = 'F:\\Projects\\ThuongTra-VanHoc\\edu-platform';
const files = ['hsk2-batch1.json', 'hsk2-batch2.json', 'hsk2-batch3.json'];

for (const f of files) {
  const p = path.join(baseDir, f);
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const lesson of data) {
      if (hsk2GrammarMapping[lesson.orderIndex]) {
        lesson.grammar = hsk2GrammarMapping[lesson.orderIndex];
      }
    }
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully updated grammar for ${f}`);
  }
}

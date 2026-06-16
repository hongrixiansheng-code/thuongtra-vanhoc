const fs = require('fs');
const path = require('path');

const newGrammar = {
  // Batch 1
  0: [
    {
      "title": "3. Phân biệt 还是 (háishì) và 或者 (huòzhě)",
      "desc": "Cả hai đều có nghĩa là 'hoặc, hay là'. '还是' dùng trong câu hỏi lựa chọn. '或者' dùng trong câu trần thuật.",
      "formula": [
        {"text": "A", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "还是 / 或者", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "B", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "你喝茶还是喝咖啡？", "meaning": "Bạn uống trà hay uống cà phê? (Câu hỏi)"},
        {"correct": "明天我坐火车或者坐飞机去。", "meaning": "Ngày mai tôi ngồi tàu hỏa hoặc máy bay đi. (Trần thuật)"}
      ]
    }
  ],
  1: [
    {
      "title": "2. Cấu trúc 从… 到… (Từ đâu... đến đâu...)",
      "desc": "Dùng để biểu đạt điểm bắt đầu và điểm kết thúc của một khoảng thời gian hoặc một khoảng cách (không gian).",
      "formula": [
        {"text": "从", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "A", "classes": "border-gray-200 bg-gray-50 text-gray-700"},
        {"text": "到", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "B", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "我从早上八点到下午五点工作。", "meaning": "Tôi làm việc từ 8 giờ sáng đến 5 giờ chiều."},
        {"correct": "从我家到学校很远。", "meaning": "Từ nhà tôi đến trường rất xa."}
      ]
    }
  ],
  2: [
    {
      "title": "2. Cấu trúc 越… 越… (Càng... càng...)",
      "desc": "Dùng để biểu đạt mức độ của vế sau thay đổi theo sự phát triển của vế trước.",
      "formula": [
        {"text": "越", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "A (Động từ/Tính từ)", "classes": "border-green-200 bg-green-50 text-green-700"},
        {"text": "越", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "B (Tính từ/Động từ)", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"}
      ],
      "practiceList": [
        {"correct": "雨越下越大。", "meaning": "Mưa càng lúc càng lớn."},
        {"correct": "这本书我越看越喜欢。", "meaning": "Cuốn sách này tôi càng xem càng thích."}
      ]
    }
  ],
  3: [
    {
      "title": "2. Cấu trúc 极了 (Cực kỳ, vô cùng)",
      "desc": "Dùng để nhấn mạnh mức độ cực cao của tính từ hoặc động từ tâm lý, thường đứng cuối câu.",
      "formula": [
        {"text": "Tính từ / Động từ tâm lý", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "极了", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "今天的天气好极了！", "meaning": "Thời tiết hôm nay tốt cực kỳ!"},
        {"correct": "听到这个消息，我高兴极了。", "meaning": "Nghe được tin này, tôi vui vô cùng."}
      ]
    }
  ],
  4: [
    {
      "title": "2. Cấu trúc 虽然… 但是… (Tuy... nhưng...)",
      "desc": "Dùng trong câu phức biểu đạt quan hệ nhượng bộ (chuyển ngoặt). Nêu lên một sự thật và kết quả ngược lại với suy nghĩ thông thường.",
      "formula": [
        {"text": "虽然", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "Sự thật", "classes": "border-green-200 bg-green-50 text-green-700"},
        {"text": "，但是", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Chuyển ngoặt", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"}
      ],
      "practiceList": [
        {"correct": "虽然外面下雨，但是我们还要去上课。", "meaning": "Tuy bên ngoài trời mưa, nhưng chúng tôi vẫn phải đi học."},
        {"correct": "虽然他很累，但是没有休息。", "meaning": "Mặc dù anh ấy rất mệt, nhưng không nghỉ ngơi."}
      ]
    }
  ],
  // Batch 2
  5: [
    {
      "title": "2. Bổ ngữ xu hướng đơn (来/去)",
      "desc": "Đứng sau động từ để chỉ hướng của hành động. '来' (lại đây) hướng về phía người nói. '去' (đi ra) hướng ra xa người nói.",
      "formula": [
        {"text": "Động từ (进, 出, 上, 下, 回, 过, 起)", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "来 / 去", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "请进来！", "meaning": "Xin mời vào! (Người nói đang ở trong phòng)"},
        {"correct": "他下楼去了。", "meaning": "Anh ấy xuống lầu rồi. (Người nói đang ở trên lầu)"}
      ]
    }
  ],
  6: [
    {
      "title": "2. Đại từ nghi vấn dùng như đại từ phiếm chỉ",
      "desc": "Các đại từ như 谁 (ai), 什么 (cái gì), 哪儿 (ở đâu) kết hợp với 都/也 mang nghĩa 'Bất cứ ai / Bất cứ cái gì / Bất cứ đâu'.",
      "formula": [
        {"text": "谁 / 什么 / 哪儿", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "都 / 也", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Không làm / Làm gì đó", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "我什么都不想吃。", "meaning": "Tôi không muốn ăn bất cứ thứ gì."},
        {"correct": "周末我哪儿也没去。", "meaning": "Cuối tuần tôi không đi bất cứ đâu."}
      ]
    }
  ],
  7: [
    {
      "title": "2. Cấu trúc 只要… 就… (Chỉ cần... thì...)",
      "desc": "Dùng để biểu đạt điều kiện đủ. Chỉ cần đáp ứng điều kiện ở vế '只要', thì kết quả ở vế '就' chắc chắn sẽ xảy ra.",
      "formula": [
        {"text": "只要", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "Điều kiện", "classes": "border-green-200 bg-green-50 text-green-700"},
        {"text": "，就", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Kết quả", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"}
      ],
      "practiceList": [
        {"correct": "只要你努力，就能成功。", "meaning": "Chỉ cần bạn nỗ lực, thì có thể thành công."},
        {"correct": "只要明天不下雨，我们就去爬山。", "meaning": "Chỉ cần ngày mai không mưa, thì chúng tôi sẽ đi leo núi."}
      ]
    }
  ],
  8: [
    {
      "title": "2. Bổ ngữ khả năng (得 / 不)",
      "desc": "Thêm '得' hoặc '不' vào giữa Động từ và Bổ ngữ kết quả/xu hướng để biểu thị có khả năng hay không có khả năng làm gì đó.",
      "formula": [
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "得 / 不", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Bổ ngữ (完, 懂, 清楚...)", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "老师说的话，你听得懂吗？", "meaning": "Lời giáo viên nói, bạn nghe có hiểu (nghe được) không?"},
        {"correct": "太多了，我吃不完。", "meaning": "Nhiều quá, tôi ăn không hết (không thể ăn xong)."}
      ]
    }
  ],
  9: [
    {
      "title": "2. Cấu trúc 连… 都/也… (Ngay cả... cũng...)",
      "desc": "Dùng để nhấn mạnh một sự việc cực đoan, thường mang ý phóng đại. '连' đứng trước từ được nhấn mạnh.",
      "formula": [
        {"text": "连", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "Đối tượng nhấn mạnh", "classes": "border-green-200 bg-green-50 text-green-700"},
        {"text": "都 / 也", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"}
      ],
      "practiceList": [
        {"correct": "他太忙了，连喝水的时间都没有。", "meaning": "Anh ấy quá bận, ngay cả thời gian uống nước cũng không có."},
        {"correct": "这个问题太难了，连老师也不会做。", "meaning": "Câu hỏi này khó quá, ngay cả giáo viên cũng không biết làm."}
      ]
    }
  ],
  // Batch 3
  10: [
    {
      "title": "2. Cấu trúc 不但… 而且… (Không những... mà còn...)",
      "desc": "Tương tự như 不仅… 而且…, dùng để biểu thị ý nghĩa bổ sung tăng tiến. Có thể kết hợp thêm 还 / 也.",
      "formula": [
        {"text": "不但", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "A", "classes": "border-green-200 bg-green-50 text-green-700"},
        {"text": "，而且 (还/也)", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "B", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"}
      ],
      "practiceList": [
        {"correct": "他不但会说英语，而且还会说法语。", "meaning": "Anh ấy không những biết nói tiếng Anh, mà còn biết nói tiếng Pháp."},
        {"correct": "这里的风景不但很美，而且人也很热情。", "meaning": "Phong cảnh ở đây không những rất đẹp, mà con người cũng rất nhiệt tình."}
      ]
    }
  ],
  11: [
    {
      "title": "2. Bổ ngữ thời lượng (Chỉ thời gian kéo dài)",
      "desc": "Dùng để biểu thị một hành động kéo dài trong bao lâu. Bổ ngữ thời lượng (một giờ, hai ngày,...) thường đứng ngay sau động từ.",
      "formula": [
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "(了)", "classes": "border-gray-200 bg-gray-50 text-gray-700"},
        {"text": "Thời lượng (VD: 一个小时)", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "(的 + Danh từ)", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "我们在北京玩了三天。", "meaning": "Chúng tôi đã chơi ở Bắc Kinh 3 ngày."},
        {"correct": "我每天学习两个小时的汉语。", "meaning": "Mỗi ngày tôi học tiếng Trung 2 tiếng đồng hồ."}
      ]
    }
  ],
  12: [
    {
      "title": "2. Phân biệt 又 (yòu) và 再 (zài) - Lại",
      "desc": "Cả hai đều có nghĩa là 'lại'. Nhưng '又' dùng cho hành động ĐÃ LẶP LẠI (xảy ra rồi), còn '再' dùng cho hành động SẼ LẶP LẠI (chưa xảy ra).",
      "formula": [
        {"text": "又 / 再", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "昨天他来了，今天他又来了。", "meaning": "Hôm qua anh ấy đến rồi, hôm nay anh ấy lại đến nữa. (Đã xảy ra -> 又)"},
        {"correct": "这个菜很好吃，我明天要再吃一次。", "meaning": "Món này ngon quá, ngày mai tôi muốn ăn lại một lần nữa. (Sẽ xảy ra -> 再)"}
      ]
    }
  ],
  13: [
    {
      "title": "2. Cấu trúc 只有… 才… (Chỉ có... mới...)",
      "desc": "Dùng để biểu đạt điều kiện duy nhất. Chỉ khi có điều kiện '只有' thì kết quả '才' mới có thể xảy ra.",
      "formula": [
        {"text": "只有", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "Điều kiện duy nhất", "classes": "border-green-200 bg-green-50 text-green-700"},
        {"text": "，才", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Kết quả", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"}
      ],
      "practiceList": [
        {"correct": "只有多听多说，才能学好外语。", "meaning": "Chỉ có nghe nhiều nói nhiều, mới có thể học tốt ngoại ngữ."},
        {"correct": "只有周末，他才有时间看电视。", "meaning": "Chỉ có cuối tuần, anh ấy mới có thời gian xem tivi."}
      ]
    }
  ],
  14: [
    {
      "title": "2. Các phó từ thường gặp: 终于, 几乎, 已经",
      "desc": "终于 (Cuối cùng cũng - kết quả mong đợi sau quá trình dài), 几乎 (Hầu như, suýt nữa), 已经 (Đã - sự việc xảy ra sớm hơn dự định).",
      "formula": [
        {"text": "终于 / 几乎 / 已经", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ / Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "考完试了，我终于可以休息了。", "meaning": "Thi xong rồi, tôi cuối cùng cũng có thể nghỉ ngơi rồi."},
        {"correct": "我几乎忘记了他的名字。", "meaning": "Tôi hầu như (suýt chút nữa) đã quên mất tên của anh ấy."},
        {"correct": "我们已经到了。", "meaning": "Chúng tôi đã đến rồi."}
      ]
    }
  ]
};

const baseDir = 'F:\\Projects\\ThuongTra-VanHoc\\edu-platform';
const batches = ['hsk3-batch1.json', 'hsk3-batch2.json', 'hsk3-batch3.json'];

for (const batchFile of batches) {
  const p = path.join(baseDir, batchFile);
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const lesson of data) {
      if (newGrammar[lesson.orderIndex]) {
        // Only add if not already added to avoid duplicates
        const existingTitles = lesson.grammar.map(g => g.title);
        for (const newG of newGrammar[lesson.orderIndex]) {
          if (!existingTitles.includes(newG.title)) {
            lesson.grammar.push(newG);
          }
        }
      }
    }
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
    console.log('Updated ' + batchFile);
  }
}

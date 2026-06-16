const fs = require('fs');
const path = require('path');

const grammarBatch1 = {
  // Bài 1
  0: [
    {
      "title": "1. Trợ từ thể: 了 (Hành động đã hoàn thành)",
      "desc": "Đứng ngay sau động từ để biểu thị hành động đã xảy ra và hoàn thành trong quá khứ.",
      "formula": [
        {"text": "Chủ ngữ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "Động từ", "classes": "border-green-200 bg-green-50 text-green-700"},
        {"text": "了", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "(Tân ngữ)", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"}
      ],
      "practiceList": [
        {"correct": "我吃饭了。", "meaning": "Tôi đã ăn cơm rồi."},
        {"correct": "他买了一本书。", "meaning": "Anh ấy đã mua một cuốn sách."}
      ]
    },
    {
      "title": "2. Trợ từ thể: 过 (Trải nghiệm trong quá khứ)",
      "desc": "Đứng ngay sau động từ để diễn tả một hành động đã từng xảy ra (trải nghiệm) trong quá khứ và không còn tiếp diễn ở hiện tại.",
      "formula": [
        {"text": "Chủ ngữ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "Động từ", "classes": "border-green-200 bg-green-50 text-green-700"},
        {"text": "过", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "(Tân ngữ)", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"}
      ],
      "practiceList": [
        {"correct": "我去过北京。", "meaning": "Tôi đã từng đi Bắc Kinh."},
        {"correct": "我看过这个电影。", "meaning": "Tôi đã từng xem bộ phim này."}
      ]
    },
    {
      "title": "3. Trợ từ thể: 着 (Trạng thái đang tiếp diễn)",
      "desc": "Đứng sau động từ để diễn tả một trạng thái đang diễn ra và duy trì ổn định (thường dùng để miêu tả tình huống).",
      "formula": [
        {"text": "Chủ ngữ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "Động từ", "classes": "border-green-200 bg-green-50 text-green-700"},
        {"text": "着", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "(Tân ngữ)", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"}
      ],
      "practiceList": [
        {"correct": "门开着。", "meaning": "Cửa đang mở."},
        {"correct": "他笑着说：“你好！”", "meaning": "Anh ấy mỉm cười và nói: 'Xin chào!'."}
      ]
    }
  ],
  // Bài 2
  1: [
    {
      "title": "1. Câu tồn hiện (Existential Sentences)",
      "desc": "Dùng để giới thiệu hoặc miêu tả ở một địa điểm nào đó có tồn tại người hoặc vật gì. Chú ý từ chỉ địa điểm đóng vai trò như chủ ngữ.",
      "formula": [
        {"text": "Từ chỉ địa điểm", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "有 / 是", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Danh từ (Người/Vật)", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "桌子上有一本书。", "meaning": "Trên bàn có một cuốn sách."},
        {"correct": "房间里有很多人。", "meaning": "Trong phòng có rất nhiều người."},
        {"correct": "我家前面是一个公园。", "meaning": "Phía trước nhà tôi là một công viên."}
      ]
    }
  ],
  // Bài 3
  2: [
    {
      "title": "1. Động từ năng nguyện: 应该 (Nên)",
      "desc": "Biểu thị sự khuyên bảo, đưa ra lời khuyên người khác nên làm gì đó vì điều đó đúng đắn.",
      "formula": [
        {"text": "Chủ ngữ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "应该", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "你生病了，应该多休息。", "meaning": "Bạn bị ốm rồi, nên nghỉ ngơi nhiều hơn."},
        {"correct": "我们应该早点儿出发。", "meaning": "Chúng ta nên xuất phát sớm một chút."}
      ]
    },
    {
      "title": "2. Động từ năng nguyện: 愿意 (Sẵn lòng)",
      "desc": "Biểu thị sự đồng ý, tự nguyện và mong muốn làm một việc gì đó từ tận đáy lòng.",
      "formula": [
        {"text": "Chủ ngữ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "愿意", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "我愿意帮助你。", "meaning": "Tôi sẵn lòng giúp đỡ bạn."},
        {"correct": "他不愿意去那里。", "meaning": "Anh ấy không sẵn lòng (không muốn) đi đến đó."}
      ]
    },
    {
      "title": "3. Động từ năng nguyện: 必须 (Bắt buộc phải)",
      "desc": "Biểu thị sự bắt buộc về mặt khách quan hoặc mệnh lệnh mạnh mẽ, không có lựa chọn khác.",
      "formula": [
        {"text": "Chủ ngữ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "必须", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "明天早上你必须八点到公司。", "meaning": "Sáng mai bạn bắt buộc phải đến công ty lúc 8 giờ."},
        {"correct": "这个问题必须今天解决。", "meaning": "Vấn đề này bắt buộc phải giải quyết trong hôm nay."}
      ]
    }
  ],
  // Bài 4
  3: [
    {
      "title": "1. Bổ ngữ kết quả: 懂 (Hiểu)",
      "desc": "Đứng sau động từ (thường là 听, 看) để chỉ kết quả của hành động là đã tiếp thu và hiểu được nội dung.",
      "formula": [
        {"text": "听 / 看", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "懂", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "(了)", "classes": "border-gray-200 bg-gray-50 text-gray-700"}
      ],
      "practiceList": [
        {"correct": "老师说的话我听懂了。", "meaning": "Lời giáo viên nói tôi đã nghe hiểu rồi."},
        {"correct": "你看懂这本书了吗？", "meaning": "Bạn đã đọc hiểu cuốn sách này chưa?"}
      ]
    },
    {
      "title": "2. Bổ ngữ kết quả: 完 (Xong, hết)",
      "desc": "Đứng sau động từ để chỉ hành động đã kết thúc, hoàn tất toàn bộ quá trình.",
      "formula": [
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "完", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "(了)", "classes": "border-gray-200 bg-gray-50 text-gray-700"}
      ],
      "practiceList": [
        {"correct": "我写完作业了。", "meaning": "Tôi đã viết xong bài tập rồi."},
        {"correct": "电影看完了。", "meaning": "Phim đã xem xong rồi."}
      ]
    },
    {
      "title": "3. Bổ ngữ kết quả: 好 (Hoàn thành tốt)",
      "desc": "Không chỉ biểu thị hành động đã xong, mà còn hàm ý kết quả đạt được sự hoàn hảo, sẵn sàng cho bước tiếp theo.",
      "formula": [
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "好", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "(了)", "classes": "border-gray-200 bg-gray-50 text-gray-700"}
      ],
      "practiceList": [
        {"correct": "我准备好了。", "meaning": "Tôi đã chuẩn bị xong (sẵn sàng) rồi."},
        {"correct": "晚饭做好了，大家来吃吧。", "meaning": "Bữa tối nấu xong rồi (ngon lành rồi), mọi người đến ăn đi."}
      ]
    },
    {
      "title": "4. Bổ ngữ kết quả: 到 (Đạt được)",
      "desc": "Chỉ hành động đã đạt được mục đích, chạm tới điểm đến hoặc tìm thấy đối tượng mong muốn.",
      "formula": [
        {"text": "Động từ (找, 买, 看...)", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "到", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "(Tân ngữ)", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "我找到了我的钥匙。", "meaning": "Tôi đã tìm thấy chìa khóa của tôi rồi."},
        {"correct": "他买到了那本书。", "meaning": "Anh ấy đã mua được cuốn sách đó."}
      ]
    }
  ],
  // Bài 5
  4: [
    {
      "title": "1. Khả năng học hỏi: 会 (Biết / Sẽ)",
      "desc": "Biểu thị năng lực hoặc kỹ năng có được thông qua quá trình học tập, rèn luyện. Đồng thời cũng có nghĩa dự đoán điều gì 'sẽ' xảy ra.",
      "formula": [
        {"text": "会", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "我会游泳。", "meaning": "Tôi biết bơi. (Do học mà biết)"},
        {"correct": "明天会下雨吗？", "meaning": "Ngày mai có mưa không? (Dự đoán tương lai)"}
      ]
    },
    {
      "title": "2. Năng lực thực tại: 能 (Có khả năng)",
      "desc": "Biểu thị khả năng thực hiện một việc gì đó do điều kiện chủ quan/khách quan cho phép ở hiện tại.",
      "formula": [
        {"text": "能", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "我今天不能去上班。", "meaning": "Hôm nay tôi không thể đi làm (do ốm hoặc bận)."},
        {"correct": "一分钟你能游多少米？", "meaning": "Một phút bạn có thể bơi được bao nhiêu mét?"}
      ]
    },
    {
      "title": "3. Sự cho phép: 可以 (Được phép)",
      "desc": "Biểu thị sự cho phép (được phép làm gì) hoặc xin phép từ người khác.",
      "formula": [
        {"text": "可以", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "这里不可以抽烟。", "meaning": "Ở đây không được phép hút thuốc."},
        {"correct": "我可以进来吗？", "meaning": "Tôi có thể (được phép) vào không?"}
      ]
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
  console.log('Successfully updated highly-detailed grammar for Batch 1 (Bài 1 - 5).');
} else {
  console.log('File not found:', file);
}

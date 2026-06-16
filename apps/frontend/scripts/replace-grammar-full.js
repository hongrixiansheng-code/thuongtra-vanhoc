const fs = require('fs');
const path = require('path');

const newGrammarMapping = {
  // Bài 1: Trợ từ thể
  0: [
    {
      "title": "1. Trợ từ thể: 了 (Đã hoàn thành)",
      "desc": "Biểu thị hành động đã xảy ra hoặc hoàn thành.",
      "formula": [
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "了", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "我吃饭了。", "meaning": "Tôi đã ăn cơm rồi."}
      ]
    },
    {
      "title": "2. Trợ từ thể: 过 (Trải nghiệm)",
      "desc": "Biểu thị hành động đã từng xảy ra trong quá khứ (một trải nghiệm).",
      "formula": [
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "过", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "我去过北京。", "meaning": "Tôi đã từng đến Bắc Kinh."}
      ]
    },
    {
      "title": "3. Trợ từ thể: 着 (Đang tiếp diễn)",
      "desc": "Biểu thị trạng thái đang diễn ra hoặc đang được duy trì.",
      "formula": [
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "着", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "门开着。", "meaning": "Cửa đang mở (đang trong trạng thái mở)."}
      ]
    }
  ],
  // Bài 2: Câu tồn hiện
  1: [
    {
      "title": "1. Câu tồn hiện (Place + 有 + Noun)",
      "desc": "Diễn tả ở một nơi nào đó có tồn tại người hoặc vật gì đó.",
      "formula": [
        {"text": "Địa điểm", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "有", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Danh từ", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "桌子上有一本书。", "meaning": "Trên bàn có một cuốn sách."},
        {"correct": "房间里有很多人。", "meaning": "Trong phòng có rất nhiều người."}
      ]
    }
  ],
  // Bài 3: Động từ năng nguyện
  2: [
    {
      "title": "1. Động từ năng nguyện: 应该 (Nên)",
      "desc": "Biểu thị sự khuyên bảo, nên làm gì.",
      "formula": [
        {"text": "应该", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "你应该休息。", "meaning": "Bạn nên nghỉ ngơi."}
      ]
    },
    {
      "title": "2. Động từ năng nguyện: 愿意 (Sẵn lòng)",
      "desc": "Biểu thị sự bằng lòng, tự nguyện làm gì.",
      "formula": [
        {"text": "愿意", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "我愿意帮你。", "meaning": "Tôi sẵn lòng giúp bạn."}
      ]
    },
    {
      "title": "3. Động từ năng nguyện: 必须 (Phải)",
      "desc": "Biểu thị sự bắt buộc.",
      "formula": [
        {"text": "必须", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "你必须去。", "meaning": "Bạn bắt buộc phải đi."}
      ]
    }
  ],
  // Bài 4: Bổ ngữ kết quả
  3: [
    {
      "title": "1. Bổ ngữ kết quả: 懂 (Hiểu)",
      "desc": "Chỉ kết quả của hành động nghe, nhìn,... dẫn đến việc hiểu.",
      "formula": [
        {"text": "听 / 看", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "懂", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "我听懂了。", "meaning": "Tôi nghe hiểu rồi."}
      ]
    },
    {
      "title": "2. Bổ ngữ kết quả: 完 (Xong)",
      "desc": "Chỉ kết quả của hành động đã hoàn tất.",
      "formula": [
        {"text": "做 / 写 / 看", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "完", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "我写完作业了。", "meaning": "Tôi đã viết xong bài tập rồi."}
      ]
    },
    {
      "title": "3. Bổ ngữ kết quả: 好 (Hoàn thành tốt)",
      "desc": "Chỉ hành động hoàn thành và đạt kết quả tốt, sẵn sàng.",
      "formula": [
        {"text": "准备 / 做", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "好", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "我准备好了。", "meaning": "Tôi chuẩn bị xong (sẵn sàng) rồi."}
      ]
    },
    {
      "title": "4. Bổ ngữ kết quả: 到 (Đạt được)",
      "desc": "Chỉ hành động đạt được mục đích, tìm thấy.",
      "formula": [
        {"text": "找 / 买", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "到", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "我找到了钥匙。", "meaning": "Tôi tìm thấy chìa khóa rồi."}
      ]
    }
  ],
  // Bài 5: Cấu trúc diễn tả khả năng
  4: [
    {
      "title": "1. Khả năng: 会 (Biết / Sẽ)",
      "desc": "Chỉ kỹ năng học được hoặc khả năng xảy ra trong tương lai.",
      "formula": [
        {"text": "会", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "我会游泳。", "meaning": "Tôi biết bơi."}
      ]
    },
    {
      "title": "2. Khả năng: 能 (Có khả năng)",
      "desc": "Chỉ khả năng thực hiện được do điều kiện khách quan cho phép.",
      "formula": [
        {"text": "能", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "我今天不能去。", "meaning": "Hôm nay tôi không thể đi (do bận hoặc lý do khách quan)."}
      ]
    },
    {
      "title": "3. Khả năng: 可以 (Được phép / Có thể)",
      "desc": "Chỉ sự cho phép hoặc khả năng.",
      "formula": [
        {"text": "可以", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "你可以进来。", "meaning": "Bạn có thể (được phép) vào đây."}
      ]
    }
  ],
  // Bài 6: Nhấn mạnh thời gian
  5: [
    {
      "title": "1. Nhấn mạnh thời gian: ...的时候 (Khi...)",
      "desc": "Chỉ thời điểm xảy ra hành động.",
      "formula": [
        {"text": "Hành động / Thời gian", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "的时候", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "吃饭的时候不要看手机。", "meaning": "Khi ăn cơm đừng xem điện thoại."}
      ]
    },
    {
      "title": "2. Nhấn mạnh thời gian: ...以后 (Sau khi...)",
      "desc": "Chỉ thời điểm sau khi hoàn thành một hành động.",
      "formula": [
        {"text": "Hành động / Thời gian", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "以后", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "下课以后我回家。", "meaning": "Sau khi tan học tôi về nhà."}
      ]
    },
    {
      "title": "3. Nhấn mạnh thời gian: ...以前 (Trước khi...)",
      "desc": "Chỉ thời điểm trước khi bắt đầu hành động.",
      "formula": [
        {"text": "Hành động / Thời gian", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "以前", "classes": "border-red-200 bg-red-50 text-red-700"}
      ],
      "practiceList": [
        {"correct": "睡觉以前看书。", "meaning": "Đọc sách trước khi đi ngủ."}
      ]
    }
  ],
  // Bài 7: Câu chữ 把
  6: [
    {
      "title": "1. Câu chữ 把 (Nhấn mạnh xử lý/tác động)",
      "desc": "Dùng để nhấn mạnh sự tác động của chủ thể lên một đối tượng, làm nó thay đổi vị trí hoặc trạng thái.",
      "formula": [
        {"text": "Chủ ngữ", "classes": "border-gray-200 bg-gray-50 text-gray-700"},
        {"text": "把", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Tân ngữ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "Động từ + Thành phần phụ", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "我把书放在桌子上。", "meaning": "Tôi đặt sách lên trên bàn."},
        {"correct": "他把门打开了。", "meaning": "Anh ấy đã mở cửa ra."},
        {"correct": "我把钱包丢了。", "meaning": "Tôi làm mất ví tiền rồi."}
      ]
    }
  ],
  // Bài 8: Câu bị động 被
  7: [
    {
      "title": "1. Câu chữ 被 (Câu bị động)",
      "desc": "Diễn tả chủ thể là đối tượng chịu sự tác động. Thường dùng trong các tình huống không mong muốn.",
      "formula": [
        {"text": "Chủ thể (bị tác động)", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "被", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Tác nhân gây ra", "classes": "border-gray-200 bg-gray-50 text-gray-700"},
        {"text": "Động từ", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "我的手机被偷了。", "meaning": "Điện thoại của tôi bị trộm rồi."},
        {"correct": "他被老师表扬了。", "meaning": "Anh ấy được giáo viên tuyên dương. (ngoại lệ dùng cho việc tốt)"}
      ]
    }
  ],
  // Bài 9: So sánh nâng cao
  8: [
    {
      "title": "1. So sánh hơn: 比",
      "desc": "Dùng để so sánh sự khác biệt giữa hai đối tượng.",
      "formula": [
        {"text": "A", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "比", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "B", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"},
        {"text": "Tính từ", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "他比我高。", "meaning": "Anh ấy cao hơn tôi."}
      ]
    },
    {
      "title": "2. So sánh kém: 没有…那么…",
      "desc": "Dùng để so sánh kém.",
      "formula": [
        {"text": "A", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "没有", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "B", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"},
        {"text": "那么 + Tính từ", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "我没有他那么高。", "meaning": "Tôi không cao bằng anh ấy."}
      ]
    },
    {
      "title": "3. Sự thay đổi: 越来越…",
      "desc": "Càng ngày càng... diễn tả sự thay đổi tăng dần.",
      "formula": [
        {"text": "越来越", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "Tính từ / Động từ tâm lý", "classes": "border-blue-200 bg-blue-50 text-blue-700"}
      ],
      "practiceList": [
        {"correct": "天气越来越冷。", "meaning": "Thời tiết càng ngày càng lạnh."},
        {"correct": "汉语越来越难。", "meaning": "Tiếng Trung càng ngày càng khó."}
      ]
    }
  ],
  // Bài 10: Phó từ quan trọng
  9: [
    {
      "title": "1. Phó từ: 已经 (Đã)",
      "desc": "Biểu thị sự việc đã xảy ra, hoàn thành.",
      "formula": [],
      "practiceList": [
        {"correct": "我已经吃了。", "meaning": "Tôi đã ăn rồi."}
      ]
    },
    {
      "title": "2. Phó từ: 还 (Vẫn / Còn)",
      "desc": "Biểu thị trạng thái vẫn tiếp tục, chưa thay đổi.",
      "formula": [],
      "practiceList": [
        {"correct": "他还没来。", "meaning": "Anh ấy vẫn chưa đến."}
      ]
    },
    {
      "title": "3. Phó từ: 又 (Lại - quá khứ)",
      "desc": "Biểu thị sự việc lặp lại, thường dùng cho việc đã xảy ra.",
      "formula": [],
      "practiceList": [
        {"correct": "他又迟到了。", "meaning": "Anh ấy lại đến muộn rồi."}
      ]
    },
    {
      "title": "4. Phó từ: 才 (Mãi mới / Chỉ)",
      "desc": "Chỉ hành động diễn ra muộn hoặc khó khăn mới đạt được.",
      "formula": [],
      "practiceList": [
        {"correct": "我八点才起床。", "meaning": "8 giờ tôi mới ngủ dậy (rất muộn)."}
      ]
    },
    {
      "title": "5. Phó từ: 就 (Liền / Đã... rồi)",
      "desc": "Chỉ hành động diễn ra sớm, nhanh chóng, thuận lợi.",
      "formula": [],
      "practiceList": [
        {"correct": "我六点就到了。", "meaning": "Tôi 6 giờ đã đến rồi (rất sớm)."}
      ]
    },
    {
      "title": "6. Phó từ: 终于 (Cuối cùng)",
      "desc": "Chỉ kết quả đạt được sau thời gian dài.",
      "formula": [],
      "practiceList": [
        {"correct": "我终于明白了。", "meaning": "Tôi cuối cùng cũng hiểu ra rồi."}
      ]
    },
    {
      "title": "7. Phó từ: 几乎 (Hầu như)",
      "desc": "Chỉ sự việc gần như đạt đến một mức độ nào đó.",
      "formula": [],
      "practiceList": [
        {"correct": "我几乎忘了。", "meaning": "Tôi hầu như (suýt chút nữa) đã quên."}
      ]
    }
  ],
  // Bài 11: Liên từ & câu phức
  10: [
    {
      "title": "1. 虽然…但是… (Tuy… nhưng…)",
      "desc": "Mặc dù... nhưng vẫn...",
      "formula": [],
      "practiceList": [
        {"correct": "虽然他很忙，但是他来了。", "meaning": "Mặc dù anh ấy rất bận, nhưng anh ấy đã đến."}
      ]
    },
    {
      "title": "2. 不但…而且… (Không những… mà còn…)",
      "desc": "Nhấn mạnh ý tăng tiến.",
      "formula": [],
      "practiceList": [
        {"correct": "她不但会说中文，而且会写汉字。", "meaning": "Cô ấy không những biết nói tiếng Trung, mà còn biết viết chữ Hán."}
      ]
    },
    {
      "title": "3. 如果…就… (Nếu… thì…)",
      "desc": "Giả thiết và kết quả.",
      "formula": [],
      "practiceList": [
        {"correct": "如果下雨，我就不去。", "meaning": "Nếu trời mưa, tôi sẽ không đi."}
      ]
    },
    {
      "title": "4. 只要…就… (Chỉ cần… thì…)",
      "desc": "Chỉ cần đáp ứng điều kiện thì kết quả sẽ tới.",
      "formula": [],
      "practiceList": [
        {"correct": "只要努力，就会成功。", "meaning": "Chỉ cần nỗ lực, thì sẽ thành công."}
      ]
    },
    {
      "title": "5. 除了…以外… (Ngoài… ra)",
      "desc": "Loại trừ hoặc bổ sung.",
      "formula": [],
      "practiceList": [
        {"correct": "除了汉语以外，我还学英语。", "meaning": "Ngoài tiếng Trung ra, tôi còn học tiếng Anh."}
      ]
    }
  ],
  // Bài 12: Động từ nối tiếp
  11: [
    {
      "title": "1. Cấu trúc động từ nối tiếp (连动句)",
      "desc": "Hai hay nhiều động từ liên tiếp do cùng một chủ ngữ thực hiện. Động từ thứ 2 thường chỉ mục đích hoặc cách thức.",
      "formula": [
        {"text": "Chủ ngữ", "classes": "border-gray-200 bg-gray-50 text-gray-700"},
        {"text": "V1", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "(Object 1)", "classes": "border-green-200 bg-green-50 text-green-700"},
        {"text": "V2", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "(Object 2)", "classes": "border-yellow-200 bg-yellow-50 text-yellow-700"}
      ],
      "practiceList": [
        {"correct": "我去商店买东西。", "meaning": "Tôi đi cửa hàng (V1) để mua đồ (V2)."},
        {"correct": "他坐飞机去北京。", "meaning": "Anh ấy ngồi máy bay (V1) đi Bắc Kinh (V2)."}
      ]
    }
  ],
  // Bài 13: Bổ sung ý kiến
  12: [
    {
      "title": "1. 觉得 (Cảm thấy / Cho rằng)",
      "desc": "Dùng để diễn đạt quan điểm, nhận định chủ quan.",
      "formula": [],
      "practiceList": [
        {"correct": "我觉得这个电影很好看。", "meaning": "Tôi thấy bộ phim này rất hay."}
      ]
    },
    {
      "title": "2. 看来 (Xem ra)",
      "desc": "Dùng để suy đoán dựa trên tình hình hiện tại.",
      "formula": [],
      "practiceList": [
        {"correct": "看来要下雨了。", "meaning": "Xem ra trời sắp mưa rồi."}
      ]
    }
  ],
  // Bài 14: Bổ ngữ xu hướng
  13: [
    {
      "title": "1. Bổ ngữ xu hướng: 上 (Lên)",
      "desc": "Chỉ hướng chuyển động từ dưới lên.",
      "formula": [
        {"text": "Động từ (走, 拿...)", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "上", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "来/去", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "走上去。", "meaning": "Đi lên đó."},
        {"correct": "拿上来。", "meaning": "Cầm lên đây."}
      ]
    },
    {
      "title": "2. Bổ ngữ xu hướng: 下 (Xuống)",
      "desc": "Chỉ hướng chuyển động từ trên xuống.",
      "formula": [
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "下", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "来/去", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "走下去。", "meaning": "Đi xuống đó."},
        {"correct": "放下来。", "meaning": "Đặt xuống đây."}
      ]
    },
    {
      "title": "3. Bổ ngữ xu hướng: 进 (Vào) & 出 (Ra)",
      "desc": "Chỉ hướng chuyển động vào trong hoặc ra ngoài.",
      "formula": [
        {"text": "Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"},
        {"text": "进 / 出", "classes": "border-red-200 bg-red-50 text-red-700"},
        {"text": "来/去", "classes": "border-green-200 bg-green-50 text-green-700"}
      ],
      "practiceList": [
        {"correct": "他走进教室。", "meaning": "Anh ấy bước vào trong phòng học."},
        {"correct": "走出来。", "meaning": "Bước ra ngoài này."}
      ]
    }
  ],
  // Bài 15: Kể chuyện theo timeline
  14: [
    {
      "title": "1. 首先 (Đầu tiên)",
      "desc": "Bắt đầu chuỗi sự kiện.",
      "formula": [],
      "practiceList": [
        {"correct": "首先我们吃饭，后来去看电影，最后回家。", "meaning": "Đầu tiên chúng tôi ăn cơm,..."}
      ]
    },
    {
      "title": "2. 后来 (Sau đó / Về sau)",
      "desc": "Sự việc tiếp diễn trong quá khứ.",
      "formula": [],
      "practiceList": [
        {"correct": "后来去看电影...", "meaning": "...sau đó đi xem phim..."}
      ]
    },
    {
      "title": "3. 最后 (Cuối cùng)",
      "desc": "Kết thúc chuỗi sự kiện.",
      "formula": [],
      "practiceList": [
        {"correct": "最后回家。", "meaning": "...cuối cùng về nhà."}
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
      if (newGrammarMapping[lesson.orderIndex]) {
        // REPLACE ALL GRAMMAR with the exact new points to ensure no duplicates and 100% adherence to 15 mapped topics
        lesson.grammar = newGrammarMapping[lesson.orderIndex];
      }
    }
    fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
    console.log('Fully replaced grammar in ' + batchFile);
  }
}

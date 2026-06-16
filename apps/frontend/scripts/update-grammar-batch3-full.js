const fs = require('fs');
const path = require('path');

const grammarBatch3 = {
  // Bài 11: 9 điểm
  10: [
    {
      "title": "1. Vì... nên... (因为…所以…)",
      "desc": "Biểu đạt quan hệ nguyên nhân - kết quả.",
      "formula": [{"text": "因为 + Nguyên nhân，所以 + Kết quả", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "因为下雨，所以我们没去。", "meaning": "Bởi vì trời mưa, nên chúng tôi không đi."}]
    },
    {
      "title": "2. Đã... thì... (既然…就…)",
      "desc": "Đưa ra một thực tế đã rồi, và theo đó rút ra kết luận/gợi ý.",
      "formula": [{"text": "既然 + Thực tế，就 + Kết luận", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "既然你累了，就休息吧。", "meaning": "Đã mệt rồi, thì nghỉ ngơi đi."}]
    },
    {
      "title": "3. Cho dù... cũng... (即使…也…)",
      "desc": "Giả định một tình huống cực đoan, kết quả vẫn không thay đổi.",
      "formula": [{"text": "即使 + Giả định，也 + Kết quả không đổi", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "即使下雨，我也要去。", "meaning": "Cho dù trời mưa, tôi cũng phải đi."}]
    },
    {
      "title": "4. Bất luận... đều... (不管/无论…都/也…)",
      "desc": "Dù trong bất kỳ điều kiện nào, kết quả cũng không thay đổi.",
      "formula": [{"text": "不管 + Điều kiện bất kỳ，都 + Kết quả", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "不管多难，我都要做。", "meaning": "Bất luận khó thế nào, tôi đều phải làm."}]
    },
    {
      "title": "5. Nếu như... thì... (要是…就…)",
      "desc": "Biểu đạt giả thiết (giống 如果 nhưng dùng nhiều trong khẩu ngữ).",
      "formula": [{"text": "要是 + Giả thiết，就 + Kết quả", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "要是明天下雨，我就不去。", "meaning": "Nếu như ngày mai trời mưa, tôi sẽ không đi."}]
    },
    {
      "title": "6. Vừa... vừa... (一边…一边…)",
      "desc": "Hai hành động diễn ra song song cùng lúc.",
      "formula": [{"text": "一边 + V1，一边 + V2", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我们一边喝茶，一边聊天。", "meaning": "Chúng tôi vừa uống trà, vừa nói chuyện."}]
    },
    {
      "title": "7. Trước tiên... sau đó... (先…然后…)",
      "desc": "Trình tự thực hiện các hành động.",
      "formula": [{"text": "先 + V1，然后 + V2", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你先洗手，然后吃饭。", "meaning": "Bạn rửa tay trước, sau đó ăn cơm."}]
    },
    {
      "title": "8. Ngoài ra... còn... (除了…还/也…)",
      "desc": "Ngoài đối tượng này, bổ sung thêm đối tượng khác.",
      "formula": [{"text": "除了 A 以外，还/也 B", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "除了汉语，他还学法语。", "meaning": "Ngoài tiếng Trung ra, anh ấy còn học tiếng Pháp."}]
    },
    {
      "title": "9. Ngay cả... cũng... (连…都/也…)",
      "desc": "Nhấn mạnh một trường hợp cực đoan để suy ra các trường hợp bình thường.",
      "formula": [{"text": "连 + Đối tượng cực đoan + 都/也 + V", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "连他都知道了。", "meaning": "Ngay cả anh ấy cũng biết rồi."}]
    }
  ],

  // Bài 12: 8 điểm
  11: [
    {
      "title": "1. Câu liên động chỉ Phương thức",
      "desc": "Động từ thứ nhất chỉ phương thức, cách thức của động từ thứ hai.",
      "formula": [{"text": "S + V1 (Phương thức) + V2 (Hành động chính)", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他坐飞机去北京。", "meaning": "Anh ấy ngồi máy bay đi Bắc Kinh."}]
    },
    {
      "title": "2. Câu liên động chỉ Mục đích",
      "desc": "Động từ thứ hai chỉ mục đích của động từ thứ nhất.",
      "formula": [{"text": "S + V1 (Hành động) + V2 (Mục đích)", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我去超市买水果。", "meaning": "Tôi đi siêu thị mua trái cây."}]
    },
    {
      "title": "3. Câu kiêm ngữ (请, 叫, 让, 使)",
      "desc": "Tân ngữ của V1 đồng thời là Chủ ngữ của V2.",
      "formula": [{"text": "S1 + 请/叫/让/使 + O (S2) + V2", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "老板让他加班。", "meaning": "Ông chủ bắt (bảo) anh ấy tăng ca."}]
    },
    {
      "title": "4. Trợ từ cấu trúc: 地",
      "desc": "Kết nối giữa tính từ và động từ, biến tính từ thành trạng từ chỉ cách thức.",
      "formula": [{"text": "Tính từ + 地 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他慢慢地走过来。", "meaning": "Anh ấy chầm chậm bước tới."}]
    },
    {
      "title": "5. Bắt đầu hành động (起来)",
      "desc": "Biểu thị động tác bắt đầu và tiếp diễn.",
      "formula": [{"text": "Động từ + 起来", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "大家笑了起来。", "meaning": "Mọi người bắt đầu cười lên."}]
    },
    {
      "title": "6. Nhận ra, bộc lộ (出来)",
      "desc": "Từ trạng thái che giấu, mơ hồ trở nên rõ ràng, nhận ra được.",
      "formula": [{"text": "Động từ (听, 看...) + 出来", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我听出来了，你是大卫。", "meaning": "Tôi nghe ra rồi, bạn là David."}]
    },
    {
      "title": "7. Tiếp tục duy trì (下去)",
      "desc": "Biểu thị hành động tiếp tục kéo dài từ hiện tại đến tương lai.",
      "formula": [{"text": "Động/Tính từ + 下去", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "请读下去。", "meaning": "Xin hãy đọc tiếp đi."}]
    },
    {
      "title": "8. Bổ ngữ động lượng: 满 / 遍",
      "desc": "一遍 chỉ một lần thực hiện toàn bộ quá trình từ đầu tới cuối.",
      "formula": [{"text": "Động từ + 遍/满", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "请再说一遍。", "meaning": "Xin hãy nói lại một lần nữa."}]
    }
  ],

  // Bài 13: 9 điểm
  12: [
    {
      "title": "1. Nhận định: 觉得 / 认为",
      "desc": "Dùng để biểu đạt quan điểm chủ quan. 认为 trang trọng hơn 觉得.",
      "formula": [{"text": "我觉得 / 我认为 + Nhận định", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我觉得汉字很难。", "meaning": "Tôi cảm thấy chữ Hán rất khó."}]
    },
    {
      "title": "2. Suy đoán: 看来 / 看起来 (Xem ra)",
      "desc": "Từ một sự việc để đưa ra suy đoán.",
      "formula": [{"text": "看来 / 看起来 + Suy đoán", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "看来要下雨了。", "meaning": "Xem ra trời sắp mưa rồi."}]
    },
    {
      "title": "3. Thính giác: 听起来 (Nghe có vẻ)",
      "desc": "Cảm giác thông qua việc nghe.",
      "formula": [{"text": "听起来 + Cảm nhận", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "这个主意听起来不错。", "meaning": "Ý tưởng này nghe có vẻ không tồi."}]
    },
    {
      "title": "4. Giống như: 好像 / 像…一样",
      "desc": "So sánh sự giống nhau.",
      "formula": [{"text": "像 A 一样 / 好像 A", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他好像生气了。", "meaning": "Anh ấy hình như tức giận rồi."}]
    },
    {
      "title": "5. Sở thích: 对…感兴趣",
      "desc": "Biểu thị sự yêu thích, có hứng thú với việc gì.",
      "formula": [{"text": "对 + Noun + 感兴趣", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我对历史很感兴趣。", "meaning": "Tôi rất có hứng thú với lịch sử."}]
    },
    {
      "title": "6. Lo lắng: 为…着急",
      "desc": "Lo lắng cho ai/việc gì đó.",
      "formula": [{"text": "为 + Noun + 着急", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "妈妈为我的学习着急。", "meaning": "Mẹ lo lắng cho việc học của tôi."}]
    },
    {
      "title": "7. Hài lòng: 对…满意",
      "desc": "Cảm thấy hài lòng với kết quả nào đó.",
      "formula": [{"text": "对 + Noun + 满意", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我对这个房间很满意。", "meaning": "Tôi rất hài lòng với căn phòng này."}]
    },
    {
      "title": "8. Thói quen: 习惯于…",
      "desc": "Đã quen với một môi trường hoặc hành động.",
      "formula": [{"text": "习惯 + Noun/Verb", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我习惯早起。", "meaning": "Tôi quen dậy sớm rồi."}]
    },
    {
      "title": "9. Mức độ cực hạn: 极了/死/坏",
      "desc": "Chỉ mức độ rất cao của tâm lý, sinh lý (Đói chết đi được, Mệt muốn chết...).",
      "formula": [{"text": "Tính/Động từ + 死 / 坏 + 了", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我饿死了。", "meaning": "Tôi đói chết đi được."}]
    }
  ],

  // Bài 14: 8 điểm
  13: [
    {
      "title": "1. Xu hướng kép: 上来 / 上去",
      "desc": "Di chuyển lên trên. 上来: Hướng về người nói. 上去: Rời xa người nói.",
      "formula": [{"text": "Động từ (走, 拿...) + 上来 / 上去", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "走上来。", "meaning": "Đi lên đây."}]
    },
    {
      "title": "2. Xu hướng kép: 下来 / 下去",
      "desc": "Di chuyển xuống dưới.",
      "formula": [{"text": "Động từ + 下来 / 下去", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "跳下去。", "meaning": "Nhảy xuống đó."}]
    },
    {
      "title": "3. Xu hướng kép: 进来 / 进去",
      "desc": "Di chuyển vào trong.",
      "formula": [{"text": "Động từ + 进来 / 进去", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "走进来。", "meaning": "Đi vào trong này."}]
    },
    {
      "title": "4. Xu hướng kép: 出来 / 出去",
      "desc": "Di chuyển ra ngoài.",
      "formula": [{"text": "Động từ + 出来 / 出去", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "跑出去。", "meaning": "Chạy ra ngoài kia."}]
    },
    {
      "title": "5. Xu hướng kép: 回来 / 回去",
      "desc": "Quay về.",
      "formula": [{"text": "Động từ + 回来 / 回去", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "买回来。", "meaning": "Mua đem về đây."}]
    },
    {
      "title": "6. Xu hướng kép: 过来 / 过去",
      "desc": "Băng qua, sang ngang.",
      "formula": [{"text": "Động từ + 过来 / 过去", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "走过去。", "meaning": "Đi sang bên đó."}]
    },
    {
      "title": "7. Xu hướng kép: 起来",
      "desc": "Từ dưới lên trên, gom tụ lại.",
      "formula": [{"text": "Động từ + 起来", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "站起来。", "meaning": "Đứng lên."}]
    },
    {
      "title": "8. Vị trí Tân ngữ trong Bổ ngữ xu hướng kép",
      "desc": "Tân ngữ chỉ địa điểm phải kẹp vào giữa 进/出/上/下 và 来/去.",
      "formula": [{"text": "Động từ + Xu hướng 1 + Địa điểm + 来/去", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "走回房间去。", "meaning": "Đi về lại phòng."}]
    }
  ],

  // Bài 15: 8 điểm
  14: [
    {
      "title": "1. Bổ ngữ thời lượng cơ bản",
      "desc": "Nói rõ hành động kéo dài trong bao lâu.",
      "formula": [{"text": "S + V + 了 + Thời lượng", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我睡了八个小时。", "meaning": "Tôi đã ngủ 8 tiếng đồng hồ."}]
    },
    {
      "title": "2. Thời lượng có Tân ngữ (Lặp Động từ)",
      "desc": "Khi có tân ngữ, ta lặp lại động từ lần 2 rồi mới thêm thời lượng.",
      "formula": [{"text": "S + V + O + V + 了 + Thời lượng", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他学汉语学了一年。", "meaning": "Anh ấy học tiếng Trung (học) được 1 năm rồi."}]
    },
    {
      "title": "3. Thời lượng kéo dài đến hiện tại",
      "desc": "Sử dụng hai chữ 了 (sau động từ và cuối câu) để báo hiệu hành động bắt đầu từ quá khứ và VẪN ĐANG tiếp tục.",
      "formula": [{"text": "V + 了 + Thời lượng + O + 了", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我学了一年汉语了。", "meaning": "Tôi đã học tiếng Trung được 1 năm rồi (và bây giờ vẫn đang học)."}]
    },
    {
      "title": "4. Kể chuyện: 首先 / 第一 (Đầu tiên)",
      "desc": "Dùng mở đầu cho một chuỗi sự kiện hoặc bài luận.",
      "formula": [{"text": "首先 + Sự kiện 1", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "首先，我们要准备好材料。", "meaning": "Đầu tiên, chúng ta phải chuẩn bị sẵn sàng tài liệu."}]
    },
    {
      "title": "5. Kể chuyện: 后来 (Về sau / Sau đó)",
      "desc": "Dùng cho sự việc đã xảy ra trong quá khứ.",
      "formula": [{"text": "后来 + Sự kiện quá khứ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "后来他去国外了。", "meaning": "Về sau anh ấy đã đi nước ngoài."}]
    },
    {
      "title": "6. Kể chuyện: 然后 / 接着 (Sau đó / Tiếp theo)",
      "desc": "Liên kết các sự việc nối tiếp nhau theo trình tự thời gian.",
      "formula": [{"text": "然后 + Sự kiện tiếp theo", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你先吃饭，然后做作业。", "meaning": "Con ăn cơm trước, sau đó làm bài tập."}]
    },
    {
      "title": "7. Kể chuyện: 最后 (Cuối cùng)",
      "desc": "Kết thúc của một chuỗi hành động.",
      "formula": [{"text": "最后 + Sự kiện cuối", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "最后，大家都回家了。", "meaning": "Cuối cùng, mọi người đều về nhà."}]
    },
    {
      "title": "8. Kể chuyện: 总的来说 (Nhìn chung / Kết luận)",
      "desc": "Dùng để tóm tắt, đưa ra kết luận tổng quát.",
      "formula": [{"text": "总的来说 + Kết luận", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "总的来说，这次旅行很愉快。", "meaning": "Nhìn chung, chuyến du lịch lần này rất vui vẻ."}]
    }
  ]
};

const file = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk3-batch3.json');
if (fs.existsSync(file)) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const lesson of data) {
    if (grammarBatch3[lesson.orderIndex]) {
      lesson.grammar = grammarBatch3[lesson.orderIndex];
    }
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Successfully updated 42 grammar points for Batch 3.');
} else {
  console.log('File not found:', file);
}

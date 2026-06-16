const fs = require('fs');
const path = require('path');

const grammarBatch2 = {
  // Bài 6: 8 điểm
  5: [
    {
      "title": "1. Đại từ nghi vấn phiếm chỉ (谁/什么/哪儿 + 都/也)",
      "desc": "Dùng đại từ nghi vấn kết hợp với 都/也 để biểu thị ý nghĩa 'tất cả' hoặc 'hoàn toàn không' (khi đi với phủ định).",
      "formula": [{"text": "Ai/Cái gì/Ở đâu + 都/也 + (不/没) + V", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我什么都不想吃。", "meaning": "Tôi không muốn ăn cái gì cả."}]
    },
    {
      "title": "2. Phân biệt 怎么 vs 为什么",
      "desc": "怎么 hỏi phương thức (như thế nào) hoặc sự ngạc nhiên. 为什么 chỉ hỏi nguyên nhân (tại sao).",
      "formula": [{"text": "怎么 / 为什么 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你怎么没来？", "meaning": "Sao (thế nào mà) bạn không đến?"}, {"correct": "为什么没来？", "meaning": "Tại sao bạn không đến?"}]
    },
    {
      "title": "3. Phân biệt 几 vs 多少",
      "desc": "几 hỏi số lượng nhỏ (dưới 10), phải đi kèm lượng từ. 多少 hỏi số lượng lớn, có thể không cần lượng từ.",
      "formula": [{"text": "几 + Lượng từ + Danh từ / 多少 + (Lượng từ) + Danh từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你有几个苹果？", "meaning": "Bạn có mấy quả táo?"}, {"correct": "你要多少钱？", "meaning": "Bạn cần bao nhiêu tiền?"}]
    },
    {
      "title": "4. Cấu trúc 多 + Tính từ",
      "desc": "Hỏi mức độ (bao nhiêu, tới mức nào).",
      "formula": [{"text": "多 + Tính từ (大/高/重/远)", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你多高？", "meaning": "Bạn cao bao nhiêu?"}]
    },
    {
      "title": "5. 才 vs 就",
      "desc": "才 biểu thị sự việc diễn ra muộn màng, khó khăn. 就 biểu thị sự việc diễn ra sớm, nhanh chóng.",
      "formula": [{"text": "Thời gian + 才 / 就 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他十点才来。", "meaning": "10 giờ anh ấy MỚI đến."}, {"correct": "他六点就来了。", "meaning": "6 giờ anh ấy ĐÃ đến rồi."}]
    },
    {
      "title": "6. Nhấn mạnh thời gian: …的时候",
      "desc": "Chỉ thời điểm đang diễn ra hành động.",
      "formula": [{"text": "Hành động + 的时候", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "吃饭的时候不要说话。", "meaning": "Lúc ăn cơm đừng nói chuyện."}]
    },
    {
      "title": "7. Nhấn mạnh thời gian: …以前",
      "desc": "Chỉ khoảng thời gian trước khi xảy ra một việc.",
      "formula": [{"text": "Hành động/Thời gian + 以前", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "睡觉以前要刷牙。", "meaning": "Trước khi đi ngủ phải đánh răng."}]
    },
    {
      "title": "8. Nhấn mạnh thời gian: …以后",
      "desc": "Chỉ khoảng thời gian sau khi xảy ra một việc.",
      "formula": [{"text": "Hành động/Thời gian + 以后", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "下课以后我们去打球。", "meaning": "Sau khi tan học chúng ta đi đánh bóng."}]
    }
  ],

  // Bài 7: 8 điểm
  6: [
    {
      "title": "1. Câu chữ 把 cơ bản",
      "desc": "Nhấn mạnh chủ thể xử lý, tác động làm biến đổi tân ngữ xác định.",
      "formula": [{"text": "S + 把 + O + V + 了/其他", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我把苹果吃了。", "meaning": "Tôi đã ăn quả táo rồi."}]
    },
    {
      "title": "2. Câu chữ 把: Đưa đến Vị trí",
      "desc": "Hành động làm thay đổi vị trí của tân ngữ.",
      "formula": [{"text": "S + 把 + O + V + 在/到 + Nơi chốn", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "把书放在桌子上。", "meaning": "Đặt sách lên trên bàn."}]
    },
    {
      "title": "3. Câu chữ 把: Chuyển giao",
      "desc": "Hành động giao/đưa vật cho người khác.",
      "formula": [{"text": "S + 把 + O + V + 给 + Người", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我把钱还给他了。", "meaning": "Tôi đem tiền trả lại cho anh ấy rồi."}]
    },
    {
      "title": "4. Câu chữ 把: Trở thành Kết quả",
      "desc": "Hành động làm tân ngữ biến đổi thành một trạng thái/kết quả khác.",
      "formula": [{"text": "S + 把 + O + V + 成 + Trạng thái/Sự vật", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "请把这句话翻译成中文。", "meaning": "Hãy dịch câu này thành tiếng Trung."}]
    },
    {
      "title": "5. Phủ định câu chữ 把",
      "desc": "Từ phủ định (没, 不) phải đặt TRƯỚC chữ 把, không đặt trước động từ.",
      "formula": [{"text": "S + 没/不 + 把 + O + V", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我没把门关上。", "meaning": "Tôi chưa đóng cửa lại."}]
    },
    {
      "title": "6. Động từ năng nguyện trong câu chữ 把",
      "desc": "Động từ năng nguyện (想, 要, 能...) phải đứng TRƯỚC chữ 把.",
      "formula": [{"text": "S + 想/要/能 + 把 + O + V", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我想把这本书买下来。", "meaning": "Tôi muốn mua lại cuốn sách này."}]
    },
    {
      "title": "7. Phó từ trong câu chữ 把",
      "desc": "Phó từ (已经, 都, 还...) đứng TRƯỚC chữ 把.",
      "formula": [{"text": "S + 已经/都 + 把 + O + V", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他已经把作业做完了。", "meaning": "Anh ấy đã làm xong bài tập rồi."}]
    },
    {
      "title": "8. Bổ ngữ xu hướng trong câu chữ 把",
      "desc": "Hành động làm tân ngữ di chuyển theo một hướng nhất định.",
      "formula": [{"text": "S + 把 + O + V + Bổ ngữ xu hướng", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他把手机拿出来了。", "meaning": "Anh ấy lấy điện thoại di động ra rồi."}]
    }
  ],

  // Bài 8: 8 điểm
  7: [
    {
      "title": "1. Câu bị động 被 cơ bản",
      "desc": "Tân ngữ bị tác động được đưa lên làm chủ ngữ. Thường mang ý nghĩa tiêu cực.",
      "formula": [{"text": "O + 被 + S + V + 了/过", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我的自行车被他骑走了。", "meaning": "Xe đạp của tôi bị anh ấy đạp đi rồi."}]
    },
    {
      "title": "2. Câu bị động 被 với Bổ ngữ",
      "desc": "Động từ trong câu chữ 被 thường phải mang theo thành phần phụ (kết quả, xu hướng).",
      "formula": [{"text": "O + 被 + S + V + Bổ ngữ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "杯子被弟弟打碎了。", "meaning": "Cái cốc bị em trai làm vỡ rồi."}]
    },
    {
      "title": "3. Câu chữ 被: Lược bỏ Chủ thể",
      "desc": "Khi không biết ai làm hoặc không cần thiết nhắc đến, có thể bỏ S đi.",
      "formula": [{"text": "O + 被 + V + Bổ ngữ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "钱包被偷了。", "meaning": "Ví tiền bị trộm mất rồi."}]
    },
    {
      "title": "4. Dùng 叫 / 让 thay thế 被",
      "desc": "Trong khẩu ngữ, 叫 và 让 thường được dùng thay cho 被. Lúc này bắt buộc phải có Chủ thể S.",
      "formula": [{"text": "O + 叫/让 + S + V + Bổ ngữ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "蛋糕让妹妹吃了。", "meaning": "Bánh kem bị em gái ăn mất rồi."}]
    },
    {
      "title": "5. Phủ định trong câu bị động",
      "desc": "Từ phủ định 没 đặt TRƯỚC chữ 被.",
      "formula": [{"text": "O + 没 + 被 + S + V", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "花没被风吹倒。", "meaning": "Hoa chưa bị gió thổi ngã."}]
    },
    {
      "title": "6. Động từ năng nguyện trong câu 被",
      "desc": "Động từ năng nguyện đặt TRƯỚC chữ 被.",
      "formula": [{"text": "O + 想/能 + 被 + S + V", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "这个问题能被解决吗？", "meaning": "Vấn đề này có thể được giải quyết không?"}]
    },
    {
      "title": "7. Phó từ chỉ thời gian trong câu 被",
      "desc": "Phó từ đặt TRƯỚC chữ 被.",
      "formula": [{"text": "O + 已经/都 + 被 + S + V", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "房间已经被打扫干净了。", "meaning": "Căn phòng đã được dọn dẹp sạch sẽ rồi."}]
    },
    {
      "title": "8. Bị động mang tính cảm xúc: 让人",
      "desc": "Cấu trúc 让人 (Khiến người ta) biểu thị sự việc tác động đến cảm xúc.",
      "formula": [{"text": "让人 + Cảm xúc (生气, 难过...)", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "这个消息真让人难过。", "meaning": "Tin tức này thật khiến người ta buồn."}]
    }
  ],

  // Bài 9: 9 điểm
  8: [
    {
      "title": "1. So sánh hơn cơ bản (比)",
      "desc": "Dùng 比 để so sánh sự khác biệt mức độ giữa 2 sự vật.",
      "formula": [{"text": "A + 比 + B + Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "今天比昨天冷。", "meaning": "Hôm nay lạnh hơn hôm qua."}]
    },
    {
      "title": "2. So sánh mức độ cụ thể",
      "desc": "Thêm 一点儿, 得多, 多了 vào sau tính từ để làm rõ mức độ chênh lệch.",
      "formula": [{"text": "A + 比 + B + Tính từ + 一点儿/得多", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "哥哥比我大一点儿。", "meaning": "Anh trai lớn hơn tôi một chút."}]
    },
    {
      "title": "3. So sánh có bổ ngữ trạng thái",
      "desc": "So sánh cách thức thực hiện hành động.",
      "formula": [{"text": "A + V + 得 + 比 + B + Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他跑得比我快。", "meaning": "Anh ấy chạy nhanh hơn tôi."}]
    },
    {
      "title": "4. So sánh kém (没有)",
      "desc": "A không bằng B ở một khía cạnh nào đó.",
      "formula": [{"text": "A + 没有 + B + (那么/这么) + Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我没有他那么高。", "meaning": "Tôi không cao bằng anh ấy."}]
    },
    {
      "title": "5. So sánh kém (不如)",
      "desc": "A kém hơn B. Thường đứng trước tính từ tốt.",
      "formula": [{"text": "A + 不如 + B + (好/大...)", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "这个手机不如那个好。", "meaning": "Cái điện thoại này không tốt bằng cái kia."}]
    },
    {
      "title": "6. So sánh bằng/giống nhau (一样)",
      "desc": "A và B có sự tương đồng.",
      "formula": [{"text": "A + 跟/和 + B + (不)一样", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我的书和你的不一样。", "meaning": "Sách của tôi và của bạn không giống nhau."}]
    },
    {
      "title": "7. So sánh bằng với Tính từ",
      "desc": "A và B đạt cùng mức độ về một tính chất nào đó.",
      "formula": [{"text": "A + 跟/和 + B + 一样 + Tính/Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他跟我一样高。", "meaning": "Anh ấy cao bằng tôi."}]
    },
    {
      "title": "8. Sự thay đổi: 越来越...",
      "desc": "Càng ngày càng... diễn tả mức độ thay đổi theo thời gian.",
      "formula": [{"text": "越来越 + Tính từ/Động từ tâm lý", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "天气越来越热。", "meaning": "Thời tiết càng ngày càng nóng."}]
    },
    {
      "title": "9. Sự tương quan: 越 A 越 B",
      "desc": "B thay đổi dựa trên sự thay đổi của A (Càng... càng...).",
      "formula": [{"text": "越 A 越 B", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "他越说越高兴。", "meaning": "Anh ấy càng nói càng vui."}]
    }
  ],

  // Bài 10: 8 điểm
  9: [
    {
      "title": "1. Phó từ: 几乎 (Hầu như)",
      "desc": "Biểu thị mức độ rất gần, suýt chút nữa.",
      "formula": [{"text": "几乎 + Động từ/Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我几乎忘了他。", "meaning": "Tôi hầu như (suýt) quên anh ấy rồi."}]
    },
    {
      "title": "2. Phó từ: 终于 (Cuối cùng)",
      "desc": "Biểu thị kết quả đạt được sau thời gian dài chờ đợi hoặc nỗ lực.",
      "formula": [{"text": "终于 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "考试终于结束了。", "meaning": "Kỳ thi cuối cùng cũng kết thúc."}]
    },
    {
      "title": "3. Phó từ: 互相 (Lẫn nhau)",
      "desc": "Hành động qua lại giữa hai hay nhiều đối tượng.",
      "formula": [{"text": "互相 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我们要互相帮助。", "meaning": "Chúng ta phải giúp đỡ lẫn nhau."}]
    },
    {
      "title": "4. Phó từ/Động từ năng nguyện: 必须 (Bắt buộc)",
      "desc": "Không có sự lựa chọn nào khác.",
      "formula": [{"text": "必须 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你必须完成作业。", "meaning": "Bạn bắt buộc phải hoàn thành bài tập."}]
    },
    {
      "title": "5. Phó từ: 当然 (Đương nhiên)",
      "desc": "Điều hiển nhiên, không cần bàn cãi.",
      "formula": [{"text": "当然 + Động từ/Tính từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我当然知道。", "meaning": "Tôi đương nhiên biết."}]
    },
    {
      "title": "6. Phó từ: 突然 (Đột nhiên)",
      "desc": "Sự việc xảy ra bất ngờ, ngoài dự kiến.",
      "formula": [{"text": "突然 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "天突然下雨了。", "meaning": "Trời đột nhiên đổ mưa."}]
    },
    {
      "title": "7. Phó từ: 一直 (Luôn luôn, suốt)",
      "desc": "Hành động hoặc trạng thái không hề gián đoạn.",
      "formula": [{"text": "一直 + Động từ", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "我一直在等你。", "meaning": "Tôi vẫn luôn đợi cậu."}]
    },
    {
      "title": "8. Câu hỏi phản vấn: 不是...吗?",
      "desc": "Chẳng phải là... sao? Nhấn mạnh khẳng định qua hình thức câu hỏi.",
      "formula": [{"text": "不是 + Ý khẳng định + 吗？", "classes": "border-blue-200 bg-blue-50 text-blue-700"}],
      "practiceList": [{"correct": "你不是喜欢吃苹果吗？", "meaning": "Chẳng phải bạn thích ăn táo sao?"}]
    }
  ]
};

const file = path.join('F:\\Projects\\ThuongTra-VanHoc\\edu-platform', 'hsk3-batch2.json');
if (fs.existsSync(file)) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const lesson of data) {
    if (grammarBatch2[lesson.orderIndex]) {
      lesson.grammar = grammarBatch2[lesson.orderIndex];
    }
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Successfully updated 41 grammar points for Batch 2.');
} else {
  console.log('File not found:', file);
}

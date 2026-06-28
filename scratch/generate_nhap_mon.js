const fs = require('fs');

const data = {
  program: "khai-mon",
  chapter: 1,
  lessons: [
    {
      orderIndex: 0,
      title: "Bài 1.1 — Pinyin & Thanh điệu: Tổng quan",
      description: "Hiểu hệ thống Pinyin và 4 thanh điệu trước khi bắt đầu luyện âm",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Pinyin & Thanh điệu: Tổng quan",
            sections: [
              {
                type: "text",
                body: "Pinyin (拼音 — pīnyīn) là hệ thống dùng chữ cái Latin để phiên âm tiếng Trung, được chính thức hóa năm 1958.\n\nPinyin gồm 3 thành phần: [Phụ âm đầu] + [Vần] + [Thanh điệu]. Thanh điệu luôn luôn có mặt.\n\n**Bốn thanh + thanh nhẹ**:"
              },
              {
                type: "sound_table",
                rows: [
                  { tone: "Thanh 1", pinyin: "mā", hanzi: "妈", meaning: "mẹ" },
                  { tone: "Thanh 2", pinyin: "má", hanzi: "麻", meaning: "gai, tê" },
                  { tone: "Thanh 3", pinyin: "mǎ", hanzi: "马", meaning: "ngựa" },
                  { tone: "Thanh 4", pinyin: "mà", hanzi: "骂", meaning: "mắng" },
                  { tone: "Thanh nhẹ", pinyin: "ma", hanzi: "吗", meaning: "trợ từ câu hỏi" }
                ]
              },
              {
                type: "comparison",
                vietnamese: "Thanh điệu và âm cuối tiếng Việt",
                difference: "- Tiếng Việt có 6 thanh, tiếng Trung có 4 thanh + 1 thanh nhẹ\n- Tiếng Trung không có âm cuối phong phú như tiếng Việt (-c, -ch, -nh...)\n- Tiếng Trung có nhóm âm lưỡi cuộn (zh/ch/sh/r) không có trong tiếng Việt"
              },
              {
                type: "note",
                label: "Lưu ý",
                body: "Thanh 2 tiếng Trung bắt đầu từ giữa rồi lên cao — không bắt đầu từ thấp như thanh sắc tiếng Việt. Thanh 3 trong hội thoại nhanh thường chỉ xuống, không lên lại."
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 1,
      title: "Bài 1.2 — Nguyên âm đơn: a · o · e",
      description: "Học 3 nguyên âm đầu tiên và luyện đọc với 4 thanh điệu",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Nguyên âm đơn: a · o · e",
            sections: [
              {
                type: "text",
                body: "**Nội dung lý thuyết âm A**:\n- Miệng mở rộng, lưỡi thấp"
              },
              {
                type: "comparison",
                vietnamese: "gần giống 'a' trong 'ba, má'",
                difference: ""
              },
              {
                type: "note",
                label: "Lưu ý",
                body: "Khi đứng trong vần ghép, âm 'a' bị ảnh hưởng bởi âm đứng sau"
              },
              {
                type: "sound_table",
                rows: [
                  { tone: "Thanh 1", pinyin: "ā", hanzi: "啊", meaning: "à! (ngạc nhiên, kéo dài)" },
                  { tone: "Thanh 2", pinyin: "á", hanzi: "啊", meaning: "à? (hỏi lại, chưa hiểu)" },
                  { tone: "Thanh 3", pinyin: "ǎ", hanzi: "啊", meaning: "à~ (phân vân, do dự)" },
                  { tone: "Thanh 4", pinyin: "à", hanzi: "啊", meaning: "à! (vừa hiểu ra, dứt khoát)" },
                  { tone: "Thanh nhẹ", pinyin: "a", hanzi: "啊", meaning: "à (trợ từ cuối câu, nhẹ)" }
                ]
              },
              {
                type: "text",
                body: "**Nội dung lý thuyết âm O**:\n- Môi tròn và chúm lại, lưỡi lui về phía sau"
              },
              {
                type: "comparison",
                vietnamese: "o",
                difference: "Khác 'o' tiếng Việt ở chỗ miệng chúm tròn hơn hẳn"
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Người Việt hay đọc 'o' tiếng Trung hơi dẹt — cần tròn môi hơn"
              },
              {
                type: "sound_table",
                rows: [
                  { tone: "Thanh 1", pinyin: "ō", hanzi: "哦", meaning: "ồ~ (ngạc nhiên nhẹ)" },
                  { tone: "Thanh 2", pinyin: "ó", hanzi: "哦", meaning: "ồ? (hỏi lại, chưa tin)" },
                  { tone: "Thanh 3", pinyin: "ǒ", hanzi: "我", meaning: "tôi, mình" },
                  { tone: "Thanh 4", pinyin: "ò", hanzi: "哦", meaning: "ồ! (vừa hiểu ra)" },
                  { tone: "Thanh nhẹ", pinyin: "o", hanzi: "喔", meaning: "ồ (trợ từ, rất nhẹ)" }
                ]
              },
              {
                type: "text",
                body: "**Nội dung lý thuyết âm E**:\n- Miệng hé mở, môi không tròn, lưỡi ở giữa — âm phát ra từ sâu trong họng"
              },
              {
                type: "comparison",
                vietnamese: "Gần với 'ơ' trong 'bơ, sợ'",
                difference: "không tròn môi"
              },
              {
                type: "note",
                label: "Bẫy QUAN TRỌNG",
                body: "Người Việt thường đọc 'e' tiếng Trung giống 'e' tiếng Việt (như 'xe, bé') — HOÀN TOÀN SAI. Đây là lỗi cực kỳ phổ biến."
              },
              {
                type: "sound_table",
                rows: [
                  { tone: "Thanh 1", pinyin: "ē", hanzi: "鹅", meaning: "con ngỗng" },
                  { tone: "Thanh 2", pinyin: "é", hanzi: "鹅", meaning: "con ngỗng" },
                  { tone: "Thanh 3", pinyin: "ě", hanzi: "恶心", meaning: "buồn nôn, ghê" },
                  { tone: "Thanh 4", pinyin: "è", hanzi: "饿", meaning: "đói" },
                  { tone: "Thanh nhẹ", pinyin: "e", hanzi: "呢", meaning: "trợ từ cuối câu" }
                ]
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "a",
                label: "Nhóm A",
                words: [
                  { pinyin: "ā", hanzi: "啊", meaning: "à! (cảm thán)" },
                  { pinyin: "āyí", hanzi: "阿姨", meaning: "cô, dì" },
                  { pinyin: "māma", hanzi: "妈妈", meaning: "mẹ" },
                  { pinyin: "bāba", hanzi: "爸爸", meaning: "bố" },
                  { pinyin: "nǎ", hanzi: "哪", meaning: "nào (hỏi)" },
                  { pinyin: "nà", hanzi: "那", meaning: "đó, kia" },
                  { pinyin: "dà", hanzi: "大", meaning: "lớn, to" },
                  { pinyin: "mà", hanzi: "骂", meaning: "mắng" },
                  { pinyin: "pà", hanzi: "怕", meaning: "sợ" },
                  { pinyin: "bā", hanzi: "八", meaning: "tám (số 8)" }
                ]
              },
              {
                sound: "o",
                label: "Nhóm O",
                words: [
                  { pinyin: "wǒ", hanzi: "我", meaning: "tôi, mình" },
                  { pinyin: "hǎo", hanzi: "好", meaning: "tốt, được" },
                  { pinyin: "māo", hanzi: "猫", meaning: "con mèo" },
                  { pinyin: "gǒu", hanzi: "狗", meaning: "con chó" },
                  { pinyin: "duō", hanzi: "多", meaning: "nhiều" },
                  { pinyin: "zuò", hanzi: "做", meaning: "làm" },
                  { pinyin: "shuō", hanzi: "说", meaning: "nói" },
                  { pinyin: "pó", hanzi: "婆", meaning: "bà" },
                  { pinyin: "lóu", hanzi: "楼", meaning: "tầng, tòa nhà" },
                  { pinyin: "dōu", hanzi: "都", meaning: "đều, tất cả" }
                ]
              },
              {
                sound: "e",
                label: "Nhóm E",
                words: [
                  { pinyin: "è", hanzi: "饿", meaning: "đói" },
                  { pinyin: "hē", hanzi: "喝", meaning: "uống" },
                  { pinyin: "hé", hanzi: "和", meaning: "và, cùng với" },
                  { pinyin: "lè", hanzi: "乐", meaning: "vui vẻ" },
                  { pinyin: "gē", hanzi: "哥", meaning: "anh trai" },
                  { pinyin: "nè", hanzi: "呢", meaning: "trợ từ cuối câu" },
                  { pinyin: "shé", hanzi: "蛇", meaning: "con rắn" },
                  { pinyin: "kè", hanzi: "课", meaning: "bài học" },
                  { pinyin: "hěn", hanzi: "很", meaning: "rất" },
                  { pinyin: "mén", hanzi: "门", meaning: "cửa" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 2,
      title: "Bài 1.3 — Nguyên âm đơn: i · u · ü",
      description: "Hoàn thành 6 nguyên âm đơn, đặc biệt chú ý âm ü không có trong tiếng Việt",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Nguyên âm đơn: i · u · ü",
            sections: [
              {
                type: "text",
                body: "**Âm I**:\n- Miệng mở hẹp, hai khóe môi kéo ngang, lưỡi đẩy lên cao ra trước"
              },
              {
                type: "comparison",
                vietnamese: "gần giống 'i' trong 'bi, ti'",
                difference: ""
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Sau zh/ch/sh/r/z/c/s, âm 'i' đọc hoàn toàn khác — sẽ học ở bài 1.14, 1.15"
              },
              {
                type: "sound_table",
                rows: [
                  { tone: "Thanh 1", pinyin: "ī", hanzi: "衣", meaning: "áo, quần áo" },
                  { tone: "Thanh 2", pinyin: "í", hanzi: "一", meaning: "một (biến điệu)" },
                  { tone: "Thanh 3", pinyin: "ǐ", hanzi: "以", meaning: "dùng để" },
                  { tone: "Thanh 4", pinyin: "ì", hanzi: "意", meaning: "ý nghĩa" },
                  { tone: "Thanh nhẹ", pinyin: "i", hanzi: "地", meaning: "trợ từ trạng ngữ" }
                ]
              },
              {
                type: "text",
                body: "**Âm U**:\n- Môi tròn và chúm chặt, lưỡi lui về phía sau"
              },
              {
                type: "comparison",
                vietnamese: "Khá giống 'u' tiếng Việt",
                difference: "cần tròn môi hơn"
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Sau j/q/x/y, chữ 'u' thực ra là âm 'ü'"
              },
              {
                type: "sound_table",
                rows: [
                  { tone: "Thanh 1", pinyin: "ū", hanzi: "书", meaning: "sách" },
                  { tone: "Thanh 2", pinyin: "ú", hanzi: "无", meaning: "không có" },
                  { tone: "Thanh 3", pinyin: "ǔ", hanzi: "五", meaning: "năm (số 5)" },
                  { tone: "Thanh 4", pinyin: "ù", hanzi: "路", meaning: "đường" },
                  { tone: "Thanh nhẹ", pinyin: "u", hanzi: "—", meaning: "(ít gặp dạng đơn)" }
                ]
              },
              {
                type: "text",
                body: "**Âm Ü**:\n- Không có trong tiếng Việt — cách luyện: đặt miệng đọc 'i' rồi tròn môi lại"
              },
              {
                type: "comparison",
                vietnamese: "Không có",
                difference: "Gần âm 'ü' tiếng Đức, 'u' tiếng Pháp"
              },
              {
                type: "note",
                label: "Bẫy QUAN TRỌNG",
                body: "Người Việt đọc ü thành 'u' thông thường — sai hoàn toàn. Quy tắc mất hai chấm: Sau j/q/x/y, ü viết thành u nhưng vẫn đọc là ü"
              },
              {
                type: "sound_table",
                rows: [
                  { tone: "Thanh 1", pinyin: "ǖ", hanzi: "—", meaning: "(ít gặp)" },
                  { tone: "Thanh 2", pinyin: "ǘ", hanzi: "鱼", meaning: "con cá" },
                  { tone: "Thanh 3", pinyin: "ǚ", hanzi: "女", meaning: "phụ nữ" },
                  { tone: "Thanh 4", pinyin: "ǜ", hanzi: "去", meaning: "đi, rời đi" },
                  { tone: "Thanh nhẹ", pinyin: "ü", hanzi: "—", meaning: "(không phổ biến)" }
                ]
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "i",
                label: "Nhóm I",
                words: [
                  { pinyin: "yī", hanzi: "一", meaning: "một (số 1)" },
                  { pinyin: "yǐzi", hanzi: "椅子", meaning: "ghế" },
                  { pinyin: "nǐ", hanzi: "你", meaning: "bạn" },
                  { pinyin: "xǐ", hanzi: "洗", meaning: "rửa" },
                  { pinyin: "yīfu", hanzi: "衣服", meaning: "quần áo" },
                  { pinyin: "lì", hanzi: "力", meaning: "sức lực" },
                  { pinyin: "bǐ", hanzi: "笔", meaning: "bút" },
                  { pinyin: "dì", hanzi: "弟", meaning: "em trai" },
                  { pinyin: "jī", hanzi: "鸡", meaning: "gà" },
                  { pinyin: "xīn", hanzi: "心", meaning: "tim, lòng" }
                ]
              },
              {
                sound: "u",
                label: "Nhóm U",
                words: [
                  { pinyin: "shū", hanzi: "书", meaning: "sách" },
                  { pinyin: "wǔ", hanzi: "五", meaning: "năm" },
                  { pinyin: "lù", hanzi: "路", meaning: "đường" },
                  { pinyin: "chū", hanzi: "出", meaning: "ra, xuất" },
                  { pinyin: "kū", hanzi: "哭", meaning: "khóc" },
                  { pinyin: "fù", hanzi: "父", meaning: "cha" },
                  { pinyin: "mù", hanzi: "木", meaning: "gỗ" },
                  { pinyin: "hú", hanzi: "湖", meaning: "hồ (nước)" },
                  { pinyin: "dú", hanzi: "读", meaning: "đọc" },
                  { pinyin: "tú", hanzi: "图", meaning: "hình, bản đồ" }
                ]
              },
              {
                sound: "ü",
                label: "Nhóm Ü",
                words: [
                  { pinyin: "yú", hanzi: "鱼", meaning: "cá" },
                  { pinyin: "nǚ", hanzi: "女", meaning: "phụ nữ" },
                  { pinyin: "qù", hanzi: "去", meaning: "đi" },
                  { pinyin: "lǜ", hanzi: "绿", meaning: "xanh lá" },
                  { pinyin: "yuè", hanzi: "月", meaning: "tháng" },
                  { pinyin: "yǔ", hanzi: "雨", meaning: "mưa" },
                  { pinyin: "jù", hanzi: "句", meaning: "câu (ngữ pháp)" },
                  { pinyin: "qún", hanzi: "裙", meaning: "váy" },
                  { pinyin: "lǚ", hanzi: "旅", meaning: "du lịch" },
                  { pinyin: "xué", hanzi: "学", meaning: "học" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 3,
      title: "Bài 1.4 — Phụ âm: b · p · m",
      description: "Nhóm phụ âm môi — gần giống tiếng Việt nhất, chú ý b không rung thanh quản",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Phụ âm: b · p · m",
            sections: [
              {
                type: "text",
                body: "**Âm B**:\n- Hai môi chạm nhau, bật ra — không rung thanh quản (vô thanh)"
              },
              {
                type: "comparison",
                vietnamese: "b",
                difference: "'b' tiếng Việt có rung dây thanh (hữu thanh), 'b' tiếng Trung thì không"
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Người Việt hay đọc 'b' tiếng Trung rung giọng như tiếng Việt"
              },
              {
                type: "text",
                body: "**Âm P**:\n- Giống b nhưng bật hơi mạnh — đặt tay trước miệng sẽ cảm nhận luồng hơi"
              },
              {
                type: "comparison",
                vietnamese: "Gần 'ph' tiếng Việt",
                difference: "về mặt bật hơi"
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Hay quên bật hơi, đọc thành b"
              },
              {
                type: "text",
                body: "**Âm M**:\n- Hai môi chạm nhau, hơi thoát qua mũi — giống 'm' tiếng Việt hoàn toàn"
              },
              {
                type: "comparison",
                vietnamese: "Giống 'm' tiếng Việt hoàn toàn",
                difference: "Giống nhất trong tất cả các phụ âm"
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "b",
                label: "Nhóm B",
                words: [
                  { pinyin: "bāba", hanzi: "爸爸", meaning: "bố" },
                  { pinyin: "bēi", hanzi: "杯", meaning: "cốc, ly" },
                  { pinyin: "bǐ", hanzi: "笔", meaning: "bút" },
                  { pinyin: "bù", hanzi: "不", meaning: "không" },
                  { pinyin: "bái", hanzi: "白", meaning: "trắng" },
                  { pinyin: "bǎo", hanzi: "饱", meaning: "no" },
                  { pinyin: "bàn", hanzi: "办", meaning: "làm, giải quyết" },
                  { pinyin: "běn", hanzi: "本", meaning: "quyển (lượng từ)" },
                  { pinyin: "bīng", hanzi: "冰", meaning: "băng, lạnh" },
                  { pinyin: "bù", hanzi: "步", meaning: "bước chân" }
                ]
              },
              {
                sound: "p",
                label: "Nhóm P",
                words: [
                  { pinyin: "péngyou", hanzi: "朋友", meaning: "bạn bè" },
                  { pinyin: "pǎo", hanzi: "跑", meaning: "chạy" },
                  { pinyin: "piào", hanzi: "票", meaning: "vé" },
                  { pinyin: "píng", hanzi: "瓶", meaning: "chai, bình" },
                  { pinyin: "pàng", hanzi: "胖", meaning: "béo" },
                  { pinyin: "pí", hanzi: "皮", meaning: "da" },
                  { pinyin: "pán", hanzi: "盘", meaning: "đĩa, mâm" },
                  { pinyin: "pǔ", hanzi: "普", meaning: "phổ thông" },
                  { pinyin: "pā", hanzi: "趴", meaning: "nằm sấp" },
                  { pinyin: "péng", hanzi: "朋", meaning: "bạn" }
                ]
              },
              {
                sound: "m",
                label: "Nhóm M",
                words: [
                  { pinyin: "māma", hanzi: "妈妈", meaning: "mẹ" },
                  { pinyin: "mèi", hanzi: "妹", meaning: "em gái" },
                  { pinyin: "mǎi", hanzi: "买", meaning: "mua" },
                  { pinyin: "mén", hanzi: "门", meaning: "cửa" },
                  { pinyin: "míng", hanzi: "名", meaning: "tên" },
                  { pinyin: "māo", hanzi: "猫", meaning: "mèo" },
                  { pinyin: "mǐ", hanzi: "米", meaning: "gạo, mét" },
                  { pinyin: "máng", hanzi: "忙", meaning: "bận rộn" },
                  { pinyin: "miàn", hanzi: "面", meaning: "mặt, mì" },
                  { pinyin: "mù", hanzi: "木", meaning: "gỗ" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 4,
      title: "Bài 1.5 — Phụ âm: f · d · t",
      description: "Nhóm phụ âm môi-răng và đầu lưỡi, đặc biệt d = 'đ' tiếng Việt không phải 'd'",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Phụ âm: f · d · t",
            sections: [
              {
                type: "text",
                body: "**Âm F**:\n- Răng trên nhẹ nhàng chạm môi dưới, hơi thoát qua khe"
              },
              {
                type: "comparison",
                vietnamese: "Giống 'ph' tiếng Việt trong 'phở, phố'",
                difference: ""
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Cần đảm bảo răng chạm môi dưới rõ ràng"
              },
              {
                type: "text",
                body: "**Âm D**:\n- Đầu lưỡi chạm chân răng trên, bật ra — không bật hơi"
              },
              {
                type: "comparison",
                vietnamese: "Gần với 'đ' tiếng Việt (như 'đi, đến')",
                difference: "KHÔNG PHẢI 'd' tiếng Việt"
              },
              {
                type: "note",
                label: "Bẫy QUAN TRỌNG",
                body: "Người Việt nhìn chữ 'd' hay đọc thành 'd/z/y' tiếng Việt — sai hoàn toàn"
              },
              {
                type: "text",
                body: "**Âm T**:\n- Giống d nhưng bật hơi mạnh"
              },
              {
                type: "comparison",
                vietnamese: "Gần giống 't' tiếng Việt trong 'ta, tôi'",
                difference: "nhưng bật hơi mạnh hơn"
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "f",
                label: "Nhóm F",
                words: [
                  { pinyin: "fēijī", hanzi: "飞机", meaning: "máy bay" },
                  { pinyin: "fàn", hanzi: "饭", meaning: "cơm, bữa ăn" },
                  { pinyin: "fēng", hanzi: "风", meaning: "gió" },
                  { pinyin: "fù", hanzi: "父", meaning: "cha" },
                  { pinyin: "fǎ", hanzi: "法", meaning: "pháp luật" },
                  { pinyin: "fēn", hanzi: "分", meaning: "phút, điểm" },
                  { pinyin: "fáng", hanzi: "房", meaning: "phòng, nhà" },
                  { pinyin: "fèi", hanzi: "费", meaning: "tốn kém, phí" },
                  { pinyin: "fú", hanzi: "服", meaning: "quần áo" },
                  { pinyin: "fāng", hanzi: "方", meaning: "phương, vuông" }
                ]
              },
              {
                sound: "d",
                label: "Nhóm D",
                words: [
                  { pinyin: "dìdi", hanzi: "弟弟", meaning: "em trai" },
                  { pinyin: "dà", hanzi: "大", meaning: "lớn" },
                  { pinyin: "dōu", hanzi: "都", meaning: "đều" },
                  { pinyin: "duō", hanzi: "多", meaning: "nhiều" },
                  { pinyin: "dǎ", hanzi: "打", meaning: "đánh, gọi điện" },
                  { pinyin: "dàn", hanzi: "但", meaning: "nhưng" },
                  { pinyin: "děng", hanzi: "等", meaning: "đợi" },
                  { pinyin: "dòng", hanzi: "动", meaning: "di chuyển" },
                  { pinyin: "diǎn", hanzi: "点", meaning: "điểm, giờ" },
                  { pinyin: "dú", hanzi: "读", meaning: "đọc" }
                ]
              },
              {
                sound: "t",
                label: "Nhóm T",
                words: [
                  { pinyin: "tā", hanzi: "他/她", meaning: "anh ấy / cô ấy" },
                  { pinyin: "tóu", hanzi: "头", meaning: "đầu" },
                  { pinyin: "tiān", hanzi: "天", meaning: "trời, ngày" },
                  { pinyin: "tīng", hanzi: "听", meaning: "nghe" },
                  { pinyin: "tài", hanzi: "太", meaning: "quá mức" },
                  { pinyin: "táng", hanzi: "糖", meaning: "đường, kẹo" },
                  { pinyin: "tǐ", hanzi: "体", meaning: "thân thể" },
                  { pinyin: "tuī", hanzi: "推", meaning: "đẩy" },
                  { pinyin: "tóng", hanzi: "同", meaning: "cùng" },
                  { pinyin: "tǔ", hanzi: "土", meaning: "đất" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 5,
      title: "Bài 1.6 — Phụ âm: n · l · h",
      description: "Nhóm n/l dễ lẫn với người Việt miền Nam, h cần phát từ sâu trong họng",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Phụ âm: n · l · h",
            sections: [
              {
                type: "text",
                body: "**Âm N**:\n- Đầu lưỡi chạm vòm miệng trên, hơi thoát qua mũi"
              },
              {
                type: "comparison",
                vietnamese: "Giống 'n' trong 'na, nó' tiếng Việt",
                difference: ""
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Người miền Nam Việt Nam hay lẫn n/l — trong tiếng Trung KHÔNG THỂ lẫn"
              },
              {
                type: "text",
                body: "**Âm L**:\n- Đầu lưỡi chạm vòm miệng trên, hơi thoát ra hai bên cạnh lưỡi"
              },
              {
                type: "comparison",
                vietnamese: "Giống 'l' tiếng Việt",
                difference: ""
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Người miền Nam cần chú ý không đọc l thành n"
              },
              {
                type: "text",
                body: "**Âm H**:\n- Hơi ma sát từ sâu trong cổ họng"
              },
              {
                type: "comparison",
                vietnamese: "Nằm giữa 'h' và 'kh' tiếng Việt",
                difference: ""
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Người Việt hay đọc quá nhẹ"
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "n",
                label: "Nhóm N",
                words: [
                  { pinyin: "nǐ", hanzi: "你", meaning: "bạn" },
                  { pinyin: "nǎ", hanzi: "哪", meaning: "nào" },
                  { pinyin: "nà", hanzi: "那", meaning: "đó" },
                  { pinyin: "nián", hanzi: "年", meaning: "năm" },
                  { pinyin: "néng", hanzi: "能", meaning: "có thể" },
                  { pinyin: "nǎi", hanzi: "奶", meaning: "sữa" },
                  { pinyin: "nán", hanzi: "男", meaning: "nam" },
                  { pinyin: "nǚ", hanzi: "女", meaning: "nữ" },
                  { pinyin: "nuǎn", hanzi: "暖", meaning: "ấm áp" },
                  { pinyin: "nèi", hanzi: "内", meaning: "bên trong" }
                ]
              },
              {
                sound: "l",
                label: "Nhóm L",
                words: [
                  { pinyin: "lǎoshī", hanzi: "老师", meaning: "giáo viên" },
                  { pinyin: "lái", hanzi: "来", meaning: "đến" },
                  { pinyin: "lèi", hanzi: "累", meaning: "mệt" },
                  { pinyin: "lǐ", hanzi: "里", meaning: "trong" },
                  { pinyin: "liù", hanzi: "六", meaning: "sáu" },
                  { pinyin: "lù", hanzi: "路", meaning: "đường" },
                  { pinyin: "lǎo", hanzi: "老", meaning: "già" },
                  { pinyin: "lěng", hanzi: "冷", meaning: "lạnh" },
                  { pinyin: "liǎn", hanzi: "脸", meaning: "mặt" },
                  { pinyin: "lóu", hanzi: "楼", meaning: "tầng, tòa nhà" }
                ]
              },
              {
                sound: "h",
                label: "Nhóm H",
                words: [
                  { pinyin: "hǎo", hanzi: "好", meaning: "tốt" },
                  { pinyin: "hē", hanzi: "喝", meaning: "uống" },
                  { pinyin: "hé", hanzi: "和", meaning: "và" },
                  { pinyin: "hěn", hanzi: "很", meaning: "rất" },
                  { pinyin: "hái", hanzi: "还", meaning: "vẫn còn" },
                  { pinyin: "huí", hanzi: "回", meaning: "quay về" },
                  { pinyin: "hào", hanzi: "号", meaning: "số, ngày" },
                  { pinyin: "hēi", hanzi: "黑", meaning: "đen" },
                  { pinyin: "huā", hanzi: "花", meaning: "hoa" },
                  { pinyin: "hòu", hanzi: "后", meaning: "sau" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 6,
      title: "Bài 1.7 — Phụ âm: g · k · j · q · x",
      description: "Hai nhóm phụ âm gốc lưỡi và vòm — quy tắc j/q/x chỉ đi với i và ü",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Phụ âm: g · k · j · q · x",
            sections: [
              {
                type: "text",
                body: "**Âm G**:\n- Gốc lưỡi chạm vòm mềm phía sau, bật ra — không bật hơi, không rung thanh quản"
              },
              {
                type: "comparison",
                vietnamese: "Gần 'c/g' tiếng Việt",
                difference: "nhưng vô thanh"
              },
              {
                type: "text",
                body: "**Âm K**:\n- Giống g nhưng bật hơi mạnh"
              },
              {
                type: "comparison",
                vietnamese: "Gần 'kh' tiếng Việt về vị trí",
                difference: ""
              },
              {
                type: "text",
                body: "**Âm J**:\n- Mặt lưỡi chạm vòm cứng, không bật hơi\n- Quy tắc: CHỈ đi với i và ü"
              },
              {
                type: "comparison",
                vietnamese: "Gần 'gi' tiếng Việt miền Bắc",
                difference: "nhưng sắc hơn"
              },
              {
                type: "text",
                body: "**Âm Q**:\n- Giống j nhưng bật hơi mạnh\n- Quy tắc: CHỈ đi với i và ü"
              },
              {
                type: "text",
                body: "**Âm X**:\n- Mặt lưỡi tiếp cận vòm cứng, hơi xì qua khe\n- Quy tắc: CHỈ đi với i và ü"
              },
              {
                type: "comparison",
                vietnamese: "Gần 's' tiếng Việt miền Bắc",
                difference: "nhưng lưỡi cao hơn"
              },
              {
                type: "note",
                label: "Bẫy",
                body: "x tiếng Trung KHÔNG phải 'x' tiếng Việt (đọc như s/ks)"
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "g",
                label: "Nhóm G",
                words: [
                  { pinyin: "gēge", hanzi: "哥哥", meaning: "anh trai" },
                  { pinyin: "gāo", hanzi: "高", meaning: "cao" },
                  { pinyin: "gǒu", hanzi: "狗", meaning: "chó" },
                  { pinyin: "guó", hanzi: "国", meaning: "quốc gia" },
                  { pinyin: "gōng", hanzi: "工", meaning: "công việc" },
                  { pinyin: "gǎn", hanzi: "感", meaning: "cảm giác" },
                  { pinyin: "guì", hanzi: "贵", meaning: "đắt" },
                  { pinyin: "gěi", hanzi: "给", meaning: "cho" },
                  { pinyin: "guān", hanzi: "关", meaning: "đóng, liên quan" },
                  { pinyin: "gēn", hanzi: "跟", meaning: "theo, với" }
                ]
              },
              {
                sound: "k",
                label: "Nhóm K",
                words: [
                  { pinyin: "kàn", hanzi: "看", meaning: "xem" },
                  { pinyin: "kāi", hanzi: "开", meaning: "mở" },
                  { pinyin: "kè", hanzi: "课", meaning: "bài học" },
                  { pinyin: "kuài", hanzi: "快", meaning: "nhanh" },
                  { pinyin: "kǒu", hanzi: "口", meaning: "miệng" },
                  { pinyin: "kū", hanzi: "哭", meaning: "khóc" },
                  { pinyin: "kōng", hanzi: "空", meaning: "trống" },
                  { pinyin: "kǎo", hanzi: "考", meaning: "thi" },
                  { pinyin: "kě", hanzi: "可", meaning: "có thể" },
                  { pinyin: "kuān", hanzi: "宽", meaning: "rộng" }
                ]
              },
              {
                sound: "j",
                label: "Nhóm J",
                words: [
                  { pinyin: "jiā", hanzi: "家", meaning: "nhà" },
                  { pinyin: "jīntiān", hanzi: "今天", meaning: "hôm nay" },
                  { pinyin: "jiào", hanzi: "叫", meaning: "gọi là" },
                  { pinyin: "jiǔ", hanzi: "九", meaning: "chín" },
                  { pinyin: "jǐ", hanzi: "几", meaning: "mấy" },
                  { pinyin: "jìn", hanzi: "进", meaning: "vào" },
                  { pinyin: "jiàn", hanzi: "见", meaning: "gặp" },
                  { pinyin: "jué", hanzi: "觉", meaning: "cảm thấy" },
                  { pinyin: "jīng", hanzi: "经", meaning: "đã qua" },
                  { pinyin: "jiē", hanzi: "接", meaning: "đón" }
                ]
              },
              {
                sound: "q",
                label: "Nhóm Q",
                words: [
                  { pinyin: "qǐng", hanzi: "请", meaning: "mời" },
                  { pinyin: "qù", hanzi: "去", meaning: "đi" },
                  { pinyin: "qián", hanzi: "钱", meaning: "tiền" },
                  { pinyin: "qīng", hanzi: "清", meaning: "trong, rõ" },
                  { pinyin: "qǐ", hanzi: "起", meaning: "dậy" },
                  { pinyin: "qiān", hanzi: "千", meaning: "nghìn" },
                  { pinyin: "qiú", hanzi: "球", meaning: "quả bóng" },
                  { pinyin: "qīn", hanzi: "亲", meaning: "thân" },
                  { pinyin: "quán", hanzi: "全", meaning: "toàn bộ" },
                  { pinyin: "qíng", hanzi: "情", meaning: "tình cảm" }
                ]
              },
              {
                sound: "x",
                label: "Nhóm X",
                words: [
                  { pinyin: "xiǎo", hanzi: "小", meaning: "nhỏ" },
                  { pinyin: "xǐhuān", hanzi: "喜欢", meaning: "thích" },
                  { pinyin: "xué", hanzi: "学", meaning: "học" },
                  { pinyin: "xiān", hanzi: "先", meaning: "trước tiên" },
                  { pinyin: "xīn", hanzi: "心", meaning: "tim" },
                  { pinyin: "xiě", hanzi: "写", meaning: "viết" },
                  { pinyin: "xià", hanzi: "下", meaning: "dưới" },
                  { pinyin: "xiāng", hanzi: "香", meaning: "thơm" },
                  { pinyin: "xìng", hanzi: "姓", meaning: "họ" },
                  { pinyin: "xū", hanzi: "需", meaning: "cần" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 7,
      title: "Bài 1.8 — Phụ âm: zh · ch · sh",
      description: "Nhóm phụ âm lưỡi cuộn — khó nhất với người Việt vì tiếng Việt không có âm này",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Phụ âm: zh · ch · sh",
            sections: [
              {
                type: "text",
                body: "**Kỹ thuật lưỡi cuộn**:\nBước 1: Đặt lưỡi ở vị trí đọc 'l' (đầu lưỡi chạm vòm trên)\nBước 2: Từ từ kéo đầu lưỡi trượt ra phía sau (về phía họng)\nBước 3: Khi lưỡi cuộn đủ → phát âm zh/ch/sh\n\n**Âm ZH**:\n- Cuộn đầu lưỡi ra sau, chạm vòm cứng phía sau, bật ra — không bật hơi"
              },
              {
                type: "comparison",
                vietnamese: "Gần 'tr' trong 'trăng, trời' miền Bắc",
                difference: "nhưng lưỡi cuộn sâu hơn. Miền Nam không có âm tương đương — cần luyện từ đầu"
              },
              {
                type: "text",
                body: "**Âm CH**:\n- Giống zh nhưng bật hơi mạnh"
              },
              {
                type: "comparison",
                vietnamese: "Gần 'ch' tiếng Việt",
                difference: "nhưng lưỡi cuộn sâu hơn"
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Người Việt đọc lưỡi phẳng như tiếng Việt — thiếu động tác cuộn"
              },
              {
                type: "text",
                body: "**Âm SH**:\n- Lưỡi cuộn ra sau, tiếp cận vòm cứng, hơi xì qua khe — không bật hơi"
              },
              {
                type: "comparison",
                vietnamese: "Gần 'sh' tiếng Anh (she, show)",
                difference: "nhưng lưỡi cuộn sâu hơn"
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Người Việt thường đọc sh thành 's' phẳng"
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "zh",
                label: "Nhóm ZH",
                words: [
                  { pinyin: "zhōngguó", hanzi: "中国", meaning: "Trung Quốc" },
                  { pinyin: "zhè", hanzi: "这", meaning: "này" },
                  { pinyin: "zhīdào", hanzi: "知道", meaning: "biết" },
                  { pinyin: "zhǎo", hanzi: "找", meaning: "tìm" },
                  { pinyin: "zhù", hanzi: "住", meaning: "ở" },
                  { pinyin: "zhǎng", hanzi: "长", meaning: "lớn lên" },
                  { pinyin: "zhòng", hanzi: "重", meaning: "nặng" },
                  { pinyin: "zhàn", hanzi: "站", meaning: "đứng, trạm" },
                  { pinyin: "zhēn", hanzi: "真", meaning: "thật" },
                  { pinyin: "zhǔn", hanzi: "准", meaning: "chuẩn" }
                ]
              },
              {
                sound: "ch",
                label: "Nhóm CH",
                words: [
                  { pinyin: "chī", hanzi: "吃", meaning: "ăn" },
                  { pinyin: "chē", hanzi: "车", meaning: "xe" },
                  { pinyin: "chū", hanzi: "出", meaning: "ra" },
                  { pinyin: "chángcháng", hanzi: "常常", meaning: "thường xuyên" },
                  { pinyin: "chéng", hanzi: "城", meaning: "thành phố" },
                  { pinyin: "chā", hanzi: "差", meaning: "kém" },
                  { pinyin: "chǎng", hanzi: "场", meaning: "sân" },
                  { pinyin: "chūn", hanzi: "春", meaning: "mùa xuân" },
                  { pinyin: "chào", hanzi: "超", meaning: "vượt, siêu" },
                  { pinyin: "chí", hanzi: "迟", meaning: "muộn" }
                ]
              },
              {
                sound: "sh",
                label: "Nhóm SH",
                words: [
                  { pinyin: "shū", hanzi: "书", meaning: "sách" },
                  { pinyin: "shì", hanzi: "是", meaning: "là" },
                  { pinyin: "shéi", hanzi: "谁", meaning: "ai" },
                  { pinyin: "shàng", hanzi: "上", meaning: "trên" },
                  { pinyin: "shǒu", hanzi: "手", meaning: "tay" },
                  { pinyin: "shēng", hanzi: "生", meaning: "sinh" },
                  { pinyin: "shí", hanzi: "时", meaning: "thời gian" },
                  { pinyin: "shǎo", hanzi: "少", meaning: "ít" },
                  { pinyin: "shān", hanzi: "山", meaning: "núi" },
                  { pinyin: "shōu", hanzi: "收", meaning: "nhận, thu" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 8,
      title: "Bài 1.9 — Phụ âm: r · z · c · s",
      description: "Hoàn thành 21 phụ âm — r lưỡi cuộn đặc biệt, z/c/s lưỡi phẳng",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Phụ âm: r · z · c · s",
            sections: [
              {
                type: "text",
                body: "**Điểm mấu chốt**: zh/ch/sh/r = lưỡi CUỘN · z/c/s = lưỡi PHẲNG\n\n**Âm R**:\n- Lưỡi cuộn ra sau như sh — nhưng âm vang hơn, rung nhẹ"
              },
              {
                type: "comparison",
                vietnamese: "Gần 'r' tiếng Anh Mỹ",
                difference: "không rung lưỡi như 'r' tiếng Pháp"
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Người Việt miền Bắc đọc 'r' thành 'z' — sai hoàn toàn"
              },
              {
                type: "text",
                body: "**Âm Z**:\n- Đầu lưỡi PHẲNG chạm chân răng dưới, bật ra — không bật hơi"
              },
              {
                type: "comparison",
                vietnamese: "Gần 'd/z' tiếng Việt miền Bắc",
                difference: ""
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Không lẫn z (phẳng) với zh (cuộn)"
              },
              {
                type: "text",
                body: "**Âm C**:\n- Giống z nhưng bật hơi mạnh"
              },
              {
                type: "comparison",
                vietnamese: "Gần 'x' tiếng Việt (trong 'xe, xanh')",
                difference: "nhưng bật hơi hơn"
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Không lẫn c (phẳng) với ch (cuộn)"
              },
              {
                type: "text",
                body: "**Âm S**:\n- Đầu lưỡi phẳng, tiếp cận chân răng dưới, hơi xì"
              },
              {
                type: "comparison",
                vietnamese: "Gần 's' tiếng Việt miền Bắc",
                difference: ""
              },
              {
                type: "note",
                label: "Bẫy",
                body: "Không lẫn s (phẳng) với sh (cuộn)"
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "r",
                label: "Nhóm R",
                words: [
                  { pinyin: "rén", hanzi: "人", meaning: "người" },
                  { pinyin: "rì", hanzi: "日", meaning: "ngày" },
                  { pinyin: "ròu", hanzi: "肉", meaning: "thịt" },
                  { pinyin: "rè", hanzi: "热", meaning: "nóng" },
                  { pinyin: "rúguǒ", hanzi: "如果", meaning: "nếu" },
                  { pinyin: "rèn", hanzi: "认", meaning: "nhận ra" },
                  { pinyin: "ràng", hanzi: "让", meaning: "để, cho phép" },
                  { pinyin: "rán", hanzi: "然", meaning: "nhiên, vậy" },
                  { pinyin: "rù", hanzi: "入", meaning: "vào" },
                  { pinyin: "róng", hanzi: "容", meaning: "chứa, dễ dàng" }
                ]
              },
              {
                sound: "z",
                label: "Nhóm Z",
                words: [
                  { pinyin: "zài", hanzi: "在", meaning: "ở, đang" },
                  { pinyin: "zuò", hanzi: "做", meaning: "làm" },
                  { pinyin: "zǎo", hanzi: "早", meaning: "sớm" },
                  { pinyin: "zěnme", hanzi: "怎么", meaning: "như thế nào" },
                  { pinyin: "zuǒ", hanzi: "左", meaning: "bên trái" },
                  { pinyin: "zì", hanzi: "字", meaning: "chữ" },
                  { pinyin: "zǒu", hanzi: "走", meaning: "đi bộ" },
                  { pinyin: "zài", hanzi: "再", meaning: "lại" },
                  { pinyin: "zōng", hanzi: "总", meaning: "tổng" },
                  { pinyin: "zū", hanzi: "租", meaning: "thuê" }
                ]
              },
              {
                sound: "c",
                label: "Nhóm C",
                words: [
                  { pinyin: "cài", hanzi: "菜", meaning: "rau, món ăn" },
                  { pinyin: "cóng", hanzi: "从", meaning: "từ" },
                  { pinyin: "cuò", hanzi: "错", meaning: "sai" },
                  { pinyin: "cān", hanzi: "餐", meaning: "bữa ăn" },
                  { pinyin: "céng", hanzi: "层", meaning: "tầng" },
                  { pinyin: "cè", hanzi: "厕", meaning: "nhà vệ sinh" },
                  { pinyin: "cún", hanzi: "存", meaning: "lưu trữ" },
                  { pinyin: "cǎo", hanzi: "草", meaning: "cỏ" },
                  { pinyin: "cí", hanzi: "词", meaning: "từ vựng" },
                  { pinyin: "cì", hanzi: "次", meaning: "lần" }
                ]
              },
              {
                sound: "s",
                label: "Nhóm S",
                words: [
                  { pinyin: "sān", hanzi: "三", meaning: "ba" },
                  { pinyin: "shuō", hanzi: "说", meaning: "nói" },
                  { pinyin: "suì", hanzi: "岁", meaning: "tuổi" },
                  { pinyin: "sì", hanzi: "四", meaning: "bốn" },
                  { pinyin: "suǒ", hanzi: "所", meaning: "nơi" },
                  { pinyin: "sòng", hanzi: "送", meaning: "tặng" },
                  { pinyin: "shuǐ", hanzi: "水", meaning: "nước" },
                  { pinyin: "sī", hanzi: "思", meaning: "suy nghĩ" },
                  { pinyin: "sùshè", hanzi: "宿舍", meaning: "ký túc xá" },
                  { pinyin: "shàng", hanzi: "上", meaning: "trên" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 9,
      title: "Bài 1.10 — Vần ghép: ai · ei · ao",
      description: "Vần ghép trượt liên tục từ âm đầu đến âm cuối — không đứt quãng",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Vần ghép: ai · ei · ao",
            sections: [
              {
                type: "text",
                body: "**Nguyên lý chung**: Không phát âm từng âm riêng lẻ mà TRƯỢT liên tục — giống trượt băng.\n\n**Vần AI**: a mở rộng → trượt lên i hẹp."
              },
              {
                type: "comparison",
                vietnamese: "Gần 'ai' tiếng Việt",
                difference: ""
              },
              {
                type: "text",
                body: "**Vần EI**: e(ơ) → trượt lên i."
              },
              {
                type: "comparison",
                vietnamese: "Gần 'ơi' tiếng Việt",
                difference: ""
              },
              {
                type: "note",
                label: "Bẫy",
                body: "đọc e sáng thay vì tối."
              },
              {
                type: "text",
                body: "**Vần AO**: a mở rộng → trượt sang o tròn."
              },
              {
                type: "comparison",
                vietnamese: "Gần 'ao' tiếng Việt",
                difference: "nhưng o cuối cần tròn môi hơn."
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "ai",
                label: "Nhóm AI",
                words: [
                  { pinyin: "ài", hanzi: "爱", meaning: "yêu" },
                  { pinyin: "mǎi", hanzi: "买", meaning: "mua" },
                  { pinyin: "lái", hanzi: "来", meaning: "đến" },
                  { pinyin: "hái", hanzi: "还", meaning: "vẫn còn" },
                  { pinyin: "tài", hanzi: "太", meaning: "quá" },
                  { pinyin: "bái", hanzi: "白", meaning: "trắng" },
                  { pinyin: "kāi", hanzi: "开", meaning: "mở" },
                  { pinyin: "zài", hanzi: "在", meaning: "ở" },
                  { pinyin: "nǎi", hanzi: "奶", meaning: "sữa" },
                  { pinyin: "pái", hanzi: "排", meaning: "hàng, xếp" }
                ]
              },
              {
                sound: "ei",
                label: "Nhóm EI",
                words: [
                  { pinyin: "gěi", hanzi: "给", meaning: "cho" },
                  { pinyin: "hēi", hanzi: "黑", meaning: "đen" },
                  { pinyin: "bèi", hanzi: "被", meaning: "bị" },
                  { pinyin: "méi", hanzi: "没", meaning: "không có" },
                  { pinyin: "fēi", hanzi: "飞", meaning: "bay" },
                  { pinyin: "lèi", hanzi: "累", meaning: "mệt" },
                  { pinyin: "pèi", hanzi: "配", meaning: "kết hợp" },
                  { pinyin: "wèi", hanzi: "为", meaning: "vì" },
                  { pinyin: "nèi", hanzi: "内", meaning: "bên trong" },
                  { pinyin: "děi", hanzi: "得", meaning: "phải (bắt buộc)" }
                ]
              },
              {
                sound: "ao",
                label: "Nhóm AO",
                words: [
                  { pinyin: "hǎo", hanzi: "好", meaning: "tốt" },
                  { pinyin: "māo", hanzi: "猫", meaning: "mèo" },
                  { pinyin: "gāo", hanzi: "高", meaning: "cao" },
                  { pinyin: "zǎo", hanzi: "早", meaning: "sớm" },
                  { pinyin: "pǎo", hanzi: "跑", meaning: "chạy" },
                  { pinyin: "bǎo", hanzi: "饱", meaning: "no" },
                  { pinyin: "dào", hanzi: "到", meaning: "đến" },
                  { pinyin: "lǎo", hanzi: "老", meaning: "già" },
                  { pinyin: "xiǎo", hanzi: "小", meaning: "nhỏ" },
                  { pinyin: "nǎo", hanzi: "脑", meaning: "não" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 10,
      title: "Bài 1.11 — Vần ghép: ou · an · en",
      description: "Vần ou và hai vần kết thúc bằng âm mũi nhẹ -n",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Vần ghép: ou · an · en",
            sections: [
              {
                type: "text",
                body: "**Vần OU**: o tròn → trượt sang u chúm hơn."
              },
              {
                type: "note",
                label: "Bẫy",
                body: "đọc thành 'ao'."
              },
              {
                type: "text",
                body: "**Vần AN**: a mở → kết thúc bằng -n mũi nhẹ."
              },
              {
                type: "comparison",
                vietnamese: "Gần 'an' tiếng Việt",
                difference: ""
              },
              {
                type: "text",
                body: "**Vần EN**: e(ơ) → kết thúc bằng -n."
              },
              {
                type: "comparison",
                vietnamese: "= 'ơn' tiếng Việt",
                difference: ""
              },
              {
                type: "note",
                label: "Bẫy",
                body: "đọc e sáng thay vì tối."
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "ou",
                label: "Nhóm OU",
                words: [
                  { pinyin: "gǒu", hanzi: "狗", meaning: "chó" },
                  { pinyin: "tóu", hanzi: "头", meaning: "đầu" },
                  { pinyin: "shǒu", hanzi: "手", meaning: "tay" },
                  { pinyin: "lóu", hanzi: "楼", meaning: "tầng" },
                  { pinyin: "kǒu", hanzi: "口", meaning: "miệng" },
                  { pinyin: "hòu", hanzi: "后", meaning: "sau" },
                  { pinyin: "zǒu", hanzi: "走", meaning: "đi bộ" },
                  { pinyin: "dōu", hanzi: "都", meaning: "đều" },
                  { pinyin: "niú", hanzi: "牛", meaning: "bò" },
                  { pinyin: "péngyǒu", hanzi: "朋友", meaning: "bạn bè" }
                ]
              },
              {
                sound: "an",
                label: "Nhóm AN",
                words: [
                  { pinyin: "māfan", hanzi: "麻烦", meaning: "phiền phức" },
                  { pinyin: "nán", hanzi: "男", meaning: "nam" },
                  { pinyin: "wǎn", hanzi: "晚", meaning: "tối, muộn" },
                  { pinyin: "fàn", hanzi: "饭", meaning: "cơm" },
                  { pinyin: "kàn", hanzi: "看", meaning: "xem" },
                  { pinyin: "bān", hanzi: "班", meaning: "lớp học" },
                  { pinyin: "zhàn", hanzi: "站", meaning: "trạm" },
                  { pinyin: "qián", hanzi: "钱", meaning: "tiền" },
                  { pinyin: "tiān", hanzi: "天", meaning: "trời, ngày" },
                  { pinyin: "wán", hanzi: "完", meaning: "xong" }
                ]
              },
              {
                sound: "en",
                label: "Nhóm EN",
                words: [
                  { pinyin: "mén", hanzi: "门", meaning: "cửa" },
                  { pinyin: "rén", hanzi: "人", meaning: "người" },
                  { pinyin: "hěn", hanzi: "很", meaning: "rất" },
                  { pinyin: "shēn", hanzi: "身", meaning: "thân" },
                  { pinyin: "gēn", hanzi: "跟", meaning: "theo" },
                  { pinyin: "zhēn", hanzi: "真", meaning: "thật" },
                  { pinyin: "fēn", hanzi: "分", meaning: "phút, điểm" },
                  { pinyin: "bèn", hanzi: "笨", meaning: "ngốc" },
                  { pinyin: "wèn", hanzi: "问", meaning: "hỏi" },
                  { pinyin: "nèn", hanzi: "嫩", meaning: "non, mềm" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 11,
      title: "Bài 1.12 — Vần mũi: ang · eng · ong",
      description: "Vần kết thúc bằng -ng vòm mềm — gốc lưỡi chạm vòm sau",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Vần mũi: ang · eng · ong",
            sections: [
              {
                type: "text",
                body: "**Vần ANG**: a + ng vòm mềm."
              },
              {
                type: "comparison",
                vietnamese: "Gần 'ang' tiếng Việt.",
                difference: ""
              },
              {
                type: "text",
                body: "**Vần ENG**: e(ơ) + ng vòm mềm"
              },
              {
                type: "comparison",
                vietnamese: "= 'ơng' tiếng Việt.",
                difference: ""
              },
              {
                type: "note",
                label: "Bẫy",
                body: "đọc 'eng' sáng."
              },
              {
                type: "text",
                body: "**Vần ONG**: o + ng vòm mềm."
              },
              {
                type: "comparison",
                vietnamese: "Gần 'ông' tiếng Việt.",
                difference: ""
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "ang",
                label: "Nhóm ANG",
                words: [
                  { pinyin: "máng", hanzi: "忙", meaning: "bận rộn" },
                  { pinyin: "fāng", hanzi: "方", meaning: "phương" },
                  { pinyin: "gāng", hanzi: "刚", meaning: "vừa mới" },
                  { pinyin: "chàng", hanzi: "唱", meaning: "hát" },
                  { pinyin: "zhǎng", hanzi: "长", meaning: "lớn lên" },
                  { pinyin: "páng", hanzi: "旁", meaning: "bên cạnh" },
                  { pinyin: "tāng", hanzi: "汤", meaning: "canh" },
                  { pinyin: "xiāng", hanzi: "香", meaning: "thơm" },
                  { pinyin: "liáng", hanzi: "凉", meaning: "mát mẻ" },
                  { pinyin: "wáng", hanzi: "王", meaning: "vua, họ Vương" }
                ]
              },
              {
                sound: "eng",
                label: "Nhóm ENG",
                words: [
                  { pinyin: "néng", hanzi: "能", meaning: "có thể" },
                  { pinyin: "lěng", hanzi: "冷", meaning: "lạnh" },
                  { pinyin: "shēng", hanzi: "生", meaning: "sinh" },
                  { pinyin: "děng", hanzi: "等", meaning: "đợi" },
                  { pinyin: "chéng", hanzi: "城", meaning: "thành phố" },
                  { pinyin: "fēng", hanzi: "风", meaning: "gió" },
                  { pinyin: "péng", hanzi: "朋", meaning: "bạn" },
                  { pinyin: "zhèng", hanzi: "正", meaning: "đúng" },
                  { pinyin: "céng", hanzi: "层", meaning: "tầng" },
                  { pinyin: "bèng", hanzi: "蹦", meaning: "nhảy" }
                ]
              },
              {
                sound: "ong",
                label: "Nhóm ONG",
                words: [
                  { pinyin: "gōng", hanzi: "工", meaning: "công việc" },
                  { pinyin: "zhōng", hanzi: "中", meaning: "giữa, Trung" },
                  { pinyin: "tōng", hanzi: "通", meaning: "thông, qua" },
                  { pinyin: "dòng", hanzi: "动", meaning: "động" },
                  { pinyin: "lóng", hanzi: "龙", meaning: "rồng" },
                  { pinyin: "cōng", hanzi: "聪", meaning: "thông minh" },
                  { pinyin: "hóng", hanzi: "红", meaning: "đỏ" },
                  { pinyin: "kōng", hanzi: "空", meaning: "trống" },
                  { pinyin: "sòng", hanzi: "送", meaning: "tặng" },
                  { pinyin: "yòng", hanzi: "用", meaning: "dùng" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 12,
      title: "Bài 1.13 — Vần mũi: in · ing · un",
      description: "Ba vần mũi hay gặp trong HSK1-2",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Vần mũi: in · ing · un",
            sections: [
              {
                type: "text",
                body: "**Vần IN**: i + n mũi trước."
              },
              {
                type: "comparison",
                vietnamese: "Gần 'in' tiếng Việt.",
                difference: ""
              },
              {
                type: "text",
                body: "**Vần ING**: i + ng mũi sau."
              },
              {
                type: "note",
                label: "Bẫy",
                body: "người Việt đọc '-inh' thay vì '-ing'."
              },
              {
                type: "text",
                body: "**Vần UN**: u + n mũi trước."
              },
              {
                type: "note",
                label: "Bẫy",
                body: "sau j/q/x/y đọc là 'ün'."
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "in",
                label: "Nhóm IN",
                words: [
                  { pinyin: "xīn", hanzi: "心", meaning: "tim" },
                  { pinyin: "jīn", hanzi: "今", meaning: "nay" },
                  { pinyin: "lín", hanzi: "林", meaning: "rừng" },
                  { pinyin: "mín", hanzi: "民", meaning: "dân" },
                  { pinyin: "yīn", hanzi: "音", meaning: "âm thanh" },
                  { pinyin: "qīn", hanzi: "亲", meaning: "thân" },
                  { pinyin: "zhēn", hanzi: "真", meaning: "thật" },
                  { pinyin: "bīn", hanzi: "宾", meaning: "khách" },
                  { pinyin: "pín", hanzi: "贫", meaning: "nghèo" },
                  { pinyin: "xìn", hanzi: "信", meaning: "thư, tin tưởng" }
                ]
              },
              {
                sound: "ing",
                label: "Nhóm ING",
                words: [
                  { pinyin: "míng", hanzi: "名", meaning: "tên" },
                  { pinyin: "tīng", hanzi: "听", meaning: "nghe" },
                  { pinyin: "xìng", hanzi: "姓", meaning: "họ" },
                  { pinyin: "jīng", hanzi: "经", meaning: "đã, kinh" },
                  { pinyin: "píng", hanzi: "平", meaning: "bằng phẳng" },
                  { pinyin: "yǐng", hanzi: "影", meaning: "bóng, phim" },
                  { pinyin: "dīng", hanzi: "丁", meaning: "đinh" },
                  { pinyin: "bīng", hanzi: "冰", meaning: "băng" },
                  { pinyin: "qíng", hanzi: "情", meaning: "tình cảm" },
                  { pinyin: "lǐng", hanzi: "领", meaning: "lĩnh, dẫn" }
                ]
              },
              {
                sound: "un",
                label: "Nhóm UN",
                words: [
                  { pinyin: "wèn", hanzi: "问", meaning: "hỏi" },
                  { pinyin: "jūn", hanzi: "军", meaning: "quân đội" },
                  { pinyin: "lún", hanzi: "轮", meaning: "bánh xe" },
                  { pinyin: "kùn", hanzi: "困", meaning: "buồn ngủ" },
                  { pinyin: "chūn", hanzi: "春", meaning: "mùa xuân" },
                  { pinyin: "yùn", hanzi: "运", meaning: "vận" },
                  { pinyin: "qún", hanzi: "裙", meaning: "váy" },
                  { pinyin: "xùn", hanzi: "训", meaning: "huấn luyện" },
                  { pinyin: "shùn", hanzi: "顺", meaning: "thuận" },
                  { pinyin: "tún", hanzi: "屯", meaning: "tích trữ" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 13,
      title: "Bài 1.14 — Âm tiết đặc biệt: zhi · chi · shi · ri",
      description: "Âm tiết lưỡi cuộn — âm 'i' đặc biệt ngân trong họng, không phải 'i' bình thường",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Âm tiết đặc biệt: zhi · chi · shi · ri",
            sections: [
              {
                type: "text",
                body: "**Đặc điểm chung**: Sau zh/ch/sh/r, âm 'i' biến thành âm ngân đặc biệt (gần 'ư' tiếng Việt nhưng lưỡi cuộn).\n\n**ZHI**: zh cuộn + i đặc biệt."
              },
              {
                type: "comparison",
                vietnamese: "Không có tương đương tiếng Việt",
                difference: ""
              },
              {
                type: "text",
                body: "**CHI**: ch cuộn bật hơi + i đặc biệt."
              },
              {
                type: "comparison",
                vietnamese: "Gần 'chư' cuộn",
                difference: ""
              },
              {
                type: "text",
                body: "**SHI**: sh cuộn xì + i đặc biệt."
              },
              {
                type: "comparison",
                vietnamese: "Không có tương đương",
                difference: ""
              },
              {
                type: "text",
                body: "**RI**: r cuộn âm vang + i đặc biệt. Khó nhất nhóm này."
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "zhi",
                label: "Nhóm ZHI",
                words: [
                  { pinyin: "zhī", hanzi: "知", meaning: "biết" },
                  { pinyin: "zhǐ", hanzi: "只", meaning: "chỉ" },
                  { pinyin: "zhì", hanzi: "志", meaning: "chí" },
                  { pinyin: "zhège", hanzi: "这个", meaning: "cái này" },
                  { pinyin: "zhèli", hanzi: "这里", meaning: "ở đây" },
                  { pinyin: "zhǎo", hanzi: "找", meaning: "tìm" },
                  { pinyin: "zhù", hanzi: "住", meaning: "ở" },
                  { pinyin: "zhōng", hanzi: "中", meaning: "giữa" },
                  { pinyin: "zhēn", hanzi: "真", meaning: "thật" },
                  { pinyin: "zhǔn", hanzi: "准", meaning: "chuẩn" }
                ]
              },
              {
                sound: "chi",
                label: "Nhóm CHI",
                words: [
                  { pinyin: "chī", hanzi: "吃", meaning: "ăn" },
                  { pinyin: "chí", hanzi: "迟", meaning: "muộn" },
                  { pinyin: "chē", hanzi: "车", meaning: "xe" },
                  { pinyin: "chū", hanzi: "出", meaning: "ra" },
                  { pinyin: "chángcháng", hanzi: "常常", meaning: "thường xuyên" },
                  { pinyin: "chéng", hanzi: "城", meaning: "thành phố" },
                  { pinyin: "chūn", hanzi: "春", meaning: "mùa xuân" },
                  { pinyin: "chǎo", hanzi: "炒", meaning: "xào" },
                  { pinyin: "chà", hanzi: "差", meaning: "kém" },
                  { pinyin: "chī", hanzi: "池", meaning: "ao, hồ nhỏ" }
                ]
              },
              {
                sound: "shi",
                label: "Nhóm SHI",
                words: [
                  { pinyin: "shì", hanzi: "是", meaning: "là" },
                  { pinyin: "shū", hanzi: "书", meaning: "sách" },
                  { pinyin: "shéi", hanzi: "谁", meaning: "ai" },
                  { pinyin: "shàng", hanzi: "上", meaning: "trên" },
                  { pinyin: "shǒu", hanzi: "手", meaning: "tay" },
                  { pinyin: "shēng", hanzi: "生", meaning: "sinh" },
                  { pinyin: "shí", hanzi: "时", meaning: "lúc" },
                  { pinyin: "shǎo", hanzi: "少", meaning: "ít" },
                  { pinyin: "shān", hanzi: "山", meaning: "núi" },
                  { pinyin: "shénme", hanzi: "什么", meaning: "cái gì" }
                ]
              },
              {
                sound: "ri",
                label: "Nhóm RI",
                words: [
                  { pinyin: "rì", hanzi: "日", meaning: "ngày" },
                  { pinyin: "rén", hanzi: "人", meaning: "người" },
                  { pinyin: "rè", hanzi: "热", meaning: "nóng" },
                  { pinyin: "ròu", hanzi: "肉", meaning: "thịt" },
                  { pinyin: "rúguǒ", hanzi: "如果", meaning: "nếu" },
                  { pinyin: "ràng", hanzi: "让", meaning: "để" },
                  { pinyin: "rán", hanzi: "然", meaning: "nhiên" },
                  { pinyin: "rèn", hanzi: "认", meaning: "nhận ra" },
                  { pinyin: "Rìběn", hanzi: "日本", meaning: "Nhật Bản" },
                  { pinyin: "róngyì", hanzi: "容易", meaning: "dễ dàng" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 14,
      title: "Bài 1.15 — Âm tiết đặc biệt: zi · ci · si · yi · wu · yu",
      description: "zi/ci/si lưỡi phẳng + yi/wu/yu là âm tiết không có phụ âm đầu (zero initial)",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Âm tiết đặc biệt: zi · ci · si · yi · wu · yu",
            sections: [
              {
                type: "text",
                body: "**ZI/CI/SI**: Lưỡi PHẲNG + i đặc biệt. Phân biệt với zhi/chi/shi (lưỡi cuộn).\n\n**Quy tắc Zero Initial**:\n- i → yi (yī 一)\n- u → wu (wǔ 五)\n- ü → yu (yú 鱼) — yu đọc là 'yü', môi tròn"
              },
              {
                type: "note",
                label: "Bẫy",
                body: "yu đọc là 'yü' — môi phải tròn như khi đọc ü, không phải 'yu' như 'yêu' tiếng Việt."
              }
            ]
          }
        },
        {
          contentType: "EXERCISE",
          orderIndex: 1,
          content: {
            title: "Luyện đọc",
            instruction: "Đọc to, đọc chậm, mỗi từ ít nhất 3 lần.",
            groups: [
              {
                sound: "zi",
                label: "Nhóm ZI",
                words: [
                  { pinyin: "zì", hanzi: "字", meaning: "chữ" },
                  { pinyin: "zǐ", hanzi: "子", meaning: "con" },
                  { pinyin: "zài", hanzi: "在", meaning: "ở" },
                  { pinyin: "zǎo", hanzi: "早", meaning: "sớm" },
                  { pinyin: "zuò", hanzi: "做", meaning: "làm" },
                  { pinyin: "zǒu", hanzi: "走", meaning: "đi" },
                  { pinyin: "zěnme", hanzi: "怎么", meaning: "như thế nào" },
                  { pinyin: "zuǒ", hanzi: "左", meaning: "trái" },
                  { pinyin: "zōng", hanzi: "总", meaning: "tổng" },
                  { pinyin: "zū", hanzi: "租", meaning: "thuê" }
                ]
              },
              {
                sound: "ci",
                label: "Nhóm CI",
                words: [
                  { pinyin: "cì", hanzi: "次", meaning: "lần" },
                  { pinyin: "cí", hanzi: "词", meaning: "từ vựng" },
                  { pinyin: "cài", hanzi: "菜", meaning: "rau" },
                  { pinyin: "cóng", hanzi: "从", meaning: "từ" },
                  { pinyin: "cuò", hanzi: "错", meaning: "sai" },
                  { pinyin: "cān", hanzi: "餐", meaning: "bữa ăn" },
                  { pinyin: "céng", hanzi: "层", meaning: "tầng" },
                  { pinyin: "cǎo", hanzi: "草", meaning: "cỏ" },
                  { pinyin: "cún", hanzi: "存", meaning: "lưu" },
                  { pinyin: "cháng", hanzi: "长", meaning: "dài" }
                ]
              },
              {
                sound: "si",
                label: "Nhóm SI",
                words: [
                  { pinyin: "sì", hanzi: "四", meaning: "bốn" },
                  { pinyin: "sī", hanzi: "思", meaning: "suy nghĩ" },
                  { pinyin: "sān", hanzi: "三", meaning: "ba" },
                  { pinyin: "suì", hanzi: "岁", meaning: "tuổi" },
                  { pinyin: "shuō", hanzi: "说", meaning: "nói" },
                  { pinyin: "suǒ", hanzi: "所", meaning: "nơi" },
                  { pinyin: "sòng", hanzi: "送", meaning: "tặng" },
                  { pinyin: "shuǐ", hanzi: "水", meaning: "nước" },
                  { pinyin: "shàng", hanzi: "上", meaning: "trên" },
                  { pinyin: "sùshè", hanzi: "宿舍", meaning: "ký túc xá" }
                ]
              },
              {
                sound: "yi",
                label: "Nhóm YI",
                words: [
                  { pinyin: "yī", hanzi: "一", meaning: "một" },
                  { pinyin: "yǐ", hanzi: "以", meaning: "bằng cách" },
                  { pinyin: "yì", hanzi: "意", meaning: "ý nghĩa" },
                  { pinyin: "yīnwèi", hanzi: "因为", meaning: "vì" },
                  { pinyin: "yǒu", hanzi: "有", meaning: "có" },
                  { pinyin: "yào", hanzi: "要", meaning: "muốn" },
                  { pinyin: "yuè", hanzi: "月", meaning: "tháng" },
                  { pinyin: "yǎn", hanzi: "眼", meaning: "mắt" },
                  { pinyin: "yīfu", hanzi: "衣服", meaning: "quần áo" },
                  { pinyin: "yīqǐ", hanzi: "一起", meaning: "cùng nhau" }
                ]
              },
              {
                sound: "wu",
                label: "Nhóm WU",
                words: [
                  { pinyin: "wǔ", hanzi: "五", meaning: "năm" },
                  { pinyin: "wǒ", hanzi: "我", meaning: "tôi" },
                  { pinyin: "wèn", hanzi: "问", meaning: "hỏi" },
                  { pinyin: "wán", hanzi: "完", meaning: "xong" },
                  { pinyin: "wǎng", hanzi: "网", meaning: "mạng" },
                  { pinyin: "wàn", hanzi: "万", meaning: "mười nghìn" },
                  { pinyin: "wài", hanzi: "外", meaning: "ngoài" },
                  { pinyin: "wǎn", hanzi: "晚", meaning: "tối, muộn" },
                  { pinyin: "wéi", hanzi: "为", meaning: "vì" },
                  { pinyin: "wū", hanzi: "屋", meaning: "phòng" }
                ]
              },
              {
                sound: "yu",
                label: "Nhóm YU",
                words: [
                  { pinyin: "yú", hanzi: "鱼", meaning: "cá" },
                  { pinyin: "yǔ", hanzi: "雨", meaning: "mưa" },
                  { pinyin: "yùn", hanzi: "运", meaning: "vận" },
                  { pinyin: "yuè", hanzi: "月", meaning: "tháng" },
                  { pinyin: "yuán", hanzi: "元", meaning: "đồng tệ" },
                  { pinyin: "yún", hanzi: "云", meaning: "mây" },
                  { pinyin: "yǔ", hanzi: "语", meaning: "ngôn ngữ" },
                  { pinyin: "qún", hanzi: "裙", meaning: "váy" },
                  { pinyin: "lǚ", hanzi: "旅", meaning: "du lịch" },
                  { pinyin: "jù", hanzi: "句", meaning: "câu" }
                ]
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 15,
      title: "Bài 1.16 — Quy tắc đặt dấu thanh",
      description: "3 quy tắc xác định nguyên âm nào nhận dấu thanh khi vần có nhiều nguyên âm",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Quy tắc đặt dấu thanh",
            sections: [
              {
                type: "text",
                body: "**Quy tắc 1**: Vần có a hoặc e → dấu luôn đặt lên a/e\nVí dụ: māo (dấu trên a), gěi (dấu trên e)\n\n**Quy tắc 2**: Vần là ou → dấu đặt lên o\nVí dụ: gǒu (dấu trên o), tōu (dấu trên o)\n\n**Quy tắc 3**: i và u đứng cạnh nhau → dấu đặt lên âm đứng SAU\nVí dụ: liù (iu → dấu lên u), guì (ui → dấu lên i)\n\n**Quy tắc bổ sung**: j/q/x/y + u → thực ra là ü (không có hai chấm)\nVí dụ: jǔ = j+ü, qù = q+ü, xū = x+ü, yú = y+ü\n\nBảng tổng kết:\n| Tình huống | Dấu đặt lên | Ví dụ |\n|---|---|---|\n| Vần có a | a | māo, hǎo, tài |\n| Vần có e | e | gěi, hēi, léng |\n| Vần là ou | o | gǒu, tōu |\n| i + u | u (đứng sau) | liù, niú |\n| u + i | i (đứng sau) | guì, huí |\n| j/q/x/y + u | ü (viết u) | jǔ, qù, xū, yú |"
              }
            ]
          }
        }
      ]
    },
    {
      orderIndex: 16,
      title: "Bài 1.17 — Biến điệu (变调)",
      description: "3 quy tắc biến điệu quan trọng nhất — không viết lại pinyin, chỉ đọc khác",
      isPremium: false,
      contents: [
        {
          contentType: "THEORY",
          orderIndex: 0,
          content: {
            title: "Biến điệu (变调)",
            sections: [
              {
                type: "text",
                body: "**Quy tắc 1 — Thanh 3 + Thanh 3**:\nThanh 3 đứng trước thanh 3 → đọc thành thanh 2\nVí dụ: nǐ hǎo viết vậy nhưng đọc là ní hǎo\n\nCác từ thường gặp:\n- nǐ hǎo → ní hǎo (你好 — xin chào)\n- wǒ yě → wó yě (我也 — tôi cũng)\n- kě yǐ → ké yǐ (可以 — có thể)\n- suǒ yǐ → suó yǐ (所以 — vì vậy)\n\n**Quy tắc 2 — Biến điệu của 不 (bù)**:\n不 bù + thanh 1/2/3 → giữ nguyên bù\n不 bù + thanh 4 → đọc thành bú\n\nVí dụ:\n- bù hǎo → bù hǎo (không tốt — 好 là thanh 3)\n- bù shì → bú shì (không phải — 是 là thanh 4)\n- bù qù → bú qù (không đi — 去 là thanh 4)\n\n**Quy tắc 3 — Biến điệu của 一 (yī)**:\n一 yī + thanh 1/2/3 → đọc thành yì (thanh 4)\n一 yī + thanh 4 → đọc thành yí (thanh 2)\n一 đứng cuối / độc lập → giữ nguyên yī\n\nVí dụ:\n- yī tiān → yì tiān (一天 — một ngày, 天 là thanh 1)\n- yī gè → yí gè (一个 — một cái, 个 là thanh 4)\n- dì yī → dì yī (第一 — thứ nhất, đứng cuối)\n\nThanh nhẹ cố định một số từ thông dụng: māma (妈妈), bāba (爸爸), péngyou (朋友), xuésheng (学生), míngzi (名字)"
              }
            ]
          }
        }
      ]
    }
  ]
};

fs.writeFileSync('f:/Projects/ThuongTra-VanHoc/edu-platform/data/TiengTrungNhapMon.json', JSON.stringify(data, null, 2), 'utf-8');
console.log('JSON has been generated and saved.');

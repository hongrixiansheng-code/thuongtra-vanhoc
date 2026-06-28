User Dashboard
│
├── Chọn chương trình (HSK1 / Starters / Movers...)
│   └── URL: /dashboard?level=hsk1
│
├── Danh sách bài học (theo theme/chủ đề)
│   ├── Bài 0 (intro) → luôn mở
│   ├── Bài 1 → mở nếu bài 0 là intro HOẶC đã hoàn thành bài 0
│   ├── Bài 2+ → phải hoàn thành bài trước
│   ├── Bài isPremium → phải có gói Premium
│   └── ADMIN → tất cả bài đều mở
│
└── Nhấn vào bài → LessonStepFlow (13 bước)
    │
    ├── VOCAB BATCH 1 (5 từ)
    │   ├── Hiện từng card: hanzi/word · pinyin/ipa · type_short · meaning
    │   ├── Audio: đọc từ theo lang (zh-CN / en-US)
    │   └── [Tiếng Trung] Nhấn vào từ → Modal luyện viết chữ Hán
    │       ├── HanziWriter hiển thị nét bút
    │       ├── Người dùng tự viết theo
    │       └── Đóng modal → tiếp tục
    │
    ├── VOCAB BATCH 2 (5 từ)
    │
    ├── MINI TEST 1 (sau batch 1+2)
    │   ├── 3 câu hỏi MC từ 10 từ vừa học
    │   └── Câu hỏi: "hanzi/word có nghĩa là gì?"
    │
    ├── VOCAB BATCH 3 (5 từ)
    │
    ├── VOCAB BATCH 4 (5 từ)
    │
    ├── MINI TEST 2 (sau batch 3+4)
    │
    ├── GRAMMAR 1
    │   ├── Tiêu đề · mô tả
    │   ├── Công thức (formula với Tailwind classes)
    │   └── Ví dụ thực tế
    │       ├── correct · pinyin · meaning
    │       └── Audio: nhấn để nghe (zh-CN / en-US)
    │
    ├── GRAMMAR 2
    │
    ├── GRAMMAR 3
    │
    ├── DIALOGUE 1
    │   ├── Bubble chat: A (trái) / B (phải)
    │   ├── Nội dung: zh + py + vi (HSK) / en + vi (YLE)
    │   ├── Nhấn vào bubble → nghe câu đó
    │   └── Nút "Nghe toàn bài" (toggle · tự động đọc lần lượt)
    │
    ├── DIALOGUE 2
    │
    └── HOÀN THÀNH
        ├── Tính điểm
        ├── Score >= 40 → completed = true
        ├── Lưu UserProgress vào DB
        ├── Hiện màn hình kết quả + điểm
        ├── Unlock thông báo bài tiếp
        └── window.location.reload() → Dashboard đọc lại progress
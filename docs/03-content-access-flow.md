Tab "Học tập" (dropdown)
│
├── Giáo trình → /dashboard?level=...
│
├── Từ vựng → /vocab?level=...
│   ├── getCompletedLessonIds(programCode)
│   ├── ADMIN → lấy tất cả lessonId của program
│   ├── USER → lấy lessonId đã completed
│   ├── getAllVocabData(level, completedLessonIds)
│   │   └── uniqueMap theo hanzi||word (loại trùng)
│   └── VocabTab
│       ├── Hiện tất cả từ đã mở khóa
│       ├── Search (tiếng Việt / tiếng Anh)
│       ├── Filter: Tiếng Việt / Tiếng Anh
│       └── Audio: nhấn để nghe
│
├── Ngữ pháp → /grammar?level=...
│   ├── getCompletedLessonIds(programCode)
│   ├── getAllGrammarData(level, completedLessonIds)
│   │   └── kèm _lessonId · _lessonTitle · _lessonOrderIndex
│   └── GrammarClient
│       ├── Sidebar trái: danh sách bài học
│       └── Content phải: tất cả grammar của bài chọn
│           ├── Tiêu đề · mô tả
│           ├── Công thức (formula)
│           └── Ví dụ + audio
│
└── Hội thoại → /dialogue?level=...
    ├── getCompletedLessonIds(programCode)
    ├── getAllDialogueData(level, completedLessonIds)
    │   └── kèm lessonId · lessonTitle · lessonOrderIndex
    └── DialogueClient
        ├── Sidebar trái: danh sách bài học
        └── Content phải: dialogue của bài chọn
            ├── Bubble chat A/B
            ├── Nhấn bubble → nghe câu
            └── Nút "Nghe toàn bài" (toggle)

Tab "Luyện tập" (dropdown)
│
├── Trò chơi → /games?level=...
│   └── getCompletedLessonIds → lọc vocab
│
├── Ôn tập SRS → /practice?level=...
│   └── getCompletedLessonIds → lọc vocab
│
├── Luyện đọc → /reading?level=...
│   ├── [HSK] ReadingTab (legacy)
│   └── [YLE] 🚧 Đang phát triển
│
├── Luyện nghe → /listening?level=...
│   ├── [HSK] ListeningTab (legacy)
│   └── [YLE] 🚧 Đang phát triển
│
├── Luyện viết → /writing?level=...
│   ├── [HSK] WritingTab (legacy)
│   └── [YLE] 🚧 Đang phát triển
│
└── Thi thử → /mock-test?level=...
    └── getCompletedLessonIds → lọc vocab

Quy tắc chung
├── completedLessonIds luôn filter theo programCode
├── ADMIN → completedLessonIds = tất cả lessonId của program
└── USER chưa học → hiện thông báo "Hoàn thành bài học để mở khóa"
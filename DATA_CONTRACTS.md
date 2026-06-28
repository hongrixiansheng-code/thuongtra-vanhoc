# DATA_CONTRACTS.md
# Vấn Học — Chuẩn dữ liệu nội dung

> **Single source of truth** cho tất cả boxchat, A (Gemini), Claude Code.
> Mọi thay đổi schema phải cập nhật file này trước.
> Phiên bản: 1.0 | Cập nhật: 2025

---

## MỤC LỤC

1. [Cấu trúc tổng thể](#1-cấu-trúc-tổng-thể)
2. [Vocab — Tiếng Trung](#2-vocab--tiếng-trung)
3. [Vocab — Tiếng Anh](#3-vocab--tiếng-anh)
4. [Grammar — Dùng chung](#4-grammar--dùng-chung)
5. [Dialogue — Tiếng Trung](#5-dialogue--tiếng-trung)
6. [Dialogue — Tiếng Anh](#6-dialogue--tiếng-anh)
7. [Cấu trúc file JSON](#7-cấu-trúc-file-json)
8. [Fields đã deprecated](#8-fields-đã-deprecated)
9. [Component đọc field gì](#9-component-đọc-field-gì)

---

## 1. Cấu trúc tổng thể

### Hierarchy trong DB
```
Subject (zh | en)
  └── Program (hsk1 | hsk2 | en-movers | en-flyers | en-ket ...)
        └── Lesson (orderIndex, title, theme, isPremium)
              └── LessonContent (contentType, content: JSON string)
```

### contentType hợp lệ
| Giá trị | Dùng cho |
|---------|---------|
| `THEORY` | Từ vựng (vocab) |
| `GRAMMAR` | Ngữ pháp |
| `DIALOGUE` | Hội thoại |
| `EXERCISE` | Bài tập (chưa dùng) |

---

## 2. Vocab — Tiếng Trung

### Interface
```typescript
interface VocabZH {
  hanzi: string;        // REQUIRED — chữ Hán, VD: "你好"
  pinyin: string;       // REQUIRED — có dấu thanh, VD: "nǐ hǎo"
  type: string;         // REQUIRED — tên đầy đủ, VD: "Động từ"
  type_short: string;   // REQUIRED — viết tắt, xem bảng bên dưới
  meaning: string;      // REQUIRED — nghĩa tiếng Việt ngắn gọn
  example_zh: string;   // REQUIRED — câu ví dụ tiếng Trung
  example_vi: string;   // REQUIRED — dịch tiếng Việt của example_zh
}
```

### Ví dụ đúng
```json
{
  "hanzi": "学生",
  "pinyin": "xuésheng",
  "type": "Danh từ",
  "type_short": "n",
  "meaning": "học sinh",
  "example_zh": "他也是学生。",
  "example_vi": "Anh ấy cũng là học sinh."
}
```

### Bảng type_short hợp lệ (tiếng Trung)
| type_short | type đầy đủ |
|-----------|------------|
| `n` | Danh từ |
| `v` | Động từ |
| `adj` | Tính từ |
| `adv` | Phó từ |
| `pron` | Đại từ |
| `num` | Số từ |
| `mw` | Lượng từ |
| `conj` | Liên từ |
| `part` | Trợ từ |
| `prep` | Giới từ |
| `interj` | Cảm thán từ |
| `n/v` | Danh từ/Động từ (dùng khi từ có 2 chức năng) |

---

## 3. Vocab — Tiếng Anh

### Interface
```typescript
interface VocabEN {
  word: string;         // REQUIRED — từ tiếng Anh, VD: "aunt"
  ipa: string;          // REQUIRED — phiên âm IPA, VD: "/ɑːnt/"
  type: string;         // REQUIRED — tên đầy đủ tiếng Việt, VD: "Danh từ"
  type_short: string;   // REQUIRED — viết tắt, xem bảng bên dưới
  meaning: string;      // REQUIRED — nghĩa tiếng Việt
  example_en: string;   // REQUIRED — câu ví dụ tiếng Anh
  example_vi: string;   // REQUIRED — dịch tiếng Việt của example_en
}
```

### Ví dụ đúng
```json
{
  "word": "aunt",
  "ipa": "/ɑːnt/",
  "type": "Danh từ",
  "type_short": "n",
  "meaning": "dì, cô, bác gái",
  "example_en": "She is my aunt.",
  "example_vi": "Cô ấy là dì của tôi."
}
```

### Bảng type_short hợp lệ (tiếng Anh)
| type_short | type đầy đủ |
|-----------|------------|
| `n` | Danh từ |
| `v` | Động từ |
| `adj` | Tính từ |
| `adv` | Trạng từ |
| `prep` | Giới từ |
| `conj` | Liên từ |
| `pron` | Đại từ |
| `interj` | Thán từ |
| `phrase` | Cụm từ |

---

## 4. Grammar — Dùng chung

> Áp dụng cho cả tiếng Trung lẫn tiếng Anh. Chỉ khác nhau ở `practiceList[].pinyin`.

### Interface
```typescript
interface Grammar {
  title: string;           // REQUIRED — tên cấu trúc
  desc: string;            // REQUIRED — giải thích tiếng Việt
  formula: string;         // REQUIRED — công thức dạng string
  practiceList: {
    correct: string;       // REQUIRED — câu ví dụ
    pinyin?: string;       // CHỈ tiếng Trung — phiên âm
    meaning: string;       // REQUIRED — nghĩa tiếng Việt
  }[];                     // REQUIRED — tối thiểu 3 phần tử
  note?: string;           // optional — lưu ý đặc biệt
}
```

### Ví dụ đúng — tiếng Trung
```json
{
  "title": "Câu trần thuật với động từ 是",
  "desc": "Động từ '是' (shì) tương đương với 'là' trong tiếng Việt, dùng để giới thiệu hoặc định nghĩa.",
  "formula": "Chủ ngữ + 是 + Danh từ",
  "practiceList": [
    { "correct": "我是学生。", "pinyin": "Wǒ shì xuésheng.", "meaning": "Tôi là học sinh." },
    { "correct": "她是老师。", "pinyin": "Tā shì lǎoshī.", "meaning": "Cô ấy là giáo viên." },
    { "correct": "他也是学生。", "pinyin": "Tā yě shì xuésheng.", "meaning": "Anh ấy cũng là học sinh." }
  ],
  "note": "Khác với tiếng Việt, '是' không kết hợp trực tiếp với tính từ."
}
```

### Ví dụ đúng — tiếng Anh
```json
{
  "title": "different from: khác với",
  "desc": "Dùng cụm từ 'different from' để miêu tả một thứ gì đó không giống với một thứ khác.",
  "formula": "Subject + is/are + different from + Object",
  "practiceList": [
    { "correct": "My bag is different from your bag.", "meaning": "Cặp của tôi khác với cặp của bạn." },
    { "correct": "This book is different from that one.", "meaning": "Quyển sách này khác với quyển kia." },
    { "correct": "Her hair is different from my hair.", "meaning": "Tóc của cô ấy khác với tóc của tôi." }
  ]
}
```

---

## 5. Dialogue — Tiếng Trung

### Interface
```typescript
interface DialogueZH {
  title: string;     // REQUIRED — tên đoạn hội thoại
  lines: {
    speaker: string; // REQUIRED — "A" hoặc "B"
    zh: string;      // REQUIRED — câu tiếng Trung
    py: string;      // REQUIRED — phiên âm pinyin có dấu
    vi: string;      // REQUIRED — dịch tiếng Việt
  }[];               // REQUIRED — 4–8 dòng, xen kẽ A-B
}
```

### Ví dụ đúng
```json
{
  "title": "Gặp gỡ lần đầu",
  "lines": [
    { "speaker": "A", "zh": "你好！你叫什么名字？", "py": "Nǐ hǎo! Nǐ jiào shénme míngzi?", "vi": "Xin chào! Bạn tên là gì?" },
    { "speaker": "B", "zh": "我叫小明。你呢？", "py": "Wǒ jiào Xiǎo Míng. Nǐ ne?", "vi": "Tôi tên là Tiểu Minh. Còn bạn?" },
    { "speaker": "A", "zh": "我叫玛丽。很高兴认识你！", "py": "Wǒ jiào Mǎlì. Hěn gāoxìng rènshi nǐ!", "vi": "Tôi tên là Mary. Rất vui được quen biết bạn!" },
    { "speaker": "B", "zh": "我也很高兴认识你！", "py": "Wǒ yě hěn gāoxìng rènshi nǐ!", "vi": "Tôi cũng rất vui được quen biết bạn!" }
  ]
}
```

### Rules
- Tối thiểu **4 dòng**, tối đa **8 dòng**
- Xen kẽ **A-B-A-B** (không có 2 dòng cùng speaker liên tiếp)
- Dòng **cuối cùng** phải là câu trả lời/khẳng định — **không được là câu hỏi**
- Chỉ dùng từ vựng đã được giới thiệu trong scope bài học

---

## 6. Dialogue — Tiếng Anh

### Interface
```typescript
interface DialogueEN {
  title: string;     // REQUIRED — tên đoạn hội thoại
  lines: {
    speaker: string; // REQUIRED — "A" hoặc "B"
    en: string;      // REQUIRED — câu tiếng Anh
    vi: string;      // REQUIRED — dịch tiếng Việt
    // KHÔNG có field "py" — tiếng Anh không dùng pinyin
  }[];
}
```

### Ví dụ đúng
```json
{
  "title": "At school",
  "lines": [
    { "speaker": "A", "en": "What does 'different' mean?", "vi": "Từ 'different' có nghĩa là gì vậy?" },
    { "speaker": "B", "en": "It means not the same.", "vi": "Nó có nghĩa là không giống nhau." },
    { "speaker": "A", "en": "Can you give me an example?", "vi": "Bạn có thể cho tôi một ví dụ không?" },
    { "speaker": "B", "en": "Sure! My bag is different from your bag.", "vi": "Tất nhiên! Cặp của tôi khác với cặp của bạn." }
  ]
}
```

---

## 7. Cấu trúc file JSON

### File tiếng Trung (HSK)
```json
[
  {
    "orderIndex": 1,
    "title": "Bài 1: Xin chào! Bạn tên là gì?",
    "theme": "CHỦ ĐỀ I: CHÀO HỎI & LÀM QUEN",
    "isPremium": false,
    "vocab": [ /* VocabZH[] */ ],
    "grammar": [ /* Grammar[] */ ],
    "dialogues": [ /* DialogueZH[] */ ]
  }
]
```

> ⚠️ Key là `"dialogues"` (có chữ s)

### File tiếng Anh (YLE/KET/PET/IELTS)
```json
{
  "lessons": [
    {
      "orderIndex": 0,
      "title": "Bài 1.a: Gia đình (1/2)",
      "theme": "Bản thân, gia đình & sức khỏe",
      "isPremium": false,
      "vocab": [ /* VocabEN[] */ ],
      "grammar": [ /* Grammar[] */ ],
      "dialogue": [ /* DialogueEN[] */ ]
    }
  ]
}
```

> ⚠️ Key là `"dialogue"` (không có chữ s)
> ⚠️ Wrap trong object `{ "lessons": [] }`, không phải array trực tiếp

### Tóm tắt khác biệt ZH vs EN

| | Tiếng Trung | Tiếng Anh |
|--|------------|-----------|
| Root format | `[ ]` array | `{ "lessons": [] }` |
| Dialogue key | `"dialogues"` | `"dialogue"` |
| Vocab key từ | `hanzi` + `pinyin` | `word` + `ipa` |
| Example key | `example_zh` + `example_vi` | `example_en` + `example_vi` |
| Dialogue line | `zh` + `py` + `vi` | `en` + `vi` |

---

## 8. Fields đã deprecated

> Các field sau **không còn được dùng**. Component sẽ không đọc chúng.
> Nếu thấy trong data cũ — bỏ qua, không migrate.

| Field cũ | Thay bằng | Áp dụng cho |
|----------|-----------|-------------|
| `explanation` | `desc` | Grammar |
| `structure` | `formula` | Grammar |
| `examples` | `practiceList` | Grammar |
| `examples[].zh` | `practiceList[].correct` | Grammar ZH |
| `examples[].vi` | `practiceList[].meaning` | Grammar |
| `p.chinese` | `p.correct` | Grammar practiceList |
| `p.vietnamese` | `p.meaning` | Grammar practiceList |

---

## 9. Component đọc field gì

### GrammarClient.tsx
```
g.title          → tiêu đề cấu trúc
g.desc           → mô tả (fallback: g.description, g.explanation)
g.formula        → công thức (string hoặc array [{text, classes}])
g.practiceList   → câu ví dụ (fallback: g.examples)
  p.correct      → câu (fallback: p.zh, p.chinese)
  p.pinyin       → pinyin (tự generate nếu thiếu)
  p.meaning      → nghĩa (fallback: p.vi, p.vietnamese)
g.note           → lưu ý (optional, hiện box amber)
```

### DialogueClient.tsx
```
d.title          → tên đoạn hội thoại
d.lines[]        → danh sách dòng thoại
  line.speaker   → "A" hoặc "B"
  line.zh        → câu tiếng Trung (TTS dùng zh-CN)
  line.en        → câu tiếng Anh (TTS dùng en-US)
  line.py        → pinyin (hiển thị nếu có)
  line.vi        → nghĩa tiếng Việt
d.lessonId       → inject bởi getAllDialogueData()
d.lessonTitle    → inject bởi getAllDialogueData()
d.lessonOrderIndex → inject bởi getAllDialogueData()
```

### LessonStepFlow.tsx (nhận từ DashboardClient)
```
vocabItems[]     → vocab của bài (từ getLessonsData)
grammarItems[]   → grammar của bài
dialogueItems[]  → dialogue của bài (key: "dialogues" trong HSK)
exerciseItems[]  → exercise của bài
lessonTitle      → string
lessonId         → string (UUID từ DB)
```

### DashboardClient.tsx
```
lesson.id        → string UUID
lesson.title     → string
lesson.theme     → string (group by theme)
lesson.isPremium → boolean (lock logic)
lesson.vocab     → array (đếm số từ hiển thị)
lesson.grammar   → array (đếm số ngữ pháp)
lesson.dialogues → array (đếm số hội thoại) ← key "dialogues"
```

---

*Cập nhật file này mỗi khi thêm contentType mới hoặc thay đổi field.*

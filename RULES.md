# RULES.md — Coding Conventions & Cấm làm (Vấn Học)

Tách từ CLAUDE.md để CLAUDE.md chỉ giữ overview/architecture. File này là nguồn quy tắc khi viết/sửa code hoặc nội dung.

---

## 📐 Coding Conventions

### TypeScript / Next.js
- Server Components mặc định — chỉ thêm `"use client"` khi cần interactivity
- Dynamic class Tailwind KHÔNG hoạt động — map sang full class string, không nối chuỗi (`` `bg-${color}-500` `` SAI)

### Nội dung (Vocab/Grammar/Dialogue)
- Vocab: PHẢI có `example` (tiếng Trung: `example_zh`+`example_vi`; tiếng Anh: `example_en`+`example_vi`)
- Grammar `practiceList` item nên có `correct` + `pinyin`/`meaning` nếu là tiếng Trung — dùng để audio + hiển thị nghĩa
- Dedup theo `title` cho grammar (KHÔNG dùng `id` — data tiếng Anh không có field này)
- Mỗi bài chuẩn: 20 từ vựng, 3 grammar, 2 dialogue (HSK1 bài 0 ngoại lệ — chỉ có grammar giới thiệu Pinyin, không vocab/dialogue)

### Quy trình làm việc 3 bên
- Prompt cho Claude Code: ghi `🤖 CLAUDE CODE` ở đầu, chia nhỏ, kết thúc bằng "Không thay đổi gì khác."
- Prompt cho A (Gemini): ghi `👾 A` ở đầu, dùng để soạn nội dung JSON theo đúng format đã định nghĩa trong CLAUDE.md (mục Database Schema)
- Duyệt nội dung A soạn: chỉ xem mẫu 5-10 dòng đầu để tiết kiệm token, không cần đọc hết trước khi seed

---

## 🚫 KHÔNG được làm

- KHÔNG xóa `components/legacy/Navigation.tsx` hoặc `components/legacy/Paywall.tsx` — đang được dùng
- KHÔNG viết lại `getCompletedLessonIds` inline trong page — luôn import từ `@/lib/getProgressIds`
- KHÔNG trộn field `en` vào dialogue tiếng Trung (phải `zh/py/vi`) hoặc ngược lại
- KHÔNG hardcode `DATABASE_URL` hay secrets vào code
- KHÔNG chạy `prisma migrate dev` trên production — dùng SQL thủ công hoặc seed script
- KHÔNG commit file `.env`

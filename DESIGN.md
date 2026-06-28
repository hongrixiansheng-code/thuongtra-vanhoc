# DESIGN.md — Chuẩn thiết kế Vấn Học

Chuẩn cố định cho mọi quyết định UI/UX. Tách riêng khỏi RULES.md vì đây là chuẩn thiết kế, không phải coding convention.

> Bản hiện tại là khung tối thiểu để giữ giao diện nhất quán trong giai đoạn ổn định tính năng. Sẽ có bản cập nhật UI riêng khi website ổn định — không cần thiết kế lại toàn diện ở giai đoạn này.

---

## 🎯 Tone — phù hợp mọi lứa tuổi

Vấn Học phục vụ cả trẻ em (Starters/Movers, HSK1-2) và người lớn (Flyers/KET/PET, HSK3-4) trong cùng 1 hệ thống — **không thiết kế nghiêng về "trẻ em"** (tránh hoạt hình quá mức, mascot, font tròn trẻ con).

Tone mục tiêu: **gọn gàng – đáng tin – ấm áp vừa đủ**. Giống tinh thần edtech hiện đại (Duolingo-tier nhưng ít "game hoá" hơn) — rõ ràng, dễ đọc, có điểm nhấn màu sắc theo chương trình nhưng không lạm dụng để vẫn nghiêm túc với người học lớn tuổi.

## 🎨 Màu sắc — hệ accent do người dùng chọn (đã có, giữ nguyên)

Định nghĩa tại [globals.css](apps/frontend/src/app/globals.css) qua CSS variable `--color-primary-*`, áp dụng bằng `data-accent` trên `<html>` — người dùng tự chọn qua [ThemeSwitcher.tsx](apps/frontend/src/components/ThemeSwitcher.tsx), **không tự động gán theo program**: `amber` (default), `emerald`, `orange`, `rose`, `blue`, `purple`. Nhãn "HSK 1-6" trong ThemeSwitcher chỉ là tên gợi nhớ màu, không phải binding thật với program.

- KHÔNG thêm màu accent mới ngoài 6 màu trên trừ khi có lý do rõ ràng
- KHÔNG dùng Tailwind dynamic class string (`` `bg-${color}-500` ``) — đã quy định ở RULES.md, áp dụng cả cho accent
- Luôn dùng class `primary-50/100/400/500/600/700` (map qua CSS variable) khi cần màu theo accent của program, không hardcode mã hex

## ✍️ Typography

- Chưa định nghĩa font chữ riêng trong `tailwind.config.ts` — đang dùng font hệ thống mặc định của Next.js
- Chữ Hán (`hanzi-display`) có riêng size lớn hơn ở mobile (`5rem` — xem `globals.css`) — giữ nguyên khi sửa layout liên quan hanzi
- Không cần chọn font mới ở giai đoạn này — để dành cho bản cập nhật UI sau

## 🧩 Component pattern hiện có

- `DashboardClient.tsx`, `GrammarClient.tsx`, `DialogueClient.tsx`, `LessonStepFlow.tsx` — pattern chính, giữ cấu trúc sidebar-trái/content-phải đã ổn định
- `legacy/Navigation.tsx`, `legacy/Paywall.tsx` — đang dùng, không đổi giao diện khi không có yêu cầu cụ thể
- Mobile: bottom nav riêng (`.mobile-bottom-nav`), modal full-screen dưới 768px — giữ pattern này khi thêm page mới

## 🔁 Quy trình khi cần ý tưởng/audit thiết kế

Vấn Học hiện không có skill thiết kế riêng — dùng skill global sẵn có theo tình huống, luôn đọc file này trước để không lệch tone/màu:

| Tình huống | Skill global nên dùng |
|---|---|
| Audit/nâng cấp trang đã có | `redesign-existing-projects` |
| Thiết kế page/section mới | `design-taste-frontend` hoặc `high-end-visual-design` |
| Cần ảnh tham khảo bố cục web trước khi code | `imagegen-frontend-web` |

Khi dùng các skill trên, luôn cung cấp thêm context từ mục Tone + Màu sắc ở trên — các skill này không tự biết brand Vấn Học.

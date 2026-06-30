# CLAUDE.md — Vấn Học / ThuongTra-VanHoc

## 🎯 Project Overview
Nền tảng học ngôn ngữ đa môn (Tiếng Trung HSK, Tiếng Anh Starters/Movers/Flyers/KET/PET + Get Ready (IELTS 0-4.0) + Phonics (phát âm); kế hoạch mở rộng Nhật, Hàn).
Brand: **Thưởng Trà - Vấn Học** (Tầm Đạo là tên công ty dự kiến thành lập sau, không phải tên brand) | Owner: DuDu Châu | Solo developer.
Cộng tác viên: **Claude** (chat — chiến lược, kiến trúc) · **Claude Code** (thực thi file/code) · **A / Gemini** (soạn nội dung: vocab, grammar, dialogue).

---

## 🏗️ Architecture — Monorepo (npm workspaces)

```
edu-platform/
├── apps/
│   ├── frontend/     # Next.js 14 (App Router) — deploy Vercel
│   └── backend/      # Node.js + Express — REST API (legacy, ít dùng)
├── packages/
│   ├── database/     # Prisma ORM + schema
│   └── shared/       # TypeScript types, game components, logic
├── docs/             # UserFlow docs (01-05)
├── data/             # Batch JSON nội dung (HSK1-4)
└── scripts/          # Check/seed/fix scripts dùng 1 lần
```

### Frontend (apps/frontend)
- **Framework**: Next.js 14, App Router, TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth v4 + @next-auth/prisma-adapter
- **Audio**: Web Speech API (SpeechSynthesis), không dùng thư viện ngoài
- **Viết chữ Hán**: HanziWriter (kế hoạch — modal luyện viết khi nhấn vào từ vựng tiếng Trung, CHƯA build)

### Database (packages/database)
- **ORM**: Prisma Client
- **Production DB**: PostgreSQL (Neon), `DATABASE_URL` env

---

## 🗄️ Database Schema (Prisma)

### Content hierarchy
```
Subject (zh, en...)
  └── Program (hsk1, hsk2, hsk3, hsk4, khai-mon, en-starters "Starters", en-movers "Movers", en-flyers "Flyers", en-ket "KET", en-pet "PET", en-epf "Phonics", ielts-0-4 "Get Ready", en-ielts-2 "Intermediate", en-ielts-3 "Advanced"...)
        └── Lesson (orderIndex, theme, isPremium)
              └── LessonContent (contentType: THEORY | GRAMMAR | DIALOGUE | EXERCISE | READING | LISTENING | WRITING | SPEAKING)
```

- **THEORY** (vocab): tiếng Trung dùng field `hanzi/pinyin/type/type_short/meaning/example_zh/example_vi`; tiếng Anh dùng `word/ipa/type/meaning/example_en/example_vi`
- **GRAMMAR**: `title/desc/formula[]/practiceList[]` — formula dùng Tailwind classes có sẵn màu
- **DIALOGUE**: tiếng Trung dùng `zh/py/vi`; tiếng Anh dùng `en/vi` — KHÔNG trộn field giữa 2 ngôn ngữ
- **READING / LISTENING / WRITING / SPEAKING**: hiện chỉ dùng cho `ielts-0-4` — xem chi tiết field ở DATA_CONTRACTS.md. Theo quyết định kiến trúc, khi mở rộng sang HSK/YLE/KET/PET các content type này vẫn gắn vào `Lesson` nhưng hiển thị ở trang Luyện tập riêng (`/reading /listening /writing` + cần thêm route SPEAKING), KHÔNG đưa vào `LessonStepFlow`
- `en-ielts-2` ("Intermediate", IELTS 4.0-5.5) và `en-ielts-3` ("Advanced", IELTS 5.5-7.0) là placeholder rỗng (0 lessons) cho roadmap — đã set `isAvailable: false` cho tới khi có nội dung. (`en-ielts-1` — bản trùng lặp rỗng với `ielts-0-4` — đã xóa khỏi DB 2026-06-29)

### User & Auth
```
User (id, email, role: USER|ADMIN|TEACHER, subscriptionStatus: FREE|PREMIUM, subscriptionEndDate)
  ├── Account / Session (NextAuth)
  ├── UserProgress (lessonId, completed, score) — unique [userId, lessonId]
  ├── Payment (amount, status, gatewayTransactionId) — model đã có, CHƯA tích hợp cổng thanh toán thật (chỉ có UI xem ở /admin/payments)
  ├── Class (programId, teacherId, name, isActive) — lớp học do TEACHER tạo, gắn với 1 Program
  └── ClassEnrollment (classId, studentId) — unique [classId, studentId], học sinh trong lớp chỉ dùng đúng program của lớp (xem `programLocked` ở `getCompletedLessonIds`)
```

Role `TEACHER` mới — học sinh thuộc lớp (`ClassEnrollment` với `class.isActive`) được tự động hưởng quyền Premium cho đúng program của lớp đó (mở bài `isPremium`), nhưng vẫn mở bài dần theo `progressMap` thật, không bypass điều kiện điểm số. Nếu học sinh thuộc lớp nhưng vào program khác lớp mình thì bị `programLocked` (hiện `ProgramLocked` component).

---

## 🧭 Routing hiện tại

| Route | Mục đích |
|---|---|
| `/dashboard?level=...` | Danh sách bài học theo chương trình, chọn bài → Step Flow |
| `/vocab?level=...` | Từ điển tổng hợp các từ đã mở khóa |
| `/grammar?level=...` | Ngữ pháp — sidebar theo bài, content bên phải |
| `/dialogue?level=...` | Hội thoại — sidebar theo bài, content bên phải |
| `/practice`, `/games`, `/mock-test` | Luyện tập, lọc theo `completedLessonIds`. `/mock-test` (`legacy/MockTestTab.tsx`) đã fix 2026-06-30 — nhận `programName` từ `page.tsx` (query `prisma.program.findUnique`), hiện đúng tên chương trình (vd "Thi Thử PET") thay vì hardcode "Starters". Cũng đã fix kèm: `levelId` trước đó KHÔNG được truyền xuống component nên `en-starters` chưa từng route đúng sang `StartersExercises` qua trang này — giờ đã truyền `levelId={level}` |
| `/reading`, `/listening`, `/writing` | `/reading` (`ReadingTab.tsx`) đã fix 2026-06-30: chế độ "Luyện Đọc Từ Vựng" vốn đã hoạt động đúng cho tiếng Anh (đọc `word/ipa` thay vì `hanzi/pinyin`) chỉ bị sai *label* hiển thị — đã sửa tiêu đề/mô tả theo `isEnglish`. Chế độ "Luyện Đọc Theo Câu" dùng thuật toán chấm điểm theo từng ký tự Hán (`alignChineseChars`, chỉ đọc field `sentence.zh`) — KHÔNG tương thích về bản chất với tiếng Anh (cần thuật toán theo từ, chưa build), nên đã ẩn nút này khi `isEnglish` thay vì hiện label sai. `/listening`, `/writing` copy đã level-agnostic từ trước, không cần sửa. `ielts-0-4` đã có data READING/LISTENING/WRITING/SPEAKING trong DB nhưng CHƯA có component generic đọc riêng (vẫn dùng chung `ReadingTab`/`ListeningTab`/`WritingTab`) — xem quyết định kiến trúc ở mục Database Schema |
| `/admin/*` | Quản lý subjects/programs/lessons/data/users (CRUD cơ bản); `/admin/payments` xem danh sách giao dịch (Payment model) — chỉ là UI xem, CHƯA tích hợp cổng thanh toán thật; `/admin/users/[id]` trang chi tiết 1 user (tiến độ theo program, lịch sử thanh toán) |
| `/teacher/*` | Cổng giáo viên (role TEACHER hoặc ADMIN) — `/teacher/classes` tạo/quản lý lớp học gắn với 1 Program, `/teacher/classes/[id]` chi tiết lớp + danh sách học sinh ghi danh (`ClassEnrollment`) |
| `/premium-tools` | Trang Premium (dùng `components/legacy/Paywall.tsx`) |
| `/lessons/[subject]/[program]/[lessonId]` | Route legacy vẫn còn trong code (`apps/frontend/src/app/lessons/`), đang được sửa gần đây — KHÔNG xóa khi chưa xác nhận với owner |

**Cập nhật 2026-06-30:** các file `*-page.tsx` cũ nhắc ở trên ĐÃ được dọn sạch, không còn tồn tại trong `apps/frontend/src/app` — ghi chú cũ phía trên không còn rủi ro thật, giữ lại chỉ để biết lịch sử.

**Đã fix 2026-06-30** — `dashboard/page.tsx` từng tự viết lại ~50 dòng logic check `isPremiumUser`/`isAdmin`/`programLocked` riêng thay vì dùng `getCompletedLessonIds`; đã refactor lại dùng đúng helper (83 dòng → 37 dòng), giờ tất cả route đều nhất quán gọi `getCompletedLessonIds`.

**Đã fix 2026-06-30** — 4 file từng dùng `import { prisma } from 'database'` (client riêng) thay vì singleton `@/lib/prisma`: `app/lessons/[subject]/[program]/[lessonId]/page.tsx`, `app/api/progress/route.ts`, `app/admin/data/page.tsx`, `app/admin/data/actions.ts` — đã đổi sang `import prisma from '@/lib/prisma'` cho cả 4. Build + `tsc --noEmit` đã pass sau khi sửa.

---

## 🔑 Helper quan trọng: `getCompletedLessonIds`

File: `src/lib/getProgressIds.ts`

```ts
const { completedLessonIds, isAdmin, isPremiumUser, programLocked, enrolledProgramCodes } = await getCompletedLessonIds(programCode);
```

- Luôn truyền `programCode` (level) để lọc đúng theo chương trình — KHÔNG gọi không tham số
- Admin tự động nhận toàn bộ `lessonId` của program đó (bypass mọi khóa)
- Học sinh thuộc `ClassEnrollment` (lớp active) chỉ được dùng đúng program của lớp — nếu truy cập program khác, `programLocked: true` và page phải render `<ProgramLocked />` thay vì nội dung
- `isPremiumUser` đã gộp 3 trường hợp: ADMIN, subscription PREMIUM còn hạn (`isSubscriptionActive`), hoặc học sinh trong lớp active — page chỉ cần đọc field này, KHÔNG tự suy luận lại
- TẤT CẢ page (vocab/grammar/dialogue/practice/listening/reading/writing/mock-test/games/dashboard) phải dùng helper này — KHÔNG viết lại logic `PrismaClient` + `getServerSession` inline trong từng page

## 🔑 Helper quan trọng: `prisma` singleton & `subscription.ts`

- File: `src/lib/prisma.ts` — export default singleton `PrismaClient` (dùng `globalThis` để tránh tạo nhiều connection lúc hot-reload dev). TẤT CẢ page/route PHẢI `import prisma from '@/lib/prisma'` — KHÔNG gọi `new PrismaClient()` trực tiếp trong page/component (một số file cũ còn import `{ PrismaClient } from "database"` cạnh đó chỉ để lấy type, không dùng để khởi tạo client mới).
- File: `src/lib/subscription.ts` — `PREMIUM_DURATIONS`, `computeExpiryDate()`, `isSubscriptionActive(user)`, `syncExpiredSubscription(user)` (tự hạ `subscriptionStatus` về FREE khi `subscriptionEndDate` đã qua). Dùng helper này ở bất kỳ đâu cần check Premium còn hạn hay không — KHÔNG tự so sánh `subscriptionEndDate` inline.

---

## 🧩 Component chính

```
components/
├── DashboardClient.tsx   # Danh sách bài học + lock logic (admin bypass)
├── LessonStepFlow.tsx    # Step Flow 13 bước: vocab → mini-test → grammar → dialogue → hoàn thành
├── GrammarClient.tsx     # Sidebar bài học + nội dung ngữ pháp
├── DialogueClient.tsx    # Sidebar bài học + bubble chat hội thoại
├── KhaiMonClient.tsx     # Render nội dung bài "Khai môn" (HSK1 bài 0, dạy Pinyin) theo Scroll Layout riêng — không dùng layout vocab/grammar thường
├── PremiumLocked.tsx     # Chặn nội dung khi user chưa Premium (vd. /games, /mock-test) — CTA sang /premium-tools
├── ProgramLocked.tsx     # Chặn nội dung khi học sinh trong lớp (ClassEnrollment) truy cập program khác lớp mình
├── ThemeSwitcher.tsx     # Cho user tự chọn theme mode (light/dark/system) + accent color (amber/emerald/orange/rose/blue/purple) qua localStorage + `data-accent` trên `<html>` — xem DESIGN.md
└── legacy/
    ├── Navigation.tsx     # Nav chính của toàn site — ĐANG DÙNG, không xóa
    ├── Paywall.tsx        # Dùng trong /premium-tools — ĐANG DÙNG
    ├── VocabTab.tsx, ReadingTab.tsx, ListeningTab.tsx, WritingTab.tsx, MockTestTab.tsx, GameTab.tsx
    └── StartersExercises.tsx
```

Đã dọn (xóa) vì không còn được import: `GrammarTab.tsx` (legacy), `CurriculumTab.tsx` (legacy), `LessonComponents.tsx`, `Paywall.tsx` (bản gốc components/, không phải legacy/), `LayoutWrapper.tsx`, `Header.tsx`, `Sidebar.tsx` (cả hai ở `components/` gốc — admin layout giờ dùng `AdminSidebar.tsx` riêng trong `app/admin/`).

**Đã dọn 2026-06-30:** 18 file `.js` (chữ thường-gạch ngang) trong `components/legacy/`, tổng ~5.475 dòng — xác nhận 0 importer (chỉ tham chiếu chéo lẫn nhau, không liên quan code đang chạy) trước khi xóa: `mock-test-tab.js`, `reading-tab.js`, `vocab-tab.js`, `writing-tab.js`, `listening-tab.js`, `game-tab.js`, `quiz-tab.js`, `typing-game.js`, `matching-game.js`, `auth-modal.js`, `dictionary.js`, `curriculum-tab.js`, `english-writing-tab.js`, `hanzi-components.js`, `onboarding.js`, `progress-tab.js`, `quiz-components.js`, `settings-tab.js`. Đây là bản cũ trùng tên với các component `.tsx` (PascalCase) thật sự đang dùng — trước khi xóa đã từng suýt nhầm bug vào `mock-test-tab.js` thay vì `MockTestTab.tsx` thật, nên cẩn thận khi thấy tên file kiểu chữ-thường-gạch-ngang trong `legacy/` ở tương lai (nếu xuất hiện lại do revert nhầm) — đó luôn là dấu hiệu code chết.

---

## ⚙️ Environment Variables

### apps/frontend/.env
```
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

---

## 🚀 Dev Commands

```bash
cd apps/frontend && npm run dev        # localhost:3000

# Mỗi program có seed script riêng trong apps/frontend/scripts/, ví dụ:
node apps/frontend/scripts/seed-hsk2.js
node apps/frontend/scripts/seed-hsk4.js
node apps/frontend/scripts/seed-ket-lessons.js
node apps/frontend/scripts/seed-movers.js
```

`prisma migrate dev` KHÔNG chạy trên production data — luôn chạy SQL thủ công hoặc seed script riêng để tránh reset toàn bộ DB.

---

## 📐 Coding Conventions & 🚫 Cấm làm

Xem **RULES.md** — coding conventions (TypeScript/Next.js, format nội dung Vocab/Grammar/Dialogue, quy trình làm việc 3 bên) và danh sách việc KHÔNG được làm.

## 🎨 Chuẩn thiết kế UI/UX

Xem **DESIGN.md** trước khi làm bất kỳ việc gì liên quan giao diện (tạo page mới, audit/redesign, chọn màu sắc) — gồm tone, hệ màu accent, component pattern, và skill global nên dùng cho từng tình huống thiết kế.

## 📦 Chuẩn dữ liệu nội dung

Xem **DATA_CONTRACTS.md** — single source of truth cho format vocab/grammar/dialogue (tiếng Trung + tiếng Anh), cấu trúc file JSON batch, field nào đã deprecated, component nào đọc field nào. Mọi thay đổi schema nội dung phải cập nhật file này trước khi soạn batch mới hoặc sửa component đọc nội dung.

---

## 🎮 Trạng thái Module

| Module | Route | Trạng thái |
|---|---|---|
| Dashboard / Step Flow | `/dashboard` | ✅ Hoạt động (HSK1 đầy đủ, YLE đầy đủ) |
| Vocab / Grammar / Dialogue | `/vocab` `/grammar` `/dialogue` | ✅ Hoạt động, lọc theo bài đã học |
| Games / Practice / Mock Test | `/games` `/practice` `/mock-test` | ✅ Hoạt động cho mọi `level` — `/mock-test` đã fix 2026-06-30, hiện đúng tên chương trình thay vì hardcode "Starters" |
| Reading / Listening / Writing | `/reading` `/listening` `/writing` | ✅ Phần từ vựng hoạt động cho mọi `level` (đã fix label 2026-06-30). ⚠️ Phần "Luyện Đọc Theo Câu" (chấm điểm theo ký tự Hán) chỉ hỗ trợ tiếng Trung — đã ẩn đúng cách cho tiếng Anh thay vì hiện sai, nhưng CHƯA build bản tương đương cho tiếng Anh (cần thuật toán chấm theo từ). Data "Get Ready" (`ielts-0-4`) đã có sẵn 4 contentType READING/LISTENING/WRITING/SPEAKING nhưng chưa có component generic render riêng |
| Get Ready (`ielts-0-4`, IELTS 0-4.0) | — | ✅ 90 bài đầy đủ THEORY/GRAMMAR/DIALOGUE/READING/LISTENING/WRITING/SPEAKING, chất lượng tốt — nhưng route/component hiển thị riêng CHƯA build, hiện chỉ truy cập được qua `/lessons/[subject]/[program]/[lessonId]` (legacy) |
| Phonics (`en-epf`) | — | ✅ 27 bài (THEORY+GRAMMAR, dạy IPA/trọng âm/ngữ điệu) — cùng tình trạng route như trên |
| Intermediate / Advanced (`en-ielts-2/3`) | — | ❌ Placeholder rỗng (0 lessons), `isAvailable: false` — ẩn tới khi có nội dung |
| Admin CRUD | `/admin/*` | ✅ Hoạt động cơ bản |
| Admin — quản lý user/giao dịch | `/admin/users`, `/admin/users/[id]`, `/admin/payments` | ✅ Hoạt động — xem chi tiết tiến độ/thanh toán từng user, danh sách giao dịch; CHƯA có thống kê tổng quan (revenue, growth...) |
| Cổng giáo viên (Class/Enrollment) | `/teacher/*` | ✅ Hoạt động cơ bản — TEACHER tạo lớp gắn 1 Program, quản lý học sinh ghi danh; học sinh trong lớp tự động Premium cho đúng program của lớp |
| Payment (MoMo/VNPay) | `/admin/payments` | ⚠️ Model `Payment` + UI xem giao dịch đã có, nhưng CHƯA tích hợp cổng thanh toán thật (chưa có flow tạo giao dịch/webhook) |
| Modal luyện viết chữ Hán (HanziWriter) | — | ❌ Chưa build — có kế hoạch |

---

## 💳 Business Model (đã chốt)

| Gói | Giá |
|---|---|
| Free | Toàn bộ nội dung HSK1-4, 6 chương trình YLE — miễn phí vĩnh viễn |
| Premium | Theo thời hạn (xem bảng dưới) — mốc tham chiếu 30 ngày = 99.000đ |
| Premium AI (tương lai) | ~129.000đ/tháng — test AI Credits trước khi tách gói riêng |

### Premium — gói theo thời hạn (đã chốt)

| Thời hạn | Giá | Giá/ngày | Tiết kiệm so với 30 ngày |
|---|---|---|---|
| 3 ngày | 30.000đ | 10.000đ | — |
| 7 ngày | 50.000đ | 7.143đ | — |
| 15 ngày | 75.000đ | 5.000đ | — |
| 30 ngày | 99.000đ | 3.300đ | mốc tham chiếu |
| 90 ngày | 249.000đ | 2.767đ | ~16% |
| 180 ngày | 449.000đ | 2.494đ | ~24% |
| 360 ngày | 669.000đ | 1.858đ | ~44% (tiết kiệm nhất) |

- Các gói ngắn (3/7/15 ngày) cố tình có giá/ngày cao hơn — dùng cho trải nghiệm thử, không phải lựa chọn tối ưu chi phí
- Khi hiển thị UI, luôn nhấn mạnh giá/ngày + % tiết kiệm cho gói 90/180/360 ngày để đẩy người dùng lên gói lớn — KHÔNG đổi mốc giá này khi chưa được yêu cầu

- Khóa bài theo điểm: HSK1-2 cần 7/10, HSK3-4 cần 8/10 để mở bài tiếp
- Premium mở khóa: flashcard, listening drills, reading drills — chỉ cho bài đã hoàn thành (Contextual Unlock)
- Tăng trưởng: dùng thử Premium 7 ngày không cần thẻ; giải đấu tuần tặng mã Premium

`apps/frontend/src/lib/subscription.ts` (`PREMIUM_DURATIONS`) đã đồng bộ đủ 7 mốc đúng giá bảng trên — admin cấp Premium tay qua `/admin/users` dùng đúng danh sách này.

---

## 📄 Tài liệu UserFlow

Xem `docs/01-auth-flow.md` đến `docs/05-payment-flow.md` để biết chi tiết từng luồng (Auth, Learning, Content Access, Admin, Payment).
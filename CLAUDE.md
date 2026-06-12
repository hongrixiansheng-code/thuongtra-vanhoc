# CLAUDE.md — Vấn Học / ThuongTra-VanHoc

## 🎯 Project Overview
Nền tảng học ngôn ngữ đa môn (Tiếng Trung HSK, Tiếng Anh Cambridge YLE, Nhật, Hàn).
Brand: **Thưởng Trà - Tầm Đạo** | Owner: DuDu Châu | Solo developer.

---

## 🏗️ Architecture — Monorepo (npm workspaces)

```
edu-platform/
├── apps/
│   ├── frontend/     # Next.js 14 (App Router) — deploy Vercel
│   └── backend/      # Node.js + Express — REST API
└── packages/
    ├── database/     # Prisma ORM + schema + seed scripts
    └── shared/       # TypeScript types, game components, logic
```

### Frontend (apps/frontend)
- **Framework**: Next.js 14.2.3, App Router, TypeScript
- **Styling**: Tailwind CSS 3.4
- **Auth**: NextAuth v4 + @next-auth/prisma-adapter
- **UI libs**: lucide-react, hanzi-writer
- **Shared**: imports `database` and `@edu-platform/shared` packages
- **Key pages**: `/lessons/[subject]/[program]/[lessonId]`, `/admin/*`, `/games`, `/vocab`, `/grammar`, `/listening`, `/reading`, `/writing`, `/mock-test`, `/practice`
- **Legacy**: `src/components/legacy/` — JS components đang migrate sang TSX

### Backend (apps/backend)
- **Framework**: Node.js + Express 4
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **Routes**: `auth.js`, `lessons.js`, `payments.js`
- **Middleware**: `auth.js` (JWT verify), `premium.js` (subscription check)

### Database (packages/database)
- **ORM**: Prisma Client JS
- **Dev DB**: SQLite (`dev.db`)
- **Production DB**: PostgreSQL (`DATABASE_URL` env)
- **Seed scripts**: `seed-hsk1.js`, `seed-starters-new-lessons.js`, `seed-all.js`, v.v.

### Shared (packages/shared)
- **Components**: `DragAndDropGame.tsx`, `MultipleChoiceQuiz.tsx`
- **Logic**: `answerChecker.ts`, `srs.ts`
- **Types**: `schema.ts`
- **Build**: TypeScript → `dist/`

---

## 🗄️ Database Schema (Prisma)

### Content hierarchy
```
Subject (zh, en, ja, ko)
  └── Program (hsk1, hsk2, en-starters, n3...)
        └── Lesson (orderIndex, isPremium)
              └── LessonContent (THEORY | FORMULA | EXERCISE | REVIEW)
```

### User & Auth
```
User (id, email, role: USER|ADMIN, subscriptionStatus: FREE|PREMIUM)
  ├── Account (NextAuth OAuth)
  ├── Session (NextAuth sessions)
  ├── UserProgress (lessonId, completed, score)
  └── Payment (amount, status: PENDING|SUCCESS|FAILED)
```

---

## ⚙️ Environment Variables

### apps/frontend/.env
```
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

### apps/backend/.env
```
DATABASE_URL=
JWT_SECRET=
```

### packages/database/.env
```
DATABASE_URL=
```

---

## 🚀 Dev Commands

```bash
# Root — chạy tất cả
npm run dev

# Chỉ frontend
cd apps/frontend && npm run dev        # localhost:3000

# Chỉ backend
cd apps/backend && npm run dev         # port khác

# Database
npm run db:up                          # docker-compose up
npm run db:down                        # docker-compose down
cd packages/database && npx prisma migrate dev
cd packages/database && node seed-all.js

# Build shared package (cần chạy trước khi build frontend)
cd packages/shared && npm run build
```

---

## 📐 Coding Conventions

### TypeScript
- Dùng TypeScript cho tất cả file mới trong `frontend` và `shared`
- Import types từ `@edu-platform/shared` — KHÔNG định nghĩa lại
- File `.tsx` cho React components, `.ts` cho logic/utils

### Next.js App Router
- Server Components là default — chỉ thêm `"use client"` khi cần interactivity
- API routes đặt tại `src/app/api/[endpoint]/route.ts`
- Dynamic routes: `/lessons/[subject]/[program]/[lessonId]/page.tsx`

### Naming
- Components: PascalCase (`LessonCard.tsx`)
- Utils/hooks: camelCase (`useProgress.ts`)
- Constants: UPPER_SNAKE_CASE
- DB models: PascalCase (theo Prisma schema)

### Prisma
- Luôn dùng Prisma Client từ `packages/database`
- KHÔNG query DB trực tiếp từ frontend components — dùng Server Actions hoặc API routes
- Enum values: `role` = "USER" | "ADMIN", `subscriptionStatus` = "FREE" | "PREMIUM"
- `contentType` = "THEORY" | "FORMULA" | "EXERCISE" | "REVIEW"

### Tailwind
- Dynamic class names KHÔNG hoạt động — dùng complete class strings
- Ví dụ SAI: `` `bg-${color}-500` ``
- Ví dụ ĐÚNG: map color sang full class `{ red: 'bg-red-500', blue: 'bg-blue-500' }`

---

## 🚫 KHÔNG được làm

- KHÔNG xóa hoặc sửa file trong `components/legacy/` trừ khi được yêu cầu rõ ràng
- KHÔNG thêm package mới mà không hỏi — check xem shared package có sẵn chưa
- KHÔNG hardcode `DATABASE_URL` hay secrets vào code
- KHÔNG dùng `any` trong TypeScript nếu có thể tránh
- KHÔNG tạo migration Prisma trong môi trường production
- KHÔNG commit file `.env`

---

## 🧪 Testing & Debug

```bash
# Test files hiện có (root level)
node test-all.js
node test-vocab.js
node test-ting.js

# Check database
cd packages/database && node check-grammar.js
```

---

## 📦 Legacy Migration Pattern

Trong `src/components/legacy/` có cả file `.js` (cũ) lẫn `.tsx` (mới):
- `quiz-tab.js` → `QuizTab.tsx` ✅
- `game-tab.js` → `GameTab.tsx` ✅
- Khi migrate: giữ nguyên logic, chuyển sang TypeScript, dùng proper React hooks

---

## 🎮 Feature Modules

| Module | Route | Status |
|--------|-------|--------|
| Lessons | `/lessons/[subject]/[program]/[lessonId]` | ✅ Active |
| Vocab | `/vocab` | ✅ Active |
| Games | `/games` | ✅ Active |
| Grammar | `/grammar` | ✅ Active |
| Listening | `/listening` | ✅ Active |
| Reading | `/reading` | ✅ Active |
| Writing | `/writing` | ✅ Active |
| Mock Test | `/mock-test` | ✅ Active |
| Admin | `/admin/*` | ✅ Active |
| Premium Tools | `/premium-tools` | 🔒 Premium only |

---

## 💳 Business Logic

- **FREE**: truy cập bài học cơ bản (`isPremium: false`)
- **PREMIUM**: toàn bộ content + premium-tools
- Check premium qua `middleware/premium.js` (backend) hoặc `<Paywall>` component (frontend)
- Payment flow: `payments.js` route → `Payment` model → update `User.subscriptionStatus`


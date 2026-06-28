---
name: seed-script-generator
description: Generate a Node.js + Prisma seed script that wipes old lesson data for a program and reseeds it from one or more batch JSON files (vocab/grammar/dialogue). Use this whenever the user has finished a content batch (e.g. "A vừa soạn xong batch X", "tôi cần seed hsk2", "viết script seed cho chương trình Y") and needs to load it into the database, or whenever they ask to reset/reseed a specific program's lessons. Always use this instead of hand-writing a one-off seed script from scratch.
---

# Seed script generator

## Why this exists

Every time a content batch (vocab + grammar + dialogue, produced by Gemini/"A") is ready, it needs to go from JSON files into Postgres via Prisma. The shape of this script is always the same: find the program, wipe its old lessons (and any UserProgress referencing them, to avoid foreign-key errors), read N batch files, and insert THEORY/GRAMMAR/DIALOGUE content per lesson. Writing this from scratch each time wastes turns and reintroduces bugs already fixed before (forgetting to delete UserProgress first, wrong relative path math, wrong content field names).

## Before generating

Ask the user (or infer from context) for:
1. **Program code** (e.g. `hsk2`, `en-movers`) — must match `Program.code` in the DB.
2. **List of batch JSON files** and their absolute or project-relative paths.
3. **Where the script should live** — default to `apps/frontend/scripts/seed-<program>.js` unless told otherwise.
4. **Content shape** confirmation — vocab field names differ by language:
   - Chinese: `hanzi/pinyin/type/type_short/meaning/example_zh/example_vi`
   - English: `word/ipa/type/meaning/example_en/example_vi`
   - Dialogue: Chinese uses `zh/py/vi`, English uses `en/vi` — never mix these across a program.

If any of these is unclear from the conversation, ask before writing the script — a wrong program code silently wipes the wrong program's lessons.

## Path resolution (the most common bug)

Batch JSON files are usually saved at the **project root**, not next to the script. A script living at `apps/frontend/scripts/seed-hsk2.js` needs to climb out of `apps/frontend/scripts/` back to the root — that's typically `../../../` or `../../../../` depending on workspace depth. Don't guess: if the user gives a Windows path for the script and a Windows path for the JSON files, compute the relative path yourself, or just hardcode the absolute path (this is what worked reliably in practice — Windows path math with PowerShell + Node has tripped this up before). Prefer an absolute path baked into the script over a fragile relative one; it's a one-off local script, not a portable library.

## Required script structure

```javascript
const { PrismaClient } = require('<path-to-database-package>');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Bắt đầu seed <PROGRAM>...');

  const program = await prisma.program.findUnique({ where: { code: '<program-code>' } });
  if (!program) {
    console.error('❌ Không tìm thấy program <program-code>');
    return;
  }

  // 1. Find old lessons for this program
  const oldLessons = await prisma.lesson.findMany({ where: { programId: program.id }, select: { id: true } });
  const oldLessonIds = oldLessons.map(l => l.id);

  // 2. MUST delete UserProgress before Lesson — RESTRICT foreign key will block deletion otherwise
  await prisma.userProgress.deleteMany({ where: { lessonId: { in: oldLessonIds } } });
  await prisma.lessonContent.deleteMany({ where: { lessonId: { in: oldLessonIds } } });
  await prisma.lesson.deleteMany({ where: { programId: program.id } });
  console.log(`✅ Đã xóa ${oldLessons.length} bài cũ`);

  // 3. Read all batch files
  const batchFiles = [/* absolute or resolved paths, in order */];
  const allLessons = [];
  for (const filePath of batchFiles) {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      allLessons.push(...data);
      console.log(`📂 Đọc ${path.basename(filePath)}: ${data.length} bài`);
    } else {
      console.warn(`⚠️ Không tìm thấy ${filePath}`);
    }
  }

  // 4. Seed lesson by lesson
  let totalVocab = 0, totalGrammar = 0, totalDialogue = 0;
  for (const lesson of allLessons) {
    const created = await prisma.lesson.create({
      data: {
        programId: program.id,
        title: lesson.title,
        theme: lesson.theme || null,
        orderIndex: lesson.orderIndex,
        isPremium: false,
      }
    });

    for (const word of (lesson.vocab || [])) {
      await prisma.lessonContent.create({ data: { lessonId: created.id, contentType: 'THEORY', content: JSON.stringify(word) } });
      totalVocab++;
    }
    for (const grammar of (lesson.grammar || [])) {
      await prisma.lessonContent.create({ data: { lessonId: created.id, contentType: 'GRAMMAR', content: JSON.stringify(grammar) } });
      totalGrammar++;
    }
    for (const dialogue of (lesson.dialogue || [])) {
      await prisma.lessonContent.create({ data: { lessonId: created.id, contentType: 'DIALOGUE', content: JSON.stringify(dialogue) } });
      totalDialogue++;
    }
    console.log(`✅ Bài ${lesson.orderIndex}: ${lesson.title} (${lesson.vocab?.length || 0} từ)`);
  }

  console.log('\n========== KẾT QUẢ ==========');
  console.log(`📚 Tổng bài học: ${allLessons.length}`);
  console.log(`📖 Tổng từ vựng: ${totalVocab}`);
  console.log(`📐 Tổng ngữ pháp: ${totalGrammar}`);
  console.log(`💬 Tổng hội thoại: ${totalDialogue}`);
  console.log('🎉 Seed hoàn thành!');
}

main().finally(() => prisma.$disconnect());
```

## Adapt, don't copy blindly

- If the project's `database` package import path is different, ask or check `package.json` workspaces first.
- If `contentType` enum values differ from `THEORY | GRAMMAR | DIALOGUE` in this project's schema, check `schema.prisma` before assuming.
- If the program has no `UserProgress` table relation, step 2's first delete can be dropped — but check first, since skipping it when it IS needed produces a cryptic Postgres `23001` foreign-key error that wastes a round trip to debug.

## After generating

Tell the user the exact command to run it (e.g. `node apps/frontend/scripts/seed-<program>.js` from the project root), and remind them to verify the batch JSON files actually exist at the paths used before running — a silent `⚠️ Không tìm thấy` for every file means zero lessons get seeded but the script still "succeeds".

---
name: content-qa-checker
description: Review a batch of language-learning lesson content (vocabulary, grammar points, or dialogues) for sequencing and consistency problems before it gets seeded into the database. Use this whenever the user pastes lesson JSON/data and asks to "kiểm tra nội dung", "duyệt batch", "xem ngữ pháp có ổn không", "check dialogue", or wants a quality pass on content before seeding — even if they don't explicitly ask for a "QA check". Also use proactively whenever about to seed a new batch, to catch issues like a dialogue using grammar the student hasn't learned yet.
---

# Content QA checker

## Why this exists

Content batches (vocab/grammar/dialogue, usually produced by Gemini/"A") look complete and well-formatted but can still have sequencing bugs invisible from a glance at one lesson: a beginner lesson opening with a relative clause, a dialogue using "Can I have..." before "can" has been taught, three lessons in a row all teaching Present Perfect with nothing else mixed in. These bugs only show up when you compare a lesson against everything that came *before* it — which is exactly what's tedious to do by hand and exactly what this skill should do systematically.

## What to check, in order

### 1. Grammar sequencing (the highest-value check)
Walk through the grammar points lesson by lesson, in order. For each one, ask: does this assume something not yet introduced? Specifically watch for:
- A structure that's objectively harder than what surrounds it (e.g. relative clauses, passive voice, reported speech, conditionals appearing in lesson 1-3 of a beginner program — these belong much later)
- The same grammar point (or a cluster of closely related ones, like "Present Perfect" + "Present Perfect with just/already/yet" + "Present Perfect with for/since") stacked in 2-3 consecutive lessons with nothing else mixed in — this is a sign content was generated topic-by-topic instead of interleaved for review
- A grammar point reappearing later with no apparent increase in complexity (wasted lesson slot)

When something looks out of order, say so concretely: which lesson, which point, why it doesn't fit, and what a more appropriate position would be — don't just flag it, suggest the fix.

### 2. Dialogue/grammar consistency
For each dialogue, check every sentence against the cumulative vocabulary and grammar taught up to and including that lesson. A dialogue in lesson 1 using "Can I have my book?" is broken if "can" isn't taught until lesson 6. This requires tracking what's been introduced so far — build a running mental list as you go through lessons in order, don't check each lesson in isolation.

Also check topical consistency: a dialogue titled "Food and Drink" that's actually about pets is a content bug, not a grammar bug, but just as worth flagging.

### 3. Vocabulary completeness
- Confirm the expected word count per lesson (ask the user what the target is if not obvious from context — commonly 15-20).
- Spot-check that every vocab entry has the example fields the project schema needs (e.g. `example_zh` + `example_vi` for Chinese, `example_en` + `example_vi` for English) — missing examples are easy to miss in a JSON dump but break the lesson UI.
- Watch for duplicate words across lessons within the same program if the project deduplicates by word/hanzi downstream (ask if unsure — duplicates may be intentional review, or may silently shrink the "total vocab" count after dedup).

### 4. Format/schema conformance
Check field names match what the target database expects (this project, for instance, uses `zh/py/vi` for Chinese dialogue and `en/vi` for English dialogue — never mixed). If a `references/` file for the project's exact schema exists, check against it; if not, ask the user to confirm field names once and remember them for the rest of the session.

## How to report findings

Don't dump a wall of text. Group by severity:
- **Blocking** — content actively contradicts what's been taught (wrong-order grammar, dialogue using untaught structures). These should be fixed before seeding.
- **Worth reconsidering** — stacking/clustering issues, topical mismatches. Flag with a suggested reorder, but it's the user's call.
- **Minor** — missing example fields, inconsistent formatting. List concisely.

If everything checks out for a section, say so briefly rather than staying silent — the user needs to know the check actually ran, not just that nothing happened to be wrong.

## Practical workflow

Don't try to re-read the entire batch from scratch with fresh eyes each time — when checking grammar sequencing across many lessons, query/list just the lesson titles + grammar titles in order first (a short summary, not full content) to get the shape of the whole arc before diving into any one lesson's full detail. This mirrors how the sequencing problem was actually caught in practice: a quick "lesson N → grammar title" listing across the whole program revealed the out-of-order points far faster than reading full lesson JSON top to bottom.

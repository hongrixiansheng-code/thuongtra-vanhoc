---
name: gemini-content-prompt-writer
description: Write a structured content-generation prompt for Gemini (or another content-writing AI assistant, referred to as "A" in this workflow) to produce language-learning material — vocabulary lists, grammar points, or dialogues — in a fixed JSON format ready to seed into a database. Use this whenever the user wants to commission a new content batch, says "nhờ A soạn", "viết prompt cho Gemini", "cần A làm nội dung cho bài X", or describes lesson topics/themes that need to become structured vocab/grammar/dialogue content.
---

# Gemini content prompt writer

## Why this exists

Content for a language program needs to come back in an exact JSON shape with an exact set of fields per language — get this wrong and every downstream step (QA check, seed script) breaks or needs rework. A loosely worded prompt ("write some vocab for lesson 5 about food") produces content that's plausible but doesn't match the schema, doesn't respect what's already been taught, or drifts in difficulty. This skill exists to make every commissioning prompt to "A" carry the same fixed structure, so output is predictable and seed-ready on the first try.

## What the prompt must specify

### 1. Scope and structure up front
State exactly how many lessons, and for each lesson: target vocab count (commonly 15-20), grammar point count (commonly 2-3), dialogue count (commonly 2). If the batch spans multiple themes/topics, list which lessons belong to which theme so "A" doesn't have to infer grouping.

### 2. Exact field shape per content type — pick the right one for the language

**Vocabulary (Chinese):**
```json
{"hanzi": "...", "pinyin": "...", "type": "...", "type_short": "...", "meaning": "...", "example_zh": "...", "example_vi": "..."}
```

**Vocabulary (English):**
```json
{"word": "...", "ipa": "...", "type": "...", "meaning": "...", "example_en": "...", "example_vi": "..."}
```

**Grammar (either language):**
```json
{
  "title": "...",
  "desc": "...",
  "formula": [{"text": "...", "classes": "border-{color}-200 bg-{color}-50 text-{color}-700"}],
  "practiceList": [{"correct": "...", "meaning": "..."}]
}
```

**Dialogue (Chinese):** lines use `zh`, `py`, `vi` — never `en`.
**Dialogue (English):** lines use `en`, `vi` — never `zh`/`py`.
This split matters enough to repeat explicitly in every prompt sent to "A", because mixing the fields silently breaks the lesson UI downstream rather than failing loudly.

Always paste 1-2 fully worked examples in the prompt, not just the abstract shape — concrete examples anchor tone and difficulty far better than a schema alone.

### 3. Sequencing constraints — this is what prevents the QA problems
- State what's already been taught in prior lessons (vocab + grammar) so new dialogue/grammar doesn't assume untaught material. If this is a continuation batch, summarize the cumulative vocab/grammar from earlier lessons in a few lines rather than assuming "A" remembers — each prompt should be self-contained.
- State the intended difficulty curve explicitly (e.g. "lesson 1 should review only what's in Starters, not introduce modal verbs yet") rather than just topic names — topic names alone don't constrain grammatical difficulty.
- If known problem patterns exist for this project (e.g. "don't stack 3 consecutive lessons all teaching Present Perfect variants — interleave with other structures"), state them as explicit constraints, not assumptions.

### 4. Output delivery instructions
- Specify the exact file naming convention if the batch will be split (e.g. `program-batchN.json`).
- Tell "A" to output complete, valid JSON for the requested lessons — not partial sketches with "..." placeholders.
- If the batch is large, instruct "A" to work in smaller sub-batches (e.g. 4-5 lessons per file) and present them one at a time, rather than attempting everything in one giant response — this is both more reliable and easier for the user to spot-check before the next chunk is generated.

## Reviewing the constraint list with the user first

Before sending a long commissioning prompt, briefly confirm with the user: lesson count, vocab/grammar/dialogue counts per lesson, and any known prior content the new batch needs to build on. Getting this wrong costs a full regeneration round trip; getting it right up front is cheap.

## What NOT to do

Don't ask "A" to also write the seed script or do schema/QA validation — that's a separate concern (see the seed-script-generator and content-qa-checker skills). Keep the content-commissioning prompt focused purely on producing the JSON content itself.

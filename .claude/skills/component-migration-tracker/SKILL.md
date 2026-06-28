---
name: component-migration-tracker
description: Plan and execute migrating a legacy component (in a components/legacy/ folder or similar) to its modern replacement, while keeping track of which components have already been migrated and which haven't. Use this whenever the user wants to "migrate component X", "thay legacy bằng bản mới", "chuyển ReadingTab sang TypeScript/component mới", or is deciding what to build next among several still-legacy features (e.g. Reading/Listening/Writing still using old components). Also use proactively when a new feature request would naturally touch a legacy component, to flag whether to migrate it now or work around it.
---

# Component migration tracker

## Why this exists

A codebase mid-migration (old `legacy/` components alongside new replacements, like `GrammarTab.tsx` → `GrammarClient.tsx` already done, but `ReadingTab.tsx`/`ListeningTab.tsx`/`WritingTab.tsx` still legacy) needs a clear, current picture of migration status — otherwise it's easy to either duplicate work (rebuilding something already migrated) or build new features on top of a legacy component that's about to be replaced anyway (wasted integration work). This skill keeps that picture accurate and uses the project's own already-completed migrations as the template for how to do the next one consistently.

## Step 1 — Establish current migration status before planning new work

Before recommending what to migrate next, check what's actually still in `legacy/` (or equivalent) and whether each remaining file has zero, partial, or no replacement yet. Don't assume the status from memory — verify by checking which legacy files are still imported anywhere (same technique as the dead-code-finder skill: a legacy file with zero importers left is fully migrated and safe to delete; a legacy file still imported somewhere is either fully legacy or in a partial state where some pages use the new version and others still use the old one — that partial state is itself worth flagging, since it usually means inconsistent behavior between pages doing "the same" thing).

## Step 2 — Use the project's own successful migrations as the template

When a migration has already succeeded in this codebase (e.g. legacy `GrammarTab.tsx` → `GrammarClient.tsx`, or `CurriculumTab.tsx` → folded into `DashboardClient.tsx`), that's the concrete pattern to follow for the next one, not a generic "convert to TypeScript" instruction. Look at what changed structurally — for this project specifically, the established pattern has been: replace a single "list everything, no real layout" tab with a sidebar (grouped by lesson) + content-pane layout, move data-fetching into a shared `lib/` function with admin-bypass logic baked in via `getCompletedLessonIds`, and use a Client Component only for the interactive parts while keeping the page itself a Server Component. Reuse this shape unless there's a specific reason the new component needs to differ.

## Step 3 — Plan the migration in slices, not one big rewrite

Mirror how migrations were actually executed here: (1) build the new component alongside the old one without deleting anything yet, (2) wire up the new route/page to use it, (3) verify it works end to end including the admin-bypass and premium-lock logic, (4) only then check for and remove the now-unused legacy file and its imports. Don't delete the legacy file in the same step as building the replacement — that removes the fallback if the new version has a bug, and makes it harder to isolate whether a regression came from the new component or from something else changed at the same time.

## Step 4 — Flag schema/data compatibility before migrating

Some legacy components (per this project: the Reading/Listening/Writing tabs) are tied to assumptions about content shape that may only hold for one language (e.g. built around Chinese-specific fields like `hanzi`/`pinyin`, with no equivalent path for English `word`/`ipa` content). Before planning the migration, check whether the new component needs to support both shapes from day one, or whether it's acceptable to scope the first migration to one language and explicitly leave the other as "not yet supported" (matching how this project currently marks English reading/listening/writing as "🚧 Đang phát triển" rather than pretending they work). State this scoping decision explicitly rather than discovering it mid-implementation.

## Reporting migration status

When asked "what's left to migrate" or similar, give a concrete table: component name, current status (not started / in progress / done), and what's blocking it if not done (usually: needs the multi-language field handling sorted out first, or needs no replacement yet designed). This is the same shape of status table already used in this project's CLAUDE.md and UserFlow docs — keep it consistent with those rather than inventing a new format.

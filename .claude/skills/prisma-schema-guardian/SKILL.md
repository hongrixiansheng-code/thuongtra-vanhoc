---
name: prisma-schema-guardian
description: Review and plan any change to a Prisma schema.prisma file (adding fields, changing enums, adding relations) before it gets applied, checking for migration risk and impact on existing seed scripts, queries, and data. Use this whenever the user wants to "thêm field vào schema", "đổi enum", "thêm bảng mới", "sửa Prisma schema", or describes a database structure change — even if they only ask to run the migration, not to review it first. Also use proactively whenever a feature request implies a schema change (e.g. "thêm tính năng X" where X clearly needs new fields) before any code is written.
---

# Prisma schema guardian

## Why this exists

A schema change looks like one line in `schema.prisma` but can silently break several other things: a seed script that doesn't set the new required field, existing rows that have no value for a newly non-nullable column, frontend code that checks an enum value that no longer exists, or a relation that needs a `RESTRICT`/`CASCADE` decision that determines whether a future delete throws a foreign-key error (this exact problem already happened once in this project — deleting a `Lesson` failed because `UserProgress` rows referencing it weren't cleaned up first). The goal of this skill is to catch these consequences during planning, before the migration is written, not after it fails or after data gets corrupted.

## What to check before any schema change

### 1. Is the field nullable, has a default, or genuinely required?
A new required field with no default breaks `prisma migrate dev` against any existing data, and breaks every existing `.create()` call across the codebase that doesn't pass it. Default to: add as optional (`String?`) or with a `@default(...)` unless the user explicitly confirms every existing row can supply a value safely. If existing rows can't supply a sensible default, the migration needs a data-backfill step, and that needs to be called out explicitly as a sequenced step (add nullable column → backfill data → flip to non-nullable in a second migration), not done in one shot.

### 2. Enum changes — what currently reads/writes this value?
Before renaming or removing an enum value, search the codebase for every place that compares against it (e.g. `role === "ADMIN"`, `contentType: "THEORY"`). Renaming `THEORY` to `VOCAB` silently breaks every comparison still checking for the old string — these don't throw a TypeScript error if comparisons are against raw strings rather than the Prisma-generated enum type. List every file that needs a matching update alongside the schema change, don't treat the schema edit as complete on its own.

### 3. Relations — what happens on delete?
For any new `@relation`, decide and state explicitly: `onDelete: Cascade`, `Restrict` (the default), or `SetNull`. A `Restrict` relation (the default if unspecified) means deleting the parent will throw unless the child rows are deleted first — this needs to be reflected in any seed/reset script that deletes and recreates data (delete children before parents, in dependency order). If `Cascade` is more appropriate (e.g. deleting a Lesson should delete its LessonContent automatically), say so and recommend it explicitly rather than leaving the default unconsidered.

### 4. What does this break downstream?
After the schema edit itself, list the concrete other places that need a matching change:
- Seed scripts that `.create()` records of the affected model
- Any `getXData()` style data-fetching function in `lib/` that selects specific fields (Prisma's `select`/`include` won't auto-include new fields, so a new field added to the schema won't show up in the frontend until the relevant query is updated)
- Frontend components that destructure the shape of data returned from those queries
- TypeScript types if they're hand-declared anywhere rather than fully inferred from Prisma Client

### 5. Production vs dev migration strategy
Never suggest `prisma migrate dev` directly against a production database with real user data — it can prompt for destructive resets if the migration history diverges. For production, the safe path is `prisma migrate deploy` against an already-reviewed migration generated in a dev/staging environment first. If the user is working directly against a production Postgres instance (common for a solo developer without separate staging), be explicit about this risk and suggest snapshotting/backing up before applying.

## How to present a schema change plan

Don't just hand over the new `schema.prisma` snippet. Structure the answer as: (1) the schema diff itself, (2) the exact list of other files that need a matching change because of it, (3) the migration command and any backfill step needed, (4) anything that should be tested manually afterward (e.g. "create a new lesson via the existing seed script and confirm the new field populates correctly"). This mirrors how schema-adjacent bugs actually got caught and fixed in this project — by working outward from the schema to everything that touches it, not by treating the schema file in isolation.

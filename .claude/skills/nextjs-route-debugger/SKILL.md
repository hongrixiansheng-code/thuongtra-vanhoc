---
name: nextjs-route-debugger
description: Systematically debug a Next.js App Router page or route that loads without errors but shows wrong, missing, or stale data — e.g. a lock/permission check that doesn't work, a filter that doesn't apply, or content that doesn't match what's in the database. Use this whenever the user reports "trang load được nhưng data sai", "admin bypass không hoạt động", "không lọc đúng completedLessonIds", "trang hiện sai nội dung dù DB đúng", or any bug where the page renders successfully but the wrong information shows. This is for logic bugs, not for build errors or red console exceptions — for those, just read the error directly.
---

# Next.js App Router data-flow debugger

## Why this exists

The hardest Next.js bugs to chase are the silent ones: the page renders, there's no red error in the console, but the data is wrong — an admin bypass that doesn't apply, a progress filter that shows the wrong lessons, content that doesn't match what the database actually has. These bugs are almost always caused by a break somewhere in the Server Component → data-fetch → Client Component prop chain, and they need to be debugged by walking that chain step by step rather than guessing at the symptom.

## The debugging order

Work through these in order — each step either confirms the data is right at that stage (move to the next) or finds the break (stop and fix):

### 1. Is the Server Component actually re-running with fresh data?
Check for `export const dynamic = 'force-dynamic'` (or equivalent) on pages that read session/database state — without it, Next.js may statically cache the page and serve stale data even after the underlying database changes. If a page "sometimes" shows old data, this is the first thing to check, not a database problem.

### 2. Is `searchParams` awaited correctly?
In recent Next.js App Router versions, `searchParams` and `params` are async and must be awaited (`const sp = await props.searchParams`) before destructuring. A page reading `searchParams.level` directly without awaiting will silently get `undefined`, which often falls through to a default value that masks the bug — e.g. always loading `hsk1` content regardless of the actual `?level=` in the URL. This is a top suspect whenever a query-param-driven filter "doesn't work" but works fine when hardcoded.

### 3. Is the session actually being read, and read once?
Check `getServerSession(authOptions)` is called, the result isn't silently `null` (which it will be if the user isn't actually logged in during the test, or if `authOptions` isn't correctly wired), and that it isn't queried twice with two separate `PrismaClient` instances doing redundant/inconsistent lookups (a real bug pattern already hit and fixed in this project — `dashboard/page.tsx` had two separate Prisma queries for the same user, one for progress and one for role, which is wasteful and a source of subtle inconsistency if they're ever allowed to diverge).

### 4. Is the helper function actually being called with the right argument?
For project-specific helpers like `getCompletedLessonIds(programCode)`, confirm the call site is actually passing the parameter, not calling it bare. A helper designed to filter by program but called without the program code will return the wrong set silently — no error, just wrong data, because the function still returns *something*, just not what's expected for that page's program.

### 5. Does the Prisma query's `select`/`include` actually return the fields the component needs?
A common silent-data bug: the page's Prisma query doesn't `include`/`select` a relation or field that a child component expects, so that prop arrives as `undefined`, and the component either crashes (an actual error — different bug class) or silently renders as if the field were empty/false (a logic bug — this is the dangerous version). Check the exact shape of what the query returns against the exact shape the Client Component destructures.

### 6. Is the data passed all the way down through the prop chain?
For multi-level component trees (Server Component → Client Component → nested children), confirm the prop is actually threaded through every level. A prop computed correctly in the Server Component but never passed into a nested child is a common source of "the data exists, I can console.log it at the top, but the bottom component still shows the default."

### 7. Is client-side state stale after a server action?
If the bug only shows up *after* an action (e.g. completing a lesson, then the dashboard not reflecting it), check whether the page does a hard reload (`window.location.reload()`) or relies on Next.js's router cache invalidation — App Router caches aggressively, and a server mutation that doesn't trigger `revalidatePath`/`router.refresh()` or an explicit reload can leave the client showing pre-mutation data even though the database is correct.

## How to report findings

State which step in the chain breaks, why, and the minimal fix — don't propose a broad rewrite when the actual bug is a single missing `await` or a helper called without its argument. Most of these bugs (per this project's actual history) turn out to be exactly one of: missing `await searchParams`, a helper called without its required parameter, or a `select`/`include` missing a field — check these three first before going deeper into the chain.

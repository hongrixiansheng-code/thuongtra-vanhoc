---
name: prisma-query-reviewer
description: Review a Next.js Server Component or API route's Prisma usage for duplicate client instantiation, redundant queries, missing select/include optimization, or N+1 query patterns. Use this whenever the user pastes a page.tsx, route.ts, or Server Action that queries the database and asks to review/clean it up, or whenever you're about to write new Prisma queries for a page and want to check the pattern is efficient before writing it. Also use proactively after generating or editing any file that calls new PrismaClient() or a Prisma model find method, to catch duplication before the user has to spot it from a screenshot.
---

# Prisma query reviewer

## Why this exists

Page-level Prisma usage tends to accumulate small inefficiencies that don't cause visible bugs but waste database round trips and make the code harder to reason about: two separate `new PrismaClient()` calls in the same function doing overlapping lookups (a real pattern already found and fixed in `dashboard/page.tsx` — one query fetched the user with their progress, a second separate query fetched the same user again just to check their role), queries inside a loop instead of batched, or `select`/`include` clauses that pull more data than the component actually uses. None of these throw errors, so they only get caught by manual review — which is exactly what this skill should do every time new Prisma-touching code is written or reviewed, not just when something visibly breaks.

## What to check

### 1. Multiple PrismaClient instantiations in one function/file
If `new PrismaClient()` appears more than once within the same request-handling function, that's almost always wasteful — there's no reason to open the client twice when query results can be combined into one round trip with a single client instance. Combine the queries: a single `findUnique` with multiple `include` clauses can satisfy what looks like a need for two separate lookups.

### 2. Querying the same model twice for the same logical entity
Watch for the pattern: query A fetches `user` for purpose X, query B fetches `user` (same `where` clause, different fields) for purpose Y, in the same function. These should almost always be one query with both sets of fields/relations included, not two.

### 3. Queries inside a loop (N+1 pattern)
If a `.map()` or `for` loop calls `prisma.<model>.find...()` once per iteration, that's an N+1 query — for N items, N+1 round trips to the database instead of 1 or 2. The fix is almost always: collect the IDs needed across all iterations first, then do one `findMany({ where: { id: { in: [...] } } })`, then map results back in memory. Flag this even if it currently "works" — it gets slower linearly as data grows and is one of the most common silent performance bugs in ORM-based code.

### 4. Over-fetching — missing or absent `select`
A query with no `select`/`include` returns every scalar column on the model. If the component only uses 2-3 fields, an explicit `select` reduces payload size and makes the data contract clearer (a future reader can see exactly what's used just by reading the query, rather than having to trace through the component). This matters more as models grow more columns over a project's life — flag it as a recommendation, not a hard requirement, since over-fetching a small model isn't a real problem.

### 5. Missing `include` causing downstream `undefined`
The inverse problem: a component destructures `user.progress` or similar nested relation data, but the query that fetched `user` didn't `include: { progress: true }`. This produces a silent `undefined` rather than an error in many cases (especially if the component has a fallback like `progress?.length || 0`), making it a classic "looks fine, data is just missing" bug — cross-reference the query's `select`/`include` against every field the calling component actually destructures.

### 6. Server Component re-fetching what middleware/layout already fetched
If a layout or middleware already resolved the session/user, check whether the page is re-doing `getServerSession` + a fresh Prisma lookup for information already available higher in the tree. This isn't always avoidable in Next.js's per-request model, but worth flagging if there's an obvious opportunity to pass data down instead of re-querying.

## How to report

List findings as concrete before/after code, not abstract advice — show the combined query that replaces two separate ones, or the batched `findMany` that replaces the loop. If the file already looks clean (this does happen, especially after a prior cleanup pass), say so briefly rather than inventing minor nitpicks just to have something to report.

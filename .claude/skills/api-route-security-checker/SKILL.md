---
name: api-route-security-checker
description: Review a Next.js API route or Server Action — especially anything handling payments, user data, or admin actions — for missing session checks, missing role checks, missing webhook signature verification, or data leaks across users. Use this whenever the user writes or pastes a new `route.ts`/Server Action that touches payment, user accounts, or admin functionality, asks "route này có an toàn không", "check bảo mật API này", or is about to build the Payment/Admin Dashboard backend. Always use this before any payment webhook or admin-mutation route is considered done.
---

# API route security checker

## Why this exists

API routes and Server Actions are the part of a Next.js app most exposed to direct, unauthenticated requests — anyone can hit a route URL or call a Server Action directly, bypassing whatever UI normally gates access to it. A route that "looks" protected because the frontend only shows the button to admins is not actually protected if the route itself doesn't re-check the role server-side. This matters most exactly where this project is headed next: Payment webhooks (an attacker-reachable endpoint by definition) and Admin Dashboard mutations (user role changes, subscription overrides) — both are high-value targets if left unchecked.

## What to check on every route reviewed

### 1. Is there a session check at all?
Every route that reads or writes user-specific or admin-only data needs `getServerSession(authOptions)` (or equivalent) at the top, with an early return (401/403) if there's no session. A route with database logic but no session check is reachable by anyone who knows or guesses the URL — this is the single most important thing to verify first, before looking at anything else.

### 2. Is the role check actually enforced server-side, not just hidden in the UI?
For admin-only routes, confirm the route itself checks `session.user.role === "ADMIN"` (or the project's equivalent) and returns 403 if not — don't accept "the admin nav only shows this link to admins" as sufficient, since the route is reachable directly regardless of what links the UI shows. Every admin mutation route (user role changes, manual subscription upgrades, content seed/reset triggers) needs this explicit server-side check.

### 3. Does the route operate only on the requesting user's own data?
For any route taking an ID (lesson ID, user ID, payment ID) as input, check whether it verifies that ID belongs to (or is permitted for) the requesting session's user, rather than trusting the client-supplied ID blindly. A progress-update route that writes `UserProgress` using a `userId` taken directly from the request body, rather than from the authenticated session, lets one user write progress data for another user's account. The authenticated session's user ID should be the source of truth for "whose data is this," not a client-supplied parameter, except in routes explicitly meant for admins acting on other users (which need the role check from point 2).

### 4. Webhook-specific: is the signature verified before any data is trusted?
For payment webhooks (MoMo/VNPay or similar), the single most important check is signature verification using the secret key, done *before* any of the payload's claimed data (order ID, amount, status) is used to update the database. A webhook handler that updates `subscriptionStatus` based on payload fields without first verifying the signature is forgeable — anyone who knows or guesses the webhook URL shape can grant themselves Premium by POSTing a fake "success" payload. Confirm: signature check happens first, and the handler returns early (without touching the database) if verification fails.

### 5. Webhook-specific: is the handler idempotent?
Payment gateways commonly retry webhook delivery. Confirm the handler checks whether the order/transaction has already been processed (e.g. `status` is already `COMPLETED`) before applying the update again — without this check, a duplicate webhook delivery could double-extend a subscription period or trigger duplicate side effects like sending a confirmation email twice.

### 6. Does the response leak more than it should?
Check what the route returns in its response body, especially on error paths. A route that returns full Prisma error objects or stack traces to the client can leak schema details, internal IDs, or other users' data embedded in an error message. Error responses should be generic from the client's perspective ("something went wrong") with the real detail only going to server-side logs.

### 7. Are inputs validated before use?
Confirm request body/query fields are checked for type and presence before being used in a database query — an unchecked field passed directly into a `where` clause or used to construct a dynamic query is a potential injection or crash vector, even with an ORM like Prisma (e.g. a missing field causing `undefined` to be passed somewhere a real value was expected, producing confusing downstream errors rather than a clean validation error).

## How to report

Group findings by severity, the same way as `content-qa-checker` does for content: **blocking** (no session check, no signature verification — must fix before this route goes live), **should fix** (idempotency, input validation, response leakage), **minor** (logging improvements, error message clarity). For payment and admin routes specifically, treat "blocking" issues as hard stops — don't present them as optional suggestions, since the cost of skipping them is real financial or data exposure, not just code-quality debt.

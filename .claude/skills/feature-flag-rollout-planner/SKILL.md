---
name: feature-flag-rollout-planner
description: Plan a staged rollout for a large new feature (Admin Dashboard, Payment integration, a new content module) so it can be built and tested against production without breaking the experience of existing users. Use this whenever the user is about to start a big feature that touches shared code or live user-facing pages, asks "làm sao triển khai từ từ", "test trước khi public", "chỉ admin thấy được không", or is worried about breaking production while building something new. Also use proactively when a feature plan implies touching a page real users already depend on (e.g. adding payment to the same dashboard users complete lessons on).
---

# Feature flag / staged rollout planner

## Why this exists

Big features (a Payment system, an Admin Dashboard with user/subscription management, a new content module) take multiple sessions to build and are rarely done all at once. If the in-progress code lives directly in the same files real users hit every day, a half-finished feature can break a fully-working one — a Payment webhook bug shouldn't be able to corrupt `User.subscriptionStatus` for someone who never touched the payment flow, and an Admin Dashboard query bug shouldn't be able to slow down or break the regular `/dashboard` page. This skill exists to plan the boundary between "in progress, only I can see it" and "live for everyone" before writing the feature, not after something breaks in front of real users.

## How to plan a staged rollout

### 1. Identify the blast radius
For the feature being planned, ask: what existing, currently-working pages or data does this touch? A new `/admin/users` page touching only new routes has a small blast radius (worst case: that one page breaks). A Payment webhook that writes to the same `User` table the dashboard reads from has a large blast radius (a bug there can break the core learning experience, not just the new payment page). Features with a large blast radius need more rollout caution than features that are purely additive/isolated.

### 2. Default staging order: admin-only → premium-only → public
For most features in this kind of project, the natural staged order is:
1. **Admin-only** — gate behind the existing `isAdmin` check already used elsewhere in the codebase (e.g. `getCompletedLessonIds` already returns an admin flag). Build and test the full feature with only admin accounts able to see/trigger it.
2. **Limited/premium-only** (if applicable) — once stable, open to a smaller real-user segment before going fully public, if the feature has a natural smaller audience (e.g. payment renewal flows might first be tested with a small set of real premium users before opening signup-time payment to everyone).
3. **Public** — remove the gate once the above stages haven't surfaced issues.

Not every feature needs all three stages — a purely additive feature with no shared-state risk (e.g. a new vocabulary game mode) can often skip straight to public after admin testing. Use judgment on which stages are warranted based on the blast radius from step 1.

### 3. How to implement the gate, concretely
Prefer the simplest mechanism that fits the project's existing patterns rather than introducing a new feature-flag library or config system for a solo-developer project:
- **Role/permission check** (reuse what exists): wrap the new route or UI section in the same `isAdmin` / `isPremiumUser` check pattern already used throughout the codebase, rather than inventing a new flag system.
- **Route-level gating**: a genuinely new feature can simply live at a route only linked from admin-only navigation, with no public link to it yet — "unlisted but live" is often enough during build-and-test, with a server-side role check as the real guard (an unlisted URL alone is not security, just obscurity — always pair it with an actual permission check for anything touching real data).
- **Database-level safety**: for features writing to shared tables (like Payment writing to `User.subscriptionStatus`), consider writing to a new, isolated field first (e.g. a `pendingSubscriptionStatus` or a separate `Payment` record) and only flip the live field once the write path is proven correct — this avoids a buggy in-development write path corrupting the field every other part of the app already depends on.

### 4. Plan the test pass before removing the gate
Before promoting a feature from admin-only to the next stage, define what "tested enough" means concretely for that feature — e.g. for Payment: at least one full successful transaction, one failed/cancelled transaction, one webhook retry/duplicate-delivery scenario, and confirmation that `subscriptionEnd` calculates correctly for both monthly and yearly plans. Write this checklist out explicitly rather than relying on "it seemed to work when I tried it once."

### 5. Plan the rollback
For any feature with a large blast radius (per step 1), state explicitly how to turn it back off if something goes wrong after it's live — usually as simple as re-adding the role check that was removed, or reverting the specific commit. Knowing this in advance, before something breaks, is much faster than figuring it out during an incident.

## How to present a rollout plan

Give a concrete staged checklist: stage name, what's gated and how, what "ready for next stage" means, and the rollback plan if something breaks at that stage. Keep it proportional to the actual risk — a small additive feature doesn't need the same ceremony as something writing to shared user/payment state.

---
name: userflow-diagram-writer
description: Write or update a user-flow diagram as a plain markdown tree (not an SVG/visual diagram tool) documenting how a feature works end to end — screens, decisions, branches, and outcomes. Use this whenever the user wants to document a flow before a refactor, says "vẽ user flow", "viết flow dạng markdown", "cập nhật sơ đồ luồng", or when a new feature has just been built and needs to be captured for future reference (e.g. before a cleanup pass, before onboarding a new collaborator, or before writing/updating project docs).
---

# User flow diagram writer (markdown tree format)

## Why markdown tree, not a visual diagram tool

Visual diagram tools (SVG flowcharts, mockup widgets) are expensive to generate and re-read compared to a markdown tree — and for documenting application logic (not explaining a *concept* to someone unfamiliar with it), a tree is just as clear, far cheaper, and trivially version-controllable as a plain `.md` file the project can keep in a `docs/` folder. Default to markdown tree format for user-flow documentation; only reach for an actual visual diagram tool if the user explicitly asks for a visual rendering.

## Format

Use nested bullet/tree structure with `├──`, `└──`, `│` connectors, similar to a directory tree. Each major flow gets its own top-level block. Use these conventions consistently:

- A plain line = a screen, state, or action.
- A line ending in `?` = a decision point; its children are the branches, each one prefixed with the condition that leads there.
- `[Bracketed labels]` = a sub-flow or form/modal that's logically grouped together.
- Indentation depth = sequence/nesting, exactly like a file tree — don't flatten unrelated branches to the same indentation level.

### Example shape

```
Tên màn hình bắt đầu
│
├── Điều kiện rẽ nhánh?
│   ├── Trường hợp A → Kết quả A
│   └── Trường hợp B → Kết quả B
│
├── [Sub-flow / form]
│   ├── Bước 1
│   ├── Bước 2
│   └── Kết quả → bước tiếp theo
│
└── Kết thúc / trạng thái cuối
```

## What to include for a complete flow

For each screen or step, capture the parts that matter for someone debugging or extending the feature later, not just the happy path:
- **The trigger** — what action gets the user here.
- **Branches** — every meaningfully different outcome (success/failure, role-based differences like ADMIN vs USER, locked/unlocked states), not just the main path.
- **Side effects** — what gets written to a database, what session state changes, what gets unlocked as a result. These are easy to forget documenting but are exactly what someone refactoring the code later needs to know.
- **Where it's incomplete** — if a branch leads to something not yet built (e.g. "🚧 Đang phát triển"), say so explicitly in the tree rather than omitting it; the diagram should reflect the *actual* state of the system, not the intended final state.

## Splitting into multiple diagrams

Don't try to cram an entire application into one tree. Split along natural seams — authentication, the core learning/usage loop, content access rules, admin functions, payment — each as its own file or top-level section. A good rule of thumb: if a single flow needs more than ~3 levels of nesting consistently, it's probably two flows that should be documented separately and cross-referenced ("→ see 02-learning-flow.md") rather than one sprawling tree.

## Saving the result

If the project has (or should have) a `docs/` folder, suggest filenames like `01-auth-flow.md`, `02-learning-flow.md` — numbered for reading order, one flow per file. Ask the user whether they want the files written directly via the file tools, or just want the markdown printed in chat for them to copy themselves — both are common depending on whether the user has shell access to the project at that moment.

## Keeping it updated

A user-flow doc is only useful if it matches reality. After a significant feature change, proactively suggest updating the relevant flow file rather than waiting to be asked — this is the same instinct that prompted writing these diagrams in the first place: capturing the system as built, immediately after building it, while the details are still fresh.

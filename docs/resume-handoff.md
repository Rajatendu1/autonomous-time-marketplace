# Resume Handoff

This file is the durable memory for future Codex chats. Read it first when resuming.

## Project

TimeFoundry: a zero-cost autonomous startup building a time-trading marketplace plus an autonomous company OS.

## Current Workspace

`C:\Users\rajat\Documents\Codex\2026-05-02\lets-build-a-awesome-marketplace-for`

## GitHub

Remote: `https://github.com/Rajatendu1/autonomous-time-marketplace`

Branch: `main`

## Latest Session Notes

- Started from an empty workspace.
- Created the initial repository structure.
- Added product vision, free-resource policy, autonomous company OS design, and this resume handoff.
- Built dependency-free static MVP in `public/index.html`, `public/styles.css`, and `public/app.js`.
- Added marketplace seed data in `src/data/seed.json`.
- Added machine-readable agent registry in `src/orchestration/agent-registry.json`.
- Added machine-readable backlog in `src/orchestration/backlog.json`.
- Added dependency-free planning loop in `src/orchestration/autonomy-loop.mjs`.
- Added generated autonomy report at `docs/generated/autonomy-report.md`.
- Added first CI workflow at `.github/workflows/ci.yml`.
- Added free GitHub Pages deployment workflow at `.github/workflows/pages.yml`.
- Added product ledger rules and support/safety flow docs.
- Initialized git in this workspace.
- Added `.gitignore`.
- Added browser `localStorage` persistence for spendable, held, earned, and posted requests.
- Updated the autonomy loop to write timestamped logs in `docs/generated/agent-runs/`.
- Verified `node src/orchestration/autonomy-loop.mjs` runs successfully.
- Verified `node --check public/app.js` and `node --check src/orchestration/autonomy-loop.mjs`.
- Pushed the initial project to GitHub repo `Rajatendu1/autonomous-time-marketplace`.
- Merged the repo's original one-line README commit into local history and kept the richer project README.
- Added guarded autonomy policies in `src/orchestration/policies.json`.
- Added `src/orchestration/run-company.mjs`, which evaluates active backlog items, writes daily company reports, and annotates backlog items with autonomy decisions.
- Added scheduled GitHub Actions company loop in `.github/workflows/autonomous-company.yml`.
- Added GitHub issue templates for agent tasks and human approval requests.
- Added label definitions in `.github/labels.yml`.

## Operating Instructions For Future Chat

1. Read `README.md`.
2. Read this file.
3. Check current files with `Get-ChildItem -Force`.
4. Continue from the highest-priority task below.
5. Update this file before stopping.

## Highest-Priority Next Tasks

1. Check GitHub Actions in `Rajatendu1/autonomous-time-marketplace` and confirm CI/Pages/autonomous-company workflow status.
2. Decide whether to allow GitHub Pages deployment; the policy layer currently marks `TF-005` as `needs-human-approval`.
3. Expand the marketplace into separate views for profile, booking detail, trust, and admin.
4. Add lightweight tests once a package manager is introduced.
5. Add a real issue-to-agent workflow that turns backlog items into implementation tasks.

## Known Constraints

- No paid services.
- Prefer free/open-source/self-hosted.
- Keep the project resumable and documented.
- Avoid dependency installs unless needed.

## How To Preview

Open `public/index.html` directly in a browser. No local server is required for the current MVP.

## Verification Commands

```powershell
node src/orchestration/autonomy-loop.mjs
node src/orchestration/run-company.mjs
node --check public/app.js
node --check src/orchestration/run-company.mjs
node --check src/orchestration/autonomy-loop.mjs
```

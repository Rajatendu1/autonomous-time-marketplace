# TimeFoundry

Repository: `autonomous-time-marketplace`

TimeFoundry is a zero-cost autonomous-company prototype for a marketplace where people trade time, skills, favors, and availability through a credit ledger instead of cash-first transactions.

The project has two connected products:

- A user-facing time marketplace MVP.
- An internal autonomous company OS that plans, builds, tests, monitors, supports, and grows the marketplace using free infrastructure wherever possible.

## Current Status

This repository is intentionally dependency-free for the first version. Open `public/index.html` directly in a browser to use the prototype.

## Free-First Principle

Every layer must prefer:

1. Existing free tier.
2. Open-source self-hosted option.
3. Local script or repo-native automation.
4. Build our own small service.

Paid services are not allowed unless explicitly approved and documented in `docs/free-resource-policy.md`.

## Repository Map

- `public/index.html` - static MVP app shell.
- `public/styles.css` - responsive product UI.
- `public/app.js` - marketplace interaction logic.
- `src/data/seed.json` - starter marketplace and agent data.
- `src/orchestration/autonomy-loop.mjs` - dependency-free autonomous planning loop.
- `docs/vision.md` - startup vision and product definition.
- `docs/autonomous-company-os.md` - agent hierarchy and operating model.
- `docs/free-resource-policy.md` - approved free stack and cost guardrails.
- `docs/resume-handoff.md` - durable handoff log for future Codex chats.
- `.github/workflows/ci.yml` - planned free CI pipeline.

## Local Use

Open:

```text
public/index.html
```

Optional local checks:

```powershell
node src/orchestration/autonomy-loop.mjs
```

## Automation Model

The first autonomous layer is repo-native. It reads structured backlog inputs, selects next work, updates generated task reports, and is designed to run locally or through GitHub Actions free minutes.

Later phases can add:

- Agent work queues.
- PR-creating implementation agents.
- CI triage agents.
- Support and growth agents.
- Deployment health monitors.

## Resume Rule

Before ending a work session, update `docs/resume-handoff.md` with:

- What changed.
- What is working.
- What is blocked.
- The next highest-leverage task.

# Autonomous Company OS

The autonomous company is organized into layers. Each layer has agents, state, limits, and handoff rules.

## Layers

1. Direction Layer
   - Maintains mission, current strategy, risks, and approval boundaries.

2. Orchestration Layer
   - Breaks goals into tasks.
   - Assigns tasks to role agents.
   - Tracks limits, dependencies, and blockers.
   - Writes resume summaries.

3. Product Layer
   - Owns user journeys, roadmap, research, metrics, and experiments.

4. Design Layer
   - Owns interface, accessibility, brand system, and product copy.

5. Engineering Layer
   - Owns implementation, tests, code review, refactors, and fixes.

6. Infrastructure Layer
   - Owns CI, deployments, health checks, backups, and runtime limits.

7. Support Layer
   - Owns issue intake, dispute flows, help content, and safety escalation.

8. Growth Layer
   - Owns SEO, launch content, referrals, community, and lifecycle messages.

9. Governance Layer
   - Owns policies, legal review queues, privacy, audit logs, and cost approvals.

## Agent Contract

Every agent needs:

- Role.
- Inputs.
- Outputs.
- Permissions.
- Daily budget.
- Stop conditions.
- Handoff format.

## Stop Conditions

An agent must stop and checkpoint when:

- It hits the daily limit.
- It needs paid infrastructure.
- It needs human approval.
- Tests fail and the fix is unclear.
- Work would delete or expose user data.

## First Implementation

The first implementation is `src/orchestration/autonomy-loop.mjs`. It is small on purpose: it reads seed state, chooses prioritized work, and writes a report. This can later become a queue-backed multi-agent scheduler.

The guarded company control plane is `src/orchestration/run-company.mjs`. It reads backlog, agent registry, and policy rules, then writes a daily company report and marks each active item as autonomous, blocked, or requiring human approval.

## GitHub Autonomy

`.github/workflows/autonomous-company.yml` runs the guarded company loop every six hours on GitHub Actions free minutes. It commits generated reports back to the repo. This keeps the company memory moving without requiring chat approval for every planning cycle.

Autonomous work is still bounded by `src/orchestration/policies.json`. Paid resources, real user messaging, legal/privacy changes, and production-risk actions require human approval.

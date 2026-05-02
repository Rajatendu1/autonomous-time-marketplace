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


# Free Resource Policy

TimeFoundry is built under a zero-cost constraint. This document is the allowlist and decision process for tools.

## Default Approved Resources

- Code hosting: GitHub free.
- CI: GitHub Actions free minutes, with strict job limits.
- Frontend hosting: GitHub Pages, Cloudflare Pages free, Netlify free, or Vercel hobby free.
- Database prototype: browser storage, SQLite, Supabase free, Neon free, or local Postgres.
- Auth prototype: local mock auth, Auth.js, Supabase Auth free tier, or passkey-first self-hosted auth later.
- Monitoring prototype: uptime checks from GitHub Actions, repo issues, and static status logs.
- Analytics prototype: local event table, self-hosted Plausible later, or privacy-preserving custom events.
- Design: CSS, open-source icons, generated assets created locally, and public-domain/appropriately licensed assets.
- Project management: markdown files, GitHub Issues, GitHub Projects free.

## Disallowed Without Approval

- Paid API usage.
- Paid hosting tiers.
- Paid databases.
- Paid queue services.
- Paid email volume services.
- Paid observability products.
- Closed-source agent platforms that require subscription.

## Build-Versus-Use Rule

If a tool is not free:

1. Search for a free tier or open-source equivalent.
2. If it creates lock-in, build a minimal internal version.
3. Document the tradeoff before adoption.

## Agent Cost Guardrails

- Agents must have daily work budgets.
- Agents must checkpoint work before stopping.
- Agents must never assume an external service is free.
- Agents must log any resource that could become billable.


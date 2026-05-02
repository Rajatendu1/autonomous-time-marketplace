# Vision

TimeFoundry is a marketplace for trading time. People can offer useful blocks of time, request help, and settle exchanges through time credits, reciprocal commitments, or community-backed reputation.

The larger ambition is a completely autonomous company: a startup where agents coordinate product, design, engineering, operations, growth, support, compliance, and finance while humans provide direction, judgment, and approval for risky actions.

## Product Thesis

People have valuable time that is hard to price, discover, or exchange. A time marketplace can make small pockets of skill, care, advice, labor, and accountability tradable without requiring every interaction to become a cash transaction.

## MVP User Jobs

- Create a profile with skills, availability, and preferred exchange style.
- Offer a time block.
- Request a time block from another person.
- Track credits and commitments.
- Review completed exchanges.
- Escalate a dispute or unsafe interaction.

## Marketplace Units

- `Minute` - atomic ledger unit.
- `Time Block` - a scheduled offer or request.
- `Skill Tag` - describes what the time is useful for.
- `Trust Signal` - completed trades, reviews, identity checks, and endorsements.
- `Escrow Hold` - temporary hold on credits before completion.

## Company Thesis

The company should run as software:

- Product strategy is a versioned document.
- Backlog is structured data.
- Agents are defined by role, permissions, inputs, outputs, and limits.
- Decisions are logged.
- Work is resumable.
- Deployments are automated but gated.
- Costs default to zero.

## Autonomy Boundaries

Agents may autonomously:

- Draft plans and specs.
- Implement low-risk code.
- Run tests and linters.
- Create reports.
- Open pull requests.
- Suggest product changes.

Agents need explicit human approval for:

- Production deploys after material schema or payment changes.
- Any paid resource.
- Legal terms that affect real users.
- Deleting user data.
- Messaging real users at scale.


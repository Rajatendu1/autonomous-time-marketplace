import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const paths = {
  backlog: resolve(root, "src/orchestration/backlog.json"),
  registry: resolve(root, "src/orchestration/agent-registry.json"),
  policies: resolve(root, "src/orchestration/policies.json"),
  generated: resolve(root, "docs/generated"),
  handoff: resolve(root, "docs/resume-handoff.md")
};

function byPriority(a, b) {
  return a.priority - b.priority || a.id.localeCompare(b.id);
}

function evaluateRisk(item, policies) {
  for (const rule of policies.riskRules) {
    if (rule.matchCostRisk?.includes(item.costRisk)) {
      return { decision: rule.decision, reason: rule.reason, rule: rule.id };
    }
    if (rule.matchLabels && item.labels?.some((label) => rule.matchLabels.includes(label))) {
      return { decision: rule.decision, reason: rule.reason, rule: rule.id };
    }
  }
  return {
    decision: policies.costPolicy.defaultDecision,
    reason: "No explicit policy allowed this work.",
    rule: "default"
  };
}

function selectWork(backlog, registry, policies) {
  const readyItems = backlog.items
    .filter((item) => ["ready", "in_progress"].includes(item.status))
    .sort(byPriority);

  const agents = new Map(registry.agents.map((agent) => [agent.id, agent]));
  return readyItems.map((item) => {
    const agent = agents.get(item.owner);
    const risk = evaluateRisk(item, policies);
    return {
      ...item,
      agentRole: agent?.role || "Unknown",
      dailyLimit: agent?.dailyLimit || 0,
      decision: risk.decision,
      policyRule: risk.rule,
      policyReason: risk.reason
    };
  });
}

function createIssueDraft(item) {
  return [
    `# ${item.id}: ${item.title}`,
    ``,
    `Owner agent: ${item.owner}`,
    `Layer: ${item.layer}`,
    `Priority: ${item.priority}`,
    `Autonomy decision: ${item.decision}`,
    `Policy rule: ${item.policyRule}`,
    ``,
    `## Acceptance Criteria`,
    ``,
    ...item.acceptance.map((line) => `- ${line}`),
    ``,
    `## Guardrail`,
    ``,
    item.policyReason
  ].join("\n");
}

function createCompanyReport(selected, policies) {
  const now = new Date().toISOString();
  const autonomous = selected.filter((item) => item.decision === "autonomous");
  const gated = selected.filter((item) => item.decision !== "autonomous");
  const next = selected.slice(0, 5);

  return [
    `# Daily Company Report`,
    ``,
    `Generated: ${now}`,
    `Autonomy mode: ${policies.autonomyMode}`,
    `Allowed spend: ${policies.costPolicy.allowedCost}`,
    ``,
    `## Executive Summary`,
    ``,
    `The company loop found ${selected.length} active backlog items. ${autonomous.length} can proceed autonomously and ${gated.length} require review or gating.`,
    ``,
    `## Next Autonomous Work`,
    ``,
    ...(autonomous.length
      ? autonomous.slice(0, 5).map((item) => `- ${item.id}: ${item.title} (${item.owner})`)
      : ["- None"]),
    ``,
    `## Human Approval Queue`,
    ``,
    ...(gated.length
      ? gated.map((item) => `- ${item.id}: ${item.title} - ${item.policyReason}`)
      : ["- Empty"]),
    ``,
    `## Issue Drafts`,
    ``,
    ...next.map(createIssueDraft).join("\n\n---\n\n").split("\n"),
    ``,
    `## Blocked Autonomous Actions`,
    ``,
    ...policies.blockedAutonomousActions.map((action) => `- ${action}`)
  ].join("\n");
}

function updateBacklog(backlog, selected) {
  const selectedById = new Map(selected.map((item) => [item.id, item]));
  return {
    ...backlog,
    lastCompanyRun: new Date().toISOString(),
    items: backlog.items.map((item) => {
      const selectedItem = selectedById.get(item.id);
      if (!selectedItem) return item;
      return {
        ...item,
        autonomyDecision: selectedItem.decision,
        policyRule: selectedItem.policyRule,
        lastEvaluated: new Date().toISOString()
      };
    })
  };
}

async function main() {
  const [backlogRaw, registryRaw, policiesRaw] = await Promise.all([
    readFile(paths.backlog, "utf8"),
    readFile(paths.registry, "utf8"),
    readFile(paths.policies, "utf8")
  ]);
  const backlog = JSON.parse(backlogRaw);
  const registry = JSON.parse(registryRaw);
  const policies = JSON.parse(policiesRaw);
  const selected = selectWork(backlog, registry, policies);
  const report = createCompanyReport(selected, policies);
  const runStamp = new Date().toISOString().replace(/[:.]/g, "-");

  await mkdir(resolve(paths.generated, "company-runs"), { recursive: true });
  await writeFile(resolve(paths.generated, "daily-company-report.md"), report, "utf8");
  await writeFile(resolve(paths.generated, "company-runs", `${runStamp}.md`), report, "utf8");
  await writeFile(paths.backlog, `${JSON.stringify(updateBacklog(backlog, selected), null, 2)}\n`, "utf8");
  console.log(report);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const backlogPath = resolve(root, "src/orchestration/backlog.json");
const registryPath = resolve(root, "src/orchestration/agent-registry.json");
const generatedDir = resolve(root, "docs/generated");
const reportPath = resolve(generatedDir, "autonomy-report.md");
const runLogDir = resolve(generatedDir, "agent-runs");

function sortBacklog(items) {
  return items
    .filter((item) => ["ready", "in_progress"].includes(item.status))
    .sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
}

function groupByOwner(items) {
  return items.reduce((groups, item) => {
    groups[item.owner] ||= [];
    groups[item.owner].push(item);
    return groups;
  }, {});
}

function createReport(backlog, registry) {
  const candidates = sortBacklog(backlog.items);
  const grouped = groupByOwner(candidates);
  const now = new Date().toISOString();
  const agentLines = registry.agents.map((agent) => {
    const assigned = grouped[agent.id] || [];
    const active = assigned.slice(0, agent.dailyLimit);
    return [
      `## ${agent.id}`,
      ``,
      `Role: ${agent.role}`,
      `Daily limit: ${agent.dailyLimit}`,
      `Assigned now: ${active.length ? active.map((item) => item.id).join(", ") : "none"}`,
      `Stop conditions: ${agent.stopConditions.join(", ")}`
    ].join("\n");
  });

  const next = candidates.slice(0, 5).map((item, index) => {
    return `${index + 1}. ${item.id} - ${item.title} (${item.owner}, priority ${item.priority}, cost risk: ${item.costRisk})`;
  });

  return [
    `# Autonomy Report`,
    ``,
    `Generated: ${now}`,
    ``,
    `Cost guardrail: no paid resources requested by current backlog.`,
    ``,
    `## Next Work`,
    ``,
    ...next,
    ``,
    `## Agent Assignments`,
    ``,
    ...agentLines,
    ``,
    `## Resume Note`,
    ``,
    `Future sessions should read docs/resume-handoff.md, then this generated report, then continue the highest-priority ready item.`
  ].join("\n");
}

async function main() {
  const [backlogRaw, registryRaw] = await Promise.all([
    readFile(backlogPath, "utf8"),
    readFile(registryPath, "utf8")
  ]);
  const backlog = JSON.parse(backlogRaw);
  const registry = JSON.parse(registryRaw);
  const report = createReport(backlog, registry);
  const runStamp = new Date().toISOString().replace(/[:.]/g, "-");
  const runLogPath = resolve(runLogDir, `${runStamp}.md`);
  await mkdir(dirname(reportPath), { recursive: true });
  await mkdir(runLogDir, { recursive: true });
  await writeFile(reportPath, report, "utf8");
  await writeFile(runLogPath, report, "utf8");
  console.log(report);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

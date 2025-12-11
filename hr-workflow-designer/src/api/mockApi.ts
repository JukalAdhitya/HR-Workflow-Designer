import type {
  AutomationAction,
  SimulationResult,
  SimulationStep,
  WorkflowEdge,
  WorkflowNode,
} from '../types/workflow';

const AUTOMATIONS: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
];

export async function getAutomations(): Promise<AutomationAction[]> {
  // pretend we called GET /automations
  await new Promise((r) => setTimeout(r, 200));
  return AUTOMATIONS;
}

export async function simulateWorkflow(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
): Promise<SimulationResult> {
  // pretend POST /simulate
  await new Promise((r) => setTimeout(r, 300));

  const issues: string[] = [];

  const startNodes = nodes.filter((n) => n.data.type === 'start');
  const endNodes = nodes.filter((n) => n.data.type === 'end');

  if (startNodes.length === 0) issues.push('No Start node found.');
  if (startNodes.length > 1) issues.push('More than one Start node found.');
  if (endNodes.length === 0) issues.push('No End node found.');

  // simple connectivity check: every non-start node must have an incoming edge
  const nodeIdsWithIncoming = new Set(edges.map((e) => e.target));
  nodes
    .filter((n) => n.data.type !== 'start')
    .forEach((n) => {
      if (!nodeIdsWithIncoming.has(n.id)) {
        issues.push(`Node "${n.data.label}" has no incoming connection.`);
      }
    });

  const steps: SimulationStep[] = nodes.map((node, index): SimulationStep => {
    const status: SimulationStep['status'] = issues.length ? 'error' : 'ok';

    return {
      id: node.id,
      label: node.data.label,
      status,
      message: issues.length
        ? 'Execution blocked by validation issues.'
        : `Step ${index + 1} executed successfully.`,
    };
  });

  return {
    isValid: issues.length === 0,
    issues,
    steps,
  };
}

import type { Edge, Node } from 'reactflow';

export type WorkflowNodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface WorkflowNodeData {
  type: WorkflowNodeType;
  label: string;

  // Start node
  metadata?: { key: string; value: string }[];

  // Task node
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: { key: string; value: string }[];

  // Approval node
  approverRole?: string;
  autoApproveThreshold?: number;

  // Automated node
  actionId?: string;
  params?: Record<string, string>;

  // End node
  endMessage?: string;
  summaryEnabled?: boolean;
}

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationStep {
  id: string;
  label: string;
  status: 'ok' | 'error';
  message: string;
}

export interface SimulationResult {
  isValid: boolean;
  issues: string[];
  steps: SimulationStep[];
}

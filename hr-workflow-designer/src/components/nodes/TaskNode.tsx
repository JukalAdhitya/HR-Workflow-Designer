// src/components/nodes/TaskNode.tsx
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import type { WorkflowNodeData } from '../../types/workflow';

const card: React.CSSProperties = {
  minWidth: 260,
  padding: '12px 16px',
  borderRadius: 16,
  background: '#ffffff',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
  border: '1px solid rgba(59,130,246,0.35)',
};

const badge: React.CSSProperties = {
  display: 'inline-block',
  padding: '2px 10px',
  borderRadius: 999,
  background: 'rgba(59,130,246,0.10)',
  color: '#2563eb',
  fontSize: 11,
  fontWeight: 600,
  marginBottom: 6,
};

const title: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  color: '#0f172a',
};

const metaRow: React.CSSProperties = {
  marginTop: 6,
  fontSize: 12,
  color: '#64748b',
};

export default function TaskNode({ data }: NodeProps<WorkflowNodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: 9,
          height: 9,
          background: '#e5edff',
          border: '2px solid #2563eb',
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 9,
          height: 9,
          background: '#2563eb',
          border: '2px solid #e5edff',
        }}
      />
      <div style={card}>
        <div style={badge}>Task</div>
        <div style={title}>{data.label ?? 'Task'}</div>
        <div style={metaRow}>{data.description ?? 'Human task step'}</div>
        {data.assignee && (
          <div style={metaRow}>
            <strong>Assignee:</strong> {data.assignee}
          </div>
        )}
        {data.dueDate && (
          <div style={metaRow}>
            <strong>Due:</strong> {data.dueDate}
          </div>
        )}
      </div>
    </>
  );
}

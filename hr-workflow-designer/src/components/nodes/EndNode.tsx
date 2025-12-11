// src/components/nodes/EndNode.tsx
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import type { WorkflowNodeData } from '../../types/workflow';

const card: React.CSSProperties = {
  minWidth: 220,
  padding: '12px 16px',
  borderRadius: 16,
  background: '#ffffff',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
  border: '1px solid rgba(248,113,113,0.4)',
};

const badge: React.CSSProperties = {
  display: 'inline-block',
  padding: '2px 10px',
  borderRadius: 999,
  background: 'rgba(248,113,113,0.12)',
  color: '#ef4444',
  fontSize: 11,
  fontWeight: 600,
  marginBottom: 6,
};

const title: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  color: '#0f172a',
};

const subtitle: React.CSSProperties = {
  fontSize: 13,
  color: '#64748b',
};

export default function EndNode({ data }: NodeProps<WorkflowNodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: 9,
          height: 9,
          background: '#fee2e2',
          border: '2px solid #f97373',
        }}
      />
      <div style={card}>
        <div style={badge}>End</div>
        <div style={title}>{data.label ?? 'End'}</div>
        <div style={subtitle}>{data.endMessage ?? 'Workflow completed'}</div>
      </div>
    </>
  );
}

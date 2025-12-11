// src/components/nodes/StartNode.tsx
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import type { WorkflowNodeData } from '../../types/workflow';

const card: React.CSSProperties = {
  minWidth: 220,
  padding: '12px 16px',
  borderRadius: 16,
  background: '#ffffff',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
  border: '1px solid rgba(34,197,94,0.35)',
};

const badge: React.CSSProperties = {
  display: 'inline-block',
  padding: '2px 10px',
  borderRadius: 999,
  background: 'rgba(22,163,74,0.12)',
  color: '#16a34a',
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

export default function StartNode({ data }: NodeProps<WorkflowNodeData>) {
  return (
    <>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 10,
          height: 10,
          background: '#22c55e',
          border: '2px solid #ecfdf3',
        }}
      />
      <div style={card}>
        <div style={badge}>Start</div>
        <div style={title}>{data.label ?? 'Start'}</div>
        <div style={subtitle}>Workflow entry point</div>
      </div>
    </>
  );
}

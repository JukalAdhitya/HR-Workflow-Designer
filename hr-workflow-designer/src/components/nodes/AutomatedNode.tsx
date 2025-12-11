// src/components/nodes/AutomatedNode.tsx
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import type { WorkflowNodeData } from '../../types/workflow';

const card: React.CSSProperties = {
  minWidth: 260,
  padding: '12px 16px',
  borderRadius: 16,
  background: '#ffffff',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
  border: '1px solid rgba(56, 189, 248, 0.35)', // cyan border
};

const badge: React.CSSProperties = {
  display: 'inline-block',
  padding: '2px 10px',
  borderRadius: 999,
  background: 'rgba(56, 189, 248, 0.12)', // soft cyan
  color: '#0284c7',
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

export default function AutomatedNode({ data }: NodeProps<WorkflowNodeData>) {
  return (
    <>
      {/* Incoming */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: 9,
          height: 9,
          background: '#e0f2fe',
          border: '2px solid #38bdf8',
        }}
      />

      {/* Outgoing */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 9,
          height: 9,
          background: '#38bdf8',
          border: '2px solid #e0f2fe',
        }}
      />

      <div style={card}>
        <div style={badge}>Automation</div>
        <div style={title}>{data.label ?? 'Automated step'}</div>

        {data.actionId && (
          <div style={metaRow}>
            <strong>Action:</strong> {data.actionId}
          </div>
        )}
      </div>
    </>
  );
}

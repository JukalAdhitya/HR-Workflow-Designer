// src/components/nodes/ApprovalNode.tsx
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import type { WorkflowNodeData } from '../../types/workflow';

const card: React.CSSProperties = {
  minWidth: 260,
  padding: '12px 16px',
  borderRadius: 16,
  background: '#ffffff',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
  border: '1px solid rgba(168,85,247,0.35)',
};

const badge: React.CSSProperties = {
  display: 'inline-block',
  padding: '2px 10px',
  borderRadius: 999,
  background: 'rgba(168,85,247,0.10)',
  color: '#7e22ce',
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

export default function ApprovalNode({ data }: NodeProps<WorkflowNodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{
          width: 9,
          height: 9,
          background: '#f3e8ff',
          border: '2px solid #a855f7',
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          width: 9,
          height: 9,
          background: '#a855f7',
          border: '2px solid #f3e8ff',
        }}
      />
      <div style={card}>
        <div style={badge}>Approval</div>
        <div style={title}>{data.label ?? 'Approval step'}</div>
        {data.approverRole && (
          <div style={metaRow}>
            <strong>Role:</strong> {data.approverRole}
          </div>
        )}
        {typeof data.autoApproveThreshold === 'number' && (
          <div style={metaRow}>
            <strong>Auto-approve &le;</strong> {data.autoApproveThreshold}
          </div>
        )}
      </div>
    </>
  );
}

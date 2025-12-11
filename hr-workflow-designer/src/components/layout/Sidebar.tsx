import { nodeTypeMime } from '../canvas/WorkflowCanvas';
import type { WorkflowNodeType } from '../../types/workflow';

const NODE_TYPES: { type: WorkflowNodeType; label: string; description: string }[] = [
  { type: 'start', label: 'Start', description: 'Entry point' },
  { type: 'task', label: 'Task', description: 'Human task' },
  { type: 'approval', label: 'Approval', description: 'Manager / HR approval' },
  { type: 'automated', label: 'Automated', description: 'System step' },
  { type: 'end', label: 'End', description: 'Workflow complete' },
];

export interface SidebarProps {
  onAddNodeClick: (type: WorkflowNodeType) => void;
}

export default function Sidebar({ onAddNodeClick }: SidebarProps) {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, type: WorkflowNodeType) => {
    event.dataTransfer.setData(nodeTypeMime, type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">HR Workflow Designer</div>
      <div className="sidebar-section-title">Node Library</div>
      <div className="sidebar-node-list">
        {NODE_TYPES.map((n) => (
          <div
            key={n.type}
            className="sidebar-node-card"
            draggable
            onDragStart={(e) => handleDragStart(e, n.type)}
            onClick={() => onAddNodeClick(n.type)}
          >
            <div className="sidebar-node-label">{n.label}</div>
            <div className="sidebar-node-desc">{n.description}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}

import { useCallback, useState } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  type Connection,
  type EdgeChange,
  type NodeChange,
  type OnConnect,
} from 'reactflow';
import type {
  WorkflowNode,
  WorkflowEdge,
  WorkflowNodeData,
  WorkflowNodeType,
} from '../types/workflow';

interface UseWorkflowReturn {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: OnConnect;
  selectedNode: WorkflowNode | null;
  updateSelectedNodeData: (data: Partial<WorkflowNodeData>) => void;
  selectNodeById: (nodeId: string | null) => void;
  addNodeOfType: (type: WorkflowNodeType, position?: { x: number; y: number }) => void;
  deleteSelectedNode: () => void;
}

let idCounter = 1;
const nextId = () => `${idCounter++}`;

export function useWorkflow(): UseWorkflowReturn {
  const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const selectNodeById = useCallback((nodeId: string | null) => {
    setSelectedNodeId(nodeId);
  }, []);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  const updateSelectedNodeData = (data: Partial<WorkflowNodeData>) => {
    if (!selectedNodeId) return;
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNodeId ? { ...n, data: { ...n.data, ...data } } : n,
      ),
    );
  };

  const addNodeOfType = (
    type: WorkflowNodeType,
    position: { x: number; y: number } = { x: 250, y: 80 },
  ) => {
    const id = nextId();
    const labelMap: Record<WorkflowNodeType, string> = {
      start: 'Start',
      task: 'Task',
      approval: 'Approval',
      automated: 'Automated Step',
      end: 'End',
    };

    const newNode: WorkflowNode = {
      id,
      position,
      data: { type, label: labelMap[type] },
      type,
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const deleteSelectedNode = () => {
    if (!selectedNodeId) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
    setEdges((eds) =>
      eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId),
    );
    setSelectedNodeId(null);
  };

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectedNode,
    updateSelectedNodeData,
    selectNodeById,
    addNodeOfType,
    deleteSelectedNode,
  };
}

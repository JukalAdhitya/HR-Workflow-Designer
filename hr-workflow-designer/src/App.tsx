import { useEffect, useState, useCallback } from 'react';
import type { NodeMouseHandler } from 'reactflow';

import WorkflowCanvas from './components/canvas/WorkflowCanvas';
import Sidebar from './components/layout/Sidebar';
import NodeFormPanel from './components/layout/NodeFormPanel';
import SimulationPanel from './components/testing/SimulationPanel';

import { useWorkflow } from './hooks/useWorkflow';
import { getAutomations, simulateWorkflow } from './api/mockApi';
import type { AutomationAction, SimulationResult } from './types/workflow';

function App() {
  const {
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
  } = useWorkflow();

  const [automations, setAutomations] = useState<AutomationAction[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  useEffect(() => {
    getAutomations().then(setAutomations);
  }, []);

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      selectNodeById(node.id);
    },
    [selectNodeById],
  );

  const handlePaneClick = () => {
    selectNodeById(null);
  };

  const handleDropNode = (type: string, position: { x: number; y: number }) => {
    // type asserted because we only drag our known types
    addNodeOfType(type as any, position);
  };

  const handleRunSimulation = async () => {
    const result = await simulateWorkflow(nodes, edges);
    setSimulationResult(result);
  };

  return (
    <div className="app-shell">
      <Sidebar onAddNodeClick={addNodeOfType} />

      <main className="main-content">
        <div className="top-bar">
          <div className="top-title">User Automation</div>
          <div className="top-subtitle">Overview of HR workflows</div>
        </div>

        <div className="content-grid">
          <WorkflowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            onPaneClick={handlePaneClick}
            onDropNode={handleDropNode}
          />

          <div className="right-column">
            <NodeFormPanel
              selectedNode={selectedNode}
              updateNodeData={updateSelectedNodeData}
              onDeleteNode={deleteSelectedNode}
              automations={automations}
            />
            <SimulationPanel
              nodes={nodes}
              edges={edges}
              result={simulationResult}
              onRun={handleRunSimulation}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

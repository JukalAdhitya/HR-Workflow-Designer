import type { SimulationResult, WorkflowEdge, WorkflowNode } from '../../types/workflow';

interface SimulationPanelProps {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  result: SimulationResult | null;
  onRun: () => void;
}

export default function SimulationPanel({ nodes, edges, result, onRun }: SimulationPanelProps) {
  return (
    <div className="sim-panel">
      <div className="panel-header">
        <div>
          <div className="panel-title">Workflow Sandbox</div>
          <div className="panel-subtitle">
            Nodes: {nodes.length} • Edges: {edges.length}
          </div>
        </div>
        <button className="btn-primary" onClick={onRun}>
          Run simulation
        </button>
      </div>

      {result ? (
        <>
          <div className={`sim-status ${result.isValid ? 'ok' : 'error'}`}>
            {result.isValid ? 'Workflow is valid' : 'Workflow has issues'}
          </div>
          {!result.isValid && (
            <ul className="sim-issues">
              {result.issues.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          )}
          <div className="sim-steps">
            {result.steps.map((s) => (
              <div key={s.id} className="sim-step">
                <div className="sim-step-title">
                  {s.label}{' '}
                  <span className={`sim-chip ${s.status === 'ok' ? 'ok' : 'error'}`}>
                    {s.status.toUpperCase()}
                  </span>
                </div>
                <div className="sim-step-message">{s.message}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="panel-empty">Build a flow and run the simulation.</div>
      )}
    </div>
  );
}

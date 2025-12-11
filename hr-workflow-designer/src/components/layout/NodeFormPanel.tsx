import type { AutomationAction, WorkflowNode, WorkflowNodeData } from '../../types/workflow';

interface NodeFormPanelProps {
  selectedNode: WorkflowNode | null;
  updateNodeData: (data: Partial<WorkflowNodeData>) => void;
  onDeleteNode: () => void;
  automations: AutomationAction[];
}

export default function NodeFormPanel({
  selectedNode,
  updateNodeData,
  onDeleteNode,
  automations,
}: NodeFormPanelProps) {
  if (!selectedNode) {
    return (
      <div className="right-panel">
        <div className="panel-header">Node Details</div>
        <div className="panel-empty">Select a node to configure it.</div>
      </div>
    );
  }

  const { data } = selectedNode;

  const setField = (field: keyof WorkflowNodeData, value: any) => {
    updateNodeData({ [field]: value } as Partial<WorkflowNodeData>);
  };

  // helpers for key-value arrays
  const handleKVChange = (
    field: 'metadata' | 'customFields',
    index: number,
    key: 'key' | 'value',
    value: string,
  ) => {
    const current = (data[field] || []) as { key: string; value: string }[];
    const next = [...current];
    next[index] = { ...next[index], [key]: value };
    updateNodeData({ [field]: next });
  };

  const handleKVAdd = (field: 'metadata' | 'customFields') => {
    const current = (data[field] || []) as { key: string; value: string }[];
    updateNodeData({ [field]: [...current, { key: '', value: '' }] });
  };

  const handleKVRemove = (field: 'metadata' | 'customFields', index: number) => {
    const current = (data[field] || []) as { key: string; value: string }[];
    const next = current.filter((_, i) => i !== index);
    updateNodeData({ [field]: next });
  };

  const selectedAutomation = automations.find((a) => a.id === data.actionId);

  return (
    <div className="right-panel">
      <div className="panel-header">
        <div>
          <div className="panel-title">{data.label}</div>
          <div className="panel-subtitle">{data.type.toUpperCase()} node</div>
        </div>
        <button className="btn-danger" onClick={onDeleteNode}>
          Delete node
        </button>
      </div>

      <div className="panel-section">
        <label className="field-label">Display label</label>
        <input
          className="field-input"
          value={data.label}
          onChange={(e) => setField('label', e.target.value)}
        />
      </div>

      {data.type === 'start' && (
        <>
          <div className="panel-section">
            <label className="field-label">Metadata</label>
            <div className="kv-list">
              {(data.metadata || []).map((row, i) => (
                <div className="kv-row" key={i}>
                  <input
                    className="field-input kv-key"
                    placeholder="Key"
                    value={row.key}
                    onChange={(e) => handleKVChange('metadata', i, 'key', e.target.value)}
                  />
                  <input
                    className="field-input kv-value"
                    placeholder="Value"
                    value={row.value}
                    onChange={(e) => handleKVChange('metadata', i, 'value', e.target.value)}
                  />
                  <button
                    className="btn-ghost"
                    type="button"
                    onClick={() => handleKVRemove('metadata', i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                className="btn-secondary"
                type="button"
                onClick={() => handleKVAdd('metadata')}
              >
                + Add metadata
              </button>
            </div>
          </div>
        </>
      )}

      {data.type === 'task' && (
        <>
          <div className="panel-section">
            <label className="field-label">Description</label>
            <textarea
              className="field-textarea"
              value={data.description || ''}
              onChange={(e) => setField('description', e.target.value)}
            />
          </div>
          <div className="panel-grid">
            <div>
              <label className="field-label">Assignee</label>
              <input
                className="field-input"
                value={data.assignee || ''}
                onChange={(e) => setField('assignee', e.target.value)}
              />
            </div>
            <div>
              <label className="field-label">Due date</label>
              <input
                type="date"
                className="field-input"
                value={data.dueDate || ''}
                onChange={(e) => setField('dueDate', e.target.value)}
              />
            </div>
          </div>

          <div className="panel-section">
            <label className="field-label">Custom fields</label>
            <div className="kv-list">
              {(data.customFields || []).map((row, i) => (
                <div className="kv-row" key={i}>
                  <input
                    className="field-input kv-key"
                    placeholder="Key"
                    value={row.key}
                    onChange={(e) => handleKVChange('customFields', i, 'key', e.target.value)}
                  />
                  <input
                    className="field-input kv-value"
                    placeholder="Value"
                    value={row.value}
                    onChange={(e) => handleKVChange('customFields', i, 'value', e.target.value)}
                  />
                  <button
                    className="btn-ghost"
                    type="button"
                    onClick={() => handleKVRemove('customFields', i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                className="btn-secondary"
                type="button"
                onClick={() => handleKVAdd('customFields')}
              >
                + Add field
              </button>
            </div>
          </div>
        </>
      )}

      {data.type === 'approval' && (
        <>
          <div className="panel-section">
            <label className="field-label">Approver role</label>
            <input
              className="field-input"
              value={data.approverRole || ''}
              onChange={(e) => setField('approverRole', e.target.value)}
            />
          </div>
          <div className="panel-section">
            <label className="field-label">Auto-approve threshold</label>
            <input
              type="number"
              className="field-input"
              value={data.autoApproveThreshold ?? ''}
              onChange={(e) => setField('autoApproveThreshold', Number(e.target.value))}
            />
          </div>
        </>
      )}

      {data.type === 'automated' && (
        <>
          <div className="panel-section">
            <label className="field-label">Action</label>
            <select
              className="field-input"
              value={data.actionId || ''}
              onChange={(e) => {
                const actionId = e.target.value || undefined;
                const auto = automations.find((a) => a.id === actionId);
                const nextParams: Record<string, string> = {};
                (auto?.params || []).forEach((p) => {
                  nextParams[p] = data.params?.[p] || '';
                });
                updateNodeData({ actionId, params: nextParams });
              }}
            >
              <option value="">Select action</option>
              {automations.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
          {selectedAutomation && (
            <div className="panel-section">
              <label className="field-label">Action parameters</label>
              {selectedAutomation.params.map((p) => (
                <div key={p} className="panel-section-inner">
                  <span className="field-label small">{p}</span>
                  <input
                    className="field-input"
                    value={data.params?.[p] || ''}
                    onChange={(e) =>
                      updateNodeData({
                        params: { ...(data.params || {}), [p]: e.target.value },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {data.type === 'end' && (
        <>
          <div className="panel-section">
            <label className="field-label">End message</label>
            <input
              className="field-input"
              value={data.endMessage || ''}
              onChange={(e) => setField('endMessage', e.target.value)}
            />
          </div>
          <div className="panel-section checkbox-row">
            <label className="field-label">Include in summary</label>
            <input
              type="checkbox"
              checked={!!data.summaryEnabled}
              onChange={(e) => setField('summaryEnabled', e.target.checked)}
            />
          </div>
        </>
      )}
    </div>
  );
}

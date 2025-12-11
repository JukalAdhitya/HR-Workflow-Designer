// src/hooks/useSavedWorkflows.ts
import { useCallback, useEffect, useState } from 'react';
import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

const STORAGE_KEY = 'hrwf_saved_workflows_v1';

export interface SavedWorkflow {
  id: string;
  name: string;
  createdAt: string; // ISO
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  // optional metadata
  description?: string;
}

function readFromStorage(): SavedWorkflow[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedWorkflow[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function writeToStorage(items: SavedWorkflow[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useSavedWorkflows() {
  const [saved, setSaved] = useState<SavedWorkflow[]>(() => readFromStorage());

  useEffect(() => {
    // keep state in sync if other tabs change storage
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setSaved(readFromStorage());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const refresh = useCallback(() => setSaved(readFromStorage()), []);

  const save = useCallback(
    (name: string, nodes: WorkflowNode[], edges: WorkflowEdge[], description?: string) => {
      const items = readFromStorage();
      const id = `${Date.now()}`; // simple id
      const newItem: SavedWorkflow = {
        id,
        name,
        createdAt: new Date().toISOString(),
        nodes,
        edges,
        description,
      };
      const next = [newItem, ...items];
      writeToStorage(next);
      setSaved(next);
      return newItem;
    },
    []
  );

  const overwrite = useCallback(
    (id: string, name: string, nodes: WorkflowNode[], edges: WorkflowEdge[], description?: string) => {
      const items = readFromStorage();
      const next = items.map((it) =>
        it.id === id ? { ...it, name, nodes, edges, description, createdAt: new Date().toISOString() } : it
      );
      writeToStorage(next);
      setSaved(next);
      return next.find((i) => i.id === id) ?? null;
    },
    []
  );

  const remove = useCallback((id: string) => {
    const items = readFromStorage();
    const next = items.filter((it) => it.id !== id);
    writeToStorage(next);
    setSaved(next);
  }, []);

  const load = useCallback((id: string) => {
    const items = readFromStorage();
    return items.find((it) => it.id === id) ?? null;
  }, []);

  return {
    saved,
    refresh,
    save,
    overwrite,
    remove,
    load,
  };
}

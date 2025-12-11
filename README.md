
# 🧠 HR Workflow Designer

A visual HR workflow building and simulation tool. This application enables HR teams to design, configure, validate, and simulate workflows such as onboarding, approval cycles, and document verification processes.

## 📂 Project Overview

HR Workflow Designer includes:

- Drag-and-drop workflow creation
- Custom HR-specific workflow node types
- Editable node configuration panel
- Workflow validation engine
- Simulation panel with execution logs
- Modular, scalable architecture with TypeScript + React Flow

## 📁 Project Structure
```bash
src/
  main.tsx
  App.tsx                   # Main layout, orchestrates canvas + forms + simulation

  types/
    workflow.ts             # TypeScript interfaces for nodes, edges, automation actions, simulation

  api/
    mockApi.ts              # Local mock API: GET /automations & POST /simulate

  hooks/
    useWorkflow.ts          # Core workflow state manager (nodes, edges, selection, add/delete)

  components/
    canvas/
      WorkflowCanvas.tsx    # React Flow canvas with custom node types + interactions

    layout/
      Sidebar.tsx           # Node palette (Start, Task, Approval, Automated, End)
      NodeFormPanel.tsx     # Right-side dynamic configuration panel
      SimulationPanel.tsx   # Shows workflow simulation output

    nodes/
      StartNode.tsx
      TaskNode.tsx
      ApprovalNode.tsx
      AutomatedNode.tsx
      EndNode.tsx
```


## 🧱 Features

### ✔️ Workflow Canvas

- Drag-and-drop nodes onto the canvas
- Connect nodes visually
- Delete nodes & edges
- Auto-validation for:
  - Exactly one Start node
  - At least one End node
  - Every node (except Start) must have an incoming edge

### ✔️ Node Types

Start Node - Entry point of workflow  
Task Node - Human task requiring action  
Approval Node - Manager or HR approval  
Automated Step Node - System-triggered actions  
End Node - Workflow completion  

## 📝 Node Configuration

Each node exposes configurable attributes such as:

- Title
- Description
- Assignee
- Approver role
- Due date
- Automation action (with dynamic parameters)
- Metadata fields
- Summary display toggle

## ⚙️ Mock API

### GET /automations

```json
[
  { "id": "send_email", "label": "Send Email", "params": ["to", "subject"] },
  { "id": "generate_doc", "label": "Generate Document", "params": ["template", "recipient"] }
]
```


### POST /simulate

Accepts workflow graph JSON and returns:

- Validation status
- Structural issues
- Step-by-step execution messages

## 🚀 Installation

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Access the application at:

```bash
http://localhost:5173
```

## 🧪 Testing

### Test GET /automations (Browser Console)

```bash
import { getAutomations } from './src/api/mockApi'
getAutomations().then(console.log)
```

### Workflow Simulation

Create:

Start → Task → End

Click Run Simulation to view:

- Validation output
- Simulation log

## 🎯 Project Objective

Enable HR administrators to:

- Construct workflows visually
- Configure workflow steps
- Validate workflow structure
- Simulate workflow execution

## 📌 Functional Requirements

1. Workflow Canvas
2. Node Types & Required Fields
3. Mock API for automations & simulation
4. Simulation Panel
5. Modular architecture, custom hooks, TypeScript

## 📝 Working

<img width="1919" height="872" alt="image" src="https://github.com/user-attachments/assets/b04586f2-a48c-4142-9c6b-cf9f9d29df1d" />


## ⭐ Future Enhancements

- Undo/Redo
- Workflow JSON import/export
- Auto-layout (Dagre)
- Node validation highlighting
- Mini-map + zoom
- Version history
- Real backend persistence



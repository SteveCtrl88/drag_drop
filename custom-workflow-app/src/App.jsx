import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import CustomNode from './CustomNode.jsx';
import Sidebar from './Sidebar.jsx';

/**
 * App defines the main layout for the prototype.  It sets up the React Flow
 * canvas, handles drag‑and‑drop from the sidebar and registers custom node
 * types.  When a user drops a node onto the canvas, we create a new node
 * with default properties.  Each node includes a callback to update its
 * internal data, enabling in‑node editing (colour, label, field names and
 * drop‑down values).
 */
export default function App() {
  // Maintain nodes and edges using React Flow helper hooks.
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Counter for node IDs.
  const idRef = useRef(0);
  const getId = () => `node_${idRef.current++}`;

  // Callback used by CustomNode to update its data in the nodes state.
  const updateNodeData = useCallback((id, updatedData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...updatedData } } : node
      )
    );
  }, [setNodes]);

  // Handle creation of new edges when connecting nodes.
  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, [setEdges]);

  /**
   * Called when a palette item starts being dragged.  We attach custom
   * metadata to the event so we can read it on drop.  The `application/reactflow`
   * mime type is used to distinguish our drag data from other drags.
   */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  /**
   * Prevent default so dropping is allowed.  We set dropEffect to "move" to
   * indicate that a new object will be created.
   */
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  /**
   * When dropping, read the node type from the drag data and create a new
   * node at the drop position.  We use the React Flow instance to convert
   * screen coordinates to flow coordinates (screenToFlowPosition).
   */
  const onDrop = (event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/reactflow');
    // If no valid type is found, we abort the drop.
    if (!nodeType) return;
    // Compute position using React Flow's helper.
    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    // Default data for a new custom node.
    const newNode = {
      id: getId(),
      type: nodeType,
      position,
      data: {
        label: 'Custom node',
        color: '#f5f5f5',
        fieldName: 'Field',
        dropdownValue: 'Option 1',
        updateNodeData,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // Register our custom node type with React Flow.  Additional types can
  // be added to this object as we implement them.
  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar onDragStart={onDragStart} />
      <div
        className="reactflow-wrapper"
        style={{ flexGrow: 1 }}
        ref={reactFlowWrapper}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap
              nodeColor={(n) => n.data.color || '#eee'}
              nodeBorderRadius={2}
            />
            <Controls />
            <Background color="#f0f0f0" variant="dots" gap={16} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
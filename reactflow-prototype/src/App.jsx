import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import CustomNode from './CustomNode.jsx';
import Sidebar from './Sidebar.jsx';

/**
 * The Flow component encapsulates the React Flow canvas and all
 * associated state.  Users can drag items from the sidebar onto the
 * canvas to create new nodes.  Each node exposes inputs to edit its
 * label, colour and dimensions.  Edges can be created by dragging
 * between the small connection handles.  Clicking an edge removes it.
 */
function Flow() {
  // React Flow manages nodes and edges via these helper hooks.  We also
  // handle incremental IDs so each node gets a unique identifier.
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const idRef = useRef(0);
  const getId = () => `node_${idRef.current++}`;

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  /**
   * updateNodeData is passed down to every custom node via its data
   * prop.  When a node property changes, this callback updates the
   * corresponding node in state.  In addition to updating the data
   * object, we synchronise the node's style so width/height and
   * background colour changes are reflected visually.
   */
  const updateNodeData = useCallback((id, updatedData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== id) return node;
        // Merge new data with existing data
        const newData = { ...node.data, ...updatedData };
        // Determine new style properties based on updated data or fall back to existing
        const width = updatedData.width ?? node.data.width;
        const height = updatedData.height ?? node.data.height;
        const color = updatedData.color ?? node.data.color;
        return {
          ...node,
          data: newData,
          style: {
            ...node.style,
            width,
            height,
            backgroundColor: color,
          },
        };
      }),
    );
  }, [setNodes]);

  // Called when a new connection is made between two handles.  We use
  // the addEdge helper to maintain React Flow's internal structure.
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  // Remove an edge when clicked.  Stop propagation so the canvas
  // doesn't interpret the click as a deselect event.
  const onEdgeClick = useCallback(
    (event, edge) => {
      event.stopPropagation();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges],
  );

  /**
   * When the user drops something onto the canvas we create a new node
   * at that location.  The type of node (currently only 'custom') is
   * encoded in the drag data.  We use the instance's project helper
   * to convert page coordinates into the React Flow's coordinate space.
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      // Guard against unknown types or uninitialised instance
      if (!type || !reactFlowInstance) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      // Determine drop position relative to the flow wrapper
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
      const defaultWidth = 180;
      const defaultHeight = 100;
      const defaultColor = '#f5f5f5';
      const id = getId();
      const newNode = {
        id,
        type,
        position,
        data: {
          label: 'New node',
          color: defaultColor,
          width: defaultWidth,
          height: defaultHeight,
          updateNodeData,
        },
        style: {
          width: defaultWidth,
          height: defaultHeight,
          backgroundColor: defaultColor,
          border: '1px solid #999',
          borderRadius: 4,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, updateNodeData],
  );

  /**
   * Enable dropping by preventing the default dragover behaviour.  Without
   * this React Flow will not allow drop events.
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Define custom node types; this maps the type string set on each
  // node to the corresponding React component.  More types can be added
  // easily in the future.
  const nodeTypes = {
    custom: CustomNode,
  };

  return (
    <div className="reactflow-wrapper">
      <Sidebar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <MiniMap style={{ backgroundColor: '#f0f0f0' }} nodeStrokeColor={(n) => n.data.color || '#555'} />
        <Controls />
        <Background color="#aaaaaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

/**
 * App wraps Flow in a ReactFlowProvider, which supplies context needed
 * by nested components such as handles.  Without this provider,
 * React Flow will not function correctly.
 */
export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

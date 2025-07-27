import React from 'react';

/**
 * Sidebar renders a palette of node types that can be dragged onto the
 * canvas.  For now we expose only a single custom node type, but this
 * component can be extended to include additional node categories.
 */
export default function Sidebar({ onDragStart }) {
  return (
    <aside
      style={{
        width: 180,
        padding: 10,
        borderRight: '1px solid #ddd',
        background: '#f9f9f9',
      }}
    >
      <h4 style={{ marginTop: 0 }}>Palette</h4>
      <div
        onDragStart={(event) => onDragStart(event, 'custom')}
        draggable
        style={{
          padding: 10,
          marginBottom: 8,
          border: '1px solid #aaa',
          borderRadius: 4,
          backgroundColor: '#fff',
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        Custom Node
      </div>
    </aside>
  );
}
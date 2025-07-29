import React from 'react';

/**
 * Sidebar presents a simple palette of draggable node types.  For now
 * there is only one entry, but additional entries can easily be
 * added.  When a drag begins we stamp the type onto the drag data
 * under the `application/reactflow` MIME type.  React Flow's canvas
 * listens for this data on drop.
 */
export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Palette</h3>
      <div
        className="sidebar-item"
        onDragStart={(event) => onDragStart(event, 'custom')}
        draggable
      >
        Custom Node
      </div>
    </aside>
  );
}

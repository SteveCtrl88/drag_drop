import React from 'react';
import { Handle } from '@xyflow/react';

/**
 * CustomNode renders a simple form inside each node.  The form allows
 * users to edit the node's label, colour and dimensions.  When a
 * property changes we delegate the update back up to the parent via
 * the updateNodeData callback.  Two handles (target and source) are
 * provided to enable connecting nodes.  Styling is controlled by
 * the surrounding React Flow layer based on the node's style prop.
 */
export default function CustomNode({ id, data }) {
  const { label, color, width, height, updateNodeData } = data;

  // Helper factory to update a specific key.  Width and height
  // values must be coerced to numbers so we cast appropriately.
  const handleChange = (key) => (event) => {
    const value = key === 'width' || key === 'height' ? Number(event.target.value) : event.target.value;
    updateNodeData(id, { [key]: value });
  };

  return (
    <div className="custom-node">
      {/* Top handle for incoming connections */}
      <Handle type="target" position="top" />
      {/* Form fields to edit node properties */}
      <div className="node-form">
        <div className="form-row">
          <label className="form-label">Name:</label>
          <input className="form-input" type="text" value={label} onChange={handleChange('label')} />
        </div>
        <div className="form-row">
          <label className="form-label">Colour:</label>
          <input className="form-input" type="color" value={color} onChange={handleChange('color')} />
        </div>
        <div className="form-row">
          <label className="form-label">Width:</label>
          <input
            className="form-input"
            type="number"
            min="80"
            max="400"
            step="10"
            value={width}
            onChange={handleChange('width')}
          />
        </div>
        <div className="form-row">
          <label className="form-label">Height:</label>
          <input
            className="form-input"
            type="number"
            min="60"
            max="300"
            step="10"
            value={height}
            onChange={handleChange('height')}
          />
        </div>
      </div>
      {/* Bottom handle for outgoing connections */}
      <Handle type="source" position="bottom" />
    </div>
  );
}

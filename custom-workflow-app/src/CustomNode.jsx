import React from 'react';
import { Handle } from '@xyflow/react';

/**
 * CustomNode renders a configurable node for our workflow builder.
 * Users can change the node colour, label, rename a field and choose
 * an option from a drop‑down.  Changes are propagated back to the
 * parent via the updateNodeData callback passed in the node's data.
 */
export default function CustomNode({ id, data, selected }) {
  const { label, color, fieldName, dropdownValue, updateNodeData } = data;

  // Helper to update a single property on this node's data.
  const handleChange = (key) => (event) => {
    const value = event.target.value;
    updateNodeData(id, { [key]: value });
  };

  return (
    <div
      style={{
        backgroundColor: color,
        border: selected ? '2px solid #1a91ff' : '1px solid #888',
        borderRadius: 4,
        padding: 10,
        minWidth: 180,
        boxSizing: 'border-box',
      }}
      className="custom-node"
    >
      {/* Handles for connections */}
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />

      <div style={{ marginBottom: 6 }}>
        <label style={{ fontSize: 12, color: '#444' }}>Label:</label>
        <input
          type="text"
          value={label}
          onChange={handleChange('label')}
          style={{ width: '100%', fontSize: 12, padding: 2, marginTop: 2 }}
        />
      </div>

      <div style={{ marginBottom: 6 }}>
        <label style={{ fontSize: 12, color: '#444' }}>Colour:</label>
        <input
          type="color"
          value={color}
          onChange={handleChange('color')}
          style={{ width: '100%', height: 25, padding: 0, marginTop: 2 }}
        />
      </div>

      <div style={{ marginBottom: 6 }}>
        <label style={{ fontSize: 12, color: '#444' }}>Field name:</label>
        <input
          type="text"
          value={fieldName}
          onChange={handleChange('fieldName')}
          style={{ width: '100%', fontSize: 12, padding: 2, marginTop: 2 }}
        />
      </div>

      <div>
        <label style={{ fontSize: 12, color: '#444' }}>Drop‑down:</label>
        <select
          value={dropdownValue}
          onChange={handleChange('dropdownValue')}
          style={{ width: '100%', fontSize: 12, padding: 2, marginTop: 2 }}
        >
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
      </div>
    </div>
  );
}
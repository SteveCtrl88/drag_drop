import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Entry point for the React Flow prototype.  We mount our App component
// into the root div defined in index.html.  React 18's createRoot API is
// used to enable concurrent rendering.

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

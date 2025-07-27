import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// The entry point for the prototype.  It uses React 18's createRoot API to
// render the App component into the root DOM element.  Vite inserts a
// <div id="root"></div> placeholder into index.html automatically.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

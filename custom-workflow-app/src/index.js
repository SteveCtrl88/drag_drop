import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Entry point: Render the App component without JSX
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  React.createElement(App)
);

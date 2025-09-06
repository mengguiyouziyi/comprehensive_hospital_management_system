import React from 'react';
import ReactDOM from 'react-dom/client'; // 使用新的React 18 API
import './index.css';
import App from './App';

// 使用React 18的新API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import { BrowserRouter as Router, Routes, Route, UNSAFE_RouteContext } from 'react-router-dom';
import './App.css';
import routes from './routes';

function App() {
  return (
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <div className="App">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
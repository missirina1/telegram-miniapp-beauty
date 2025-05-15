import './App.css';
import React from 'react';
import AppRouter from './router';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppRouter />
    </div>
  );
}

export default App;

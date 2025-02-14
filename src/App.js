import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PreprocessingPage from './pages/PreprocessingPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preprocessing" element={<PreprocessingPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;

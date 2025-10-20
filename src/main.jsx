import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App.jsx';
import AllNumbers from './pages/AllNumbers.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/all">All Numbers</Link>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all" element={<AllNumbers />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
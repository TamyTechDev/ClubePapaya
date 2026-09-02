import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AdminPost from './pages/AdminPost';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-secret-papaya" element={<AdminPost />} />
      <Route path="/artigo/:id" element={<ArticlePage />} />
    </Routes>
  );
}

export default App;
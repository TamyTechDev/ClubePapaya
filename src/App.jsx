import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AdminPost from './pages/AdminPost';
import ArticlePage from './pages/ArticlePage';
import Convidados from './Convidados';
import Sobre from './pages/Sobre';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-secret-papaya" element={<AdminPost />} />
      <Route path="/artigo/:id" element={<ArticlePage />} />
      <Route path="/Sobre" element={<Sobre />} />
      <Route path="/Convidados" element={<Convidados/>} />
    </Routes>
  );
}

export default App;
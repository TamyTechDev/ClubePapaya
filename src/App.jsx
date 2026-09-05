import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AdminPost from './pages/AdminPost';
import ArticlePage from './pages/ArticlePage';
import Convidados from './pages/Convidados'; // Ajustado para a pasta pages
import Sobre from './pages/Sobre';
import CategoriaPage from './pages/CategoriaPage'; // Importado da pasta pages

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-secret-papaya" element={<AdminPost />} />
      <Route path="/artigo/:id" element={<ArticlePage />} />
      <Route path="/Sobre" element={<Sobre />} />
      <Route path="/Convidados" element={<Convidados />} />
      
      {/* Rota dinâmica para as categorias da Navbar */}
      <Route path="/categoria/:nome" element={<CategoriaPage />} />
    </Routes>
  );
}

export default App;
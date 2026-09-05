import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import Convidados from './pages/Convidados';
import Sobre from './pages/Sobre';
import CategoriaPage from './pages/CategoriaPage';
import TimeLine from './pages/TimeLine';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-secret-papaya" />
      <Route path="/artigo/:id" element={<ArticlePage />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/convidados" element={<Convidados />} />
      <Route path="/timeline" element={<TimeLine />} />
      
      {/* Rota dinâmica para as categorias da Navbar */}
      <Route path="/categoria/:nome" element={<CategoriaPage />} />
    </Routes>
  );
}

export default App;
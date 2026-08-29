import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ArticlePage from './pages/ArticlePage';
import MaintenancePage from './pages/MaintenancePage';



export default function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<MaintenancePage/>} />
      
      

      
      
      
     
    </Routes>
  );
}
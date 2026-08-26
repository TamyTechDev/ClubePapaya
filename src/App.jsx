import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import Bazar from './pages/Bazar';
import TimeLine from './pages/TimeLine';
import Empreendedorismo from './pages/Empreendedorismo';
import Login from './pages/Login';
import ProtectedRoute from "./pages/ProtectedRoute";
import Bemvindo from './pages/Bemvindo';

export default function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Bemvindo />} />
      <Route path="/empreendedorismo" element={<Empreendedorismo />} />
      <Route path="/login" element={<Login />} />

      {/* Rotas Protegidas */}
      <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
      <Route path="/timeline" element={<ProtectedRoute><TimeLine /></ProtectedRoute>} />
      <Route path="/bazar" element={<ProtectedRoute><Bazar /></ProtectedRoute>} />
    </Routes>
  );
}
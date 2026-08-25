import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Navbar';
import Feed from './pages/Feed';
import Bazar from './pages/Bazar';
import TimeLine from './pages/TimeLine';
import Empreendedorismo from './pages/Empreendedorismo';
import Login from './pages/Login';
import ProtectedRoute from "./pages/ProtectedRoute";
import Bemvindo from './pages/Bemvindo';
// Veja se a importação aponta exatamente para o seu arquivo ajustado:
import { supabase } from './supabaseClient';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/empreendedorismo" element={<Empreendedorismo />} />
          <Route path="/" element={<Bemvindo />} />
           <Route path="/Feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas Protegidas (exigem login) */}
          <Route 
            path="/timeline" 
            element={
              <ProtectedRoute>
                <TimeLine />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bazar" 
            element={
              <ProtectedRoute>
                <Bazar />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
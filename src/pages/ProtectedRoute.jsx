import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ajuste o caminho da pasta se necessário

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // 1. Enquanto o Supabase verifica se há sessão ativa, não redireciona nada
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <p>Carregando...</p>
      </div>
    );
  }

  // 2. Se a verificação terminou e NÃO há usuário, manda para a Home / Login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 3. Se estiver logado, libera o acesso à rota (ex: /feed, /bazar, /timeline)
  return children;
}
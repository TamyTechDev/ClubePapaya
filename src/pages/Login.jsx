import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [isCadastrando, setIsCadastrando] = useState(false);
  const [nome, setNome] = useState('');
  const [filho, setFilho] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: nome || 'Usuária',
      childName: filho || 'Bebê',
      email: email
    };
    
    login(userData);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>{isCadastrando ? 'Criar Conta' : 'Entrar no Clube'}</h2>
      
      <form onSubmit={handleSubmit} className="auth-form">
        {isCadastrando && (
          <>
            <input 
              type="text" 
              placeholder="Seu nome" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              placeholder="Nome do seu bebê" 
              value={filho} 
              onChange={(e) => setFilho(e.target.value)} 
            />
          </>
        )}

        <input 
          type="email" 
          placeholder="Seu e-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Sua senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required 
        />

        <button type="submit" className="btn-auth-submit">
          {isCadastrando ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>

      <p className="auth-switch-text">
        {isCadastrando ? 'Já tem uma conta? ' : 'Ainda não tem conta? '}
        <button 
          onClick={() => setIsCadastrando(!isCadastrando)} 
          className="btn-auth-switch"
        >
          {isCadastrando ? 'Entrar' : 'Cadastre-se'}
        </button>
      </p>
    </div>
  );
}
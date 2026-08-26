import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import './Login.css';

export default function Login() {
  const [isCadastrando, setIsCadastrando] = useState(false);
  const [nome, setNome] = useState('');
  const [filho, setFilho] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [carregando, setCarregando] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: '', texto: '' });

    if (isCadastrando) {
      const temOitoCaracteres = senha.length >= 8;
      const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

      if (!temOitoCaracteres || !temCaractereEspecial) {
        setMensagem({
          tipo: 'erro',
          texto: 'A senha deve ter pelo menos 8 caracteres e no mínimo 1 caractere especial (ex: @, #, $, !).'
        });
        return;
      }
    }

    setCarregando(true);

    try {
      if (isCadastrando) {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password: senha,
          options: {
            data: {
              full_name: nome,
              nome_mae: nome,
              nome_bebe: filho
            }
          }
        });

        if (authError) throw authError;

        const { error: dbError } = await supabase
          .from('cadastro')
          .insert([{ nome, email, mensagem: filho }]);

        if (dbError) {
          console.error('Erro ao salvar na tabela cadastro:', dbError.message);
        }

        await signIn(email, senha);
        setSenha('');
        navigate('/feed'); // Corrigido para minúsculo
      } else {
        await signIn(email, senha);
        setSenha('');
        navigate('/feed'); // Corrigido para minúsculo
      }
    } catch (error) {
      setMensagem({
        tipo: 'erro',
        texto: error.message || 'Ocorreu um erro ao processar. Tente novamente.'
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isCadastrando ? 'Criar Conta' : 'Entrar no Clube'}</h2>

      {mensagem.texto && (
        <p style={{
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '10px',
          backgroundColor: mensagem.tipo === 'erro' ? '#ffe6e6' : '#e6ffe6',
          color: mensagem.tipo === 'erro' ? 'red' : 'green',
          fontSize: '14px'
        }}>
          {mensagem.texto}
        </p>
      )}

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

        <button type="submit" className="btn-auth-submit" disabled={carregando}>
          {carregando ? 'Aguarde...' : (isCadastrando ? 'Cadastrar' : 'Entrar')}
        </button>
      </form>

      <p className="auth-switch-text">
        {isCadastrando ? 'Já tem uma conta? ' : 'Ainda não tem conta? '}
        <button 
          onClick={() => {
            setIsCadastrando(!isCadastrando);
            setMensagem({ tipo: '', texto: '' });
          }} 
          className="btn-auth-switch"
          type="button"
        >
          {isCadastrando ? 'Entrar' : 'Cadastre-se'}
        </button>
      </p>
    </div>
  );
}
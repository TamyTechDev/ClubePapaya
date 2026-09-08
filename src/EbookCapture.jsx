import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './EbookCapture.css';

// Inicialize o Supabase com suas credenciais
const supabaseUrl = 'SUA_URL_DO_SUPABASE';
const supabaseKey = 'sua-chave-anon-public';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EbookCapture() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleCapture = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!email || !email.includes('@')) {
      setMessage('Por favor, insira um e-mail válido.');
      setLoading(false);
      return;
    }

    try {
      // 1. Salvar o e-mail no Supabase
      const { error } = await supabase
        .from('leads')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          setMessage('Este e-mail já está cadastrado! Aproveite seu material.');
        } else {
          throw error;
        }
      } else {
        setMessage('Cadastro realizado com sucesso!');
      }

      // 2. Liberar o link direto do Cloudinary
      setPdfUrl('SUA_URL_SEGURE_DO_CLOUDINARY_AQUI');
    } catch (err) {
      console.error(err);
      setMessage('Ocorreu um erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="capture-container">
      <div className="capture-card">
        <h2>Baixe seu E-book Gratuito</h2>
        <p>Preencha seu e-mail abaixo para receber o material completo instantaneamente.</p>
        
        {!pdfUrl ? (
          <form onSubmit={handleCapture} className="capture-form">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Quero meu E-book'}
            </button>
          </form>
        ) : (
          <div className="success-box">
            <p>Tudo pronto! Clique no botão abaixo para baixar o seu e-book:</p>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="download-btn">
              Baixar E-book em PDF
            </a>
          </div>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
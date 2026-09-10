import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zscxlfjzwfqiwquqjurq.supabase.co';
const supabaseKey = 'sb_publishable_KdD41evoWP61t1ZsOE7wwA_rq7rIs4B';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EbookModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  if (!isOpen) return null;

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
      const { data, error } = await supabase
        .from('leads')
        .insert([{ email }])
        .select();

      if (error) {
        // Se o erro for de duplicidade (unique violation), consideramos sucesso para liberar o e-book
        if (error.code === '23505') {
          setMessage('E-mail já cadastrado! Aproveite seu material.');
        } else {
          console.error('Erro detalhado do Supabase:', error);
          throw new Error(error.message || 'Erro ao salvar no banco');
        }
      } else {
        setMessage('E-mail cadastrado com sucesso!');
      }

      setPdfUrl('https://res.cloudinary.com/dpynm0sf/image/upload/v1788891097/Renda_Extra_para_M%C3%A3es_Guia_Pr%C3%A1tico_para_Ganhar_Dinheiro_em_Casa_com_Flexibilidade.pdf');
    } catch (err) {
      console.error('Catch error:', err);
      setMessage('Ocorreu um erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={onClose} style={closeBtnStyle}>&times;</button>
        
        <h2 style={{ color: '#333', marginBottom: '10px', fontSize: '20px' }}>Baixe seu E-book Gratuito</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Preencha seu e-mail abaixo para receber o Manual da Mãe Real instantaneamente:
        </p>

        {!pdfUrl ? (
          <form onSubmit={handleCapture} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            <button 
              type="submit" 
              disabled={loading}
              style={{
                padding: '12px',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Salvando...' : 'Quero meu E-book'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#28a745', fontWeight: 'bold', marginBottom: '15px' }}>Tudo pronto! Material liberado:</p>
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                display: 'block',
                background: '#28a745',
                color: '#fff',
                padding: '12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              📥 Baixar E-book em PDF
            </a>
          </div>
        )}

        {message && <p style={{ fontSize: '13px', color: '#444', marginTop: '15px' }}>{message}</p>}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '12px',
  width: '90%',
  maxWidth: '400px',
  position: 'relative',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  boxSizing: 'border-box',
};

const closeBtnStyle = {
  position: 'absolute',
  top: '12px',
  right: '15px',
  background: 'transparent',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#888',
};
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../supabaseClient';
import './AdminPost.css';

// Função utilitária para transformar o título em URL amigável
function criarSlug(texto) {
  return texto
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function AdminPost() {
  const [id, setId] = useState(null); // Guarda o ID se estiver editando
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Bebês');
  const [imagem, setImagem] = useState('');
  const [conteudo, setConteudo] = useState('');
  
  const [artigosExistentes, setArtigosExistentes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  // Buscar lista de artigos ao carregar a página
  useEffect(() => {
    carregarArtigos();
  }, []);

  const carregarArtigos = async () => {
    const { data, error } = await supabase
      .from('artigos')
      .select('id, titulo, created_at')
      .order('created_at', { ascending: false });

    if (!error) {
      setArtigosExistentes(data || []);
    }
  };

  // Selecionar um artigo para edição
  const handleSelecionarArtigo = (artigo) => {
    setLoading(true);
    setMensagem('');
    
    // Busca os dados completos daquele artigo específico
    supabase
      .from('artigos')
      .select('*')
      .eq('id', artigo.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          setMensagem('Erro ao carregar dados do artigo.');
        } else {
          setId(data.id);
          setTitulo(data.titulo);
          setCategoria(data.categoria);
          setImagem(data.imagem || '');
          setConteudo(data.conteudo);
        }
        setLoading(false);
      });
  };

  // Limpar formulário para criar um novo
  const handleNovoArtigo = () => {
    setId(null);
    setTitulo('');
    setCategoria('Bebês');
    setImagem('');
    setConteudo('');
    setMensagem('');
  };

  // Salvar (Criar ou Atualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    // Gera o slug automaticamente com base no título preenchido
    const slugGerado = criarSlug(titulo);

    const dadosArtigo = {
      titulo,
      slug: slugGerado, // Aqui entra a URL amigável para o Supabase
      categoria,
      imagem: imagem || 'https://via.placeholder.com/600x400',
      conteudo,
      autor: 'Clube Papaya'
    };

    let error;

    if (id) {
      // ATUALIZAR (UPDATE)
      const res = await supabase
        .from('artigos')
        .update(dadosArtigo)
        .eq('id', id);
      error = res.error;
    } else {
      // CRIAR NOVO (INSERT)
      const res = await supabase
        .from('artigos')
        .insert([dadosArtigo]);
      error = res.error;
    }

    if (error) {
      setMensagem(`Erro ao salvar: ${error.message}`);
    } else {
      setMensagem(id ? '🎉 Artigo atualizado com sucesso!' : '🎉 Artigo publicado com sucesso!');
      carregarArtigos(); // Atualiza a lista lateral
      if (!id) handleNovoArtigo(); // Limpa se foi criação nova
    }
    setLoading(false);
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', gap: '30px', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Coluna Lateral: Lista de Artigos Existentes */}
      <div className="admin-sidebar" style={{ width: '350px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3>Gerenciar Artigos</h3>
        <button 
          onClick={handleNovoArtigo} 
          style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '15px', fontWeight: 'bold' }}
        >
          + Criar Novo Artigo
        </button>
        
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {artigosExistentes.map((art) => (
            <div 
              key={art.id} 
              onClick={() => handleSelecionarArtigo(art)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                background: id === art.id ? '#007bff' : '#fff',
                color: id === art.id ? '#fff' : '#333',
                borderRadius: '4px',
                cursor: 'pointer',
                border: '1px solid #ccc',
                fontSize: '14px',
                transition: '0.2s'
              }}
            >
              <strong>{art.titulo}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Coluna Principal: Formulário */}
      <div className="admin-container" style={{ flex: 1 }}>
        <h2>{id ? '✏️ Editando Artigo' : '📝 Painel de Publicação - Clube Papaya'}</h2>
        {mensagem && <p className="status-msg" style={{ padding: '10px', background: '#e2f0d9', color: '#385723', borderRadius: '4px' }}>{mensagem}</p>}

        <form onSubmit={handleSubmit} className="admin-form">
          <label>Título da Matéria:</label>
          <input 
            type="text" 
            required 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            placeholder="Ex: Guia Completo do Sono do Bebê"
          />

          <div className="form-row" style={{ display: 'flex', gap: '15px', margin: '15px 0' }}>
            <div style={{ flex: 1 }}>
              <label>Categoria:</label>
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)} style={{ width: '100%', padding: '8px' }}>
                <option value="Bebês">Bebês</option>
                <option value="Maternidade">Maternidade</option>
                <option value="Mãe">Mãe</option>
                <option value="Empreendedorismo">Empreendedorismo</option>
                <option value="Autocuidado">Autocuidado</option>
                <option value="Lazer">Lazer</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label>URL da Imagem de Capa:</label>
              <input 
                type="text" 
                value={imagem} 
                onChange={(e) => setImagem(e.target.value)} 
                placeholder="https://sua-imagem.com/link.jpg"
              />
            </div>
          </div>

          <label>Conteúdo da Matéria:</label>
          <div style={{ marginBottom: '20px' }}>
            <ReactQuill 
              theme="snow" 
              value={conteudo} 
              onChange={setConteudo} 
              placeholder="Escreva seu artigo aqui..."
            />
          </div>

          <button type="submit" disabled={loading} className="btn-publicar" style={{ padding: '12px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
            {loading ? 'Salvando...' : (id ? 'Salvar Alterações' : 'Publicar Matéria')}
          </button>
        </form>
      </div>

    </div>
  );
}

export default AdminPost; // Ou export default AdminPost dependendo da sua config
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../supabaseClient'; // Ajuste o caminho conforme onde está seu arquivo
import './AdminPost.css';

function AdminPost() {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Bebês');
  const [imagem, setImagem] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    const { data, error } = await supabase
      .from('artigos')
      .insert([
        {
          titulo,
          categoria,
          imagem: imagem || 'https://via.placeholder.com/600x400',
          conteudo,
          autor: 'Clube Papaya'
        }
      ]);

    if (error) {
      setMensagem(`Erro ao publicar: ${error.message}`);
    } else {
      setMensagem('🎉 Artigo publicado com sucesso no banco!');
      setTitulo('');
      setImagem('');
      setConteudo('');
    }
    setLoading(false);
  };

  return (
    <div className="admin-container">
      <h2>Painel de Publicação - Clube Papaya</h2>
      {mensagem && <p className="status-msg">{mensagem}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <label>Título da Matéria:</label>
        <input 
          type="text" 
          required 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          placeholder="Ex: Guia Completo do Sono do Bebê"
        />

        <div className="form-row">
          <div>
            <label>Categoria:</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="Bebês">Bebês</option>
              <option value="Maternidade">Maternidade</option>
              <option value="Mãe">Mãe</option>
              <option value="Empreendedorismo">Empreendedorismo</option>
              <option value="Autocuidado">Autocuidado</option>
              <option value="Lazer">Lazer</option>
            </select>
          </div>

          <div>
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
        <ReactQuill 
          theme="snow" 
          value={conteudo} 
          onChange={setConteudo} 
          placeholder="Escreva seu artigo aqui com formatação, listas, títulos..."
        />

        <button type="submit" disabled={loading} className="btn-publicar">
          {loading ? 'Publicando...' : 'Publicar Matéria'}
        </button>
      </form>
    </div>
  );
}

export default AdminPost;
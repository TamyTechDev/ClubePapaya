import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Feed.css';

export default function Feed() {
  const { user } = useAuth();

  // Posts iniciais de exemplo
  const [posts, setPosts] = useState([
    {
      id: 1,
      autor: 'Mariana Lima',
      bebe: 'Mãe do Leo (8 meses)',
      categoria: 'Desabafo',
      texto: 'Hoje a noite foi bem difícil por aqui com a nascida dos primeiros dentes... Mais alguma mãe passando por essa fase de salto de desenvolvimento sem dormir nada?',
      apoios: 5,
      data: 'Há 2 horas'
    },
    {
      id: 2,
      autor: 'Camila Rocha',
      bebe: 'Mãe da Sofia (1 ano)',
      categoria: 'Marco/Conquista',
      texto: 'Meninas! A Sofia deu os primeiros 3 passinhos sozinha hoje na sala! Chorei de emoção, que momento mágico! 🎉✨',
      apoios: 12,
      data: 'Há 5 horas'
    },
    {
      id: 3,
      autor: 'Tamy Temponi',
      bebe: 'Mãe da Alice (1 ano)',
      categoria: 'Dica',
      texto: 'Dica rápida para quem está na introdução alimentar: congelar as papinhas em forminhas de gelo de silicone facilita demais a rotina do dia a dia!',
      apoios: 8,
      data: 'Ontem'
    }
  ]);

  // Estados do formulário de criação
  const [novoTexto, setNovoTexto] = useState('');
  const [categoria, setCategoria] = useState('Dúvida');
  
  // Estado do filtro ativo
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');

  // Criar novo post
  const handleCriarPost = (e) => {
    e.preventDefault();
    if (!novoTexto.trim()) return;

    const novoPost = {
      id: Date.now(),
      autor: user ? user.nome : 'Mãe Anônima',
      bebe: user ? `Mãe da ${user.nomeBebe}` : 'Mãe da comunidade',
      categoria: categoria,
      texto: novoTexto,
      apoios: 0,
      data: 'Agora mesmo'
    };

    setPosts([novoPost, ...posts]);
    setNovoTexto('');
  };

  // Função para dar apoio/curtir
  const handleApoiar = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, apoios: post.apoios + 1 } : post
    ));
  };

  // Filtragem dos posts
  const postsFiltrados = filtroCategoria === 'Todas' 
    ? posts 
    : posts.filter(post => post.categoria === filtroCategoria);

  return (
    <div className="feed-container">
      {/* Exibe a caixa de publicação se estiver logada, ou o banner pedindo login */}
      {user ? (
        <div className="card-criar-post">
          <h3>Compartilhe com a comunidade 🌸</h3>
          <p className="aviso-privacidade">🔒 Lembre-se: Por privacidade e segurança, não compartilhamos fotos das crianças no feed.</p>
          
          <form onSubmit={handleCriarPost}>
            <textarea
              value={novoTexto}
              onChange={(e) => setNovoTexto(e.target.value)}
              placeholder="O que está acontecendo na sua rotina hoje? Peça apoio, tire dúvidas ou celebre uma conquista..."
              rows="3"
              required
            />
            
            <div className="form-rodape">
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="Dúvida">❓ Dúvida</option>
                <option value="Desabafo">🤍 Desabafo</option>
                <option value="Marco/Conquista">🎉 Marco/Conquista</option>
                <option value="Dica">💡 Dica</option>
              </select>

              <button type="submit" className="btn-publicar">Publicar</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="login-banner" style={{ background: '#fefae0', padding: '1rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1.5rem', border: '1px solid #f4a261' }}>
          <p style={{ margin: 0 }}>
            🔒 <strong>Quer compartilhar ou pedir apoio no feed?</strong>{' '}
            <Link to="/login" style={{ color: '#e76f51', fontWeight: 'bold' }}>Faça login ou cadastre-se</Link> para participar da comunidade!
          </p>
        </div>
      )}

      {/* Barra de Filtros */}
      <div className="filtros-feed">
        <span>Filtrar por:</span>
        {['Todas', 'Dúvida', 'Desabafo', 'Marco/Conquista', 'Dica'].map(cat => (
          <button
            key={cat}
            className={`btn-filtro ${filtroCategoria === cat ? 'ativo' : ''}`}
            onClick={() => setFiltroCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de Posts */}
      <div className="lista-posts">
        {postsFiltrados.map(post => (
          <div key={post.id} className="card-post">
            <div className="post-header">
              <div>
                <strong>{post.autor}</strong>
                <span className="post-bebe"> • {post.bebe}</span>
              </div>
              <span className={`tag-categoria tag-${post.categoria.toLowerCase().replace('/', '-')}`}>
                {post.categoria}
              </span>
            </div>

            <p className="post-texto">{post.texto}</p>

            <div className="post-footer">
              <span className="post-data">{post.data}</span>
              <button onClick={() => handleApoiar(post.id)} className="btn-apoio">
                🤍 Dar Apoio ({post.apoios})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
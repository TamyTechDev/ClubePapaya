import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import './Feed.css';
import Navbar from '../Navbar';

export default function Feed() {
  const { user } = useAuth();

  // Extrai o nome da mãe e do filho dos metadados do Supabase
  const nomeMae = user?.user_metadata?.nome_mae || user?.user_metadata?.full_name || 'Mãe';
  const nomeFilho = user?.user_metadata?.nome_filho || user?.user_metadata?.nome_bebe || '';

  // Posts de exemplo como fallback inicial
  const postsIniciais = [
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
  ];

  const [posts, setPosts] = useState(postsIniciais);
  const [novoTexto, setNovoTexto] = useState('');
  const [categoria, setCategoria] = useState('Dúvida');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [carregandoPosts, setCarregandoPosts] = useState(false);

  // 1. Carrega as postagens da tabela 'posts' do Supabase ao abrir a tela
  useEffect(() => {
    async function fetchPosts() {
      setCarregandoPosts(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const postsFormatados = data.map(item => ({
          id: item.id,
          autor: item.nome_mae || 'Mãe da Comunidade',
          bebe: item.nome_filho ? `Mãe do(a) ${item.nome_filho}` : 'Mãe do Clube',
          categoria: item.categoria || 'Dúvida',
          texto: item.conteudo,
          apoios: item.apoios || 0,
          data: 'Recente'
        }));
        setPosts([...postsFormatados, ...postsIniciais]);
      }
      setCarregandoPosts(false);
    }

    fetchPosts();
  }, []);

  // 2. Criar novo post
  const handleCriarPost = async (e) => {
    e.preventDefault();
    if (!novoTexto.trim()) return;

    const rotuloBebe = nomeFilho ? `Mãe do(a) ${nomeFilho}` : 'Mãe do Clube';

    const localPost = {
      id: Date.now(),
      autor: nomeMae,
      bebe: rotuloBebe,
      categoria: categoria,
      texto: novoTexto,
      apoios: 0,
      data: 'Agora mesmo'
    };

    // Atualiza a tela de imediato
    setPosts([localPost, ...posts]);
    setNovoTexto('');

    // Persiste na tabela 'posts' usando nome_filho
    try {
      await supabase
        .from('posts')
        .insert([
          {
            conteudo: novoTexto,
            categoria: categoria,
            nome_mae: nomeMae,
            nome_filho: nomeFilho,
            user_id: user?.id
          }
        ]);
    } catch (err) {
      console.warn('Post salvo apenas localmente:', err.message);
    }
  };

  // 3. Dar apoio/curtir
  const handleApoiar = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, apoios: post.apoios + 1 } : post
    ));
  };

  // 4. Filtragem
  const postsFiltrados = filtroCategoria === 'Todas' 
    ? posts 
    : posts.filter(post => post.categoria === filtroCategoria);

  return (
    <div className="feed-container">
      <Navbar />
      
      {user ? (
        <div className="card-criar-post">
          <h3>Compartilhe com a comunidade 🌸</h3>
          <p className="aviso-privacidade">
            🔒 Lembre-se: Por privacidade e segurança, não compartilhamos fotos das crianças no feed.
          </p>
          
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
        {carregandoPosts && <p style={{ textAlign: 'center' }}>Carregando publicações...</p>}
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
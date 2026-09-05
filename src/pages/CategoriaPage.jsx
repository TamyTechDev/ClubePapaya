import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import NavbarPublica from '../NavbarPublica';
import NavbarArticle from './NavbarArticle';
import Sidebar from './Sidebar';
import Footer from '../Footer';
import './Home.css';

export default function CategoriaPage() {
  const { nome } = useParams();
  const [artigosCategoria, setArtigosCategoria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarArtigosPorCategoria() {
      setLoading(true);

      // Se o usuário clicou em Gravidez, redirecionamos a busca para "Maternidade" no Supabase
      let categoriaBusca = nome;
      if (nome.toLowerCase() === 'gravidez' || nome.toLowerCase() === 'gravidez & parto') {
        categoriaBusca = 'Maternidade';
      }

      const { data, error } = await supabase
        .from('artigos')
        .select('*')
        .ilike('categoria', categoriaBusca)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar artigos da categoria:', error.message);
      } else if (data) {
        setArtigosCategoria(data);
      }
      setLoading(false);
    }

    buscarArtigosPorCategoria();
  }, [nome]);

  return (
    <div className="landing-page">
      <NavbarPublica />
      <NavbarArticle />

      <div className="main-layout">
        <main className="main-content">
          <h2 className="categoria-titulo">
            Categoria: {nome}
          </h2>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px' }}>Carregando artigos...</p>
          ) : artigosCategoria.length > 0 ? (
            <div className="categoria-grid">
              {artigosCategoria.map((artigo) => (
                <Link to={`/artigo/${artigo.id}`} key={artigo.id} className="categoria-card">
                  <img src={artigo.imagem} alt={artigo.titulo} className="categoria-card-img" />
                  <h4 className="categoria-card-title">
                    {artigo.titulo}
                  </h4>
                </Link>
              ))}
            </div>
          ) : (
            <p className="categoria-vazia">
              Nenhum artigo encontrado nesta categoria ainda.
            </p>
          )}
        </main>

        <Sidebar />
      </div>

      <Footer />
    </div>
  );
}
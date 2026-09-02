import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

import NavbarArticle from './NavbarArticle';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import AuthorCard from './AuthorCard';
import RelatedPosts from './RelatedPosts';
import BannerADSCard from './BannerADSCard';
import SideBar from './Sidebar';

import './ArticlePage.css';

export default function ArticlePage() {
  const { id } = useParams(); // Pega o ID passado na URL (ex: /artigo/5)
  const [artigoData, setArtigoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarArtigoDoSupabase() {
      if (!id) return;

      setLoading(true);
      const { data, error } = await supabase
        .from('artigos')
        .select('*')
        .eq('id', id)
        .single(); // Pega exatamente o registro correspondente ao ID

      if (error) {
        console.error('Erro ao carregar o artigo do Supabase:', error.message);
      } else {
        setArtigoData(data);
      }
      setLoading(false);
    }

    buscarArtigoDoSupabase();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Carregando matéria...</div>;
  }

  if (!artigoData) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Artigo não encontrado.</div>;
  }

  return (
    <div className="justify-content-center">
      <NavbarArticle />
      
      <div className="layout-grid">
        {/* Banner Superior */}
        <BannerADSCard />
        
        {/* Wrapper flex para matéria e sidebar ficarem lado a lado */}
        <div className="conteudo-com-sidebar">
          <main className="conteudo-principal">
            {/* Formatação segura da data */}
              <ArticleHeader 
                categoria={artigoData?.categoria}
                titulo={artigoData?.titulo}
                autor={artigoData?.autor} 
                data={artigoData?.created_at ? new Date(artigoData.created_at).toLocaleDateString('pt-BR') : ''} 
              />
            <ArticleBody conteudo={artigoData?.conteudo} />
            <AuthorCard autor={artigoData?.autor} />
            <RelatedPosts />
          </main>

          {/* Sidebar */}
          <SideBar />
        </div>

        {/* Banner Inferior */}
        <BannerADSCard />
      </div>
    </div>
  );
}
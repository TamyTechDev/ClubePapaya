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
import NavbarPublica from '../NavbarPublica';

export default function ArticlePage() {
  const { id } = useParams(); // Pega o ID passado na URL (ex: /artigo/5)
  const [artigoData, setArtigoData] = useState(null);
  const [artigosMaisLidos, setArtigosMaisLidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      if (!id) return;

      setLoading(true);
      try {
        // 1. Incrementa a view do artigo atual
        const { data: artigoAtual } = await supabase
          .from('artigos')
          .select('views')
          .eq('id', id)
          .single();

        if (artigoAtual) {
          const novasViews = (artigoAtual.views || 0) + 1;
          await supabase
            .from('artigos')
            .update({ views: novasViews })
            .eq('id', id);
        }

        // 2. Busca o artigo completo para exibir na tela
        const { data: dadosArtigo, error: erroArtigo } = await supabase
          .from('artigos')
          .select('*')
          .eq('id', id)
          .single();

        if (erroArtigo) throw erroArtigo;
        setArtigoData(dadosArtigo);

        // 3. Busca direta das mais lidas para a Sidebar
        const { data: maisLidos, error: erroMaisLidos } = await supabase
          .from('artigos')
          .select('*')
          .order('views', { ascending: false })
          .limit(3);

        if (!erroMaisLidos && maisLidos) {
          setArtigosMaisLidos(maisLidos);
        }

      } catch (error) {
        console.error('Erro ao carregar dados:', error.message);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [id]);
  return (
    <div className="justify-content-center">
      <NavbarPublica/>
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

          {/* Sidebar recebendo a lista de mais lidos */}
          <SideBar artigos={artigosMaisLidos} />
        </div>

        {/* Banner Inferior */}
        <BannerADSCard />
      </div>
    </div>
  );
}
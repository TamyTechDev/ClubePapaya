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
import EbookModal from './EbookModal';

import './ArticlePage.css';
import NavbarPublica from '../NavbarPublica';

export default function ArticlePage() {
  const { slug } = useParams(); // Mudança aqui: agora pegamos o slug da URL
  const [artigoData, setArtigoData] = useState(null);
  const [artigosMaisLidos, setArtigosMaisLidos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      if (!slug) return;

      setLoading(true);
      try {
        // 1. Busca o artigo pelo slug para pegar os dados e o id (precisamos do id para atualizar as views)
        const { data: dadosArtigo, error: erroArtigo } = await supabase
          .from('artigos')
          .select('*')
          .eq('slug', slug) // Mudança aqui: busca por slug
          .single();

        if (erroArtigo) throw erroArtigo;
        setArtigoData(dadosArtigo);

        // 2. Incrementa a view usando o ID do artigo que acabamos de buscar
        if (dadosArtigo) {
          const novasViews = (dadosArtigo.views || 0) + 1;
          await supabase
            .from('artigos')
            .update({ views: novasViews })
            .eq('id', dadosArtigo.id);
        }

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
  }, [slug]); // Mudança aqui: o useEffect agora dispara quando o slug muda

  // Intercepta cliques nos links de e-book dentro do texto do artigo
  useEffect(() => {
    const handleContentClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('data-action') === 'abrir-captura') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener('click', handleContentClick);
    return () => document.removeEventListener('click', handleContentClick);
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center', padding: '50px' }}>Carregando artigo...</p>;
  }

  return (
    <div className="justify-content-center">
      <NavbarPublica/>
      <NavbarArticle />
      
      <div className="layout-grid">
        <BannerADSCard />
        
        <div className="conteudo-com-sidebar">
          <main className="conteudo-principal">
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

          <SideBar artigos={artigosMaisLidos} />
        </div>

        <BannerADSCard />
      </div>

      <EbookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
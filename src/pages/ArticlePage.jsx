import React from 'react';
import NavbarArticle from './NavbarArticle';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import AuthorCard from './AuthorCard';
import RelatedPosts from './RelatedPosts';
import BannerADSCard from './BannerADSCard';

import './ArticlePage.css';
import SideBar from './Sidebar';
import SidebarCard from './SidebarCard';

// Importando o JSON de artigos da raiz
import artigosData from '../../artigos.json';

// Pega o primeiro artigo do JSON como padrão
const artigoPadrao = artigosData[0];

export default function ArticlePage({ artigoData = artigoPadrao }) {
  return (
    <div className="justify-content-center">
      <NavbarArticle />
      
      <div className="layout-grid">
        {/* Banner Superior */}
        <BannerADSCard />
        
        {/* Wrapper flex para matéria e sidebar ficarem lado a lado */}
        <div className="conteudo-com-sidebar">
          <main className="conteudo-principal">
            <ArticleHeader 
              categoria={artigoData?.categoria}
              titulo={artigoData?.titulo}
              autor={artigoData?.autor} 
              data={artigoData?.data} 
            />
            <ArticleBody conteudo={artigoData?.conteudo} />
            <AuthorCard autor={artigoData?.autor} />
            <RelatedPosts />
          </main>

          {/* Sidebar posicionado ao lado do artigo */}
          <SideBar artigos={artigosData} />
        </div>

        {/* Banner Inferior */}
        <BannerADSCard />
      </div>
    </div>
  );
}
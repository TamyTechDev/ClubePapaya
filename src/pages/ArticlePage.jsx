import React from 'react';
import NavbarArticle from './NavbarArticle'
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';
import AuthorCard from './AuthorCard';
import RelatedPosts from './RelatedPosts';
import './ArticlePage.css';



// Dados de teste caso nenhuma prop seja enviada
const mockArtigo = {
  categoria: "Mães",
  titulo: '5 rituais para relaxar depois de um dia "daqueles"',
  autor: "Renata Menezes",
  data: "28/08/2026 - 08:45",
  conteudo: "<p>Tem dia que parece que tudo acontece ao mesmo tempo...</p>"
};

export default function ArticlePage({ artigoData = mockArtigo }) {
  return (
    <div>
      <NavbarArticle />
      
      <div className="layout-grid">
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

        
      </div>
    </div>
  );
}
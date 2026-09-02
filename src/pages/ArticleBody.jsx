import React from 'react';
import './ArticleBody.css';

export default function ArticleBody({ imagemDestaque, altImagem, conteudo }) {
  return (
    <article className="article-body">
      {/* Imagem principal do artigo (Capa/Banner interno) */}
      {imagemDestaque && (
        <figure className="article-featured-image">
          <img src={imagemDestaque} alt={altImagem || 'Imagem do artigo'} />
        </figure>
      )}

      {/* Conteúdo dinâmico do artigo */}
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: conteudo }}
      />
    </article>
  );
}
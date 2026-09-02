import React from 'react';
import './ArticleHeader.css';


export default function ArticleHeader({ categoria, titulo, subtitulo, autor, data, fotoAutor }) {
  return (
    <header className="article-header">
      {/* Tag/Categoria (ex: Mães) */}
      {categoria && <span className="category-tag">{categoria}</span>}

      {/* Título Principal */}
      <h1 className="article-title">{titulo}</h1>

      {/* Subtítulo / Linha Fina */}
      {subtitulo && <p className="article-subtitle">{subtitulo}</p>}

      {/* Metadados: Autor e Data */}
      <div className="article-meta">
        {fotoAutor && (
          <img 
            src={fotoAutor} 
            alt={autor} 
            className="author-avatar" 
          />
        )}
        <div className="meta-info">
          <span className="author-name">{autor}</span>
          <time className="publish-date">{data}</time>
        </div>
      </div>
    </header>
  );
}
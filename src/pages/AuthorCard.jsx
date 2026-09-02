import React from 'react';
import './AuthorCard.css';

export default function AuthorCard({ autor }) {
  // Trata se o autor for apenas uma string (nome) ou um objeto
  const nomeAutor = typeof autor === 'object' ? autor?.nome : autor;
  const fotoAutor = typeof autor === 'object' ? autor?.foto : null;

  return (
    <div className="author-card">
      <div className="author-avatar-placeholder">
        {fotoAutor ? (
          <img src={fotoAutor} alt={nomeAutor || "Autor"} />
        ) : (
          <span className="author-initials">
            {nomeAutor ? nomeAutor.charAt(0) : "A"}
          </span>
        )}
      </div>
      <div className="author-info">
        <h4>{nomeAutor || "Autor Convidado"}</h4>
        <p>Sua FamilyTech de conteúdo diário.</p>
        <button className='botao-perfil-autor'>Ver Perfil</button>
      </div>
    </div>
  );
}
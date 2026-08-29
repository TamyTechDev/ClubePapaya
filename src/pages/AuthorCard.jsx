import React from "react";
export default function AuthorCard({ foto, nome, bio, linkPerfil }) {
  return (
    <section className="author-card">
      <div className="author-avatar-container">
        <img 
          src={foto || "https://via.placeholder.com/100"} 
          alt={`Foto de ${nome}`} 
          className="author-card-avatar" 
        />
      </div>

      <div className="author-card-content">
        <h3 className="author-card-name">{nome}</h3>
        <p className="author-card-bio">{bio}</p>
        
        {linkPerfil && (
          <a href={linkPerfil} className="author-card-button">
            VER PERFIL
          </a>
        )}
      </div>
    </section>
  );
}
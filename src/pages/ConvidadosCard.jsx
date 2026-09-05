import React from "react";

function ConvidadosCard({ autor }) {
  const nomeAutor = typeof autor === 'object' && autor !== null ? autor?.nome : autor;
  const fotoAutor = typeof autor === 'object' && autor !== null ? autor?.foto : null;
  const bioAutor = typeof autor === 'object' && autor !== null ? autor?.bio : "Sua FamilyTech de conteúdo diário.";

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
        <p>{bioAutor}</p>
        <button className='botao-perfil-autor'>Ver Perfil</button>
      </div>
    </div>
  );
}

export default ConvidadosCard;
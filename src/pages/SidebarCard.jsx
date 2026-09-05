import React from 'react';
import './SidebarCard.css';

export default function SidebarCard({ imagem, titulo, link }) {
  const imagemFinal = imagem && imagem.trim() !== '' 
    ? imagem 
    : 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=60';

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop&q=60';
  };

  return (
    <a href={link} className="sidebar-card-item">
      <div className="sidebar-thumb-container">
        <img 
          src={imagemFinal} 
          alt={titulo || 'Artigo'} 
          className="sidebar-thumb" 
          onError={handleImageError}
        />
      </div>
      <h4 className="sidebar-card-title">{titulo || 'Sem título'}</h4>
    </a>
  );
}
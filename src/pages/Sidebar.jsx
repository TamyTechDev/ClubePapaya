import React from 'react';
import SidebarCard from './SidebarCard';
import './Sidebar.css';

export default function SideBar({ artigos = [] }) {
  const ultimosArtigos = artigos.slice(0, 3);

  return (
    <aside className="sidebar-container">
      <h3 className="sidebar-section-title">Mais Lidas</h3>
      
      {/* Lista de artigos */}
      <div className="sidebar-cards-list">
        {ultimosArtigos.map((item) => (
          <SidebarCard
            key={item.id}
            imagem={item.imagem}
            titulo={item.titulo}
            link={`/artigo/${item.id}`}
          />
        ))}
      </div>

      {/* Banner Quadrado (fora do loop, para aparecer apenas uma vez) */}
      <div className="banner-container">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://plus.unsplash.com/premium_photo-1661292003404-41ac25d4df86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9tcyUyMGZ1bnxlbnwwfHwwfHx8MA%3D%3D" 
            alt="Mãe rindo com a filha" 
            className="banner-img"
          />
        </a>
      </div>
    </aside>
  );
}
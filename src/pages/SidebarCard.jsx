import React from 'react';
import './SidebarCard.css';

export default function SidebarCard({ imagem, titulo, link }) {
  return (
    <a href={link} className="sidebar-card-item">
      {imagem && (
        <div className="sidebar-thumb-container">
          <img src={imagem} alt={titulo} className="sidebar-thumb" />
        </div>
      )}
      <h4 className="sidebar-card-title">{titulo}</h4>
    </a>
  );
}
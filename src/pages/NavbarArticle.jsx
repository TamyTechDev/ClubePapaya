import React from 'react';
import './NavbarArticle.css';

export default function NavbarArticle() {
  return (
    <header className="navbar-article">
      {/* Links do Topo */}
      <nav className="nav-top">
        <ul className="nav-top-links">
          <li><a href="#">Quem Somos</a></li>
          <li><a href="#">Artigos</a></li>
          <li><a href="#">Newsletter</a></li>
          <li><a href="#">Contato</a></li>
          <li><a href="#">Política de Privacidade</a></li>
        </ul>
      </nav>

      {/* Logo e Busca */}
      <div className="nav-center">
        <h1 className="logo-text">Clube Papaya</h1>
        <div className="search-box">
          <input type="text" placeholder="Pesquisar..." />
        </div>
      </div>

      {/* Categorias Principais */}
      <nav className="nav-categories-container">
        <ul className="nav-categories">
          <li><a href="#">Gravidez & Parto</a></li>
          <li><a href="#">Mães</a></li>
          <li><a href="#">Bebês</a></li>
          <li><a href="#">Crianças</a></li>
          <li><a href="#">Adolescentes</a></li>
          <li><a href="#">Viver Bem</a></li>
        </ul>
      </nav>
    </header>
  );
}
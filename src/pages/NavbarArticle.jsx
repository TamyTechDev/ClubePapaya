import React from 'react';
import './NavbarArticle.css';

export default function NavbarArticle() {
  return (
    <header className="navbar-article">
      {/* Links do Topo */}
      <nav className="nav-top">
        <ul className="nav-top-links">
          <li><a href="/categoria/Bebê">Gravidez & Parto</a></li>
          <li><a href="#">Mães</a></li>
          <li><a href="#">Bebês</a></li>
          <li><a href="#">Crianças</a></li>
          <li><a href="#">Lazer e Autocuidado</a></li>
          <li className='button-newsletter'><a href="#">Newsletter</a></li>
          <li className='contato'><a href="#">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
}
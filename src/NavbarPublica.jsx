import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './images/CLUBEPAPAYA_LOGO_PNG.png';
import './Navbar.css';

export default function NavbarPublica({ onOpenModal }) {
  return (
    <nav className="navbar navbar-publica">
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="Clube Papaya" className="logo-img" />
        </Link>
      </div>

      <div className="search-box">
            <input type="text" placeholder="Pesquisar..." />
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Início</Link></li>
        <li><Link to="/timeline">Guia</Link></li>
        <li><a href="#sobre">Propósito</a></li>
        
        <li>
          <button 
            type="button" 
            className="btn-nav-link" 
            onClick={() => onOpenModal && onOpenModal('convidados')}
          >
            Convidados
          </button>
          <li><a href="#">Entrar/Cadastre-se</a></li>
        </li>
      </ul>
    </nav>
  );
}
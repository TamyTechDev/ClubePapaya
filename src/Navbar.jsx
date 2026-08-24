import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🌸 MãeConecta</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Feed</Link></li>
        <li><Link to="/bazar">Bazar</Link></li>
        <li><Link to="/timeline">Desenvolvimento</Link></li>
        <li><Link to="/empreendedorismo">Empreendedorismo</Link></li>
      </ul>
      <div className="navbar-auth">
        <Link to="/login" className="btn-login">Entrar</Link>
      </div>
    </nav>
  );
}
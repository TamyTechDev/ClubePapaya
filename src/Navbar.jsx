import React from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Logo from './images/CLUBEPAPAYA_LOGO_PNG.png';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/Feed">
          <img src={Logo} alt="Clube Papaya" className="logo-img" />
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/Feed">Inicio</Link></li>
        <li><Link to="/bazar">Bazar</Link></li>
        <li><Link to="/timeline">Guia</Link></li>
        <li><Link to="/empreendedorismo">Newsletter</Link></li>
      </ul>

      <div className="navbar-auth">
        {user && (
          <div className="navbar-user">
            <span className="user-greeting">
              Olá, <strong>{user.name ? user.name.split(' ')[0] : 'Mãe'}</strong>
              {user.childName && <small className="child-info"> (Mãe do {user.childName})</small>}
            </span>
            <button onClick={logout} className="btn-logout">Sair</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
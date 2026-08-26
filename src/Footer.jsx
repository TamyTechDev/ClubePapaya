import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './images/CLUBEPAPAYA_LOGO_PNG.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="papaya-footer">
      <div className="footer-container">
        {/* Esquerda */}
        <div className="footer-col col-left">
          <img src={Logo} alt="Clube Papaya" className="footer-logo" />
          
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
          </div>

          <span className="footer-tagline">Para mães</span>
          <p className="footer-about-short">Apoiando a maternidade de forma real e leve.</p>
        </div>

        {/* Centro */}
        <div className="footer-col col-center">
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/empreendedorismo">Blog</Link></li>
            <li><Link to="/timeline">Guia</Link></li>
            <li><a href="#sobre">Sobre</a></li>
          </ul>
        </div>

        {/* Direita */}
        <div className="footer-col col-right">
          <h4>Institucional</h4>
          <ul>
            <li><a href="#fale-conosco">Fale Conosco</a></li>
            <li><a href="#privacidade">Políticas de Privacidade</a></li>
            <li><a href="#termos">Termos e Condições</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Clube Papaya. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
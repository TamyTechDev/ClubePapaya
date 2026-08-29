import React from 'react';

export default function Header() {
  return (
    <header className="site-header">
      {/* 1. Faixa Superior (Redes Sociais + Links Institucionais) */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook">F</a>
            <a href="#twitter" aria-label="Twitter">X</a>
            <a href="#instagram" aria-label="Instagram">IG</a>
            <a href="#youtube" aria-label="YouTube">YT</a>
            <a href="#pinterest" aria-label="Pinterest">P</a>
            <a href="#linkedin" aria-label="LinkedIn">IN</a>
            <a href="#tiktok" aria-label="TikTok">TK</a>
          </div>

          <nav className="top-nav">
            <a href="#quem-somos">QUEM SOMOS</a>
            <a href="#artigos">ARTIGOS</a>
            <a href="#newsletter">NEWSLETTER</a>
            <a href="#contato">CONTATO</a>
            <a href="#politica">POLÍTICA DE PRIVACIDADE</a>
            <a href="#google-news" className="btn-google-news">SIGA-NOS NO GOOGLE NEWS</a>
          </nav>
        </div>
      </div>

      {/* 2. Área Central (Logo + Busca + Login) */}
      <div className="main-header">
        <div className="container main-header-content">
          <div className="logo">
            <a href="/">
              <img 
                src="URL_DA_SUA_LOGO_NO_CLOUDINARY" 
                alt="Clube Papaya" 
              />
            </a>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Pesquisar..." />
            <button type="button">🔍</button>
          </div>

          <div className="user-actions">
            <a href="#login" className="login-link">ENTRAR / CADASTRE-SE</a>
          </div>
        </div>
      </div>

      {/* 3. Barra de Categorias */}
      <nav className="categories-bar">
        <div className="container categories-content">
          <a href="#caru" className="highlight">CARU</a>
          <a href="#gravidez">GRAVIDEZ & PARTO</a>
          <a href="#maes">MÃES</a>
          <a href="#bebes">BEBÊS</a>
          <a href="#criancas">CRIANÇAS</a>
          <a href="#adolescentes">ADOLESCENTES</a>
          <a href="#viver-bem">VIVER BEM</a>
          <a href="#guia-de-compras">GUIA DE COMPRAS</a>
          <a href="#educacao">EDUCAÇÃO</a>
          <a href="#colunistas">COLUNISTAS</a>
        </div>
      </nav>
    </header>
  );
}
import React, { useState, useEffect } from 'react';
import SidebarCard from './SidebarCard';
import { supabase } from '../supabaseClient';
import './Sidebar.css';

export default function Sidebar({ artigos = [] }) {
  const [artigosSidebar, setArtigosSidebar] = useState([]);

  useEffect(() => {
    if (artigos && artigos.length > 0) {
      // Pega os 5 primeiros artigos passados pela props (Home ou ArticlePage)
      setArtigosSidebar(artigos.slice(0, 5));
    } else {
      // Fallback: Busca direto no Supabase se vier vazio
      async function buscarMaisLidas() {
        const { data, error } = await supabase
          .from('artigos')
          .select('*')
          .order('views', { ascending: false })
          .limit(5);

        if (!error && data) {
          setArtigosSidebar(data);
        }
      }
      buscarMaisLidas();
    }
  }, [artigos]);

  return (
    <aside className="sidebar-container">
      <h3 className="sidebar-section-title">Mais Lidas</h3>
      
      <div className="sidebar-cards-list">
        {artigosSidebar.length > 0 ? (
          artigosSidebar.map((item) => (
            <SidebarCard
              key={item.id}
              imagem={item.imagem || item.foto || item.capa || item.url}
              titulo={item.titulo || item.title || item.nome}
              link={`/artigo/${item.id}`}
            />
          ))
        ) : (
          <p style={{ fontSize: '0.85rem', color: '#777', textAlign: 'center' }}>Carregando...</p>
        )}
      </div>

      {/* Banner Quadrado */}
      <div className="banner-container">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img 
            src="https://plus.unsplash.com/premium_photo-1661292003404-41ac25d4df86?w=500&auto=format&fit=crop&q=60" 
            alt="Banner lateral" 
            className="banner-img"
          />
        </a>
      </div>
    </aside>
  );
}
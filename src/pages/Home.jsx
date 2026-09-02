import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Arquivos na pasta src/ (subir um nível com ../)
import NavbarPublica from '../NavbarPublica';
import Footer from '../Footer';
import { supabase } from '../supabaseClient';
import Bannerhome from '../images/Banner home.png';

// Arquivos dentro da própria pasta pages/ (mesmo nível com ./)
import Sidebar from './Sidebar';
import GridTresCard from './GridTresCard';
import './Home.css';
function Home() {
  const [listaArtigos, setListaArtigos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarArtigos() {
      const { data, error } = await supabase
        .from('artigos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar artigos do Supabase:', error.message);
      } else if (data) {
        setListaArtigos(data);
      }
      setLoading(false);
    }

    buscarArtigos();
  }, []);

  // Separação para os destaques do topo
  const artigoPrincipal = listaArtigos[0] || null;
  const artigosSecundarios = listaArtigos.slice(1, 3);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Carregando matérias...</div>;
  }

  return (
    <div className="landing-page">
      <NavbarPublica />

      <div className="main-layout">
        <main className="main-content">
          
          {/* Seção Superior - 1 Destaque Principal + 2 Secundários */}
          <section className="secao-artigo">
            {artigoPrincipal && (
              <Link to={`/artigo/${artigoPrincipal.id}`} className="artigo-principal">
                <img src={artigoPrincipal.imagem} alt={artigoPrincipal.titulo} />
                <h2>{artigoPrincipal.titulo}</h2>
              </Link>
            )}

            <div className="artigos-secundario">
              {artigosSecundarios.map((artigo) => (
                <Link to={`/artigo/${artigo.id}`} key={artigo.id} className="artigo-secundario">
                  <img src={artigo.imagem} alt={artigo.titulo} />
                  <h4>{artigo.titulo}</h4>
                </Link>
              ))}
            </div>
          </section>

          {/* Banner Publicitário/Hero */}
          <section className="hero-section">
            <div className="banner-wrapper">
              <img src={Bannerhome} alt="Banner" className="banner-img" />
            </div>
          </section>

          {/* Grid Dinâmico de 6 Categorias */}
          <GridTresCard 
            artigos={listaArtigos} 
            categorias={['Bebês', 'Maternidade', 'Mãe', 'Empreendedorismo', 'Autocuidado', 'Lazer']} 
          />

        </main>

        <aside className="sidebar-container">
          <Sidebar />
        </aside>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
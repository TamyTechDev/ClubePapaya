import React from 'react';
import { Link } from 'react-router-dom';
import './GridTresCard.css';

function GridTresCard({ artigos = [], categorias = ['Bebês', 'Maternidade', 'Mãe', 'Empreendedorismo', 'Autocuidado', 'Lazer'] }) {

  // Função para normalizar textos (remove acentos, caixa alta e espaços)
  const normalizarTexto = (str) => {
    if (!str) return '';
    return str
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  // Função para buscar e ordenar os 2 artigos mais recentes de cada categoria
  const getArtigosPorCategoria = (categoriaNome) => {
    if (!Array.isArray(artigos) || artigos.length === 0) return [];

    const categoriaBuscada = normalizarTexto(categoriaNome);

    // 1. Filtra os artigos comparando a categoria normalizada
    const filtrados = artigos.filter((artigo) => {
      const catArtigo = normalizarTexto(artigo?.categoria);
      return catArtigo === categoriaBuscada;
    });

    // 2. Ordena garantindo compatibilidade com 'created_at' ou 'data'
    return filtrados
      .sort((a, b) => {
        const campoDataA = a?.created_at || a?.data || 0;
        const campoDataB = b?.created_at || b?.data || 0;

        const dataA = new Date(campoDataA).getTime();
        const dataB = new Date(campoDataB).getTime();

        return dataB - dataA;
      })
      .slice(0, 2); // Retorna os 2 mais recentes
  };

  return (
    <section className="grid-tres-container">
      {categorias.map((cat, index) => {
        const artigosCategoria = getArtigosPorCategoria(cat);
        const artigoPrincipal = artigosCategoria[0];
        const artigoSecundario = artigosCategoria[1];

        return (
          <div key={index} className="coluna-categoria">
            {/* Título da Categoria */}
            <h3 className="titulo-categoria">{cat}</h3>

            {/* Card 1 - Destaque Principal */}
            {artigoPrincipal ? (
              <Link to={`/artigo/${artigoPrincipal.id}`} className="card-destaque-categoria">
                <div className="imagem-container">
                  <img 
                    src={artigoPrincipal.imagem} 
                    alt={artigoPrincipal.titulo || 'Imagem do artigo'} 
                  />
                  <span className="badge-categoria">{artigoPrincipal.categoria}</span>
                  <div className="overlay-gradiente">
                    <h4 className="titulo-card-destaque">{artigoPrincipal.titulo}</h4>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="card-empty">Nenhum artigo em {cat}</div>
            )}

            {/* Card 2 - Notícia Secundária */}
            {artigoSecundario && (
              <Link to={`/artigo/${artigoSecundario.id}`} className="card-secundario-categoria">
                <div className="thumb-container">
                  <img 
                    src={artigoSecundario.imagem} 
                    alt={artigoSecundario.titulo || 'Imagem secundária'} 
                  />
                </div>
                <h5 className="titulo-card-secundario">{artigoSecundario.titulo}</h5>
              </Link>
            )}

            {/* Botão Ver Mais */}
            <Link to={`/guia?categoria=${encodeURIComponent(cat)}`} className="btn-mais-categoria">
              Mais {cat}
            </Link>
          </div>
        );
      })}
    </section>
  );
}

export default GridTresCard;
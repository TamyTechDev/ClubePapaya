import React, { useState } from 'react';
import './Bazar.css';
import Navbar from '../Navbar';

export default function Bazar() {
  // Estado inicial com itens de exemplo
  const [itens, setItens] = useState([
    {
      id: 1,
      nome: 'Berço Americano de Madeira com Colchão',
      categoria: 'Móveis',
      preco: 'R$ 250,00',
      tipo: 'Venda',
      imagem: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80',
      anunciante: 'Carla Silva',
      contato: '(11) 98888-7777'
    },
    {
      id: 2,
      nome: 'Kit de Roupizinhas RN (10 peças seminovas)',
      categoria: 'Roupas',
      preco: 'Grátis',
      tipo: 'Doação',
      imagem: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80',
      anunciante: 'Tamy Temponi',
      contato: '(11) 97777-6666'
    },
    {
      id: 3,
      nome: 'Cadeirinha de Balanço Musical Infantil',
      categoria: 'Brinquedos',
      preco: 'R$ 120,00',
      tipo: 'Venda',
      imagem: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
      anunciante: 'Fernanda Souza',
      contato: '(11) 96666-5555'
    }
  ]);

  // Estados do formulário de novo item
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Roupas');
  const [tipo, setTipo] = useState('Doação');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');
  
  // Estado de filtro do Bazar
  const [filtroTipo, setFiltroTipo] = useState('Tudo');

  // Adicionar item
  const handleCriarAnuncio = (e) => {
    e.preventDefault();
    if (!nome.trim()) return;

    const novoItem = {
      id: Date.now(),
      nome,
      categoria,
      tipo,
      preco: tipo === 'Doação' ? 'Grátis' : (preco ? `R$ ${preco}` : 'A combinar'),
      imagem: imagem.trim() || 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
      anunciante: 'Você',
      contato: 'Contato via Chat'
    };

    setItens([novoItem, ...itens]);
    
    // Limpar formulário
    setNome('');
    setPreco('');
    setImagem('');
  };

  // Filtragem
  const itensFiltrados = filtroTipo === 'Tudo'
    ? itens
    : itens.filter(item => item.tipo === filtroTipo);

  return (
    <div className="bazar-container">
      <Navbar />
      <div className="bazar-header">
        <h2>🛍️ Bazar de Trocas & Doações</h2>
        <p>Promova a economia circular entre mães. Anuncie o que seu bebê não usa mais!</p>
      </div>

      <div className="bazar-layout">
        {/* Formulário de Anúncio na Lateral */}
        <div className="card-formulario-bazar">
          <h3>Anunciar um Item 📦</h3>
          <form onSubmit={handleCriarAnuncio}>
            <div className="form-group">
              <label>Nome do Item:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Carrinho de bebê reclinável"
                required
              />
            </div>

            <div className="form-group">
              <label>Categoria:</label>
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="Roupas">👕 Roupas</option>
                <option value="Brinquedos">🧸 Brinquedos</option>
                <option value="Móveis">🛏️ Móveis/Acessórios</option>
                <option value="Alimentação">🍼 Alimentação</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tipo de Anúncio:</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="Doação">🎁 Doação (Grátis)</option>
                <option value="Venda">💰 Venda / Troca</option>
              </select>
            </div>

            {tipo === 'Venda' && (
              <div className="form-group">
                <label>Valor (R$):</label>
                <input
                  type="text"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  placeholder="Ex: 50,00"
                />
              </div>
            )}

            <div className="form-group">
              <label>URL da Imagem (opcional):</label>
              <input
                type="url"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                placeholder="Cole o link de uma imagem"
              />
            </div>

            <button type="submit" className="btn-anunciar">Publicar Anúncio</button>
          </form>
        </div>

        {/* Vitrine do Bazar */}
        <div className="bazar-vitrine">
          {/* Filtros */}
          <div className="bazar-filtros">
            <button
              className={`btn-filtro-bazar ${filtroTipo === 'Tudo' ? 'ativo' : ''}`}
              onClick={() => setFiltroTipo('Tudo')}
            >
              Todos os Itens
            </button>
            <button
              className={`btn-filtro-bazar ${filtroTipo === 'Doação' ? 'ativo' : ''}`}
              onClick={() => setFiltroTipo('Doação')}
            >
              🎁 Apenas Doações
            </button>
            <button
              className={`btn-filtro-bazar ${filtroTipo === 'Venda' ? 'ativo' : ''}`}
              onClick={() => setFiltroTipo('Venda')}
            >
              🏷️ Venda / Troca
            </button>
          </div>

          {/* Grid de Cards */}
          <div className="grid-bazar">
            {itensFiltrados.map(item => (
              <div key={item.id} className="card-item-bazar">
                <div className="imagem-container">
                  <img src={item.imagem} alt={item.nome} />
                  <span className={`badge-tipo ${item.tipo.toLowerCase()}`}>
                    {item.tipo === 'Doação' ? '🎁 Doação' : item.preco}
                  </span>
                </div>

                <div className="card-conteudo">
                  <span className="categoria-tag">{item.categoria}</span>
                  <h4>{item.nome}</h4>
                  
                  <div className="card-rodape-item">
                    <span className="anunciante">Por: {item.anunciante}</span>
                    <button className="btn-tenho-interesse">Tenho Interesse</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
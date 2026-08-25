import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Empreendedorismo.css';
import Navbar from '../Navbar';

// Lista de edições recentes da Newsletter
const EDICOES_NEWSLETTER = [
  {
    id: 4,
    data: '24 de Agosto, 2026',
    categoria: 'Desenvolvimento',
    titulo: 'Como Identificar as Fases de Desenvolvimento do Bebê e Por Que Isso Importa',
    resumo: 'Você sabe qual fase seu bebê está e qual a importância disso? Confira.',
    leitura: '3 min de leitura',
    conteudoCompleto: (
      <div className="artigo-texto">
        <p>
          Acompanhar os primeiros anos de vida de um bebê é uma jornada fascinante, repleta de descobertas diárias. No entanto, em meio a tantos marcos e transformações rápidas, muitos pais se perguntam: como saber se o filho está se desenvolvendo no tempo certo e por que essa observação é tão crucial?
        </p>
        <p>
          Entender o salto de cada fase não serve para criar comparações, mas para oferecer o suporte adequado na hora certa.
        </p>
        
        <h4>As Principais Fases do Desenvolvimento Infantil (0 a 3 Anos)</h4>
        <p>
          O desenvolvimento infantil ocorre de forma contínua e integrada, envolvendo habilidades motoras, cognitivas, de linguagem e socioemocionais.
        </p>
        <ul>
          <li><strong>0 a 6 meses (Acolhimento e Exploração):</strong> Sustentação da cabeça, resposta a estímulos sonoros e visuais, rolamento e surgimento do sorriso social.</li>
          <li><strong>6 a 12 meses (Mobilidade e Interação):</strong> Sentar sem apoio, início do engatinhar, desenvolvimento do movimento de pinça com os dedos e primeiros balbucios estruturados.</li>
          <li><strong>12 a 24 meses (Independência e Expressão):</strong> Consolidação dos primeiros passos, expansão rápida do vocabulário e surgimento do brincar simbólico (faz de conta).</li>
          <li><strong>24 a 36 meses (Autonomia e Conexão Social):</strong> Corrida, saltos, formação de frases completas, maior controle emocional e início do desfralde.</li>
        </ul>

        <p className="dica-box">
          💡 <strong>Dica Especial:</strong> Quer acompanhar todos esses momentos de forma detalhada? Na aba{' '}
          <Link to="/timeline" style={{ color: '#e76f51', fontWeight: 'bold' }}>
            Guia
          </Link>{' '}
          do nosso site, preparamos uma linha do tempo completa para você conferir passo a passo as principais etapas do desenvolvimento de 0 a 3 anos de idade!
        </p>

        <h4>Sinais Visíveis de Transição de Fase</h4>
        <p>Existem indícios claros de que a criança está prestes a alcançar um novo marco:</p>
        <ul>
          <li><strong>Mudança no padrão de sono:</strong> Despertares noturnos mais frequentes costumam coincidir com saltos de desenvolvimento.</li>
          <li><strong>Irritabilidade temporária:</strong> O esforço neurovegetativo para dominar uma nova habilidade gera frustração passageira.</li>
          <li><strong>Interesse por novos estímulos:</strong> O bebê passa a buscar objetos com novas texturas, sons e formatos.</li>
        </ul>

        <p>
          Cada criança possui um ritmo único de amadurecimento. As janelas de desenvolvimento servem como guias de referência, e não como regras rígidas.
        </p>

        <p>
          Gostou do conteúdo? Acesse a aba{' '}
          <Link to="/timeline" style={{ color: '#e76f51', fontWeight: 'bold' }}>
            Guia
          </Link>{' '}
          no nosso site para explorar a linha do tempo e compartilhe esta newsletter com outros pais que vivenciam essa fase tão especial!
        </p>
      </div>
    )
  },
  {
    id: 1,
    data: '24 de Agosto, 2026',
    categoria: 'Produtividade',
    titulo: 'Como organizar a rotina de trabalho com um bebê em casa',
    resumo: 'Estratégias práticas para mapear janelas de atenção, criar blocos de foco e manter a sanidade mental sem culpa.',
    leitura: '4 min de leitura',
    conteudoCompleto: 'Trabalhar de casa com filhos pequenos exige flexibilidade. A chave não é tentar cumprir 8 horas seguidas, mas sim aproveitar as janelas de oportunidade...'
  },
  {
    id: 2,
    data: '17 de Agosto, 2026',
    categoria: 'Finanças',
    titulo: 'Precificação sem mistério para produtos artesanais e digitais',
    resumo: 'Aprenda a calcular custos fixos, horas trabalhadas e margem de lucro real para nunca mais pagar para trabalhar.',
    leitura: '6 min de leitura',
    conteudoCompleto: 'Muitas mães começam a vender sem incluir o custo da própria hora de trabalho. Vamos ver o passo a passo de como estruturar sua tabela de preços...'
  },
  {
    id: 3,
    data: '10 de Agosto, 2026',
    categoria: 'Marketing & Vendas',
    titulo: 'Como usar o Instagram e a Shopee para alavancar seu negócio materno',
    resumo: 'Dicas simples de posicionamento no digital, criação de fotos atraentes e otimização de anúncios para vender no automático.',
    leitura: '5 min de leitura',
    conteudoCompleto: 'Estar no digital não significa gravar Stories o dia todo. O segredo está na clareza da sua oferta e na construção de um catálogo estratégico...'
  }
];

export default function Empreendedorismo() {
  const [emailInput, setEmailInput] = useState('');
  const [inscrito, setInscrito] = useState(false);
  const [edicaoAberta, setEdicaoAberta] = useState(null);

  const handleInscricao = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setInscrito(true);
      setEmailInput('');
    }
  };

  return (
    <div className="newsletter-container">
      <Navbar />
      {/* SEÇÃO HERO DA NEWSLETTER */}
      <header className="newsletter-hero">
        <span className="hero-badge">💌 Edição Semanal</span>
        <h1>Papaya Newsletter</h1>
        <p className="hero-subtitle">
          Inspiração, estratégias de negócios, marketing e relatos reais para mães que empreendem ou querem iniciar uma nova renda.
        </p>

        {/* BOX DE INSCRIÇÃO */}
        <div className="subscribe-box">
          {inscrito ? (
            <div className="subscribe-success">
              🎉 <strong>Inscrição realizada!</strong> Você receberá nossas próximas edições diretamente no seu e-mail.
            </div>
          ) : (
            <form onSubmit={handleInscricao} className="subscribe-form">
              <input 
                type="email" 
                placeholder="Digite seu melhor e-mail..." 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <button type="submit">Quero Assinar</button>
            </form>
          )}
        </div>
      </header>

      {/* EDICÕES ANTERIORES / ARTIGOS */}
      <section className="editions-section">
        <h2>📚 Edições Recentes</h2>
        
        <div className="editions-grid">
          {EDICOES_NEWSLETTER.map((artigo) => (
            <article key={artigo.id} className="edition-card">
              <div className="card-header">
                <span className="badge-categoria">{artigo.categoria}</span>
                <span className="card-data">{artigo.data}</span>
              </div>
              
              <h3>{artigo.titulo}</h3>
              <p>{artigo.resumo}</p>
              
              <div className="card-footer">
                <span className="tempo-leitura">⏱️ {artigo.leitura}</span>
                <button 
                  className="btn-ler-mais"
                  onClick={() => setEdicaoAberta(edicaoAberta === artigo.id ? null : artigo.id)}
                >
                  {edicaoAberta === artigo.id ? 'Fechar' : 'Ler artigo'}
                </button>
              </div>

              {/* CONTEÚDO EXPANDIDO */}
              {edicaoAberta === artigo.id && (
                <div className="edition-content">
                  <hr />
                  {typeof artigo.conteudoCompleto === 'string' ? (
                    <p>{artigo.conteudoCompleto}</p>
                  ) : (
                    artigo.conteudoCompleto
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
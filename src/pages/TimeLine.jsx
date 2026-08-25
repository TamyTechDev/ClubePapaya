import React, { useState, useRef } from 'react';
import Navbar from '../Navbar';

// Dados completos das 13 fases de desenvolvimento
const FASES = [
  {
    id: '0m',
    rotulo: 'Recém-Nascido',
    subtitulo: '0 a 1 Mês',
    icone: '👶',
    resumo: 'Adaptação ao mundo fora do útero. Predomínio dos reflexos primitivos e fortes vínculos afetivos.',
    saltos: '1º Salto: Mundo das Sensações Mudança no metabolismo e percepção de luz e sons.',
    marcos: [
      'Reflexo de sucção e preensão palmar ativos',
      'Fixa o olhar brevemente a 20-30 cm de distância',
      'Reage a sons altos com sobressalto (Reflexo de Moro)',
      'Gira a cabeça para os lados quando deitado de barriga para cima'
    ],
    sonoAlimentacao: {
      sono: 'Dorme entre 14h e 17h por dia em ciclos curtos de 2 a 4 horas. O ritmo dia/noite ainda não está formado.',
      alimentacao: 'Aleitamento materno exclusivo a livre demanda (ou fórmula). Não oferecer água ou chás.'
    },
    atividades: [
      'Contato pele a pele constante (Método Canguru)',
      'Conversar com voz suave e cantar cantigas',
      'Oferecer contraste visual simples (cartões em preto e branco)'
    ],
    alertas: 'Choro ininterrupto por horas, recusa de mamadas, febre ou hipotonia (bebê muito molinho).'
  },
  {
    id: '1m',
    rotulo: '1 Mês',
    subtitulo: '1 Mês',
    icone: '✨',
    resumo: 'O bebê começa a interagir mais com o ambiente e a focar melhor os rostos das pessoas.',
    saltos: 'Interesse crescente pelo ambiente e início dos primeiros sorrisos reflexos.',
    marcos: [
      'Levanta a cabeça por alguns segundos na posição de bruços (Tummy Time)',
      'Acompanha objetos em movimento lento até o meio do campo visual',
      'Abre e fecha as mãos involuntariamente',
      'Emite pequenos sons guturais (coos)'
    ],
    sonoAlimentacao: {
      sono: 'Padrão de sono ainda irregular, média de 15h por dia. Começam as temidas cólicas do recém-nascido.',
      alimentacao: 'Livre demanda pura. Picos de crescimento podem fazer o bebê querer mamar com mais frequência.'
    },
    atividades: [
      'Tummy Time (barriga para baixo) de 2 a 3 minutos sob supervisão',
      'Fazer massagem Shantala para aliviar cólicas e relaxar',
      'Sorrir de perto para o bebê imitar expressões'
    ],
    alertas: 'Pouco ganho de peso, ausência de resposta a barulhos fortes.'
  },
  {
    id: '2m',
    rotulo: '2 Meses',
    subtitulo: '2 Meses',
    icone: '😊',
    resumo: 'Surge o emocionante Sorriso Social e o bebê começa a controlar melhor o pescoço.',
    saltos: '2º Salto: Mundo dos Padrões Identificação de formas, cores e rotinas visuais.',
    marcos: [
      'Primeiro Sorriso Social intencional em resposta aos pais',
      'Sustenta a cabeça a 45º quando de bruços',
      'Gira o corpo de lado',
      'Acompanha objetos com os olhos em um arco de 180 graus'
    ],
    sonoAlimentacao: {
      sono: 'Início do amadurecimento da melatonina. Pode começar a ter um bloco de sono noturno mais longo (3 a 5h).',
      alimentacao: 'Ainda exclusivo: Leite materno ou fórmula infantil indicada pelo pediatra.'
    },
    atividades: [
      'Colocar móbiles coloridos acima do peito (não da cabeça)',
      'Conversar pausadamente respondendo aos balbucios do bebê',
      'Brincadeiras no tapete de atividades com texturas macias'
    ],
    alertas: 'Não sorri em resposta, não sustenta o pescoço de forma alguma.'
  },
  {
    id: '3m',
    rotulo: '3 Meses',
    subtitulo: '3 Meses',
    icone: '🧸',
    resumo: 'Mãozinhas abertas, descobertas sensoriais e muita comunicação por balbucios.',
    saltos: '3º Salto: Transições Suaves Movimentos mais fluidos e maior controle do corpo.',
    marcos: [
      'Junta as mãos no centro do corpo e leva tudo à boca',
      'Sustenta o pescoço e o tórax ao apoiar-se nos antebraços',
      'Inicia gargalhadas altas e sons vocálicos ("a-gu", "e-he")',
      'Agita as pernas e braços quando entusiasmado'
    ],
    sonoAlimentacao: {
      sono: 'Sono mais previsível (14h/dia). Pode ocorrer a regressão do sono dos 3-4 meses.',
      alimentacao: 'Mantém livre demanda. Início do hábito de babar mais devido à maturação das glândulas salivares.'
    },
    atividades: [
      'Oferecer chocalhos leves para o bebê tentar segurar',
      'Cantar canções movimentando as perninhas estilo "pedalar"',
      'Fazer brincadeira do "Escondeu... Achou!" com paninhos'
    ],
    alertas: 'Não responde a sons da casa, mãos constantemente fechadas e rígidas.'
  },
  {
    id: '4m',
    rotulo: '4 Meses',
    subtitulo: '4 Meses',
    icone: '🌟',
    resumo: 'Fase da rorolândia! Maior coordenação olho-mão e grande interesse nos brinquedos.',
    saltos: '4º Salto: Mundo dos Eventos Compreensão de causa e efeito (ex: balançar chocalho faz barulho).',
    marcos: [
      'Rola de barriga para cima para barriga para baixo (ou vice-versa)',
      'Alcança brinquedos com precisão usando uma ou duas mãos',
      'Interage ativamente com o espelho',
      'Apoia os braços esticados na Posição de Cobra'
    ],
    sonoAlimentacao: {
      sono: 'Regressão do sono comum (amadurecimento dos ciclos de sono adulto). Acordares noturnos frequentes.',
      alimentacao: 'Ainda apenas leite. Não iniciar papinhas antes dos 6 meses sem recomendação médica.'
    },
    atividades: [
      'Colocar brinquedos ligeiramente fora do alcance para incentivar a rolagem',
      'Ler livrinhos de pano e banho com imagens contrastantes',
      'Deixar o bebê explorar texturas com os pés e mãos'
    ],
    alertas: 'Dificuldade para rolar para nenhum dos lados, olhar estrábico constante.'
  },
  {
    id: '5m',
    rotulo: '5 Meses',
    subtitulo: '5 Meses',
    icone: '🎨',
    resumo: 'Preparação para sentar. A curiosidade está a todo vapor e os dentes começam a coçar.',
    saltos: 'Aprimoramento da distância dos objetos e coordenação motora fina inicial.',
    marcos: [
      'Senta com apoio (almofadas ou colo dos pais)',
      'Transfere objetos de uma mão para a outra',
      'Gengivas podem inchar (primeiro dentinho se aproximando)',
      'Responde pelo próprio nome virando a cabeça'
    ],
    sonoAlimentacao: {
      sono: 'Geralmente faz de 3 a 4 sonecas diárias. Estabelecer rotina de higiene do sono é fundamental.',
      alimentacao: 'Sinais de prontidão para a introdução alimentar começam a dar os primeiros indícios.'
    },
    atividades: [
      'Oferecer mordedores higienizados (alguns podem ser resfriados na geladeira)',
      'Sentar o bebê no colo virado para a sala durante contações de histórias',
      'Brincar com bolinhas de sabão para ele acompanhar o movimento'
    ],
    alertas: 'Não tenta alcançar objetos, não emite sons ou risadinhas.'
  },
  {
    id: '6-7m',
    rotulo: '6 a 7 M',
    subtitulo: '6 a 7 Meses',
    icone: '🥑',
    resumo: 'O grande marco da Introdução Alimentar (IA) e o sentar sem apoio!',
    saltos: '5º Salto: Mundo das Relações Noção de distância física (origem da ansiedade de separação).',
    marcos: [
      'Senta sozinho sem apoio das mãos por alguns minutos',
      'Apresenta todos os sinais de prontidão para introdução alimentar',
      'Emite sílabas repetitivas ("ba-ba", "da-da", "ma-ma")',
      'Usa a mão em forma de "garra" para pegar pequenos objetos'
    ],
    sonoAlimentacao: {
      sono: 'Transição para 2 a 3 sonecas diárias. A ansiedade de separação pode afetar o sono noturno.',
      alimentacao: 'Início da Introdução Alimentar (BLW ou Papas Tradicionais). Oferta constante de água potável.'
    },
    atividades: [
      'Permitir a exploração sensorial dos alimentos com as próprias mãos',
      'Brincar de "Cadê o bebê? Achou!" para aliviar a ansiedade de separação',
      'Deixar o bebê sentado no chão rodeado de brinquedos seguros'
    ],
    alertas: 'Não se sustenta sentado nem com apoio, sem interesse por comida ou estímulos.'
  },
  {
    id: '8-10m',
    rotulo: '8 a 10 M',
    subtitulo: '8 a 10 Meses',
    icone: '🦁',
    resumo: 'Engatinhar, ficar em pé apoiado nos móveis e o início da pinça fina.',
    saltos: '6º Salto: Mundo das Categorias Reconhecimento de objetos que pertencem ao mesmo grupo.',
    marcos: [
      'Engatinha (ou se arrasta/se locomove de forma autônoma)',
      'Fica em pé segurando em móveis, sofás e grades',
      'Desenvolve o movimento de pinça (polegar e indicador)',
      'Diz as primeiras palavras com significado ou acena "tchau"'
    ],
    sonoAlimentacao: {
      sono: 'Consolidação em 2 sonecas diárias (manhã e tarde). O sono pode oscilar devido ao treino de engatinhar à noite.',
      alimentacao: 'Consolidação das refeições (almoço, jantar e frutas). Alimentos com texturas mais amassadas.'
    },
    atividades: [
      'Criar um "circuito seguro" na sala com almofadas e pufes para escalar',
      'Brincadeiras de encaixar objetos grandes dentro de caixas',
      'Estimular gestos sociais: dar "tchau", bater palminhas e mandar beijo'
    ],
    alertas: 'Não consegue apoiar o peso nas pernas quando segurado, não faz contato visual.'
  },
  {
    id: '11m',
    rotulo: '11 Meses',
    subtitulo: '11 Meses',
    icone: '🎈',
    resumo: 'Passos laterais, muita autonomia e a véspera do primeiro aninho!',
    saltos: '7º Salto: Mundo das Sequências Entendimento de etapas sequenciais para atingir um objetivo.',
    marcos: [
      'Anda de lado segurando nos móveis (Cruising)',
      'Fica de pé sozinho por alguns segundos sem apoio',
      'Compreende comandos simples como "Vem cá" ou "Não"',
      'Apunhala e tenta usar a colher sozinho'
    ],
    sonoAlimentacao: {
      sono: 'Cerca de 11h a 12h de sono noturno mais 2 sonecas curtas durante o dia.',
      alimentacao: 'O bebê já pode transicionar para a comida da família (com pouco sal e temperos naturais).'
    },
    atividades: [
      'Oferecer brinquedos de empurrar (carrinhos de madeira ou andadores de empurrar)',
      'Jogar bola rolando no chão um para o outro',
      'Cantar músicas com gestos para ele imitar'
    ],
    alertas: 'Não se movimenta autonomamente no chão, indiferença total às pessoas conhecidas.'
  },
  {
    id: '1a',
    rotulo: '1 Ano',
    subtitulo: '12 Meses (1 Aninho)',
    icone: '🎂',
    resumo: 'Primeiros passos independentes, 1º aniversário e explosão de vocabulário!',
    saltos: '8º Salto: Mundo dos Programas Ações entendidas como planos flexíveis.',
    marcos: [
      'Dá os primeiros passos sem apoio',
      'Fala de 2 a 6 palavras claras (mama, papa, água, bola)',
      'Aponta com o indicador para o que deseja',
      'Imita ações do dia a dia (falar ao telefone, pentear o cabelo)'
    ],
    sonoAlimentacao: {
      sono: 'Geralmente 13h a 14h de sono total. Início da transição de 2 para 1 soneca (em alguns bebês).',
      alimentacao: 'Introdução do leite de vaca (se indicado pelo pediatra) e maior integração à mesa da família.'
    },
    atividades: [
      'Livros com abas para levantar e texturas para sentir',
      'Brinquedos de empilhar blocos e argolas',
      'Passeios ao ar livre em parques e praças'
    ],
    alertas: 'Não aponta para objetos, não fala nenhuma sílaba com intenção.'
  },
  {
    id: '1a2m',
    rotulo: '1A 2M',
    subtitulo: '1 Ano e 2 Meses',
    icone: '🚀',
    resumo: 'Andar firme, pequenas birras de frustração e muita exploração da casa.',
    saltos: 'Entendimento pleno de posse e testagem constante de limites.',
    marcos: [
      'Cinha e anda com mais firmeza e rapidez',
      'Gosta de rabiscar papéis com giz de cera grosso',
      'Entende até 50 palavras embora fale menos',
      'Inicia pequenas crises de frustração ao escutar "não"'
    ],
    sonoAlimentacao: {
      sono: 'Estabilização de 1 a 2 sonecas diárias.',
      alimentacao: 'Pode surgir a desaceleração do apetite (normal nesta fase de menor crescimento corporal).'
    },
    atividades: [
      'Oferecer papel grande e giz de cera atóxico para rabiscos livres',
      'Brincadeiras de imitação com bonecos, panos e utensílios de plástico',
      'Brinquedos de encaixar formas geométricas básicas'
    ],
    alertas: 'Perda de habilidades que já havia adquirido anteriormente.'
  },
  {
    id: '1a6m',
    rotulo: '1A 6M',
    subtitulo: '1 Ano e 6 Meses',
    icone: '🧩',
    resumo: 'Corrida, vocabulário em expansão acelerada e início do brincar simbólico.',
    saltos: '9º Salto: Princípios e Regras A criança testa causas, efeitos e reações dos adultos.',
    marcos: [
      'Corre, sobe degraus com apoio e chuta bola',
      'Vocabulário de 10 a 20 palavras ou mais',
      'Usa colher e copo aberto com derramamento mínimo',
      'Faz brincadeiras de faz de conta simples (dar de comer ao ursinho)'
    ],
    sonoAlimentacao: {
      sono: 'A maioria transiciona para 1 única soneca após o almoço (de 1h30 a 2h30).',
      alimentacao: 'Fase de seletividade alimentar infantil pode começar. Mantenha a oferta sem força ou pressão.'
    },
    atividades: [
      'Cozinha de brinquedo, comidinhas e faz de conta',
      'Brincadeiras de pular, correr em terrenos seguros e subir pequenas rampas',
      'Leitura diária apontando nome dos animais e objetos'
    ],
    alertas: 'Não fala pelo menos 6 palavras simples, não interage com os cuidadores principais.'
  },
  {
    id: '2-3a',
    rotulo: '2 a 3 Anos',
    subtitulo: '2 a 3 Anos',
    icone: '🎨',
    resumo: 'Fase da afirmação da identidade ("Terrible Twos"), frases completas e autonomia!',
    saltos: '10º Salto: Sistema de Valores Noção de si mesmo como indivíduo separado da mãe.',
    marcos: [
      'Forma frases curtas com 2 a 3 palavras ("Quer água", "Vamos passear")',
      'Início do processo de desfralde consciente (por volta dos 2 anos e meio)',
      'Pula com os dois pés juntos, anda de triclino/velotrol',
      'Expressa emoções intensas (alegria, raiva, ciúmes, empatia)'
    ],
    sonoAlimentacao: {
      sono: 'Cerca de 11h a 12h por noite. A soneca da tarde pode começar a diminuir aos 3 anos.',
      alimentacao: 'Alimentação autônoma completa. Reforço de hábitos saudáveis e mesa em família.'
    },
    atividades: [
      'Pintura a dedo, massinha de modelar e quebra-cabeças simples (3 a 6 peças)',
      'Jogos de regras simples e canções com rimas',
      'Atividades ao ar livre para gastar energia motora'
    ],
    alertas: 'Não junta duas palavras, dificuldade extrema de compreensão ou socialização.'
  }
];

export default function TimeLine() {
  const [faseAtiva, setFaseAtiva] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState('visaoGeral');
  const scrollRef = useRef(null);

  const fase = FASES[faseAtiva];

  // Função para navegar pela linha do tempo
  const handleSelectFase = (index) => {
    setFaseAtiva(index);
  };

  const handleNext = () => {
    if (faseAtiva < FASES.length - 1) setFaseAtiva(prev => prev + 1);
  };

  const handlePrev = () => {
    if (faseAtiva > 0) setFaseAtiva(prev => prev - 1);
  };

  return (
    <div style={styles.container}>
      <Navbar />
      {/* ESTILOS CSS INJETADOS PARA ANIMAÇÕES E SCROLLBAR */}
      <style>{`
        .timeline-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .timeline-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .timeline-scroll::-webkit-scrollbar-thumb {
          background: #f4a261;
          border-radius: 10px;
        }
        .timeline-node {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .timeline-node:hover {
          transform: translateY(-4px);
        }
        .tab-btn {
          transition: all 0.2s ease;
        }
        .tab-btn:hover {
          background-color: #fceade !important;
        }
      `}</style>

      {/* HEADER DA PÁGINA */}
      <div style={styles.header}>
        <h1 style={styles.tituloPagina}>Linha do tempo do bebê</h1>
        <></>
        <p style={styles.subtituloPagina}>
          Acompanhe cada salto de desenvolvimento, marcos motores, alimentação e dicas de estímulos mês a mês.
        </p>
      </div>

      {/* LINHA DO TEMPO INTERATIVA NO TOPO */}
      <div style={styles.timelineWrapper}>
        <button 
          onClick={handlePrev} 
          disabled={faseAtiva === 0}
          style={{ ...styles.navButton, opacity: faseAtiva === 0 ? 0.4 : 1 }}
        >
          ❮
        </button>

        <div className="timeline-scroll" ref={scrollRef} style={styles.timelineScroll}>
          {/* Linha conectora de fundo */}
          <div style={styles.lineBackground} />

          {FASES.map((f, idx) => {
            const isSelected = idx === faseAtiva;
            return (
              <div 
                key={f.id} 
                onClick={() => handleSelectFase(idx)}
                className="timeline-node"
                style={{
                  ...styles.nodeContainer,
                  cursor: 'pointer',
                }}
              >
                {/* Círculo do marco */}
                <div style={{
                  ...styles.nodeCircle,
                  backgroundColor: isSelected ? '#e76f51' : '#fff',
                  borderColor: isSelected ? '#e76f51' : '#f4a261',
                  color: isSelected ? '#fff' : '#2b2d42',
                  boxShadow: isSelected ? '0 6px 16px rgba(231, 111, 81, 0.4)' : '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                  <span style={{ fontSize: isSelected ? '1.4rem' : '1.1rem' }}>{f.icone}</span>
                </div>

                {/* Rótulo */}
                <span style={{
                  ...styles.nodeLabel,
                  fontWeight: isSelected ? '700' : '500',
                  color: isSelected ? '#e76f51' : '#6c757d',
                }}>
                  {f.rotulo}
                </span>
              </div>
            );
          })}
        </div>

        <button 
          onClick={handleNext} 
          disabled={faseAtiva === FASES.length - 1}
          style={{ ...styles.navButton, opacity: faseAtiva === FASES.length - 1 ? 0.4 : 1 }}
        >
          ❯
        </button>
      </div>

      {/* COMPONENTE EXPLICATIVO: GUIA DA FASE (PAINEL DINÂMICO) */}
      <div style={styles.painelCard}>
        {/* CABEÇALHO DO PAINEL */}
        <div style={styles.painelHeader}>
          <div style={styles.painelBadge}>
            <span style={{ fontSize: '2rem' }}>{fase.icone}</span>
            <div>
              <h2 style={styles.faseTitulo}>{fase.subtitulo}</h2>
              <span style={styles.faseTag}>Fase {faseAtiva + 1} de {FASES.length}</span>
            </div>
          </div>

          <p style={styles.faseResumo}>{fase.resumo}</p>
        </div>

        {/* NAVEGAÇÃO POR ABAS INTERNAS */}
        <div style={styles.tabsContainer}>
          <button 
            className="tab-btn"
            onClick={() => setAbaAtiva('visaoGeral')}
            style={{
              ...styles.tabButton,
              borderBottom: abaAtiva === 'visaoGeral' ? '3px solid #e76f51' : '3px solid transparent',
              color: abaAtiva === 'visaoGeral' ? '#e76f51' : '#6c757d',
              fontWeight: abaAtiva === 'visaoGeral' ? '700' : '500',
            }}
          >
            ✨ Marcos & Saltos
          </button>

          <button 
            className="tab-btn"
            onClick={() => setAbaAtiva('rotina')}
            style={{
              ...styles.tabButton,
              borderBottom: abaAtiva === 'rotina' ? '3px solid #e76f51' : '3px solid transparent',
              color: abaAtiva === 'rotina' ? '#e76f51' : '#6c757d',
              fontWeight: abaAtiva === 'rotina' ? '700' : '500',
            }}
          >
            🍼 Sono & Alimentação
          </button>

          <button 
            className="tab-btn"
            onClick={() => setAbaAtiva('atividades')}
            style={{
              ...styles.tabButton,
              borderBottom: abaAtiva === 'atividades' ? '3px solid #e76f51' : '3px solid transparent',
              color: abaAtiva === 'atividades' ? '#e76f51' : '#6c757d',
              fontWeight: abaAtiva === 'atividades' ? '700' : '500',
            }}
          >
            🧩 Estímulos & Brincadeiras
          </button>

          <button 
            className="tab-btn"
            onClick={() => setAbaAtiva('alertas')}
            style={{
              ...styles.tabButton,
              borderBottom: abaAtiva === 'alertas' ? '3px solid #e76f51' : '3px solid transparent',
              color: abaAtiva === 'alertas' ? '#e76f51' : '#6c757d',
              fontWeight: abaAtiva === 'alertas' ? '700' : '500',
            }}
          >
            🩺 Sinais de Alerta
          </button>
        </div>

        {/* CONTEÚDO DA ABA SELECIONADA */}
        <div style={styles.abaConteudo}>
          {abaAtiva === 'visaoGeral' && (
            <div>
              {/* Box do Salto de Desenvolvimento */}
              <div style={styles.saltoBox}>
                <h3 style={styles.boxTitulo}>🧠 Salto de Desenvolvimento / Salto Mental</h3>
                <p style={styles.boxTexto}>{fase.saltos}</p>
              </div>

              {/* Lista de Marcos Esperados */}
              <h3 style={styles.secaoSubtitulo}>📌 O que o bebê costuma fazer nesta fase:</h3>
              <ul style={styles.listaMarcos}>
                {fase.marcos.map((marco, index) => (
                  <li key={index} style={styles.itemMarco}>
                    <span style={styles.checkIcon}>✓</span>
                    <span>{marco}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {abaAtiva === 'rotina' && (
            <div style={styles.gridRotina}>
              <div style={styles.cardRotina}>
                <h3 style={styles.boxTitulo}>🌙 Sono</h3>
                <p style={styles.boxTexto}>{fase.sonoAlimentacao.sono}</p>
              </div>

              <div style={styles.cardRotina}>
                <h3 style={styles.boxTitulo}>🥣 Alimentação</h3>
                <p style={styles.boxTexto}>{fase.sonoAlimentacao.alimentacao}</p>
              </div>
            </div>
          )}

          {abaAtiva === 'atividades' && (
            <div>
              <h3 style={styles.secaoSubtitulo}>💡 Atividades e Brincadeiras Recomendadas:</h3>
              <div style={styles.gridAtividades}>
                {fase.atividades.map((ativ, idx) => (
                  <div key={idx} style={styles.cardAtividade}>
                    <span style={styles.numeroAtividade}>{idx + 1}</span>
                    <p style={styles.textoAtividade}>{ativ}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === 'alertas' && (
            <div style={styles.alertaBox}>
              <h3 style={{ ...styles.boxTitulo, color: '#c1121f' }}>⚠️ Sinais de Atenção (Consulte o Pediatra)</h3>
              <p style={styles.textoAlerta}>{fase.alertas}</p>
              <span style={styles.notaRodape}>
                * Lembre-se: cada bebê tem seu próprio ritmo de desenvolvimento. Esta guia é uma referência informativa e não substitui a consulta médica.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ESTILIZAÇÃO COMPLETA DA PÁGINA
const styles = {
  container: {
    width: '100%',
    maxWidth: '1050px',
    margin: '0 auto',
    padding: '1.5rem 1rem',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: '#2b2d42',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  tituloPagina: {
    fontSize: '2.2rem',
    color: '#2b2d42',
    marginBottom: '0.5rem',
    fontWeight: '700',
  },
  subtituloPagina: {
    fontSize: '1.05rem',
    color: '#6c757d',
    maxWidth: '650px',
    margin: '0 auto',
    lineHeight: '1.5',
  },
  
  // Linha do tempo
  timelineWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    backgroundColor: '#fff',
    padding: '1.2rem 1rem',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    marginBottom: '2rem',
    position: 'relative',
  },
  timelineScroll: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.2rem',
    overflowX: 'auto',
    padding: '1rem 0.5rem',
    width: '100%',
    position: 'relative',
    scrollBehavior: 'smooth',
  },
  lineBackground: {
    position: 'absolute',
    top: '38px',
    left: '20px',
    right: '20px',
    height: '4px',
    backgroundColor: '#fceade',
    zIndex: 0,
  },
  nodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
    minWidth: '70px',
  },
  nodeCircle: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    border: '3px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
    transition: 'all 0.3s ease',
  },
  nodeLabel: {
    fontSize: '0.82rem',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  navButton: {
    background: '#fefae0',
    border: '1px solid #f4a261',
    color: '#e76f51',
    borderRadius: '50%',
    width: '38px',
    height: '38px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // Painel explicativo
  painelCard: {
    backgroundColor: '#fff',
    borderRadius: '24px',
    padding: '2.2rem',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
    border: '1px solid #fae1dd',
  },
  painelHeader: {
    borderBottom: '1px solid #f8edeb',
    paddingBottom: '1.5rem',
    marginBottom: '1.5rem',
  },
  painelBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.8rem',
  },
  faseTitulo: {
    fontSize: '1.8rem',
    margin: 0,
    color: '#2b2d42',
  },
  faseTag: {
    fontSize: '0.85rem',
    backgroundColor: '#fceade',
    color: '#e76f51',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    fontWeight: '600',
  },
  faseResumo: {
    fontSize: '1.1rem',
    color: '#4a5568',
    lineHeight: '1.6',
    margin: 0,
  },

  // Abas
  tabsContainer: {
    display: 'flex',
    gap: '1rem',
    borderBottom: '2px solid #f8edeb',
    overflowX: 'auto',
    marginBottom: '1.5rem',
  },
  tabButton: {
    background: 'none',
    border: 'none',
    padding: '0.8rem 1rem',
    fontSize: '0.98rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  abaConteudo: {
    minHeight: '220px',
  },

  // Seções internas
  saltoBox: {
    backgroundColor: '#fff5eb',
    borderLeft: '5px solid #e76f51',
    borderRadius: '12px',
    padding: '1.2rem',
    marginBottom: '1.8rem',
  },
  boxTitulo: {
    fontSize: '1.15rem',
    margin: '0 0 0.5rem 0',
    color: '#2b2d42',
  },
  boxTexto: {
    fontSize: '1rem',
    color: '#4a5568',
    lineHeight: '1.6',
    margin: 0,
  },
  secaoSubtitulo: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#2b2d42',
  },
  listaMarcos: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
  },
  itemMarco: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.7rem',
    backgroundColor: '#f8f9fa',
    padding: '0.9rem 1.1rem',
    borderRadius: '12px',
    fontSize: '0.98rem',
    color: '#333',
    lineHeight: '1.4',
  },
  checkIcon: {
    color: '#2a9d8f',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },

  // Grid de Sono e Alimentação
  gridRotina: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  cardRotina: {
    backgroundColor: '#f8f9fa',
    borderRadius: '16px',
    padding: '1.5rem',
    border: '1px solid #edf2f7',
  },

  // Grid de Atividades
  gridAtividades: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1rem',
  },
  cardAtividade: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    backgroundColor: '#fefae0',
    padding: '1.2rem',
    borderRadius: '16px',
    border: '1px solid #f4a261',
  },
  numeroAtividade: {
    backgroundColor: '#e76f51',
    color: '#fff',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    flexShrink: 0,
  },
  textoAtividade: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#2b2d42',
    lineHeight: '1.5',
  },

  // Alertas
  alertaBox: {
    backgroundColor: '#fff0f3',
    border: '1px solid #ff4d6d',
    borderRadius: '16px',
    padding: '1.5rem',
  },
  textoAlerta: {
    fontSize: '1.05rem',
    color: '#590d22',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  notaRodape: {
    fontSize: '0.85rem',
    color: '#8d99ae',
    fontStyle: 'italic',
    display: 'block',
  }
};
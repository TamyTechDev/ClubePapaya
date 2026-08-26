import Login from "./Login";
import NavbarPublica from '../NavbarPublica';
import Footer from '../Footer';
import Banner from "../images/BEMVINDO-BANNER.png";
import "./Bemvindo.css";
import React, { useState } from 'react';

function Bemvindo() {
  const [modalAbeto, setModalAberto] = useState(false);
  const [indicacao, setIndicacao] = useState({
    nome: '',
    email: '',
    telefone: '',
    descricao: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmitConvidados = (e) => {
    e.preventDefault();
    // Futura integração com Supabase ou envio de e-mail
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setModalAberto(false);
      setIndicacao({ nome: '', email: '', telefone: '', descricao: '' });
    }, 2000);
  };

  return (
    <div className="landing-page">
      {/* Navbar Pública */}
      <NavbarPublica onOpenModal={() => setModalAberto(true)} />

      {/* Seção Hero / Banner principal com Form de Login */}
      <section className="hero-section">
        <div className="banner-wrapper">
          <img src={Banner} alt="Não carregue o mundo sozinha" className="banner-img" />
          <div className="login-container">
            <Login />
          </div>
        </div>
      </section>

      {/* Seção Banner de Propósito */}
      <section id="proposito" className="proposito-section">
        <div className="proposito-banner">
          <h2>Nosso Propósito</h2>
          <p>
            Construir uma rede real de apoio para mães. Um espaço seguro para trocar experiências, 
            buscar ajuda, encontrar produtos infantis de forma sustentável e não materna em solitude.
          </p>
        </div>
      </section>

      {/* Seção Sobre o Clube Papaya */}
      <section id="sobre" className="sobre-section">
        <div className="sobre-content">
          <h2>Sobre o Clube Papaya</h2>
          <p>
            O Clube Papaya nasceu do desejo de conectar mães que vivem os desafios e as alegrias da maternidade real. 
            Aqui você encontra um feed acolhedor, troca de materiais e peças no nosso Bazar, conteúdos práticos 
            no nosso Guia e uma comunidade pronta para te ouvir.
          </p>
        </div>
      </section>

      {/* Modal de Indicação de Convidados */}
      {modalAbeto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-fechar" onClick={() => setModalAberto(false)}>✕</button>
            <h3>Indicar Profissional Infantil</h3>
            <p>Conhece alguém incrível que gostaria de ver dando uma aula ou escrevendo um artigo no Clube?</p>
            
            {enviado ? (
              <div className="alerta-sucesso">Indicação enviada com sucesso! Obrigada 🎉</div>
            ) : (
              <form onSubmit={handleSubmitConvidados} className="form-convidados">
                <input 
                  type="text" 
                  placeholder="Nome do profissional" 
                  required 
                  value={indicacao.nome}
                  onChange={(e) => setIndicacao({...indicacao, nome: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="E-mail de contato" 
                  required 
                  value={indicacao.email}
                  onChange={(e) => setIndicacao({...indicacao, email: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="Telefone / WhatsApp" 
                  value={indicacao.telefone}
                  onChange={(e) => setIndicacao({...indicacao, telefone: e.target.value})}
                />
                <textarea 
                  placeholder="O que essa pessoa faz e por que seria interessante para o Clube?" 
                  rows="3" 
                  required
                  value={indicacao.descricao}
                  onChange={(e) => setIndicacao({...indicacao, descricao: e.target.value})}
                ></textarea>
                <button type="submit" className="btn-papaya">Enviar Indicação</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Rodapé completo */}
      <Footer />
    </div>
  );
}

export default Bemvindo;
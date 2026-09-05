import React from "react";
import NavbarPublica from "../NavbarPublica";
import NavbarArticle from "./NavbarArticle";
import BannerADSCard from "./BannerADSCard";
import RelatedPosts from "./RelatedPosts";
import SideBar from "./Sidebar";
import Footer from "../Footer";
import ConvidadosCard from "./ConvidadosCard";

function Convidados() {
    // Lista completa de convidados com suas respectivas descrições
    const listaConvidados = [

      { 
       id: 1, 
       nome: "Luísa Henriqueta", 
       foto: "https://res.cloudinary.com/dpynm0sf/image/upload/v1788632533/Captura_de_tela_2026-09-05_152146.png", 
       bio: " Mãe de 3 | Autora de Lampada do sono | Neurodesign do Sono" 
            
      },
      { 
        id: 2, 
        nome: "Jane Tinen", 
        foto: "https://res.cloudinary.com/dpynm0sf/image/upload/v1788632315/Foto_JAne.png", 
        bio: "Mãe de 3 | Empreendedora | Direito Empresarial & Neurociência" 
      },
      { 
        id: 3, 
        nome: "Clediane Lemos", 
        foto: "https://res.cloudinary.com/dpynm0sf/image/upload/v1788632393/benji.png", 
        bio: "Mãe de 1 | Empreendedora da Benji Cakes | Psicológa." 
      },
      

      { 
        id: 4, 
        nome: "Patricia Temponi Lopes", 
        foto: "https://res.cloudinary.com/dpynm0sf/image/upload/v1788630756/WhatsApp_Image_2026-09-01_at_15.29.11.jpg", 
        bio: "Mãe de 2 | Empreendedora da Terrarimns Quero Mais Verde | Corretora de imóveis" 
      },
       { 
        id: 5, 
        nome: "Simone Batista", 
        foto: "", 
        bio: " Mãe de 2 | Empreendedora e Artesã no Estrelas da Si ." 
      },     
    ];

    return (
        <>
            <NavbarPublica />
            <NavbarArticle />
            
            <div className="layout-grid" style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
                <BannerADSCard />
                
                <div className="conteudo-com-sidebar" style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
                    <main className="conteudo-principal" style={{ flex: 1 }}>

                      <h1> Conheça nossas colunistas convidadas</h1>
                        
                        {/* Renderiza todos os cards iterando pela lista */}
                        {listaConvidados.map((autor) => (
                            <ConvidadosCard key={autor.id} autor={autor} />
                        ))}

                        <RelatedPosts />
                    </main>

                    {/* Sidebar */}
                    <SideBar />
                </div>

                {/* Banner Inferior */}
                <BannerADSCard />
            </div>

            <Footer />
        </>
    );
}

export default Convidados;
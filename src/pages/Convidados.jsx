import NavbarPublica from "../NavbarPublica";
import NavbarArticle from "./NavbarArticle";
import PageBody from "./PageBody";
import BannerADSCard from "./BannerADSCard"

import RelatedPosts from "./RelatedPosts"
import SideBar from "./Sidebar"
import Footer from "../Footer"

function Convidados (){
    return (
<>
<div className="navbar-publica">
    <NavbarPublica/>
    <NavbarArticle/>
      <div className="layout-grid">
            <BannerADSCard />
            <div className="conteudo-com-sidebar">
              <main className="conteudo-principal">
                {/* Formatação do corpo da pagina convidados */}
                
                <PageBody/>
                <h1>TESTE CONVIDADOS</h1>
                <RelatedPosts />
              </main>
    
              {/* Sidebar */}
              <SideBar />
            </div>
    
            {/* Banner Inferior */}
            <BannerADSCard />
          </div>
</div>
<Footer/>
</>
    )
}
export default Convidados
import NavbarPublica from "./NavbarPublica"
import NavbarArticle from "./pages/NavbarArticle"
import PageBody from "./pages/PageBody"
import BannerADSCard from "./pages/BannerADSCard"

import RelatedPosts from "./pages/RelatedPosts"
import SideBar from "./pages/Sidebar"
import Footer from "./Footer"

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
import NavbarPublica from "../NavbarPublica"
import NavbarArticle from "./NavbarArticle"
import PageBody from "./PageBody"
import BannerADSCard from "./BannerADSCard"
import RelatedPosts from "./RelatedPosts"
import SideBar from "./Sidebar"
import Footer from "../Footer"

function Sobre(){
    return(
        <>
        <div className="navbar-publica">
            <NavbarPublica/>
            <NavbarArticle/>
              <div className="layout-grid">
                    {/* Banner Superior */}
                    <BannerADSCard />
                    
                    {/* Wrapper flex para matéria e sidebar ficarem lado a lado */}
                    <div className="conteudo-com-sidebar">
                      <main className="conteudo-principal">
                        <PageBody/>   
                        <h1>TESTE SOBRE</h1>                   
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
export default Sobre
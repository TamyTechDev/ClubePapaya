import Login from "./Login";
import Banner from "../images/BEMVINDO-BANNER.png";
import "./Bemvindo.css"

function Bemvindo(){
    return(
        <>
        <div className="banner">
            <img src={Banner} alt="Banner"/>
            <div>
                <Login/>
            </div>
        </div>
        
        </>


    )

}
export default Bemvindo;
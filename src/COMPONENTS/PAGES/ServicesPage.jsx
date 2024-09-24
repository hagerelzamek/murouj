
import Footer from "../FOOTER/Footer";
import HeaderPages from "../HeaderPages";
import Navbar from "../NAVBAR/Navbar";
import { header9 } from "../SERVICES/HeaderImgs";
import Services from "../SERVICES/Services";

function ServicesPage() {
 
    return (
      <div className="App">
        <Navbar></Navbar>
        <HeaderPages headerImg={header9}></HeaderPages>
        <Services></Services>
       
        <Footer></Footer>
       
  
      </div>
    );
  }
  
  export default ServicesPage;
  
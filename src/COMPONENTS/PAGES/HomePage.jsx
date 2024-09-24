
import About from "../ABOUT/About";
import Footer from "../FOOTER/Footer";
import Header from "../HEADER/Header";
import HowitWorks from "../HowitWorks/HowitWorks";
import Navbar from "../NAVBAR/Navbar";
import Services from "../SERVICES/Services";

function HomePage() {
 
    return (
      <div className="App">
        <Navbar></Navbar>
        <Header></Header>
      <Services></Services>
      <About></About>
      <HowitWorks></HowitWorks>
       
        <Footer></Footer>
       
  
      </div>
    );
  }
  
  export default HomePage;
  
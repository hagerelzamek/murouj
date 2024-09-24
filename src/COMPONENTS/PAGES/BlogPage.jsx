
import About from "../ABOUT/About";
import Blog from "../BlogPage/Blog";
import Footer from "../FOOTER/Footer";
import Header from "../HEADER/Header";
import HeaderPages from "../HeaderPages";
import HowitWorks from "../HowitWorks/HowitWorks";
import Navbar from "../NAVBAR/Navbar";
import { header10, header2 } from "../SERVICES/HeaderImgs";
import Services from "../SERVICES/Services";

function BlogPage() {
 
    return (
      <div className="App">
        <Navbar></Navbar>
       
        <HeaderPages headerImg={header10}></HeaderPages>
        <Blog></Blog>
        <Footer></Footer>
       
  
      </div>
    );
  }
  
  export default BlogPage;
  
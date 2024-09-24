
import Contact from "../ContactPage/Contact";
import Form from "../ContactPage/Form";
import Footer from "../FOOTER/Footer";
import HeaderPages from "../HeaderPages";
import Navbar from "../NAVBAR/Navbar";
import { header8 } from "../SERVICES/HeaderImgs";

function ContactPage() {
 
    return (
      <div className="App">
        <Navbar></Navbar>
        
        <HeaderPages headerImg={header8}></HeaderPages>
       <Contact></Contact>
       <Form></Form>
        <Footer></Footer>
       
  
      </div>
    );
  }
  
  export default ContactPage;
  
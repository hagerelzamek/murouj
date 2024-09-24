
import Mission from "../AboutPage/M&V";
import Team from "../AboutPage/Team";
import Values from "../AboutPage/Values";
import WhatWeDo from "../AboutPage/WhatWeDo";
import WhoWeAre from "../AboutPage/WhoWeAre";
import WhyChooseUs from "../AboutPage/WhyChooseUs";
import Footer from "../FOOTER/Footer";
import HeaderPages from "../HeaderPages";
import Navbar from "../NAVBAR/Navbar";
import { header7 } from "../SERVICES/HeaderImgs";

function AboutPage() {
 
    return (
      <div className="App">
        <Navbar></Navbar>
        <HeaderPages headerImg={header7}></HeaderPages>
        <WhoWeAre></WhoWeAre>
       <WhatWeDo></WhatWeDo>

       <Mission></Mission>
       <Values></Values>
       <WhyChooseUs></WhyChooseUs>
       <Team></Team>
        <Footer></Footer>
       
  
      </div>
    );
  }
  
  export default AboutPage;
  
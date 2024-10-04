

import Footer from "../FOOTER/Footer";

import HeaderPages from "../HeaderPages";
import Navbar from "../NAVBAR/Navbar";
import ServiceCard from "../SERVICES/ServiceCard";


import {cardData1} from "../SERVICES/DataArrays";
import { header1 } from "../SERVICES/HeaderImgs";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
function Service1Page() {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
    return (
      <div className="App">
       <Navbar></Navbar>
        
       <HeaderPages headerImg={header1}></HeaderPages>
       <Box sx={{ mt: 16, textAlign:{md:isRTL?'center': 'left',xs:isRTL?'center':'center'},ml:{xs:1,md:16},mr:{xs:isRTL?0:0,md:isRTL?16:0}, }}>
                <Typography 
                    variant="h3" 
                    sx={{ 
                      lineHeight:1.4,
                      fontSize:{xs:'25px',md:'50px'},
                        fontWeight: 'bold', 
                        fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                        color: '#fec62a',
                        mb: 4
                    }}>
                   {t("Management & Organization Performance")}
                </Typography>
            </Box>
        <ServiceCard cardData={cardData1} 
         description={{en:"We optimize your business performance through strategic planning, process improvements, and thorough evaluations, ensuring alignment with goals and sustainable growth.",ar:""}}/>
         <Footer></Footer>
       
  
      </div>
    );
  }
  
  export default Service1Page;
  
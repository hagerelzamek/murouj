

import Footer from "../FOOTER/Footer";

import HeaderPages from "../HeaderPages";
import Navbar from "../NAVBAR/Navbar";
import ServiceCard from "../SERVICES/ServiceCard";


import {cardData4} from "../SERVICES/DataArrays";
import { header4 } from "../SERVICES/HeaderImgs";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
function Service4Page() {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
    return (
      <div className="App">
       <Navbar></Navbar>
        
       <HeaderPages headerImg={header4}></HeaderPages>
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
                   {t("Legal & Administrative Support Services")}
                </Typography>
            </Box>
        <ServiceCard cardData={cardData4}
         description="We provide legal and administrative services to help your business maintain compliance, manage risk, and streamline operations with expert guidance." />
         <Footer></Footer>
       
  
      </div>
    );
  }
  
  export default Service4Page;
  
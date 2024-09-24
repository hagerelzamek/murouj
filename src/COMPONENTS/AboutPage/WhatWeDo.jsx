import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import a from '../ASSETS/StockCake-Business Meeting Discussion_1725112247.jpg';
import arrow from '../ASSETS/right-arrow.png'
import arrow1 from '../ASSETS/westarrow.png'
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
const serviceItems = [
  { label: 'Management & Organization Performance', path: '/services/service1' },
  { label: 'Financial & Accounting Solutions', path: '/services/service2' },
  { label: 'HR & Talent Acquisition Services', path: '/services/service3' },
  { label: 'Legal & Administrative Support Services', path: '/services/service4' },
  { label: 'IT Solution Services', path: '/services/service5' },
  { label: 'Training & Development Services', path: '/services/service6' },
];

const WhatWeDo = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  return (
    <Box> <motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
    viewport={{ once: true }}
  >
    <Typography
      variant="h3"
      sx={{
        direction:isRTL?'rtl':'ltr',
    textAlign:isRTL?'right': 'left',
    fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
        fontWeight: 'bold',
        fontSize: { xs: '30px', md: '50px' }, // Responsive font size
      
        marginTop: '2rem',
        
        margin: { xs: '3rem 2rem', md: '4rem 12rem' },
        color: '#fec62a',
      }}
    >
      {t("What We Do ?")}
    </Typography>
  </motion.div>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' } , marginTop:'3rem',}}>
        
        {/* Text Content */}
        <Grid sx={{paddingLeft:{xs:'1rem',md:'1rem'}}} item xs={12} md={8}>
         

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              sx={{
                direction:isRTL?'rtl':'ltr',
                textAlign:isRTL?'right': 'left',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                margin: { xs: '3rem 2rem', md: '0rem 12rem' },
               
                color: 'white',
                fontWeight: '400',
                fontSize: { xs: '18px', md: '20px' }, // Responsive font size
            
                lineHeight:1.4
              }}
            >
              {t("We offer a wide range of integrated consulting services, including:")}
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column', // Display items in a column
              alignItems: 'flex-start', // Align items to the left
              margin: { xs: '2rem', md: '1rem 12rem' },
            }}
          >
            {serviceItems.map((service) => (
              <Box sx={{textAlign:isRTL?'right':'left',direction:isRTL?'rtl':'ltr',}}>
              <img src={isRTL ? arrow1 : arrow} style={{width:'2%'}}></img>
              <Button
                key={service.label}
                component={Link}
                to={service.path}
                sx={{
                  direction:isRTL?'rtl':'ltr',
                  textAlign:isRTL?'right': 'left',
                  fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                  color: '#fec62a',
                
                  justifyContent: 'flex-start', // Align text to the left within the button
                  fontSize: {xs:'10px',md:'15px'}, // Adjust font size if needed
              
                  marginBottom: '0.2rem', // Add space between buttons
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#fec62a',
                  },'@media (min-width:900px) and (max-width:1400px)': {
                   fontSize:'11px'
                  },
                  
                }}
              >
                {t(service.label)}
              </Button></Box>
            ))}
          </Box>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              sx={{
                direction:isRTL?'rtl':'ltr',
                textAlign:isRTL?'right': 'left',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                margin: { xs: '3rem 2rem', md: '1rem 12rem' },
             
                color: 'white',
                fontWeight: '400',
                fontSize: { xs: '18px', md: '20px' }, // Responsive font size
         
                lineHeight:1.4
              }}
            >
              {t("We work hand in hand with our clients to understand their unique needs and develop tailored strategies that help them overcome challenges and achieve their goals. We believe that our clients' success is our success, and we strive to build long-term relationships based on trust and tangible results.")}
            </Typography>
          </motion.div>
        </Grid>

        {/* Image */}
        <Grid  item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,position:'relative',right:{xs:'0%',md:'8%'}}}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                width: { xs: '90%', md: '83%' }, // Responsive image size
                marginTop: { xs: '2rem', md: '-2rem' },
                position: 'relative',
              }}
            >
              <img
                src={a}
                style={{
                  width: '100%',
                  filter: 'brightness(70%)',
                  borderRadius: '15px', // Darken the image
                }}
                alt="Business Meeting"
              />
            </Box>
          </motion.div>
        </Grid>
        
      </Box>
    </Grid></Box>
  );
};

export default WhatWeDo;

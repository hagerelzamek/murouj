import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Computer, Security, Layers, IntegrationInstructions, Email, WhatsApp, LocationCity, Phone, LocationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
 import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n'; 
const cardData = [
/* {
    title: "Call Us",
     content: "444 55 77", 
    icon: <Link style={{color:'#fec62a',}}to=''><Phone sx={{ fontSize: '50px' }} /></Link>,
  }, */
 
  {
    title: "Message Us",
  /*   content: "WhatsApp NO", */
    icon:  <Link style={{color:'#fec62a',}}to='https://wa.link/mjavdz'><WhatsApp sx={{ fontSize: '50px' }} /></Link>,
  },
  {
    title: "Email",
    /* content: "info@murouj-businesssolutions.com", */
    icon: <Link style={{color:'#fec62a',}}to='mailto:info@murouj-businesssolutions.com'> <Email sx={{ fontSize: '50px' }} /></Link>,
  },
];

const Contact = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar'; 
  return (
    <div id='about' style={{  paddingBottom: '1rem' }}>
     {/*  <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      > */}
       {/*  <Typography
          sx={{
            fontSize: { xs: '25px', md: '32px' },
            fontFamily: 'Source Sans 3',
            marginTop: '7rem',
            fontWeight: 'bold',
            marginBottom: '4rem',
            color: '#024158',
            paddingTop: '6rem',
            textAlign: 'center',
            position: 'relative',
          }}
          variant="h4"
          gutterBottom
          align="center"
        >
          Why Choose Us?
        </Typography> */}
     {/*  </motion.div> */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
          mt: 10,
          margin: { xs: '3rem', md: '6rem 3rem' },
        }}
      >
        {cardData.map((item, index) => (
          /* <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: index * 0.2,
              ease: 'easeOut',
            }}
            viewport={{ once: true }}
          > */
            <Card
              sx={{
                 borderRadius: '5px',
                border: '1px solid #fec62a', 
                maxWidth: 400,
                width: '100%',
               /*  boxShadow: 3, */
                background: 'transparent',
                height: { xs: '200px', md: '200px' },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  color: 'white',
                }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto auto',
                    marginTop: '1rem',
                  }}
                >
                  <Box sx={{ color: '#fec62a', textAlign: 'center' }}>
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: '700',
                      fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                      marginTop: '1rem',
                      fontSize: { xs: '17px', md: '25px' },
                    }}
                    variant="h6"
                    gutterBottom
                  >
                    {t(item.title)}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                      marginBottom: '1rem',
                      fontWeight: '500',
                      fontSize: { xs: '14px', md: '18px' },
                    }}
                    variant="body1"
                  >
                    {t(item.content)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
        /*   </motion.div> */
        ))}
      </Box>
    </div>
  );
};

export default Contact;

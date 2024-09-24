import React from 'react';
import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import footer from '../ASSETS/footer.jpg';
import logo from '../ASSETS/murouj.png';
import { Email, Facebook, Instagram, LinkedIn, LocationOn, Phone, WhatsApp, X } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About us', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

const serItems = [
 
  { label: 'Management & Organization Performance', path: '/services/service1' },
  { label: 'Financial & Accounting Solutions', path: '/services/service2' },
  { label: 'HR & Talent Acquisition Services', path: '/services/service3' },
  { label: 'Legal & Administrative Support Services', path: '/services/service4' },
  { label: 'IT Solution Services', path: '/services/service5' },
  { label: 'Training & Development Services', path: '/services/service6' },
];

const Footer = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm('service_a05qidh', 'template_zjmkbb2', form.current, {
        publicKey: '65dQCqN3bLGI2UJR-',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  return (
   <> <Box
      id="footer"
      sx={{
        position: 'relative',
        width: '100%',
        height: 'auto',
      /*   display: 'flex', */
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        marginTop: '7rem',
        direction:isRTL?'rtl':'ltr',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${footer})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '70px 70px 0px 0px',
          filter: 'brightness(30%)',
          zIndex: -2,
          marginBottom: '5rem',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          marginBottom: '2rem',
          zIndex: -1,

        }}
      />
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{
          textAlign: { xs: 'left', md: 'left' },
          marginLeft: { xs: '0rem', md: '0rem' },
          /* '@media (min-width:900px) and (max-width:1400px)': {
            flexDirection: 'column',
            margin: '1rem auto',
            textAlign: 'left',
            justifyContent: 'left',
            alignItems: 'left',
          }, */
        }}
      >
        <Grid item xs={12} sm={12} md={3} sx={{ order: { xs: 1, md: 1, sm: 1 } }}>
          <Box
            sx={{
              width: { xs: '80%', md: '100%', sm: '50%' },
              margin: { xs: '1rem', md: '0rem', sm: 'auto' },
            }}
          >
            <img src={logo} style={{ width: '100%', height: 'auto', marginTop: '5rem' ,marginRight:'2rem'}} alt="Logo" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'center' },
              gap: '1rem',
              fontSize: { xs: '1.5rem', md: '2rem' },
              marginTop: '2rem',
              marginRight:{xs:'4rem',md:'2rem'}
            }}
          >
            <a style={{ cursor: 'pointer', textDecoration: 'none' }} href="https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fmurouj-business-solutions%2Fabout%2F%3FviewAsMember%3Dtrue">
              <LinkedIn sx={{ color: '#fec62a', fontSize: { xs: '1.5rem', md: '2rem' } }} />
            </a>
            <a style={{ cursor: 'pointer', textDecoration: 'none' }} href="https://www.instagram.com/muroujbusiness?igsh=MWhva3JlY3c5M3o0Nw%3D%3D&amp%3Butm_source=qr">
              <Instagram sx={{ color: '#fec62a', fontSize: { xs: '1.5rem', md: '2rem' } }} />
            </a>
           
            <a
              style={{ cursor: 'pointer', textDecoration: 'none' }}
              href="https://www.facebook.com/profile.php?id=61565302116134&amp%3Bsk=mentions&amp%3Bviewas=100000686899395"
            >
              <Facebook sx={{ color: '#fec62a', fontSize: { xs: '1.5rem', md: '2rem' } }} />
            </a>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3} sx={{ order: { xs: 2, md: 2, sm: 2 }, marginRight: { xs: '0rem', md: '-1rem' } }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Typography
              sx={{
                color: 'white',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                marginTop: { xs: '3rem', md: '5rem', sm: '0rem' },
                marginBottom: '1rem',
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', md: '2rem' },
                textAlign: 'center', 
                marginRight:{xs:isRTL?'1rem':'3rem',md:isRTL?'0rem':'6rem'}// Align text to the left
              }}
              variant="h5"
            >
             {t("Quick Links")}
            </Typography>
            <Typography
              sx={{
                display:'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'left',
                marginBottom: '3rem',
                textAlign:{xs:'center',md: 'left',sm:'center'},
                justifyContent: 'left',
                
              }}
            >
              {navItems.map((item) => (
                <Button   sx={{ fontFamily:isRTL?'Noto Kufi Arabic':'Poppins', color: 'white', textAlign:isRTL?'right': 'left', margin: 'auto auto' ,marginLeft:{xs:isRTL?'9rem':'7rem',md:isRTL?'9rem':'5rem',sm:'20rem'},fontSize:'0.8rem'}} key={item.label}
                component={Link}
                to={item.path}
                >
                  {t(item.label)} 
                </Button>
              ))}
            </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={12} md={3} sx={{ order: { xs: 3, md: 4, sm: 4 }, marginRight: { xs: '4rem', md: '0rem' } }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Typography
              sx={{
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                marginTop: { xs: '0rem', md: '5rem' },
                marginBottom: '1rem',
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', md: '2rem' },
                textAlign:{xs:'center',md:isRTL?'right': 'left'}, // Align text to the left
                marginLeft:{xs:isRTL?'2rem':'0rem'}
              }}
              variant="h5"
            >
              {t("Contact us")}
            </Typography>
            <Box sx={{textAlign:{xs:'center',md:isRTL?'right':'left'}}}>
           {/*  <Link style={{color:'white',textDecoration:'none'}} to=''>
            <Typography sx={{ fontFamily: 'Lato', fontSize: { xs: '0.9rem', md: '1.3rem' }, marginBottom: '1rem' }}>
              <LocationOn sx={{ color: '#fec62a', fontSize: { xs: '1.5rem', md: '1.5rem' }, marginRight: '1rem' }} />
              Kuwait City
            </Typography></Link> */}
           {/*  <Link style={{color:'white',textDecoration:'none'}} to=''>
            <Typography sx={{ fontFamily: 'Lato', fontSize: { xs: '0.9rem', md: '1rem' }, marginBottom: '1rem' }}>
              <Phone sx={{ color: '#fec62a', fontSize: { xs: '1.5rem', md: '1.5rem' }, marginRight: '1rem' }} />
              444 777 22
            </Typography></Link> */}
             <Link style={{color:'white',textDecoration:'none'}} to='https://wa.link/mjavdz'>
            <Typography sx={{  fontFamily:isRTL?'Noto Kufi Arabic':'Poppins', fontSize: { xs: '0.9rem', md: '1rem' }, marginBottom: '1rem',marginLeft:{md:isRTL?'0rem':'0rem' ,xs:isRTL?'2.5rem':'0rem'} }}>
              <WhatsApp sx={{ color: '#fec62a', fontSize: { xs: '1.5rem', md: '1.5rem' }, marginRight: '1rem',marginLeft:isRTL?'1rem':'0rem' }} />
              {t("Reach us")}
            </Typography></Link>
            <Link style={{color:'white',textDecoration:'none'}} to='mailto:info@murouj-businesssolutions.com'>
            <Typography sx={{  fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',fontSize: { xs: '0.7rem', md: '1rem' }, marginBottom: '1rem',marginLeft:{md:isRTL?'0rem':'0rem' ,xs:isRTL?'2.5rem':'0rem'} }}>
              <Email sx={{ color: '#fec62a', fontSize: { xs: '1.5rem', md: '1.5rem' }, marginRight: '1rem',marginLeft:isRTL?'1rem':'0rem' }} />
              info@murouj-businesssolutions.com
            </Typography></Link>
           </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={12} md={3} sx={{ order: { xs: 4, md: 3, sm: 3 }, marginRight: { xs: '4rem', md: '0rem' } }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >
            <Typography
              sx={{
                marginLeft:{md:isRTL?'0rem':'0rem' ,xs:isRTL?'2rem':'0rem'},
                color: 'white',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                marginTop: { xs: '2rem', md: '5rem', sm: '0rem' },
                marginBottom: '1rem',
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', md: '2rem' },
                textAlign: {xs:'center',md:isRTL?'right': 'left'}, // Align text to the left
              }}
              variant="h5"
            >
              {t("Services")}
            </Typography>
            <Typography
              sx={{
        
                flexDirection: { xs: 'column', sm: 'column' },
                gap: '0.5rem',
                alignItems:isRTL?'right': 'left',
                marginBottom: '3rem',
                textAlign: {xs:isRTL?'center':'left',md:isRTL?'right':'left',sm:'left'},
                justifyContent:isRTL?'right': 'left',
                marginLeft:isRTL?'2rem':'0rem'
              }}
            >
              {serItems.map((item) => (
                <Button sx={{  fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',color: 'white',  margin: 'auto auto',marginLeft:{xs:'0',sm:'10rem',md:'0rem'},fontSize:isRTL?'0.8rem':'0.7rem' }} key={item.label}
                component={Link}
                 to={item.path}>
                  {t(item.label)}
                </Button>
              ))}
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
      <Card component="form"
      ref={form}
      onSubmit={sendEmail}
     sx={{
       maxWidth: 1000,
       margin: 'auto auto',
       borderRadius: '10px',
       border:'1px solid #11111f',
       backgroundColor: 'rgba(0, 0, 0, 0.7)',
        // Light background
       display: 'flex',
       padding: '2rem',
       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
     // Subtle shadow for better visibility
     }}
   >
     <Grid
       container
       spacing={2}
       columns={12}
       alignItems="center"
       justifyContent="center"
     >
         <Grid item xs={12} md={4}>
<Typography sx={{
                color: 'white',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
              textAlign:isRTL?'right':'left',
               
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', md: '2rem' },
                // Align text to the left
              }}
              variant="h4">{t("Subscribe to NewsLetter")}</Typography>
         </Grid>
        
       <Grid item xs={12} md={6}>
      
         <TextField
           placeholder= "Email"
           label="email"
           name="user_email"
           type="email"
           fullWidth
           sx={{
            '& .MuiOutlinedInput-root': {
     '& fieldset': {
       borderColor: 'white',
       borderRadius:'10px' // No border by default
     },
     '&:hover fieldset': {
       borderColor: 'white', // No border on hover
     },
     '&.Mui-focused fieldset': {
       borderColor: 'white', // No border on focus
     },
   },
   '& .MuiInputLabel-root': {
     color: 'grey', // Label color by default
     transform: 'translate(16px, 16px) scale(1)', // Position label when not focused
   },
   '& .MuiInputLabel-root.Mui-focused': {
     color: 'white', // Label color when focused
     transform: 'translate(14px, -18px) scale(0.75)', // Adjust label position when focused
   },
           }}
         />
       </Grid>
       <Grid item xs={12} md={2}>
         <Button  type="submit"
           sx={{
            /*  fontFamily: isRTL?'El Messiri':  'Raleway', */
             fontSize: { xs: '12px', md: '15px' },
             width: '100%',
             backgroundColor: '#fec62a',
             borderRadius: '10px',
             color: '#11111f',
             fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
             padding: { xs: '0.8rem', md: '1rem' },
             fontWeight: '400',
             border: '1px solid #fec62a',
             '&:hover': {
               backgroundColor: '#fec62a',
               border: '1px solid #fec62a',
             },
           }}
         >
           {t("Subscribe")} 
         </Button>
       </Grid>
     </Grid>
   </Card>
   <Box><Typography
            sx={{
              fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
              color: 'white',
              paddingBottom:'1rem',
              paddingRight: '2rem',
              marginTop: '1rem',
             /*  fontFamily: isRTL?'El Messiri':  'Raleway', */
              marginLeft: { xs: '2rem', md: '0.5rem' }
            }}
          >
           {t("© 2024 Murouj Business Solutions. All Rights Reserved.")} <span style={{ textDecoration: 'underline',
              marginLeft: { xs: '3rem', md: '0.5rem' }}}>{t("Privacy Policy")}</span></Typography>
          </Box>
    </Box>
    
   </>
  );
};

export default Footer;

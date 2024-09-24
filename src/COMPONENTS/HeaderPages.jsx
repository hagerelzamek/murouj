import React from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import imgheader from '../COMPONENTS/ASSETS/photo_5933935333529993385_y.jpg';
import { Link, useLocation } from 'react-router-dom';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const titleMapping = {
  '/': 'Home',
  '/about': 'About Us',
  '/contact': 'Contact Us',
  '/services': 'Services',
  '/blog':'Blog', // Added mapping for base path
  '/services/service6': 'Training & Development Services',
  '/services/service1': 'Management & Organization Performance',
  '/services/service2': 'Financial & Accounting Solutions',
  '/services/service3': 'HR & Talent Acquisition Services',
  '/services/service4': 'Legal & Administrative Support Services',
  '/services/service5': 'IT Solution Services',
};

const HeaderPages = ({headerImg}) => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Construct currentPath from pathnames
  const currentPath = pathnames.length ? `/${pathnames.join('/')}` : '/';
  const basePath = `/${pathnames[0]}`; // Handle base path

  // Map path to title, check for exact and base paths
  const currentPage = titleMapping[currentPath] || titleMapping[basePath] || 'Page Title';

  console.log('Current Path:', currentPath); // Debugging line
  console.log('Base Path:', basePath); // Debugging line
  console.log('Current Page Title:', currentPage); // Debugging line

  return (
    <Box>
    <Box
      sx={{
        position: 'relative',
        height: '500px',
        display: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        borderRadius: '0px 0px 0px 0px',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${headerImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(80%)',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%)',
          zIndex: -1,
        },
      }}
      
    
    >
      <Box sx={{ margin:{md: '15rem auto auto 2rem ',xs: '12rem auto auto 1rem '}, textAlign:'center', justifyContent:'center', alignItems:'center',direction :isRTL ? 'rtl' : 'ltr', }}>
        <Typography
          variant="h4"
          sx={{
            lineHeight:1.4,
            color: '#fec62a',
            fontWeight: 'bold',
            fontSize: { xs: '24px', md: '50px' },
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
            marginBottom: '4rem',
            marginRight:'2rem',
            
          }}
        >
          {t(currentPage)}
        </Typography>
        
        <Breadcrumbs
          sx={{
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
            justifyContent: 'center', 
            alignItems: 'center', 
            textAlign: 'center', 
            margin: 'auto',
            fontSize: { xs: '20px', md: '25px' },
            marginRight:isRTL?'2rem':'0rem'
          }}
          separator={
            isRTL ? (
              <NavigateBefore fontSize="large" sx={{ color: '#fec62a' }} />
            ) : (
              <NavigateNext fontSize="large" sx={{ color: '#fec62a' }} />
            )
          }
          aria-label="breadcrumb"
        >
          <Link
            style={{
              color: '#fec62a',
              fontWeight: '500',
              fontSize: { xs: '18px', md: '30px' },
              fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
            }}
            to="/"
          >
            {t("Home")}
          </Link>
          {pathnames.map((value, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const title = titleMapping[routeTo] || value.charAt(0).toUpperCase() + value.slice(1);

            return isLast ? (
              <Typography
                key={index}
                sx={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: { xs: '18px', md: '25px' },
                  fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                }}
              >
                {t(title)}
              </Typography>
            ) : (
              <Link
                key={index}
                style={{
                  color: '#fec62a',
                  fontWeight: '500',
                  fontSize: { xs: '18px', md: '25px' },
                  fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                }}
                to={routeTo}
              >
                {t(title)}
                
              </Link>
              
            );
          })}
          
        </Breadcrumbs>
      </Box>

    </Box>
   </Box> 
  );
};

export default HeaderPages;

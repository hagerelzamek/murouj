import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const serviceItems = [
  { label: 'Management & Organization Performance', path: '/services/service1' },
  { label: 'Financial & Accounting Solutions', path: '/services/service2' },
  { label: 'Human Resources & Talent Acquisition Services', path: '/services/service3' },
  { label: 'Legal & Administrative Support Services', path: '/services/service4' },
  { label: 'IT Solution Services', path: '/services/service5' },
  { label: 'Training & Development Services', path: '/services/service6' },
];

const WhoWeAre = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  return (
    <Box>
      <motion.div
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
          {t("Who We Are ?")}
        </Typography>
      </motion.div>

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
            margin: { xs: '3rem 2rem', md: '1rem 12rem' },
            color: 'white',
            fontWeight: '400',
            fontSize: { xs: '18px', md: '20px' }, // Responsive font size
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
            lineHeight:1.4
          }}
        >
         {t("We are an integrated consulting firm established with the aim of providing innovative and effective solutions to contemporary business challenges. We combine deep expertise with strategic vision to help our clients achieve success and sustainable growth in a rapidly changing business environment.")}
        </Typography>
      </motion.div>

      
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
            fontSize: { xs: '18px', md: '20px' }, // Responsive font size fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',fontFamily: 'Poppins',
            lineHeight:1.4
          }}
        >
         {t("Our team consists of experts specialized in diverse fields, combining theoretical knowledge and practical experience to deliver comprehensive and customized solutions for each client.")}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default WhoWeAre;

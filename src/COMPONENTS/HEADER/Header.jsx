import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import imgheader from '../ASSETS/photo_5933935333529993385_y.jpg';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase"; // Make sure this is correctly imported

const Header = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // State to hold content fetched from Firestore
  const [content, setContent] = React.useState([]);

  // Fetch content from Firestore
  const fetchContent = async () => {
    const contentCollection = collection(db, "content"); // Replace 'content' with your Firestore collection name
    const contentSnapshot = await getDocs(contentCollection);
    const contentList = contentSnapshot.docs.map((doc) => doc.data());
    setContent(contentList);
  };

  // Fetch content on component mount
  React.useEffect(() => {
    fetchContent();
  }, []);

  return (
    <Box
      sx={{
        direction: isRTL ? 'rtl' : 'ltr',
        position: 'relative',
        height: { xs: '620px', md: '830px' },
        display: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        borderRadius: { xs: '0px 0px 0px 0px', md: '0px 0px 70px 70px' },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imgheader})`,
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
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Typography
          variant="h3"
          sx={{
            lineHeight: 1.4,
            fontWeight: 'bold',
            fontSize: { xs: '22px', md: isRTL ? '55px' : '64px', sm: '35px' },
            padding: { xs: '0rem 1rem', md: '0 10rem', sm: '0 4rem' },
            marginTop: { xs: '14rem', md: '15rem', sm: '12rem' },
            fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
            '@media (min-width: 900px) and (max-width: 1400px)': {
              marginTop: '18rem',
              fontSize: '35px',
            },
          }}
        >
          {t("Comprehensive Business Solutions for Sustainable Growth")}
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
            lineHeight: 1.4,
            fontWeight: '500',
            fontSize: { xs: '20px', md: isRTL ? '35px' : '40px', sm: '30px' },
            padding: { xs: '0re 0rem', md: '0 4rem' },
            marginTop: '3.5rem',
            marginRight: { xs: '1rem', md: '7rem' },
            marginLeft: { xs: '1rem', md: '7rem' },
            fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
            color: '#fec62a'
          }}
        >
          {t("Integrated Consulting: Management, Finance, HR, Legal and IT Solutions")}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            marginTop: '1rem',
            fontSize: { xs: '16px', md: '25px', sm: '30px' },
            padding: '0 4rem',
            margin: '1rem 4rem',
            fontFamily: 'Poppins'
          }}
        >
          {/* Partner with Murouj Business Solutions to unlock your business's full potential through expert advice and innovative strategies for sustainable success. */}
        </Typography>

        <Link to='/services'>
          <Button
            sx={{
              color: '#11111f',
              fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
              fontSize: { xs: '12px', md: '22px', sm: '18px' },
              backgroundColor: '#fec62a',
              borderRadius: '10px',
              fontWeight: 'bold',
              padding: { xs: '0.6rem 2rem', md: '1rem 2rem' },
              border: '1px solid #fec62a',
              marginTop: { xs: '2rem', md: '3rem' },
              marginRight: '0rem',
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid #fec62a',
              },
            }}
          >
            {t("Get Started")}
          </Button>
        </Link>
      </motion.div>

      {/* Display content fetched from Firestore */}
      <Box mt={4}>
        {content.map((item) => (
          <Box key={item.id} sx={{ textAlign: 'left', color: '#fff' }}>
            <Typography variant="h4">{item.title}</Typography>
            <Typography variant="body1">{item.body}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Header;

import React, { useState, useEffect } from 'react'; 
import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import imgheader from '../ASSETS/photo_5933935333529993385_y.jpg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { Edit } from '@mui/icons-material';
import { getHeaderFromDB, saveHeaderToDB, updateHeaderInDB } from '../../COMPONENTS/BlogPage/db';  // Import Firestore functions
import { auth } from '../../Firebase';  // Adjust the path as necessary
import { onAuthStateChanged } from 'firebase/auth';

const Header = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // State to control modal and typography content
  const [openModal, setOpenModal] = useState(false);
  const [selectedTypography, setSelectedTypography] = useState('');
  const [typographyContent, setTypographyContent] = useState({
    en: { header1: '', header2: '' },
    ar: { header1: '', header2: '' }
  });
  
  const [headerId, setHeaderId] = useState(null);  // Store Firestore document ID
  const [isAdmin, setIsAdmin] = useState(false);  // Track admin status
  
  // Fetch headers from Firestore on mount
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const headerData = await getHeaderFromDB();
        console.log('Fetched header data:', headerData);
  
        if (headerData.length > 0) {
          setTypographyContent({
            en: {
              header1: headerData[0].en.header1 || '',
              header2: headerData[0].en.header2 || '',
            },
            ar: {
              header1: headerData[0].ar.header1 || '',
              header2: headerData[0].ar.header2 || '',
            },
          });
  
          setHeaderId(headerData[0].id);  // Store document ID for future updates
        }
      } catch (error) {
        console.error('Error fetching header data:', error);
      }
    };
  
    fetchHeader();
  }, []);
  
  

  // Check if user is admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'murouj@work.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Open modal when edit is clicked
  // Open modal when edit is clicked
  const handleOpenModal = (typographyKey) => {
    setSelectedTypography(typographyKey);  // Set 'header1' or 'header2'
    setOpenModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTypography('');
  };

  // Handle form submission to save/update typography in Firestore
  const handleSave = async () => {
    const currentLang = i18n.language;  // Get current language ('en' or 'ar')
  
    // Ensure you update only the specific language object (en or ar)
    const updatedContent = {
      ...typographyContent,
      [currentLang]: {
        ...typographyContent[currentLang],
        [selectedTypography]: document.getElementById('typographyInput').value || '',
      },
    };
  
    // Log the updated content for debugging
    console.log('Updated content to be saved:', updatedContent);
  
    setTypographyContent(updatedContent);
  
    try {
      if (headerId) {
        // Update the Firestore document, ensuring only en/ar fields are updated
        await updateHeaderInDB(headerId, {
          [currentLang]: updatedContent[currentLang]  // Only save the updated language section
        });
      } else {
        // Save a new document if it doesn't exist
        const newId = await saveHeaderToDB(updatedContent);
        setHeaderId(newId);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving header:', error);
    }
  };
  
  
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
            {typographyContent[i18n.language].header1}

        </Typography>
        {isAdmin && <Edit onClick={() => handleOpenModal('header1')} sx={{ cursor: 'pointer', marginLeft: 2 }} />}
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
            color: '#fec62a',
          }}
        >
            {typographyContent[i18n.language].header2}

        </Typography>
        {isAdmin && <Edit onClick={() => handleOpenModal('header2')} sx={{ cursor: 'pointer', marginLeft: 2 }} />}
      </motion.div>

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

      {/* Modal for editing */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Typography
          </Typography>
          <TextField
            id="typographyInput"
            label="Edit Text"
            fullWidth
            defaultValue={typographyContent[i18n.language][selectedTypography]}
            variant="outlined"
            margin="normal"
          />
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Header;

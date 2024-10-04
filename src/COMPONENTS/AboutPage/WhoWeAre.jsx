import React from 'react';
import { Box, Typography, Button, TextField, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase';
import { Edit } from '@mui/icons-material';
import { getWhoFromDB, saveWhoToDB, updateWhoInDB } from '../BlogPage/db';

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
  const [openModal, setOpenModal] = useState(false);
  const [selectedTypography, setSelectedTypography] = useState('');
  const [typographyContent, setTypographyContent] = useState({
    en: { p1: '',p2: '' },
    ar: { p1: '',p2: '' }
  });
  
  const [whoId, setWhoId] = useState(null);  // Store Firestore document ID
  const [isAdmin, setIsAdmin] = useState(false);  // Track admin status
  
  // Fetch headers from Firestore on mount
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const headerData = await getWhoFromDB();
        console.log('Fetched who data:', headerData);
  
        if (headerData.length > 0) {
          setTypographyContent({
            en: {
             
              p1: headerData[0].en.p1 || '',
              p2: headerData[0].en.p2 || '',
            },
            ar: {
              p1: headerData[0].ar.p1 || '',
              p2: headerData[0].ar.p2 || '',
            },
          });
  
          setWhoId(headerData[0].id);  // Store document ID for future updates
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
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
      if (whoId) {
        // Update the Firestore document, ensuring only en/ar fields are updated
        await updateWhoInDB(whoId, {
          [currentLang]: updatedContent[currentLang]  // Only save the updated language section
        });
      } else {
        // Save a new document if it doesn't exist
        const newId = await saveWhoToDB(updatedContent);
        setWhoId(newId);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving about:', error);
    }
  };
  
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
        {typographyContent[i18n.language].p1} 
        </Typography>
        {isAdmin && (
    <Edit onClick={() => handleOpenModal('p1')} sx={{ cursor: 'pointer', marginLeft: 2,color:'white' }} />
  )}
 
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
         {typographyContent[i18n.language].p2} 
        </Typography>
        {isAdmin && (
    <Edit onClick={() => handleOpenModal('p2')} sx={{ cursor: 'pointer', marginLeft: 2,color:'white' }} />
  )}
      </motion.div>
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

export default WhoWeAre;

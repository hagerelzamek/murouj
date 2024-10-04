import React from 'react';
import { Box, Typography, Button, Grid, TextField, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import a from '../ASSETS/StockCake-Business Meeting Discussion_1725112247.jpg';
import arrow from '../ASSETS/right-arrow.png'
import arrow1 from '../ASSETS/westarrow.png'
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase';
import { Edit } from '@mui/icons-material';
import { getWhatFromDB, saveWhatToDB, updateWhatInDB } from '../BlogPage/db';
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
  const [openModal, setOpenModal] = useState(false);
  const [selectedTypography, setSelectedTypography] = useState('');
  const [typographyContent, setTypographyContent] = useState({
    en: {p1: '',p2: '' },
    ar: { p1: '',p2: '' }
  });
  
   const [typographyContent0, setTypographyContent0] = useState({
     en: serviceItems.map(card => ({ label: card.label, })),
     ar: serviceItems.map(card => ({ label: '' }))
   });
   
  const [whatId, setWhatId] = useState(null); 
  const [siId, setSiId] = useState(null); 
   // Store Firestore document ID
  const [isAdmin, setIsAdmin] = useState(false);  // Track admin status
  
  // Fetch headers from Firestore on mount
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const headerData = await getWhatFromDB();
        console.log('Fetched about data:', headerData);
  
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
  
          setWhatId(headerData[0].id);  // Store document ID for future updates
        }
  
        // Fetch service items if they exist
        if (headerData[0].serviceItems) {
          setTypographyContent0({
            en: headerData[0].en.serviceItems || serviceItems.map(card => ({ label: card.label})),
            ar: headerData[0].ar.serviceItems || serviceItems.map(card => ({ label: ''})),
          });
  
          setSiId(headerData[0].id);  // Set service items document ID
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
  
    // If editing a service item
    if (selectedTypography.includes('serviceItem')) {
      const serviceIndex = selectedTypography.split('_')[1];  // Get the service item index (e.g., serviceItem_0)
      
      const updatedServiceItems = [...typographyContent0[currentLang]];  // Clone current service items
      updatedServiceItems[serviceIndex].label = document.getElementById('typographyInput').value || '';  // Update the specific service item
  
      const updatedServiceItemsContent = {
        ...typographyContent0,
        [currentLang]: updatedServiceItems,
      };
  
      setTypographyContent0(updatedServiceItemsContent);
  
      try {
        if (siId) {
          // Update the Firestore document for serviceItems only
          await updateWhatInDB(siId, {
            [`${currentLang}.serviceItems`]: updatedServiceItemsContent[currentLang]
          });
        } else {
          // If serviceItems document does not exist, create a new one
          const newId = await saveWhatToDB(updatedServiceItemsContent);
          setSiId(newId);
        }
        handleCloseModal();
      } catch (error) {
        console.error('Error saving service items:', error);
      }
  
    } else {
      // For general typography content
      const updatedContent = {
        ...typographyContent,
        [currentLang]: {
          ...typographyContent[currentLang],
          [selectedTypography]: document.getElementById('typographyInput').value || '',
        },
      };
  
      setTypographyContent(updatedContent);
  
      try {
        if (whatId) {
          // Update the Firestore document, ensuring only en/ar fields are updated
          await updateWhatInDB(whatId, {
            [currentLang]: updatedContent[currentLang]  // Only save the updated language section
          });
        } else {
          // Save a new document if it doesn't exist
          const newId = await saveWhatToDB(updatedContent);
          setWhatId(newId);
        }
        handleCloseModal();
      } catch (error) {
        console.error('Error saving general content:', error);
      }
    }
  };
  
  
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
              {typographyContent[i18n.language].p1} 
               {isAdmin && (
    <Edit onClick={() => handleOpenModal('p1')} sx={{ cursor: 'pointer', marginLeft: 2,color:'white' }} />
  )}
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
  {serviceItems.map((service, index) => (
    <Box
      key={index}
      sx={{
        textAlign: isRTL ? 'right' : 'left',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <img src={isRTL ? arrow1 : arrow} style={{ width: '2%' }} alt="arrow" />
      <Button
        component={Link}
        to={service.path}
        sx={{
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
          fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
          color: '#fec62a',
          justifyContent: 'flex-start', // Align text to the left within the button
          fontSize: { xs: '10px', md: '15px' }, // Adjust font size if needed
          marginBottom: '0.2rem', // Add space between buttons
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#fec62a',
          },
          '@media (min-width:900px) and (max-width:1400px)': {
            fontSize: '11px',
          },
        }}
      >
        {/* Correctly access the service item label */}
        {typographyContent0[i18n.language]?.[index]?.label || service.label}
      </Button>
      {isAdmin && (
        <Edit
          onClick={() => handleOpenModal(`serviceItem_${index}`)}
          sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
        />
      )}
    </Box>
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
               {typographyContent[i18n.language].p2} 
        </Typography>
        {isAdmin && (
    <Edit onClick={() => handleOpenModal('p2')} sx={{ cursor: 'pointer', marginLeft: 2,color:'white' }} />
  )}
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
    </Grid>
    <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            width: '80%',
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Content
          </Typography>
          <TextField
            id="typographyInput"
            defaultValue={
              selectedTypography.includes('serviceItem')
                ? typographyContent0[i18n.language][selectedTypography.split('_')[1]]?.label
                : typographyContent[i18n.language][selectedTypography]
            }
            fullWidth
            margin="normal"
          />
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Modal></Box>
  );
};

export default WhatWeDo;

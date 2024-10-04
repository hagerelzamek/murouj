import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, Stack, Pagination, PaginationItem, TextField, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack, ArrowForward, East, Edit, West } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { onAuthStateChanged } from 'firebase/auth/cordova';
import { auth } from '../../Firebase';
import { useEffect } from 'react';
import { getScardFromDB, saveScardToDB, updateScardInDB } from '../BlogPage/db';

const ServiceCard = ({ cardData, description }) => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const itemsPerPage = 1; // Number of items per page
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(cardData.length / itemsPerPage);

  // Get the cards for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const currentCards = cardData.slice(startIndex, startIndex + itemsPerPage);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [newDescription, setNewDescription] = useState(currentDescription[i18n.language]);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTypography, setSelectedTypography] = React.useState('');

 /*  const [headerText, setHeaderText] = useState({
    en: " ",
    ar:" ", // Arabic translation
  }); */
  const [typographyContent, setTypographyContent] = useState({
    en: cardData.map(card => ({ title: card.title, content: card.content, description: description.en })),
    ar: cardData.map(card => ({ title: '', content: '', description: description.ar }))
  });
  
  
  const [cardId, setCardId] = useState(null);  // Store Firestore document ID
  const [isAdmin, setIsAdmin] = useState(false);  // Track admin status
  
  // Fetch headers from Firestore on mount
  React.useEffect(() => {
    const fetchHow = async () => {
      try {
        const howData = await getScardFromDB();
        /* if (howData.length > 0) {
          setHeaderText({
            en: howData[0].header?.en || '',
            ar: howData[0].header?.ar || '',
          }); */
          setTypographyContent({
            en: Array.isArray(howData[0].en) ? howData[0].en : cardData.map(card => ({ title: card.title, content: card.content })),
            ar: Array.isArray(howData[0].ar) ? howData[0].ar : cardData.map(card => ({ title: '', content: '' }))
          });
         
          setCardId(howData[0].id || null);
     /*    } */
      } catch (error) {
        console.error('Error fetching how data:', error);
      }
    };
    
    
    fetchHow();
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
const handleOpenModal = (typographyKey, index) => {
  setSelectedTypography({ key: typographyKey, index });
  setOpenModal(true);
};

  
  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTypography('');
  };
  const handleOpenDescriptionModal = () => {
    setSelectedTypography({ key: 'description' });
    setOpenModal(true);
  };
  
  // Handle form submission to save/update typography in Firestore
  const handleSave = async () => {
    setCurrentDescription({
      ...currentDescription,
      [i18n.language]: newDescription
    });
    handleCloseModal();
    

   /*  if (newDescription.trim() !== '') {
      setCurrentDescription({
        ...currentDescription,
        [currentLang]: newDescription
      });
    }
 */
    

    const currentLang = i18n.language;
    const { key } = selectedTypography || {};
  
    let newValue = document.getElementById('typographyInput').value;
  
    if (!newValue || newValue.trim() === '') {
      console.error('Input cannot be empty or undefined');
      return;
    }
  
    if (key) {
      const updatedContent = {
        ...typographyContent,
        [currentLang]: typographyContent[currentLang].map((card, i) => {
          if (key === 'description') {
            return { ...card, description: newValue };
          }
          return card;
        }),
      };
  
      setTypographyContent(updatedContent);
  
      try {
        if (cardId) {
          await updateScardInDB(cardId, { [currentLang]: updatedContent[currentLang] });
        } else {
          const newId = await saveScardToDB(updatedContent);
          setCardId(newId);
        }
      } catch (error) {
        console.error('Error saving services:', error);
      }
    }
  
    handleCloseModal();
  };
  
  
  
  return (
    <Box sx={{direction :isRTL ? 'rtl' : 'ltr'}}>
      <Grid container spacing={4} alignItems="center">
        {/* Service Cards */}
        <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 2 }, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              
              
              marginTop: { md: '4rem', xs: '2rem' },
              marginLeft: { xs: '1rem', md:isRTL?'8rem': '-2rem' },
              marginRight: { xs: '1rem', md:isRTL? '0rem':'6rem' },
              width: '100%', // Ensures the box takes the full width available
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {currentCards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  type: 'spring',
                  stiffness: 70,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                style={{
                  borderRadius: '15px',
                  marginBottom: '1rem',
                  maxWidth: '600px',
                  width: '100%',
                }}
              >
                <Card
                  sx={{
                    maxWidth: 600,
                    width: '100%',
                    boxShadow: 3,
                    background: 'linear-gradient(135deg, rgba(240, 240, 240, 0.7) 0%, rgba(254, 198, 42, 0.7) 100%)',
                    marginBottom: '1rem',
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src={item.icon} style={{ width: '18%' }} alt={item.title} />
                    <Box>
                      <Typography sx={{  textAlign:isRTL?'right': 'left', color: '#11111f', fontWeight: 'bold',fontSize:'18px', direction:isRTL?'rtl':'ltr',
           
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}} variant="h6" gutterBottom>
                        {typographyContent[i18n.language]?.[index]?.title || cardData[index].title}
                   {isAdmin && (
    <Edit
      onClick={() => handleOpenModal('title', index)}
      sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
    />
  )}
                  </Typography>
                      <Typography sx={{  fontFamily:isRTL?'Noto Kufi Arabic':'Poppins', textAlign:isRTL?'right': 'left', color: '#11111f',fontSize:'15px', }} variant="body1">
                      {typographyContent[i18n.language]?.[index]?.content || cardData[index].content}
                   {isAdmin && (
    <Edit
      onClick={() => handleOpenModal('content', index)}
      sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
    />
  )}
                  </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            <Stack spacing={2} sx={{ marginTop: 'auto', width: '100%' }}>
              <Pagination
                count={totalPages} // Total number of pages
                page={page} // Current page
                onChange={handleChange} // Page change handler
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBack, next: ArrowForward }}
                    {...item}
                    sx={{
                      
                      color: 'white',
                      fontSize: '24px', // Increase font size for numbers
                      display: item.type === 'page' ? 'none' : 'flex', // Hide number items
                      position: 'absolute',
                      '& .MuiPaginationItem-icon': {
                        fontSize: '36px', // Increase font size for icons
                        color: '#fec62a',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: '50px',
                        padding: '1rem', // Icon color
                      },
                      left: item.type === 'previous' ? '60px' : 'auto',
                      right: item.type === 'next' ? '60px' : 'auto',
                    }}
                  />
                )}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between', // Ensures arrows are on the edges
                  width: '100%',
                  position: 'relative', // Positioning within the parent Box
                }}
              />
            </Stack>
            <Link to='/contact'>
      <Button sx={{
        
        fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                fontSize: { xs: '12px', md: '20px' }, // Responsive font size
                backgroundColor: 'transparent',
                color:'white',
                borderRadius: '10px',
                fontWeight: 'bold',
                padding: { xs: '0.6rem 2rem', md: '1rem 2rem' }, // Responsive padding
                border: '1px solid #fec62a',
                marginTop: { xs: '4rem', md: '4rem' },
                marginRight:{xs:'1.5rem',md:'0rem'},
                '&:hover': {
                  backgroundColor: '#fec62a',
                  color: '#11111f',
                  
                  border: '1px solid #fec62a',
                  justifyContent:'flex-end',textAlign:'right'
                },
               
              }} >{t("Get Consultaion Now")} {isRTL ? (
                <West sx={{ marginRight: '0.5rem', fontSize: '20px' }} />
              ) : (
                <East sx={{ marginLeft: '0.5rem', fontSize: '20px' }} />
              )}</Button></Link>
          </Box>
        </Grid>

        {/* Description Section */}
        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 1 } }}>
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
                  margin: { xs: '3rem 2rem', md:isRTL?'-3rem 8rem 2rem 1rem': '-5rem 1rem 2rem 8rem' },
                  textAlign:isRTL?'right': 'left',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: { xs: '18px', md:isRTL?'18px': '20px' },
                  fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                  lineHeight: 1.5,
                 
                }}
              >
 
 {currentDescription[i18n.language]} {/* Dynamically display based on language */}
          {isAdmin && (
            <Edit
              onClick={handleOpenDescriptionModal}
              sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
            />
          )}
        </Typography>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
      {openModal && selectedTypography && (
  <Modal open={openModal} onClose={handleCloseModal}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" component="h2">
      {selectedTypography.key === 'description' ? t('Edit description Text') : t('Edit Text')}
      </Typography>
      <TextField
        id="typographyInput"
        label="Edit Text"
        fullWidth
        value={newDescription} // Controlled input field
              onChange={(e) => setNewDescription(e.target.value)} // Update state on input change
              variant="outlined"
        margin="normal"
      />
      <Button onClick={handleSave} variant="contained" color="primary">
        Save
      </Button>
    </Box>
  </Modal>
)}
    </Box>
  );
};

export default ServiceCard;

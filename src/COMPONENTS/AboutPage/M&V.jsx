import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Grid, Paper, Container, Divider, Button, TextField, Modal } from '@mui/material';
import { Whatshot, Build, Favorite, ThumbUp, People, TrendingUp, Assistant, Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {motion} from 'framer-motion'
import img1 from '../ASSETS/target.png'
import img2 from '../ASSETS/vision.png'
import i18n from '../../i18n';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase';
import { getMVFromDB, saveMVToDB, updateMVInDB } from '../BlogPage/db';
const cardData = [
  {
    title: "Mission",
    content: "Our mission is to deliver comprehensive consulting services that drive excellence across every aspect of our clients’ businesses. We are committed to being a trusted partner, providing tailored solutions in management, finance, human resources, legal, training, and IT, all designed to foster growth, enhance performance, and ensure long-term success.",
    icon: img1,
    mi:'-4rem',
    bg: '#fec62a',
    font : '#11111f', 
     bgi:'#11111f',
      color:'white'
     // Orange
  },
  {
    title: "Vision",
    content: "To be the leading partner for businesses across the Middle East, recognized for delivering innovative and integrated solutions that empower organizations to achieve sustainable success. We aspire to set the standard for excellence in consulting by continuously evolving with industry trends, fostering long-term partnerships, and driving growth for our clients through unmatched expertise and a deep commitment to their success.",
    icon: img2,
    mi:'-6rem',
    bg: '#F6F6F6', 
    font : '#11111f', 
    bgi:'#11111f',
    color:'white'// Green
  },
  
];

const Mission = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTypography, setSelectedTypography] = React.useState('');

 /*  const [headerText, setHeaderText] = useState({
    en: " ",
    ar:" ", // Arabic translation
  }); */
  const [typographyContent, setTypographyContent] = useState({
    en: cardData.map(card => ({ title: card.title, content: card.content })),
    ar: cardData.map(card => ({ title: '', content: '' }))
  });
  
  const [mvId, setMvId] = useState(null);  // Store Firestore document ID
  const [isAdmin, setIsAdmin] = useState(false);  // Track admin status
  
  // Fetch headers from Firestore on mount
  React.useEffect(() => {
    const fetchHow = async () => {
      try {
        const howData = await getMVFromDB();
        /* if (howData.length > 0) {
          setHeaderText({
            en: howData[0].header?.en || '',
            ar: howData[0].header?.ar || '',
          }); */
          setTypographyContent({
            en: Array.isArray(howData[0].en) ? howData[0].en : cardData.map(card => ({ title: card.title, content: card.content })),
            ar: Array.isArray(howData[0].ar) ? howData[0].ar : cardData.map(card => ({ title: '', content: '' }))
          });
          setMvId(howData[0].id || null);
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
  const handleOpenHeaderModal = () => {
    setSelectedTypography({ key: 'header' });
    setOpenModal(true);
  };
  // Handle form submission to save/update typography in Firestore
  const handleSave = async () => {
    const currentLang = i18n.language;
    const { key, index } = selectedTypography || {};
  
    let newValue = document.getElementById('typographyInput').value;
  
    // Ensure that the new value is defined and not an empty string
    if (!newValue || newValue.trim() === '') {
      console.error('Input cannot be empty or undefined');
      return;
    }
  
    if (key && index !== undefined) {
      // Handle card text updates
      const updatedContent = {
        ...typographyContent,
        [currentLang]: typographyContent[currentLang].map((card, i) =>
          i === index ? { ...card, [key]: newValue } : card
        ),
      };
  
      setTypographyContent(updatedContent);
  
      try {
        if (mvId) {
          await updateMVInDB(mvId, { [currentLang]: updatedContent[currentLang] });
        } else {
          const newId = await saveMVToDB(updatedContent);
          setMvId(newId);
        }
      } catch (error) {
        console.error('Error saving services:', error);
      }
    }
  
    handleCloseModal();
  };
  
  
  
  
  return (
    <>
      
   
    <Box
      sx={{
        direction:isRTL?'rtl':'ltr',
                
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
        mt: 10,
        margin:{xs:'1rem',md:'4rem'},
  
      }}
    >
      
      {cardData.map((item, index) => (
        <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: index * 0.4,
          ease: 'easeOut',
        }}
        viewport={{ once: true }}
      >
        <Card key={index} sx={{ maxWidth: 550, width: '100%',height:{sm:'220px',md:isRTL?'250px':'300px'}, boxShadow: 3,backgroundColor:item.bg,direction:isRTL?'rtl':'ltr',
                textAlign:isRTL?'right': 'left',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}}>
          <CardContent
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
             
              color: item.font,
            
            }}
          >
            <img src={item.icon} style={{width:'10%',marginTop:item.mi}}/>
            <Box>
              <Typography sx={{fontWeight:'800',fontFamily: /* isRTL?'El Messiri':  */ 'Poppins',marginTop:'1rem',fontSize:{xs:'20px',md:'25px',textAlign:isRTL?'right': 'left',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',}}} variant="h5" gutterBottom>
                {typographyContent[i18n.language]?.[index]?.title || cardData[index].title}
                   {isAdmin && (
    <Edit
      onClick={() => handleOpenModal('title', index)}
      sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
    />
  )}
                  </Typography>
              <Typography sx={{textAlign:isRTL?'right': 'left',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',marginBottom:'1rem',fontWeight:'500',marginRight:{xs:'0rem',md:isRTL?'0rem':'2rem'},fontSize:{xs:'12px',md:'15px'}}} variant="body1">
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
        </Card></motion.div>
      ))}
   
    </Box>
    {openModal && selectedTypography && (
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
      {selectedTypography.key === 'header' ? t('Edit Header Text') : t('Edit Text')}
      </Typography>
      <TextField
        id="typographyInput"
        label="Edit Text"
        fullWidth
        defaultValue={ typographyContent[i18n.language][selectedTypography.index][selectedTypography.key]}
        variant="outlined"
        margin="normal"
      />
      <Button onClick={handleSave} variant="contained" color="primary">
        Save
      </Button>
    </Box>
  </Modal>
)}
    </>
  );
};

export default Mission;

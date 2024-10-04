import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardContent, Grid, Modal, TextField } from '@mui/material';
import a from '../ASSETS/alert (10).png';
import {motion} from 'framer-motion'
import { useTranslation } from 'react-i18next'; 
import i18n from '../../i18n';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase';
import { Edit } from '@mui/icons-material';
import { getValuesFromDB, saveValuesToDB, updateValuesInDB } from '../BlogPage/db';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: '1px solid black',
  borderRadius: 10,
  marginBottom: 16,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  '&:before': {
    display: 'none',
  },
  '&:first-of-type': {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  '&:last-of-type': {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(() => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: 8,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 16,
  borderTop: '1px solid rgba(0, 0, 0, 0.125)',
  fontFamily: 'Poppins',
}));




const Image = styled('img')({
  width: '70%',
  height: 'auto',
  borderRadius: 8,
});

const accordionData = [
  {
    id: 'panel1',
    title: 'Integrity',
    content: 'We uphold the highest standards of honesty and transparency in all our interactions, building trust with our clients and partners through ethical business practices',
  },
  {
    id: 'panel2',
    title: 'Excellence',
    content: 'We are committed to delivering the highest quality of service, continuously striving for excellence in every project we undertake and ensuring our solutions meet the highest standards.',
  },
  {
    id: 'panel3',
    title: 'Innovation',
    content: 'We embrace creativity and forward-thinking, driving innovation to offer cutting-edge solutions that keep our clients ahead in a constantly evolving business landscape.',
  },
  {
    id: 'panel4',
    title: 'Partnership',
    content: 'We believe in the power of collaboration, working closely with our clients as trusted partners to understand their needs and deliver tailored solutions that drive their success',
  },
  {
    id: 'panel5',
    title: 'Customer-Centricity',
    content: 'Our clients are at the heart of everything we do. We are dedicated to understanding their unique challenges and providing personalized services that exceed their expectations.',
  },
  {
    id: 'panel6',
    title: 'Sustainability',
    content: 'We are committed to fostering sustainable growth for our clients, offering solutions that are not only effective today but also build a strong foundation for the future.',
  },
  {
    id: 'panel7',
    title: 'Continuous Improvement',
    content: 'We believe in the importance of learning and growth, both for our clients and ourselves. We continually seek to enhance our knowledge, skills, and services to provide the best possible outcomes',
  },
];

export default function Values() {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar'; 
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTypography, setSelectedTypography] = React.useState('');

 /*  const [headerText, setHeaderText] = useState({
    en: " ",
    ar:" ", // Arabic translation
  }); */
  const [typographyContent, setTypographyContent] = useState({
    en: accordionData.map(card => ({ title: card.title, content: card.content })),
    ar: accordionData.map(card => ({ title: '', content: '' }))
  });
  
  const [valuesId, setValuesId] = useState(null);  // Store Firestore document ID
  const [isAdmin, setIsAdmin] = useState(false);  // Track admin status
  
  // Fetch headers from Firestore on mount
  React.useEffect(() => {
    const fetchHow = async () => {
      try {
        const howData = await getValuesFromDB();
        /* if (howData.length > 0) {
          setHeaderText({
            en: howData[0].header?.en || '',
            ar: howData[0].header?.ar || '',
          }); */
          setTypographyContent({
            en: Array.isArray(howData[0].en) ? howData[0].en : accordionData.map(card => ({ title: card.title, content: card.content })),
            ar: Array.isArray(howData[0].ar) ? howData[0].ar : accordionData.map(card => ({ title: '', content: '' }))
          });
          setValuesId(howData[0].id || null);
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
        if (valuesId) {
          await updateValuesInDB(valuesId, { [currentLang]: updatedContent[currentLang] });
        } else {
          const newId = await saveValuesToDB(updatedContent);
          setValuesId(newId);
        }
      } catch (error) {
        console.error('Error saving services:', error);
      }
    }
  
    handleCloseModal();
  };
  
  
  
  return (
   <>
    <Typography
    variant="h3"
    sx={{
      textAlign:isRTL?'right': 'left',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
      fontWeight: 'bold',
      fontSize: { xs: '30px', md: '50px' }, // Responsive font size
      
      marginTop: '2rem',
      
      margin: { xs: '3rem 2rem', md:isRTL?'8rem 12rem 2rem 0rem': '8rem 0rem 2rem 12rem' },
      color: '#fec62a',
    }}
  >
    {t("Our Core Values")}
  </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
          <Box sx={{ marginLeft: { xs: '1rem', md: '10rem' }, marginRight: { xs: '1rem', md: '0rem' } , direction:isRTL?'rtl':'ltr' }}>
            {accordionData.map((panel, index) => (
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
              sx={{
                borderRadius: '15px',
                maxWidth: { xs: 400, md: 300 },
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Accordion
                key={panel.id}
                expanded={expanded === panel.id}
                onChange={handleChange(panel.id)}
              >
                <AccordionSummary aria-controls={`${panel.id}-content`} id={`${panel.id}-header`}>
                  <Typography sx={{ textAlign:isRTL?'right': 'left',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins', fontWeight: 'bold', direction:isRTL?'rtl':'ltr'  }}>  {typographyContent[i18n.language]?.[index]?.title || accordionData[index].title}
                {isAdmin && (
 <Edit
   onClick={() => handleOpenModal('title', index)}
   sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
 />
)}
               </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ textAlign:isRTL?'right': 'left',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins' , direction:isRTL?'rtl':'ltr' }}> {typographyContent[i18n.language]?.[index]?.content || accordionData[index].content}
                {isAdmin && (
 <Edit
   onClick={() => handleOpenModal('content', index)}
   sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
 />
)}
               </Typography>
                </AccordionDetails>
              </Accordion></motion.div>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
  <Box 
    sx={{ 
      marginTop:{xs:'4rem',md:'0rem'},
      position: 'relative', // Make the container relative
      marginLeft: { md: '1rem', sm: '10rem', xs: '2rem' },
      marginRight:{xs:'2rem' ,md:'2rem'} 
    }}
  > <motion.div
  initial={{ x: -100, opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  transition={{ duration: 1.2, ease: 'easeOut' }}
  viewport={{ once: true }}
>
  <Box sx={{width:{xs: '100%',md:'100%'}}}>
    <Image 
      src={a} 
      style={{
        width:'82%', 
        marginRight: '12rem',
        filter: 'brightness(80%)',
        borderRadius:'20px' // Darken the image
      }} 
    /></Box>
    {/* <Typography
      variant="h2"
      sx={{
        position: 'absolute',
        top: '50%',
        left: {xs:'48%',md:'46%'},
        transform: 'translate(-50%, -50%)',
        color: '#fec62a', // White text for contrast
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        fontSize:{xs:'18px',md:'40px'}
      // Use your preferred font
      }}
    >
      Core Values
    </Typography> */}</motion.div>
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
)}</>
    
  );
}

import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button, Card, Modal, TextField, useMediaQuery } from '@mui/material';
import { ArrowDropDown, ArrowRightAlt, East, Edit, West } from '@mui/icons-material';
import { motion } from 'framer-motion';

import img1 from '../ASSETS/1 (1).png'
import img2 from '../ASSETS/2 (1).png'
import img3 from '../ASSETS/3 (1).png'
import img4 from '../ASSETS/4 (1).png'
import img5 from '../ASSETS/5 (1).png'
import img6 from '../ASSETS/6 (1).png'
import img7 from '../ASSETS/7 (1).png'
import img8 from '../ASSETS/8 (1).png'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase';
import { getHowFromDB, saveHowToDB, updateHowInDB } from '../../COMPONENTS/BlogPage/db';





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Raleway',
}));

const NumberIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#2F2F2F',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
  marginBottom: '1rem',
}));



const accordionData = [
    {
        id: 'panel0',
        
      },
    {
      id: 'panel1',
      title: 'Initial Consultation',
      
      content:"Understanding Your Needs: We start with a comprehensive consultation to understand your business objectives, challenges, and requirements. This helps us tailor our solutions to meet your specific needs.",
      img: img1,
    },
    {
      id: 'panel2',
      title: 'Proposal Development',
      content:"Customized Solutions: Based on our consultation, we develop a detailed proposal outlining our recommended services, strategies, and deliverables. This proposal includes timelines, costs, and key milestones.",
      img: img2,
    },
    {
      id: 'panel3',
      title: 'Agreement & Planning',
      content: "Formalizing the Partnership: Once you review and approve the proposal, we finalize the agreement and create a detailed project plan. This plan includes specific goals, deliverables, and a timeline for implementation.",
      img: img3,
    },
    {
      id: 'panel4',
      title: 'Execution & Implementation',
      content:"Delivering Results: Our team begins working on the agreed-upon services, ensuring that each aspect of the project is executed according to the plan. We keep you informed of progress and any developments.",
      img: img4,
    },
    {
      id: 'panel5',
      title: 'Regular Updates & Communication',
      content:"Ongoing Engagement: We provide regular updates and maintain open communication throughout the project. Your feedback is crucial, and we make adjustments as needed to ensure alignment with your goals.",
      img: img5,
    },
    {
      id: 'panel6',
      title: 'Review & Feedback',
      content:
          "Assessing Outcomes: Upon completion of the project, we conduct a thorough review to assess the results and gather your feedback.This helps us measure success and identify areas for improvement.",
          img: img6,
    },
    {
      id: 'panel7',
      title: 'Continuous Support',
      content:
          
        "Long-Term Partnership: We offer ongoing support and follow-up services to address any additional needs or questions you may have. Our goal is to ensure your continued success and satisfaction.",
      img: img7,
    },{
      id: 'panel8',
      title: 'Final Report & Recommendations',
      content:
         
        "Comprehensive Summary: We provide a final report summarizing the outcomes, lessons learned, and recommendations for future actions. This report helps you understand the impact of our services and how to build on the results.",
      img: img8,
    },
  ];

  const BoldTextBeforeColon = ({ text, isRTL }) => {
    const validText = typeof text === 'string' ? text : ''; // Ensure text is a string
    const parts = validText.split(':');
    
    return (
      <Typography
        sx={{
          textAlign: isRTL ? 'right' : 'left',
          color: 'white',
          marginRight: '0rem',
          fontSize: { xs: '13px', md: '15px' },
          fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
        }}
      >
        <span style={{ fontWeight: 'bold', color: '#fec62a', fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins' }}>
          {parts[0]}
        </span>
        {parts[1] && <span>{`: ${parts[1]}`}</span>}
      </Typography>
    );
  };
  
  
export default function HowitWorks() {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
    const items = [1, 2, 3, 4, 5, 6]; // Example items
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedTypography, setSelectedTypography] = React.useState('');
  
    const [headerText, setHeaderText] = useState({
      en: " ",
      ar:" ", // Arabic translation
    });
    const [typographyContent, setTypographyContent] = useState({
      en: accordionData.map(card => ({ title: card.title, content: card.content })),
      ar: accordionData.map(card => ({ title: '', content: '' }))
    });
    
    const [howId, setHowId] = useState(null);  // Store Firestore document ID
    const [isAdmin, setIsAdmin] = useState(false);  // Track admin status
    
    // Fetch headers from Firestore on mount
    React.useEffect(() => {
      const fetchHow = async () => {
        try {
          const howData = await getHowFromDB();
          if (howData.length > 0) {
            setHeaderText({
              en: howData[0].header?.en || '',
              ar: howData[0].header?.ar || '',
            });
            setTypographyContent({
              en: Array.isArray(howData[0].en) ? howData[0].en : accordionData.map(card => ({ title: card.title, content: card.content })),
              ar: Array.isArray(howData[0].ar) ? howData[0].ar : accordionData.map(card => ({ title: '', content: '' }))
            });
            setHowId(howData[0].id || null);
          }
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
          if (howId) {
            await updateHowInDB(howId, { [currentLang]: updatedContent[currentLang] });
          } else {
            const newId = await saveHowToDB(updatedContent);
            setHowId(newId);
          }
        } catch (error) {
          console.error('Error saving services:', error);
        }
      }
    
      handleCloseModal();
    };
    
    
    
    
    
    
    // Use the useMediaQuery hook to check screen size
    const isMediumScreen = useMediaQuery('(min-width: 900px) and (max-width: 1350px)');
    const handleApplyClick = () => {
        window.open('https://form.typeform.com/to/hrzWZ2Rz?typeform-source=www.impactusbh.com', '_blank', 'noopener,noreferrer');
      };
  return (
    <Box id='services' sx={{ flexGrow: 1, marginLeft: { xs: '1rem', md: '1rem' }, marginRight: { xs: '1rem', md: '1rem' } ,marginTop:isRTL?'-8rem':'-12rem', direction :isRTL ? 'rtl' : 'ltr','@media (min-width: 900px) and (max-width: 1400px)': {
                
                  marginTop:'2rem'},
                }}>
      
       
      
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 6, md: 12 }}>
     
        {

accordionData.map((item, index) => (
 
          <Grid item xs={12} sm={6}  md={isMediumScreen ? 6 : 4}  key={index} sx={{ position: 'relative', marginTop: '30px', }}> <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
          viewport={{ once: true }}
        >
            <Card sx={{ height: 290, boxShadow: index === 0 ? 'none' : '', padding: index === 0 ? '0rem' : '', backgroundColor: index === 0 ? 'transparent' : 'transparent',border: index === 0 ? '1 px solid transparent' : '1px solid #FEC62A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '15px', marginBottom: '-2rem',direction :isRTL ? 'rtl' : 'ltr'}}>
            <Grid sx={{ marginRight:isRTL?'3rem':'0rem'}} container spacing={2} columns={16}>
            <Grid item xs={4}>
                <img src={item.img} style={{width:'55%',marginLeft:'1rem',marginTop:'1rem'}}/>
                </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      direction :isRTL ? 'rtl' : 'ltr',
                      marginTop: 0,
                      color: 'white',
                      fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                      fontWeight: 'bold',
                      fontSize: { xs: '15px', md: '20px' },
                      textAlign: isRTL?'right':  'left',
                    marginLeft :/*  isRTL?'6rem': */'0rem'
                    }}
                  >
                   {typographyContent[i18n.language]?.[index]?.title || accordionData[index].title}
                   {isAdmin && index !== 0 && (
    <Edit
      onClick={() => handleOpenModal('title', index)}
      sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
    />
  )}
                  </Typography>
                  
                  <Typography
                    sx={{
                      marginTop: 0.5,
                      color: 'white',
                      fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                      fontSize: { xs: '13px', md: '16px' },
                     textAlign:/* isRTL?'right':  */'left',
                    marginLeft : isRTL?'6rem': '0rem',
                      marginRight:  isRTL?'0rem': {xs:'1rem',md:'3rem'},
                    }}
                  >
                     <BoldTextBeforeColon
    text={typographyContent[i18n.language]?.[index]?.content || accordionData[index].content}
    isRTL={isRTL}
  />

{isAdmin && index !== 0 && (
    <Edit
      onClick={() => handleOpenModal('content', index)}
      sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
    />
  )}

                  </Typography>
                 
                </Box>
              </Box></Grid></Grid>
              {index === 0 && (
                  <Typography onClick={isAdmin ? handleOpenHeaderModal : undefined} sx={{  fontFamily:isRTL?'Noto Kufi Arabic':'Poppins', marginBottom: { xs: '3rem', md: '5rem' }, marginTop: { xs: '9rem', md: '3rem' }, fontWeight: 'bold', color: 'white' ,fontSize:{xs:'40px',md:'70px'},marginLeft:isRTL?'0rem':'2rem'}} variant="h4" gutterBottom align="center">
                     
                    {t("How it Works")}<span style={{color:'#fec62a'}}> {t("?")}   </span> 
                  </Typography>
                  
                )}
                 
            </Card></motion.div>
          </Grid>
        ))}
        
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' , '@media (min-width: 900px) and (max-width: 1400px)': {
                
                justifyContent: 'flex-start'},}}>
        <Link to='/contact'>
      <Button sx={{
        color:'#11111f',
        fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                fontSize: { xs: '12px', md: '20px' }, // Responsive font size
                backgroundColor: '#fec62a',
                borderRadius: '10px',
                fontWeight: 'bold',
                padding: { xs: '0.6rem 2rem', md: '1rem 2rem' }, // Responsive padding
                border: '1px solid #fec62a',
                marginTop: { xs: '4rem', md: '4rem' },
                marginRight:{xs:'1.5rem',md:'3rem'},
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '1px solid #dec62a',
justifyContent:'flex-end',textAlign:'right'
                },
               
              }} >{t("Get Consultaion Now")}  {isRTL ? (
                <West sx={{ marginRight: '0.5rem', fontSize: '20px' }} />
              ) : (
                <East sx={{ marginLeft: '0.5rem', fontSize: '20px' }} />
              )}</Button></Link></Box>

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
        defaultValue={selectedTypography.key === 'header' ? headerText[i18n.language] : typographyContent[i18n.language][selectedTypography.index][selectedTypography.key]}
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
}
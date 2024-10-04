import React from 'react';
import { Card, CardContent, Typography, Box, Container, TextField, Button, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import m1 from '../ASSETS/1 (1).png'; 
import m2 from '../ASSETS/2 (1).png'; 
import m3 from '../ASSETS/3 (1).png'; 
import bg1 from '../ASSETS/row-1-column-1.jpg'
import bg2 from '../ASSETS/row-2-column-1.jpg'
import bg3 from '../ASSETS/row-3-column-1.jpg'
import bg4 from '../ASSETS/row-4-column-1.jpg'
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { getTeamFromDB, saveTeamToDB, updateTeamInDB } from '../BlogPage/db';
const data = [
  {
    title: "Leadership",
    answer: "Our leadership team sets the strategic direction of the company, ensuring that we stay at the forefront of industry trends and deliver cutting-edge solutions. With years of experience in various sectors, they guide our operations with a focus on innovation, integrity, and excellence.",
    img: m1,
    bg: bg1,
  },
  {
    title: "Consultants & Advisors",
    answer: "Our consultants and advisors are experts in their respective fields, offering deep insights and practical solutions across a range of business areas. Whether it’s management consulting, finance, HR, IT, or legal services, our team is equipped to handle your most complex challenges.",
    img: m2,
    bg: bg2,
  },
  {
    title: "Support Staff",
    answer: "Behind every successful project is a dedicated support team that ensures everything runs smoothly. From project management to client relations, our support staff plays a crucial role in delivering timely and efficient service.",
    img: m3,
    bg: bg3,
  },
  {
    title: "Collaborative Approach",
    answer: "We believe in the power of collaboration—both within our team and with our clients. By working closely together, we leverage our collective expertise to provide solutions that are not only effective but also aligned with your vision and goals.",
    img: m3,
    bg: bg4,
  },
];
const CardContentStyled = styled(CardContent)(({ theme }) => ({
  position: 'relative',
  transition: 'opacity 0.3s ease',
}));

const AnswerBox = styled(Box)(({ theme }) => ({
  opacity: 0,
  transition: 'opacity 0.3s ease',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const CardWrapper = styled(Card)(({ theme, img, bg }) => ({
    position: 'relative',
    overflow: 'hidden',
    transition: 'background-image 0.3s ease',
    borderRadius: '10px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${bg})`,
    filter: 'brightness(80%)',
    '&:hover': {
      backgroundImage: `url(${img})`,
      color: '#fff',
      cursor: 'pointer',
      '& .content': {
        opacity: 0,
      },
      '& .answer': {
        opacity: 1,
      },
    },
    // Rotate background image on mobile screens
    [theme.breakpoints.down('sm')]: {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: 'rotate(90deg)', // Rotate image by 90 degrees
        transformOrigin: 'center',  // Ensure the rotation is centered
        zIndex: -1, // Ensure it stays in the background
      },
    },
    [theme.breakpoints.down('md')]: {
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'rotate(90deg)', // Rotate image by 90 degrees
          transformOrigin: 'center',  // Ensure the rotation is centered
          zIndex: -1, // Ensure it stays in the background
        },
      },
  }));
  
  
  

const Team = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTypography, setSelectedTypography] = React.useState('');

 /*  const [headerText, setHeaderText] = useState({
    en: " ",
    ar:" ", // Arabic translation
  }); */
  const [typographyContent, setTypographyContent] = useState({
    en: data.map(card => ({ title: card.title, answer: card.answer })),
    ar: data.map(card => ({ title: '', content: '' }))
  });
  
  const [teamId, setTeamId] = useState(null);  // Store Firestore document ID
  const [isAdmin, setIsAdmin] = useState(false);  // Track admin status
  
  // Fetch headers from Firestore on mount
  React.useEffect(() => {
    const fetchHow = async () => {
      try {
        const howData = await getTeamFromDB();
        /* if (howData.length > 0) {
          setHeaderText({
            en: howData[0].header?.en || '',
            ar: howData[0].header?.ar || '',
          }); */
          setTypographyContent({
            en: Array.isArray(howData[0].en) ? howData[0].en : data.map(card => ({ title: card.title, answer: card.answer })),
            ar: Array.isArray(howData[0].ar) ? howData[0].ar : data.map(card => ({ title: '', answer: '' }))
          });
          setTeamId(howData[0].id || null);
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
        if (teamId) {
          await updateTeamInDB(teamId, { [currentLang]: updatedContent[currentLang] });
        } else {
          const newId = await saveTeamToDB(updatedContent);
          setTeamId(newId);
        }
      } catch (error) {
        console.error('Error saving services:', error);
      }
    }
  
    handleCloseModal();
  };
  
  

  return (
    <Container sx={{ my: 4, marginTop: '8rem', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Typography sx={{  direction:isRTL?'rtl':'ltr',
            textAlign:isRTL?'right': 'left',
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins', marginBottom: '5rem', fontWeight: 'bold', color: '#fec62a' ,fontSize: { xs: '30px', md: '50px' },}} variant="h3" gutterBottom align="left">
        {t("Our Team")}
      </Typography>
      <Typography sx={{  direction:isRTL?'rtl':'ltr',
            textAlign:isRTL?'right': 'left',
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',marginBottom: '2rem', fontWeight: 'bold', color: 'white',fontSize: { xs: '18px', md: '20px' }, }} variant="h6" gutterBottom align="left">
        {t("A Dedicated Team of Experts Committed to Your Success and meet your expectations.")}
      </Typography>
      <Typography sx={{  direction:isRTL?'rtl':'ltr',
            textAlign:isRTL?'right': 'left',
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins', marginBottom: '5rem', fontWeight: 'bold', color: 'white',fontSize: { xs: '18px', md: '20px' }, }} variant="h6" gutterBottom align="left">
        {t("At")} <span style={{color:'#fec62a'}}> {t("MUROUJ")} </span>
        {t(", Our team is composed of industry professionals with a wealth of experience and a passion for delivering exceptional results. Each member brings a unique set of skills and expertise, allowing us to offer comprehensive and customized solutions tailored to your business needs. We are united by a common goal: to drive your success and help you achieve your company objectives.")}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
        {data.map((item, index) => (
          <CardWrapper key={index} sx={{ position: 'relative', width: 280, height:{md: 360,xs:280},'@media (min-width:900px) and (max-width:1400px)': {
            width: 250
         
          }, }} img={item.img} bg={item.bg}>
            <CardContentStyled className="content">
              <Typography sx={{  direction:isRTL?'rtl':'ltr',
            textAlign:isRTL?'center': 'center',
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',fontWeight: '700', marginTop:{xs:'7rem',md: '9rem'} ,color:'white',fontSize:{xs:'18px',md:'20px'}}} variant="h5">
                 {typographyContent[i18n.language]?.[index]?.title || data[index].title}
                   {isAdmin && (
    <Edit
      onClick={() => handleOpenModal('title', index)}
      sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
    />
  )}
                  </Typography>
            </CardContentStyled>
            <AnswerBox className="answer">
              <Typography sx={{  direction:isRTL?'rtl':'ltr',
            textAlign:isRTL?'center': 'center',
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',fontWeight: '500',fontSize:{xs:'14px',md:'18px'},'@media (min-width:900px) and (max-width:1400px)': {
            fontSize:'15px'
         
          }, }} variant="body1" align="center">
               {typographyContent[i18n.language]?.[index]?.answer || data[index].answer}
                   {isAdmin && (
    <Edit
      onClick={() => handleOpenModal('answer', index)}
      sx={{ cursor: 'pointer', color: 'purple', marginLeft: '1rem' }}
    />
  )}
                  </Typography>
            </AnswerBox>
          </CardWrapper>
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
        width: 400,
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
    </Container>
  );
};

export default Team;

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, Grid } from '@mui/material';
import a from '../ASSETS/young-employee-with-glasses-paying-attention.jpg';
import img1 from '../ASSETS/rating.png'
import img2 from '../ASSETS/advance-technology.png'
import img3 from '../ASSETS/solutions.png'
import img4 from '../ASSETS/quality-assurance.png'
import img5 from '../ASSETS/secure.png'
import img6 from '../ASSETS/communication.png'
/* import { useTranslation } from 'react-i18next'; */
import {motion} from 'framer-motion'
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
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
    fontFamily: 'Raleway',
    fontWeight: 'bold',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 16,
  borderTop: '1px solid rgba(0, 0, 0, 0.125)',
  fontFamily: 'Raleway',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 1500,
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #f5f7fa, #D3CEC8)', // Gradient background color
  borderRadius: '20px',
  boxShadow: theme.shadows[3],
  flex: '1 1 45%',
  marginBottom: '0rem',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const Image = styled('img')({
  width: '70%',
  height: 'auto',
  borderRadius: 8,
});

const accordionData = [
  {
    icon: img1,
    title: 'Expertise',
    content: 'Our team’s deep BPO experience enables us to provide specialized solutions tailored to unique business needs.',
  },
  {
    icon: img2,
    title: 'Cutting-Edge Technology',
    content: 'We use cutting-edge technology, such as automation, AI, and data analytics, to improve processes and boost productivity.',
  },
  {
    icon: img3,
    title: 'Tailored Solutions',
    content: 'We tailor our solutions to each client`s specific needs and goals to ensure maximum value and ROI.',
  },
  {
    icon: img4,
    title: 'Quality Assurance',
    content: 'We focus on quality through strict control measures and continuous improvement to provide error-free and efficient services.',
  },
  {
    icon: img5,
    title: 'Data Security',
    content: 'We prioritize data security and confidentiality with strict protocols and compliance with industry standards.',
  },
  {
    icon: img6,
    title: 'Transparent Communication',
    content: 'We ensure open communication, keeping clients informed and involved throughout the process.',
  },
  
];

export default function WhyChooseUs() {
  const { t} = useTranslation();
  const isRTL = i18n.language === 'ar'; 
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
   
       
      <Grid sx={{ direction:isRTL?'rtl':'ltr',}} container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 2 } }}>
          <Box sx={{marginTop:{md:'12rem',xs:'2rem'}, marginLeft: { xs: '1rem', md: '-2rem' }, marginRight: { xs: '1rem', md: '2rem' } ,direction:isRTL?'rtl':'ltr' }}>
            {accordionData.map((item, index) => (
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
              <Card key={item} sx={{ maxWidth: 600, width: '100%', boxShadow: 3, backgroundColor: 'white',marginBottom:'1rem', }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img src={item.icon} style={{ width: '18%' }} />
                <Box>
                  <Typography sx={{direction:isRTL?'rtl':'ltr',
            textAlign:isRTL?'right': 'left',
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',color:'#11111f',fontWeight:'bold',fontSize:{xs:'',md:isRTL?'18px':'20px'}}} variant="h6" gutterBottom>
                    {t(item.title)}
                  </Typography>
                  <Typography sx={{direction:isRTL?'rtl':'ltr',
            textAlign:isRTL?'right': 'left',
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',color:'#11111f',marginTop:'-0.4rem',fontSize:{xs:'',md:isRTL?'15px':'19px'}}} variant="body1">
                    {t(item.content)}
                  </Typography>
                </Box>
              </CardContent>
            </Card></motion.div>
            ))}
          </Box>
        </Grid>
        <Grid  item xs={12} md={6} sx={{ order: { xs: 1, md: 1 } }}>
          <Box sx={{marginRight:{md:'8rem',xs:'0rem'},}}>
        <Box
     
      
     > <motion.div
     initial={{ x: -100, opacity: 0 }}
     whileInView={{ x: 0, opacity: 1 }}
     transition={{ duration: 1.2, ease: 'easeOut' }}
     viewport={{ once: true }}
   >
       <Typography
         variant="h3"
         sx={{
           fontWeight: '600',
           fontSize: { xs: '30px', md: '40px' }, // Responsive font size
           direction:isRTL?'rtl':'ltr',
           textAlign:isRTL?'right': 'left',
           fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
           marginTop:'4rem',
           
           margin:{xs:'3rem 2rem',md:'10rem 2rem -2rem 11rem'},
           color:'#fec62a',
           '@media (min-width:900px) and (max-width:1400px)': {
           
            margin: '3rem -5rem 3rem 9rem',
           fontSize:'38px'
          },
         }}
       > {t("Why Choose US ?")}
            </Typography></motion.div>
            <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      > <Typography variant="h3"
         sx={{
             margin:{xs:'3rem 2rem',md:isRTL?'6rem 2rem 2rem 0rem':'6rem 0rem 2rem 11rem'},
             direction:isRTL?'rtl':'ltr',
            textAlign:isRTL?'right': 'left',
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
             color:'white',
           fontWeight: '400',
           fontSize: { xs: '15px', md: '17px' },
          
           lineHeight:1.4,'@media (min-width:900px) and (max-width:1400px)': {
           
            margin: '3rem -5rem 3rem 9rem',
           fontSize:'17px'
          },// Responsive font size
          
           
        
         }}>{t("At MUROUJ, we stand out by combining deep industry expertise with advanced technology, tailored solutions, rigorous quality assurance, and unwavering commitment to data security. Our transparent communication ensures that clients are informed and involved every step of the way.")}</Typography></motion.div>
     
     
       
     </Box>
  <Box 
    sx={{ 
      position: 'relative', // Make the container relative
      marginLeft: { md: '0rem', sm: '10rem', xs: '0rem' },
      marginRight:{xs:'0rem' ,md:'2rem'} ,
     right:{md:'0%',xs:'12%'},
     left:{md:'13%',xs:'0%'},
    }}
  >
    <motion.div
     initial={{ x: -100, opacity: 0 }}
     whileInView={{ x: 0, opacity: 1 }}
     transition={{ duration: 1.2, ease: 'easeOut' }}
     viewport={{ once: true }}
   >
    <Box sx={{width:{xs: '80%',md:'90%'}}}>
    <Image 
      src={a} 
      style={{
        width:'100%', 

        marginRight: '0rem',
        marginLeft:'5rem','@media (min-width:900px) and (max-width:1400px)': {
           
          marginLeft:'3rem'
          },
        filter: 'brightness(100%)', // Darken the image
      }} 
    /></Box>
    </motion.div>
  </Box></Box>
</Grid>

      </Grid>
    
  );
}

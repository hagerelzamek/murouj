import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {motion} from 'framer-motion'
import star from '../ASSETS/aboutus.png'
import img from '../ASSETS/abouttt.png'
import { Typography ,keyframes} from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import img1 from '../ASSETS/img1.png'
// Define the slide-in animation using keyframes
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About us', path: '/about' },
  { label: 'How it works', path: '/' },
  { label: 'Contact', path: '/contact' }
];

// Create styled components for Typography with the slide-in animation
const AnimatedTypography = styled(Typography)(({ theme }) => ({
  animation: `${slideIn} 1.5s ease-in-out`,
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CusNeeds() {
 const { t } = useTranslation();
  const isRTL = i18n.language === 'ar'; 
  return (
    <Box sx={{ flexGrow: 1 ,marginTop:'8rem',direction:isRTL?'rtl':'ltr', textAlign:/* isRTL?'right': */'left'}}>
      <Grid container spacing={2} columns={16}>
        <Grid sx={{backgroundColor:'',}} item xs={16} md={8} direction="column"order={{ xs: 1, md: 2 }} >
          <Box sx={{ marginLeft:{xs:'0rem',md:isRTL?'2rem':'0rem'},}}>
        <Grid  item>   
        <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
           
           <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}}> 
            <Box> <Link to='/about'><Button sx={{
        color:'#11111f',
        fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                fontSize: { xs: '12px', md: '22px',sm:'18px' }, // Responsive font size
                backgroundColor: 'white',
                borderRadius: '10px',
                fontWeight: 'bold',
                padding: { xs: '0.6rem 2rem', md: '1rem 1rem' }, // Responsive padding
                border: '0px solid white',
                marginTop: { xs: '2rem', md: '3rem' },
                marginLeft:{xs:isRTL?'0rem':'3rem',md:'0rem'},
                marginRight:{xs:isRTL?'2rem':'0rem'},
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#11111f',
                  border: '0px solid white',
                 

                },'@media (min-width: 900px) and (max-width: 1400px)': {
                
                  fontSize:'12px'},
               
               
              }} > {t("Company Overview")} </Button></Link></Box> 
              <Box sx={{marginLeft:'0rem',backgroundColor:'',marginBottom:'2rem'}}>
              <img src={star} style={{width:'35%',height:'50%',marginTop:'4rem',marginBottom:'-2rem'}}></img></Box></Box>
          </motion.div>

           <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
           
              <Typography variant="h4"
              sx={{
                direction:isRTL?'rtl':'ltr',
                color: 'white',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                fontWeight: 800,
                fontSize: { xs: '27px', sm: '36px', md:isRTL?'55px': '60px' }, // Responsive font size
                marginBottom: { xs: '3rem', md: '2rem' },
                marginTop:{xs:'2rem',md:'2rem'},
                
               textAlign:{xs:/* isRTL?'center': */'center',md: isRTL?'right': 'left'} ,
                marginRight: {xs:/* isRTL?'2rem': */'2rem',md: isRTL?'3rem': '1rem'},
               marginLeft:'1rem',
              '@media (min-width: 900px) and (max-width: 1400px)': {
            
            fontSize:'40px',
           },
        /* '@media (min-width: 1101px) and (max-width: 1200px)': {
          marginTop:'5rem',
          fontSize:'40px' // Adjust padding for this range
        },
        '@media (min-width: 1201px) and (max-width: 1550px)': {
          marginTop:'8rem',
          marginRight:'8rem',
           // Adjust padding for this range
        } */ 
    
              }}
            >
              {isRTL ? (
    <>
              {t("The Story Of Our")} {t("Journery")} 
              <span style={{color:'#fec62a'}}> {t("Business")}</span>
              </>
  ) : (
    <>
    {t("The Story Of Our")} <span style={{color:'#fec62a'}}>{t("Business")} </span>{t("Journery")}
    </>)}
              </Typography>
          </motion.div>
          </Grid>

          {/* Description */}
          <Grid item>
          <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
            <Typography
              sx={{
                direction:isRTL?'rtl':'ltr',
                color: 'white',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                fontSize: { xs: '13px', md: '17px' }, // Responsive font size
                marginBottom: '1rem', // Adjust margin
                fontWeight: '500',
               marginRight:'2rem',
               marginLeft:'1rem',
                marginTop: { xs: '1rem', md: '1rem' },
                paddingRight: { xs: '0rem', md: '1rem' },
                
                '@media (min-width: 900px) and (max-width: 1400px)': {
                
                  fontSize:'15px'},
               
               textAlign:{xs:/* isRTL?'center': */'center',md: isRTL?'right': 'left'}
              }}
            >
              {t("At")} <span style={{color:'#fec62a'}}>{t("MUROUJ")} </span>{t(", we are committed to empowering businesses with comprehensive consulting services that drive growth, efficiency, and innovation. With a focus on delivering tailored solutions, we offer expertise across four key areas: Management & Organizational Performance, Financial & Accounting Solutions, Human Resources & Training Services, and Legal & Administrative Support Services.")}


            </Typography></motion.div>

            <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
            <Typography
              sx={{
                direction:isRTL?'rtl':'ltr',
                color: 'white',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                fontSize: { xs: '13px', md: '17px' }, // Responsive font size
                marginBottom: '1rem', // Adjust margin
                fontWeight: '500',
               marginRight:'2rem',
               marginLeft:'1rem',
                marginTop: { xs: '1rem', md: '1rem' },
                paddingRight: { xs: '0rem', md: '1rem' },
                
                '@media (min-width: 900px) and (max-width: 1400px)': {
                
                  fontSize:'15px'},
               
                
                
               textAlign:{xs:/* isRTL?'center': */'center',md: isRTL?'right': 'left'}
              }}
            >
  

{t("Our multidisciplinary approach allows us to address complex business challenges from multiple perspectives, ensuring that our clients receive well-rounded and practical advice. We take pride in our ability to integrate strategic planning, financial analysis, human resources management, and legal compliance into cohesive solutions that meet the unique needs of each client.")}


            </Typography></motion.div>

            <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
            <Typography
              sx={{
                direction:isRTL?'rtl':'ltr',
                color: 'white',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                fontSize: { xs: '13px', md: '17px' }, // Responsive font size
                marginBottom: '1rem', // Adjust margin
                fontWeight: '500',
               marginRight:'2rem',
               marginLeft:'1rem',
                marginTop: { xs: '1rem', md: '1rem' },
                paddingRight: { xs: '0rem', md: '1rem' },
                
               '@media (min-width: 900px) and (max-width: 1400px)': {
                
                  fontSize:'15px'},
               
               textAlign:{xs:/* isRTL?'center': */'center',md:isRTL?'right': 'left'}
              }}
            >


{t("We believe in building lasting partnerships with our clients, based on trust, integrity, and a deep understanding of their business environment. Our team of seasoned professionals is dedicated to providing personalized service, drawing on extensive industry experience and market insights to deliver results that set our clients apart in a competitive landscape. Whether you are looking to optimize your operations, enhance financial performance, attract and retain top talent, or ensure legal and regulatory compliance,")} <span style={{color:'#fec62a'}}>{t("MUROUJ")} </span> {t("is your trusted partner in achieving sustainable success.")}
            </Typography></motion.div>
          </Grid></Box>
        </Grid>
       
        <Grid sx={{backgroundColor:'',}} order={{ xs: 2, md: 1 }} item xs={16} md={8}>
        <Box
            component="img"
            src={isRTL ? img1 : img}
            alt="Background"
            sx={{
              marginRight:{md:isRTL?'3rem':'3rem',xs:isRTL?'0rem':'0rem'},
              width: '100%',
              height: 'auto',
              maxWidth: { xs: '100%', md: '100%' }, 
              '@media (min-width: 900px) and (max-width: 1400px)': {
                
                  marginTop:'4rem'},
               // Responsive max-width for the image
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}








import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Grid, Paper, Container, Divider } from '@mui/material';
import { Whatshot, Build, Favorite, ThumbUp, People, TrendingUp, Assistant } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import {motion} from 'framer-motion'
import img1 from '../ASSETS/target.png'
import img2 from '../ASSETS/vision.png'
import i18n from '../../i18n';
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
                {t(item.title)}
              </Typography>
              <Typography sx={{textAlign:isRTL?'right': 'left',
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',marginBottom:'1rem',fontWeight:'500',marginRight:{xs:'0rem',md:isRTL?'0rem':'2rem'},fontSize:{xs:'12px',md:'15px'}}} variant="body1">
                {t(item.content)}
              </Typography>
            </Box>
          </CardContent>
        </Card></motion.div>
      ))}
   
    </Box>
    </>
  );
};

export default Mission;

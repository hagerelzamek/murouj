import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, Stack, Pagination, PaginationItem } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack, ArrowForward, East, West } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

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
                        {t(item.title)}
                      </Typography>
                      <Typography sx={{  fontFamily:isRTL?'Noto Kufi Arabic':'Poppins', textAlign:isRTL?'right': 'left', color: '#11111f',fontSize:'15px', }} variant="body1">
                        {t(item.content)}
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
                {t(description)}
              </Typography>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceCard;

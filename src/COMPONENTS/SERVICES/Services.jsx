import React from 'react';
import { Typography, Box, CardContent, Card, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { East, West } from '@mui/icons-material';
import bgcard from '../ASSETS/eng.png'
import img1 from '../ASSETS/profile (1).png'
import img2 from '../ASSETS/accounting (1).png'
import img3 from '../ASSETS/team-management (1).png'
import img4 from '../ASSETS/customer-service (1).png'
import img5 from '../ASSETS/software-application (1).png'
import img6 from '../ASSETS/presentation (1).png'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const cardData = [
  {
    icon: img1,
    title: 'Management & Organization Performance',
    description: 'We optimize your business performance through strategic planning, process improvements, and thorough evaluations, ensuring alignment with goals and sustainable growth.',
    buttonLink: '/services/service1',
  },
  {
    icon: img2,
    title: 'Financial & Accounting Solutions',
    description: 'We provide expert financial services, from bookkeeping to strategic planning, ensuring your business stays compliant, profitable, and ready for future challenges.',
    buttonLink: '/services/service2',
  },
  {
    icon: img3,
    title: 'HR & Talent Acquisition Services',
    description: 'We build strong teams through strategic HR management, offering comprehensive solutions from recruitment to employee engagement, ensuring alignment with your business objectives.',
    buttonLink: '/services/service3',
  },
  {
    icon: img4,
    title: 'Legal & Administrative Support Services',
    description: 'We provide legal and administrative services to help your business maintain compliance, manage risk, and streamline operations with expert guidance.',
    buttonLink: '/services/service4',
  },
  {
    icon: img5,
    title: 'IT Solution Services',
    description: 'We offer innovative IT strategies, including cybersecurity, software integration, and cloud solutions, to drive digital transformation and safeguard your business.',
    buttonLink: '/services/service5',
  },
  {
    icon: img6,
    title: 'Training & Development Services',
    description: 'We enhance skills and foster growth through tailored training programs, workshops, and development initiatives to elevate employee capabilities, drive performance, and support continuous organizational growth.',
    buttonLink: '/services/service6',
  },
];


const Services = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  return (
    <Box sx={{ margin: '6rem 1rem',direction:isRTL?'rtl':'ltr' }}>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        viewport={{ once: true }}
      >
        <Typography
          sx={{
            fontSize: { xs: '20px', md: '32px' },
            fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
            marginTop: { xs: '1rem', md: '10rem' },
            fontWeight: 'bold',
            marginBottom: { xs: '0rem', md: '3rem' },
            color: 'white',
            paddingTop: '0rem',
            textAlign: 'center',
            marginRight:{xs:'1rem',md:'7rem'},
            marginLeft:{xs:'1rem',md:'7rem'},
          }}
          variant="h4"
          gutterBottom
          align="center"
        >
          {t("Services We're Offering")}
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
          mt: 7,
          margin: { xs: '1rem', md: '3rem 3rem' },
          paddingBottom: { xs: '0rem', md: '4rem' },
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {cardData.map((item, index) => (
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
            <Card
              sx={{
                borderRadius: '15px',
                width: '100%',
                maxWidth: 400,
                boxShadow: 3,
                marginTop: '1rem',
                backgroundImage: `url(${bgcard}) !important`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: { xs: '360px', md: '380px' },
                marginBottom: { xs: '1rem', md: '0rem' },
                color: '#ffffff',
                position: 'relative', // Ensure relative positioning for absolute children
              }}
            >
              <CardContent
                sx={{
                  position: 'relative',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between', // Ensures space is distributed between content and button
                  height: '100%', // Full height of the card
                }}
              >
                <Box>
                  <img src={item.icon} style={{width:'18%',marginTop:'1.5rem '}}/>
                  <Typography
                    sx={{
                      fontWeight: '700',
                      fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                      marginTop: '1rem',
                      fontSize: { xs: '13px', md: '18px' },
                      color: '#11111f',
                    }}
                    variant="h6"
                    gutterBottom
                  >
                    {t(item.title)}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#11111f',
                      fontWeight: '500',
                      fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                      marginTop: '1rem',
                      fontSize: { xs:isRTL?'11px': '13px', md:isRTL?'12px': '14px' },
                    }}
                    variant="h6"
                    gutterBottom
                  >
                    {t(item.description)}
                  </Typography>
                </Box>
                <Box sx={{justifyContent:isRTL?'left':'right',alignItems:isRTL?'left':'right',textAlign:isRTL?'left':'right'}}>
                  <Link to={item.buttonLink}>
                    <Button
                      sx={{
                        fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                        marginTop:'-5rem',
                        textAlign:'right',
                        color: 'white',
                        backgroundColor: '#11111f',
                        borderRadius: '20px',
                        fontSize: '12px',
                        padding: '0.6rem 0.7rem',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: '#11111f',
                        },
                      }}
                    >
                      {t('Learn more')}
                      {isRTL ? (
  <West sx={{ marginRight: '0.5rem', fontSize: '20px' }} />
) : (
  <East sx={{ marginLeft: '0.5rem', fontSize: '20px' }} />
)}
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Services;

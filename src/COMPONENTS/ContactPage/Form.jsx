import * as React from 'react';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, FormControl, FormLabel, TextareaAutosize, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import emailjs from '@emailjs/browser';
const embedMapStyles = {
    maxWidth: '100%',
    overflow: 'hidden',
    width: '100%',
    height: '100%', // Adjust height to be responsive
    border: '2px solid #2f2f2f',
};

export default function Form() {
  const form = useRef();
const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm('service_g0ubt6i', 'template_iop443g', form.current, {
      publicKey: '65dQCqN3bLGI2UJR-',
    })
    .then(
      () => {
        console.log('SUCCESS!');
        e.target.reset();
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
};

  const { t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  return (
    <Box sx={{ flexGrow: 1, width: '100%', padding: '0rem', margin: 'auto', direction:isRTL?'rtl':'ltr', }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography
            variant="h4"
            sx={{
            
              fontWeight: 'bold',
              fontSize: { xs: '20px', md: '40px' }, // Responsive font size
              color: '#fec62a',
              fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
              textAlign: { xs: 'center', md:isRTL?'center': 'center' }, // Center on small screens
             
            }}
          >
            {t("We Are Here To Help You")}
          </Typography>
          <Typography
            variant="h4"
            sx={{
            
              fontWeight: 'bold',
              fontSize: { xs: '20px', md: '30px' }, // Responsive font size
              color: '#fec62a',
              fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
              textAlign: { xs: 'center', md:isRTL?'center': 'center' }, // Center on small screens
             
            }}
          >
            {t("If You Have Any Question")}
          </Typography>
          <Typography
            variant="h4"
            sx={{
         
              fontWeight: 'bold',
              fontSize: { xs: '20px', md: '30px' }, // Responsive font size
              color: '#fec62a',
              fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
              textAlign: { xs: 'center', md:isRTL?'center': 'center' }, // Center on small screens
              marginBottom: '1rem',
            }}
          >
           {t("Let Us Know...")}
          </Typography>
          <Box
      component="form"
      ref={form}
      onSubmit={sendEmail}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        maxWidth: '500px',
        margin: '0 auto',
        color:'white',
        
      }}
    >
     

      <TextField  sx={{
   backgroundColor: 'white',
   '& .MuiOutlinedInput-root': {
     '& fieldset': {
       borderColor: 'transparent', // No border by default
     },
     '&:hover fieldset': {
       borderColor: 'transparent', // No border on hover
     },
     '&.Mui-focused fieldset': {
       borderColor: 'transparent', // No border on focus
     },
   },
   '& .MuiInputLabel-root': {
     color: 'grey', // Label color by default
     transform: 'translate(16px, 16px) scale(1)', // Position label when not focused
   },
   '& .MuiInputLabel-root.Mui-focused': {
     color: 'white', // Label color when focused
     transform: 'translate(14px, -18px) scale(0.75)', // Adjust label position when focused
   },
 }}
        label="Name"
        name="user_name"
        variant="outlined"
        fullWidth
        required
      />

      <TextField sx={{
   backgroundColor: 'white',
   '& .MuiOutlinedInput-root': {
     '& fieldset': {
       borderColor: 'transparent', // No border by default
     },
     '&:hover fieldset': {
       borderColor: 'transparent', // No border on hover
     },
     '&.Mui-focused fieldset': {
       borderColor: 'transparent', // No border on focus
     },
   },
   '& .MuiInputLabel-root': {
     color: 'grey', // Label color by default
     transform: 'translate(16px, 16px) scale(1)', // Position label when not focused
   },
   '& .MuiInputLabel-root.Mui-focused': {
     color: 'white', // Label color when focused
     transform: 'translate(14px, -18px) scale(0.75)', // Adjust label position when focused
   },
 }}
        label="Email"
        name="user_email"
        type="email"
        variant="outlined"
        fullWidth
        required
      />
<TextField sx={{
   backgroundColor: 'white',
   '& .MuiOutlinedInput-root': {
     '& fieldset': {
       borderColor: 'transparent', // No border by default
     },
     '&:hover fieldset': {
       borderColor: 'transparent', // No border on hover
     },
     '&.Mui-focused fieldset': {
       borderColor: 'transparent', // No border on focus
     },
   },
   '& .MuiInputLabel-root': {
     color: 'grey', // Label color by default
     transform: 'translate(16px, 16px) scale(1)', // Position label when not focused
   },
   '& .MuiInputLabel-root.Mui-focused': {
     color: 'white', // Label color when focused
     transform: 'translate(14px, -18px) scale(0.75)', // Adjust label position when focused
   },
 }}
        label="Phone"
        name="user_phone"
        type="tel"
       
        fullWidth
        required
      />
      <TextField sx={{
   backgroundColor: 'white',
   '& .MuiOutlinedInput-root': {
     '& fieldset': {
       borderColor: 'transparent', // No border by default
     },
     '&:hover fieldset': {
       borderColor: 'transparent', // No border on hover
     },
     '&.Mui-focused fieldset': {
       borderColor: 'transparent', // No border on focus
     },
   },
   '& .MuiInputLabel-root': {
     color: 'grey', // Label color by default
     transform: 'translate(16px, 16px) scale(1)', // Position label when not focused
   },
   '& .MuiInputLabel-root.Mui-focused': {
     color: 'white', // Label color when focused
     transform: 'translate(14px, -18px) scale(0.75)', // Adjust label position when focused
   },
 }}
        label="Message"
        name="message"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        required
      />

      <Button  
        type="submit"
        variant="contained"
        sx={{
          fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
          backgroundColor: '#fec62a',
          fontSize:'20px',
          color:'#11111f',
          '&:hover': {
            backgroundColor: 'transparent',
            color: 'white',
          },
          
          padding: '0.6rem 1.2rem',
          border:'1px solid #fec62a'
        }}
      >
        {t("Send A Message")}
      </Button>
    </Box>
  

     {/*      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Phone</label>
      <input type="number" name="user_phone" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form> */}
        {/*   <form onSubmit={sendEmail} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormLabel sx={{ color: 'white', fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',textAlign:isRTL?'right':'left' }}>{t("Name")}</FormLabel>
            <TextField
              placeholder='Name'
              variant="outlined"
              name="user_name"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-input': {
                  backgroundColor: 'white',
                  borderRadius: '0px',
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0px',
                  border: '1px solid black',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                },
              }}
            />
            <FormLabel ref={form} sx={{ color: 'white', fontFamily:isRTL?'Noto Kufi Arabic':'Poppins' ,textAlign:isRTL?'right':'left'}}>{t("Email")}</FormLabel>
            <TextField
              placeholder='Email'
              variant="outlined"
              name="user_email"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-input': {
                  backgroundColor: 'white',
                  borderRadius: '0px',
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0px',
                  border: '1px solid black',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                },
              }}
            /> */}
           {/*  <FormLabel sx={{ color: 'white', fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',textAlign:isRTL?'right':'left' }}>{t("Subject")}</FormLabel>
            <TextField
              placeholder='Subject'
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-input': {
                  backgroundColor: 'white',
                  borderRadius: '0px',
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0px',
                  border: '1px solid black',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                },
              }}
            /> */}
           {/*  <FormLabel sx={{ color: 'white', fontFamily:isRTL?'Noto Kufi Arabic':'Poppins' ,textAlign:isRTL?'right':'left'}}>{t("Message")}</FormLabel>
            <TextareaAutosize
              minRows={5}
              placeholder="Your message"
              name="message"
              sx={{
                width: '100%',
                maxWidth: '500px',
                borderRadius: '10px',
                padding: '10px',
                border: '1px solid black',
              }}
            />
            <Button type="submit" value="Send"
              sx={{
                fontFamily:isRTL?'Noto Kufi Arabic':'Poppins',
                fontSize: { xs: '12px', md: '15px' },
                backgroundColor: '#fec62a',
                borderRadius: '10px',
                color: '#11111f',
                padding: { xs: '0.8rem', md: '0.6rem' },
                fontWeight: '500',
                marginTop: '1rem',
                border: '1px solid #fec62a',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid #fec62a',
                },
              }}
            >
              {t("Send A Message")}
            </Button>
          </form>  */}
        </Grid>
        {/*  <Grid item xs={12} md={6}>
          <Box sx={{ flexGrow: 1, width: '80%', height: '100%' }}>
            <div style={{ ...embedMapStyles }}>
              <iframe
                style={{ height: '100%', width: '100%', border: '0' }}
                frameBorder="0"
                src="https://maps.google.com/maps?q=Office%20Number%202543,%20Bldg.%20No.%201565,%20Road%201722,%20Block%20317,%20Diplomatic%20Area,%20Manama,%20Kingdom%20of%20Bahrain&t=m&z=13&ie=UTF8&output=embed"
                allowFullScreen
                title="Embedded Google Map"
              ></iframe>
            </div>
          </Box>
        </Grid>  */}
      </Grid>
    </Box>
  );
}

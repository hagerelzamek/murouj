// src/components/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { loginAdmin } from "./LoginPage"; // Import the login/logout functions
import { Box, Button, TextField, Container, Typography, Snackbar, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const AdminLogin = () => {
    const {t}=useTranslation()
    const isRTL = i18n.language === 'ar';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State to handle success/error message
  const [severity, setSeverity] = useState("success"); // 'success' or 'error'
  const [open, setOpen] = useState(false); // Snackbar state
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      await loginAdmin(email, password); // Authenticate user
      setMessage("Login successful! Redirecting to home...");
      setSeverity("success");
      setOpen(true);
      setTimeout(() => {
        navigate("/"); // Redirect to home page after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Login failed", error);
      setMessage("Login failed. Please check your credentials.");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 30 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          boxShadow: 3,
         
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography sx={{fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',}} component="h1" variant="h5" gutterBottom>
          {t("Admin Login")}
        </Typography>

        {/* Display the success or error message using Snackbar */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        
        {/* Wrap the input fields in a form */}
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit" // Use "submit" type for form submission
            fullWidth
            variant="contained"
           
            sx={{ mt: 3, mb: 2 ,  fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',backgroundColor:"#fec62a", color:"#11111f",fontWeight:'bold', '&:hover': {
                backgroundColor: '#fec62a',
                color: '#11111f',
            },}}
          >
            {t("Login")}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;

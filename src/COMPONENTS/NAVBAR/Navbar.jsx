// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Typography, Menu, MenuList, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../ASSETS/IMG0549.png';
import { ArrowDropDown, AccountCircle } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logoutAdmin } from "../PAGES/LoginPage";

const drawerWidth = 270;

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
];

const serviceItems = [
    { label: 'Services We Offer', path: '/services' },
    { label: 'Management & Organization Performance', path: '/services/service1' },
    { label: 'Financial & Accounting Solutions', path: '/services/service2' },
    { label: 'HR & Talent Acquisition Services', path: '/services/service3' },
    { label: 'Legal & Administrative Support Services', path: '/services/service4' },
    { label: 'IT Solution Services', path: '/services/service5' },
    { label: 'Training & Development Services', path: '/services/service6' },
];

function Navbar(props) {
    const { t } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const { window: windowProp } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // Track admin state

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email === "murouj@work.com") { // Use your admin email
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const toggleServicesOpen = () => {
        setServicesOpen(!servicesOpen);
    };

    const handleLanguageChange = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleUserMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLoginClick = () => {
        handleUserMenuClose();
        navigate('/login'); // Navigate to AdminLogin page
    };

    const handleLogoutClick = async () => {
        handleUserMenuClose();
        try {
            await logoutAdmin();
            navigate('/'); // Redirect to home after logout
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const container = windowProp !== undefined ? () => windowProp().document.body : undefined;

    return (
        <Box sx={{ flexGrow: 1, direction: isRTL ? 'rtl' : 'ltr', backgroundColor: '#11111f' }}>
            <AppBar
                sx={{
                    backgroundColor: '#11111f',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    width: '100%',
                }}
                component="nav"
            >
                {/* Mobile Toolbar */}
                <Toolbar sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-between', padding: '0 1rem' }}>
                    <IconButton
                        size="large"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={logo} style={{ width: '130px', height: 'auto' }} alt="Logo" />
                </Toolbar>

                {/* Desktop Toolbar */}
                <Toolbar sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-between', padding: '0 1rem' }}>
                    <img src={logo} style={{ width: '210px', height: '110px', margin: '0.5rem 0rem' }} alt="Logo" />
                    <Typography sx={{ fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins', color: '#fec62a', fontSize: { md: isRTL ? '43px' : '34px', sm: '20px' }, marginRight: isRTL ? '-3rem' : '6rem', fontWeight: 'bold' ,'@media (min-width: 600px) and (max-width: 1230px)': {
              display:'none'
            },
            '@media (min-width: 1200px) and (max-width:  1440px)': {
             fontSize:isRTL?'43px':'30px'
              
            },}}>
                        {t("Murouj Business Solutions")}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: { md: '4rem', xs: '0rem', sm: '1rem' } }}>
                        {navItems.map((item, index) => (
                            item.label === 'Services' ? (
                                <React.Fragment key={item.label}>
                                    <Button
                                        onClick={toggleServicesOpen}
                                        sx={{
                                            fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
                                            direction: isRTL ? 'rtl' : 'ltr',
                                            marginLeft: isRTL ? '0rem' : '0rem',
                                            color: 'white',
                                            marginRight: index === navItems.length - 2 ? '0' : { md: isRTL ? '0.5rem' : '0.5rem', sm: '1rem' },
                                            fontWeight: 'bold',
                                            '&:hover': {
                                                backgroundColor: '#fec62a',
                                                color: '#11111f',
                                            },
                                            display: 'flex',
                                            alignItems: 'center',
                                            position: 'relative',
                                        }}
                                    >
                                        {t(item.label)}
                                        <ArrowDropDown />
                                    </Button>
                                    {servicesOpen && (
                                        <Box sx={{
                                            direction: isRTL ? 'rtl' : 'ltr',
                                            position: 'absolute',
                                            top: '100%',
                                            backgroundColor: '#11111f',
                                            zIndex: 1300,
                                            minWidth: 'max-content',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '4px',
                                        }}>
                                            {serviceItems.map((service) => (
                                                <MenuItem
                                                    key={service.label}
                                                    component={Link}
                                                    to={service.path}
                                                    onClick={() => setServicesOpen(false)}
                                                    sx={{
                                                        fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
                                                        color: 'white',
                                                        fontSize: '13px',
                                                        '&:hover': {
                                                            backgroundColor: '#fec62a',
                                                            color: '#11111f',
                                                        },
                                                    }}
                                                >
                                                    {t(service.label)}
                                                </MenuItem>
                                            ))}
                                        </Box>
                                    )}
                                </React.Fragment>
                            ) : (
                                <Button
                                    key={item.label}
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
                                        color: 'white',
                                        marginRight: index === navItems.length - 1 ? '0.5rem' : { md: isRTL ? '0.5rem' : '0.5rem', sm: '1rem' },
                                        fontWeight: 'bold',
                                        border: item.label === 'Contact' ? '1px solid #fec62a' : 'none',
                                        backgroundColor: item.label === 'Contact' ? '#fec62a' : 'transparent',
                                        color: item.label === 'Contact' ? '#11111f' : 'white',
                                        '&:hover': {
                                            backgroundColor: '#fec62a',
                                            color: '#11111f',
                                        },
                                    }}
                                >
                                    {t(item.label)}
                                </Button>
                            )
                        ))}
                        <Button
                            size="large"
                            onClick={() => handleLanguageChange(isRTL ? 'en' : 'ar')}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                ml: 0,
                                marginRight:'0.5rem',
                                padding: '0.5rem',
                                backgroundColor: isRTL ? 'transparent' : 'transparent',
                                borderRadius: isRTL ? '0.4rem' : '0.4rem',
                                fontSize: isRTL ? '1rem' : '1rem',
                                '&:hover': {
                                    backgroundColor: '#fec62a',
                                    color: '#11111f',
                                },
                            }}
                        >
                            {isRTL ? 'EN' : 'AR'}
                        </Button>
                        <IconButton
                            size="large"
                            aria-label="user menu"
                            onClick={handleUserMenuOpen}
                            color="inherit"
                            sx={{ ml: 0 }}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                container={container}
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#11111f',
                    },
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        paddingTop: '1rem',
                        paddingBottom: '1rem',
                    }}
                >
                    <img src={logo} style={{ width: '200px', height: '130px',marginBottom:'2rem' }} alt="Logo" />
                   
                    {navItems.map((item) => (
                        item.label === 'Services' ? (
                            <React.Fragment key={item.label}>
                                <Button
                                    onClick={toggleServicesOpen}
                                    sx={{
                                        fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
                                        display: 'block',
                                        width: '100%',
                                        textAlign: 'center',
                                        padding: '0.5rem 0',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#fec62a',
                                            color: '#11111f',
                                        },
                                    }}
                                >
                                    {t(item.label)}
                                </Button>
                                {servicesOpen && (
                                    <Box sx={{
                                        backgroundColor: '#11111f',
                                    }}>
                                        {serviceItems.map((service) => (
                                            <Button
                                                key={service.label}
                                                component={Link}
                                                to={service.path}
                                                sx={{
                                                    fontSize:'10px',
                                                    fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
                                                    display: 'block',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    padding: '0.5rem 0',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: '#fec62a',
                                                        color: '#11111f',
                                                    },
                                                }}
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {t(service.label)}
                                            </Button>
                                        ))}
                                    </Box>
                                )}
                            </React.Fragment>
                        ) : (
                            <Button
                                key={item.label}
                                component={Link}
                                to={item.path}
                                sx={{
                                    fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'center',
                                    padding: '0.5rem 0',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#fec62a',
                                        color: '#11111f',
                                    },
                                }}
                                onClick={item.label === 'Services' ? toggleServicesOpen : () => setMobileOpen(false)}
                            >
                                {t(item.label)}
                            </Button>
                        )
                    ))}
                     <IconButton
                            size="large"
                            aria-label="user menu"
                            onClick={handleUserMenuOpen}
                            color="inherit"
                            sx={{ ml: 0 }}
                        >
                            <AccountCircle sx={{color:'white'}} />
                        </IconButton>
                     <Button
                            size="large"
                            onClick={() => handleLanguageChange(isRTL ? 'en' : 'ar')}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textAlign:'center',
                                color: 'white',
                                ml: 12,
                                
                                padding: '0.5rem',
                                backgroundColor: isRTL ? 'transparent' : 'transparent',
                                borderRadius: isRTL ? '0.4rem' : '0.4rem',
                                fontSize: isRTL ? '1rem' : '1rem',
                                '&:hover': {
                                    backgroundColor: '#fec62a',
                                    color: '#11111f',
                                },
                            }}
                        >
                            {isRTL ? 'EN' : 'AR'}
                        </Button>
                </Box>
            </Drawer>

            {/* User Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                sx={{ mt: '45px', }}
            >
                {isAdmin ? (
                    <MenuItem sx={{ fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',}} onClick={handleLogoutClick}>{t('Logout')}</MenuItem>
                ) : (
                    <MenuItem sx={{ fontFamily: isRTL ? 'Noto Kufi Arabic' : 'Poppins',}} onClick={handleLoginClick}>{t('Admin Login')}</MenuItem>
                )}
            </Menu>
        </Box>
    );
}

Navbar.propTypes = {
    window: PropTypes.func,
};

export default Navbar;

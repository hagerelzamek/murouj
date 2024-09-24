import React from 'react';
import styled from 'styled-components';
import { Box } from '@mui/material';

// Create a styled Box component with custom scrollbar styles
const CustomScrollbarBox = styled(Box)(({ theme }) => ({
  height: '100%', // Adjust as needed
  overflowY: 'auto', // Enable vertical scrolling
  scrollbarWidth: 'thin', // Thin scrollbar for Firefox
  '&::-webkit-scrollbar': {
    width: '12px', // Width of the scrollbar
    backgroundColor: '#f1f1f1', // Background color of the scrollbar track
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888', // Color of the scrollbar thumb
    borderRadius: '10px', // Rounded corners for the thumb
    border: '3px solid rgba(0, 0, 0, 0.1)', // Border around the thumb
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555', // Thumb color on hover
  },
}));

const CustomScrollableComponent = ({ children }) => {
  return (
    <CustomScrollbarBox>
      {children}
    </CustomScrollbarBox>
  );
};

export default CustomScrollableComponent;

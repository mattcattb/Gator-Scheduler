import {createTheme } from '@mui/material/styles';

const gatorTheme = createTheme({
  palette: {
    primary: {
      main: '#FA4616',
    },
    secondary: {
      main: '#0021A5',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#333',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#444',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#555',
    },
    body1: {
      fontSize: '1rem',
      color: '#666',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#777',
    },
    // Add other variants if needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          maxHeight: '100%',
          minHeight: '100%',
          backgroundColor: 'rgb(193, 226, 227)', // Background color
          color: 'black', // Text color
          // Add any other default styles you want here
          '&:hover': {
            backgroundColor: 'rgb(170, 200, 202)', // Optional hover effect
          },
        },
      },
    },
  },
});

export default gatorTheme;
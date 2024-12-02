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
    allVariants:{
      textAlign: 'center',
      padding: '0.5rem',
    },
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
      padding: '1rem',
      margin: '10rem',
    },
  },
});

export default gatorTheme;
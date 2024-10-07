import React from 'react';
import HomeView from './pages/homeview';
import EventCreatorPage from './pages/eventcreatorpage';
import EventDetails from './pages/eventdetails';
import Login from './pages/login';
import Profile from './pages/profile';
import Schedule from './pages/schedule';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';  // Import MUI ThemeProvider and createTheme

const gatorTheme = createTheme({
  palette: {
    primary: {
      main: '#FA4616', // Gator Orange
    },
    secondary: {
      main: '#0021A5', // Gator Blue
    },
    background: {
      default: '#f5f5f5', // Optional: A neutral background color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // You can choose a custom font here if needed
  },
});

function App() {
  return (
    <ThemeProvider theme={gatorTheme}>
      <div> 
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/create" element={<EventCreatorPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

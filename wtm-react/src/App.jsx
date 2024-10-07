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

// Create a custom theme (optional)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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

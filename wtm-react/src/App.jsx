import React from 'react';
import HomeView from './pages/homeviewpage';
import EventCreatorPage from './pages/eventcreatorpage';
import EventDetails from './pages/eventdetailspage';
import Login from './pages/login';
import Profile from './pages/profile';
import Schedule from './pages/schedule';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    fontFamily: 'Arial, sans-serif',
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
          <Route path="/event/:id" element={<EventDetails />} /> {/* Dynamic route for event details */}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

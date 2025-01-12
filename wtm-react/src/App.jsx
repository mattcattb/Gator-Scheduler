import React, { useContext } from 'react';
import HomeView from './pages/homeview';
import MeetingCreator from './pages/meetingcreator';
import MeetingDetails from './pages/meetingdetails';
import LoginPage from './pages/login';
import Profile from './pages/profile';
import Schedule from './pages/schedule';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';

import './styles/App.css';

import { UserContext } from './context/UserProvider';

const ProtectedRoute = ({ children }) => {
  const {token} = useContext(UserContext);
  return token ? children : <Navigate to="/login" replace/>;
};

const LoginOnlyRoute = ({ children }) => {
  const {token} = useContext(UserContext);
  return token ? <Navigate to="/home" replace/> : children;
};

function App() {
  return (
    <div> 
      <Navbar />
      <Routes>
        <Route path="/home" element={<ProtectedRoute><HomeView /></ProtectedRoute>} />
        <Route path="/login" element={<LoginOnlyRoute><LoginPage /></LoginOnlyRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><MeetingCreator/></ProtectedRoute>} />
        <Route path="/meeting/:id" element={<ProtectedRoute><MeetingDetails /></ProtectedRoute>} /> {/* Dynamic route for meeting details */}

        <Route path="*" element={<ProtectedRoute><HomeView /></ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;

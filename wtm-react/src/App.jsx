import logo from './logo.svg';
import HomeView from './pages/homeview';
import EventCreatorPage from './pages/eventcreatorpage';
import EventDetails from './pages/eventdetails';
import Login from './pages/login';
import Profile from './pages/profile';
import Schedule from './pages/schedule';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import './App.css';

function App() {
  return (
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
  );
}

export default App;

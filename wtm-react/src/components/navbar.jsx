import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/create">Create Event</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';


const nav_data = [
  {linkto:"/", text:"Home"},
  {linkto:"/login", text:"Login"},
  {linkto:"/create", text:"Create Meeting"},
  {linkto:"/schedule", text:"Schedule"},
  {linkto:"/profile", text:"Profile"},
  {linkto:"/logout", text:"Logout"},
]

function Navbar() {
  return (
    <nav className='bg-blue-600 text-white'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='flex flex-row justify-center'>
          <div className="flex items-center m-3">
            {nav_data.map(({linkto, text}) => (<div className='m-4'><Link to={linkto}>{text}</Link></div>))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
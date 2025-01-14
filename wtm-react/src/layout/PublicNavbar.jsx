import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';


const navData = [
  {linkto:"/", text:"Swamp-Sync"},
  {linkto:"/login", text:"Login"},
  {linkto:"/register", text:"Register"},
]

export default function PublicNavbar() {
  const location = useLocation();
  const {handleLogout} = useContext(UserContext);

  const isActive = (path) => location.pathname === path;

  return (
    <div className='bg-[#0f4d0f] h-24 max-w-[2480px] text-white'>      
      <nav className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>      
        <h1 className='w-full text-3xl font-bold text-[#00df9a]' >Swamp Sync</h1>
        
        <div className='flex flex-row justify-center'>
          {navData.map(({linkto, text}) => (
            <Link 
              key={linkto}
              to={linkto}
              className={`whitespace-nowrap m-4 p-auto font-bold ${isActive(linkto) ? 'underline' : ''}`}
            >
              {text}
            </Link>
          ))}              
        </div>
      </nav>
    </div>
  );
}

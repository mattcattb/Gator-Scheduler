import React from 'react'
import { GrSchedule } from "react-icons/gr";
import { FaUserFriends, FaHome } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import { useNavigate, useLocation } from 'react-router-dom';


export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className='h-[1000px] w-[200px]'>
      <div className='flex flex-col justify-normal items-center p-auto gap-4 m-3'>
        <button 
          className={`px-4 py-2 rounded focus:outline-none focus:ring ${isActive('/home') ? 'bg-gray-800 text-white' : ''}`}
          onClick={() => navigate('/home')}
        >
          <FaHome className='w-14 h-14' />
        </button>
        <button 
          className={`px-4 py-2 rounded focus:outline-none focus:ring ${isActive('/schedule') ? 'bg-gray-800 text-white' : ''}`}
          onClick={() => navigate('/schedule')}
        >
          <GrSchedule className='w-14 h-14' />
        </button>
        <button 
          className={`px-4 py-2 rounded focus:outline-none focus:ring ${isActive('/friends') ? 'bg-gray-800 text-white' : ''}`}
          onClick={() => navigate('/friends')}
        >
          <FaUserFriends className='w-14 h-14' />
        </button>
        <button
          className={`px-4 py-2 rounded focus:outline-none focus:ring ${isActive('/logout') ? 'bg-gray-800 text-white' : ''}`}
          onClick={() => navigate('/logout')}
        >
          <CiLogout className='w-14 h-14' />
        </button>
      </div>
    </div>
  );
}
import React from 'react'
import { GrSchedule } from "react-icons/gr";
import { FaUserFriends, FaHome } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigator = useNavigate() 
  
  return (
    <div className='h-[1000px] w-[200px]'>
      <div className='flex flex-col justify-normal items-center p-auto gap-4 m-3'>
        <button 
          className='px-4 py-2 rounded focus:outline-none focus:ring'
          onClick={()=>{navigator('/home')}}>
          <FaHome className='w-14 h-14'/>
        </button>
        <button 
          className='px-4 py-2 rounded focus:outline-none focus:ring'
          onClick={()=>navigator('/schedule')}
        >
          <GrSchedule className='w-14 h-14'/>
        </button>
        <button className='px-4 py-2 rounded focus:outline-none focus:ring'>
          <FaUserFriends className='w-14 h-14'/>
        </button>  
        <button className='px-4 py-2 rounded focus:outline-none focus:ring'>
          <CiLogout className='w-14 h-14'/>
        </button>              
      </div>
    </div>
  )
}

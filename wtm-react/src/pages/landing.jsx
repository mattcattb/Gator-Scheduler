import React from 'react'
import { useNavigate } from 'react-router-dom';

import {ReactTyped} from 'react-typed'

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className='text-black'>
      <div className='max-w-[900px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-orange-600 font-bold p-2 text-3xl'>Welcome to Swamp-Sync</p>
        <h1 className='text-5xl font-bold md:py-6'>Organize and Sync up Schedules!</h1>
        <div className='flex flex-row justify-center items-center'>
          <p className='text-3xl font-bold'>Find the best times to meet for </p>
          <ReactTyped className='text-3xl font-bold pl-3' strings={['projects','band practice', "studying", "hangouts", ]} typeSpeed={120} backSpeed={140} loop/>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500 mt-4'>Simplify scheduling meetings with your friends and colleagues, even with busy schedules.</p>
        
        <div className='flex flex-row justify-center mt-4'>
          <button onClick={()=>{navigate("/register")}} className='bg-orange-600 w-[200px] rounded-md text-xl my-6 mx-auto py-6 text-white'>Sign Up</button>
          <button onClick={()=>{navigate("/login")}} className='text-xl outline-4 text-black w-[200px] font-medium my-6 py-6 mx-auto'>Login</button>

        </div>      
      </div>
    </div>
  )
}

export default LandingPage

import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';


const navData = [
  {linkto:"/", text:"Home"},
  {linkto:"/login", text:"Login"},
  {linkto:"/create", text:"Create Meeting"},
  {linkto:"/schedule", text:"Schedule"},
  {linkto:"/profile", text:"Profile"},
]

function Navbar() {
  const location = useLocation();
  const {handleLogout} = useContext(UserContext);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className='bg-blue-600 text-white'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='flex flex-row justify-center'>
          <div className="flex items-center m-3">
            {navData.map(({linkto, text}) => (
              <div className='m-4' key={linkto}>
                <Link 
                  to={linkto}
                  className={isActive(linkto) ? 'underline' : ''}
                >
                  {text}
                </Link>
              </div>))}
            <span 
              onClick={() => handleLogout()}
              className='cursor-pointer ml-10'
            >
            Logout
            </span>               
          </div>       
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
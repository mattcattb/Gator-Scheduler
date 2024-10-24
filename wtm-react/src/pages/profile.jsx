import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

import "../components/Profile/profile.css"

function iconIdToPath(id){
  const map = new Map([
    ["1", "/user_icons/user_icon_1.png"],
    ["2", "/user_icons/user_icon_2.png"],
    ["3", "/user_icons/user_icon_3.png"],
    ["4", "/user_icons/user_icon_4.png"],
    ["5", "/user_icons/user_icon_5.png"],
  ])
  return map.get(id);
}

function Profile() {
  const { user } = useContext(UserContext);

    return (
      <div className="profile-container">
        <div className="user-info">
          <img src={iconIdToPath(user.icon)} alt="User Icon" 
          className="user-icon" />
          <div className='user-details'>
            <h2 className="username">{user.username}</h2>
            <p className="friend-code">Friend Code: {user._id}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Profile;
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import FriendCardBay from '../components/Profile/FriendCardBay';
import FriendRequester from '../components/Profile/FriendRequester';

import "../styles/profile.css"

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
  const [friendID, setFriendID] = useState('');

    return (
      // the first div is one big heap of slop so that i could accomplish the alignment successfully
      <div>
        <div className="profile-container">
          <div className="user-info">
            <img src={iconIdToPath(user.icon)} alt="User Icon" 
            className="user-icon" />
            <div className='user-details'>
              <h2 className="username">{user.name}</h2>
              <p className="friend-code">Friend Code: {user._id}</p>
            </div>
          </div>
        </div>
        {/* these two components handle adding friends and showing added friends respectively */}
        <div className='friends-section'>
          <FriendRequester friendID={friendID} setFriendID={setFriendID}/>
          <FriendCardBay/>
        </div>
      </div>
    );
  }
  
  export default Profile;
import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';

function Profile() {
  const { user } = useContext(UserContext);

    return (
      <div className="Profile">
        Profile Page {user.username}
      </div>
    );
  }
  
  export default Profile;
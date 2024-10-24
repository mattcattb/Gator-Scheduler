import { Button } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import users from "../../static_database/users.json"
import FriendCard from "./FriendCard";

function FriendCardBay() {
    const { user } = useContext(UserContext);

    const findFriends = (userId) => {
        // Find the user object by ID
        const user = users.find(u => u._id === userId);
        
        if (!user) {
            return []; // If user is not found, return an empty array
        }
    
        // Map over the friends array to find corresponding user objects
        const friends = user.friends.map(friendId => {
            return users.find(u => u._id === friendId);
        });

        return friends; // Returns an array of friend objects
    };

    return(
        <div className="friends-card-group" style={{
            minWidth:'90vw',
            maxWidth:'90vw',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
        }}>
            <h2>Current Friends</h2>
            <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(2, 1fr)',
                gap:'2rem',
            }}>
                {findFriends(user._id).map(item =>(
                    <FriendCard key={item._id} id={item.icon} username={item.username}/>
                ))}
            </div>
        </div>
        
    )
}

export default FriendCardBay;
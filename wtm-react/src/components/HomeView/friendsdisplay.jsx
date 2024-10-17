import { Box, Typography, Card, CardContent, Button } from '@mui/material';


function FriendsDisplay({friends}) {
    // show all of your friends, when clicked view their schedule
    return (
      <Box>
        <Typography variant='h4' gutterBottom>Your Friends</Typography>
        
        {friends.map((friend) => (
          <FriendsPreview key={friend.id} friend={friend} />
        ))}
      </Box>
    )
  }


function FriendsPreview({friend}) {
  return (
    <Box>
      <Typography variant='h5'>{friend.name}</Typography>
    </Box>
  )
}

export default FriendsDisplay;



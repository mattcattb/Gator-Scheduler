import { Box, Typography, Card, CardContent, Button } from '@mui/material';

function FriendsDisplay() {
    // show all of your friends, when clicked view their schedule
    return (
      <Box>
        <Typography variant='h4' gutterBottom>Your Friends</Typography>
        <FriendsPreview/>
      </Box>
    )
  }


function FriendsPreview() {
  return (
    <div>
      
    </div>
  )
}

export default FriendsDisplay;



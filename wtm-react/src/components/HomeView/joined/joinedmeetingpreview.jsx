import {React, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';

import { UserContext } from '../../../context/UserProvider';

function JoinedMeetingPreview({ meeting, onLeave }) {
  
  const navigate = useNavigate();
  
  const {user} = useContext(UserContext);

  const handleMeetingClick = () => {
    navigate(`/meeting/${meeting._id}`);  // Use _id since that is the correct field in the provided data
  };

  const handleLeave = (e) => {
    e.stopPropagation(); // stopclick event triggering handle meeting click
    console.log("Leave button pressed...");
    console.log("user:", user);
    onLeave(user._id, meeting._id)
  }

  const daysOfWeek = ['su', 'm', 't', 'w', 'th', 'f', 'sa'];
  var selectedDays = daysOfWeek.filter((_, index) => meeting.selectedDays[index] === "true");

  // Function to check if a day is selected
  const isDaySelected = (day) => {
    return selectedDays.includes(day);
  };

  return (
    <Card sx={{ marginBottom: 2, cursor: 'pointer' }} onClick={handleMeetingClick}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{meeting.name}</Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>{meeting.description}</Typography>
        <Typography variant="caption" display="block" gutterBottom>{`Organizers: ${meeting.organizers.length}`}</Typography>
        <Typography variant="caption" display="block" gutterBottom>{`Time: ${meeting.timeRange.startTime} - ${meeting.timeRange.endTime}`}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          {daysOfWeek.map((day) => (
            <Chip
              key={day}
              label={day.toUpperCase()}
              color={isDaySelected(day) ? 'primary' : 'default'}
              sx={{ width: 32 }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleLeave} sx={{ marginRight: 1 }}>Leave Meeting</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default JoinedMeetingPreview;
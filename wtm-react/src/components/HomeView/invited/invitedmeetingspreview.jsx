import React, { useState, useContext } from 'react';

import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { UserContext } from '../../../context/UserProvider';

function InvitedMeetingsPreview({ meeting, onJoin, onReject }) {

  const user = useContext(UserContext);

  const handleJoin = () => {
    onJoin(user._id, meeting._id);
  };

  const handleReject = () => {
    onReject(user._id, meeting._id);
  };

  const daysOfWeek = ['su', 'm', 't', 'w', 'th', 'f', 'sa'];

  // Function to check if a day is selected
  const isDaySelected = (day) => {
    return meeting.range.days.includes(day);
  };

  return (
    <Card sx={{ marginBottom: 2, cursor: 'pointer' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{meeting.name}</Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>{meeting.description}</Typography>
        <Typography variant="caption" display="block" gutterBottom>{`Organizers: ${meeting.organizers.length}`}</Typography>
        <Typography variant="caption" display="block" gutterBottom>{`Time: ${meeting.range.start_time} - ${meeting.range.end_time}`}</Typography>
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
          <Button variant="contained" color="primary" onClick={handleJoin} sx={{ marginRight: 1 }}>Join</Button>
          <Button variant="contained" color="error" onClick={handleReject}>Reject</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default InvitedMeetingsPreview;
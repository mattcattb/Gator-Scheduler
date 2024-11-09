import React from 'react';
import MeetingPreview from './meetingpreview';  // Import the MeetingPreview component
import { Box, Typography } from '@mui/material';

function JoinedMeetings({ meetings }) {
  
  if (meetings.length === 0) {
    return (<Typography variant="h4">No meetings joined yet</Typography>);
  }
  
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Joined Meetings</Typography>
      {meetings.map((meeting) => (
        <MeetingPreview key={meeting.id} meeting={meeting} />
      ))}
    </Box>
  );
}

export default JoinedMeetings;

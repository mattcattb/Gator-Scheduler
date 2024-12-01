import React from 'react';
import MeetingPreview from './joinedmeetingpreview';  // Import the MeetingPreview component
import { Box, Typography } from '@mui/material';

function JoinedMeetingsBar({ meetings, onLeave }) {
  
  console.log("in the joined meetings bar with following meetings: ", meetings);
  if (meetings.length === 0) {
    return (<Typography variant="h4">No meetings joined yet</Typography>);
  }

  const filteredArray = meetings.filter(item => item !== undefined);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Joined Meetings</Typography>
      {filteredArray.map((meeting) => (
        <MeetingPreview key={meeting._id} meeting={meeting} onLeave={onLeave} />
      ))}
    </Box>
  );
}

export default JoinedMeetingsBar;

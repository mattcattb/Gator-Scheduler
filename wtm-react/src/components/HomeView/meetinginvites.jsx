import React from 'react';
import MeetingInvitePreview from './meetinginvitepreview';  // Import the MeetingPreview component
import { Box, Typography } from '@mui/material';

function MeetingInvites({ meetings_invited, onJoin, onReject }) {
  
  if (meetings_invited.length === 0) {
    return (<Typography variant="h4">No Meeting Invites!</Typography>);
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Invites to Meetings:</Typography>
      {meetings_invited.map((meeting) => (
        <MeetingInvitePreview key={meeting._id} meeting={meeting} onJoin={onJoin} onReject={onReject} />
      ))}
    </Box>
  );
}

export default MeetingInvites;

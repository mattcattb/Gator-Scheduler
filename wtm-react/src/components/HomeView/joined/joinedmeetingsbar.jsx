import React from 'react';
import MeetingPreview from './joinedmeetingpreview';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function JoinedMeetingsBar({ meetings, onLeave }) {
  const navigate = useNavigate();

  if (meetings.length === 0) {
    return (<Typography variant="h4">No meetings joined yet</Typography>);
  }

  const filteredArray = meetings.filter(item => item !== undefined);

  // Handle meeting click
  const handleMeetingClick = (meetingId) => {
    navigate(`/meeting/${meetingId}`);
  };

  // Handle leave meeting
  const handleLeave = (userId, meetingId) => {
    onLeave(userId, meetingId);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Joined Meetings</Typography>
      {filteredArray.map((meeting) => (
        <MeetingPreview
          key={meeting._id}
          meeting={meeting}
          handleMeetingClick={handleMeetingClick}
          handleLeave={handleLeave}
        />
      ))}
    </Box>
  );
}

export default JoinedMeetingsBar;
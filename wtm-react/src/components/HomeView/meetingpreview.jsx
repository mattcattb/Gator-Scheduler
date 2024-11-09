import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

function MeetingPreview({ meeting }) {
  const navigate = useNavigate();

  const handleMeetingClick = () => {
    navigate(`/meeting/${meeting.id}`);  // Navigate to Meeting details page
  };

  return (
    <Card sx={{ marginBottom: 2, cursor: 'pointer' }} onClick={handleMeetingClick}>
      <CardContent>
        <Typography variant="h5">{meeting.name}</Typography>
        <Typography variant="body2">{meeting.description}</Typography>
        <Typography variant="caption">{`Date: ${meeting.date}`}</Typography>
      </CardContent>
    </Card>
  );
}

export default MeetingPreview;

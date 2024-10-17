import React from 'react';
import EventPreview from './eventpreview';  // Import the EventPreview component
import { Box, Typography } from '@mui/material';

function JoinedEvents({ events }) {
  
  if (events.length === 0) {
    return (
      <>
        <Typography variant="h4">Joined Events</Typography>
        <Typography variant="body1">Join an event to see it here.</Typography>
      </>
    );
  }
  
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Joined Events</Typography>
      {events.map((event) => (
        <EventPreview key={event.id} event={event} />
      ))}
    </Box>
  );
}

export default JoinedEvents;

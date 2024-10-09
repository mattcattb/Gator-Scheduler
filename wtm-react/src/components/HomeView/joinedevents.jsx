import React from 'react';
import EventPreview from './eventpreview';  // Import the EventPreview component
import { Box, Typography } from '@mui/material';
import { sampleEvents } from '../../static_database/SampleData';

function JoinedEvents({ events }) {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Joined Events</Typography>

      {/* Map through all events and show EventPreview for each */}
      {sampleEvents.map((event) => (
        <EventPreview key={event.id} event={event} />
      ))}
    </Box>
  );
}

export default JoinedEvents;

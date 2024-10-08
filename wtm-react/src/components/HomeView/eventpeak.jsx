import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import {sampleEvents} from './SampleData';

function EventDetails() {
  const { id } = useParams(); // Get the event ID from the URL
  const event = sampleEvents.find((e) => e.id === parseInt(id));

  if (!event) return <Typography variant="h6">Event not found</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>{event.name}</Typography>
      <Typography variant="body1">{event.description}</Typography>
      <Typography variant="caption">Date: {event.date}</Typography>
    </Box>
  );
}

export default EventDetails;
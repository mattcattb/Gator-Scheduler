import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {sampleEvents} from './SampleData';

function JoinedEvents() {
  const navigate = useNavigate();

  // Navigate to specific event details page
  const goToEventDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <>
      <Typography variant='h4'>Joined Events</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {sampleEvents.map((event) => (
          <Card 
            key={event.id} 
            onClick={() => goToEventDetails(event.id)} 
            sx={{ minWidth: 275, cursor: 'pointer', backgroundColor: '#fafafa' }}
          >
            <CardContent>
              <Typography variant="h5">{event.name}</Typography>
              <Typography variant="body2">{event.description}</Typography>
              <Typography variant="caption">{event.date}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default JoinedEvents;

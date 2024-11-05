// EventList.jsx
import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const EventList = ({ events, onEventClick }) => {
  return (
    <Box sx={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', borderRadius: 1, p: 2 }}>
      <Typography variant="h6">Events</Typography>
      <List>
        {events.map((event) => (
          <ListItem button key={event.id} onClick={() => onEventClick(event)}>
            <ListItemText primary={event.title} secondary={event.start} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EventList;

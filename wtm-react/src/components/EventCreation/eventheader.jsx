import React from 'react';
import TextField from '@mui/material/TextField';  
import Box from '@mui/material/Box';  // Import Box from MUI

function EventHeader({eventName, setEventName, eventDescription, setEventDescription}) {
    return (
      <Box sx={{ padding: 2 }}> 
        <h1>Create New Event</h1>
        
        <TextField
          label="Event Name"
          variant="outlined"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Event Description"
          variant="outlined"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </Box>
    );
  }
export default EventHeader;

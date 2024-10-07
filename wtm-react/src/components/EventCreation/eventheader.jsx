import React from 'react';
import TextField from '@mui/material/TextField';  


function EventHeader({eventName, setEventName, eventDescription, setEventDescription}) {
    return (
      <div className="event-header">
        <h1>Create New Event</h1>
        
        {/* Event Name TextField */}
        <TextField
          label="Event Name"
          variant="outlined"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        {/* Event Description TextField (multiline) */}
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
      </div>
    );
  }
export default EventHeader;
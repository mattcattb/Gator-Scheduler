import React from 'react'
import { Box, TextField } from '@mui/material';

import DaySelection from './dayselection';  
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function MeetingOptions() {
  return (
    <Box>

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
      <DaySelection />
      <TimePicker
        label="No sooner then"
        value={new Date()}
        onChange={(newValue) => console.log('New Start Time:', newValue)}
      />
      <TimePicker
        label="No later then"
        value={new Date(new Date().getTime() + 60 * 60 * 1000)} // 1 hour later
        onChange={(newValue) => console.log('New End Time:', newValue)}
      />
    </Box>  
  )
}

import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// with date-fns v3.x or v4.x
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { de } from 'date-fns/locale/de';
import { LocalizationProvider } from '@mui/x-date-pickers';


export default function EventModal({
  open,
  handleClose,
  handleSubmit,
  presetEventTitle = '',
  presetEventBio = '',
  presetStartDate = null,
  presetStartTime = null,
  presetEndTime = null,
}) {
  // Local state for the modal
  const [eventTitle, setEventTitle] = useState(presetEventTitle);
  const [eventBio, setEventBio] = useState(presetEventBio);
  const [startDate, setStartDate] = useState(presetStartDate);
  const [startTime, setStartTime] = useState(presetStartTime);
  const [endTime, setEndTime] = useState(presetEndTime);

  const onSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now().toString(),
      title: eventTitle,
      bio: eventBio,
      startDate: startDate,
      startTime: startTime,
      endTime : endTime,
    };
    console.log('New Event:', newEvent);
    handleSubmit(newEvent); // Pass the new event back to the parent
    handleClose(); // Close the modal
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="add-event-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="add-event-modal" variant="h6" component="h2">
          Add New Event
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            label="Event Title"
            fullWidth
            margin="normal"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
          <TextField
            label="Event Bio"
            fullWidth
            margin="normal"
            value={eventBio}
            onChange={(e) => setEventBio(e.target.value)}
            required
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
            />
            <TimePicker 
              label="Start Time" 
              value={startTime} 
              onChange={(newValue) => setStartTime(newValue)} 
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}  
            />
            <TimePicker 
              label="End Time"
              value={endTime} 
              onChange={(newValue) => setEndTime(newValue)} 
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />} 
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Event
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

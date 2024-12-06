import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { format, parse } from 'date-fns';

// Define the AddEventModal component
export default function AddEventModal({
  open,
  handleClose,
  handleSubmit,
}) {
  // Local state for the modal
  const [eventTitle, setEventTitle] = useState("My Event");
  const [eventDescription, setEventDescription] = useState("My Description");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(new Date().getTime() + 60 * 60 * 1000));

  // Handling form submission
  const onSubmit = (e) => {
    // when submit pressed, properly formate the state and update new event 
    
    e.preventDefault();

    const start = new Date(date);

    start.setHours(startTime.getHours());
    start.setMinutes(startTime.getMinutes());

    const end = new Date(date);
    end.setHours(endTime.getHours());
    end.setMinutes(endTime.getMinutes());

    // Create new event object with formatted dates
    const newEvent = {
      _id: Date.now().toString(),
      title: eventTitle,
      description: eventDescription,
      start: format(start, 'yyyy-MM-dd HH:mm'),
      end: format(end, 'yyyy-MM-dd HH:mm'),
    };

    // Call the handleSubmit function passed as a prop to handle the new event
    handleSubmit(newEvent);
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
            label="Event Description"
            fullWidth
            margin="normal"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
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
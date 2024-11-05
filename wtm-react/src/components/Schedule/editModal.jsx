import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { de } from 'date-fns/locale/de';
import { LocalizationProvider } from '@mui/x-date-pickers';

export default function EditModal({
  open,
  handleClose,
  event, // Event to be edited
  onSubmit,
  onDelete
}) {
  // Local state for the modal
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Effect to populate modal fields when the event changes
  useEffect(() => {
    if (event) {
      setEventTitle(event.title || '');
      setEventDescription(event.description || '');
      setStartDate(new Date(event.start)); // Assuming event.start is in a parseable date format
      setStartTime(new Date(event.start)); // Assuming you want the same as start
      setEndTime(new Date(event.end)); // Assuming event.end is in a parseable date format
    }
  }, [event]);

  const onEditSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      id: event.id, // Keep the same ID
      title: eventTitle,
      description: eventDescription,
      start: startDate, // Format these as needed
      startTime: startTime,
      end: endTime,
    };
    console.log('Updated Event:', updatedEvent);
    onSubmit(updatedEvent); // Pass the updated event back to the parent
    handleClose(); // Close the modal
  };

  const handleDelete  = () => {
    if (event && event.id) {
        onDelete(event.id);
        handleClose(); // Close the modal
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="edit-event-modal">
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
        <Typography id="edit-event-modal" variant="h6" component="h2">
          Edit Event
        </Typography>
        <form onSubmit={onEditSubmit}>
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
            Save Changes
          </Button>
          <Button variant="contained" onClick={handleDelete} sx={{ mt: 2 }}>
            Delete
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

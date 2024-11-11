import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { format, parse } from 'date-fns';

export default function EditEventModal({
  open,
  handleClose,
  event, // Event to be edited
  onSubmit,
  onDelete
}) {
  // Local state for the modal
  const [eventTitle, setEventTitle] = useState(event ? event.title : '');
  const [eventDescription, setEventDescription] = useState(event ? event.description : '');
  const [date, setDate] = useState(event ? parse(event.start, 'yyyy-MM-dd HH:mm', new Date()) : null);
  const [startTime, setStartTime] = useState(event ? parse(event.start, 'yyyy-MM-dd HH:mm', new Date()) : null);
  const [endTime, setEndTime] = useState(event ? parse(event.end, 'yyyy-MM-dd HH:mm', new Date()) : null);

  useEffect(() => {
    if (event) {
      setEventTitle(event.title || '');
      setEventDescription(event.description || '');
      const parsedStart = parse(event.start, 'yyyy-MM-dd HH:mm', new Date());
      const parsedEnd = parse(event.end, 'yyyy-MM-dd HH:mm', new Date());
      setDate(parsedStart);
      setStartTime(parsedStart);
      setEndTime(parsedEnd);
    }
  }, [event]);


  const handleDelete = () => {
    if (event && event._id) {
      onDelete(event._id);
      handleClose(); // Close the modal
    }
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
  
    if (!date || !startTime || !endTime) {
      return;
    }
  
    const start = new Date(date);
    start.setHours(startTime.getHours());
    start.setMinutes(startTime.getMinutes());
  
    const end = new Date(date);
    end.setHours(endTime.getHours());
    end.setMinutes(endTime.getMinutes());
  
    const updatedEvent = {
      _id: event._id,
      title: eventTitle,
      description: eventDescription,
      start: format(start, 'yyyy-MM-dd HH:mm'),
      end: format(end, 'yyyy-MM-dd HH:mm')
    };
  
    onSubmit(updatedEvent);
    handleClose();
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
            Save Changes
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete} sx={{ mt: 2, ml: 2 }}>
            Delete
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
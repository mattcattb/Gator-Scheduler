import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';

export default function AddEventModal() {
  const [open, setOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Function to handle the opening/closing of the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can pass the event details to your calendar's event service
    const newEvent = {
      id: Date.now().toString(), // Unique ID for the new event
      title: eventTitle,
      start: startDate,
      end: endDate,
    };

    console.log('New Event:', newEvent);
    // You can now use your calendar's event service to add the new event

    // Close the modal after submission
    handleClose();
  };

  return (
    <div>
      {/* Material-UI Button to open the modal */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Event
      </Button>

      {/* Modal Popup */}
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
          {/* Form inside the modal */}
          <Typography id="add-event-modal" variant="h6" component="h2">
            Add New Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Event Title"
              fullWidth
              margin="normal"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
            />
            <TextField
              label="Start Date (YYYY-MM-DD HH:mm)"
              fullWidth
              margin="normal"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <TextField
              label="End Date (YYYY-MM-DD HH:mm)"
              fullWidth
              margin="normal"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Add Event
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

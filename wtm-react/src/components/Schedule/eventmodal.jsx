import React from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function EventModal({ open, handleClose, handleSubmit, eventTitle, setEventTitle, startDate, setStartDate, endDate, setEndDate }) {
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
        <form onSubmit={handleSubmit}>
          <TextField
            label="Event Title"
            fullWidth
            margin="normal"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
          <DateTimePicker
            label="Start Date and Time"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(props) => <TextField fullWidth margin="normal" {...props} />}
          />
          <DateTimePicker
            label="End Date and Time"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(props) => <TextField fullWidth margin="normal" {...props} />}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Event
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

import React, { useState } from 'react';
import { Button } from '@mui/material';
import EventModal from './eventmodal'; // Import the new EventModal component

export default function AddEventButton({ calendar }) {
  const [open, setOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [startDate, setStartDate] = useState(null); // Use null initially for DatePicker compatibility
  const [endDate, setEndDate] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now().toString(),
      title: eventTitle,
      start: startDate,
      end: endDate,
    };
    console.log('New Event:', newEvent);
    calendar.eventsService.add(newEvent);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Event
      </Button>

      {/* Pass props to EventModal */}
      <EventModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </div>
  );
}

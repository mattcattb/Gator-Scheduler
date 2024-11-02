import React, { useState } from 'react';
import { Button } from '@mui/material';
import EventModal from './eventmodal';
import { formatISO } from 'date-fns'; // Import date-fns to format dates


export default function AddEventButton({calendar}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (newEvent) => {
    console.log('New Event from Modal:', newEvent);

    // Check if startDate and endDate are valid dates
    const startDate = newEvent.startDate instanceof Date && !isNaN(newEvent.startDate) 
      ? formatISO(newEvent.startDate) // Format startDate
      : new Date(); // Fallback to now if invalid

    const endDate = newEvent.endTime instanceof Date && !isNaN(newEvent.endTime) 
      ? formatISO(newEvent.endTime) // Format endDate
      : new Date(new Date().getTime() + 60 * 60 * 1000); // Fallback to 1 hour later


    // Add the new event to the local state
    const eventToAdd = {
      id: Date.now().toString(), // Generate a simple ID
      title: newEvent.title,
      bio: newEvent.bio,
      startDate: formatISO(newEvent.startDate),
      startTime: formatISO(newEvent.startTime),
      endTime: formatISO(newEvent.endTime),
    };
    calendar.eventsService.add(eventToAdd);

    handleClose(); // Close the modal after submission
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Event
      </Button>

      <EventModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        presetEventBio = "My Bio"
        presetEventTitle="My Event" // Example preset value
        presetStartDate={new Date()} // Example preset start date
        presetStartTime={new Date()} // Example preset start time
        presetEndTime={new Date(new Date().getTime() + 60 * 60 * 1000)} // Example preset end time (1 hour later)
      />
    </div>
  );
}

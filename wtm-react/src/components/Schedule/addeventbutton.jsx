import React, { useState } from 'react';
import { Button } from '@mui/material';
import EventModal from './eventmodal';
import { format } from 'date-fns';


export default function AddEventButton({calendar}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (newEvent) => {
    console.log('New Event from Modal:', newEvent);
  
    // Format the dates as 'YYYY-MM-DD HH:mm'
    const startDate = newEvent.startDate instanceof Date && !isNaN(newEvent.startDate)
      ? format(newEvent.startDate, 'yyyy-MM-dd HH:mm') // Format startDate
      : format(new Date(), 'yyyy-MM-dd HH:mm'); // Fallback to now if invalid
  
    const endTime = newEvent.endTime instanceof Date && !isNaN(newEvent.endTime)
      ? format(newEvent.endTime, 'yyyy-MM-dd HH:mm') // Format endTime
      : format(new Date(new Date().getTime() + 60 * 60 * 1000), 'yyyy-MM-dd HH:mm'); // Fallback to 1 hour later
  
    // Create event object
    const eventToAdd = {
      id: Date.now(), // Unique ID based on current timestamp
      start: startDate, // Formatted start date
      end: endTime,   // Formatted end date
      title: newEvent.title || 'Untitled Event', // Optional title
      description: newEvent.description || 'No description provided', // Optional description
    };
  
    // Add event to the calendar
    calendar.eventsService.add(eventToAdd);
  
    handleClose(); // Close modal after submission
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
        presetEventDescription = "My Description"
        presetEventTitle="My Event" // Example preset value
        presetStartDate={new Date()} // Example preset start date
        presetStartTime={new Date()} // Example preset start time
        presetEndTime={new Date(new Date().getTime() + 60 * 60 * 1000)} // Example preset end time (1 hour later)
      />
    </div>
  );
}

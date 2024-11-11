import { useEffect, useState } from 'react'   
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewMonthGrid, createViewWeek, createViewMonthAgenda } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'

import { Button } from '@mui/material';

import EventList from '../components/Schedule/eventlist.jsx'
import EditModal from "../components/Schedule/editeventmodal.jsx"; // Import the EditModal component
import AddEventModal from '../components/Schedule/addeventmodal.jsx'

// todo properly order times input, and submit to backend when submit clicked
// todo change modal to be named editEventModal and createEventModal

const sample_events = [
  {
    "_id": "eventID10",
    "title": "Evening Walk",
    "description": "Relaxing walk through the park",
    "start": "2024-11-11 19:00",
    "end": "2024-11-11 20:00"
  },
  {
    "_id": "eventID11",
    "title": "Conference Call",
    "description": "Call with the offshore team",
    "start": "2024-11-12 08:00",
    "end": "2024-11-12 09:30"
  }
] 

function Schedule() {

  //! First, get all the users events for the calender from the backend
  const [events, setEvents] = useState(sample_events);
  const [selectedEvent, setSelectedEvent] = useState(null); // State for the selected event
  const [editEventModalOpen, setEditEventModalOpen] = useState(false); // State for modal visibility
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  // Then, create scheduleXCalendar with the config and plugins and users events.
  const plugins = [createEventsServicePlugin()]

  const callbacks = {    
    onEventClick(calendarEvent) {
      // when an event on calender is clicked, open a edit event modal.
      setSelectedEvent(calendarEvent); // Set the selected event
      setEditEventModalOpen(true); // Open the edit modal
      console.log('onEventClick', calendarEvent)  
    },
    onDayClick(day) {
      // what what happens when a data is clicked...
      console.log('onDayClick', day)
    }
  };

  const config = {
    views: [createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    callbacks: callbacks,
    weekOptions: {
      gridHeight: 1500,
      eventWidth: 95,
      timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },
    },
  }

  const calendar = useCalendarApp(config, plugins)
 
  useEffect(() => {
    // get all events
    calendar.eventsService.getAll()
  }, [calendar.eventsService])

  const handleCloseModal = () => {
    // when closemodal clicked, set it to false and set selected event to null. 
    setEditEventModalOpen(false);
    setSelectedEvent(null); // Clear selected event on close
  };

  const handleEditSubmit = (updatedEvent) => {
    // Update the event in the calendar service
    const newEvents = events.map(event => event._id === updatedEvent._id ? updatedEvent : event);
    setEvents(newEvents);    
    calendar.eventsService.update(updatedEvent._id, updatedEvent); // Assuming you have an update method
    setEditEventModalOpen(false); // Close the modal after submission
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event._id !== eventId);
    setEvents(updatedEvents);
    calendar.eventsService.remove(eventId);
    setEditEventModalOpen(false);
  };

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    calendar.eventsService.add(newEvent);
    setAddEventModalOpen(false);
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEditEventModalOpen(true);
  };

  // finally, return the parts of the schedule component
  return (
    <>
      <Button onClick={() => setAddEventModalOpen(true)} variant="contained" color="primary" sx={{ mb: 2 }}>Add Event</Button>
      <ScheduleXCalendar calendarApp={calendar} style={{ width: '80%', height: '400px', margin: '0 auto' }}/>
      <EventList events={events} onEventClick={handleEventClick} /> {/* Add the EventList here */}
      <EditModal 
        open={editEventModalOpen} 
        handleClose={handleCloseModal} 
        event={selectedEvent} 
        onSubmit={handleEditSubmit} 
        onDelete={handleDeleteEvent}
      />
      <AddEventModal 
        open={addEventModalOpen}
        handleClose={() => setAddEventModalOpen(false)}
        handleSubmit={handleAddEvent}
      />
    </>
  );
}

export default Schedule;
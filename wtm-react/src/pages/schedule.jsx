import { useEffect, useState } from 'react'   
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewMonthGrid, createViewWeek, createViewMonthAgenda } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'

import AddEventButton from "../components/Schedule/addeventbutton";
import EditModal from "../components/Schedule/editModal.jsx"; // Import the EditModal component
import EventList from '../components/Schedule/eventlist.jsx'

// todo properly order times input, and submit to backend when submit clicked
// todo change modal to be named editEventModal and createEventModal

const sample_events = [
  {
    "_id": "eventID10",
    "name": "Evening Walk",
    "description": "Relaxing walk through the park",
    "start": "2024-10-11 19:00",
    "end": "2024-10-11 20:00"
  },
  {
    "_id": "eventID11",
    "name": "Conference Call",
    "description": "Call with the offshore team",
    "start": "2024-10-12 08:00",
    "end": "2024-10-12 09:30"
  }
] 


function Schedule() {

  //! First, get all the users events for the calender from the backend
  const [events, setEvents] = useState(sample_events);

  console.log('users_events', events)

  // Then, create scheduleXCalendar with the config and plugins and users events.
  const plugins = [createEventsServicePlugin()]

  const [selectedEvent, setSelectedEvent] = useState(null); // State for the selected event
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility

  const callbacks = {    
    onEventClick(calendarEvent) {
      // when an event is clicked, open a modal to do something with the event.
      setSelectedEvent(calendarEvent); // Set the selected event
      setModalOpen(true); // Open the edit modal
      console.log('onEventClick', calendarEvent)  
    },
    onDayClick(day) {
      // what happens when a day is clicked!
      console.log('onDayClick', day)
    }
  };

  const config = {
    views: [createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    callbacks: callbacks,
    weekOptions: {
      gridHeight: 1500,
      // nDays: 7, // Optional; remove if you want to show all 7 days
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
    setModalOpen(false);
    setSelectedEvent(null); // Clear selected event on close
  };

  const handleEditSubmit = (updatedEvent) => {
    // Update the event in the calendar service
    calendar.eventsService.update(updatedEvent.id, updatedEvent); // Assuming you have an update method
    handleCloseModal(); // Close the modal after submission
  };

  const handleDeleteEvent = (eventId) => {
    calendar.eventsService.remove(eventId); // Use the eventsService to remove the event
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  // finally, return the parts of the schedule component
  return (
    <>
      <AddEventButton calendar={calendar}/>
      <ScheduleXCalendar calendarApp={calendar} style={{ width: '80%', height: '400px', margin: '0 auto' }}/>
      <EventList events={events} onEventClick={handleEventClick} /> {/* Add the EventList here */}
      <EditModal 
        open={modalOpen} 
        handleClose={handleCloseModal} 
        event={selectedEvent} 
        onSubmit={handleEditSubmit} 
        onDelete={handleDeleteEvent}
      />
    </>
  );
}

export default Schedule;
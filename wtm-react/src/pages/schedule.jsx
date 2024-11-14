import React, { useContext, useEffect, useState } from 'react';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createViewMonthGrid, createViewWeek, createViewMonthAgenda } from '@schedule-x/calendar';
import { Button } from '@mui/material';

import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';

import { UserContext } from '../context/UserProvider';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../api/eventService';

import EventList from '../components/Schedule/eventlist.jsx';
import EditModal from "../components/Schedule/editeventmodal.jsx";
import AddEventModal from '../components/Schedule/addeventmodal.jsx';

function Schedule() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const plugins = [createEventsServicePlugin()];

  const callbacks = {
    onEventClick(calendarEvent) {
      setSelectedEvent(calendarEvent);
      setEditEventModalOpen(true);
      console.log('onEventClick', calendarEvent);
    },
    onDayClick(day) {
      console.log('onDayClick', day);
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
  };

  const calendar = useCalendarApp(config, plugins);

  useEffect(() => {
    const getEvents = async () => {
      if (user && user._id) {
        try {
          const events = await fetchEvents(user._id);
          setEvents(events);
        } catch (error) {
          console.log("Error fetching events:", error);
        }
      }
    };
    getEvents();
  }, [user]);

  const handleCloseModal = () => {
    setEditEventModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEditSubmit = async (updatedEvent) => {
    try {
      await updateEvent(updatedEvent._id, updatedEvent);
      const newEvents = events.map(event => event._id === updatedEvent._id ? updatedEvent : event);
      setEvents(newEvents);
      calendar.eventsService.update(updatedEvent._id, updatedEvent);
      setEditEventModalOpen(false);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId, user._id);
      const updatedEvents = events.filter(event => event._id !== eventId);
      setEvents(updatedEvents);
      calendar.eventsService.remove(eventId);
      setEditEventModalOpen(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const event = await addEvent(user._id, newEvent);
      const updatedEvents = [...events, event];
      setEvents(updatedEvents);
      calendar.eventsService.add(event);
      setAddEventModalOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEditEventModalOpen(true);
  };

  return (
    <>
      <Button onClick={() => setAddEventModalOpen(true)} variant="contained" color="primary" sx={{ mb: 2 }}>
        Add Event
      </Button>
      <ScheduleXCalendar calendarApp={calendar} style={{ width: '80%', height: '400px', margin: '0 auto' }} />
      <EventList events={events} onEventClick={handleEventClick} />
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
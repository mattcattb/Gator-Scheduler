import React, { useContext, useEffect, useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthGrid,
  createViewWeek,
  createViewMonthAgenda,
} from "@schedule-x/calendar";

import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";

import { UserContext } from "../context/UserProvider";
import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../api/eventService";

import "../styles/scheduler.css"

import EventList from "../components/Schedule/eventlist.jsx";
import EditModal from "../components/Schedule/editeventmodal.jsx";
import AddEventModal from "../components/Schedule/addeventmodal.jsx";

function Schedule() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const eventsServicePlugin = createEventsServicePlugin();
  const plugins = [eventsServicePlugin];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEditEventModalOpen(true);
  };

  const config = {
    views: [createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events,
    callbacks: {
      onEventClick: handleEventClick,
      onDayClick: (day) => console.log("Day clicked:", day),
    },
    weekOptions: {
      gridHeight: 800,
      eventWidth: 95,
      timeAxisFormatOptions: { hour: "2-digit", minute: "2-digit" },
    },
  };

  const calendar = useCalendarApp(config, plugins);

  useEffect(() => {
    const getEvents = async () => {
      if (user && user._id) {
        try {
          const fetchedEvents = await fetchEvents(user._id);
          setEvents(fetchedEvents);
          console.log("Fetched events:", fetchedEvents);
          eventsServicePlugin.clear(); // Note: This method may need implementation in your service plugin

          // Populate the events service with the fetched events
          fetchedEvents.forEach(event => eventsServicePlugin.add(event));
        } catch (error) {
          console.error("Error fetching events: ", error);
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
      const newEvents = events.map(event =>
        event._id === updatedEvent._id ? updatedEvent : event
      );
      setEvents(newEvents);
      eventsServicePlugin.update(updatedEvent);
      setEditEventModalOpen(false);
    } catch (error) {
      console.error("Error submitting edit:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId, user._id);
      const updatedEvents = events.filter(event => event._id !== eventId);
      setEvents(updatedEvents);
      eventsServicePlugin.remove(eventId);
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
      eventsServicePlugin.add(event); // Add to eventsService
      setAddEventModalOpen(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="flex flex-row m-8 justify-start items-stretch">
      <div className="hide flex flex-col items-center justify-normal mr-10 gap-4 bg-orange-300 p-4 rounded-lg w-[400px] h-[700px]">
        <button
          onClick={() => setAddEventModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Event
        </button>
        <EventList events={events} onEventClick={handleEventClick} />
      </div>

      <ScheduleXCalendar
        className="w-[1200px] h-[800px] m-2 p-2 max-h-full max-w-full"
        calendarApp={calendar}
      />

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
    </div>
  );
}

export default Schedule;
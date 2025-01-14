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

import EventList from "../components/Schedule/eventlist.jsx";
import EditModal from "../components/Schedule/editeventmodal.jsx";
import AddEventModal from "../components/Schedule/addeventmodal.jsx";

function Schedule() {
  // This page shows your schedule and allows you to update it as you wish.
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const plugins = [createEventsServicePlugin()];

  // handles events with the schedule-x calender being clicked.
  const callbacks = {
    onEventClick(calendarEvent) {
      setSelectedEvent(calendarEvent);
      setEditEventModalOpen(true);
    },
    onDayClick(day) {},
  };

  // config for actual schedule-x calender
  const config = {
    views: [createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    callbacks: callbacks,
    weekOptions: {
      gridHeight: 1500,
      eventWidth: 95,
      timeAxisFormatOptions: { hour: "2-digit", minute: "2-digit" },
    },
  };

  const calendar = useCalendarApp(config, plugins);

  // on load, fetch all that users events and display them on the calender
  useEffect(() => {
    const getEvents = async () => {
      if (user && user._id) {
        try {
          const events = await fetchEvents(user._id);
          setEvents(events);
        } catch (error) {}
      }
    };
    getEvents();
  }, [user]);

  // modal closed
  const handleCloseModal = () => {
    setEditEventModalOpen(false);
    setSelectedEvent(null);
  };

  // clicking submit on the edit modal should update the event and submit it to database while updating the calendar
  const handleEditSubmit = async (updatedEvent) => {
    try {
      await updateEvent(updatedEvent._id, updatedEvent);
      const newEvents = events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      );
      setEvents(newEvents);
      calendar.eventsService.update(updatedEvent._id, updatedEvent);
      setEditEventModalOpen(false);
    } catch (error) {}
  };

  // clicking delete on the edit modal should delete the event from the database and update the calendar
  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId, user._id);
      const updatedEvents = events.filter((event) => event._id !== eventId);
      setEvents(updatedEvents);
      calendar.eventsService.remove(eventId);
      setEditEventModalOpen(false);
    } catch (error) {}
  };

  // clicking the add event button should open up the add event modal
  const handleAddEvent = async (newEvent) => {
    try {
      const event = await addEvent(user._id, newEvent);
      const updatedEvents = [...events, event];
      setEvents(updatedEvents);
      calendar.eventsService.add(event);
      setAddEventModalOpen(false);
    } catch (error) {}
  };

  // clicking the event on the calender should open up the edit modal with the selected event
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEditEventModalOpen(true);
  };

  return (
    <div className="flex flex-row m-8 justify-start items-stretch">
      <div className="flex flex-col items-center justify-normal m-10 gap-4 bg-orange-300 p-4 rounded-lg w-[300px]">
        <button
          onClick={() => setAddEventModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Event
        </button>

        <EventList events={events} onEventClick={handleEventClick} />
      </div>

      <ScheduleXCalendar
        calendarApp={calendar}
        style={{ width: "80%", height: "400px", margin: "0 auto" }}
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

// src/api/eventService.js
import axios from './axios';


export const fetchEvents = async (userId) => {
  // fetch events from backend
  try {
    const response = await axios.get('/api/events', {
      params: { userId }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error fetching events');
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const addEvent = async (userId, event) => {
  // add event to user in backend
  try {
    const response = await axios.post('/api/events', { userId, ...event });
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, event) => {
  // set a put request to update and event 
  try {
    const response = await axios.put(`/api/events/${eventId}`, event);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId, userId) => {
  // send delete request to delete and event from a user!
  try {
    await axios.delete(`/api/events/${eventId}`, {
      params: { userId }
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
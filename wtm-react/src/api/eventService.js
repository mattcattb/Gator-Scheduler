// src/api/eventService.js
import axios from './axios';


export const fetchEvents = async (userId) => {
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
    throw error;
  }
};

export const addEvent = async (userId, event) => {
  try {
    const response = await axios.post('/api/events', { userId, ...event });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (eventId, event) => {
  try {
    const response = await axios.put(`/api/events/${eventId}`, event);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (eventId, userId) => {
  try {
    await axios.delete(`/api/events/${eventId}`, {
      params: { userId }
    });
  } catch (error) {
    throw error;
  }
};
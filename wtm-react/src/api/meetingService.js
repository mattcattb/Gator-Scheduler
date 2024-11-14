// src/api/meetingService.js
import axios from './axios';

export const fetchMeetings = async (userId) => {
  try {
    const response = await axios.get('/api/meetings', {
      params: { userId }  // Adjust the endpoint and params as per your backend API
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error fetching meetings');
    }
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw error;
  }
};

export const fetchMeetingInvites = async (userId) => {
  try {
    const response = await axios.get('/api/meeting-invites', {
      params: { userId }  // Adjust the endpoint and params as per your backend API
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error fetching meeting invites');
    }
  } catch (error) {
    console.error('Error fetching meeting invites:', error);
    throw error;
  }
};
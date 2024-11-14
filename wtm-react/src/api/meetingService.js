// src/api/meetingService.js
import axios from './axios';

export const createMeeting = async (userId, meeting) => {
  
}

export const fetchJoinedMeetings = async (userId) => {
  try {
    const response = await axios.get('/api/meeting/joined', {
      params: { userId }  // Adjust the endpoint and params as per your backend API
    });
    console.log("RAHRAHRH", response);
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

export const fetchInvitedMeetings = async (userId) => {
  try {
    const response = await axios.get('/api/meeting/invited', {
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
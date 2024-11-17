// src/api/meetingService.js
import axios from './axios';

export const addMeeting = async (userId, meetingForm) => {
  /* 
    Meeting Form looks like:
    meetingName: 'Example Meeting',
    meetingDescription: 'Example Description',
    selectedDays: [true, true, true, true, true, true, true],
    startTime: '',
    endTime: '',
    members: []
  */

  try {
    // when meeting created, send meeting requests to invited members through backend
    const meeting = {
      meetingName: meetingForm.meetingName,
      meetingDescription: meetingForm.meetingDescription,
      selectedDays: meetingForm.selectedDays,
      organizers: [userId],
      timeRange: {
        startTime: meetingForm.startTime,
        endTime: meetingForm.endTime
      },
      invitedUsers: meetingForm.invited_members
    }

    const response = await axios.post('/api/meeting/create', {
      userId,
      meeting
    });
    if (response.status === 201) {
      return response;
    } else {
      throw new Error('Error creating meeting');
    }

  } catch(error)
  {
    console.error('Error creating meeting:', error);
    throw error;
  }

}

export const fetchJoinedMeetings = async (userId) => {
  try {
    const response = await axios.get('/api/meeting/joined', {
      params: { userId: userId } // Ensure userId is correct
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
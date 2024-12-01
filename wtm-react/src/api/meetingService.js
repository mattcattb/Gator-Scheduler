// src/api/meetingService.js
import axios from './axios';

export const addMeetingAPI = async (userId, meetingForm) => {
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
      return response.meeting;
    } else {
      throw new Error('Error creating meeting');
    }

  } catch(error)
  {
    console.error('Error creating meeting:', error);
    throw error;
  }

}

export const fetchJoinedMeetingsAPI = async (userId) => {
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

export const fetchInvitedMeetingsAPI = async (userId) => {
  try {
    const response = await axios.get('/api/meeting/invited', {
      params: { userId: userId }  // Adjust the endpoint and params as per your backend API
    });

    console.log("fetch of invited meetings:", response);

    if (response.status === 200) {
      console.log("data of invited meetings:", response.data);
      return response.data;
    } else {
      throw new Error('Error fetching meeting invites');
    }
  } catch (error) {
    console.error('Error fetching meeting invites:', error);
    throw error;
  }
};

// leave meeting
export const leaveMeetingAPI = async (userId, meetingId) => {
  try {
    console.log("Inside leave meeting API, userId and meetingID is ",userId, meetingId);

    const response = await axios.put('/api/meeting/leave', {
      params: { userId, meetingId }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error leaving meeting');
    }
  } catch (error) {
    console.error('Error leaving meeting:', error);
    throw error;
  }
}

export const joinMeetingAPI = async (userId, meetingId) => {

  var submitData = {
    userId: userId,
    meetingId: meetingId,
  }
  console.log(submitData)

  try {
    const response = await axios.put('/api/meeting/join', submitData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error joining meeting');
    }
  } catch (error) {
    console.error('Error joining meeting:', error);
    throw error;
  }
}

export const rejectMeetingAPI = async (userId, meetingId) => {
  try{
    const response = await axios.put('/api/meeting/reject', {
      params: { userId, meetingId }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error rejecting meeting');
    }
  }catch (error) {
    console.error('Error rejecting meeting:', error);
    throw error;
  }

}
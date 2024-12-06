// src/api/meetingService.js
import axios from './axios';

export const deleteMeetingAPI = async (userId, meetingId) => {
  // send a delete meeting request to backend.
  try {
    const response = await axios.delete('/api/meeting/delete', {
      data: {userId:userId, meetingId:meetingId} 
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error deleting meeting');
    }


  } catch (error) {
    throw error;
  }
}

export const sendMeetingInviteAPI = async (meetingId, userId, friendId) => {
  // send a meeting invite from a user to a friend
  try {
    const response = await axios.post('/api/meeting/invite', { meetingId, userId, friendId });

    if (response.status === 201) {
    } else {
      throw new Error('Error sending meeting invite');
    }
  } catch (error) {
    throw error;
  }
}

export const addMeetingAPI = async (userId, meetingForm) => {
  // send a userID and a meeting to be added from the backend
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
    throw error;
  }

}

export const fetchJoinedMeetingsAPI = async (userId) => {
  // fetch all joined meetings from the backend. 
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
    throw error;
  }
};

export const fetchInvitedMeetingsAPI = async (userId) => {
  // fetch all meetings you were invited to from backend
  try {
    const response = await axios.get('/api/meeting/invited', {
      params: { userId: userId }  // Adjust the endpoint and params as per your backend API
    });


    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error fetching meeting invites');
    }
  } catch (error) {
    throw error;
  }
};

export const leaveMeetingAPI = async (userId, meetingId) => {
  // send a leave meeting request to backend
  try {

    const response = await axios.put('/api/meeting/leave', {
      userId, meetingId 
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error leaving meeting');
    }
  } catch (error) {
    throw error;
  }
}

export const joinMeetingAPI = async (userId, meetingId) => {
  // send a join meeting request to backend
  var submitData = {
    userId: userId,
    meetingId: meetingId,
  }

  try {
    const response = await axios.put('/api/meeting/join', submitData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error joining meeting');
    }
  } catch (error) {
    throw error;
  }
}

export const rejectMeetingAPI = async (userId, meetingId) => {
  // send a reject a meeting invite to backend 
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
    throw error;
  }

}
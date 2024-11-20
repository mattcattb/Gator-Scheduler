import {React, useState, useEffect, useCallback, createContext} from "react";
import { fetchJoinedMeetingsAPI, fetchInvitedMeetingsAPI, addMeetingAPI, leaveMeetingAPI, joinMeetingAPI, rejectMeetingAPI} from '../api/meetingService';

export const MeetingContext = createContext();

export const MeetingContextProvider = ({children}) => {
  const [meetings, setMeetings] = useState([]);
  const [meetingInvites, setMeetingInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadMeetings = useCallback(async (userId) => {
    if (userId) {
        try {
          console.log("Loading meetings inside context provider...");
          setLoading(true);
          const [userJoinedMeetings, userMeetingInvites] = await Promise.all([
              fetchJoinedMeetingsAPI(userId),
              fetchInvitedMeetingsAPI(userId)
          ]);
          console.log("Fetched meetings:", userJoinedMeetings);
          console.log("Fetched invites:", userMeetingInvites);

          setMeetings(userJoinedMeetings);
          setMeetingInvites(userMeetingInvites);
        } catch (error) {
          console.error("Failed to load meetings: ", error);
            setError("Failed to load meeting...");
        } finally {
            setLoading(false);
        }
    }
  }, [])

  // add meeting 
  const addMeeting = useCallback(async (userId, meetingData) => {
    if (userId && meetingData) {
      try {
        const newMeeting = await addMeetingAPI(userId, meetingData);
        setMeetings(prevMeetings => [...prevMeetings, newMeeting]);
      } catch (error){
        setError("Failed to add meeting.")
        console.log("Error occured: ", error)
      }
    }
  }, []);

  // leave already joined meeting
  const leaveMeeting = useCallback(async (userId, meetingId) => {
    if (userId && meetingId) {
      try {
        await leaveMeetingAPI(userId, meetingId);
        setMeetings(prevMeetings => prevMeetings.filter(meeting => meeting._id !== meetingId));
      } catch (error) {
        setError("Failed to leave meeting.")
        console.log("Error occured: ", error);
      }
    }
  }, [])

  // join invited meeting
  const joinMeeting = useCallback(async (userId, meetingInviteId) => {
    if (userId, meetingInviteId) {
      try{
        const newMeeting = await joinMeetingAPI(userId, meetingInviteId);
        setMeetings(prevMeetings => [...prevMeetings, newMeeting]);
        setMeetingInvites(prevInvites => prevInvites.filter(invite => invite._id !== meetingInviteId));
      } catch (error) {
        setError("Failed to join meeting.")
        console.log("Error occured: ", error);
      }
    }
  }, []);

  // reject meeting invite 
  const rejectMeeting = useCallback(async (userId, meetingInviteId) => {
    if (userId && meetingInviteId) {
      try{
        const newMeeting = await rejectMeetingAPI(userId, meetingInviteId);
        setMeetingInvites(prevInvites => prevInvites.filter(invite => invite._id !== meetingInviteId));
      } catch (error) {
        setError("Failed to join meeting.")
        console.log("Error occured: ", error);
      }
    }
  }, [])

  
    return (
    <MeetingContext.Provider value = {{meetings, meetingInvites, loadMeetings, loading, error, addMeeting, leaveMeeting, joinMeeting, rejectMeeting}}>
        {children}
    </MeetingContext.Provider>
  )
}

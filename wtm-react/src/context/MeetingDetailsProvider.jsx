// context/UserContext.js
import React, { useState, createContext, useEffect } from 'react';

// Create the context
export const MeetingDetailsContext = createContext();

// Create the provider component
export const MeetingDetailsProvider = ({ children }) => {
  const [meetingDetails, setMeetingDetails] = useState(()=>{
    const meetingDetails = sessionStorage.getItem('meetingDetails');
    return meetingDetails ? JSON.parse(meetingDetails) : null;
  }); // Initially, meetingDetails is null if the meeting does not exist in the temporary storage

  useEffect(() => {
    if (meetingDetails) {
      sessionStorage.setItem('meetingDetails', JSON.stringify(meetingDetails));
    } else {
      sessionStorage.removeItem('meetingDetails');
    }
  }, [meetingDetails]);

  return (
    <MeetingDetailsContext.Provider value={{ meetingDetails, setMeetingDetails }}>
      {children}
    </MeetingDetailsContext.Provider>
  );
};
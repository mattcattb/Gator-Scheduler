import React, { useCallback, useContext, useEffect, useState } from 'react';

import { UserContext } from '../context/UserProvider';
import { MeetingContext } from '../context/MeetingProvider';

import JoinedMeetingsBar from "../components/HomeView/joined/joinedmeetingsbar";
import InvitedMeetingsBar from "../components/HomeView/invited/invitedmeetingsbar";
import { Typography } from "@mui/material";

export default function HomeView() {
  const { user } = useContext(UserContext);
  const { meetings, meetingInvites, loadMeetings, joinMeeting, leaveMeeting, rejectMeeting, loading, error } = useContext(MeetingContext);

  //! fix the user stored to be an actual user object!
  console.log('HomeView mounted, user: ', user); 

  // Do this when the page loadsbom
  useEffect(() => {
    console.log('Load trigger');
    if (user && user._id) {
      loadMeetings(user._id);
    }
  }, []);

  const onJoin = (meeting_id) => {
    console.log('Just joined ', meeting_id);
    try {
      // Call the joinMeeting API
      joinMeeting(user._id, meeting_id);
      setMeetingInvites(meeting_invites.filter(meeting => meeting._id !== meeting_id));
      setMeetings([...meetings, meeting_id]);
    }catch(error){
      console.error('Error joining meeting:', error);
    }
  };
  
  const onReject = (meeting_id) => {
    console.log('Rejected Meeting invite ', meeting_id);

    try {
      // Call the leaveMeeting API
      leaveMeeting(user._id, meeting_id);
      setMeetingInvites(meeting_invites.filter(meeting => meeting._id !== meeting_id));
    }catch(error){
      console.error('Error rejecting meeting invite:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='HomeView' style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant='h2' gutterBottom>Welcome, {user ? user.name : 'Guest'}!</Typography>
      <JoinedMeetingsBar meetings={meetings} onLeave={leaveMeeting}/>
      <InvitedMeetingsBar meetings_invited={meetingInvites} onJoin={joinMeeting} onReject={rejectMeeting}/>
    </div>
  );
}
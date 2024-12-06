import React, { useContext, useEffect } from 'react';

import { UserContext } from '../context/UserProvider';
import { MeetingContext } from '../context/MeetingProvider';

import JoinedMeetingsBar from "../components/HomeView/joined/joinedmeetingsbar";
import InvitedMeetingsBar from "../components/HomeView/invited/invitedmeetingsbar";
import { Typography } from "@mui/material";

export default function HomeView() {
  const { user } = useContext(UserContext);
  const { meetings, meetingInvites, loadMeetings, joinMeeting, leaveMeeting, rejectMeeting, loading, error } = useContext(MeetingContext);
  
  useEffect(() => {
    const mountMeetings = async () => {
      if (user && user._id) {
        await loadMeetings(user._id);
      }
    }

    mountMeetings();
  }
  , [user, loadMeetings]);

  if (loading) { //fail if the data has not come in yet
    return <div>Loading...</div>;
  }

  if (error) { //fail if something has gone wrong in the web request
    return <div>{error}</div>;
  }

  return ( //display proper attributes using the Joined and Invited Bars if everything worked successfully
    <div className='HomeView' style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant='h2' gutterBottom>Welcome, {user ? user.name : 'Guest'}!</Typography>
      <JoinedMeetingsBar meetings={meetings} onLeave={leaveMeeting}/>
      <InvitedMeetingsBar meetings_invited={meetingInvites} onJoin={joinMeeting} onReject={rejectMeeting}/>
    </div>
  );
}
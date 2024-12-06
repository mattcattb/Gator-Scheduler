import React, { useContext, useEffect } from 'react';

import { UserContext } from '../context/UserProvider';
import { MeetingContext } from '../context/MeetingProvider';

import JoinedMeetingsBar from "../components/HomeView/joined/joinedmeetingsbar";
import InvitedMeetingsBar from "../components/HomeView/invited/invitedmeetingsbar";
import { Typography } from "@mui/material";

export default function HomeView() {
  // homeview page component! Stores the meetings joined and meeting invites for a user.
  const { user } = useContext(UserContext);
  const { meetings, meetingInvites, loadMeetings, joinMeeting, leaveMeeting, rejectMeeting, loading, error } = useContext(MeetingContext);

  //! fix the user stored to be an actual user object!
  console.log('HomeView mounted, user: ', user); 
  
  useEffect(() => {
    // on load or when user and loadMeetings are accessed or used, load all the meetings from a user. 
    const mountMeetings = async () => {
      if (user && user._id) {
        await loadMeetings(user._id);
      }
    }

    mountMeetings();
  }
  , [user, loadMeetings]);

  // return if app is loading content
  if (loading) {
    return <div>Loading...</div>;
  }

  // return if error occured
  if (error) {
    return <div>{error}</div>;
  }

  // return heading and bars displaying users joined meetings and invited meetings.
  return (
    <div className='HomeView' style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant='h2' gutterBottom>Welcome, {user ? user.name : 'Guest'}!</Typography>
      <JoinedMeetingsBar meetings={meetings} onLeave={leaveMeeting}/>
      <InvitedMeetingsBar meetings_invited={meetingInvites} onJoin={joinMeeting} onReject={rejectMeeting}/>
    </div>
  );
}
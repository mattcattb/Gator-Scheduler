import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { fetchJoinedMeetings, fetchInvitedMeetings, joinMeeting, leaveMeeting } from '../api/meetingService';
import JoinedMeetings from "../components/HomeView/joinedmeetings";
import MeetingInvites from "../components/HomeView/meetinginvites";
import { Typography } from "@mui/material";

export default function HomeView() {
  const { user } = useContext(UserContext);
  const [meetings, setMeetings] = useState([]);
  const [meeting_invites, setMeetingInvites] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  //! fix the user stored to be an actual user object!
  console.log('HomeView mounted', user);

  // Do this when the page loads
  useEffect(() => {
    console.log('FDFDF triggered', user);
    if (user && user._id) {
      const load_meetings = async () => {
        try {
          setLoading(true);
          const userJoinedMeetings = await fetchJoinedMeetings(user._id);
          // const userMeetingInvites = await fetchInvitedMeetings(user._id);
          const userMeetingInvites = [];
          setMeetings(userJoinedMeetings);
          setMeetingInvites(userMeetingInvites);
        } catch (error) {
          setError("Failed to load meeting invites");
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      load_meetings();
    }
  }, [user]);

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
      <JoinedMeetings meetings={meetings}/>
      <MeetingInvites meetings_invited={meeting_invites} onJoin={onJoin} onReject={onReject}/>
    </div>
  );
}
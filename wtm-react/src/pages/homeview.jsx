import JoinedMeetings from "../components/HomeView/joinedmeetings";
import MeetingInvites from "../components/HomeView/meetinginvites";

import { Typography } from "@mui/material";
const sampleFriends = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' },
];
const sampleUser = "Matty_User"

function get_meetings(){

  return [
    {
      "_id": "meetingID123",
      "name": "Team Meeting",
      "description": "Discuss project goals",
      "organizers": ["userID123"],
      "members": ["userID456", "userID789"],
      "range": {
        "days": ["2024-10-08", "2024-10-09"],
        "start_time": "09:00",
        "end_time": "17:00"
      }
    },
    {
      "_id": "meetingID456",
      "name": "Code Review",
      "description": "Review latest PRs",
      "organizers": ["userID456", "userID789"],
      "members": ["userID123"],
      "range": {
        "days": ["m", "t", "w", "th", "f"],
        "start_time": "14:00",
        "end_time": "16:00"
      }
    }
  ]
}

function get_meeting_invites(){
  return [
    {
      
    },
    {}
  ]
}

export default function HomeView() {

    const sample_meetings = get_meetings();

    return (
      <div className='HomeView' style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
        <Typography variant='h2' gutterBottom>Welcome, {sampleUser}!</Typography>
        <JoinedMeetings meetings={sample_meetings}/>
        <MeetingInvites meetings_invited={sample_invites}/>
      </div>
    );
  }
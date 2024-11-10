import JoinedMeetings from "../components/HomeView/joinedmeetings";
import MeetingInvites from "../components/HomeView/meetinginvites";

import { Typography } from "@mui/material";

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
    },
    {
      "_id": "meetingID678",
      "name": "Tech Talk",
      "description": "Present and discuss technical topics",
      "organizers": ["userID567", "userID890"],
      "members": ["userID123", "userID678"],
      "range": {
        "days": ["t", "th"],
        "start_time": "11:00",
        "end_time": "12:00"
      }
    }
  ];
}

function get_meeting_invites(){
  return [
    
    {
      "_id": "meetingID345",
      "name": "Retrospective",
      "description": "Discuss the past sprint's performance",
      "organizers": ["userID456", "userID789"],
      "members": ["userID123", "userID234", "userID345"],
      "range": {
        "days": ["f"],
        "start_time": "15:00",
        "end_time": "17:00"
      }
    },
    {
      "_id": "meetingID789",
      "name": "Design Session",
      "description": "Brainstorm and design new features",
      "organizers": ["userID234", "userID567"],
      "members": ["userID123", "userID456"],
      "range": {
        "days": ["m", "w", "f"],
        "start_time": "10:00",
        "end_time": "12:00"
      }
    }
    
  ]
}

function get_user(){
  return sampleUser;
}

export default function HomeView() {


  const user = get_user();
  const sample_meetings = get_meetings();
  const meeting_invites = get_meeting_invites();

  const onJoin = (id) => {
    console.log('Just joined ', id)
  }
  
  const onReject = (id) => {
    console.log('Rejected Meeting invite ', id);
  }

  return (
    <div className='HomeView' style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant='h2' gutterBottom>Welcome, {user}!</Typography>
      <JoinedMeetings meetings={sample_meetings}/>
      <MeetingInvites meetings_invited={meeting_invites} onJoin={onJoin} onReject={onReject}/>
    </div>
  );
}
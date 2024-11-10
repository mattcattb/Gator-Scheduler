import JoinedMeetings from "../components/HomeView/joinedmeetings";

import { Typography } from "@mui/material";
const sampleUser = "Matty_User"

export default function HomeView() {
    return (
      <div className='HomeView' style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
        <Typography variant='h2' gutterBottom>Welcome, {sampleUser}!</Typography>
        <JoinedMeetings meetings={[]}/>
      </div>
    );
  }
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MeetingDetailsContext } from '../context/MeetingDetailsProvider';
import { UserContext } from '../context/UserProvider';
import InfoPanel from '../components/MeetingDetails/InfoPanel';
import DetailsPanel from '../components/MeetingDetails/DetailsPanel';
import InviteField from '../components/MeetingDetails/InviteField';

function MeetingDetails() {
  const { id } = useParams();
  var {meetingDetails, setMeetingDetails} = useContext(MeetingDetailsContext);
  var { user } = useContext(UserContext)

  useEffect(() => {
    setMeetingDetails(null);
    const fetchMeetingData = async () => {
      try {
        //TODO: this implementation almost works, but i accidentally used an event route instead of a meeting route
        // because the meeeting routes don't exist yet.
        // console.log("currently in user state: ", user);
        // const response = await fetch(`${process.env.REACT_APP_BACKEND}api/events?userId=${user._id}`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     },
        //   }
        // );
        // console.log(response);
        // if(response.ok){
        //   const data = await response.json();
        //   console.log(data);
        //   setMeetingDetails(data);
        // }
      }
      catch(e) {
        console.log("implement proper meeting details fetch", e);
      }
   }
   fetchMeetingData();
  }, [id, setMeetingDetails]);

  if (meetingDetails == null) {
    return <p>Failed to load Meeting Details..</p>;
  }

  return (
    <div className='meeting-details-parent' style={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      margin:"5vh auto 0 auto",
      gap:'2vh',
      width:'55%'
    }}>
      <InfoPanel></InfoPanel>
      <DetailsPanel></DetailsPanel>
      <InviteField></InviteField>
    </div>
  )
}
  
export default MeetingDetails;
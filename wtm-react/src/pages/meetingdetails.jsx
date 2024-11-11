import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import meetings from "../static_database/meetings.json";
import { MeetingDetailsContext } from '../context/MeetingDetailsProvider';
import InfoPanel from '../components/MeetingDetails/InfoPanel';
import DetailsPanel from '../components/MeetingDetails/DetailsPanel';
import InviteField from '../components/MeetingDetails/InviteField';

/*
  TODO
  - Make a page for event creator, or event participant
*/ 

function MeetingDetails() {
  const { id } = useParams();
  var {meetingDetails, setMeetingDetails} = useContext(MeetingDetailsContext);

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        // implement proper fetching logic once meetings exist in backend
        setMeetingDetails(meetings[0]);
      }
      catch(e) {
        console.log("implement proper meeting details fetch");
      }
   }
   fetchMeetingData();
  }, [id, setMeetingDetails]);

  if (!meetingDetails) {
    return <p>Loading...</p>;
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
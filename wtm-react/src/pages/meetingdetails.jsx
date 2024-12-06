import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MeetingDetailsContext } from '../context/MeetingDetailsProvider';
import InfoPanel from '../components/MeetingDetails/InfoPanel';
import DetailsPanel from '../components/MeetingDetails/DetailsPanel';
import InviteField from '../components/MeetingDetails/InviteField';

function MeetingDetails() {
  const { id } = useParams();
  var {meetingDetails, setMeetingDetails} = useContext(MeetingDetailsContext);

  useEffect(() => {
    setMeetingDetails(null);
    const fetchMeetingData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}api/meeting?meetingId=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            },
          }
        );
        if(response.ok){
          const data = await response.json();
          setMeetingDetails(data);
        }
      }
      catch(e) {
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
      {/* info handles displaying users currently in the event */}
      <InfoPanel></InfoPanel>
      {/* details shows best time and allows for event configuration */}
      <DetailsPanel></DetailsPanel>
      {/* invite field handles adding new users to the meeting */}
      <InviteField></InviteField>
    </div>
  )
}
  
export default MeetingDetails;
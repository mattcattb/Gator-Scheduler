import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import meetings from "../static_database/meetings.json";
import { MeetingDetailsContext } from '../context/MeetingDetailsProvider';

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
        // implement proper fetching logic once meetings exist
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
    <div>MeetingDetails {meetingDetails.name}, {meetingDetails.description}, {meetingDetails._id}!</div>
  )
}
  
export default MeetingDetails;
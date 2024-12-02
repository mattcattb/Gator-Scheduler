import React, {useContext, useEffect, useState} from 'react';
import { MeetingDetailsContext } from '../../context/MeetingDetailsProvider';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';

export default function InfoPanel(){

  // collect meeting information from context    
  const {meetingDetails} = useContext(MeetingDetailsContext);
    
  const [members, setMembers] = useState([]);
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch members
        const fetchedMembers = await Promise.all(
          meetingDetails.members.map(async (item) => {
            try {
              const response = await fetch(`${process.env.REACT_APP_BACKEND}api/user/${item}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if (response.ok) {
                const data = await response.json();
                return data;
              } else {
                return {_id : '', username: ''};
              }
            } catch (error) {
              return {_id : '', username: ''};
            }
          })
        );

        // Fetch organizers
        const fetchedOrganizers = await Promise.all(
          meetingDetails.organizers.map(async (item) => {
            try {
              const response = await fetch(`${process.env.REACT_APP_BACKEND}api/user/${item}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              if (response.ok) {
                const data = await response.json();
                return data;
              } else {
                return {_id : '', username: ''};
              }
            } catch (error) {
              return {_id : '', username: ''};
            }
          })
        );

        // Update state with resolved values
        setMembers(fetchedMembers);
        setOrganizers(fetchedOrganizers);
      } catch (e) {
        console.error('Error in fetchData:', e);
      }
    };

    fetchData();
  }, [meetingDetails]);

  useEffect(() => {
    console.log("Members:", members);
    console.log("Organizers:", organizers);
    }, [members, organizers]);


    return(
    <div className='info-group'
    style={{display:'flex', flexDirection:'row', gap:'3vw', alignItems:'center'}}>
        <div className='name-group' style={{justifySelf:'center', height:'auto'}}>
            <Typography variant="h5" gutterBottom>{meetingDetails.meetingName}</Typography>
            <Typography variant="caption" gutterBottom sx={{maxWidth:"20vw"}}>{meetingDetails.meetingDescription}</Typography>
        </div>
        <Card sx={{maxHeight:"20vh", minWidth:'fit-content'}}>
            <CardHeader title="Organizers"/>
            <CardContent sx={{overflow:'auto'}}>
            {organizers.map(item =>(
                <Typography key={item._id}>{item.username}</Typography>)
            )
            }
            </CardContent>
        </Card>
        <Card sx={{maxHeight:"20vh", minWidth:'fit-content'}}>
        <CardHeader title="Members"/>
            <CardContent sx={{overflow:'auto'}}>
            {members.map(item =>(
                <Typography key={item._id}>{item.username}</Typography>)
            )
            }
            </CardContent>
        </Card>
    </div>
    )
}
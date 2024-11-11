import React, {useContext, useState} from 'react';
import { MeetingDetailsContext } from '../../context/MeetingDetailsProvider';
import {TextField, Button } from '@mui/material';

export default function InviteField(){
    const [requestID, setRequestID] = useState('');
    const {meetingDetails} = useContext(MeetingDetailsContext);

    function sendMeetingInvite(requestID){
        console.log("we need an endpoint for this");
        //TODO: Implement once an endpoint exists
    }

    function handleDeleteMeeting(){
        console.log("we need an endpoint for this");
        //TODO: Implement once an endpoint exists
    }

    return(
        <div className='invite-group-parent' style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'3vw'}}>
            <div>
                <h2 style={{margin:'0', marginBottom:"2vh"}}>Invite to Meeting</h2>
                <div style={{display:'flex', justifyContent:'space-between', gap:'1rem'}}>
                    <TextField
                    label="Type Friend ID here!"
                    value={requestID}
                    onChange={(event) => {
                        setRequestID(event.target.value)
                    }}
                    />
                    <Button className="request-button" onClick={() => {sendMeetingInvite(requestID)}}>+</Button>
                </div>
            </div>
            <Button size='large' sx={{backgroundColor:'rgb(139, 0, 0)', color:'white'}} onClick={()=>handleDeleteMeeting(meetingDetails._id)}>DELETE MEETING</Button>
        </div>
    )
}
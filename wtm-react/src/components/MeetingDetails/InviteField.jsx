import React, {useContext, useState} from 'react';
import { MeetingDetailsContext } from '../../context/MeetingDetailsProvider';
import { UserContext } from '../../context/UserProvider';
import {TextField, Button } from '@mui/material';
import {deleteMeetingAPI} from '../../api/meetingService';

import { useNavigate } from 'react-router-dom'; // Import useNavigate


export default function InviteField(){
    const [requestID, setRequestID] = useState('');
    const {meetingDetails} = useContext(MeetingDetailsContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate(); // Hook for navigation

    async function sendMeetingInvite(requestID){
        console.log("Sending the meeting invite...");
        //TODO: Implement once an endpoint exists
    }

    async function handleDeleteMeeting(){

        try {
            console.log("Deleting meeting...")
            await deleteMeetingAPI(user._id, meetingDetails._id)        
            console.log("Meeting deleted successfully!")

            navigate('/home')
        } catch (error) {
            console.error("Error deleting meeting: ", error)
        }
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
            <Button size='large' sx={{backgroundColor:'rgb(139, 0, 0)', color:'white'}} onClick={()=>handleDeleteMeeting()}>DELETE MEETING</Button>
        </div>
    )
}
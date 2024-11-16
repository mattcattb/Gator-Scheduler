import React, {useContext} from 'react';
import { MeetingDetailsContext } from '../../context/MeetingDetailsProvider';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';

export default function InfoPanel(){
    const {meetingDetails} = useContext(MeetingDetailsContext);
    
    return(
    <div className='info-group'
    style={{display:'flex', flexDirection:'row', gap:'3vw', alignItems:'center'}}>
        <div className='name-group' style={{justifySelf:'center', height:'auto'}}>
            <Typography variant="h5" gutterBottom>{meetingDetails.meetingName}</Typography>
            <Typography variant="caption" gutterBottom sx={{maxWidth:"20vw"}}>{meetingDetails.meetingDescription}</Typography>
        </div>
        
    </div>
    )
}
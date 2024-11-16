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
        <Card sx={{maxHeight:"20vh", minWidth:'fit-content'}}>
            <CardHeader title="Organizers"/>
            <CardContent sx={{overflow:'auto'}}>
            {meetingDetails.organizers.map(item =>(
                //TODO: we need to implement a function to actually put names here once that endpoint exists, it's just IDs now
                <Typography key={item}>{item.$oid}</Typography>)
            )
            }
            </CardContent>
        </Card>
        <Card sx={{maxHeight:"20vh", minWidth:'fit-content'}}>
        <CardHeader title="Members"/>
            <CardContent sx={{overflow:'auto'}}>
            {meetingDetails.members.map(item =>(
                //TODO: we need to implement a function to actually put names here once that endpoint exists, it's just IDs now
                <Typography key={item}>{item.$oid}</Typography>)
            )
            }
            </CardContent>
        </Card>
    </div>
    )
}
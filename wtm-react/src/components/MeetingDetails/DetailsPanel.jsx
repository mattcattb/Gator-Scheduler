import React, {useState} from 'react';
import {Chip, Button } from '@mui/material';

export default function DetailsPanel(){
    const bestTime = "08:00PM"; //this will need to be retrieved via an endpoint in the future
    const daysOfWeek = ['su', 'm', 't', 'w', 'th', 'f', 'sa'];
    const [booleans, setBooleans] = useState([false, false, false, false, false, false, false]);

    // Function to toggle the value at a specific index
    const toggleBoolean = (index) => {
        setBooleans(prevBooleans => {
        const newBooleans = [...prevBooleans];
        newBooleans[index] = !newBooleans[index]; // Toggle the boolean at the given index
        return newBooleans;
        });
    };

    const processDaysToggle = () => {
        let output = []
        output = daysOfWeek.filter((value, index) => booleans[index])
        console.log(output);
        
        //TODO: Once the API exists, we can use this function to update the event window for an event
    }

    return(
        <div className='details-parent' style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5vw'}}>
            <div className='time-display'>
            <h2>{`Best Time: ${bestTime}`}</h2>
            {/* TODO: best time will need to be retrieved from the backend using useEffect and an API call */}
            </div>

            <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0.2vw'}}>
                <div className='days-toggle' style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'0.2vw'}}>
                    {daysOfWeek.map((item, index) =>(
                        <Chip 
                        key={item}
                        label={item} 
                        sx={{backgroundColor: booleans[index] ? 'rgb(193, 226, 227)' : 'rgb(220,220,220)', color: 'black'}} 
                        onClick={()=>toggleBoolean(index)}>
                        </Chip>))
                    }
                </div>
                <Button size='small' onClick={()=>{processDaysToggle()}}>Save</Button>
            </div>
        </div>
    )
}
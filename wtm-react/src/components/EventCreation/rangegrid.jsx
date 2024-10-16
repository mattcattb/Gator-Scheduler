import React from 'react'
import { Typography, Box, Grid2} from '@mui/material';


// New Component for Range Grid
function RangeGrid({ selectedDays, timeSlots, startTime, endTime }) {
    // Filter time slots based on selected start and end time
    const filteredTimeSlots = timeSlots.filter((time) => {
        if (!startTime || !endTime) return true;
        return time >= startTime && time <= endTime;
    });

    return (
        <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
            Time Slots Grid
        </Typography>
        {Object.keys(selectedDays).map((day) => (
            selectedDays[day] && (
            <Box key={day} sx={{ marginBottom: 3 }}>
                <Typography variant="h6">{day}</Typography>
                <Grid2 container spacing={2}>
                {filteredTimeSlots.map((time) => (
                    <Grid2 item xs={3} sm={2} md={1} key={time}>
                    <Box sx={{ 
                        border: '1px solid black', 
                        padding: '8px', 
                        borderRadius: '4px',
                        textAlign: 'center'
                    }}>
                        {time}
                    </Box>
                    </Grid2>
                ))}
                </Grid2>
            </Box>
            )
        ))}
        </Box>
    );
}
  
  
export default RangeGrid;

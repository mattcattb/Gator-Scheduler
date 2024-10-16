import React from 'react'
import { Typography, Box, Grid2} from '@mui/material';


// New Component for Range Grid
function RangeGrid({ selectedDays, timeSlots, startTime, endTime }) {
    // Filter time slots based on selected start and end time


    return (
        <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
            Time Slots Grid
        </Typography>
        </Box>
    );
}
  
  
export default RangeGrid;

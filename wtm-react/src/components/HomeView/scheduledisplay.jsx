import React from 'react'
import {Box, Typography, Button} from '@mui/material';
export default function ScheduleDisplay() {
  return (
    <Box>
        <Typography variant='h4' gutterBottom>Your Schedule</Typography>
        <Button variant='contained'>Edit</Button>
        <SchedulePreview/>
    </Box>
  )
}
function SchedulePreview() {
    // preview of your schedule
}
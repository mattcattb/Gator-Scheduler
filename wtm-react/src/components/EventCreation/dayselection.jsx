import React from 'react';
import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material';

function DaySelection() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <Box className="section" sx={{ margin: 2 }}>
            <Typography variant="h6" gutterBottom>
                Select Days
            </Typography>
            <Box className="days-selection" sx={{ display: 'flex', flexDirection: 'column' }}>
                {daysOfWeek.map((day, index) => (
                    <FormControlLabel
                        key={index}
                        control={<Checkbox id={day} />}
                        label={day}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default DaySelection;

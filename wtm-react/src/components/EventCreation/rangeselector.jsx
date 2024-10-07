import React, { useState } from 'react';
import { Typography, Box, Checkbox, FormControlLabel } from '@mui/material';

// Define days of the week and time range
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const startHour = 9; // 9:00 AM
const endHour = 17; // 5:00 PM
const timeSlots = generateTimeSlots(startHour, endHour, 30); // 30-minute intervals

// Function to generate time slots
function generateTimeSlots(start, end, interval) {
  const slots = [];
  for (let hour = start; hour < end; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = new Date();
      time.setHours(hour);
      time.setMinutes(minute);
      slots.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }
  return slots;
}

function PossibilityRangeSelector() {
  return (
    <div>
      <TimeSelectorGrid/>
    </div>
  );
}

function TimeSelectorGrid() {
  const [selectedTimes, setSelectedTimes] = useState({});

  const toggleTimeSlot = (day, time) => {
    setSelectedTimes((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !prev[day]?.[time],
      },
    }));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Select Available Times
      </Typography>

      {/* Table layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${daysOfWeek.length}, 1fr)`,
          gridTemplateRows: `repeat(${timeSlots.length}, auto)`,
          gap: 2,
        }}
      >
        {/* Day Headers */}
        {daysOfWeek.map((day) => (
          <Box key={day} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            {day}
          </Box>
        ))}

        {/* Time Slot Selections */}
        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            {daysOfWeek.map((day) => (
              <FormControlLabel
                key={`${day}-${time}`}
                control={
                  <Checkbox
                    checked={selectedTimes[day]?.[time] || false}
                    onChange={() => toggleTimeSlot(day, time)}
                    sx={{
                      color: selectedTimes[day]?.[time] ? '#0021A5' : '#FA4616', // Highlighted or unhighlighted
                      '&.Mui-checked': { color: '#0021A5' }, // Use Gator blue for selected
                    }}
                  />
                }
                label={time}
                sx={{
                  backgroundColor: selectedTimes[day]?.[time] ? '#0021A5' : '#FA4616', // Gator blue or orange
                  color: '#fff',
                  padding: 1,
                  borderRadius: 1,
                  cursor: 'pointer',
                  textAlign: 'center', // Center the text
                }}
              />
            ))}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

export default PossibilityRangeSelector;

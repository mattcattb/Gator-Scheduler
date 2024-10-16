import React from 'react';
import { Typography, Box, Checkbox, FormControlLabel, MenuItem, Select } from '@mui/material';


import generateTimeSlots from '../../utils/timing_utils';

const timeSlots = generateTimeSlots(8, 20, 15); // From 8:00 AM to 8:00 PM
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


function RangeSelector({selectedDays, setSelectedDays, startTime, setStartTime, endTime, setEndTime}) {

  const toggleDaySelection = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <div>
      <TimeToggle startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime}/>

      <DaySelection selectedDays={selectedDays} toggleDaySelection={toggleDaySelection} />
    </div>
  );
}

function TimeToggle({startTime, endTime, setStartTime, setEndTime}) {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Select Time Range
      </Typography>
      <Box sx={{  gap: 2 }}>
        <Typography variant="h6">Start Time:</Typography>
        <Select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          displayEmpty
          sx={{ width: 120 }}
        >
          <MenuItem value="" disabled>Select Start Time</MenuItem>
          {timeSlots.map((time) => (
            <MenuItem key={time} value={time}>{time}</MenuItem>
          ))}
        </Select>
        <Typography variant="h6">End Time:</Typography>
        <Select
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          displayEmpty
          sx={{ width: 120 }}
        >
          <MenuItem value="" disabled>Select End Time</MenuItem>
          {timeSlots.map((time) => (
            <MenuItem key={time} value={time}>{time}</MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
}

function DaySelection({ selectedDays, toggleDaySelection }) {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Select Days
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        {daysOfWeek.map((day) => (
          <FormControlLabel
            key={day}
            control={
              <Checkbox
                checked={selectedDays[day] || false}
                onChange={() => toggleDaySelection(day)}
              />
            }
            label={day}
          />
        ))}
      </Box>
    </Box>
  );
}

export default RangeSelector;

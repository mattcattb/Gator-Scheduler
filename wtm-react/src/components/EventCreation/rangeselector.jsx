import React, { useState } from 'react';
import { Typography, Box, Checkbox, FormControlLabel } from '@mui/material';

// Define days of the week and time range
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const startHour = 9; // 9:00 AM
const endHour = 17; // 5:00 PM
const timeSlots = generateTimeSlots(startHour, endHour, 30); // 30-minute intervals

/*
  todo:
  - Remove unselected days from grid and readjust
  - add a help section to explain how to use the grid
  - make simpler? More Appealing?
  - Add a section to adjust time range only
  - make sections more responsive

*/

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
  const [selectedDays, setSelectedDays] = useState({});

  const toggleDaySelection = (day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <div>
      <DaySelection selectedDays={selectedDays} toggleDaySelection={toggleDaySelection} />
      <TimeSelectorGrid selectedDays={selectedDays} />
    </div>
  );
}

function TimeSelectorGrid({ selectedDays }) {
  // Manage the Times selected for each day
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
              <Box
                key={`${day}-${time}`}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: selectedDays[day] ? 1 : 0.5, // Change opacity if day is not selected
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTimes[day]?.[time] || false}
                      onChange={() => toggleTimeSlot(day, time)}
                      sx={{
                        color: selectedTimes[day]?.[time] ? '#0021A5' : '#FA4616',
                        '&.Mui-checked': { color: '#0021A5' },
                      }}
                    />
                  }
                  label={time}
                  sx={{
                    backgroundColor: selectedTimes[day]?.[time] ? '#0021A5' : '#FA4616',
                    color: '#fff',
                    padding: 1,
                    borderRadius: 1,
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}


function DaySelection({ selectedDays, toggleDaySelection }) {
  // manage the Days Selected
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Select Days
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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

export default PossibilityRangeSelector;

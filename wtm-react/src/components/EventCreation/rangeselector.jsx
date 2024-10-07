import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';

// Define days of the week and time slots
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']; // Example slots

function PossibilityRangeSelector() {
  // Allows user to select what times group can choose for meeting
  return (
    <div>
      <DaySelection/>
      <TimeSelectorGrid/>
    </div>
  )
}

function TimeSelectorGrid() {
  // Maintain a state for selected time slots
  const [selectedTimes, setSelectedTimes] = useState({});

  // Toggle selection of a time slot
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

      {/* Calendar Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${timeSlots.length + 1}, 1fr)`, // 1 extra column for days
          gap: 1,
        }}
      >
        {/* Empty box for the corner above day labels */}
        <Box></Box>

        {/* Time Slot Headers */}
        {timeSlots.map((slot) => (
          <Box key={slot} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            {slot}
          </Box>
        ))}

        {/* Day Rows with time slots */}
        {daysOfWeek.map((day) => (
          <React.Fragment key={day}>
            {/* Day label column */}
            <Box sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {day}
            </Box>

            {/* Time slot columns */}
            {timeSlots.map((time) => (
              <Box
                key={time}
                onClick={() => toggleTimeSlot(day, time)} // Toggle time slot on click
                sx={{
                  height: 40,
                  backgroundColor: selectedTimes[day]?.[time] ? '#0021A5' : '#FA4616', // Gator blue or orange
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                {selectedTimes[day]?.[time] ? 'Selected' : ''}
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

function DaySelection(props) {

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
      <div className="section">
        <h2>Select Days</h2>
        <div className="days-selection">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-checkbox">
              <input type="checkbox" id={day} />
              <label htmlFor={day}>{day}</label>
            </div>
          ))}
        </div>
      </div>
  );
}

export default PossibilityRangeSelector
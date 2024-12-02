import React, { useContext } from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { UserContext } from '../../../context/UserProvider';

function JoinedMeetingPreview({ meeting, handleMeetingClick, handleLeave }) {
  const { user } = useContext(UserContext);

  const daysOfWeek = ['su', 'm', 't', 'w', 'th', 'f', 'sa'];
  const selectedDays = daysOfWeek.filter((_, index) => meeting.selectedDays[index] === "true");

  // Check if a day is selected
  const isDaySelected = (day) => {
    return selectedDays.includes(day);
  };

  return (
    <Card sx={{ marginBottom: 2, cursor: 'pointer' }} onClick={() => handleMeetingClick(meeting._id)}>
      <CardContent>
        <Typography variant="h5" gutterBottom>{meeting.meetingName}</Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>{meeting.meetingDescription}</Typography>
        <Typography variant="caption" display="block" gutterBottom>{`Organizers: ${meeting.organizers.length}`}</Typography>
        <Typography variant="caption" display="block" gutterBottom>{`Time: ${meeting.timeRange.startTime} - ${meeting.timeRange.endTime}`}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          {daysOfWeek.map((day) => (
            <Chip
              key={day}
              label={day.toUpperCase()}
              color={isDaySelected(day) ? 'primary' : 'default'}
              sx={{ width: 32 }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleLeave(user._id, meeting._id);
            }}
            sx={{ marginRight: 1 }}
          >
            Leave Meeting
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default JoinedMeetingPreview;
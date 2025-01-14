// EventList.jsx
import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const EventList = ({ events, onEventClick }) => {

  return (
  <div className='overflow-y-scroll border border-gray-300 bg-white rounded p-4'>
    <h6 className='text-lg font-semibold mb-4'>Events</h6>
    <ul>
      {events.length > 0 ? (
        events.map((event)=>(
          <li
            key={event._id}
            className='cursor-pointer p-2 hover:bg-gray-100 rounded'
            onClick={()=> onEventClick(event)}
          >
            <div className='font-medium'>{event.title}</div>
            <div className="text-sm text-gray-500">{`${event.start} to ${event.end}`}</div>

          </li>
        ))) : (
          <li className='text-gray-500'>No current events</li>
        )}
    </ul>
  </div>)

  return (
    <Box sx={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ccc', borderRadius: 1, p: 2 }}>
      <Typography variant="h6">Events</Typography>
      <List>
        {events.map((event) => (
          <ListItem button key={event._id} onClick={() => onEventClick(event)}>
            <ListItemText primary={event.title} secondary={`${event.start} to ${event.end} `} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EventList;

import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const EventList = ({ events, onEventClick }) => {

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='overflow-y-scroll border border-gray-300 bg-white rounded p-2 w-full'>
      <h6 className='text-xl font-semibold mb-4'>Events</h6>
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li
              key={event._id}
              className='cursor-pointer p-2 hover:bg-gray-100 rounded'
              onClick={() => onEventClick(event)}
            >
              <div className='font-bold'>{event.title}</div>
              <div className="text-sm text-gray-600">{`${formatDate(event.start)} to ${formatDate(event.end)}`}</div>
              <div className="text-xs text-gray-500">{event.description}</div>
            </li>
          ))) : (
          <li className='text-gray-500 text-center'>No current events</li>
        )}
      </ul>
    </div>
  );
};

export default EventList;
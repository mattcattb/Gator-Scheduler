import React from 'react';
import { useState } from 'react';

import  '../components/EventCreation/eventcreator.css';

import AddFriends from '../components/EventCreation/addfriends';
import EventHeader from '../components/EventCreation/eventheader';
import RangeSelector from '../components/EventCreation/rangeselector';
import RangeGrid from '../components/EventCreation/rangegrid';

function EventCreator() {

  const [eventName, setEventName] = useState('');  // State for event name
  const [eventDescription, setEventDescription] = useState('');  // State for event description
  const [selectedDays, setSelectedDays] = useState([true, true, true, false, false, false, false]); // Days selection
  const [startTime, setStartTime] = useState(''); // State for start time
  const [endTime, setEndTime] = useState(''); // State for end time

  // selected days is an array of true or false values, where each index represents a day of the week
  // const [selectedDays, setSelectedDays] = useState([false, false, false, false, false, false, false]);
  
  const handleSubmit = () => {
    // You can perform validation and submit the event data here
    const eventData = {
      name: eventName,
      description: eventDescription,
      days: selectedDays,
      start_time: startTime,
      end_time: endTime,
    };
    console.log("Event Created:", eventData);
    // Further logic to send eventData to backend can be added here
  };
  
  return (
    <div className="event-creation-container">
      
      <EventHeader 
        eventName={eventName} 
        setEventName={setEventName} 
        eventDescription={eventDescription} 
        setEventDescription={setEventDescription}
      />
      <RangeSelector 
        selectedDays={selectedDays} 
        setSelectedDays={setSelectedDays} 
        startTime={startTime} 
        setStartTime={setStartTime} 
        endTime={endTime} 
        setEndTime={setEndTime}
      />
      <RangeGrid 
        day_range={selectedDays}
        start_time={startTime}
        end_time={endTime}
      />
      <AddFriends/>
      <div className="section">
        <button className="submit-btn" onClick={handleSubmit}>Create Event</button>
      </div>
    </div>
  );  
}
  
export default EventCreator;
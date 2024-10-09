import React from 'react';
import { useState } from 'react';

import  '../components/EventCreation/eventcreator.css';

import AddFriends from '../components/EventCreation/addfriends';
import EventHeader from '../components/EventCreation/eventheader';
import PossibilityRangeSelector from '../components/EventCreation/rangeselector';

function EventCreator() {

  const [eventName, setEventName] = useState('');  // State for event name
  const [eventDescription, setEventDescription] = useState('');  // State for event description
  // selected days is an array of true or false values, where each index represents a day of the week
  // const [selectedDays, setSelectedDays] = useState([false, false, false, false, false, false, false]);
  return (
    <div className="event-creation-container">
      
      <EventHeader 
        eventName={eventName} 
        setEventName={setEventName} 
        eventDescription={eventDescription} 
        setEventDescription={setEventDescription}
      />
      <PossibilityRangeSelector/>
      <AddFriends/>
      <div className="section">
        <button className="submit-btn">Create Event</button>
      </div>
    </div>
  );  
}
  
export default EventCreator;
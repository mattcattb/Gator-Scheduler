import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';

import  '../components/EventCreation/eventcreator.css';

import AddFriends from '../components/EventCreation/addfriends';
import MeetingOptions from '../components/EventCreation/meetingoptions';
import DescriptionField from '../components/EventCreation/descriptionfield';

function EventCreator() {
  
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    selectedDays: [true, true, true, false, false, false, false],
    startTime: '',
    endTime: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Event Created:", formData);
    // Further logic to send eventData to backend can be added here
  };
  
  return (
    <div className="event-creation-container">
      <DescriptionField eventName={formData.eventName} eventDescription={formData.eventDescription} handleChange={handleChange} />
      <MeetingOptions formData={formData} handleChange={handleChange}/>
      <AddFriends/>
      <Button onClick={handleSubmit}/> 
    </div>
  );  
}
  
export default EventCreator;
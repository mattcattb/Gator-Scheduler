import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';

import  '../components/MeetingCreation/eventcreator.css';

import AddMembers from '../components/MeetingCreation/addmembers';
import MeetingOptions from '../components/MeetingCreation/meetingoptions';
import DescriptionField from '../components/MeetingCreation/descriptionfield';

function MeetingCreator() {
  
  const [formData, setFormData] = useState({
    meetingName: '',
    meetingDescription: '',
    selectedDays: [true, true, true, true, true, true, true],
    startTime: '',
    endTime: '',
    members: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevData) => {
      // Check if the name starts with 'selectedDays' and contains an index
      if (name.startsWith("selectedDays")) {
        const match = name.match(/\d+/); // Extract the index
        if (match) {
          const index = parseInt(match[0], 10);
          const updatedDays = [...prevData.selectedDays];
          updatedDays[index] = checked; // Update the specific index with the new checked value
  
          return { ...prevData, selectedDays: updatedDays };
        }
      }
      
      // Update other fields
      return {
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleMembersChange = (newMembers) => {
    setFormData((prevData) => ({
      ...prevData,
      onMembersChange: newMembers,
    }));
  };

  const handleSubmit = () => {
    console.log("Meeting Created:", formData);
    //TODO Further logic to send MeetingData to backend can be added here
  };
  
  return (
    <div className="Meeting-creation-container">
      <DescriptionField eventName={formData.meetingName} meetingDescription={formData.meetingDescription} handleChange={handleChange} />
      <MeetingOptions formData={formData} handleChange={handleChange}/>
      <AddMembers members={formData.members} onMembersChange={handleMembersChange}/>
      <Button onClick={handleSubmit}>Create Meeting</Button> 
    </div>
  );  
}
  
export default MeetingCreator;
import React, { useState, useContext } from 'react';
import { Button } from '@mui/material';

import '../components/MeetingCreation/meetingcreator.css';

import InviteForm from '../components/MeetingCreation/inviteform';
import MeetingOptions from '../components/MeetingCreation/meetingoptions';
import DescriptionField from '../components/MeetingCreation/descriptionfield';

import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserProvider';
import { MeetingContext } from '../context/MeetingProvider';


function MeetingCreator() {
  
  const { addMeeting } = useContext(MeetingContext);
  var {user} = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    meetingName: 'Example Meeting',
    meetingDescription: 'Example Description',
    selectedDays: [true, true, true, true, true, true, true],
    startTime: '',
    endTime: '',
    invited_members: []  // Change: Add invited_members to state
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevData) => {
      if (name.startsWith("selectedDays")) {
        const match = name.match(/\d+/); // Extract the index
        if (match) {
          const index = parseInt(match[0], 10);
          const updatedDays = [...prevData.selectedDays];
          updatedDays[index] = checked; // Update the specific index with the new checked value
  
          return { ...prevData, selectedDays: updatedDays };
        }
      }
      
      return {
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleInvitedMembersChange = (newInvitedMembers) => {
    setFormData((prevData) => ({
      ...prevData,
      invited_members: newInvitedMembers,  // Update: Correctly set invited_members
    }));
  };

  const handleSubmit = async () => {
    try {
      await addMeeting(user._id, formData);
      navigate("/home");
    }catch(error){
      console.log("Error occured: ", error);
    }
  };
  
  return (
    <div className="Meeting-creation-container">
      <DescriptionField
        meetingName={formData.meetingName}
        meetingDescription={formData.meetingDescription}
        handleChange={handleChange}
      />
      <MeetingOptions formData={formData} handleChange={handleChange} />
      <InviteForm invited_members={formData.invited_members} onMembersChange={handleInvitedMembersChange} />  {/* Change: updated props */}
      <Button onClick={handleSubmit}>Create Meeting</Button> 
    </div>
  );  
}
  
export default MeetingCreator;
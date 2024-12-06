import React, { useState, useContext } from 'react';
import { Button, Card, CardContent, CardActions, Typography } from '@mui/material';

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
    startTime: new Date().setHours(9, 0), 
    endTime: new Date().setHours(17, 0),
    invited_members: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevData) => {
      if (name.startsWith("selectedDays")) {
        const match = name.match(/\d+/);
        if (match) {
          const index = parseInt(match[0], 10);
          const updatedDays = [...prevData.selectedDays];
          updatedDays[index] = checked;
  
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
      invited_members: newInvitedMembers,
    }));
  };

  const handleSubmit = async () => {
    try {
      await addMeeting(user._id, formData);
      navigate("/home");
    } catch(error){
      console.log("Error occured: ", error);
    }
  };
  
  return (
    <div className='meeting-creator-page'>
        <Typography  className='page-title' variant='h4'>Create a Meeting</Typography>
        <Card variant="outlined" style={{margin:'50px auto', maxWidth: '800px'}}>
        {/* 1st input field for taking in name and date */}
        <CardContent>
          <DescriptionField
            meetingName={formData.meetingName}
            meetingDescription={formData.meetingDescription}
            handleChange={handleChange}
          />
          {/* subsections to handle time configuration and ad-hoc adding of users to meetings */}
          <MeetingOptions formData={formData} handleChange={handleChange} />
          <InviteForm invited_members={formData.invited_members} onMembersChange={handleInvitedMembersChange} />
        </CardContent>
        {/* simple submission button */}
        <CardActions>
          <Button onClick={handleSubmit}>Create Meeting</Button>
        </CardActions>
      </Card>
    </div>
  );  
}
  
export default MeetingCreator;
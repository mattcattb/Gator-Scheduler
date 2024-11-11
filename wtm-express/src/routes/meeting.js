const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Meeting = require('../models/meeting');

router.post('/create', async (req, res) => {
    const { meetingName, meetingDescription, selectedDays, startTime, endTime, friendUsernames } = req.body;
    
    try {
      const invitedUsers = await User.find({ username: { $in: friendUsernames } });
      const newMeeting = new Meeting({
        meetingName,
        meetingDescription,
        selectedDays,
        timeRange: {
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
        invitedUsers: invitedUsers.map(user => user._id),
      });
  
      const savedMeeting = await newMeeting.save();
  
      res.status(201).json({ msg: 'Meeting created successfully', meeting: savedMeeting });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
  module.exports = router;

const User = require("../models/user.js");  // Assuming you have a User model
const Meeting = require("../models/meeting.js")
const mongoose = require('mongoose');


const addMeeting = async (req, res) => {
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
}

const getJoinedMeetings = async (req, res) => {

  const { userId } = req.query;
  
  try{

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    const user = await User.findById(userId).populate('meetings'); // Populate meetings

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.meetings);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
}

//!! very important to setup an invited meetings section for each user!!!
const getInvitedMeetings = async (req, res) => {
  const {userId} = req.query;

  return;

  try{
    if (!userId) {
      return res.status(400).json({message:'User ID parameter is required.'});
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({message:'User ID must be valid.'});
    }

    const user = await User.findById(user).populate('invites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.invited);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
}

module.exports = {
    addMeeting,
    getJoinedMeetings,
    getInvitedMeetings
};
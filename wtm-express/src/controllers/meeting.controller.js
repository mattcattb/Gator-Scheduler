
const User = require("../models/user.js");  // Assuming you have a User model
const Meeting = require("../models/meeting.js")

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


module.exports = {
    addMeeting
};
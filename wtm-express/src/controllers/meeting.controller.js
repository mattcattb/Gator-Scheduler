
const User = require("../models/user.js");
const Meeting = require("../models/meeting.js");
const mongoose = require('mongoose');
const { findMeetingTimes } = require('../services/meetingtime.js');

// Add new meeting to a user
const addMeeting = async (req, res) => {
    const { meeting: {meetingName, meetingDescription, organizers, members, selectedDays, timeRange, friendUsernames, invitedUsers}, userId} = req.body;

    try {
      // This line isn't doing anything right now because meetingService.js doesn't submit a field named "friendUsernames"
      //const invitedUsers = await User.find({ username: { $in: friendUsernames } });

    // Create new meeting
      const newMeeting = new Meeting({
        meetingName,
        meetingDescription,
        selectedDays,
        organizers,
        members,
        timeRange: {
          startTime: new Date(timeRange.startTime),
          endTime: new Date(timeRange.endTime),
        },
        invitedUsers: invitedUsers,
      });
  
      const savedMeeting = await newMeeting.save();
  
      // Update the user to include this meeting in their meetings array
      await User.findByIdAndUpdate(userId, { $push: { meetings: savedMeeting._id } });

      //TODO: add this meeting id to meeting invite list of everyone requested
      //console.log("invited members:", invitedUsers)
      for (const userId of invitedUsers) {
        await User.findByIdAndUpdate(
          userId,
          { $push: { invited_meetings: savedMeeting._id } },
        );
      }

      res.status(201).json({ msg: 'Meeting created successfully', meeting: savedMeeting });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
};

// Allow user to join a meeting
const joinMeeting = async (req, res) => {
  const { userId, meetingId } = req.body;

  // Validate request
  if (!userId || !meetingId) {
    return res.status(400).json({ error: "userId and meetingId are required" });
  }
  
  try {
    // Remove meeting from invited meetings and add to accepted meetings
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { invited_meetings: meetingId },
        $push: { meetings: meetingId },
      }
    );
    // Add user to meeting users list
    await Meeting.findByIdAndUpdate(
      meetingId,
      {
        $push: { members: userId }
      }
    );
    res.status(200).json({ msg: "Meeting joined successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Return meetings a user has joined
const getJoinedMeetings = async (req, res) => {
  const { userId } = req.query;

  try {
      // Validate request
      if (!userId) {
          return res.status(400).json({ error: 'Bad Request', message: 'User ID is required' });
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Bad Request', message: 'Invalid User ID format' });
      }

      // Get users meetings
      const user = await User.findById(userId).populate('meetings');

      if (!user) {
          return res.status(404).json({ error: 'Not Found', message: 'User not found' });
      }

      res.status(200).json(user.meetings);
  } catch (err) {
      console.error("ERROR OCCURED: ", err);
      res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred' });
  }
};

// Get meetings a user is invited to 
const getInvitedMeetings = async (req, res) => {
  const { userId } = req.query;

  try {
      // Validate request
      if (!userId) {
          return res.status(400).json({ error: 'Bad Request', message: 'User ID parameter is required' });
      }
      
      if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Bad Request', message: 'Invalid User ID format' });
      }
      // Find invited meetings
      const user = await User.findById(userId).populate('invited_meetings');

      if (!user) {
          return res.status(404).json({ error: 'Not Found', message: 'User not found' });
      }

      res.status(200).json(user.invited_meetings);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred' });
  }
};

// Get meeting from database
const getMeetingById = async (req, res) => {
  const { meetingId } = req.query; // Assuming the meeting ID is passed as a route parameter

  try {
    // Validate the Meeting ID
    if (!meetingId) {
      return res.status(400).json({ error: 'Bad Request', message: 'Meeting ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(meetingId)) {
      return res.status(400).json({ error: 'Bad Request', message: 'Invalid Meeting ID format' });
    }

    // Fetch the meeting document
    const meeting = await Meeting.findById(meetingId);

    // If the meeting doesn't exist
    if (!meeting) {
      return res.status(404).json({ error: 'Not Found', message: 'Meeting not found' });
    }

    // Return the meeting document
    res.status(200).json(meeting);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred' });
  }
};

// Leave a meeting the user has already joined
const leaveMeeting = async (req, res) => {
    const { userId, meetingId } = req.body;
    
    // Validate request
    if (!userId || !meetingId) {

        return res.status(400).json({ error: `userId and meetingId are required for user ${userId} and meetingId ${meetingId}` });
    }
    
    // Ensure user is not the meetings organizer
    const is_organizer = await Meeting.findOne({ _id: meetingId, organizers: { $in: [userId] } });
    
    if (is_organizer) {
        return res.status(400).json({ error: "Organizers cannot leave their own meetings"});
    }

    try {
        // Remove meeting from user's meetings
        await User.findByIdAndUpdate(
            userId,
            { $pull: { meetings: meetingId }, }
        );
        // Remove user from meetings user's
        await Meeting.findByIdAndUpdate(
            meetingId,
            { $pull: { members: userId } }
        );
        res.status(200).json({ msg: "Left meeting successfully" });

    } catch (err) {

        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete a meeting
const deleteMeeting = async (req, res) => {
    const { userId, meetingId } = req.body;
    // Validate request
    if (!userId || !meetingId) {
        return res.status(400).json({ error: "userId and meetingId are required" });
    }

    try {
        const meeting = await Meeting.findById(meetingId);
        
        if (!meeting) {
            return res.status(404).json({ error: "Meeting not found" });
        }
        // Ensure user has permission to delete the meeting
        if (!meeting.organizers.includes(userId)) {
            return res.status(403).json({ error: "Only organizers can delete meetings" });
        }
        // Remove meeting from joined or invited users
        await User.updateMany(
            { $or: [{ meetings: meetingId }, { invited_meetings: meetingId }] },
            { $pull: { meetings: meetingId, invited_meetings: meetingId } }
        );  
        // Delete meeting from database
        await Meeting.findByIdAndDelete(meetingId);

        res.status(200).json({ msg: "Meeting deleted successfully" });
    } catch (err) {
        console.error("Error deleting meeting:", err);
        res.status(500).json({ error: "Server error", message: err.message });
    }
};

// Reject a meeting invite
const rejectMeeting = async (req, res) => {
    const { meetingId, userId } = req.body;

    try {
        // Fetch the meeting by ID
        const meeting = await Meeting.findById(meetingId);
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found." });
        }
        // Fetch the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found."});
        }

        // Check if the user is in the invited list
        if (!meeting.invitedUsers.includes(userId)) {
            return res.status(400).json({ message: "User is not invited to this meeting." });
        }

        // Remove user from invited list, and remove meeting from users invited meetings
        meeting.invitedUsers = meeting.invitedUsers.filter(user => user.toString() !== userId);
        user.invited_meetings = user.invited_meetings.filter(meet => meet.toString() !== meetingID);


        await meeting.save();
        await user.save();

        res.status(200).json({ message: "Meeting invitation rejected successfully." });
    } catch (error) {
        console.error("Error rejecting meeting:", error);
        res.status(500).json({ message: "An error occurred while rejecting the meeting invitation." });
    }
};


module.exports = {
    addMeeting,
    getJoinedMeetings,
    getInvitedMeetings,
    getMeetingById,
    leaveMeeting,
    deleteMeeting,
    joinMeeting,
    rejectMeeting
};

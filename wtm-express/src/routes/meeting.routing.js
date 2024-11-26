const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { addMeeting, getInvitedMeetings, getJoinedMeetings, getMeetingById, joinMeeting } = require("../controllers/meeting.controller");

router.post('/create', addMeeting);
router.get('/joined', getJoinedMeetings);
router.get('/invited', getInvitedMeetings);
router.put('/join', joinMeeting);
router.get('', getMeetingById)
  
module.exports = router;
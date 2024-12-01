const express = require('express');
const router = express.Router();

const { addMeeting, getInvitedMeetings, getJoinedMeetings, getMeetingById, leaveMeeting, deleteMeeting, joinMeeting } = require("../controllers/meeting.controller");

router.post('/create', addMeeting);
router.get('/joined', getJoinedMeetings);
router.get('/invited', getInvitedMeetings);
router.put('/join', joinMeeting);
router.put('/leave', leaveMeeting);
router.delete('/delete', deleteMeeting);
router.get('', getMeetingById)
  
module.exports = router;
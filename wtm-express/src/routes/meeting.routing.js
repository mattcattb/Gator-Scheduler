const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { addMeeting, getInvitedMeetings, getJoinedMeetings } = require("../controllers/meeting.controller");

router.post('/create', addMeeting);
router.get('/joined', (req, res, next) => {
    console.log('Received request to /joined with params:', req.query);
    next();
}, getJoinedMeetings);
router.get('/invited', getInvitedMeetings);
  
module.exports = router;
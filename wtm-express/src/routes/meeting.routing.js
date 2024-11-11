const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const { addMeeting } = require("../controllers/meeting.controller");

router.post('/create', addMeeting);
  
module.exports = router;
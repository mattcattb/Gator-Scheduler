const { Router } = require('express');
const router = Router();
const User = require('../models/user.js');
const Event = require('../models/user.js');

import { getEvents, postEvent, editEvent, deleteEvent } from "../controllers/events.controller.js"

// Returns list of events in JSON for front end to display
router.get('/getEvents', getEvents);
router.post('/postEvent', postEvent);
router.put('/editEvent', editEvent);
router.delete('/deleteEvent', deleteEvent);



module.exports = router;

const { Router } = require('express');
const router = Router();
const User = require('../models/user.js');
const Event = require('../models/event.js');

import { getEvents, postEvent, editEvent, deleteEvent } from "../controllers/events.controller.js"

// Returns list of events in JSON for front end to display
router.get('/', getEvents);
router.post('/', postEvent);
router.put('/', editEvent);
router.delete('/', deleteEvent);

module.exports = router;

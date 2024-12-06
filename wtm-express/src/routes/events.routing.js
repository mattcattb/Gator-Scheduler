const { Router } = require('express');
const router = Router();

const { getEvents, postEvent, editEvent, deleteEvent } = require("../controllers/events.controller");
// Create all event routes from controller
// Returns list of events in JSON for front end to display
router.get('/', getEvents);
router.post('/', postEvent);
router.put('/:eventId', editEvent);
router.delete('/:eventId', deleteEvent);

module.exports = router;

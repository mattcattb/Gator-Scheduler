const { Router } = require('express');
const router = Router();

const { getEvents, postEvent, editEvent, deleteEvent } = require("../controllers/events.controller");

console.log(getEvents);  // Should not be undefined
console.log(postEvent);
console.log(editEvent);
console.log(deleteEvent);

// Returns list of events in JSON for front end to display
router.get('/', getEvents);
router.post('/', postEvent);
router.put('/:eventId', editEvent);
router.delete('/:eventId', deleteEvent);

module.exports = router;

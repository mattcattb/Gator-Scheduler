const { Router } = require('express');
const router = Router();

const { addFriends } = require("../controllers/friends.controller");

// Add a friend
router.post('/', addFriends);

module.exports = router;

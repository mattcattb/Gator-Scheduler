const express = require('express');
const router = express.Router();

const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, unfriendUser } = require("../controllers/friends.controller");
// Create all friend routes from controller
router.post('/request', sendFriendRequest);
router.put('/accept', acceptFriendRequest);
router.put('/reject', rejectFriendRequest);
router.delete('/unfriend', unfriendUser);

module.exports = router;

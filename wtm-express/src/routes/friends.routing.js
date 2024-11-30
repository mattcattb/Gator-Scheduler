const { Router } = require('express');
const router = Router();

const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, unfriendUser } = require("../controllers/friends.controller");

router.post('/send', sendFriendRequest);
router.put('/accept', acceptFriendRequest);
router.put('/reject', rejectFriendRequest);
router.delete('/unfriend', unfriendUser);

module.exports = router;

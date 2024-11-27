const { Router } = require('express');
const router = Router();

const { addFriend } = require("../controllers/friends.controller");

router.post('/addFriend', addFriend);

module.exports = router;

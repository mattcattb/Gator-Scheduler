const express = require('express');
const router = express.Router();
const { getUser } = require("../controllers/user.controller");
// Create get user route from controller
router.get('/:userId', getUser);

module.exports = router;

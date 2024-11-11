const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const {registerUser, loginUser} = require("")

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

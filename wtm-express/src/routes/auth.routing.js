const express = require('express');
const router = express.Router();

const {registerUser, loginUser, deleteUser} = require("../controllers/auth.controller");
// Create all auth routes from controller 
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete', deleteUser);

module.exports = router;

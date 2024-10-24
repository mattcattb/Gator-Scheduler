const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({msg: "Username or password is incorrect"});
        }
        const compare_passwords = await bcrypt.compare(password, user.password);
        if (!compare_passwords) {
            return res.status(400).json({msg: "Username or password is incorrect"})
        }
        res.json({ userId: user._id});
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
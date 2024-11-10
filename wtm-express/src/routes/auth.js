const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  const { name, username, password } = req.body;

  try {
    console.log(name)
    console.log(username)
    console.log(password)
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  }
  catch (err) {
    res.status(500).send('Server error');
  }
});

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

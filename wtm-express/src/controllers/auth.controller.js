const User = require("../models/user.js");  // Assuming you have a User model
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, username, password } = req.body;
  
    try {
      console.log(name);
      console.log(username);
      console.log(password);
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      icon = Math.floor(Math.random() * 5) + 1, // this generates the random number through some voodoo magic
      user = new User({
        name,
        username,
        password,
        icon,
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
      res.status(201).json({ msg: 'User registered successfully', userId: user._id });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Bad Request', message: 'Username or password is incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Bad Request', message: 'Username or password is incorrect' });
    }

    res.json({ message: 'User logged in successfully', userId: user._id.toString() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected error occurred' });
  }
};

module.exports = {
    registerUser,
    loginUser,
};
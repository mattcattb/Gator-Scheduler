const User = require("../models/user.js");  // Assuming you have a User model
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { name, username, password } = req.body;
  
    try {
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
      res.status(201).json({ msg: 'User registered successfully', userId: user._id });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
}

const loginUser = async (req, res) => {
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
        res.json({
          userId: user._id,
          icon: user.icon,
          name: user.name,
          meetings: user.meetings,
          friends: user.friends,
          schedule: user.schedule
        });
    }
    catch (err) {
        res.status(500).send('Server error');
    }
}

module.exports = {
    registerUser,
    loginUser,
};
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
  
      user = new User({
        name,
        username,
        password,
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
      console.log("route hit");

      const responseUser = {
        _id: user._id.toString(),
        name: user.name,
        username: user.username,
        icon: user.icon || '', // Default to an empty string if not set
        meetings: user.meetings || [], // Default to an empty array if not set
        friends: user.friends || [],
        schedule: user.schedule || []
      };
      

      console.log("User registered successfully ", responseUser);

      res.status(201).json({
        msg: 'User registered successfully',
        user: responseUser
      });
  
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

        const responseUser = {
          _id: user._id.toString(),
          name: user.name,
          username: user.username,
          icon: user.icon || '',
          meetings: user.meetings || [],
          friends: user.friends || [],
          schedule: user.schedule || []
        };

        console.log("User logged in successfully ", responseUser)
    
        res.json({
          msg:"User logged in successfully",
          user: responseUser
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
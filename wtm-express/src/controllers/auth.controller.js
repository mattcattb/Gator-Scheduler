const User = require("../models/user.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Utility function to validate required fields
const validateFields = (fields, requiredFields) => {
    const missingFields = requiredFields.filter((field) => !fields[field]);
    if (missingFields.length > 0) {
        return `Missing required fields: ${missingFields.join(', ')}`;
    }
    return null;
};

// Register new user in database
const registerUser = async (req, res) => {
    const { name, username, password } = req.body;

    // Validate input
    const errorMessage = validateFields(req.body, ['name', 'username', 'password']);
    if (errorMessage) {
        return res.status(400).json({ error: 'Bad Request', message: errorMessage });
    }

    try {
        // Make sure user is a new one
        let user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ error: 'Conflict', msg: 'User already exists' });
        }
        
        // Create new user
        const icon = Math.floor(Math.random() * 5) + 1; // Generate a random icon for user
        user = new User({
            name,
            username,
            password,
            icon,
        });
        
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = jwt.sign(
          {userId: user._id},
          process.env.JWT_SECRET,
          {expiresIn: '24h'}
        );

        res.status(201).json({ 
          token: token,
          userId: user._id.toString(),         
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', msg: 'An unexpected error occurred' });
    }
};

// Login controller
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  const errorMessage = validateFields(req.body, ['username', 'password']);
  if (errorMessage) {
      return res.status(400).json({ error: 'Bad Request', msg: errorMessage });
  }

  try {
      const user = await User.findOne({ username });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({
            error: 'Invalid credentials', msg: 'Password doesnt match!'
        });
      }         
      // Check if username and password are valid
      if (!user) {
          return res.status(400).json({ error: 'Bad Request', msg: 'Username or password is incorrect' });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }          
      )

      // Successful login
      res.status(200).json({
        token: token,
        userId: user._id.toString(), 
      });
  } catch (err) {
      res.status(500).json({ error: 'Internal Server Error', msg: 'An unexpected error occurred' });
  }
};

// Remove user from databse
const deleteUser = async (req, res) => {
    const { userId, password } = req.body;
    
    // Validate request
    const errorMessage = validateFields(req.body, ['userId', 'password']);
    if (errorMessage) {
        return res.status(400).json({ error: 'Bad Request', msg: errorMessage });
    }

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Not Found', msg: 'User not found' });
        }
        // Check that password matches to allow deletion
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ error: 'Forbidden', msg: 'Password is incorrect' });
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', msg: 'An unexpected error occurred' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
};

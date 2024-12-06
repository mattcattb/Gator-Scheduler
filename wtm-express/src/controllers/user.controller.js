const User = require('../models/user.js');

// Get a user from database
const getUser = async (req, res) => {
    try { 
        const id = req.params.userId;
        const user = await User.findById(id).select('-password');
        // Validate request
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // Return user information
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getUser };

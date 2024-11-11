const Event = require("../models/event.js");
const User = require("../models/user.js");  // Assuming you have a User model

const { findById } = require('../models/user');


const addFriends = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        // Find the user and the friend
        const user = await findById(userId);
        const friend = await findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found' });
        }

        // Check if they are already friends
        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'Already friends' });
        }

        // Add the friend to the user's friends list
        user.friends.push(friendId);
        await user.save();

        res.status(200).json({ message: 'Friend added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {
    addFriends
};
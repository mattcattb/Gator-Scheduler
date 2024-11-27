const Event = require("../models/event.js");
const User = require("../models/user.js");

const addFriend = async (req, res) => {
    try {
        const { userId, friendname } = req.body;

        const user = await User.findById(userId);
        const friend = await User.findOne({ username: friendname });

        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found.' });
        }

        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ message: 'Already friends.' });
        }

        if (user.invited_friends.includes(friend._id)) {
            return res.status(400).json({ message: 'Already sent invite.' });
        }

        user.invited_friends.push(friend._id);
        await user.save();

        res.status(200).json({ message: 'Friend added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
}

module.exports = {
    addFriend
};
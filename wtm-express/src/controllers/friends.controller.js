const User = require("../models/user.js");
const mongoose = require('mongoose');

const sendFriendRequest = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

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
        friend.invited_friends.push(user._id);
        await user.save();

        res.status(200).json({ message: 'Successfully sent friend request!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
}

const acceptFriendRequest = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found.' });
        }

        if (!user.invited_friends.includes(friend._id)) {
            return res.status(400).json({ message: 'No friend request from this user.' });
        }

        user.friends.push(friend._id);
        user.invited_friends = user.invited_friends.filter(
            (id) => id.toString() !== friend._id.toString()
        );

        friend.friends.push(user._id);
        friend.invited_friends = friend.invited_friends.filter(
            (id) => id.toString() !== user._id.toString()
        );

        await user.save();
        await friend.save();

        res.status(200).json({ message: 'Friend request accepted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};

const rejectFriendRequest = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: 'User or Friend not found.' });
        }

        if (!user.invited_friends.includes(friend._id)) {
            return res.status(400).json({ message: 'No friend request from this user.' });
        }

        user.invited_friends = user.invited_friends.filter(
            (id) => id.toString() !== friend._id.toString()
        );
        
        friend.invited_friends = friend.invited_friends.filter(
            (id) => id.toString() !== user._id.toString()
        );

        await user.save();

        res.status(200).json({ message: 'Friend request rejected.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};


const unfriendUser = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isFriend = user.friends.some(id => id.toString() === friendId.toString());
        if (!isFriend) {
            return res.status(400).json({ message: 'Users are not friends.' });
        }
        
        const friend = await User.findById(friendId);
        if (!friend) {
            return res.status(404).json({ message: 'Friend user does not exist.'});
        }

        user.friends = user.friends.filter((id) => id.toString() !== friend._id.toString());
        friend.friends = friend.friends.filter((id) => id.toString() !== user._id.toString());

        await user.save();
        await friend.save();

        res.status(200).json({ message: 'Unfriended successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
};


module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriendUser,
};
const User = require("../models/user.js");
const bcrypt = require('bcryptjs');

// Utility function to validate required fields
const validateFields = (fields, requiredFields) => {
    const missingFields = requiredFields.filter((field) => !fields[field]);
    if (missingFields.length > 0) {
        return `Missing required fields: ${missingFields.join(', ')}`;
    }
    return null;
};

const registerUser = async (req, res) => {
    const { name, username, password } = req.body;

    // Validate input
    const errorMessage = validateFields(req.body, ['name', 'username', 'password']);
    if (errorMessage) {
        return res.status(400).json({ error: 'Bad Request', msg: errorMessage });
    }

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(409).json({ error: 'Conflict', msg: 'User already exists' });
        }

        const icon = Math.floor(Math.random() * 5) + 1; // Generate a random icon
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
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', msg: 'An unexpected error occurred' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    const errorMessage = validateFields(req.body, ['username', 'password']);
    if (errorMessage) {
        return res.status(400).json({ error: 'Bad Request', msg: errorMessage });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Bad Request', msg: 'Username or password is incorrect' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Bad Request', msg: 'Username or password is incorrect' });
        }

        res.status(200).json({ msg: 'User logged in successfully', userId: user._id.toString() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', msg: 'An unexpected error occurred' });
    }
};

const deleteUser = async (req, res) => {
    const { userId, password } = req.body;

    const errorMessage = validateFields(req.body, ['userId', 'password']);
    if (errorMessage) {
        return res.status(400).json({ error: 'Bad Request', msg: errorMessage });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Not Found', msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ error: 'Forbidden', msg: 'Password is incorrect' });
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', msg: 'An unexpected error occurred' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
};

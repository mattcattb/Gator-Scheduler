const User = require('../models/user.js');

const getUser = async (req, res) => {
    try { 
        const id = req.params.userId;
        const user = await User.findById(id).select('-password');

        if (!user)
            return res.status(404).json({ message: "User not found" });
        
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { getUser };
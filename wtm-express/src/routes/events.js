const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const Event = require('../models/user.js');

// Returns list of events in JSON for front end to display
router.get('/getEvents', async (req, res) => {
   try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        
        if (!user) return res.status(204).json({ message: 'User not found' });

        res.json(user.events);

    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;

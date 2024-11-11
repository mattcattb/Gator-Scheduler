const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const Event = require('../models/user.js');

// Returns list of events in JSON for front end to display
router.post('/addEvent', async (req, res) => {
   try {
        const user = await User.findById(req.body.userId);
        
        if (!user) return res.status(204).json({ message: 'User not found' });

        const newEvent = await Event.create({
            title: req.body.title,
            description: req.body.description,
            start: req.body.title,
            end: req.body.end
        });

        user.events.push(newEvent._id);

        result = await user.save();

        res.response(result);

    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;

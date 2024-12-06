const Event = require("../models/event.js");
const User = require("../models/user.js");  // Assuming you have a User model
const mongoose = require('mongoose');

// Get events for a user
const getEvents = async (req, res) => {
    try {
        const { userId } = req.query;
        // Valudate request
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        // Check if userID is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }

        const user = await User.findById(userId).populate('events'); // Populate events
        // Check if user actually exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Return success status with json
        res.status(200).json(user.events);

    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).send('Server error');
    }
};

// Create new event for user
const postEvent = async (req, res) => {
    try {
        const { userId, title, description, start, end } = req.body;

        console.log(userId, title, description, start, end);
        
        // Validate request
        if (!userId || !title || !start || !end) {
            return res.status(400).json({ message: 'Field information missing.'});
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }
        
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // Create new event
        const newEvent = new Event({ title, description, start, end });
        await newEvent.save();
        
        // Add events to user
        user.events.push(newEvent._id);
        await user.save();
        
        // Return success status with json
        res.status(201).json(newEvent);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

// Edit a route saved to a user
const editEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { title, description, start, end } = req.body;
        // Validate request
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid Event ID format' });
        }
        // Update event in database
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { title, description, start, end },
            { new: true, runValidators: true }
        );
        
        // Check if event exists and update worked
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Return success with updated event in json
        res.status(200).json(updatedEvent);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete an event for a user
const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.query;
        
        // Validate request
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid Event ID format' });
        }
        // Delete event in database
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        
        // Check if event exists and deletion was successful
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        // Delete event in users event list
        if (userId) {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: 'Invalid User ID format' });
            }

            const user = await User.findById(userId);

            if (user) {
                user.events = user.events.filter(event => event.toString() !== eventId);
                await user.save();
            }
        }

        res.status(204).send();

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getEvents,
    postEvent,
    editEvent,
    deleteEvent
};

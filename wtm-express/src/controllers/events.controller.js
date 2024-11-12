const Event = require("../models/event.js");
const User = require("../models/user.js");  // Assuming you have a User model
const mongoose = require('mongoose');


const getEvents = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }

        const user = await User.findById(userId).populate('events'); // Populate events

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.events);

    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).send('Server error');
    }
}

const postEvent = async (req, res) => {
    try {
        const { userId, title, description, start, end } = req.body;

        console.log(userId, title, description, start, end);

        if (!userId || !title || !start || !end) {
            return res.status(400).json({ message: 'Field information missing.'});
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const newEvent = new Event({ title, description, start, end });

        await newEvent.save();

        user.events.push(newEvent._id);
        await user.save();

        res.status(201).json(newEvent);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

const editEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { title, description, start, end } = req.body;

        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid Event ID format' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { title, description, start, end },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.query;

        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid Event ID format' });
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

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
}

module.exports = {
    getEvents,
    postEvent,
    editEvent,
    deleteEvent
};
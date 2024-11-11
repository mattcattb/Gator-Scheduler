const Event = require("../models/event.js");
const User = require("../models/user.js");  // Assuming you have a User model

const getEvents = async (req, res) => {
    try {
        const { userId } = req.query;  // Use req.query for query parameters
        
        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }        
        
        const user = await User.findById(userId).populate('events'); // get the list of actual events, not just eventIDs
         
        if (!user) return res.status(404).json({ message: 'User not found' });
 
        res.status(200).json(user.events);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

const postEvent = async (req, res) => {
    try {
        const { userId, title, description, start, end } = req.body;
        
        if(!userId || !title || !description || !start || !end){
            return res.status(400).json({message:'Field information missing.'});
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "User not found."});
        }

        const newEvent = new Event({title, description, start, end});
        await newEvent.save();

        user.events.push(newEvent._id); // find the user and then push this _id of the event to it
        await user.save();
        
        res.status(201).json(newEvent); // return this new event

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
        
    }
}

const editEvent = async(req, res) => {
    try {
        const { eventId } = req.params;  // Access eventId from URL parameter       
        const {title, description, start, end} = req.body;
        
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            {title, description, start, end},
            {new: true}
        )
        
        if (!updatedEvent){
            return res.status(404).json({message: 'Event not found'});
        }

        res.status(200).json(updatedEvent);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const deleteEvent = async(req, res) => {
    try {
        const { eventId } = req.params;  // Access eventId from URL parameter
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent){
            return res.status(404).json({message:'Event not found'});
        }        

        const {userId} = req.query;

        if(userId){
            const user = await User.findById(userId);
            if (user){
                user.events = user.events.filter(event => event.toString() !== eventId);
                await user.save();
            }
        }

        res.status(204).send(); // No content, event deleted
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
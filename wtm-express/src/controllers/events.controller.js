import Event from "../models/event.js";
import User from "../models/user.js";  // Assuming you have a User model


export const getEvents = async (req, res) => {
    try {
        const { userId } = req.query;  // Use req.query for query parameters
        const user = await User.findById(userId);
         
        if (!user) return res.status(204).json({ message: 'User not found' });
 
        res.json(user.events);
        
 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

export const postEvent = async (req, res) => {
    try {
        const { userId, title, description, start, end } = req.body;
        
        if(!userId || !title || !description || !start || !end){
            return res.status(400).json({message:'Field information missing.'});
        }

        const newEvent = new Event({title, description, start, end});
        await newEvent.save();

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "User not found."});
        }
        user.events.push(newEvent._id); // find the user and then push this _id of the event to it
        await user.save();
        
        res.status(201).json(newEvent); // return this new event

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
        
    }
}

export const editEvent = async(req, res) => {

}

export const deleteEvent = async(req, res) => {

}


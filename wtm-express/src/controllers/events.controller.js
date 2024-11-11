import Event from "../models/event.js";

export const getEvents = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
         
        if (!user) return res.status(204).json({ message: 'User not found' });
 
        res.json(user.events);
 
    } catch (err) {
        res.status(500).send('Server error');
    }
}

postEvent, editEvent, deleteEvent


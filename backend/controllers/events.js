const Event = require('../models/events');

exports.get_events = async (req, res) => {
    try {
        const eventsData = await Event.find({});
        res.json(eventsData);  // Send the fetched data in the response
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.get_events_by_user = async (req, res) => {
    const { user_id } = req.params;
    try {
        const eventsData = await Event.find({ user_id });
        res.json(eventsData);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

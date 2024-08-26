const Joined = require('../models/joinedModel');
const Event = require('..//models/events');
const { sendSMS } = require('./twilioController');



const save_event_ids_joined_by_user = async (req, res) => {
    const { email, eventId, role } = req.body;

    try {
        // Check if the user has already joined this event
        const existingEntry = await Joined.findOne({ email, eventId });

        if (existingEntry) {
            return res.status(400).json({ message: 'You have already joined this event' });
        }

        // Create a new entry if the user hasn't joined the event yet
        const joinedEntry = new Joined({
            email,
            eventId,
            role,  // Save role along with email and eventId
        });
        const eventDetails = await Event.findById(eventId)
        date=eventDetails.date
        title=eventDetails.title
        location=eventDetails.location
        sendSMS({date,title,location,role})
        await Joined.create(joinedEntry);
        res.status(201).json({ message: 'Event successfully joined', joinedEntry });
    } catch (err) {
        res.status(500).json({ error: 'Failed to join event', details: err.message });
    }
};

const get_event_ids_by_user_email = async (req, res) => {
    const { email } = req.params;

    try {
        const events = await Joined.find({ email }).populate('eventId', '_id name date role');

        res.status(200).json(events.map(event => ({
            eventId: event.eventId._id,
            eventName: event.eventId.name,
            eventDate: event.eventId.date,
            role: event.role,  // Include the role in the response
        })));
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve events for user', details: err.message });
    }
};

module.exports = {
    save_event_ids_joined_by_user,
    get_event_ids_by_user_email,
};
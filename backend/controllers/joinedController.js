const Joined = require('../models/joinedModel');

/**
 * Save event IDs joined by a user.
 * @param {Object} req - Express request object containing email, eventId, and role.
 * @param {Object} res - Express response object.
 */
const save_event_ids_joined_by_user = async (req, res) => {
    const { email, eventId, role } = req.body;

    try {
        const joinedEntry = new Joined({
            email,
            eventId,
            role,  // Save role along with email and eventId
        });

        await Joined.create(joinedEntry);
        res.status(201).json({ message: 'Event successfully joined by user', joinedEntry });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save joined event', details: err.message });
    }
};

/**
 * Get all event IDs joined by a user using their email.
 * @param {Object} req - Express request object containing email.
 * @param {Object} res - Express response object.
 */
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

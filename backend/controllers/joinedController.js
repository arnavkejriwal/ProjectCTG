const Joined = require('../models/joinedModel');

/**
 * Save event IDs joined by a user.
 * @param {Object} req - Express request object containing userId and eventId.
 * @param {Object} res - Express response object.
 */
const save_event_ids_joined_by_user = async (req, res) => {
    const { userId, eventId } = req.body;

    try {
        const joinedEntry = new Joined({
            userId,
            eventId,
        });

        await joinedEntry.save();
        res.status(201).json({ message: 'Event successfully joined by user', joinedEntry });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save joined event', details: err.message });
    }
};

/**
 * Get all event IDs joined by a user.
 * @param {Object} req - Express request object containing userId.
 * @param {Object} res - Express response object.
 */
const get_event_ids_by_user_id = async (req, res) => {
    const { userId } = req.params;

    try {
        const events = await Joined.find({ userId }).populate('eventId', '_id name date');

        res.status(200).json(events.map(event => event.eventId));
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve events for user', details: err.message });
    }
};

module.exports = {
    save_event_ids_joined_by_user,
    get_event_ids_by_user_id,
};

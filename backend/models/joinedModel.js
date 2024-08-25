const mongoose = require('mongoose');

const joinedSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    joinedAt: { type: Date, default: Date.now }
});

const Joined = mongoose.model('Joined', joinedSchema);

module.exports = Joined;

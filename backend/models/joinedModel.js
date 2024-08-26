const mongoose = require('mongoose');

const joinedSchema = new mongoose.Schema({
    email: { type: String, required: true }, 
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    joinedAt: { type: Date, default: Date.now },
    role: { type: String, enum: ['Volunteer', 'Participant'], default: 'Participant' },
});

const Joined = mongoose.model('joined', joinedSchema);

module.exports = Joined;

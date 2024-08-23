const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    event_id: Number,
    emoji: String,
    title: String,
    image: String,
    subtitle: String,
    date: String,
    location: String
}, { collection: 'events', versionKey: false });


module.exports = mongoose.model('Event', eventSchema);
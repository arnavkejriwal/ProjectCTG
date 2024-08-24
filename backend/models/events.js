const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    event_id: Number,
    emoji: String,
    title: String,
    image: String,
    subtitle: String,
    date: String,
    time:String,
    location: String,
    description: String,
    points: Number,
    organiser:String,
    organiser_img:String,
    banner_img:String,
    volunteer_vacancies: Number,
    participant_vacancies:Number
}, { collection: 'events', versionKey: false });


module.exports = mongoose.model('Event', eventSchema);
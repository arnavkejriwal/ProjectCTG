const Event = require('../models/events');

exports.get_events = async (req, res) => {
    try {
        const eventsData = await Event.find({});
        res.json(eventsData);  // Send the fetched data in the response
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// exports.get_events_by_user = async (req, res) => {
//     const { user_id } = req.params;
//     try {
//         const eventsData = await Event.find({ user_id });
//         res.json(eventsData);
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// }

exports.create_event = async (req, res) => {
    const { title, description, event_id, emoji, image, subtitle, date, location, organiser, organiser_img, banner_img, volunteer_vacancies, participant_vacancies } = req.body;
    const newEvent = new Event({
        _id: mongoose.Schema.Types.ObjectId,
        event_id,
        emoji,
        title,
        image,
        subtitle,
        date,
        location,
        description,
        organiser,
        organiser_img,
        banner_img,
        volunteer_vacancies,
        participant_vacancies
    });
    
    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.update_event = async (req, res) => {
    const { id } = req.params;
    const { title, description, event_id, emoji, image, subtitle, date, location, organiser, organiser_img, banner_img, volunteer_vacancies, participant_vacancies } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({error: 'No such event'});
    }
    const updatedEvent = {
        _id: id,
        event_id,
        emoji,
        title,
        image,
        subtitle,
        date,
        location,
        description,
        organiser,
        organiser_img,
        banner_img,
        volunteer_vacancies,
        participant_vacancies
    };
    try {
        await Event.findByIdAndUpdate(id, updatedEvent, {new: true});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
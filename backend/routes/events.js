const express = require('express');

const {
    get_events,
    // get_events_by_user,
    create_event,
    update_event
} = require('../controllers/events');
const { create } = require('../models/events');
// const { get } = require('mongoose');

const router = express.Router();

router.get('/get_events', get_events);

// router.get('/get_events_by_user/:user_id', get_events_by_user);

router.post('/create_event', create_event);

router.patch('/update_event/:id', update_event);

module.exports = router
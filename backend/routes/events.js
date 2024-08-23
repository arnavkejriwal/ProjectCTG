const express = require('express');

const {
    get_events,
    get_events_by_user
} = require('../controllers/events');
// const { get } = require('mongoose');

const router = express.Router();

router.get('/get_events', get_events);

router.get('/get_events_by_user/user_id==:user_id', get_events_by_user);

module.exports = router
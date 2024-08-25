const express = require('express');
const router = express.Router();
const joinedController = require('../controllers/joinedController');

// Route to save event IDs joined by a user
router.post('/join', joinedController.save_event_ids_joined_by_user);

// Route to get all event IDs joined by a user by their email
router.get('/user/:email/events', joinedController.get_event_ids_by_user_email);

module.exports = router;

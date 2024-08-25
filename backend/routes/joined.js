const express = require('express');
const router = express.Router();
const joinedController = require('../controllers/joinedController');

// Route to save event IDs joined by a user
router.post('/join', joinedController.save_event_ids_joined_by_user);

// Route to get all event IDs joined by a user
router.get('/user/:userId/events', joinedController.get_event_ids_by_user_id);

module.exports = router;

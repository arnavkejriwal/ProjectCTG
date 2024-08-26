const express = require('express');

// controller functions

const { loginUser, signupUser, getUserDetails, updateUserDetails } = require('../controllers/userController');

const router = express.Router();

// login route

router.post('/login', loginUser);

// signup route

router.post('/signup', signupUser);

// get user details by email route

router.get('/:email', getUserDetails);

// update user details by email route

router.patch('/:email', updateUserDetails);

module.exports = router;
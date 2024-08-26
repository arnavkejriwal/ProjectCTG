const User = require('../models/userModel');

const jwt = require('jsonwebtoken');

const createToken = (_id) => {

  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });

};

// login a user

const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.login(email, password);

    // create a token

    const token = createToken(user._id);

    res.status(200).json({ email, token });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

// signup a user

const signupUser = async (req, res) => {

  const { email, password, name, number, age, isAdmin } = req.body;

  try {

    const user = await User.signup(email, password, name, number, age, isAdmin);

    // create a token

    const token = createToken(user._id);

    res.status(200).json({ email, token, name, number, age, isAdmin });

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

// get user details by email

const getUserDetails = async (req, res) => {

  const { email } = req.params;

  try {

    const user = await User.findOne({ email }).select('-password');

    if (!user) {

      return res.status(404).json({ error: 'User not found' });

    }

    res.status(200).json(user);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

// update user details by email

const updateUserDetails = async (req, res) => {

  const { email } = req.params;

  try {

    const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true, runValidators: true }).select('-password');

    if (!updatedUser) {

      return res.status(404).json({ error: 'User not found' });

    }

    res.status(200).json(updatedUser);

  } catch (error) {

    res.status(400).json({ error: error.message });

  }

};

module.exports = { signupUser, loginUser, getUserDetails, updateUserDetails };
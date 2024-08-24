const Workout = require('../models/workoutModel')
const Event = require('../models/events')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Event.find({}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Event.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }
  
  res.status(200).json(workout)
}


// create new workout
const createWorkout = async (req, res) => {
  const eventDetails = {
        _id: new mongoose.Types.ObjectId(),
        ...req.body}

  // add doc to db
  try {
    const event = await Event.create(eventDetails)
    res.status(200).json(event)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Event.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Event.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}
const express = require('express')

const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers')
const router = express.Router() //creates an instance of router 


//this is to get all workouts
router.get('/',getWorkouts)


//GET  a single workout
router.get('/:id',getWorkout)

//post a workout
router.post('/', createWorkout)

//delete a workout
router.delete('/:id',deleteWorkout)

//update a workout
router.patch('/:id',updateWorkout)

module.exports = router
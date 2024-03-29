const Workout = require('../models/workoutModel')

const mongoose = require('mongoose')
//get all workouts
const getWorkouts = async(req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}) //this will display all the workouts in decending order

    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async(req,res) => {
    const { id } = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }


    const workout = await Workout.findById(id)

    if(!workout){
        res.status(404).json({error: 'No such workout'})

    }
    res.status(200).json(workout)

}


// create a new workout
const createWorkout = async(req,res) =>{
    const {title,load,reps}=req.body

    //adding doc to db
    try {
        const workout= await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


//delete a workout


const deleteWorkout = async(req,res)=>{
    const { id } = req.params 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        res.status(404).json({error:'no such workout'})
    }

    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})   
    }
    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body //this will update the body ie the reps title and load
    })
    if(!workout){
        res.status(404).json({error:'no such workout'})
    }

    res.status(200).json(workout)
}


module.exports ={
    getWorkouts,
    getWorkout,
    deleteWorkout,
    createWorkout,
    updateWorkout
}
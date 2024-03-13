require('dotenv').config() //importing the module 

const express = require('express') //require the exoress module
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

const app = express() //creates express app;

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.methord)
    next()
})
//reacts to the request and then routes it to the port
app.use('/api/workouts',workoutRoutes)

//connect to database

mongoose.connect(process.env.MONG_URI) //this is async in nature
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connected to db and listening on port',process.env.PORT)
    })
})
.catch((error)=>{
    console.log(error)
})


//listens for requests
//we will not hardcode the portnumber but instead store it in a .env file and then access it 

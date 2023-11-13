const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

const getAllWorkouts = async (req, res) => {
    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
}

const getOneWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such workout found!'
        })
    }
    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({
            error: 'No such workout'
        });
    }
    res.status(200).json(workout);
}

const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyInputs = [];

    if (!title) {
        emptyInputs.push('title');
    };
    if (!load) {
        emptyInputs.push('load');
    };
    if (!reps) {
        emptyInputs.push('reps');
    };

    if (emptyInputs.length > 0) {
        return res.status(400).json({
            error: 'Please fill in all the inputs',
            emptyInputs
        });
    }

    try {
        const user_id = req.user._id;

        const workout = await Workout.create({
            title,
            load,
            reps,
            user_id
        });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const deleteWorkoutById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such workout found!'
        });
    };

    const workout = await Workout.findByIdAndDelete({ _id: id });

    if (!workout) {
        return res.status(404).json({
            error: 'No such workout found!'
        });
    };

    res.status(200).json({
        message: `Successfully deleted data for ${workout}`
    });
}

const updateWorkoutById = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such workout found!'
        });
    };

    const workout = await Workout.findByIdAndUpdate(id, { ...req.body });
    
    if (!workout) {
        return res.status(404).json({
            error: 'No such workout found!'
        });
    };

    res.status(200).json({
        message: `Successfully updated data for ${workout}`
    });
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    deleteWorkoutById,
    updateWorkoutById
}
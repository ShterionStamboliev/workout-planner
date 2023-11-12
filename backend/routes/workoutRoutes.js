const express = require('express');
const router = express.Router();
const {
    createWorkout,
    getAllWorkouts,
    getOneWorkout,
    deleteWorkoutById,
    updateWorkoutById
} = require('../controllers/workoutController');

router.get('/', getAllWorkouts);
router.get('/:id', getOneWorkout);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkoutById);
router.put('/:id', updateWorkoutById);

module.exports = router;
const express = require('express');
const {
    createWorkout,
    getAllWorkouts,
    getOneWorkout,
    deleteWorkoutById,
    updateWorkoutById
} = require('../controllers/workoutController');
const authGuard = require('../middleware/authGuard');

const router = express.Router();
router.use(authGuard);

router.get('/', getAllWorkouts);
router.get('/:id', getOneWorkout);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkoutById);
router.put('/:id', updateWorkoutById);

module.exports = router;
import { useWorkoutContext } from '../../hooks/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './WorkoutStyles.css';

function WorkoutMapper({ workout }) {

    const { dispatch } = useWorkoutContext();

    async function handleDelete() {
        const response = await fetch(`http://localhost:4000/api/workouts/` + workout._id, {
            method: "DELETE"
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: data
            });
        }
    }

    return (
        <>
            <div className="workout-details" key={workout._id}>
                <h3 className="workout-title">
                    {workout.title}
                    <svg onClick={handleDelete} className='delete-icon' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                </h3>
                <p className="workout-rows"><strong>Load (kg): </strong>{workout.load}</p>
                <p className="workout-rows"><strong>Reps: </strong>{workout.reps}</p>
                <p className="workout-rows"><strong>Created at: </strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            </div>
        </>
    )
}

export default WorkoutMapper
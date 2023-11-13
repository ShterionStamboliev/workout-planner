import { useWorkoutContext } from '../../hooks/useWorkoutContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom'
import './WorkoutStyles.css';

function WorkoutMapper({ workout }) {

    const { dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    async function handleDelete() {

        if (!user) {
            return
        };

        const response = await fetch(`http://localhost:4000/api/workouts/` + workout._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
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
                    <Link to={`/update/${workout._id}`}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                    </Link>
                </h3>
                <p className="workout-rows"><strong>Load (kg): </strong>{workout.load}</p>
                <p className="workout-rows"><strong>Reps: </strong>{workout.reps}</p>
                <p className="workout-rows"><strong>Created: </strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                <p className="workout-rows"><strong>Updated: </strong>{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>
            </div>
        </>
    )
}

export default WorkoutMapper
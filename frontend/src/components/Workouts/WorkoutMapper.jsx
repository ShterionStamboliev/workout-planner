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
                    <Link to={`/update/${workout._id}`} className='edit-link'>
                        <svg className='edit-icon' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path></svg>
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
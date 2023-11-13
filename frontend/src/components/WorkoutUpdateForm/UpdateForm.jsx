import { useEffect, useState } from "react";
import './UpdateForm.css'
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { notify } from "../../utils/toastifyError";

function UpdateForm() {

    const { user } = useAuthContext();
    const { dispatch } = useWorkoutContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        title: '',
        load: '',
        reps: ''
    });
    const [error, setError] = useState(null);
    const [emptyInputs, setEmptyInputs] = useState([]);
    const { successfulUpdate } = notify();

    useEffect(() => {
        const workoutFetch = async () => {
            const response = await fetch('http://localhost:4000/api/workouts/' + id, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });

            const data = await response.json();
            
            setInputValue({
                ...inputValue,
                title: data.title,
                load: data.load,
                reps: data.reps
            });
        }

        return () => workoutFetch();
    }, []);

    function formChangeHandler(event) {
        setInputValue({
            ...inputValue,
            [event.target.name]: event.target.value
        });
    }

    async function formSubmitHandler(event) {
        event.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return
        }

        const workout = {
            title: inputValue.title,
            load: inputValue.load,
            reps: inputValue.reps
        };

        const response = await fetch('http://localhost:4000/api/workouts/' + id, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(workout)
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
        }
        if (response.ok) {
            successfulUpdate();
            setInputValue({
                title: '',
                load: '',
                reps: ''
            });
            setError(null);
            setEmptyInputs([]);
            dispatch({
                type: 'UPDATE_WORKOUT',
                payload: data
            });
            navigate('/');
        }
    }

    return (
        <div className="form-group-update">
            <form className="workout-form-update" onSubmit={formSubmitHandler}>
                <h3 className="form-title-update">Update Workout</h3>

                <label>Exercise title: </label>
                <input
                    type="text"
                    name="title"
                    value={inputValue.title}
                    className="form-inputs-update"
                    onChange={formChangeHandler}
                />

                <label>Load (kg): </label>
                <input
                    type="number"
                    name="load"
                    value={inputValue.load}
                    className="form-inputs-update"
                    onChange={formChangeHandler}
                />

                <label>Reps: </label>
                <input
                    type="number"
                    name="reps"
                    value={inputValue.reps}
                    className="form-inputs-update"
                    onChange={formChangeHandler}
                />

                <button className="workout-button-update">Update workout</button>
            </form>
        </div>
    )
}

export default UpdateForm
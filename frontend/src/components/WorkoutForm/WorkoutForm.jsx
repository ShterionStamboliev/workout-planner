import { useState } from "react";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import './WorkoutForm.css';

function WorkoutForm() {
    const { dispatch } = useWorkoutContext();

    const [inputValue, setInputValue] = useState({
        title: '',
        load: '',
        reps: ''
    });

    const [error, setError] = useState(null);
    const [emptyInputs, setEmptyInputs] = useState([]);

    function formChangeHandler(event) {
        setInputValue({
            ...inputValue,
            [event.target.name]: event.target.value
        });
    }

    async function formSubmitHandler(event) {
        event.preventDefault();

        const workout = {
            title: inputValue.title,
            load: inputValue.load,
            reps: inputValue.reps
        };

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(workout)
        });
        const data = await response.json();
        
        if (!response.ok) {
            setError(data.error);
            setEmptyInputs(data.emptyInputs);
        }
        if (response.ok) {
            setInputValue({
                title: '',
                load: '',
                reps: ''
            });
            setError(null);
            setEmptyInputs([]);
            dispatch({
                type: 'ADD_WORKOUT',
                payload: data
            });
        }
    }

    return (
        <div className="form-group">
            <form className="workout-form" onSubmit={formSubmitHandler}>
                <h3 className="form-title">Add a New Workout</h3>

                <label>Exercise title: </label>
                <input
                    type="text"
                    name="title"
                    value={inputValue.title}
                    className="form-inputs"
                    onChange={formChangeHandler}
                />

                <label>Load (kg): </label>
                <input
                    type="number"
                    name="load"
                    value={inputValue.load}
                    className="form-inputs"
                    onChange={formChangeHandler}
                />

                <label>Reps: </label>
                <input
                    type="number"
                    name="reps"
                    value={inputValue.reps}
                    className="form-inputs"
                    onChange={formChangeHandler}
                />

                <button className="workout-button">Add workout</button>

                {error ?
                    <div className="error">
                        {error}
                    </div> : ''
                }
            </form>
        </div>
    )
}

export default WorkoutForm
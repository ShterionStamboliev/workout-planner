import React, { useEffect } from "react";
import WorkoutMapper from '../Workouts/WorkoutMapper';
import './Home.css';
import WorkoutForm from "../WorkoutForm/WorkoutForm";
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useAuthContext } from "../../hooks/useAuthContext"

function Home() {

    const { workouts, dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const dataFetcher = async () => {

            const response = await fetch('http://localhost:4000/api/workouts', {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'LOAD_WORKOUTS',
                    payload: data
                });
            };
        }
        if (user) {
            dataFetcher();
        }

    }, [dispatch, user]);

    return (
        <>
            <div className="homepage">
                <div className="workouts">
                    {workouts && workouts.map((workout) => (
                        <WorkoutMapper
                            workout={workout}
                            key={workout._id}
                        />
                    ))}
                </div>
            </div>
            <WorkoutForm />
        </>
    );
}

export default Home;

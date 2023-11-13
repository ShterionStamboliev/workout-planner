import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export function workoutsReducer(state, action) {
    switch (action.type) {
        case 'LOAD_WORKOUTS':
            return {
                ...state,
                workouts: action.payload
            }
        case 'ADD_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                ...state,
                workouts: state.workouts.filter((workout) => workout._id !== action.payload)
            }
        case 'UPDATE_WORKOUT':
            return {
                ...state,
                workouts: state.workouts.map((workout) => {
                    if (workout._id == action.payload._id) {
                        return {
                            ...workout,
                            ...action.payload
                        } 
                    } else {
                        return workout
                    }
                })
            }
        default:
            return state
    }
}

export function WorkoutContextProvider({ children }) {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: []
    });

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    )
}
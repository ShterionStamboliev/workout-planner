import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export function useWorkoutContext() {
    const context = useContext(WorkoutContext);

    if (!context) {
        throw Error('Context must be used inside a WorkoutContextProvider');
    }

    return context;
}
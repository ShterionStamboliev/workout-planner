import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from './useWorkoutContext';

export function useLogout() {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutContext();

    function logout() {
        localStorage.removeItem('user');

        dispatch({
            type: "LOGOUT"
        });
        workoutDispatch({
            type: "LOAD_WORKOUTS",
            payload: null
        });
    }
    return {
        logout
    };
}
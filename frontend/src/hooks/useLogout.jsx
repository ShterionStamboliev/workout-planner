import { notify } from "../utils/toastifyError";
import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from './useWorkoutContext';

export function useLogout() {
    const { dispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutContext();
    const { successfulLogout } = notify();

    function logout() {
        localStorage.removeItem('user');
        dispatch({
            type: "LOGOUT"
        });
        successfulLogout();
        workoutDispatch({
            type: "LOAD_WORKOUTS",
            payload: null
        });
    }

    return {
        logout
    };
}
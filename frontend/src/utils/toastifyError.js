import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notify() {

    const errorId = 'Error';

    function credentialsError(error) {
        toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
            toastId: errorId,
        });
    }

    function successfulAuth() {
        toast.success('Signed in', {
            position: toast.POSITION.TOP_CENTER,
        });
    }

    function successfulLogout() {
        toast.success('Signed out', {
            position: toast.POSITION.TOP_CENTER,
        });
    }

    function missingWorkoutTitle(error) {
        toast.error(error, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    function successfulWorkoutPost() {
        toast.success('Workout added', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    return {
        credentialsError,
        successfulAuth,
        successfulLogout,
        missingWorkoutTitle,
        successfulWorkoutPost
    }
}
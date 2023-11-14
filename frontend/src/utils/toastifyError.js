import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notify() {

    const errorId = 'Error';
    const successId = 'Success';

    function credentialsError(error) {
        toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
            toastId: errorId,
        });
    }

    function successfulAuth() {
        toast.success('Signed in', {
            position: toast.POSITION.TOP_CENTER,
            toastId: successId
        });
    }

    function successfulLogout() {
        toast.success('Signed out', {
            position: toast.POSITION.TOP_CENTER,
            toastId: successId
        });
    }

    function missingWorkoutTitle(error) {
        toast.error(error, {
            position: toast.POSITION.TOP_CENTER,
            toastId: errorId,
        });
    }

    function successfulWorkoutPost() {
        toast.success('Workout added', {
            position: toast.POSITION.TOP_CENTER,
            toastId: successId
        });
    }

    function successfulUpdate() {
        toast.success('Workout updated', {
            position: toast.POSITION.TOP_CENTER,
            toastId: successId
        });
    }

    function successfulRegister() {
        toast.success('Successful registration', {
            position: toast.POSITION.TOP_CENTER,
            toastId: successId
        });
    }

    return {
        credentialsError,
        successfulAuth,
        successfulLogout,
        missingWorkoutTitle,
        successfulWorkoutPost,
        successfulUpdate,
        successfulRegister
    }
}
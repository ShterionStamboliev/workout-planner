import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import { notify } from "../utils/toastifyError";

export function useLogin() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const { credentialsError, successfulAuth } = notify();

    async function login(email, password) {
        setIsLoading(true);

        const response = await fetch('http://localhost:4000/api/user/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(data.error);
            credentialsError(data.error);
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({
                type: "LOGIN",
                payload: data
            });
            successfulAuth();
            setIsLoading(false);
        }
    }

    return {
        login,
        error,
        isLoading
    }
}
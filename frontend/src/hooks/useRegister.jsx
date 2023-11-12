import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export function useRegister() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    async function register(email, password) {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:4000/api/user/register', {
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
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({
                type: "LOGIN",
                payload: data
            });
            setIsLoading(false);
        }
    }

    return {
        register,
        error,
        isLoading
    }
}
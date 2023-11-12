import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default: state
    }
} 

export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({
                type: "LOGIN",
                payload: user
            });
        }
    }, []);
    
    console.log('Auth state', state);
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

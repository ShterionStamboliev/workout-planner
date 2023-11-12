import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('Context must be used inside a AuthContextProvider');
    }

    return context;
}
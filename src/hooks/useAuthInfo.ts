import { useEffect, useState } from "react";
import authService from "../services/authService";
import { SESSION_VALUES } from "../utils/constants";

export const useAuthInfo = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const loadUser = () => {
        // Try to get user from ID token
        const user = authService.getUserFromIdToken();

        // Check authentication status
        const authStatus = sessionStorage.getItem(SESSION_VALUES.azure_isAuthenticated) === "true";

        setUserName(user);
        setIsAuthenticated(!!user && authStatus);
    };

    useEffect(() => {
        loadUser();

        // Set up event listeners for auth changes
        const handleUserSignedIn = () => loadUser();
        window.addEventListener("userSignedIn", handleUserSignedIn);

        // Check authentication status periodically
        const intervalId = setInterval(() => {
            loadUser();
        }, 5 * 60 * 1000); // Check every 5 minutes

        return () => {
            window.removeEventListener("userSignedIn", handleUserSignedIn);
            clearInterval(intervalId);
        };
    }, []);

    const signOut = () => {
        authService.signOut();
        setUserName(null);
        setIsAuthenticated(false);
    }

    return { userName, isAuthenticated, logout: signOut };
};

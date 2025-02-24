import { useEffect, useState } from "react";
import authService from "../services/authService";

export const useAuthInfo = () => {
    const [userName, setUserName] = useState<string | null>(null);

    const loadUser = () => {
        const user = authService.getUserFromToken();
        setUserName(user);
    };

    useEffect(() => {
        loadUser();

        const handleUserSignedIn = () => loadUser();
        window.addEventListener("userSignedIn", handleUserSignedIn);

        return () => {
            window.removeEventListener("userSignedIn", handleUserSignedIn);
        };
    }, []);

    return { userName, isAuthenticated: !!userName, logout: authService.logout };
};

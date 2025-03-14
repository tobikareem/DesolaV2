import { plainToInstance } from "class-transformer";
import { useCallback, useEffect, useState } from "react";
import { IdToken } from "../models/IdToken";
import authService from "../services/authService";


export const useAuthInfo = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [idClaims, setIdClaims] = useState<IdToken | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const loadUser = useCallback(async () => {
        setIsLoading(true);
        try {
            // Check authentication status
            const account = authService.getCurrentAccount();
            const user = authService.getUserFromIdToken();
            // const authStatus = storage.getItem(SESSION_VALUES.azure_isAuthenticated) === "true";
            const isAuth = !!account && !!user;

            // Update authentication state
            setIsAuthenticated(isAuth);

            // If authenticated, get token claims
            if (isAuth && account?.idTokenClaims) {
                const accountUser = plainToInstance(IdToken, account.idTokenClaims);
                setUserName(accountUser?.firstName ?? accountUser?.fullName ?? user ?? "");
                setIdClaims(accountUser);
            } else {
                setUserName(null);
                setIdClaims(null);
            }

            return isAuth; // Return authentication status for external use
        } catch (error) {
            console.error("Error loading user information:", error);
            setIsAuthenticated(false);
            return false;
        } finally {
            setIsLoading(false);
            setIsInitialized(true);
        }
    }, []);

    const signOut = useCallback(async () => {
        await authService.signOut();
        setUserName(null);
        setIsAuthenticated(false);
        setIdClaims(null);
    }, []);

    // Initial load
    useEffect(() => {
        loadUser();

        // Event listeners
        const handleUserSignedIn = () => loadUser();
        const handleAuthRequired = () => loadUser();

        window.addEventListener("userSignedIn", handleUserSignedIn);
        window.addEventListener("auth:interactive-required", handleAuthRequired);

        // Periodic check
        const intervalId = setInterval(() => {
            loadUser();
        }, 5 * 60 * 1000);

        return () => {
            window.removeEventListener("userSignedIn", handleUserSignedIn);
            window.removeEventListener("auth:interactive-required", handleAuthRequired);
            clearInterval(intervalId);
        };
    }, [loadUser]);

    return {
        userName,
        isAuthenticated,
        accountInfo: idClaims,
        logout: signOut,
        refreshInfo: loadUser,
        isLoading,
        isInitialized
    };
};
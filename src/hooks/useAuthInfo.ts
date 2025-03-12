import { plainToInstance } from "class-transformer";
import { useCallback, useEffect, useState } from "react";
import { IdToken } from "../models/IdToken";
import authService from "../services/authService";
import { SESSION_VALUES } from "../utils/constants";
import { CustomStorage } from "../utils/customStorage";

const storage = new CustomStorage();

export const useAuthInfo = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [idClaims, setIdClaims] = useState<IdToken | null>(null);

    const loadUser = useCallback(() => {
        const account = authService.getCurrentAccount();

        const user = authService.getUserFromIdToken();

        const accountUser = account?.idTokenClaims
            ? plainToInstance(IdToken, account.idTokenClaims)
            : null;

        const authStatus = storage.getItem(SESSION_VALUES.azure_isAuthenticated) === "true";

        setUserName(accountUser?.firstName ?? accountUser?.fullName ?? user ?? "");
        setIsAuthenticated(!!account && !!user && authStatus);
        setIdClaims(accountUser);
    }, []);

    const signOut = useCallback(async () => {
        await authService.signOut();
        setUserName(null);
        setIsAuthenticated(false);
        setIdClaims(null);
    }, []);

    useEffect(() => {
        loadUser();

        const handleUserSignedIn = () => loadUser();
        const handleAuthRequired = () => {
            loadUser(); // This will update authenticated state if token is invalid
        };

        window.addEventListener("userSignedIn", handleUserSignedIn);
        window.addEventListener("auth:interactive-required", handleAuthRequired);

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
        refreshInfo: loadUser
    };
};
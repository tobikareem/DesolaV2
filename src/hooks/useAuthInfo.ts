import { plainToInstance } from "class-transformer";
import { useCallback, useEffect, useState } from "react";
import { IdToken } from "../models/IdToken";
import authService from "../services/authService";
import { CustomerProfile } from "../models/UserProfile/CustomerProfile";
import { customerProfileService } from "../services/customerProfileService";


export const useAuthInfo = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [idClaims, setIdClaims] = useState<IdToken | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);

    const loadUser = useCallback(async () => {
        setIsLoading(true);
        try {
            // Check authentication status
            const account = authService.getCurrentAccount();
            const user = authService.getUserFromIdToken();
            const profile = customerProfileService.getProfile();
            const isAuth = !!account && !!user;

             // Update authentication state
            setIsAuthenticated(isAuth);
            setCustomerProfile(profile);

            // If authenticated, get token claims
            if (isAuth && account?.idTokenClaims) {
                const accountUser = plainToInstance(IdToken, account.idTokenClaims);
                setUserName(accountUser?.firstName ?? accountUser?.fullName ?? user ?? "");
                setIdClaims(accountUser);

                if (!profile && account.idTokenClaims) {
                    authService.extractAndSaveCustomerProfile(account.idTokenClaims);
                    setCustomerProfile(customerProfileService.getProfile());
                }
            } else {
                setUserName(null);
                setIdClaims(null);
            }

            return isAuth;
        } catch (error) {
            console.error("Error loading user information:", error);
            setIsAuthenticated(false);
            setCustomerProfile(null);
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
        setCustomerProfile(null);
    }, []);

    const updateCustomerAddress = useCallback((address: Partial<CustomerProfile['address']>) => {
        authService.updateCustomerAddress(address);
        setCustomerProfile(customerProfileService.getProfile());
    }, []);

    const updateCustomerPreferences = useCallback((preferences: Partial<CustomerProfile['preferences']>) => {
        authService.updateCustomerPreferences(preferences);
        setCustomerProfile(customerProfileService.getProfile());
    }, []);

    const refreshProfile = useCallback(() => {
        const profile = customerProfileService.getProfile();
        setCustomerProfile(profile);
        return profile;
    }, []);

    // Initial load
    useEffect(() => {
        loadUser();

         // Event listeners
        const handleUserSignedIn = () => loadUser();
        const handleAuthRequired = () => loadUser();
        const handleProfileUpdated = (event: CustomEvent) => {
            setCustomerProfile(event.detail);
        };

        window.addEventListener("userSignedIn", handleUserSignedIn);
        window.addEventListener("auth:interactive-required", handleAuthRequired);
        window.addEventListener("customer:profile-updated", handleProfileUpdated as EventListener);

        // Periodic check
        const intervalId = setInterval(() => {
            loadUser();
        }, 5 * 60 * 1000);

        return () => {
            window.removeEventListener("userSignedIn", handleUserSignedIn);
            window.removeEventListener("auth:interactive-required", handleAuthRequired);
            window.removeEventListener("customer:profile-updated", handleProfileUpdated as EventListener);
            clearInterval(intervalId);
        };
    }, [loadUser]);

    return {
        // Authentication state
        userName,
        isAuthenticated,
        accountInfo: idClaims,
        isLoading,
        isInitialized,

        // Customer profile information
        customerProfile,
        customerAddress: customerProfile?.address || null,
        customerPreferences: customerProfile?.preferences || null,
        
        // Utility methods
        hasCompleteAddress: customerProfileService.isAddressComplete(),
        formattedAddress: customerProfileService.getFormattedAddress(),
        
        // Actions
        logout: signOut,
        refreshInfo: loadUser,
        refreshProfile,
        updateCustomerAddress,
        updateCustomerPreferences,

        isProfileComplete: customerProfile ? customerProfileService.validateProfile(customerProfile).isValid : false,
    };
};
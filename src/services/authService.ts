import { AccountInfo, AuthenticationResult, InteractionRequiredAuthError } from "@azure/msal-browser";
import { plainToInstance } from "class-transformer";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { msalInstance } from "../auth/msalConfig";
import { IdToken } from "../models/IdToken";
import { AZURE_B2C, ERROR_MESSAGES, SESSION_VALUES } from "../utils/constants";
import { CustomStorage } from "../utils/customStorage";
import { CustomerProfile } from "../models/UserProfile/CustomerProfile";
import { customerProfileService } from "./customerProfileService";

const REFRESH_TIMEOUT = 15000; // 15 seconds timeout for token refresh

const storage = new CustomStorage();

// Token refresh state management
let isRefreshing = false;
let refreshSubscribers: Array<{
    resolve: (token: string | null) => void;
    timer: NodeJS.Timeout;
}> = [];

/**
 * Authentication service for handling Azure B2C authentication
 */
const authService = {
    setIsSigningIn: null as ((value: boolean) => void) | null,

    initializeSigningState: (setter: (value: boolean) => void) => {
        authService.setIsSigningIn = setter;
    },

    loginRequest: {
        scopes: ["openid", "profile", "email", "offline_access", AZURE_B2C.APPLICATION_SCOPE]
    },

    editProfileRequest: {
        scopes: ["openid", "profile", "email", "offline_access", AZURE_B2C.APPLICATION_SCOPE],
        authority: `${AZURE_B2C.AUTHORITY}/${AZURE_B2C.EDIT_USERPROFILE_POLICY}/v2.0/`
    },

    /**
     * Check if token is expired
     * @param token JWT token to check
     * @returns boolean indicating if token is expired
     */
    isTokenExpired: (token: string): boolean => {
        try {
            const decoded: { exp: number } = jwtDecode(token);
            return Date.now() >= decoded.exp * 1000;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return true;
        }
    },

    /**
     * Get active account information
     * @returns Current active MSAL account or null
     */
    getCurrentAccount: (): AccountInfo | null => {
        const account = msalInstance.getActiveAccount();
        if (account) return account;

        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
            msalInstance.setActiveAccount(accounts[0]);
            storage.setItem(SESSION_VALUES.azure_isAuthenticated, "true");
            return accounts[0];
        }

        return null;
    },

    /**
     * Check if user is logged in
     * @returns boolean indicating if user is logged in
     */
    isUserLoggedIn: (): boolean => {
        return authService.getCurrentAccount() !== null;
    },

    /**
     * Get access token 
     * @returns Promise resolving to access token or null
     */
    getToken: async (): Promise<string | null> => {
        const account = authService.getCurrentAccount();
        if (!account) {
            console.warn("No active account for token acquisition");
            return null;
        }

        // Check if existing valid token
        const currentToken = storage.getItem(SESSION_VALUES.azure_b2c_accessToken);
        if (currentToken && !authService.isTokenExpired(currentToken)) {
            return currentToken;
        }

        // Handle concurrent refresh requests
        if (isRefreshing) {
            console.log("Token refresh already in progress, waiting...");
            return new Promise<string | null>((resolve) => {
                const timer = setTimeout(() => {
                    // Cleanup and resolve with null if timeout occurs
                    refreshSubscribers = refreshSubscribers.filter(sub => sub.resolve !== resolve);
                    resolve(null);
                }, REFRESH_TIMEOUT);

                refreshSubscribers.push({ resolve, timer });
            });
        }

        // Start token refresh process
        try {
            isRefreshing = true;

            const token = await authService.acquireTokenSilently(account);

            // Notify subscribers with new token
            refreshSubscribers.forEach(sub => {
                clearTimeout(sub.timer);
                sub.resolve(token);
            });
            refreshSubscribers = [];

            return token;
        } catch (error) {
            console.error("Token acquisition failed:", error);

            // Notify subscribers about the failure
            refreshSubscribers.forEach(sub => {
                clearTimeout(sub.timer);
                sub.resolve(null);
            });
            refreshSubscribers = [];

            return null;
        } finally {
            isRefreshing = false;
        }
    },

    /**
     * Acquire token silently from MSAL
     * @param account Account information
     * @returns Promise resolving to access token or null
     */
    acquireTokenSilently: async (account: AccountInfo): Promise<string | null> => {
        try {
            const response = await msalInstance.acquireTokenSilent({
                scopes: authService.loginRequest.scopes,
                authority: AZURE_B2C.AUTHORITY,
                account
            });

            const token = response.accessToken;
            storage.setItem(SESSION_VALUES.azure_b2c_accessToken, token);
            return token;
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                console.warn("Silent token acquisition failed. Interactive login required.");
                storage.removeItem(SESSION_VALUES.azure_isAuthenticated);

                window.dispatchEvent(new CustomEvent('auth:interactive-required'));
            }
            console.error("Failed to acquire token silently:", error);
            return null;
        }
    },

    /**
     * Get user info from ID token
     * @returns User name or null if not available
     */
    getUserFromIdToken: (): string | null => {
        // Check for cached user name
        const cachedName = storage.getItem(SESSION_VALUES.azure_user_name);
        if (cachedName) return cachedName;

        const idToken = storage.getItem(SESSION_VALUES.azure_b2c_idToken);
        if (!idToken) {
            storage.removeItem(SESSION_VALUES.azure_isAuthenticated);
            return null;
        }

        try {
            // Decode and transform token
            const rawDecoded = jwtDecode(idToken);
            const decoded = plainToInstance(IdToken, rawDecoded);

            // Validate token expiration
            const currentTime = Date.now() / 1000;
            if (decoded.expirationTime && decoded.expirationTime < currentTime) {
                console.warn("ID token has expired");
                storage.removeItem(SESSION_VALUES.azure_isAuthenticated);
                return null;
            }

            // Extract and cache user name
            const userName = decoded.firstName ?? decoded.fullName ?? "User";
            storage.setItem(SESSION_VALUES.azure_user_name, userName);
            return userName;
        } catch (error) {
            console.error("Failed to decode ID token:", error);
            return null;
        }
    },

    /**
     * Sign in user using MSAL redirect
     * @returns Promise that resolves when sign-in process starts
     */
    signIn: async (): Promise<void> => {
        try {
            if (authService.getCurrentAccount()) {
                toast.isActive("User already signed in");
                return;
            }

            const currentUrl = window.location.pathname + window.location.search;
            storage.setItem(SESSION_VALUES.postLoginRedirectUrl, currentUrl);
            // Start login redirect
            console.log("Redirecting user to sign in...");
            authService.setIsSigningIn?.(true);
            await msalInstance.loginRedirect(authService.loginRequest);
        } catch (error) {
            // Handle password reset redirect
            if (error instanceof InteractionRequiredAuthError &&
                error.errorMessage?.includes("AADB2C90118")) {
                toast.warn("Redirecting to password reset flow...");
                await msalInstance.loginRedirect({
                    authority: AZURE_B2C.PASSWORD_RESET_POLICY,
                    scopes: authService.loginRequest.scopes
                });
                return;
            }

            console.error(ERROR_MESSAGES.loginFailed, error);
            throw error;
        }
    },

    /**
     * Sign up new user using MSAL popup
     * @returns Promise resolving to authentication result or null
     */
    signUp: async (): Promise<AuthenticationResult | null> => {
        try {
            const signUpRequest = {
                ...authService.loginRequest,
                authority: AZURE_B2C.AUTHORITY
            };

            const response = await msalInstance.loginPopup(signUpRequest);
            if (response.account) {
                msalInstance.setActiveAccount(response.account);
                storage.setItem(SESSION_VALUES.azure_b2c_idToken, response.idToken ?? "");
                return response;
            }

            return null;
        } catch (error) {
            console.error("Sign-up error:", error);
            throw error;
        }
    },

    /**
     * Sign out user
     * @returns Promise that resolves when sign-out completes
     */
    signOut: async (): Promise<void> => {
        try {
            const account = authService.getCurrentAccount();
            if (account) {
                // Clear all auth-related storage
                Object.values(SESSION_VALUES).forEach(key => {
                    storage.removeItem(key);
                });

                // Redirect to logout
                await msalInstance.logoutRedirect();
            }
        } catch (error) {
            console.error("Logout error:", error);
            storage.clear();
            window.location.href = "/";
        }
    },

    /**
     * Redirect to profile edit experience
     * @returns Promise that resolves when profile edit starts
     */
    editUserProfile: async (): Promise<void> => {
        try {
            const account = authService.getCurrentAccount();
            if (!account) {
                console.warn("No active account. Redirecting to sign-in.");
                await authService.signIn();
                return;
            }

            await msalInstance.loginRedirect(authService.editProfileRequest);
        } catch (error) {
            console.error("Profile edit failed:", error);
        }
    },

    /**
     * Handle token response from redirect
     * @param response Authentication result from redirect
     * @returns Promise that resolves when handling completes
     */
    handleTokenResponse: async (response: AuthenticationResult | null): Promise<void> => {
        if (!response?.account) return;

        msalInstance.setActiveAccount(response.account);

        // Store tokens
        storage.setItem(SESSION_VALUES.azure_b2c_accessToken, response.accessToken);
        storage.setItem(SESSION_VALUES.azure_b2c_idToken, response.idToken);
        storage.setItem(SESSION_VALUES.azure_isAuthenticated, "true");

        // Transform and store user info
        const idClaim = plainToInstance(IdToken, response.idTokenClaims);
        storage.setItem(SESSION_VALUES.azure_user_name, idClaim.fullName ?? "");
        storage.setItem(SESSION_VALUES.azure_b2c_userId, idClaim.objectId ?? idClaim.subject ?? "");
        storage.setItem(SESSION_VALUES.azure_b2c_last_name, idClaim.lastName ?? "");
        storage.setItem(SESSION_VALUES.azure_b2c_first_name, idClaim.firstName ?? "");

        // Handle redirect
        const redirectUrl = storage.getItem(SESSION_VALUES.postLoginRedirectUrl);
        if (redirectUrl) {
            storage.removeItem(SESSION_VALUES.postLoginRedirectUrl);
            window.location.href = redirectUrl === "/" ? "/dashboard" : redirectUrl;
        }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleTokenError: (error: any): void => {
        if (error.errorMessage?.includes("AADB2C90118")) {
            console.warn("Redirecting user to Forgot Password flow...");
            msalInstance.loginRedirect({
                authority: `${AZURE_B2C.AUTHORITY}/${AZURE_B2C.PASSWORD_RESET_POLICY}`,
                scopes: authService.loginRequest.scopes
            }).then(() => {
                console.log("Redirected user to Forgot Password flow.");
            }).catch((error) => {
                console.error("Redirect to Forgot Password flow failed:", error);
            });
        } else {
            console.error("Login failed:", error);
        }

        if (error instanceof InteractionRequiredAuthError) {
            console.warn("Interactive login required.");
            window.dispatchEvent(new CustomEvent('auth:interactive-required'));
        }
    },

    handlePasswordReset: async (): Promise<void> => {
        try {
            await msalInstance.loginRedirect({
                authority: `${AZURE_B2C.AUTHORITY}/${AZURE_B2C.PASSWORD_RESET_POLICY}`,
                scopes: authService.loginRequest.scopes
            });
        } catch (error) {
            console.error("Failed to redirect to password reset:", error);
            throw error;
        }
    },

    handleRedirectResult: async (): Promise<void> => {
        try {
            const response = await msalInstance.handleRedirectPromise();

            if (response) {
                console.log("Authentication successful, processing token");
                authService.handleTokenResponse(response);
            } else {
                console.log("No authentication response found in the URL");
            }
        } catch (error) {
            console.error("Error handling redirect:", error);
            throw error;
        }
    },

    updateCustomerPreferences: (preferences: Partial<CustomerProfile['preferences']>) => {
        customerProfileService.updatePreferences(preferences);
    },
    updateCustomerAddress: (address: Partial<CustomerProfile['address']>) => {
        customerProfileService.updateAddress(address);
    },
    getCustomerAddress: () => {
        return customerProfileService.getAddress();
    },
    getCustomerProfile: () => {
        return customerProfileService.getProfile();
    },

    /**
     * Extract customer profile from token claims and save to storage
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extractAndSaveCustomerProfile: (tokenClaims: any): void => {
        try {
            const profile = customerProfileService.extractProfileFromToken(tokenClaims);
            if (profile) {
                customerProfileService.saveProfile(profile);
                
                window.dispatchEvent(new CustomEvent('customer:profile-updated', { 
                    detail: profile 
                }));

            
            } else {
                console.warn("Failed to extract customer profile from token claims");
            }
        } catch (error) {
            console.error("Error extracting customer profile:", error);
        }
    },

};

export default authService;
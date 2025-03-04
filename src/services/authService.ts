import { AccountInfo, AuthenticationResult, InteractionRequiredAuthError } from "@azure/msal-browser";
import { jwtDecode } from "jwt-decode";
import { msalInstance } from "../auth/msalConfig";
import { IdToken } from "../models/IdToken";
import { MsalTokenKeys } from "../models/MsalTokenKeys";
import { AZURE_B2C, ERROR_MESSAGES, SESSION_VALUES } from "../utils/constants";

const authService = {
    initialize: async () => {
        try {
            await msalInstance.initialize();
            console.log("MSAL instance initialized successfully.");

            // Handle redirect response
            const response = await msalInstance.handleRedirectPromise();
            if (response?.account) {
                msalInstance.setActiveAccount(response.account);
                console.log("Redirect login successful:", response.account);

                const redirectUrl = sessionStorage.getItem("postLoginRedirect");
                sessionStorage.removeItem("postLoginRedirect"); 
                if (redirectUrl) {
                    window.location.href = redirectUrl; 
                }
            }
        } catch (error) {
            console.error("Failed to initialize MSAL or handle redirect response:", error);
            throw error;
        }
    },

    /** Retrieve access token */
    getAccessToken: async (): Promise<string | null> => {
        let token = sessionStorage.getItem(SESSION_VALUES.azure_b2c_accessToken);

        if (!token || authService.isTokenExpired(token)) {
            console.warn("Access token expired or not found, refreshing...");
            token = await authService.refreshToken();
            if (!token) {
                console.error("Failed to acquire new access token.");
                return null;
            }
            sessionStorage.setItem(SESSION_VALUES.azure_b2c_accessToken, token);
        }

        return token;
    },

    /** Check if token is expired */
    isTokenExpired: (token: string): boolean => {
        try {
            const decoded: { exp: number } = jwtDecode(token);
            return Date.now() >= decoded.exp * 1000;
        } catch (error) {
            console.error("Failed to decode access token:", error);
            return true;
        }
    },

    /** Check if user is logged in */
    isUserLoggedIn: (): boolean => {
        return msalInstance.getActiveAccount() !== null;
    },

    /** Refresh access token */
    refreshToken: async (): Promise<string | null> => {
        const account = msalInstance.getActiveAccount();
        if (!account) {
            console.warn("No active account for token refresh");
            return null;
        }

        try {
            const response = await msalInstance.acquireTokenSilent({
                scopes: authService.loginRequest.scopes,
                authority: AZURE_B2C.AUTHORITY,
                account
            });
            return response.accessToken;
        } catch (error) {
            console.error("Failed to refresh token:", error);
            return null;
        }
    },

    /** Get user details from ID token */
    getUserFromIdToken: (): string | null => {
        let idToken = sessionStorage.getItem(SESSION_VALUES.azure_b2c_idToken);
        if (!idToken) {
            sessionStorage.removeItem(SESSION_VALUES.azure_isAuthenticated);
            return null;
        }

        const msalTokenKeysJson = sessionStorage.getItem(SESSION_VALUES.azure_msal_token_keys);

        try {
            if (msalTokenKeysJson) {
                const msalTokenKeys: MsalTokenKeys = JSON.parse(msalTokenKeysJson);
                idToken = msalTokenKeys.idToken[0];

                const decoded: IdToken = jwtDecode(idToken);

                // Validate token expiration
                const currentTime = Date.now() / 1000;
                if (decoded.exp && decoded.exp < currentTime) {
                    console.warn("ID token has expired");
                    sessionStorage.removeItem(SESSION_VALUES.azure_isAuthenticated);
                    return null;
                }

                const userName = decoded.given_name ?? decoded.name ?? "User";
                sessionStorage.setItem(SESSION_VALUES.azure_userName, userName);
                sessionStorage.setItem(SESSION_VALUES.azure_isAuthenticated, "true");

                const userId = decoded.oid || decoded.sub;
                if (userId !== undefined) {
                    sessionStorage.setItem(SESSION_VALUES.azure_b2c_userId, userId);
                }

                const userEmail = decoded.emails?.[0] || decoded.email;
                if (userEmail !== undefined) {
                    sessionStorage.setItem(SESSION_VALUES.azure_b2c_userEmail, userEmail);
                }

                return userName;
            }
            return null;
        } catch (error) {
            console.error("Failed to decode ID token:", error);
            return null;
        }
    },

    /** Sign in user using MSAL */
    signIn: async (): Promise<void> => {
        try {
            const accounts = msalInstance.getAllAccounts();
            if (accounts.length > 0) {
                console.log("User already signed in:", accounts[0]);
                msalInstance.setActiveAccount(accounts[0]);
                return; // Prevent redundant sign-ins
            }

            const currentUrl = window.location.pathname + window.location.search;
            sessionStorage.setItem(SESSION_VALUES.postLoginRedirectUrl, currentUrl);

            console.log("Redirecting user to sign in...");
            await msalInstance.loginRedirect(authService.loginRequest);
        } catch (error) {
            console.error(ERROR_MESSAGES.loginFailed, error);
            throw error;
        }
    },

    /** Sign up new user using MSAL */
    signUp: async (): Promise<AuthenticationResult | null> => {
        try {
            const signUpRequest = { ...authService.loginRequest, authority: AZURE_B2C.AUTHORITY };
            const response = await msalInstance.loginPopup(signUpRequest);

            if (response.account) {
                msalInstance.setActiveAccount(response.account);
                sessionStorage.setItem(SESSION_VALUES.azure_b2c_idToken, response.idToken ?? "");
                return response;
            }

            return null;
        } catch (error) {
            console.error("Sign-up error:", error);
            throw error;
        }
    },

    /** Sign out user */
    signOut: async (): Promise<void> => {
        try {
            const account = msalInstance.getActiveAccount();
            if (account) {
                Object.values(SESSION_VALUES).forEach(key => {
                    sessionStorage.removeItem(key);
                });
                await msalInstance.logoutRedirect();
            }
            window.location.href = "/";
        } catch (error) {
            console.error("Logout error:", error);
            sessionStorage.clear();
            window.location.href = "/";
        }
    },

    /** Get current MSAL account */
    getCurrentAccount: (): AccountInfo | null => {
        const accounts = msalInstance.getAllAccounts();
        return accounts.length > 0 ? accounts[0] : null;
    },

    /** Acquire token silently or via popup */
    getToken: async (): Promise<string | null> => {
        const account = msalInstance.getActiveAccount();
        if (!account) {
            console.warn("No active account. Redirecting to sign-in.");
            // await authService.signIn();
            return null;
        }

        try {
            const response = await msalInstance.acquireTokenSilent({
                scopes: authService.loginRequest.scopes,
                authority: AZURE_B2C.AUTHORITY,
                account
            });

            return response.accessToken;
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                console.warn("Silent token acquisition failed. Redirecting to sign-in.");
                await authService.signIn();
                return null;
            }

            console.error("Token acquisition failed:", error);
            return null;
        }
    },

    /** MSAL Login Request Scopes */
    loginRequest: {
        scopes: ["openid", "profile", "email", "offline_access", AZURE_B2C.APPLICATION_SCOPE]
    }
};

export default authService;

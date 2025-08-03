import {
    AccountInfo,
    AuthenticationResult,
    EventMessage,
    EventType,
    InteractionRequiredAuthError,
    PopupRequest,
    RedirectRequest
} from "@azure/msal-browser";
import { msalInstance } from "../auth/msalConfig";
import { AZURE_B2C, SESSION_VALUES } from "../utils/constants";
import { CustomStorage } from "../utils/customStorage";
import { AuthEvents, AppEvents } from "../utils/EventManager";
import { toastManager } from "../utils/toastUtils";

const storage = new CustomStorage();

interface TokenRefreshSubscriber {
    resolve: (token: string | null) => void;
    timer: NodeJS.Timeout;
    eventId: string;
}

let isRefreshing = false;
let refreshSubscribers: TokenRefreshSubscriber[] = [];
let eventCallbackId: string | null = null;

export class MSALAuthManager {
    private static instance: MSALAuthManager;
    private readonly REFRESH_TIMEOUT = 15000;
    private isInitialized = false;

    private constructor() { }

    static getInstance(): MSALAuthManager {
        if (!MSALAuthManager.instance) {
            MSALAuthManager.instance = new MSALAuthManager();
        }
        return MSALAuthManager.instance;
    }

    /**
     * Initialize MSAL and set up event listeners
     */
    async initialize(): Promise<void> {
        try {
            if (this.isInitialized) {
                return;
            }

            await msalInstance.initialize();
            this.setupEventListeners();
            this.isInitialized = true;
        
        } catch (error) {
            console.error("MSAL initialization failed:", error);
            throw error;
        }
    }

    /**
     * Handle redirect promise and return result
     */
    async handleRedirectPromise(): Promise<AuthenticationResult | null> {
        try {
            if (!this.isInitialized) {
                throw new Error("MSAL not initialized");
            }

            const response = await msalInstance.handleRedirectPromise();
            
            return response;
        } catch (error) {
            console.error("Error handling redirect promise:", error);
            throw error;
        }
    }

    /**
     * Set up active account for returning users
     */
    setupActiveAccount(): void {
        try {
            if (msalInstance.getActiveAccount()) {
                return;
            }

            const accounts = msalInstance.getAllAccounts();
            if (accounts.length === 0) {
                return;
            }

            const accountToActivate = accounts[0];
            msalInstance.setActiveAccount(accountToActivate);
            storage.setItem(SESSION_VALUES.azure_isAuthenticated, "true");
        } catch (error) {
            console.error("Failed to setup active account:", error);
        }
    }

    /**
     * Get current active account
     */
    getCurrentAccount(): AccountInfo | null {
        try {
            return msalInstance.getActiveAccount();
        } catch (error) {
            console.error("Error getting current account:", error);
            return null;
        }
    }

    /**
     * Get all accounts
     */
    getAllAccounts(): AccountInfo[] {
        try {
            return msalInstance.getAllAccounts();
        } catch (error) {
            console.error("Error getting all accounts:", error);
            return [];
        }
    }

    /**
     * Set active account
     */
    setActiveAccount(account: AccountInfo): void {
        try {
            msalInstance.setActiveAccount(account);
            storage.setItem(SESSION_VALUES.azure_isAuthenticated, "true");
        } catch (error) {
            console.error("Error setting active account:", error);
            throw error;
        }
    }

    /**
     * Check if user has valid account
     */
    isUserLoggedIn(): boolean {
        try {
            const account = this.getCurrentAccount();
            if (account) return true;

            const accounts = this.getAllAccounts();
            if (accounts.length > 0) {
                this.setActiveAccount(accounts[0]);
                return true;
            }

            return false;
        } catch (error) {
            console.error("Error checking if user is logged in:", error);
            return false;
        }
    }

    /**
     * Acquire token silently
     */
    async acquireTokenSilently(account: AccountInfo): Promise<string | null> {
        try {
            const response = await msalInstance.acquireTokenSilent({
                scopes: ["openid", "profile", "email", "offline_access", AZURE_B2C.APPLICATION_SCOPE],
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
                AuthEvents.interactiveRequired("Silent token acquisition failed");
            } else {
                console.error("Failed to acquire token silently:", error);
            }
            return null;
        }
    }

    /**
     * Get access token with automatic refresh and improved concurrent handling
     */
    async getToken(): Promise<string | null> {
        const account = this.getCurrentAccount();
        if (!account) {
            console.warn("No active account for token acquisition");
            return null;
        }

        // Check if existing valid token
        const currentToken = storage.getItem(SESSION_VALUES.azure_b2c_accessToken);
        if (currentToken && !this.isTokenExpired(currentToken)) {
            return currentToken;
        }

        // Handle concurrent refresh requests with unique event IDs
        if (isRefreshing) {
            return new Promise<string | null>((resolve) => {
                const eventId = `token_refresh_${Date.now()}_${Math.random()}`;
                const timer = setTimeout(() => {
                    this.removeRefreshSubscriber(eventId);
                    resolve(null);
                }, this.REFRESH_TIMEOUT);

                refreshSubscribers.push({ resolve, timer, eventId });
            });
        }

        // Start token refresh process
        try {
            isRefreshing = true;
            const token = await this.acquireTokenSilently(account);

            // Notify all subscribers with new token
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
    }

    private removeRefreshSubscriber(eventId: string): void {
        refreshSubscribers = refreshSubscribers.filter(sub => sub.eventId !== eventId);
    }

    /**
     * Sign in with redirect
     */
    async signIn(): Promise<void> {
        try {
            if (this.getCurrentAccount()) {
                toastManager.show("account-info","User already signed in", "info");
                return;
            }

            const currentUrl = window.location.pathname + window.location.search;
            storage.setItem(SESSION_VALUES.postLoginRedirectUrl, currentUrl);

            const loginRequest: RedirectRequest = {
                scopes: ["openid", "profile", "email", "offline_access", AZURE_B2C.APPLICATION_SCOPE],
                authority: `${AZURE_B2C.AUTHORITY}/${AZURE_B2C.SIGNUP_SIGNIN_POLICY}/v2.0/`
            };

            await msalInstance.loginRedirect(loginRequest);
        } catch (error) {
            console.error("Sign-in failed:", error);
            this.handleAuthenticationError(error);
            throw error;
        }
    }

    /**
     * Sign up with popup
     */
    async signUp(): Promise<AuthenticationResult | null> {
        try {
            const signUpRequest: PopupRequest = {
                scopes: ["openid", "profile", "email", "offline_access", AZURE_B2C.APPLICATION_SCOPE],
                authority: AZURE_B2C.AUTHORITY
            };

            const response = await msalInstance.loginPopup(signUpRequest);
            if (response.account) {
                this.setActiveAccount(response.account);
                storage.setItem(SESSION_VALUES.azure_b2c_idToken, response.idToken ?? "");
                return response;
            }

            return null;
        } catch (error) {
            console.error("Sign-up error:", error);
            throw error;
        }
    }

    /**
     * Sign out user
     */
    async signOut(): Promise<void> {
        try {
            const account = this.getCurrentAccount();
            if (account) {
                // Clear all auth-related storage
                Object.values(SESSION_VALUES).forEach(key => {
                    storage.removeItem(key);
                });
                await msalInstance.logoutRedirect();
            }
        } catch (error) {
            console.error("Logout error:", error);
            storage.clear();
            AppEvents.redirectRequired("/", "Logout error - forcing redirect");
        }
    }

    /**
     * Edit user profile
     */
    async editUserProfile(): Promise<void> {
        try {
            const account = this.getCurrentAccount();
            if (!account) {
                console.warn("No active account. Redirecting to sign-in.");
                await this.signIn();
                return;
            }

            const editProfileRequest: RedirectRequest = {
                scopes: ["openid", "profile", "email", "offline_access", AZURE_B2C.APPLICATION_SCOPE],
                authority: `${AZURE_B2C.AUTHORITY}/${AZURE_B2C.EDIT_USERPROFILE_POLICY}/v2.0/`
            };

            await msalInstance.loginRedirect(editProfileRequest);
        } catch (error) {
            console.error("Profile edit failed:", error);
            throw error;
        }
    }

    /**
     * Handle password reset
     */
    async handlePasswordReset(): Promise<void> {
        try {
            const passwordResetRequest: RedirectRequest = {
                authority: `${AZURE_B2C.AUTHORITY}/${AZURE_B2C.PASSWORD_RESET_POLICY}`,
                scopes: ["openid", "profile", "email", "offline_access", AZURE_B2C.APPLICATION_SCOPE]
            };

            await msalInstance.loginRedirect(passwordResetRequest);
        } catch (error) {
            console.error("Failed to redirect to password reset:", error);
            throw error;
        }
    }

    /**
     * Check if token is expired
     */
    private isTokenExpired(token: string): boolean {
        try {
            const decoded: { exp: number } = JSON.parse(atob(token.split('.')[1]));
            const isExpired = Date.now() >= decoded.exp * 1000;
            
            if (isExpired) {
                AuthEvents.tokenExpired('access', decoded.exp * 1000);
            }
            
            return isExpired;
        } catch (error) {
            console.error("Failed to decode token:", error);
            return true;
        }
    }

    /**
     * Set up event listeners for authentication events
     */
    private setupEventListeners(): void {
        try {
            if (eventCallbackId) {
                msalInstance.removeEventCallback(eventCallbackId);
            }

            eventCallbackId = msalInstance.addEventCallback((event: EventMessage) => {
                this.handleMsalEvent(event);
            });

        } catch (error) {
            console.error("Failed to setup event listeners:", error);
        }
    }

    /**
     * Handle MSAL events with improved error handling and event forwarding
     */
    private handleMsalEvent(event: EventMessage): void {
        try {
            switch (event.eventType) {
                case EventType.LOGIN_SUCCESS:
                    if (this.isAuthenticationResult(event.payload)) {
                        if (event.payload.account) {
                            this.setActiveAccount(event.payload.account);
                            AuthEvents.loginSuccess(
                                event.payload.account,
                                event.payload.accessToken,
                                event.payload.idToken,
                                event.payload.idTokenClaims
                            );
                        }
                    }
                    break;

                case EventType.LOGOUT_SUCCESS:
                    this.handleLogoutSuccess();
                    break;

                case EventType.LOGIN_FAILURE:
                case EventType.ACQUIRE_TOKEN_FAILURE:
                    AuthEvents.loginFailure(event.error?.message || 'Authentication failed');
                    this.handleAuthenticationError(event.error);
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error("Error handling MSAL event:", error);
            AppEvents.error("MSAL event handling error", error instanceof Error ? error.message : String(error));
        }
    }

    /**
     * Type guard to check if payload is AuthenticationResult
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private isAuthenticationResult(payload: any): payload is AuthenticationResult {
        return payload &&
            typeof payload === 'object' &&
            'account' in payload &&
            'accessToken' in payload;
    }

    /**
     * Handle logout success
     */
    private handleLogoutSuccess(): void {
        try {
            Object.values(SESSION_VALUES).forEach(key => {
                storage.removeItem(key);
            });
            
            AuthEvents.logoutSuccess('user-initiated');
        } catch (error) {
            console.error("Error handling logout success:", error);
        }
    }

    /**
     * Handle authentication errors with improved B2C flow detection
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private handleAuthenticationError(error: any): void {
        try {
            console.error("Authentication error:", error);

            const errorMessage = error?.errorMessage || error?.message || 'Unknown authentication error';

            // Handle B2C password reset flow
            if (errorMessage.includes("AADB2C90118")) {
                console.warn("Password reset flow detected");
                toastManager.show("auth-err","Redirecting to password reset...","error");
                this.handlePasswordReset().catch(err => {
                    console.error("Password reset redirect failed:", err);
                    AppEvents.error("Password reset failed", err.message);
                });
                return;
            }

            // Handle interaction required
            if (error instanceof InteractionRequiredAuthError) {
                console.warn("Interactive login required");
                storage.removeItem(SESSION_VALUES.azure_isAuthenticated);
                AuthEvents.interactiveRequired("Interactive login required");
                return;
            }

            // Handle B2C policy mismatch
            if (errorMessage.includes("AADB2C90091")) {
                console.warn("B2C policy mismatch detected");
                toastManager.show("B2C","Please complete the authentication process","warn");
                return;
            }

            // Handle user cancellation
            if (errorMessage.includes("user_cancelled") || errorMessage.includes("access_denied")) {
                toastManager.show("cancel-auth","Authentication was cancelled", "info");
                return;
            }

            // Generic error handling
            console.error("Unhandled authentication error:", errorMessage);
            AppEvents.error("Authentication error", errorMessage);
            toastManager.show("unhandled-error",`Authentication error: ${errorMessage}`, "error");

        } catch (handlingError) {
            console.error("Error in authentication error handler:", handlingError);
            AppEvents.error("Authentication system error", "Error in error handler");
            toastManager.show("system-error","Authentication system error", "error");
        }
    }

    /**
     * Clean up resources
     */
    cleanup(): void {
        try {
            // Remove event callback
            if (eventCallbackId) {
                msalInstance.removeEventCallback(eventCallbackId);
                eventCallbackId = null;
            }

            // Clear refresh subscribers
            refreshSubscribers.forEach(sub => {
                clearTimeout(sub.timer);
                sub.resolve(null);
            });
            refreshSubscribers = [];
            isRefreshing = false;

            this.isInitialized = false;

        } catch (error) {
            console.error("Error during MSAL cleanup:", error);
        }
    }
}
import { AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { plainToInstance } from "class-transformer";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { IdToken } from "../models/IdToken";
import { CustomerProfile } from "../models/UserProfile/CustomerProfile";
import { SESSION_VALUES } from "../utils/constants";
import { CustomStorage } from "../utils/customStorage";
import { AuthEvents, EventManager } from "../utils/EventManager";
import { customerProfileService } from "./customerProfileService";
import { MSALAuthManager } from "./msalAuthManager";

const storage = new CustomStorage();
const msalManager = MSALAuthManager.getInstance();

interface AuthInitializationResult {
    account: AccountInfo | null;
    success: boolean;
    hasRedirectResponse: boolean;
    error?: string;
}

const authService = {
    setIsSigningIn: null as ((value: boolean) => void) | null,
    isInitialized: false,

    initializeSigningState: (setter: (value: boolean) => void) => {
        authService.setIsSigningIn = setter;
    },

    /**
     * Initialize the authentication system
     */
    async initialize(): Promise<AuthInitializationResult> {
        try {

            if (authService.isInitialized) {
                return {
                    success: true,
                    hasRedirectResponse: false,
                    account: msalManager.getCurrentAccount()
                };
            }

            await msalManager.initialize();

            const response = await msalManager.handleRedirectPromise();
            let hasRedirectResponse = false;

            if (response) {
                hasRedirectResponse = true;
                await authService.handleAuthenticationResponse(response);
            }

            // Set up active account for returning users
            msalManager.setupActiveAccount();

            // Setup event listeners
            authService.setupEventListeners();

            authService.isInitialized = true;

            const account = msalManager.getCurrentAccount();

            // Emit initialization complete event
            AuthEvents.initializationComplete({
                hasRedirectResponse,
                hasActiveAccount: !!account,
                timestamp: Date.now()
            });

            return {
                success: true,
                hasRedirectResponse,
                account
            };

        } catch (error) {
            console.error("Auth service initialization failed:", error);

            const errorMessage = error instanceof Error ? error.message : 'Unknown initialization error';

            AuthEvents.initializationFailed(errorMessage);

            return {
                success: false,
                hasRedirectResponse: false,
                account: null,
                error: errorMessage
            };
        }
    },

    setupEventListeners(): void {
        if (authService.eventListenersSetup) return;

        EventManager.listen('msal:login-failure', authService.handleLoginFailure);
        EventManager.listen('msal:logout-success', authService.handleLogoutSuccess);

        authService.eventListenersSetup = true;
    },

    eventListenersSetup: false,

    /**
     * Check if user is logged in
     * @returns boolean indicating if user is logged in
     */
    isUserLoggedIn(): boolean {
        return msalManager.isUserLoggedIn();
    },

    /**
     * Get current user account
     */
    getCurrentAccount() {
        return msalManager.getCurrentAccount();
    },

    /**
     * Get access token
     */
    async getToken(): Promise<string | null> {
        return msalManager.getToken();
    },

    /**
     * Get user info from ID token
     */
    getUserFromIdToken(): string | null {
        const cachedName = storage.getItem(SESSION_VALUES.azure_user_name);
        if (cachedName) return cachedName;

        const idToken = storage.getItem(SESSION_VALUES.azure_b2c_idToken);
        if (!idToken) {
            storage.removeItem(SESSION_VALUES.azure_isAuthenticated);
            return null;
        }

        try {
            const rawDecoded = jwtDecode(idToken);
            const decoded = plainToInstance(IdToken, rawDecoded);

            const currentTime = Date.now() / 1000;
            if (decoded.expirationTime && decoded.expirationTime < currentTime) {
                console.warn("ID token has expired");
                storage.removeItem(SESSION_VALUES.azure_isAuthenticated);
                return null;
            }

            const userName = decoded.firstName ?? decoded.fullName ?? "User";
            storage.setItem(SESSION_VALUES.azure_user_name, userName);
            return userName;
        } catch (error) {
            console.error("Failed to decode ID token:", error);
            return null;
        }
    },

    /**
     * Sign in user
     */
    async signIn(): Promise<void> {
        if (authService.isUserLoggedIn()) {
            toast.info("User already signed in");
            return;
        }

        authService.setIsSigningIn?.(true);
        try {
            await msalManager.signIn();
        } catch (error) {
            authService.setIsSigningIn?.(false);
            throw error;
        }
    },

    /**
     * Sign up user
     */
    async signUp(): Promise<AuthenticationResult | null> {
        return msalManager.signUp();
    },

    /**
     * Sign out user
     */
    async signOut(): Promise<void> {
        try {
            await msalManager.signOut();
            AuthEvents.logoutSuccess('user-initiated');
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    },

    /**
     * Edit user profile
     */
    async editUserProfile(): Promise<void> {
        return msalManager.editUserProfile();
    },

    /**
     * Handle successful authentication response
     * @param response - The authentication response
     * @returns A promise that resolves when the handling is complete
     * 
     */
    async handleAuthenticationResponse(response: AuthenticationResult): Promise<void> {
        try {
            if (!response?.account) {
                throw new Error("No account in authentication response");
            }

            // Set active account
            msalManager.setActiveAccount(response.account);

            // Process the authentication
            await authService.processSuccessfulAuthentication(response);

            // Emit success event - this will be caught by the Callback component
            AuthEvents.loginSuccess(
                response.account,
                response.accessToken,
                response.idToken,
                response.idTokenClaims
            );
        } catch (error) {
            console.error("Error handling authentication response:", error);
            AuthEvents.loginFailure(error instanceof Error ? error.message : 'Authentication processing failed');
            throw error;
        }
    },

    handleLoginFailure: async (event: CustomEvent) => {
        try {
            const { error } = event.detail;
            console.error("Login failure event received:", error);

            authService.setIsSigningIn?.(false);

            toast.error("Authentication failed. Please try again.");

        } catch (handlingError) {
            console.error("Error handling login failure:", handlingError);
        }
    },

    /**
   * Handle logout success event
   */
    handleLogoutSuccess: async (event: CustomEvent) => {
        try {
            const { reason } = event.detail;
            console.log("Logout success event received:", reason);
            // Clear any additional app-specific data
            authService.clearAppData();

        } catch (error) {
            console.error("Error handling logout success:", error);
        }
    },

    /**
     * Process successful authentication
     */
    async processSuccessfulAuthentication(result: AuthenticationResult): Promise<void> {
        try {
            // Validate authentication result
            if (!authService.validateAuthenticationResult(result)) {
                throw new Error("Invalid authentication result");
            }

            // Store tokens
            authService.storeTokens(result);

            // Extract and store user profile
            authService.extractAndStoreUserProfile(result);

            // Mark as authenticated
            storage.setItem(SESSION_VALUES.azure_isAuthenticated, "true");

        } catch (error) {
            console.error("Error processing authentication:", error);
            throw error;
        }
    },

    /**
     * Validate authentication result
     */
    validateAuthenticationResult(result: AuthenticationResult): boolean {
        return !!(
            result &&
            result.account &&
            result.accessToken &&
            result.idToken &&
            result.idTokenClaims
        );
    },

    /**
     * Store authentication tokens
     */
    storeTokens(result: AuthenticationResult): void {
        if (result.accessToken) {
            storage.setItem(SESSION_VALUES.azure_b2c_accessToken, result.accessToken);
        }

        if (result.idToken) {
            storage.setItem(SESSION_VALUES.azure_b2c_idToken, result.idToken);
        }
    },

    /**
     * Extract and store user profile
     */
    extractAndStoreUserProfile(result: AuthenticationResult): void {
        try {
            if (!result.idTokenClaims) {
                console.warn("No ID token claims available");
                return;
            }

            const idClaim = plainToInstance(IdToken, result.idTokenClaims);

            // Store user information with fallbacks
            storage.setItem(SESSION_VALUES.azure_user_name, idClaim.fullName ?? idClaim.firstName ?? "User");
            storage.setItem(SESSION_VALUES.azure_b2c_userId, idClaim.objectId ?? idClaim.subject ?? "");
            storage.setItem(SESSION_VALUES.azure_b2c_last_name, idClaim.lastName ?? "");
            storage.setItem(SESSION_VALUES.azure_b2c_first_name, idClaim.firstName ?? "");

            // Extract customer profile
            authService.extractAndSaveCustomerProfile(result.idTokenClaims);

        } catch (error) {
            console.error("Error extracting user profile:", error);
        }
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extractAndSaveCustomerProfile(tokenClaims: any): void {
        try {
            const profile = customerProfileService.extractProfileFromToken(tokenClaims);
            if (profile) {
                customerProfileService.saveProfile(profile);
                // This will be caught by components that need to update
                AuthEvents.profileUpdated(profile);
            }
        } catch (error) {
            console.error("Error extracting customer profile:", error);
        }
    },

    /**
   * Clear application-specific data
   */
    clearAppData(): void {
        try {
            customerProfileService.clearProfile();
            storage.removeItem(SESSION_VALUES.postLoginRedirectUrl);
            authService.setIsSigningIn?.(false);

        } catch (error) {
            console.error("Error clearing app data:", error);
        }
    },

    /**
     * Handle post-login redirect
     */
    handlePostLoginRedirect(): void {
        try {
            const redirectUrl = storage.getItem(SESSION_VALUES.postLoginRedirectUrl);

            if (redirectUrl && authService.isValidRedirectUrl(redirectUrl)) {
                storage.removeItem(SESSION_VALUES.postLoginRedirectUrl);
                const targetUrl = redirectUrl === "/" ? "/dashboard" : redirectUrl;

                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 100);
            }
        } catch (error) {
            console.error("Error handling post-login redirect:", error);
        }
    },

    /**
     * Validate redirect URL
     */
    isValidRedirectUrl(url: string): boolean {
        try {
            if (url.startsWith("/") && !url.startsWith("//")) {
                return true;
            }

            const currentOrigin = window.location.origin;
            const targetUrl = new URL(url, currentOrigin);
            return targetUrl.origin === currentOrigin;
        } catch {
            return false;
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

    cleanup(): void {
        try {
            EventManager.unlisten('msal:login-failure', authService.handleLoginFailure);
            EventManager.unlisten('msal:logout-success', authService.handleLogoutSuccess);

            msalManager.cleanup();
            authService.eventListenersSetup = false;
            authService.isInitialized = false;

        } catch (error) {
            console.error("Error during auth service cleanup:", error);
        }
    }
};

window.addEventListener('beforeunload', () => {
    authService.cleanup();
});
export default authService;
import { VITE_API_BASE_URL, AZURE_B2C, SESSION_VALUES } from "../utils/constants";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import apiClient from "./apiClient";

const authService = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exchangeCodeForToken: async (code: string): Promise<any> => {
        try {
            const response = await apiClient.post(`${VITE_API_BASE_URL}/${ENDPOINTS_API_PATH.authToken}`, { code });

            const { access_token, refresh_token, expiresIn: expires_in, refresh_token_expires_in } = response.data;

            sessionStorage.setItem(SESSION_VALUES.azure_b2c_accessToken, access_token);
            sessionStorage.setItem(SESSION_VALUES.azure_b2c_refreshToken, refresh_token);
            sessionStorage.setItem(SESSION_VALUES.azure_b2c_expiresAt, (Date.now() + expires_in * 1000).toString());
            sessionStorage.setItem(SESSION_VALUES.azure_b2c_refreshTokenExpiresAt, (Date.now() + refresh_token_expires_in * 1000).toString());

        } catch (error) {
            console.error("Error exchanging code for token:", error);
            throw error;
        } finally {
            sessionStorage.removeItem(SESSION_VALUES.azure_b2c_authorizationCode)
        }
    },

    getAccessToken: (): string | null => {
        const token = sessionStorage.getItem(SESSION_VALUES.azure_b2c_accessToken);
        if (!token) return null;

        if (authService.isTokenExpired()) {
            console.warn("Access token expired.");
            return null;
        }

        return token;
    },

    isTokenExpired: (): boolean => {
        const expiresAtStr = sessionStorage.getItem(SESSION_VALUES.azure_b2c_expiresAt);
        if (!expiresAtStr) return true;
        const expiresAt = parseInt(expiresAtStr, 10);
        return Date.now() >= expiresAt;
    },

    isRefreshTokenExpired: (): boolean => {
        const expiresAtStr = sessionStorage.getItem(SESSION_VALUES.azure_b2c_refreshTokenExpiresAt);
        if (!expiresAtStr) return true;
        const expiresAt = parseInt(expiresAtStr, 10);
        return Date.now() >= expiresAt;    
    },

    isUserLoggedIn: (): boolean => {
        const token = sessionStorage.getItem(SESSION_VALUES.azure_b2c_accessToken);
        if (!token) return false;
        return !authService.isTokenExpired();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refreshToken: async (): Promise<any> => {
        try {
            const refreshToken = sessionStorage.getItem(SESSION_VALUES.azure_b2c_refreshToken);
            if (!refreshToken || authService.isRefreshTokenExpired()) {
                window.location.href = AZURE_B2C.SIGN_IN_OUT;
            }
            const response = await apiClient.post(`${VITE_API_BASE_URL}/${ENDPOINTS_API_PATH.authRefresh}`, { refreshToken });
            const { access_token, refresh_token, expiresIn } = response.data;

            sessionStorage.setItem(SESSION_VALUES.azure_b2c_accessToken, access_token);
            sessionStorage.setItem(SESSION_VALUES.azure_b2c_refreshToken, refresh_token);
            sessionStorage.setItem(SESSION_VALUES.azure_b2c_expiresAt, (Date.now() + expiresIn * 1000).toString());

            return response.data;
        } catch (error) {
            console.error("Error refreshing token:", error);
            authService.logout();
            throw error;
        }
    },

    signIn: () => {
        window.location.href = AZURE_B2C.SIGN_IN_OUT;
    },

    logout: () => {
        sessionStorage.clear();
        window.location.href = AZURE_B2C.SIGN_IN_OUT;
    }
};

export default authService;
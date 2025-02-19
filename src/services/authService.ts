import { API_BASE_URL, SIGN_IN_OUT } from "../utils/constants";
import apiClient from "./apiClient";

const authService = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exchangeCodeForToken: async (code: string): Promise<any> => {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/auth/token`, { code });

            const { accessToken, refreshToken, expiresIn } = response.data;

            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", refreshToken);
            sessionStorage.setItem("expiresAt", (Date.now() + expiresIn * 1000).toString());

        } catch (error) {
            console.error("Error exchanging code for token:", error);
            throw error;
        }
    },

    getAccessToken: (): string | null => {
        const token = sessionStorage.getItem("accessToken");
        if (!token) return null;

        if (authService.isTokenExpired()) {
            console.warn("Access token expired.");
            return null;
        }

        return token;
    },

    isTokenExpired: (): boolean => {
        const expiresAtStr = sessionStorage.getItem("expiresAt");
        if (!expiresAtStr) return true;
        const expiresAt = parseInt(expiresAtStr, 10);
        return Date.now() >= expiresAt;
    },

    isUserLoggedIn: (): boolean => {
        const token = sessionStorage.getItem("accessToken");
        if (!token) return false;
        return !authService.isTokenExpired();
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refreshToken: async (): Promise<any> => {
        try {
            const refreshToken = sessionStorage.getItem("refreshToken");
            if (!refreshToken) {
                window.location.href = SIGN_IN_OUT;
            }
            const response = await apiClient.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
            const { accessToken, newRefreshToken, expiresIn } = response.data;

            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("refreshToken", newRefreshToken);
            sessionStorage.setItem("expiresAt", (Date.now() + expiresIn * 1000).toString());

            return response.data;
        } catch (error) {
            console.error("Error refreshing token:", error);
            authService.logout();
            throw error;
        }
    },

    logout: () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("expiresAt");
    }
};

export default authService;
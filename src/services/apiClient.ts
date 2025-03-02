import axios from "axios";
import { SESSION_VALUES, VITE_API_BASE_URL, VITE_API_TOKEN } from "../utils/constants";
import authService from "./authService";

const apiClient = axios.create({
    baseURL: VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

apiClient.interceptors.request.use(
    async (config) => {
        config.headers['x-functions-key'] = getFunctionKey();

        let accessToken = sessionStorage.getItem(SESSION_VALUES.azure_b2c_accessToken);

        if (accessToken && !authService.isTokenExpired(accessToken)) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            return config;
        }

        // Token is missing or expired, try to get a new one silently
        try {
            accessToken = await authService.getToken();

            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
                return config;
            }

            const isAuthenticated = sessionStorage.getItem(SESSION_VALUES.azure_isAuthenticated) === 'true';

            if (isAuthenticated) {
                console.warn("Failed to acquire token silently for authenticated user");
                // Don't redirect here, just return the config without token
                // The API call may fail, but the UI can handle that appropriately
            }

            return config;
        } catch (error) {
            console.error("Error acquiring token:", error);
            // Don't automatically redirect on failed requests
            // Let the API call fail and let the UI handle the error
            return config;
        }
    },
    (error) => Promise.reject(error)
);

const getFunctionKey = (): string => {
    const storedKey = sessionStorage.getItem(SESSION_VALUES.api_function_key);
    if (!storedKey) {
        const key = VITE_API_TOKEN || '';
        sessionStorage.setItem(SESSION_VALUES.api_function_key, key);
        return key;
    }
    return storedKey;
};

export default apiClient;
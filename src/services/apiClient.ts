import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { SESSION_VALUES, VITE_API_BASE_URL, VITE_API_TOKEN } from "../utils/constants";
import authService from "./authService";
import { toast } from "react-toastify";

const apiClient = axios.create({
    baseURL: VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {

        config.headers.set('x-functions-key', getFunctionKey());

        const accessToken = await getAuthToken();

        if (accessToken) {
            config.headers.set('Authorization', `Bearer ${accessToken}`);
        } else {
            const isAuthenticated = sessionStorage.getItem(SESSION_VALUES.azure_isAuthenticated) === 'true';

            if (isAuthenticated) {
                console.warn("Failed to acquire token silently for authenticated user");
                // Let the API call proceed without token - it will likely fail with 401
            }
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    toast.warn("Unauthorized request - user may need to re-authenticate");
                    break;
                case 403:
                    toast.warn("Forbidden request - user may need to re-authenticate");
                    break;
                case 404:
                    toast.warn("Resource not found");
                    break;
                case 500:
                    toast.error("Internal server error. Please contact support");
                    break;
                default:
                    toast.error(`Unexpected error occurred (Code: ${status})`);
            }
        }

        return Promise.reject(error);
    }
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

const getAuthToken = async (): Promise<string | null> => {
    const accessToken = sessionStorage.getItem(SESSION_VALUES.azure_b2c_accessToken);

    if (accessToken && !authService.isTokenExpired(accessToken)) {
        return accessToken;
    }

    try {
        const newToken = await authService.getToken();
        return newToken;
    } catch {
        toast.error("Failed to authenticate user");
        return null;
    }
};

export default apiClient;
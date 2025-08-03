import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toastManager } from "../utils/toastUtils"; 
import { SESSION_VALUES, VITE_API_BASE_URL, VITE_API_TOKEN } from "../utils/constants";
import { CustomStorage } from "../utils/customStorage";
import authService from "./authService";

const storage = new CustomStorage();


let isShowingAuthError = false;

const apiClient = axios.create({
    baseURL: VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        config.headers.set('x-functions-key', getFunctionKey());

        const accessToken = await authService.getToken();

        if (accessToken) {
            config.headers.set('Authorization', `Bearer ${accessToken}`);
        } else if (authService.isUserLoggedIn()) {
            // User is logged in but we couldn't get a token
            console.warn("Failed to acquire token for authenticated user");
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        // Handle auth errors (401/403)
        if (error.response?.status === 401 || error.response?.status === 403) {
            if (originalRequest && !originalRequest.headers['X-Retry-Auth']) {
                try {
                    storage.removeItem(SESSION_VALUES.azure_b2c_accessToken);

                    const newToken = await authService.getToken();

                    if (newToken) {
                        originalRequest.headers['X-Retry-Auth'] = 'true';
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                        return apiClient(originalRequest);
                    }
                } catch (refreshErr) {
                    console.error("Failed to refresh token on auth error:", refreshErr);
                }
            }

            if (!isShowingAuthError) {
                isShowingAuthError = true;
                toastManager.show("auth-error","Authentication required. Please log in again.","warn");
                setTimeout(() => { isShowingAuthError = false; }, 3000);

                window.dispatchEvent(new CustomEvent('auth:interactive-required'));
            }
        }

        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 404:
                    // toast.warn("Resource not found");
                    break;
                case 500:
                    toastManager.show("server-error","Internal server error. Please contact support","error");
                    break;
                default:
                    if (status !== 401 && status !== 403) {
                        toastManager.show(`error-${status}`, `Unexpected error occurred (Code: ${status})`, "error");
                    }

            }
        } else if (error.request) {
            // Network error
            toastManager.show("network-error", "Network error. Please check your connection", "error");
        }

        return Promise.reject(error);
    }
);

const getFunctionKey = (): string => {
    const storedKey = storage.getItem(SESSION_VALUES.api_function_key);
    if (!storedKey) {
        const key = VITE_API_TOKEN || '';
        storage.setItem(SESSION_VALUES.api_function_key, key);
        return key;
    }
    return storedKey;
};

export default apiClient;
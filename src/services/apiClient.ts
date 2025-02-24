import axios from "axios";
import { VITE_API_BASE_URL, VITE_API_TOKEN, AZURE_B2C, SESSION_VALUES } from "../utils/constants";
import authService from "./authService";

const apiClient = axios.create({
    baseURL: VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use(
    async (config) => {
        config.headers['x-functions-key'] = getFunctionKey();

        let accessToken = await authService.getAccessToken();

        if (!accessToken) {
            try {
                const newTokenData = await authService.refreshToken();
                accessToken = newTokenData.accessToken;
            } catch (error) {
                console.error("Token refresh failed. Redirecting to login.", error);
                authService.logout();
                window.location.href = AZURE_B2C.SIGN_IN_OUT;
                return Promise.reject(error);
            }
        }

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const getFunctionKey = () => {
    const storedKey = sessionStorage.getItem(SESSION_VALUES.api_function_key);

    if (!storedKey) {
        sessionStorage.setItem(SESSION_VALUES.api_function_key, VITE_API_TOKEN);
        return VITE_API_TOKEN;
    }

    return storedKey;
};

export default apiClient;
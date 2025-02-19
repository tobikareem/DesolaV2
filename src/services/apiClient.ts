import axios from "axios";
import { API_BASE_URL, API_TOKEN, SESSION_VALUES, SIGN_IN_OUT } from "../utils/constants";
import authService from "./authService";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use(
    async (config) => {
        config.headers['x-functions-key'] = getFunctionKey();

        let accessToken = authService.getAccessToken();

        // if (!accessToken) {
        //     // Token might be expired, attempt to refresh it
        //     try {
        //         const newTokenData = await authService.refreshToken();
        //         accessToken = newTokenData.accessToken;
        //     } catch (error) {
        //         console.error("Token refresh failed. Redirecting to login.", error);
        //         window.location.href = SIGN_IN_OUT;
        //     }
        // }

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
        sessionStorage.setItem(SESSION_VALUES.api_function_key, API_TOKEN);
        return API_TOKEN;
    }

    return storedKey;
};

export default apiClient;
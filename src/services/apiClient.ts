import axios from "axios";
import { API_BASE_URL, API_TOKEN, SESSION_VALUES } from "../utils/constants";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use(
    (config) => {
        config.headers['x-functions-key'] = getFunctionKey();
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
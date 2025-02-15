import axios from "axios";
import { API_BASE_URL, API_TOKEN, SESSION_VALUES } from "../utils/constants";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

apiClient.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem(SESSION_VALUES.api_token)

        if(token){
            config.headers.Authorization = `${API_TOKEN}`
        }

        return config;
    },
    error => Promise.reject(error)
)

export default apiClient;
import { PageContent } from "../models/pageContent";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import apiClient from "./apiClient";


export const addPageSection = async (data: PageContent) => {
    try {

        const response = await apiClient.post(`/${ENDPOINTS_API_PATH.page}/addSection`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding page section", error);
        throw error;
    }
};
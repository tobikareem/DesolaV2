import { PageContent } from "../models/pageContent";
import { FaqItemResponse } from "../pages/home/response/FaqItemResponse";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import apiClient from "./apiClient";

export const getPageSection = async (partitionKey: string, rowKey: string) => {
    try {
        const response = await apiClient.get<FaqItemResponse>(`${ENDPOINTS_API_PATH.page}/${partitionKey}/${rowKey}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching page content", error);
        throw error;
    }
};

export const addPageSection = async (data: PageContent) => {
    try {

        const response = await apiClient.post(`${ENDPOINTS_API_PATH.page}/addSection`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding page section", error);
        throw error;
    }
};
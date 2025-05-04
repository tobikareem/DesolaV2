import { ClickTrackingPayload } from './../models/ClickTrackingPayload';
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import useApi from "./useApi";

export const useClickTracking = () => {
    const { postData, getData } = useApi();

    const trackClick = async (payload: ClickTrackingPayload) => {
        try {
            await postData(`${ENDPOINTS_API_PATH.track}`, payload);
        } catch (error) {
            console.error('Error tracking click:', error);
        }
    };

    const getClickTracking = async (userId: string) => {
        try {
            const response = await getData<ClickTrackingPayload>(`${ENDPOINTS_API_PATH.track}/${userId}`);
            return response;
        } catch (error) {
            console.error('Error fetching click tracking:', error);
            throw error;
        }
    };

    return { trackClick, getClickTracking };
};
import { ClickTrackingPayload, ClickHistoryQueryParams, ClickHistoryResponse } from './../models/ClickTrackingPayload';
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

    const getClickHistory = async (params: ClickHistoryQueryParams) => {
        try {
          const queryParams = new URLSearchParams();
          
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              queryParams.append(key, value.toString());
            }
          });
          
          const queryString = queryParams.toString();
          const url = `${ENDPOINTS_API_PATH.flight_trackHistory}${queryString ? `?${queryString}` : ''}`;
          
          const response = await getData<ClickHistoryResponse>(url);
          return response;
        } catch (error) {
          console.error('Error fetching click history:', error);
          throw error;
        }
      };
    
      return { trackClick, getClickHistory };
    };
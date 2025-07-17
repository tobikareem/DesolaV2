import { useCallback } from "react";
import useApi from "./useApi";
import { CreateDirectSubscriptionRequest, CreateSubscriptionResult } from "../models/payment/SubscriptionResult";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";

export const usePayment = ()=> {
  
  const {postData} = useApi()
  

  const createPaymentIntent = useCallback(async(paymentDetails:CreateDirectSubscriptionRequest): Promise<CreateSubscriptionResult | null> => {
    try {
      const response = await postData<CreateDirectSubscriptionRequest, CreateSubscriptionResult>(`${ENDPOINTS_API_PATH?.stripe_createPaymentIntent}`, paymentDetails);
      return response || null;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      return null;
    }
  },[postData])

  return{createPaymentIntent};
}
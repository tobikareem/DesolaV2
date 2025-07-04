import { useState } from "react"
import { CustomerSignupRequest, CustomerSignupResponse } from "../models/payment/CustomerSignupRequest"
import useApi from "./useApi"
import { useAuthInfo } from "./useAuthInfo";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import { toast } from "react-toastify";
import { PaymentIntentRequest } from "../models/payment/PaymentIntentRequest";


export const usePayment =()=> {
  const {postData, putData} = useApi();
  const { accountInfo, isAuthenticated } = useAuthInfo();

  const customerDetails = {
      fullName: accountInfo?.fullName,
      email: accountInfo?.emailAddress,
      phone:'',
      preferredCurrency: 'USD',
      defaultOriginAirport: 'ATL', // the busiest airport
      metadata: {}
    } as CustomerSignupRequest
  const [loading, setLoading] = useState<boolean>(false);
  const [payResponse, setPayResponse] = useState<CustomerSignupResponse | object>({});

  const CustomerSignupPaymentRequestFn = async()=> {
    setLoading(true)
    try {
      if (accountInfo && isAuthenticated) {
        const req = await postData<CustomerSignupRequest>(`${ENDPOINTS_API_PATH?.customerSignupPaymentRequest}`, customerDetails) 
        setPayResponse(req as CustomerSignupResponse)
      }
    } catch (error) {
      console.log(error instanceof Error ? error.message : String(error))
    } finally {
      setLoading(false)
    }
  }

  const [updating, setUpdating] = useState<boolean>(false);

  const CustomerUpdatePaymentRequestFn = async(details:CustomerSignupRequest) => {
    setUpdating(true)
    try {
      await putData<CustomerSignupRequest>(`${ENDPOINTS_API_PATH?.customerUpdatePaymentRequest}`, details)
      
    } catch (error) {
      console.log(error instanceof Error ? error.message : String(error))
    } finally {
      setUpdating(false)
    }
  }

  const PaymentIntentFn = async(details:PaymentIntentRequest)=> {

    try{
      await postData<PaymentIntentRequest>(`${ENDPOINTS_API_PATH?.paymentIntent}`, details)
    } catch (error) {
        console.log(error instanceof Error ? error.message : String(error))
    } finally {
      
    }
  }

  const ConfirmSubscriptionRequestFn = async(details:)

  return {CustomerSignupPaymentRequestFn,
    payResponse, 
    loading, 
    CustomerUpdatePaymentRequestFn,
    PaymentIntentFn,
  }
}
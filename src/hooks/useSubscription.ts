
import usePageContent from "./usePageContent";
import { useContext, useState } from "react";
import { WEB_PAGES } from "../utils/constants";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import { SubscriptionContext } from "../contexts/subscriptionContext";
import { PaymentState } from "../models/payment/StripePaymentFormProps";

export const useSubscription = () => {
  const { content: monthlyYearly } = usePageContent(`${ENDPOINTS_API_PATH.page}`, `${WEB_PAGES.home}`, "MonthlyYearlyPrice");
  const monthlyPrice = monthlyYearly?.RowValue?.split(";")[0] ?? '2.59';
  const yearlyPrice = monthlyYearly?.RowValue?.split(";")[1] ?? '30.59';
  const plans = ['Yearly', 'Monthly']
  const [selectedPlan, setSelectedPlan] = useState<string>(plans[0])
  const [selectMode, setSelectMode] = useState<string>('')
  const [stage, setStage] = useState<number>(1);
  const price = selectedPlan == 'Yearly' ? yearlyPrice : monthlyPrice
  
  const {
    customerFormData,
    setCustomerFormData,
    isSubscribed,
    setIsSubscribed,
    customerSubscriptionData,
    setCustomerSubscriptionData
  } = useContext(SubscriptionContext);
  
  const [paymentState, setPaymentState] = useState<PaymentState>({
    step: 'loading',
    isLoadingCustomer: false,
    isProcessing: false
  });


  return {
    monthlyPrice,
    yearlyPrice,
    price,
    plans,
    selectedPlan,
    setSelectedPlan,
    selectMode,
    setSelectMode,
    stage,
    setStage,
    customerFormData,
    setCustomerFormData,
    isSubscribed,
    setIsSubscribed,
    customerSubscriptionData,
    setCustomerSubscriptionData,
    paymentState,
    setPaymentState
  }
}
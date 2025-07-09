
import usePageContent from "./usePageContent";
import { useState } from "react";
import { WEB_PAGES } from "../utils/constants";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import { CustomerSignupRequest } from "../models/payment/CustomerSignupRequest";

export const useSubscription =()=> {
  const { content: monthlyYearly } = usePageContent(`${ENDPOINTS_API_PATH.page}`, `${WEB_PAGES.home}`, "MonthlyYearlyPrice");
  const monthlyPrice = monthlyYearly?.RowValue?.split(";")[0] ?? '2.59';
  const yearlyPrice = monthlyYearly?.RowValue?.split(";")[1] ?? '30.59';
  const plans = ['Yearly','Monthly']
  const [selectedPlan, setSelectedPlan] = useState<string>(plans[0])
  const [selectMode, setSelectMode] = useState<string>('')
  const [stage, setStage] = useState<number>(1);  
  const modeOfPayment = ['Debit/Credit Card','Paypal']
  const price = selectedPlan == 'Yearly' ? yearlyPrice : monthlyPrice
  const [customerData, setCustomerData] = useState<CustomerSignupRequest>();

  return { monthlyPrice, yearlyPrice,price, plans, selectedPlan, setSelectedPlan, modeOfPayment, selectMode, setSelectMode, stage, setStage, customerData, setCustomerData }
}
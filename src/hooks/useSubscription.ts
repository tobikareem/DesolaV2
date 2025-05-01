
import usePageContent from "./usePageContent";
import { useState } from "react";
import { WEB_PAGES } from "../utils/constants";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";

export const useSubscription =()=> {
  const { content: monthlyYearly } = usePageContent(`${ENDPOINTS_API_PATH.page}`, `${WEB_PAGES.home}`, "MonthlyYearlyPrice");
  const monthlyPrice = monthlyYearly?.RowValue?.split(";")[0] ?? '2.59';
  const yearlyPrice = monthlyYearly?.RowValue?.split(";")[1] ?? '30.59';
  const plans = ['Yearly','Monthly']
  const [selectedPlan, setSelectedPlan] = useState<string>(plans[0])
  const [selectMode, setSelectMode] = useState<string>('')
  const modeOfPayment = ['Debit/Credit Card','Paypal']
  const price = selectedPlan == 'Yearly' ? yearlyPrice : monthlyPrice

  return { monthlyPrice, yearlyPrice,price, plans, selectedPlan, setSelectedPlan, modeOfPayment, selectMode, setSelectMode}
}
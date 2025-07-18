
import { PropsWithChildren, useState } from "react";
import { SubscriptionContext } from "../contexts/subscriptionContext";
import { CustomerSignupRequest } from "../models/payment/CustomerSignupRequest";
import { CustomerSubscriptionResponse } from "../models/payment/customerSubscription";


export const SubscriptionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [customerFormData, setCustomerFormData] = useState<CustomerSignupRequest | undefined>();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [customerSubscriptionData, setCustomerSubscriptionData] = useState<CustomerSubscriptionResponse | null>(null);

  return (
    <SubscriptionContext.Provider value={{
      customerFormData,
      setCustomerFormData,
      isSubscribed,
      setIsSubscribed,
      customerSubscriptionData,
      setCustomerSubscriptionData
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
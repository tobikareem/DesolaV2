
import { useState, PropsWithChildren } from "react";
import { SubscriptionContext } from "../contexts/subscriptionContext";
import { CustomerSignupRequest } from "../models/payment/CustomerSignupRequest";
import { CustomerSignupResponse } from "../models/payment/CustomerSignupResponse";


export const SubscriptionProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [customerData, setCustomerData] = useState<CustomerSignupRequest | undefined>();
    const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
    const [isCustomerCreated, setIsCustomerCreated] = useState<CustomerSignupResponse| null>(null);

  return (
    <SubscriptionContext.Provider value={{ customerData, setCustomerData, isSubscribed, setIsSubscribed, isCustomerCreated, setIsCustomerCreated }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
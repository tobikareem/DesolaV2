import{ createContext} from 'react';
import { CustomerSignupRequest } from '../models/payment/CustomerSignupRequest';
import { CustomerSubscriptionResponse } from '../models/payment/customerSubscription';

export interface SubscriptionContextType {
  isSubscribed: boolean | null;
  setIsSubscribed: (value: boolean | null) => void;

  customerSubscriptionData: CustomerSubscriptionResponse | null;
  setCustomerSubscriptionData: (value: CustomerSubscriptionResponse | null) => void;
  
  customerFormData: CustomerSignupRequest | undefined;
  setCustomerFormData: (value: CustomerSignupRequest | undefined) => void;
}

export const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: null,
  setIsSubscribed: () => { },
  customerSubscriptionData: null,
  setCustomerSubscriptionData: () => { },
  customerFormData: undefined,
  setCustomerFormData: () => { },
});




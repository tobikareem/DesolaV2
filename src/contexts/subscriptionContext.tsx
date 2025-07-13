import{ createContext} from 'react';
import { CustomerSignupResponse } from '../models/payment/CustomerSignupResponse';
import { CustomerSignupRequest } from '../models/payment/CustomerSignupRequest';

export interface SubscriptionContextType {
  isSubscribed: boolean | null;
  setIsSubscribed: (value: boolean | null) => void;
  isCustomerCreated: CustomerSignupResponse | null;
  setIsCustomerCreated: (value: CustomerSignupResponse | null) => void;
  customerData: CustomerSignupRequest | undefined;
  setCustomerData: (value: CustomerSignupRequest | undefined) => void;
}

export const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: null,
  setIsSubscribed: () => { },
  isCustomerCreated: null,
  setIsCustomerCreated: () => { },
  customerData: undefined,
  setCustomerData: () => { },
});




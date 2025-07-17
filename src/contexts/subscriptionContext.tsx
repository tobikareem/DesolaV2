import{ createContext} from 'react';
import { CustomerSignupRequest } from '../models/payment/CustomerSignupRequest';
import { customerSubscriptionResponse } from '../models/payment/customerSubscription';

export interface SubscriptionContextType {
  isSubscribed: boolean | null;
  setIsSubscribed: (value: boolean | null) => void;
  isCustomerCreated: customerSubscriptionResponse | null;
  setIsCustomerCreated: (value: customerSubscriptionResponse | null) => void;
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




import { CustomerSignupRequest } from "./CustomerSignupRequest";
import { CustomerSignupResponse } from "./CustomerSignupResponse";
import { CreateSubscriptionResult, SubscriptionError } from "./SubscriptionResult";

export interface StripePaymentFormProps {
  customerData: CustomerSignupRequest;
  selectedPlan: string;
  onSuccess: (result: CreateSubscriptionResult) => void;
  onError: (error: SubscriptionError) => void;
  onBack: () => void;
}

export interface PaymentState {
    step: 'loading' | 'ready' | 'success' | 'error';
    error?: string;
    customerData?: CustomerSignupResponse;
    isLoadingCustomer: boolean;
    isProcessing: boolean;
    subscriptionResult?: CreateSubscriptionResult;
}
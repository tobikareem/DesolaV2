import { CustomerSignupRequest } from "./CustomerSignupRequest";
import { CreateSubscriptionResult, SubscriptionError } from "./SubscriptionResult";

export interface StripePaymentFormProps {
  customerData: CustomerSignupRequest;
  selectedPlan: string;
  onSuccess: (result: CreateSubscriptionResult) => void;
  onError: (error: SubscriptionError) => void;
  onBack: () => void;
}
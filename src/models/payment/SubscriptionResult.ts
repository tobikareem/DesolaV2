export interface CreateSubscriptionResult {
    subscriptionId: string;
    customerId: string;
    status: string;
    amount: number;
    currency: string;
    clientSecret?: string;
    requiresAction?: boolean;
    trialEnd?: string;
    currentPeriodStart?: string;
    currentPeriodEnd?: string;
}

export interface CreateDirectSubscriptionRequest {
    email: string;
    fullName: string;
    phone: string;
    paymentMethodId: string;
    priceId: string;
    customerId: string;
    trialPeriodDays: number;
    metadata: Record<string, string>;
}


export interface SubscriptionError {
  message: string;
  code?: string;
  type?: string;
}

export interface CustomerSignupResponse {
    id: string;
    customerId: string;
    email: string;
    fullName: string;
    phone: string;
    stripeCustomerId: string;
    hasActiveSubscription: boolean;
    subscriptionExpiresAt: string | null;
    currentSubscriptionId: string;
    preferredCurrency: string;
    defaultOriginAirport: string;
    createdAt: string;
    lastActiveAt: string;
    status: number;
    metadataJson: string;
    partitionKey: string;
    rowKey: string;
    timestamp: string;
    eTag: string;
}

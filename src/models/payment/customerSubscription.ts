export interface customerSubscriptionResponse {
    "customer": {
        "id": string;
        "customerId": string;
        "email": string;
        "fullName": string;
        "phone": string;
        "stripeCustomerId": string;
        "hasActiveSubscription": false,
        "subscriptionExpiresAt": string | null;
        "currentSubscriptionId": string | null;
        "preferredCurrency": string;
        "defaultOriginAirport": string;
        "createdAt": string;
        "lastActiveAt": string;
        "status": number;
        "metadataJson": object | string;
        "partitionKey": string;
        "rowKey": string;
        "timestamp": string;
        "eTag": string;
    },
    "subscriptions": [
        {
            "id": string;
            "customerId": string;
            "status": 'active' | 'inactive' | 'expired' | 'trialing' ;
            "amount": number;
            "currency": string;
            "interval": string;
            "currentPeriodStart": string;
            "currentPeriodEnd": string;
            "trialStart": string
            "trialEnd": string;
            "canceledAt": null,
            "createdAt": string;
            "priceId": string;
            "productId": string;
        }
    ],
    "hasActiveSubscription": boolean
    "subscriptionExpiresAt": string;
    "currentPlan": string;
    "currentAmount": number;
    "currency": string;
    "trialEnd": string;
    "isTrialing": boolean;
    "nextBillingDate": string;
    "status": 'active' | 'inactive' | 'expired' | 'trialing' ;
}
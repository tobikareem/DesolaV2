export interface CustomerAddress {
    Line1: string;
    Line2: string;
    City: string;
    State: string;
    PostalCode: string;
    Country: string;
}

export interface CustomerProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phone?: string;
    address: CustomerAddress;
    preferences: {
        currency: string;
        // defaultOriginAirport: string;
        // language?: string;
        locale?: string;
    };
    metadata: {
        azureObjectId: string;
        tenantId?: string;
        lastUpdated: string;
        source: string;
    };
}
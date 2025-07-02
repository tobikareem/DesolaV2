export interface CustomerSignupRequest {
  email: string; // Required - from Azure B2C
  fullName: string; // Required - from Azure B2C
  phone?: string; // Optional
  preferredCurrency: string; // Default "USD"
  defaultOriginAirport?: string; // get this from user preferences or location
  metadata: Record<string, string>; // Dictionary, anything worth saving
}

export interface CustomerSignupResponse {
  success: boolean;
  customerId?: string;
  stripeCustomerId?: string;
  message?: string;
  errors?: Record<string, string[]>;
}
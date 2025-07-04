export interface CustomerSignupRequest {
  email: string; 
  fullName: string; 
  phone?: string;
  preferredCurrency: string; 
  defaultOriginAirport?: string; 
  metadata: Record<string, string>;
}


export interface IdToken {
    iss?: string;                 // Issuer - identifies the token issuer
    sub?: string;                 // Subject - unique identifier for the user
    aud?: string | string[];      // Audience - intended recipient of the token
    exp?: number;                 // Expiration time
    nbf?: number;                 // Not before time
    iat?: number;                 // Issued at time
    jti?: string;                 // JWT ID - unique identifier for this token
    
    // Standard user profile claims
    given_name?: string;          // First name
    family_name?: string;         // Last name
    name?: string;                // Full name
    email?: string;               // Email address
    emails?: string[];            // Array of email addresses (Microsoft specific)
    
    // Azure B2C specific identifiers
    oid?: string;                 // Object ID - unique identifier in Azure AD
    tid?: string;                 // Tenant ID
    
    // Additional profile information
    postalCode?: string;
    country?: string;
    state?: string;
    streetAddress?: string;
    city?: string;
    
    // Authentication context
    nonce?: string;               // Value used to associate a client session with an ID token
    auth_time?: number;           // Time when authentication occurred
    acr?: string;                 // Authentication context class reference
    amr?: string[];               // Authentication methods references
    
    // Extended profile information (common in many ID tokens)
    preferred_username?: string;
    picture?: string;             // URL to user's profile picture
    locale?: string;              // User's locale/language
    verified_email?: boolean;     // Whether email has been verified
    
    // Allow for additional custom claims
    [key: string]: unknown;
}
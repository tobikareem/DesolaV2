import { Expose, Transform } from "class-transformer";
import "reflect-metadata";

export class IdToken {
    @Expose({ name: "iss" }) issuer?: string;  // Issuer
    @Expose({ name: "sub" }) subject?: string; // Subject
    @Expose({ name: "aud" }) audience?: string;
    @Expose({ name: "exp" }) expirationTime?: number;
    @Expose({ name: "nbf" }) notBefore?: number;
    @Expose({ name: "iat" }) issuedAt?: number;
    @Expose({ name: "jti" }) jwtId?: string;

    // Standard user profile claims
    @Expose({ name: "given_name" }) firstName?: string;
    @Expose({ name: "family_name" }) lastName?: string;
    @Expose({ name: "name" }) fullName?: string;
    @Expose({ name: "email" }) @Transform(({ value }) => Array.isArray(value) ? value[0] : value)emailAddress?: string;
    @Expose({ name: "emails" }) emailList?: string[];

    // Azure B2C specific identifiers
    @Expose({ name: "oid" }) objectId?: string;
    @Expose({ name: "tid" }) tenantId?: string;

    // Additional profile information
    @Expose({ name: "postalCode" }) postalCode?: string;
    @Expose({ name: "country" }) country?: string;
    @Expose({ name: "state" }) state?: string;
    @Expose({ name: "streetAddress" }) streetAddress?: string;
    @Expose({ name: "city" }) city?: string;

    // Authentication context
    @Expose({ name: "nonce" }) nonce?: string;
    @Expose({ name: "auth_time" }) authenticationTime?: number;
    @Expose({ name: "acr" }) authenticationContextClassRef?: string;
    @Expose({ name: "amr" }) authenticationMethods?: string[];

    // Extended profile information
    @Expose({ name: "preferred_username" }) preferredUsername?: string;
    @Expose({ name: "picture" }) profilePicture?: string;
    @Expose({ name: "locale" }) locale?: string;
    @Expose({ name: "verified_email" }) isEmailVerified?: boolean;

    // Additional properties
    [key: string]: unknown;
}

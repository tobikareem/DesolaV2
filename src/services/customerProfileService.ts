import { plainToInstance } from "class-transformer";
import { IdToken } from "../models/IdToken";
import { CustomerProfile, CustomerAddress } from "../models/UserProfile/CustomerProfile";
import { SESSION_VALUES } from "../utils/constants";
import { CustomStorage } from "../utils/customStorage";

class CustomerProfileService {
    private storage = new CustomStorage();
    private readonly CUSTOMER_PROFILE_KEY = SESSION_VALUES.customer_profile;
    private readonly ADDRESS_KEY = SESSION_VALUES.customer_address;
    private readonly PREFERENCES_KEY = SESSION_VALUES.customer_preferences;

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extractProfileFromToken(tokenClaims: any): CustomerProfile | null {
        try {
            const idToken = plainToInstance(IdToken, tokenClaims);

            if (!idToken.objectId || idToken.emailList?.length === 0) {
                console.warn("Missing required fields in token claims");
                return null;
            }

            const address: CustomerAddress = {
                Line1: idToken.streetAddress || "",
                Line2: "", 
                City: idToken.city || "",
                State: idToken.state || "",
                PostalCode: idToken.postalCode || "",
                Country: idToken.country || ""
            };

            const profile: CustomerProfile = {
                id: idToken.objectId,
                email: idToken.emailList && idToken.emailList.length > 0 ? idToken.emailList[0] : idToken.emailAddress || "",
                firstName: idToken.firstName || "",
                lastName: idToken.lastName || "",
                fullName: idToken.fullName || `${idToken.firstName || ""} ${idToken.lastName || ""}`.trim(),
                address,
                preferences: {
                    locale: idToken.locale,
                    currency:  "USD" 
                },
                metadata: {
                    azureObjectId: idToken.objectId,
                    tenantId: idToken.audience,
                    lastUpdated: new Date().toISOString(),
                    source: "azure_b2c"
                }
            };

            return profile;
        } catch (error) {
            console.error("Error extracting profile from token:", error);
            return null;
        }
    }

    /**
     * Save customer profile to storage
     */
    saveProfile(profile: CustomerProfile): void {
        try {
            this.storage.setItem(this.CUSTOMER_PROFILE_KEY, JSON.stringify(profile));
            
            this.storage.setItem(this.ADDRESS_KEY, JSON.stringify(profile.address));
            this.storage.setItem(this.PREFERENCES_KEY, JSON.stringify(profile.preferences));
            
            this.storage.setItem(SESSION_VALUES.azure_b2c_userId, profile.id);
            this.storage.setItem(SESSION_VALUES.azure_user_name, profile.fullName);
            this.storage.setItem(SESSION_VALUES.azure_b2c_first_name, profile.firstName);
            this.storage.setItem(SESSION_VALUES.azure_b2c_last_name, profile.lastName);

            console.log("Customer profile saved successfully");
        } catch (error) {
            console.error("Error saving customer profile:", error);
        }
    }

    /**
     * Get customer profile from storage
     */
    getProfile(): CustomerProfile | null {
        try {
            const profileJson = this.storage.getItem(this.CUSTOMER_PROFILE_KEY);
            if (!profileJson) return null;

            return JSON.parse(profileJson) as CustomerProfile;
        } catch (error) {
            console.error("Error retrieving customer profile:", error);
            return null;
        }
    }

    /**
     * Get customer address from storage
     */
    getAddress(): CustomerAddress | null {
        try {
            const addressJson = this.storage.getItem(this.ADDRESS_KEY);
            if (!addressJson) return null;

            return JSON.parse(addressJson) as CustomerAddress;
        } catch (error) {
            console.error("Error retrieving customer address:", error);
            return null;
        }
    }

    /**
     * Update customer address
     */
    updateAddress(address: Partial<CustomerAddress>): void {
        try {
            const currentProfile = this.getProfile();
            if (!currentProfile) {
                console.warn("No existing profile found to update address");
                return;
            }

            const updatedAddress = { ...currentProfile.address, ...address };
            const updatedProfile = {
                ...currentProfile,
                address: updatedAddress,
                metadata: {
                    ...currentProfile.metadata,
                    lastUpdated: new Date().toISOString()
                }
            };

            this.saveProfile(updatedProfile);
        } catch (error) {
            console.error("Error updating customer address:", error);
        }
    }

    /**
     * Update customer preferences
     */
    updatePreferences(preferences: Partial<CustomerProfile['preferences']>): void {
        try {
            const currentProfile = this.getProfile();
            if (!currentProfile) {
                console.warn("No existing profile found to update preferences");
                return;
            }

            const updatedPreferences = { ...currentProfile.preferences, ...preferences };
            const updatedProfile = {
                ...currentProfile,
                preferences: updatedPreferences,
                metadata: {
                    ...currentProfile.metadata,
                    lastUpdated: new Date().toISOString()
                }
            };

            this.saveProfile(updatedProfile);
        } catch (error) {
            console.error("Error updating customer preferences:", error);
        }
    }

    /**
     * Clear customer profile from storage
     */
    clearProfile(): void {
        try {
            this.storage.removeItem(this.CUSTOMER_PROFILE_KEY);
            this.storage.removeItem(this.ADDRESS_KEY);
            this.storage.removeItem(this.PREFERENCES_KEY);
            console.log("Customer profile cleared successfully");
        } catch (error) {
            console.error("Error clearing customer profile:", error);
        }
    }

    /**
     * Get formatted address string
     */
    getFormattedAddress(): string {
        const address = this.getAddress();
        if (!address) return "";

        const parts = [
            address.Line1,
            address.Line2,
            address.City,
            address.State,
            address.PostalCode,
            address.Country
        ].filter(part => part && part.trim() !== "");

        return parts.join(", ");
    }

    
    validateProfile(profile: CustomerProfile): { isValid: boolean; missingFields: string[] } {
        const requiredFields = ['id', 'email', 'firstName', 'lastName'];
        const missingFields: string[] = [];

        requiredFields.forEach(field => {
            if (!profile[field as keyof CustomerProfile]) {
                missingFields.push(field);
            }
        });

        return {
            isValid: missingFields.length === 0,
            missingFields
        };
    }

    
    isAddressComplete(): boolean {
        const address = this.getAddress();
        if (!address) return false;

        return !!(address.Line1 && address.City && address.State && address.PostalCode && address.Country);
    }
}

export const customerProfileService = new CustomerProfileService();
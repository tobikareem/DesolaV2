import { SESSION_VALUES } from "./constants";

const KEY_MAPPING: Record<string, string> = {
    'idToken': SESSION_VALUES.azure_b2c_idToken,
    'accessToken': SESSION_VALUES.azure_b2c_accessToken,
    'refreshToken': SESSION_VALUES.azure_b2c_refreshToken,
    'expiresOn': SESSION_VALUES.azure_b2c_expiresAt,
    'username': SESSION_VALUES.azure_userName
};

export class CustomStorage {
    getItem(key: string): string | null {
        console.log('CustomStorage getItem:', key);
        const mappedKey = this.getCustomKey(key);
        if (!mappedKey) {
            console.warn(`CustomStorage: No valid key found for ${key}`);
            return null;
        }
        console.log('Mapped to:', mappedKey);
        return sessionStorage.getItem(mappedKey);
    }

    setItem(key: string, value: string): void {
        if (value == null) {
            console.warn(`CustomStorage: Attempted to store null/undefined for key: ${key}`);
            return;
        }
        console.log('CustomStorage setItem:', key);
        const mappedKey = this.getCustomKey(key);
        if (!mappedKey) {
            console.warn(`CustomStorage: No valid key found for ${key}`);
            return;
        }
        console.log('Mapped to:', mappedKey);
        sessionStorage.setItem(mappedKey, value);

        if (key.includes('idToken') || key.includes('accessToken')) {
            sessionStorage.setItem(SESSION_VALUES.azure_isAuthenticated, 'true');
        }
    }

    removeItem(key: string): void {
        const mappedKey = this.getCustomKey(key);
        if (!mappedKey) {
            console.warn(`CustomStorage: No valid key found for ${key}, skipping removal.`);
            return;
        }
        sessionStorage.removeItem(mappedKey);
    }

    clear(): void {
        Object.keys(sessionStorage).forEach((key) => {
            if (key.includes("msal") || Object.values(SESSION_VALUES).some(value => key.includes(value))) {
                sessionStorage.removeItem(key);
            }
        });
        console.log("CustomStorage: Cleared all MSAL-related session storage keys.");
    }

    private getCustomKey(originalKey: string): string {
        for (const [msalKey, customKey] of Object.entries(KEY_MAPPING)) {
            // Look for an exact match in session storage
            const sessionKey = Object.keys(sessionStorage).find(key => key.includes(msalKey));
            if (sessionKey) {
                return sessionKey;
            }
            // Fall back to static key mapping
            if (originalKey.includes(msalKey)) {
                return customKey;
            }
        }
    
        return originalKey === 'msal-cache' ? 'msal-custom-cache' : originalKey;
    }
}

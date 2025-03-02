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
        console.log('Mapped to:', mappedKey);
        if (key === 'msal-cache') {
            return sessionStorage.getItem(mappedKey);
        }

        return sessionStorage.getItem(mappedKey);
    }

    setItem(key: string, value: string): void {
        console.log('CustomStorage setItem:', key);
        const mappedKey = this.getCustomKey(key);
        console.log('Mapped to:', mappedKey);
        sessionStorage.setItem(mappedKey, value);

        if (key.includes('idToken') || key.includes('accessToken')) {
            sessionStorage.setItem(SESSION_VALUES.azure_isAuthenticated, 'true');
        }
    }

    removeItem(key: string): void {
        const mappedKey = this.getCustomKey(key);
        sessionStorage.removeItem(mappedKey);
    }

    clear(): void {
        Object.values(SESSION_VALUES).forEach(key => {
            sessionStorage.removeItem(key);
        });
    }

    private getCustomKey(originalKey: string): string {
        for (const [msalKey, customKey] of Object.entries(KEY_MAPPING)) {
            if (originalKey.includes(msalKey)) {
                return customKey;
            }
        }

        if (originalKey === 'msal-cache') {
            return 'msal-custom-cache';
        }

        return originalKey;
    }
}


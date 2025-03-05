export class CustomStorage {
    getItem(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        if (value != null) {
            sessionStorage.setItem(key, value);
        }
    }

    removeItem(key: string): void {
        sessionStorage.removeItem(key);
    }

    clear(): void {
        sessionStorage.clear();
    }
}
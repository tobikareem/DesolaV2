export class CustomStorage {
    getItem(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    getDefaultItem<T>(key: string, defaultValue: T): T {
        try {
            const item = this.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error retrieving ${key} from storage:`, error);
            return defaultValue;
        }
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
// CacheManager.ts
export interface CacheItem<T> {
    data: T;
    timestamp: number;
    expiresAt: number;
}

export class CacheManager {
    private static instance: CacheManager;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly cache: Map<string, CacheItem<any>>;
    private readonly defaultTTL: number;

    private constructor(defaultTTL = 5 * 60 * 1000) { // 5 minutes default
        this.cache = new Map();
        this.defaultTTL = defaultTTL;
    }

    public static getInstance(): CacheManager {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }

    private generateKey(path: string, partitionKey: string, rowKey: string): string {
        return `${path}-${partitionKey}-${rowKey}`;
    }

    public get<T>(path: string, partitionKey: string, rowKey: string): T | null {
        const key = this.generateKey(path, partitionKey, rowKey);
        const item = this.cache.get(key);

        if (!item) {
            return null;
        }

        if (Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    public set<T>(
        path: string,
        partitionKey: string,
        rowKey: string,
        data: T,
        ttl = this.defaultTTL
    ): void {
        const key = this.generateKey(path, partitionKey, rowKey);
        const timestamp = Date.now();

        this.cache.set(key, {
            data,
            timestamp,
            expiresAt: timestamp + ttl
        });
    }

    public clear(): void {
        this.cache.clear();
    }

    public remove(path: string, partitionKey: string, rowKey: string): void {
        const key = this.generateKey(path, partitionKey, rowKey);
        this.cache.delete(key);
    }

    public isExpired(path: string, partitionKey: string, rowKey: string): boolean {
        const key = this.generateKey(path, partitionKey, rowKey);
        const item = this.cache.get(key);

        if (!item) {
            return true;
        }

        return Date.now() > item.expiresAt;
    }
}



import { useState, useEffect, useCallback } from "react";

// In-Memory Cache
const memoryCache = new Map();

/**
 * useHybridCache:
 *  - Checks in-memory cache first
 *  - Falls back to localStorage if memory is missing or expired
 *  - If no valid cache, calls fetchData
 *  - Saves fresh data to both memory and localStorage
 *  - No auto revalidation on focus/reconnect
 *  - No stale-while-revalidate background fetch
 */
export function useHybridCache<T>(
    key: string,
    fetchData: () => Promise<T>,
    expirationTime = 5 * 60 * 1000 // Default: 5 minutes
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Get data from memory or localStorage
    const getCachedData = useCallback(() => {
        // Check memory cache
        if (memoryCache.has(key)) {
            const { data: cachedData, timestamp } = memoryCache.get(key);
            if (Date.now() - timestamp < expirationTime) {
                return cachedData;
            } else {
                memoryCache.delete(key); // Expired in-memory entry
            }
        }

        // Check localStorage
        const stored = localStorage.getItem(key);
        if (stored) {
            const { data: lsData, timestamp } = JSON.parse(stored);
            if (Date.now() - timestamp < expirationTime) {
                return lsData;
            } else {
                localStorage.removeItem(key); // Expired localStorage entry
            }
        }

        return null;
    }, [key, expirationTime]);

    // Save data to both memory & localStorage
    const saveToCache = useCallback(
        (newData: T) => {
            const now = Date.now();
            memoryCache.set(key, { data: newData, timestamp: now });
            localStorage.setItem(key, JSON.stringify({ data: newData, timestamp: now }));
        },
        [key]
    );

    // Fetch data if no valid cache
    const fetchWithCache = useCallback(async () => {
        setLoading(true);
        try {
            // Check existing cache
            const cachedData = getCachedData();
            if (cachedData) {
                setData(cachedData);
                setLoading(false);
                return;
            }

            // Fetch fresh data
            const result = await fetchData();
            saveToCache(result);
            setData(result);
        } catch (err: unknown) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [getCachedData, fetchData, saveToCache]);

    // Fetch once on mount
    useEffect(() => {
        fetchWithCache();
    }, [fetchWithCache]);

    // Return manual revalidate if needed
    return {
        data,
        loading,
        error,
        revalidate: fetchWithCache
    };
}

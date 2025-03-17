import { useEffect, useState } from 'react';
import CommandRepository from '../repository/CommandRepository';


export const useCommandRepository = () => {
    const [repository] = useState(() => new CommandRepository());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const initializeRepository = async () => {
            try {
                setLoading(true);
                await repository.initialize();
                setError(null);
            } catch (err) {
                console.error('Failed to initialize command repository:', err);
                setError(err instanceof Error ? err : new Error('Unknown error initializing commands'));
            } finally {
                setLoading(false);
            }
        };

        initializeRepository();
    }, [repository]);

    return {
        repository,
        loading,
        error
    };
};
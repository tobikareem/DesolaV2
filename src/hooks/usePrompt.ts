import { useEffect, useState } from 'react';

export const usePrompts = (): {
    recentPrompts: string[];
    setRecentPrompts: React.Dispatch<React.SetStateAction<string[]>>;
    savePrompt: (prompt: string) => void;
} => {
    const [recentPrompts, setRecentPrompts] = useState<string[]>([]);

    // Load prompts from session storage on initial mount
    useEffect(() => {
        try {
            const storedPrompts = sessionStorage.getItem('RecentPrompts');
            if (storedPrompts) {
                setRecentPrompts(JSON.parse(storedPrompts));
            }
        } catch (error) {
            console.error('Error loading prompts:', error);
        }
    }, []);

    // Save a new prompt to the state and session storage
    const savePrompt = (prompt: string): void => {
        if (!prompt.trim() || recentPrompts.includes(prompt)) return;

        const updatedPrompts = [...recentPrompts, prompt];
        setRecentPrompts(updatedPrompts);

        try {
            sessionStorage.setItem('RecentPrompts', JSON.stringify(updatedPrompts));
        } catch (error) {
            console.error('Error saving prompts:', error);
        }
    };

    return { recentPrompts, setRecentPrompts, savePrompt };
};

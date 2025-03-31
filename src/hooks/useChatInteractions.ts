import { useEffect, useState } from 'react';
import  { ChatBotResponseHandler, ChatMessage } from '../utils/ChatBotHandler';


export const useChatInteractions = (
    initialChatLog: ChatMessage[] = []
): {
    chatLog: ChatMessage[];
    setChatLog: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
    botLoader: boolean;
    chatLoading: boolean;
    sendUserMessage: (message: string) => void;
} => {
    const [chatLog, setChatLog] = useState<ChatMessage[]>(initialChatLog);
    const [botLoader, setBotLoader] = useState<boolean>(false);
    const [chatLoading, setChatLoading] = useState<boolean>(true);

    // initialize chat log from session storage if available
    useEffect(() => {
        const timeout = setTimeout(() => setChatLoading(false), 300);
        return () => clearTimeout(timeout);
    }, []);

    // Persist chat log to session storage whenever it changes
    useEffect(() => {
        try {
            sessionStorage.setItem('chatLog', JSON.stringify(chatLog));
        } catch (error) {
            console.error('Error saving chat log:', error);
        }
    }, [chatLog]);

    // send a user message and simulate a bot response
    const sendUserMessage = (message: string): void => {
        if (!message.trim()) return;

        setChatLog((prev) => [
            ...prev,
            { message, sender: 'user' },
            { message: '...', sender: 'bot' }
        ]);
        setBotLoader(true);

        // Simulate a delay and then process the bot's response
        setTimeout(() => {
            try {
                const botMessage: string = ChatBotResponseHandler(message);
                setChatLog((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { message: botMessage, sender: 'bot' };
                    return updated;
                });
            } catch (error) {
                console.error('Error handling bot response:', error);
            } finally {
                setBotLoader(false);
            }
        }, 2000);
    };

    return { chatLog, setChatLog, botLoader, chatLoading, sendUserMessage };
};

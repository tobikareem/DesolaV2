import { useCallback, useState } from "react";
import { toast } from 'react-toastify';
import { ChatCommand } from '../models/ChatCommand';
import chatService from "../services/chatService";

export const useChat = () => {
    const [loading, setLoading] = useState(false);
    const [chatCommands, setChatCommands] = useState<ChatCommand[]>([]);

    const getCommands = useCallback(async () => {
        setLoading(true);

        try {
            const data = await chatService.getCommands();
            setChatCommands(data);
        } catch (error) {
            toast.error(`Error fetching commands: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const executeCommand = useCallback(async <T = unknown>(commandName: string, params: T) => {
        setLoading(true);

        try {
            return await chatService.executeCommand(commandName, params);
        } catch (error) {
            toast.error(`Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return undefined;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        chatCommands,
        getCommands,
        executeCommand,
        loading
    };
};
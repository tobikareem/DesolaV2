/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useChat } from "../../../hooks/useChat";
import { useCommandRepository } from "../../../hooks/useCommandRepository";
import { ChatCommand, CommandType } from "../../../models/ChatCommand";
import { ChatMessage } from "../../../models/ChatMessage";
import GuidedFlightBookingUI from "../guidedFlightBookingUi";

interface GuidedFlightBookingProps {
    onComplete?: (bookingData: any) => void;
}

const GuidedFlightBooking: React.FC<GuidedFlightBookingProps> = ({ onComplete }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [suggestedCommands, setSuggestedCommands] = useState<ChatCommand[]>([]);
    const { repository, loading: repoLoading } = useCommandRepository();
    const { executeCommand: executeChatCommand, loading: chatLoading } = useChat();

    const isLoading = repoLoading || chatLoading;

    useEffect(() => {
        if (repository && !repoLoading) {
            handleCommandExecution("start");
        }
    }, [repository, repoLoading]);

    const addMessage = (message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
    };

    const processMessageTemplate = (template: string, params: Record<string, any>) => {
        // Replace the placeholders in template with actual values
        return template.replace(/\{(\w+)\}/g, (_, key) => params[key] || '');
    };

    const handleCommandExecution = async (commandName: string, params: any = {}) => {
        const command = repository.getCommand(commandName);
        if (!command) return;

        addMessage({
            type: command.type,
            content: processMessageTemplate(command.message, params),
            command: commandName,
            timestamp: new Date()
        });

        const nextCommand = repository.getNextSuggestions(commandName)[0];

        const uiPresentation = command.uiPresentation || {};
        if (uiPresentation.apiCall) {
            params.options = repository.getDropdownOptions(uiPresentation.apiCall);
        }



        // If this is a user command, get the response from the API
        if (nextCommand.type === CommandType.USER) {

            const response = await executeChatCommand(commandName, params);

            if (response) {
                addMessage({
                    type: CommandType.RESPONSE,
                    content: response.message,
                    command: response.command,
                    timestamp: new Date()
                });

                // Check if this is the final step in our booking flow
                if (response.command === 'confirmBooking') {
                    onComplete?.(response.bookingData);
                }

                setSuggestedCommands(
                    repository.getNextSuggestions(response.command)
                );
            }
        } else {
            // For system commands, we already know the next suggested commands
            setSuggestedCommands(
                repository.getNextSuggestions(commandName)
            );
        }
    };

    return (
        <GuidedFlightBookingUI
            messages={messages.distinct(m => m.content)}
            suggestedCommands={suggestedCommands}
            onCommandSelect={handleCommandExecution}
            isLoading={isLoading} />
    );
};

export default GuidedFlightBooking;
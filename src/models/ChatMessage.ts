import { CommandType } from './ChatCommand';

export interface ChatMessage {
    /**
     * The type of the message (SYSTEM, USER, or RESPONSE)
     */
    type: CommandType;

    /**
     * The content/text of the message
     */
    content: string;

    /**
     * The command that generated this message
     */
    command: string;

    /**
     * Timestamp when the message was created
     */
    timestamp: Date;

    /**
     * Optional additional data associated with the message
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>;
}
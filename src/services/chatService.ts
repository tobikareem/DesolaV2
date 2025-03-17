import { ChatCommand } from "../models/ChatCommand";
import { CommandResponse } from "../models/CommandResponse";
import { ENDPOINTS_API_PATH } from '../utils/endpoints';
import ApiService from "./apiService";

class ChatService extends ApiService {
    async getCommands(): Promise<ChatCommand[]> {
        const data = await this.getData<ChatCommand[]>(ENDPOINTS_API_PATH.getCommands);
        return data || [];
    }

    async executeCommand<T = unknown>(commandName: string, params: T): Promise<CommandResponse> {
        if (!commandName) {
            return {
                status: 'error',
                message: 'Command name is required',
                command: '',
                error: {
                    code: 'MISSING_COMMAND',
                    details: 'No command name was provided'
                }
            };
        }

        try {
            const endpoint = `${ENDPOINTS_API_PATH.executeCommand}/${commandName}`;

            const response = await this.postData<T, CommandResponse>(endpoint, params);

            if (!response) {
                return {
                    status: 'error',
                    message: 'No response received from server',
                    command: commandName,
                    error: {
                        code: 'NO_RESPONSE',
                        details: 'The server did not return a response'
                    }
                };
            }

            return response;
        } catch (error) {
            console.error(`Failed to execute command "${commandName}":`, error);
            return {
                status: 'error',
                message: error instanceof Error ? error.message : 'An unknown error occurred',
                command: commandName,
                error: {
                    code: 'EXECUTION_FAILED',
                    details: error instanceof Error ? error.stack || error.message : 'Unknown error'
                }
            };
        }
    }
}

// Export a singleton instance
const chatService = new ChatService();
export default chatService;
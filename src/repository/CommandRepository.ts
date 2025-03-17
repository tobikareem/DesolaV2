import { ChatCommand, CommandType, PermissionLevel } from "../models/ChatCommand";
import chatService from "../services/chatService";

class CommandRepository {
    private readonly localCommands: Record<string, ChatCommand> = {};
    private remoteCommands: Record<string, ChatCommand> = {};

    constructor() {
        // Initialize basic commands
        this.localCommands = {
            start: {
                id: "start-cmd",
                name: "start",
                type: CommandType.SYSTEM,
                permission: PermissionLevel.PUBLIC,
                description: "Start command",
                message: "Hello {UserName}! Where are you flying from?",
                suggestNextCommands: ["selectOrigin"],
                uiPresentation: { chips: false },

            },

            help: {
                id: "help-cmd",
                name: "help",
                type: CommandType.SYSTEM,
                permission: PermissionLevel.PUBLIC,
                description: "Help command",
                message: "I can help you book a flight. Where are you flying from?",
                suggestNextCommands: ["selectOrigin"],
                uiPresentation: { chips: true },
            },

            exit: {
                id: "exit-cmd",
                name: "exit",
                type: CommandType.SYSTEM,
                permission: PermissionLevel.PUBLIC,
                description: "Exit command",
                message: "Goodbye!",
                suggestNextCommands: ["start"],
                uiPresentation: { chips: true },
            },

            selectOrigin: {
                id: "select-origin",
                name: "selectOrigin",
                type: CommandType.USER,
                permission: PermissionLevel.PUBLIC,
                description: "User selected Orign",
                message: "",
                suggestNextCommands: ["requestDestination"],
                uiPresentation: {
                    chips: true,
                    apiCall: "getAirports"
                }
            },

            requestDestination: {
                id: "request-origin",
                name: "requestDestination",
                type: CommandType.SYSTEM,
                permission: PermissionLevel.PUBLIC,
                description: "Where is User travelling to",
                message: "Where are you flying to? ",
                suggestNextCommands: ["selectDestination"],
                uiPresentation: {
                    chips: false,
                }
            },

            selectDestination: {
                id: "select-destination",
                name: "selectDestination",
                type: CommandType.USER,
                permission: PermissionLevel.PUBLIC,
                description: "User selected Destination",
                message: "",
                suggestNextCommands: ["requestData"],
                uiPresentation: {
                    chips: true,
                    apiCall: "getAirports"
                }
            },


        };
    }


    async initialize() {
        try {
            const remoteCommands = await chatService.getCommands();
            this.remoteCommands = remoteCommands.reduce((acc, cmd) => {
                acc[cmd.name] = cmd;
                return acc;
            }, {} as Record<string, ChatCommand>);
        } catch (error) {
            console.error("Failed to load remote commands:", error);
        }
    }

    getCommand(name: string): ChatCommand | undefined {
        return this.remoteCommands[name] || this.localCommands[name];
    }

    getNextSuggestions(currentCommand: string): ChatCommand[] {
        const command = this.getCommand(currentCommand);
        if (!command?.suggestNextCommands) return [];

        return command.suggestNextCommands
            .map(cmdName => this.getCommand(cmdName))
            .filter((cmd): cmd is ChatCommand => cmd !== undefined);
    }

    getDropdownOptions(option: string) {

        switch (option) {
            case "airport":
                console.log("Fetching airport options");
                break;

            case "airline":
                console.log("Fetching airline options");
                break;

            default:
                console.log("Unknown dropdown option");
                break;
        }

    }
}

export default CommandRepository;
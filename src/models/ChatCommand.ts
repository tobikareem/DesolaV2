export interface ChatCommand {
    id: string;               // Unique identifier
    name: string;             // Command name
    type: CommandType;        // Enum: "system", "user", "response"
    permission: PermissionLevel; // Determines who can execute this command
    description: string;      // Human-readable description
    message: string;          // Actual message to display
    suggestNextCommands: string[]; // Array of possible next commands
    requiredParams?: string[]; // Parameters required for this command
    validationRules?: Record<string, string>; // Validation rules for params
    uiPresentation?: {        // UI-specific rendering details
      chips?: boolean;        // Show as suggestion chips
      buttonStyle?: string;   // For styling command buttons
      icon?: string;          // Icon to display with command
      apiCall?: string;
    };
  }
  
  export enum CommandType {
    SYSTEM = "system",        // System-generated commands. Direction: System -> User
    USER = "user",            // User input commands 
    RESPONSE = "response"     // System responses . Direction: System -> User
  }
  
  export enum PermissionLevel {
    PUBLIC = "public",        // Anyone can use
    AUTHENTICATED = "authenticated", // Only logged-in users
    SUBSCRIBER = "subscriber", // Subscribers only
    ADMIN = "admin"           // Admin only
  }
import { ChatCommand } from "../../models/ChatCommand";
import { ChatMessage } from "../../models/ChatMessage";


interface GuidedFlightBookingUIProps {
  messages: ChatMessage[];
  suggestedCommands: ChatCommand[];
  onCommandSelect: (commandName: string) => void;
  isLoading: boolean;
}

const GuidedFlightBookingUI: React.FC<GuidedFlightBookingUIProps> = ({
  messages,
  suggestedCommands,
  onCommandSelect,
  isLoading,
}) => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.type}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type a message..." />
        {suggestedCommands.map((command, index) => (
          <button
            key={index}
            className="suggested-command"
            onClick={() => onCommandSelect(command.name)}
          >
            Send
          </button>
        ))}
      </div>
      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default GuidedFlightBookingUI;
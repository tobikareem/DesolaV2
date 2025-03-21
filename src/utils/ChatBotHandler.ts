export interface ChatProp {
  message?: string;
  sender?: string | undefined;
}

const commandCount: { [key: string]: number } = {};

const ChatBotResponseHandler = (chatMessage:string) => {
  const commands = {
    airport: 'What is your destination?',
    departure: 'What is your departure date?',
    return: 'Do you have a return date?',
    route: 'Select travel route...',
    class: 'Select travel class...',
    passengers: 'How many passengers?',
    ticket: 'Please wait while We will get you the most affordable flight.',
    default: 'Please, respond to the last prompt.'


  }

  const userMessage:string = chatMessage.toLowerCase();

  if (userMessage.includes('airport') || userMessage.includes('international') || userMessage.includes('local') || userMessage.includes('base')) {
    commandCount['airport'] = (commandCount['airport'] || 0) + 1;
      if (commandCount['airport'] > 1) {
        return commands.departure
      } else return commands.airport

  } else if (userMessage.includes('/')) {
      commandCount['/'] = (commandCount['/'] || 0) + 1;
      if (commandCount['/'] > 1) {
        return commands.route;
      } else {
        return commands.return;
      }

  } else if (userMessage.includes('one way') || userMessage.includes('multi city') || userMessage.includes('Round trip')) {
    commandCount['route'] = (commandCount['route'] || 0) + 1;
      if (commandCount['route'] > 1) {
        return commands.class
      } else return commands.class
  } else if (userMessage.includes('business class') || userMessage.includes('economy') || userMessage.includes('premium economy') || userMessage.includes('first class')) {
    return commands.ticket
  } else 
    return commands.default

}

export default ChatBotResponseHandler;
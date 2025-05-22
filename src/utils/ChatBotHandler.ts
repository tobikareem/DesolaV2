
export interface ChatMessage {
  message: string;
  sender: 'user' | 'bot';
}

type ChatStage =
  | 'initial'
  | 'departure_selected'
  | 'destination_selected'
  | 'route_selected'
  | 'departure_date_selected'
  | 'return_date_selected'
  | 'class_selected';

class ChatBotState {
  private stage: ChatStage = 'initial';
  private isOneWayTrip: boolean = false;
  private isMultiLegValue: string | null = null;

  private stages: Record<ChatStage, string> = {
    initial: 'What is your destination?',
    departure_selected: 'What is your destination?',
    destination_selected: 'Select travel route...',
    route_selected: 'What is your departure date? (YYYY-MM-DD)',
    departure_date_selected: 'Select your return date? (YYYY-MM-DD)',
    return_date_selected: 'Select travel class...',
    class_selected: 'Click the search button to get the best deals...'
  };

  private detectAirport(message: string): boolean {
    const airportTerms = ['airport', 'international', 'airstrip', 'base', 'airfield'];
    return airportTerms.some(term => message.includes(term));
  }

  private detectDate(message: string): boolean {
    return message.includes('-') || message.includes('/');
  }

  private detectRoute(message: string): boolean {
    const routeTerms = ['one way', 'multi city', 'round trip'];
    const isRoute = routeTerms.some(term => message.includes(term));
    
    this.isOneWayTrip = isRoute && message.toLowerCase().includes('one way');

    return isRoute;
  }

  private detectClass(message: string): boolean {
    const classTerms = ['business class', 'economy', 'premium economy', 'first class', 'business'];
    return classTerms.some(term => message.includes(term));
  }


  public setMultiLegValue(value: string | null): void {
    this.isMultiLegValue = value;
    if (value === 'one way') {
      this.isOneWayTrip = !(['one way', 'round trip'].includes(value.toLowerCase()));
    }
  }

  public processMessage(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (this.stage === 'initial' && this.detectAirport(lowerMessage)) {
      this.stage = 'departure_selected';
      return this.stages.departure_selected;
    }

    if (this.stage === 'departure_selected' && this.detectAirport(lowerMessage)) {
      this.stage = 'destination_selected';
      return this.stages.destination_selected;
    }

    if (this.stage === 'destination_selected' && this.detectRoute(lowerMessage)) {
      this.stage = 'route_selected';
      return this.stages.route_selected;
    }

    if (this.stage === 'route_selected' && this.detectDate(lowerMessage)) {
      this.stage = 'departure_date_selected';

      if (this.isOneWayTrip) {
        return this.stages.return_date_selected; 
      }
      if (this.isMultiLegValue && 
          ['round trip', 'multi city'].includes(this.isMultiLegValue.toLowerCase())) {
        return this.stages.departure_date_selected; 
      }

      return this.stages.departure_date_selected;
    }

    if (this.stage === 'departure_date_selected' && this.detectDate(lowerMessage)) {
      this.stage = 'return_date_selected';
      return this.stages.return_date_selected;
    }

    if ((this.stage === 'return_date_selected' ||
      (this.isOneWayTrip && this.stage === 'departure_date_selected')) &&
      this.detectClass(lowerMessage)) {
      this.stage = 'class_selected';
      return this.stages.class_selected;
    }

    if (this.detectAirport(lowerMessage) && (this.stage === 'initial' || this.stage === 'departure_selected')) {
      if (this.stage === 'initial') {
        this.stage = 'departure_selected';
      } else {
        this.stage = 'destination_selected';
      }
      return this.stages[this.stage];
    }

    if (this.detectRoute(lowerMessage) && this.stage === 'destination_selected') {
      this.stage = 'route_selected';
      return this.stages.route_selected;
    }

    if (this.detectDate(lowerMessage) &&
      (this.stage === 'route_selected' || this.stage === 'departure_date_selected')) {
      if (this.stage === 'route_selected') {
        this.stage = 'departure_date_selected';

        // If one-way trip, skip return date question
        if (this.isOneWayTrip ) {
          return this.stages.return_date_selected; // Skip to class selection
        }

        return this.stages.departure_date_selected;
      } else {
        this.stage = 'return_date_selected';
        return this.stages.return_date_selected;
      }
    }

    if (this.detectClass(lowerMessage) &&
      (this.stage === 'return_date_selected' ||
        (this.isOneWayTrip && this.stage === 'departure_date_selected'))) {
      this.stage = 'class_selected';
      return this.stages.class_selected;
    }

    // Default fallback message
    return 'Chat Timeout.. Which airport will you be flying from?';
  }

  public reset(): void {
    this.stage = 'initial';
    this.isOneWayTrip = false;
  }

  public getCurrentStage(): ChatStage {
    return this.stage;
  }

  public isOneWay(): boolean {
    return this.isOneWayTrip;
  }
}

const chatBotState = new ChatBotState();

export const ChatBotResponseHandler = (chatMessage: string): string => {
  return chatBotState.processMessage(chatMessage);
};

export const resetChatBot = (): void => {
  chatBotState.reset();
};

export const isOneWayTrip = (): boolean => {
  return chatBotState.isOneWay();
};
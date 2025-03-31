import { createContext } from 'react';
import { ChatContextType, TravelInformation } from './types';

const defaultTravelInfo: TravelInformation = {
    departure: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    travelRoute: '',
    flightClass: ''
};

export const ChatContext = createContext<ChatContextType>({
    chatLog: [],
    setChatLog: () => { },
    recentPrompts: [],
    setRecentPrompts: () => { },
    travelInfo: defaultTravelInfo
});
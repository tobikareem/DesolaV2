// src/contexts/ChatContext.tsx
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import { ChatMessage, TravelInformation } from '../contexts/types';
import { CustomStorage } from '../utils/customStorage';

const storageService = new CustomStorage();

interface ChatProviderProps {
    children: ReactNode;
}

// Helper functions to detect data types
function isAirport(text: string): boolean {
    return text.includes('Airport') || text.includes('(') && text.includes(')');
}

function isDate(text: string): boolean {
    return text.includes('/') && (
        // Simple validation for MM/DD/YYYY format
        /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(text.trim())
    );
}

function isTravelRoute(text: string): boolean {
    const routeTypes = ['one way', 'round trip', 'multi city'];
    return routeTypes.some(route => text.toLowerCase().includes(route));
}

function isFlightClass(text: string): boolean {
    const classTypes = ['economy', 'business', 'first class', 'premium'];
    return classTypes.some(cls => text.toLowerCase().includes(cls));
}

// Extract travel info with one-way trip handling
const extractTravelInfo = (recentPrompts: string[], chatLog: ChatMessage[]): TravelInformation => {
    const info: TravelInformation = {
        departure: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        travelRoute: '',
        flightClass: ''
    };

    // First find the travel route to determine if it's a one-way trip
    const routeCandidate = recentPrompts.find(isTravelRoute);
    if (routeCandidate) {
        info.travelRoute = routeCandidate;
    }

    // Check if this is a one-way trip
    const isOneWay = info.travelRoute.toLowerCase().includes('one way');

    // Get airports
    if (recentPrompts.length >= 1 && isAirport(recentPrompts[0])) {
        info.departure = recentPrompts[0];
    }

    if (recentPrompts.length >= 2 && isAirport(recentPrompts[1])) {
        info.destination = recentPrompts[1];
    }

    // Find travel class
    const classCandidate = recentPrompts.find(isFlightClass);
    if (classCandidate) {
        info.flightClass = classCandidate;
    }

    // Go through the chat history to find dates with context
    for (let i = 0; i < chatLog.length - 1; i++) {
        const botMessage = chatLog[i];
        const userResponse = chatLog[i + 1];

        if (botMessage.sender === 'bot' && userResponse.sender === 'user' && isDate(userResponse.message)) {
            // Check context of bot message
            const lowerBotMessage = botMessage.message.toLowerCase();

            if (lowerBotMessage.includes('departure date') || lowerBotMessage.includes('what is your departure date')) {
                info.departureDate = userResponse.message;
            } else if (!isOneWay && (lowerBotMessage.includes('return date') || lowerBotMessage.includes('do you have a return'))) {
                info.returnDate = userResponse.message;
            }
        }
    }

    // If we couldn't determine from context, fall back to order of dates
    const dateCandidates = recentPrompts.filter(isDate);
    if (!info.departureDate && dateCandidates.length >= 1) {
        info.departureDate = dateCandidates[0];
    }

    // Only set return date if not a one-way trip
    if (!isOneWay && !info.returnDate && dateCandidates.length >= 2) {
        info.returnDate = dateCandidates[1];
    }

    // If we still have missing fields, analyze the chat history
    if (!info.departure || !info.destination || !info.departureDate ||
        (!isOneWay && !info.returnDate) || !info.travelRoute || !info.flightClass) {

        // This is a simplified version - in a real app you might want more sophisticated parsing
        chatLog.forEach(msg => {
            const text = msg.message;

            // We only care about user messages for extracting data
            if (msg.sender === 'user') {
                if (!info.departure && isAirport(text)) {
                    info.departure = text;
                } else if (info.departure && !info.destination && isAirport(text)) {
                    info.destination = text;
                } else if (isDate(text)) {
                    // For dates in the fallback processing, respect one-way trip status

                    // Look at previous bot message for context
                    const prevIndex = chatLog.findIndex(item => item.message === text && item.sender === 'user') - 1;
                    if (prevIndex >= 0) {
                        const prevMsg = chatLog[prevIndex].message.toLowerCase();
                        if (prevMsg.includes('departure date') || prevMsg.includes('what is your departure')) {
                            info.departureDate = text;
                        } else if (!isOneWay && (prevMsg.includes('return date') || prevMsg.includes('do you have a return'))) {
                            info.returnDate = text;
                        } else if (!info.departureDate) {
                            info.departureDate = text;
                        } else if (!isOneWay && !info.returnDate) {
                            info.returnDate = text;
                        }
                    } else {
                        // Fallback if we can't find the message context
                        if (!info.departureDate) {
                            info.departureDate = text;
                        } else if (!isOneWay && !info.returnDate) {
                            info.returnDate = text;
                        }
                    }
                } else if (!info.travelRoute && isTravelRoute(text)) {
                    info.travelRoute = text;
                } else if (!info.flightClass && isFlightClass(text)) {
                    info.flightClass = text;
                }
            }
        });
    }

    return info;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {

    const [chatLog, setChatLog] = useState<ChatMessage[]>(() =>
        storageService.getDefaultItem<ChatMessage[]>('chatLog', [
            {
                message: `Hi, Which airport will you be flying from?`,
                sender: 'bot'
            }
        ])
    );

    const [recentPrompts, setRecentPrompts] = useState<string[]>(() =>
        storageService.getDefaultItem<string[]>('RecentPrompts', [])
    );

    // Use useMemo to prevent unnecessary recalculations
    const travelInfo = useMemo(() =>
        extractTravelInfo(recentPrompts, chatLog),
        [recentPrompts, chatLog]
    );

    useEffect(() => {
        storageService.setItem('chatLog', JSON.stringify(chatLog));
    }, [chatLog]);

    useEffect(() => {
        storageService.setItem('RecentPrompts', JSON.stringify(recentPrompts));
    }, [recentPrompts]);

    return (
        <ChatContext.Provider value={{
            chatLog,
            setChatLog,
            recentPrompts,
            setRecentPrompts,
            travelInfo
        }}>
            {children}
        </ChatContext.Provider>
    );
};